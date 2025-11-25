import React, { useEffect, useState } from 'react';
import { ApiClient } from 'adminjs';
import { FormGroup, Label, Select, FormMessage } from '@adminjs/design-system';

const api = new ApiClient();

const VolunteerFilteredSelect = ({ property, record, onChange }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteers = async () => {
      setLoading(true);
      const response = await api.resourceAction({
        resourceId: 'userProfile',
        actionName: 'list',
        params: { 'filters.role': 'volunteer' },
      });
      if (response.data && response.data.records) {
        console.log('mapping ', response.data.records)
        setVolunteers(response.data.records.map(v => ({
          value: v.id,
          label: v.params.name,
        })));
      }
      setLoading(false);
    };
    fetchVolunteers();
  }, []);

  const handleChange = selected => {
    onChange(property.name, selected ? selected.value : '');
  };

  const selectedOption = volunteers.find(opt => opt.value === record.params[property.name]) || null;

  return (
    <FormGroup mb={56}>
      <Label required>{'Select Volunteer'}</Label>
      <Select
        options={volunteers}
        value={selectedOption}
        isLoading={loading}
        onChange={handleChange}
        isClearable
        placeholder="Select volunteer…"
      />
      {property.description && (
        <FormMessage>{property.description}</FormMessage>
      )}
    </FormGroup>
  );
};

export default VolunteerFilteredSelect;
