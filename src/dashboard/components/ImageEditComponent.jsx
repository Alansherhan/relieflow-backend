import React, { useState, useEffect } from 'react';
import { Box, Input, Label } from '@adminjs/design-system';

const ImageEditComponent = (props) => {
    const { property, record, onChange } = props;
    const value = record.params[property.name] || '';
    const [imageUrl, setImageUrl] = useState(value);

    // Update local state if record changes from outside (e.g. reload)
    useEffect(() => {
        setImageUrl(record.params[property.name] || '');
    }, [record.params[property.name]]);

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setImageUrl(newValue);
        onChange(property.name, newValue);
    };

    return (
        <Box marginBottom="xxl">
            <Label htmlFor={property.name}>{property.label}</Label>
            {imageUrl && (
                <Box marginBottom="default">
                    <img
                        src={imageUrl}
                        alt="Preview"
                        style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', display: 'block', marginBottom: '8px', border: '1px solid #ddd', padding: '4px' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                </Box>
            )}
            <Input
                id={property.name}
                name={property.name}
                value={imageUrl}
                onChange={handleInputChange}
                width={1}
            />
        </Box>
    );
};

export default ImageEditComponent;
