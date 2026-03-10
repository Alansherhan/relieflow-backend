# Donation System Migration

## Summary

Unified donation tracking from dual system (DonationSchema + PortalDonation) to single system (PortalDonation only).

## Problem

The codebase had two separate donation models:

- **DonationSchema** (`Donation.js`) - Original model, never actually used
- **PortalDonation** - Full-featured model used by the web donation portal

## Analysis Results

### What Mobile App Actually Does

The mobile app (`reliefflow_frontend_public_app`) **DOES NOT handle donations**. It only allows users to:

- **Request donations** via `POST /public/donation/request/add` (creates DonationRequest)
- **View donation requests** via `GET /public/donation/request/`

The mobile app is for people **asking for help**, not people **giving donations**.

### What Web Portal Does

The web donation portal (`relieflow-donation-portal`) handles actual donations via:

- `POST /public/donate` - Guest cash donations
- `POST /public/donate-wallet` - Wallet donations
- `POST /portal/donation/accept` - Accept donation request
- And various other portal donation endpoints

All of these use **PortalDonation** model.

### DonationSchema Usage

The old `DonationSchema` was:

- Referenced in `DonationRequest.donations[]` array
- Had route `POST /donation/donate` that was **never called** by mobile app
- Commented out in AdminJS dashboard
- Never actually used in production

## Changes Made

### 1. Model Updates

**File:** `relieflow-backend/src/models/DonationRequest.js`

```javascript
// BEFORE
donations: [
  {
    type: mongoose.Types.ObjectId,
    ref: 'DonationSchema', // Old reference
  },
];

// AFTER
donations: [
  {
    type: mongoose.Types.ObjectId,
    ref: 'PortalDonation', // Updated reference
  },
];
```

### 2. Route Cleanup

**File:** `relieflow-backend/src/routes/publicUser.routes.js`

- ✅ Removed `POST /donation/donate` endpoint (never used)
- ✅ Removed `GET /donation/` endpoint (never used)
- ✅ Removed `GET /donation/request/:requestId/donations` endpoint (never used)
- ✅ Removed import of `donationController.js`

### 3. Import Cleanup

**Files:**

- `server.js` - Removed `import Donation from './src/models/Donation.js'`
- `src/dashboard/resources.js` - Removed commented Donation import

### 4. Deprecated Files

The following files have been renamed to `.deprecated`:

- `src/models/Donation.js.deprecated`
- `src/controllers/donationController.js.deprecated`
- `src/validator/request/donation.js.deprecated`

## Data Migration

### If You Have Existing DonationSchema Records

**Check for existing records:**

```javascript
db.donationschemas.countDocuments();
```

**If records exist, migrate them:**

```javascript
// Example migration script (customize as needed)
const oldDonations = await db.donationschemas.find({}).toArray();

for (const oldDonation of oldDonations) {
  await db.portaldonations.insertOne({
    donor: null, // Anonymous if no donor reference
    donorName: oldDonation.donatedBy || 'Anonymous',
    donationType: oldDonation.donationType,
    amount: oldDonation.amount,
    itemDetails: oldDonation.itemDetails,
    status:
      oldDonation.status === 'completed' ? 'completed' : 'pending_delivery',
    donationRequest: oldDonation.donationRequest,
    proofImage: oldDonation.proofImage,
    deliveryMethod: 'not_applicable',
    isWalletDonation: false,
    createdAt: oldDonation.createdAt,
    updatedAt: oldDonation.updatedAt,
  });
}
```

**Then drop old collection:**

```javascript
db.donationschemas.drop();
```

## Current Architecture

### Donation Request Flow

```
Public User (Mobile App)
  └─> Creates DonationRequest
       └─> Status: pending → accepted → partially_fulfilled → completed

Donor (Web Portal)
  └─> Views DonationRequest
       └─> Creates PortalDonation
            ├─> Cash: pending_payment → completed
            ├─> Item (self): pending_delivery → completed
            └─> Item (pickup): awaiting_volunteer → pickup_scheduled → completed
```

### Database Models

- **DonationRequest** - Requests for help (created by mobile app users)
- **PortalDonation** - Actual donations (created by web portal donors)
- **AdminWallet** - Tracks relief fund balance
- **Task** - Volunteer tasks (auto-created for pickups)

## Testing Checklist

- [ ] Verify mobile app can still create donation requests
- [ ] Verify web portal can donate to requests
- [ ] Check AdminJS dashboard shows PortalDonations correctly
- [ ] Verify wallet donations work
- [ ] Check donation request fulfillment tracking
- [ ] Verify pickup task creation

## Rollback Plan

If issues arise, restore the deprecated files:

```bash
cd relieflow-backend/src
mv models/Donation.js.deprecated models/Donation.js
mv controllers/donationController.js.deprecated controllers/donationController.js
mv validator/request/donation.js.deprecated validator/request/donation.js
```

Then revert the code changes in:

- `src/models/DonationRequest.js`
- `src/routes/publicUser.routes.js`
- `server.js`
- `src/dashboard/resources.js`

## Notes

- Mobile app routes use `/public/donation/request/*` for DonationRequests
- Web portal routes use `/public/donate*` and `/portal/donation/*` for PortalDonations
- The naming was confusing: "donation" in mobile routes refers to "donation requests"
- Only PortalDonation is now used for actual donation tracking
- DonationRequest remains for tracking help requests from public users

## Benefits

✅ Single source of truth for donation tracking  
✅ No more confusion between two donation models  
✅ Cleaner codebase with deprecated code removed  
✅ AdminJS dashboard simplified  
✅ All donation features (pickup, delivery, wallet) unified in PortalDonation
