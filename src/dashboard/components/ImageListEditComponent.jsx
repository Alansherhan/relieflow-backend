import React, { useState, useEffect } from 'react';
import { Box, Label, Input, Button, Icon } from '@adminjs/design-system';

const ImageListEditComponent = (props) => {
    const { property, record, onChange } = props;

    // Flattened params are stored like 'proofImages.0': 'url1', 'proofImages.1': 'url2'
    // We need to reconstruct the array
    const getImages = () => {
        const images = [];
        Object.keys(record.params).forEach(key => {
            if (key.startsWith(`${property.name}.`) && !isNaN(key.split('.').pop())) {
                const index = parseInt(key.split('.').pop(), 10);
                images[index] = record.params[key];
            }
        });
        // Filter out empty slots if any hole exists, though normally adminjs handles sequential keys
        return images.filter(img => img !== undefined);
    };

    const [images, setImages] = useState(getImages());

    // Helper to notify AdminJS of changes
    // AdminJS expects flat keys for arrays: 'property.0', 'property.1'
    const updateRecord = (newImages) => {
        setImages(newImages);

        // 1. Clear existing keys for this property
        // We can't really "delete" keys easily via onChange in the standard way without potentially leaving garbage,
        // but standard adminjs handling expects us to overwrite.
        // However, the cleanest way to sync an array is to update each index.

        // Ideally we should nullify old keys if array shrinks, but standard behavior might just handle what we send.
        // A safer bet is to rely on AdminJS's internal handling if we were passing the whole object, 
        // but here we are a component.

        // We will just update 'property.0', 'property.1' etc.
        // And ideally we might need to clear 'property.2' if we went from 3 items to 2.
        // To properly "clear" we might need to set it to null or undefined.

        // Strategy: Update all current indices. 
        // If the array shrank, we can try setting the next index to null/undefined to see if backend handles it,
        // or just rely on the fact that we are rewriting the params.

        // Actually, onChange expects (key, value).
        // We need to update multiple keys. AdminJS `onChange` might not support batch updates easily depending on version.
        // But usually it's `onChange(property, value)` where value is the full value? 
        // No, for array properties, AdminJS often treats them essentially as individual fields if flattened.

        // WAIT: If we use a custom component for the *entire array property*, `onChange` might accept the array itself
        // if the backend adapter supports it. But AdminJS often flattens.

        // Let's check how standard array editing works.
        // If we look at existing `ImageListComponent`, it reads from `record.params`.

        // Let's try sending the array to `onChange(property.name, newImages)`.
        // Many AdminJS adapters (like Mongoose) handle the array if passed as a value to the main property key.
        onChange(property.name, newImages);
    };

    const handleAdd = () => {
        updateRecord([...images, '']);
    };

    const handleRemove = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        updateRecord(newImages);
    };

    const handleChange = (index, value) => {
        const newImages = [...images];
        newImages[index] = value;
        updateRecord(newImages);
    };

    return (
        <Box marginBottom="xxl">
            <Label>{property.label}</Label>
            {images.map((url, index) => (
                <Box key={index} marginBottom="default" display="flex" alignItems="center">
                    <Box marginRight="default" >
                        {url && <img
                            src={url}
                            alt={`Image ${index + 1}`}
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />}
                    </Box>
                    <Box flexGrow={1} marginRight="default">
                        <Input
                            value={url}
                            onChange={(e) => handleChange(index, e.target.value)}
                            width={1}
                            placeholder="Image URL"
                        />
                    </Box>
                    <Button onClick={() => handleRemove(index)} variant="danger" size="icon">
                        <Icon icon="Trash2" />
                    </Button>
                </Box>
            ))}
            <Button onClick={handleAdd} type="button">
                <Icon icon="Plus" /> Add Image URL
            </Button>
        </Box>
    );
};

export default ImageListEditComponent;
