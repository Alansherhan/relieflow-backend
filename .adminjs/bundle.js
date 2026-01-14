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

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRGFzaGJvYXJkLmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9MaW5rQ29tcG9uZW50LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Wb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvQWlkUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Eb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTG9naW5Db21wb25lbnQuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlQ29tcG9uZW50LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUxpc3RDb21wb25lbnQuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlRWRpdENvbXBvbmVudC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSW1hZ2VMaXN0RWRpdENvbXBvbmVudC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvQ3JlYXRlVGFza0Zyb21BaWRSZXF1ZXN0LmpzeCIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIEgyLCBINSwgVGV4dCwgSWxsdXN0cmF0aW9uIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcbmltcG9ydCB7IEFwaUNsaWVudCwgdXNlQ3VycmVudEFkbWluIH0gZnJvbSAnYWRtaW5qcyc7XHJcblxyXG5jb25zdCBEYXNoYm9hcmQgPSAoKSA9PiB7XHJcbiAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcclxuICBjb25zdCBbc3RhdHMsIHNldFN0YXRzXSA9IHVzZVN0YXRlKHtcclxuICAgIGFpZFJlcXVlc3RzOiAwLFxyXG4gICAgZG9uYXRpb25zOiAwLFxyXG4gICAgdGFza3M6IDAsXHJcbiAgICB1c2VyczogMCxcclxuICB9KTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIC8vIEZldGNoIHN0YXRpc3RpY3MgZnJvbSB5b3VyIEFQSVxyXG4gICAgY29uc3QgZmV0Y2hTdGF0cyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XHJcbiAgICAgICAgLy8gWW91IGNhbiBtYWtlIEFQSSBjYWxscyBoZXJlIHRvIGdldCByZWFsIHN0YXRzXHJcbiAgICAgICAgLy8gRm9yIG5vdywgdXNpbmcgcGxhY2Vob2xkZXIgZGF0YVxyXG4gICAgICAgIHNldFN0YXRzKHtcclxuICAgICAgICAgIGFpZFJlcXVlc3RzOiA0NSxcclxuICAgICAgICAgIGRvbmF0aW9uczogMTI4LFxyXG4gICAgICAgICAgdGFza3M6IDIzLFxyXG4gICAgICAgICAgdXNlcnM6IDM1MCxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBzdGF0czonLCBlcnJvcik7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZmV0Y2hTdGF0cygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxCb3g+XHJcbiAgICAgIDxCb3ggbWI9XCJ4eGxcIj5cclxuICAgICAgICA8SDI+V2VsY29tZSB0byBSZWxpZWYgTWFuYWdlbWVudCBTeXN0ZW08L0gyPlxyXG4gICAgICAgIDxUZXh0IG10PVwiZGVmYXVsdFwiPlxyXG4gICAgICAgICAgSGVsbG8ge2N1cnJlbnRBZG1pbj8uZW1haWwgfHwgJ0FkbWluJ30hIEhlcmUncyB5b3VyIGRhc2hib2FyZCBvdmVydmlldy5cclxuICAgICAgICA8L1RleHQ+XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgey8qIFN0YXRpc3RpY3MgQ2FyZHMgKi99XHJcbiAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBmbGV4V3JhcD1cIndyYXBcIiBnYXA9XCJkZWZhdWx0XCI+XHJcbiAgICAgICAgPEJveFxyXG4gICAgICAgICAgZmxleD1cIjFcIlxyXG4gICAgICAgICAgbWluV2lkdGg9XCIyMDBweFwiXHJcbiAgICAgICAgICBiZz1cInByaW1hcnkxMDBcIlxyXG4gICAgICAgICAgcD1cInhsXCJcclxuICAgICAgICAgIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgYm94U2hhZG93PVwiY2FyZFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPEg1IG1iPVwiZGVmYXVsdFwiPkFpZCBSZXF1ZXN0czwvSDU+XHJcbiAgICAgICAgICA8VGV4dCBmb250U2l6ZT1cInh4bFwiIGZvbnRXZWlnaHQ9XCJib2xkXCI+XHJcbiAgICAgICAgICAgIHtzdGF0cy5haWRSZXF1ZXN0c31cclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDxUZXh0IG10PVwic21cIiBjb2xvcj1cImdyZXk2MFwiPlxyXG4gICAgICAgICAgICBBY3RpdmUgcmVxdWVzdHNcclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgPEJveFxyXG4gICAgICAgICAgZmxleD1cIjFcIlxyXG4gICAgICAgICAgbWluV2lkdGg9XCIyMDBweFwiXHJcbiAgICAgICAgICBiZz1cInN1Y2Nlc3NcIlxyXG4gICAgICAgICAgcD1cInhsXCJcclxuICAgICAgICAgIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgYm94U2hhZG93PVwiY2FyZFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPEg1IG1iPVwiZGVmYXVsdFwiIGNvbG9yPVwid2hpdGVcIj5cclxuICAgICAgICAgICAgRG9uYXRpb25zXHJcbiAgICAgICAgICA8L0g1PlxyXG4gICAgICAgICAgPFRleHQgZm9udFNpemU9XCJ4eGxcIiBmb250V2VpZ2h0PVwiYm9sZFwiIGNvbG9yPVwid2hpdGVcIj5cclxuICAgICAgICAgICAge3N0YXRzLmRvbmF0aW9uc31cclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDxUZXh0IG10PVwic21cIiBjb2xvcj1cIndoaXRlXCI+XHJcbiAgICAgICAgICAgIFRvdGFsIGRvbmF0aW9ucyByZWNlaXZlZFxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICBmbGV4PVwiMVwiXHJcbiAgICAgICAgICBtaW5XaWR0aD1cIjIwMHB4XCJcclxuICAgICAgICAgIGJnPVwiaW5mb1wiXHJcbiAgICAgICAgICBwPVwieGxcIlxyXG4gICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICBib3hTaGFkb3c9XCJjYXJkXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8SDUgbWI9XCJkZWZhdWx0XCIgY29sb3I9XCJ3aGl0ZVwiPlxyXG4gICAgICAgICAgICBBY3RpdmUgVGFza3NcclxuICAgICAgICAgIDwvSDU+XHJcbiAgICAgICAgICA8VGV4dCBmb250U2l6ZT1cInh4bFwiIGZvbnRXZWlnaHQ9XCJib2xkXCIgY29sb3I9XCJ3aGl0ZVwiPlxyXG4gICAgICAgICAgICB7c3RhdHMudGFza3N9XHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBtdD1cInNtXCIgY29sb3I9XCJ3aGl0ZVwiPlxyXG4gICAgICAgICAgICBQZW5kaW5nIHRhc2tzXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIGZsZXg9XCIxXCJcclxuICAgICAgICAgIG1pbldpZHRoPVwiMjAwcHhcIlxyXG4gICAgICAgICAgYmc9XCJhY2NlbnRcIlxyXG4gICAgICAgICAgcD1cInhsXCJcclxuICAgICAgICAgIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgYm94U2hhZG93PVwiY2FyZFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPEg1IG1iPVwiZGVmYXVsdFwiIGNvbG9yPVwid2hpdGVcIj5cclxuICAgICAgICAgICAgVXNlcnNcclxuICAgICAgICAgIDwvSDU+XHJcbiAgICAgICAgICA8VGV4dCBmb250U2l6ZT1cInh4bFwiIGZvbnRXZWlnaHQ9XCJib2xkXCIgY29sb3I9XCJ3aGl0ZVwiPlxyXG4gICAgICAgICAgICB7c3RhdHMudXNlcnN9XHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBtdD1cInNtXCIgY29sb3I9XCJ3aGl0ZVwiPlxyXG4gICAgICAgICAgICBSZWdpc3RlcmVkIHVzZXJzXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgey8qIFF1aWNrIEFjdGlvbnMgKi99XHJcbiAgICAgIDxCb3ggbXQ9XCJ4eGxcIj5cclxuICAgICAgICA8SDUgbWI9XCJkZWZhdWx0XCI+UXVpY2sgQWN0aW9uczwvSDU+XHJcbiAgICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGdhcD1cImRlZmF1bHRcIiBmbGV4V3JhcD1cIndyYXBcIj5cclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgYXM9XCJhXCJcclxuICAgICAgICAgICAgaHJlZj1cIi9kYXNoYm9hcmQvcmVzb3VyY2VzL0FpZFJlcXVlc3RcIlxyXG4gICAgICAgICAgICBiZz1cIndoaXRlXCJcclxuICAgICAgICAgICAgcD1cImxnXCJcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgIGJvcmRlcj1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICBzdHlsZT17eyB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJyB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8VGV4dCBmb250V2VpZ2h0PVwiYm9sZFwiIGNvbG9yPVwicHJpbWFyeTEwMFwiPlxyXG4gICAgICAgICAgICAgIPCfk4sgVmlldyBBaWQgUmVxdWVzdHNcclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgIGFzPVwiYVwiXHJcbiAgICAgICAgICAgIGhyZWY9XCIvZGFzaGJvYXJkL3Jlc291cmNlcy9Eb25hdGlvblwiXHJcbiAgICAgICAgICAgIGJnPVwid2hpdGVcIlxyXG4gICAgICAgICAgICBwPVwibGdcIlxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgYm9yZGVyPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IHRleHREZWNvcmF0aW9uOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCJib2xkXCIgY29sb3I9XCJwcmltYXJ5MTAwXCI+XHJcbiAgICAgICAgICAgICAg8J+SsCBNYW5hZ2UgRG9uYXRpb25zXHJcbiAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICBhcz1cImFcIlxyXG4gICAgICAgICAgICBocmVmPVwiL2Rhc2hib2FyZC9yZXNvdXJjZXMvVGFza1NjaGVtYVwiXHJcbiAgICAgICAgICAgIGJnPVwid2hpdGVcIlxyXG4gICAgICAgICAgICBwPVwibGdcIlxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgYm9yZGVyPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IHRleHREZWNvcmF0aW9uOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCJib2xkXCIgY29sb3I9XCJwcmltYXJ5MTAwXCI+XHJcbiAgICAgICAgICAgICAg4pyFIFZpZXcgVGFza3NcclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgIGFzPVwiYVwiXHJcbiAgICAgICAgICAgIGhyZWY9XCIvZGFzaGJvYXJkL3Jlc291cmNlcy9SZWxpZWZDZW50ZXJcIlxyXG4gICAgICAgICAgICBiZz1cIndoaXRlXCJcclxuICAgICAgICAgICAgcD1cImxnXCJcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgIGJvcmRlcj1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICBzdHlsZT17eyB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJyB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8VGV4dCBmb250V2VpZ2h0PVwiYm9sZFwiIGNvbG9yPVwicHJpbWFyeTEwMFwiPlxyXG4gICAgICAgICAgICAgIPCfj6IgUmVsaWVmIENlbnRlcnNcclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgey8qIFJlY2VudCBBY3Rpdml0eSAqL31cclxuICAgICAgPEJveCBtdD1cInh4bFwiPlxyXG4gICAgICAgIDxINSBtYj1cImRlZmF1bHRcIj5TeXN0ZW0gU3RhdHVzPC9INT5cclxuICAgICAgICA8Qm94IGJnPVwid2hpdGVcIiBwPVwibGdcIiBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCIgYm9yZGVyPVwiZGVmYXVsdFwiPlxyXG4gICAgICAgICAgPFRleHQ+4pyFIEFsbCBzeXN0ZW1zIG9wZXJhdGlvbmFsPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIGNvbG9yPVwiZ3JleTYwXCI+XHJcbiAgICAgICAgICAgIExhc3QgdXBkYXRlZDoge25ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKX1cclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICA8L0JveD5cclxuICAgICAgPC9Cb3g+XHJcbiAgICA8L0JveD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkOyIsIlxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcblxyXG5jb25zdCBMaW5rQ29tcG9uZW50ID0gKHByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IHJlY29yZCB9ID0gcHJvcHNcclxuICAgIGNvbnN0IGxhdCAgPSByZWNvcmQucGFyYW1zW1wiYWRkcmVzcy5sb2NhdGlvbi5jb29yZGluYXRlcy4wXCJdXHJcbiAgICBjb25zdCBsb25nID0gcmVjb3JkLnBhcmFtc1tcImFkZHJlc3MubG9jYXRpb24uY29vcmRpbmF0ZXMuMVwiXVxyXG4gIGNvbnNvbGUubG9nKHJlY29yZClcclxuICBjb25zdCBtYXBzTGluayA9IGBodHRwOi8vZ29vZ2xlLmNvbS9tYXBzL0Ake2xhdH0sJHtsb25nfSwxNXpgXHJcblxyXG4gIHJldHVybiAoXHJcblxyXG5cclxuICAgICAgPGEgaHJlZj17bWFwc0xpbmt9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5cclxuICAgICAgICBWaWV3IExvY2F0aW9uXHJcbiAgICAgIDwvYT5cclxuXHJcbiAgICBcclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbmtDb21wb25lbnRcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIExhYmVsLCBTZWxlY3QsIEZvcm1NZXNzYWdlIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XHJcblxyXG5jb25zdCBWb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdCA9ICh7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0pID0+IHtcclxuICBjb25zdCBbdm9sdW50ZWVycywgc2V0Vm9sdW50ZWVyc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBmZXRjaFZvbHVudGVlcnMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHtcclxuICAgICAgICByZXNvdXJjZUlkOiAndXNlclByb2ZpbGUnLFxyXG4gICAgICAgIGFjdGlvbk5hbWU6ICdsaXN0JyxcclxuICAgICAgICBwYXJhbXM6IHsgJ2ZpbHRlcnMucm9sZSc6ICd2b2x1bnRlZXInLCBwZXJQYWdlOiAxMDAwIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAocmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLnJlY29yZHMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnbWFwcGluZyAnLCByZXNwb25zZS5kYXRhLnJlY29yZHMpXHJcbiAgICAgICAgc2V0Vm9sdW50ZWVycyhyZXNwb25zZS5kYXRhLnJlY29yZHMubWFwKHYgPT4gKHtcclxuICAgICAgICAgIHZhbHVlOiB2LmlkLFxyXG4gICAgICAgICAgbGFiZWw6IHYucGFyYW1zLm5hbWUsXHJcbiAgICAgICAgfSkpKTtcclxuICAgICAgfVxyXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgIH07XHJcbiAgICBmZXRjaFZvbHVudGVlcnMoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IHNlbGVjdGVkID0+IHtcclxuICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIHNlbGVjdGVkID8gc2VsZWN0ZWQudmFsdWUgOiAnJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSB2b2x1bnRlZXJzLmZpbmQob3B0ID0+IG9wdC52YWx1ZSA9PT0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXSkgfHwgbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxGb3JtR3JvdXAgbWI9ezU2fT5cclxuICAgICAgPExhYmVsIHJlcXVpcmVkPnsnU2VsZWN0IFZvbHVudGVlcid9PC9MYWJlbD5cclxuICAgICAgPFNlbGVjdFxyXG4gICAgICAgIG9wdGlvbnM9e3ZvbHVudGVlcnN9XHJcbiAgICAgICAgdmFsdWU9e3NlbGVjdGVkT3B0aW9ufVxyXG4gICAgICAgIGlzTG9hZGluZz17bG9hZGluZ31cclxuICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgIGlzQ2xlYXJhYmxlXHJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3Qgdm9sdW50ZWVy4oCmXCJcclxuICAgICAgLz5cclxuICAgICAge3Byb3BlcnR5LmRlc2NyaXB0aW9uICYmIChcclxuICAgICAgICA8Rm9ybU1lc3NhZ2U+e3Byb3BlcnR5LmRlc2NyaXB0aW9ufTwvRm9ybU1lc3NhZ2U+XHJcbiAgICAgICl9XHJcbiAgICA8L0Zvcm1Hcm91cD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3Q7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCwgU2VsZWN0LCBGb3JtTWVzc2FnZSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xyXG5cclxuY29uc3QgU3RhdHVzRmlsdGVyZWRTZWxlY3QgPSAoeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9KSA9PiB7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGZldGNoU3RhdHVzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5yZXNvdXJjZUFjdGlvbih7XHJcbiAgICAgICAgcmVzb3VyY2VJZDogJ0FpZFJlcXVlc3QnLFxyXG4gICAgICAgIGFjdGlvbk5hbWU6ICdsaXN0JyxcclxuICAgICAgICBwYXJhbXM6IHsgJ2ZpbHRlcnMuc3RhdHVzJzogJ3JlamVjdGVkJywgcGVyUGFnZTogMTAwMCB9LFxyXG4gICAgICB9KTtcclxuICAgICAgY29uc29sZS5sb2coJ2xvZ29nZGdkJywgcmVzcG9uc2UpXHJcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGEucmVjb3Jkcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdtYXBwaW5nICcsIHJlc3BvbnNlLmRhdGEucmVjb3JkcylcclxuICAgICAgICBzZXRTdGF0dXMocmVzcG9uc2UuZGF0YS5yZWNvcmRzLm1hcCh2ID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjb3JkXCIsIHYucGFyYW1zKVxyXG4gICAgICAgICAgcmV0dXJuICh7XHJcbiAgICAgICAgICAgIHZhbHVlOiB2LmlkLFxyXG4gICAgICAgICAgICAvLyBsYWJlbDogYCR7di5wYXJhbXNbXCJhZGRyZXNzLmFkZHJlc3NMaW5lMVwiXX0gLSAke3YucGFyYW1zW1wiZG9uYXRpb25UeXBlXCJdfWBcclxuICAgICAgICAgICAgbGFiZWw6IHYucGFyYW1zLm5hbWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfVxyXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgIH07XHJcbiAgICBmZXRjaFN0YXR1cygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gc2VsZWN0ZWQgPT4ge1xyXG4gICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgc2VsZWN0ZWQgPyBzZWxlY3RlZC52YWx1ZSA6ICcnKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IHN0YXR1cy5maW5kKG9wdCA9PiBvcHQudmFsdWUgPT09IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0pIHx8IG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Rm9ybUdyb3VwIG1iPXs1Nn0+XHJcbiAgICAgIDxMYWJlbCByZXF1aXJlZD57J1NlbGVjdCBBaWQgUmVxdWVzdCd9PC9MYWJlbD5cclxuICAgICAgPFNlbGVjdFxyXG4gICAgICAgIG9wdGlvbnM9e3N0YXR1c31cclxuICAgICAgICB2YWx1ZT17c2VsZWN0ZWRPcHRpb259XHJcbiAgICAgICAgaXNMb2FkaW5nPXtsb2FkaW5nfVxyXG4gICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XHJcbiAgICAgICAgaXNDbGVhcmFibGVcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBBaWQgUmVxdWVzdFwiXHJcbiAgICAgIC8+XHJcbiAgICAgIHtwcm9wZXJ0eS5kZXNjcmlwdGlvbiAmJiAoXHJcbiAgICAgICAgPEZvcm1NZXNzYWdlPntwcm9wZXJ0eS5kZXNjcmlwdGlvbn08L0Zvcm1NZXNzYWdlPlxyXG4gICAgICApfVxyXG4gICAgPC9Gb3JtR3JvdXA+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0YXR1c0ZpbHRlcmVkU2VsZWN0O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwsIFNlbGVjdCwgRm9ybU1lc3NhZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcclxuXHJcbmNvbnN0IERvbmF0aW9uUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0ID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xyXG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBmZXRjaFN0YXR1cyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xyXG4gICAgICAgIHJlc291cmNlSWQ6ICdEb25hdGlvblJlcXVlc3QnLFxyXG4gICAgICAgIGFjdGlvbk5hbWU6ICdsaXN0JyxcclxuICAgICAgICBwYXJhbXM6IHsgJ2ZpbHRlcnMuc3RhdHVzJzogJ2FjY2VwdGVkJywgcGVyUGFnZTogMTAwMCB9LFxyXG4gICAgICB9KTtcclxuICAgICAgY29uc29sZS5sb2coJ2xvZ29nZGdkJywgcmVzcG9uc2UpXHJcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGEucmVjb3Jkcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdtYXBwaW5nICcsIHJlc3BvbnNlLmRhdGEucmVjb3JkcylcclxuICAgICAgICBzZXRTdGF0dXMocmVzcG9uc2UuZGF0YS5yZWNvcmRzLm1hcCh2ID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjb3JkXCIsIHYucGFyYW1zKVxyXG4gICAgICAgICAgcmV0dXJuICh7XHJcbiAgICAgICAgICAgIHZhbHVlOiB2LmlkLFxyXG4gICAgICAgICAgICBsYWJlbDogdi5wYXJhbXMubmFtZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfTtcclxuICAgIGZldGNoU3RhdHVzKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSBzZWxlY3RlZCA9PiB7XHJcbiAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBzZWxlY3RlZCA/IHNlbGVjdGVkLnZhbHVlIDogJycpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gc3RhdHVzLmZpbmQob3B0ID0+IG9wdC52YWx1ZSA9PT0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXSkgfHwgbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxGb3JtR3JvdXAgbWI9ezU2fT5cclxuICAgICAgPExhYmVsIHJlcXVpcmVkPnsnU2VsZWN0IERvbmF0aW9uIFJlcXVlc3QnfTwvTGFiZWw+XHJcbiAgICAgIDxTZWxlY3RcclxuICAgICAgICBvcHRpb25zPXtzdGF0dXN9XHJcbiAgICAgICAgdmFsdWU9e3NlbGVjdGVkT3B0aW9ufVxyXG4gICAgICAgIGlzTG9hZGluZz17bG9hZGluZ31cclxuICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgIGlzQ2xlYXJhYmxlXHJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgRG9uYXRpb24gUmVxdWVzdFwiXHJcbiAgICAgIC8+XHJcbiAgICAgIHtwcm9wZXJ0eS5kZXNjcmlwdGlvbiAmJiAoXHJcbiAgICAgICAgPEZvcm1NZXNzYWdlPntwcm9wZXJ0eS5kZXNjcmlwdGlvbn08L0Zvcm1NZXNzYWdlPlxyXG4gICAgICApfVxyXG4gICAgPC9Gb3JtR3JvdXA+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERvbmF0aW9uUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBJbnB1dCwgTGFiZWwsIFRleHQgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuaW1wb3J0IHsgdXNlVHJhbnNsYXRpb24gfSBmcm9tICdhZG1pbmpzJztcclxuXHJcbmNvbnN0IExvZ2luQ29tcG9uZW50ID0gKHByb3BzKSA9PiB7XHJcbiAgY29uc3QgW2VtYWlsLCBzZXRFbWFpbF0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgY29uc3QgW3Bhc3N3b3JkLCBzZXRQYXNzd29yZF0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzaG93UGFzc3dvcmQsIHNldFNob3dQYXNzd29yZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgeyB0cmFuc2xhdGVNZXNzYWdlIH0gPSB1c2VUcmFuc2xhdGlvbigpO1xyXG5cclxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgc2V0RXJyb3IoJycpO1xyXG4gICAgc2V0TG9hZGluZyh0cnVlKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvZGFzaGJvYXJkL2xvZ2luJywge1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGVtYWlsLCBwYXNzd29yZCB9KSxcclxuICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBkYXRhLnJlZGlyZWN0VXJsIHx8ICcvZGFzaGJvYXJkJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRFcnJvcihkYXRhLmVycm9yIHx8ICdJbnZhbGlkIGVtYWlsIG9yIHBhc3N3b3JkJyk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdMb2dpbiBlcnJvcjonLCBlcnIpO1xyXG4gICAgICBzZXRFcnJvcignQW4gZXJyb3Igb2NjdXJyZWQuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEJveFxyXG4gICAgICBkaXNwbGF5PVwiZmxleFwiXHJcbiAgICAgIG1pbkhlaWdodD1cIjEwMHZoXCJcclxuICAgICAgc3R5bGU9e3sgZm9udEZhbWlseTogJ0ludGVyLCBzeXN0ZW0tdWksIHNhbnMtc2VyaWYnIH19XHJcbiAgICA+XHJcbiAgICAgIHsvKiBMZWZ0IFNpZGUgLSBCcmFuZGluZyAqL31cclxuICAgICAgPEJveFxyXG4gICAgICAgIGZsZXg9XCIxXCJcclxuICAgICAgICBkaXNwbGF5PXt7IF86ICdub25lJywgbWQ6ICdmbGV4JyB9fVxyXG4gICAgICAgIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIlxyXG4gICAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcclxuICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcclxuICAgICAgICBwPVwieHhsXCJcclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICMyNTYzZWIgMCUsICMxZTQwYWYgMTAwJSknLFxyXG4gICAgICAgICAgY29sb3I6ICd3aGl0ZScsXHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxCb3ggdGV4dEFsaWduPVwiY2VudGVyXCIgc3R5bGU9e3sgbWF4V2lkdGg6ICc1MDBweCcgfX0+XHJcbiAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgIHNyYz1cIi9pbWFnZXMvbG9nby13aGl0ZS5wbmdcIlxyXG4gICAgICAgICAgICBhbHQ9XCJMb2dvXCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgbWF4V2lkdGg6ICcyNTBweCcsIG1hcmdpbkJvdHRvbTogJzJyZW0nIH19XHJcbiAgICAgICAgICAgIG9uRXJyb3I9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzJyZW0nLCBmb250V2VpZ2h0OiAnYm9sZCcsIG1hcmdpbkJvdHRvbTogJzFyZW0nIH19PlxyXG4gICAgICAgICAgICBSZWxpZWYgTWFuYWdlbWVudCBTeXN0ZW1cclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMS4xMjVyZW0nLCBvcGFjaXR5OiAwLjkgfX0+XHJcbiAgICAgICAgICAgIENvb3JkaW5hdGluZyBkaXNhc3RlciByZWxpZWYgZWZmb3J0cyB3aXRoIGVmZmljaWVuY3kgYW5kIGNvbXBhc3Npb25cclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICBkaXNwbGF5PVwiZmxleFwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IGdhcDogJzJyZW0nLCBtYXJnaW5Ub3A6ICczcmVtJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxCb3ggc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzJyZW0nLCBmb250V2VpZ2h0OiAnYm9sZCcgfX0+NTAwKzwvVGV4dD5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzAuODc1cmVtJyB9fT5BaWQgUmVxdWVzdHM8L1RleHQ+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICA8Qm94IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcycmVtJywgZm9udFdlaWdodDogJ2JvbGQnIH19PjEyMDArPC9UZXh0PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMC44NzVyZW0nIH19PkRvbmF0aW9uczwvVGV4dD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgIDxCb3ggc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzJyZW0nLCBmb250V2VpZ2h0OiAnYm9sZCcgfX0+NTArPC9UZXh0PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMC44NzVyZW0nIH19PlJlbGllZiBDZW50ZXJzPC9UZXh0PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgICA8L0JveD5cclxuXHJcbiAgICAgIHsvKiBSaWdodCBTaWRlIC0gTG9naW4gRm9ybSAqL31cclxuICAgICAgPEJveFxyXG4gICAgICAgIGZsZXg9XCIxXCJcclxuICAgICAgICBkaXNwbGF5PVwiZmxleFwiXHJcbiAgICAgICAgZmxleERpcmVjdGlvbj1cImNvbHVtblwiXHJcbiAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIlxyXG4gICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxyXG4gICAgICAgIHA9XCJ4eGxcIlxyXG4gICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogJyNmOWZhZmInIH19XHJcbiAgICAgID5cclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICBiZz1cIndoaXRlXCJcclxuICAgICAgICAgIHA9XCJ4eGxcIlxyXG4gICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMC41cmVtJyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiAnMCAxcHggM3B4IDAgcmdiYSgwLCAwLCAwLCAwLjEpJyxcclxuICAgICAgICAgICAgd2lkdGg6ICc0NTBweCcsXHJcbiAgICAgICAgICAgIG1heFdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxCb3ggbWI9XCJ4bFwiPlxyXG4gICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzEuNXJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjMTExODI3JyB9fT5cclxuICAgICAgICAgICAgICBTaWduIEluXHJcbiAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxcmVtJywgY29sb3I6ICcjNmI3MjgwJywgbWFyZ2luVG9wOiAnMC41cmVtJyB9fT5cclxuICAgICAgICAgICAgICBFbnRlciB5b3VyIGNyZWRlbnRpYWxzIHRvIGFjY2VzcyB0aGUgZGFzaGJvYXJkXHJcbiAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICAgIHtlcnJvciAmJiAoXHJcbiAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICBwPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgbWI9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZlZjJmMicsXHJcbiAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2ZlZTJlMicsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcwLjM3NXJlbScsXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGNvbG9yOiAnI2RjMjYyNicsIGZvbnRTaXplOiAnMC44NzVyZW0nIH19PlxyXG4gICAgICAgICAgICAgICAg4pqg77iPIHtlcnJvcn1cclxuICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cclxuICAgICAgICAgICAgPEJveCBtYj1cImxnXCI+XHJcbiAgICAgICAgICAgICAgPExhYmVsIGh0bWxGb3I9XCJlbWFpbFwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgRW1haWwgQWRkcmVzc1xyXG4gICAgICAgICAgICAgIDwvTGFiZWw+XHJcbiAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICBpZD1cImVtYWlsXCJcclxuICAgICAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZW1haWx9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEVtYWlsKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiYWRtaW5AZXhhbXBsZS5jb21cIlxyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtsb2FkaW5nfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEycHgnLFxyXG4gICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICAgIDxCb3ggbWI9XCJkZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgPExhYmVsIGh0bWxGb3I9XCJwYXNzd29yZFwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgUGFzc3dvcmRcclxuICAgICAgICAgICAgICA8L0xhYmVsPlxyXG4gICAgICAgICAgICAgIDxCb3ggc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScgfX0+XHJcbiAgICAgICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICAgICAgaWQ9XCJwYXNzd29yZFwiXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9e3Nob3dQYXNzd29yZCA/ICd0ZXh0JyA6ICdwYXNzd29yZCd9XHJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtwYXNzd29yZH1cclxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRQYXNzd29yZChlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBwYXNzd29yZFwiXHJcbiAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtsb2FkaW5nfVxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEycHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiAnNDVweCcsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd1Bhc3N3b3JkKCFzaG93UGFzc3dvcmQpfVxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnMTJweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnNTAlJyxcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJyxcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNmI3MjgwJyxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge3Nob3dQYXNzd29yZCA/ICfwn5GB77iPJyA6ICfwn5GB77iP4oCN8J+XqO+4jyd9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAgICA8Qm94IG1iPVwieGxcIiBzdHlsZT17eyBtYXJnaW5Ub3A6ICcxcmVtJyB9fT5cclxuICAgICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcclxuICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJwcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtsb2FkaW5nfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzE0cHgnLFxyXG4gICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxyXG4gICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnNjAwJyxcclxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogbG9hZGluZyA/ICcjOWNhM2FmJyA6ICcjMjU2M2ViJyxcclxuICAgICAgICAgICAgICAgICAgY3Vyc29yOiBsb2FkaW5nID8gJ25vdC1hbGxvd2VkJyA6ICdwb2ludGVyJyxcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2xvYWRpbmcgPyAoXHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1hcmdpblJpZ2h0OiAnOHB4JyB9fT7ij7M8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgU2lnbmluZyBpbi4uLlxyXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICAnU2lnbiBJbidcclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgPC9mb3JtPlxyXG5cclxuICAgICAgICAgIDxCb3ggc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnMS41cmVtJyB9fT5cclxuICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcwLjg3NXJlbScsIGNvbG9yOiAnIzZiNzI4MCcgfX0+XHJcbiAgICAgICAgICAgICAgRG9uJ3QgaGF2ZSBhbiBhY2NvdW50P3snICd9XHJcbiAgICAgICAgICAgICAgPFRleHRcclxuICAgICAgICAgICAgICAgIGFzPVwic3BhblwiXHJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogJyMyNTYzZWInLCBmb250V2VpZ2h0OiAnYm9sZCcsIGN1cnNvcjogJ3BvaW50ZXInIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgQ29udGFjdCBBZG1pbmlzdHJhdG9yXHJcbiAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8L0JveD5cclxuICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICcxcmVtJyB9fT5cclxuICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMC43NXJlbScsIGNvbG9yOiAnIzZiNzI4MCcgfX0+XHJcbiAgICAgICAgICAgIMKpIDIwMjQgUmVsaWVmIE1hbmFnZW1lbnQgU3lzdGVtLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgICA8L0JveD5cclxuICAgIDwvQm94PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMb2dpbkNvbXBvbmVudDsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IEltYWdlQ29tcG9uZW50ID0gKHByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IHJlY29yZCwgcHJvcGVydHkgfSA9IHByb3BzO1xyXG4gICAgY29uc3QgaW1hZ2VVcmwgPSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdO1xyXG5cclxuICAgIGlmICghaW1hZ2VVcmwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxCb3g+XHJcbiAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgIHNyYz17aW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgICBhbHQ9e3Byb3BlcnR5LmxhYmVsfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgbWF4V2lkdGg6ICcxMDBweCcsIG1heEhlaWdodDogJzEwMHB4Jywgb2JqZWN0Rml0OiAnY292ZXInIH19XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VDb21wb25lbnQ7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgSW1hZ2VMaXN0Q29tcG9uZW50ID0gKHByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IHJlY29yZCwgcHJvcGVydHkgfSA9IHByb3BzO1xyXG5cclxuICAgIGNvbnN0IGltYWdlcyA9IFtdO1xyXG4gICAgLy8gQ2hlY2sgZm9yIGZsYXR0ZW5lZCBrZXlzIGxpa2UgJ3Byb29mSW1hZ2VzLjAnLCAncHJvb2ZJbWFnZXMuMScsIGV0Yy5cclxuICAgIE9iamVjdC5rZXlzKHJlY29yZC5wYXJhbXMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAvLyBDaGVjayBpZiBrZXkgc3RhcnRzIHdpdGggcHJvcGVydHkgbmFtZSBhbmQgZm9sbG93cyB3aXRoIC5pbmRleFxyXG4gICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aChgJHtwcm9wZXJ0eS5uYW1lfS5gKSAmJiAhaXNOYU4oa2V5LnNwbGl0KCcuJykucG9wKCkpKSB7XHJcbiAgICAgICAgICAgIGltYWdlcy5wdXNoKHJlY29yZC5wYXJhbXNba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGltYWdlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBmbGV4RGlyZWN0aW9uPVwicm93XCIgZmxleFdyYXA9XCJ3cmFwXCIgZ2FwPXsyfT5cclxuICAgICAgICAgICAge2ltYWdlcy5tYXAoKHVybCwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgICAgICAgICAgIHNyYz17dXJsfVxyXG4gICAgICAgICAgICAgICAgICAgIGFsdD17YCR7cHJvcGVydHkubGFiZWx9LSR7aW5kZXh9YH1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXhXaWR0aDogJzEwMHB4JywgbWF4SGVpZ2h0OiAnMTAwcHgnLCBvYmplY3RGaXQ6ICdjb3ZlcicgfX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEltYWdlTGlzdENvbXBvbmVudDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCwgSW5wdXQsIExhYmVsIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBJbWFnZUVkaXRDb21wb25lbnQgPSAocHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSA9IHByb3BzO1xyXG4gICAgY29uc3QgdmFsdWUgPSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdIHx8ICcnO1xyXG4gICAgY29uc3QgW2ltYWdlVXJsLCBzZXRJbWFnZVVybF0gPSB1c2VTdGF0ZSh2YWx1ZSk7XHJcblxyXG4gICAgLy8gVXBkYXRlIGxvY2FsIHN0YXRlIGlmIHJlY29yZCBjaGFuZ2VzIGZyb20gb3V0c2lkZSAoZS5nLiByZWxvYWQpXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIHNldEltYWdlVXJsKHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0gfHwgJycpO1xyXG4gICAgfSwgW3JlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV1dKTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVJbnB1dENoYW5nZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHNldEltYWdlVXJsKG5ld1ZhbHVlKTtcclxuICAgICAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBuZXdWYWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveCBtYXJnaW5Cb3R0b209XCJ4eGxcIj5cclxuICAgICAgICAgICAgPExhYmVsIGh0bWxGb3I9e3Byb3BlcnR5Lm5hbWV9Pntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxyXG4gICAgICAgICAgICB7aW1hZ2VVcmwgJiYgKFxyXG4gICAgICAgICAgICAgICAgPEJveCBtYXJnaW5Cb3R0b209XCJkZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2ltYWdlVXJsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJQcmV2aWV3XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWF4V2lkdGg6ICcyMDBweCcsIG1heEhlaWdodDogJzIwMHB4Jywgb2JqZWN0Rml0OiAnY292ZXInLCBkaXNwbGF5OiAnYmxvY2snLCBtYXJnaW5Cb3R0b206ICc4cHgnLCBib3JkZXI6ICcxcHggc29saWQgI2RkZCcsIHBhZGRpbmc6ICc0cHgnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRXJyb3I9eyhlKSA9PiB7IGUudGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICAgIGlkPXtwcm9wZXJ0eS5uYW1lfVxyXG4gICAgICAgICAgICAgICAgbmFtZT17cHJvcGVydHkubmFtZX1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXtpbWFnZVVybH1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cclxuICAgICAgICAgICAgICAgIHdpZHRoPXsxfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEltYWdlRWRpdENvbXBvbmVudDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCwgTGFiZWwsIElucHV0LCBCdXR0b24sIEljb24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IEltYWdlTGlzdEVkaXRDb21wb25lbnQgPSAocHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSA9IHByb3BzO1xyXG5cclxuICAgIC8vIEZsYXR0ZW5lZCBwYXJhbXMgYXJlIHN0b3JlZCBsaWtlICdwcm9vZkltYWdlcy4wJzogJ3VybDEnLCAncHJvb2ZJbWFnZXMuMSc6ICd1cmwyJ1xyXG4gICAgLy8gV2UgbmVlZCB0byByZWNvbnN0cnVjdCB0aGUgYXJyYXlcclxuICAgIGNvbnN0IGdldEltYWdlcyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBpbWFnZXMgPSBbXTtcclxuICAgICAgICBPYmplY3Qua2V5cyhyZWNvcmQucGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aChgJHtwcm9wZXJ0eS5uYW1lfS5gKSAmJiAhaXNOYU4oa2V5LnNwbGl0KCcuJykucG9wKCkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHBhcnNlSW50KGtleS5zcGxpdCgnLicpLnBvcCgpLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBpbWFnZXNbaW5kZXhdID0gcmVjb3JkLnBhcmFtc1trZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gRmlsdGVyIG91dCBlbXB0eSBzbG90cyBpZiBhbnkgaG9sZSBleGlzdHMsIHRob3VnaCBub3JtYWxseSBhZG1pbmpzIGhhbmRsZXMgc2VxdWVudGlhbCBrZXlzXHJcbiAgICAgICAgcmV0dXJuIGltYWdlcy5maWx0ZXIoaW1nID0+IGltZyAhPT0gdW5kZWZpbmVkKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgW2ltYWdlcywgc2V0SW1hZ2VzXSA9IHVzZVN0YXRlKGdldEltYWdlcygpKTtcclxuXHJcbiAgICAvLyBIZWxwZXIgdG8gbm90aWZ5IEFkbWluSlMgb2YgY2hhbmdlc1xyXG4gICAgLy8gQWRtaW5KUyBleHBlY3RzIGZsYXQga2V5cyBmb3IgYXJyYXlzOiAncHJvcGVydHkuMCcsICdwcm9wZXJ0eS4xJ1xyXG4gICAgY29uc3QgdXBkYXRlUmVjb3JkID0gKG5ld0ltYWdlcykgPT4ge1xyXG4gICAgICAgIHNldEltYWdlcyhuZXdJbWFnZXMpO1xyXG5cclxuICAgICAgICAvLyAxLiBDbGVhciBleGlzdGluZyBrZXlzIGZvciB0aGlzIHByb3BlcnR5XHJcbiAgICAgICAgLy8gV2UgY2FuJ3QgcmVhbGx5IFwiZGVsZXRlXCIga2V5cyBlYXNpbHkgdmlhIG9uQ2hhbmdlIGluIHRoZSBzdGFuZGFyZCB3YXkgd2l0aG91dCBwb3RlbnRpYWxseSBsZWF2aW5nIGdhcmJhZ2UsXHJcbiAgICAgICAgLy8gYnV0IHN0YW5kYXJkIGFkbWluanMgaGFuZGxpbmcgZXhwZWN0cyB1cyB0byBvdmVyd3JpdGUuXHJcbiAgICAgICAgLy8gSG93ZXZlciwgdGhlIGNsZWFuZXN0IHdheSB0byBzeW5jIGFuIGFycmF5IGlzIHRvIHVwZGF0ZSBlYWNoIGluZGV4LlxyXG5cclxuICAgICAgICAvLyBJZGVhbGx5IHdlIHNob3VsZCBudWxsaWZ5IG9sZCBrZXlzIGlmIGFycmF5IHNocmlua3MsIGJ1dCBzdGFuZGFyZCBiZWhhdmlvciBtaWdodCBqdXN0IGhhbmRsZSB3aGF0IHdlIHNlbmQuXHJcbiAgICAgICAgLy8gQSBzYWZlciBiZXQgaXMgdG8gcmVseSBvbiBBZG1pbkpTJ3MgaW50ZXJuYWwgaGFuZGxpbmcgaWYgd2Ugd2VyZSBwYXNzaW5nIHRoZSB3aG9sZSBvYmplY3QsIFxyXG4gICAgICAgIC8vIGJ1dCBoZXJlIHdlIGFyZSBhIGNvbXBvbmVudC5cclxuXHJcbiAgICAgICAgLy8gV2Ugd2lsbCBqdXN0IHVwZGF0ZSAncHJvcGVydHkuMCcsICdwcm9wZXJ0eS4xJyBldGMuXHJcbiAgICAgICAgLy8gQW5kIGlkZWFsbHkgd2UgbWlnaHQgbmVlZCB0byBjbGVhciAncHJvcGVydHkuMicgaWYgd2Ugd2VudCBmcm9tIDMgaXRlbXMgdG8gMi5cclxuICAgICAgICAvLyBUbyBwcm9wZXJseSBcImNsZWFyXCIgd2UgbWlnaHQgbmVlZCB0byBzZXQgaXQgdG8gbnVsbCBvciB1bmRlZmluZWQuXHJcblxyXG4gICAgICAgIC8vIFN0cmF0ZWd5OiBVcGRhdGUgYWxsIGN1cnJlbnQgaW5kaWNlcy4gXHJcbiAgICAgICAgLy8gSWYgdGhlIGFycmF5IHNocmFuaywgd2UgY2FuIHRyeSBzZXR0aW5nIHRoZSBuZXh0IGluZGV4IHRvIG51bGwvdW5kZWZpbmVkIHRvIHNlZSBpZiBiYWNrZW5kIGhhbmRsZXMgaXQsXHJcbiAgICAgICAgLy8gb3IganVzdCByZWx5IG9uIHRoZSBmYWN0IHRoYXQgd2UgYXJlIHJld3JpdGluZyB0aGUgcGFyYW1zLlxyXG5cclxuICAgICAgICAvLyBBY3R1YWxseSwgb25DaGFuZ2UgZXhwZWN0cyAoa2V5LCB2YWx1ZSkuXHJcbiAgICAgICAgLy8gV2UgbmVlZCB0byB1cGRhdGUgbXVsdGlwbGUga2V5cy4gQWRtaW5KUyBgb25DaGFuZ2VgIG1pZ2h0IG5vdCBzdXBwb3J0IGJhdGNoIHVwZGF0ZXMgZWFzaWx5IGRlcGVuZGluZyBvbiB2ZXJzaW9uLlxyXG4gICAgICAgIC8vIEJ1dCB1c3VhbGx5IGl0J3MgYG9uQ2hhbmdlKHByb3BlcnR5LCB2YWx1ZSlgIHdoZXJlIHZhbHVlIGlzIHRoZSBmdWxsIHZhbHVlPyBcclxuICAgICAgICAvLyBObywgZm9yIGFycmF5IHByb3BlcnRpZXMsIEFkbWluSlMgb2Z0ZW4gdHJlYXRzIHRoZW0gZXNzZW50aWFsbHkgYXMgaW5kaXZpZHVhbCBmaWVsZHMgaWYgZmxhdHRlbmVkLlxyXG5cclxuICAgICAgICAvLyBXQUlUOiBJZiB3ZSB1c2UgYSBjdXN0b20gY29tcG9uZW50IGZvciB0aGUgKmVudGlyZSBhcnJheSBwcm9wZXJ0eSosIGBvbkNoYW5nZWAgbWlnaHQgYWNjZXB0IHRoZSBhcnJheSBpdHNlbGZcclxuICAgICAgICAvLyBpZiB0aGUgYmFja2VuZCBhZGFwdGVyIHN1cHBvcnRzIGl0LiBCdXQgQWRtaW5KUyBvZnRlbiBmbGF0dGVucy5cclxuXHJcbiAgICAgICAgLy8gTGV0J3MgY2hlY2sgaG93IHN0YW5kYXJkIGFycmF5IGVkaXRpbmcgd29ya3MuXHJcbiAgICAgICAgLy8gSWYgd2UgbG9vayBhdCBleGlzdGluZyBgSW1hZ2VMaXN0Q29tcG9uZW50YCwgaXQgcmVhZHMgZnJvbSBgcmVjb3JkLnBhcmFtc2AuXHJcblxyXG4gICAgICAgIC8vIExldCdzIHRyeSBzZW5kaW5nIHRoZSBhcnJheSB0byBgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgbmV3SW1hZ2VzKWAuXHJcbiAgICAgICAgLy8gTWFueSBBZG1pbkpTIGFkYXB0ZXJzIChsaWtlIE1vbmdvb3NlKSBoYW5kbGUgdGhlIGFycmF5IGlmIHBhc3NlZCBhcyBhIHZhbHVlIHRvIHRoZSBtYWluIHByb3BlcnR5IGtleS5cclxuICAgICAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBuZXdJbWFnZXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVBZGQgPSAoKSA9PiB7XHJcbiAgICAgICAgdXBkYXRlUmVjb3JkKFsuLi5pbWFnZXMsICcnXSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVJlbW92ZSA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5ld0ltYWdlcyA9IFsuLi5pbWFnZXNdO1xyXG4gICAgICAgIG5ld0ltYWdlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIHVwZGF0ZVJlY29yZChuZXdJbWFnZXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoaW5kZXgsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV3SW1hZ2VzID0gWy4uLmltYWdlc107XHJcbiAgICAgICAgbmV3SW1hZ2VzW2luZGV4XSA9IHZhbHVlO1xyXG4gICAgICAgIHVwZGF0ZVJlY29yZChuZXdJbWFnZXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxCb3ggbWFyZ2luQm90dG9tPVwieHhsXCI+XHJcbiAgICAgICAgICAgIDxMYWJlbD57cHJvcGVydHkubGFiZWx9PC9MYWJlbD5cclxuICAgICAgICAgICAge2ltYWdlcy5tYXAoKHVybCwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgIDxCb3gga2V5PXtpbmRleH0gbWFyZ2luQm90dG9tPVwiZGVmYXVsdFwiIGRpc3BsYXk9XCJmbGV4XCIgYWxpZ25JdGVtcz1cImNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCb3ggbWFyZ2luUmlnaHQ9XCJkZWZhdWx0XCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dXJsICYmIDxpbWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17dXJsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PXtgSW1hZ2UgJHtpbmRleCArIDF9YH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiAnNTBweCcsIGhlaWdodDogJzUwcHgnLCBvYmplY3RGaXQ6ICdjb3ZlcicsIGJvcmRlclJhZGl1czogJzRweCcgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXJyb3I9eyhlKSA9PiB7IGUudGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgICAgIDxCb3ggZmxleEdyb3c9ezF9IG1hcmdpblJpZ2h0PVwiZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt1cmx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUNoYW5nZShpbmRleCwgZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkltYWdlIFVSTFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVSZW1vdmUoaW5kZXgpfSB2YXJpYW50PVwiZGFuZ2VyXCIgc2l6ZT1cImljb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gaWNvbj1cIlRyYXNoMlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17aGFuZGxlQWRkfSB0eXBlPVwiYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICA8SWNvbiBpY29uPVwiUGx1c1wiIC8+IEFkZCBJbWFnZSBVUkxcclxuICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VMaXN0RWRpdENvbXBvbmVudDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEFwaUNsaWVudCwgdXNlUmVjb3JkLCB1c2VOb3RpY2UgfSBmcm9tICdhZG1pbmpzJztcclxuaW1wb3J0IHtcclxuICAgIEJveCxcclxuICAgIEgzLFxyXG4gICAgTGFiZWwsXHJcbiAgICBJbnB1dCxcclxuICAgIFNlbGVjdCxcclxuICAgIEJ1dHRvbixcclxuICAgIEZvcm1Hcm91cCxcclxuICAgIENoZWNrQm94LFxyXG4gICAgVGV4dCxcclxuICAgIExvYWRlcixcclxuICAgIE1lc3NhZ2VCb3gsXHJcbn0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XHJcbi8vIFVzZSBlbXB0eSBzdHJpbmcgZm9yIHJlbGF0aXZlIFVSTCBzaW5jZSBBZG1pbkpTIHJ1bnMgb24gdGhlIHNhbWUgc2VydmVyXHJcbmNvbnN0IEJBU0VfVVJMID0gJyc7XHJcblxyXG5jb25zdCBDcmVhdGVUYXNrRnJvbUFpZFJlcXVlc3QgPSAocHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgcmVjb3JkLCByZXNvdXJjZSB9ID0gcHJvcHM7XHJcbiAgICBjb25zdCBhZGROb3RpY2UgPSB1c2VOb3RpY2UoKTtcclxuXHJcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgICBjb25zdCBbdm9sdW50ZWVycywgc2V0Vm9sdW50ZWVyc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgICBjb25zdCBbc2VhcmNoUXVlcnksIHNldFNlYXJjaFF1ZXJ5XSA9IHVzZVN0YXRlKCcnKTtcclxuICAgIGNvbnN0IFtmb3JtRGF0YSwgc2V0Rm9ybURhdGFdID0gdXNlU3RhdGUoe1xyXG4gICAgICAgIHRhc2tOYW1lOiByZWNvcmQ/LnBhcmFtcz8ubmFtZSB8fCAnQWlkIFJlcXVlc3QgVGFzaycsXHJcbiAgICAgICAgdm9sdW50ZWVyc05lZWRlZDogMSxcclxuICAgICAgICBpc09wZW46IHRydWUsXHJcbiAgICAgICAgcHJpb3JpdHk6IHJlY29yZD8ucGFyYW1zPy5wcmlvcml0eSB8fCAnbWVkaXVtJyxcclxuICAgICAgICBzZWxlY3RlZFZvbHVudGVlcnM6IFtdLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBbaGFzRXhpc3RpbmdUYXNrLCBzZXRIYXNFeGlzdGluZ1Rhc2tdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIHRhc2sgYWxyZWFkeSBleGlzdHMgZm9yIHRoaXMgYWlkIHJlcXVlc3RcclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2hlY2tFeGlzdGluZ1Rhc2sgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5yZXNvdXJjZUFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VJZDogJ1Rhc2tTY2hlbWEnLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdsaXN0JyxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHsgJ2ZpbHRlcnMuYWlkUmVxdWVzdCc6IHJlY29yZC5pZCB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YT8ucmVjb3Jkcz8ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEhhc0V4aXN0aW5nVGFzayh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNoZWNraW5nIGV4aXN0aW5nIHRhc2s6JywgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjaGVja0V4aXN0aW5nVGFzaygpO1xyXG4gICAgfSwgW3JlY29yZC5pZF0pO1xyXG5cclxuICAgIC8vIEZldGNoIHZvbHVudGVlcnNcclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZmV0Y2hWb2x1bnRlZXJzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlSWQ6ICd1c2VyUHJvZmlsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ2xpc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZmlsdGVycy5yb2xlJzogJ3ZvbHVudGVlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlclBhZ2U6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHNlYXJjaFF1ZXJ5ICYmIHsgJ2ZpbHRlcnMubmFtZSc6IHNlYXJjaFF1ZXJ5IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhPy5yZWNvcmRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0Vm9sdW50ZWVycyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5yZWNvcmRzLm1hcCgodikgPT4gKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGAke3YucGFyYW1zLm5hbWV9ICgke3YucGFyYW1zLnNraWxsIHx8ICdObyBza2lsbCd9KWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB2b2x1bnRlZXJzOicsIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZmV0Y2hWb2x1bnRlZXJzKCk7XHJcbiAgICB9LCBbc2VhcmNoUXVlcnldKTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICAgICAgICAgICAgYCR7QkFTRV9VUkx9L2FwaS9hZG1pbi90YXNrL2NyZWF0ZS1mcm9tLWFpZC1yZXF1ZXN0LyR7cmVjb3JkLmlkfWAsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tOYW1lOiBmb3JtRGF0YS50YXNrTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm9sdW50ZWVyc05lZWRlZDogZm9ybURhdGEudm9sdW50ZWVyc05lZWRlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNPcGVuOiBmb3JtRGF0YS5pc09wZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW9yaXR5OiBmb3JtRGF0YS5wcmlvcml0eSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWRWb2x1bnRlZXJzOiBmb3JtRGF0YS5pc09wZW4gPyBbXSA6IGZvcm1EYXRhLnNlbGVjdGVkVm9sdW50ZWVycyxcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBhZGROb3RpY2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdUYXNrIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5IScsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBSZWRpcmVjdCBiYWNrIHRvIHRoZSBhaWQgcmVxdWVzdCBsaXN0XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvZGFzaGJvYXJkL3Jlc291cmNlcy9BaWRSZXF1ZXN0JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFkZE5vdGljZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGF0YS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gY3JlYXRlIHRhc2snLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNyZWF0aW5nIHRhc2s6JywgZXJyb3IpO1xyXG4gICAgICAgICAgICBhZGROb3RpY2Uoe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ0Vycm9yIGNyZWF0aW5nIHRhc2suIFBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlVm9sdW50ZWVyU2VsZWN0ID0gKHNlbGVjdGVkKSA9PiB7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZvbHVudGVlcnMgPSBBcnJheS5pc0FycmF5KHNlbGVjdGVkKVxyXG4gICAgICAgICAgICAgICAgPyBzZWxlY3RlZC5tYXAoKHMpID0+IHMudmFsdWUpLnNsaWNlKDAsIGZvcm1EYXRhLnZvbHVudGVlcnNOZWVkZWQpXHJcbiAgICAgICAgICAgICAgICA6IFtzZWxlY3RlZC52YWx1ZV07XHJcbiAgICAgICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoe1xyXG4gICAgICAgICAgICAgICAgLi4ucHJldixcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVm9sdW50ZWVyczogbmV3Vm9sdW50ZWVycyxcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoe1xyXG4gICAgICAgICAgICAgICAgLi4ucHJldixcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVm9sdW50ZWVyczogW10sXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChoYXNFeGlzdGluZ1Rhc2spIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8Qm94IHZhcmlhbnQ9XCJncmV5XCIgcGFkZGluZz1cInhsXCI+XHJcbiAgICAgICAgICAgICAgICA8TWVzc2FnZUJveCB2YXJpYW50PVwiZGFuZ2VyXCIgbWVzc2FnZT1cIkEgdGFzayBhbHJlYWR5IGV4aXN0cyBmb3IgdGhpcyBhaWQgcmVxdWVzdC5cIiAvPlxyXG4gICAgICAgICAgICAgICAgPEJveCBtYXJnaW5Ub3A9XCJsZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiAod2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2Rhc2hib2FyZC9yZXNvdXJjZXMvQWlkUmVxdWVzdCcpfVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgQmFjayB0byBBaWQgUmVxdWVzdHNcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveCB2YXJpYW50PVwiZ3JleVwiIHBhZGRpbmc9XCJ4bFwiPlxyXG4gICAgICAgICAgICA8SDM+Q3JlYXRlIFRhc2sgZnJvbSBBaWQgUmVxdWVzdDwvSDM+XHJcbiAgICAgICAgICAgIDxUZXh0IG1hcmdpbkJvdHRvbT1cImxnXCI+XHJcbiAgICAgICAgICAgICAgICBDcmVhdGluZyB0YXNrIGZvcjogPHN0cm9uZz57cmVjb3JkPy5wYXJhbXM/Lm5hbWUgfHwgJ1Vua25vd24gUmVxdWVzdCd9PC9zdHJvbmc+XHJcbiAgICAgICAgICAgIDwvVGV4dD5cclxuXHJcbiAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxyXG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cD5cclxuICAgICAgICAgICAgICAgICAgICA8TGFiZWw+VGFzayBOYW1lPC9MYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLnRhc2tOYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRGb3JtRGF0YSgocHJldikgPT4gKHsgLi4ucHJldiwgdGFza05hbWU6IGUudGFyZ2V0LnZhbHVlIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG5cclxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgICAgPExhYmVsPlByaW9yaXR5PC9MYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8U2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt7IHZhbHVlOiBmb3JtRGF0YS5wcmlvcml0eSwgbGFiZWw6IGZvcm1EYXRhLnByaW9yaXR5IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICdoaWdoJywgbGFiZWw6ICdIaWdoJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJ21lZGl1bScsIGxhYmVsOiAnTWVkaXVtJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJ2xvdycsIGxhYmVsOiAnTG93JyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHNlbGVjdGVkKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Rm9ybURhdGEoKHByZXYpID0+ICh7IC4uLnByZXYsIHByaW9yaXR5OiBzZWxlY3RlZC52YWx1ZSB9KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuXHJcbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMYWJlbD5Wb2x1bnRlZXJzIE5lZWRlZDwvTGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW49XCIxXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLnZvbHVudGVlcnNOZWVkZWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9sdW50ZWVyc05lZWRlZDogcGFyc2VJbnQoZS50YXJnZXQudmFsdWUsIDEwKSB8fCAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcblxyXG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cD5cclxuICAgICAgICAgICAgICAgICAgICA8Q2hlY2tCb3hcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJpc09wZW5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtmb3JtRGF0YS5pc09wZW59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Rm9ybURhdGEoKHByZXYpID0+ICh7IC4uLnByZXYsIGlzT3BlbjogIXByZXYuaXNPcGVuIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8TGFiZWwgaW5saW5lIGh0bWxGb3I9XCJpc09wZW5cIiBtYXJnaW5MZWZ0PVwiZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPcGVuIFRhc2sgKHZvbHVudGVlcnMgY2FuIGNsYWltIGZyb20gbWFya2V0cGxhY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgPC9MYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG5cclxuICAgICAgICAgICAgICAgIHshZm9ybURhdGEuaXNPcGVuICYmIChcclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3NpZ24gVm9sdW50ZWVycyB7Zm9ybURhdGEudm9sdW50ZWVyc05lZWRlZCA+IDEgJiYgYChtYXggJHtmb3JtRGF0YS52b2x1bnRlZXJzTmVlZGVkfSlgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc011bHRpPXtmb3JtRGF0YS52b2x1bnRlZXJzTmVlZGVkID4gMX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VhcmNoYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17dm9sdW50ZWVyc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt2b2x1bnRlZXJzLmZpbHRlcih2ID0+IGZvcm1EYXRhLnNlbGVjdGVkVm9sdW50ZWVycy5pbmNsdWRlcyh2LnZhbHVlKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHNlbGVjdGVkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRGb3JtRGF0YShwcmV2ID0+ICh7IC4uLnByZXYsIHNlbGVjdGVkVm9sdW50ZWVyczogW10gfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlcyA9IEFycmF5LmlzQXJyYXkoc2VsZWN0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gc2VsZWN0ZWQuc2xpY2UoMCwgZm9ybURhdGEudm9sdW50ZWVyc05lZWRlZCkubWFwKHMgPT4gcy52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbc2VsZWN0ZWQudmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEZvcm1EYXRhKHByZXYgPT4gKHsgLi4ucHJldiwgc2VsZWN0ZWRWb2x1bnRlZXJzOiBuZXdWYWx1ZXMgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtmb3JtRGF0YS52b2x1bnRlZXJzTmVlZGVkID4gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYFNlbGVjdCB1cCB0byAke2Zvcm1EYXRhLnZvbHVudGVlcnNOZWVkZWR9IHZvbHVudGVlcnMuLi5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlNlbGVjdCBhIHZvbHVudGVlci4uLlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybURhdGEuc2VsZWN0ZWRWb2x1bnRlZXJzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgbWFyZ2luVG9wPVwic21cIiBjb2xvcj1cImdyZXk2MFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdGVkOiB7Zm9ybURhdGEuc2VsZWN0ZWRWb2x1bnRlZXJzLmxlbmd0aH0ve2Zvcm1EYXRhLnZvbHVudGVlcnNOZWVkZWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcbiAgICAgICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgICAgIDxCb3ggbWFyZ2luVG9wPVwieGxcIj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJzdWJtaXRcIiB2YXJpYW50PVwicHJpbWFyeVwiIGRpc2FibGVkPXtsb2FkaW5nfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2xvYWRpbmcgPyA8TG9hZGVyIC8+IDogJ0NyZWF0ZSBUYXNrJ31cclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gKHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9kYXNoYm9hcmQvcmVzb3VyY2VzL0FpZFJlcXVlc3QnKX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENhbmNlbFxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICA8L0JveD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDcmVhdGVUYXNrRnJvbUFpZFJlcXVlc3Q7XHJcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmRcbmltcG9ydCBMaW5rQ29tcG9uZW50IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9MaW5rQ29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5MaW5rQ29tcG9uZW50ID0gTGlua0NvbXBvbmVudFxuaW1wb3J0IFZvbHVudGVlckZpbHRlcmVkU2VsZWN0IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Wb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3QgPSBWb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdFxuaW1wb3J0IFN0YXR1c0ZpbHRlcmVkU2VsZWN0IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9BaWRSZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlN0YXR1c0ZpbHRlcmVkU2VsZWN0ID0gU3RhdHVzRmlsdGVyZWRTZWxlY3RcbmltcG9ydCBEb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRvbmF0aW9uUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0ID0gRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3RcbmltcG9ydCBMb2dpbkNvbXBvbmVudCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTG9naW5Db21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkxvZ2luQ29tcG9uZW50ID0gTG9naW5Db21wb25lbnRcbmltcG9ydCBJbWFnZUNvbXBvbmVudCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSW1hZ2VDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlQ29tcG9uZW50ID0gSW1hZ2VDb21wb25lbnRcbmltcG9ydCBJbWFnZUxpc3RDb21wb25lbnQgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlTGlzdENvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuSW1hZ2VMaXN0Q29tcG9uZW50ID0gSW1hZ2VMaXN0Q29tcG9uZW50XG5pbXBvcnQgSW1hZ2VFZGl0Q29tcG9uZW50IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUVkaXRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlRWRpdENvbXBvbmVudCA9IEltYWdlRWRpdENvbXBvbmVudFxuaW1wb3J0IEltYWdlTGlzdEVkaXRDb21wb25lbnQgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlTGlzdEVkaXRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlTGlzdEVkaXRDb21wb25lbnQgPSBJbWFnZUxpc3RFZGl0Q29tcG9uZW50XG5pbXBvcnQgQ3JlYXRlVGFza0Zyb21BaWRSZXF1ZXN0IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9DcmVhdGVUYXNrRnJvbUFpZFJlcXVlc3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNyZWF0ZVRhc2tGcm9tQWlkUmVxdWVzdCA9IENyZWF0ZVRhc2tGcm9tQWlkUmVxdWVzdCJdLCJuYW1lcyI6WyJEYXNoYm9hcmQiLCJjdXJyZW50QWRtaW4iLCJ1c2VDdXJyZW50QWRtaW4iLCJzdGF0cyIsInNldFN0YXRzIiwidXNlU3RhdGUiLCJhaWRSZXF1ZXN0cyIsImRvbmF0aW9ucyIsInRhc2tzIiwidXNlcnMiLCJ1c2VFZmZlY3QiLCJmZXRjaFN0YXRzIiwiYXBpIiwiQXBpQ2xpZW50IiwiZXJyb3IiLCJjb25zb2xlIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiQm94IiwibWIiLCJIMiIsIlRleHQiLCJtdCIsImVtYWlsIiwiZGlzcGxheSIsImZsZXhXcmFwIiwiZ2FwIiwiZmxleCIsIm1pbldpZHRoIiwiYmciLCJwIiwiYm9yZGVyUmFkaXVzIiwiYm94U2hhZG93IiwiSDUiLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJjb2xvciIsImFzIiwiaHJlZiIsImJvcmRlciIsInN0eWxlIiwidGV4dERlY29yYXRpb24iLCJjdXJzb3IiLCJEYXRlIiwidG9Mb2NhbGVTdHJpbmciLCJMaW5rQ29tcG9uZW50IiwicHJvcHMiLCJyZWNvcmQiLCJsYXQiLCJwYXJhbXMiLCJsb25nIiwibG9nIiwibWFwc0xpbmsiLCJ0YXJnZXQiLCJyZWwiLCJWb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdCIsInByb3BlcnR5Iiwib25DaGFuZ2UiLCJ2b2x1bnRlZXJzIiwic2V0Vm9sdW50ZWVycyIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZmV0Y2hWb2x1bnRlZXJzIiwicmVzcG9uc2UiLCJyZXNvdXJjZUFjdGlvbiIsInJlc291cmNlSWQiLCJhY3Rpb25OYW1lIiwicGVyUGFnZSIsImRhdGEiLCJyZWNvcmRzIiwibWFwIiwidiIsInZhbHVlIiwiaWQiLCJsYWJlbCIsIm5hbWUiLCJoYW5kbGVDaGFuZ2UiLCJzZWxlY3RlZCIsInNlbGVjdGVkT3B0aW9uIiwiZmluZCIsIm9wdCIsIkZvcm1Hcm91cCIsIkxhYmVsIiwicmVxdWlyZWQiLCJTZWxlY3QiLCJvcHRpb25zIiwiaXNMb2FkaW5nIiwiaXNDbGVhcmFibGUiLCJwbGFjZWhvbGRlciIsImRlc2NyaXB0aW9uIiwiRm9ybU1lc3NhZ2UiLCJTdGF0dXNGaWx0ZXJlZFNlbGVjdCIsInN0YXR1cyIsInNldFN0YXR1cyIsImZldGNoU3RhdHVzIiwiRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QiLCJMb2dpbkNvbXBvbmVudCIsInNldEVtYWlsIiwicGFzc3dvcmQiLCJzZXRQYXNzd29yZCIsInNldEVycm9yIiwic2hvd1Bhc3N3b3JkIiwic2V0U2hvd1Bhc3N3b3JkIiwidHJhbnNsYXRlTWVzc2FnZSIsInVzZVRyYW5zbGF0aW9uIiwiaGFuZGxlU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjcmVkZW50aWFscyIsImpzb24iLCJvayIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVkaXJlY3RVcmwiLCJlcnIiLCJtaW5IZWlnaHQiLCJmb250RmFtaWx5IiwiXyIsIm1kIiwiZmxleERpcmVjdGlvbiIsImp1c3RpZnlDb250ZW50IiwiYWxpZ25JdGVtcyIsImJhY2tncm91bmQiLCJ0ZXh0QWxpZ24iLCJtYXhXaWR0aCIsInNyYyIsImFsdCIsIm1hcmdpbkJvdHRvbSIsIm9uRXJyb3IiLCJvcGFjaXR5IiwibWFyZ2luVG9wIiwiYmFja2dyb3VuZENvbG9yIiwid2lkdGgiLCJvblN1Ym1pdCIsImh0bWxGb3IiLCJJbnB1dCIsInR5cGUiLCJkaXNhYmxlZCIsInBhZGRpbmciLCJwb3NpdGlvbiIsInBhZGRpbmdSaWdodCIsIm9uQ2xpY2siLCJyaWdodCIsInRvcCIsInRyYW5zZm9ybSIsIkJ1dHRvbiIsInZhcmlhbnQiLCJtYXJnaW5SaWdodCIsIkltYWdlQ29tcG9uZW50IiwiaW1hZ2VVcmwiLCJtYXhIZWlnaHQiLCJvYmplY3RGaXQiLCJJbWFnZUxpc3RDb21wb25lbnQiLCJpbWFnZXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsInN0YXJ0c1dpdGgiLCJpc05hTiIsInNwbGl0IiwicG9wIiwicHVzaCIsImxlbmd0aCIsInVybCIsImluZGV4IiwiSW1hZ2VFZGl0Q29tcG9uZW50Iiwic2V0SW1hZ2VVcmwiLCJoYW5kbGVJbnB1dENoYW5nZSIsImV2ZW50IiwibmV3VmFsdWUiLCJJbWFnZUxpc3RFZGl0Q29tcG9uZW50IiwiZ2V0SW1hZ2VzIiwicGFyc2VJbnQiLCJmaWx0ZXIiLCJpbWciLCJ1bmRlZmluZWQiLCJzZXRJbWFnZXMiLCJ1cGRhdGVSZWNvcmQiLCJuZXdJbWFnZXMiLCJoYW5kbGVBZGQiLCJoYW5kbGVSZW1vdmUiLCJzcGxpY2UiLCJoZWlnaHQiLCJmbGV4R3JvdyIsInNpemUiLCJJY29uIiwiaWNvbiIsIkJBU0VfVVJMIiwiQ3JlYXRlVGFza0Zyb21BaWRSZXF1ZXN0IiwicmVzb3VyY2UiLCJhZGROb3RpY2UiLCJ1c2VOb3RpY2UiLCJzZWFyY2hRdWVyeSIsInNldFNlYXJjaFF1ZXJ5IiwiZm9ybURhdGEiLCJzZXRGb3JtRGF0YSIsInRhc2tOYW1lIiwidm9sdW50ZWVyc05lZWRlZCIsImlzT3BlbiIsInByaW9yaXR5Iiwic2VsZWN0ZWRWb2x1bnRlZXJzIiwiaGFzRXhpc3RpbmdUYXNrIiwic2V0SGFzRXhpc3RpbmdUYXNrIiwiY2hlY2tFeGlzdGluZ1Rhc2siLCJza2lsbCIsImFzc2lnbmVkVm9sdW50ZWVycyIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwiTWVzc2FnZUJveCIsIkgzIiwicHJldiIsIm1pbiIsIkNoZWNrQm94IiwiY2hlY2tlZCIsImlubGluZSIsIm1hcmdpbkxlZnQiLCJpc011bHRpIiwiaXNTZWFyY2hhYmxlIiwiaW5jbHVkZXMiLCJuZXdWYWx1ZXMiLCJBcnJheSIsImlzQXJyYXkiLCJzbGljZSIsInMiLCJMb2FkZXIiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFJQSxNQUFNQSxTQUFTLEdBQUdBLE1BQU07RUFDdEIsRUFBQSxNQUFNLENBQUNDLFlBQVksQ0FBQyxHQUFHQyx1QkFBZSxFQUFFO0VBQ3hDLEVBQUEsTUFBTSxDQUFDQyxLQUFLLEVBQUVDLFFBQVEsQ0FBQyxHQUFHQyxjQUFRLENBQUM7RUFDakNDLElBQUFBLFdBQVcsRUFBRSxDQUFDO0VBQ2RDLElBQUFBLFNBQVMsRUFBRSxDQUFDO0VBQ1pDLElBQUFBLEtBQUssRUFBRSxDQUFDO0VBQ1JDLElBQUFBLEtBQUssRUFBRTtFQUNULEdBQUMsQ0FBQztFQUVGQyxFQUFBQSxlQUFTLENBQUMsTUFBTTtFQUNkO0VBQ0EsSUFBQSxNQUFNQyxVQUFVLEdBQUcsWUFBWTtRQUM3QixJQUFJO0VBQ0YsUUFBQSxNQUFNQyxHQUFHLEdBQUcsSUFBSUMsaUJBQVMsRUFBRTtFQUMzQjtFQUNBO0VBQ0FULFFBQUFBLFFBQVEsQ0FBQztFQUNQRSxVQUFBQSxXQUFXLEVBQUUsRUFBRTtFQUNmQyxVQUFBQSxTQUFTLEVBQUUsR0FBRztFQUNkQyxVQUFBQSxLQUFLLEVBQUUsRUFBRTtFQUNUQyxVQUFBQSxLQUFLLEVBQUU7RUFDVCxTQUFDLENBQUM7UUFDSixDQUFDLENBQUMsT0FBT0ssS0FBSyxFQUFFO0VBQ2RDLFFBQUFBLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDLHVCQUF1QixFQUFFQSxLQUFLLENBQUM7RUFDL0MsTUFBQTtNQUNGLENBQUM7RUFFREgsSUFBQUEsVUFBVSxFQUFFO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUVOLG9CQUNFSyxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLHFCQUNGRixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ0MsSUFBQUEsRUFBRSxFQUFDO0VBQUssR0FBQSxlQUNYSCxzQkFB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
