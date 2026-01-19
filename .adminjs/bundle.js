(function (React, designSystem, adminjs) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  const Dashboard = () => {
    const [currentAdmin] = adminjs.useCurrentAdmin();
    const [stats, setStats] = React.useState({
      aidRequests: 0,
      donations: 0,
      tasks: 0,
      users: 0
    });
    React.useEffect(() => {
      // Fetch statistics from your API
      const fetchStats = async () => {
        try {
          const api = new adminjs.ApiClient();
          // You can make API calls here to get real stats
          // For now, using placeholder data
          setStats({
            aidRequests: 45,
            donations: 128,
            tasks: 23,
            users: 350
          });
        } catch (error) {
          console.error('Error fetching stats:', error);
        }
      };
      fetchStats();
    }, []);
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xxl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, null, "Welcome to Relief Management System"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "default"
    }, "Hello ", currentAdmin?.email || 'Admin', "! Here's your dashboard overview.")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      flexWrap: "wrap",
      gap: "default"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: "1",
      minWidth: "200px",
      bg: "primary100",
      p: "xl",
      borderRadius: "default",
      boxShadow: "card"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "default"
    }, "Aid Requests"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontSize: "xxl",
      fontWeight: "bold"
    }, stats.aidRequests), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      color: "grey60"
    }, "Active requests")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: "1",
      minWidth: "200px",
      bg: "success",
      p: "xl",
      borderRadius: "default",
      boxShadow: "card"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "default",
      color: "white"
    }, "Donations"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontSize: "xxl",
      fontWeight: "bold",
      color: "white"
    }, stats.donations), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      color: "white"
    }, "Total donations received")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: "1",
      minWidth: "200px",
      bg: "info",
      p: "xl",
      borderRadius: "default",
      boxShadow: "card"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "default",
      color: "white"
    }, "Active Tasks"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontSize: "xxl",
      fontWeight: "bold",
      color: "white"
    }, stats.tasks), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      color: "white"
    }, "Pending tasks")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: "1",
      minWidth: "200px",
      bg: "accent",
      p: "xl",
      borderRadius: "default",
      boxShadow: "card"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "default",
      color: "white"
    }, "Users"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontSize: "xxl",
      fontWeight: "bold",
      color: "white"
    }, stats.users), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      color: "white"
    }, "Registered users"))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "xxl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "default"
    }, "Quick Actions"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      gap: "default",
      flexWrap: "wrap"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "a",
      href: "/dashboard/resources/AidRequest",
      bg: "white",
      p: "lg",
      borderRadius: "default",
      border: "default",
      style: {
        textDecoration: 'none',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold",
      color: "primary100"
    }, "\uD83D\uDCCB View Aid Requests")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "a",
      href: "/dashboard/resources/Donation",
      bg: "white",
      p: "lg",
      borderRadius: "default",
      border: "default",
      style: {
        textDecoration: 'none',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold",
      color: "primary100"
    }, "\uD83D\uDCB0 Manage Donations")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "a",
      href: "/dashboard/resources/TaskSchema",
      bg: "white",
      p: "lg",
      borderRadius: "default",
      border: "default",
      style: {
        textDecoration: 'none',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold",
      color: "primary100"
    }, "\u2705 View Tasks")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "a",
      href: "/dashboard/resources/ReliefCenter",
      bg: "white",
      p: "lg",
      borderRadius: "default",
      border: "default",
      style: {
        textDecoration: 'none',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold",
      color: "primary100"
    }, "\uD83C\uDFE2 Relief Centers")))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "xxl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "default"
    }, "System Status"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      bg: "white",
      p: "lg",
      borderRadius: "default",
      border: "default"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "\u2705 All systems operational"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      color: "grey60"
    }, "Last updated: ", new Date().toLocaleString()))));
  };

  const LinkComponent = props => {
    const {
      record,
      property
    } = props;

    // Try to get coordinates from the direct property first (e.g., 'location')
    // Fallback to 'address.location' for other resources if needed
    // Note: In AdminJS list view, flattening might be "location.coordinates.0"
    const lat = record.params[`${property.name}.coordinates.1`] || record.params["address.location.coordinates.1"];
    const long = record.params[`${property.name}.coordinates.0`] || record.params["address.location.coordinates.0"];

    // If no coordinates, return null or empty
    if (!lat || !long) {
      return null;
    }

    // Attempt to construct an address string from the record
    // Logic: address.addressLine1, address.addressLine2, address.city, etc.
    // Note: AdminJS likely flattens these to `address.addressLine1`
    const addressParts = [record.params['address.addressLine1'], record.params['address.addressLine2'], record.params['address.addressLine3'], record.params['address.pinCode']
    // Add other address fields if they exist in your schema, e.g. state, city
    ].filter(part => part && part.toString().trim() !== '');
    let query = '';
    if (addressParts.length > 0) {
      query = encodeURIComponent(addressParts.join(', '));
    } else {
      query = `${lat},${long}`;
    }

    // query param works for both search terms (address) and coordinates
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${query}`;
    return /*#__PURE__*/React__default.default.createElement("a", {
      href: mapsLink,
      target: "_blank",
      rel: "noopener noreferrer"
    }, "View Location");
  };

  const api$3 = new adminjs.ApiClient();
  const VolunteerFilteredSelect = ({
    property,
    record,
    onChange
  }) => {
    const [volunteers, setVolunteers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
      const fetchVolunteers = async () => {
        setLoading(true);
        const response = await api$3.resourceAction({
          resourceId: 'userProfile',
          actionName: 'list',
          params: {
            'filters.role': 'volunteer',
            perPage: 1000
          }
        });
        if (response.data && response.data.records) {
          console.log('mapping ', response.data.records);
          setVolunteers(response.data.records.map(v => ({
            value: v.id,
            label: v.params.name
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
    return /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, {
      mb: 56
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, 'Select Volunteer'), /*#__PURE__*/React__default.default.createElement(designSystem.Select, {
      options: volunteers,
      value: selectedOption,
      isLoading: loading,
      onChange: handleChange,
      isClearable: true,
      placeholder: "Select volunteer\u2026"
    }), property.description && /*#__PURE__*/React__default.default.createElement(designSystem.FormMessage, null, property.description));
  };

  const api$2 = new adminjs.ApiClient();
  const StatusFilteredSelect = ({
    property,
    record,
    onChange
  }) => {
    const [status, setStatus] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
      const fetchStatus = async () => {
        setLoading(true);
        const response = await api$2.resourceAction({
          resourceId: 'AidRequest',
          actionName: 'list',
          params: {
            'filters.status': 'rejected',
            perPage: 1000
          }
        });
        console.log('logogdgd', response);
        if (response.data && response.data.records) {
          console.log('mapping ', response.data.records);
          setStatus(response.data.records.map(v => {
            console.log("record", v.params);
            return {
              value: v.id,
              // label: `${v.params["address.addressLine1"]} - ${v.params["donationType"]}`
              label: v.params.name
            };
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
    return /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, {
      mb: 56
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, 'Select Aid Request'), /*#__PURE__*/React__default.default.createElement(designSystem.Select, {
      options: status,
      value: selectedOption,
      isLoading: loading,
      onChange: handleChange,
      isClearable: true,
      placeholder: "Select Aid Request"
    }), property.description && /*#__PURE__*/React__default.default.createElement(designSystem.FormMessage, null, property.description));
  };

  const api$1 = new adminjs.ApiClient();
  const DonationRequestStatusFilteredSelect = ({
    property,
    record,
    onChange
  }) => {
    const [status, setStatus] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
      const fetchStatus = async () => {
        setLoading(true);
        const response = await api$1.resourceAction({
          resourceId: 'DonationRequest',
          actionName: 'list',
          params: {
            'filters.status': 'accepted',
            perPage: 1000
          }
        });
        console.log('logogdgd', response);
        if (response.data && response.data.records) {
          console.log('mapping ', response.data.records);
          setStatus(response.data.records.map(v => {
            console.log("record", v.params);
            return {
              value: v.id,
              label: v.params.name
            };
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
    return /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, {
      mb: 56
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, 'Select Donation Request'), /*#__PURE__*/React__default.default.createElement(designSystem.Select, {
      options: status,
      value: selectedOption,
      isLoading: loading,
      onChange: handleChange,
      isClearable: true,
      placeholder: "Select Donation Request"
    }), property.description && /*#__PURE__*/React__default.default.createElement(designSystem.FormMessage, null, property.description));
  };

  const LoginComponent = props => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const {
      translateMessage
    } = adminjs.useTranslation();
    const handleSubmit = async e => {
      e.preventDefault();
      setError('');
      setLoading(true);
      try {
        const response = await fetch('/dashboard/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          }),
          credentials: 'same-origin'
        });
        const data = await response.json();
        if (response.ok) {
          window.location.href = data.redirectUrl || '/dashboard';
        } else {
          setError(data.error || 'Invalid email or password');
        }
      } catch (err) {
        console.error('Login error:', err);
        setError('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      minHeight: "100vh",
      style: {
        fontFamily: 'Inter, system-ui, sans-serif'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: "1",
      display: {
        _: 'none',
        md: 'flex'
      },
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      p: "xxl",
      style: {
        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
        color: 'white'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      textAlign: "center",
      style: {
        maxWidth: '500px'
      }
    }, /*#__PURE__*/React__default.default.createElement("img", {
      src: "/images/logo-white.png",
      alt: "Logo",
      style: {
        maxWidth: '250px',
        marginBottom: '2rem'
      },
      onError: e => {
        e.target.style.display = 'none';
      }
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '1rem'
      }
    }, "Relief Management System"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '1.125rem',
        opacity: 0.9
      }
    }, "Coordinating disaster relief efforts with efficiency and compassion"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      style: {
        gap: '2rem',
        marginTop: '3rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '2rem',
        fontWeight: 'bold'
      }
    }, "500+"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '0.875rem'
      }
    }, "Aid Requests")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '2rem',
        fontWeight: 'bold'
      }
    }, "1200+"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '0.875rem'
      }
    }, "Donations")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '2rem',
        fontWeight: 'bold'
      }
    }, "50+"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '0.875rem'
      }
    }, "Relief Centers"))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      p: "xxl",
      style: {
        backgroundColor: '#f9fafb'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      bg: "white",
      p: "xxl",
      style: {
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        width: '450px',
        maxWidth: '100%'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#111827'
      }
    }, "Sign In"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '1rem',
        color: '#6b7280',
        marginTop: '0.5rem'
      }
    }, "Enter your credentials to access the dashboard")), error && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      p: "default",
      mb: "default",
      style: {
        backgroundColor: '#fef2f2',
        border: '1px solid #fee2e2',
        borderRadius: '0.375rem'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        color: '#dc2626',
        fontSize: '0.875rem'
      }
    }, "\u26A0\uFE0F ", error)), /*#__PURE__*/React__default.default.createElement("form", {
      onSubmit: handleSubmit
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "lg"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      htmlFor: "email",
      required: true
    }, "Email Address"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      id: "email",
      type: "email",
      value: email,
      onChange: e => setEmail(e.target.value),
      placeholder: "admin@example.com",
      required: true,
      disabled: loading,
      style: {
        width: '100%',
        padding: '12px',
        fontSize: '16px'
      }
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "default"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      htmlFor: "password",
      required: true
    }, "Password"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      id: "password",
      type: showPassword ? 'text' : 'password',
      value: password,
      onChange: e => setPassword(e.target.value),
      placeholder: "Enter your password",
      required: true,
      disabled: loading,
      style: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        paddingRight: '45px'
      }
    }), /*#__PURE__*/React__default.default.createElement("button", {
      type: "button",
      onClick: () => setShowPassword(!showPassword),
      style: {
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#6b7280'
      }
    }, showPassword ? '👁️' : '👁️‍🗨️'))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl",
      style: {
        marginTop: '1rem'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      type: "submit",
      variant: "primary",
      disabled: loading,
      style: {
        width: '100%',
        padding: '14px',
        fontSize: '16px',
        fontWeight: '600',
        background: loading ? '#9ca3af' : '#2563eb',
        cursor: loading ? 'not-allowed' : 'pointer'
      }
    }, loading ? /*#__PURE__*/React__default.default.createElement("span", null, /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        marginRight: '8px'
      }
    }, "\u23F3"), "Signing in...") : 'Sign In'))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        textAlign: 'center',
        marginTop: '1.5rem'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '0.875rem',
        color: '#6b7280'
      }
    }, "Don't have an account?", ' ', /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      as: "span",
      style: {
        color: '#2563eb',
        fontWeight: 'bold',
        cursor: 'pointer'
      }
    }, "Contact Administrator")))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        textAlign: 'center',
        marginTop: '1rem'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '0.75rem',
        color: '#6b7280'
      }
    }, "\xA9 2024 Relief Management System. All rights reserved."))));
  };

  const ImageComponent = props => {
    const {
      record,
      property
    } = props;
    const imageUrl = record.params[property.name];
    if (!imageUrl) {
      return null;
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement("img", {
      src: imageUrl,
      alt: property.label,
      style: {
        maxWidth: '100px',
        maxHeight: '100px',
        objectFit: 'cover'
      }
    }));
  };

  const ImageListComponent = props => {
    const {
      record,
      property
    } = props;
    const images = [];
    // Check for flattened keys like 'proofImages.0', 'proofImages.1', etc.
    Object.keys(record.params).forEach(key => {
      // Check if key starts with property name and follows with .index
      if (key.startsWith(`${property.name}.`) && !isNaN(key.split('.').pop())) {
        images.push(record.params[key]);
      }
    });
    if (images.length === 0) {
      return null;
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 2
    }, images.map((url, index) => /*#__PURE__*/React__default.default.createElement("img", {
      key: index,
      src: url,
      alt: `${property.label}-${index}`,
      style: {
        maxWidth: '100px',
        maxHeight: '100px',
        objectFit: 'cover'
      }
    })));
  };

  const ImageEditComponent = props => {
    const {
      property,
      record,
      onChange
    } = props;
    const value = record.params[property.name] || '';
    const [imageUrl, setImageUrl] = React.useState(value);

    // Update local state if record changes from outside (e.g. reload)
    React.useEffect(() => {
      setImageUrl(record.params[property.name] || '');
    }, [record.params[property.name]]);
    const handleInputChange = event => {
      const newValue = event.target.value;
      setImageUrl(newValue);
      onChange(property.name, newValue);
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      marginBottom: "xxl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      htmlFor: property.name
    }, property.label), imageUrl && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      marginBottom: "default"
    }, /*#__PURE__*/React__default.default.createElement("img", {
      src: imageUrl,
      alt: "Preview",
      style: {
        maxWidth: '200px',
        maxHeight: '200px',
        objectFit: 'cover',
        display: 'block',
        marginBottom: '8px',
        border: '1px solid #ddd',
        padding: '4px'
      },
      onError: e => {
        e.target.style.display = 'none';
      }
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      id: property.name,
      name: property.name,
      value: imageUrl,
      onChange: handleInputChange,
      width: 1
    }));
  };

  const ImageListEditComponent = props => {
    const {
      property,
      record,
      onChange
    } = props;

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
    const [images, setImages] = React.useState(getImages());

    // Helper to notify AdminJS of changes
    // AdminJS expects flat keys for arrays: 'property.0', 'property.1'
    const updateRecord = newImages => {
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
    const handleRemove = index => {
      const newImages = [...images];
      newImages.splice(index, 1);
      updateRecord(newImages);
    };
    const handleChange = (index, value) => {
      const newImages = [...images];
      newImages[index] = value;
      updateRecord(newImages);
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      marginBottom: "xxl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, property.label), images.map((url, index) => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      key: index,
      marginBottom: "default",
      display: "flex",
      alignItems: "center"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      marginRight: "default"
    }, url && /*#__PURE__*/React__default.default.createElement("img", {
      src: url,
      alt: `Image ${index + 1}`,
      style: {
        width: '50px',
        height: '50px',
        objectFit: 'cover',
        borderRadius: '4px'
      },
      onError: e => {
        e.target.style.display = 'none';
      }
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flexGrow: 1,
      marginRight: "default"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      value: url,
      onChange: e => handleChange(index, e.target.value),
      width: 1,
      placeholder: "Image URL"
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      onClick: () => handleRemove(index),
      variant: "danger",
      size: "icon"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
      icon: "Trash2"
    })))), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      onClick: handleAdd,
      type: "button"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
      icon: "Plus"
    }), " Add Image URL"));
  };

  const api = new adminjs.ApiClient();
  // Use empty string for relative URL since AdminJS runs on the same server
  const BASE_URL = '';
  const CreateTaskFromAidRequest = props => {
    const {
      record,
      resource
    } = props;
    const addNotice = adminjs.useNotice();
    const [loading, setLoading] = React.useState(false);
    const [volunteers, setVolunteers] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [formData, setFormData] = React.useState({
      taskName: record?.params?.name || 'Aid Request Task',
      volunteersNeeded: 1,
      isOpen: true,
      priority: record?.params?.priority || 'medium',
      selectedVolunteers: []
    });
    const [hasExistingTask, setHasExistingTask] = React.useState(false);

    // Check if task already exists for this aid request
    React.useEffect(() => {
      const checkExistingTask = async () => {
        try {
          const response = await api.resourceAction({
            resourceId: 'TaskSchema',
            actionName: 'list',
            params: {
              'filters.aidRequest': record.id
            }
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
    React.useEffect(() => {
      const fetchVolunteers = async () => {
        try {
          const response = await api.resourceAction({
            resourceId: 'userProfile',
            actionName: 'list',
            params: {
              'filters.role': 'volunteer',
              perPage: 100,
              ...(searchQuery && {
                'filters.name': searchQuery
              })
            }
          });
          if (response.data?.records) {
            setVolunteers(response.data.records.map(v => ({
              value: v.id,
              label: `${v.params.name} (${v.params.skill || 'No skill'})`
            })));
          }
        } catch (error) {
          console.error('Error fetching volunteers:', error);
        }
      };
      fetchVolunteers();
    }, [searchQuery]);
    const handleSubmit = async e => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/admin/task/create-from-aid-request/${record.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            taskName: formData.taskName,
            volunteersNeeded: formData.volunteersNeeded,
            isOpen: formData.isOpen,
            priority: formData.priority,
            assignedVolunteers: formData.isOpen ? [] : formData.selectedVolunteers
          })
        });
        const data = await response.json();
        if (data.success) {
          addNotice({
            message: 'Task created successfully!',
            type: 'success'
          });
          // Redirect back to the aid request list
          window.location.href = '/dashboard/resources/AidRequest';
        } else {
          addNotice({
            message: data.message || 'Failed to create task',
            type: 'error'
          });
        }
      } catch (error) {
        console.error('Error creating task:', error);
        addNotice({
          message: 'Error creating task. Please try again.',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };
    if (hasExistingTask) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        variant: "grey",
        padding: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
        variant: "danger",
        message: "A task already exists for this aid request."
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginTop: "lg"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        variant: "primary",
        onClick: () => window.location.href = '/dashboard/resources/AidRequest'
      }, "Back to Aid Requests")));
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      variant: "grey",
      padding: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H3, null, "Create Task from Aid Request"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      marginBottom: "lg"
    }, "Creating task for: ", /*#__PURE__*/React__default.default.createElement("strong", null, record?.params?.name || 'Unknown Request')), /*#__PURE__*/React__default.default.createElement("form", {
      onSubmit: handleSubmit
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Task Name"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      value: formData.taskName,
      onChange: e => setFormData(prev => ({
        ...prev,
        taskName: e.target.value
      })),
      required: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Priority"), /*#__PURE__*/React__default.default.createElement(designSystem.Select, {
      value: {
        value: formData.priority,
        label: formData.priority
      },
      options: [{
        value: 'high',
        label: 'High'
      }, {
        value: 'medium',
        label: 'Medium'
      }, {
        value: 'low',
        label: 'Low'
      }],
      onChange: selected => setFormData(prev => ({
        ...prev,
        priority: selected.value
      }))
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Volunteers Needed"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "number",
      min: "1",
      value: formData.volunteersNeeded,
      onChange: e => setFormData(prev => ({
        ...prev,
        volunteersNeeded: parseInt(e.target.value, 10) || 1
      }))
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.CheckBox, {
      id: "isOpen",
      checked: formData.isOpen,
      onChange: () => setFormData(prev => ({
        ...prev,
        isOpen: !prev.isOpen
      }))
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      inline: true,
      htmlFor: "isOpen",
      marginLeft: "default"
    }, "Open Task (volunteers can claim from marketplace)")), !formData.isOpen && /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Assign Volunteers ", formData.volunteersNeeded > 1 && `(max ${formData.volunteersNeeded})`), /*#__PURE__*/React__default.default.createElement(designSystem.Select, {
      isMulti: formData.volunteersNeeded > 1,
      isSearchable: true,
      options: volunteers,
      value: volunteers.filter(v => formData.selectedVolunteers.includes(v.value)),
      onChange: selected => {
        if (!selected) {
          setFormData(prev => ({
            ...prev,
            selectedVolunteers: []
          }));
          return;
        }
        const newValues = Array.isArray(selected) ? selected.slice(0, formData.volunteersNeeded).map(s => s.value) : [selected.value];
        setFormData(prev => ({
          ...prev,
          selectedVolunteers: newValues
        }));
      },
      placeholder: formData.volunteersNeeded > 1 ? `Select up to ${formData.volunteersNeeded} volunteers...` : "Select a volunteer..."
    }), formData.selectedVolunteers.length > 0 && /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      marginTop: "sm",
      color: "grey60"
    }, "Selected: ", formData.selectedVolunteers.length, "/", formData.volunteersNeeded)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      marginTop: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      type: "submit",
      variant: "primary",
      disabled: loading
    }, loading ? /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null) : 'Create Task'), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      type: "button",
      variant: "default",
      marginLeft: "default",
      onClick: () => window.location.href = '/dashboard/resources/AidRequest'
    }, "Cancel"))));
  };

  const MapPicker = props => {
    const {
      record,
      property,
      onChange
    } = props;
    const mapContainerRef = React.useRef(null);
    const mapInstanceRef = React.useRef(null);
    const markerRef = React.useRef(null);

    // Initial Values
    const getInitialValue = path => record.params[`${property.name}.${path}`];
    const initialLat = parseFloat(getInitialValue('location.coordinates.1')) || 0;
    const initialLng = parseFloat(getInitialValue('location.coordinates.0')) || 0;
    const [position, setPosition] = React.useState(initialLat && initialLng ? [initialLat, initialLng] : null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [addressData, setAddressData] = React.useState({
      addressLine1: getInitialValue('addressLine1') || '',
      addressLine2: getInitialValue('addressLine2') || '',
      addressLine3: getInitialValue('addressLine3') || '',
      pinCode: getInitialValue('pinCode') || '',
      location: {
        type: 'Point',
        coordinates: [initialLng, initialLat]
      }
    });

    // Helper to trigger AdminJS onChange
    // We wrap this in a customized hook or just call it in useEffect
    const updateRecord = data => {
      // Sanitize pinCode: Only digits, or null
      let cleanPin = null;
      if (data.pinCode) {
        const strPin = String(data.pinCode).replace(/\D/g, ''); // Remove non-digits
        if (strPin.length > 0) {
          cleanPin = parseInt(strPin, 10);
        }
      }
      const payload = {
        addressLine1: data.addressLine1 || '',
        addressLine2: data.addressLine2 || '',
        addressLine3: data.addressLine3 || '',
        pinCode: cleanPin,
        location: {
          ...data.location,
          type: 'Point',
          coordinates: [parseFloat(data.location?.coordinates?.[0]) || 0, parseFloat(data.location?.coordinates?.[1]) || 0]
        }
      };
      console.log('[DEBUG] MapPicker payload (Object):', payload);
      onChange(property.name, payload);
    };

    // Generic Address Updater from Nominatim Data
    const updateAddressFromNominatim = (data, lat, lng) => {
      const address = data.address || {};

      // Construct Address Line 1 (Significant place name)
      // Order of preference: amenity, building, road, village, suburb, town, city
      const line1 = address.amenity || address.building || address.road || address.village || address.suburb || address.town || address.city || data.display_name.split(',')[0];

      // Construct Address Line 2 (District/State/Region)
      const line2 = [address.city || address.town, address.state_district, address.state].filter(x => x).join(', ');
      const postcode = address.postcode || '';
      setAddressData(prev => ({
        ...prev,
        addressLine1: line1 || '',
        addressLine2: line2 || '',
        addressLine3: prev.addressLine3 || '',
        pinCode: postcode,
        location: {
          type: 'Point',
          coordinates: [lng, lat]
        }
      }));
    };

    // Handle Reverse Geocoding via Nominatim
    const reverseGeocode = async (lat, lng) => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=en`, {
          headers: {
            'User-Agent': 'ReliefFlowAdmin/1.0'
          }
        });
        const data = await response.json();
        if (data && data.address) {
          updateAddressFromNominatim(data, lat, lng);
        }
      } catch (e) {
        console.error("Reverse geocoding failed", e);
      }
    };

    // Load Leaflet from CDN
    React.useEffect(() => {
      const loadLeaflet = async () => {
        if (window.L) return window.L;

        // Load CSS
        if (!document.getElementById('leaflet-css')) {
          const link = document.createElement('link');
          link.id = 'leaflet-css';
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }

        // Load JS
        if (!document.getElementById('leaflet-js')) {
          const script = document.createElement('script');
          script.id = 'leaflet-js';
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          document.body.appendChild(script);
          return new Promise(resolve => {
            script.onload = () => resolve(window.L);
          });
        } else {
          // Wait for it to be ready
          return new Promise(resolve => {
            const check = setInterval(() => {
              if (window.L) {
                clearInterval(check);
                resolve(window.L);
              }
            }, 100);
          });
        }
      };
      loadLeaflet().then(L => {
        if (!mapInstanceRef.current && mapContainerRef.current) {
          const center = position || [10.8505, 76.2711]; // Default Kerala
          const map = L.map(mapContainerRef.current).setView(center, position ? 15 : 7);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          // Click event
          map.on('click', e => {
            const {
              lat,
              lng
            } = e.latlng;
            const newPos = [lat, lng];
            if (markerRef.current) {
              markerRef.current.setLatLng(newPos);
            } else {
              markerRef.current = L.marker(newPos).addTo(map);
            }
            setPosition(newPos);

            // Trigger Reverse Geocoding
            reverseGeocode(lat, lng);

            // Optimistic update of coordinates
            setAddressData(prev => ({
              ...prev,
              location: {
                type: 'Point',
                coordinates: [lng, lat]
              }
            }));
          });
          mapInstanceRef.current = map;

          // Initial marker
          if (position) {
            markerRef.current = L.marker(position).addTo(map);
          }
        }
      });

      // Cleanup
      return () => {
        if (mapInstanceRef.current) ;
      };
    }, []); // Empty deps, run once on mount

    // Sync state changes to AdminJS
    // This is the ONLY place where we notify AdminJS of changes
    React.useEffect(() => {
      updateRecord(addressData);
    }, [addressData]);

    // Handle Search
    const handleSearch = async () => {
      if (!searchQuery || !window.L || !mapInstanceRef.current) return;
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&limit=1&addressdetails=1&accept-language=en`, {
          headers: {
            'User-Agent': 'ReliefFlowAdmin/1.0'
          }
        });
        const data = await response.json();
        if (data && data.length > 0) {
          const {
            lat,
            lon
          } = data[0];
          const newPos = [parseFloat(lat), parseFloat(lon)];
          const L = window.L;
          const map = mapInstanceRef.current;
          map.setView(newPos, 15);
          if (markerRef.current) {
            markerRef.current.setLatLng(newPos);
          } else {
            markerRef.current = L.marker(newPos).addTo(map);
          }
          setPosition(newPos);
          // Use the detailed address from search result
          updateAddressFromNominatim(data[0], parseFloat(lat), parseFloat(lon));
        }
      } catch (e) {
        console.error("Search failed", e);
      }
    };

    // Debug: Log errors on every render
    if (record?.errors && Object.keys(record.errors).length > 0) {
      console.log('[DEBUG] Render Record errors:', JSON.stringify(record.errors, null, 2));
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Location Search"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: true,
      flexDirection: "row",
      mb: "default"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      value: searchQuery,
      onChange: e => setSearchQuery(e.target.value),
      placeholder: "Search for a place (e.g. Mavelikkara)",
      style: {
        flexGrow: 1,
        marginRight: '10px'
      }
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      onClick: handleSearch,
      type: "button"
    }, "Search")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      height: "400px",
      mb: "default",
      border: "default"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      ref: mapContainerRef,
      style: {
        height: '100%',
        width: '100%'
      }
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Shelter Address Line 1"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      value: addressData.addressLine1,
      onChange: e => setAddressData(prev => ({
        ...prev,
        addressLine1: e.target.value
      }))
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Shelter Address Line 2"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      value: addressData.addressLine2,
      onChange: e => setAddressData(prev => ({
        ...prev,
        addressLine2: e.target.value
      }))
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Shelter Address Line 3"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      value: addressData.addressLine3,
      onChange: e => setAddressData(prev => ({
        ...prev,
        addressLine3: e.target.value
      }))
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Pin Code"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      value: addressData.pinCode,
      onChange: e => setAddressData(prev => ({
        ...prev,
        pinCode: e.target.value
      }))
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Coordinates"), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '0.8em',
        color: '#888'
      }
    }, "Lat: ", addressData.location?.coordinates?.[1] || 0, ", Lng: ", addressData.location?.coordinates?.[0] || 0)));
  };

  const MapShow = props => {
    const {
      record,
      property
    } = props;
    const mapContainerRef = React.useRef(null);
    const mapInstanceRef = React.useRef(null);
    const markerRef = React.useRef(null);

    // Initial Values
    // AdminJS flattens nested objects in params, e.g. 'location.coordinates.0'
    const getInitialValue = path => record.params[`${property.name}.${path}`];

    // Note: GeoJSON stores [lng, lat], but Leaflet uses [lat, lng]
    const initialLng = parseFloat(getInitialValue('coordinates.0'));
    const initialLat = parseFloat(getInitialValue('coordinates.1'));
    const hasLocation = !isNaN(initialLat) && !isNaN(initialLng);
    const position = hasLocation ? [initialLat, initialLng] : null;

    // Load Leaflet from CDNs
    React.useEffect(() => {
      const loadLeaflet = async () => {
        if (window.L) return window.L;

        // Load CSS
        if (!document.getElementById('leaflet-css')) {
          const link = document.createElement('link');
          link.id = 'leaflet-css';
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }

        // Load JS
        if (!document.getElementById('leaflet-js')) {
          const script = document.createElement('script');
          script.id = 'leaflet-js';
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          document.body.appendChild(script);
          return new Promise(resolve => {
            script.onload = () => resolve(window.L);
          });
        } else {
          // Wait for it to be ready
          return new Promise(resolve => {
            const check = setInterval(() => {
              if (window.L) {
                clearInterval(check);
                resolve(window.L);
              }
            }, 100);
          });
        }
      };
      if (hasLocation) {
        loadLeaflet().then(L => {
          if (!mapInstanceRef.current && mapContainerRef.current) {
            const center = position || [10.8505, 76.2711];
            const map = L.map(mapContainerRef.current).setView(center, 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Initial marker
            if (position) {
              markerRef.current = L.marker(position).addTo(map);
            }

            // Disable interactions for read-only view
            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.boxZoom.disable();
            map.keyboard.disable();
            if (map.tap) map.tap.disable();
            mapInstanceRef.current = map;
          }
        });
      }

      // Cleanup
      return () => {
        // We generally depend on the component unmounting to clean DOM refs, 
        // but Leaflet instances might need manual cleanup if we were re-mounting heavily.
        // For simple show views, this is usually fine.
      };
    }, [hasLocation]);
    if (!hasLocation) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, property.label), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, "No location data available"));
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, property.label), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      height: "400px",
      mb: "default",
      border: "default"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      ref: mapContainerRef,
      style: {
        height: '100%',
        width: '100%'
      }
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '0.8em',
        color: '#888'
      }
    }, "Lat: ", initialLat, ", Lng: ", initialLng)));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Dashboard = Dashboard;
  AdminJS.UserComponents.LinkComponent = LinkComponent;
  AdminJS.UserComponents.VolunteerFilteredSelect = VolunteerFilteredSelect;
  AdminJS.UserComponents.StatusFilteredSelect = StatusFilteredSelect;
  AdminJS.UserComponents.DonationRequestStatusFilteredSelect = DonationRequestStatusFilteredSelect;
  AdminJS.UserComponents.LoginComponent = LoginComponent;
  AdminJS.UserComponents.ImageComponent = ImageComponent;
  AdminJS.UserComponents.ImageListComponent = ImageListComponent;
  AdminJS.UserComponents.ImageEditComponent = ImageEditComponent;
  AdminJS.UserComponents.ImageListEditComponent = ImageListEditComponent;
  AdminJS.UserComponents.CreateTaskFromAidRequest = CreateTaskFromAidRequest;
  AdminJS.UserComponents.MapPicker = MapPicker;
  AdminJS.UserComponents.MapShow = MapShow;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRGFzaGJvYXJkLmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9MaW5rQ29tcG9uZW50LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Wb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvQWlkUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Eb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTG9naW5Db21wb25lbnQuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlQ29tcG9uZW50LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUxpc3RDb21wb25lbnQuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlRWRpdENvbXBvbmVudC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSW1hZ2VMaXN0RWRpdENvbXBvbmVudC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvQ3JlYXRlVGFza0Zyb21BaWRSZXF1ZXN0LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9NYXBQaWNrZXIuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL01hcFNob3cuanN4IiwiZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCwgSDIsIEg1LCBUZXh0LCBJbGx1c3RyYXRpb24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuaW1wb3J0IHsgQXBpQ2xpZW50LCB1c2VDdXJyZW50QWRtaW4gfSBmcm9tICdhZG1pbmpzJztcclxuXHJcbmNvbnN0IERhc2hib2FyZCA9ICgpID0+IHtcclxuICBjb25zdCBbY3VycmVudEFkbWluXSA9IHVzZUN1cnJlbnRBZG1pbigpO1xyXG4gIGNvbnN0IFtzdGF0cywgc2V0U3RhdHNdID0gdXNlU3RhdGUoe1xyXG4gICAgYWlkUmVxdWVzdHM6IDAsXHJcbiAgICBkb25hdGlvbnM6IDAsXHJcbiAgICB0YXNrczogMCxcclxuICAgIHVzZXJzOiAwLFxyXG4gIH0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgLy8gRmV0Y2ggc3RhdGlzdGljcyBmcm9tIHlvdXIgQVBJXHJcbiAgICBjb25zdCBmZXRjaFN0YXRzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcclxuICAgICAgICAvLyBZb3UgY2FuIG1ha2UgQVBJIGNhbGxzIGhlcmUgdG8gZ2V0IHJlYWwgc3RhdHNcclxuICAgICAgICAvLyBGb3Igbm93LCB1c2luZyBwbGFjZWhvbGRlciBkYXRhXHJcbiAgICAgICAgc2V0U3RhdHMoe1xyXG4gICAgICAgICAgYWlkUmVxdWVzdHM6IDQ1LFxyXG4gICAgICAgICAgZG9uYXRpb25zOiAxMjgsXHJcbiAgICAgICAgICB0YXNrczogMjMsXHJcbiAgICAgICAgICB1c2VyczogMzUwLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHN0YXRzOicsIGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBmZXRjaFN0YXRzKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEJveD5cclxuICAgICAgPEJveCBtYj1cInh4bFwiPlxyXG4gICAgICAgIDxIMj5XZWxjb21lIHRvIFJlbGllZiBNYW5hZ2VtZW50IFN5c3RlbTwvSDI+XHJcbiAgICAgICAgPFRleHQgbXQ9XCJkZWZhdWx0XCI+XHJcbiAgICAgICAgICBIZWxsbyB7Y3VycmVudEFkbWluPy5lbWFpbCB8fCAnQWRtaW4nfSEgSGVyZSdzIHlvdXIgZGFzaGJvYXJkIG92ZXJ2aWV3LlxyXG4gICAgICAgIDwvVGV4dD5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICB7LyogU3RhdGlzdGljcyBDYXJkcyAqL31cclxuICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGZsZXhXcmFwPVwid3JhcFwiIGdhcD1cImRlZmF1bHRcIj5cclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICBmbGV4PVwiMVwiXHJcbiAgICAgICAgICBtaW5XaWR0aD1cIjIwMHB4XCJcclxuICAgICAgICAgIGJnPVwicHJpbWFyeTEwMFwiXHJcbiAgICAgICAgICBwPVwieGxcIlxyXG4gICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICBib3hTaGFkb3c9XCJjYXJkXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8SDUgbWI9XCJkZWZhdWx0XCI+QWlkIFJlcXVlc3RzPC9INT5cclxuICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwieHhsXCIgZm9udFdlaWdodD1cImJvbGRcIj5cclxuICAgICAgICAgICAge3N0YXRzLmFpZFJlcXVlc3RzfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIGNvbG9yPVwiZ3JleTYwXCI+XHJcbiAgICAgICAgICAgIEFjdGl2ZSByZXF1ZXN0c1xyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICBmbGV4PVwiMVwiXHJcbiAgICAgICAgICBtaW5XaWR0aD1cIjIwMHB4XCJcclxuICAgICAgICAgIGJnPVwic3VjY2Vzc1wiXHJcbiAgICAgICAgICBwPVwieGxcIlxyXG4gICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICBib3hTaGFkb3c9XCJjYXJkXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8SDUgbWI9XCJkZWZhdWx0XCIgY29sb3I9XCJ3aGl0ZVwiPlxyXG4gICAgICAgICAgICBEb25hdGlvbnNcclxuICAgICAgICAgIDwvSDU+XHJcbiAgICAgICAgICA8VGV4dCBmb250U2l6ZT1cInh4bFwiIGZvbnRXZWlnaHQ9XCJib2xkXCIgY29sb3I9XCJ3aGl0ZVwiPlxyXG4gICAgICAgICAgICB7c3RhdHMuZG9uYXRpb25zfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIGNvbG9yPVwid2hpdGVcIj5cclxuICAgICAgICAgICAgVG90YWwgZG9uYXRpb25zIHJlY2VpdmVkXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIGZsZXg9XCIxXCJcclxuICAgICAgICAgIG1pbldpZHRoPVwiMjAwcHhcIlxyXG4gICAgICAgICAgYmc9XCJpbmZvXCJcclxuICAgICAgICAgIHA9XCJ4bFwiXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcclxuICAgICAgICAgIGJveFNoYWRvdz1cImNhcmRcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxINSBtYj1cImRlZmF1bHRcIiBjb2xvcj1cIndoaXRlXCI+XHJcbiAgICAgICAgICAgIEFjdGl2ZSBUYXNrc1xyXG4gICAgICAgICAgPC9INT5cclxuICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwieHhsXCIgZm9udFdlaWdodD1cImJvbGRcIiBjb2xvcj1cIndoaXRlXCI+XHJcbiAgICAgICAgICAgIHtzdGF0cy50YXNrc31cclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDxUZXh0IG10PVwic21cIiBjb2xvcj1cIndoaXRlXCI+XHJcbiAgICAgICAgICAgIFBlbmRpbmcgdGFza3NcclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgPEJveFxyXG4gICAgICAgICAgZmxleD1cIjFcIlxyXG4gICAgICAgICAgbWluV2lkdGg9XCIyMDBweFwiXHJcbiAgICAgICAgICBiZz1cImFjY2VudFwiXHJcbiAgICAgICAgICBwPVwieGxcIlxyXG4gICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICBib3hTaGFkb3c9XCJjYXJkXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8SDUgbWI9XCJkZWZhdWx0XCIgY29sb3I9XCJ3aGl0ZVwiPlxyXG4gICAgICAgICAgICBVc2Vyc1xyXG4gICAgICAgICAgPC9INT5cclxuICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwieHhsXCIgZm9udFdlaWdodD1cImJvbGRcIiBjb2xvcj1cIndoaXRlXCI+XHJcbiAgICAgICAgICAgIHtzdGF0cy51c2Vyc31cclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDxUZXh0IG10PVwic21cIiBjb2xvcj1cIndoaXRlXCI+XHJcbiAgICAgICAgICAgIFJlZ2lzdGVyZWQgdXNlcnNcclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICA8L0JveD5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICB7LyogUXVpY2sgQWN0aW9ucyAqL31cclxuICAgICAgPEJveCBtdD1cInh4bFwiPlxyXG4gICAgICAgIDxINSBtYj1cImRlZmF1bHRcIj5RdWljayBBY3Rpb25zPC9INT5cclxuICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgZ2FwPVwiZGVmYXVsdFwiIGZsZXhXcmFwPVwid3JhcFwiPlxyXG4gICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICBhcz1cImFcIlxyXG4gICAgICAgICAgICBocmVmPVwiL2Rhc2hib2FyZC9yZXNvdXJjZXMvQWlkUmVxdWVzdFwiXHJcbiAgICAgICAgICAgIGJnPVwid2hpdGVcIlxyXG4gICAgICAgICAgICBwPVwibGdcIlxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgYm9yZGVyPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IHRleHREZWNvcmF0aW9uOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCJib2xkXCIgY29sb3I9XCJwcmltYXJ5MTAwXCI+XHJcbiAgICAgICAgICAgICAg8J+TiyBWaWV3IEFpZCBSZXF1ZXN0c1xyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgYXM9XCJhXCJcclxuICAgICAgICAgICAgaHJlZj1cIi9kYXNoYm9hcmQvcmVzb3VyY2VzL0RvbmF0aW9uXCJcclxuICAgICAgICAgICAgYmc9XCJ3aGl0ZVwiXHJcbiAgICAgICAgICAgIHA9XCJsZ1wiXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICBib3JkZXI9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgdGV4dERlY29yYXRpb246ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD1cImJvbGRcIiBjb2xvcj1cInByaW1hcnkxMDBcIj5cclxuICAgICAgICAgICAgICDwn5KwIE1hbmFnZSBEb25hdGlvbnNcclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgIGFzPVwiYVwiXHJcbiAgICAgICAgICAgIGhyZWY9XCIvZGFzaGJvYXJkL3Jlc291cmNlcy9UYXNrU2NoZW1hXCJcclxuICAgICAgICAgICAgYmc9XCJ3aGl0ZVwiXHJcbiAgICAgICAgICAgIHA9XCJsZ1wiXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICBib3JkZXI9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgdGV4dERlY29yYXRpb246ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD1cImJvbGRcIiBjb2xvcj1cInByaW1hcnkxMDBcIj5cclxuICAgICAgICAgICAgICDinIUgVmlldyBUYXNrc1xyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgYXM9XCJhXCJcclxuICAgICAgICAgICAgaHJlZj1cIi9kYXNoYm9hcmQvcmVzb3VyY2VzL1JlbGllZkNlbnRlclwiXHJcbiAgICAgICAgICAgIGJnPVwid2hpdGVcIlxyXG4gICAgICAgICAgICBwPVwibGdcIlxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgYm9yZGVyPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IHRleHREZWNvcmF0aW9uOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCJib2xkXCIgY29sb3I9XCJwcmltYXJ5MTAwXCI+XHJcbiAgICAgICAgICAgICAg8J+PoiBSZWxpZWYgQ2VudGVyc1xyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8L0JveD5cclxuICAgICAgICA8L0JveD5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICB7LyogUmVjZW50IEFjdGl2aXR5ICovfVxyXG4gICAgICA8Qm94IG10PVwieHhsXCI+XHJcbiAgICAgICAgPEg1IG1iPVwiZGVmYXVsdFwiPlN5c3RlbSBTdGF0dXM8L0g1PlxyXG4gICAgICAgIDxCb3ggYmc9XCJ3aGl0ZVwiIHA9XCJsZ1wiIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIiBib3JkZXI9XCJkZWZhdWx0XCI+XHJcbiAgICAgICAgICA8VGV4dD7inIUgQWxsIHN5c3RlbXMgb3BlcmF0aW9uYWw8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBtdD1cInNtXCIgY29sb3I9XCJncmV5NjBcIj5cclxuICAgICAgICAgICAgTGFzdCB1cGRhdGVkOiB7bmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgICA8L0JveD5cclxuICAgIDwvQm94PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmQ7IiwiXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuXHJcbmNvbnN0IExpbmtDb21wb25lbnQgPSAocHJvcHMpID0+IHtcclxuICBjb25zdCB7IHJlY29yZCwgcHJvcGVydHkgfSA9IHByb3BzO1xyXG5cclxuICAvLyBUcnkgdG8gZ2V0IGNvb3JkaW5hdGVzIGZyb20gdGhlIGRpcmVjdCBwcm9wZXJ0eSBmaXJzdCAoZS5nLiwgJ2xvY2F0aW9uJylcclxuICAvLyBGYWxsYmFjayB0byAnYWRkcmVzcy5sb2NhdGlvbicgZm9yIG90aGVyIHJlc291cmNlcyBpZiBuZWVkZWRcclxuICAvLyBOb3RlOiBJbiBBZG1pbkpTIGxpc3QgdmlldywgZmxhdHRlbmluZyBtaWdodCBiZSBcImxvY2F0aW9uLmNvb3JkaW5hdGVzLjBcIlxyXG4gIGNvbnN0IGxhdCA9IHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uY29vcmRpbmF0ZXMuMWBdIHx8IHJlY29yZC5wYXJhbXNbXCJhZGRyZXNzLmxvY2F0aW9uLmNvb3JkaW5hdGVzLjFcIl07XHJcbiAgY29uc3QgbG9uZyA9IHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uY29vcmRpbmF0ZXMuMGBdIHx8IHJlY29yZC5wYXJhbXNbXCJhZGRyZXNzLmxvY2F0aW9uLmNvb3JkaW5hdGVzLjBcIl07XHJcblxyXG4gIC8vIElmIG5vIGNvb3JkaW5hdGVzLCByZXR1cm4gbnVsbCBvciBlbXB0eVxyXG4gIGlmICghbGF0IHx8ICFsb25nKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIC8vIEF0dGVtcHQgdG8gY29uc3RydWN0IGFuIGFkZHJlc3Mgc3RyaW5nIGZyb20gdGhlIHJlY29yZFxyXG4gIC8vIExvZ2ljOiBhZGRyZXNzLmFkZHJlc3NMaW5lMSwgYWRkcmVzcy5hZGRyZXNzTGluZTIsIGFkZHJlc3MuY2l0eSwgZXRjLlxyXG4gIC8vIE5vdGU6IEFkbWluSlMgbGlrZWx5IGZsYXR0ZW5zIHRoZXNlIHRvIGBhZGRyZXNzLmFkZHJlc3NMaW5lMWBcclxuICBjb25zdCBhZGRyZXNzUGFydHMgPSBbXHJcbiAgICByZWNvcmQucGFyYW1zWydhZGRyZXNzLmFkZHJlc3NMaW5lMSddLFxyXG4gICAgcmVjb3JkLnBhcmFtc1snYWRkcmVzcy5hZGRyZXNzTGluZTInXSxcclxuICAgIHJlY29yZC5wYXJhbXNbJ2FkZHJlc3MuYWRkcmVzc0xpbmUzJ10sXHJcbiAgICByZWNvcmQucGFyYW1zWydhZGRyZXNzLnBpbkNvZGUnXSxcclxuICAgIC8vIEFkZCBvdGhlciBhZGRyZXNzIGZpZWxkcyBpZiB0aGV5IGV4aXN0IGluIHlvdXIgc2NoZW1hLCBlLmcuIHN0YXRlLCBjaXR5XHJcbiAgXS5maWx0ZXIocGFydCA9PiBwYXJ0ICYmIHBhcnQudG9TdHJpbmcoKS50cmltKCkgIT09ICcnKTtcclxuXHJcbiAgbGV0IHF1ZXJ5ID0gJyc7XHJcbiAgaWYgKGFkZHJlc3NQYXJ0cy5sZW5ndGggPiAwKSB7XHJcbiAgICBxdWVyeSA9IGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzUGFydHMuam9pbignLCAnKSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHF1ZXJ5ID0gYCR7bGF0fSwke2xvbmd9YDtcclxuICB9XHJcblxyXG4gIC8vIHF1ZXJ5IHBhcmFtIHdvcmtzIGZvciBib3RoIHNlYXJjaCB0ZXJtcyAoYWRkcmVzcykgYW5kIGNvb3JkaW5hdGVzXHJcbiAgY29uc3QgbWFwc0xpbmsgPSBgaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL3NlYXJjaC8/YXBpPTEmcXVlcnk9JHtxdWVyeX1gO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGEgaHJlZj17bWFwc0xpbmt9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5cclxuICAgICAgVmlldyBMb2NhdGlvblxyXG4gICAgPC9hPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlua0NvbXBvbmVudFxyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwsIFNlbGVjdCwgRm9ybU1lc3NhZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcclxuXHJcbmNvbnN0IFZvbHVudGVlckZpbHRlcmVkU2VsZWN0ID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xyXG4gIGNvbnN0IFt2b2x1bnRlZXJzLCBzZXRWb2x1bnRlZXJzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGZldGNoVm9sdW50ZWVycyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xyXG4gICAgICAgIHJlc291cmNlSWQ6ICd1c2VyUHJvZmlsZScsXHJcbiAgICAgICAgYWN0aW9uTmFtZTogJ2xpc3QnLFxyXG4gICAgICAgIHBhcmFtczogeyAnZmlsdGVycy5yb2xlJzogJ3ZvbHVudGVlcicsIHBlclBhZ2U6IDEwMDAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGEucmVjb3Jkcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdtYXBwaW5nICcsIHJlc3BvbnNlLmRhdGEucmVjb3JkcylcclxuICAgICAgICBzZXRWb2x1bnRlZXJzKHJlc3BvbnNlLmRhdGEucmVjb3Jkcy5tYXAodiA9PiAoe1xyXG4gICAgICAgICAgdmFsdWU6IHYuaWQsXHJcbiAgICAgICAgICBsYWJlbDogdi5wYXJhbXMubmFtZSxcclxuICAgICAgICB9KSkpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfTtcclxuICAgIGZldGNoVm9sdW50ZWVycygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gc2VsZWN0ZWQgPT4ge1xyXG4gICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgc2VsZWN0ZWQgPyBzZWxlY3RlZC52YWx1ZSA6ICcnKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IHZvbHVudGVlcnMuZmluZChvcHQgPT4gb3B0LnZhbHVlID09PSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdKSB8fCBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEZvcm1Hcm91cCBtYj17NTZ9PlxyXG4gICAgICA8TGFiZWwgcmVxdWlyZWQ+eydTZWxlY3QgVm9sdW50ZWVyJ308L0xhYmVsPlxyXG4gICAgICA8U2VsZWN0XHJcbiAgICAgICAgb3B0aW9ucz17dm9sdW50ZWVyc31cclxuICAgICAgICB2YWx1ZT17c2VsZWN0ZWRPcHRpb259XHJcbiAgICAgICAgaXNMb2FkaW5nPXtsb2FkaW5nfVxyXG4gICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XHJcbiAgICAgICAgaXNDbGVhcmFibGVcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCB2b2x1bnRlZXLigKZcIlxyXG4gICAgICAvPlxyXG4gICAgICB7cHJvcGVydHkuZGVzY3JpcHRpb24gJiYgKFxyXG4gICAgICAgIDxGb3JtTWVzc2FnZT57cHJvcGVydHkuZGVzY3JpcHRpb259PC9Gb3JtTWVzc2FnZT5cclxuICAgICAgKX1cclxuICAgIDwvRm9ybUdyb3VwPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIExhYmVsLCBTZWxlY3QsIEZvcm1NZXNzYWdlIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XHJcblxyXG5jb25zdCBTdGF0dXNGaWx0ZXJlZFNlbGVjdCA9ICh7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0pID0+IHtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZmV0Y2hTdGF0dXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHtcclxuICAgICAgICByZXNvdXJjZUlkOiAnQWlkUmVxdWVzdCcsXHJcbiAgICAgICAgYWN0aW9uTmFtZTogJ2xpc3QnLFxyXG4gICAgICAgIHBhcmFtczogeyAnZmlsdGVycy5zdGF0dXMnOiAncmVqZWN0ZWQnLCBwZXJQYWdlOiAxMDAwIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zb2xlLmxvZygnbG9nb2dkZ2QnLCByZXNwb25zZSlcclxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21hcHBpbmcgJywgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKVxyXG4gICAgICAgIHNldFN0YXR1cyhyZXNwb25zZS5kYXRhLnJlY29yZHMubWFwKHYgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNvcmRcIiwgdi5wYXJhbXMpXHJcbiAgICAgICAgICByZXR1cm4gKHtcclxuICAgICAgICAgICAgdmFsdWU6IHYuaWQsXHJcbiAgICAgICAgICAgIC8vIGxhYmVsOiBgJHt2LnBhcmFtc1tcImFkZHJlc3MuYWRkcmVzc0xpbmUxXCJdfSAtICR7di5wYXJhbXNbXCJkb25hdGlvblR5cGVcIl19YFxyXG4gICAgICAgICAgICBsYWJlbDogdi5wYXJhbXMubmFtZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfTtcclxuICAgIGZldGNoU3RhdHVzKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSBzZWxlY3RlZCA9PiB7XHJcbiAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBzZWxlY3RlZCA/IHNlbGVjdGVkLnZhbHVlIDogJycpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gc3RhdHVzLmZpbmQob3B0ID0+IG9wdC52YWx1ZSA9PT0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXSkgfHwgbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxGb3JtR3JvdXAgbWI9ezU2fT5cclxuICAgICAgPExhYmVsIHJlcXVpcmVkPnsnU2VsZWN0IEFpZCBSZXF1ZXN0J308L0xhYmVsPlxyXG4gICAgICA8U2VsZWN0XHJcbiAgICAgICAgb3B0aW9ucz17c3RhdHVzfVxyXG4gICAgICAgIHZhbHVlPXtzZWxlY3RlZE9wdGlvbn1cclxuICAgICAgICBpc0xvYWRpbmc9e2xvYWRpbmd9XHJcbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cclxuICAgICAgICBpc0NsZWFyYWJsZVxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IEFpZCBSZXF1ZXN0XCJcclxuICAgICAgLz5cclxuICAgICAge3Byb3BlcnR5LmRlc2NyaXB0aW9uICYmIChcclxuICAgICAgICA8Rm9ybU1lc3NhZ2U+e3Byb3BlcnR5LmRlc2NyaXB0aW9ufTwvRm9ybU1lc3NhZ2U+XHJcbiAgICAgICl9XHJcbiAgICA8L0Zvcm1Hcm91cD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhdHVzRmlsdGVyZWRTZWxlY3Q7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCwgU2VsZWN0LCBGb3JtTWVzc2FnZSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xyXG5cclxuY29uc3QgRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QgPSAoeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9KSA9PiB7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGZldGNoU3RhdHVzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5yZXNvdXJjZUFjdGlvbih7XHJcbiAgICAgICAgcmVzb3VyY2VJZDogJ0RvbmF0aW9uUmVxdWVzdCcsXHJcbiAgICAgICAgYWN0aW9uTmFtZTogJ2xpc3QnLFxyXG4gICAgICAgIHBhcmFtczogeyAnZmlsdGVycy5zdGF0dXMnOiAnYWNjZXB0ZWQnLCBwZXJQYWdlOiAxMDAwIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zb2xlLmxvZygnbG9nb2dkZ2QnLCByZXNwb25zZSlcclxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21hcHBpbmcgJywgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKVxyXG4gICAgICAgIHNldFN0YXR1cyhyZXNwb25zZS5kYXRhLnJlY29yZHMubWFwKHYgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNvcmRcIiwgdi5wYXJhbXMpXHJcbiAgICAgICAgICByZXR1cm4gKHtcclxuICAgICAgICAgICAgdmFsdWU6IHYuaWQsXHJcbiAgICAgICAgICAgIGxhYmVsOiB2LnBhcmFtcy5uYW1lXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9O1xyXG4gICAgZmV0Y2hTdGF0dXMoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IHNlbGVjdGVkID0+IHtcclxuICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIHNlbGVjdGVkID8gc2VsZWN0ZWQudmFsdWUgOiAnJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBzdGF0dXMuZmluZChvcHQgPT4gb3B0LnZhbHVlID09PSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdKSB8fCBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEZvcm1Hcm91cCBtYj17NTZ9PlxyXG4gICAgICA8TGFiZWwgcmVxdWlyZWQ+eydTZWxlY3QgRG9uYXRpb24gUmVxdWVzdCd9PC9MYWJlbD5cclxuICAgICAgPFNlbGVjdFxyXG4gICAgICAgIG9wdGlvbnM9e3N0YXR1c31cclxuICAgICAgICB2YWx1ZT17c2VsZWN0ZWRPcHRpb259XHJcbiAgICAgICAgaXNMb2FkaW5nPXtsb2FkaW5nfVxyXG4gICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XHJcbiAgICAgICAgaXNDbGVhcmFibGVcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBEb25hdGlvbiBSZXF1ZXN0XCJcclxuICAgICAgLz5cclxuICAgICAge3Byb3BlcnR5LmRlc2NyaXB0aW9uICYmIChcclxuICAgICAgICA8Rm9ybU1lc3NhZ2U+e3Byb3BlcnR5LmRlc2NyaXB0aW9ufTwvRm9ybU1lc3NhZ2U+XHJcbiAgICAgICl9XHJcbiAgICA8L0Zvcm1Hcm91cD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3Q7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBCdXR0b24sIElucHV0LCBMYWJlbCwgVGV4dCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyB1c2VUcmFuc2xhdGlvbiB9IGZyb20gJ2FkbWluanMnO1xyXG5cclxuY29uc3QgTG9naW5Db21wb25lbnQgPSAocHJvcHMpID0+IHtcclxuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbcGFzc3dvcmQsIHNldFBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Nob3dQYXNzd29yZCwgc2V0U2hvd1Bhc3N3b3JkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCB7IHRyYW5zbGF0ZU1lc3NhZ2UgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBzZXRFcnJvcignJyk7XHJcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9kYXNoYm9hcmQvbG9naW4nLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZW1haWwsIHBhc3N3b3JkIH0pLFxyXG4gICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGRhdGEucmVkaXJlY3RVcmwgfHwgJy9kYXNoYm9hcmQnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldEVycm9yKGRhdGEuZXJyb3IgfHwgJ0ludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQnKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0xvZ2luIGVycm9yOicsIGVycik7XHJcbiAgICAgIHNldEVycm9yKCdBbiBlcnJvciBvY2N1cnJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94XHJcbiAgICAgIGRpc3BsYXk9XCJmbGV4XCJcclxuICAgICAgbWluSGVpZ2h0PVwiMTAwdmhcIlxyXG4gICAgICBzdHlsZT17eyBmb250RmFtaWx5OiAnSW50ZXIsIHN5c3RlbS11aSwgc2Fucy1zZXJpZicgfX1cclxuICAgID5cclxuICAgICAgey8qIExlZnQgU2lkZSAtIEJyYW5kaW5nICovfVxyXG4gICAgICA8Qm94XHJcbiAgICAgICAgZmxleD1cIjFcIlxyXG4gICAgICAgIGRpc3BsYXk9e3sgXzogJ25vbmUnLCBtZDogJ2ZsZXgnIH19XHJcbiAgICAgICAgZmxleERpcmVjdGlvbj1cImNvbHVtblwiXHJcbiAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIlxyXG4gICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxyXG4gICAgICAgIHA9XCJ4eGxcIlxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzI1NjNlYiAwJSwgIzFlNDBhZiAxMDAlKScsXHJcbiAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcclxuICAgICAgICB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPEJveCB0ZXh0QWxpZ249XCJjZW50ZXJcIiBzdHlsZT17eyBtYXhXaWR0aDogJzUwMHB4JyB9fT5cclxuICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgc3JjPVwiL2ltYWdlcy9sb2dvLXdoaXRlLnBuZ1wiXHJcbiAgICAgICAgICAgIGFsdD1cIkxvZ29cIlxyXG4gICAgICAgICAgICBzdHlsZT17eyBtYXhXaWR0aDogJzI1MHB4JywgbWFyZ2luQm90dG9tOiAnMnJlbScgfX1cclxuICAgICAgICAgICAgb25FcnJvcj17KGUpID0+IHtcclxuICAgICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMnJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJywgbWFyZ2luQm90dG9tOiAnMXJlbScgfX0+XHJcbiAgICAgICAgICAgIFJlbGllZiBNYW5hZ2VtZW50IFN5c3RlbVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxLjEyNXJlbScsIG9wYWNpdHk6IDAuOSB9fT5cclxuICAgICAgICAgICAgQ29vcmRpbmF0aW5nIGRpc2FzdGVyIHJlbGllZiBlZmZvcnRzIHdpdGggZWZmaWNpZW5jeSBhbmQgY29tcGFzc2lvblxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgZ2FwOiAnMnJlbScsIG1hcmdpblRvcDogJzNyZW0nLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMnJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJyB9fT41MDArPC9UZXh0PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMC44NzVyZW0nIH19PkFpZCBSZXF1ZXN0czwvVGV4dD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgIDxCb3ggc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzJyZW0nLCBmb250V2VpZ2h0OiAnYm9sZCcgfX0+MTIwMCs8L1RleHQ+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcwLjg3NXJlbScgfX0+RG9uYXRpb25zPC9UZXh0PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMnJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJyB9fT41MCs8L1RleHQ+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcwLjg3NXJlbScgfX0+UmVsaWVmIENlbnRlcnM8L1RleHQ+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgey8qIFJpZ2h0IFNpZGUgLSBMb2dpbiBGb3JtICovfVxyXG4gICAgICA8Qm94XHJcbiAgICAgICAgZmxleD1cIjFcIlxyXG4gICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcclxuICAgICAgICBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCJcclxuICAgICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXHJcbiAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXHJcbiAgICAgICAgcD1cInh4bFwiXHJcbiAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiAnI2Y5ZmFmYicgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIGJnPVwid2hpdGVcIlxyXG4gICAgICAgICAgcD1cInh4bFwiXHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcwLjVyZW0nLFxyXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDFweCAzcHggMCByZ2JhKDAsIDAsIDAsIDAuMSknLFxyXG4gICAgICAgICAgICB3aWR0aDogJzQ1MHB4JyxcclxuICAgICAgICAgICAgbWF4V2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPEJveCBtYj1cInhsXCI+XHJcbiAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMS41cmVtJywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJyMxMTE4MjcnIH19PlxyXG4gICAgICAgICAgICAgIFNpZ24gSW5cclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzFyZW0nLCBjb2xvcjogJyM2YjcyODAnLCBtYXJnaW5Ub3A6ICcwLjVyZW0nIH19PlxyXG4gICAgICAgICAgICAgIEVudGVyIHlvdXIgY3JlZGVudGlhbHMgdG8gYWNjZXNzIHRoZSBkYXNoYm9hcmRcclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAge2Vycm9yICYmIChcclxuICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgIHA9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgICBtYj1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmVmMmYyJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZmVlMmUyJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzAuMzc1cmVtJyxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjZGMyNjI2JywgZm9udFNpemU6ICcwLjg3NXJlbScgfX0+XHJcbiAgICAgICAgICAgICAgICDimqDvuI8ge2Vycm9yfVxyXG4gICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxyXG4gICAgICAgICAgICA8Qm94IG1iPVwibGdcIj5cclxuICAgICAgICAgICAgICA8TGFiZWwgaHRtbEZvcj1cImVtYWlsXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICBFbWFpbCBBZGRyZXNzXHJcbiAgICAgICAgICAgICAgPC9MYWJlbD5cclxuICAgICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICAgIGlkPVwiZW1haWxcIlxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXtlbWFpbH1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RW1haWwoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJhZG1pbkBleGFtcGxlLmNvbVwiXHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTJweCcsXHJcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICAgICAgPEJveCBtYj1cImRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICA8TGFiZWwgaHRtbEZvcj1cInBhc3N3b3JkXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICBQYXNzd29yZFxyXG4gICAgICAgICAgICAgIDwvTGFiZWw+XHJcbiAgICAgICAgICAgICAgPEJveCBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuICAgICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgICBpZD1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICAgICAgdHlwZT17c2hvd1Bhc3N3b3JkID8gJ3RleHQnIDogJ3Bhc3N3b3JkJ31cclxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3Bhc3N3b3JkfVxyXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIHBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTJweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICc0NXB4JyxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93UGFzc3dvcmQoIXNob3dQYXNzd29yZCl9XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICcxMnB4JyxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6ICc1MCUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM2YjcyODAnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7c2hvd1Bhc3N3b3JkID8gJ/CfkYHvuI8nIDogJ/CfkYHvuI/igI3wn5eo77iPJ31cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICAgIDxCb3ggbWI9XCJ4bFwiIHN0eWxlPXt7IG1hcmdpblRvcDogJzFyZW0nIH19PlxyXG4gICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxyXG4gICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTRweCcsXHJcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLFxyXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBsb2FkaW5nID8gJyM5Y2EzYWYnIDogJyMyNTYzZWInLFxyXG4gICAgICAgICAgICAgICAgICBjdXJzb3I6IGxvYWRpbmcgPyAnbm90LWFsbG93ZWQnIDogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7bG9hZGluZyA/IChcclxuICAgICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWFyZ2luUmlnaHQ6ICc4cHgnIH19PuKPszwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICBTaWduaW5nIGluLi4uXHJcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICdTaWduIEluJ1xyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICA8L2Zvcm0+XHJcblxyXG4gICAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICcxLjVyZW0nIH19PlxyXG4gICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzAuODc1cmVtJywgY29sb3I6ICcjNmI3MjgwJyB9fT5cclxuICAgICAgICAgICAgICBEb24ndCBoYXZlIGFuIGFjY291bnQ/eycgJ31cclxuICAgICAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICAgICAgYXM9XCJzcGFuXCJcclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiAnIzI1NjNlYicsIGZvbnRXZWlnaHQ6ICdib2xkJywgY3Vyc29yOiAncG9pbnRlcicgfX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICBDb250YWN0IEFkbWluaXN0cmF0b3JcclxuICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICA8Qm94IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicsIG1hcmdpblRvcDogJzFyZW0nIH19PlxyXG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcwLjc1cmVtJywgY29sb3I6ICcjNmI3MjgwJyB9fT5cclxuICAgICAgICAgICAgwqkgMjAyNCBSZWxpZWYgTWFuYWdlbWVudCBTeXN0ZW0uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgIDwvQm94PlxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvZ2luQ29tcG9uZW50OyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgSW1hZ2VDb21wb25lbnQgPSAocHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgcmVjb3JkLCBwcm9wZXJ0eSB9ID0gcHJvcHM7XHJcbiAgICBjb25zdCBpbWFnZVVybCA9IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV07XHJcblxyXG4gICAgaWYgKCFpbWFnZVVybCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveD5cclxuICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgc3JjPXtpbWFnZVVybH1cclxuICAgICAgICAgICAgICAgIGFsdD17cHJvcGVydHkubGFiZWx9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXhXaWR0aDogJzEwMHB4JywgbWF4SGVpZ2h0OiAnMTAwcHgnLCBvYmplY3RGaXQ6ICdjb3ZlcicgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICA8L0JveD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZUNvbXBvbmVudDtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBJbWFnZUxpc3RDb21wb25lbnQgPSAocHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgcmVjb3JkLCBwcm9wZXJ0eSB9ID0gcHJvcHM7XHJcblxyXG4gICAgY29uc3QgaW1hZ2VzID0gW107XHJcbiAgICAvLyBDaGVjayBmb3IgZmxhdHRlbmVkIGtleXMgbGlrZSAncHJvb2ZJbWFnZXMuMCcsICdwcm9vZkltYWdlcy4xJywgZXRjLlxyXG4gICAgT2JqZWN0LmtleXMocmVjb3JkLnBhcmFtcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIC8vIENoZWNrIGlmIGtleSBzdGFydHMgd2l0aCBwcm9wZXJ0eSBuYW1lIGFuZCBmb2xsb3dzIHdpdGggLmluZGV4XHJcbiAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKGAke3Byb3BlcnR5Lm5hbWV9LmApICYmICFpc05hTihrZXkuc3BsaXQoJy4nKS5wb3AoKSkpIHtcclxuICAgICAgICAgICAgaW1hZ2VzLnB1c2gocmVjb3JkLnBhcmFtc1trZXldKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoaW1hZ2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGZsZXhEaXJlY3Rpb249XCJyb3dcIiBmbGV4V3JhcD1cIndyYXBcIiBnYXA9ezJ9PlxyXG4gICAgICAgICAgICB7aW1hZ2VzLm1hcCgodXJsLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXt1cmx9XHJcbiAgICAgICAgICAgICAgICAgICAgYWx0PXtgJHtwcm9wZXJ0eS5sYWJlbH0tJHtpbmRleH1gfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1heFdpZHRoOiAnMTAwcHgnLCBtYXhIZWlnaHQ6ICcxMDBweCcsIG9iamVjdEZpdDogJ2NvdmVyJyB9fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VMaXN0Q29tcG9uZW50O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBJbnB1dCwgTGFiZWwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IEltYWdlRWRpdENvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9ID0gcHJvcHM7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0gfHwgJyc7XHJcbiAgICBjb25zdCBbaW1hZ2VVcmwsIHNldEltYWdlVXJsXSA9IHVzZVN0YXRlKHZhbHVlKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgbG9jYWwgc3RhdGUgaWYgcmVjb3JkIGNoYW5nZXMgZnJvbSBvdXRzaWRlIChlLmcuIHJlbG9hZClcclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgc2V0SW1hZ2VVcmwocmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXSB8fCAnJyk7XHJcbiAgICB9LCBbcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXV0pO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgc2V0SW1hZ2VVcmwobmV3VmFsdWUpO1xyXG4gICAgICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIG5ld1ZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cInh4bFwiPlxyXG4gICAgICAgICAgICA8TGFiZWwgaHRtbEZvcj17cHJvcGVydHkubmFtZX0+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XHJcbiAgICAgICAgICAgIHtpbWFnZVVybCAmJiAoXHJcbiAgICAgICAgICAgICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cImRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17aW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIlByZXZpZXdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXhXaWR0aDogJzIwMHB4JywgbWF4SGVpZ2h0OiAnMjAwcHgnLCBvYmplY3RGaXQ6ICdjb3ZlcicsIGRpc3BsYXk6ICdibG9jaycsIG1hcmdpbkJvdHRvbTogJzhweCcsIGJvcmRlcjogJzFweCBzb2xpZCAjZGRkJywgcGFkZGluZzogJzRweCcgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvcj17KGUpID0+IHsgZS50YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgaWQ9e3Byb3BlcnR5Lm5hbWV9XHJcbiAgICAgICAgICAgICAgICBuYW1lPXtwcm9wZXJ0eS5uYW1lfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2ltYWdlVXJsfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgd2lkdGg9ezF9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VFZGl0Q29tcG9uZW50O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBMYWJlbCwgSW5wdXQsIEJ1dHRvbiwgSWNvbiB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgSW1hZ2VMaXN0RWRpdENvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9ID0gcHJvcHM7XHJcblxyXG4gICAgLy8gRmxhdHRlbmVkIHBhcmFtcyBhcmUgc3RvcmVkIGxpa2UgJ3Byb29mSW1hZ2VzLjAnOiAndXJsMScsICdwcm9vZkltYWdlcy4xJzogJ3VybDInXHJcbiAgICAvLyBXZSBuZWVkIHRvIHJlY29uc3RydWN0IHRoZSBhcnJheVxyXG4gICAgY29uc3QgZ2V0SW1hZ2VzID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGltYWdlcyA9IFtdO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHJlY29yZC5wYXJhbXMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKGAke3Byb3BlcnR5Lm5hbWV9LmApICYmICFpc05hTihrZXkuc3BsaXQoJy4nKS5wb3AoKSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoa2V5LnNwbGl0KCcuJykucG9wKCksIDEwKTtcclxuICAgICAgICAgICAgICAgIGltYWdlc1tpbmRleF0gPSByZWNvcmQucGFyYW1zW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBGaWx0ZXIgb3V0IGVtcHR5IHNsb3RzIGlmIGFueSBob2xlIGV4aXN0cywgdGhvdWdoIG5vcm1hbGx5IGFkbWluanMgaGFuZGxlcyBzZXF1ZW50aWFsIGtleXNcclxuICAgICAgICByZXR1cm4gaW1hZ2VzLmZpbHRlcihpbWcgPT4gaW1nICE9PSB1bmRlZmluZWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBbaW1hZ2VzLCBzZXRJbWFnZXNdID0gdXNlU3RhdGUoZ2V0SW1hZ2VzKCkpO1xyXG5cclxuICAgIC8vIEhlbHBlciB0byBub3RpZnkgQWRtaW5KUyBvZiBjaGFuZ2VzXHJcbiAgICAvLyBBZG1pbkpTIGV4cGVjdHMgZmxhdCBrZXlzIGZvciBhcnJheXM6ICdwcm9wZXJ0eS4wJywgJ3Byb3BlcnR5LjEnXHJcbiAgICBjb25zdCB1cGRhdGVSZWNvcmQgPSAobmV3SW1hZ2VzKSA9PiB7XHJcbiAgICAgICAgc2V0SW1hZ2VzKG5ld0ltYWdlcyk7XHJcblxyXG4gICAgICAgIC8vIDEuIENsZWFyIGV4aXN0aW5nIGtleXMgZm9yIHRoaXMgcHJvcGVydHlcclxuICAgICAgICAvLyBXZSBjYW4ndCByZWFsbHkgXCJkZWxldGVcIiBrZXlzIGVhc2lseSB2aWEgb25DaGFuZ2UgaW4gdGhlIHN0YW5kYXJkIHdheSB3aXRob3V0IHBvdGVudGlhbGx5IGxlYXZpbmcgZ2FyYmFnZSxcclxuICAgICAgICAvLyBidXQgc3RhbmRhcmQgYWRtaW5qcyBoYW5kbGluZyBleHBlY3RzIHVzIHRvIG92ZXJ3cml0ZS5cclxuICAgICAgICAvLyBIb3dldmVyLCB0aGUgY2xlYW5lc3Qgd2F5IHRvIHN5bmMgYW4gYXJyYXkgaXMgdG8gdXBkYXRlIGVhY2ggaW5kZXguXHJcblxyXG4gICAgICAgIC8vIElkZWFsbHkgd2Ugc2hvdWxkIG51bGxpZnkgb2xkIGtleXMgaWYgYXJyYXkgc2hyaW5rcywgYnV0IHN0YW5kYXJkIGJlaGF2aW9yIG1pZ2h0IGp1c3QgaGFuZGxlIHdoYXQgd2Ugc2VuZC5cclxuICAgICAgICAvLyBBIHNhZmVyIGJldCBpcyB0byByZWx5IG9uIEFkbWluSlMncyBpbnRlcm5hbCBoYW5kbGluZyBpZiB3ZSB3ZXJlIHBhc3NpbmcgdGhlIHdob2xlIG9iamVjdCwgXHJcbiAgICAgICAgLy8gYnV0IGhlcmUgd2UgYXJlIGEgY29tcG9uZW50LlxyXG5cclxuICAgICAgICAvLyBXZSB3aWxsIGp1c3QgdXBkYXRlICdwcm9wZXJ0eS4wJywgJ3Byb3BlcnR5LjEnIGV0Yy5cclxuICAgICAgICAvLyBBbmQgaWRlYWxseSB3ZSBtaWdodCBuZWVkIHRvIGNsZWFyICdwcm9wZXJ0eS4yJyBpZiB3ZSB3ZW50IGZyb20gMyBpdGVtcyB0byAyLlxyXG4gICAgICAgIC8vIFRvIHByb3Blcmx5IFwiY2xlYXJcIiB3ZSBtaWdodCBuZWVkIHRvIHNldCBpdCB0byBudWxsIG9yIHVuZGVmaW5lZC5cclxuXHJcbiAgICAgICAgLy8gU3RyYXRlZ3k6IFVwZGF0ZSBhbGwgY3VycmVudCBpbmRpY2VzLiBcclxuICAgICAgICAvLyBJZiB0aGUgYXJyYXkgc2hyYW5rLCB3ZSBjYW4gdHJ5IHNldHRpbmcgdGhlIG5leHQgaW5kZXggdG8gbnVsbC91bmRlZmluZWQgdG8gc2VlIGlmIGJhY2tlbmQgaGFuZGxlcyBpdCxcclxuICAgICAgICAvLyBvciBqdXN0IHJlbHkgb24gdGhlIGZhY3QgdGhhdCB3ZSBhcmUgcmV3cml0aW5nIHRoZSBwYXJhbXMuXHJcblxyXG4gICAgICAgIC8vIEFjdHVhbGx5LCBvbkNoYW5nZSBleHBlY3RzIChrZXksIHZhbHVlKS5cclxuICAgICAgICAvLyBXZSBuZWVkIHRvIHVwZGF0ZSBtdWx0aXBsZSBrZXlzLiBBZG1pbkpTIGBvbkNoYW5nZWAgbWlnaHQgbm90IHN1cHBvcnQgYmF0Y2ggdXBkYXRlcyBlYXNpbHkgZGVwZW5kaW5nIG9uIHZlcnNpb24uXHJcbiAgICAgICAgLy8gQnV0IHVzdWFsbHkgaXQncyBgb25DaGFuZ2UocHJvcGVydHksIHZhbHVlKWAgd2hlcmUgdmFsdWUgaXMgdGhlIGZ1bGwgdmFsdWU/IFxyXG4gICAgICAgIC8vIE5vLCBmb3IgYXJyYXkgcHJvcGVydGllcywgQWRtaW5KUyBvZnRlbiB0cmVhdHMgdGhlbSBlc3NlbnRpYWxseSBhcyBpbmRpdmlkdWFsIGZpZWxkcyBpZiBmbGF0dGVuZWQuXHJcblxyXG4gICAgICAgIC8vIFdBSVQ6IElmIHdlIHVzZSBhIGN1c3RvbSBjb21wb25lbnQgZm9yIHRoZSAqZW50aXJlIGFycmF5IHByb3BlcnR5KiwgYG9uQ2hhbmdlYCBtaWdodCBhY2NlcHQgdGhlIGFycmF5IGl0c2VsZlxyXG4gICAgICAgIC8vIGlmIHRoZSBiYWNrZW5kIGFkYXB0ZXIgc3VwcG9ydHMgaXQuIEJ1dCBBZG1pbkpTIG9mdGVuIGZsYXR0ZW5zLlxyXG5cclxuICAgICAgICAvLyBMZXQncyBjaGVjayBob3cgc3RhbmRhcmQgYXJyYXkgZWRpdGluZyB3b3Jrcy5cclxuICAgICAgICAvLyBJZiB3ZSBsb29rIGF0IGV4aXN0aW5nIGBJbWFnZUxpc3RDb21wb25lbnRgLCBpdCByZWFkcyBmcm9tIGByZWNvcmQucGFyYW1zYC5cclxuXHJcbiAgICAgICAgLy8gTGV0J3MgdHJ5IHNlbmRpbmcgdGhlIGFycmF5IHRvIGBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBuZXdJbWFnZXMpYC5cclxuICAgICAgICAvLyBNYW55IEFkbWluSlMgYWRhcHRlcnMgKGxpa2UgTW9uZ29vc2UpIGhhbmRsZSB0aGUgYXJyYXkgaWYgcGFzc2VkIGFzIGEgdmFsdWUgdG8gdGhlIG1haW4gcHJvcGVydHkga2V5LlxyXG4gICAgICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIG5ld0ltYWdlcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUFkZCA9ICgpID0+IHtcclxuICAgICAgICB1cGRhdGVSZWNvcmQoWy4uLmltYWdlcywgJyddKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlUmVtb3ZlID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV3SW1hZ2VzID0gWy4uLmltYWdlc107XHJcbiAgICAgICAgbmV3SW1hZ2VzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgdXBkYXRlUmVjb3JkKG5ld0ltYWdlcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgICBjb25zdCBuZXdJbWFnZXMgPSBbLi4uaW1hZ2VzXTtcclxuICAgICAgICBuZXdJbWFnZXNbaW5kZXhdID0gdmFsdWU7XHJcbiAgICAgICAgdXBkYXRlUmVjb3JkKG5ld0ltYWdlcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveCBtYXJnaW5Cb3R0b209XCJ4eGxcIj5cclxuICAgICAgICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxyXG4gICAgICAgICAgICB7aW1hZ2VzLm1hcCgodXJsLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPEJveCBrZXk9e2luZGV4fSBtYXJnaW5Cb3R0b209XCJkZWZhdWx0XCIgZGlzcGxheT1cImZsZXhcIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJveCBtYXJnaW5SaWdodD1cImRlZmF1bHRcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt1cmwgJiYgPGltZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXt1cmx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9e2BJbWFnZSAke2luZGV4ICsgMX1gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6ICc1MHB4JywgaGVpZ2h0OiAnNTBweCcsIG9iamVjdEZpdDogJ2NvdmVyJywgYm9yZGVyUmFkaXVzOiAnNHB4JyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvcj17KGUpID0+IHsgZS50YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJveCBmbGV4R3Jvdz17MX0gbWFyZ2luUmlnaHQ9XCJkZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3VybH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlQ2hhbmdlKGluZGV4LCBlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17MX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiSW1hZ2UgVVJMXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJlbW92ZShpbmRleCl9IHZhcmlhbnQ9XCJkYW5nZXJcIiBzaXplPVwiaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBpY29uPVwiVHJhc2gyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVBZGR9IHR5cGU9XCJidXR0b25cIj5cclxuICAgICAgICAgICAgICAgIDxJY29uIGljb249XCJQbHVzXCIgLz4gQWRkIEltYWdlIFVSTFxyXG4gICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICA8L0JveD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZUxpc3RFZGl0Q29tcG9uZW50O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQXBpQ2xpZW50LCB1c2VSZWNvcmQsIHVzZU5vdGljZSB9IGZyb20gJ2FkbWluanMnO1xyXG5pbXBvcnQge1xyXG4gICAgQm94LFxyXG4gICAgSDMsXHJcbiAgICBMYWJlbCxcclxuICAgIElucHV0LFxyXG4gICAgU2VsZWN0LFxyXG4gICAgQnV0dG9uLFxyXG4gICAgRm9ybUdyb3VwLFxyXG4gICAgQ2hlY2tCb3gsXHJcbiAgICBUZXh0LFxyXG4gICAgTG9hZGVyLFxyXG4gICAgTWVzc2FnZUJveCxcclxufSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcclxuLy8gVXNlIGVtcHR5IHN0cmluZyBmb3IgcmVsYXRpdmUgVVJMIHNpbmNlIEFkbWluSlMgcnVucyBvbiB0aGUgc2FtZSBzZXJ2ZXJcclxuY29uc3QgQkFTRV9VUkwgPSAnJztcclxuXHJcbmNvbnN0IENyZWF0ZVRhc2tGcm9tQWlkUmVxdWVzdCA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyByZWNvcmQsIHJlc291cmNlIH0gPSBwcm9wcztcclxuICAgIGNvbnN0IGFkZE5vdGljZSA9IHVzZU5vdGljZSgpO1xyXG5cclxuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICAgIGNvbnN0IFt2b2x1bnRlZXJzLCBzZXRWb2x1bnRlZXJzXSA9IHVzZVN0YXRlKFtdKTtcclxuICAgIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGUoJycpO1xyXG4gICAgY29uc3QgW2Zvcm1EYXRhLCBzZXRGb3JtRGF0YV0gPSB1c2VTdGF0ZSh7XHJcbiAgICAgICAgdGFza05hbWU6IHJlY29yZD8ucGFyYW1zPy5uYW1lIHx8ICdBaWQgUmVxdWVzdCBUYXNrJyxcclxuICAgICAgICB2b2x1bnRlZXJzTmVlZGVkOiAxLFxyXG4gICAgICAgIGlzT3BlbjogdHJ1ZSxcclxuICAgICAgICBwcmlvcml0eTogcmVjb3JkPy5wYXJhbXM/LnByaW9yaXR5IHx8ICdtZWRpdW0nLFxyXG4gICAgICAgIHNlbGVjdGVkVm9sdW50ZWVyczogW10sXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IFtoYXNFeGlzdGluZ1Rhc2ssIHNldEhhc0V4aXN0aW5nVGFza10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgdGFzayBhbHJlYWR5IGV4aXN0cyBmb3IgdGhpcyBhaWQgcmVxdWVzdFxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBjaGVja0V4aXN0aW5nVGFzayA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUlkOiAnVGFza1NjaGVtYScsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ2xpc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogeyAnZmlsdGVycy5haWRSZXF1ZXN0JzogcmVjb3JkLmlkIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhPy5yZWNvcmRzPy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0SGFzRXhpc3RpbmdUYXNrKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY2hlY2tpbmcgZXhpc3RpbmcgdGFzazonLCBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGNoZWNrRXhpc3RpbmdUYXNrKCk7XHJcbiAgICB9LCBbcmVjb3JkLmlkXSk7XHJcblxyXG4gICAgLy8gRmV0Y2ggdm9sdW50ZWVyc1xyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBmZXRjaFZvbHVudGVlcnMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5yZXNvdXJjZUFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VJZDogJ3VzZXJQcm9maWxlJyxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnbGlzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdmaWx0ZXJzLnJvbGUnOiAndm9sdW50ZWVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyUGFnZTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4oc2VhcmNoUXVlcnkgJiYgeyAnZmlsdGVycy5uYW1lJzogc2VhcmNoUXVlcnkgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGE/LnJlY29yZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRWb2x1bnRlZXJzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhLnJlY29yZHMubWFwKCh2KSA9PiAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHYuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogYCR7di5wYXJhbXMubmFtZX0gKCR7di5wYXJhbXMuc2tpbGwgfHwgJ05vIHNraWxsJ30pYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHZvbHVudGVlcnM6JywgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmZXRjaFZvbHVudGVlcnMoKTtcclxuICAgIH0sIFtzZWFyY2hRdWVyeV0pO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXHJcbiAgICAgICAgICAgICAgICBgJHtCQVNFX1VSTH0vYXBpL2FkbWluL3Rhc2svY3JlYXRlLWZyb20tYWlkLXJlcXVlc3QvJHtyZWNvcmQuaWR9YCxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFza05hbWU6IGZvcm1EYXRhLnRhc2tOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2b2x1bnRlZXJzTmVlZGVkOiBmb3JtRGF0YS52b2x1bnRlZXJzTmVlZGVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc09wZW46IGZvcm1EYXRhLmlzT3BlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHk6IGZvcm1EYXRhLnByaW9yaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZFZvbHVudGVlcnM6IGZvcm1EYXRhLmlzT3BlbiA/IFtdIDogZm9ybURhdGEuc2VsZWN0ZWRWb2x1bnRlZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGFkZE5vdGljZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1Rhc2sgY3JlYXRlZCBzdWNjZXNzZnVsbHkhJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIFJlZGlyZWN0IGJhY2sgdG8gdGhlIGFpZCByZXF1ZXN0IGxpc3RcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9kYXNoYm9hcmQvcmVzb3VyY2VzL0FpZFJlcXVlc3QnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWRkTm90aWNlKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkYXRhLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBjcmVhdGUgdGFzaycsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY3JlYXRpbmcgdGFzazonLCBlcnJvcik7XHJcbiAgICAgICAgICAgIGFkZE5vdGljZSh7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnRXJyb3IgY3JlYXRpbmcgdGFzay4gUGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVWb2x1bnRlZXJTZWxlY3QgPSAoc2VsZWN0ZWQpID0+IHtcclxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3Vm9sdW50ZWVycyA9IEFycmF5LmlzQXJyYXkoc2VsZWN0ZWQpXHJcbiAgICAgICAgICAgICAgICA/IHNlbGVjdGVkLm1hcCgocykgPT4gcy52YWx1ZSkuc2xpY2UoMCwgZm9ybURhdGEudm9sdW50ZWVyc05lZWRlZClcclxuICAgICAgICAgICAgICAgIDogW3NlbGVjdGVkLnZhbHVlXTtcclxuICAgICAgICAgICAgc2V0Rm9ybURhdGEoKHByZXYpID0+ICh7XHJcbiAgICAgICAgICAgICAgICAuLi5wcmV2LFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRWb2x1bnRlZXJzOiBuZXdWb2x1bnRlZXJzLFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0Rm9ybURhdGEoKHByZXYpID0+ICh7XHJcbiAgICAgICAgICAgICAgICAuLi5wcmV2LFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRWb2x1bnRlZXJzOiBbXSxcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKGhhc0V4aXN0aW5nVGFzaykge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxCb3ggdmFyaWFudD1cImdyZXlcIiBwYWRkaW5nPVwieGxcIj5cclxuICAgICAgICAgICAgICAgIDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIiBtZXNzYWdlPVwiQSB0YXNrIGFscmVhZHkgZXhpc3RzIGZvciB0aGlzIGFpZCByZXF1ZXN0LlwiIC8+XHJcbiAgICAgICAgICAgICAgICA8Qm94IG1hcmdpblRvcD1cImxnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+ICh3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvZGFzaGJvYXJkL3Jlc291cmNlcy9BaWRSZXF1ZXN0Jyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYWNrIHRvIEFpZCBSZXF1ZXN0c1xyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94IHZhcmlhbnQ9XCJncmV5XCIgcGFkZGluZz1cInhsXCI+XHJcbiAgICAgICAgICAgIDxIMz5DcmVhdGUgVGFzayBmcm9tIEFpZCBSZXF1ZXN0PC9IMz5cclxuICAgICAgICAgICAgPFRleHQgbWFyZ2luQm90dG9tPVwibGdcIj5cclxuICAgICAgICAgICAgICAgIENyZWF0aW5nIHRhc2sgZm9yOiA8c3Ryb25nPntyZWNvcmQ/LnBhcmFtcz8ubmFtZSB8fCAnVW5rbm93biBSZXF1ZXN0J308L3N0cm9uZz5cclxuICAgICAgICAgICAgPC9UZXh0PlxyXG5cclxuICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMYWJlbD5UYXNrIE5hbWU8L0xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEudGFza05hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoeyAuLi5wcmV2LCB0YXNrTmFtZTogZS50YXJnZXQudmFsdWUgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcblxyXG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cD5cclxuICAgICAgICAgICAgICAgICAgICA8TGFiZWw+UHJpb3JpdHk8L0xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3sgdmFsdWU6IGZvcm1EYXRhLnByaW9yaXR5LCBsYWJlbDogZm9ybURhdGEucHJpb3JpdHkgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJ2hpZ2gnLCBsYWJlbDogJ0hpZ2gnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnbWVkaXVtJywgbGFiZWw6ICdNZWRpdW0nIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnbG93JywgbGFiZWw6ICdMb3cnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoc2VsZWN0ZWQpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRGb3JtRGF0YSgocHJldikgPT4gKHsgLi4ucHJldiwgcHJpb3JpdHk6IHNlbGVjdGVkLnZhbHVlIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG5cclxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgICAgPExhYmVsPlZvbHVudGVlcnMgTmVlZGVkPC9MYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbj1cIjFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEudm9sdW50ZWVyc05lZWRlZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Rm9ybURhdGEoKHByZXYpID0+ICh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2x1bnRlZXJzTmVlZGVkOiBwYXJzZUludChlLnRhcmdldC52YWx1ZSwgMTApIHx8IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuXHJcbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgIDxDaGVja0JveFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZD1cImlzT3BlblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2Zvcm1EYXRhLmlzT3Blbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRGb3JtRGF0YSgocHJldikgPT4gKHsgLi4ucHJldiwgaXNPcGVuOiAhcHJldi5pc09wZW4gfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMYWJlbCBpbmxpbmUgaHRtbEZvcj1cImlzT3BlblwiIG1hcmdpbkxlZnQ9XCJkZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9wZW4gVGFzayAodm9sdW50ZWVycyBjYW4gY2xhaW0gZnJvbSBtYXJrZXRwbGFjZSlcclxuICAgICAgICAgICAgICAgICAgICA8L0xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcblxyXG4gICAgICAgICAgICAgICAgeyFmb3JtRGF0YS5pc09wZW4gJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtR3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2lnbiBWb2x1bnRlZXJzIHtmb3JtRGF0YS52b2x1bnRlZXJzTmVlZGVkID4gMSAmJiBgKG1heCAke2Zvcm1EYXRhLnZvbHVudGVlcnNOZWVkZWR9KWB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTXVsdGk9e2Zvcm1EYXRhLnZvbHVudGVlcnNOZWVkZWQgPiAxfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWFyY2hhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXt2b2x1bnRlZXJzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3ZvbHVudGVlcnMuZmlsdGVyKHYgPT4gZm9ybURhdGEuc2VsZWN0ZWRWb2x1bnRlZXJzLmluY2x1ZGVzKHYudmFsdWUpKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoc2VsZWN0ZWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEZvcm1EYXRhKHByZXYgPT4gKHsgLi4ucHJldiwgc2VsZWN0ZWRWb2x1bnRlZXJzOiBbXSB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VmFsdWVzID0gQXJyYXkuaXNBcnJheShzZWxlY3RlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBzZWxlY3RlZC5zbGljZSgwLCBmb3JtRGF0YS52b2x1bnRlZXJzTmVlZGVkKS5tYXAocyA9PiBzLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtzZWxlY3RlZC52YWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Rm9ybURhdGEocHJldiA9PiAoeyAuLi5wcmV2LCBzZWxlY3RlZFZvbHVudGVlcnM6IG5ld1ZhbHVlcyB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2Zvcm1EYXRhLnZvbHVudGVlcnNOZWVkZWQgPiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgU2VsZWN0IHVwIHRvICR7Zm9ybURhdGEudm9sdW50ZWVyc05lZWRlZH0gdm9sdW50ZWVycy4uLmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiU2VsZWN0IGEgdm9sdW50ZWVyLi4uXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtmb3JtRGF0YS5zZWxlY3RlZFZvbHVudGVlcnMubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBtYXJnaW5Ub3A9XCJzbVwiIGNvbG9yPVwiZ3JleTYwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0ZWQ6IHtmb3JtRGF0YS5zZWxlY3RlZFZvbHVudGVlcnMubGVuZ3RofS97Zm9ybURhdGEudm9sdW50ZWVyc05lZWRlZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuICAgICAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICAgICAgPEJveCBtYXJnaW5Ub3A9XCJ4bFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdHlwZT1cInN1Ym1pdFwiIHZhcmlhbnQ9XCJwcmltYXJ5XCIgZGlzYWJsZWQ9e2xvYWRpbmd9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bG9hZGluZyA/IDxMb2FkZXIgLz4gOiAnQ3JlYXRlIFRhc2snfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luTGVmdD1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiAod2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2Rhc2hib2FyZC9yZXNvdXJjZXMvQWlkUmVxdWVzdCcpfVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgQ2FuY2VsXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENyZWF0ZVRhc2tGcm9tQWlkUmVxdWVzdDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBCdXR0b24sIElucHV0LCBMYWJlbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBNYXBQaWNrZXIgPSAocHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgcmVjb3JkLCBwcm9wZXJ0eSwgb25DaGFuZ2UgfSA9IHByb3BzO1xyXG4gICAgY29uc3QgbWFwQ29udGFpbmVyUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gICAgY29uc3QgbWFwSW5zdGFuY2VSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgICBjb25zdCBtYXJrZXJSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gICAgLy8gSW5pdGlhbCBWYWx1ZXNcclxuICAgIGNvbnN0IGdldEluaXRpYWxWYWx1ZSA9IChwYXRoKSA9PiByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9LiR7cGF0aH1gXTtcclxuICAgIGNvbnN0IGluaXRpYWxMYXQgPSBwYXJzZUZsb2F0KGdldEluaXRpYWxWYWx1ZSgnbG9jYXRpb24uY29vcmRpbmF0ZXMuMScpKSB8fCAwO1xyXG4gICAgY29uc3QgaW5pdGlhbExuZyA9IHBhcnNlRmxvYXQoZ2V0SW5pdGlhbFZhbHVlKCdsb2NhdGlvbi5jb29yZGluYXRlcy4wJykpIHx8IDA7XHJcblxyXG4gICAgY29uc3QgW3Bvc2l0aW9uLCBzZXRQb3NpdGlvbl0gPSB1c2VTdGF0ZShpbml0aWFsTGF0ICYmIGluaXRpYWxMbmcgPyBbaW5pdGlhbExhdCwgaW5pdGlhbExuZ10gOiBudWxsKTtcclxuICAgIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGUoJycpO1xyXG5cclxuICAgIGNvbnN0IFthZGRyZXNzRGF0YSwgc2V0QWRkcmVzc0RhdGFdID0gdXNlU3RhdGUoe1xyXG4gICAgICAgIGFkZHJlc3NMaW5lMTogZ2V0SW5pdGlhbFZhbHVlKCdhZGRyZXNzTGluZTEnKSB8fCAnJyxcclxuICAgICAgICBhZGRyZXNzTGluZTI6IGdldEluaXRpYWxWYWx1ZSgnYWRkcmVzc0xpbmUyJykgfHwgJycsXHJcbiAgICAgICAgYWRkcmVzc0xpbmUzOiBnZXRJbml0aWFsVmFsdWUoJ2FkZHJlc3NMaW5lMycpIHx8ICcnLFxyXG4gICAgICAgIHBpbkNvZGU6IGdldEluaXRpYWxWYWx1ZSgncGluQ29kZScpIHx8ICcnLFxyXG4gICAgICAgIGxvY2F0aW9uOiB7IHR5cGU6ICdQb2ludCcsIGNvb3JkaW5hdGVzOiBbaW5pdGlhbExuZywgaW5pdGlhbExhdF0gfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGVscGVyIHRvIHRyaWdnZXIgQWRtaW5KUyBvbkNoYW5nZVxyXG4gICAgLy8gV2Ugd3JhcCB0aGlzIGluIGEgY3VzdG9taXplZCBob29rIG9yIGp1c3QgY2FsbCBpdCBpbiB1c2VFZmZlY3RcclxuICAgIGNvbnN0IHVwZGF0ZVJlY29yZCA9IChkYXRhKSA9PiB7XHJcbiAgICAgICAgLy8gU2FuaXRpemUgcGluQ29kZTogT25seSBkaWdpdHMsIG9yIG51bGxcclxuICAgICAgICBsZXQgY2xlYW5QaW4gPSBudWxsO1xyXG4gICAgICAgIGlmIChkYXRhLnBpbkNvZGUpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RyUGluID0gU3RyaW5nKGRhdGEucGluQ29kZSkucmVwbGFjZSgvXFxEL2csICcnKTsgLy8gUmVtb3ZlIG5vbi1kaWdpdHNcclxuICAgICAgICAgICAgaWYgKHN0clBpbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhblBpbiA9IHBhcnNlSW50KHN0clBpbiwgMTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xyXG4gICAgICAgICAgICBhZGRyZXNzTGluZTE6IGRhdGEuYWRkcmVzc0xpbmUxIHx8ICcnLFxyXG4gICAgICAgICAgICBhZGRyZXNzTGluZTI6IGRhdGEuYWRkcmVzc0xpbmUyIHx8ICcnLFxyXG4gICAgICAgICAgICBhZGRyZXNzTGluZTM6IGRhdGEuYWRkcmVzc0xpbmUzIHx8ICcnLFxyXG4gICAgICAgICAgICBwaW5Db2RlOiBjbGVhblBpbixcclxuICAgICAgICAgICAgbG9jYXRpb246IHtcclxuICAgICAgICAgICAgICAgIC4uLmRhdGEubG9jYXRpb24sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnUG9pbnQnLFxyXG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KGRhdGEubG9jYXRpb24/LmNvb3JkaW5hdGVzPy5bMF0pIHx8IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VGbG9hdChkYXRhLmxvY2F0aW9uPy5jb29yZGluYXRlcz8uWzFdKSB8fCAwXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnW0RFQlVHXSBNYXBQaWNrZXIgcGF5bG9hZCAoT2JqZWN0KTonLCBwYXlsb2FkKTtcclxuICAgICAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBwYXlsb2FkKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gR2VuZXJpYyBBZGRyZXNzIFVwZGF0ZXIgZnJvbSBOb21pbmF0aW0gRGF0YVxyXG4gICAgY29uc3QgdXBkYXRlQWRkcmVzc0Zyb21Ob21pbmF0aW0gPSAoZGF0YSwgbGF0LCBsbmcpID0+IHtcclxuICAgICAgICBjb25zdCBhZGRyZXNzID0gZGF0YS5hZGRyZXNzIHx8IHt9O1xyXG5cclxuICAgICAgICAvLyBDb25zdHJ1Y3QgQWRkcmVzcyBMaW5lIDEgKFNpZ25pZmljYW50IHBsYWNlIG5hbWUpXHJcbiAgICAgICAgLy8gT3JkZXIgb2YgcHJlZmVyZW5jZTogYW1lbml0eSwgYnVpbGRpbmcsIHJvYWQsIHZpbGxhZ2UsIHN1YnVyYiwgdG93biwgY2l0eVxyXG4gICAgICAgIGNvbnN0IGxpbmUxID0gYWRkcmVzcy5hbWVuaXR5IHx8IGFkZHJlc3MuYnVpbGRpbmcgfHwgYWRkcmVzcy5yb2FkIHx8IGFkZHJlc3MudmlsbGFnZSB8fCBhZGRyZXNzLnN1YnVyYiB8fCBhZGRyZXNzLnRvd24gfHwgYWRkcmVzcy5jaXR5IHx8IGRhdGEuZGlzcGxheV9uYW1lLnNwbGl0KCcsJylbMF07XHJcblxyXG4gICAgICAgIC8vIENvbnN0cnVjdCBBZGRyZXNzIExpbmUgMiAoRGlzdHJpY3QvU3RhdGUvUmVnaW9uKVxyXG4gICAgICAgIGNvbnN0IGxpbmUyID0gW2FkZHJlc3MuY2l0eSB8fCBhZGRyZXNzLnRvd24sIGFkZHJlc3Muc3RhdGVfZGlzdHJpY3QsIGFkZHJlc3Muc3RhdGVdLmZpbHRlcih4ID0+IHgpLmpvaW4oJywgJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBvc3Rjb2RlID0gYWRkcmVzcy5wb3N0Y29kZSB8fCAnJztcclxuXHJcbiAgICAgICAgc2V0QWRkcmVzc0RhdGEocHJldiA9PiAoe1xyXG4gICAgICAgICAgICAuLi5wcmV2LFxyXG4gICAgICAgICAgICBhZGRyZXNzTGluZTE6IGxpbmUxIHx8ICcnLFxyXG4gICAgICAgICAgICBhZGRyZXNzTGluZTI6IGxpbmUyIHx8ICcnLFxyXG4gICAgICAgICAgICBhZGRyZXNzTGluZTM6IHByZXYuYWRkcmVzc0xpbmUzIHx8ICcnLFxyXG4gICAgICAgICAgICBwaW5Db2RlOiBwb3N0Y29kZSxcclxuICAgICAgICAgICAgbG9jYXRpb246IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdQb2ludCcsXHJcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlczogW2xuZywgbGF0XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBIYW5kbGUgUmV2ZXJzZSBHZW9jb2RpbmcgdmlhIE5vbWluYXRpbVxyXG4gICAgY29uc3QgcmV2ZXJzZUdlb2NvZGUgPSBhc3luYyAobGF0LCBsbmcpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy9yZXZlcnNlP2Zvcm1hdD1qc29uJmxhdD0ke2xhdH0mbG9uPSR7bG5nfSZhZGRyZXNzZGV0YWlscz0xJmFjY2VwdC1sYW5ndWFnZT1lbmAsIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1VzZXItQWdlbnQnOiAnUmVsaWVmRmxvd0FkbWluLzEuMCcgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5hZGRyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVBZGRyZXNzRnJvbU5vbWluYXRpbShkYXRhLCBsYXQsIGxuZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXZlcnNlIGdlb2NvZGluZyBmYWlsZWRcIiwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBMb2FkIExlYWZsZXQgZnJvbSBDRE5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbG9hZExlYWZsZXQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuTCkgcmV0dXJuIHdpbmRvdy5MO1xyXG5cclxuICAgICAgICAgICAgLy8gTG9hZCBDU1NcclxuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVhZmxldC1jc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuICAgICAgICAgICAgICAgIGxpbmsuaWQgPSAnbGVhZmxldC1jc3MnO1xyXG4gICAgICAgICAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XHJcbiAgICAgICAgICAgICAgICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldEAxLjkuNC9kaXN0L2xlYWZsZXQuY3NzJztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIExvYWQgSlNcclxuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVhZmxldC1qcycpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICAgICAgICAgIHNjcmlwdC5pZCA9ICdsZWFmbGV0LWpzJztcclxuICAgICAgICAgICAgICAgIHNjcmlwdC5zcmMgPSAnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldEAxLjkuNC9kaXN0L2xlYWZsZXQuanMnO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7IHNjcmlwdC5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKHdpbmRvdy5MKTsgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBXYWl0IGZvciBpdCB0byBiZSByZWFkeVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2sgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuTCkgeyBjbGVhckludGVydmFsKGNoZWNrKTsgcmVzb2x2ZSh3aW5kb3cuTCk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsb2FkTGVhZmxldCgpLnRoZW4oKEwpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFtYXBJbnN0YW5jZVJlZi5jdXJyZW50ICYmIG1hcENvbnRhaW5lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZW50ZXIgPSBwb3NpdGlvbiB8fCBbMTAuODUwNSwgNzYuMjcxMV07IC8vIERlZmF1bHQgS2VyYWxhXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXAgPSBMLm1hcChtYXBDb250YWluZXJSZWYuY3VycmVudCkuc2V0VmlldyhjZW50ZXIsIHBvc2l0aW9uID8gMTUgOiA3KTtcclxuXHJcbiAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICfCqSBPcGVuU3RyZWV0TWFwIGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG1hcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2xpY2sgZXZlbnRcclxuICAgICAgICAgICAgICAgIG1hcC5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbGF0LCBsbmcgfSA9IGUubGF0bG5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BvcyA9IFtsYXQsIGxuZ107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXJrZXJSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXJSZWYuY3VycmVudC5zZXRMYXRMbmcobmV3UG9zKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXJSZWYuY3VycmVudCA9IEwubWFya2VyKG5ld1BvcykuYWRkVG8obWFwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldFBvc2l0aW9uKG5ld1Bvcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgUmV2ZXJzZSBHZW9jb2RpbmdcclxuICAgICAgICAgICAgICAgICAgICByZXZlcnNlR2VvY29kZShsYXQsIGxuZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9wdGltaXN0aWMgdXBkYXRlIG9mIGNvb3JkaW5hdGVzXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0QWRkcmVzc0RhdGEocHJldiA9PiAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BvaW50JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbbG5nLCBsYXRdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBtYXBJbnN0YW5jZVJlZi5jdXJyZW50ID0gbWFwO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEluaXRpYWwgbWFya2VyXHJcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXJSZWYuY3VycmVudCA9IEwubWFya2VyKHBvc2l0aW9uKS5hZGRUbyhtYXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENsZWFudXBcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobWFwSW5zdGFuY2VSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gbWFwSW5zdGFuY2VSZWYuY3VycmVudC5yZW1vdmUoKTsgLy8gUmVtb3ZpbmcgbWlnaHQgYmUgYWdncmVzc2l2ZSBpZiBjb21wb25lbnQgcmVtb3VudHNcclxuICAgICAgICAgICAgICAgIC8vIG1hcEluc3RhbmNlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0sIFtdKTsgLy8gRW1wdHkgZGVwcywgcnVuIG9uY2Ugb24gbW91bnRcclxuXHJcbiAgICAvLyBTeW5jIHN0YXRlIGNoYW5nZXMgdG8gQWRtaW5KU1xyXG4gICAgLy8gVGhpcyBpcyB0aGUgT05MWSBwbGFjZSB3aGVyZSB3ZSBub3RpZnkgQWRtaW5KUyBvZiBjaGFuZ2VzXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIHVwZGF0ZVJlY29yZChhZGRyZXNzRGF0YSk7XHJcbiAgICB9LCBbYWRkcmVzc0RhdGFdKTtcclxuXHJcblxyXG4gICAgLy8gSGFuZGxlIFNlYXJjaFxyXG4gICAgY29uc3QgaGFuZGxlU2VhcmNoID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGlmICghc2VhcmNoUXVlcnkgfHwgIXdpbmRvdy5MIHx8ICFtYXBJbnN0YW5jZVJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvc2VhcmNoP2Zvcm1hdD1qc29uJnE9JHtzZWFyY2hRdWVyeX0mbGltaXQ9MSZhZGRyZXNzZGV0YWlscz0xJmFjY2VwdC1sYW5ndWFnZT1lbmAsIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1VzZXItQWdlbnQnOiAnUmVsaWVmRmxvd0FkbWluLzEuMCcgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGxhdCwgbG9uIH0gPSBkYXRhWzBdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UG9zID0gW3BhcnNlRmxvYXQobGF0KSwgcGFyc2VGbG9hdChsb24pXTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBMID0gd2luZG93Lkw7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXAgPSBtYXBJbnN0YW5jZVJlZi5jdXJyZW50O1xyXG4gICAgICAgICAgICAgICAgbWFwLnNldFZpZXcobmV3UG9zLCAxNSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1hcmtlclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyUmVmLmN1cnJlbnQuc2V0TGF0TG5nKG5ld1Bvcyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlclJlZi5jdXJyZW50ID0gTC5tYXJrZXIobmV3UG9zKS5hZGRUbyhtYXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNldFBvc2l0aW9uKG5ld1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIGRldGFpbGVkIGFkZHJlc3MgZnJvbSBzZWFyY2ggcmVzdWx0XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVBZGRyZXNzRnJvbU5vbWluYXRpbShkYXRhWzBdLCBwYXJzZUZsb2F0KGxhdCksIHBhcnNlRmxvYXQobG9uKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTZWFyY2ggZmFpbGVkXCIsIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGVidWc6IExvZyBlcnJvcnMgb24gZXZlcnkgcmVuZGVyXHJcbiAgICBpZiAocmVjb3JkPy5lcnJvcnMgJiYgT2JqZWN0LmtleXMocmVjb3JkLmVycm9ycykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbREVCVUddIFJlbmRlciBSZWNvcmQgZXJyb3JzOicsIEpTT04uc3RyaW5naWZ5KHJlY29yZC5lcnJvcnMsIG51bGwsIDIpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxCb3ggbWI9XCJ4bFwiPlxyXG4gICAgICAgICAgICA8TGFiZWw+TG9jYXRpb24gU2VhcmNoPC9MYWJlbD5cclxuICAgICAgICAgICAgPEJveCBmbGV4IGZsZXhEaXJlY3Rpb249XCJyb3dcIiBtYj1cImRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2hRdWVyeX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlYXJjaFF1ZXJ5KGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmb3IgYSBwbGFjZSAoZS5nLiBNYXZlbGlra2FyYSlcIlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGZsZXhHcm93OiAxLCBtYXJnaW5SaWdodDogJzEwcHgnIH19XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVTZWFyY2h9IHR5cGU9XCJidXR0b25cIj5TZWFyY2g8L0J1dHRvbj5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAgICA8Qm94IGhlaWdodD1cIjQwMHB4XCIgbWI9XCJkZWZhdWx0XCIgYm9yZGVyPVwiZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9e21hcENvbnRhaW5lclJlZn0gc3R5bGU9e3sgaGVpZ2h0OiAnMTAwJScsIHdpZHRoOiAnMTAwJScgfX0gLz5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAgICA8Rm9ybUdyb3VwPlxyXG4gICAgICAgICAgICAgICAgPExhYmVsPlNoZWx0ZXIgQWRkcmVzcyBMaW5lIDE8L0xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FkZHJlc3NEYXRhLmFkZHJlc3NMaW5lMX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEFkZHJlc3NEYXRhKHByZXYgPT4gKHsgLi4ucHJldiwgYWRkcmVzc0xpbmUxOiBlLnRhcmdldC52YWx1ZSB9KSl9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuXHJcbiAgICAgICAgICAgIDxGb3JtR3JvdXA+XHJcbiAgICAgICAgICAgICAgICA8TGFiZWw+U2hlbHRlciBBZGRyZXNzIExpbmUgMjwvTGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YWRkcmVzc0RhdGEuYWRkcmVzc0xpbmUyfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QWRkcmVzc0RhdGEocHJldiA9PiAoeyAuLi5wcmV2LCBhZGRyZXNzTGluZTI6IGUudGFyZ2V0LnZhbHVlIH0pKX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG5cclxuICAgICAgICAgICAgPEZvcm1Hcm91cD5cclxuICAgICAgICAgICAgICAgIDxMYWJlbD5TaGVsdGVyIEFkZHJlc3MgTGluZSAzPC9MYWJlbD5cclxuICAgICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXthZGRyZXNzRGF0YS5hZGRyZXNzTGluZTN9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRBZGRyZXNzRGF0YShwcmV2ID0+ICh7IC4uLnByZXYsIGFkZHJlc3NMaW5lMzogZS50YXJnZXQudmFsdWUgfSkpfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcblxyXG4gICAgICAgICAgICA8Rm9ybUdyb3VwPlxyXG4gICAgICAgICAgICAgICAgPExhYmVsPlBpbiBDb2RlPC9MYWJlbD5cclxuICAgICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXthZGRyZXNzRGF0YS5waW5Db2RlfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QWRkcmVzc0RhdGEocHJldiA9PiAoeyAuLi5wcmV2LCBwaW5Db2RlOiBlLnRhcmdldC52YWx1ZSB9KSl9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuXHJcbiAgICAgICAgICAgIDxCb3g+XHJcbiAgICAgICAgICAgICAgICA8TGFiZWw+Q29vcmRpbmF0ZXM8L0xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzAuOGVtJywgY29sb3I6ICcjODg4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICBMYXQ6IHthZGRyZXNzRGF0YS5sb2NhdGlvbj8uY29vcmRpbmF0ZXM/LlsxXSB8fCAwfSxcclxuICAgICAgICAgICAgICAgICAgICBMbmc6IHthZGRyZXNzRGF0YS5sb2NhdGlvbj8uY29vcmRpbmF0ZXM/LlswXSB8fCAwfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hcFBpY2tlcjtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBMYWJlbCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgTWFwU2hvdyA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyByZWNvcmQsIHByb3BlcnR5IH0gPSBwcm9wcztcclxuICAgIGNvbnN0IG1hcENvbnRhaW5lclJlZiA9IHVzZVJlZihudWxsKTtcclxuICAgIGNvbnN0IG1hcEluc3RhbmNlUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gICAgY29uc3QgbWFya2VyUmVmID0gdXNlUmVmKG51bGwpO1xyXG5cclxuICAgIC8vIEluaXRpYWwgVmFsdWVzXHJcbiAgICAvLyBBZG1pbkpTIGZsYXR0ZW5zIG5lc3RlZCBvYmplY3RzIGluIHBhcmFtcywgZS5nLiAnbG9jYXRpb24uY29vcmRpbmF0ZXMuMCdcclxuICAgIGNvbnN0IGdldEluaXRpYWxWYWx1ZSA9IChwYXRoKSA9PiByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9LiR7cGF0aH1gXTtcclxuXHJcbiAgICAvLyBOb3RlOiBHZW9KU09OIHN0b3JlcyBbbG5nLCBsYXRdLCBidXQgTGVhZmxldCB1c2VzIFtsYXQsIGxuZ11cclxuICAgIGNvbnN0IGluaXRpYWxMbmcgPSBwYXJzZUZsb2F0KGdldEluaXRpYWxWYWx1ZSgnY29vcmRpbmF0ZXMuMCcpKTtcclxuICAgIGNvbnN0IGluaXRpYWxMYXQgPSBwYXJzZUZsb2F0KGdldEluaXRpYWxWYWx1ZSgnY29vcmRpbmF0ZXMuMScpKTtcclxuXHJcbiAgICBjb25zdCBoYXNMb2NhdGlvbiA9ICFpc05hTihpbml0aWFsTGF0KSAmJiAhaXNOYU4oaW5pdGlhbExuZyk7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IGhhc0xvY2F0aW9uID8gW2luaXRpYWxMYXQsIGluaXRpYWxMbmddIDogbnVsbDtcclxuXHJcbiAgICAvLyBMb2FkIExlYWZsZXQgZnJvbSBDRE5zXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxvYWRMZWFmbGV0ID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LkwpIHJldHVybiB3aW5kb3cuTDtcclxuXHJcbiAgICAgICAgICAgIC8vIExvYWQgQ1NTXHJcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlYWZsZXQtY3NzJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XHJcbiAgICAgICAgICAgICAgICBsaW5rLmlkID0gJ2xlYWZsZXQtY3NzJztcclxuICAgICAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xyXG4gICAgICAgICAgICAgICAgbGluay5ocmVmID0gJ2h0dHBzOi8vdW5wa2cuY29tL2xlYWZsZXRAMS45LjQvZGlzdC9sZWFmbGV0LmNzcyc7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBMb2FkIEpTXHJcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlYWZsZXQtanMnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHQuaWQgPSAnbGVhZmxldC1qcyc7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHQuc3JjID0gJ2h0dHBzOi8vdW5wa2cuY29tL2xlYWZsZXRAMS45LjQvZGlzdC9sZWFmbGV0LmpzJztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4geyBzY3JpcHQub25sb2FkID0gKCkgPT4gcmVzb2x2ZSh3aW5kb3cuTCk7IH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gV2FpdCBmb3IgaXQgdG8gYmUgcmVhZHlcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LkwpIHsgY2xlYXJJbnRlcnZhbChjaGVjayk7IHJlc29sdmUod2luZG93LkwpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGhhc0xvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGxvYWRMZWFmbGV0KCkudGhlbigoTCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtYXBJbnN0YW5jZVJlZi5jdXJyZW50ICYmIG1hcENvbnRhaW5lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VudGVyID0gcG9zaXRpb24gfHwgWzEwLjg1MDUsIDc2LjI3MTFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcCA9IEwubWFwKG1hcENvbnRhaW5lclJlZi5jdXJyZW50KS5zZXRWaWV3KGNlbnRlciwgMTUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnwqkgT3BlblN0cmVldE1hcCBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYWRkVG8obWFwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSW5pdGlhbCBtYXJrZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyUmVmLmN1cnJlbnQgPSBMLm1hcmtlcihwb3NpdGlvbikuYWRkVG8obWFwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIERpc2FibGUgaW50ZXJhY3Rpb25zIGZvciByZWFkLW9ubHkgdmlld1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcC5kcmFnZ2luZy5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLnRvdWNoWm9vbS5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLmRvdWJsZUNsaWNrWm9vbS5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLnNjcm9sbFdoZWVsWm9vbS5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLmJveFpvb20uZGlzYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcC5rZXlib2FyZC5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcC50YXApIG1hcC50YXAuZGlzYWJsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXBJbnN0YW5jZVJlZi5jdXJyZW50ID0gbWFwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENsZWFudXBcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBXZSBnZW5lcmFsbHkgZGVwZW5kIG9uIHRoZSBjb21wb25lbnQgdW5tb3VudGluZyB0byBjbGVhbiBET00gcmVmcywgXHJcbiAgICAgICAgICAgIC8vIGJ1dCBMZWFmbGV0IGluc3RhbmNlcyBtaWdodCBuZWVkIG1hbnVhbCBjbGVhbnVwIGlmIHdlIHdlcmUgcmUtbW91bnRpbmcgaGVhdmlseS5cclxuICAgICAgICAgICAgLy8gRm9yIHNpbXBsZSBzaG93IHZpZXdzLCB0aGlzIGlzIHVzdWFsbHkgZmluZS5cclxuICAgICAgICB9O1xyXG4gICAgfSwgW2hhc0xvY2F0aW9uXSk7XHJcblxyXG4gICAgaWYgKCFoYXNMb2NhdGlvbikge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxCb3ggbWI9XCJ4bFwiPlxyXG4gICAgICAgICAgICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPEJveD5ObyBsb2NhdGlvbiBkYXRhIGF2YWlsYWJsZTwvQm94PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveCBtYj1cInhsXCI+XHJcbiAgICAgICAgICAgIDxMYWJlbD57cHJvcGVydHkubGFiZWx9PC9MYWJlbD5cclxuICAgICAgICAgICAgPEJveCBoZWlnaHQ9XCI0MDBweFwiIG1iPVwiZGVmYXVsdFwiIGJvcmRlcj1cImRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPXttYXBDb250YWluZXJSZWZ9IHN0eWxlPXt7IGhlaWdodDogJzEwMCUnLCB3aWR0aDogJzEwMCUnIH19IC8+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICA8Qm94PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzAuOGVtJywgY29sb3I6ICcjODg4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICBMYXQ6IHtpbml0aWFsTGF0fSwgTG5nOiB7aW5pdGlhbExuZ31cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICA8L0JveD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYXBTaG93O1xyXG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0Rhc2hib2FyZCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRGFzaGJvYXJkID0gRGFzaGJvYXJkXG5pbXBvcnQgTGlua0NvbXBvbmVudCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTGlua0NvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuTGlua0NvbXBvbmVudCA9IExpbmtDb21wb25lbnRcbmltcG9ydCBWb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlZvbHVudGVlckZpbHRlcmVkU2VsZWN0ID0gVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3RcbmltcG9ydCBTdGF0dXNGaWx0ZXJlZFNlbGVjdCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvQWlkUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5TdGF0dXNGaWx0ZXJlZFNlbGVjdCA9IFN0YXR1c0ZpbHRlcmVkU2VsZWN0XG5pbXBvcnQgRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0RvbmF0aW9uUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Eb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdCA9IERvbmF0aW9uUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0XG5pbXBvcnQgTG9naW5Db21wb25lbnQgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0xvZ2luQ29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Mb2dpbkNvbXBvbmVudCA9IExvZ2luQ29tcG9uZW50XG5pbXBvcnQgSW1hZ2VDb21wb25lbnQgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlQ29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5JbWFnZUNvbXBvbmVudCA9IEltYWdlQ29tcG9uZW50XG5pbXBvcnQgSW1hZ2VMaXN0Q29tcG9uZW50IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUxpc3RDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlTGlzdENvbXBvbmVudCA9IEltYWdlTGlzdENvbXBvbmVudFxuaW1wb3J0IEltYWdlRWRpdENvbXBvbmVudCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSW1hZ2VFZGl0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5JbWFnZUVkaXRDb21wb25lbnQgPSBJbWFnZUVkaXRDb21wb25lbnRcbmltcG9ydCBJbWFnZUxpc3RFZGl0Q29tcG9uZW50IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUxpc3RFZGl0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5JbWFnZUxpc3RFZGl0Q29tcG9uZW50ID0gSW1hZ2VMaXN0RWRpdENvbXBvbmVudFxuaW1wb3J0IENyZWF0ZVRhc2tGcm9tQWlkUmVxdWVzdCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvQ3JlYXRlVGFza0Zyb21BaWRSZXF1ZXN0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5DcmVhdGVUYXNrRnJvbUFpZFJlcXVlc3QgPSBDcmVhdGVUYXNrRnJvbUFpZFJlcXVlc3RcbmltcG9ydCBNYXBQaWNrZXIgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL01hcFBpY2tlcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuTWFwUGlja2VyID0gTWFwUGlja2VyXG5pbXBvcnQgTWFwU2hvdyBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTWFwU2hvdydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuTWFwU2hvdyA9IE1hcFNob3ciXSwibmFtZXMiOlsiRGFzaGJvYXJkIiwiY3VycmVudEFkbWluIiwidXNlQ3VycmVudEFkbWluIiwic3RhdHMiLCJzZXRTdGF0cyIsInVzZVN0YXRlIiwiYWlkUmVxdWVzdHMiLCJkb25hdGlvbnMiLCJ0YXNrcyIsInVzZXJzIiwidXNlRWZmZWN0IiwiZmV0Y2hTdGF0cyIsImFwaSIsIkFwaUNsaWVudCIsImVycm9yIiwiY29uc29sZSIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIkJveCIsIm1iIiwiSDIiLCJUZXh0IiwibXQiLCJlbWFpbCIsImRpc3BsYXkiLCJmbGV4V3JhcCIsImdhcCIsImZsZXgiLCJtaW5XaWR0aCIsImJnIiwicCIsImJvcmRlclJhZGl1cyIsImJveFNoYWRvdyIsIkg1IiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwiY29sb3IiLCJhcyIsImhyZWYiLCJib3JkZXIiLCJzdHlsZSIsInRleHREZWNvcmF0aW9uIiwiY3Vyc29yIiwiRGF0ZSIsInRvTG9jYWxlU3RyaW5nIiwiTGlua0NvbXBvbmVudCIsInByb3BzIiwicmVjb3JkIiwicHJvcGVydHkiLCJsYXQiLCJwYXJhbXMiLCJuYW1lIiwibG9uZyIsImFkZHJlc3NQYXJ0cyIsImZpbHRlciIsInBhcnQiLCJ0b1N0cmluZyIsInRyaW0iLCJxdWVyeSIsImxlbmd0aCIsImVuY29kZVVSSUNvbXBvbmVudCIsImpvaW4iLCJtYXBzTGluayIsInRhcmdldCIsInJlbCIsIlZvbHVudGVlckZpbHRlcmVkU2VsZWN0Iiwib25DaGFuZ2UiLCJ2b2x1bnRlZXJzIiwic2V0Vm9sdW50ZWVycyIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZmV0Y2hWb2x1bnRlZXJzIiwicmVzcG9uc2UiLCJyZXNvdXJjZUFjdGlvbiIsInJlc291cmNlSWQiLCJhY3Rpb25OYW1lIiwicGVyUGFnZSIsImRhdGEiLCJyZWNvcmRzIiwibG9nIiwibWFwIiwidiIsInZhbHVlIiwiaWQiLCJsYWJlbCIsImhhbmRsZUNoYW5nZSIsInNlbGVjdGVkIiwic2VsZWN0ZWRPcHRpb24iLCJmaW5kIiwib3B0IiwiRm9ybUdyb3VwIiwiTGFiZWwiLCJyZXF1aXJlZCIsIlNlbGVjdCIsIm9wdGlvbnMiLCJpc0xvYWRpbmciLCJpc0NsZWFyYWJsZSIsInBsYWNlaG9sZGVyIiwiZGVzY3JpcHRpb24iLCJGb3JtTWVzc2FnZSIsIlN0YXR1c0ZpbHRlcmVkU2VsZWN0Iiwic3RhdHVzIiwic2V0U3RhdHVzIiwiZmV0Y2hTdGF0dXMiLCJEb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdCIsIkxvZ2luQ29tcG9uZW50Iiwic2V0RW1haWwiLCJwYXNzd29yZCIsInNldFBhc3N3b3JkIiwic2V0RXJyb3IiLCJzaG93UGFzc3dvcmQiLCJzZXRTaG93UGFzc3dvcmQiLCJ0cmFuc2xhdGVNZXNzYWdlIiwidXNlVHJhbnNsYXRpb24iLCJoYW5kbGVTdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImNyZWRlbnRpYWxzIiwianNvbiIsIm9rIiwid2luZG93IiwibG9jYXRpb24iLCJyZWRpcmVjdFVybCIsImVyciIsIm1pbkhlaWdodCIsImZvbnRGYW1pbHkiLCJfIiwibWQiLCJmbGV4RGlyZWN0aW9uIiwianVzdGlmeUNvbnRlbnQiLCJhbGlnbkl0ZW1zIiwiYmFja2dyb3VuZCIsInRleHRBbGlnbiIsIm1heFdpZHRoIiwic3JjIiwiYWx0IiwibWFyZ2luQm90dG9tIiwib25FcnJvciIsIm9wYWNpdHkiLCJtYXJnaW5Ub3AiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ3aWR0aCIsIm9uU3VibWl0IiwiaHRtbEZvciIsIklucHV0IiwidHlwZSIsImRpc2FibGVkIiwicGFkZGluZyIsInBvc2l0aW9uIiwicGFkZGluZ1JpZ2h0Iiwib25DbGljayIsInJpZ2h0IiwidG9wIiwidHJhbnNmb3JtIiwiQnV0dG9uIiwidmFyaWFudCIsIm1hcmdpblJpZ2h0IiwiSW1hZ2VDb21wb25lbnQiLCJpbWFnZVVybCIsIm1heEhlaWdodCIsIm9iamVjdEZpdCIsIkltYWdlTGlzdENvbXBvbmVudCIsImltYWdlcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Iiwic3RhcnRzV2l0aCIsImlzTmFOIiwic3BsaXQiLCJwb3AiLCJwdXNoIiwidXJsIiwiaW5kZXgiLCJJbWFnZUVkaXRDb21wb25lbnQiLCJzZXRJbWFnZVVybCIsImhhbmRsZUlucHV0Q2hhbmdlIiwiZXZlbnQiLCJuZXdWYWx1ZSIsIkltYWdlTGlzdEVkaXRDb21wb25lbnQiLCJnZXRJbWFnZXMiLCJwYXJzZUludCIsImltZyIsInVuZGVmaW5lZCIsInNldEltYWdlcyIsInVwZGF0ZVJlY29yZCIsIm5ld0ltYWdlcyIsImhhbmRsZUFkZCIsImhhbmRsZVJlbW92ZSIsInNwbGljZSIsImhlaWdodCIsImZsZXhHcm93Iiwic2l6ZSIsIkljb24iLCJpY29uIiwiQkFTRV9VUkwiLCJDcmVhdGVUYXNrRnJvbUFpZFJlcXVlc3QiLCJyZXNvdXJjZSIsImFkZE5vdGljZSIsInVzZU5vdGljZSIsInNlYXJjaFF1ZXJ5Iiwic2V0U2VhcmNoUXVlcnkiLCJmb3JtRGF0YSIsInNldEZvcm1EYXRhIiwidGFza05hbWUiLCJ2b2x1bnRlZXJzTmVlZGVkIiwiaXNPcGVuIiwicHJpb3JpdHkiLCJzZWxlY3RlZFZvbHVudGVlcnMiLCJoYXNFeGlzdGluZ1Rhc2siLCJzZXRIYXNFeGlzdGluZ1Rhc2siLCJjaGVja0V4aXN0aW5nVGFzayIsInNraWxsIiwiYXNzaWduZWRWb2x1bnRlZXJzIiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJNZXNzYWdlQm94IiwiSDMiLCJwcmV2IiwibWluIiwiQ2hlY2tCb3giLCJjaGVja2VkIiwiaW5saW5lIiwibWFyZ2luTGVmdCIsImlzTXVsdGkiLCJpc1NlYXJjaGFibGUiLCJpbmNsdWRlcyIsIm5ld1ZhbHVlcyIsIkFycmF5IiwiaXNBcnJheSIsInNsaWNlIiwicyIsIkxvYWRlciIsIk1hcFBpY2tlciIsIm1hcENvbnRhaW5lclJlZiIsInVzZVJlZiIsIm1hcEluc3RhbmNlUmVmIiwibWFya2VyUmVmIiwiZ2V0SW5pdGlhbFZhbHVlIiwicGF0aCIsImluaXRpYWxMYXQiLCJwYXJzZUZsb2F0IiwiaW5pdGlhbExuZyIsInNldFBvc2l0aW9uIiwiYWRkcmVzc0RhdGEiLCJzZXRBZGRyZXNzRGF0YSIsImFkZHJlc3NMaW5lMSIsImFkZHJlc3NMaW5lMiIsImFkZHJlc3NMaW5lMyIsInBpbkNvZGUiLCJjb29yZGluYXRlcyIsImNsZWFuUGluIiwic3RyUGluIiwiU3RyaW5nIiwicmVwbGFjZSIsInBheWxvYWQiLCJ1cGRhdGVBZGRyZXNzRnJvbU5vbWluYXRpbSIsImxuZyIsImFkZHJlc3MiLCJsaW5lMSIsImFtZW5pdHkiLCJidWlsZGluZyIsInJvYWQiLCJ2aWxsYWdlIiwic3VidXJiIiwidG93biIsImNpdHkiLCJkaXNwbGF5X25hbWUiLCJsaW5lMiIsInN0YXRlX2Rpc3RyaWN0Iiwic3RhdGUiLCJ4IiwicG9zdGNvZGUiLCJyZXZlcnNlR2VvY29kZSIsImxvYWRMZWFmbGV0IiwiTCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJsaW5rIiwiaGVhZCIsImFwcGVuZENoaWxkIiwic2NyaXB0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJvbmxvYWQiLCJjaGVjayIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInRoZW4iLCJjdXJyZW50IiwiY2VudGVyIiwic2V0VmlldyIsInRpbGVMYXllciIsImF0dHJpYnV0aW9uIiwiYWRkVG8iLCJvbiIsImxhdGxuZyIsIm5ld1BvcyIsInNldExhdExuZyIsIm1hcmtlciIsImhhbmRsZVNlYXJjaCIsImxvbiIsImVycm9ycyIsInJlZiIsIk1hcFNob3ciLCJoYXNMb2NhdGlvbiIsImRyYWdnaW5nIiwiZGlzYWJsZSIsInRvdWNoWm9vbSIsImRvdWJsZUNsaWNrWm9vbSIsInNjcm9sbFdoZWVsWm9vbSIsImJveFpvb20iLCJrZXlib2FyZCIsInRhcCIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQUlBLE1BQU1BLFNBQVMsR0FBR0EsTUFBTTtFQUN0QixFQUFBLE1BQU0sQ0FBQ0MsWUFBWSxDQUFDLEdBQUdDLHVCQUFlLEVBQUU7RUFDeEMsRUFBQSxNQUFNLENBQUNDLEtBQUssRUFBRUMsUUFBUSxDQUFDLEdBQUdDLGNBQVEsQ0FBQztFQUNqQ0MsSUFBQUEsV0FBVyxFQUFFLENBQUM7RUFDZEMsSUFBQUEsU0FBUyxFQUFFLENBQUM7RUFDWkMsSUFBQUEsS0FBSyxFQUFFLENBQUM7RUFDUkMsSUFBQUEsS0FBSyxFQUFFO0VBQ1QsR0FBQyxDQUFDO0VBRUZDLEVBQUFBLGVBQVMsQ0FBQyxNQUFNO0VBQ2Q7RUFDQSxJQUFBLE1BQU1DLFVBQVUsR0FBRyxZQUFZO1FBQzdCLElBQUk7RUFDRixRQUFBLE1BQU1DLEdBQUcsR0FBRyxJQUFJQyxpQkFBUyxFQUFFO0VBQzNCO0VBQ0E7RUFDQVQsUUFBQUEsUUFBUSxDQUFDO0VBQ1BFLFVBQUFBLFdBQVcsRUFBRSxFQUFFO0VBQ2ZDLFVBQUFBLFNBQVMsRUFBRSxHQUFHO0VBQ2RDLFVBQUFBLEtBQUssRUFBRSxFQUFFO0VBQ1RDLFVBQUFBLEtBQUssRUFBRTtFQUNULFNBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxPQUFPSyxLQUFLLEVBQUU7RUFDZEMsUUFBQUEsT0FBTyxDQUFDRCxLQUFLLENBQUMsdUJBQXVCLEVBQUVBLEtBQUssQ0FBQztFQUMvQyxNQUFBO01BQ0YsQ0FBQztFQUVESCxJQUFBQSxVQUFVLEVBQUU7SUFDZCxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBRU4sb0JBQ0VLLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcscUJBQ0ZGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUFDQyxJQUFBQSxFQUFFLEVBQUM7RUFBSyxHQUFBLGVBQ1hILHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0csZUFBRSxFQUFBLElBQUEsRUFBQyxxQ0FBdUMsQ0FBQyxlQUM1Q0osc0JBQUEsQ0FBQUMsYUFBQSxDQUFDSSxpQkFBSSxFQUFBO0VBQUNDLElBQUFBLEVBQUUsRUFBQztFQUFTLEdBQUEsRUFBQyxRQUNYLEVBQUNyQixZQUFZLEVBQUVzQixLQUFLLElBQUksT0FBTyxFQUFDLG1DQUNsQyxDQUNILENBQUMsZUFHTlAsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNNLElBQUFBLE9BQU8sRUFBQyxNQUFNO0VBQUNDLElBQUFBLFFBQVEsRUFBQyxNQUFNO0VBQUNDLElBQUFBLEdBQUcsRUFBQztFQUFTLEdBQUEsZUFDL0NWLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUNGUyxJQUFBQSxJQUFJLEVBQUMsR0FBRztFQUNSQyxJQUFBQSxRQUFRLEVBQUMsT0FBTztFQUNoQkMsSUFBQUEsRUFBRSxFQUFDLFlBQVk7RUFDZkMsSUFBQUEsQ0FBQyxFQUFDLElBQUk7RUFDTkMsSUFBQUEsWUFBWSxFQUFDLFNBQVM7RUFDdEJDLElBQUFBLFNBQVMsRUFBQztFQUFNLEdBQUEsZUFFaEJoQixzQkFBQSxDQUFBQyxhQUFBLENBQUNnQixlQUFFLEVBQUE7RUFBQ2QsSUFBQUEsRUFBRSxFQUFDO0VBQVMsR0FBQSxFQUFDLGNBQWdCLENBQUMsZUFDbENILHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0ksaUJBQUksRUFBQTtFQUFDYSxJQUFBQSxRQUFRLEVBQUMsS0FBSztFQUFDQyxJQUFBQSxVQUFVLEVBQUM7S0FBTSxFQUNuQ2hDLEtBQUssQ0FBQ0csV0FDSCxDQUFDLGVBQ1BVLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0ksaUJBQUksRUFBQTtFQUFDQyxJQUFBQSxFQUFFLEVBQUMsSUFBSTtFQUFDYyxJQUFBQSxLQUFLLEVBQUM7S0FBUSxFQUFDLGlCQUV2QixDQUNILENBQUMsZUFFTnBCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUNGUyxJQUFBQSxJQUFJLEVBQUMsR0FBRztFQUNSQyxJQUFBQSxRQUFRLEVBQUMsT0FBTztFQUNoQkMsSUFBQUEsRUFBRSxFQUFDLFNBQVM7RUFDWkMsSUFBQUEsQ0FBQyxFQUFDLElBQUk7RUFDTkMsSUFBQUEsWUFBWSxFQUFDLFNBQVM7RUFDdEJDLElBQUFBLFNBQVMsRUFBQztFQUFNLEdBQUEsZUFFaEJoQixzQkFBQSxDQUFBQyxhQUFBLENBQUNnQixlQUFFLEVBQUE7RUFBQ2QsSUFBQUEsRUFBRSxFQUFDLFNBQVM7RUFBQ2lCLElBQUFBLEtBQUssRUFBQztFQUFPLEdBQUEsRUFBQyxXQUUzQixDQUFDLGVBQ0xwQixzQkFBQSxDQUFBQyxhQUFBLENBQUNJLGlCQUFJLEVBQUE7RUFBQ2EsSUFBQUEsUUFBUSxFQUFDLEtBQUs7RUFBQ0MsSUFBQUEsVUFBVSxFQUFDLE1BQU07RUFBQ0MsSUFBQUEsS0FBSyxFQUFDO0tBQU8sRUFDakRqQyxLQUFLLENBQUNJLFNBQ0gsQ0FBQyxlQUNQUyxzQkFBQSxDQUFBQyxhQUFBLENBQUNJLGlCQUFJLEVBQUE7RUFBQ0MsSUFBQUEsRUFBRSxFQUFDLElBQUk7RUFBQ2MsSUFBQUEsS0FBSyxFQUFDO0tBQU8sRUFBQywwQkFFdEIsQ0FDSCxDQUFDLGVBRU5wQixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFDRlMsSUFBQUEsSUFBSSxFQUFDLEdBQUc7RUFDUkMsSUFBQUEsUUFBUSxFQUFDLE9BQU87RUFDaEJDLElBQUFBLEVBQUUsRUFBQyxNQUFNO0VBQ1RDLElBQUFBLENBQUMsRUFBQyxJQUFJO0VBQ05DLElBQUFBLFlBQVksRUFBQyxTQUFTO0VBQ3RCQyxJQUFBQSxTQUFTLEVBQUM7RUFBTSxHQUFBLGVBRWhCaEIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDZ0IsZUFBRSxFQUFBO0VBQUNkLElBQUFBLEVBQUUsRUFBQyxTQUFTO0VBQUNpQixJQUFBQSxLQUFLLEVBQUM7RUFBTyxHQUFBLEVBQUMsY0FFM0IsQ0FBQyxlQUNMcEIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDSSxpQkFBSSxFQUFBO0VBQUNhLElBQUFBLFFBQVEsRUFBQyxLQUFLO0VBQUNDLElBQUFBLFVBQVUsRUFBQyxNQUFNO0VBQUNDLElBQUFBLEtBQUssRUFBQztLQUFPLEVBQ2pEakMsS0FBSyxDQUFDSyxLQUNILENBQUMsZUFDUFEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDSSxpQkFBSSxFQUFBO0VBQUNDLElBQUFBLEVBQUUsRUFBQyxJQUFJO0VBQUNjLElBQUFBLEtBQUssRUFBQztLQUFPLEVBQUMsZUFFdEIsQ0FDSCxDQUFDLGVBRU5wQixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFDRlMsSUFBQUEsSUFBSSxFQUFDLEdBQUc7RUFDUkMsSUFBQUEsUUFBUSxFQUFDLE9BQU87RUFDaEJDLElBQUFBLEVBQUUsRUFBQyxRQUFRO0VBQ1hDLElBQUFBLENBQUMsRUFBQyxJQUFJO0VBQ05DLElBQUFBLFlBQVksRUFBQyxTQUFTO0VBQ3RCQyxJQUFBQSxTQUFTLEVBQUM7RUFBTSxHQUFBLGVBRWhCaEIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDZ0IsZUFBRSxFQUFBO0VBQUNkLElBQUFBLEVBQUUsRUFBQyxTQUFTO0VBQUNpQixJQUFBQSxLQUFLLEVBQUM7RUFBTyxHQUFBLEVBQUMsT0FFM0IsQ0FBQyxlQUNMcEIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDSSxpQkFBSSxFQUFBO0VBQUNhLElBQUFBLFFBQVEsRUFBQyxLQUFLO0VBQUNDLElBQUFBLFVBQVUsRUFBQyxNQUFNO0VBQUNDLElBQUFBLEtBQUssRUFBQztLQUFPLEVBQ2pEakMsS0FBSyxDQUFDTSxLQUNILENBQUMsZUFDUE8sc0JBQUEsQ0FBQUMsYUFBQSxDQUFDSSxpQkFBSSxFQUFBO0VBQUNDLElBQUFBLEVBQUUsRUFBQyxJQUFJO0VBQUNjLElBQUFBLEtBQUssRUFBQztLQUFPLEVBQUMsa0JBRXRCLENBQ0gsQ0FDRixDQUFDLGVBR05wQixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ0ksSUFBQUEsRUFBRSxFQUFDO0VBQUssR0FBQSxlQUNYTixzQkFBQSxDQUFBQyxhQUFBLENBQUNnQixlQUFFLEVBQUE7RUFBQ2QsSUFBQUEsRUFBRSxFQUFDO0VBQVMsR0FBQSxFQUFDLGVBQWlCLENBQUMsZUFDbkNILHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUFDTSxJQUFBQSxPQUFPLEVBQUMsTUFBTTtFQUFDRSxJQUFBQSxHQUFHLEVBQUMsU0FBUztFQUFDRCxJQUFBQSxRQUFRLEVBQUM7RUFBTSxHQUFBLGVBQy9DVCxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFDRm1CLElBQUFBLEVBQUUsRUFBQyxHQUFHO0VBQ05DLElBQUFBLElBQUksRUFBQyxpQ0FBaUM7RUFDdENULElBQUFBLEVBQUUsRUFBQyxPQUFPO0VBQ1ZDLElBQUFBLENBQUMsRUFBQyxJQUFJO0VBQ05DLElBQUFBLFlBQVksRUFBQyxTQUFTO0VBQ3RCUSxJQUFBQSxNQUFNLEVBQUMsU0FBUztFQUNoQkMsSUFBQUEsS0FBSyxFQUFFO0VBQUVDLE1BQUFBLGNBQWMsRUFBRSxNQUFNO0VBQUVDLE1BQUFBLE1BQU0sRUFBRTtFQUFVO0VBQUUsR0FBQSxlQUVyRDFCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0ksaUJBQUksRUFBQTtFQUFDYyxJQUFBQSxVQUFVLEVBQUMsTUFBTTtFQUFDQyxJQUFBQSxLQUFLLEVBQUM7S0FBWSxFQUFDLGdDQUVyQyxDQUNILENBQUMsZUFDTnBCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUNGbUIsSUFBQUEsRUFBRSxFQUFDLEdBQUc7RUFDTkMsSUFBQUEsSUFBSSxFQUFDLCtCQUErQjtFQUNwQ1QsSUFBQUEsRUFBRSxFQUFDLE9BQU87RUFDVkMsSUFBQUEsQ0FBQyxFQUFDLElBQUk7RUFDTkMsSUFBQUEsWUFBWSxFQUFDLFNBQVM7RUFDdEJRLElBQUFBLE1BQU0sRUFBQyxTQUFTO0VBQ2hCQyxJQUFBQSxLQUFLLEVBQUU7RUFBRUMsTUFBQUEsY0FBYyxFQUFFLE1BQU07RUFBRUMsTUFBQUEsTUFBTSxFQUFFO0VBQVU7RUFBRSxHQUFBLGVBRXJEMUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDSSxpQkFBSSxFQUFBO0VBQUNjLElBQUFBLFVBQVUsRUFBQyxNQUFNO0VBQUNDLElBQUFBLEtBQUssRUFBQztLQUFZLEVBQUMsK0JBRXJDLENBQ0gsQ0FBQyxlQUNOcEIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQ0ZtQixJQUFBQSxFQUFFLEVBQUMsR0FBRztFQUNOQyxJQUFBQSxJQUFJLEVBQUMsaUNBQWlDO0VBQ3RDVCxJQUFBQSxFQUFFLEVBQUMsT0FBTztFQUNWQyxJQUFBQSxDQUFDLEVBQUMsSUFBSTtFQUNOQyxJQUFBQSxZQUFZLEVBQUMsU0FBUztFQUN0QlEsSUFBQUEsTUFBTSxFQUFDLFNBQVM7RUFDaEJDLElBQUFBLEtBQUssRUFBRTtFQUFFQyxNQUFBQSxjQUFjLEVBQUUsTUFBTTtFQUFFQyxNQUFBQSxNQUFNLEVBQUU7RUFBVTtFQUFFLEdBQUEsZUFFckQxQixzQkFBQSxDQUFBQyxhQUFBLENBQUNJLGlCQUFJLEVBQUE7RUFBQ2MsSUFBQUEsVUFBVSxFQUFDLE1BQU07RUFBQ0MsSUFBQUEsS0FBSyxFQUFDO0tBQVksRUFBQyxtQkFFckMsQ0FDSCxDQUFDLGVBQ05wQixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFDRm1CLElBQUFBLEVBQUUsRUFBQyxHQUFHO0VBQ05DLElBQUFBLElBQUksRUFBQyxtQ0FBbUM7RUFDeENULElBQUFBLEVBQUUsRUFBQyxPQUFPO0VBQ1ZDLElBQUFBLENBQUMsRUFBQyxJQUFJO0VBQ05DLElBQUFBLFlBQVksRUFBQyxTQUFTO0VBQ3RCUSxJQUFBQSxNQUFNLEVBQUMsU0FBUztFQUNoQkMsSUFBQUEsS0FBSyxFQUFFO0VBQUVDLE1BQUFBLGNBQWMsRUFBRSxNQUFNO0VBQUVDLE1BQUFBLE1BQU0sRUFBRTtFQUFVO0VBQUUsR0FBQSxlQUVyRDFCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0ksaUJBQUksRUFBQTtFQUFDYyxJQUFBQSxVQUFVLEVBQUMsTUFBTTtFQUFDQyxJQUFBQSxLQUFLLEVBQUM7S0FBWSxFQUFDLDZCQUVyQyxDQUNILENBQ0YsQ0FDRixDQUFDLGVBR05wQixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ0ksSUFBQUEsRUFBRSxFQUFDO0VBQUssR0FBQSxlQUNYTixzQkFBQSxDQUFBQyxhQUFBLENBQUNnQixlQUFFLEVBQUE7RUFBQ2QsSUFBQUEsRUFBRSxFQUFDO0VBQVMsR0FBQSxFQUFDLGVBQWlCLENBQUMsZUFDbkNILHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUFDVyxJQUFBQSxFQUFFLEVBQUMsT0FBTztFQUFDQyxJQUFBQSxDQUFDLEVBQUMsSUFBSTtFQUFDQyxJQUFBQSxZQUFZLEVBQUMsU0FBUztFQUFDUSxJQUFBQSxNQUFNLEVBQUM7RUFBUyxHQUFBLGVBQzVEdkIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDSSxpQkFBSSxFQUFBLElBQUEsRUFBQyxnQ0FBK0IsQ0FBQyxlQUN0Q0wsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDSSxpQkFBSSxFQUFBO0VBQUNDLElBQUFBLEVBQUUsRUFBQyxJQUFJO0VBQUNjLElBQUFBLEtBQUssRUFBQztFQUFRLEdBQUEsRUFBQyxnQkFDYixFQUFDLElBQUlPLElBQUksRUFBRSxDQUFDQyxjQUFjLEVBQ3BDLENBQ0gsQ0FDRixDQUNGLENBQUM7RUFFVixDQUFDOztFQzVMRCxNQUFNQyxhQUFhLEdBQUlDLEtBQUssSUFBSztJQUMvQixNQUFNO01BQUVDLE1BQU07RUFBRUMsSUFBQUE7RUFBUyxHQUFDLEdBQUdGLEtBQUs7O0VBRWxDO0VBQ0E7RUFDQTtFQUNBLEVBQUEsTUFBTUcsR0FBRyxHQUFHRixNQUFNLENBQUNHLE1BQU0sQ0FBQyxHQUFHRixRQUFRLENBQUNHLElBQUksQ0FBQSxjQUFBLENBQWdCLENBQUMsSUFBSUosTUFBTSxDQUFDRyxNQUFNLENBQUMsZ0NBQWdDLENBQUM7RUFDOUcsRUFBQSxNQUFNRSxJQUFJLEdBQUdMLE1BQU0sQ0FBQ0csTUFBTSxDQUFDLEdBQUdGLFFBQVEsQ0FBQ0csSUFBSSxDQUFBLGNBQUEsQ0FBZ0IsQ0FBQyxJQUFJSixNQUFNLENBQUNHLE1BQU0sQ0FBQyxnQ0FBZ0MsQ0FBQzs7RUFFL0c7RUFDQSxFQUFBLElBQUksQ0FBQ0QsR0FBRyxJQUFJLENBQUNHLElBQUksRUFBRTtFQUNqQixJQUFBLE9BQU8sSUFBSTtFQUNiLEVBQUE7O0VBRUE7RUFDQTtFQUNBO0VBQ0EsRUFBQSxNQUFNQyxZQUFZLEdBQUcsQ0FDbkJOLE1BQU0sQ0FBQ0csTUFBTSxDQUFDLHNCQUFzQixDQUFDLEVBQ3JDSCxNQUFNLENBQUNHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxFQUNyQ0gsTUFBTSxDQUFDRyxNQUFNLENBQUMsc0JBQXNCLENBQUMsRUFDckNILE1BQU0sQ0FBQ0csTUFBTSxDQUFDLGlCQUFpQjtFQUMvQjtFQUFBLEdBQ0QsQ0FBQ0ksTUFBTSxDQUFDQyxJQUFJLElBQUlBLElBQUksSUFBSUEsSUFBSSxDQUFDQyxRQUFRLEVBQUUsQ0FBQ0MsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBRXZELElBQUlDLEtBQUssR0FBRyxFQUFFO0VBQ2QsRUFBQSxJQUFJTCxZQUFZLENBQUNNLE1BQU0sR0FBRyxDQUFDLEVBQUU7TUFDM0JELEtBQUssR0FBR0Usa0JBQWtCLENBQUNQLFlBQVksQ0FBQ1EsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ3JELEVBQUEsQ0FBQyxNQUFNO0VBQ0xILElBQUFBLEtBQUssR0FBRyxDQUFBLEVBQUdULEdBQUcsQ0FBQSxDQUFBLEVBQUlHLElBQUksQ0FBQSxDQUFFO0VBQzFCLEVBQUE7O0VBRUE7RUFDQSxFQUFBLE1BQU1VLFFBQVEsR0FBRyxDQUFBLGdEQUFBLEVBQW1ESixLQUFLLENBQUEsQ0FBRTtJQUUzRSxvQkFDRTFDLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxHQUFBLEVBQUE7RUFBR3FCLElBQUFBLElBQUksRUFBRXdCLFFBQVM7RUFBQ0MsSUFBQUEsTUFBTSxFQUFDLFFBQVE7RUFBQ0MsSUFBQUEsR0FBRyxFQUFDO0VBQXFCLEdBQUEsRUFBQyxlQUUxRCxDQUFDO0VBRVIsQ0FBQzs7RUN2Q0QsTUFBTXBELEtBQUcsR0FBRyxJQUFJQyxpQkFBUyxFQUFFO0VBRTNCLE1BQU1vRCx1QkFBdUIsR0FBR0EsQ0FBQztJQUFFakIsUUFBUTtJQUFFRCxNQUFNO0VBQUVtQixFQUFBQTtFQUFTLENBQUMsS0FBSztJQUNsRSxNQUFNLENBQUNDLFVBQVUsRUFBRUMsYUFBYSxDQUFDLEdBQUcvRCxjQUFRLENBQUMsRUFBRSxDQUFDO0lBQ2hELE1BQU0sQ0FBQ2dFLE9BQU8sRUFBRUMsVUFBVSxDQUFDLEdBQUdqRSxjQUFRLENBQUMsSUFBSSxDQUFDO0VBRTVDSyxFQUFBQSxlQUFTLENBQUMsTUFBTTtFQUNkLElBQUEsTUFBTTZELGVBQWUsR0FBRyxZQUFZO1FBQ2xDRCxVQUFVLENBQUMsSUFBSSxDQUFDO0VBQ2hCLE1BQUEsTUFBTUUsUUFBUSxHQUFHLE1BQU01RCxLQUFHLENBQUM2RCxjQUFjLENBQUM7RUFDeENDLFFBQUFBLFVBQVUsRUFBRSxhQUFhO0VBQ3pCQyxRQUFBQSxVQUFVLEVBQUUsTUFBTTtFQUNsQnpCLFFBQUFBLE1BQU0sRUFBRTtFQUFFLFVBQUEsY0FBYyxFQUFFLFdBQVc7RUFBRTBCLFVBQUFBLE9BQU8sRUFBRTtFQUFLO0VBQ3ZELE9BQUMsQ0FBQztRQUNGLElBQUlKLFFBQVEsQ0FBQ0ssSUFBSSxJQUFJTCxRQUFRLENBQUNLLElBQUksQ0FBQ0MsT0FBTyxFQUFFO1VBQzFDL0QsT0FBTyxDQUFDZ0UsR0FBRyxDQUFDLFVBQVUsRUFBRVAsUUFBUSxDQUFDSyxJQUFJLENBQUNDLE9BQU8sQ0FBQztVQUM5Q1YsYUFBYSxDQUFDSSxRQUFRLENBQUNLLElBQUksQ0FBQ0MsT0FBTyxDQUFDRSxHQUFHLENBQUNDLENBQUMsS0FBSztZQUM1Q0MsS0FBSyxFQUFFRCxDQUFDLENBQUNFLEVBQUU7RUFDWEMsVUFBQUEsS0FBSyxFQUFFSCxDQUFDLENBQUMvQixNQUFNLENBQUNDO1dBQ2pCLENBQUMsQ0FBQyxDQUFDO0VBQ04sTUFBQTtRQUNBbUIsVUFBVSxDQUFDLEtBQUssQ0FBQztNQUNuQixDQUFDO0VBQ0RDLElBQUFBLGVBQWUsRUFBRTtJQUNuQixDQUFDLEVBQUUsRUFBRSxDQUFDO0lBRU4sTUFBTWMsWUFBWSxHQUFHQyxRQUFRLElBQUk7RUFDL0JwQixJQUFBQSxRQUFRLENBQUNsQixRQUFRLENBQUNHLElBQUksRUFBRW1DLFFBQVEsR0FBR0EsUUFBUSxDQUFDSixLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3pELENBQUM7SUFFRCxNQUFNSyxjQUFjLEdBQUdwQixVQUFVLENBQUNxQixJQUFJLENBQUNDLEdBQUcsSUFBSUEsR0FBRyxDQUFDUCxLQUFLLEtBQUtuQyxNQUFNLENBQUNHLE1BQU0sQ0FBQ0YsUUFBUSxDQUFDRyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUk7RUFFakcsRUFBQSxvQkFDRW5DLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3lFLHNCQUFTLEVBQUE7RUFBQ3ZFLElBQUFBLEVBQUUsRUFBRTtFQUFHLEdBQUEsZUFDaEJILHNCQUFBLENBQUFDLGFBQUEsQ0FBQzBFLGtCQUFLLEVBQUE7TUFBQ0MsUUFBUSxFQUFBO0VBQUEsR0FBQSxFQUFFLGtCQUEwQixDQUFDLGVBQzVDNUUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDNEUsbUJBQU0sRUFBQTtFQUNMQyxJQUFBQSxPQUFPLEVBQUUzQixVQUFXO0VBQ3BCZSxJQUFBQSxLQUFLLEVBQUVLLGNBQWU7RUFDdEJRLElBQUFBLFNBQVMsRUFBRTFCLE9BQVE7RUFDbkJILElBQUFBLFFBQVEsRUFBRW1CLFlBQWE7TUFDdkJXLFdBQVcsRUFBQSxJQUFBO0VBQ1hDLElBQUFBLFdBQVcsRUFBQztFQUFtQixHQUNoQyxDQUFDLEVBQ0RqRCxRQUFRLENBQUNrRCxXQUFXLGlCQUNuQmxGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ2tGLHdCQUFXLEVBQUEsSUFBQSxFQUFFbkQsUUFBUSxDQUFDa0QsV0FBeUIsQ0FFekMsQ0FBQztFQUVoQixDQUFDOztFQ2hERCxNQUFNdEYsS0FBRyxHQUFHLElBQUlDLGlCQUFTLEVBQUU7RUFFM0IsTUFBTXVGLG9CQUFvQixHQUFHQSxDQUFDO0lBQUVwRCxRQUFRO0lBQUVELE1BQU07RUFBRW1CLEVBQUFBO0VBQVMsQ0FBQyxLQUFLO0lBQy9ELE1BQU0sQ0FBQ21DLE1BQU0sRUFBRUMsU0FBUyxDQUFDLEdBQUdqRyxjQUFRLENBQUMsRUFBRSxDQUFDO0lBQ3hDLE1BQU0sQ0FBQ2dFLE9BQU8sRUFBRUMsVUFBVSxDQUFDLEdBQUdqRSxjQUFRLENBQUMsSUFBSSxDQUFDO0VBRTVDSyxFQUFBQSxlQUFTLENBQUMsTUFBTTtFQUNkLElBQUEsTUFBTTZGLFdBQVcsR0FBRyxZQUFZO1FBQzlCakMsVUFBVSxDQUFDLElBQUksQ0FBQztFQUNoQixNQUFBLE1BQU1FLFFBQVEsR0FBRyxNQUFNNUQsS0FBRyxDQUFDNkQsY0FBYyxDQUFDO0VBQ3hDQyxRQUFBQSxVQUFVLEVBQUUsWUFBWTtFQUN4QkMsUUFBQUEsVUFBVSxFQUFFLE1BQU07RUFDbEJ6QixRQUFBQSxNQUFNLEVBQUU7RUFBRSxVQUFBLGdCQUFnQixFQUFFLFVBQVU7RUFBRTBCLFVBQUFBLE9BQU8sRUFBRTtFQUFLO0VBQ3hELE9BQUMsQ0FBQztFQUNGN0QsTUFBQUEsT0FBTyxDQUFDZ0UsR0FBRyxDQUFDLFVBQVUsRUFBRVAsUUFBUSxDQUFDO1FBQ2pDLElBQUlBLFFBQVEsQ0FBQ0ssSUFBSSxJQUFJTCxRQUFRLENBQUNLLElBQUksQ0FBQ0MsT0FBTyxFQUFFO1VBQzFDL0QsT0FBTyxDQUFDZ0UsR0FBRyxDQUFDLFVBQVUsRUFBRVAsUUFBUSxDQUFDSyxJQUFJLENBQUNDLE9BQU8sQ0FBQztVQUM5Q3dCLFNBQVMsQ0FBQzlCLFFBQVEsQ0FBQ0ssSUFBSSxDQUFDQyxPQUFPLENBQUNFLEdBQUcsQ0FBQ0MsQ0FBQyxJQUFJO1lBQ3ZDbEUsT0FBTyxDQUFDZ0UsR0FBRyxDQUFDLFFBQVEsRUFBRUUsQ0FBQyxDQUFDL0IsTUFBTSxDQUFDO1lBQy9CLE9BQVE7Y0FDTmdDLEtBQUssRUFBRUQsQ0FBQyxDQUFDRSxFQUFFO0VBQ1g7RUFDQUMsWUFBQUEsS0FBSyxFQUFFSCxDQUFDLENBQUMvQixNQUFNLENBQUNDO2FBQ2pCO0VBQ0gsUUFBQSxDQUFDLENBQUMsQ0FBQztFQUNMLE1BQUE7UUFDQW1CLFVBQVUsQ0FBQyxLQUFLLENBQUM7TUFDbkIsQ0FBQztFQUNEaUMsSUFBQUEsV0FBVyxFQUFFO0lBQ2YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUVOLE1BQU1sQixZQUFZLEdBQUdDLFFBQVEsSUFBSTtFQUMvQnBCLElBQUFBLFFBQVEsQ0FBQ2xCLFFBQVEsQ0FBQ0csSUFBSSxFQUFFbUMsUUFBUSxHQUFHQSxRQUFRLENBQUNKLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDekQsQ0FBQztJQUVELE1BQU1LLGNBQWMsR0FBR2MsTUFBTSxDQUFDYixJQUFJLENBQUNDLEdBQUcsSUFBSUEsR0FBRyxDQUFDUCxLQUFLLEtBQUtuQyxNQUFNLENBQUNHLE1BQU0sQ0FBQ0YsUUFBUSxDQUFDRyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUk7RUFFN0YsRUFBQSxvQkFDRW5DLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3lFLHNCQUFTLEVBQUE7RUFBQ3ZFLElBQUFBLEVBQUUsRUFBRTtFQUFHLEdBQUEsZUFDaEJILHNCQUFBLENBQUFDLGFBQUEsQ0FBQzBFLGtCQUFLLEVBQUE7TUFBQ0MsUUFBUSxFQUFBO0VBQUEsR0FBQSxFQUFFLG9CQUE0QixDQUFDLGVBQzlDNUUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDNEUsbUJBQU0sRUFBQTtFQUNMQyxJQUFBQSxPQUFPLEVBQUVPLE1BQU87RUFDaEJuQixJQUFBQSxLQUFLLEVBQUVLLGNBQWU7RUFDdEJRLElBQUFBLFNBQVMsRUFBRTFCLE9BQVE7RUFDbkJILElBQUFBLFFBQVEsRUFBRW1CLFlBQWE7TUFDdkJXLFdBQVcsRUFBQSxJQUFBO0VBQ1hDLElBQUFBLFdBQVcsRUFBQztFQUFvQixHQUNqQyxDQUFDLEVBQ0RqRCxRQUFRLENBQUNrRCxXQUFXLGlCQUNuQmxGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ2tGLHdCQUFXLEVBQUEsSUFBQSxFQUFFbkQsUUFBUSxDQUFDa0QsV0FBeUIsQ0FFekMsQ0FBQztFQUVoQixDQUFDOztFQ3JERCxNQUFNdEYsS0FBRyxHQUFHLElBQUlDLGlCQUFTLEVBQUU7RUFFM0IsTUFBTTJGLG1DQUFtQyxHQUFHQSxDQUFDO0lBQUV4RCxRQUFRO0lBQUVELE1BQU07RUFBRW1CLEVBQUFBO0VBQVMsQ0FBQyxLQUFLO0lBQzlFLE1BQU0sQ0FBQ21DLE1BQU0sRUFBRUMsU0FBUyxDQUFDLEdBQUdqRyxjQUFRLENBQUMsRUFBRSxDQUFDO0lBQ3hDLE1BQU0sQ0FBQ2dFLE9BQU8sRUFBRUMsVUFBVSxDQUFDLEdBQUdqRSxjQUFRLENBQUMsSUFBSSxDQUFDO0VBRTVDSyxFQUFBQSxlQUFTLENBQUMsTUFBTTtFQUNkLElBQUEsTUFBTTZGLFdBQVcsR0FBRyxZQUFZO1FBQzlCakMsVUFBVSxDQUFDLElBQUksQ0FBQztFQUNoQixNQUFBLE1BQU1FLFFBQVEsR0FBRyxNQUFNNUQsS0FBRyxDQUFDNkQsY0FBYyxDQUFDO0VBQ3hDQyxRQUFBQSxVQUFVLEVBQUUsaUJBQWlCO0VBQzdCQyxRQUFBQSxVQUFVLEVBQUUsTUFBTTtFQUNsQnpCLFFBQUFBLE1BQU0sRUFBRTtFQUFFLFVBQUEsZ0JBQWdCLEVBQUUsVUFBVTtFQUFFMEIsVUFBQUEsT0FBTyxFQUFFO0VBQUs7RUFDeEQsT0FBQyxDQUFDO0VBQ0Y3RCxNQUFBQSxPQUFPLENBQUNnRSxHQUFHLENBQUMsVUFBVSxFQUFFUCxRQUFRLENBQUM7UUFDakMsSUFBSUEsUUFBUSxDQUFDSyxJQUFJLElBQUlMLFFBQVEsQ0FBQ0ssSUFBSSxDQUFDQyxPQUFPLEVBQUU7VUFDMUMvRCxPQUFPLENBQUNnRSxHQUFHLENBQUMsVUFBVSxFQUFFUCxRQUFRLENBQUNLLElBQUksQ0FBQ0MsT0FBTyxDQUFDO1VBQzlDd0IsU0FBUyxDQUFDOUIsUUFBUSxDQUFDSyxJQUFJLENBQUNDLE9BQU8sQ0FBQ0UsR0FBRyxDQUFDQyxDQUFDLElBQUk7WUFDdkNsRSxPQUFPLENBQUNnRSxHQUFHLENBQUMsUUFBUSxFQUFFRSxDQUFDLENBQUMvQixNQUFNLENBQUM7WUFDL0IsT0FBUTtjQUNOZ0MsS0FBSyxFQUFFRCxDQUFDLENBQUNFLEVBQUU7RUFDWEMsWUFBQUEsS0FBSyxFQUFFSCxDQUFDLENBQUMvQixNQUFNLENBQUNDO2FBQ2pCO0VBQ0gsUUFBQSxDQUFDLENBQUMsQ0FBQztFQUNMLE1BQUE7UUFDQW1CLFVBQVUsQ0FBQyxLQUFLLENBQUM7TUFDbkIsQ0FBQztFQUNEaUMsSUFBQUEsV0FBVyxFQUFFO0lBQ2YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUVOLE1BQU1sQixZQUFZLEdBQUdDLFFBQVEsSUFBSTtFQUMvQnBCLElBQUFBLFFBQVEsQ0FBQ2xCLFFBQVEsQ0FBQ0csSUFBSSxFQUFFbUMsUUFBUSxHQUFHQSxRQUFRLENBQUNKLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDekQsQ0FBQztJQUVELE1BQU1LLGNBQWMsR0FBR2MsTUFBTSxDQUFDYixJQUFJLENBQUNDLEdBQUcsSUFBSUEsR0FBRyxDQUFDUCxLQUFLLEtBQUtuQyxNQUFNLENBQUNHLE1BQU0sQ0FBQ0YsUUFBUSxDQUFDRyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUk7RUFFN0YsRUFBQSxvQkFDRW5DLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3lFLHNCQUFTLEVBQUE7RUFBQ3ZFLElBQUFBLEVBQUUsRUFBRTtFQUFHLEdBQUEsZUFDaEJILHNCQUFBLENBQUFDLGFBQUEsQ0FBQzBFLGtCQUFLLEVBQUE7TUFBQ0MsUUFBUSxFQUFBO0VBQUEsR0FBQSxFQUFFLHlCQUFpQyxDQUFDLGVBQ25ENUUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDNEUsbUJBQU0sRUFBQTtFQUNMQyxJQUFBQSxPQUFPLEVBQUVPLE1BQU87RUFDaEJuQixJQUFBQSxLQUFLLEVBQUVLLGNBQWU7RUFDdEJRLElBQUFBLFNBQVMsRUFBRTFCLE9BQVE7RUFDbkJILElBQUFBLFFBQVEsRUFBRW1CLFlBQWE7TUFDdkJXLFdBQVcsRUFBQSxJQUFBO0VBQ1hDLElBQUFBLFdBQVcsRUFBQztFQUF5QixHQUN0QyxDQUFDLEVBQ0RqRCxRQUFRLENBQUNrRCxXQUFXLGlCQUNuQmxGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ2tGLHdCQUFXLEVBQUEsSUFBQSxFQUFFbkQsUUFBUSxDQUFDa0QsV0FBeUIsQ0FFekMsQ0FBQztFQUVoQixDQUFDOztFQ3BERCxNQUFNTyxjQUFjLEdBQUkzRCxLQUFLLElBQUs7SUFDaEMsTUFBTSxDQUFDdkIsS0FBSyxFQUFFbUYsUUFBUSxDQUFDLEdBQUdyRyxjQUFRLENBQUMsRUFBRSxDQUFDO0lBQ3RDLE1BQU0sQ0FBQ3NHLFFBQVEsRUFBRUMsV0FBVyxDQUFDLEdBQUd2RyxjQUFRLENBQUMsRUFBRSxDQUFDO0lBQzVDLE1BQU0sQ0FBQ1MsS0FBSyxFQUFFK0YsUUFBUSxDQUFDLEdBQUd4RyxjQUFRLENBQUMsRUFBRSxDQUFDO0lBQ3RDLE1BQU0sQ0FBQ2dFLE9BQU8sRUFBRUMsVUFBVSxDQUFDLEdBQUdqRSxjQUFRLENBQUMsS0FBSyxDQUFDO0lBQzdDLE1BQU0sQ0FBQ3lHLFlBQVksRUFBRUMsZUFBZSxDQUFDLEdBQUcxRyxjQUFRLENBQUMsS0FBSyxDQUFDO0lBQ3ZELE1BQU07RUFBRTJHLElBQUFBO0tBQWtCLEdBQUdDLHNCQUFjLEVBQUU7RUFFN0MsRUFBQSxNQUFNQyxZQUFZLEdBQUcsTUFBT0MsQ0FBQyxJQUFLO01BQ2hDQSxDQUFDLENBQUNDLGNBQWMsRUFBRTtNQUNsQlAsUUFBUSxDQUFDLEVBQUUsQ0FBQztNQUNadkMsVUFBVSxDQUFDLElBQUksQ0FBQztNQUVoQixJQUFJO0VBQ0YsTUFBQSxNQUFNRSxRQUFRLEdBQUcsTUFBTTZDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRTtFQUMvQ0MsUUFBQUEsTUFBTSxFQUFFLE1BQU07RUFDZEMsUUFBQUEsT0FBTyxFQUFFO0VBQ1AsVUFBQSxjQUFjLEVBQUU7V0FDakI7RUFDREMsUUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQVMsQ0FBQztZQUFFbkcsS0FBSztFQUFFb0YsVUFBQUE7RUFBUyxTQUFDLENBQUM7RUFDekNnQixRQUFBQSxXQUFXLEVBQUU7RUFDZixPQUFDLENBQUM7RUFFRixNQUFBLE1BQU05QyxJQUFJLEdBQUcsTUFBTUwsUUFBUSxDQUFDb0QsSUFBSSxFQUFFO1FBRWxDLElBQUlwRCxRQUFRLENBQUNxRCxFQUFFLEVBQUU7VUFDZkMsTUFBTSxDQUFDQyxRQUFRLENBQUN6RixJQUFJLEdBQUd1QyxJQUFJLENBQUNtRCxXQUFXLElBQUksWUFBWTtFQUN6RCxNQUFBLENBQUMsTUFBTTtFQUNMbkIsUUFBQUEsUUFBUSxDQUFDaEMsSUFBSSxDQUFDL0QsS0FBSyxJQUFJLDJCQUEyQixDQUFDO0VBQ3JELE1BQUE7TUFDRixDQUFDLENBQUMsT0FBT21ILEdBQUcsRUFBRTtFQUNabEgsTUFBQUEsT0FBTyxDQUFDRCxLQUFLLENBQUMsY0FBYyxFQUFFbUgsR0FBRyxDQUFDO1FBQ2xDcEIsUUFBUSxDQUFDLHNDQUFzQyxDQUFDO0VBQ2xELElBQUEsQ0FBQyxTQUFTO1FBQ1J2QyxVQUFVLENBQUMsS0FBSyxDQUFDO0VBQ25CLElBQUE7SUFDRixDQUFDO0VBRUQsRUFBQSxvQkFDRXRELHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUNGTSxJQUFBQSxPQUFPLEVBQUMsTUFBTTtFQUNkMEcsSUFBQUEsU0FBUyxFQUFDLE9BQU87RUFDakIxRixJQUFBQSxLQUFLLEVBQUU7RUFBRTJGLE1BQUFBLFVBQVUsRUFBRTtFQUErQjtFQUFFLEdBQUEsZUFHdERuSCxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFDRlMsSUFBQUEsSUFBSSxFQUFDLEdBQUc7RUFDUkgsSUFBQUEsT0FBTyxFQUFFO0VBQUU0RyxNQUFBQSxDQUFDLEVBQUUsTUFBTTtFQUFFQyxNQUFBQSxFQUFFLEVBQUU7T0FBUztFQUNuQ0MsSUFBQUEsYUFBYSxFQUFDLFFBQVE7RUFDdEJDLElBQUFBLGNBQWMsRUFBQyxRQUFRO0VBQ3ZCQyxJQUFBQSxVQUFVLEVBQUMsUUFBUTtFQUNuQjFHLElBQUFBLENBQUMsRUFBQyxLQUFLO0VBQ1BVLElBQUFBLEtBQUssRUFBRTtFQUNMaUcsTUFBQUEsVUFBVSxFQUFFLG1EQUFtRDtFQUMvRHJHLE1BQUFBLEtBQUssRUFBRTtFQUNUO0VBQUUsR0FBQSxlQUVGcEIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUN3SCxJQUFBQSxTQUFTLEVBQUMsUUFBUTtFQUFDbEcsSUFBQUEsS0FBSyxFQUFFO0VBQUVtRyxNQUFBQSxRQUFRLEVBQUU7RUFBUTtLQUFFLGVBQ25EM0gsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUNFMkgsSUFBQUEsR0FBRyxFQUFDLHdCQUF3QjtFQUM1QkMsSUFBQUEsR0FBRyxFQUFDLE1BQU07RUFDVnJHLElBQUFBLEtBQUssRUFBRTtFQUFFbUcsTUFBQUEsUUFBUSxFQUFFLE9BQU87RUFBRUcsTUFBQUEsWUFBWSxFQUFFO09BQVM7TUFDbkRDLE9BQU8sRUFBRzVCLENBQUMsSUFBSztFQUNkQSxNQUFBQSxDQUFDLENBQUNwRCxNQUFNLENBQUN2QixLQUFLLENBQUNoQixPQUFPLEdBQUcsTUFBTTtFQUNqQyxJQUFBO0VBQUUsR0FDSCxDQUFDLGVBQ0ZSLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0ksaUJBQUksRUFBQTtFQUFDbUIsSUFBQUEsS0FBSyxFQUFFO0VBQUVOLE1BQUFBLFFBQVEsRUFBRSxNQUFNO0VBQUVDLE1BQUFBLFVBQVUsRUFBRSxNQUFNO0VBQUUyRyxNQUFBQSxZQUFZLEVBQUU7RUFBTztFQUFFLEdBQUEsRUFBQywwQkFFdkUsQ0FBQyxlQUNQOUgsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDSSxpQkFBSSxFQUFBO0VBQUNtQixJQUFBQSxLQUFLLEVBQUU7RUFBRU4sTUFBQUEsUUFBUSxFQUFFLFVBQVU7RUFBRThHLE1BQUFBLE9BQU8sRUFBRTtFQUFJO0VBQUUsR0FBQSxFQUFDLHFFQUUvQyxDQUFDLGVBRVBoSSxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFDRk0sSUFBQUEsT0FBTyxFQUFDLE1BQU07RUFDZGdCLElBQUFBLEtBQUssRUFBRTtFQUFFZCxNQUFBQSxHQUFHLEVBQUUsTUFBTTtFQUFFdUgsTUFBQUEsU0FBUyxFQUFFLE1BQU07RUFBRVYsTUFBQUEsY0FBYyxFQUFFLFFBQVE7RUFBRTlHLE1BQUFBLFFBQVEsRUFBRTtFQUFPO0VBQUUsR0FBQSxlQUV0RlQsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNzQixJQUFBQSxLQUFLLEVBQUU7RUFBRWtHLE1BQUFBLFNBQVMsRUFBRTtFQUFTO0VBQUUsR0FBQSxlQUNsQzFILHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0ksaUJBQUksRUFBQTtFQUFDbUIsSUFBQUEsS0FBSyxFQUFFO0VBQUVOLE1BQUFBLFFBQVEsRUFBRSxNQUFNO0VBQUVDLE1BQUFBLFVBQVUsRUFBRTtFQUFPO0VBQUUsR0FBQSxFQUFDLE1BQVUsQ0FBQyxlQUNsRW5CLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0ksaUJBQUksRUFBQTtFQUFDbUIsSUFBQUEsS0FBSyxFQUFFO0VBQUVOLE1BQUFBLFFBQVEsRUFBRTtFQUFXO0tBQUUsRUFBQyxjQUFrQixDQUN0RCxDQUFDLGVBQ05sQixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ3NCLElBQUFBLEtBQUssRUFBRTtFQUFFa0csTUFBQUEsU0FBUyxFQUFFO0VBQVM7RUFBRSxHQUFBLGVBQ2xDMUgsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDSSxpQkFBSSxFQUFBO0VBQUNtQixJQUFBQSxLQUFLLEVBQUU7RUFBRU4sTUFBQUEsUUFBUSxFQUFFLE1BQU07RUFBRUMsTUFBQUEsVUFBVSxFQUFFO0VBQU87RUFBRSxHQUFBLEVBQUMsT0FBVyxDQUFDLGVBQ25FbkIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDSSxpQkFBSSxFQUFBO0VBQUNtQixJQUFBQSxLQUFLLEVBQUU7RUFBRU4sTUFBQUEsUUFBUSxFQUFFO0VBQVc7S0FBRSxFQUFDLFdBQWUsQ0FDbkQsQ0FBQyxlQUNObEIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNzQixJQUFBQSxLQUFLLEVBQUU7RUFBRWtHLE1BQUFBLFNBQVMsRUFBRTtFQUFTO0VBQUUsR0FBQSxlQUNsQzFILHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0ksaUJBQUksRUFBQTtFQUFDbUIsSUFBQUEsS0FBSyxFQUFFO0VBQUVOLE1BQUFBLFFBQVEsRUFBRSxNQUFNO0VBQUVDLE1BQUFBLFVBQVUsRUFBRTtFQUFPO0VBQUUsR0FBQSxFQUFDLEtBQVMsQ0FBQyxlQUNqRW5CLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0ksaUJBQUksRUFBQTtFQUFDbUIsSUFBQUEsS0FBSyxFQUFFO0VBQUVOLE1BQUFBLFFBQVEsRUFBRTtFQUFXO0tBQUUsRUFBQyxnQkFBb0IsQ0FDeEQsQ0FDRixDQUNGLENBQ0YsQ0FBQyxlQUdObEIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQ0ZTLElBQUFBLElBQUksRUFBQyxHQUFHO0VBQ1JILElBQUFBLE9BQU8sRUFBQyxNQUFNO0VBQ2Q4RyxJQUFBQSxhQUFhLEVBQUMsUUFBUTtFQUN0QkMsSUFBQUEsY0FBYyxFQUFDLFFBQVE7RUFDdkJDLElBQUFBLFVBQVUsRUFBQyxRQUFRO0VBQ25CMUcsSUFBQUEsQ0FBQyxFQUFDLEtBQUs7RUFDUFUsSUFBQUEsS0FBSyxFQUFFO0VBQUUwRyxNQUFBQSxlQUFlLEVBQUU7RUFBVTtFQUFFLEdBQUEsZUFFdENsSSxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFDRlcsSUFBQUEsRUFBRSxFQUFDLE9BQU87RUFDVkMsSUFBQUEsQ0FBQyxFQUFDLEtBQUs7RUFDUFUsSUFBQUEsS0FBSyxFQUFFO0VBQ0xULE1BQUFBLFlBQVksRUFBRSxRQUFRO0VBQ3RCQyxNQUFBQSxTQUFTLEVBQUUsZ0NBQWdDO0VBQzNDbUgsTUFBQUEsS0FBSyxFQUFFLE9BQU87RUFDZFIsTUFBQUEsUUFBUSxFQUFFO0VBQ1o7RUFBRSxHQUFBLGVBRUYzSCxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ0MsSUFBQUEsRUFBRSxFQUFDO0VBQUksR0FBQSxlQUNWSCxzQkFBQSxDQUFBQyxhQUFBLENBQUNJLGlCQUFJLEVBQUE7RUFBQ21CLElBQUFBLEtBQUssRUFBRTtFQUFFTixNQUFBQSxRQUFRLEVBQUUsUUFBUTtFQUFFQyxNQUFBQSxVQUFVLEVBQUUsTUFBTTtFQUFFQyxNQUFBQSxLQUFLLEVBQUU7RUFBVTtFQUFFLEdBQUEsRUFBQyxTQUVyRSxDQUFDLGVBQ1BwQixzQkFBQSxDQUFBQyxhQUFBLENBQUNJLGlCQUFJLEVBQUE7RUFBQ21CLElBQUFBLEtBQUssRUFBRTtFQUFFTixNQUFBQSxRQUFRLEVBQUUsTUFBTTtFQUFFRSxNQUFBQSxLQUFLLEVBQUUsU0FBUztFQUFFNkcsTUFBQUEsU0FBUyxFQUFFO0VBQVM7S0FBRSxFQUFDLGdEQUVwRSxDQUNILENBQUMsRUFFTG5JLEtBQUssaUJBQ0pFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUNGWSxJQUFBQSxDQUFDLEVBQUMsU0FBUztFQUNYWCxJQUFBQSxFQUFFLEVBQUMsU0FBUztFQUNacUIsSUFBQUEsS0FBSyxFQUFFO0VBQ0wwRyxNQUFBQSxlQUFlLEVBQUUsU0FBUztFQUMxQjNHLE1BQUFBLE1BQU0sRUFBRSxtQkFBbUI7RUFDM0JSLE1BQUFBLFlBQVksRUFBRTtFQUNoQjtFQUFFLEdBQUEsZUFFRmYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDSSxpQkFBSSxFQUFBO0VBQUNtQixJQUFBQSxLQUFLLEVBQUU7RUFBRUosTUFBQUEsS0FBSyxFQUFFLFNBQVM7RUFBRUYsTUFBQUEsUUFBUSxFQUFFO0VBQVc7S0FBRSxFQUFDLGVBQ3BELEVBQUNwQixLQUNBLENBQ0gsQ0FDTixlQUVERSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0VBQU1tSSxJQUFBQSxRQUFRLEVBQUVsQztFQUFhLEdBQUEsZUFDM0JsRyxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ0MsSUFBQUEsRUFBRSxFQUFDO0VBQUksR0FBQSxlQUNWSCxzQkFBQSxDQUFBQyxhQUFBLENBQUMwRSxrQkFBSyxFQUFBO0VBQUMwRCxJQUFBQSxPQUFPLEVBQUMsT0FBTztNQUFDekQsUUFBUSxFQUFBO0VBQUEsR0FBQSxFQUFDLGVBRXpCLENBQUMsZUFDUjVFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3FJLGtCQUFLLEVBQUE7RUFDSm5FLElBQUFBLEVBQUUsRUFBQyxPQUFPO0VBQ1ZvRSxJQUFBQSxJQUFJLEVBQUMsT0FBTztFQUNackUsSUFBQUEsS0FBSyxFQUFFM0QsS0FBTTtNQUNiMkMsUUFBUSxFQUFHaUQsQ0FBQyxJQUFLVCxRQUFRLENBQUNTLENBQUMsQ0FBQ3BELE1BQU0sQ0FBQ21CLEtBQUssQ0FBRTtFQUMxQ2UsSUFBQUEsV0FBVyxFQUFDLG1CQUFtQjtNQUMvQkwsUUFBUSxFQUFBLElBQUE7RUFDUjRELElBQUFBLFFBQVEsRUFBRW5GLE9BQVE7RUFDbEI3QixJQUFBQSxLQUFLLEVBQUU7RUFDTDJHLE1BQUFBLEtBQUssRUFBRSxNQUFNO0VBQ2JNLE1BQUFBLE9BQU8sRUFBRSxNQUFNO0VBQ2Z2SCxNQUFBQSxRQUFRLEVBQUU7RUFDWjtFQUFFLEdBQ0gsQ0FDRSxDQUFDLGVBRU5sQixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ0MsSUFBQUEsRUFBRSxFQUFDO0VBQVMsR0FBQSxlQUNmSCxzQkFBQSxDQUFBQyxhQUFBLENBQUMwRSxrQkFBSyxFQUFBO0VBQUMwRCxJQUFBQSxPQUFPLEVBQUMsVUFBVTtNQUFDekQsUUFBUSxFQUFBO0VBQUEsR0FBQSxFQUFDLFVBRTVCLENBQUMsZUFDUjVFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUFDc0IsSUFBQUEsS0FBSyxFQUFFO0VBQUVrSCxNQUFBQSxRQUFRLEVBQUU7RUFBVztFQUFFLEdBQUEsZUFDbkMxSSxzQkFBQSxDQUFBQyxhQUFBLENBQUNxSSxrQkFBSyxFQUFBO0VBQ0puRSxJQUFBQSxFQUFFLEVBQUMsVUFBVTtFQUNib0UsSUFBQUEsSUFBSSxFQUFFekMsWUFBWSxHQUFHLE1BQU0sR0FBRyxVQUFXO0VBQ3pDNUIsSUFBQUEsS0FBSyxFQUFFeUIsUUFBUztNQUNoQnpDLFFBQVEsRUFBR2lELENBQUMsSUFBS1AsV0FBVyxDQUFDTyxDQUFDLENBQUNwRCxNQUFNLENBQUNtQixLQUFLLENBQUU7RUFDN0NlLElBQUFBLFdBQVcsRUFBQyxxQkFBcUI7TUFDakNMLFFBQVEsRUFBQSxJQUFBO0VBQ1I0RCxJQUFBQSxRQUFRLEVBQUVuRixPQUFRO0VBQ2xCN0IsSUFBQUEsS0FBSyxFQUFFO0VBQ0wyRyxNQUFBQSxLQUFLLEVBQUUsTUFBTTtFQUNiTSxNQUFBQSxPQUFPLEVBQUUsTUFBTTtFQUNmdkgsTUFBQUEsUUFBUSxFQUFFLE1BQU07RUFDaEJ5SCxNQUFBQSxZQUFZLEVBQUU7RUFDaEI7RUFBRSxHQUNILENBQUMsZUFDRjNJLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7RUFDRXNJLElBQUFBLElBQUksRUFBQyxRQUFRO0VBQ2JLLElBQUFBLE9BQU8sRUFBRUEsTUFBTTdDLGVBQWUsQ0FBQyxDQUFDRCxZQUFZLENBQUU7RUFDOUN0RSxJQUFBQSxLQUFLLEVBQUU7RUFDTGtILE1BQUFBLFFBQVEsRUFBRSxVQUFVO0VBQ3BCRyxNQUFBQSxLQUFLLEVBQUUsTUFBTTtFQUNiQyxNQUFBQSxHQUFHLEVBQUUsS0FBSztFQUNWQyxNQUFBQSxTQUFTLEVBQUUsa0JBQWtCO0VBQzdCdEIsTUFBQUEsVUFBVSxFQUFFLE1BQU07RUFDbEJsRyxNQUFBQSxNQUFNLEVBQUUsTUFBTTtFQUNkRyxNQUFBQSxNQUFNLEVBQUUsU0FBUztFQUNqQk4sTUFBQUEsS0FBSyxFQUFFO0VBQ1Q7RUFBRSxHQUFBLEVBRUQwRSxZQUFZLEdBQUcsS0FBSyxHQUFHLFNBQ2xCLENBQ0wsQ0FDRixDQUFDLGVBRU45RixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ0MsSUFBQUEsRUFBRSxFQUFDLElBQUk7RUFBQ3FCLElBQUFBLEtBQUssRUFBRTtFQUFFeUcsTUFBQUEsU0FBUyxFQUFFO0VBQU87RUFBRSxHQUFBLGVBQ3hDakksc0JBQUEsQ0FBQUMsYUFBQSxDQUFDK0ksbUJBQU0sRUFBQTtFQUNMVCxJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNiVSxJQUFBQSxPQUFPLEVBQUMsU0FBUztFQUNqQlQsSUFBQUEsUUFBUSxFQUFFbkYsT0FBUTtFQUNsQjdCLElBQUFBLEtBQUssRUFBRTtFQUNMMkcsTUFBQUEsS0FBSyxFQUFFLE1BQU07RUFDYk0sTUFBQUEsT0FBTyxFQUFFLE1BQU07RUFDZnZILE1BQUFBLFFBQVEsRUFBRSxNQUFNO0VBQ2hCQyxNQUFBQSxVQUFVLEVBQUUsS0FBSztFQUNqQnNHLE1BQUFBLFVBQVUsRUFBRXBFLE9BQU8sR0FBRyxTQUFTLEdBQUcsU0FBUztFQUMzQzNCLE1BQUFBLE1BQU0sRUFBRTJCLE9BQU8sR0FBRyxhQUFhLEdBQUc7RUFDcEM7S0FBRSxFQUVEQSxPQUFPLGdCQUNOckQsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLGVBQ0VELHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTXVCLElBQUFBLEtBQUssRUFBRTtFQUFFMEgsTUFBQUEsV0FBVyxFQUFFO0VBQU07RUFBRSxHQUFBLEVBQUMsUUFBTyxDQUFDLEVBQUEsZUFFekMsQ0FBQyxHQUVQLFNBRUksQ0FDTCxDQUNELENBQUMsZUFFUGxKLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUFDc0IsSUFBQUEsS0FBSyxFQUFFO0VBQUVrRyxNQUFBQSxTQUFTLEVBQUUsUUFBUTtFQUFFTyxNQUFBQSxTQUFTLEVBQUU7RUFBUztFQUFFLEdBQUEsZUFDdkRqSSxzQkFBQSxDQUFBQyxhQUFBLENBQUNJLGlCQUFJLEVBQUE7RUFBQ21CLElBQUFBLEtBQUssRUFBRTtFQUFFTixNQUFBQSxRQUFRLEVBQUUsVUFBVTtFQUFFRSxNQUFBQSxLQUFLLEVBQUU7RUFBVTtLQUFFLEVBQUMsd0JBQ2pDLEVBQUMsR0FBRyxlQUMxQnBCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0ksaUJBQUksRUFBQTtFQUNIZ0IsSUFBQUEsRUFBRSxFQUFDLE1BQU07RUFDVEcsSUFBQUEsS0FBSyxFQUFFO0VBQUVKLE1BQUFBLEtBQUssRUFBRSxTQUFTO0VBQUVELE1BQUFBLFVBQVUsRUFBRSxNQUFNO0VBQUVPLE1BQUFBLE1BQU0sRUFBRTtFQUFVO0tBQUUsRUFDcEUsdUJBRUssQ0FDRixDQUNILENBQ0YsQ0FBQyxlQUVOMUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNzQixJQUFBQSxLQUFLLEVBQUU7RUFBRWtHLE1BQUFBLFNBQVMsRUFBRSxRQUFRO0VBQUVPLE1BQUFBLFNBQVMsRUFBRTtFQUFPO0VBQUUsR0FBQSxlQUNyRGpJLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0ksaUJBQUksRUFBQTtFQUFDbUIsSUFBQUEsS0FBSyxFQUFFO0VBQUVOLE1BQUFBLFFBQVEsRUFBRSxTQUFTO0VBQUVFLE1BQUFBLEtBQUssRUFBRTtFQUFVO0VBQUUsR0FBQSxFQUFDLDBEQUVsRCxDQUNILENBQ0YsQ0FDRixDQUFDO0VBRVYsQ0FBQzs7RUN0UEQsTUFBTStILGNBQWMsR0FBSXJILEtBQUssSUFBSztJQUM5QixNQUFNO01BQUVDLE1BQU07RUFBRUMsSUFBQUE7RUFBUyxHQUFDLEdBQUdGLEtBQUs7SUFDbEMsTUFBTXNILFFBQVEsR0FBR3JILE1BQU0sQ0FBQ0csTUFBTSxDQUFDRixRQUFRLENBQUNHLElBQUksQ0FBQztJQUU3QyxJQUFJLENBQUNpSCxRQUFRLEVBQUU7RUFDWCxJQUFBLE9BQU8sSUFBSTtFQUNmLEVBQUE7SUFFQSxvQkFDSXBKLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQSxJQUFBLGVBQ0FGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDSTJILElBQUFBLEdBQUcsRUFBRXdCLFFBQVM7TUFDZHZCLEdBQUcsRUFBRTdGLFFBQVEsQ0FBQ29DLEtBQU07RUFDcEI1QyxJQUFBQSxLQUFLLEVBQUU7RUFBRW1HLE1BQUFBLFFBQVEsRUFBRSxPQUFPO0VBQUUwQixNQUFBQSxTQUFTLEVBQUUsT0FBTztFQUFFQyxNQUFBQSxTQUFTLEVBQUU7RUFBUTtFQUFFLEdBQ3hFLENBQ0EsQ0FBQztFQUVkLENBQUM7O0VDakJELE1BQU1DLGtCQUFrQixHQUFJekgsS0FBSyxJQUFLO0lBQ2xDLE1BQU07TUFBRUMsTUFBTTtFQUFFQyxJQUFBQTtFQUFTLEdBQUMsR0FBR0YsS0FBSztJQUVsQyxNQUFNMEgsTUFBTSxHQUFHLEVBQUU7RUFDakI7SUFDQUMsTUFBTSxDQUFDQyxJQUFJLENBQUMzSCxNQUFNLENBQUNHLE1BQU0sQ0FBQyxDQUFDeUgsT0FBTyxDQUFDQyxHQUFHLElBQUk7RUFDdEM7TUFDQSxJQUFJQSxHQUFHLENBQUNDLFVBQVUsQ0FBQyxDQUFBLEVBQUc3SCxRQUFRLENBQUNHLElBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQyxJQUFJLENBQUMySCxLQUFLLENBQUNGLEdBQUcsQ0FBQ0csS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxHQUFHLEVBQUUsQ0FBQyxFQUFFO1FBQ3JFUixNQUFNLENBQUNTLElBQUksQ0FBQ2xJLE1BQU0sQ0FBQ0csTUFBTSxDQUFDMEgsR0FBRyxDQUFDLENBQUM7RUFDbkMsSUFBQTtFQUNKLEVBQUEsQ0FBQyxDQUFDO0VBRUYsRUFBQSxJQUFJSixNQUFNLENBQUM3RyxNQUFNLEtBQUssQ0FBQyxFQUFFO0VBQ3JCLElBQUEsT0FBTyxJQUFJO0VBQ2YsRUFBQTtFQUVBLEVBQUEsb0JBQ0kzQyxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ00sSUFBQUEsT0FBTyxFQUFDLE1BQU07RUFBQzhHLElBQUFBLGFBQWEsRUFBQyxLQUFLO0VBQUM3RyxJQUFBQSxRQUFRLEVBQUMsTUFBTTtFQUFDQyxJQUFBQSxHQUFHLEVBQUU7S0FBRSxFQUMxRDhJLE1BQU0sQ0FBQ3hGLEdBQUcsQ0FBQyxDQUFDa0csR0FBRyxFQUFFQyxLQUFLLGtCQUNuQm5LLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDSTJKLElBQUFBLEdBQUcsRUFBRU8sS0FBTTtFQUNYdkMsSUFBQUEsR0FBRyxFQUFFc0MsR0FBSTtFQUNUckMsSUFBQUEsR0FBRyxFQUFFLENBQUEsRUFBRzdGLFFBQVEsQ0FBQ29DLEtBQUssQ0FBQSxDQUFBLEVBQUkrRixLQUFLLENBQUEsQ0FBRztFQUNsQzNJLElBQUFBLEtBQUssRUFBRTtFQUFFbUcsTUFBQUEsUUFBUSxFQUFFLE9BQU87RUFBRTBCLE1BQUFBLFNBQVMsRUFBRSxPQUFPO0VBQUVDLE1BQUFBLFNBQVMsRUFBRTtFQUFRO0tBQ3RFLENBQ0osQ0FDQSxDQUFDO0VBRWQsQ0FBQzs7RUM1QkQsTUFBTWMsa0JBQWtCLEdBQUl0SSxLQUFLLElBQUs7SUFDbEMsTUFBTTtNQUFFRSxRQUFRO01BQUVELE1BQU07RUFBRW1CLElBQUFBO0VBQVMsR0FBQyxHQUFHcEIsS0FBSztJQUM1QyxNQUFNb0MsS0FBSyxHQUFHbkMsTUFBTSxDQUFDRyxNQUFNLENBQUNGLFFBQVEsQ0FBQ0csSUFBSSxDQUFDLElBQUksRUFBRTtJQUNoRCxNQUFNLENBQUNpSCxRQUFRLEVBQUVpQixXQUFXLENBQUMsR0FBR2hMLGNBQVEsQ0FBQzZFLEtBQUssQ0FBQzs7RUFFL0M7RUFDQXhFLEVBQUFBLGVBQVMsQ0FBQyxNQUFNO01BQ1oySyxXQUFXLENBQUN0SSxNQUFNLENBQUNHLE1BQU0sQ0FBQ0YsUUFBUSxDQUFDRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkQsQ0FBQyxFQUFFLENBQUNKLE1BQU0sQ0FBQ0csTUFBTSxDQUFDRixRQUFRLENBQUNHLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFbEMsTUFBTW1JLGlCQUFpQixHQUFJQyxLQUFLLElBQUs7RUFDakMsSUFBQSxNQUFNQyxRQUFRLEdBQUdELEtBQUssQ0FBQ3hILE1BQU0sQ0FBQ21CLEtBQUs7TUFDbkNtRyxXQUFXLENBQUNHLFFBQVEsQ0FBQztFQUNyQnRILElBQUFBLFFBQVEsQ0FBQ2xCLFFBQVEsQ0FBQ0csSUFBSSxFQUFFcUksUUFBUSxDQUFDO0lBQ3JDLENBQUM7RUFFRCxFQUFBLG9CQUNJeEssc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUM0SCxJQUFBQSxZQUFZLEVBQUM7RUFBSyxHQUFBLGVBQ25COUgsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDMEUsa0JBQUssRUFBQTtNQUFDMEQsT0FBTyxFQUFFckcsUUFBUSxDQUFDRztLQUFLLEVBQUVILFFBQVEsQ0FBQ29DLEtBQWEsQ0FBQyxFQUN0RGdGLFFBQVEsaUJBQ0xwSixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQzRILElBQUFBLFlBQVksRUFBQztLQUFTLGVBQ3ZCOUgsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUNJMkgsSUFBQUEsR0FBRyxFQUFFd0IsUUFBUztFQUNkdkIsSUFBQUEsR0FBRyxFQUFDLFNBQVM7RUFDYnJHLElBQUFBLEtBQUssRUFBRTtFQUFFbUcsTUFBQUEsUUFBUSxFQUFFLE9BQU87RUFBRTBCLE1BQUFBLFNBQVMsRUFBRSxPQUFPO0VBQUVDLE1BQUFBLFNBQVMsRUFBRSxPQUFPO0VBQUU5SSxNQUFBQSxPQUFPLEVBQUUsT0FBTztFQUFFc0gsTUFBQUEsWUFBWSxFQUFFLEtBQUs7RUFBRXZHLE1BQUFBLE1BQU0sRUFBRSxnQkFBZ0I7RUFBRWtILE1BQUFBLE9BQU8sRUFBRTtPQUFRO01BQ3RKVixPQUFPLEVBQUc1QixDQUFDLElBQUs7RUFBRUEsTUFBQUEsQ0FBQyxDQUFDcEQsTUFBTSxDQUFDdkIsS0FBSyxDQUFDaEIsT0FBTyxHQUFHLE1BQU07RUFBRSxJQUFBO0VBQUUsR0FDeEQsQ0FDQSxDQUNSLGVBQ0RSLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3FJLGtCQUFLLEVBQUE7TUFDRm5FLEVBQUUsRUFBRW5DLFFBQVEsQ0FBQ0csSUFBSztNQUNsQkEsSUFBSSxFQUFFSCxRQUFRLENBQUNHLElBQUs7RUFDcEIrQixJQUFBQSxLQUFLLEVBQUVrRixRQUFTO0VBQ2hCbEcsSUFBQUEsUUFBUSxFQUFFb0gsaUJBQWtCO0VBQzVCbkMsSUFBQUEsS0FBSyxFQUFFO0VBQUUsR0FDWixDQUNBLENBQUM7RUFFZCxDQUFDOztFQ3RDRCxNQUFNc0Msc0JBQXNCLEdBQUkzSSxLQUFLLElBQUs7SUFDdEMsTUFBTTtNQUFFRSxRQUFRO01BQUVELE1BQU07RUFBRW1CLElBQUFBO0VBQVMsR0FBQyxHQUFHcEIsS0FBSzs7RUFFNUM7RUFDQTtJQUNBLE1BQU00SSxTQUFTLEdBQUdBLE1BQU07TUFDcEIsTUFBTWxCLE1BQU0sR0FBRyxFQUFFO01BQ2pCQyxNQUFNLENBQUNDLElBQUksQ0FBQzNILE1BQU0sQ0FBQ0csTUFBTSxDQUFDLENBQUN5SCxPQUFPLENBQUNDLEdBQUcsSUFBSTtRQUN0QyxJQUFJQSxHQUFHLENBQUNDLFVBQVUsQ0FBQyxDQUFBLEVBQUc3SCxRQUFRLENBQUNHLElBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQyxJQUFJLENBQUMySCxLQUFLLENBQUNGLEdBQUcsQ0FBQ0csS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxHQUFHLEVBQUUsQ0FBQyxFQUFFO0VBQ3JFLFFBQUEsTUFBTUcsS0FBSyxHQUFHUSxRQUFRLENBQUNmLEdBQUcsQ0FBQ0csS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUM7VUFDaERSLE1BQU0sQ0FBQ1csS0FBSyxDQUFDLEdBQUdwSSxNQUFNLENBQUNHLE1BQU0sQ0FBQzBILEdBQUcsQ0FBQztFQUN0QyxNQUFBO0VBQ0osSUFBQSxDQUFDLENBQUM7RUFDRjtNQUNBLE9BQU9KLE1BQU0sQ0FBQ2xILE1BQU0sQ0FBQ3NJLEdBQUcsSUFBSUEsR0FBRyxLQUFLQyxTQUFTLENBQUM7SUFDbEQsQ0FBQztJQUVELE1BQU0sQ0FBQ3JCLE1BQU0sRUFBRXNCLFNBQVMsQ0FBQyxHQUFHekwsY0FBUSxDQUFDcUwsU0FBUyxFQUFFLENBQUM7O0VBRWpEO0VBQ0E7SUFDQSxNQUFNSyxZQUFZLEdBQUlDLFNBQVMsSUFBSztNQUNoQ0YsU0FBUyxDQUFDRSxTQUFTLENBQUM7O0VBRXBCO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7O0VBRUE7RUFDQTs7RUFFQTtFQUNBO0VBQ0E5SCxJQUFBQSxRQUFRLENBQUNsQixRQUFRLENBQUNHLElBQUksRUFBRTZJLFNBQVMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsTUFBTUMsU0FBUyxHQUFHQSxNQUFNO0VBQ3BCRixJQUFBQSxZQUFZLENBQUMsQ0FBQyxHQUFHdkIsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxNQUFNMEIsWUFBWSxHQUFJZixLQUFLLElBQUs7RUFDNUIsSUFBQSxNQUFNYSxTQUFTLEdBQUcsQ0FBQyxHQUFHeEIsTUFBTSxDQUFDO0VBQzdCd0IsSUFBQUEsU0FBUyxDQUFDRyxNQUFNLENBQUNoQixLQUFLLEVBQUUsQ0FBQyxDQUFDO01BQzFCWSxZQUFZLENBQUNDLFNBQVMsQ0FBQztJQUMzQixDQUFDO0VBRUQsRUFBQSxNQUFNM0csWUFBWSxHQUFHQSxDQUFDOEYsS0FBSyxFQUFFakcsS0FBSyxLQUFLO0VBQ25DLElBQUEsTUFBTThHLFNBQVMsR0FBRyxDQUFDLEdBQUd4QixNQUFNLENBQUM7RUFDN0J3QixJQUFBQSxTQUFTLENBQUNiLEtBQUssQ0FBQyxHQUFHakcsS0FBSztNQUN4QjZHLFlBQVksQ0FBQ0MsU0FBUyxDQUFDO0lBQzNCLENBQUM7RUFFRCxFQUFBLG9CQUNJaEwsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUM0SCxJQUFBQSxZQUFZLEVBQUM7S0FBSyxlQUNuQjlILHNCQUFBLENBQUFDLGFBQUEsQ0FBQzBFLGtCQUFLLFFBQUUzQyxRQUFRLENBQUNvQyxLQUFhLENBQUMsRUFDOUJvRixNQUFNLENBQUN4RixHQUFHLENBQUMsQ0FBQ2tHLEdBQUcsRUFBRUMsS0FBSyxrQkFDbkJuSyxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQzBKLElBQUFBLEdBQUcsRUFBRU8sS0FBTTtFQUFDckMsSUFBQUEsWUFBWSxFQUFDLFNBQVM7RUFBQ3RILElBQUFBLE9BQU8sRUFBQyxNQUFNO0VBQUNnSCxJQUFBQSxVQUFVLEVBQUM7RUFBUSxHQUFBLGVBQ3RFeEgsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNnSixJQUFBQSxXQUFXLEVBQUM7RUFBUyxHQUFBLEVBQ3JCZ0IsR0FBRyxpQkFBSWxLLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDSjJILElBQUFBLEdBQUcsRUFBRXNDLEdBQUk7RUFDVHJDLElBQUFBLEdBQUcsRUFBRSxDQUFBLE1BQUEsRUFBU3NDLEtBQUssR0FBRyxDQUFDLENBQUEsQ0FBRztFQUMxQjNJLElBQUFBLEtBQUssRUFBRTtFQUFFMkcsTUFBQUEsS0FBSyxFQUFFLE1BQU07RUFBRWlELE1BQUFBLE1BQU0sRUFBRSxNQUFNO0VBQUU5QixNQUFBQSxTQUFTLEVBQUUsT0FBTztFQUFFdkksTUFBQUEsWUFBWSxFQUFFO09BQVE7TUFDbEZnSCxPQUFPLEVBQUc1QixDQUFDLElBQUs7RUFBRUEsTUFBQUEsQ0FBQyxDQUFDcEQsTUFBTSxDQUFDdkIsS0FBSyxDQUFDaEIsT0FBTyxHQUFHLE1BQU07RUFBRSxJQUFBO0VBQUUsR0FDeEQsQ0FDQSxDQUFDLGVBQ05SLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUFDbUwsSUFBQUEsUUFBUSxFQUFFLENBQUU7RUFBQ25DLElBQUFBLFdBQVcsRUFBQztFQUFTLEdBQUEsZUFDbkNsSixzQkFBQSxDQUFBQyxhQUFBLENBQUNxSSxrQkFBSyxFQUFBO0VBQ0ZwRSxJQUFBQSxLQUFLLEVBQUVnRyxHQUFJO0VBQ1hoSCxJQUFBQSxRQUFRLEVBQUdpRCxDQUFDLElBQUs5QixZQUFZLENBQUM4RixLQUFLLEVBQUVoRSxDQUFDLENBQUNwRCxNQUFNLENBQUNtQixLQUFLLENBQUU7RUFDckRpRSxJQUFBQSxLQUFLLEVBQUUsQ0FBRTtFQUNUbEQsSUFBQUEsV0FBVyxFQUFDO0VBQVcsR0FDMUIsQ0FDQSxDQUFDLGVBQ05qRixzQkFBQSxDQUFBQyxhQUFBLENBQUMrSSxtQkFBTSxFQUFBO0VBQUNKLElBQUFBLE9BQU8sRUFBRUEsTUFBTXNDLFlBQVksQ0FBQ2YsS0FBSyxDQUFFO0VBQUNsQixJQUFBQSxPQUFPLEVBQUMsUUFBUTtFQUFDcUMsSUFBQUEsSUFBSSxFQUFDO0VBQU0sR0FBQSxlQUNwRXRMLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3NMLGlCQUFJLEVBQUE7RUFBQ0MsSUFBQUEsSUFBSSxFQUFDO0tBQVUsQ0FDakIsQ0FDUCxDQUNSLENBQUMsZUFDRnhMLHNCQUFBLENBQUFDLGFBQUEsQ0FBQytJLG1CQUFNLEVBQUE7RUFBQ0osSUFBQUEsT0FBTyxFQUFFcUMsU0FBVTtFQUFDMUMsSUFBQUEsSUFBSSxFQUFDO0VBQVEsR0FBQSxlQUNyQ3ZJLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3NMLGlCQUFJLEVBQUE7RUFBQ0MsSUFBQUEsSUFBSSxFQUFDO0tBQVEsQ0FBQyxFQUFBLGdCQUNoQixDQUNQLENBQUM7RUFFZCxDQUFDOztFQzNGRCxNQUFNNUwsR0FBRyxHQUFHLElBQUlDLGlCQUFTLEVBQUU7RUFDM0I7RUFDQSxNQUFNNEwsUUFBUSxHQUFHLEVBQUU7RUFFbkIsTUFBTUMsd0JBQXdCLEdBQUk1SixLQUFLLElBQUs7SUFDeEMsTUFBTTtNQUFFQyxNQUFNO0VBQUU0SixJQUFBQTtFQUFTLEdBQUMsR0FBRzdKLEtBQUs7RUFDbEMsRUFBQSxNQUFNOEosU0FBUyxHQUFHQyxpQkFBUyxFQUFFO0lBRTdCLE1BQU0sQ0FBQ3hJLE9BQU8sRUFBRUMsVUFBVSxDQUFDLEdBQUdqRSxjQUFRLENBQUMsS0FBSyxDQUFDO0lBQzdDLE1BQU0sQ0FBQzhELFVBQVUsRUFBRUMsYUFBYSxDQUFDLEdBQUcvRCxjQUFRLENBQUMsRUFBRSxDQUFDO0lBQ2hELE1BQU0sQ0FBQ3lNLFdBQVcsRUFBRUMsY0FBYyxDQUFDLEdBQUcxTSxjQUFRLENBQUMsRUFBRSxDQUFDO0VBQ2xELEVBQUEsTUFBTSxDQUFDMk0sUUFBUSxFQUFFQyxXQUFXLENBQUMsR0FBRzVNLGNBQVEsQ0FBQztFQUNyQzZNLElBQUFBLFFBQVEsRUFBRW5LLE1BQU0sRUFBRUcsTUFBTSxFQUFFQyxJQUFJLElBQUksa0JBQWtCO0VBQ3BEZ0ssSUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQztFQUNuQkMsSUFBQUEsTUFBTSxFQUFFLElBQUk7RUFDWkMsSUFBQUEsUUFBUSxFQUFFdEssTUFBTSxFQUFFRyxNQUFNLEVBQUVtSyxRQUFRLElBQUksUUFBUTtFQUM5Q0MsSUFBQUEsa0JBQWtCLEVBQUU7RUFDeEIsR0FBQyxDQUFDO0lBQ0YsTUFBTSxDQUFDQyxlQUFlLEVBQUVDLGtCQUFrQixDQUFDLEdBQUduTixjQUFRLENBQUMsS0FBSyxDQUFDOztFQUU3RDtFQUNBSyxFQUFBQSxlQUFTLENBQUMsTUFBTTtFQUNaLElBQUEsTUFBTStNLGlCQUFpQixHQUFHLFlBQVk7UUFDbEMsSUFBSTtFQUNBLFFBQUEsTUFBTWpKLFFBQVEsR0FBRyxNQUFNNUQsR0FBRyxDQUFDNkQsY0FBYyxDQUFDO0VBQ3RDQyxVQUFBQSxVQUFVLEVBQUUsWUFBWTtFQUN4QkMsVUFBQUEsVUFBVSxFQUFFLE1BQU07RUFDbEJ6QixVQUFBQSxNQUFNLEVBQUU7Y0FBRSxvQkFBb0IsRUFBRUgsTUFBTSxDQUFDb0M7RUFBRztFQUM5QyxTQUFDLENBQUM7VUFDRixJQUFJWCxRQUFRLENBQUNLLElBQUksRUFBRUMsT0FBTyxFQUFFbkIsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNwQzZKLGtCQUFrQixDQUFDLElBQUksQ0FBQztFQUM1QixRQUFBO1FBQ0osQ0FBQyxDQUFDLE9BQU8xTSxLQUFLLEVBQUU7RUFDWkMsUUFBQUEsT0FBTyxDQUFDRCxLQUFLLENBQUMsK0JBQStCLEVBQUVBLEtBQUssQ0FBQztFQUN6RCxNQUFBO01BQ0osQ0FBQztFQUNEMk0sSUFBQUEsaUJBQWlCLEVBQUU7RUFDdkIsRUFBQSxDQUFDLEVBQUUsQ0FBQzFLLE1BQU0sQ0FBQ29DLEVBQUUsQ0FBQyxDQUFDOztFQUVmO0VBQ0F6RSxFQUFBQSxlQUFTLENBQUMsTUFBTTtFQUNaLElBQUEsTUFBTTZELGVBQWUsR0FBRyxZQUFZO1FBQ2hDLElBQUk7RUFDQSxRQUFBLE1BQU1DLFFBQVEsR0FBRyxNQUFNNUQsR0FBRyxDQUFDNkQsY0FBYyxDQUFDO0VBQ3RDQyxVQUFBQSxVQUFVLEVBQUUsYUFBYTtFQUN6QkMsVUFBQUEsVUFBVSxFQUFFLE1BQU07RUFDbEJ6QixVQUFBQSxNQUFNLEVBQUU7RUFDSixZQUFBLGNBQWMsRUFBRSxXQUFXO0VBQzNCMEIsWUFBQUEsT0FBTyxFQUFFLEdBQUc7RUFDWixZQUFBLElBQUlrSSxXQUFXLElBQUk7RUFBRSxjQUFBLGNBQWMsRUFBRUE7ZUFBYTtFQUN0RDtFQUNKLFNBQUMsQ0FBQztFQUNGLFFBQUEsSUFBSXRJLFFBQVEsQ0FBQ0ssSUFBSSxFQUFFQyxPQUFPLEVBQUU7WUFDeEJWLGFBQWEsQ0FDVEksUUFBUSxDQUFDSyxJQUFJLENBQUNDLE9BQU8sQ0FBQ0UsR0FBRyxDQUFFQyxDQUFDLEtBQU07Y0FDOUJDLEtBQUssRUFBRUQsQ0FBQyxDQUFDRSxFQUFFO0VBQ1hDLFlBQUFBLEtBQUssRUFBRSxDQUFBLEVBQUdILENBQUMsQ0FBQy9CLE1BQU0sQ0FBQ0MsSUFBSSxDQUFBLEVBQUEsRUFBSzhCLENBQUMsQ0FBQy9CLE1BQU0sQ0FBQ3dLLEtBQUssSUFBSSxVQUFVLENBQUEsQ0FBQTthQUMzRCxDQUFDLENBQ04sQ0FBQztFQUNMLFFBQUE7UUFDSixDQUFDLENBQUMsT0FBTzVNLEtBQUssRUFBRTtFQUNaQyxRQUFBQSxPQUFPLENBQUNELEtBQUssQ0FBQyw0QkFBNEIsRUFBRUEsS0FBSyxDQUFDO0VBQ3RELE1BQUE7TUFDSixDQUFDO0VBQ0R5RCxJQUFBQSxlQUFlLEVBQUU7RUFDckIsRUFBQSxDQUFDLEVBQUUsQ0FBQ3VJLFdBQVcsQ0FBQyxDQUFDO0VBRWpCLEVBQUEsTUFBTTVGLFlBQVksR0FBRyxNQUFPQyxDQUFDLElBQUs7TUFDOUJBLENBQUMsQ0FBQ0MsY0FBYyxFQUFFO01BQ2xCOUMsVUFBVSxDQUFDLElBQUksQ0FBQztNQUVoQixJQUFJO0VBQ0EsTUFBQSxNQUFNRSxRQUFRLEdBQUcsTUFBTTZDLEtBQUssQ0FDeEIsQ0FBQSxFQUFHb0YsUUFBUSxDQUFBLHdDQUFBLEVBQTJDMUosTUFBTSxDQUFDb0MsRUFBRSxDQUFBLENBQUUsRUFDakU7RUFDSW1DLFFBQUFBLE1BQU0sRUFBRSxNQUFNO0VBQ2RDLFFBQUFBLE9BQU8sRUFBRTtFQUNMLFVBQUEsY0FBYyxFQUFFO1dBQ25CO0VBQ0RJLFFBQUFBLFdBQVcsRUFBRSxTQUFTO0VBQ3RCSCxRQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBUyxDQUFDO1lBQ2pCd0YsUUFBUSxFQUFFRixRQUFRLENBQUNFLFFBQVE7WUFDM0JDLGdCQUFnQixFQUFFSCxRQUFRLENBQUNHLGdCQUFnQjtZQUMzQ0MsTUFBTSxFQUFFSixRQUFRLENBQUNJLE1BQU07WUFDdkJDLFFBQVEsRUFBRUwsUUFBUSxDQUFDSyxRQUFRO1lBQzNCTSxrQkFBa0IsRUFBRVgsUUFBUSxDQUFDSSxNQUFNLEdBQUcsRUFBRSxHQUFHSixRQUFRLENBQUNNO1dBQ3ZEO0VBQ0wsT0FDSixDQUFDO0VBRUQsTUFBQSxNQUFNekksSUFBSSxHQUFHLE1BQU1MLFFBQVEsQ0FBQ29ELElBQUksRUFBRTtRQUVsQyxJQUFJL0MsSUFBSSxDQUFDK0ksT0FBTyxFQUFFO0VBQ2RoQixRQUFBQSxTQUFTLENBQUM7RUFDTmlCLFVBQUFBLE9BQU8sRUFBRSw0QkFBNEI7RUFDckN0RSxVQUFBQSxJQUFJLEVBQUU7RUFDVixTQUFDLENBQUM7RUFDRjtFQUNBekIsUUFBQUEsTUFBTSxDQUFDQyxRQUFRLENBQUN6RixJQUFJLEdBQUcsaUNBQWlDO0VBQzVELE1BQUEsQ0FBQyxNQUFNO0VBQ0hzSyxRQUFBQSxTQUFTLENBQUM7RUFDTmlCLFVBQUFBLE9BQU8sRUFBRWhKLElBQUksQ0FBQ2dKLE9BQU8sSUFBSSx1QkFBdUI7RUFDaER0RSxVQUFBQSxJQUFJLEVBQUU7RUFDVixTQUFDLENBQUM7RUFDTixNQUFBO01BQ0osQ0FBQyxDQUFDLE9BQU96SSxLQUFLLEVBQUU7RUFDWkMsTUFBQUEsT0FBTyxDQUFDRCxLQUFLLENBQUMsc0JBQXNCLEVBQUVBLEtBQUssQ0FBQztFQUM1QzhMLE1BQUFBLFNBQVMsQ0FBQztFQUNOaUIsUUFBQUEsT0FBTyxFQUFFLHdDQUF3QztFQUNqRHRFLFFBQUFBLElBQUksRUFBRTtFQUNWLE9BQUMsQ0FBQztFQUNOLElBQUEsQ0FBQyxTQUFTO1FBQ05qRixVQUFVLENBQUMsS0FBSyxDQUFDO0VBQ3JCLElBQUE7SUFDSixDQUFDO0VBbUJELEVBQUEsSUFBSWlKLGVBQWUsRUFBRTtFQUNqQixJQUFBLG9CQUNJdk0sc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUMrSSxNQUFBQSxPQUFPLEVBQUMsTUFBTTtFQUFDUixNQUFBQSxPQUFPLEVBQUM7RUFBSSxLQUFBLGVBQzVCekksc0JBQUEsQ0FBQUMsYUFBQSxDQUFDNk0sdUJBQVUsRUFBQTtFQUFDN0QsTUFBQUEsT0FBTyxFQUFDLFFBQVE7RUFBQzRELE1BQUFBLE9BQU8sRUFBQztFQUE2QyxLQUFFLENBQUMsZUFDckY3TSxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQytILE1BQUFBLFNBQVMsRUFBQztFQUFJLEtBQUEsZUFDZmpJLHNCQUFBLENBQUFDLGFBQUEsQ0FBQytJLG1CQUFNLEVBQUE7RUFDSEMsTUFBQUEsT0FBTyxFQUFDLFNBQVM7UUFDakJMLE9BQU8sRUFBRUEsTUFBTzlCLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDekYsSUFBSSxHQUFHO09BQW1DLEVBQzdFLHNCQUVPLENBQ1AsQ0FDSixDQUFDO0VBRWQsRUFBQTtFQUVBLEVBQUEsb0JBQ0l0QixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQytJLElBQUFBLE9BQU8sRUFBQyxNQUFNO0VBQUNSLElBQUFBLE9BQU8sRUFBQztFQUFJLEdBQUEsZUFDNUJ6SSxzQkFBQSxDQUFBQyxhQUFBLENBQUM4TSxlQUFFLEVBQUEsSUFBQSxFQUFDLDhCQUFnQyxDQUFDLGVBQ3JDL00sc0JBQUEsQ0FBQUMsYUFBQSxDQUFDSSxpQkFBSSxFQUFBO0VBQUN5SCxJQUFBQSxZQUFZLEVBQUM7RUFBSSxHQUFBLEVBQUMscUJBQ0QsZUFBQTlILHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUEsSUFBQSxFQUFTOEIsTUFBTSxFQUFFRyxNQUFNLEVBQUVDLElBQUksSUFBSSxpQkFBMEIsQ0FDNUUsQ0FBQyxlQUVQbkMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNbUksSUFBQUEsUUFBUSxFQUFFbEM7RUFBYSxHQUFBLGVBQ3pCbEcsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDeUUsc0JBQVMsRUFBQSxJQUFBLGVBQ04xRSxzQkFBQSxDQUFBQyxhQUFBLENBQUMwRSxrQkFBSyxFQUFBLElBQUEsRUFBQyxXQUFnQixDQUFDLGVBQ3hCM0Usc0JBQUEsQ0FBQUMsYUFBQSxDQUFDcUksa0JBQUssRUFBQTtNQUNGcEUsS0FBSyxFQUFFOEgsUUFBUSxDQUFDRSxRQUFTO0VBQ3pCaEosSUFBQUEsUUFBUSxFQUFHaUQsQ0FBQyxJQUNSOEYsV0FBVyxDQUFFZSxJQUFJLEtBQU07RUFBRSxNQUFBLEdBQUdBLElBQUk7RUFBRWQsTUFBQUEsUUFBUSxFQUFFL0YsQ0FBQyxDQUFDcEQsTUFBTSxDQUFDbUI7RUFBTSxLQUFDLENBQUMsQ0FDaEU7TUFDRFUsUUFBUSxFQUFBO0tBQ1gsQ0FDTSxDQUFDLGVBRVo1RSxzQkFBQSxDQUFBQyxhQUFBLENBQUN5RSxzQkFBUyxFQUFBLElBQUEsZUFDTjFFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzBFLGtCQUFLLFFBQUMsVUFBZSxDQUFDLGVBQ3ZCM0Usc0JBQUEsQ0FBQUMsYUFBQSxDQUFDNEUsbUJBQU0sRUFBQTtFQUNIWCxJQUFBQSxLQUFLLEVBQUU7UUFBRUEsS0FBSyxFQUFFOEgsUUFBUSxDQUFDSyxRQUFRO1FBQUVqSSxLQUFLLEVBQUU0SCxRQUFRLENBQUNLO09BQVc7RUFDOUR2SCxJQUFBQSxPQUFPLEVBQUUsQ0FDTDtFQUFFWixNQUFBQSxLQUFLLEVBQUUsTUFBTTtFQUFFRSxNQUFBQSxLQUFLLEVBQUU7RUFBTyxLQUFDLEVBQ2hDO0VBQUVGLE1BQUFBLEtBQUssRUFBRSxRQUFRO0VBQUVFLE1BQUFBLEtBQUssRUFBRTtFQUFTLEtBQUMsRUFDcEM7RUFBRUYsTUFBQUEsS0FBSyxFQUFFLEtBQUs7RUFBRUUsTUFBQUEsS0FBSyxFQUFFO0VBQU0sS0FBQyxDQUNoQztFQUNGbEIsSUFBQUEsUUFBUSxFQUFHb0IsUUFBUSxJQUNmMkgsV0FBVyxDQUFFZSxJQUFJLEtBQU07RUFBRSxNQUFBLEdBQUdBLElBQUk7UUFBRVgsUUFBUSxFQUFFL0gsUUFBUSxDQUFDSjtFQUFNLEtBQUMsQ0FBQztLQUVwRSxDQUNNLENBQUMsZUFFWmxFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3lFLHNCQUFTLEVBQUEsSUFBQSxlQUNOMUUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDMEUsa0JBQUssUUFBQyxtQkFBd0IsQ0FBQyxlQUNoQzNFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3FJLGtCQUFLLEVBQUE7RUFDRkMsSUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFDYjBFLElBQUFBLEdBQUcsRUFBQyxHQUFHO01BQ1AvSSxLQUFLLEVBQUU4SCxRQUFRLENBQUNHLGdCQUFpQjtFQUNqQ2pKLElBQUFBLFFBQVEsRUFBR2lELENBQUMsSUFDUjhGLFdBQVcsQ0FBRWUsSUFBSSxLQUFNO0VBQ25CLE1BQUEsR0FBR0EsSUFBSTtRQUNQYixnQkFBZ0IsRUFBRXhCLFFBQVEsQ0FBQ3hFLENBQUMsQ0FBQ3BELE1BQU0sQ0FBQ21CLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSTtFQUN0RCxLQUFDLENBQUM7RUFDTCxHQUNKLENBQ00sQ0FBQyxlQUVabEUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDeUUsc0JBQVMsRUFBQSxJQUFBLGVBQ04xRSxzQkFBQSxDQUFBQyxhQUFBLENBQUNpTixxQkFBUSxFQUFBO0VBQ0wvSSxJQUFBQSxFQUFFLEVBQUMsUUFBUTtNQUNYZ0osT0FBTyxFQUFFbkIsUUFBUSxDQUFDSSxNQUFPO0VBQ3pCbEosSUFBQUEsUUFBUSxFQUFFQSxNQUNOK0ksV0FBVyxDQUFFZSxJQUFJLEtBQU07RUFBRSxNQUFBLEdBQUdBLElBQUk7UUFBRVosTUFBTSxFQUFFLENBQUNZLElBQUksQ0FBQ1o7RUFBTyxLQUFDLENBQUM7RUFDNUQsR0FDSixDQUFDLGVBQ0ZwTSxzQkFBQSxDQUFBQyxhQUFBLENBQUMwRSxrQkFBSyxFQUFBO01BQUN5SSxNQUFNLEVBQUEsSUFBQTtFQUFDL0UsSUFBQUEsT0FBTyxFQUFDLFFBQVE7RUFBQ2dGLElBQUFBLFVBQVUsRUFBQztFQUFTLEdBQUEsRUFBQyxtREFFN0MsQ0FDQSxDQUFDLEVBRVgsQ0FBQ3JCLFFBQVEsQ0FBQ0ksTUFBTSxpQkFDYnBNLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3lFLHNCQUFTLHFCQUNOMUUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDMEUsa0JBQUssRUFBQSxJQUFBLEVBQUMsb0JBQ2UsRUFBQ3FILFFBQVEsQ0FBQ0csZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUEsS0FBQSxFQUFRSCxRQUFRLENBQUNHLGdCQUFnQixHQUNsRixDQUFDLGVBQ1JuTSxzQkFBQSxDQUFBQyxhQUFBLENBQUM0RSxtQkFBTSxFQUFBO0VBQ0h5SSxJQUFBQSxPQUFPLEVBQUV0QixRQUFRLENBQUNHLGdCQUFnQixHQUFHLENBQUU7TUFDdkNvQixZQUFZLEVBQUEsSUFBQTtFQUNaekksSUFBQUEsT0FBTyxFQUFFM0IsVUFBVztFQUNwQmUsSUFBQUEsS0FBSyxFQUFFZixVQUFVLENBQUNiLE1BQU0sQ0FBQzJCLENBQUMsSUFBSStILFFBQVEsQ0FBQ00sa0JBQWtCLENBQUNrQixRQUFRLENBQUN2SixDQUFDLENBQUNDLEtBQUssQ0FBQyxDQUFFO01BQzdFaEIsUUFBUSxFQUFHb0IsUUFBUSxJQUFLO1FBQ3BCLElBQUksQ0FBQ0EsUUFBUSxFQUFFO1VBQ1gySCxXQUFXLENBQUNlLElBQUksS0FBSztFQUFFLFVBQUEsR0FBR0EsSUFBSTtFQUFFVixVQUFBQSxrQkFBa0IsRUFBRTtFQUFHLFNBQUMsQ0FBQyxDQUFDO0VBQzFELFFBQUE7RUFDSixNQUFBO0VBQ0EsTUFBQSxNQUFNbUIsU0FBUyxHQUFHQyxLQUFLLENBQUNDLE9BQU8sQ0FBQ3JKLFFBQVEsQ0FBQyxHQUNuQ0EsUUFBUSxDQUFDc0osS0FBSyxDQUFDLENBQUMsRUFBRTVCLFFBQVEsQ0FBQ0csZ0JBQWdCLENBQUMsQ0FBQ25JLEdBQUcsQ0FBQzZKLENBQUMsSUFBSUEsQ0FBQyxDQUFDM0osS0FBSyxDQUFDLEdBQzlELENBQUNJLFFBQVEsQ0FBQ0osS0FBSyxDQUFDO1FBQ3RCK0gsV0FBVyxDQUFDZSxJQUFJLEtBQUs7RUFBRSxRQUFBLEdBQUdBLElBQUk7RUFBRVYsUUFBQUEsa0JBQWtCLEVBQUVtQjtFQUFVLE9BQUMsQ0FBQyxDQUFDO01BQ3JFLENBQUU7RUFDRnhJLElBQUFBLFdBQVcsRUFBRStHLFFBQVEsQ0FBQ0csZ0JBQWdCLEdBQUcsQ0FBQyxHQUNwQyxDQUFBLGFBQUEsRUFBZ0JILFFBQVEsQ0FBQ0csZ0JBQWdCLENBQUEsY0FBQSxDQUFnQixHQUN6RDtFQUF3QixHQUNqQyxDQUFDLEVBQ0RILFFBQVEsQ0FBQ00sa0JBQWtCLENBQUMzSixNQUFNLEdBQUcsQ0FBQyxpQkFDbkMzQyxzQkFBQSxDQUFBQyxhQUFBLENBQUNJLGlCQUFJLEVBQUE7RUFBQzRILElBQUFBLFNBQVMsRUFBQyxJQUFJO0VBQUM3RyxJQUFBQSxLQUFLLEVBQUM7S0FBUSxFQUFDLFlBQ3RCLEVBQUM0SyxRQUFRLENBQUNNLGtCQUFrQixDQUFDM0osTUFBTSxFQUFDLEdBQUMsRUFBQ3FKLFFBQVEsQ0FBQ0csZ0JBQ3ZELENBRUgsQ0FDZCxlQUVEbk0sc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUMrSCxJQUFBQSxTQUFTLEVBQUM7RUFBSSxHQUFBLGVBQ2ZqSSxzQkFBQSxDQUFBQyxhQUFBLENBQUMrSSxtQkFBTSxFQUFBO0VBQUNULElBQUFBLElBQUksRUFBQyxRQUFRO0VBQUNVLElBQUFBLE9BQU8sRUFBQyxTQUFTO0VBQUNULElBQUFBLFFBQVEsRUFBRW5GO0VBQVEsR0FBQSxFQUNyREEsT0FBTyxnQkFBR3JELHNCQUFBLENBQUFDLGFBQUEsQ0FBQzZOLG1CQUFNLEVBQUEsSUFBRSxDQUFDLEdBQUcsYUFDcEIsQ0FBQyxlQUNUOU4sc0JBQUEsQ0FBQUMsYUFBQSxDQUFDK0ksbUJBQU0sRUFBQTtFQUNIVCxJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNiVSxJQUFBQSxPQUFPLEVBQUMsU0FBUztFQUNqQm9FLElBQUFBLFVBQVUsRUFBQyxTQUFTO01BQ3BCekUsT0FBTyxFQUFFQSxNQUFPOUIsTUFBTSxDQUFDQyxRQUFRLENBQUN6RixJQUFJLEdBQUc7RUFBbUMsR0FBQSxFQUM3RSxRQUVPLENBQ1AsQ0FDSCxDQUNMLENBQUM7RUFFZCxDQUFDOztFQ2hSRCxNQUFNeU0sU0FBUyxHQUFJak0sS0FBSyxJQUFLO0lBQ3pCLE1BQU07TUFBRUMsTUFBTTtNQUFFQyxRQUFRO0VBQUVrQixJQUFBQTtFQUFTLEdBQUMsR0FBR3BCLEtBQUs7RUFDNUMsRUFBQSxNQUFNa00sZUFBZSxHQUFHQyxZQUFNLENBQUMsSUFBSSxDQUFDO0VBQ3BDLEVBQUEsTUFBTUMsY0FBYyxHQUFHRCxZQUFNLENBQUMsSUFBSSxDQUFDO0VBQ25DLEVBQUEsTUFBTUUsU0FBUyxHQUFHRixZQUFNLENBQUMsSUFBSSxDQUFDOztFQUU5QjtFQUNBLEVBQUEsTUFBTUcsZUFBZSxHQUFJQyxJQUFJLElBQUt0TSxNQUFNLENBQUNHLE1BQU0sQ0FBQyxDQUFBLEVBQUdGLFFBQVEsQ0FBQ0csSUFBSSxDQUFBLENBQUEsRUFBSWtNLElBQUksRUFBRSxDQUFDO0lBQzNFLE1BQU1DLFVBQVUsR0FBR0MsVUFBVSxDQUFDSCxlQUFlLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDN0UsTUFBTUksVUFBVSxHQUFHRCxVQUFVLENBQUNILGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLElBQUksQ0FBQztFQUU3RSxFQUFBLE1BQU0sQ0FBQzFGLFFBQVEsRUFBRStGLFdBQVcsQ0FBQyxHQUFHcFAsY0FBUSxDQUFDaVAsVUFBVSxJQUFJRSxVQUFVLEdBQUcsQ0FBQ0YsVUFBVSxFQUFFRSxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDcEcsTUFBTSxDQUFDMUMsV0FBVyxFQUFFQyxjQUFjLENBQUMsR0FBRzFNLGNBQVEsQ0FBQyxFQUFFLENBQUM7RUFFbEQsRUFBQSxNQUFNLENBQUNxUCxXQUFXLEVBQUVDLGNBQWMsQ0FBQyxHQUFHdFAsY0FBUSxDQUFDO0VBQzNDdVAsSUFBQUEsWUFBWSxFQUFFUixlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRTtFQUNuRFMsSUFBQUEsWUFBWSxFQUFFVCxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRTtFQUNuRFUsSUFBQUEsWUFBWSxFQUFFVixlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRTtFQUNuRFcsSUFBQUEsT0FBTyxFQUFFWCxlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTtFQUN6Q3JILElBQUFBLFFBQVEsRUFBRTtFQUFFd0IsTUFBQUEsSUFBSSxFQUFFLE9BQU87RUFBRXlHLE1BQUFBLFdBQVcsRUFBRSxDQUFDUixVQUFVLEVBQUVGLFVBQVU7RUFBRTtFQUNyRSxHQUFDLENBQUM7O0VBRUY7RUFDQTtJQUNBLE1BQU12RCxZQUFZLEdBQUlsSCxJQUFJLElBQUs7RUFDM0I7TUFDQSxJQUFJb0wsUUFBUSxHQUFHLElBQUk7TUFDbkIsSUFBSXBMLElBQUksQ0FBQ2tMLE9BQU8sRUFBRTtFQUNkLE1BQUEsTUFBTUcsTUFBTSxHQUFHQyxNQUFNLENBQUN0TCxJQUFJLENBQUNrTCxPQUFPLENBQUMsQ0FBQ0ssT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztFQUN2RCxNQUFBLElBQUlGLE1BQU0sQ0FBQ3ZNLE1BQU0sR0FBRyxDQUFDLEVBQUU7RUFDbkJzTSxRQUFBQSxRQUFRLEdBQUd0RSxRQUFRLENBQUN1RSxNQUFNLEVBQUUsRUFBRSxDQUFDO0VBQ25DLE1BQUE7RUFDSixJQUFBO0VBRUEsSUFBQSxNQUFNRyxPQUFPLEdBQUc7RUFDWlQsTUFBQUEsWUFBWSxFQUFFL0ssSUFBSSxDQUFDK0ssWUFBWSxJQUFJLEVBQUU7RUFDckNDLE1BQUFBLFlBQVksRUFBRWhMLElBQUksQ0FBQ2dMLFlBQVksSUFBSSxFQUFFO0VBQ3JDQyxNQUFBQSxZQUFZLEVBQUVqTCxJQUFJLENBQUNpTCxZQUFZLElBQUksRUFBRTtFQUNyQ0MsTUFBQUEsT0FBTyxFQUFFRSxRQUFRO0VBQ2pCbEksTUFBQUEsUUFBUSxFQUFFO1VBQ04sR0FBR2xELElBQUksQ0FBQ2tELFFBQVE7RUFDaEJ3QixRQUFBQSxJQUFJLEVBQUUsT0FBTztFQUNieUcsUUFBQUEsV0FBVyxFQUFFLENBQ1RULFVBQVUsQ0FBQzFLLElBQUksQ0FBQ2tELFFBQVEsRUFBRWlJLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFDaERULFVBQVUsQ0FBQzFLLElBQUksQ0FBQ2tELFFBQVEsRUFBRWlJLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7RUFFeEQ7T0FDSDtFQUVEalAsSUFBQUEsT0FBTyxDQUFDZ0UsR0FBRyxDQUFDLHFDQUFxQyxFQUFFc0wsT0FBTyxDQUFDO0VBQzNEbk0sSUFBQUEsUUFBUSxDQUFDbEIsUUFBUSxDQUFDRyxJQUFJLEVBQUVrTixPQUFPLENBQUM7SUFDcEMsQ0FBQzs7RUFFRDtJQUNBLE1BQU1DLDBCQUEwQixHQUFHQSxDQUFDekwsSUFBSSxFQUFFNUIsR0FBRyxFQUFFc04sR0FBRyxLQUFLO0VBQ25ELElBQUEsTUFBTUMsT0FBTyxHQUFHM0wsSUFBSSxDQUFDMkwsT0FBTyxJQUFJLEVBQUU7O0VBRWxDO0VBQ0E7RUFDQSxJQUFBLE1BQU1DLEtBQUssR0FBR0QsT0FBTyxDQUFDRSxPQUFPLElBQUlGLE9BQU8sQ0FBQ0csUUFBUSxJQUFJSCxPQUFPLENBQUNJLElBQUksSUFBSUosT0FBTyxDQUFDSyxPQUFPLElBQUlMLE9BQU8sQ0FBQ00sTUFBTSxJQUFJTixPQUFPLENBQUNPLElBQUksSUFBSVAsT0FBTyxDQUFDUSxJQUFJLElBQUluTSxJQUFJLENBQUNvTSxZQUFZLENBQUNsRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztFQUV6SztFQUNBLElBQUEsTUFBTW1HLEtBQUssR0FBRyxDQUFDVixPQUFPLENBQUNRLElBQUksSUFBSVIsT0FBTyxDQUFDTyxJQUFJLEVBQUVQLE9BQU8sQ0FBQ1csY0FBYyxFQUFFWCxPQUFPLENBQUNZLEtBQUssQ0FBQyxDQUFDOU4sTUFBTSxDQUFDK04sQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQ3hOLElBQUksQ0FBQyxJQUFJLENBQUM7RUFFN0csSUFBQSxNQUFNeU4sUUFBUSxHQUFHZCxPQUFPLENBQUNjLFFBQVEsSUFBSSxFQUFFO01BRXZDM0IsY0FBYyxDQUFDM0IsSUFBSSxLQUFLO0VBQ3BCLE1BQUEsR0FBR0EsSUFBSTtRQUNQNEIsWUFBWSxFQUFFYSxLQUFLLElBQUksRUFBRTtRQUN6QlosWUFBWSxFQUFFcUIsS0FBSyxJQUFJLEVBQUU7RUFDekJwQixNQUFBQSxZQUFZLEVBQUU5QixJQUFJLENBQUM4QixZQUFZLElBQUksRUFBRTtFQUNyQ0MsTUFBQUEsT0FBTyxFQUFFdUIsUUFBUTtFQUNqQnZKLE1BQUFBLFFBQVEsRUFBRTtFQUNOd0IsUUFBQUEsSUFBSSxFQUFFLE9BQU87RUFDYnlHLFFBQUFBLFdBQVcsRUFBRSxDQUFDTyxHQUFHLEVBQUV0TixHQUFHO0VBQzFCO0VBQ0osS0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztFQUVEO0VBQ0EsRUFBQSxNQUFNc08sY0FBYyxHQUFHLE9BQU90TyxHQUFHLEVBQUVzTixHQUFHLEtBQUs7TUFDdkMsSUFBSTtRQUNBLE1BQU0vTCxRQUFRLEdBQUcsTUFBTTZDLEtBQUssQ0FBQywrREFBK0RwRSxHQUFHLENBQUEsS0FBQSxFQUFRc04sR0FBRyxDQUFBLG9DQUFBLENBQXNDLEVBQUU7RUFDOUloSixRQUFBQSxPQUFPLEVBQUU7RUFBRSxVQUFBLFlBQVksRUFBRTtFQUFzQjtFQUNuRCxPQUFDLENBQUM7RUFDRixNQUFBLE1BQU0xQyxJQUFJLEdBQUcsTUFBTUwsUUFBUSxDQUFDb0QsSUFBSSxFQUFFO0VBQ2xDLE1BQUEsSUFBSS9DLElBQUksSUFBSUEsSUFBSSxDQUFDMkwsT0FBTyxFQUFFO0VBQ3RCRixRQUFBQSwwQkFBMEIsQ0FBQ3pMLElBQUksRUFBRTVCLEdBQUcsRUFBRXNOLEdBQUcsQ0FBQztFQUM5QyxNQUFBO01BQ0osQ0FBQyxDQUFDLE9BQU9wSixDQUFDLEVBQUU7RUFDUnBHLE1BQUFBLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDLDBCQUEwQixFQUFFcUcsQ0FBQyxDQUFDO0VBQ2hELElBQUE7SUFDSixDQUFDOztFQUVEO0VBQ0F6RyxFQUFBQSxlQUFTLENBQUMsTUFBTTtFQUNaLElBQUEsTUFBTThRLFdBQVcsR0FBRyxZQUFZO0VBQzVCLE1BQUEsSUFBSTFKLE1BQU0sQ0FBQzJKLENBQUMsRUFBRSxPQUFPM0osTUFBTSxDQUFDMkosQ0FBQzs7RUFFN0I7RUFDQSxNQUFBLElBQUksQ0FBQ0MsUUFBUSxDQUFDQyxjQUFjLENBQUMsYUFBYSxDQUFDLEVBQUU7RUFDekMsUUFBQSxNQUFNQyxJQUFJLEdBQUdGLFFBQVEsQ0FBQ3pRLGFBQWEsQ0FBQyxNQUFNLENBQUM7VUFDM0MyUSxJQUFJLENBQUN6TSxFQUFFLEdBQUcsYUFBYTtVQUN2QnlNLElBQUksQ0FBQzVOLEdBQUcsR0FBRyxZQUFZO1VBQ3ZCNE4sSUFBSSxDQUFDdFAsSUFBSSxHQUFHLGtEQUFrRDtFQUM5RG9QLFFBQUFBLFFBQVEsQ0FBQ0csSUFBSSxDQUFDQyxXQUFXLENBQUNGLElBQUksQ0FBQztFQUNuQyxNQUFBOztFQUVBO0VBQ0EsTUFBQSxJQUFJLENBQUNGLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFO0VBQ3hDLFFBQUEsTUFBTUksTUFBTSxHQUFHTCxRQUFRLENBQUN6USxhQUFhLENBQUMsUUFBUSxDQUFDO1VBQy9DOFEsTUFBTSxDQUFDNU0sRUFBRSxHQUFHLFlBQVk7VUFDeEI0TSxNQUFNLENBQUNuSixHQUFHLEdBQUcsaURBQWlEO0VBQzlEOEksUUFBQUEsUUFBUSxDQUFDbEssSUFBSSxDQUFDc0ssV0FBVyxDQUFDQyxNQUFNLENBQUM7RUFDakMsUUFBQSxPQUFPLElBQUlDLE9BQU8sQ0FBRUMsT0FBTyxJQUFLO1lBQUVGLE1BQU0sQ0FBQ0csTUFBTSxHQUFHLE1BQU1ELE9BQU8sQ0FBQ25LLE1BQU0sQ0FBQzJKLENBQUMsQ0FBQztFQUFFLFFBQUEsQ0FBQyxDQUFDO0VBQ2pGLE1BQUEsQ0FBQyxNQUFNO0VBQ0g7RUFDQSxRQUFBLE9BQU8sSUFBSU8sT0FBTyxDQUFFQyxPQUFPLElBQUs7RUFDNUIsVUFBQSxNQUFNRSxLQUFLLEdBQUdDLFdBQVcsQ0FBQyxNQUFNO2NBQzVCLElBQUl0SyxNQUFNLENBQUMySixDQUFDLEVBQUU7Z0JBQUVZLGFBQWEsQ0FBQ0YsS0FBSyxDQUFDO0VBQUVGLGNBQUFBLE9BQU8sQ0FBQ25LLE1BQU0sQ0FBQzJKLENBQUMsQ0FBQztFQUFFLFlBQUE7WUFDN0QsQ0FBQyxFQUFFLEdBQUcsQ0FBQztFQUNYLFFBQUEsQ0FBQyxDQUFDO0VBQ04sTUFBQTtNQUNKLENBQUM7RUFFREQsSUFBQUEsV0FBVyxFQUFFLENBQUNjLElBQUksQ0FBRWIsQ0FBQyxJQUFLO1FBQ3RCLElBQUksQ0FBQ3ZDLGNBQWMsQ0FBQ3FELE9BQU8sSUFBSXZELGVBQWUsQ0FBQ3VELE9BQU8sRUFBRTtVQUNwRCxNQUFNQyxNQUFNLEdBQUc5SSxRQUFRLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7VUFDOUMsTUFBTTFFLEdBQUcsR0FBR3lNLENBQUMsQ0FBQ3pNLEdBQUcsQ0FBQ2dLLGVBQWUsQ0FBQ3VELE9BQU8sQ0FBQyxDQUFDRSxPQUFPLENBQUNELE1BQU0sRUFBRTlJLFFBQVEsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBRTdFK0gsUUFBQUEsQ0FBQyxDQUFDaUIsU0FBUyxDQUFDLG9EQUFvRCxFQUFFO0VBQzlEQyxVQUFBQSxXQUFXLEVBQUU7RUFDakIsU0FBQyxDQUFDLENBQUNDLEtBQUssQ0FBQzVOLEdBQUcsQ0FBQzs7RUFFYjtFQUNBQSxRQUFBQSxHQUFHLENBQUM2TixFQUFFLENBQUMsT0FBTyxFQUFHMUwsQ0FBQyxJQUFLO1lBQ25CLE1BQU07Y0FBRWxFLEdBQUc7RUFBRXNOLFlBQUFBO2FBQUssR0FBR3BKLENBQUMsQ0FBQzJMLE1BQU07RUFDN0IsVUFBQSxNQUFNQyxNQUFNLEdBQUcsQ0FBQzlQLEdBQUcsRUFBRXNOLEdBQUcsQ0FBQztZQUV6QixJQUFJcEIsU0FBUyxDQUFDb0QsT0FBTyxFQUFFO0VBQ25CcEQsWUFBQUEsU0FBUyxDQUFDb0QsT0FBTyxDQUFDUyxTQUFTLENBQUNELE1BQU0sQ0FBQztFQUN2QyxVQUFBLENBQUMsTUFBTTtFQUNINUQsWUFBQUEsU0FBUyxDQUFDb0QsT0FBTyxHQUFHZCxDQUFDLENBQUN3QixNQUFNLENBQUNGLE1BQU0sQ0FBQyxDQUFDSCxLQUFLLENBQUM1TixHQUFHLENBQUM7RUFDbkQsVUFBQTtZQUVBeUssV0FBVyxDQUFDc0QsTUFBTSxDQUFDOztFQUVuQjtFQUNBeEIsVUFBQUEsY0FBYyxDQUFDdE8sR0FBRyxFQUFFc04sR0FBRyxDQUFDOztFQUV4QjtZQUNBWixjQUFjLENBQUMzQixJQUFJLEtBQUs7RUFDcEIsWUFBQSxHQUFHQSxJQUFJO0VBQ1BqRyxZQUFBQSxRQUFRLEVBQUU7RUFDTndCLGNBQUFBLElBQUksRUFBRSxPQUFPO0VBQ2J5RyxjQUFBQSxXQUFXLEVBQUUsQ0FBQ08sR0FBRyxFQUFFdE4sR0FBRztFQUMxQjtFQUNKLFdBQUMsQ0FBQyxDQUFDO0VBQ1AsUUFBQSxDQUFDLENBQUM7VUFFRmlNLGNBQWMsQ0FBQ3FELE9BQU8sR0FBR3ZOLEdBQUc7O0VBRTVCO0VBQ0EsUUFBQSxJQUFJMEUsUUFBUSxFQUFFO0VBQ1Z5RixVQUFBQSxTQUFTLENBQUNvRCxPQUFPLEdBQUdkLENBQUMsQ0FBQ3dCLE1BQU0sQ0FBQ3ZKLFFBQVEsQ0FBQyxDQUFDa0osS0FBSyxDQUFDNU4sR0FBRyxDQUFDO0VBQ3JELFFBQUE7RUFDSixNQUFBO0VBQ0osSUFBQSxDQUFDLENBQUM7O0VBRUY7RUFDQSxJQUFBLE9BQU8sTUFBTTtRQUNULElBQUlrSyxjQUFjLENBQUNxRCxPQUFPLEVBQUU7TUFJaEMsQ0FBQztFQUNMLEVBQUEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDOztFQUVQO0VBQ0E7RUFDQTdSLEVBQUFBLGVBQVMsQ0FBQyxNQUFNO01BQ1pxTCxZQUFZLENBQUMyRCxXQUFXLENBQUM7RUFDN0IsRUFBQSxDQUFDLEVBQUUsQ0FBQ0EsV0FBVyxDQUFDLENBQUM7O0VBR2pCO0VBQ0EsRUFBQSxNQUFNd0QsWUFBWSxHQUFHLFlBQVk7RUFDN0IsSUFBQSxJQUFJLENBQUNwRyxXQUFXLElBQUksQ0FBQ2hGLE1BQU0sQ0FBQzJKLENBQUMsSUFBSSxDQUFDdkMsY0FBYyxDQUFDcUQsT0FBTyxFQUFFO01BQzFELElBQUk7UUFDQSxNQUFNL04sUUFBUSxHQUFHLE1BQU02QyxLQUFLLENBQUMsQ0FBQSx5REFBQSxFQUE0RHlGLFdBQVcsOENBQThDLEVBQUU7RUFDaEp2RixRQUFBQSxPQUFPLEVBQUU7RUFBRSxVQUFBLFlBQVksRUFBRTtFQUFzQjtFQUNuRCxPQUFDLENBQUM7RUFDRixNQUFBLE1BQU0xQyxJQUFJLEdBQUcsTUFBTUwsUUFBUSxDQUFDb0QsSUFBSSxFQUFFO0VBQ2xDLE1BQUEsSUFBSS9DLElBQUksSUFBSUEsSUFBSSxDQUFDbEIsTUFBTSxHQUFHLENBQUMsRUFBRTtVQUN6QixNQUFNO1lBQUVWLEdBQUc7RUFBRWtRLFVBQUFBO0VBQUksU0FBQyxHQUFHdE8sSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM1QixRQUFBLE1BQU1rTyxNQUFNLEdBQUcsQ0FBQ3hELFVBQVUsQ0FBQ3RNLEdBQUcsQ0FBQyxFQUFFc00sVUFBVSxDQUFDNEQsR0FBRyxDQUFDLENBQUM7RUFFakQsUUFBQSxNQUFNMUIsQ0FBQyxHQUFHM0osTUFBTSxDQUFDMkosQ0FBQztFQUNsQixRQUFBLE1BQU16TSxHQUFHLEdBQUdrSyxjQUFjLENBQUNxRCxPQUFPO0VBQ2xDdk4sUUFBQUEsR0FBRyxDQUFDeU4sT0FBTyxDQUFDTSxNQUFNLEVBQUUsRUFBRSxDQUFDO1VBRXZCLElBQUk1RCxTQUFTLENBQUNvRCxPQUFPLEVBQUU7RUFDbkJwRCxVQUFBQSxTQUFTLENBQUNvRCxPQUFPLENBQUNTLFNBQVMsQ0FBQ0QsTUFBTSxDQUFDO0VBQ3ZDLFFBQUEsQ0FBQyxNQUFNO0VBQ0g1RCxVQUFBQSxTQUFTLENBQUNvRCxPQUFPLEdBQUdkLENBQUMsQ0FBQ3dCLE1BQU0sQ0FBQ0YsTUFBTSxDQUFDLENBQUNILEtBQUssQ0FBQzVOLEdBQUcsQ0FBQztFQUNuRCxRQUFBO1VBRUF5SyxXQUFXLENBQUNzRCxNQUFNLENBQUM7RUFDbkI7RUFDQXpDLFFBQUFBLDBCQUEwQixDQUFDekwsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFMEssVUFBVSxDQUFDdE0sR0FBRyxDQUFDLEVBQUVzTSxVQUFVLENBQUM0RCxHQUFHLENBQUMsQ0FBQztFQUN6RSxNQUFBO01BQ0osQ0FBQyxDQUFDLE9BQU9oTSxDQUFDLEVBQUU7RUFDUnBHLE1BQUFBLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDLGVBQWUsRUFBRXFHLENBQUMsQ0FBQztFQUNyQyxJQUFBO0lBQ0osQ0FBQzs7RUFFRDtFQUNBLEVBQUEsSUFBSXBFLE1BQU0sRUFBRXFRLE1BQU0sSUFBSTNJLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDM0gsTUFBTSxDQUFDcVEsTUFBTSxDQUFDLENBQUN6UCxNQUFNLEdBQUcsQ0FBQyxFQUFFO0VBQ3pENUMsSUFBQUEsT0FBTyxDQUFDZ0UsR0FBRyxDQUFDLCtCQUErQixFQUFFMEMsSUFBSSxDQUFDQyxTQUFTLENBQUMzRSxNQUFNLENBQUNxUSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3hGLEVBQUE7RUFFQSxFQUFBLG9CQUNJcFMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNDLElBQUFBLEVBQUUsRUFBQztFQUFJLEdBQUEsZUFDUkgsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDMEUsa0JBQUssRUFBQSxJQUFBLEVBQUMsaUJBQXNCLENBQUMsZUFDOUIzRSxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7TUFBQ1MsSUFBSSxFQUFBLElBQUE7RUFBQzJHLElBQUFBLGFBQWEsRUFBQyxLQUFLO0VBQUNuSCxJQUFBQSxFQUFFLEVBQUM7RUFBUyxHQUFBLGVBQ3RDSCxzQkFBQSxDQUFBQyxhQUFBLENBQUNxSSxrQkFBSyxFQUFBO0VBQ0ZwRSxJQUFBQSxLQUFLLEVBQUU0SCxXQUFZO01BQ25CNUksUUFBUSxFQUFHaUQsQ0FBQyxJQUFLNEYsY0FBYyxDQUFDNUYsQ0FBQyxDQUFDcEQsTUFBTSxDQUFDbUIsS0FBSyxDQUFFO0VBQ2hEZSxJQUFBQSxXQUFXLEVBQUMsdUNBQXVDO0VBQ25EekQsSUFBQUEsS0FBSyxFQUFFO0VBQUU2SixNQUFBQSxRQUFRLEVBQUUsQ0FBQztFQUFFbkMsTUFBQUEsV0FBVyxFQUFFO0VBQU87RUFBRSxHQUMvQyxDQUFDLGVBQ0ZsSixzQkFBQSxDQUFBQyxhQUFBLENBQUMrSSxtQkFBTSxFQUFBO0VBQUNKLElBQUFBLE9BQU8sRUFBRXNKLFlBQWE7RUFBQzNKLElBQUFBLElBQUksRUFBQztLQUFRLEVBQUMsUUFBYyxDQUMxRCxDQUFDLGVBRU52SSxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ2tMLElBQUFBLE1BQU0sRUFBQyxPQUFPO0VBQUNqTCxJQUFBQSxFQUFFLEVBQUMsU0FBUztFQUFDb0IsSUFBQUEsTUFBTSxFQUFDO0tBQVMsZUFDN0N2QixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtvUyxJQUFBQSxHQUFHLEVBQUVyRSxlQUFnQjtFQUFDeE0sSUFBQUEsS0FBSyxFQUFFO0VBQUU0SixNQUFBQSxNQUFNLEVBQUUsTUFBTTtFQUFFakQsTUFBQUEsS0FBSyxFQUFFO0VBQU87S0FBSSxDQUNyRSxDQUFDLGVBRU5uSSxzQkFBQSxDQUFBQyxhQUFBLENBQUN5RSxzQkFBUyxFQUFBLElBQUEsZUFDTjFFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzBFLGtCQUFLLFFBQUMsd0JBQTZCLENBQUMsZUFDckMzRSxzQkFBQSxDQUFBQyxhQUFBLENBQUNxSSxrQkFBSyxFQUFBO01BQ0ZwRSxLQUFLLEVBQUV3SyxXQUFXLENBQUNFLFlBQWE7RUFDaEMxTCxJQUFBQSxRQUFRLEVBQUdpRCxDQUFDLElBQUt3SSxjQUFjLENBQUMzQixJQUFJLEtBQUs7RUFBRSxNQUFBLEdBQUdBLElBQUk7RUFBRTRCLE1BQUFBLFlBQVksRUFBRXpJLENBQUMsQ0FBQ3BELE1BQU0sQ0FBQ21CO0VBQU0sS0FBQyxDQUFDO0tBQ3RGLENBQ00sQ0FBQyxlQUVabEUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDeUUsc0JBQVMsRUFBQSxJQUFBLGVBQ04xRSxzQkFBQSxDQUFBQyxhQUFBLENBQUMwRSxrQkFBSyxRQUFDLHdCQUE2QixDQUFDLGVBQ3JDM0Usc0JBQUEsQ0FBQUMsYUFBQSxDQUFDcUksa0JBQUssRUFBQTtNQUNGcEUsS0FBSyxFQUFFd0ssV0FBVyxDQUFDRyxZQUFhO0VBQ2hDM0wsSUFBQUEsUUFBUSxFQUFHaUQsQ0FBQyxJQUFLd0ksY0FBYyxDQUFDM0IsSUFBSSxLQUFLO0VBQUUsTUFBQSxHQUFHQSxJQUFJO0VBQUU2QixNQUFBQSxZQUFZLEVBQUUxSSxDQUFDLENBQUNwRCxNQUFNLENBQUNtQjtFQUFNLEtBQUMsQ0FBQztLQUN0RixDQUNNLENBQUMsZUFFWmxFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3lFLHNCQUFTLEVBQUEsSUFBQSxlQUNOMUUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDMEUsa0JBQUssUUFBQyx3QkFBNkIsQ0FBQyxlQUNyQzNFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3FJLGtCQUFLLEVBQUE7TUFDRnBFLEtBQUssRUFBRXdLLFdBQVcsQ0FBQ0ksWUFBYTtFQUNoQzVMLElBQUFBLFFBQVEsRUFBR2lELENBQUMsSUFBS3dJLGNBQWMsQ0FBQzNCLElBQUksS0FBSztFQUFFLE1BQUEsR0FBR0EsSUFBSTtFQUFFOEIsTUFBQUEsWUFBWSxFQUFFM0ksQ0FBQyxDQUFDcEQsTUFBTSxDQUFDbUI7RUFBTSxLQUFDLENBQUM7S0FDdEYsQ0FDTSxDQUFDLGVBRVpsRSxzQkFBQSxDQUFBQyxhQUFBLENBQUN5RSxzQkFBUyxFQUFBLElBQUEsZUFDTjFFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzBFLGtCQUFLLFFBQUMsVUFBZSxDQUFDLGVBQ3ZCM0Usc0JBQUEsQ0FBQUMsYUFBQSxDQUFDcUksa0JBQUssRUFBQTtNQUNGcEUsS0FBSyxFQUFFd0ssV0FBVyxDQUFDSyxPQUFRO0VBQzNCN0wsSUFBQUEsUUFBUSxFQUFHaUQsQ0FBQyxJQUFLd0ksY0FBYyxDQUFDM0IsSUFBSSxLQUFLO0VBQUUsTUFBQSxHQUFHQSxJQUFJO0VBQUUrQixNQUFBQSxPQUFPLEVBQUU1SSxDQUFDLENBQUNwRCxNQUFNLENBQUNtQjtFQUFNLEtBQUMsQ0FBQztLQUNqRixDQUNNLENBQUMsZUFFWmxFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQSxJQUFBLGVBQ0FGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzBFLGtCQUFLLEVBQUEsSUFBQSxFQUFDLGFBQWtCLENBQUMsZUFDMUIzRSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUt1QixJQUFBQSxLQUFLLEVBQUU7RUFBRU4sTUFBQUEsUUFBUSxFQUFFLE9BQU87RUFBRUUsTUFBQUEsS0FBSyxFQUFFO0VBQU87S0FBRSxFQUFDLE9BQ3pDLEVBQUNzTixXQUFXLENBQUMzSCxRQUFRLEVBQUVpSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLFNBQzdDLEVBQUNOLFdBQVcsQ0FBQzNILFFBQVEsRUFBRWlJLFdBQVcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUMvQyxDQUNKLENBQ0osQ0FBQztFQUVkLENBQUM7O0VDdlJELE1BQU1zRCxPQUFPLEdBQUl4USxLQUFLLElBQUs7SUFDdkIsTUFBTTtNQUFFQyxNQUFNO0VBQUVDLElBQUFBO0VBQVMsR0FBQyxHQUFHRixLQUFLO0VBQ2xDLEVBQUEsTUFBTWtNLGVBQWUsR0FBR0MsWUFBTSxDQUFDLElBQUksQ0FBQztFQUNwQyxFQUFBLE1BQU1DLGNBQWMsR0FBR0QsWUFBTSxDQUFDLElBQUksQ0FBQztFQUNuQyxFQUFBLE1BQU1FLFNBQVMsR0FBR0YsWUFBTSxDQUFDLElBQUksQ0FBQzs7RUFFOUI7RUFDQTtFQUNBLEVBQUEsTUFBTUcsZUFBZSxHQUFJQyxJQUFJLElBQUt0TSxNQUFNLENBQUNHLE1BQU0sQ0FBQyxDQUFBLEVBQUdGLFFBQVEsQ0FBQ0csSUFBSSxDQUFBLENBQUEsRUFBSWtNLElBQUksRUFBRSxDQUFDOztFQUUzRTtJQUNBLE1BQU1HLFVBQVUsR0FBR0QsVUFBVSxDQUFDSCxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDL0QsTUFBTUUsVUFBVSxHQUFHQyxVQUFVLENBQUNILGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztFQUUvRCxFQUFBLE1BQU1tRSxXQUFXLEdBQUcsQ0FBQ3pJLEtBQUssQ0FBQ3dFLFVBQVUsQ0FBQyxJQUFJLENBQUN4RSxLQUFLLENBQUMwRSxVQUFVLENBQUM7SUFDNUQsTUFBTTlGLFFBQVEsR0FBRzZKLFdBQVcsR0FBRyxDQUFDakUsVUFBVSxFQUFFRSxVQUFVLENBQUMsR0FBRyxJQUFJOztFQUU5RDtFQUNBOU8sRUFBQUEsZUFBUyxDQUFDLE1BQU07RUFDWixJQUFBLE1BQU04USxXQUFXLEdBQUcsWUFBWTtFQUM1QixNQUFBLElBQUkxSixNQUFNLENBQUMySixDQUFDLEVBQUUsT0FBTzNKLE1BQU0sQ0FBQzJKLENBQUM7O0VBRTdCO0VBQ0EsTUFBQSxJQUFJLENBQUNDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLGFBQWEsQ0FBQyxFQUFFO0VBQ3pDLFFBQUEsTUFBTUMsSUFBSSxHQUFHRixRQUFRLENBQUN6USxhQUFhLENBQUMsTUFBTSxDQUFDO1VBQzNDMlEsSUFBSSxDQUFDek0sRUFBRSxHQUFHLGFBQWE7VUFDdkJ5TSxJQUFJLENBQUM1TixHQUFHLEdBQUcsWUFBWTtVQUN2QjROLElBQUksQ0FBQ3RQLElBQUksR0FBRyxrREFBa0Q7RUFDOURvUCxRQUFBQSxRQUFRLENBQUNHLElBQUksQ0FBQ0MsV0FBVyxDQUFDRixJQUFJLENBQUM7RUFDbkMsTUFBQTs7RUFFQTtFQUNBLE1BQUEsSUFBSSxDQUFDRixRQUFRLENBQUNDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRTtFQUN4QyxRQUFBLE1BQU1JLE1BQU0sR0FBR0wsUUFBUSxDQUFDelEsYUFBYSxDQUFDLFFBQVEsQ0FBQztVQUMvQzhRLE1BQU0sQ0FBQzVNLEVBQUUsR0FBRyxZQUFZO1VBQ3hCNE0sTUFBTSxDQUFDbkosR0FBRyxHQUFHLGlEQUFpRDtFQUM5RDhJLFFBQUFBLFFBQVEsQ0FBQ2xLLElBQUksQ0FBQ3NLLFdBQVcsQ0FBQ0MsTUFBTSxDQUFDO0VBQ2pDLFFBQUEsT0FBTyxJQUFJQyxPQUFPLENBQUVDLE9BQU8sSUFBSztZQUFFRixNQUFNLENBQUNHLE1BQU0sR0FBRyxNQUFNRCxPQUFPLENBQUNuSyxNQUFNLENBQUMySixDQUFDLENBQUM7RUFBRSxRQUFBLENBQUMsQ0FBQztFQUNqRixNQUFBLENBQUMsTUFBTTtFQUNIO0VBQ0EsUUFBQSxPQUFPLElBQUlPLE9BQU8sQ0FBRUMsT0FBTyxJQUFLO0VBQzVCLFVBQUEsTUFBTUUsS0FBSyxHQUFHQyxXQUFXLENBQUMsTUFBTTtjQUM1QixJQUFJdEssTUFBTSxDQUFDMkosQ0FBQyxFQUFFO2dCQUFFWSxhQUFhLENBQUNGLEtBQUssQ0FBQztFQUFFRixjQUFBQSxPQUFPLENBQUNuSyxNQUFNLENBQUMySixDQUFDLENBQUM7RUFBRSxZQUFBO1lBQzdELENBQUMsRUFBRSxHQUFHLENBQUM7RUFDWCxRQUFBLENBQUMsQ0FBQztFQUNOLE1BQUE7TUFDSixDQUFDO0VBRUQsSUFBQSxJQUFJOEIsV0FBVyxFQUFFO0VBQ2IvQixNQUFBQSxXQUFXLEVBQUUsQ0FBQ2MsSUFBSSxDQUFFYixDQUFDLElBQUs7VUFDdEIsSUFBSSxDQUFDdkMsY0FBYyxDQUFDcUQsT0FBTyxJQUFJdkQsZUFBZSxDQUFDdUQsT0FBTyxFQUFFO1lBQ3BELE1BQU1DLE1BQU0sR0FBRzlJLFFBQVEsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7RUFDN0MsVUFBQSxNQUFNMUUsR0FBRyxHQUFHeU0sQ0FBQyxDQUFDek0sR0FBRyxDQUFDZ0ssZUFBZSxDQUFDdUQsT0FBTyxDQUFDLENBQUNFLE9BQU8sQ0FBQ0QsTUFBTSxFQUFFLEVBQUUsQ0FBQztFQUU5RGYsVUFBQUEsQ0FBQyxDQUFDaUIsU0FBUyxDQUFDLG9EQUFvRCxFQUFFO0VBQzlEQyxZQUFBQSxXQUFXLEVBQUU7RUFDakIsV0FBQyxDQUFDLENBQUNDLEtBQUssQ0FBQzVOLEdBQUcsQ0FBQzs7RUFFYjtFQUNBLFVBQUEsSUFBSTBFLFFBQVEsRUFBRTtFQUNWeUYsWUFBQUEsU0FBUyxDQUFDb0QsT0FBTyxHQUFHZCxDQUFDLENBQUN3QixNQUFNLENBQUN2SixRQUFRLENBQUMsQ0FBQ2tKLEtBQUssQ0FBQzVOLEdBQUcsQ0FBQztFQUNyRCxVQUFBOztFQUVBO0VBQ0FBLFVBQUFBLEdBQUcsQ0FBQ3dPLFFBQVEsQ0FBQ0MsT0FBTyxFQUFFO0VBQ3RCek8sVUFBQUEsR0FBRyxDQUFDME8sU0FBUyxDQUFDRCxPQUFPLEVBQUU7RUFDdkJ6TyxVQUFBQSxHQUFHLENBQUMyTyxlQUFlLENBQUNGLE9BQU8sRUFBRTtFQUM3QnpPLFVBQUFBLEdBQUcsQ0FBQzRPLGVBQWUsQ0FBQ0gsT0FBTyxFQUFFO0VBQzdCek8sVUFBQUEsR0FBRyxDQUFDNk8sT0FBTyxDQUFDSixPQUFPLEVBQUU7RUFDckJ6TyxVQUFBQSxHQUFHLENBQUM4TyxRQUFRLENBQUNMLE9BQU8sRUFBRTtZQUN0QixJQUFJek8sR0FBRyxDQUFDK08sR0FBRyxFQUFFL08sR0FBRyxDQUFDK08sR0FBRyxDQUFDTixPQUFPLEVBQUU7WUFFOUJ2RSxjQUFjLENBQUNxRCxPQUFPLEdBQUd2TixHQUFHO0VBQ2hDLFFBQUE7RUFDSixNQUFBLENBQUMsQ0FBQztFQUNOLElBQUE7O0VBRUE7RUFDQSxJQUFBLE9BQU8sTUFBTTtFQUNUO0VBQ0E7RUFDQTtNQUFBLENBQ0g7RUFDTCxFQUFBLENBQUMsRUFBRSxDQUFDdU8sV0FBVyxDQUFDLENBQUM7SUFFakIsSUFBSSxDQUFDQSxXQUFXLEVBQUU7RUFDZCxJQUFBLG9CQUNJdlMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNDLE1BQUFBLEVBQUUsRUFBQztFQUFJLEtBQUEsZUFDUkgsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDMEUsa0JBQUssRUFBQSxJQUFBLEVBQUUzQyxRQUFRLENBQUNvQyxLQUFhLENBQUMsZUFDL0JwRSxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUEsSUFBQSxFQUFDLDRCQUErQixDQUNuQyxDQUFDO0VBRWQsRUFBQTtFQUVBLEVBQUEsb0JBQ0lGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUFDQyxJQUFBQSxFQUFFLEVBQUM7RUFBSSxHQUFBLGVBQ1JILHNCQUFBLENBQUFDLGFBQUEsQ0FBQzBFLGtCQUFLLEVBQUEsSUFBQSxFQUFFM0MsUUFBUSxDQUFDb0MsS0FBYSxDQUFDLGVBQy9CcEUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNrTCxJQUFBQSxNQUFNLEVBQUMsT0FBTztFQUFDakwsSUFBQUEsRUFBRSxFQUFDLFNBQVM7RUFBQ29CLElBQUFBLE1BQU0sRUFBQztLQUFTLGVBQzdDdkIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLb1MsSUFBQUEsR0FBRyxFQUFFckUsZUFBZ0I7RUFBQ3hNLElBQUFBLEtBQUssRUFBRTtFQUFFNEosTUFBQUEsTUFBTSxFQUFFLE1BQU07RUFBRWpELE1BQUFBLEtBQUssRUFBRTtFQUFPO0tBQUksQ0FDckUsQ0FBQyxlQUNObkksc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBLElBQUEsZUFDQUYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLdUIsSUFBQUEsS0FBSyxFQUFFO0VBQUVOLE1BQUFBLFFBQVEsRUFBRSxPQUFPO0VBQUVFLE1BQUFBLEtBQUssRUFBRTtFQUFPO0tBQUUsRUFBQyxPQUN6QyxFQUFDa04sVUFBVSxFQUFDLFNBQU8sRUFBQ0UsVUFDeEIsQ0FDSixDQUNKLENBQUM7RUFFZCxDQUFDOztFQzlHRHdFLE9BQU8sQ0FBQ0MsY0FBYyxHQUFHLEVBQUU7RUFFM0JELE9BQU8sQ0FBQ0MsY0FBYyxDQUFDalUsU0FBUyxHQUFHQSxTQUFTO0VBRTVDZ1UsT0FBTyxDQUFDQyxjQUFjLENBQUNwUixhQUFhLEdBQUdBLGFBQWE7RUFFcERtUixPQUFPLENBQUNDLGNBQWMsQ0FBQ2hRLHVCQUF1QixHQUFHQSx1QkFBdUI7RUFFeEUrUCxPQUFPLENBQUNDLGNBQWMsQ0FBQzdOLG9CQUFvQixHQUFHQSxvQkFBb0I7RUFFbEU0TixPQUFPLENBQUNDLGNBQWMsQ0FBQ3pOLG1DQUFtQyxHQUFHQSxtQ0FBbUM7RUFFaEd3TixPQUFPLENBQUNDLGNBQWMsQ0FBQ3hOLGNBQWMsR0FBR0EsY0FBYztFQUV0RHVOLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDOUosY0FBYyxHQUFHQSxjQUFjO0VBRXRENkosT0FBTyxDQUFDQyxjQUFjLENBQUMxSixrQkFBa0IsR0FBR0Esa0JBQWtCO0VBRTlEeUosT0FBTyxDQUFDQyxjQUFjLENBQUM3SSxrQkFBa0IsR0FBR0Esa0JBQWtCO0VBRTlENEksT0FBTyxDQUFDQyxjQUFjLENBQUN4SSxzQkFBc0IsR0FBR0Esc0JBQXNCO0VBRXRFdUksT0FBTyxDQUFDQyxjQUFjLENBQUN2SCx3QkFBd0IsR0FBR0Esd0JBQXdCO0VBRTFFc0gsT0FBTyxDQUFDQyxjQUFjLENBQUNsRixTQUFTLEdBQUdBLFNBQVM7RUFFNUNpRixPQUFPLENBQUNDLGNBQWMsQ0FBQ1gsT0FBTyxHQUFHQSxPQUFPOzs7Ozs7In0=
