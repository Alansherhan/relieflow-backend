import React from 'react';

/**
 * Description component for AdminJS that shows wrapped text with multiple lines
 */
const DescriptionComponent = (props) => {
  const { record, property } = props;
  const value = record.params[property.path];
  
  if (!value) return <span>-</span>;
  
  return (
    <div 
      style={{
        maxWidth: '300px',
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        lineHeight: '1.4',
        fontSize: '13px',
        padding: '4px 0',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical'
      }}
      title={value}
    >
      {value}
    </div>
  );
};

export default DescriptionComponent;