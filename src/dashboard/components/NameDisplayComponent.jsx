import React from 'react';

/**
 * Name display component for AdminJS that handles proper name formatting
 * Used for user names, task names, and other title fields
 */
const NameDisplayComponent = (props) => {
  const { record, property, maxWidth = 200 } = props;
  
  const value = record.params[property.path];
  
  if (!value) return <span style={{ color: '#999', fontStyle: 'italic' }}>No name</span>;
  
  const name = String(value).trim();
  
  return (
    <div 
      style={{
        maxWidth: `${maxWidth}px`,
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        lineHeight: '1.3',
        fontWeight: '500',
        fontSize: '14px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical'
      }}
      title={name}
    >
      {name}
    </div>
  );
};

/**
 * Address display component for AdminJS that formats addresses properly
 * Used for displaying addresses in a compact, readable format
 */
export const AddressDisplayComponent = (props) => {
  const { record, property } = props;
  
  const value = record.params[property.path];
  
  if (!value) return <span style={{ color: '#999', fontStyle: 'italic' }}>No address</span>;
  
  const address = typeof value === 'string' ? value : 
    [value.addressLine1, value.addressLine2, value.addressLine3]
      .filter(Boolean)
      .join(', ');
  
  return (
    <div 
      style={{
        maxWidth: '250px',
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        lineHeight: '1.3',
        fontSize: '13px',
        color: '#666',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical'
      }}
      title={address}
    >
      {address}
    </div>
  );
};

export default NameDisplayComponent;