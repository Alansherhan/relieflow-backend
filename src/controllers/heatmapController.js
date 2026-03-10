import AidRequest from '../models/AidRequest.js';

/**
 * Get heatmap data for active aid requests
 * Returns array of { lat, lng, intensity } for heatmap visualization
 */
export const getHeatmapData = async (req, res) => {
    try {
        // Fetch active cases (pending and accepted) with valid location data
        const activeCases = await AidRequest.find({
            status: { $in: ['pending', 'accepted'] },
            'location.coordinates': { $exists: true, $ne: null }
        }).select('location.coordinates priority');

        // Map to heatmap format [lat, lng, intensity]
        const heatData = activeCases
            .filter(c => c.location?.coordinates?.length === 2)
            .map(c => ({
                lat: c.location.coordinates[1], // GeoJSON: [lng, lat]
                lng: c.location.coordinates[0],
                intensity: c.priority === 'high' ? 1.0 : c.priority === 'medium' ? 0.6 : 0.3
            }));

        res.json({
            success: true,
            count: heatData.length,
            data: heatData
        });
    } catch (error) {
        console.error('Error fetching heatmap data:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching heatmap data'
        });
    }
};
