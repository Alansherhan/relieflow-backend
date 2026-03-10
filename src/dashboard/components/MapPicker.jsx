import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Input, Label, FormGroup } from '@adminjs/design-system';

const MapPicker = (props) => {
    const { record, property, onChange } = props;
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markerRef = useRef(null);

    // Initial Values - safely parse and validate
    const getInitialValue = (path) => record.params[`${property.name}.${path}`];
    const parsedLat = parseFloat(getInitialValue('location.coordinates.1'));
    const parsedLng = parseFloat(getInitialValue('location.coordinates.0'));
    const initialLat = !isNaN(parsedLat) ? parsedLat : null;
    const initialLng = !isNaN(parsedLng) ? parsedLng : null;
    const hasInitialCoords = initialLat !== null && initialLng !== null && (initialLat !== 0 || initialLng !== 0);

    const [position, setPosition] = useState(hasInitialCoords ? [initialLat, initialLng] : null);
    const [searchQuery, setSearchQuery] = useState('');

    const [addressData, setAddressData] = useState({
        addressLine1: getInitialValue('addressLine1') || '',
        addressLine2: getInitialValue('addressLine2') || '',
        addressLine3: getInitialValue('addressLine3') || '',
        pinCode: getInitialValue('pinCode') || '',
        location: hasInitialCoords ? { type: 'Point', coordinates: [initialLng, initialLat] } : null
    });

    // Helper to trigger AdminJS onChange
    // We wrap this in a customized hook or just call it in useEffect
    const updateRecord = (data) => {
        // Sanitize pinCode: Only digits, or null
        let cleanPin = null;
        if (data.pinCode) {
            const strPin = String(data.pinCode).replace(/\D/g, ''); // Remove non-digits
            if (strPin.length > 0) {
                cleanPin = parseInt(strPin, 10);
            }
        }

        // Parse coordinates and check if they're valid
        const lng = parseFloat(data.location?.coordinates?.[0]);
        const lat = parseFloat(data.location?.coordinates?.[1]);
        const hasValidCoordinates = !isNaN(lng) && !isNaN(lat) && (lng !== 0 || lat !== 0);

        const payload = {
            addressLine1: data.addressLine1 || '',
            addressLine2: data.addressLine2 || '',
            addressLine3: data.addressLine3 || '',
            pinCode: cleanPin,
        };

        // Only include location if we have valid coordinates
        if (hasValidCoordinates) {
            payload.location = {
                type: 'Point',
                coordinates: [lng, lat]
            };
        }

        console.log('[DEBUG] MapPicker payload (Object):', payload);
        onChange(property.name, payload);
    };

    // Generic Address Updater from Nominatim Data
    const updateAddressFromNominatim = (data, lat, lng) => {
        const address = data.address || {};

        // Construct Address Line 1 (Significant place name)
        // Order of preference: amenity, building, road, village, suburb, town, city
        const line1 = address.amenity || address.building || address.road || address.village || address.suburb || address.town || address.city || data.display_name.split(',')[0];

        // Construct Address Line 2 (District/State/Region)
        const line2 = [address.city || address.town, address.state_district, address.state].filter(x => x).join(', ');

        const postcode = address.postcode || '';

        setAddressData(prev => ({
            ...prev,
            addressLine1: line1 || '',
            addressLine2: line2 || '',
            addressLine3: prev.addressLine3 || '',
            pinCode: postcode,
            location: {
                type: 'Point',
                coordinates: [lng, lat]
            }
        }));
    };

    // Handle Reverse Geocoding via Nominatim
    const reverseGeocode = async (lat, lng) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=en`, {
                headers: { 'User-Agent': 'ReliefFlowAdmin/1.0' }
            });
            const data = await response.json();
            if (data && data.address) {
                updateAddressFromNominatim(data, lat, lng);
            }
        } catch (e) {
            console.error("Reverse geocoding failed", e);
        }
    };

    // Load Leaflet from CDN
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

        loadLeaflet().then((L) => {
            if (!mapInstanceRef.current && mapContainerRef.current) {
                const center = position || [10.8505, 76.2711]; // Default Kerala
                const map = L.map(mapContainerRef.current).setView(center, position ? 15 : 7);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(map);

                // Click event
                map.on('click', (e) => {
                    const { lat, lng } = e.latlng;
                    const newPos = [lat, lng];

                    if (markerRef.current) {
                        markerRef.current.setLatLng(newPos);
                    } else {
                        markerRef.current = L.marker(newPos).addTo(map);
                    }

                    setPosition(newPos);

                    // Trigger Reverse Geocoding
                    reverseGeocode(lat, lng);

                    // Optimistic update of coordinates
                    setAddressData(prev => ({
                        ...prev,
                        location: {
                            type: 'Point',
                            coordinates: [lng, lat]
                        }
                    }));
                });

                mapInstanceRef.current = map;

                // Initial marker
                if (position) {
                    markerRef.current = L.marker(position).addTo(map);
                }
            }
        });

        // Cleanup
        return () => {
            if (mapInstanceRef.current) {
                // mapInstanceRef.current.remove(); // Removing might be aggressive if component remounts
                // mapInstanceRef.current = null;
            }
        };
    }, []); // Empty deps, run once on mount

    // Track if this is the initial mount to avoid immediate sync
    const isInitialMount = useRef(true);

    // Sync state changes to AdminJS
    // This is the ONLY place where we notify AdminJS of changes
    // Skip the first render to avoid sending potentially invalid initial data
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        updateRecord(addressData);
    }, [addressData]);


    // Handle Search
    const handleSearch = async () => {
        if (!searchQuery || !window.L || !mapInstanceRef.current) return;
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&limit=1&addressdetails=1&accept-language=en`, {
                headers: { 'User-Agent': 'ReliefFlowAdmin/1.0' }
            });
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const newPos = [parseFloat(lat), parseFloat(lon)];

                const L = window.L;
                const map = mapInstanceRef.current;
                map.setView(newPos, 15);

                if (markerRef.current) {
                    markerRef.current.setLatLng(newPos);
                } else {
                    markerRef.current = L.marker(newPos).addTo(map);
                }

                setPosition(newPos);
                // Use the detailed address from search result
                updateAddressFromNominatim(data[0], parseFloat(lat), parseFloat(lon));
            }
        } catch (e) {
            console.error("Search failed", e);
        }
    };

    // Debug: Log errors and full record structure on every render
    // Note: The error `coordinates.0` often comes from top-level `location` field, not from address
    if (record?.errors && Object.keys(record.errors).length > 0) {
        // Check if error is specifically for our property (address)
        const relevantErrors = Object.entries(record.errors)
            .filter(([key]) => key.startsWith(property.name) || key.startsWith(`${property.name}.`))
            .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

        // Only log if there are errors for our specific property
        if (Object.keys(relevantErrors).length > 0) {
            console.log('[DEBUG] Errors for', property.name, ':', JSON.stringify(relevantErrors, null, 2));
        }

        // The `coordinates.0` error without prefix is from top-level `location` field,
        // not from `address.location` - it's a separate field in the schema
    }

    return (
        <Box mb="xl">
            <Label>Location Search</Label>
            <Box flex flexDirection="row" mb="default">
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for a place (e.g. Mavelikkara)"
                    style={{ flexGrow: 1, marginRight: '10px' }}
                />
                <Button onClick={handleSearch} type="button">Search</Button>
            </Box>

            <Box height="400px" mb="default" border="default" style={{ position: 'relative', zIndex: 0 }}>
                <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
            </Box>

            <FormGroup>
                <Label>Shelter Address Line 1</Label>
                <Input
                    value={addressData.addressLine1}
                    onChange={(e) => setAddressData(prev => ({ ...prev, addressLine1: e.target.value }))}
                />
            </FormGroup>

            <FormGroup>
                <Label>Shelter Address Line 2</Label>
                <Input
                    value={addressData.addressLine2}
                    onChange={(e) => setAddressData(prev => ({ ...prev, addressLine2: e.target.value }))}
                />
            </FormGroup>

            <FormGroup>
                <Label>Shelter Address Line 3</Label>
                <Input
                    value={addressData.addressLine3}
                    onChange={(e) => setAddressData(prev => ({ ...prev, addressLine3: e.target.value }))}
                />
            </FormGroup>

            <FormGroup>
                <Label>Pin Code</Label>
                <Input
                    value={addressData.pinCode}
                    onChange={(e) => setAddressData(prev => ({ ...prev, pinCode: e.target.value }))}
                />
            </FormGroup>

            <Box>
                <Label>Coordinates</Label>
                <div style={{ fontSize: '0.8em', color: '#888' }}>
                    Lat: {addressData.location?.coordinates?.[1] || 0},
                    Lng: {addressData.location?.coordinates?.[0] || 0}
                </div>
            </Box>
        </Box>
    );
};

export default MapPicker;
