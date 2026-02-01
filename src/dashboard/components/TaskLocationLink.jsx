import React from 'react';
import { Badge } from '@adminjs/design-system';

/**
 * TaskLocationLink - A compact component for displaying location links in Task list views
 * Shows appropriate icons and links to Google Maps based on the location type
 */
const TaskLocationLink = (props) => {
    const { record, property } = props;

    // Determine which location type we're showing based on property name
    const isPickup = property.name.includes('pickup') || property.name === 'pickupLocation';
    const isDelivery = property.name.includes('delivery') || property.name === 'deliveryLocation';

    // Get the appropriate prefix for nested fields
    const locationPrefix = property.name;
    const addressPrefix = isPickup ? 'pickupAddress' : isDelivery ? 'deliveryAddress' : 'address';

    // Extract coordinates from flattened AdminJS params
    const lat = record.params[`${locationPrefix}.coordinates.1`];
    const lng = record.params[`${locationPrefix}.coordinates.0`];

    // Check for address data
    const addressLine1 = record.params[`${addressPrefix}.addressLine1`];
    const addressLine2 = record.params[`${addressPrefix}.addressLine2`];

    // If no coordinates, return a subtle indicator
    if (!lat || !lng) {
        return (
            <span style={{ color: '#adb5bd', fontSize: '12px' }}>—</span>
        );
    }

    // Attempt to construct an address string from the record
    const addressParts = [
        addressLine1,
        addressLine2,
        record.params[`${addressPrefix}.addressLine3`],
        record.params[`${addressPrefix}.pinCode`],
    ].filter(part => part && part.toString().trim() !== '');

    let query = '';
    if (addressParts.length > 0) {
        query = encodeURIComponent(addressParts.join(', '));
    } else {
        query = `${lat},${lng}`;
    }

    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${query}`;

    // Determine icon and color based on location type
    const getStyle = () => {
        if (isPickup) {
            return {
                icon: '📦',
                label: 'Pickup',
                bgColor: '#fff3cd',
                textColor: '#856404',
                borderColor: '#ffc107',
            };
        }
        if (isDelivery) {
            return {
                icon: '🏠',
                label: 'Delivery',
                bgColor: '#d4edda',
                textColor: '#155724',
                borderColor: '#28a745',
            };
        }
        return {
            icon: '📍',
            label: 'View',
            bgColor: '#e3f2fd',
            textColor: '#1565c0',
            borderColor: '#2196f3',
        };
    };

    const style = getStyle();

    return (
        <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                backgroundColor: style.bgColor,
                color: style.textColor,
                borderRadius: '16px',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 500,
                border: `1px solid ${style.borderColor}`,
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
            }}
            title={addressParts.length > 0 ? addressParts.join(', ') : `${lat}, ${lng}`}
        >
            <span>{style.icon}</span>
            <span>{style.label}</span>
        </a>
    );
};

export default TaskLocationLink;
