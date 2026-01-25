import React, { useEffect, useRef } from 'react';
import { Box, Label, Text, Link } from '@adminjs/design-system';

/**
 * AddressShow - A clean component for displaying address in AdminJS show views
 * Shows formatted address with a small map preview and a "Get Directions" link
 */
const AddressShow = (props) => {
    const { record, property } = props;
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);

    // Extract address fields from flattened AdminJS params
    const getFieldValue = (path) => record.params[`${property.name}.${path}`];

    const addressLine1 = getFieldValue('addressLine1') || '';
    const addressLine2 = getFieldValue('addressLine2') || '';
    const addressLine3 = getFieldValue('addressLine3') || '';
    const pinCode = getFieldValue('pinCode') || '';

    // Location coordinates (GeoJSON format: [lng, lat])
    const parsedLng = parseFloat(getFieldValue('location.coordinates.0'));
    const parsedLat = parseFloat(getFieldValue('location.coordinates.1'));
    const lng = !isNaN(parsedLng) ? parsedLng : 0;
    const lat = !isNaN(parsedLat) ? parsedLat : 0;
    const hasCoordinates = !isNaN(parsedLat) && !isNaN(parsedLng) && (lat !== 0 || lng !== 0);

    // Build formatted address parts
    const addressParts = [addressLine1, addressLine2, addressLine3].filter(line => line && line.trim() !== '');
    const formattedAddress = addressParts.join(', ') + (pinCode ? ` - ${pinCode}` : '');

    // Google Maps directions URL
    const mapsUrl = hasCoordinates
        ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`;

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

    // If no address data at all
    if (!addressLine1 && !addressLine2 && !addressLine3 && !pinCode && !hasCoordinates) {
        return (
            <Box mb="lg">
                <Label>{property.label || 'Address'}</Label>
                <Text variant="sm" color="grey60">No address provided</Text>
            </Box>
        );
    }

    return (
        <Box mb="lg">
            <Label style={{ marginBottom: '8px', fontWeight: 600 }}>
                {property.label || 'Address'}
            </Label>

            <Box
                style={{
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid #dee2e6',
                }}
            >
                {/* Address Text */}
                <Box mb="default">
                    <Box flex flexDirection="row" alignItems="flex-start" style={{ gap: '8px' }}>
                        <span style={{ fontSize: '18px' }}>📍</span>
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

                {/* Map Preview */}
                {hasCoordinates && (
                    <Box
                        style={{
                            height: '180px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            marginBottom: '12px',
                            border: '1px solid #ced4da',
                        }}
                    >
                        <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
                    </Box>
                )}

                {/* Actions */}
                <Box flex flexDirection="row" style={{ gap: '12px' }}>
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

                    {hasCoordinates && (
                        <Text
                            variant="xs"
                            color="grey60"
                            style={{ alignSelf: 'center' }}
                        >
                            {lat.toFixed(5)}, {lng.toFixed(5)}
                        </Text>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AddressShow;
