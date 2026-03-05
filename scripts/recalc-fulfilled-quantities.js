/**
 * Migration script: Recalculate fulfilledQuantity for all DonationRequests
 * 
 * This fixes corrupted data caused by matching donated items to request items
 * by category only (which fails when multiple items share the same category).
 * 
 * What it does:
 * 1. Resets fulfilledQuantity to 0 for all DonationRequest items
 * 2. Finds all completed PortalDonations linked to each request
 * 3. Matches donated items to request items by description (unique per item)
 * 4. Recalculates correct fulfilledQuantity
 * 5. Backfills requestItemId on PortalDonation items for future accuracy
 * 6. Updates DonationRequest fulfillment status
 * 
 * Usage: node scripts/recalc-fulfilled-quantities.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URL;

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // Import userProfile first — DonationRequest auto-populates it
  await import('../src/models/userProfile.js');
  const DonationRequest = (await import('../src/models/DonationRequest.js')).default;
  const PortalDonation = (await import('../src/models/PortalDonation.js')).default;

  // Find all DonationRequests that have item donations
  const requests = await DonationRequest.find({
    donationType: 'item',
    itemDetails: { $exists: true, $ne: [] }
  });

  console.log(`Found ${requests.length} item-based DonationRequests to process`);

  let fixedCount = 0;
  let backfilledCount = 0;

  for (const request of requests) {
    // Reset all fulfilledQuantity to 0
    request.itemDetails.forEach(item => {
      item.fulfilledQuantity = 0;
    });

    // Find all completed PortalDonations for this request
    const completedDonations = await PortalDonation.find({
      donationRequest: request._id,
      donationType: 'item',
      status: 'completed',
      itemDetails: { $exists: true, $ne: [] }
    });

    if (completedDonations.length === 0) {
      // No completed item donations — just save the reset
      await request.save();
      continue;
    }

    let portalDonationUpdated = false;

    for (const donation of completedDonations) {
      for (const donatedItem of donation.itemDetails) {
        // Try to match by description + category (more specific than category alone)
        let matchedRequestItem = null;

        if (donatedItem.requestItemId) {
          // Already has requestItemId — use it
          matchedRequestItem = request.itemDetails.find(
            ri => ri._id.toString() === donatedItem.requestItemId.toString()
          );
        }

        if (!matchedRequestItem) {
          // Fall back to description + category matching
          matchedRequestItem = request.itemDetails.find(
            ri => ri.category === donatedItem.category && ri.description === donatedItem.description
          );
        }

        if (!matchedRequestItem) {
          // Last resort: match by category only (same as old behavior)
          matchedRequestItem = request.itemDetails.find(
            ri => ri.category === donatedItem.category
          );
        }

        if (matchedRequestItem) {
          matchedRequestItem.fulfilledQuantity =
            (matchedRequestItem.fulfilledQuantity || 0) + (donatedItem.quantity || 0);

          // Backfill requestItemId on the PortalDonation item
          if (!donatedItem.requestItemId) {
            donatedItem.requestItemId = matchedRequestItem._id;
            portalDonationUpdated = true;
            backfilledCount++;
          }
        }
      }

      if (portalDonationUpdated) {
        await donation.save();
      }
    }

    // Update fulfillment status
    const allFulfilled = request.itemDetails.every(
      item => (item.fulfilledQuantity || 0) >= item.quantity
    );
    const partiallyFulfilled = request.itemDetails.some(
      item => (item.fulfilledQuantity || 0) > 0
    );

    if (allFulfilled) {
      request.status = 'fulfilled';
    } else if (partiallyFulfilled) {
      request.status = 'partially_fulfilled';
    }

    await request.save();
    fixedCount++;

    const items = request.itemDetails.map(
      i => `  ${i.description || i.category}: ${i.fulfilledQuantity}/${i.quantity} ${i.unit}`
    ).join('\n');
    console.log(`\nFixed: ${request.title || request._id}`);
    console.log(items);
  }

  console.log(`\n--- Done ---`);
  console.log(`Recalculated ${fixedCount} DonationRequests`);
  console.log(`Backfilled ${backfilledCount} requestItemId fields on PortalDonations`);

  await mongoose.disconnect();
}

run().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
