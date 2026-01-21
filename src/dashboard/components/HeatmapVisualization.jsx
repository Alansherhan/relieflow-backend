import React, { useEffect, useRef, useState } from 'react';
import { Box, H5, Text, Loader } from '@adminjs/design-system';

const HeatmapVisualization = () => {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const heatLayerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [caseCount, setCaseCount] = useState(0);
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadLibraries = async () => {
            // Load Leaflet CSS
            if (!document.getElementById('leaflet-css')) {
                const link = document.createElement('link');
                link.id = 'leaflet-css';
                link.rel = 'stylesheet';
                link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                document.head.appendChild(link);
            }

            // Load Leaflet JS
            if (!window.L) {
                const script = document.createElement('script');
                script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                document.body.appendChild(script);
                await new Promise((resolve, reject) => {
                    script.onload = resolve;
                    script.onerror = reject;
                });
            }

            // Load Leaflet.heat plugin
            if (!window.L.heatLayer) {
                const heatScript = document.createElement('script');
                heatScript.src = 'https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js';
                document.body.appendChild(heatScript);
                await new Promise((resolve, reject) => {
                    heatScript.onload = resolve;
                    heatScript.onerror = reject;
                });
            }

            return window.L;
        };

        const initMap = async () => {
            try {
                const L = await loadLibraries();

                // Fetch heatmap data from API
                const response = await fetch('/api/dashboard/heatmap');
                const result = await response.json();

                if (!isMounted) return;

                if (!result.success) {
                    throw new Error(result.message || 'Failed to fetch heatmap data');
                }

                const heatData = result.data || [];
                setCaseCount(result.count || 0);

                // Filter to valid coordinate points only
                const validPoints = heatData
                    .filter(d =>
                        d &&
                        typeof d.lat === 'number' &&
                        typeof d.lng === 'number' &&
                        !isNaN(d.lat) &&
                        !isNaN(d.lng)
                    )
                    .map(d => [d.lat, d.lng, d.intensity || 0.5]);

                if (validPoints.length === 0) {
                    setNoData(true);
                    setLoading(false);
                    return;
                }

                // Wait a tick to ensure container is rendered
                await new Promise(resolve => setTimeout(resolve, 100));

                if (!isMounted || !mapContainerRef.current) return;

                // Check container has dimensions
                const container = mapContainerRef.current;
                if (container.offsetWidth === 0 || container.offsetHeight === 0) {
                    throw new Error('Map container has no dimensions');
                }

                // Initialize map
                const map = L.map(container).setView([10.8505, 76.2711], 8);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(map);

                // Add heatmap layer
                heatLayerRef.current = L.heatLayer(validPoints, {
                    radius: 25,
                    blur: 15,
                    maxZoom: 17,
                    max: 1.0,
                    minOpacity: 0.3,
                    gradient: {
                        0.2: '#3b82f6',
                        0.4: '#10b981',
                        0.6: '#f59e0b',
                        0.8: '#ef4444',
                        1.0: '#dc2626'
                    }
                }).addTo(map);

                // Fit bounds to show all points
                try {
                    const bounds = L.latLngBounds(validPoints.map(p => [p[0], p[1]]));
                    if (bounds.isValid()) {
                        map.fitBounds(bounds, { padding: [50, 50] });
                    }
                } catch (e) {
                    console.warn('Could not fit bounds:', e);
                }

                mapInstanceRef.current = map;
                setLoading(false);

            } catch (err) {
                console.error('Error initializing heatmap:', err);
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        initMap();

        return () => {
            isMounted = false;
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    // Show message if no data
    if (noData) {
        return (
            <Box mt="xxl">
                <H5 mb="default">🔥 Active Cases Heatmap</H5>
                <Box
                    bg="white"
                    p="xl"
                    borderRadius="default"
                    border="default"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="200px"
                >
                    <Text color="grey60">No active cases with location data available</Text>
                </Box>
            </Box>
        );
    }

    return (
        <Box mt="xxl">
            <H5 mb="default">🔥 Active Cases Heatmap</H5>
            <Box
                bg="white"
                p="lg"
                borderRadius="default"
                border="default"
                position="relative"
            >
                {/* Map container - always render but overlay loader */}
                <Box height="400px" position="relative">
                    <div
                        ref={mapContainerRef}
                        style={{
                            height: '100%',
                            width: '100%',
                            visibility: loading ? 'hidden' : 'visible'
                        }}
                    />

                    {loading && (
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            bg="white"
                        >
                            <Loader />
                        </Box>
                    )}

                    {error && (
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            bg="white"
                        >
                            <Text color="error">Error: {error}</Text>
                        </Box>
                    )}
                </Box>

                {!loading && !error && (
                    <Box mt="default" display="flex" justifyContent="space-between" alignItems="center">
                        <Text color="grey60" fontSize="sm">
                            Showing {caseCount} active cases
                        </Text>
                        <Box display="flex" gap="default" alignItems="center">
                            <Box display="flex" alignItems="center" gap="sm">
                                <Box width="12px" height="12px" bg="#3b82f6" borderRadius="50%" />
                                <Text fontSize="sm">Low</Text>
                            </Box>
                            <Box display="flex" alignItems="center" gap="sm">
                                <Box width="12px" height="12px" bg="#f59e0b" borderRadius="50%" />
                                <Text fontSize="sm">Medium</Text>
                            </Box>
                            <Box display="flex" alignItems="center" gap="sm">
                                <Box width="12px" height="12px" bg="#ef4444" borderRadius="50%" />
                                <Text fontSize="sm">High</Text>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default HeatmapVisualization;
