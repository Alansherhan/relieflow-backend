import React, { useState, useEffect, useRef } from 'react';
import { Box, Label } from '@adminjs/design-system';

const MapShow = (props) => {
    const { record, property } = props;
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markerRef = useRef(null);

    // Initial Values
    // AdminJS flattens nested objects in params, e.g. 'location.coordinates.0'
    const getInitialValue = (path) => record.params[`${property.name}.${path}`];

    // Note: GeoJSON stores [lng, lat], but Leaflet uses [lat, lng]
    const initialLng = parseFloat(getInitialValue('coordinates.0'));
    const initialLat = parseFloat(getInitialValue('coordinates.1'));

    const hasLocation = !isNaN(initialLat) && !isNaN(initialLng);
    const position = hasLocation ? [initialLat, initialLng] : null;

    // Load Leaflet from CDNs
    useEffect(() => {
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
                return new Promise((resolve) => { script.onload = () => resolve(window.L); });
            } else {
                // Wait for it to be ready
                return new Promise((resolve) => {
                    const check = setInterval(() => {
                        if (window.L) { clearInterval(check); resolve(window.L); }
                    }, 100);
                });
            }
        };

        if (hasLocation) {
            loadLeaflet().then((L) => {
                if (!mapInstanceRef.current && mapContainerRef.current) {
                    const center = position || [10.8505, 76.2711];
                    const map = L.map(mapContainerRef.current).setView(center, 15);

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenStreetMap contributors'
                    }).addTo(map);

                    // Initial marker
                    if (position) {
                        markerRef.current = L.marker(position).addTo(map);
                    }

                    // Disable interactions for read-only view
                    map.dragging.disable();
                    map.touchZoom.disable();
                    map.doubleClickZoom.disable();
                    map.scrollWheelZoom.disable();
                    map.boxZoom.disable();
                    map.keyboard.disable();
                    if (map.tap) map.tap.disable();

                    mapInstanceRef.current = map;
                }
            });
        }

        // Cleanup
        return () => {
            // We generally depend on the component unmounting to clean DOM refs, 
            // but Leaflet instances might need manual cleanup if we were re-mounting heavily.
            // For simple show views, this is usually fine.
        };
    }, [hasLocation]);

    if (!hasLocation) {
        return (
            <Box mb="xl">
                <Label>{property.label}</Label>
                <Box>No location data available</Box>
            </Box>
        );
    }

    return (
        <Box mb="xl">
            <Label>{property.label}</Label>
            <Box height="400px" mb="default" border="default">
                <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
            </Box>
            <Box>
                <div style={{ fontSize: '0.8em', color: '#888' }}>
                    Lat: {initialLat}, Lng: {initialLng}
                </div>
            </Box>
        </Box>
    );
};

export default MapShow;
