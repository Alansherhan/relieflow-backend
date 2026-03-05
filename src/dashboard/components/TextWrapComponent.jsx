import React from 'react';

/**
 * Simple text wrapper component for AdminJS that shows text in a single line
 */
const TextWrapComponent = (props) => {
  const { record, property } = props;
  const value = record.params[property.path];
  
  if (!value) return <span>-</span>;
  
  return (
    <div 
      style={{
        maxWidth: '400px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '14px',
        padding: '4px 0'
      }}
      title={value}
    >
      {value}
    </div>
  );
};

export default TextWrapComponent;