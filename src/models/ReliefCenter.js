import mongoose from 'mongoose';
import { addressSchema } from './common.js';

const reliefCenter = new mongoose.Schema(
  {
    shelterName: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    coordinatorName: {
      type: String,
      required: true,
    },
    coordinatorNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create virtual field for formatted address
reliefCenter.virtual('formattedAddress').get(function () {
  const { address } = this;
  if (!address) return '';

  const parts = [
    address.addressLine1,
    address.addressLine2,
    address.addressLine3,
  ].filter((line) => line && line.trim() !== '');

  const pin = address.pinCode ? `– ${address.pinCode}` : '';

  return parts.join(', ') + ' ' + pin;
});

// Ensure virtuals are serialized
reliefCenter.set('toJSON', { virtuals: true });
reliefCenter.set('toObject', { virtuals: true });

reliefCenter.pre('validate', async function (next) {
  if (!this.isModified('address')) {
    return next();
  }

  const address = this.address;
  if (address) {
    const query = `${address.addressLine1 || ''}, ${address.addressLine2 || ''}, ${address.addressLine3 || ''}, ${address.pinCode || ''}`;
    const cleanQuery = query.replace(/undefined/g, '').replace(/null/g, '');

    // Check if valid coordinates are already provided (from MapPicker)
    const hasValidCoordinates =
      address.location &&
      address.location.coordinates &&
      (address.location.coordinates[0] !== 0 ||
        address.location.coordinates[1] !== 0);

    if (hasValidCoordinates) {
      return next();
    }

    // Default location
    if (!address.location) {
      address.location = {
        type: 'Point',
        coordinates: [0, 0],
      };
    }

    try {
      // Dynamic import or require if ESM issues, but top level import is fine if file is module
      // However, to keep it simple and ensure no circular deps/hoisting issues:

      // Note: We need to import axios at the top of the file.
      // Since replace_file_content chunks, I'll add the import in a separate call or ensure this chunk includes it?
      // No, I can't add top-level import here easily without replacing the whole file or using multi-replace.
      // I'll assume I will add the import next or use dynamic import.
      // Dynamic import is safer for this 'patch' style.
      const axiosModule = await import('axios');
      const axios = axiosModule.default;

      console.log(`Geocoding address: ${cleanQuery}`);
      const geocodeRes = await axios.get(
        'https://nominatim.openstreetmap.org/search',
        {
          params: {
            q: cleanQuery,
            format: 'json',
            limit: 1,
            'accept-language': 'en',
          },
          headers: {
            'User-Agent': 'ReliefFlow/1.0',
          },
        }
      );

      if (geocodeRes.data && geocodeRes.data.length > 0) {
        const { lat, lon } = geocodeRes.data[0];
        console.log(`Geocoded to: ${lat}, ${lon}`);
        address.location = {
          type: 'Point',
          coordinates: [parseFloat(lon), parseFloat(lat)],
        };
        this.address = address; // Re-assign to ensure persistence
      } else {
        console.log('Geocoding returned no results.');
      }
    } catch (geoError) {
      console.error('Geocoding failed inside pre-save hook:', geoError.message);
    }
  }
  next();
});

export default mongoose.model('ReliefCenter', reliefCenter);
