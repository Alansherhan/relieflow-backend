import React, { useEffect, useRef } from 'react';
import { Box, Label, Text } from '@adminjs/design-system';

/**
 * TaskLocationShow - A component for displaying pickup/delivery locations in Task views
 * Shows formatted address with a small map preview and a "Get Directions" link
 */
const TaskLocationShow = (props) => {
    const { record, property } = props;
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);

    // Determine which location type we're showing based on property name
    const isPickup = property.name.includes('pickup') || property.name === 'pickupLocation';
    const isDelivery = property.name.includes('delivery') || property.name === 'deliveryLocation';
    const isLegacy = property.name === 'location';

    // Get the appropriate prefix for nested fields
    const locationPrefix = property.name;
    const addressPrefix = isPickup ? 'pickupAddress' : isDelivery ? 'deliveryAddress' : 'address';

    // Extract coordinates from flattened AdminJS params
    const parsedLng = parseFloat(record.params[`${locationPrefix}.coordinates.0`]);
    const parsedLat = parseFloat(record.params[`${locationPrefix}.coordinates.1`]);
    const lng = !isNaN(parsedLng) ? parsedLng : 0;
    const lat = !isNaN(parsedLat) ? parsedLat : 0;
    const hasCoordinates = !isNaN(parsedLat) && !isNaN(parsedLng) && (lat !== 0 || lng !== 0);

    // Extract address fields
    const addressLine1 = record.params[`${addressPrefix}.addressLine1`] || '';
    const addressLine2 = record.params[`${addressPrefix}.addressLine2`] || '';
    const addressLine3 = record.params[`${addressPrefix}.addressLine3`] || '';
    const pinCode = record.params[`${addressPrefix}.pinCode`] || '';

    // Build formatted address parts
    const addressParts = [addressLine1, addressLine2, addressLine3].filter(line => line && line.trim() !== '');
    const formattedAddress = addressParts.join(', ') + (pinCode ? ` - ${pinCode}` : '');

    // Google Maps directions URL
    const mapsUrl = hasCoordinates
        ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
        : formattedAddress 
            ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`
            : null;

    // Determine label and icon based on location type
    const getLabel = () => {
        if (isPickup) return 'Pickup Location';
        if (isDelivery) return 'Delivery Location';
        return property.label || 'Location';
    };

    const getIcon = () => {
        if (isPickup) return '📦';
        if (isDelivery) return '🏠';
        return '📍';
    };

    const getColor = () => {
        if (isPickup) return { bg: '#fff3cd', border: '#ffc107', accent: '#856404' };
        if (isDelivery) return { bg: '#d4edda', border: '#28a745', accent: '#155724' };
        return { bg: '#f8f9fa', border: '#dee2e6', accent: '#495057' };
    };

    const colors = getColor();

    // Load Leaflet and display map
    useEffect(() => {
        if (!hasCoordinates) return;

        const loadLeaflet = async () => {
            if (window.L) return window.L;

            // Load CSS
            if (!document.getElementById('leaflet-css')) {
                const link = document.createElement('link');
                link.id = 'leaflet-css';
                link.rel = 'stylesheet';
                link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                document.head.appendChild(link);
            }

            // Load JS
            if (!document.getElementById('leaflet-js')) {
                const script = document.createElement('script');
                script.id = 'leaflet-js';
                script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                document.body.appendChild(script);
                return new Promise((resolve) => {
                    script.onload = () => resolve(window.L);
                });
            } else {
                return new Promise((resolve) => {
                    const check = setInterval(() => {
                        if (window.L) {
                            clearInterval(check);
                            resolve(window.L);
                        }
                    }, 100);
                });
            }
        };

        loadLeaflet().then((L) => {
            if (!mapInstanceRef.current && mapContainerRef.current) {
                const map = L.map(mapContainerRef.current, {
                    zoomControl: false,
                    dragging: false,
                    scrollWheelZoom: false,
                    doubleClickZoom: false,
                    touchZoom: false,
                }).setView([lat, lng], 15);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OSM'
                }).addTo(map);

                L.marker([lat, lng]).addTo(map);

                mapInstanceRef.current = map;
            }
        });

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [lat, lng, hasCoordinates]);

    // If no location data at all
    if (!hasCoordinates && !addressLine1 && !addressLine2 && !addressLine3 && !pinCode) {
        return (
            <Box mb="lg">
                <Label>{getLabel()}</Label>
                <Text variant="sm" color="grey60">No location data available</Text>
            </Box>
        );
    }

    return (
        <Box mb="lg">
            <Label style={{ marginBottom: '8px', fontWeight: 600 }}>
                {getLabel()}
            </Label>

            <Box
                style={{
                    background: `linear-gradient(135deg, ${colors.bg} 0%, #ffffff 100%)`,
                    borderRadius: '12px',
                    padding: '16px',
                    border: `2px solid ${colors.border}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
            >
                {/* Address Text */}
                {(addressLine1 || addressLine2 || addressLine3 || pinCode) && (
                    <Box mb="default">
                        <Box flex flexDirection="row" alignItems="flex-start" style={{ gap: '8px' }}>
                            <span style={{ fontSize: '20px' }}>{getIcon()}</span>
                            <Box>
                                {addressLine1 && (
                                    <Text style={{ fontWeight: 500, fontSize: '14px', color: '#212529' }}>
                                        {addressLine1}
                                    </Text>
                                )}
                                {addressLine2 && (
                                    <Text style={{ fontSize: '13px', color: '#495057' }}>
                                        {addressLine2}
                                    </Text>
                                )}
                                {addressLine3 && (
                                    <Text style={{ fontSize: '13px', color: '#6c757d' }}>
                                        {addressLine3}
                                    </Text>
                                )}
                                {pinCode && (
                                    <Text style={{ fontSize: '13px', color: '#6c757d', marginTop: '4px' }}>
                                        PIN: {pinCode}
                                    </Text>
                                )}
                            </Box>
                        </Box>
                    </Box>
                )}

                {/* Map Preview */}
                {hasCoordinates && (
                    <Box
                        style={{
                            height: '180px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            marginBottom: '12px',
                            border: `1px solid ${colors.border}`,
                        }}
                    >
                        <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
                    </Box>
                )}

                {/* Actions Row */}
                <Box flex flexDirection="row" alignItems="center" style={{ gap: '12px', flexWrap: 'wrap' }}>
                    {mapsUrl && (
                        <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 14px',
                                backgroundColor: '#4285f4',
                                color: 'white',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontSize: '13px',
                                fontWeight: 500,
                                transition: 'background-color 0.2s',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3367d6'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4285f4'}
                        >
                            🧭 Get Directions
                        </a>
                    )}

                    {hasCoordinates && (
                        <Box
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 12px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '6px',
                                border: '1px solid #dee2e6',
                            }}
                        >
                            <span style={{ fontSize: '12px' }}>🌐</span>
                            <Text
                                style={{
                                    fontSize: '12px',
                                    color: '#6c757d',
                                    fontFamily: 'monospace',
                                }}
                            >
                                {lat.toFixed(5)}, {lng.toFixed(5)}
                            </Text>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default TaskLocationShow;
