
import React from 'react'

const LinkComponent = (props) => {
  const { record, property } = props;

  // Try to get coordinates from the direct property first (e.g., 'location')
  // Fallback to 'address.location' for other resources if needed
  // Note: In AdminJS list view, flattening might be "location.coordinates.0"
  const lat = record.params[`${property.name}.coordinates.1`] || record.params["address.location.coordinates.1"];
  const long = record.params[`${property.name}.coordinates.0`] || record.params["address.location.coordinates.0"];

  // If no coordinates, return null or empty
  if (!lat || !long) {
    return null;
  }

  // Attempt to construct an address string from the record
  // Logic: address.addressLine1, address.addressLine2, address.city, etc.
  // Note: AdminJS likely flattens these to `address.addressLine1`
  const addressParts = [
    record.params['address.addressLine1'],
    record.params['address.addressLine2'],
    record.params['address.addressLine3'],
    record.params['address.pinCode'],
    // Add other address fields if they exist in your schema, e.g. state, city
  ].filter(part => part && part.toString().trim() !== '');

  let query = '';
  if (addressParts.length > 0) {
    query = encodeURIComponent(addressParts.join(', '));
  } else {
    query = `${lat},${long}`;
  }

  // query param works for both search terms (address) and coordinates
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <a href={mapsLink} target="_blank" rel="noopener noreferrer">
      View Location
    </a>
  )
}

export default LinkComponent
