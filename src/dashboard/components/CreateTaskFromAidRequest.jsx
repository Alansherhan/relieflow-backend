import React, { useState, useEffect } from 'react';
import { ApiClient, useRecord, useNotice } from 'adminjs';
import {
    Box,
    H3,
    Label,
    Input,
    Select,
    Button,
    FormGroup,
    CheckBox,
    Text,
    Loader,
    MessageBox,
} from '@adminjs/design-system';

const api = new ApiClient();
// Use empty string for relative URL since AdminJS runs on the same server
const BASE_URL = '';

const CreateTaskFromAidRequest = (props) => {
    const { record, resource } = props;
    const addNotice = useNotice();

    const [loading, setLoading] = useState(false);
    const [volunteers, setVolunteers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        taskName: record?.params?.name || 'Aid Request Task',
        volunteersNeeded: 1,
        isOpen: true,
        priority: record?.params?.priority || 'medium',
        selectedVolunteers: [],
    });
    const [hasExistingTask, setHasExistingTask] = useState(false);

    // Check if task already exists for this aid request
    useEffect(() => {
        const checkExistingTask = async () => {
            try {
                const response = await api.resourceAction({
                    resourceId: 'TaskSchema',
                    actionName: 'list',
                    params: { 'filters.aidRequest': record.id },
                });
                if (response.data?.records?.length > 0) {
                    setHasExistingTask(true);
                }
            } catch (error) {
                console.error('Error checking existing task:', error);
            }
        };
        checkExistingTask();
    }, [record.id]);

    // Fetch volunteers
    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                const response = await api.resourceAction({
                    resourceId: 'userProfile',
                    actionName: 'list',
                    params: {
                        'filters.role': 'volunteer',
                        perPage: 100,
                        ...(searchQuery && { 'filters.name': searchQuery }),
                    },
                });
                if (response.data?.records) {
                    setVolunteers(
                        response.data.records.map((v) => ({
                            value: v.id,
                            label: `${v.params.name} (${v.params.skill || 'No skill'})`,
                        }))
                    );
                }
            } catch (error) {
                console.error('Error fetching volunteers:', error);
            }
        };
        fetchVolunteers();
    }, [searchQuery]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(
                `${BASE_URL}/api/admin/task/create-from-aid-request/${record.id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        taskName: formData.taskName,
                        volunteersNeeded: formData.volunteersNeeded,
                        isOpen: formData.isOpen,
                        priority: formData.priority,
                        assignedVolunteers: formData.isOpen ? [] : formData.selectedVolunteers,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                addNotice({
                    message: 'Task created successfully!',
                    type: 'success',
                });
                // Redirect back to the aid request list
                window.location.href = '/dashboard/resources/AidRequest';
            } else {
                addNotice({
                    message: data.message || 'Failed to create task',
                    type: 'error',
                });
            }
        } catch (error) {
            console.error('Error creating task:', error);
            addNotice({
                message: 'Error creating task. Please try again.',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleVolunteerSelect = (selected) => {
        if (selected) {
            const newVolunteers = Array.isArray(selected)
                ? selected.map((s) => s.value).slice(0, formData.volunteersNeeded)
                : [selected.value];
            setFormData((prev) => ({
                ...prev,
                selectedVolunteers: newVolunteers,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                selectedVolunteers: [],
            }));
        }
    };

    if (hasExistingTask) {
        return (
            <Box variant="grey" padding="xl">
                <MessageBox variant="danger" message="A task already exists for this aid request." />
                <Box marginTop="lg">
                    <Button
                        variant="primary"
                        onClick={() => (window.location.href = '/dashboard/resources/AidRequest')}
                    >
                        Back to Aid Requests
                    </Button>
                </Box>
            </Box>
        );
    }

    return (
        <Box variant="grey" padding="xl">
            <H3>Create Task from Aid Request</H3>
            <Text marginBottom="lg">
                Creating task for: <strong>{record?.params?.name || 'Unknown Request'}</strong>
            </Text>

            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Task Name</Label>
                    <Input
                        value={formData.taskName}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, taskName: e.target.value }))
                        }
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Priority</Label>
                    <Select
                        value={{ value: formData.priority, label: formData.priority }}
                        options={[
                            { value: 'high', label: 'High' },
                            { value: 'medium', label: 'Medium' },
                            { value: 'low', label: 'Low' },
                        ]}
                        onChange={(selected) =>
                            setFormData((prev) => ({ ...prev, priority: selected.value }))
                        }
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Volunteers Needed</Label>
                    <Input
                        type="number"
                        min="1"
                        value={formData.volunteersNeeded}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                volunteersNeeded: parseInt(e.target.value, 10) || 1,
                            }))
                        }
                    />
                </FormGroup>

                <FormGroup>
                    <CheckBox
                        id="isOpen"
                        checked={formData.isOpen}
                        onChange={() =>
                            setFormData((prev) => ({ ...prev, isOpen: !prev.isOpen }))
                        }
                    />
                    <Label inline htmlFor="isOpen" marginLeft="default">
                        Open Task (volunteers can claim from marketplace)
                    </Label>
                </FormGroup>

                {!formData.isOpen && (
                    <FormGroup>
                        <Label>
                            Assign Volunteers {formData.volunteersNeeded > 1 && `(max ${formData.volunteersNeeded})`}
                        </Label>
                        <Select
                            isMulti={formData.volunteersNeeded > 1}
                            isSearchable
                            options={volunteers}
                            value={volunteers.filter(v => formData.selectedVolunteers.includes(v.value))}
                            onChange={(selected) => {
                                if (!selected) {
                                    setFormData(prev => ({ ...prev, selectedVolunteers: [] }));
                                    return;
                                }
                                const newValues = Array.isArray(selected)
                                    ? selected.slice(0, formData.volunteersNeeded).map(s => s.value)
                                    : [selected.value];
                                setFormData(prev => ({ ...prev, selectedVolunteers: newValues }));
                            }}
                            placeholder={formData.volunteersNeeded > 1
                                ? `Select up to ${formData.volunteersNeeded} volunteers...`
                                : "Select a volunteer..."}
                        />
                        {formData.selectedVolunteers.length > 0 && (
                            <Text marginTop="sm" color="grey60">
                                Selected: {formData.selectedVolunteers.length}/{formData.volunteersNeeded}
                            </Text>
                        )}
                    </FormGroup>
                )}

                <Box marginTop="xl">
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? <Loader /> : 'Create Task'}
                    </Button>
                    <Button
                        type="button"
                        variant="default"
                        marginLeft="default"
                        onClick={() => (window.location.href = '/dashboard/resources/AidRequest')}
                    >
                        Cancel
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default CreateTaskFromAidRequest;
