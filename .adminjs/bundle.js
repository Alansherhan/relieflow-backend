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
            'filters.role': 'volunteer'
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
            'filters.status': 'rejected'
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
            'filters.status': 'accepted'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRGFzaGJvYXJkLmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9MaW5rQ29tcG9uZW50LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Wb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvQWlkUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Eb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTG9naW5Db21wb25lbnQuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlQ29tcG9uZW50LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUxpc3RDb21wb25lbnQuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlRWRpdENvbXBvbmVudC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSW1hZ2VMaXN0RWRpdENvbXBvbmVudC5qc3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIElsbHVzdHJhdGlvbiB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyBBcGlDbGllbnQsIHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnO1xyXG5cclxuY29uc3QgRGFzaGJvYXJkID0gKCkgPT4ge1xyXG4gIGNvbnN0IFtjdXJyZW50QWRtaW5dID0gdXNlQ3VycmVudEFkbWluKCk7XHJcbiAgY29uc3QgW3N0YXRzLCBzZXRTdGF0c10gPSB1c2VTdGF0ZSh7XHJcbiAgICBhaWRSZXF1ZXN0czogMCxcclxuICAgIGRvbmF0aW9uczogMCxcclxuICAgIHRhc2tzOiAwLFxyXG4gICAgdXNlcnM6IDAsXHJcbiAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAvLyBGZXRjaCBzdGF0aXN0aWNzIGZyb20geW91ciBBUElcclxuICAgIGNvbnN0IGZldGNoU3RhdHMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xyXG4gICAgICAgIC8vIFlvdSBjYW4gbWFrZSBBUEkgY2FsbHMgaGVyZSB0byBnZXQgcmVhbCBzdGF0c1xyXG4gICAgICAgIC8vIEZvciBub3csIHVzaW5nIHBsYWNlaG9sZGVyIGRhdGFcclxuICAgICAgICBzZXRTdGF0cyh7XHJcbiAgICAgICAgICBhaWRSZXF1ZXN0czogNDUsXHJcbiAgICAgICAgICBkb25hdGlvbnM6IDEyOCxcclxuICAgICAgICAgIHRhc2tzOiAyMyxcclxuICAgICAgICAgIHVzZXJzOiAzNTAsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgc3RhdHM6JywgZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGZldGNoU3RhdHMoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94PlxyXG4gICAgICA8Qm94IG1iPVwieHhsXCI+XHJcbiAgICAgICAgPEgyPldlbGNvbWUgdG8gUmVsaWVmIE1hbmFnZW1lbnQgU3lzdGVtPC9IMj5cclxuICAgICAgICA8VGV4dCBtdD1cImRlZmF1bHRcIj5cclxuICAgICAgICAgIEhlbGxvIHtjdXJyZW50QWRtaW4/LmVtYWlsIHx8ICdBZG1pbid9ISBIZXJlJ3MgeW91ciBkYXNoYm9hcmQgb3ZlcnZpZXcuXHJcbiAgICAgICAgPC9UZXh0PlxyXG4gICAgICA8L0JveD5cclxuXHJcbiAgICAgIHsvKiBTdGF0aXN0aWNzIENhcmRzICovfVxyXG4gICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgZmxleFdyYXA9XCJ3cmFwXCIgZ2FwPVwiZGVmYXVsdFwiPlxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIGZsZXg9XCIxXCJcclxuICAgICAgICAgIG1pbldpZHRoPVwiMjAwcHhcIlxyXG4gICAgICAgICAgYmc9XCJwcmltYXJ5MTAwXCJcclxuICAgICAgICAgIHA9XCJ4bFwiXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcclxuICAgICAgICAgIGJveFNoYWRvdz1cImNhcmRcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxINSBtYj1cImRlZmF1bHRcIj5BaWQgUmVxdWVzdHM8L0g1PlxyXG4gICAgICAgICAgPFRleHQgZm9udFNpemU9XCJ4eGxcIiBmb250V2VpZ2h0PVwiYm9sZFwiPlxyXG4gICAgICAgICAgICB7c3RhdHMuYWlkUmVxdWVzdHN9XHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBtdD1cInNtXCIgY29sb3I9XCJncmV5NjBcIj5cclxuICAgICAgICAgICAgQWN0aXZlIHJlcXVlc3RzXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIGZsZXg9XCIxXCJcclxuICAgICAgICAgIG1pbldpZHRoPVwiMjAwcHhcIlxyXG4gICAgICAgICAgYmc9XCJzdWNjZXNzXCJcclxuICAgICAgICAgIHA9XCJ4bFwiXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcclxuICAgICAgICAgIGJveFNoYWRvdz1cImNhcmRcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxINSBtYj1cImRlZmF1bHRcIiBjb2xvcj1cIndoaXRlXCI+XHJcbiAgICAgICAgICAgIERvbmF0aW9uc1xyXG4gICAgICAgICAgPC9INT5cclxuICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwieHhsXCIgZm9udFdlaWdodD1cImJvbGRcIiBjb2xvcj1cIndoaXRlXCI+XHJcbiAgICAgICAgICAgIHtzdGF0cy5kb25hdGlvbnN9XHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBtdD1cInNtXCIgY29sb3I9XCJ3aGl0ZVwiPlxyXG4gICAgICAgICAgICBUb3RhbCBkb25hdGlvbnMgcmVjZWl2ZWRcclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgPEJveFxyXG4gICAgICAgICAgZmxleD1cIjFcIlxyXG4gICAgICAgICAgbWluV2lkdGg9XCIyMDBweFwiXHJcbiAgICAgICAgICBiZz1cImluZm9cIlxyXG4gICAgICAgICAgcD1cInhsXCJcclxuICAgICAgICAgIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgYm94U2hhZG93PVwiY2FyZFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPEg1IG1iPVwiZGVmYXVsdFwiIGNvbG9yPVwid2hpdGVcIj5cclxuICAgICAgICAgICAgQWN0aXZlIFRhc2tzXHJcbiAgICAgICAgICA8L0g1PlxyXG4gICAgICAgICAgPFRleHQgZm9udFNpemU9XCJ4eGxcIiBmb250V2VpZ2h0PVwiYm9sZFwiIGNvbG9yPVwid2hpdGVcIj5cclxuICAgICAgICAgICAge3N0YXRzLnRhc2tzfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIGNvbG9yPVwid2hpdGVcIj5cclxuICAgICAgICAgICAgUGVuZGluZyB0YXNrc1xyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICBmbGV4PVwiMVwiXHJcbiAgICAgICAgICBtaW5XaWR0aD1cIjIwMHB4XCJcclxuICAgICAgICAgIGJnPVwiYWNjZW50XCJcclxuICAgICAgICAgIHA9XCJ4bFwiXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcclxuICAgICAgICAgIGJveFNoYWRvdz1cImNhcmRcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxINSBtYj1cImRlZmF1bHRcIiBjb2xvcj1cIndoaXRlXCI+XHJcbiAgICAgICAgICAgIFVzZXJzXHJcbiAgICAgICAgICA8L0g1PlxyXG4gICAgICAgICAgPFRleHQgZm9udFNpemU9XCJ4eGxcIiBmb250V2VpZ2h0PVwiYm9sZFwiIGNvbG9yPVwid2hpdGVcIj5cclxuICAgICAgICAgICAge3N0YXRzLnVzZXJzfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIGNvbG9yPVwid2hpdGVcIj5cclxuICAgICAgICAgICAgUmVnaXN0ZXJlZCB1c2Vyc1xyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgICA8L0JveD5cclxuXHJcbiAgICAgIHsvKiBRdWljayBBY3Rpb25zICovfVxyXG4gICAgICA8Qm94IG10PVwieHhsXCI+XHJcbiAgICAgICAgPEg1IG1iPVwiZGVmYXVsdFwiPlF1aWNrIEFjdGlvbnM8L0g1PlxyXG4gICAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBnYXA9XCJkZWZhdWx0XCIgZmxleFdyYXA9XCJ3cmFwXCI+XHJcbiAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgIGFzPVwiYVwiXHJcbiAgICAgICAgICAgIGhyZWY9XCIvZGFzaGJvYXJkL3Jlc291cmNlcy9BaWRSZXF1ZXN0XCJcclxuICAgICAgICAgICAgYmc9XCJ3aGl0ZVwiXHJcbiAgICAgICAgICAgIHA9XCJsZ1wiXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICBib3JkZXI9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgdGV4dERlY29yYXRpb246ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD1cImJvbGRcIiBjb2xvcj1cInByaW1hcnkxMDBcIj5cclxuICAgICAgICAgICAgICDwn5OLIFZpZXcgQWlkIFJlcXVlc3RzXHJcbiAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICBhcz1cImFcIlxyXG4gICAgICAgICAgICBocmVmPVwiL2Rhc2hib2FyZC9yZXNvdXJjZXMvRG9uYXRpb25cIlxyXG4gICAgICAgICAgICBiZz1cIndoaXRlXCJcclxuICAgICAgICAgICAgcD1cImxnXCJcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgIGJvcmRlcj1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICBzdHlsZT17eyB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJyB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8VGV4dCBmb250V2VpZ2h0PVwiYm9sZFwiIGNvbG9yPVwicHJpbWFyeTEwMFwiPlxyXG4gICAgICAgICAgICAgIPCfkrAgTWFuYWdlIERvbmF0aW9uc1xyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgYXM9XCJhXCJcclxuICAgICAgICAgICAgaHJlZj1cIi9kYXNoYm9hcmQvcmVzb3VyY2VzL1Rhc2tTY2hlbWFcIlxyXG4gICAgICAgICAgICBiZz1cIndoaXRlXCJcclxuICAgICAgICAgICAgcD1cImxnXCJcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgIGJvcmRlcj1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICBzdHlsZT17eyB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJyB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8VGV4dCBmb250V2VpZ2h0PVwiYm9sZFwiIGNvbG9yPVwicHJpbWFyeTEwMFwiPlxyXG4gICAgICAgICAgICAgIOKchSBWaWV3IFRhc2tzXHJcbiAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICBhcz1cImFcIlxyXG4gICAgICAgICAgICBocmVmPVwiL2Rhc2hib2FyZC9yZXNvdXJjZXMvUmVsaWVmQ2VudGVyXCJcclxuICAgICAgICAgICAgYmc9XCJ3aGl0ZVwiXHJcbiAgICAgICAgICAgIHA9XCJsZ1wiXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICBib3JkZXI9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgdGV4dERlY29yYXRpb246ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD1cImJvbGRcIiBjb2xvcj1cInByaW1hcnkxMDBcIj5cclxuICAgICAgICAgICAgICDwn4+iIFJlbGllZiBDZW50ZXJzXHJcbiAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgICA8L0JveD5cclxuXHJcbiAgICAgIHsvKiBSZWNlbnQgQWN0aXZpdHkgKi99XHJcbiAgICAgIDxCb3ggbXQ9XCJ4eGxcIj5cclxuICAgICAgICA8SDUgbWI9XCJkZWZhdWx0XCI+U3lzdGVtIFN0YXR1czwvSDU+XHJcbiAgICAgICAgPEJveCBiZz1cIndoaXRlXCIgcD1cImxnXCIgYm9yZGVyUmFkaXVzPVwiZGVmYXVsdFwiIGJvcmRlcj1cImRlZmF1bHRcIj5cclxuICAgICAgICAgIDxUZXh0PuKchSBBbGwgc3lzdGVtcyBvcGVyYXRpb25hbDwvVGV4dD5cclxuICAgICAgICAgIDxUZXh0IG10PVwic21cIiBjb2xvcj1cImdyZXk2MFwiPlxyXG4gICAgICAgICAgICBMYXN0IHVwZGF0ZWQ6IHtuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCl9XHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgIDwvQm94PlxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDsiLCJcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5cclxuY29uc3QgTGlua0NvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyByZWNvcmQgfSA9IHByb3BzXHJcbiAgICBjb25zdCBsYXQgID0gcmVjb3JkLnBhcmFtc1tcImFkZHJlc3MubG9jYXRpb24uY29vcmRpbmF0ZXMuMFwiXVxyXG4gICAgY29uc3QgbG9uZyA9IHJlY29yZC5wYXJhbXNbXCJhZGRyZXNzLmxvY2F0aW9uLmNvb3JkaW5hdGVzLjFcIl1cclxuICBjb25zb2xlLmxvZyhyZWNvcmQpXHJcbiAgY29uc3QgbWFwc0xpbmsgPSBgaHR0cDovL2dvb2dsZS5jb20vbWFwcy9AJHtsYXR9LCR7bG9uZ30sMTV6YFxyXG5cclxuICByZXR1cm4gKFxyXG5cclxuXHJcbiAgICAgIDxhIGhyZWY9e21hcHNMaW5rfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+XHJcbiAgICAgICAgVmlldyBMb2NhdGlvblxyXG4gICAgICA8L2E+XHJcblxyXG4gICAgXHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW5rQ29tcG9uZW50XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCwgU2VsZWN0LCBGb3JtTWVzc2FnZSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xyXG5cclxuY29uc3QgVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3QgPSAoeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9KSA9PiB7XHJcbiAgY29uc3QgW3ZvbHVudGVlcnMsIHNldFZvbHVudGVlcnNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZmV0Y2hWb2x1bnRlZXJzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5yZXNvdXJjZUFjdGlvbih7XHJcbiAgICAgICAgcmVzb3VyY2VJZDogJ3VzZXJQcm9maWxlJyxcclxuICAgICAgICBhY3Rpb25OYW1lOiAnbGlzdCcsXHJcbiAgICAgICAgcGFyYW1zOiB7ICdmaWx0ZXJzLnJvbGUnOiAndm9sdW50ZWVyJyB9LFxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21hcHBpbmcgJywgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKVxyXG4gICAgICAgIHNldFZvbHVudGVlcnMocmVzcG9uc2UuZGF0YS5yZWNvcmRzLm1hcCh2ID0+ICh7XHJcbiAgICAgICAgICB2YWx1ZTogdi5pZCxcclxuICAgICAgICAgIGxhYmVsOiB2LnBhcmFtcy5uYW1lLFxyXG4gICAgICAgIH0pKSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9O1xyXG4gICAgZmV0Y2hWb2x1bnRlZXJzKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSBzZWxlY3RlZCA9PiB7XHJcbiAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBzZWxlY3RlZCA/IHNlbGVjdGVkLnZhbHVlIDogJycpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gdm9sdW50ZWVycy5maW5kKG9wdCA9PiBvcHQudmFsdWUgPT09IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0pIHx8IG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Rm9ybUdyb3VwIG1iPXs1Nn0+XHJcbiAgICAgIDxMYWJlbCByZXF1aXJlZD57J1NlbGVjdCBWb2x1bnRlZXInfTwvTGFiZWw+XHJcbiAgICAgIDxTZWxlY3RcclxuICAgICAgICBvcHRpb25zPXt2b2x1bnRlZXJzfVxyXG4gICAgICAgIHZhbHVlPXtzZWxlY3RlZE9wdGlvbn1cclxuICAgICAgICBpc0xvYWRpbmc9e2xvYWRpbmd9XHJcbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cclxuICAgICAgICBpc0NsZWFyYWJsZVxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IHZvbHVudGVlcuKAplwiXHJcbiAgICAgIC8+XHJcbiAgICAgIHtwcm9wZXJ0eS5kZXNjcmlwdGlvbiAmJiAoXHJcbiAgICAgICAgPEZvcm1NZXNzYWdlPntwcm9wZXJ0eS5kZXNjcmlwdGlvbn08L0Zvcm1NZXNzYWdlPlxyXG4gICAgICApfVxyXG4gICAgPC9Gb3JtR3JvdXA+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZvbHVudGVlckZpbHRlcmVkU2VsZWN0O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwsIFNlbGVjdCwgRm9ybU1lc3NhZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcclxuXHJcbmNvbnN0IFN0YXR1c0ZpbHRlcmVkU2VsZWN0ID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xyXG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBmZXRjaFN0YXR1cyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xyXG4gICAgICAgIHJlc291cmNlSWQ6ICdBaWRSZXF1ZXN0JyxcclxuICAgICAgICBhY3Rpb25OYW1lOiAnbGlzdCcsXHJcbiAgICAgICAgcGFyYW1zOiB7ICdmaWx0ZXJzLnN0YXR1cyc6ICdyZWplY3RlZCcgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdsb2dvZ2RnZCcsIHJlc3BvbnNlKVxyXG4gICAgICBpZiAocmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLnJlY29yZHMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnbWFwcGluZyAnLCByZXNwb25zZS5kYXRhLnJlY29yZHMpXHJcbiAgICAgICAgc2V0U3RhdHVzKHJlc3BvbnNlLmRhdGEucmVjb3Jkcy5tYXAodiA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY29yZFwiLCB2LnBhcmFtcylcclxuICAgICAgICAgIHJldHVybiAoe1xyXG4gICAgICAgICAgICB2YWx1ZTogdi5pZCxcclxuICAgICAgICAgICAgLy8gbGFiZWw6IGAke3YucGFyYW1zW1wiYWRkcmVzcy5hZGRyZXNzTGluZTFcIl19IC0gJHt2LnBhcmFtc1tcImRvbmF0aW9uVHlwZVwiXX1gXHJcbiAgICAgICAgICAgIGxhYmVsOiB2LnBhcmFtcy5uYW1lXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9O1xyXG4gICAgZmV0Y2hTdGF0dXMoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IHNlbGVjdGVkID0+IHtcclxuICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIHNlbGVjdGVkID8gc2VsZWN0ZWQudmFsdWUgOiAnJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBzdGF0dXMuZmluZChvcHQgPT4gb3B0LnZhbHVlID09PSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdKSB8fCBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEZvcm1Hcm91cCBtYj17NTZ9PlxyXG4gICAgICA8TGFiZWwgcmVxdWlyZWQ+eydTZWxlY3QgQWlkIFJlcXVlc3QnfTwvTGFiZWw+XHJcbiAgICAgIDxTZWxlY3RcclxuICAgICAgICBvcHRpb25zPXtzdGF0dXN9XHJcbiAgICAgICAgdmFsdWU9e3NlbGVjdGVkT3B0aW9ufVxyXG4gICAgICAgIGlzTG9hZGluZz17bG9hZGluZ31cclxuICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgIGlzQ2xlYXJhYmxlXHJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgQWlkIFJlcXVlc3RcIlxyXG4gICAgICAvPlxyXG4gICAgICB7cHJvcGVydHkuZGVzY3JpcHRpb24gJiYgKFxyXG4gICAgICAgIDxGb3JtTWVzc2FnZT57cHJvcGVydHkuZGVzY3JpcHRpb259PC9Gb3JtTWVzc2FnZT5cclxuICAgICAgKX1cclxuICAgIDwvRm9ybUdyb3VwPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdGF0dXNGaWx0ZXJlZFNlbGVjdDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIExhYmVsLCBTZWxlY3QsIEZvcm1NZXNzYWdlIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XHJcblxyXG5jb25zdCBEb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdCA9ICh7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0pID0+IHtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZmV0Y2hTdGF0dXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHtcclxuICAgICAgICByZXNvdXJjZUlkOiAnRG9uYXRpb25SZXF1ZXN0JyxcclxuICAgICAgICBhY3Rpb25OYW1lOiAnbGlzdCcsXHJcbiAgICAgICAgcGFyYW1zOiB7ICdmaWx0ZXJzLnN0YXR1cyc6ICdhY2NlcHRlZCcgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdsb2dvZ2RnZCcsIHJlc3BvbnNlKVxyXG4gICAgICBpZiAocmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLnJlY29yZHMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnbWFwcGluZyAnLCByZXNwb25zZS5kYXRhLnJlY29yZHMpXHJcbiAgICAgICAgc2V0U3RhdHVzKHJlc3BvbnNlLmRhdGEucmVjb3Jkcy5tYXAodiA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY29yZFwiLCB2LnBhcmFtcylcclxuICAgICAgICAgIHJldHVybiAoe1xyXG4gICAgICAgICAgICB2YWx1ZTogdi5pZCxcclxuICAgICAgICAgICAgbGFiZWw6IHYucGFyYW1zLm5hbWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfVxyXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgIH07XHJcbiAgICBmZXRjaFN0YXR1cygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gc2VsZWN0ZWQgPT4ge1xyXG4gICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgc2VsZWN0ZWQgPyBzZWxlY3RlZC52YWx1ZSA6ICcnKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IHN0YXR1cy5maW5kKG9wdCA9PiBvcHQudmFsdWUgPT09IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0pIHx8IG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Rm9ybUdyb3VwIG1iPXs1Nn0+XHJcbiAgICAgIDxMYWJlbCByZXF1aXJlZD57J1NlbGVjdCBEb25hdGlvbiBSZXF1ZXN0J308L0xhYmVsPlxyXG4gICAgICA8U2VsZWN0XHJcbiAgICAgICAgb3B0aW9ucz17c3RhdHVzfVxyXG4gICAgICAgIHZhbHVlPXtzZWxlY3RlZE9wdGlvbn1cclxuICAgICAgICBpc0xvYWRpbmc9e2xvYWRpbmd9XHJcbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cclxuICAgICAgICBpc0NsZWFyYWJsZVxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IERvbmF0aW9uIFJlcXVlc3RcIlxyXG4gICAgICAvPlxyXG4gICAgICB7cHJvcGVydHkuZGVzY3JpcHRpb24gJiYgKFxyXG4gICAgICAgIDxGb3JtTWVzc2FnZT57cHJvcGVydHkuZGVzY3JpcHRpb259PC9Gb3JtTWVzc2FnZT5cclxuICAgICAgKX1cclxuICAgIDwvRm9ybUdyb3VwPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgSW5wdXQsIExhYmVsLCBUZXh0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XHJcblxyXG5jb25zdCBMb2dpbkNvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gIGNvbnN0IFtlbWFpbCwgc2V0RW1haWxdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtwYXNzd29yZCwgc2V0UGFzc3dvcmRdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2hvd1Bhc3N3b3JkLCBzZXRTaG93UGFzc3dvcmRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHsgdHJhbnNsYXRlTWVzc2FnZSB9ID0gdXNlVHJhbnNsYXRpb24oKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHNldEVycm9yKCcnKTtcclxuICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2Rhc2hib2FyZC9sb2dpbicsIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBlbWFpbCwgcGFzc3dvcmQgfSksXHJcbiAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZGF0YS5yZWRpcmVjdFVybCB8fCAnL2Rhc2hib2FyZCc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0RXJyb3IoZGF0YS5lcnJvciB8fCAnSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZCcpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignTG9naW4gZXJyb3I6JywgZXJyKTtcclxuICAgICAgc2V0RXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxCb3hcclxuICAgICAgZGlzcGxheT1cImZsZXhcIlxyXG4gICAgICBtaW5IZWlnaHQ9XCIxMDB2aFwiXHJcbiAgICAgIHN0eWxlPXt7IGZvbnRGYW1pbHk6ICdJbnRlciwgc3lzdGVtLXVpLCBzYW5zLXNlcmlmJyB9fVxyXG4gICAgPlxyXG4gICAgICB7LyogTGVmdCBTaWRlIC0gQnJhbmRpbmcgKi99XHJcbiAgICAgIDxCb3hcclxuICAgICAgICBmbGV4PVwiMVwiXHJcbiAgICAgICAgZGlzcGxheT17eyBfOiAnbm9uZScsIG1kOiAnZmxleCcgfX1cclxuICAgICAgICBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCJcclxuICAgICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXHJcbiAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXHJcbiAgICAgICAgcD1cInh4bFwiXHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMjU2M2ViIDAlLCAjMWU0MGFmIDEwMCUpJyxcclxuICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICA8Qm94IHRleHRBbGlnbj1cImNlbnRlclwiIHN0eWxlPXt7IG1heFdpZHRoOiAnNTAwcHgnIH19PlxyXG4gICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICBzcmM9XCIvaW1hZ2VzL2xvZ28td2hpdGUucG5nXCJcclxuICAgICAgICAgICAgYWx0PVwiTG9nb1wiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IG1heFdpZHRoOiAnMjUwcHgnLCBtYXJnaW5Cb3R0b206ICcycmVtJyB9fVxyXG4gICAgICAgICAgICBvbkVycm9yPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcycmVtJywgZm9udFdlaWdodDogJ2JvbGQnLCBtYXJnaW5Cb3R0b206ICcxcmVtJyB9fT5cclxuICAgICAgICAgICAgUmVsaWVmIE1hbmFnZW1lbnQgU3lzdGVtXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzEuMTI1cmVtJywgb3BhY2l0eTogMC45IH19PlxyXG4gICAgICAgICAgICBDb29yZGluYXRpbmcgZGlzYXN0ZXIgcmVsaWVmIGVmZm9ydHMgd2l0aCBlZmZpY2llbmN5IGFuZCBjb21wYXNzaW9uXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxyXG4gICAgICAgICAgICBzdHlsZT17eyBnYXA6ICcycmVtJywgbWFyZ2luVG9wOiAnM3JlbScsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJyB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8Qm94IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcycmVtJywgZm9udFdlaWdodDogJ2JvbGQnIH19PjUwMCs8L1RleHQ+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcwLjg3NXJlbScgfX0+QWlkIFJlcXVlc3RzPC9UZXh0PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMnJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJyB9fT4xMjAwKzwvVGV4dD5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzAuODc1cmVtJyB9fT5Eb25hdGlvbnM8L1RleHQ+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICA8Qm94IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcycmVtJywgZm9udFdlaWdodDogJ2JvbGQnIH19PjUwKzwvVGV4dD5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzAuODc1cmVtJyB9fT5SZWxpZWYgQ2VudGVyczwvVGV4dD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICA8L0JveD5cclxuICAgICAgICA8L0JveD5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICB7LyogUmlnaHQgU2lkZSAtIExvZ2luIEZvcm0gKi99XHJcbiAgICAgIDxCb3hcclxuICAgICAgICBmbGV4PVwiMVwiXHJcbiAgICAgICAgZGlzcGxheT1cImZsZXhcIlxyXG4gICAgICAgIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIlxyXG4gICAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcclxuICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcclxuICAgICAgICBwPVwieHhsXCJcclxuICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6ICcjZjlmYWZiJyB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPEJveFxyXG4gICAgICAgICAgYmc9XCJ3aGl0ZVwiXHJcbiAgICAgICAgICBwPVwieHhsXCJcclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzAuNXJlbScsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMXB4IDNweCAwIHJnYmEoMCwgMCwgMCwgMC4xKScsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnNDUwcHgnLFxyXG4gICAgICAgICAgICBtYXhXaWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8Qm94IG1iPVwieGxcIj5cclxuICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxLjVyZW0nLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnIzExMTgyNycgfX0+XHJcbiAgICAgICAgICAgICAgU2lnbiBJblxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMXJlbScsIGNvbG9yOiAnIzZiNzI4MCcsIG1hcmdpblRvcDogJzAuNXJlbScgfX0+XHJcbiAgICAgICAgICAgICAgRW50ZXIgeW91ciBjcmVkZW50aWFscyB0byBhY2Nlc3MgdGhlIGRhc2hib2FyZFxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICB7ZXJyb3IgJiYgKFxyXG4gICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgcD1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgIG1iPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZWYyZjInLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNmZWUyZTInLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMC4zNzVyZW0nLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyNkYzI2MjYnLCBmb250U2l6ZTogJzAuODc1cmVtJyB9fT5cclxuICAgICAgICAgICAgICAgIOKaoO+4jyB7ZXJyb3J9XHJcbiAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgICAgIDxCb3ggbWI9XCJsZ1wiPlxyXG4gICAgICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwiZW1haWxcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgIEVtYWlsIEFkZHJlc3NcclxuICAgICAgICAgICAgICA8L0xhYmVsPlxyXG4gICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgaWQ9XCJlbWFpbFwiXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2VtYWlsfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFbWFpbChlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImFkbWluQGV4YW1wbGUuY29tXCJcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4JyxcclxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAgICA8Qm94IG1iPVwiZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwicGFzc3dvcmRcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgIFBhc3N3b3JkXHJcbiAgICAgICAgICAgICAgPC9MYWJlbD5cclxuICAgICAgICAgICAgICA8Qm94IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH19PlxyXG4gICAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICAgIGlkPVwicGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgICB0eXBlPXtzaG93UGFzc3dvcmQgPyAndGV4dCcgOiAncGFzc3dvcmQnfVxyXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17cGFzc3dvcmR9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGFzc3dvcmQoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgcGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4JyxcclxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogJzQ1cHgnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dQYXNzd29yZCghc2hvd1Bhc3N3b3JkKX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgICAgICByaWdodDogJzEycHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogJzUwJScsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzZiNzI4MCcsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHtzaG93UGFzc3dvcmQgPyAn8J+Rge+4jycgOiAn8J+Rge+4j+KAjfCfl6jvuI8nfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICAgICAgPEJveCBtYj1cInhsXCIgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMXJlbScgfX0+XHJcbiAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXHJcbiAgICAgICAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxNHB4JyxcclxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJzYwMCcsXHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGxvYWRpbmcgPyAnIzljYTNhZicgOiAnIzI1NjNlYicsXHJcbiAgICAgICAgICAgICAgICAgIGN1cnNvcjogbG9hZGluZyA/ICdub3QtYWxsb3dlZCcgOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtsb2FkaW5nID8gKFxyXG4gICAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtYXJnaW5SaWdodDogJzhweCcgfX0+4o+zPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIFNpZ25pbmcgaW4uLi5cclxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgJ1NpZ24gSW4nXHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgIDwvZm9ybT5cclxuXHJcbiAgICAgICAgICA8Qm94IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicsIG1hcmdpblRvcDogJzEuNXJlbScgfX0+XHJcbiAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMC44NzVyZW0nLCBjb2xvcjogJyM2YjcyODAnIH19PlxyXG4gICAgICAgICAgICAgIERvbid0IGhhdmUgYW4gYWNjb3VudD97JyAnfVxyXG4gICAgICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgICAgICBhcz1cInNwYW5cIlxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6ICcjMjU2M2ViJywgZm9udFdlaWdodDogJ2JvbGQnLCBjdXJzb3I6ICdwb2ludGVyJyB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIENvbnRhY3QgQWRtaW5pc3RyYXRvclxyXG4gICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgIDxCb3ggc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnMXJlbScgfX0+XHJcbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzAuNzVyZW0nLCBjb2xvcjogJyM2YjcyODAnIH19PlxyXG4gICAgICAgICAgICDCqSAyMDI0IFJlbGllZiBNYW5hZ2VtZW50IFN5c3RlbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICA8L0JveD5cclxuICAgICAgPC9Cb3g+XHJcbiAgICA8L0JveD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9naW5Db21wb25lbnQ7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBJbWFnZUNvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyByZWNvcmQsIHByb3BlcnR5IH0gPSBwcm9wcztcclxuICAgIGNvbnN0IGltYWdlVXJsID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXTtcclxuXHJcbiAgICBpZiAoIWltYWdlVXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94PlxyXG4gICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICBzcmM9e2ltYWdlVXJsfVxyXG4gICAgICAgICAgICAgICAgYWx0PXtwcm9wZXJ0eS5sYWJlbH1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1heFdpZHRoOiAnMTAwcHgnLCBtYXhIZWlnaHQ6ICcxMDBweCcsIG9iamVjdEZpdDogJ2NvdmVyJyB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEltYWdlQ29tcG9uZW50O1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IEltYWdlTGlzdENvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyByZWNvcmQsIHByb3BlcnR5IH0gPSBwcm9wcztcclxuXHJcbiAgICBjb25zdCBpbWFnZXMgPSBbXTtcclxuICAgIC8vIENoZWNrIGZvciBmbGF0dGVuZWQga2V5cyBsaWtlICdwcm9vZkltYWdlcy4wJywgJ3Byb29mSW1hZ2VzLjEnLCBldGMuXHJcbiAgICBPYmplY3Qua2V5cyhyZWNvcmQucGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYga2V5IHN0YXJ0cyB3aXRoIHByb3BlcnR5IG5hbWUgYW5kIGZvbGxvd3Mgd2l0aCAuaW5kZXhcclxuICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYCR7cHJvcGVydHkubmFtZX0uYCkgJiYgIWlzTmFOKGtleS5zcGxpdCgnLicpLnBvcCgpKSkge1xyXG4gICAgICAgICAgICBpbWFnZXMucHVzaChyZWNvcmQucGFyYW1zW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChpbWFnZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgZmxleERpcmVjdGlvbj1cInJvd1wiIGZsZXhXcmFwPVwid3JhcFwiIGdhcD17Mn0+XHJcbiAgICAgICAgICAgIHtpbWFnZXMubWFwKCh1cmwsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgICAgICAgICAgICBzcmM9e3VybH1cclxuICAgICAgICAgICAgICAgICAgICBhbHQ9e2Ake3Byb3BlcnR5LmxhYmVsfS0ke2luZGV4fWB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWF4V2lkdGg6ICcxMDBweCcsIG1heEhlaWdodDogJzEwMHB4Jywgb2JqZWN0Rml0OiAnY292ZXInIH19XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICA8L0JveD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZUxpc3RDb21wb25lbnQ7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIElucHV0LCBMYWJlbCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgSW1hZ2VFZGl0Q29tcG9uZW50ID0gKHByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0gPSBwcm9wcztcclxuICAgIGNvbnN0IHZhbHVlID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXSB8fCAnJztcclxuICAgIGNvbnN0IFtpbWFnZVVybCwgc2V0SW1hZ2VVcmxdID0gdXNlU3RhdGUodmFsdWUpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBsb2NhbCBzdGF0ZSBpZiByZWNvcmQgY2hhbmdlcyBmcm9tIG91dHNpZGUgKGUuZy4gcmVsb2FkKVxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBzZXRJbWFnZVVybChyZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdIHx8ICcnKTtcclxuICAgIH0sIFtyZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdXSk7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlSW5wdXRDaGFuZ2UgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICBzZXRJbWFnZVVybChuZXdWYWx1ZSk7XHJcbiAgICAgICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgbmV3VmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxCb3ggbWFyZ2luQm90dG9tPVwieHhsXCI+XHJcbiAgICAgICAgICAgIDxMYWJlbCBodG1sRm9yPXtwcm9wZXJ0eS5uYW1lfT57cHJvcGVydHkubGFiZWx9PC9MYWJlbD5cclxuICAgICAgICAgICAge2ltYWdlVXJsICYmIChcclxuICAgICAgICAgICAgICAgIDxCb3ggbWFyZ2luQm90dG9tPVwiZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtpbWFnZVVybH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiUHJldmlld1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1heFdpZHRoOiAnMjAwcHgnLCBtYXhIZWlnaHQ6ICcyMDBweCcsIG9iamVjdEZpdDogJ2NvdmVyJywgZGlzcGxheTogJ2Jsb2NrJywgbWFyZ2luQm90dG9tOiAnOHB4JywgYm9yZGVyOiAnMXB4IHNvbGlkICNkZGQnLCBwYWRkaW5nOiAnNHB4JyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkVycm9yPXsoZSkgPT4geyBlLnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICBpZD17cHJvcGVydHkubmFtZX1cclxuICAgICAgICAgICAgICAgIG5hbWU9e3Byb3BlcnR5Lm5hbWV9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17aW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICB3aWR0aD17MX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICA8L0JveD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZUVkaXRDb21wb25lbnQ7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIExhYmVsLCBJbnB1dCwgQnV0dG9uLCBJY29uIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBJbWFnZUxpc3RFZGl0Q29tcG9uZW50ID0gKHByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0gPSBwcm9wcztcclxuXHJcbiAgICAvLyBGbGF0dGVuZWQgcGFyYW1zIGFyZSBzdG9yZWQgbGlrZSAncHJvb2ZJbWFnZXMuMCc6ICd1cmwxJywgJ3Byb29mSW1hZ2VzLjEnOiAndXJsMidcclxuICAgIC8vIFdlIG5lZWQgdG8gcmVjb25zdHJ1Y3QgdGhlIGFycmF5XHJcbiAgICBjb25zdCBnZXRJbWFnZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VzID0gW107XHJcbiAgICAgICAgT2JqZWN0LmtleXMocmVjb3JkLnBhcmFtcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYCR7cHJvcGVydHkubmFtZX0uYCkgJiYgIWlzTmFOKGtleS5zcGxpdCgnLicpLnBvcCgpKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChrZXkuc3BsaXQoJy4nKS5wb3AoKSwgMTApO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VzW2luZGV4XSA9IHJlY29yZC5wYXJhbXNba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEZpbHRlciBvdXQgZW1wdHkgc2xvdHMgaWYgYW55IGhvbGUgZXhpc3RzLCB0aG91Z2ggbm9ybWFsbHkgYWRtaW5qcyBoYW5kbGVzIHNlcXVlbnRpYWwga2V5c1xyXG4gICAgICAgIHJldHVybiBpbWFnZXMuZmlsdGVyKGltZyA9PiBpbWcgIT09IHVuZGVmaW5lZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IFtpbWFnZXMsIHNldEltYWdlc10gPSB1c2VTdGF0ZShnZXRJbWFnZXMoKSk7XHJcblxyXG4gICAgLy8gSGVscGVyIHRvIG5vdGlmeSBBZG1pbkpTIG9mIGNoYW5nZXNcclxuICAgIC8vIEFkbWluSlMgZXhwZWN0cyBmbGF0IGtleXMgZm9yIGFycmF5czogJ3Byb3BlcnR5LjAnLCAncHJvcGVydHkuMSdcclxuICAgIGNvbnN0IHVwZGF0ZVJlY29yZCA9IChuZXdJbWFnZXMpID0+IHtcclxuICAgICAgICBzZXRJbWFnZXMobmV3SW1hZ2VzKTtcclxuXHJcbiAgICAgICAgLy8gMS4gQ2xlYXIgZXhpc3Rpbmcga2V5cyBmb3IgdGhpcyBwcm9wZXJ0eVxyXG4gICAgICAgIC8vIFdlIGNhbid0IHJlYWxseSBcImRlbGV0ZVwiIGtleXMgZWFzaWx5IHZpYSBvbkNoYW5nZSBpbiB0aGUgc3RhbmRhcmQgd2F5IHdpdGhvdXQgcG90ZW50aWFsbHkgbGVhdmluZyBnYXJiYWdlLFxyXG4gICAgICAgIC8vIGJ1dCBzdGFuZGFyZCBhZG1pbmpzIGhhbmRsaW5nIGV4cGVjdHMgdXMgdG8gb3ZlcndyaXRlLlxyXG4gICAgICAgIC8vIEhvd2V2ZXIsIHRoZSBjbGVhbmVzdCB3YXkgdG8gc3luYyBhbiBhcnJheSBpcyB0byB1cGRhdGUgZWFjaCBpbmRleC5cclxuXHJcbiAgICAgICAgLy8gSWRlYWxseSB3ZSBzaG91bGQgbnVsbGlmeSBvbGQga2V5cyBpZiBhcnJheSBzaHJpbmtzLCBidXQgc3RhbmRhcmQgYmVoYXZpb3IgbWlnaHQganVzdCBoYW5kbGUgd2hhdCB3ZSBzZW5kLlxyXG4gICAgICAgIC8vIEEgc2FmZXIgYmV0IGlzIHRvIHJlbHkgb24gQWRtaW5KUydzIGludGVybmFsIGhhbmRsaW5nIGlmIHdlIHdlcmUgcGFzc2luZyB0aGUgd2hvbGUgb2JqZWN0LCBcclxuICAgICAgICAvLyBidXQgaGVyZSB3ZSBhcmUgYSBjb21wb25lbnQuXHJcblxyXG4gICAgICAgIC8vIFdlIHdpbGwganVzdCB1cGRhdGUgJ3Byb3BlcnR5LjAnLCAncHJvcGVydHkuMScgZXRjLlxyXG4gICAgICAgIC8vIEFuZCBpZGVhbGx5IHdlIG1pZ2h0IG5lZWQgdG8gY2xlYXIgJ3Byb3BlcnR5LjInIGlmIHdlIHdlbnQgZnJvbSAzIGl0ZW1zIHRvIDIuXHJcbiAgICAgICAgLy8gVG8gcHJvcGVybHkgXCJjbGVhclwiIHdlIG1pZ2h0IG5lZWQgdG8gc2V0IGl0IHRvIG51bGwgb3IgdW5kZWZpbmVkLlxyXG5cclxuICAgICAgICAvLyBTdHJhdGVneTogVXBkYXRlIGFsbCBjdXJyZW50IGluZGljZXMuIFxyXG4gICAgICAgIC8vIElmIHRoZSBhcnJheSBzaHJhbmssIHdlIGNhbiB0cnkgc2V0dGluZyB0aGUgbmV4dCBpbmRleCB0byBudWxsL3VuZGVmaW5lZCB0byBzZWUgaWYgYmFja2VuZCBoYW5kbGVzIGl0LFxyXG4gICAgICAgIC8vIG9yIGp1c3QgcmVseSBvbiB0aGUgZmFjdCB0aGF0IHdlIGFyZSByZXdyaXRpbmcgdGhlIHBhcmFtcy5cclxuXHJcbiAgICAgICAgLy8gQWN0dWFsbHksIG9uQ2hhbmdlIGV4cGVjdHMgKGtleSwgdmFsdWUpLlxyXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIG11bHRpcGxlIGtleXMuIEFkbWluSlMgYG9uQ2hhbmdlYCBtaWdodCBub3Qgc3VwcG9ydCBiYXRjaCB1cGRhdGVzIGVhc2lseSBkZXBlbmRpbmcgb24gdmVyc2lvbi5cclxuICAgICAgICAvLyBCdXQgdXN1YWxseSBpdCdzIGBvbkNoYW5nZShwcm9wZXJ0eSwgdmFsdWUpYCB3aGVyZSB2YWx1ZSBpcyB0aGUgZnVsbCB2YWx1ZT8gXHJcbiAgICAgICAgLy8gTm8sIGZvciBhcnJheSBwcm9wZXJ0aWVzLCBBZG1pbkpTIG9mdGVuIHRyZWF0cyB0aGVtIGVzc2VudGlhbGx5IGFzIGluZGl2aWR1YWwgZmllbGRzIGlmIGZsYXR0ZW5lZC5cclxuXHJcbiAgICAgICAgLy8gV0FJVDogSWYgd2UgdXNlIGEgY3VzdG9tIGNvbXBvbmVudCBmb3IgdGhlICplbnRpcmUgYXJyYXkgcHJvcGVydHkqLCBgb25DaGFuZ2VgIG1pZ2h0IGFjY2VwdCB0aGUgYXJyYXkgaXRzZWxmXHJcbiAgICAgICAgLy8gaWYgdGhlIGJhY2tlbmQgYWRhcHRlciBzdXBwb3J0cyBpdC4gQnV0IEFkbWluSlMgb2Z0ZW4gZmxhdHRlbnMuXHJcblxyXG4gICAgICAgIC8vIExldCdzIGNoZWNrIGhvdyBzdGFuZGFyZCBhcnJheSBlZGl0aW5nIHdvcmtzLlxyXG4gICAgICAgIC8vIElmIHdlIGxvb2sgYXQgZXhpc3RpbmcgYEltYWdlTGlzdENvbXBvbmVudGAsIGl0IHJlYWRzIGZyb20gYHJlY29yZC5wYXJhbXNgLlxyXG5cclxuICAgICAgICAvLyBMZXQncyB0cnkgc2VuZGluZyB0aGUgYXJyYXkgdG8gYG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIG5ld0ltYWdlcylgLlxyXG4gICAgICAgIC8vIE1hbnkgQWRtaW5KUyBhZGFwdGVycyAobGlrZSBNb25nb29zZSkgaGFuZGxlIHRoZSBhcnJheSBpZiBwYXNzZWQgYXMgYSB2YWx1ZSB0byB0aGUgbWFpbiBwcm9wZXJ0eSBrZXkuXHJcbiAgICAgICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgbmV3SW1hZ2VzKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQWRkID0gKCkgPT4ge1xyXG4gICAgICAgIHVwZGF0ZVJlY29yZChbLi4uaW1hZ2VzLCAnJ10pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVSZW1vdmUgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCBuZXdJbWFnZXMgPSBbLi4uaW1hZ2VzXTtcclxuICAgICAgICBuZXdJbWFnZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB1cGRhdGVSZWNvcmQobmV3SW1hZ2VzKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGluZGV4LCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5ld0ltYWdlcyA9IFsuLi5pbWFnZXNdO1xyXG4gICAgICAgIG5ld0ltYWdlc1tpbmRleF0gPSB2YWx1ZTtcclxuICAgICAgICB1cGRhdGVSZWNvcmQobmV3SW1hZ2VzKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cInh4bFwiPlxyXG4gICAgICAgICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XHJcbiAgICAgICAgICAgIHtpbWFnZXMubWFwKCh1cmwsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8Qm94IGtleT17aW5kZXh9IG1hcmdpbkJvdHRvbT1cImRlZmF1bHRcIiBkaXNwbGF5PVwiZmxleFwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Qm94IG1hcmdpblJpZ2h0PVwiZGVmYXVsdFwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3VybCAmJiA8aW1nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e3VybH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD17YEltYWdlICR7aW5kZXggKyAxfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogJzUwcHgnLCBoZWlnaHQ6ICc1MHB4Jywgb2JqZWN0Rml0OiAnY292ZXInLCBib3JkZXJSYWRpdXM6ICc0cHgnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVycm9yPXsoZSkgPT4geyBlLnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPn1cclxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICAgICA8Qm94IGZsZXhHcm93PXsxfSBtYXJnaW5SaWdodD1cImRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dXJsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVDaGFuZ2UoaW5kZXgsIGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXsxfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJJbWFnZSBVUkxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gaGFuZGxlUmVtb3ZlKGluZGV4KX0gdmFyaWFudD1cImRhbmdlclwiIHNpemU9XCJpY29uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIGljb249XCJUcmFzaDJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUFkZH0gdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgPEljb24gaWNvbj1cIlBsdXNcIiAvPiBBZGQgSW1hZ2UgVVJMXHJcbiAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEltYWdlTGlzdEVkaXRDb21wb25lbnQ7XHJcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmRcbmltcG9ydCBMaW5rQ29tcG9uZW50IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9MaW5rQ29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5MaW5rQ29tcG9uZW50ID0gTGlua0NvbXBvbmVudFxuaW1wb3J0IFZvbHVudGVlckZpbHRlcmVkU2VsZWN0IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Wb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3QgPSBWb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdFxuaW1wb3J0IFN0YXR1c0ZpbHRlcmVkU2VsZWN0IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9BaWRSZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlN0YXR1c0ZpbHRlcmVkU2VsZWN0ID0gU3RhdHVzRmlsdGVyZWRTZWxlY3RcbmltcG9ydCBEb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRvbmF0aW9uUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0ID0gRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3RcbmltcG9ydCBMb2dpbkNvbXBvbmVudCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTG9naW5Db21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkxvZ2luQ29tcG9uZW50ID0gTG9naW5Db21wb25lbnRcbmltcG9ydCBJbWFnZUNvbXBvbmVudCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSW1hZ2VDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlQ29tcG9uZW50ID0gSW1hZ2VDb21wb25lbnRcbmltcG9ydCBJbWFnZUxpc3RDb21wb25lbnQgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlTGlzdENvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuSW1hZ2VMaXN0Q29tcG9uZW50ID0gSW1hZ2VMaXN0Q29tcG9uZW50XG5pbXBvcnQgSW1hZ2VFZGl0Q29tcG9uZW50IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUVkaXRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlRWRpdENvbXBvbmVudCA9IEltYWdlRWRpdENvbXBvbmVudFxuaW1wb3J0IEltYWdlTGlzdEVkaXRDb21wb25lbnQgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlTGlzdEVkaXRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlTGlzdEVkaXRDb21wb25lbnQgPSBJbWFnZUxpc3RFZGl0Q29tcG9uZW50Il0sIm5hbWVzIjpbIkRhc2hib2FyZCIsImN1cnJlbnRBZG1pbiIsInVzZUN1cnJlbnRBZG1pbiIsInN0YXRzIiwic2V0U3RhdHMiLCJ1c2VTdGF0ZSIsImFpZFJlcXVlc3RzIiwiZG9uYXRpb25zIiwidGFza3MiLCJ1c2VycyIsInVzZUVmZmVjdCIsImZldGNoU3RhdHMiLCJhcGkiLCJBcGlDbGllbnQiLCJlcnJvciIsImNvbnNvbGUiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJCb3giLCJtYiIsIkgyIiwiVGV4dCIsIm10IiwiZW1haWwiLCJkaXNwbGF5IiwiZmxleFdyYXAiLCJnYXAiLCJmbGV4IiwibWluV2lkdGgiLCJiZyIsInAiLCJib3JkZXJSYWRpdXMiLCJib3hTaGFkb3ciLCJINSIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsImNvbG9yIiwiYXMiLCJocmVmIiwiYm9yZGVyIiwic3R5bGUiLCJ0ZXh0RGVjb3JhdGlvbiIsImN1cnNvciIsIkRhdGUiLCJ0b0xvY2FsZVN0cmluZyIsIkxpbmtDb21wb25lbnQiLCJwcm9wcyIsInJlY29yZCIsImxhdCIsInBhcmFtcyIsImxvbmciLCJsb2ciLCJtYXBzTGluayIsInRhcmdldCIsInJlbCIsIlZvbHVudGVlckZpbHRlcmVkU2VsZWN0IiwicHJvcGVydHkiLCJvbkNoYW5nZSIsInZvbHVudGVlcnMiLCJzZXRWb2x1bnRlZXJzIiwibG9hZGluZyIsInNldExvYWRpbmciLCJmZXRjaFZvbHVudGVlcnMiLCJyZXNwb25zZSIsInJlc291cmNlQWN0aW9uIiwicmVzb3VyY2VJZCIsImFjdGlvbk5hbWUiLCJkYXRhIiwicmVjb3JkcyIsIm1hcCIsInYiLCJ2YWx1ZSIsImlkIiwibGFiZWwiLCJuYW1lIiwiaGFuZGxlQ2hhbmdlIiwic2VsZWN0ZWQiLCJzZWxlY3RlZE9wdGlvbiIsImZpbmQiLCJvcHQiLCJGb3JtR3JvdXAiLCJMYWJlbCIsInJlcXVpcmVkIiwiU2VsZWN0Iiwib3B0aW9ucyIsImlzTG9hZGluZyIsImlzQ2xlYXJhYmxlIiwicGxhY2Vob2xkZXIiLCJkZXNjcmlwdGlvbiIsIkZvcm1NZXNzYWdlIiwiU3RhdHVzRmlsdGVyZWRTZWxlY3QiLCJzdGF0dXMiLCJzZXRTdGF0dXMiLCJmZXRjaFN0YXR1cyIsIkRvbmF0aW9uUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0IiwiTG9naW5Db21wb25lbnQiLCJzZXRFbWFpbCIsInBhc3N3b3JkIiwic2V0UGFzc3dvcmQiLCJzZXRFcnJvciIsInNob3dQYXNzd29yZCIsInNldFNob3dQYXNzd29yZCIsInRyYW5zbGF0ZU1lc3NhZ2UiLCJ1c2VUcmFuc2xhdGlvbiIsImhhbmRsZVN1Ym1pdCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiY3JlZGVudGlhbHMiLCJqc29uIiwib2siLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlZGlyZWN0VXJsIiwiZXJyIiwibWluSGVpZ2h0IiwiZm9udEZhbWlseSIsIl8iLCJtZCIsImZsZXhEaXJlY3Rpb24iLCJqdXN0aWZ5Q29udGVudCIsImFsaWduSXRlbXMiLCJiYWNrZ3JvdW5kIiwidGV4dEFsaWduIiwibWF4V2lkdGgiLCJzcmMiLCJhbHQiLCJtYXJnaW5Cb3R0b20iLCJvbkVycm9yIiwib3BhY2l0eSIsIm1hcmdpblRvcCIsImJhY2tncm91bmRDb2xvciIsIndpZHRoIiwib25TdWJtaXQiLCJodG1sRm9yIiwiSW5wdXQiLCJ0eXBlIiwiZGlzYWJsZWQiLCJwYWRkaW5nIiwicG9zaXRpb24iLCJwYWRkaW5nUmlnaHQiLCJvbkNsaWNrIiwicmlnaHQiLCJ0b3AiLCJ0cmFuc2Zvcm0iLCJCdXR0b24iLCJ2YXJpYW50IiwibWFyZ2luUmlnaHQiLCJJbWFnZUNvbXBvbmVudCIsImltYWdlVXJsIiwibWF4SGVpZ2h0Iiwib2JqZWN0Rml0IiwiSW1hZ2VMaXN0Q29tcG9uZW50IiwiaW1hZ2VzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJzdGFydHNXaXRoIiwiaXNOYU4iLCJzcGxpdCIsInBvcCIsInB1c2giLCJsZW5ndGgiLCJ1cmwiLCJpbmRleCIsIkltYWdlRWRpdENvbXBvbmVudCIsInNldEltYWdlVXJsIiwiaGFuZGxlSW5wdXRDaGFuZ2UiLCJldmVudCIsIm5ld1ZhbHVlIiwiSW1hZ2VMaXN0RWRpdENvbXBvbmVudCIsImdldEltYWdlcyIsInBhcnNlSW50IiwiZmlsdGVyIiwiaW1nIiwidW5kZWZpbmVkIiwic2V0SW1hZ2VzIiwidXBkYXRlUmVjb3JkIiwibmV3SW1hZ2VzIiwiaGFuZGxlQWRkIiwiaGFuZGxlUmVtb3ZlIiwic3BsaWNlIiwiaGVpZ2h0IiwiZmxleEdyb3ciLCJzaXplIiwiSWNvbiIsImljb24iLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFJQSxNQUFNQSxTQUFTLEdBQUdBLE1BQU07RUFDdEIsRUFBQSxNQUFNLENBQUNDLFlBQVksQ0FBQyxHQUFHQyx1QkFBZSxFQUFFO0VBQ3hDLEVBQUEsTUFBTSxDQUFDQyxLQUFLLEVBQUVDLFFBQVEsQ0FBQyxHQUFHQyxjQUFRLENBQUM7RUFDakNDLElBQUFBLFdBQVcsRUFBRSxDQUFDO0VBQ2RDLElBQUFBLFNBQVMsRUFBRSxDQUFDO0VBQ1pDLElBQUFBLEtBQUssRUFBRSxDQUFDO0VBQ1JDLElB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
