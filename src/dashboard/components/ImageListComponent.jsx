import React from 'react';
import { Box } from '@adminjs/design-system';

const ImageListComponent = (props) => {
    const { record, property } = props;

    const images = [];
    // Check for flattened keys like 'proofImages.0', 'proofImages.1', etc.
    Object.keys(record.params).forEach(key => {
        // Check if key starts with property name and follows with .index
        if (key.startsWith(`${property.name}.`) && !isNaN(key.split('.').pop())) {
            images.push(record.params[key]);
        }
    });

    if (images.length === 0) {
        return null;
    }

    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
            {images.map((url, index) => (
                <img
                    key={index}
                    src={url}
                    alt={`${property.label}-${index}`}
                    style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                />
            ))}
        </Box>
    );
};

export default ImageListComponent;
