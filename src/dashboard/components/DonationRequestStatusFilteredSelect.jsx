import React, { useEffect, useState } from 'react';
import { ApiClient } from 'adminjs';
import { FormGroup, Label, Select, FormMessage } from '@adminjs/design-system';

const api = new ApiClient();

const DonationRequestStatusFilteredSelect = ({ property, record, onChange }) => {
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      const response = await api.resourceAction({
        resourceId: 'DonationRequest',
        actionName: 'list',
        params: { 'filters.status': 'accepted' },
      });
      console.log('logogdgd', response)
      if (response.data && response.data.records) {
        console.log('mapping ', response.data.records)
        setStatus(response.data.records.map(v => {
          console.log("record", v.params)
          return ({
            value: v.id,
            label: v.params.name
          });
        }));
      }
      setLoading(false);
    };
    fetchStatus();
  }, []);

  const handleChange = selected => {
    onChange(property.name, selected ? selected.value : '');
  };

  const selectedOption = status.find(opt => opt.value === record.params[property.name]) || null;

  return (
    <FormGroup mb={56}>
      <Label required>{'Select Donation Request'}</Label>
      <Select
        options={status}
        value={selectedOption}
        isLoading={loading}
        onChange={handleChange}
        isClearable
        placeholder="Select Donation Request"
      />
      {property.description && (
        <FormMessage>{property.description}</FormMessage>
      )}
    </FormGroup>
  );
};

export default DonationRequestStatusFilteredSelect;
