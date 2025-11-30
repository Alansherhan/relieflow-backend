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

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Dashboard = Dashboard;
  AdminJS.UserComponents.LinkComponent = LinkComponent;
  AdminJS.UserComponents.VolunteerFilteredSelect = VolunteerFilteredSelect;
  AdminJS.UserComponents.StatusFilteredSelect = StatusFilteredSelect;
  AdminJS.UserComponents.DonationRequestStatusFilteredSelect = DonationRequestStatusFilteredSelect;
  AdminJS.UserComponents.LoginComponent = LoginComponent;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRGFzaGJvYXJkLmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9MaW5rQ29tcG9uZW50LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Wb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvQWlkUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Eb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTG9naW5Db21wb25lbnQuanN4IiwiZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCwgSDIsIEg1LCBUZXh0LCBJbGx1c3RyYXRpb24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuaW1wb3J0IHsgQXBpQ2xpZW50LCB1c2VDdXJyZW50QWRtaW4gfSBmcm9tICdhZG1pbmpzJztcclxuXHJcbmNvbnN0IERhc2hib2FyZCA9ICgpID0+IHtcclxuICBjb25zdCBbY3VycmVudEFkbWluXSA9IHVzZUN1cnJlbnRBZG1pbigpO1xyXG4gIGNvbnN0IFtzdGF0cywgc2V0U3RhdHNdID0gdXNlU3RhdGUoe1xyXG4gICAgYWlkUmVxdWVzdHM6IDAsXHJcbiAgICBkb25hdGlvbnM6IDAsXHJcbiAgICB0YXNrczogMCxcclxuICAgIHVzZXJzOiAwLFxyXG4gIH0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgLy8gRmV0Y2ggc3RhdGlzdGljcyBmcm9tIHlvdXIgQVBJXHJcbiAgICBjb25zdCBmZXRjaFN0YXRzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcclxuICAgICAgICAvLyBZb3UgY2FuIG1ha2UgQVBJIGNhbGxzIGhlcmUgdG8gZ2V0IHJlYWwgc3RhdHNcclxuICAgICAgICAvLyBGb3Igbm93LCB1c2luZyBwbGFjZWhvbGRlciBkYXRhXHJcbiAgICAgICAgc2V0U3RhdHMoe1xyXG4gICAgICAgICAgYWlkUmVxdWVzdHM6IDQ1LFxyXG4gICAgICAgICAgZG9uYXRpb25zOiAxMjgsXHJcbiAgICAgICAgICB0YXNrczogMjMsXHJcbiAgICAgICAgICB1c2VyczogMzUwLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHN0YXRzOicsIGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBmZXRjaFN0YXRzKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEJveD5cclxuICAgICAgPEJveCBtYj1cInh4bFwiPlxyXG4gICAgICAgIDxIMj5XZWxjb21lIHRvIFJlbGllZiBNYW5hZ2VtZW50IFN5c3RlbTwvSDI+XHJcbiAgICAgICAgPFRleHQgbXQ9XCJkZWZhdWx0XCI+XHJcbiAgICAgICAgICBIZWxsbyB7Y3VycmVudEFkbWluPy5lbWFpbCB8fCAnQWRtaW4nfSEgSGVyZSdzIHlvdXIgZGFzaGJvYXJkIG92ZXJ2aWV3LlxyXG4gICAgICAgIDwvVGV4dD5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICB7LyogU3RhdGlzdGljcyBDYXJkcyAqL31cclxuICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGZsZXhXcmFwPVwid3JhcFwiIGdhcD1cImRlZmF1bHRcIj5cclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICBmbGV4PVwiMVwiXHJcbiAgICAgICAgICBtaW5XaWR0aD1cIjIwMHB4XCJcclxuICAgICAgICAgIGJnPVwicHJpbWFyeTEwMFwiXHJcbiAgICAgICAgICBwPVwieGxcIlxyXG4gICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICBib3hTaGFkb3c9XCJjYXJkXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8SDUgbWI9XCJkZWZhdWx0XCI+QWlkIFJlcXVlc3RzPC9INT5cclxuICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwieHhsXCIgZm9udFdlaWdodD1cImJvbGRcIj5cclxuICAgICAgICAgICAge3N0YXRzLmFpZFJlcXVlc3RzfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIGNvbG9yPVwiZ3JleTYwXCI+XHJcbiAgICAgICAgICAgIEFjdGl2ZSByZXF1ZXN0c1xyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICBmbGV4PVwiMVwiXHJcbiAgICAgICAgICBtaW5XaWR0aD1cIjIwMHB4XCJcclxuICAgICAgICAgIGJnPVwic3VjY2Vzc1wiXHJcbiAgICAgICAgICBwPVwieGxcIlxyXG4gICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICBib3hTaGFkb3c9XCJjYXJkXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8SDUgbWI9XCJkZWZhdWx0XCIgY29sb3I9XCJ3aGl0ZVwiPlxyXG4gICAgICAgICAgICBEb25hdGlvbnNcclxuICAgICAgICAgIDwvSDU+XHJcbiAgICAgICAgICA8VGV4dCBmb250U2l6ZT1cInh4bFwiIGZvbnRXZWlnaHQ9XCJib2xkXCIgY29sb3I9XCJ3aGl0ZVwiPlxyXG4gICAgICAgICAgICB7c3RhdHMuZG9uYXRpb25zfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIGNvbG9yPVwid2hpdGVcIj5cclxuICAgICAgICAgICAgVG90YWwgZG9uYXRpb25zIHJlY2VpdmVkXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIGZsZXg9XCIxXCJcclxuICAgICAgICAgIG1pbldpZHRoPVwiMjAwcHhcIlxyXG4gICAgICAgICAgYmc9XCJpbmZvXCJcclxuICAgICAgICAgIHA9XCJ4bFwiXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcclxuICAgICAgICAgIGJveFNoYWRvdz1cImNhcmRcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxINSBtYj1cImRlZmF1bHRcIiBjb2xvcj1cIndoaXRlXCI+XHJcbiAgICAgICAgICAgIEFjdGl2ZSBUYXNrc1xyXG4gICAgICAgICAgPC9INT5cclxuICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwieHhsXCIgZm9udFdlaWdodD1cImJvbGRcIiBjb2xvcj1cIndoaXRlXCI+XHJcbiAgICAgICAgICAgIHtzdGF0cy50YXNrc31cclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDxUZXh0IG10PVwic21cIiBjb2xvcj1cIndoaXRlXCI+XHJcbiAgICAgICAgICAgIFBlbmRpbmcgdGFza3NcclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgPEJveFxyXG4gICAgICAgICAgZmxleD1cIjFcIlxyXG4gICAgICAgICAgbWluV2lkdGg9XCIyMDBweFwiXHJcbiAgICAgICAgICBiZz1cImFjY2VudFwiXHJcbiAgICAgICAgICBwPVwieGxcIlxyXG4gICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICBib3hTaGFkb3c9XCJjYXJkXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8SDUgbWI9XCJkZWZhdWx0XCIgY29sb3I9XCJ3aGl0ZVwiPlxyXG4gICAgICAgICAgICBVc2Vyc1xyXG4gICAgICAgICAgPC9INT5cclxuICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwieHhsXCIgZm9udFdlaWdodD1cImJvbGRcIiBjb2xvcj1cIndoaXRlXCI+XHJcbiAgICAgICAgICAgIHtzdGF0cy51c2Vyc31cclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDxUZXh0IG10PVwic21cIiBjb2xvcj1cIndoaXRlXCI+XHJcbiAgICAgICAgICAgIFJlZ2lzdGVyZWQgdXNlcnNcclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICA8L0JveD5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICB7LyogUXVpY2sgQWN0aW9ucyAqL31cclxuICAgICAgPEJveCBtdD1cInh4bFwiPlxyXG4gICAgICAgIDxINSBtYj1cImRlZmF1bHRcIj5RdWljayBBY3Rpb25zPC9INT5cclxuICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgZ2FwPVwiZGVmYXVsdFwiIGZsZXhXcmFwPVwid3JhcFwiPlxyXG4gICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICBhcz1cImFcIlxyXG4gICAgICAgICAgICBocmVmPVwiL2Rhc2hib2FyZC9yZXNvdXJjZXMvQWlkUmVxdWVzdFwiXHJcbiAgICAgICAgICAgIGJnPVwid2hpdGVcIlxyXG4gICAgICAgICAgICBwPVwibGdcIlxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgYm9yZGVyPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IHRleHREZWNvcmF0aW9uOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCJib2xkXCIgY29sb3I9XCJwcmltYXJ5MTAwXCI+XHJcbiAgICAgICAgICAgICAg8J+TiyBWaWV3IEFpZCBSZXF1ZXN0c1xyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgYXM9XCJhXCJcclxuICAgICAgICAgICAgaHJlZj1cIi9kYXNoYm9hcmQvcmVzb3VyY2VzL0RvbmF0aW9uXCJcclxuICAgICAgICAgICAgYmc9XCJ3aGl0ZVwiXHJcbiAgICAgICAgICAgIHA9XCJsZ1wiXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICBib3JkZXI9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgdGV4dERlY29yYXRpb246ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD1cImJvbGRcIiBjb2xvcj1cInByaW1hcnkxMDBcIj5cclxuICAgICAgICAgICAgICDwn5KwIE1hbmFnZSBEb25hdGlvbnNcclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgIGFzPVwiYVwiXHJcbiAgICAgICAgICAgIGhyZWY9XCIvZGFzaGJvYXJkL3Jlc291cmNlcy9UYXNrU2NoZW1hXCJcclxuICAgICAgICAgICAgYmc9XCJ3aGl0ZVwiXHJcbiAgICAgICAgICAgIHA9XCJsZ1wiXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICBib3JkZXI9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgdGV4dERlY29yYXRpb246ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD1cImJvbGRcIiBjb2xvcj1cInByaW1hcnkxMDBcIj5cclxuICAgICAgICAgICAgICDinIUgVmlldyBUYXNrc1xyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgYXM9XCJhXCJcclxuICAgICAgICAgICAgaHJlZj1cIi9kYXNoYm9hcmQvcmVzb3VyY2VzL1JlbGllZkNlbnRlclwiXHJcbiAgICAgICAgICAgIGJnPVwid2hpdGVcIlxyXG4gICAgICAgICAgICBwPVwibGdcIlxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgYm9yZGVyPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IHRleHREZWNvcmF0aW9uOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCJib2xkXCIgY29sb3I9XCJwcmltYXJ5MTAwXCI+XHJcbiAgICAgICAgICAgICAg8J+PoiBSZWxpZWYgQ2VudGVyc1xyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8L0JveD5cclxuICAgICAgICA8L0JveD5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICB7LyogUmVjZW50IEFjdGl2aXR5ICovfVxyXG4gICAgICA8Qm94IG10PVwieHhsXCI+XHJcbiAgICAgICAgPEg1IG1iPVwiZGVmYXVsdFwiPlN5c3RlbSBTdGF0dXM8L0g1PlxyXG4gICAgICAgIDxCb3ggYmc9XCJ3aGl0ZVwiIHA9XCJsZ1wiIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIiBib3JkZXI9XCJkZWZhdWx0XCI+XHJcbiAgICAgICAgICA8VGV4dD7inIUgQWxsIHN5c3RlbXMgb3BlcmF0aW9uYWw8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBtdD1cInNtXCIgY29sb3I9XCJncmV5NjBcIj5cclxuICAgICAgICAgICAgTGFzdCB1cGRhdGVkOiB7bmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgICA8L0JveD5cclxuICAgIDwvQm94PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmQ7IiwiXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuXHJcbmNvbnN0IExpbmtDb21wb25lbnQgPSAocHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgcmVjb3JkIH0gPSBwcm9wc1xyXG4gICAgY29uc3QgbGF0ICA9IHJlY29yZC5wYXJhbXNbXCJhZGRyZXNzLmxvY2F0aW9uLmNvb3JkaW5hdGVzLjBcIl1cclxuICAgIGNvbnN0IGxvbmcgPSByZWNvcmQucGFyYW1zW1wiYWRkcmVzcy5sb2NhdGlvbi5jb29yZGluYXRlcy4xXCJdXHJcbiAgY29uc29sZS5sb2cocmVjb3JkKVxyXG4gIGNvbnN0IG1hcHNMaW5rID0gYGh0dHA6Ly9nb29nbGUuY29tL21hcHMvQCR7bGF0fSwke2xvbmd9LDE1emBcclxuXHJcbiAgcmV0dXJuIChcclxuXHJcblxyXG4gICAgICA8YSBocmVmPXttYXBzTGlua30gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxyXG4gICAgICAgIFZpZXcgTG9jYXRpb25cclxuICAgICAgPC9hPlxyXG5cclxuICAgIFxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlua0NvbXBvbmVudFxyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwsIFNlbGVjdCwgRm9ybU1lc3NhZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcclxuXHJcbmNvbnN0IFZvbHVudGVlckZpbHRlcmVkU2VsZWN0ID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xyXG4gIGNvbnN0IFt2b2x1bnRlZXJzLCBzZXRWb2x1bnRlZXJzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGZldGNoVm9sdW50ZWVycyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xyXG4gICAgICAgIHJlc291cmNlSWQ6ICd1c2VyUHJvZmlsZScsXHJcbiAgICAgICAgYWN0aW9uTmFtZTogJ2xpc3QnLFxyXG4gICAgICAgIHBhcmFtczogeyAnZmlsdGVycy5yb2xlJzogJ3ZvbHVudGVlcicgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGEucmVjb3Jkcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdtYXBwaW5nICcsIHJlc3BvbnNlLmRhdGEucmVjb3JkcylcclxuICAgICAgICBzZXRWb2x1bnRlZXJzKHJlc3BvbnNlLmRhdGEucmVjb3Jkcy5tYXAodiA9PiAoe1xyXG4gICAgICAgICAgdmFsdWU6IHYuaWQsXHJcbiAgICAgICAgICBsYWJlbDogdi5wYXJhbXMubmFtZSxcclxuICAgICAgICB9KSkpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfTtcclxuICAgIGZldGNoVm9sdW50ZWVycygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gc2VsZWN0ZWQgPT4ge1xyXG4gICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgc2VsZWN0ZWQgPyBzZWxlY3RlZC52YWx1ZSA6ICcnKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IHZvbHVudGVlcnMuZmluZChvcHQgPT4gb3B0LnZhbHVlID09PSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdKSB8fCBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEZvcm1Hcm91cCBtYj17NTZ9PlxyXG4gICAgICA8TGFiZWwgcmVxdWlyZWQ+eydTZWxlY3QgVm9sdW50ZWVyJ308L0xhYmVsPlxyXG4gICAgICA8U2VsZWN0XHJcbiAgICAgICAgb3B0aW9ucz17dm9sdW50ZWVyc31cclxuICAgICAgICB2YWx1ZT17c2VsZWN0ZWRPcHRpb259XHJcbiAgICAgICAgaXNMb2FkaW5nPXtsb2FkaW5nfVxyXG4gICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XHJcbiAgICAgICAgaXNDbGVhcmFibGVcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCB2b2x1bnRlZXLigKZcIlxyXG4gICAgICAvPlxyXG4gICAgICB7cHJvcGVydHkuZGVzY3JpcHRpb24gJiYgKFxyXG4gICAgICAgIDxGb3JtTWVzc2FnZT57cHJvcGVydHkuZGVzY3JpcHRpb259PC9Gb3JtTWVzc2FnZT5cclxuICAgICAgKX1cclxuICAgIDwvRm9ybUdyb3VwPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIExhYmVsLCBTZWxlY3QsIEZvcm1NZXNzYWdlIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XHJcblxyXG5jb25zdCBTdGF0dXNGaWx0ZXJlZFNlbGVjdCA9ICh7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0pID0+IHtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZmV0Y2hTdGF0dXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHtcclxuICAgICAgICByZXNvdXJjZUlkOiAnQWlkUmVxdWVzdCcsXHJcbiAgICAgICAgYWN0aW9uTmFtZTogJ2xpc3QnLFxyXG4gICAgICAgIHBhcmFtczogeyAnZmlsdGVycy5zdGF0dXMnOiAncmVqZWN0ZWQnIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zb2xlLmxvZygnbG9nb2dkZ2QnLCByZXNwb25zZSlcclxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21hcHBpbmcgJywgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKVxyXG4gICAgICAgIHNldFN0YXR1cyhyZXNwb25zZS5kYXRhLnJlY29yZHMubWFwKHYgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNvcmRcIiwgdi5wYXJhbXMpXHJcbiAgICAgICAgICByZXR1cm4gKHtcclxuICAgICAgICAgICAgdmFsdWU6IHYuaWQsXHJcbiAgICAgICAgICAgIC8vIGxhYmVsOiBgJHt2LnBhcmFtc1tcImFkZHJlc3MuYWRkcmVzc0xpbmUxXCJdfSAtICR7di5wYXJhbXNbXCJkb25hdGlvblR5cGVcIl19YFxyXG4gICAgICAgICAgICBsYWJlbDogdi5wYXJhbXMubmFtZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfTtcclxuICAgIGZldGNoU3RhdHVzKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSBzZWxlY3RlZCA9PiB7XHJcbiAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBzZWxlY3RlZCA/IHNlbGVjdGVkLnZhbHVlIDogJycpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gc3RhdHVzLmZpbmQob3B0ID0+IG9wdC52YWx1ZSA9PT0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXSkgfHwgbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxGb3JtR3JvdXAgbWI9ezU2fT5cclxuICAgICAgPExhYmVsIHJlcXVpcmVkPnsnU2VsZWN0IEFpZCBSZXF1ZXN0J308L0xhYmVsPlxyXG4gICAgICA8U2VsZWN0XHJcbiAgICAgICAgb3B0aW9ucz17c3RhdHVzfVxyXG4gICAgICAgIHZhbHVlPXtzZWxlY3RlZE9wdGlvbn1cclxuICAgICAgICBpc0xvYWRpbmc9e2xvYWRpbmd9XHJcbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cclxuICAgICAgICBpc0NsZWFyYWJsZVxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IEFpZCBSZXF1ZXN0XCJcclxuICAgICAgLz5cclxuICAgICAge3Byb3BlcnR5LmRlc2NyaXB0aW9uICYmIChcclxuICAgICAgICA8Rm9ybU1lc3NhZ2U+e3Byb3BlcnR5LmRlc2NyaXB0aW9ufTwvRm9ybU1lc3NhZ2U+XHJcbiAgICAgICl9XHJcbiAgICA8L0Zvcm1Hcm91cD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhdHVzRmlsdGVyZWRTZWxlY3Q7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCwgU2VsZWN0LCBGb3JtTWVzc2FnZSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xyXG5cclxuY29uc3QgRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QgPSAoeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9KSA9PiB7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGZldGNoU3RhdHVzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5yZXNvdXJjZUFjdGlvbih7XHJcbiAgICAgICAgcmVzb3VyY2VJZDogJ0RvbmF0aW9uUmVxdWVzdCcsXHJcbiAgICAgICAgYWN0aW9uTmFtZTogJ2xpc3QnLFxyXG4gICAgICAgIHBhcmFtczogeyAnZmlsdGVycy5zdGF0dXMnOiAnYWNjZXB0ZWQnIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zb2xlLmxvZygnbG9nb2dkZ2QnLCByZXNwb25zZSlcclxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21hcHBpbmcgJywgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKVxyXG4gICAgICAgIHNldFN0YXR1cyhyZXNwb25zZS5kYXRhLnJlY29yZHMubWFwKHYgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNvcmRcIiwgdi5wYXJhbXMpXHJcbiAgICAgICAgICByZXR1cm4gKHtcclxuICAgICAgICAgICAgdmFsdWU6IHYuaWQsXHJcbiAgICAgICAgICAgIGxhYmVsOiB2LnBhcmFtcy5uYW1lXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9O1xyXG4gICAgZmV0Y2hTdGF0dXMoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IHNlbGVjdGVkID0+IHtcclxuICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIHNlbGVjdGVkID8gc2VsZWN0ZWQudmFsdWUgOiAnJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBzdGF0dXMuZmluZChvcHQgPT4gb3B0LnZhbHVlID09PSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdKSB8fCBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEZvcm1Hcm91cCBtYj17NTZ9PlxyXG4gICAgICA8TGFiZWwgcmVxdWlyZWQ+eydTZWxlY3QgRG9uYXRpb24gUmVxdWVzdCd9PC9MYWJlbD5cclxuICAgICAgPFNlbGVjdFxyXG4gICAgICAgIG9wdGlvbnM9e3N0YXR1c31cclxuICAgICAgICB2YWx1ZT17c2VsZWN0ZWRPcHRpb259XHJcbiAgICAgICAgaXNMb2FkaW5nPXtsb2FkaW5nfVxyXG4gICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XHJcbiAgICAgICAgaXNDbGVhcmFibGVcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBEb25hdGlvbiBSZXF1ZXN0XCJcclxuICAgICAgLz5cclxuICAgICAge3Byb3BlcnR5LmRlc2NyaXB0aW9uICYmIChcclxuICAgICAgICA8Rm9ybU1lc3NhZ2U+e3Byb3BlcnR5LmRlc2NyaXB0aW9ufTwvRm9ybU1lc3NhZ2U+XHJcbiAgICAgICl9XHJcbiAgICA8L0Zvcm1Hcm91cD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3Q7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBCdXR0b24sIElucHV0LCBMYWJlbCwgVGV4dCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyB1c2VUcmFuc2xhdGlvbiB9IGZyb20gJ2FkbWluanMnO1xyXG5cclxuY29uc3QgTG9naW5Db21wb25lbnQgPSAocHJvcHMpID0+IHtcclxuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbcGFzc3dvcmQsIHNldFBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Nob3dQYXNzd29yZCwgc2V0U2hvd1Bhc3N3b3JkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCB7IHRyYW5zbGF0ZU1lc3NhZ2UgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBzZXRFcnJvcignJyk7XHJcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9kYXNoYm9hcmQvbG9naW4nLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZW1haWwsIHBhc3N3b3JkIH0pLFxyXG4gICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGRhdGEucmVkaXJlY3RVcmwgfHwgJy9kYXNoYm9hcmQnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldEVycm9yKGRhdGEuZXJyb3IgfHwgJ0ludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQnKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0xvZ2luIGVycm9yOicsIGVycik7XHJcbiAgICAgIHNldEVycm9yKCdBbiBlcnJvciBvY2N1cnJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94XHJcbiAgICAgIGRpc3BsYXk9XCJmbGV4XCJcclxuICAgICAgbWluSGVpZ2h0PVwiMTAwdmhcIlxyXG4gICAgICBzdHlsZT17eyBmb250RmFtaWx5OiAnSW50ZXIsIHN5c3RlbS11aSwgc2Fucy1zZXJpZicgfX1cclxuICAgID5cclxuICAgICAgey8qIExlZnQgU2lkZSAtIEJyYW5kaW5nICovfVxyXG4gICAgICA8Qm94XHJcbiAgICAgICAgZmxleD1cIjFcIlxyXG4gICAgICAgIGRpc3BsYXk9e3sgXzogJ25vbmUnLCBtZDogJ2ZsZXgnIH19XHJcbiAgICAgICAgZmxleERpcmVjdGlvbj1cImNvbHVtblwiXHJcbiAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIlxyXG4gICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxyXG4gICAgICAgIHA9XCJ4eGxcIlxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzI1NjNlYiAwJSwgIzFlNDBhZiAxMDAlKScsXHJcbiAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcclxuICAgICAgICB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPEJveCB0ZXh0QWxpZ249XCJjZW50ZXJcIiBzdHlsZT17eyBtYXhXaWR0aDogJzUwMHB4JyB9fT5cclxuICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgc3JjPVwiL2ltYWdlcy9sb2dvLXdoaXRlLnBuZ1wiXHJcbiAgICAgICAgICAgIGFsdD1cIkxvZ29cIlxyXG4gICAgICAgICAgICBzdHlsZT17eyBtYXhXaWR0aDogJzI1MHB4JywgbWFyZ2luQm90dG9tOiAnMnJlbScgfX1cclxuICAgICAgICAgICAgb25FcnJvcj17KGUpID0+IHtcclxuICAgICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMnJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJywgbWFyZ2luQm90dG9tOiAnMXJlbScgfX0+XHJcbiAgICAgICAgICAgIFJlbGllZiBNYW5hZ2VtZW50IFN5c3RlbVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxLjEyNXJlbScsIG9wYWNpdHk6IDAuOSB9fT5cclxuICAgICAgICAgICAgQ29vcmRpbmF0aW5nIGRpc2FzdGVyIHJlbGllZiBlZmZvcnRzIHdpdGggZWZmaWNpZW5jeSBhbmQgY29tcGFzc2lvblxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgZ2FwOiAnMnJlbScsIG1hcmdpblRvcDogJzNyZW0nLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMnJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJyB9fT41MDArPC9UZXh0PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMC44NzVyZW0nIH19PkFpZCBSZXF1ZXN0czwvVGV4dD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgIDxCb3ggc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzJyZW0nLCBmb250V2VpZ2h0OiAnYm9sZCcgfX0+MTIwMCs8L1RleHQ+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcwLjg3NXJlbScgfX0+RG9uYXRpb25zPC9UZXh0PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMnJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJyB9fT41MCs8L1RleHQ+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcwLjg3NXJlbScgfX0+UmVsaWVmIENlbnRlcnM8L1RleHQ+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgey8qIFJpZ2h0IFNpZGUgLSBMb2dpbiBGb3JtICovfVxyXG4gICAgICA8Qm94XHJcbiAgICAgICAgZmxleD1cIjFcIlxyXG4gICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcclxuICAgICAgICBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCJcclxuICAgICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXHJcbiAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXHJcbiAgICAgICAgcD1cInh4bFwiXHJcbiAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiAnI2Y5ZmFmYicgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIGJnPVwid2hpdGVcIlxyXG4gICAgICAgICAgcD1cInh4bFwiXHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcwLjVyZW0nLFxyXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDFweCAzcHggMCByZ2JhKDAsIDAsIDAsIDAuMSknLFxyXG4gICAgICAgICAgICB3aWR0aDogJzQ1MHB4JyxcclxuICAgICAgICAgICAgbWF4V2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPEJveCBtYj1cInhsXCI+XHJcbiAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMS41cmVtJywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJyMxMTE4MjcnIH19PlxyXG4gICAgICAgICAgICAgIFNpZ24gSW5cclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzFyZW0nLCBjb2xvcjogJyM2YjcyODAnLCBtYXJnaW5Ub3A6ICcwLjVyZW0nIH19PlxyXG4gICAgICAgICAgICAgIEVudGVyIHlvdXIgY3JlZGVudGlhbHMgdG8gYWNjZXNzIHRoZSBkYXNoYm9hcmRcclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAge2Vycm9yICYmIChcclxuICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgIHA9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgICBtYj1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmVmMmYyJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZmVlMmUyJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzAuMzc1cmVtJyxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjZGMyNjI2JywgZm9udFNpemU6ICcwLjg3NXJlbScgfX0+XHJcbiAgICAgICAgICAgICAgICDimqDvuI8ge2Vycm9yfVxyXG4gICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxyXG4gICAgICAgICAgICA8Qm94IG1iPVwibGdcIj5cclxuICAgICAgICAgICAgICA8TGFiZWwgaHRtbEZvcj1cImVtYWlsXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICBFbWFpbCBBZGRyZXNzXHJcbiAgICAgICAgICAgICAgPC9MYWJlbD5cclxuICAgICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICAgIGlkPVwiZW1haWxcIlxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXtlbWFpbH1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RW1haWwoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJhZG1pbkBleGFtcGxlLmNvbVwiXHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTJweCcsXHJcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICAgICAgPEJveCBtYj1cImRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICA8TGFiZWwgaHRtbEZvcj1cInBhc3N3b3JkXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICBQYXNzd29yZFxyXG4gICAgICAgICAgICAgIDwvTGFiZWw+XHJcbiAgICAgICAgICAgICAgPEJveCBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuICAgICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgICBpZD1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICAgICAgdHlwZT17c2hvd1Bhc3N3b3JkID8gJ3RleHQnIDogJ3Bhc3N3b3JkJ31cclxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3Bhc3N3b3JkfVxyXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIHBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTJweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICc0NXB4JyxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93UGFzc3dvcmQoIXNob3dQYXNzd29yZCl9XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICcxMnB4JyxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6ICc1MCUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM2YjcyODAnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7c2hvd1Bhc3N3b3JkID8gJ/CfkYHvuI8nIDogJ/CfkYHvuI/igI3wn5eo77iPJ31cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICAgIDxCb3ggbWI9XCJ4bFwiIHN0eWxlPXt7IG1hcmdpblRvcDogJzFyZW0nIH19PlxyXG4gICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxyXG4gICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTRweCcsXHJcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLFxyXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBsb2FkaW5nID8gJyM5Y2EzYWYnIDogJyMyNTYzZWInLFxyXG4gICAgICAgICAgICAgICAgICBjdXJzb3I6IGxvYWRpbmcgPyAnbm90LWFsbG93ZWQnIDogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7bG9hZGluZyA/IChcclxuICAgICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWFyZ2luUmlnaHQ6ICc4cHgnIH19PuKPszwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICBTaWduaW5nIGluLi4uXHJcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICdTaWduIEluJ1xyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICA8L2Zvcm0+XHJcblxyXG4gICAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICcxLjVyZW0nIH19PlxyXG4gICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzAuODc1cmVtJywgY29sb3I6ICcjNmI3MjgwJyB9fT5cclxuICAgICAgICAgICAgICBEb24ndCBoYXZlIGFuIGFjY291bnQ/eycgJ31cclxuICAgICAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICAgICAgYXM9XCJzcGFuXCJcclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiAnIzI1NjNlYicsIGZvbnRXZWlnaHQ6ICdib2xkJywgY3Vyc29yOiAncG9pbnRlcicgfX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICBDb250YWN0IEFkbWluaXN0cmF0b3JcclxuICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICA8Qm94IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicsIG1hcmdpblRvcDogJzFyZW0nIH19PlxyXG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcwLjc1cmVtJywgY29sb3I6ICcjNmI3MjgwJyB9fT5cclxuICAgICAgICAgICAgwqkgMjAyNCBSZWxpZWYgTWFuYWdlbWVudCBTeXN0ZW0uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgIDwvQm94PlxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvZ2luQ29tcG9uZW50OyIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmRcbmltcG9ydCBMaW5rQ29tcG9uZW50IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9MaW5rQ29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5MaW5rQ29tcG9uZW50ID0gTGlua0NvbXBvbmVudFxuaW1wb3J0IFZvbHVudGVlckZpbHRlcmVkU2VsZWN0IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Wb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3QgPSBWb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdFxuaW1wb3J0IFN0YXR1c0ZpbHRlcmVkU2VsZWN0IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9BaWRSZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlN0YXR1c0ZpbHRlcmVkU2VsZWN0ID0gU3RhdHVzRmlsdGVyZWRTZWxlY3RcbmltcG9ydCBEb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRvbmF0aW9uUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0ID0gRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3RcbmltcG9ydCBMb2dpbkNvbXBvbmVudCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTG9naW5Db21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkxvZ2luQ29tcG9uZW50ID0gTG9naW5Db21wb25lbnQiXSwibmFtZXMiOlsiRGFzaGJvYXJkIiwiY3VycmVudEFkbWluIiwidXNlQ3VycmVudEFkbWluIiwic3RhdHMiLCJzZXRTdGF0cyIsInVzZVN0YXRlIiwiYWlkUmVxdWVzdHMiLCJkb25hdGlvbnMiLCJ0YXNrcyIsInVzZXJzIiwidXNlRWZmZWN0IiwiZmV0Y2hTdGF0cyIsImFwaSIsIkFwaUNsaWVudCIsImVycm9yIiwiY29uc29sZSIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIkJveCIsIm1iIiwiSDIiLCJUZXh0IiwibXQiLCJlbWFpbCIsImRpc3BsYXkiLCJmbGV4V3JhcCIsImdhcCIsImZsZXgiLCJtaW5XaWR0aCIsImJnIiwicCIsImJvcmRlclJhZGl1cyIsImJveFNoYWRvdyIsIkg1IiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwiY29sb3IiLCJhcyIsImhyZWYiLCJib3JkZXIiLCJzdHlsZSIsInRleHREZWNvcmF0aW9uIiwiY3Vyc29yIiwiRGF0ZSIsInRvTG9jYWxlU3RyaW5nIiwiTGlua0NvbXBvbmVudCIsInByb3BzIiwicmVjb3JkIiwibGF0IiwicGFyYW1zIiwibG9uZyIsImxvZyIsIm1hcHNMaW5rIiwidGFyZ2V0IiwicmVsIiwiVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3QiLCJwcm9wZXJ0eSIsIm9uQ2hhbmdlIiwidm9sdW50ZWVycyIsInNldFZvbHVudGVlcnMiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImZldGNoVm9sdW50ZWVycyIsInJlc3BvbnNlIiwicmVzb3VyY2VBY3Rpb24iLCJyZXNvdXJjZUlkIiwiYWN0aW9uTmFtZSIsImRhdGEiLCJyZWNvcmRzIiwibWFwIiwidiIsInZhbHVlIiwiaWQiLCJsYWJlbCIsIm5hbWUiLCJoYW5kbGVDaGFuZ2UiLCJzZWxlY3RlZCIsInNlbGVjdGVkT3B0aW9uIiwiZmluZCIsIm9wdCIsIkZvcm1Hcm91cCIsIkxhYmVsIiwicmVxdWlyZWQiLCJTZWxlY3QiLCJvcHRpb25zIiwiaXNMb2FkaW5nIiwiaXNDbGVhcmFibGUiLCJwbGFjZWhvbGRlciIsImRlc2NyaXB0aW9uIiwiRm9ybU1lc3NhZ2UiLCJTdGF0dXNGaWx0ZXJlZFNlbGVjdCIsInN0YXR1cyIsInNldFN0YXR1cyIsImZldGNoU3RhdHVzIiwiRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QiLCJMb2dpbkNvbXBvbmVudCIsInNldEVtYWlsIiwicGFzc3dvcmQiLCJzZXRQYXNzd29yZCIsInNldEVycm9yIiwic2hvd1Bhc3N3b3JkIiwic2V0U2hvd1Bhc3N3b3JkIiwidHJhbnNsYXRlTWVzc2FnZSIsInVzZVRyYW5zbGF0aW9uIiwiaGFuZGxlU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjcmVkZW50aWFscyIsImpzb24iLCJvayIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVkaXJlY3RVcmwiLCJlcnIiLCJtaW5IZWlnaHQiLCJmb250RmFtaWx5IiwiXyIsIm1kIiwiZmxleERpcmVjdGlvbiIsImp1c3RpZnlDb250ZW50IiwiYWxpZ25JdGVtcyIsImJhY2tncm91bmQiLCJ0ZXh0QWxpZ24iLCJtYXhXaWR0aCIsInNyYyIsImFsdCIsIm1hcmdpbkJvdHRvbSIsIm9uRXJyb3IiLCJvcGFjaXR5IiwibWFyZ2luVG9wIiwiYmFja2dyb3VuZENvbG9yIiwid2lkdGgiLCJvblN1Ym1pdCIsImh0bWxGb3IiLCJJbnB1dCIsInR5cGUiLCJkaXNhYmxlZCIsInBhZGRpbmciLCJwb3NpdGlvbiIsInBhZGRpbmdSaWdodCIsIm9uQ2xpY2siLCJyaWdodCIsInRvcCIsInRyYW5zZm9ybSIsIkJ1dHRvbiIsInZhcmlhbnQiLCJtYXJnaW5SaWdodCIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQUlBLE1BQU1BLFNBQVMsR0FBR0EsTUFBTTtFQUN0QixFQUFBLE1BQU0sQ0FBQ0MsWUFBWSxDQUFDLEdBQUdDLHVCQUFlLEVBQUU7RUFDeEMsRUFBQSxNQUFNLENBQUNDLEtBQUssRUFBRUMsUUFBUSxDQUFDLEdBQUdDLGNBQVEsQ0FBQztFQUNqQ0MsSUFBQUEsV0FBVyxFQUFFLENBQUM7RUFDZEMsSUFBQUEsU0FBUyxFQUFFLENBQUM7RUFDWkMsSUFBQUEsS0FBSyxFQUFFLENBQUM7RUFDUkMsSUFBQUEsS0FBSyxFQUFFO0VBQ1QsR0FBQyxDQUFD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
