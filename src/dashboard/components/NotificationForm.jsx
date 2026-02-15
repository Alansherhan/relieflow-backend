import React, { useState, useEffect, useRef } from 'react';
import { Box, Label, Input, TextArea, Select, FormGroup, FormMessage, Button, Icon } from '@adminjs/design-system';
import { ApiClient, useRecord } from 'adminjs';

const api = new ApiClient();

const NotificationForm = (props) => {
    const { record: initialRecord, resource, action } = props;
    const { record, handleChange, submit } = useRecord(initialRecord, resource.id);

    // Delivery mode: 'broadcast' or 'targeted'
    const [deliveryMode, setDeliveryMode] = useState('broadcast');
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    // Notification types
    const notificationTypes = [
        { value: 'admin_broadcast', label: '📢 Announcement' },
        { value: 'weather_alert', label: '⛈️ Weather Alert' },
        { value: 'disaster_alert', label: '🚨 Disaster Alert' },
        { value: 'relief_center_update', label: '📍 Relief Center Update' },
        { value: 'system_notification', label: '🔧 System Notice' },
    ];

    // Audience options (for broadcast mode)
    const audienceOptions = [
        { value: 'all', label: '👥 Everyone (Public + Volunteers)' },
        { value: 'public', label: '🏠 Public Users Only' },
        { value: 'volunteer', label: '🙋 Volunteers Only' },
    ];

    // Load users for the dropdown (fetching more records)
    useEffect(() => {
        const loadUsers = async () => {
            setLoadingUsers(true);
            try {
                // Fetch up to 500 users to ensure we get both public and volunteers
                // In production, this should be a search, but for now increasing limit helps
                const response = await api.resourceAction({
                    resourceId: 'userProfile',
                    actionName: 'list',
                    query: { perPage: 500 }
                });
                if (response.data.records) {
                    setUsers(response.data.records.map(r => ({
                        value: r.id,
                        label: `${r.params.name} (${r.params.role})`, // Simplified label
                    })));
                }
            } catch (error) {
                console.error('Failed to load users:', error);
            }
            setLoadingUsers(false);
        };
        loadUsers();
    }, []);

    // Track if we've initialized defaults
    const initializedRef = useRef(false);

    // Initialize default values - ensure state is set before first render cycle completes
    useEffect(() => {
        if (initializedRef.current) return;
        
        const needsTypeDefault = !record.params.type;
        const needsTargetDefault = !record.params.targetUserType;
        
        if (needsTypeDefault || needsTargetDefault) {
            handleChange({ 
                params: { 
                    ...record.params, 
                    type: record.params.type || 'admin_broadcast',
                    targetUserType: record.params.targetUserType || 'all'
                } 
            });
        }
        initializedRef.current = true;
    }, [record.params, handleChange]);

    // Handle delivery mode change
    const handleDeliveryModeChange = (mode) => {
        setDeliveryMode(mode);
        if (mode === 'broadcast') {
            // Broadcast mode: Clear recipient, ensure targetUserType is set from dropdown (or default to all)
            const currentAudience = record.params.targetUserType === 'all' || record.params.targetUserType === 'public' || record.params.targetUserType === 'volunteer'
                ? record.params.targetUserType
                : 'all';

            handleChange({ params: { ...record.params, recipientId: null, targetUserType: currentAudience } });
        } else {
            // Targeted mode: Force targetUserType to 'all' so query logic works (recipientId takes precedence)
            handleChange({ params: { ...record.params, targetUserType: 'all' } });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});

        // Validation
        const newErrors = {};
        if (!record.params.title?.trim()) {
            newErrors.title = 'Title is required';
        } else if (!/^[A-Za-z\s!.,:\-]+$/.test(record.params.title.trim())) {
            newErrors.title = 'Title must contain only letters, spaces, and basic punctuation (no numbers)';
        }
        if (!record.params.body?.trim()) {
            newErrors.body = 'Message is required';
        }
        if (!record.params.type) {
            newErrors.type = 'Please select a notification type';
        }
        if (deliveryMode === 'targeted' && !record.params.recipientId) {
            newErrors.recipientId = 'Please select a user for targeted notification';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setSaving(false);
            return;
        }

        try {
            const response = await submit();
            if (response.data.redirectUrl) {
                window.location.href = response.data.redirectUrl;
            }
        } catch (error) {
            console.error('Failed to save notification:', error);
            setErrors({ general: 'Failed to save notification. Please try again.' });
        }
        setSaving(false);
    };

    // Styles
    const styles = {
        container: {
            width: '100%',
        },
        header: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            color: 'white',
        },
        headerTitle: {
            margin: 0,
            marginBottom: '8px',
            fontSize: '24px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        headerSubtitle: {
            margin: 0,
            opacity: 0.9,
            fontSize: '14px',
        },
        section: {
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #eee',
        },
        sectionTitle: {
            fontSize: '16px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        toggleContainer: {
            display: 'flex',
            gap: '12px',
            marginTop: '12px',
        },
        toggleButton: (isActive) => ({
            flex: 1,
            padding: '16px 20px',
            border: isActive ? '2px solid #667eea' : '2px solid #e0e0e0',
            borderRadius: '10px',
            background: isActive ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
            color: isActive ? 'white' : '#666',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: '500',
            fontSize: '14px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
        }),
        toggleIcon: {
            fontSize: '24px',
        },
        submitButton: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            padding: '14px 32px',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '600',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        },
        errorBox: {
            background: '#fff5f5',
            border: '1px solid #feb2b2',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '20px',
            color: '#c53030',
        },
        hint: {
            fontSize: '13px',
            color: '#888',
            marginTop: '8px',
        },
        label: {
            fontWeight: '500',
            color: '#444',
            marginBottom: '8px',
            display: 'block',
        },
        required: {
            color: '#e53e3e',
            marginLeft: '4px',
        },
        fullWidthInput: {
            width: '100%',
            borderRadius: '8px',
        },
    };

    return (
        <Box as="form" onSubmit={handleSubmit} style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h2 style={styles.headerTitle}>
                    <span>📬</span> Create Notification
                </h2>
                <p style={styles.headerSubtitle}>
                    Send announcements, alerts, or updates to your users
                </p>
            </div>

            {errors.general && (
                <div style={styles.errorBox}>
                    ⚠️ {errors.general}
                </div>
            )}

            {/* Content Section */}
            <div style={styles.section}>
                <div style={styles.sectionTitle}>
                    <span>✏️</span> Notification Content
                </div>

                {/* Title */}
                <FormGroup error={errors.title} mb="xl">
                    <label style={styles.label}>
                        Notification Title <span style={styles.required}>*</span>
                    </label>
                    <Input
                        value={record.params.title || ''}
                        onChange={(e) => handleChange({ params: { ...record.params, title: e.target.value } })}
                        placeholder="Enter a short, attention-grabbing headline"
                        style={{ borderRadius: '8px', width: '100%' }}
                    />
                    {errors.title && <FormMessage>{errors.title}</FormMessage>}
                </FormGroup>

                {/* Message */}
                <FormGroup error={errors.body} mb="xl">
                    <label style={styles.label}>
                        Message <span style={styles.required}>*</span>
                    </label>
                    <TextArea
                        value={record.params.body || ''}
                        onChange={(e) => handleChange({ params: { ...record.params, body: e.target.value } })}
                        placeholder="Enter the detailed notification content"
                        rows={5}
                        style={{ borderRadius: '8px', width: '100%', minHeight: '120px' }}
                    />
                    {errors.body && <FormMessage>{errors.body}</FormMessage>}
                </FormGroup>

                {/* Notification Type */}
                <FormGroup error={errors.type}>
                    <label style={styles.label}>
                        Notification Type <span style={styles.required}>*</span>
                    </label>
                    <Select
                        value={notificationTypes.find(t => t.value === record.params.type) || null}
                        options={notificationTypes}
                        onChange={(selected) => handleChange({ params: { ...record.params, type: selected?.value } })}
                        placeholder="Select notification type..."
                    />
                    {errors.type && <FormMessage>{errors.type}</FormMessage>}
                </FormGroup>
            </div>

            {/* Delivery Section */}
            <div style={styles.section}>
                <div style={styles.sectionTitle}>
                    <span>📤</span> Delivery Options
                </div>

                <label style={styles.label}>Who should receive this notification?</label>

                <div style={styles.toggleContainer}>
                    <button
                        type="button"
                        style={styles.toggleButton(deliveryMode === 'broadcast')}
                        onClick={() => handleDeliveryModeChange('broadcast')}
                    >
                        <span style={styles.toggleIcon}>📢</span>
                        <span>Broadcast to Audience</span>
                        <span style={{ fontSize: '12px', opacity: 0.8 }}>Send to a group of users</span>
                    </button>
                    <button
                        type="button"
                        style={styles.toggleButton(deliveryMode === 'targeted')}
                        onClick={() => handleDeliveryModeChange('targeted')}
                    >
                        <span style={styles.toggleIcon}>🎯</span>
                        <span>Send to Specific User</span>
                        <span style={{ fontSize: '12px', opacity: 0.8 }}>Send to one person only</span>
                    </button>
                </div>

                {/* Conditional: Audience or User Picker */}
                <Box mt="xl">
                    {deliveryMode === 'broadcast' ? (
                        <FormGroup>
                            <label style={styles.label}>Select Audience</label>
                            <Select
                                value={audienceOptions.find(a => a.value === record.params.targetUserType) || null}
                                options={audienceOptions}
                                onChange={(selected) => handleChange({ params: { ...record.params, targetUserType: selected?.value, recipientId: null } })}
                                placeholder="Select audience..."
                            />
                            <p style={styles.hint}>
                                ℹ️ This notification will be sent to all users in the selected audience.
                            </p>
                        </FormGroup>
                    ) : (
                        <FormGroup error={errors.recipientId}>
                            <label style={styles.label}>
                                Select User <span style={styles.required}>*</span>
                            </label>
                            <Select
                                value={users.find(u => u.value === record.params.recipientId)}
                                options={users}
                                isLoading={loadingUsers}
                                onChange={(selected) => handleChange({ params: { ...record.params, recipientId: selected?.value, targetUserType: 'all' } })}
                                placeholder="Search and select a user..."
                                isClearable
                            />
                            {errors.recipientId && <FormMessage>{errors.recipientId}</FormMessage>}
                            <p style={styles.hint}>
                                ℹ️ This notification will be sent only to the selected user.
                            </p>
                        </FormGroup>
                    )}
                </Box>
            </div>

            {/* Submit Button */}
            <Box mt="xl" mb="xl">
                <button
                    type="submit"
                    style={{
                        ...styles.submitButton,
                        opacity: saving ? 0.7 : 1,
                        cursor: saving ? 'not-allowed' : 'pointer',
                    }}
                    disabled={saving}
                >
                    {saving ? (
                        <>⏳ Sending...</>
                    ) : (
                        <>📤 Send Notification</>
                    )}
                </button>
            </Box>
        </Box>
    );
};

export default NotificationForm;
