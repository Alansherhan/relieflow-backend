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
      record
    } = props;
    const lat = record.params["address.location.coordinates.0"];
    const long = record.params["address.location.coordinates.1"];
    console.log(record);
    const mapsLink = `http://google.com/maps/@${lat},${long},15z`;
    return /*#__PURE__*/React__default.default.createElement("a", {
      href: mapsLink,
      target: "_blank",
      rel: "noopener noreferrer"
    }, "View Location");
  };

  const api$2 = new adminjs.ApiClient();
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
        const response = await api$2.resourceAction({
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

  const api$1 = new adminjs.ApiClient();
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
        const response = await api$1.resourceAction({
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

  const api = new adminjs.ApiClient();
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
        const response = await api.resourceAction({
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

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRGFzaGJvYXJkLmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9MaW5rQ29tcG9uZW50LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Wb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvQWlkUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Eb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTG9naW5Db21wb25lbnQuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlQ29tcG9uZW50LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUxpc3RDb21wb25lbnQuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlRWRpdENvbXBvbmVudC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSW1hZ2VMaXN0RWRpdENvbXBvbmVudC5qc3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIElsbHVzdHJhdGlvbiB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyBBcGlDbGllbnQsIHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnO1xyXG5cclxuY29uc3QgRGFzaGJvYXJkID0gKCkgPT4ge1xyXG4gIGNvbnN0IFtjdXJyZW50QWRtaW5dID0gdXNlQ3VycmVudEFkbWluKCk7XHJcbiAgY29uc3QgW3N0YXRzLCBzZXRTdGF0c10gPSB1c2VTdGF0ZSh7XHJcbiAgICBhaWRSZXF1ZXN0czogMCxcclxuICAgIGRvbmF0aW9uczogMCxcclxuICAgIHRhc2tzOiAwLFxyXG4gICAgdXNlcnM6IDAsXHJcbiAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAvLyBGZXRjaCBzdGF0aXN0aWNzIGZyb20geW91ciBBUElcclxuICAgIGNvbnN0IGZldGNoU3RhdHMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xyXG4gICAgICAgIC8vIFlvdSBjYW4gbWFrZSBBUEkgY2FsbHMgaGVyZSB0byBnZXQgcmVhbCBzdGF0c1xyXG4gICAgICAgIC8vIEZvciBub3csIHVzaW5nIHBsYWNlaG9sZGVyIGRhdGFcclxuICAgICAgICBzZXRTdGF0cyh7XHJcbiAgICAgICAgICBhaWRSZXF1ZXN0czogNDUsXHJcbiAgICAgICAgICBkb25hdGlvbnM6IDEyOCxcclxuICAgICAgICAgIHRhc2tzOiAyMyxcclxuICAgICAgICAgIHVzZXJzOiAzNTAsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgc3RhdHM6JywgZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGZldGNoU3RhdHMoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94PlxyXG4gICAgICA8Qm94IG1iPVwieHhsXCI+XHJcbiAgICAgICAgPEgyPldlbGNvbWUgdG8gUmVsaWVmIE1hbmFnZW1lbnQgU3lzdGVtPC9IMj5cclxuICAgICAgICA8VGV4dCBtdD1cImRlZmF1bHRcIj5cclxuICAgICAgICAgIEhlbGxvIHtjdXJyZW50QWRtaW4/LmVtYWlsIHx8ICdBZG1pbid9ISBIZXJlJ3MgeW91ciBkYXNoYm9hcmQgb3ZlcnZpZXcuXHJcbiAgICAgICAgPC9UZXh0PlxyXG4gICAgICA8L0JveD5cclxuXHJcbiAgICAgIHsvKiBTdGF0aXN0aWNzIENhcmRzICovfVxyXG4gICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgZmxleFdyYXA9XCJ3cmFwXCIgZ2FwPVwiZGVmYXVsdFwiPlxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIGZsZXg9XCIxXCJcclxuICAgICAgICAgIG1pbldpZHRoPVwiMjAwcHhcIlxyXG4gICAgICAgICAgYmc9XCJwcmltYXJ5MTAwXCJcclxuICAgICAgICAgIHA9XCJ4bFwiXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcclxuICAgICAgICAgIGJveFNoYWRvdz1cImNhcmRcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxINSBtYj1cImRlZmF1bHRcIj5BaWQgUmVxdWVzdHM8L0g1PlxyXG4gICAgICAgICAgPFRleHQgZm9udFNpemU9XCJ4eGxcIiBmb250V2VpZ2h0PVwiYm9sZFwiPlxyXG4gICAgICAgICAgICB7c3RhdHMuYWlkUmVxdWVzdHN9XHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBtdD1cInNtXCIgY29sb3I9XCJncmV5NjBcIj5cclxuICAgICAgICAgICAgQWN0aXZlIHJlcXVlc3RzXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIGZsZXg9XCIxXCJcclxuICAgICAgICAgIG1pbldpZHRoPVwiMjAwcHhcIlxyXG4gICAgICAgICAgYmc9XCJzdWNjZXNzXCJcclxuICAgICAgICAgIHA9XCJ4bFwiXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcclxuICAgICAgICAgIGJveFNoYWRvdz1cImNhcmRcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxINSBtYj1cImRlZmF1bHRcIiBjb2xvcj1cIndoaXRlXCI+XHJcbiAgICAgICAgICAgIERvbmF0aW9uc1xyXG4gICAgICAgICAgPC9INT5cclxuICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwieHhsXCIgZm9udFdlaWdodD1cImJvbGRcIiBjb2xvcj1cIndoaXRlXCI+XHJcbiAgICAgICAgICAgIHtzdGF0cy5kb25hdGlvbnN9XHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBtdD1cInNtXCIgY29sb3I9XCJ3aGl0ZVwiPlxyXG4gICAgICAgICAgICBUb3RhbCBkb25hdGlvbnMgcmVjZWl2ZWRcclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgPEJveFxyXG4gICAgICAgICAgZmxleD1cIjFcIlxyXG4gICAgICAgICAgbWluV2lkdGg9XCIyMDBweFwiXHJcbiAgICAgICAgICBiZz1cImluZm9cIlxyXG4gICAgICAgICAgcD1cInhsXCJcclxuICAgICAgICAgIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgYm94U2hhZG93PVwiY2FyZFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPEg1IG1iPVwiZGVmYXVsdFwiIGNvbG9yPVwid2hpdGVcIj5cclxuICAgICAgICAgICAgQWN0aXZlIFRhc2tzXHJcbiAgICAgICAgICA8L0g1PlxyXG4gICAgICAgICAgPFRleHQgZm9udFNpemU9XCJ4eGxcIiBmb250V2VpZ2h0PVwiYm9sZFwiIGNvbG9yPVwid2hpdGVcIj5cclxuICAgICAgICAgICAge3N0YXRzLnRhc2tzfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIGNvbG9yPVwid2hpdGVcIj5cclxuICAgICAgICAgICAgUGVuZGluZyB0YXNrc1xyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICBmbGV4PVwiMVwiXHJcbiAgICAgICAgICBtaW5XaWR0aD1cIjIwMHB4XCJcclxuICAgICAgICAgIGJnPVwiYWNjZW50XCJcclxuICAgICAgICAgIHA9XCJ4bFwiXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcclxuICAgICAgICAgIGJveFNoYWRvdz1cImNhcmRcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxINSBtYj1cImRlZmF1bHRcIiBjb2xvcj1cIndoaXRlXCI+XHJcbiAgICAgICAgICAgIFVzZXJzXHJcbiAgICAgICAgICA8L0g1PlxyXG4gICAgICAgICAgPFRleHQgZm9udFNpemU9XCJ4eGxcIiBmb250V2VpZ2h0PVwiYm9sZFwiIGNvbG9yPVwid2hpdGVcIj5cclxuICAgICAgICAgICAge3N0YXRzLnVzZXJzfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIGNvbG9yPVwid2hpdGVcIj5cclxuICAgICAgICAgICAgUmVnaXN0ZXJlZCB1c2Vyc1xyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgICA8L0JveD5cclxuXHJcbiAgICAgIHsvKiBRdWljayBBY3Rpb25zICovfVxyXG4gICAgICA8Qm94IG10PVwieHhsXCI+XHJcbiAgICAgICAgPEg1IG1iPVwiZGVmYXVsdFwiPlF1aWNrIEFjdGlvbnM8L0g1PlxyXG4gICAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBnYXA9XCJkZWZhdWx0XCIgZmxleFdyYXA9XCJ3cmFwXCI+XHJcbiAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgIGFzPVwiYVwiXHJcbiAgICAgICAgICAgIGhyZWY9XCIvZGFzaGJvYXJkL3Jlc291cmNlcy9BaWRSZXF1ZXN0XCJcclxuICAgICAgICAgICAgYmc9XCJ3aGl0ZVwiXHJcbiAgICAgICAgICAgIHA9XCJsZ1wiXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICBib3JkZXI9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgdGV4dERlY29yYXRpb246ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD1cImJvbGRcIiBjb2xvcj1cInByaW1hcnkxMDBcIj5cclxuICAgICAgICAgICAgICDwn5OLIFZpZXcgQWlkIFJlcXVlc3RzXHJcbiAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICBhcz1cImFcIlxyXG4gICAgICAgICAgICBocmVmPVwiL2Rhc2hib2FyZC9yZXNvdXJjZXMvRG9uYXRpb25cIlxyXG4gICAgICAgICAgICBiZz1cIndoaXRlXCJcclxuICAgICAgICAgICAgcD1cImxnXCJcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgIGJvcmRlcj1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICBzdHlsZT17eyB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJyB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8VGV4dCBmb250V2VpZ2h0PVwiYm9sZFwiIGNvbG9yPVwicHJpbWFyeTEwMFwiPlxyXG4gICAgICAgICAgICAgIPCfkrAgTWFuYWdlIERvbmF0aW9uc1xyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgYXM9XCJhXCJcclxuICAgICAgICAgICAgaHJlZj1cIi9kYXNoYm9hcmQvcmVzb3VyY2VzL1Rhc2tTY2hlbWFcIlxyXG4gICAgICAgICAgICBiZz1cIndoaXRlXCJcclxuICAgICAgICAgICAgcD1cImxnXCJcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgIGJvcmRlcj1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICBzdHlsZT17eyB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJyB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8VGV4dCBmb250V2VpZ2h0PVwiYm9sZFwiIGNvbG9yPVwicHJpbWFyeTEwMFwiPlxyXG4gICAgICAgICAgICAgIOKchSBWaWV3IFRhc2tzXHJcbiAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICBhcz1cImFcIlxyXG4gICAgICAgICAgICBocmVmPVwiL2Rhc2hib2FyZC9yZXNvdXJjZXMvUmVsaWVmQ2VudGVyXCJcclxuICAgICAgICAgICAgYmc9XCJ3aGl0ZVwiXHJcbiAgICAgICAgICAgIHA9XCJsZ1wiXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICBib3JkZXI9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgdGV4dERlY29yYXRpb246ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD1cImJvbGRcIiBjb2xvcj1cInByaW1hcnkxMDBcIj5cclxuICAgICAgICAgICAgICDwn4+iIFJlbGllZiBDZW50ZXJzXHJcbiAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgICA8L0JveD5cclxuXHJcbiAgICAgIHsvKiBSZWNlbnQgQWN0aXZpdHkgKi99XHJcbiAgICAgIDxCb3ggbXQ9XCJ4eGxcIj5cclxuICAgICAgICA8SDUgbWI9XCJkZWZhdWx0XCI+U3lzdGVtIFN0YXR1czwvSDU+XHJcbiAgICAgICAgPEJveCBiZz1cIndoaXRlXCIgcD1cImxnXCIgYm9yZGVyUmFkaXVzPVwiZGVmYXVsdFwiIGJvcmRlcj1cImRlZmF1bHRcIj5cclxuICAgICAgICAgIDxUZXh0PuKchSBBbGwgc3lzdGVtcyBvcGVyYXRpb25hbDwvVGV4dD5cclxuICAgICAgICAgIDxUZXh0IG10PVwic21cIiBjb2xvcj1cImdyZXk2MFwiPlxyXG4gICAgICAgICAgICBMYXN0IHVwZGF0ZWQ6IHtuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCl9XHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgIDwvQm94PlxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDsiLCJcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5cclxuY29uc3QgTGlua0NvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyByZWNvcmQgfSA9IHByb3BzXHJcbiAgICBjb25zdCBsYXQgID0gcmVjb3JkLnBhcmFtc1tcImFkZHJlc3MubG9jYXRpb24uY29vcmRpbmF0ZXMuMFwiXVxyXG4gICAgY29uc3QgbG9uZyA9IHJlY29yZC5wYXJhbXNbXCJhZGRyZXNzLmxvY2F0aW9uLmNvb3JkaW5hdGVzLjFcIl1cclxuICBjb25zb2xlLmxvZyhyZWNvcmQpXHJcbiAgY29uc3QgbWFwc0xpbmsgPSBgaHR0cDovL2dvb2dsZS5jb20vbWFwcy9AJHtsYXR9LCR7bG9uZ30sMTV6YFxyXG5cclxuICByZXR1cm4gKFxyXG5cclxuXHJcbiAgICAgIDxhIGhyZWY9e21hcHNMaW5rfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+XHJcbiAgICAgICAgVmlldyBMb2NhdGlvblxyXG4gICAgICA8L2E+XHJcblxyXG4gICAgXHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW5rQ29tcG9uZW50XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCwgU2VsZWN0LCBGb3JtTWVzc2FnZSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xyXG5cclxuY29uc3QgVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3QgPSAoeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9KSA9PiB7XHJcbiAgY29uc3QgW3ZvbHVudGVlcnMsIHNldFZvbHVudGVlcnNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZmV0Y2hWb2x1bnRlZXJzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5yZXNvdXJjZUFjdGlvbih7XHJcbiAgICAgICAgcmVzb3VyY2VJZDogJ3VzZXJQcm9maWxlJyxcclxuICAgICAgICBhY3Rpb25OYW1lOiAnbGlzdCcsXHJcbiAgICAgICAgcGFyYW1zOiB7ICdmaWx0ZXJzLnJvbGUnOiAndm9sdW50ZWVyJywgcGVyUGFnZTogMTAwMCB9LFxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21hcHBpbmcgJywgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKVxyXG4gICAgICAgIHNldFZvbHVudGVlcnMocmVzcG9uc2UuZGF0YS5yZWNvcmRzLm1hcCh2ID0+ICh7XHJcbiAgICAgICAgICB2YWx1ZTogdi5pZCxcclxuICAgICAgICAgIGxhYmVsOiB2LnBhcmFtcy5uYW1lLFxyXG4gICAgICAgIH0pKSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9O1xyXG4gICAgZmV0Y2hWb2x1bnRlZXJzKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSBzZWxlY3RlZCA9PiB7XHJcbiAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBzZWxlY3RlZCA/IHNlbGVjdGVkLnZhbHVlIDogJycpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gdm9sdW50ZWVycy5maW5kKG9wdCA9PiBvcHQudmFsdWUgPT09IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0pIHx8IG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Rm9ybUdyb3VwIG1iPXs1Nn0+XHJcbiAgICAgIDxMYWJlbCByZXF1aXJlZD57J1NlbGVjdCBWb2x1bnRlZXInfTwvTGFiZWw+XHJcbiAgICAgIDxTZWxlY3RcclxuICAgICAgICBvcHRpb25zPXt2b2x1bnRlZXJzfVxyXG4gICAgICAgIHZhbHVlPXtzZWxlY3RlZE9wdGlvbn1cclxuICAgICAgICBpc0xvYWRpbmc9e2xvYWRpbmd9XHJcbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cclxuICAgICAgICBpc0NsZWFyYWJsZVxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IHZvbHVudGVlcuKAplwiXHJcbiAgICAgIC8+XHJcbiAgICAgIHtwcm9wZXJ0eS5kZXNjcmlwdGlvbiAmJiAoXHJcbiAgICAgICAgPEZvcm1NZXNzYWdlPntwcm9wZXJ0eS5kZXNjcmlwdGlvbn08L0Zvcm1NZXNzYWdlPlxyXG4gICAgICApfVxyXG4gICAgPC9Gb3JtR3JvdXA+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZvbHVudGVlckZpbHRlcmVkU2VsZWN0O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwsIFNlbGVjdCwgRm9ybU1lc3NhZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcclxuXHJcbmNvbnN0IFN0YXR1c0ZpbHRlcmVkU2VsZWN0ID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xyXG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBmZXRjaFN0YXR1cyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xyXG4gICAgICAgIHJlc291cmNlSWQ6ICdBaWRSZXF1ZXN0JyxcclxuICAgICAgICBhY3Rpb25OYW1lOiAnbGlzdCcsXHJcbiAgICAgICAgcGFyYW1zOiB7ICdmaWx0ZXJzLnN0YXR1cyc6ICdyZWplY3RlZCcsIHBlclBhZ2U6IDEwMDAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdsb2dvZ2RnZCcsIHJlc3BvbnNlKVxyXG4gICAgICBpZiAocmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLnJlY29yZHMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnbWFwcGluZyAnLCByZXNwb25zZS5kYXRhLnJlY29yZHMpXHJcbiAgICAgICAgc2V0U3RhdHVzKHJlc3BvbnNlLmRhdGEucmVjb3Jkcy5tYXAodiA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY29yZFwiLCB2LnBhcmFtcylcclxuICAgICAgICAgIHJldHVybiAoe1xyXG4gICAgICAgICAgICB2YWx1ZTogdi5pZCxcclxuICAgICAgICAgICAgLy8gbGFiZWw6IGAke3YucGFyYW1zW1wiYWRkcmVzcy5hZGRyZXNzTGluZTFcIl19IC0gJHt2LnBhcmFtc1tcImRvbmF0aW9uVHlwZVwiXX1gXHJcbiAgICAgICAgICAgIGxhYmVsOiB2LnBhcmFtcy5uYW1lXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9O1xyXG4gICAgZmV0Y2hTdGF0dXMoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IHNlbGVjdGVkID0+IHtcclxuICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIHNlbGVjdGVkID8gc2VsZWN0ZWQudmFsdWUgOiAnJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBzdGF0dXMuZmluZChvcHQgPT4gb3B0LnZhbHVlID09PSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdKSB8fCBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEZvcm1Hcm91cCBtYj17NTZ9PlxyXG4gICAgICA8TGFiZWwgcmVxdWlyZWQ+eydTZWxlY3QgQWlkIFJlcXVlc3QnfTwvTGFiZWw+XHJcbiAgICAgIDxTZWxlY3RcclxuICAgICAgICBvcHRpb25zPXtzdGF0dXN9XHJcbiAgICAgICAgdmFsdWU9e3NlbGVjdGVkT3B0aW9ufVxyXG4gICAgICAgIGlzTG9hZGluZz17bG9hZGluZ31cclxuICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgIGlzQ2xlYXJhYmxlXHJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgQWlkIFJlcXVlc3RcIlxyXG4gICAgICAvPlxyXG4gICAgICB7cHJvcGVydHkuZGVzY3JpcHRpb24gJiYgKFxyXG4gICAgICAgIDxGb3JtTWVzc2FnZT57cHJvcGVydHkuZGVzY3JpcHRpb259PC9Gb3JtTWVzc2FnZT5cclxuICAgICAgKX1cclxuICAgIDwvRm9ybUdyb3VwPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdGF0dXNGaWx0ZXJlZFNlbGVjdDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIExhYmVsLCBTZWxlY3QsIEZvcm1NZXNzYWdlIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XHJcblxyXG5jb25zdCBEb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdCA9ICh7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0pID0+IHtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZmV0Y2hTdGF0dXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHtcclxuICAgICAgICByZXNvdXJjZUlkOiAnRG9uYXRpb25SZXF1ZXN0JyxcclxuICAgICAgICBhY3Rpb25OYW1lOiAnbGlzdCcsXHJcbiAgICAgICAgcGFyYW1zOiB7ICdmaWx0ZXJzLnN0YXR1cyc6ICdhY2NlcHRlZCcsIHBlclBhZ2U6IDEwMDAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdsb2dvZ2RnZCcsIHJlc3BvbnNlKVxyXG4gICAgICBpZiAocmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLnJlY29yZHMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnbWFwcGluZyAnLCByZXNwb25zZS5kYXRhLnJlY29yZHMpXHJcbiAgICAgICAgc2V0U3RhdHVzKHJlc3BvbnNlLmRhdGEucmVjb3Jkcy5tYXAodiA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY29yZFwiLCB2LnBhcmFtcylcclxuICAgICAgICAgIHJldHVybiAoe1xyXG4gICAgICAgICAgICB2YWx1ZTogdi5pZCxcclxuICAgICAgICAgICAgbGFiZWw6IHYucGFyYW1zLm5hbWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfVxyXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgIH07XHJcbiAgICBmZXRjaFN0YXR1cygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gc2VsZWN0ZWQgPT4ge1xyXG4gICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgc2VsZWN0ZWQgPyBzZWxlY3RlZC52YWx1ZSA6ICcnKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IHN0YXR1cy5maW5kKG9wdCA9PiBvcHQudmFsdWUgPT09IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0pIHx8IG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Rm9ybUdyb3VwIG1iPXs1Nn0+XHJcbiAgICAgIDxMYWJlbCByZXF1aXJlZD57J1NlbGVjdCBEb25hdGlvbiBSZXF1ZXN0J308L0xhYmVsPlxyXG4gICAgICA8U2VsZWN0XHJcbiAgICAgICAgb3B0aW9ucz17c3RhdHVzfVxyXG4gICAgICAgIHZhbHVlPXtzZWxlY3RlZE9wdGlvbn1cclxuICAgICAgICBpc0xvYWRpbmc9e2xvYWRpbmd9XHJcbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cclxuICAgICAgICBpc0NsZWFyYWJsZVxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IERvbmF0aW9uIFJlcXVlc3RcIlxyXG4gICAgICAvPlxyXG4gICAgICB7cHJvcGVydHkuZGVzY3JpcHRpb24gJiYgKFxyXG4gICAgICAgIDxGb3JtTWVzc2FnZT57cHJvcGVydHkuZGVzY3JpcHRpb259PC9Gb3JtTWVzc2FnZT5cclxuICAgICAgKX1cclxuICAgIDwvRm9ybUdyb3VwPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgSW5wdXQsIExhYmVsLCBUZXh0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XHJcblxyXG5jb25zdCBMb2dpbkNvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gIGNvbnN0IFtlbWFpbCwgc2V0RW1haWxdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtwYXNzd29yZCwgc2V0UGFzc3dvcmRdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2hvd1Bhc3N3b3JkLCBzZXRTaG93UGFzc3dvcmRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHsgdHJhbnNsYXRlTWVzc2FnZSB9ID0gdXNlVHJhbnNsYXRpb24oKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHNldEVycm9yKCcnKTtcclxuICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2Rhc2hib2FyZC9sb2dpbicsIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBlbWFpbCwgcGFzc3dvcmQgfSksXHJcbiAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZGF0YS5yZWRpcmVjdFVybCB8fCAnL2Rhc2hib2FyZCc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0RXJyb3IoZGF0YS5lcnJvciB8fCAnSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZCcpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignTG9naW4gZXJyb3I6JywgZXJyKTtcclxuICAgICAgc2V0RXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxCb3hcclxuICAgICAgZGlzcGxheT1cImZsZXhcIlxyXG4gICAgICBtaW5IZWlnaHQ9XCIxMDB2aFwiXHJcbiAgICAgIHN0eWxlPXt7IGZvbnRGYW1pbHk6ICdJbnRlciwgc3lzdGVtLXVpLCBzYW5zLXNlcmlmJyB9fVxyXG4gICAgPlxyXG4gICAgICB7LyogTGVmdCBTaWRlIC0gQnJhbmRpbmcgKi99XHJcbiAgICAgIDxCb3hcclxuICAgICAgICBmbGV4PVwiMVwiXHJcbiAgICAgICAgZGlzcGxheT17eyBfOiAnbm9uZScsIG1kOiAnZmxleCcgfX1cclxuICAgICAgICBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCJcclxuICAgICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXHJcbiAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXHJcbiAgICAgICAgcD1cInh4bFwiXHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMjU2M2ViIDAlLCAjMWU0MGFmIDEwMCUpJyxcclxuICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICA8Qm94IHRleHRBbGlnbj1cImNlbnRlclwiIHN0eWxlPXt7IG1heFdpZHRoOiAnNTAwcHgnIH19PlxyXG4gICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICBzcmM9XCIvaW1hZ2VzL2xvZ28td2hpdGUucG5nXCJcclxuICAgICAgICAgICAgYWx0PVwiTG9nb1wiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IG1heFdpZHRoOiAnMjUwcHgnLCBtYXJnaW5Cb3R0b206ICcycmVtJyB9fVxyXG4gICAgICAgICAgICBvbkVycm9yPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcycmVtJywgZm9udFdlaWdodDogJ2JvbGQnLCBtYXJnaW5Cb3R0b206ICcxcmVtJyB9fT5cclxuICAgICAgICAgICAgUmVsaWVmIE1hbmFnZW1lbnQgU3lzdGVtXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzEuMTI1cmVtJywgb3BhY2l0eTogMC45IH19PlxyXG4gICAgICAgICAgICBDb29yZGluYXRpbmcgZGlzYXN0ZXIgcmVsaWVmIGVmZm9ydHMgd2l0aCBlZmZpY2llbmN5IGFuZCBjb21wYXNzaW9uXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxyXG4gICAgICAgICAgICBzdHlsZT17eyBnYXA6ICcycmVtJywgbWFyZ2luVG9wOiAnM3JlbScsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJyB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8Qm94IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcycmVtJywgZm9udFdlaWdodDogJ2JvbGQnIH19PjUwMCs8L1RleHQ+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcwLjg3NXJlbScgfX0+QWlkIFJlcXVlc3RzPC9UZXh0PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMnJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJyB9fT4xMjAwKzwvVGV4dD5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzAuODc1cmVtJyB9fT5Eb25hdGlvbnM8L1RleHQ+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICA8Qm94IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcycmVtJywgZm9udFdlaWdodDogJ2JvbGQnIH19PjUwKzwvVGV4dD5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzAuODc1cmVtJyB9fT5SZWxpZWYgQ2VudGVyczwvVGV4dD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICA8L0JveD5cclxuICAgICAgICA8L0JveD5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICB7LyogUmlnaHQgU2lkZSAtIExvZ2luIEZvcm0gKi99XHJcbiAgICAgIDxCb3hcclxuICAgICAgICBmbGV4PVwiMVwiXHJcbiAgICAgICAgZGlzcGxheT1cImZsZXhcIlxyXG4gICAgICAgIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIlxyXG4gICAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcclxuICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcclxuICAgICAgICBwPVwieHhsXCJcclxuICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6ICcjZjlmYWZiJyB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPEJveFxyXG4gICAgICAgICAgYmc9XCJ3aGl0ZVwiXHJcbiAgICAgICAgICBwPVwieHhsXCJcclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzAuNXJlbScsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMXB4IDNweCAwIHJnYmEoMCwgMCwgMCwgMC4xKScsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnNDUwcHgnLFxyXG4gICAgICAgICAgICBtYXhXaWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8Qm94IG1iPVwieGxcIj5cclxuICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxLjVyZW0nLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnIzExMTgyNycgfX0+XHJcbiAgICAgICAgICAgICAgU2lnbiBJblxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMXJlbScsIGNvbG9yOiAnIzZiNzI4MCcsIG1hcmdpblRvcDogJzAuNXJlbScgfX0+XHJcbiAgICAgICAgICAgICAgRW50ZXIgeW91ciBjcmVkZW50aWFscyB0byBhY2Nlc3MgdGhlIGRhc2hib2FyZFxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICB7ZXJyb3IgJiYgKFxyXG4gICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgcD1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgIG1iPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZWYyZjInLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNmZWUyZTInLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMC4zNzVyZW0nLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyNkYzI2MjYnLCBmb250U2l6ZTogJzAuODc1cmVtJyB9fT5cclxuICAgICAgICAgICAgICAgIOKaoO+4jyB7ZXJyb3J9XHJcbiAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgICAgIDxCb3ggbWI9XCJsZ1wiPlxyXG4gICAgICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwiZW1haWxcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgIEVtYWlsIEFkZHJlc3NcclxuICAgICAgICAgICAgICA8L0xhYmVsPlxyXG4gICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgaWQ9XCJlbWFpbFwiXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2VtYWlsfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFbWFpbChlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImFkbWluQGV4YW1wbGUuY29tXCJcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4JyxcclxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAgICA8Qm94IG1iPVwiZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwicGFzc3dvcmRcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgIFBhc3N3b3JkXHJcbiAgICAgICAgICAgICAgPC9MYWJlbD5cclxuICAgICAgICAgICAgICA8Qm94IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH19PlxyXG4gICAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICAgIGlkPVwicGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgICB0eXBlPXtzaG93UGFzc3dvcmQgPyAndGV4dCcgOiAncGFzc3dvcmQnfVxyXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17cGFzc3dvcmR9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGFzc3dvcmQoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgcGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4JyxcclxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogJzQ1cHgnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dQYXNzd29yZCghc2hvd1Bhc3N3b3JkKX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgICAgICByaWdodDogJzEycHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogJzUwJScsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzZiNzI4MCcsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHtzaG93UGFzc3dvcmQgPyAn8J+Rge+4jycgOiAn8J+Rge+4j+KAjfCfl6jvuI8nfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICAgICAgPEJveCBtYj1cInhsXCIgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMXJlbScgfX0+XHJcbiAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXHJcbiAgICAgICAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxNHB4JyxcclxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJzYwMCcsXHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGxvYWRpbmcgPyAnIzljYTNhZicgOiAnIzI1NjNlYicsXHJcbiAgICAgICAgICAgICAgICAgIGN1cnNvcjogbG9hZGluZyA/ICdub3QtYWxsb3dlZCcgOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtsb2FkaW5nID8gKFxyXG4gICAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtYXJnaW5SaWdodDogJzhweCcgfX0+4o+zPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIFNpZ25pbmcgaW4uLi5cclxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgJ1NpZ24gSW4nXHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgIDwvZm9ybT5cclxuXHJcbiAgICAgICAgICA8Qm94IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicsIG1hcmdpblRvcDogJzEuNXJlbScgfX0+XHJcbiAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMC44NzVyZW0nLCBjb2xvcjogJyM2YjcyODAnIH19PlxyXG4gICAgICAgICAgICAgIERvbid0IGhhdmUgYW4gYWNjb3VudD97JyAnfVxyXG4gICAgICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgICAgICBhcz1cInNwYW5cIlxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6ICcjMjU2M2ViJywgZm9udFdlaWdodDogJ2JvbGQnLCBjdXJzb3I6ICdwb2ludGVyJyB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIENvbnRhY3QgQWRtaW5pc3RyYXRvclxyXG4gICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgIDxCb3ggc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnMXJlbScgfX0+XHJcbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzAuNzVyZW0nLCBjb2xvcjogJyM2YjcyODAnIH19PlxyXG4gICAgICAgICAgICDCqSAyMDI0IFJlbGllZiBNYW5hZ2VtZW50IFN5c3RlbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICA8L0JveD5cclxuICAgICAgPC9Cb3g+XHJcbiAgICA8L0JveD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9naW5Db21wb25lbnQ7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBJbWFnZUNvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyByZWNvcmQsIHByb3BlcnR5IH0gPSBwcm9wcztcclxuICAgIGNvbnN0IGltYWdlVXJsID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXTtcclxuXHJcbiAgICBpZiAoIWltYWdlVXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94PlxyXG4gICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICBzcmM9e2ltYWdlVXJsfVxyXG4gICAgICAgICAgICAgICAgYWx0PXtwcm9wZXJ0eS5sYWJlbH1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1heFdpZHRoOiAnMTAwcHgnLCBtYXhIZWlnaHQ6ICcxMDBweCcsIG9iamVjdEZpdDogJ2NvdmVyJyB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEltYWdlQ29tcG9uZW50O1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IEltYWdlTGlzdENvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyByZWNvcmQsIHByb3BlcnR5IH0gPSBwcm9wcztcclxuXHJcbiAgICBjb25zdCBpbWFnZXMgPSBbXTtcclxuICAgIC8vIENoZWNrIGZvciBmbGF0dGVuZWQga2V5cyBsaWtlICdwcm9vZkltYWdlcy4wJywgJ3Byb29mSW1hZ2VzLjEnLCBldGMuXHJcbiAgICBPYmplY3Qua2V5cyhyZWNvcmQucGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYga2V5IHN0YXJ0cyB3aXRoIHByb3BlcnR5IG5hbWUgYW5kIGZvbGxvd3Mgd2l0aCAuaW5kZXhcclxuICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYCR7cHJvcGVydHkubmFtZX0uYCkgJiYgIWlzTmFOKGtleS5zcGxpdCgnLicpLnBvcCgpKSkge1xyXG4gICAgICAgICAgICBpbWFnZXMucHVzaChyZWNvcmQucGFyYW1zW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChpbWFnZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgZmxleERpcmVjdGlvbj1cInJvd1wiIGZsZXhXcmFwPVwid3JhcFwiIGdhcD17Mn0+XHJcbiAgICAgICAgICAgIHtpbWFnZXMubWFwKCh1cmwsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgICAgICAgICAgICBzcmM9e3VybH1cclxuICAgICAgICAgICAgICAgICAgICBhbHQ9e2Ake3Byb3BlcnR5LmxhYmVsfS0ke2luZGV4fWB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWF4V2lkdGg6ICcxMDBweCcsIG1heEhlaWdodDogJzEwMHB4Jywgb2JqZWN0Rml0OiAnY292ZXInIH19XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICA8L0JveD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZUxpc3RDb21wb25lbnQ7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIElucHV0LCBMYWJlbCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgSW1hZ2VFZGl0Q29tcG9uZW50ID0gKHByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0gPSBwcm9wcztcclxuICAgIGNvbnN0IHZhbHVlID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXSB8fCAnJztcclxuICAgIGNvbnN0IFtpbWFnZVVybCwgc2V0SW1hZ2VVcmxdID0gdXNlU3RhdGUodmFsdWUpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBsb2NhbCBzdGF0ZSBpZiByZWNvcmQgY2hhbmdlcyBmcm9tIG91dHNpZGUgKGUuZy4gcmVsb2FkKVxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBzZXRJbWFnZVVybChyZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdIHx8ICcnKTtcclxuICAgIH0sIFtyZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdXSk7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlSW5wdXRDaGFuZ2UgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICBzZXRJbWFnZVVybChuZXdWYWx1ZSk7XHJcbiAgICAgICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgbmV3VmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxCb3ggbWFyZ2luQm90dG9tPVwieHhsXCI+XHJcbiAgICAgICAgICAgIDxMYWJlbCBodG1sRm9yPXtwcm9wZXJ0eS5uYW1lfT57cHJvcGVydHkubGFiZWx9PC9MYWJlbD5cclxuICAgICAgICAgICAge2ltYWdlVXJsICYmIChcclxuICAgICAgICAgICAgICAgIDxCb3ggbWFyZ2luQm90dG9tPVwiZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtpbWFnZVVybH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiUHJldmlld1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1heFdpZHRoOiAnMjAwcHgnLCBtYXhIZWlnaHQ6ICcyMDBweCcsIG9iamVjdEZpdDogJ2NvdmVyJywgZGlzcGxheTogJ2Jsb2NrJywgbWFyZ2luQm90dG9tOiAnOHB4JywgYm9yZGVyOiAnMXB4IHNvbGlkICNkZGQnLCBwYWRkaW5nOiAnNHB4JyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkVycm9yPXsoZSkgPT4geyBlLnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICBpZD17cHJvcGVydHkubmFtZX1cclxuICAgICAgICAgICAgICAgIG5hbWU9e3Byb3BlcnR5Lm5hbWV9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17aW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICB3aWR0aD17MX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICA8L0JveD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZUVkaXRDb21wb25lbnQ7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIExhYmVsLCBJbnB1dCwgQnV0dG9uLCBJY29uIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBJbWFnZUxpc3RFZGl0Q29tcG9uZW50ID0gKHByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0gPSBwcm9wcztcclxuXHJcbiAgICAvLyBGbGF0dGVuZWQgcGFyYW1zIGFyZSBzdG9yZWQgbGlrZSAncHJvb2ZJbWFnZXMuMCc6ICd1cmwxJywgJ3Byb29mSW1hZ2VzLjEnOiAndXJsMidcclxuICAgIC8vIFdlIG5lZWQgdG8gcmVjb25zdHJ1Y3QgdGhlIGFycmF5XHJcbiAgICBjb25zdCBnZXRJbWFnZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VzID0gW107XHJcbiAgICAgICAgT2JqZWN0LmtleXMocmVjb3JkLnBhcmFtcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYCR7cHJvcGVydHkubmFtZX0uYCkgJiYgIWlzTmFOKGtleS5zcGxpdCgnLicpLnBvcCgpKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChrZXkuc3BsaXQoJy4nKS5wb3AoKSwgMTApO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VzW2luZGV4XSA9IHJlY29yZC5wYXJhbXNba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEZpbHRlciBvdXQgZW1wdHkgc2xvdHMgaWYgYW55IGhvbGUgZXhpc3RzLCB0aG91Z2ggbm9ybWFsbHkgYWRtaW5qcyBoYW5kbGVzIHNlcXVlbnRpYWwga2V5c1xyXG4gICAgICAgIHJldHVybiBpbWFnZXMuZmlsdGVyKGltZyA9PiBpbWcgIT09IHVuZGVmaW5lZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IFtpbWFnZXMsIHNldEltYWdlc10gPSB1c2VTdGF0ZShnZXRJbWFnZXMoKSk7XHJcblxyXG4gICAgLy8gSGVscGVyIHRvIG5vdGlmeSBBZG1pbkpTIG9mIGNoYW5nZXNcclxuICAgIC8vIEFkbWluSlMgZXhwZWN0cyBmbGF0IGtleXMgZm9yIGFycmF5czogJ3Byb3BlcnR5LjAnLCAncHJvcGVydHkuMSdcclxuICAgIGNvbnN0IHVwZGF0ZVJlY29yZCA9IChuZXdJbWFnZXMpID0+IHtcclxuICAgICAgICBzZXRJbWFnZXMobmV3SW1hZ2VzKTtcclxuXHJcbiAgICAgICAgLy8gMS4gQ2xlYXIgZXhpc3Rpbmcga2V5cyBmb3IgdGhpcyBwcm9wZXJ0eVxyXG4gICAgICAgIC8vIFdlIGNhbid0IHJlYWxseSBcImRlbGV0ZVwiIGtleXMgZWFzaWx5IHZpYSBvbkNoYW5nZSBpbiB0aGUgc3RhbmRhcmQgd2F5IHdpdGhvdXQgcG90ZW50aWFsbHkgbGVhdmluZyBnYXJiYWdlLFxyXG4gICAgICAgIC8vIGJ1dCBzdGFuZGFyZCBhZG1pbmpzIGhhbmRsaW5nIGV4cGVjdHMgdXMgdG8gb3ZlcndyaXRlLlxyXG4gICAgICAgIC8vIEhvd2V2ZXIsIHRoZSBjbGVhbmVzdCB3YXkgdG8gc3luYyBhbiBhcnJheSBpcyB0byB1cGRhdGUgZWFjaCBpbmRleC5cclxuXHJcbiAgICAgICAgLy8gSWRlYWxseSB3ZSBzaG91bGQgbnVsbGlmeSBvbGQga2V5cyBpZiBhcnJheSBzaHJpbmtzLCBidXQgc3RhbmRhcmQgYmVoYXZpb3IgbWlnaHQganVzdCBoYW5kbGUgd2hhdCB3ZSBzZW5kLlxyXG4gICAgICAgIC8vIEEgc2FmZXIgYmV0IGlzIHRvIHJlbHkgb24gQWRtaW5KUydzIGludGVybmFsIGhhbmRsaW5nIGlmIHdlIHdlcmUgcGFzc2luZyB0aGUgd2hvbGUgb2JqZWN0LCBcclxuICAgICAgICAvLyBidXQgaGVyZSB3ZSBhcmUgYSBjb21wb25lbnQuXHJcblxyXG4gICAgICAgIC8vIFdlIHdpbGwganVzdCB1cGRhdGUgJ3Byb3BlcnR5LjAnLCAncHJvcGVydHkuMScgZXRjLlxyXG4gICAgICAgIC8vIEFuZCBpZGVhbGx5IHdlIG1pZ2h0IG5lZWQgdG8gY2xlYXIgJ3Byb3BlcnR5LjInIGlmIHdlIHdlbnQgZnJvbSAzIGl0ZW1zIHRvIDIuXHJcbiAgICAgICAgLy8gVG8gcHJvcGVybHkgXCJjbGVhclwiIHdlIG1pZ2h0IG5lZWQgdG8gc2V0IGl0IHRvIG51bGwgb3IgdW5kZWZpbmVkLlxyXG5cclxuICAgICAgICAvLyBTdHJhdGVneTogVXBkYXRlIGFsbCBjdXJyZW50IGluZGljZXMuIFxyXG4gICAgICAgIC8vIElmIHRoZSBhcnJheSBzaHJhbmssIHdlIGNhbiB0cnkgc2V0dGluZyB0aGUgbmV4dCBpbmRleCB0byBudWxsL3VuZGVmaW5lZCB0byBzZWUgaWYgYmFja2VuZCBoYW5kbGVzIGl0LFxyXG4gICAgICAgIC8vIG9yIGp1c3QgcmVseSBvbiB0aGUgZmFjdCB0aGF0IHdlIGFyZSByZXdyaXRpbmcgdGhlIHBhcmFtcy5cclxuXHJcbiAgICAgICAgLy8gQWN0dWFsbHksIG9uQ2hhbmdlIGV4cGVjdHMgKGtleSwgdmFsdWUpLlxyXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIG11bHRpcGxlIGtleXMuIEFkbWluSlMgYG9uQ2hhbmdlYCBtaWdodCBub3Qgc3VwcG9ydCBiYXRjaCB1cGRhdGVzIGVhc2lseSBkZXBlbmRpbmcgb24gdmVyc2lvbi5cclxuICAgICAgICAvLyBCdXQgdXN1YWxseSBpdCdzIGBvbkNoYW5nZShwcm9wZXJ0eSwgdmFsdWUpYCB3aGVyZSB2YWx1ZSBpcyB0aGUgZnVsbCB2YWx1ZT8gXHJcbiAgICAgICAgLy8gTm8sIGZvciBhcnJheSBwcm9wZXJ0aWVzLCBBZG1pbkpTIG9mdGVuIHRyZWF0cyB0aGVtIGVzc2VudGlhbGx5IGFzIGluZGl2aWR1YWwgZmllbGRzIGlmIGZsYXR0ZW5lZC5cclxuXHJcbiAgICAgICAgLy8gV0FJVDogSWYgd2UgdXNlIGEgY3VzdG9tIGNvbXBvbmVudCBmb3IgdGhlICplbnRpcmUgYXJyYXkgcHJvcGVydHkqLCBgb25DaGFuZ2VgIG1pZ2h0IGFjY2VwdCB0aGUgYXJyYXkgaXRzZWxmXHJcbiAgICAgICAgLy8gaWYgdGhlIGJhY2tlbmQgYWRhcHRlciBzdXBwb3J0cyBpdC4gQnV0IEFkbWluSlMgb2Z0ZW4gZmxhdHRlbnMuXHJcblxyXG4gICAgICAgIC8vIExldCdzIGNoZWNrIGhvdyBzdGFuZGFyZCBhcnJheSBlZGl0aW5nIHdvcmtzLlxyXG4gICAgICAgIC8vIElmIHdlIGxvb2sgYXQgZXhpc3RpbmcgYEltYWdlTGlzdENvbXBvbmVudGAsIGl0IHJlYWRzIGZyb20gYHJlY29yZC5wYXJhbXNgLlxyXG5cclxuICAgICAgICAvLyBMZXQncyB0cnkgc2VuZGluZyB0aGUgYXJyYXkgdG8gYG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIG5ld0ltYWdlcylgLlxyXG4gICAgICAgIC8vIE1hbnkgQWRtaW5KUyBhZGFwdGVycyAobGlrZSBNb25nb29zZSkgaGFuZGxlIHRoZSBhcnJheSBpZiBwYXNzZWQgYXMgYSB2YWx1ZSB0byB0aGUgbWFpbiBwcm9wZXJ0eSBrZXkuXHJcbiAgICAgICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgbmV3SW1hZ2VzKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQWRkID0gKCkgPT4ge1xyXG4gICAgICAgIHVwZGF0ZVJlY29yZChbLi4uaW1hZ2VzLCAnJ10pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVSZW1vdmUgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCBuZXdJbWFnZXMgPSBbLi4uaW1hZ2VzXTtcclxuICAgICAgICBuZXdJbWFnZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB1cGRhdGVSZWNvcmQobmV3SW1hZ2VzKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGluZGV4LCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5ld0ltYWdlcyA9IFsuLi5pbWFnZXNdO1xyXG4gICAgICAgIG5ld0ltYWdlc1tpbmRleF0gPSB2YWx1ZTtcclxuICAgICAgICB1cGRhdGVSZWNvcmQobmV3SW1hZ2VzKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cInh4bFwiPlxyXG4gICAgICAgICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XHJcbiAgICAgICAgICAgIHtpbWFnZXMubWFwKCh1cmwsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8Qm94IGtleT17aW5kZXh9IG1hcmdpbkJvdHRvbT1cImRlZmF1bHRcIiBkaXNwbGF5PVwiZmxleFwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Qm94IG1hcmdpblJpZ2h0PVwiZGVmYXVsdFwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3VybCAmJiA8aW1nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e3VybH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD17YEltYWdlICR7aW5kZXggKyAxfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogJzUwcHgnLCBoZWlnaHQ6ICc1MHB4Jywgb2JqZWN0Rml0OiAnY292ZXInLCBib3JkZXJSYWRpdXM6ICc0cHgnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVycm9yPXsoZSkgPT4geyBlLnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPn1cclxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICAgICA8Qm94IGZsZXhHcm93PXsxfSBtYXJnaW5SaWdodD1cImRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dXJsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVDaGFuZ2UoaW5kZXgsIGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXsxfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJJbWFnZSBVUkxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gaGFuZGxlUmVtb3ZlKGluZGV4KX0gdmFyaWFudD1cImRhbmdlclwiIHNpemU9XCJpY29uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIGljb249XCJUcmFzaDJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUFkZH0gdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgPEljb24gaWNvbj1cIlBsdXNcIiAvPiBBZGQgSW1hZ2UgVVJMXHJcbiAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEltYWdlTGlzdEVkaXRDb21wb25lbnQ7XHJcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmRcbmltcG9ydCBMaW5rQ29tcG9uZW50IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9MaW5rQ29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5MaW5rQ29tcG9uZW50ID0gTGlua0NvbXBvbmVudFxuaW1wb3J0IFZvbHVudGVlckZpbHRlcmVkU2VsZWN0IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Wb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3QgPSBWb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdFxuaW1wb3J0IFN0YXR1c0ZpbHRlcmVkU2VsZWN0IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9BaWRSZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlN0YXR1c0ZpbHRlcmVkU2VsZWN0ID0gU3RhdHVzRmlsdGVyZWRTZWxlY3RcbmltcG9ydCBEb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRvbmF0aW9uUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0ID0gRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3RcbmltcG9ydCBMb2dpbkNvbXBvbmVudCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTG9naW5Db21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkxvZ2luQ29tcG9uZW50ID0gTG9naW5Db21wb25lbnRcbmltcG9ydCBJbWFnZUNvbXBvbmVudCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSW1hZ2VDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlQ29tcG9uZW50ID0gSW1hZ2VDb21wb25lbnRcbmltcG9ydCBJbWFnZUxpc3RDb21wb25lbnQgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlTGlzdENvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuSW1hZ2VMaXN0Q29tcG9uZW50ID0gSW1hZ2VMaXN0Q29tcG9uZW50XG5pbXBvcnQgSW1hZ2VFZGl0Q29tcG9uZW50IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUVkaXRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlRWRpdENvbXBvbmVudCA9IEltYWdlRWRpdENvbXBvbmVudFxuaW1wb3J0IEltYWdlTGlzdEVkaXRDb21wb25lbnQgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlTGlzdEVkaXRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlTGlzdEVkaXRDb21wb25lbnQgPSBJbWFnZUxpc3RFZGl0Q29tcG9uZW50Il0sIm5hbWVzIjpbIkRhc2hib2FyZCIsImN1cnJlbnRBZG1pbiIsInVzZUN1cnJlbnRBZG1pbiIsInN0YXRzIiwic2V0U3RhdHMiLCJ1c2VTdGF0ZSIsImFpZFJlcXVlc3RzIiwiZG9uYXRpb25zIiwidGFza3MiLCJ1c2VycyIsInVzZUVmZmVjdCIsImZldGNoU3RhdHMiLCJhcGkiLCJBcGlDbGllbnQiLCJlcnJvciIsImNvbnNvbGUiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJCb3giLCJtYiIsIkgyIiwiVGV4dCIsIm10IiwiZW1haWwiLCJkaXNwbGF5IiwiZmxleFdyYXAiLCJnYXAiLCJmbGV4IiwibWluV2lkdGgiLCJiZyIsInAiLCJib3JkZXJSYWRpdXMiLCJib3hTaGFkb3ciLCJINSIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsImNvbG9yIiwiYXMiLCJocmVmIiwiYm9yZGVyIiwic3R5bGUiLCJ0ZXh0RGVjb3JhdGlvbiIsImN1cnNvciIsIkRhdGUiLCJ0b0xvY2FsZVN0cmluZyIsIkxpbmtDb21wb25lbnQiLCJwcm9wcyIsInJlY29yZCIsImxhdCIsInBhcmFtcyIsImxvbmciLCJsb2ciLCJtYXBzTGluayIsInRhcmdldCIsInJlbCIsIlZvbHVudGVlckZpbHRlcmVkU2VsZWN0IiwicHJvcGVydHkiLCJvbkNoYW5nZSIsInZvbHVudGVlcnMiLCJzZXRWb2x1bnRlZXJzIiwibG9hZGluZyIsInNldExvYWRpbmciLCJmZXRjaFZvbHVudGVlcnMiLCJyZXNwb25zZSIsInJlc291cmNlQWN0aW9uIiwicmVzb3VyY2VJZCIsImFjdGlvbk5hbWUiLCJwZXJQYWdlIiwiZGF0YSIsInJlY29yZHMiLCJtYXAiLCJ2IiwidmFsdWUiLCJpZCIsImxhYmVsIiwibmFtZSIsImhhbmRsZUNoYW5nZSIsInNlbGVjdGVkIiwic2VsZWN0ZWRPcHRpb24iLCJmaW5kIiwib3B0IiwiRm9ybUdyb3VwIiwiTGFiZWwiLCJyZXF1aXJlZCIsIlNlbGVjdCIsIm9wdGlvbnMiLCJpc0xvYWRpbmciLCJpc0NsZWFyYWJsZSIsInBsYWNlaG9sZGVyIiwiZGVzY3JpcHRpb24iLCJGb3JtTWVzc2FnZSIsIlN0YXR1c0ZpbHRlcmVkU2VsZWN0Iiwic3RhdHVzIiwic2V0U3RhdHVzIiwiZmV0Y2hTdGF0dXMiLCJEb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdCIsIkxvZ2luQ29tcG9uZW50Iiwic2V0RW1haWwiLCJwYXNzd29yZCIsInNldFBhc3N3b3JkIiwic2V0RXJyb3IiLCJzaG93UGFzc3dvcmQiLCJzZXRTaG93UGFzc3dvcmQiLCJ0cmFuc2xhdGVNZXNzYWdlIiwidXNlVHJhbnNsYXRpb24iLCJoYW5kbGVTdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImNyZWRlbnRpYWxzIiwianNvbiIsIm9rIiwid2luZG93IiwibG9jYXRpb24iLCJyZWRpcmVjdFVybCIsImVyciIsIm1pbkhlaWdodCIsImZvbnRGYW1pbHkiLCJfIiwibWQiLCJmbGV4RGlyZWN0aW9uIiwianVzdGlmeUNvbnRlbnQiLCJhbGlnbkl0ZW1zIiwiYmFja2dyb3VuZCIsInRleHRBbGlnbiIsIm1heFdpZHRoIiwic3JjIiwiYWx0IiwibWFyZ2luQm90dG9tIiwib25FcnJvciIsIm9wYWNpdHkiLCJtYXJnaW5Ub3AiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ3aWR0aCIsIm9uU3VibWl0IiwiaHRtbEZvciIsIklucHV0IiwidHlwZSIsImRpc2FibGVkIiwicGFkZGluZyIsInBvc2l0aW9uIiwicGFkZGluZ1JpZ2h0Iiwib25DbGljayIsInJpZ2h0IiwidG9wIiwidHJhbnNmb3JtIiwiQnV0dG9uIiwidmFyaWFudCIsIm1hcmdpblJpZ2h0IiwiSW1hZ2VDb21wb25lbnQiLCJpbWFnZVVybCIsIm1heEhlaWdodCIsIm9iamVjdEZpdCIsIkltYWdlTGlzdENvbXBvbmVudCIsImltYWdlcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Iiwic3RhcnRzV2l0aCIsImlzTmFOIiwic3BsaXQiLCJwb3AiLCJwdXNoIiwibGVuZ3RoIiwidXJsIiwiaW5kZXgiLCJJbWFnZUVkaXRDb21wb25lbnQiLCJzZXRJbWFnZVVybCIsImhhbmRsZUlucHV0Q2hhbmdlIiwiZXZlbnQiLCJuZXdWYWx1ZSIsIkltYWdlTGlzdEVkaXRDb21wb25lbnQiLCJnZXRJbWFnZXMiLCJwYXJzZUludCIsImZpbHRlciIsImltZyIsInVuZGVmaW5lZCIsInNldEltYWdlcyIsInVwZGF0ZVJlY29yZCIsIm5ld0ltYWdlcyIsImhhbmRsZUFkZCIsImhhbmRsZVJlbW92ZSIsInNwbGljZSIsImhlaWdodCIsImZsZXhHcm93Iiwic2l6ZSIsIkljb24iLCJpY29uIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBSUEsTUFBTUEsU0FBUyxHQUFHQSxNQUFNO0VBQ3RCLEVBQUEsTUFBTSxDQUFDQyxZQUFZLENBQUMsR0FBR0MsdUJBQWUsRUFBRTtFQUN4QyxFQUFBLE1BQU0sQ0FBQ0MsS0FBSyxFQUFFQyxRQUFRLENBQUMsR0FBR0MsY0FBUSxDQUFDO0VBQ2pDQyxJQUFBQSxXQUFXLEVBQUUsQ0FBQztFQUNkQyxJ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
