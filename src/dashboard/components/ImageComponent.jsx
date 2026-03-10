import React, { useState } from 'react';
import { Box } from '@adminjs/design-system';

const ImageComponent = (props) => {
    const { record, property } = props;
    const rawImageUrl = record.params[property.name];
    const [hasError, setHasError] = useState(false);

    if (!rawImageUrl) {
        return <Box><span style={{ color: '#999', fontSize: '12px' }}>No image</span></Box>;
    }

    // Normalize URL: ensure it starts with '/' for server-relative paths
    const imageUrl = rawImageUrl.startsWith('/') || rawImageUrl.startsWith('http') 
        ? rawImageUrl 
        : `/${rawImageUrl}`;

    if (hasError) {
        return (
            <Box>
                <span style={{ color: '#dc3545', fontSize: '11px' }}>
                    Image not found
                </span>
            </Box>
        );
    }

    return (
        <Box>
            <img
                src={imageUrl}
                alt={property.label}
                style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                onError={() => setHasError(true)}
            />
        </Box>
    );
};

export default ImageComponent;
