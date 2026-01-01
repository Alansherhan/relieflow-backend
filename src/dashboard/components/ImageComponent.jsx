import React from 'react';
import { Box } from '@adminjs/design-system';

const ImageComponent = (props) => {
    const { record, property } = props;
    const imageUrl = record.params[property.name];

    if (!imageUrl) {
        return null;
    }

    return (
        <Box>
            <img
                src={imageUrl}
                alt={property.label}
                style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
            />
        </Box>
    );
};

export default ImageComponent;
