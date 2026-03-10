// MongoDB Migration Script for Donation Flow Redesign
// Run this script in MongoDB shell or using mongosh

// 1. Update existing PortalDonation statuses
// 'accepted' status is ambiguous - these are incomplete flows, mark as cancelled
db.portaldonations.updateMany(
  { status: 'accepted' },
  { $set: { status: 'cancelled', adminNotes: 'Auto-cancelled: incomplete flow before redesign' } }
);

// 2. 'submitted' status -> 'pending_delivery' (self-delivery submitted, awaiting verification)
db.portaldonations.updateMany(
  { status: 'submitted' },
  { $set: { status: 'pending_delivery' } }
);

// 3. 'pickup_requested' status -> 'awaiting_volunteer'
db.portaldonations.updateMany(
  { status: 'pickup_requested' },
  { $set: { status: 'awaiting_volunteer' } }
);

// 4. 'pickup_accepted' status -> 'pickup_scheduled'
db.portaldonations.updateMany(
  { status: 'pickup_accepted' },
  { $set: { status: 'pickup_scheduled' } }
);

print('Migration complete! Updated statuses:');
print('- accepted -> cancelled');
print('- submitted -> pending_delivery');
print('- pickup_requested -> awaiting_volunteer');
print('- pickup_accepted -> pickup_scheduled');
