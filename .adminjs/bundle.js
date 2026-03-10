(function (React, designSystem, adminjs) {
    'use strict';

    function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

    var React__default = /*#__PURE__*/_interopDefault(React);

    const HeatmapVisualization = () => {
      const mapContainerRef = React.useRef(null);
      const mapInstanceRef = React.useRef(null);
      const heatLayerRef = React.useRef(null);
      const [loading, setLoading] = React.useState(true);
      const [error, setError] = React.useState(null);
      const [caseCount, setCaseCount] = React.useState(0);
      const [noData, setNoData] = React.useState(false);
      React.useEffect(() => {
        let isMounted = true;
        const loadLibraries = async () => {
          // Load Leaflet CSS
          if (!document.getElementById('leaflet-css')) {
            const link = document.createElement('link');
            link.id = 'leaflet-css';
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
          }

          // Load Leaflet JS
          if (!window.L) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            document.body.appendChild(script);
            await new Promise((resolve, reject) => {
              script.onload = resolve;
              script.onerror = reject;
            });
          }

          // Load Leaflet.heat plugin
          if (!window.L.heatLayer) {
            const heatScript = document.createElement('script');
            heatScript.src = 'https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js';
            document.body.appendChild(heatScript);
            await new Promise((resolve, reject) => {
              heatScript.onload = resolve;
              heatScript.onerror = reject;
            });
          }
          return window.L;
        };
        const initMap = async () => {
          try {
            const L = await loadLibraries();

            // Fetch heatmap data from API
            const response = await fetch('/api/dashboard/heatmap');
            const result = await response.json();
            if (!isMounted) return;
            if (!result.success) {
              throw new Error(result.message || 'Failed to fetch heatmap data');
            }
            const heatData = result.data || [];
            setCaseCount(result.count || 0);

            // Filter to valid coordinate points only
            const validPoints = heatData.filter(d => d && typeof d.lat === 'number' && typeof d.lng === 'number' && !isNaN(d.lat) && !isNaN(d.lng)).map(d => [d.lat, d.lng, d.intensity || 0.5]);
            if (validPoints.length === 0) {
              setNoData(true);
              setLoading(false);
              return;
            }

            // Wait a tick to ensure container is rendered
            await new Promise(resolve => setTimeout(resolve, 100));
            if (!isMounted || !mapContainerRef.current) return;

            // Check container has dimensions
            const container = mapContainerRef.current;
            if (container.offsetWidth === 0 || container.offsetHeight === 0) {
              throw new Error('Map container has no dimensions');
            }

            // Initialize map
            const map = L.map(container).setView([10.8505, 76.2711], 8);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Add heatmap layer
            heatLayerRef.current = L.heatLayer(validPoints, {
              radius: 25,
              blur: 15,
              maxZoom: 17,
              max: 1.0,
              minOpacity: 0.3,
              gradient: {
                0.2: '#3b82f6',
                0.4: '#10b981',
                0.6: '#f59e0b',
                0.8: '#ef4444',
                1.0: '#dc2626'
              }
            }).addTo(map);

            // Fit bounds to show all points
            try {
              const bounds = L.latLngBounds(validPoints.map(p => [p[0], p[1]]));
              if (bounds.isValid()) {
                map.fitBounds(bounds, {
                  padding: [50, 50]
                });
              }
            } catch (e) {
              console.warn('Could not fit bounds:', e);
            }
            mapInstanceRef.current = map;
            setLoading(false);
          } catch (err) {
            console.error('Error initializing heatmap:', err);
            if (isMounted) {
              setError(err.message);
              setLoading(false);
            }
          }
        };
        initMap();
        return () => {
          isMounted = false;
          if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
          }
        };
      }, []);

      // Show message if no data
      if (noData) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          mt: "xxl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
          mb: "default"
        }, "\uD83D\uDD25 Active Cases Heatmap"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          bg: "white",
          p: "xl",
          borderRadius: "default",
          border: "default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "200px"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          color: "grey60"
        }, "No active cases with location data available")));
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mt: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        mb: "default"
      }, "\uD83D\uDD25 Active Cases Heatmap"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        p: "lg",
        borderRadius: "default",
        border: "default",
        position: "relative"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        height: "400px",
        position: "relative"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        ref: mapContainerRef,
        style: {
          height: '100%',
          width: '100%',
          visibility: loading ? 'hidden' : 'visible'
        }
      }), loading && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bg: "white"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null)), error && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bg: "white"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "error"
      }, "Error: ", error))), !loading && !error && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mt: "default",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60",
        fontSize: "sm"
      }, "Showing ", caseCount, " active cases"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        gap: "default",
        alignItems: "center"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        alignItems: "center",
        gap: "sm"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        width: "12px",
        height: "12px",
        bg: "#3b82f6",
        borderRadius: "50%"
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm"
      }, "Low")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        alignItems: "center",
        gap: "sm"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        width: "12px",
        height: "12px",
        bg: "#f59e0b",
        borderRadius: "50%"
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm"
      }, "Medium")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        alignItems: "center",
        gap: "sm"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        width: "12px",
        height: "12px",
        bg: "#ef4444",
        borderRadius: "50%"
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm"
      }, "High"))))));
    };

    // Color constants matching CSS design system
    const COLORS = {
      primary: '#2563eb',
      purple: '#8b5cf6',
      cyan: '#06b6d4',
      green: '#10b981',
      red: '#ef4444',
      yellow: '#f59e0b',
      orange: '#f97316'
    };

    // Format relative time
    const formatRelativeTime = dateString => {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      if (diffMins < 60) return `${diffMins} min ago`;
      if (diffHours < 24) return `${diffHours} hours ago`;
      return `${diffDays} days ago`;
    };

    // Format currency
    const formatCurrency = amount => {
      if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
      if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
      return `₹${amount}`;
    };

    // Simple Donut Chart component (SVG-based, no external deps)
    const DonutChart = ({
      data,
      size = 180,
      thickness = 30
    }) => {
      const total = data.reduce((sum, item) => sum + item.value, 0);
      if (total === 0) return null;
      const radius = (size - thickness) / 2;
      const circumference = 2 * Math.PI * radius;
      let currentOffset = 0;
      return /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }
      }, /*#__PURE__*/React__default.default.createElement("svg", {
        width: size,
        height: size,
        viewBox: `0 0 ${size} ${size}`
      }, /*#__PURE__*/React__default.default.createElement("circle", {
        cx: size / 2,
        cy: size / 2,
        r: radius,
        fill: "none",
        stroke: "#e2e8f0",
        strokeWidth: thickness
      }), data.map((item, index) => {
        const percentage = item.value / total;
        const strokeDasharray = `${percentage * circumference} ${circumference}`;
        const strokeDashoffset = -currentOffset;
        currentOffset += percentage * circumference;
        return /*#__PURE__*/React__default.default.createElement("circle", {
          key: index,
          cx: size / 2,
          cy: size / 2,
          r: radius,
          fill: "none",
          stroke: item.color,
          strokeWidth: thickness,
          strokeDasharray: strokeDasharray,
          strokeDashoffset: strokeDashoffset,
          strokeLinecap: "round",
          transform: `rotate(-90 ${size / 2} ${size / 2})`,
          style: {
            transition: 'stroke-dasharray 0.5s ease'
          }
        });
      }), /*#__PURE__*/React__default.default.createElement("text", {
        x: size / 2,
        y: size / 2 - 8,
        textAnchor: "middle",
        fontSize: "24",
        fontWeight: "700",
        fill: "#1e293b"
      }, total), /*#__PURE__*/React__default.default.createElement("text", {
        x: size / 2,
        y: size / 2 + 14,
        textAnchor: "middle",
        fontSize: "12",
        fill: "#64748b"
      }, "Total")), /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }
      }, data.map((item, index) => /*#__PURE__*/React__default.default.createElement("div", {
        key: index,
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: item.color
        }
      }), /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          fontSize: '13px',
          color: '#64748b'
        }
      }, item.name, ": ", /*#__PURE__*/React__default.default.createElement("strong", {
        style: {
          color: '#1e293b'
        }
      }, item.value), " (", (item.value / total * 100).toFixed(0), "%)")))));
    };

    // Simple Bar Chart component (CSS-based)
    const BarChart = ({
      data,
      height = 200
    }) => {
      const maxValue = Math.max(...data.flatMap(d => [d.tasks, d.aidRequests]));
      return /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          height,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          gap: '8px',
          paddingBottom: '30px',
          position: 'relative'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: '30px',
          width: '1px',
          background: '#e2e8f0'
        }
      }), data.map((item, index) => /*#__PURE__*/React__default.default.createElement("div", {
        key: index,
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          maxWidth: '80px'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          gap: '4px',
          height: `${height - 30}px`,
          alignItems: 'flex-end'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          width: '20px',
          height: `${maxValue ? item.tasks / maxValue * 100 : 0}%`,
          background: COLORS.primary,
          borderRadius: '4px 4px 0 0',
          minHeight: item.tasks > 0 ? '4px' : '0',
          transition: 'height 0.3s ease'
        },
        title: `Tasks: ${item.tasks}`
      }), /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          width: '20px',
          height: `${maxValue ? item.aidRequests / maxValue * 100 : 0}%`,
          background: COLORS.purple,
          borderRadius: '4px 4px 0 0',
          minHeight: item.aidRequests > 0 ? '4px' : '0',
          transition: 'height 0.3s ease'
        },
        title: `Aid Requests: ${item.aidRequests}`
      })), /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          fontSize: '11px',
          color: '#64748b',
          marginTop: '8px'
        }
      }, item.month))));
    };
    const Dashboard = () => {
      const [currentAdmin] = adminjs.useCurrentAdmin();
      const [loading, setLoading] = React.useState(true);
      const [stats, setStats] = React.useState(null);
      const [error, setError] = React.useState(null);
      React.useEffect(() => {
        const fetchStats = async () => {
          try {
            setLoading(true);
            const response = await fetch('/api/dashboard/stats');
            const data = await response.json();
            if (data.success) {
              setStats(data.data);
            } else {
              setError('Failed to load dashboard data');
            }
          } catch (err) {
            console.error('Dashboard fetch error:', err);
            setError('Failed to connect to server');
          } finally {
            setLoading(false);
          }
        };
        fetchStats();
        const interval = setInterval(fetchStats, 300000);
        return () => clearInterval(interval);
      }, []);
      if (loading) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null));
      }
      if (error) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          p: "xxl",
          textAlign: "center"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          color: "danger"
        }, error));
      }

      // Task status data for donut
      const taskStatusData = [{
        name: 'Completed',
        value: stats?.tasks?.completed || 0,
        color: COLORS.green
      }, {
        name: 'Open',
        value: stats?.tasks?.open || 0,
        color: COLORS.cyan
      }, {
        name: 'Assigned',
        value: stats?.tasks?.assigned || 0,
        color: COLORS.purple
      }, {
        name: 'Accepted',
        value: stats?.tasks?.accepted || 0,
        color: COLORS.orange
      }].filter(d => d.value > 0);
      return /*#__PURE__*/React__default.default.createElement("div", {
        className: "dashboard-container animate-fade-in"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "xl"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement(designSystem.H2, null, "Welcome back, ", currentAdmin?.email?.split('@')[0] || 'Admin', "!"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60",
        mt: "sm"
      }, "Here's an overview of your Relief Management System")), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey40",
        fontSize: "sm"
      }, "Last updated: ", new Date().toLocaleTimeString()))), /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-cards-row"
      }, /*#__PURE__*/React__default.default.createElement("a", {
        href: "/dashboard/resources/TaskSchema",
        className: "stat-card stat-card-clickable"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-title"
      }, "\uD83D\uDCCB Total Tasks"), /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-value"
      }, stats?.tasks?.total || 0), /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-subtitle"
      }, /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          color: COLORS.green
        }
      }, "\u2713 ", stats?.tasks?.completed || 0), ' completed • ', /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          color: COLORS.cyan
        }
      }, "\u2713 ", stats?.tasks?.open || 0), ' open  • ', /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          color: COLORS.orange
        }
      }, "\u2713 ", stats?.tasks?.assigned || 0), ' assigned • ', /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          color: COLORS.yellow
        }
      }, "\u2713 ", stats?.tasks?.accepted || 0), ' accepted • ', /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          color: COLORS.red
        }
      }, "\u2713 ", stats?.tasks?.rejected || 0), ' rejected • ')), /*#__PURE__*/React__default.default.createElement("a", {
        href: "/dashboard/resources/AidRequest",
        className: "stat-card stat-card-clickable"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-title"
      }, "\uD83C\uDD98 Aid Requests"), /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-value"
      }, stats?.aidRequests?.total || 0), /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-subtitle"
      }, /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          color: COLORS.yellow
        }
      }, stats?.aidRequests?.pending || 0), ' pending • ', /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          color: COLORS.green
        }
      }, stats?.aidRequests?.completed || 0), ' completed')), /*#__PURE__*/React__default.default.createElement("a", {
        href: "/dashboard/resources/DonationRequest",
        className: "stat-card stat-card-clickable"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-title"
      }, "\uD83D\uDCB0 Donation Requests"), /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-value"
      }, stats?.donationRequests?.total || 0), /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-subtitle"
      }, "Total amount: ", formatCurrency(stats?.donationRequests?.totalAmount || 0))), /*#__PURE__*/React__default.default.createElement("a", {
        href: "/dashboard/resources/userProfile",
        className: "stat-card stat-card-clickable"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-title"
      }, "\uD83D\uDC65 Volunteers"), /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-value"
      }, stats?.users?.volunteers || 0), /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-subtitle"
      }, stats?.users?.total || 0, " total registered users"))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mt: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        mb: "lg"
      }, "Quick Actions"), /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap'
        }
      }, /*#__PURE__*/React__default.default.createElement("a", {
        href: "/dashboard/resources/AidRequest",
        className: "quick-action-card",
        style: {
          padding: '14px 20px',
          flexDirection: 'row',
          gap: '10px'
        }
      }, "\uD83D\uDCCB View Aid Requests"), /*#__PURE__*/React__default.default.createElement("a", {
        href: "/dashboard/resources/DonationRequest",
        className: "quick-action-card",
        style: {
          padding: '14px 20px',
          flexDirection: 'row',
          gap: '10px'
        }
      }, "\uD83D\uDCB8 View Donations"), /*#__PURE__*/React__default.default.createElement("a", {
        href: "/dashboard/resources/userProfile",
        className: "quick-action-card",
        style: {
          padding: '14px 20px',
          flexDirection: 'row',
          gap: '10px'
        }
      }, "\uD83D\uDC65 Manage Users"), /*#__PURE__*/React__default.default.createElement("a", {
        href: "/dashboard/resources/Notification/actions/new",
        className: "quick-action-card",
        style: {
          padding: '14px 20px',
          flexDirection: 'row',
          gap: '10px'
        }
      }, "\uD83D\uDD14 Send Notification"))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        mb: "lg"
      }, "Recent Activity"), /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px'
        }
      }, stats?.recentTasks?.slice(0, 4).map((task, index) => /*#__PURE__*/React__default.default.createElement("a", {
        key: task.id || index,
        href: `/dashboard/resources/TaskSchema/records/${task.id}/show`,
        className: "quick-action-card"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "card-time"
      }, /*#__PURE__*/React__default.default.createElement("span", null, "\u23F1"), " ", formatRelativeTime(task.createdAt)), /*#__PURE__*/React__default.default.createElement("div", {
        className: "card-title"
      }, task.name), /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }
      }, /*#__PURE__*/React__default.default.createElement("span", {
        className: `status-badge ${task.status}`
      }, task.status), /*#__PURE__*/React__default.default.createElement("span", {
        className: `priority-badge ${task.priority}`
      }, task.priority)), /*#__PURE__*/React__default.default.createElement("div", {
        className: "card-subtitle"
      }, "\uD83D\uDC65 ", task.volunteers, "/", task.volunteersNeeded, " volunteers"))))), /*#__PURE__*/React__default.default.createElement("div", {
        className: "charts-row"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "chart-card"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "chart-card-header"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "chart-card-title"
      }, "Task Progress")), /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          padding: '20px',
          display: 'flex',
          justifyContent: 'center'
        }
      }, taskStatusData.length > 0 ? /*#__PURE__*/React__default.default.createElement(DonutChart, {
        data: taskStatusData
      }) : /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60",
        textAlign: "center"
      }, "No task data available"))), /*#__PURE__*/React__default.default.createElement("div", {
        className: "chart-card"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "chart-card-header"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "chart-card-title"
      }, "Monthly Statistics"), /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          gap: '16px'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          width: '12px',
          height: '12px',
          borderRadius: '2px',
          background: COLORS.primary
        }
      }), /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          fontSize: '12px',
          color: '#64748b'
        }
      }, "Tasks")), /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          width: '12px',
          height: '12px',
          borderRadius: '2px',
          background: COLORS.purple
        }
      }), /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          fontSize: '12px',
          color: '#64748b'
        }
      }, "Aid Requests")))), /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          padding: '20px 10px'
        }
      }, stats?.monthlyStats?.length > 0 ? /*#__PURE__*/React__default.default.createElement(BarChart, {
        data: stats.monthlyStats,
        height: 180
      }) : /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60",
        textAlign: "center"
      }, "No monthly data available")))), /*#__PURE__*/React__default.default.createElement("div", {
        className: "info-widgets-row"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "chart-card"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "chart-card-header"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "chart-card-title"
      }, "\uD83C\uDFE2 Relief Centers"), /*#__PURE__*/React__default.default.createElement("a", {
        href: "/dashboard/resources/ReliefCenter",
        style: {
          color: COLORS.primary,
          fontSize: '14px',
          textDecoration: 'none'
        }
      }, "View All \u2192")), stats?.reliefCenters?.length > 0 ? stats.reliefCenters.map((center, index) => /*#__PURE__*/React__default.default.createElement("div", {
        key: center.id || index,
        className: "relief-center-item"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "relief-center-icon"
      }, "\uD83C\uDFE0"), /*#__PURE__*/React__default.default.createElement("div", {
        className: "relief-center-info"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "relief-center-name"
      }, center.name), /*#__PURE__*/React__default.default.createElement("div", {
        className: "relief-center-coordinator"
      }, "\uD83D\uDCDE ", center.coordinator)))) : /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60",
        textAlign: "center",
        p: "lg"
      }, "No relief centers registered")), /*#__PURE__*/React__default.default.createElement("div", {
        className: "chart-card"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "chart-card-header"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "chart-card-title"
      }, "\uD83D\uDCB3 Relief Fund Wallet")), stats?.wallet ? /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("div", {
        className: "wallet-balance"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "wallet-amount"
      }, formatCurrency(stats.wallet.balance)), /*#__PURE__*/React__default.default.createElement("br", null), /*#__PURE__*/React__default.default.createElement("div", {
        className: "wallet-label"
      }, "Current Balance")), /*#__PURE__*/React__default.default.createElement("div", {
        className: "wallet-stats"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "wallet-stat"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "wallet-stat-value",
        style: {
          color: COLORS.green
        }
      }, formatCurrency(stats.wallet.totalCredits)), /*#__PURE__*/React__default.default.createElement("div", {
        className: "wallet-stat-label"
      }, "Credits")), /*#__PURE__*/React__default.default.createElement("div", {
        className: "wallet-stat"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "wallet-stat-value",
        style: {
          color: COLORS.red
        }
      }, formatCurrency(stats.wallet.totalDebits)), /*#__PURE__*/React__default.default.createElement("div", {
        className: "wallet-stat-label"
      }, "Debits")), /*#__PURE__*/React__default.default.createElement("div", {
        className: "wallet-stat"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "wallet-stat-value",
        style: {
          color: COLORS.purple
        }
      }, stats.wallet.donorCount), /*#__PURE__*/React__default.default.createElement("div", {
        className: "wallet-stat-label"
      }, "Donors")))) : /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60",
        textAlign: "center",
        p: "lg"
      }, "Wallet not initialized")), /*#__PURE__*/React__default.default.createElement("div", {
        className: "chart-card"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "chart-card-header"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "chart-card-title"
      }, "\uD83C\uDFAF Active Priorities")), /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          padding: '8px 0'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 0',
          borderBottom: '1px solid #e2e8f0'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: COLORS.red
        }
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "500"
      }, "High Priority")), /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          fontWeight: '600',
          color: COLORS.red,
          fontSize: '18px'
        }
      }, stats?.priorities?.high || 0)), /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 0',
          borderBottom: '1px solid #e2e8f0'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: COLORS.yellow
        }
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "500"
      }, "Medium Priority")), /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          fontWeight: '600',
          color: COLORS.yellow,
          fontSize: '18px'
        }
      }, stats?.priorities?.medium || 0)), /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 0'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: COLORS.green
        }
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "500"
      }, "Low Priority")), /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          fontWeight: '600',
          color: COLORS.green,
          fontSize: '18px'
        }
      }, stats?.priorities?.low || 0))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mt: "xl"
      }, /*#__PURE__*/React__default.default.createElement(HeatmapVisualization, null)));
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

    const api$4 = new adminjs.ApiClient();
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
          const response = await api$4.resourceAction({
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

    const api$3 = new adminjs.ApiClient();
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
          const response = await api$3.resourceAction({
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

    const api$2 = new adminjs.ApiClient();
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
          const response = await api$2.resourceAction({
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
      const [success, setSuccess] = React.useState('');
      const [loading, setLoading] = React.useState(false);
      const [showPassword, setShowPassword] = React.useState(false);
      const {
        translateMessage
      } = adminjs.useTranslation();

      // View states: 'login' | 'forgotPassword' | 'resetPassword'
      const [view, setView] = React.useState('login');
      const [resetEmail, setResetEmail] = React.useState('');
      const [otp, setOtp] = React.useState('');
      const [newPassword, setNewPassword] = React.useState('');
      const [showNewPassword, setShowNewPassword] = React.useState(false);
      const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');
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
      const handleForgotPassword = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
          const response = await fetch('/dashboard/forgot-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: resetEmail
            })
          });
          const data = await response.json();
          if (response.ok && data.success) {
            setSuccess('OTP has been generated. Check the server console for the OTP.');
            setView('resetPassword');
          } else {
            setError(data.message || 'Failed to process request');
          }
        } catch (err) {
          console.error('Forgot password error:', err);
          setError('An error occurred. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      const handleResetPassword = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
          const response = await fetch('/dashboard/reset-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: resetEmail,
              otp,
              newPassword
            })
          });
          const data = await response.json();
          if (response.ok && data.success) {
            setSuccess('Password has been reset successfully. Please login with your new password.');
            setView('login');
            setResetEmail('');
            setOtp('');
            setNewPassword('');
          } else {
            setError(data.message || 'Failed to reset password');
          }
        } catch (err) {
          console.error('Reset password error:', err);
          setError('An error occurred. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      const switchToForgotPassword = () => {
        setError('');
        setSuccess('');
        setResetEmail(email || '');
        setView('forgotPassword');
      };
      const switchToLogin = () => {
        setError('');
        setView('login');
      };
      const renderForm = () => {
        if (view === 'forgotPassword') {
          return /*#__PURE__*/React__default.default.createElement("form", {
            onSubmit: handleForgotPassword
          }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
            mb: "xl"
          }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
            style: {
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#111827'
            }
          }, "Forgot Password"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
            style: {
              fontSize: '1rem',
              color: '#6b7280',
              marginTop: '0.5rem'
            }
          }, "Enter your email address and we'll send you an OTP to reset your password.")), error && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
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
          }, "\u26A0\uFE0F ", error)), success && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
            p: "default",
            mb: "default",
            style: {
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '0.375rem'
            }
          }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
            style: {
              color: '#16a34a',
              fontSize: '0.875rem'
            }
          }, "\u2705 ", success)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
            mb: "lg"
          }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
            htmlFor: "resetEmail",
            required: true
          }, "Email Address"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
            id: "resetEmail",
            type: "email",
            value: resetEmail,
            onChange: e => setResetEmail(e.target.value),
            placeholder: "admin@example.com",
            required: true,
            disabled: loading,
            style: {
              width: '100%',
              padding: '12px',
              fontSize: '16px'
            }
          })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
            mb: "default",
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
          }, loading ? /*#__PURE__*/React__default.default.createElement("span", null, "\u23F3 Sending OTP...") : 'Send OTP')), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
            style: {
              textAlign: 'center',
              marginTop: '1rem'
            }
          }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
            as: "span",
            style: {
              color: '#2563eb',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '0.875rem'
            },
            onClick: switchToLogin
          }, "\u2190 Back to Sign In")));
        }
        if (view === 'resetPassword') {
          return /*#__PURE__*/React__default.default.createElement("form", {
            onSubmit: handleResetPassword
          }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
            mb: "xl"
          }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
            style: {
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#111827'
            }
          }, "Reset Password"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
            style: {
              fontSize: '1rem',
              color: '#6b7280',
              marginTop: '0.5rem'
            }
          }, "Enter the OTP sent to your email and your new password.")), error && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
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
          }, "\u26A0\uFE0F ", error)), success && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
            p: "default",
            mb: "default",
            style: {
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '0.375rem'
            }
          }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
            style: {
              color: '#16a34a',
              fontSize: '0.875rem'
            }
          }, "\u2705 ", success)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
            mb: "lg"
          }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
            htmlFor: "otpInput",
            required: true
          }, "OTP Code"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
            id: "otpInput",
            type: "text",
            value: otp,
            onChange: e => setOtp(e.target.value),
            placeholder: "Enter 6-digit OTP",
            required: true,
            disabled: loading,
            maxLength: 6,
            style: {
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              letterSpacing: '4px',
              textAlign: 'center'
            }
          })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
            mb: "default"
          }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
            htmlFor: "newPassword",
            required: true
          }, "New Password"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
            style: {
              position: 'relative'
            }
          }, /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
            id: "newPassword",
            type: showNewPassword ? 'text' : 'password',
            value: newPassword,
            onChange: e => setNewPassword(e.target.value),
            placeholder: "Enter new password (min 6 characters)",
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
            onClick: () => setShowNewPassword(!showNewPassword),
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
          }, showNewPassword ? '👁️' : '👁️‍🗨️'))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
            mb: "default",
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
          }, loading ? /*#__PURE__*/React__default.default.createElement("span", null, "\u23F3 Resetting...") : 'Reset Password')), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
            style: {
              textAlign: 'center',
              marginTop: '1rem'
            }
          }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
            as: "span",
            style: {
              color: '#2563eb',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '0.875rem'
            },
            onClick: switchToLogin
          }, "\u2190 Back to Sign In")));
        }

        // Default: Login view
        return /*#__PURE__*/React__default.default.createElement("form", {
          onSubmit: handleSubmit
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
        }, "\u26A0\uFE0F ", error)), success && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          p: "default",
          mb: "default",
          style: {
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '0.375rem'
          }
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          style: {
            color: '#16a34a',
            fontSize: '0.875rem'
          }
        }, "\u2705 ", success)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
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
          style: {
            textAlign: 'right',
            marginBottom: '0.5rem'
          }
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          as: "span",
          style: {
            color: '#2563eb',
            fontWeight: '500',
            cursor: 'pointer',
            fontSize: '0.875rem'
          },
          onClick: switchToForgotPassword
        }, "Forgot Password?")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
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
        }, "\u23F3"), "Signing in...") : 'Sign In')));
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
      }, renderForm(), view === 'login' && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
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
      }, "\xA9 2026 Relief Management System. All rights reserved."))));
    };

    const ImageComponent = props => {
      const {
        record,
        property
      } = props;
      const rawImageUrl = record.params[property.name];
      const [hasError, setHasError] = React.useState(false);
      if (!rawImageUrl) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement("span", {
          style: {
            color: '#999',
            fontSize: '12px'
          }
        }, "No image"));
      }

      // Normalize URL: ensure it starts with '/' for server-relative paths
      const imageUrl = rawImageUrl.startsWith('/') || rawImageUrl.startsWith('http') ? rawImageUrl : `/${rawImageUrl}`;
      if (hasError) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement("span", {
          style: {
            color: '#dc3545',
            fontSize: '11px'
          }
        }, "Image not found"));
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement("img", {
        src: imageUrl,
        alt: property.label,
        style: {
          maxWidth: '100px',
          maxHeight: '100px',
          objectFit: 'cover'
        },
        onError: () => setHasError(true)
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

      // Normalize URL: ensure it starts with '/' for server-relative paths
      const normalizeUrl = url => {
        if (!url) return url;
        return url.startsWith('/') || url.startsWith('http') ? url : `/${url}`;
      };
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 2
      }, images.map((url, index) => /*#__PURE__*/React__default.default.createElement("img", {
        key: index,
        src: normalizeUrl(url),
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

    const api$1 = new adminjs.ApiClient();
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
            const response = await api$1.resourceAction({
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
            const response = await api$1.resourceAction({
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

      // Initial Values - safely parse and validate
      const getInitialValue = path => record.params[`${property.name}.${path}`];
      const parsedLat = parseFloat(getInitialValue('location.coordinates.1'));
      const parsedLng = parseFloat(getInitialValue('location.coordinates.0'));
      const initialLat = !isNaN(parsedLat) ? parsedLat : null;
      const initialLng = !isNaN(parsedLng) ? parsedLng : null;
      const hasInitialCoords = initialLat !== null && initialLng !== null && (initialLat !== 0 || initialLng !== 0);
      const [position, setPosition] = React.useState(hasInitialCoords ? [initialLat, initialLng] : null);
      const [searchQuery, setSearchQuery] = React.useState('');
      const [addressData, setAddressData] = React.useState({
        addressLine1: getInitialValue('addressLine1') || '',
        addressLine2: getInitialValue('addressLine2') || '',
        addressLine3: getInitialValue('addressLine3') || '',
        pinCode: getInitialValue('pinCode') || '',
        location: hasInitialCoords ? {
          type: 'Point',
          coordinates: [initialLng, initialLat]
        } : null
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

        // Parse coordinates and check if they're valid
        const lng = parseFloat(data.location?.coordinates?.[0]);
        const lat = parseFloat(data.location?.coordinates?.[1]);
        const hasValidCoordinates = !isNaN(lng) && !isNaN(lat) && (lng !== 0 || lat !== 0);
        const payload = {
          addressLine1: data.addressLine1 || '',
          addressLine2: data.addressLine2 || '',
          addressLine3: data.addressLine3 || '',
          pinCode: cleanPin
        };

        // Only include location if we have valid coordinates
        if (hasValidCoordinates) {
          payload.location = {
            type: 'Point',
            coordinates: [lng, lat]
          };
        }
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

      // Track if this is the initial mount to avoid immediate sync
      const isInitialMount = React.useRef(true);

      // Sync state changes to AdminJS
      // This is the ONLY place where we notify AdminJS of changes
      // Skip the first render to avoid sending potentially invalid initial data
      React.useEffect(() => {
        if (isInitialMount.current) {
          isInitialMount.current = false;
          return;
        }
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

      // Debug: Log errors and full record structure on every render
      // Note: The error `coordinates.0` often comes from top-level `location` field, not from address
      if (record?.errors && Object.keys(record.errors).length > 0) {
        // Check if error is specifically for our property (address)
        const relevantErrors = Object.entries(record.errors).filter(([key]) => key.startsWith(property.name) || key.startsWith(`${property.name}.`)).reduce((acc, [k, v]) => ({
          ...acc,
          [k]: v
        }), {});

        // Only log if there are errors for our specific property
        if (Object.keys(relevantErrors).length > 0) {
          console.log('[DEBUG] Errors for', property.name, ':', JSON.stringify(relevantErrors, null, 2));
        }

        // The `coordinates.0` error without prefix is from top-level `location` field,
        // not from `address.location` - it's a separate field in the schema
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
        border: "default",
        style: {
          position: 'relative',
          zIndex: 0
        }
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

    /**
     * TaskLocationShow - A component for displaying pickup/delivery locations in Task views
     * Shows formatted address with a small map preview and a "Get Directions" link
     */
    const TaskLocationShow = props => {
      const {
        record,
        property
      } = props;
      const mapContainerRef = React.useRef(null);
      const mapInstanceRef = React.useRef(null);

      // Determine which location type we're showing based on property name
      const isPickup = property.name.includes('pickup') || property.name === 'pickupLocation';
      const isDelivery = property.name.includes('delivery') || property.name === 'deliveryLocation';
      property.name === 'location';

      // Get the appropriate prefix for nested fields
      const locationPrefix = property.name;
      const addressPrefix = isPickup ? 'pickupAddress' : isDelivery ? 'deliveryAddress' : 'address';

      // Extract coordinates from flattened AdminJS params
      const parsedLng = parseFloat(record.params[`${locationPrefix}.coordinates.0`]);
      const parsedLat = parseFloat(record.params[`${locationPrefix}.coordinates.1`]);
      const lng = !isNaN(parsedLng) ? parsedLng : 0;
      const lat = !isNaN(parsedLat) ? parsedLat : 0;
      const hasCoordinates = !isNaN(parsedLat) && !isNaN(parsedLng) && (lat !== 0 || lng !== 0);

      // Extract address fields
      const addressLine1 = record.params[`${addressPrefix}.addressLine1`] || '';
      const addressLine2 = record.params[`${addressPrefix}.addressLine2`] || '';
      const addressLine3 = record.params[`${addressPrefix}.addressLine3`] || '';
      const pinCode = record.params[`${addressPrefix}.pinCode`] || '';

      // Build formatted address parts
      const addressParts = [addressLine1, addressLine2, addressLine3].filter(line => line && line.trim() !== '');
      const formattedAddress = addressParts.join(', ') + (pinCode ? ` - ${pinCode}` : '');

      // Google Maps directions URL
      const mapsUrl = hasCoordinates ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}` : formattedAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}` : null;

      // Determine label and icon based on location type
      const getLabel = () => {
        if (isPickup) return 'Pickup Location';
        if (isDelivery) return 'Delivery Location';
        return property.label || 'Location';
      };
      const getIcon = () => {
        if (isPickup) return '📦';
        if (isDelivery) return '🏠';
        return '📍';
      };
      const getColor = () => {
        if (isPickup) return {
          bg: '#fff3cd',
          border: '#ffc107',
          accent: '#856404'
        };
        if (isDelivery) return {
          bg: '#d4edda',
          border: '#28a745',
          accent: '#155724'
        };
        return {
          bg: '#f8f9fa',
          border: '#dee2e6',
          accent: '#495057'
        };
      };
      const colors = getColor();

      // Load Leaflet and display map
      React.useEffect(() => {
        if (!hasCoordinates) return;
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
            const map = L.map(mapContainerRef.current, {
              zoomControl: false,
              dragging: false,
              scrollWheelZoom: false,
              doubleClickZoom: false,
              touchZoom: false
            }).setView([lat, lng], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OSM'
            }).addTo(map);
            L.marker([lat, lng]).addTo(map);
            mapInstanceRef.current = map;
          }
        });
        return () => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
          }
        };
      }, [lat, lng, hasCoordinates]);

      // If no location data at all
      if (!hasCoordinates && !addressLine1 && !addressLine2 && !addressLine3 && !pinCode) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          mb: "lg"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, getLabel()), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          variant: "sm",
          color: "grey60"
        }, "No location data available"));
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "lg"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
        style: {
          marginBottom: '8px',
          fontWeight: 600
        }
      }, getLabel()), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          background: `linear-gradient(135deg, ${colors.bg} 0%, #ffffff 100%)`,
          borderRadius: '12px',
          padding: '16px',
          border: `2px solid ${colors.border}`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }
      }, (addressLine1 || addressLine2 || addressLine3 || pinCode) && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "default"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: true,
        flexDirection: "row",
        alignItems: "flex-start",
        style: {
          gap: '8px'
        }
      }, /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          fontSize: '20px'
        }
      }, getIcon()), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, addressLine1 && /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        style: {
          fontWeight: 500,
          fontSize: '14px',
          color: '#212529'
        }
      }, addressLine1), addressLine2 && /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        style: {
          fontSize: '13px',
          color: '#495057'
        }
      }, addressLine2), addressLine3 && /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        style: {
          fontSize: '13px',
          color: '#6c757d'
        }
      }, addressLine3), pinCode && /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        style: {
          fontSize: '13px',
          color: '#6c757d',
          marginTop: '4px'
        }
      }, "PIN: ", pinCode)))), hasCoordinates && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          height: '180px',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '12px',
          border: `1px solid ${colors.border}`
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        ref: mapContainerRef,
        style: {
          height: '100%',
          width: '100%'
        }
      })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: true,
        flexDirection: "row",
        alignItems: "center",
        style: {
          gap: '12px',
          flexWrap: 'wrap'
        }
      }, mapsUrl && /*#__PURE__*/React__default.default.createElement("a", {
        href: mapsUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          backgroundColor: '#4285f4',
          color: 'white',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: 500,
          transition: 'background-color 0.2s'
        },
        onMouseOver: e => e.currentTarget.style.backgroundColor = '#3367d6',
        onMouseOut: e => e.currentTarget.style.backgroundColor = '#4285f4'
      }, "\uD83E\uDDED Get Directions"), hasCoordinates && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          border: '1px solid #dee2e6'
        }
      }, /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          fontSize: '12px'
        }
      }, "\uD83C\uDF10"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        style: {
          fontSize: '12px',
          color: '#6c757d',
          fontFamily: 'monospace'
        }
      }, lat.toFixed(5), ", ", lng.toFixed(5))))));
    };

    /**
     * TaskLocationLink - A compact component for displaying location links in Task list views
     * Shows appropriate icons and links to Google Maps based on the location type
     */
    const TaskLocationLink = props => {
      const {
        record,
        property
      } = props;

      // Determine which location type we're showing based on property name
      const isPickup = property.name.includes('pickup') || property.name === 'pickupLocation';
      const isDelivery = property.name.includes('delivery') || property.name === 'deliveryLocation';

      // Get the appropriate prefix for nested fields
      const locationPrefix = property.name;
      const addressPrefix = isPickup ? 'pickupAddress' : isDelivery ? 'deliveryAddress' : 'address';

      // Extract coordinates from flattened AdminJS params
      const lat = record.params[`${locationPrefix}.coordinates.1`];
      const lng = record.params[`${locationPrefix}.coordinates.0`];

      // Check for address data
      const addressLine1 = record.params[`${addressPrefix}.addressLine1`];
      const addressLine2 = record.params[`${addressPrefix}.addressLine2`];

      // If no coordinates, return a subtle indicator
      if (!lat || !lng) {
        return /*#__PURE__*/React__default.default.createElement("span", {
          style: {
            color: '#adb5bd',
            fontSize: '12px'
          }
        }, "\u2014");
      }

      // Attempt to construct an address string from the record
      const addressParts = [addressLine1, addressLine2, record.params[`${addressPrefix}.addressLine3`], record.params[`${addressPrefix}.pinCode`]].filter(part => part && part.toString().trim() !== '');
      let query = '';
      if (addressParts.length > 0) {
        query = encodeURIComponent(addressParts.join(', '));
      } else {
        query = `${lat},${lng}`;
      }
      const mapsLink = `https://www.google.com/maps/search/?api=1&query=${query}`;

      // Determine icon and color based on location type
      const getStyle = () => {
        if (isPickup) {
          return {
            icon: '📦',
            label: 'Pickup',
            bgColor: '#fff3cd',
            textColor: '#856404',
            borderColor: '#ffc107'
          };
        }
        if (isDelivery) {
          return {
            icon: '🏠',
            label: 'Delivery',
            bgColor: '#d4edda',
            textColor: '#155724',
            borderColor: '#28a745'
          };
        }
        return {
          icon: '📍',
          label: 'View',
          bgColor: '#e3f2fd',
          textColor: '#1565c0',
          borderColor: '#2196f3'
        };
      };
      const style = getStyle();
      return /*#__PURE__*/React__default.default.createElement("a", {
        href: mapsLink,
        target: "_blank",
        rel: "noopener noreferrer",
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 10px',
          backgroundColor: style.bgColor,
          color: style.textColor,
          borderRadius: '16px',
          textDecoration: 'none',
          fontSize: '12px',
          fontWeight: 500,
          border: `1px solid ${style.borderColor}`,
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap'
        },
        onMouseOver: e => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
        },
        onMouseOut: e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        },
        title: addressParts.length > 0 ? addressParts.join(', ') : `${lat}, ${lng}`
      }, /*#__PURE__*/React__default.default.createElement("span", null, style.icon), /*#__PURE__*/React__default.default.createElement("span", null, style.label));
    };

    const api = new adminjs.ApiClient();
    const NotificationForm = props => {
      const {
        record: initialRecord,
        resource,
        action
      } = props;
      const {
        record,
        handleChange,
        submit
      } = adminjs.useRecord(initialRecord, resource.id);

      // Delivery mode: 'broadcast' or 'targeted'
      const [deliveryMode, setDeliveryMode] = React.useState('broadcast');
      const [users, setUsers] = React.useState([]);
      const [loadingUsers, setLoadingUsers] = React.useState(false);
      const [saving, setSaving] = React.useState(false);
      const [errors, setErrors] = React.useState({});

      // Notification types
      const notificationTypes = [{
        value: 'admin_broadcast',
        label: '📢 Announcement'
      }, {
        value: 'weather_alert',
        label: '⛈️ Weather Alert'
      }, {
        value: 'disaster_alert',
        label: '🚨 Disaster Alert'
      }, {
        value: 'relief_center_update',
        label: '📍 Relief Center Update'
      }, {
        value: 'system_notification',
        label: '🔧 System Notice'
      }];

      // Audience options (for broadcast mode)
      const audienceOptions = [{
        value: 'all',
        label: '👥 Everyone (Public + Volunteers)'
      }, {
        value: 'public',
        label: '🏠 Public Users Only'
      }, {
        value: 'volunteer',
        label: '🙋 Volunteers Only'
      }];

      // Load users for the dropdown (fetching more records)
      React.useEffect(() => {
        const loadUsers = async () => {
          setLoadingUsers(true);
          try {
            // Fetch up to 500 users to ensure we get both public and volunteers
            // In production, this should be a search, but for now increasing limit helps
            const response = await api.resourceAction({
              resourceId: 'userProfile',
              actionName: 'list',
              query: {
                perPage: 500
              }
            });
            if (response.data.records) {
              setUsers(response.data.records.map(r => ({
                value: r.id,
                label: `${r.params.name} (${r.params.role})` // Simplified label
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
      const initializedRef = React.useRef(false);

      // Initialize default values - ensure state is set before first render cycle completes
      React.useEffect(() => {
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
      const handleDeliveryModeChange = mode => {
        setDeliveryMode(mode);
        if (mode === 'broadcast') {
          // Broadcast mode: Clear recipient, ensure targetUserType is set from dropdown (or default to all)
          const currentAudience = record.params.targetUserType === 'all' || record.params.targetUserType === 'public' || record.params.targetUserType === 'volunteer' ? record.params.targetUserType : 'all';
          handleChange({
            params: {
              ...record.params,
              recipientId: null,
              targetUserType: currentAudience
            }
          });
        } else {
          // Targeted mode: Force targetUserType to 'all' so query logic works (recipientId takes precedence)
          handleChange({
            params: {
              ...record.params,
              targetUserType: 'all'
            }
          });
        }
      };

      // Handle form submission
      const handleSubmit = async e => {
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
          setErrors({
            general: 'Failed to save notification. Please try again.'
          });
        }
        setSaving(false);
      };

      // Styles
      const styles = {
        container: {
          width: '100%'
        },
        header: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          color: 'white'
        },
        headerTitle: {
          margin: 0,
          marginBottom: '8px',
          fontSize: '24px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        },
        headerSubtitle: {
          margin: 0,
          opacity: 0.9,
          fontSize: '14px'
        },
        section: {
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #eee'
        },
        sectionTitle: {
          fontSize: '16px',
          fontWeight: '600',
          color: '#333',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        },
        toggleContainer: {
          display: 'flex',
          gap: '12px',
          marginTop: '12px'
        },
        toggleButton: isActive => ({
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
          gap: '8px'
        }),
        toggleIcon: {
          fontSize: '24px'
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
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        },
        errorBox: {
          background: '#fff5f5',
          border: '1px solid #feb2b2',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '20px',
          color: '#c53030'
        },
        hint: {
          fontSize: '13px',
          color: '#888',
          marginTop: '8px'
        },
        label: {
          fontWeight: '500',
          color: '#444',
          marginBottom: '8px',
          display: 'block'
        },
        required: {
          color: '#e53e3e',
          marginLeft: '4px'
        },
        fullWidthInput: {
          width: '100%',
          borderRadius: '8px'
        }
      };
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        as: "form",
        onSubmit: handleSubmit,
        style: styles.container
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: styles.header
      }, /*#__PURE__*/React__default.default.createElement("h2", {
        style: styles.headerTitle
      }, /*#__PURE__*/React__default.default.createElement("span", null, "\uD83D\uDCEC"), " Create Notification"), /*#__PURE__*/React__default.default.createElement("p", {
        style: styles.headerSubtitle
      }, "Send announcements, alerts, or updates to your users")), errors.general && /*#__PURE__*/React__default.default.createElement("div", {
        style: styles.errorBox
      }, "\u26A0\uFE0F ", errors.general), /*#__PURE__*/React__default.default.createElement("div", {
        style: styles.section
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: styles.sectionTitle
      }, /*#__PURE__*/React__default.default.createElement("span", null, "\u270F\uFE0F"), " Notification Content"), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, {
        error: errors.title,
        mb: "xl"
      }, /*#__PURE__*/React__default.default.createElement("label", {
        style: styles.label
      }, "Notification Title ", /*#__PURE__*/React__default.default.createElement("span", {
        style: styles.required
      }, "*")), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
        value: record.params.title || '',
        onChange: e => handleChange({
          params: {
            ...record.params,
            title: e.target.value
          }
        }),
        placeholder: "Enter a short, attention-grabbing headline",
        style: {
          borderRadius: '8px',
          width: '100%'
        }
      }), errors.title && /*#__PURE__*/React__default.default.createElement(designSystem.FormMessage, null, errors.title)), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, {
        error: errors.body,
        mb: "xl"
      }, /*#__PURE__*/React__default.default.createElement("label", {
        style: styles.label
      }, "Message ", /*#__PURE__*/React__default.default.createElement("span", {
        style: styles.required
      }, "*")), /*#__PURE__*/React__default.default.createElement(designSystem.TextArea, {
        value: record.params.body || '',
        onChange: e => handleChange({
          params: {
            ...record.params,
            body: e.target.value
          }
        }),
        placeholder: "Enter the detailed notification content",
        rows: 5,
        style: {
          borderRadius: '8px',
          width: '100%',
          minHeight: '120px'
        }
      }), errors.body && /*#__PURE__*/React__default.default.createElement(designSystem.FormMessage, null, errors.body)), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, {
        error: errors.type
      }, /*#__PURE__*/React__default.default.createElement("label", {
        style: styles.label
      }, "Notification Type ", /*#__PURE__*/React__default.default.createElement("span", {
        style: styles.required
      }, "*")), /*#__PURE__*/React__default.default.createElement(designSystem.Select, {
        value: notificationTypes.find(t => t.value === record.params.type) || null,
        options: notificationTypes,
        onChange: selected => handleChange({
          params: {
            ...record.params,
            type: selected?.value
          }
        }),
        placeholder: "Select notification type..."
      }), errors.type && /*#__PURE__*/React__default.default.createElement(designSystem.FormMessage, null, errors.type))), /*#__PURE__*/React__default.default.createElement("div", {
        style: styles.section
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: styles.sectionTitle
      }, /*#__PURE__*/React__default.default.createElement("span", null, "\uD83D\uDCE4"), " Delivery Options"), /*#__PURE__*/React__default.default.createElement("label", {
        style: styles.label
      }, "Who should receive this notification?"), /*#__PURE__*/React__default.default.createElement("div", {
        style: styles.toggleContainer
      }, /*#__PURE__*/React__default.default.createElement("button", {
        type: "button",
        style: styles.toggleButton(deliveryMode === 'broadcast'),
        onClick: () => handleDeliveryModeChange('broadcast')
      }, /*#__PURE__*/React__default.default.createElement("span", {
        style: styles.toggleIcon
      }, "\uD83D\uDCE2"), /*#__PURE__*/React__default.default.createElement("span", null, "Broadcast to Audience"), /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          fontSize: '12px',
          opacity: 0.8
        }
      }, "Send to a group of users")), /*#__PURE__*/React__default.default.createElement("button", {
        type: "button",
        style: styles.toggleButton(deliveryMode === 'targeted'),
        onClick: () => handleDeliveryModeChange('targeted')
      }, /*#__PURE__*/React__default.default.createElement("span", {
        style: styles.toggleIcon
      }, "\uD83C\uDFAF"), /*#__PURE__*/React__default.default.createElement("span", null, "Send to Specific User"), /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          fontSize: '12px',
          opacity: 0.8
        }
      }, "Send to one person only"))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mt: "xl"
      }, deliveryMode === 'broadcast' ? /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement("label", {
        style: styles.label
      }, "Select Audience"), /*#__PURE__*/React__default.default.createElement(designSystem.Select, {
        value: audienceOptions.find(a => a.value === record.params.targetUserType) || null,
        options: audienceOptions,
        onChange: selected => handleChange({
          params: {
            ...record.params,
            targetUserType: selected?.value,
            recipientId: null
          }
        }),
        placeholder: "Select audience..."
      }), /*#__PURE__*/React__default.default.createElement("p", {
        style: styles.hint
      }, "\u2139\uFE0F This notification will be sent to all users in the selected audience.")) : /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, {
        error: errors.recipientId
      }, /*#__PURE__*/React__default.default.createElement("label", {
        style: styles.label
      }, "Select User ", /*#__PURE__*/React__default.default.createElement("span", {
        style: styles.required
      }, "*")), /*#__PURE__*/React__default.default.createElement(designSystem.Select, {
        value: users.find(u => u.value === record.params.recipientId),
        options: users,
        isLoading: loadingUsers,
        onChange: selected => handleChange({
          params: {
            ...record.params,
            recipientId: selected?.value,
            targetUserType: 'all'
          }
        }),
        placeholder: "Search and select a user...",
        isClearable: true
      }), errors.recipientId && /*#__PURE__*/React__default.default.createElement(designSystem.FormMessage, null, errors.recipientId), /*#__PURE__*/React__default.default.createElement("p", {
        style: styles.hint
      }, "\u2139\uFE0F This notification will be sent only to the selected user.")))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mt: "xl",
        mb: "xl"
      }, /*#__PURE__*/React__default.default.createElement("button", {
        type: "submit",
        style: {
          ...styles.submitButton,
          opacity: saving ? 0.7 : 1,
          cursor: saving ? 'not-allowed' : 'pointer'
        },
        disabled: saving
      }, saving ? /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, "\u23F3 Sending...") : /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, "\uD83D\uDCE4 Send Notification"))));
    };

    /**
     * AddressShow - A clean component for displaying address in AdminJS show views
     * Shows formatted address with a small map preview and a "Get Directions" link
     */
    const AddressShow = props => {
      const {
        record,
        property
      } = props;
      const mapContainerRef = React.useRef(null);
      const mapInstanceRef = React.useRef(null);

      // Extract address fields from flattened AdminJS params
      const getFieldValue = path => record.params[`${property.name}.${path}`];
      const addressLine1 = getFieldValue('addressLine1') || '';
      const addressLine2 = getFieldValue('addressLine2') || '';
      const addressLine3 = getFieldValue('addressLine3') || '';
      const pinCode = getFieldValue('pinCode') || '';

      // Location coordinates (GeoJSON format: [lng, lat])
      const parsedLng = parseFloat(getFieldValue('location.coordinates.0'));
      const parsedLat = parseFloat(getFieldValue('location.coordinates.1'));
      const lng = !isNaN(parsedLng) ? parsedLng : 0;
      const lat = !isNaN(parsedLat) ? parsedLat : 0;
      const hasCoordinates = !isNaN(parsedLat) && !isNaN(parsedLng) && (lat !== 0 || lng !== 0);

      // Build formatted address parts
      const addressParts = [addressLine1, addressLine2, addressLine3].filter(line => line && line.trim() !== '');
      const formattedAddress = addressParts.join(', ') + (pinCode ? ` - ${pinCode}` : '');

      // Google Maps directions URL
      const mapsUrl = hasCoordinates ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`;

      // Load Leaflet and display map
      React.useEffect(() => {
        if (!hasCoordinates) return;
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
            const map = L.map(mapContainerRef.current, {
              zoomControl: false,
              dragging: false,
              scrollWheelZoom: false,
              doubleClickZoom: false,
              touchZoom: false
            }).setView([lat, lng], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OSM'
            }).addTo(map);
            L.marker([lat, lng]).addTo(map);
            mapInstanceRef.current = map;
          }
        });
        return () => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
          }
        };
      }, [lat, lng, hasCoordinates]);

      // If no address data at all
      if (!addressLine1 && !addressLine2 && !addressLine3 && !pinCode && !hasCoordinates) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          mb: "lg"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, property.label || 'Address'), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          variant: "sm",
          color: "grey60"
        }, "No address provided"));
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "lg"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
        style: {
          marginBottom: '8px',
          fontWeight: 600
        }
      }, property.label || 'Address'), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: '12px',
          padding: '16px',
          border: '1px solid #dee2e6'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "default"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: true,
        flexDirection: "row",
        alignItems: "flex-start",
        style: {
          gap: '8px'
        }
      }, /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          fontSize: '18px'
        }
      }, "\uD83D\uDCCD"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, addressLine1 && /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        style: {
          fontWeight: 500,
          fontSize: '14px',
          color: '#212529'
        }
      }, addressLine1), addressLine2 && /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        style: {
          fontSize: '13px',
          color: '#495057'
        }
      }, addressLine2), addressLine3 && /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        style: {
          fontSize: '13px',
          color: '#6c757d'
        }
      }, addressLine3), pinCode && /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        style: {
          fontSize: '13px',
          color: '#6c757d',
          marginTop: '4px'
        }
      }, "PIN: ", pinCode)))), hasCoordinates && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          height: '180px',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '12px',
          border: '1px solid #ced4da'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        ref: mapContainerRef,
        style: {
          height: '100%',
          width: '100%'
        }
      })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: true,
        flexDirection: "row",
        style: {
          gap: '12px'
        }
      }, /*#__PURE__*/React__default.default.createElement("a", {
        href: mapsUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          backgroundColor: '#4285f4',
          color: 'white',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: 500,
          transition: 'background-color 0.2s'
        },
        onMouseOver: e => e.currentTarget.style.backgroundColor = '#3367d6',
        onMouseOut: e => e.currentTarget.style.backgroundColor = '#4285f4'
      }, "\uD83E\uDDED Get Directions"), hasCoordinates && /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "xs",
        color: "grey60",
        style: {
          alignSelf: 'center'
        }
      }, lat.toFixed(5), ", ", lng.toFixed(5)))));
    };

    /**
     * Simple text wrapper component for AdminJS that shows text in a single line
     */
    const TextWrapComponent = props => {
      const {
        record,
        property
      } = props;
      const value = record.params[property.path];
      if (!value) return /*#__PURE__*/React__default.default.createElement("span", null, "-");
      return /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          maxWidth: '400px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: '14px',
          padding: '4px 0'
        },
        title: value
      }, value);
    };

    /**
     * Description component for AdminJS that shows wrapped text with multiple lines
     */
    const DescriptionComponent = props => {
      const {
        record,
        property
      } = props;
      const value = record.params[property.path];
      if (!value) return /*#__PURE__*/React__default.default.createElement("span", null, "-");
      return /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          maxWidth: '300px',
          wordWrap: 'break-word',
          whiteSpace: 'normal',
          lineHeight: '1.4',
          fontSize: '13px',
          padding: '4px 0',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        },
        title: value
      }, value);
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
    AdminJS.UserComponents.TaskLocationShow = TaskLocationShow;
    AdminJS.UserComponents.TaskLocationLink = TaskLocationLink;
    AdminJS.UserComponents.HeatmapVisualization = HeatmapVisualization;
    AdminJS.UserComponents.NotificationForm = NotificationForm;
    AdminJS.UserComponents.AddressShow = AddressShow;
    AdminJS.UserComponents.TextWrapComponent = TextWrapComponent;
    AdminJS.UserComponents.DescriptionComponent = DescriptionComponent;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSGVhdG1hcFZpc3VhbGl6YXRpb24uanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0Rhc2hib2FyZC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTGlua0NvbXBvbmVudC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3QuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0FpZFJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0xvZ2luQ29tcG9uZW50LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUNvbXBvbmVudC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSW1hZ2VMaXN0Q29tcG9uZW50LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUVkaXRDb21wb25lbnQuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlTGlzdEVkaXRDb21wb25lbnQuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0NyZWF0ZVRhc2tGcm9tQWlkUmVxdWVzdC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTWFwUGlja2VyLmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9NYXBTaG93LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9UYXNrTG9jYXRpb25TaG93LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9UYXNrTG9jYXRpb25MaW5rLmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Ob3RpZmljYXRpb25Gb3JtLmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9BZGRyZXNzU2hvdy5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvVGV4dFdyYXBDb21wb25lbnQuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0Rlc2NyaXB0aW9uQ29tcG9uZW50LmpzeCIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEg1LCBUZXh0LCBMb2FkZXIgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgSGVhdG1hcFZpc3VhbGl6YXRpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgbWFwQ29udGFpbmVyUmVmID0gdXNlUmVmKG51bGwpO1xuICAgIGNvbnN0IG1hcEluc3RhbmNlUmVmID0gdXNlUmVmKG51bGwpO1xuICAgIGNvbnN0IGhlYXRMYXllclJlZiA9IHVzZVJlZihudWxsKTtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IFtjYXNlQ291bnQsIHNldENhc2VDb3VudF0gPSB1c2VTdGF0ZSgwKTtcbiAgICBjb25zdCBbbm9EYXRhLCBzZXROb0RhdGFdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgbGV0IGlzTW91bnRlZCA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgbG9hZExpYnJhcmllcyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIC8vIExvYWQgTGVhZmxldCBDU1NcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlYWZsZXQtY3NzJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICAgICAgICAgIGxpbmsuaWQgPSAnbGVhZmxldC1jc3MnO1xuICAgICAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICAgICAgICAgIGxpbmsuaHJlZiA9ICdodHRwczovL3VucGtnLmNvbS9sZWFmbGV0QDEuOS40L2Rpc3QvbGVhZmxldC5jc3MnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExvYWQgTGVhZmxldCBKU1xuICAgICAgICAgICAgaWYgKCF3aW5kb3cuTCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5zcmMgPSAnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldEAxLjkuNC9kaXN0L2xlYWZsZXQuanMnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5vbmxvYWQgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgICAgICBzY3JpcHQub25lcnJvciA9IHJlamVjdDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTG9hZCBMZWFmbGV0LmhlYXQgcGx1Z2luXG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5MLmhlYXRMYXllcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlYXRTY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgICAgICBoZWF0U2NyaXB0LnNyYyA9ICdodHRwczovL3VucGtnLmNvbS9sZWFmbGV0LmhlYXRAMC4yLjAvZGlzdC9sZWFmbGV0LWhlYXQuanMnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaGVhdFNjcmlwdCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBoZWF0U2NyaXB0Lm9ubG9hZCA9IHJlc29sdmU7XG4gICAgICAgICAgICAgICAgICAgIGhlYXRTY3JpcHQub25lcnJvciA9IHJlamVjdDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5MO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGluaXRNYXAgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IEwgPSBhd2FpdCBsb2FkTGlicmFyaWVzKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBGZXRjaCBoZWF0bWFwIGRhdGEgZnJvbSBBUElcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL2Rhc2hib2FyZC9oZWF0bWFwJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdW50ZWQpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gZmV0Y2ggaGVhdG1hcCBkYXRhJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgaGVhdERhdGEgPSByZXN1bHQuZGF0YSB8fCBbXTtcbiAgICAgICAgICAgICAgICBzZXRDYXNlQ291bnQocmVzdWx0LmNvdW50IHx8IDApO1xuXG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIHRvIHZhbGlkIGNvb3JkaW5hdGUgcG9pbnRzIG9ubHlcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZFBvaW50cyA9IGhlYXREYXRhXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZCA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGQubGF0ID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGQubG5nID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIWlzTmFOKGQubGF0KSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIWlzTmFOKGQubG5nKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoZCA9PiBbZC5sYXQsIGQubG5nLCBkLmludGVuc2l0eSB8fCAwLjVdKTtcblxuICAgICAgICAgICAgICAgIGlmICh2YWxpZFBvaW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Tm9EYXRhKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFdhaXQgYSB0aWNrIHRvIGVuc3VyZSBjb250YWluZXIgaXMgcmVuZGVyZWRcbiAgICAgICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWlzTW91bnRlZCB8fCAhbWFwQ29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGNvbnRhaW5lciBoYXMgZGltZW5zaW9uc1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IG1hcENvbnRhaW5lclJlZi5jdXJyZW50O1xuICAgICAgICAgICAgICAgIGlmIChjb250YWluZXIub2Zmc2V0V2lkdGggPT09IDAgfHwgY29udGFpbmVyLm9mZnNldEhlaWdodCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hcCBjb250YWluZXIgaGFzIG5vIGRpbWVuc2lvbnMnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplIG1hcFxuICAgICAgICAgICAgICAgIGNvbnN0IG1hcCA9IEwubWFwKGNvbnRhaW5lcikuc2V0VmlldyhbMTAuODUwNSwgNzYuMjcxMV0sIDgpO1xuXG4gICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nJywge1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ8KpIE9wZW5TdHJlZXRNYXAgY29udHJpYnV0b3JzJ1xuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG1hcCk7XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgaGVhdG1hcCBsYXllclxuICAgICAgICAgICAgICAgIGhlYXRMYXllclJlZi5jdXJyZW50ID0gTC5oZWF0TGF5ZXIodmFsaWRQb2ludHMsIHtcbiAgICAgICAgICAgICAgICAgICAgcmFkaXVzOiAyNSxcbiAgICAgICAgICAgICAgICAgICAgYmx1cjogMTUsXG4gICAgICAgICAgICAgICAgICAgIG1heFpvb206IDE3LFxuICAgICAgICAgICAgICAgICAgICBtYXg6IDEuMCxcbiAgICAgICAgICAgICAgICAgICAgbWluT3BhY2l0eTogMC4zLFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgMC4yOiAnIzNiODJmNicsXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjQ6ICcjMTBiOTgxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjogJyNmNTllMGInLFxuICAgICAgICAgICAgICAgICAgICAgICAgMC44OiAnI2VmNDQ0NCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAxLjA6ICcjZGMyNjI2J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obWFwKTtcblxuICAgICAgICAgICAgICAgIC8vIEZpdCBib3VuZHMgdG8gc2hvdyBhbGwgcG9pbnRzXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm91bmRzID0gTC5sYXRMbmdCb3VuZHModmFsaWRQb2ludHMubWFwKHAgPT4gW3BbMF0sIHBbMV1dKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChib3VuZHMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAuZml0Qm91bmRzKGJvdW5kcywgeyBwYWRkaW5nOiBbNTAsIDUwXSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdDb3VsZCBub3QgZml0IGJvdW5kczonLCBlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtYXBJbnN0YW5jZVJlZi5jdXJyZW50ID0gbWFwO1xuICAgICAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuXG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbml0aWFsaXppbmcgaGVhdG1hcDonLCBlcnIpO1xuICAgICAgICAgICAgICAgIGlmIChpc01vdW50ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaW5pdE1hcCgpO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpc01vdW50ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChtYXBJbnN0YW5jZVJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgbWFwSW5zdGFuY2VSZWYuY3VycmVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBtYXBJbnN0YW5jZVJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICAvLyBTaG93IG1lc3NhZ2UgaWYgbm8gZGF0YVxuICAgIGlmIChub0RhdGEpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxCb3ggbXQ9XCJ4eGxcIj5cbiAgICAgICAgICAgICAgICA8SDUgbWI9XCJkZWZhdWx0XCI+8J+UpSBBY3RpdmUgQ2FzZXMgSGVhdG1hcDwvSDU+XG4gICAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgICAgICBiZz1cIndoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgcD1cInhsXCJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcj1cImRlZmF1bHRcIlxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodD1cIjIwMHB4XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCI+Tm8gYWN0aXZlIGNhc2VzIHdpdGggbG9jYXRpb24gZGF0YSBhdmFpbGFibGU8L1RleHQ+XG4gICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8Qm94IG10PVwieHhsXCI+XG4gICAgICAgICAgICA8SDUgbWI9XCJkZWZhdWx0XCI+8J+UpSBBY3RpdmUgQ2FzZXMgSGVhdG1hcDwvSDU+XG4gICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgYmc9XCJ3aGl0ZVwiXG4gICAgICAgICAgICAgICAgcD1cImxnXCJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcbiAgICAgICAgICAgICAgICBib3JkZXI9XCJkZWZhdWx0XCJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbj1cInJlbGF0aXZlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7LyogTWFwIGNvbnRhaW5lciAtIGFsd2F5cyByZW5kZXIgYnV0IG92ZXJsYXkgbG9hZGVyICovfVxuICAgICAgICAgICAgICAgIDxCb3ggaGVpZ2h0PVwiNDAwcHhcIiBwb3NpdGlvbj1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17bWFwQ29udGFpbmVyUmVmfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IGxvYWRpbmcgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICB7bG9hZGluZyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb249XCJhYnNvbHV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wPVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdD1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tPVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZz1cIndoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TG9hZGVyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICB7ZXJyb3IgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uPVwiYWJzb2x1dGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcD1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ9XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodD1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbT1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmc9XCJ3aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY29sb3I9XCJlcnJvclwiPkVycm9yOiB7ZXJyb3J9PC9UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICAgICAgICB7IWxvYWRpbmcgJiYgIWVycm9yICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEJveCBtdD1cImRlZmF1bHRcIiBkaXNwbGF5PVwiZmxleFwiIGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCIgZm9udFNpemU9XCJzbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNob3dpbmcge2Nhc2VDb3VudH0gYWN0aXZlIGNhc2VzXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgZ2FwPVwiZGVmYXVsdFwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgYWxpZ25JdGVtcz1cImNlbnRlclwiIGdhcD1cInNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb3ggd2lkdGg9XCIxMnB4XCIgaGVpZ2h0PVwiMTJweFwiIGJnPVwiIzNiODJmNlwiIGJvcmRlclJhZGl1cz1cIjUwJVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwic21cIj5Mb3c8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIiBnYXA9XCJzbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm94IHdpZHRoPVwiMTJweFwiIGhlaWdodD1cIjEycHhcIiBiZz1cIiNmNTllMGJcIiBib3JkZXJSYWRpdXM9XCI1MCVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBmb250U2l6ZT1cInNtXCI+TWVkaXVtPC9UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCIgZ2FwPVwic21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJveCB3aWR0aD1cIjEycHhcIiBoZWlnaHQ9XCIxMnB4XCIgYmc9XCIjZWY0NDQ0XCIgYm9yZGVyUmFkaXVzPVwiNTAlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgZm9udFNpemU9XCJzbVwiPkhpZ2g8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSGVhdG1hcFZpc3VhbGl6YXRpb247XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgSDIsIEg1LCBUZXh0LCBMb2FkZXIgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IEhlYXRtYXBWaXN1YWxpemF0aW9uIGZyb20gJy4vSGVhdG1hcFZpc3VhbGl6YXRpb24uanN4JztcblxuLy8gQ29sb3IgY29uc3RhbnRzIG1hdGNoaW5nIENTUyBkZXNpZ24gc3lzdGVtXG5jb25zdCBDT0xPUlMgPSB7XG4gIHByaW1hcnk6ICcjMjU2M2ViJyxcbiAgcHVycGxlOiAnIzhiNWNmNicsXG4gIGN5YW46ICcjMDZiNmQ0JyxcbiAgZ3JlZW46ICcjMTBiOTgxJyxcbiAgcmVkOiAnI2VmNDQ0NCcsXG4gIHllbGxvdzogJyNmNTllMGInLFxuICBncmF5OiAnIzk0YTNiOCcsXG4gIG9yYW5nZTogJyNmOTczMTYnLFxufTtcblxuLy8gRm9ybWF0IHJlbGF0aXZlIHRpbWVcbmNvbnN0IGZvcm1hdFJlbGF0aXZlVGltZSA9IChkYXRlU3RyaW5nKSA9PiB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyaW5nKTtcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgY29uc3QgZGlmZk1zID0gbm93IC0gZGF0ZTtcbiAgY29uc3QgZGlmZk1pbnMgPSBNYXRoLmZsb29yKGRpZmZNcyAvIDYwMDAwKTtcbiAgY29uc3QgZGlmZkhvdXJzID0gTWF0aC5mbG9vcihkaWZmTXMgLyAzNjAwMDAwKTtcbiAgY29uc3QgZGlmZkRheXMgPSBNYXRoLmZsb29yKGRpZmZNcyAvIDg2NDAwMDAwKTtcblxuICBpZiAoZGlmZk1pbnMgPCA2MCkgcmV0dXJuIGAke2RpZmZNaW5zfSBtaW4gYWdvYDtcbiAgaWYgKGRpZmZIb3VycyA8IDI0KSByZXR1cm4gYCR7ZGlmZkhvdXJzfSBob3VycyBhZ29gO1xuICByZXR1cm4gYCR7ZGlmZkRheXN9IGRheXMgYWdvYDtcbn07XG5cbi8vIEZvcm1hdCBjdXJyZW5jeVxuY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAoYW1vdW50KSA9PiB7XG4gIGlmIChhbW91bnQgPj0gMTAwMDAwKSByZXR1cm4gYOKCuSR7KGFtb3VudCAvIDEwMDAwMCkudG9GaXhlZCgxKX1MYDtcbiAgaWYgKGFtb3VudCA+PSAxMDAwKSByZXR1cm4gYOKCuSR7KGFtb3VudCAvIDEwMDApLnRvRml4ZWQoMSl9S2A7XG4gIHJldHVybiBg4oK5JHthbW91bnR9YDtcbn07XG5cbi8vIFNpbXBsZSBEb251dCBDaGFydCBjb21wb25lbnQgKFNWRy1iYXNlZCwgbm8gZXh0ZXJuYWwgZGVwcylcbmNvbnN0IERvbnV0Q2hhcnQgPSAoeyBkYXRhLCBzaXplID0gMTgwLCB0aGlja25lc3MgPSAzMCB9KSA9PiB7XG4gIGNvbnN0IHRvdGFsID0gZGF0YS5yZWR1Y2UoKHN1bSwgaXRlbSkgPT4gc3VtICsgaXRlbS52YWx1ZSwgMCk7XG4gIGlmICh0b3RhbCA9PT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgcmFkaXVzID0gKHNpemUgLSB0aGlja25lc3MpIC8gMjtcbiAgY29uc3QgY2lyY3VtZmVyZW5jZSA9IDIgKiBNYXRoLlBJICogcmFkaXVzO1xuICBsZXQgY3VycmVudE9mZnNldCA9IDA7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzI0cHgnIH19PlxuICAgICAgPHN2ZyB3aWR0aD17c2l6ZX0gaGVpZ2h0PXtzaXplfSB2aWV3Qm94PXtgMCAwICR7c2l6ZX0gJHtzaXplfWB9PlxuICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgY3g9e3NpemUgLyAyfVxuICAgICAgICAgIGN5PXtzaXplIC8gMn1cbiAgICAgICAgICByPXtyYWRpdXN9XG4gICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgIHN0cm9rZT1cIiNlMmU4ZjBcIlxuICAgICAgICAgIHN0cm9rZVdpZHRoPXt0aGlja25lc3N9XG4gICAgICAgIC8+XG4gICAgICAgIHtkYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gaXRlbS52YWx1ZSAvIHRvdGFsO1xuICAgICAgICAgIGNvbnN0IHN0cm9rZURhc2hhcnJheSA9IGAke3BlcmNlbnRhZ2UgKiBjaXJjdW1mZXJlbmNlfSAke2NpcmN1bWZlcmVuY2V9YDtcbiAgICAgICAgICBjb25zdCBzdHJva2VEYXNob2Zmc2V0ID0gLWN1cnJlbnRPZmZzZXQ7XG4gICAgICAgICAgY3VycmVudE9mZnNldCArPSBwZXJjZW50YWdlICogY2lyY3VtZmVyZW5jZTtcblxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgIGN4PXtzaXplIC8gMn1cbiAgICAgICAgICAgICAgY3k9e3NpemUgLyAyfVxuICAgICAgICAgICAgICByPXtyYWRpdXN9XG4gICAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgICAgc3Ryb2tlPXtpdGVtLmNvbG9yfVxuICAgICAgICAgICAgICBzdHJva2VXaWR0aD17dGhpY2tuZXNzfVxuICAgICAgICAgICAgICBzdHJva2VEYXNoYXJyYXk9e3N0cm9rZURhc2hhcnJheX1cbiAgICAgICAgICAgICAgc3Ryb2tlRGFzaG9mZnNldD17c3Ryb2tlRGFzaG9mZnNldH1cbiAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICAgICAgdHJhbnNmb3JtPXtgcm90YXRlKC05MCAke3NpemUgLyAyfSAke3NpemUgLyAyfSlgfVxuICAgICAgICAgICAgICBzdHlsZT17eyB0cmFuc2l0aW9uOiAnc3Ryb2tlLWRhc2hhcnJheSAwLjVzIGVhc2UnIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgICA8dGV4dFxuICAgICAgICAgIHg9e3NpemUgLyAyfVxuICAgICAgICAgIHk9e3NpemUgLyAyIC0gOH1cbiAgICAgICAgICB0ZXh0QW5jaG9yPVwibWlkZGxlXCJcbiAgICAgICAgICBmb250U2l6ZT1cIjI0XCJcbiAgICAgICAgICBmb250V2VpZ2h0PVwiNzAwXCJcbiAgICAgICAgICBmaWxsPVwiIzFlMjkzYlwiXG4gICAgICAgID5cbiAgICAgICAgICB7dG90YWx9XG4gICAgICAgIDwvdGV4dD5cbiAgICAgICAgPHRleHRcbiAgICAgICAgICB4PXtzaXplIC8gMn1cbiAgICAgICAgICB5PXtzaXplIC8gMiArIDE0fVxuICAgICAgICAgIHRleHRBbmNob3I9XCJtaWRkbGVcIlxuICAgICAgICAgIGZvbnRTaXplPVwiMTJcIlxuICAgICAgICAgIGZpbGw9XCIjNjQ3NDhiXCJcbiAgICAgICAgPlxuICAgICAgICAgIFRvdGFsXG4gICAgICAgIDwvdGV4dD5cbiAgICAgIDwvc3ZnPlxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICc4cHgnIH19PlxuICAgICAgICB7ZGF0YS5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICc4cHgnIH19PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEycHgnLCBoZWlnaHQ6ICcxMnB4JywgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogaXRlbS5jb2xvciB9fSAvPlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxM3B4JywgY29sb3I6ICcjNjQ3NDhiJyB9fT5cbiAgICAgICAgICAgICAge2l0ZW0ubmFtZX06IDxzdHJvbmcgc3R5bGU9e3sgY29sb3I6ICcjMWUyOTNiJyB9fT57aXRlbS52YWx1ZX08L3N0cm9uZz4gKHsoKGl0ZW0udmFsdWUgLyB0b3RhbCkgKiAxMDApLnRvRml4ZWQoMCl9JSlcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vIFNpbXBsZSBCYXIgQ2hhcnQgY29tcG9uZW50IChDU1MtYmFzZWQpXG5jb25zdCBCYXJDaGFydCA9ICh7IGRhdGEsIGhlaWdodCA9IDIwMCB9KSA9PiB7XG4gIGNvbnN0IG1heFZhbHVlID0gTWF0aC5tYXgoLi4uZGF0YS5mbGF0TWFwKGQgPT4gW2QudGFza3MsIGQuYWlkUmVxdWVzdHNdKSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodCwgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnZmxleC1lbmQnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWFyb3VuZCcsIGdhcDogJzhweCcsIHBhZGRpbmdCb3R0b206ICczMHB4JywgcG9zaXRpb246ICdyZWxhdGl2ZScgfX0+XG4gICAgICB7LyogWS1heGlzIGxpbmUgKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDAsIGJvdHRvbTogJzMwcHgnLCB3aWR0aDogJzFweCcsIGJhY2tncm91bmQ6ICcjZTJlOGYwJyB9fSAvPlxuXG4gICAgICB7ZGF0YS5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXg6IDEsIG1heFdpZHRoOiAnODBweCcgfX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGhlaWdodDogYCR7aGVpZ2h0IC0gMzB9cHhgLCBhbGlnbkl0ZW1zOiAnZmxleC1lbmQnIH19PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIHdpZHRoOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBgJHttYXhWYWx1ZSA/IChpdGVtLnRhc2tzIC8gbWF4VmFsdWUpICogMTAwIDogMH0lYCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBDT0xPUlMucHJpbWFyeSxcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHggNHB4IDAgMCcsXG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0OiBpdGVtLnRhc2tzID4gMCA/ICc0cHgnIDogJzAnLFxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICdoZWlnaHQgMC4zcyBlYXNlJyxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgdGl0bGU9e2BUYXNrczogJHtpdGVtLnRhc2tzfWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIHdpZHRoOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBgJHttYXhWYWx1ZSA/IChpdGVtLmFpZFJlcXVlc3RzIC8gbWF4VmFsdWUpICogMTAwIDogMH0lYCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBDT0xPUlMucHVycGxlLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCA0cHggMCAwJyxcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6IGl0ZW0uYWlkUmVxdWVzdHMgPiAwID8gJzRweCcgOiAnMCcsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2hlaWdodCAwLjNzIGVhc2UnLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICB0aXRsZT17YEFpZCBSZXF1ZXN0czogJHtpdGVtLmFpZFJlcXVlc3RzfWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAnIzY0NzQ4YicsIG1hcmdpblRvcDogJzhweCcgfX0+e2l0ZW0ubW9udGh9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkpfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuY29uc3QgRGFzaGJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBbY3VycmVudEFkbWluXSA9IHVzZUN1cnJlbnRBZG1pbigpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW3N0YXRzLCBzZXRTdGF0c10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoU3RhdHMgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL2Rhc2hib2FyZC9zdGF0cycpO1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBzZXRTdGF0cyhkYXRhLmRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gbG9hZCBkYXNoYm9hcmQgZGF0YScpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRGFzaGJvYXJkIGZldGNoIGVycm9yOicsIGVycik7XG4gICAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gY29ubmVjdCB0byBzZXJ2ZXInKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmZXRjaFN0YXRzKCk7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmZXRjaFN0YXRzLCAzMDAwMDApO1xuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgfSwgW10pO1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIiBoZWlnaHQ9XCI0MDBweFwiPlxuICAgICAgICA8TG9hZGVyIC8+XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3ggcD1cInh4bFwiIHRleHRBbGlnbj1cImNlbnRlclwiPlxuICAgICAgICA8VGV4dCBjb2xvcj1cImRhbmdlclwiPntlcnJvcn08L1RleHQ+XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9XG5cbiAgLy8gVGFzayBzdGF0dXMgZGF0YSBmb3IgZG9udXRcbiAgY29uc3QgdGFza1N0YXR1c0RhdGEgPSBbXG4gICAgeyBuYW1lOiAnQ29tcGxldGVkJywgdmFsdWU6IHN0YXRzPy50YXNrcz8uY29tcGxldGVkIHx8IDAsIGNvbG9yOiBDT0xPUlMuZ3JlZW4gfSxcbiAgICB7IG5hbWU6ICdPcGVuJywgdmFsdWU6IHN0YXRzPy50YXNrcz8ub3BlbiB8fCAwLCBjb2xvcjogQ09MT1JTLmN5YW4gfSxcbiAgICB7IG5hbWU6ICdBc3NpZ25lZCcsIHZhbHVlOiBzdGF0cz8udGFza3M/LmFzc2lnbmVkIHx8IDAsIGNvbG9yOiBDT0xPUlMucHVycGxlIH0sXG4gICAgeyBuYW1lOiAnQWNjZXB0ZWQnLCB2YWx1ZTogc3RhdHM/LnRhc2tzPy5hY2NlcHRlZCB8fCAwLCBjb2xvcjogQ09MT1JTLm9yYW5nZSB9LFxuICBdLmZpbHRlcigoZCkgPT4gZC52YWx1ZSA+IDApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJkYXNoYm9hcmQtY29udGFpbmVyIGFuaW1hdGUtZmFkZS1pblwiPlxuICAgICAgey8qIFdlbGNvbWUgSGVhZGVyICovfVxuICAgICAgPEJveCBtYj1cInhsXCI+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgZ2FwOiAnMTZweCcgfX0+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxIMj5XZWxjb21lIGJhY2ssIHtjdXJyZW50QWRtaW4/LmVtYWlsPy5zcGxpdCgnQCcpWzBdIHx8ICdBZG1pbid9ITwvSDI+XG4gICAgICAgICAgICA8VGV4dCBjb2xvcj1cImdyZXk2MFwiIG10PVwic21cIj5cbiAgICAgICAgICAgICAgSGVyZSdzIGFuIG92ZXJ2aWV3IG9mIHlvdXIgUmVsaWVmIE1hbmFnZW1lbnQgU3lzdGVtXG4gICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NDBcIiBmb250U2l6ZT1cInNtXCI+XG4gICAgICAgICAgICBMYXN0IHVwZGF0ZWQ6IHtuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpfVxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0JveD5cblxuICAgICAgey8qIFN0YXRzIENhcmRzIFJvdyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC1jYXJkcy1yb3dcIj5cbiAgICAgICAgPGEgaHJlZj1cIi9kYXNoYm9hcmQvcmVzb3VyY2VzL1Rhc2tTY2hlbWFcIiBjbGFzc05hbWU9XCJzdGF0LWNhcmQgc3RhdC1jYXJkLWNsaWNrYWJsZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC1jYXJkLXRpdGxlXCI+8J+TiyBUb3RhbCBUYXNrczwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC1jYXJkLXZhbHVlXCI+e3N0YXRzPy50YXNrcz8udG90YWwgfHwgMH08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZC1zdWJ0aXRsZVwiPlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IENPTE9SUy5ncmVlbiB9fT7inJMge3N0YXRzPy50YXNrcz8uY29tcGxldGVkIHx8IDB9PC9zcGFuPlxuICAgICAgICAgICAgeycgY29tcGxldGVkIOKAoiAnfVxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IENPTE9SUy5jeWFuIH19PuKckyB7c3RhdHM/LnRhc2tzPy5vcGVuIHx8IDB9PC9zcGFuPlxuICAgICAgICAgICAgeycgb3BlbiAg4oCiICd9XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogQ09MT1JTLm9yYW5nZSB9fT7inJMge3N0YXRzPy50YXNrcz8uYXNzaWduZWQgfHwgMH08L3NwYW4+XG4gICAgICAgICAgICB7JyBhc3NpZ25lZCDigKIgJ31cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiBDT0xPUlMueWVsbG93wqB9fT7inJMge3N0YXRzPy50YXNrcz8uYWNjZXB0ZWQgfHwgMH08L3NwYW4+XG4gICAgICAgICAgICB7JyBhY2NlcHRlZCDigKIgJ31cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiBDT0xPUlMucmVkIH19PuKckyB7c3RhdHM/LnRhc2tzPy5yZWplY3RlZCB8fCAwfTwvc3Bhbj5cbiAgICAgICAgICAgIHsnIHJlamVjdGVkIOKAoiAnfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2E+XG5cbiAgICAgICAgPGEgaHJlZj1cIi9kYXNoYm9hcmQvcmVzb3VyY2VzL0FpZFJlcXVlc3RcIiBjbGFzc05hbWU9XCJzdGF0LWNhcmQgc3RhdC1jYXJkLWNsaWNrYWJsZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC1jYXJkLXRpdGxlXCI+8J+GmCBBaWQgUmVxdWVzdHM8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZC12YWx1ZVwiPntzdGF0cz8uYWlkUmVxdWVzdHM/LnRvdGFsIHx8IDB9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmQtc3VidGl0bGVcIj5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiBDT0xPUlMueWVsbG93IH19PntzdGF0cz8uYWlkUmVxdWVzdHM/LnBlbmRpbmcgfHwgMH08L3NwYW4+XG4gICAgICAgICAgICB7JyBwZW5kaW5nIOKAoiAnfVxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IENPTE9SUy5ncmVlbiB9fT57c3RhdHM/LmFpZFJlcXVlc3RzPy5jb21wbGV0ZWQgfHwgMH08L3NwYW4+XG4gICAgICAgICAgICB7JyBjb21wbGV0ZWQnfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2E+XG5cbiAgICAgICAgPGEgaHJlZj1cIi9kYXNoYm9hcmQvcmVzb3VyY2VzL0RvbmF0aW9uUmVxdWVzdFwiIGNsYXNzTmFtZT1cInN0YXQtY2FyZCBzdGF0LWNhcmQtY2xpY2thYmxlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmQtdGl0bGVcIj7wn5KwIERvbmF0aW9uIFJlcXVlc3RzPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmQtdmFsdWVcIj57c3RhdHM/LmRvbmF0aW9uUmVxdWVzdHM/LnRvdGFsIHx8IDB9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmQtc3VidGl0bGVcIj5cbiAgICAgICAgICAgIFRvdGFsIGFtb3VudDoge2Zvcm1hdEN1cnJlbmN5KHN0YXRzPy5kb25hdGlvblJlcXVlc3RzPy50b3RhbEFtb3VudCB8fCAwKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9hPlxuXG4gICAgICAgIDxhIGhyZWY9XCIvZGFzaGJvYXJkL3Jlc291cmNlcy91c2VyUHJvZmlsZVwiIGNsYXNzTmFtZT1cInN0YXQtY2FyZCBzdGF0LWNhcmQtY2xpY2thYmxlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmQtdGl0bGVcIj7wn5GlIFZvbHVudGVlcnM8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZC12YWx1ZVwiPntzdGF0cz8udXNlcnM/LnZvbHVudGVlcnMgfHwgMH08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZC1zdWJ0aXRsZVwiPlxuICAgICAgICAgICAge3N0YXRzPy51c2Vycz8udG90YWwgfHwgMH0gdG90YWwgcmVnaXN0ZXJlZCB1c2Vyc1xuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2E+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxCb3ggbXQ9XCJ4bFwiPlxuICAgICAgICA8SDUgbWI9XCJsZ1wiPlF1aWNrIEFjdGlvbnM8L0g1PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTJweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgXG4gICAgICAgICAgPGEgaHJlZj1cIi9kYXNoYm9hcmQvcmVzb3VyY2VzL0FpZFJlcXVlc3RcIiBjbGFzc05hbWU9XCJxdWljay1hY3Rpb24tY2FyZFwiIHN0eWxlPXt7IHBhZGRpbmc6ICcxNHB4IDIwcHgnLCBmbGV4RGlyZWN0aW9uOiAncm93JywgZ2FwOiAnMTBweCcgfX0+XG4gICAgICAgICAgICDwn5OLIFZpZXcgQWlkIFJlcXVlc3RzXG4gICAgICAgICAgPC9hPlxuICAgICAgICAgICAgIDxhIGhyZWY9XCIvZGFzaGJvYXJkL3Jlc291cmNlcy9Eb25hdGlvblJlcXVlc3RcIiBjbGFzc05hbWU9XCJxdWljay1hY3Rpb24tY2FyZFwiIHN0eWxlPXt7IHBhZGRpbmc6ICcxNHB4IDIwcHgnLCBmbGV4RGlyZWN0aW9uOiAncm93JywgZ2FwOiAnMTBweCcgfX0+XG4gICAgICAgICAgICDwn5K4IFZpZXcgRG9uYXRpb25zXG4gICAgICAgICAgPC9hPlxuICAgICAgICAgIDxhIGhyZWY9XCIvZGFzaGJvYXJkL3Jlc291cmNlcy91c2VyUHJvZmlsZVwiIGNsYXNzTmFtZT1cInF1aWNrLWFjdGlvbi1jYXJkXCIgc3R5bGU9e3sgcGFkZGluZzogJzE0cHggMjBweCcsIGZsZXhEaXJlY3Rpb246ICdyb3cnLCBnYXA6ICcxMHB4JyB9fT5cbiAgICAgICAgICAgIPCfkaUgTWFuYWdlIFVzZXJzXG4gICAgICAgICAgPC9hPlxuICAgICAgICAgIDxhIGhyZWY9XCIvZGFzaGJvYXJkL3Jlc291cmNlcy9Ob3RpZmljYXRpb24vYWN0aW9ucy9uZXdcIiBjbGFzc05hbWU9XCJxdWljay1hY3Rpb24tY2FyZFwiIHN0eWxlPXt7IHBhZGRpbmc6ICcxNHB4IDIwcHgnLCBmbGV4RGlyZWN0aW9uOiAncm93JywgZ2FwOiAnMTBweCcgfX0+XG4gICAgICAgICAgICDwn5SUIFNlbmQgTm90aWZpY2F0aW9uXG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogUmVjZW50IEFjdGl2aXR5IENhcmRzICovfVxuICAgICAgPEJveCBtYj1cInhsXCI+XG4gICAgICAgIDxINSBtYj1cImxnXCI+UmVjZW50IEFjdGl2aXR5PC9INT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZ3JpZCcsIGdyaWRUZW1wbGF0ZUNvbHVtbnM6ICdyZXBlYXQoYXV0by1maXQsIG1pbm1heCgyNjBweCwgMWZyKSknLCBnYXA6ICcxNnB4JyB9fT5cbiAgICAgICAgICB7c3RhdHM/LnJlY2VudFRhc2tzPy5zbGljZSgwLCA0KS5tYXAoKHRhc2ssIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICBrZXk9e3Rhc2suaWQgfHwgaW5kZXh9XG4gICAgICAgICAgICAgIGhyZWY9e2AvZGFzaGJvYXJkL3Jlc291cmNlcy9UYXNrU2NoZW1hL3JlY29yZHMvJHt0YXNrLmlkfS9zaG93YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicXVpY2stYWN0aW9uLWNhcmRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtdGltZVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPuKPsTwvc3Bhbj4ge2Zvcm1hdFJlbGF0aXZlVGltZSh0YXNrLmNyZWF0ZWRBdCl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtdGl0bGVcIj57dGFzay5uYW1lfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgc3RhdHVzLWJhZGdlICR7dGFzay5zdGF0dXN9YH0+e3Rhc2suc3RhdHVzfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Bwcmlvcml0eS1iYWRnZSAke3Rhc2sucHJpb3JpdHl9YH0+e3Rhc2sucHJpb3JpdHl9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLXN1YnRpdGxlXCI+XG4gICAgICAgICAgICAgICAg8J+RpSB7dGFzay52b2x1bnRlZXJzfS97dGFzay52b2x1bnRlZXJzTmVlZGVkfSB2b2x1bnRlZXJzXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogQ2hhcnRzIFJvdyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhcnRzLXJvd1wiPlxuICAgICAgICB7LyogVGFzayBQcm9ncmVzcyBEb251dCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC1jYXJkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC1jYXJkLWhlYWRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC1jYXJkLXRpdGxlXCI+VGFzayBQcm9ncmVzczwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzIwcHgnLCBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgIHt0YXNrU3RhdHVzRGF0YS5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgICA8RG9udXRDaGFydCBkYXRhPXt0YXNrU3RhdHVzRGF0YX0gLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCIgdGV4dEFsaWduPVwiY2VudGVyXCI+Tm8gdGFzayBkYXRhIGF2YWlsYWJsZTwvVGV4dD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNb250aGx5IFN0YXRpc3RpY3MgQmFyIENoYXJ0ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXJ0LWNhcmRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXJ0LWNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXJ0LWNhcmQtdGl0bGVcIj5Nb250aGx5IFN0YXRpc3RpY3M8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxNnB4JyB9fT5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMnB4JywgaGVpZ2h0OiAnMTJweCcsIGJvcmRlclJhZGl1czogJzJweCcsIGJhY2tncm91bmQ6IENPTE9SUy5wcmltYXJ5IH19IC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICcjNjQ3NDhiJyB9fT5UYXNrczwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTJweCcsIGhlaWdodDogJzEycHgnLCBib3JkZXJSYWRpdXM6ICcycHgnLCBiYWNrZ3JvdW5kOiBDT0xPUlMucHVycGxlIH19IC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICcjNjQ3NDhiJyB9fT5BaWQgUmVxdWVzdHM8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMjBweCAxMHB4JyB9fT5cbiAgICAgICAgICAgIHtzdGF0cz8ubW9udGhseVN0YXRzPy5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgICA8QmFyQ2hhcnQgZGF0YT17c3RhdHMubW9udGhseVN0YXRzfSBoZWlnaHQ9ezE4MH0gLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCIgdGV4dEFsaWduPVwiY2VudGVyXCI+Tm8gbW9udGhseSBkYXRhIGF2YWlsYWJsZTwvVGV4dD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBJbmZvIFdpZGdldHMgUm93ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmZvLXdpZGdldHMtcm93XCI+XG4gICAgICAgIHsvKiBSZWxpZWYgQ2VudGVycyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC1jYXJkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC1jYXJkLWhlYWRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC1jYXJkLXRpdGxlXCI+8J+PoiBSZWxpZWYgQ2VudGVyczwvZGl2PlxuICAgICAgICAgICAgPGEgaHJlZj1cIi9kYXNoYm9hcmQvcmVzb3VyY2VzL1JlbGllZkNlbnRlclwiIHN0eWxlPXt7IGNvbG9yOiBDT0xPUlMucHJpbWFyeSwgZm9udFNpemU6ICcxNHB4JywgdGV4dERlY29yYXRpb246ICdub25lJyB9fT5cbiAgICAgICAgICAgICAgVmlldyBBbGwg4oaSXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge3N0YXRzPy5yZWxpZWZDZW50ZXJzPy5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgc3RhdHMucmVsaWVmQ2VudGVycy5tYXAoKGNlbnRlciwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2NlbnRlci5pZCB8fCBpbmRleH0gY2xhc3NOYW1lPVwicmVsaWVmLWNlbnRlci1pdGVtXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxpZWYtY2VudGVyLWljb25cIj7wn4+gPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxpZWYtY2VudGVyLWluZm9cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsaWVmLWNlbnRlci1uYW1lXCI+e2NlbnRlci5uYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxpZWYtY2VudGVyLWNvb3JkaW5hdG9yXCI+XG4gICAgICAgICAgICAgICAgICAgIPCfk54ge2NlbnRlci5jb29yZGluYXRvcn1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpXG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCIgdGV4dEFsaWduPVwiY2VudGVyXCIgcD1cImxnXCI+Tm8gcmVsaWVmIGNlbnRlcnMgcmVnaXN0ZXJlZDwvVGV4dD5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogUmVsaWVmIEZ1bmQgV2FsbGV0ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXJ0LWNhcmRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXJ0LWNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXJ0LWNhcmQtdGl0bGVcIj7wn5KzIFJlbGllZiBGdW5kIFdhbGxldDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtzdGF0cz8ud2FsbGV0ID8gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YWxsZXQtYmFsYW5jZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2FsbGV0LWFtb3VudFwiPntmb3JtYXRDdXJyZW5jeShzdGF0cy53YWxsZXQuYmFsYW5jZSl9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGJyPjwvYnI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YWxsZXQtbGFiZWxcIj5DdXJyZW50IEJhbGFuY2U8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2FsbGV0LXN0YXRzXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YWxsZXQtc3RhdFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YWxsZXQtc3RhdC12YWx1ZVwiIHN0eWxlPXt7IGNvbG9yOiBDT0xPUlMuZ3JlZW4gfX0+XG4gICAgICAgICAgICAgICAgICAgIHtmb3JtYXRDdXJyZW5jeShzdGF0cy53YWxsZXQudG90YWxDcmVkaXRzKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YWxsZXQtc3RhdC1sYWJlbFwiPkNyZWRpdHM8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhbGxldC1zdGF0XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhbGxldC1zdGF0LXZhbHVlXCIgc3R5bGU9e3sgY29sb3I6IENPTE9SUy5yZWQgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtmb3JtYXRDdXJyZW5jeShzdGF0cy53YWxsZXQudG90YWxEZWJpdHMpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhbGxldC1zdGF0LWxhYmVsXCI+RGViaXRzPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YWxsZXQtc3RhdFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YWxsZXQtc3RhdC12YWx1ZVwiIHN0eWxlPXt7IGNvbG9yOiBDT0xPUlMucHVycGxlIH19PlxuICAgICAgICAgICAgICAgICAgICB7c3RhdHMud2FsbGV0LmRvbm9yQ291bnR9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2FsbGV0LXN0YXQtbGFiZWxcIj5Eb25vcnM8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NjBcIiB0ZXh0QWxpZ249XCJjZW50ZXJcIiBwPVwibGdcIj5XYWxsZXQgbm90IGluaXRpYWxpemVkPC9UZXh0PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBQcmlvcml0eSBEaXN0cmlidXRpb24gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhcnQtY2FyZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhcnQtY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhcnQtY2FyZC10aXRsZVwiPvCfjq8gQWN0aXZlIFByaW9yaXRpZXM8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICc4cHggMCcgfX0+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIHBhZGRpbmc6ICcxMnB4IDAnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgI2UyZThmMCcgfX0+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwcHgnLCBoZWlnaHQ6ICcxMHB4JywgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogQ09MT1JTLnJlZCB9fSAvPlxuICAgICAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCI1MDBcIj5IaWdoIFByaW9yaXR5PC9UZXh0PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogJzYwMCcsIGNvbG9yOiBDT0xPUlMucmVkLCBmb250U2l6ZTogJzE4cHgnIH19PntzdGF0cz8ucHJpb3JpdGllcz8uaGlnaCB8fCAwfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBwYWRkaW5nOiAnMTJweCAwJywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkICNlMmU4ZjAnIH19PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMHB4JywgaGVpZ2h0OiAnMTBweCcsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmQ6IENPTE9SUy55ZWxsb3cgfX0gLz5cbiAgICAgICAgICAgICAgICA8VGV4dCBmb250V2VpZ2h0PVwiNTAwXCI+TWVkaXVtIFByaW9yaXR5PC9UZXh0PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogJzYwMCcsIGNvbG9yOiBDT0xPUlMueWVsbG93LCBmb250U2l6ZTogJzE4cHgnIH19PntzdGF0cz8ucHJpb3JpdGllcz8ubWVkaXVtIHx8IDB9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIHBhZGRpbmc6ICcxMnB4IDAnIH19PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMHB4JywgaGVpZ2h0OiAnMTBweCcsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmQ6IENPTE9SUy5ncmVlbiB9fSAvPlxuICAgICAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCI1MDBcIj5Mb3cgUHJpb3JpdHk8L1RleHQ+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiAnNjAwJywgY29sb3I6IENPTE9SUy5ncmVlbiwgZm9udFNpemU6ICcxOHB4JyB9fT57c3RhdHM/LnByaW9yaXRpZXM/LmxvdyB8fCAwfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSGVhdG1hcCBTZWN0aW9uICovfVxuICAgICAgPEJveCBtdD1cInhsXCI+XG4gICAgICAgIDxIZWF0bWFwVmlzdWFsaXphdGlvbiAvPlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIHsvKiBRdWljayBBY3Rpb25zICovfVxuICAgICAgXG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmQ7IiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IExpbmtDb21wb25lbnQgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyByZWNvcmQsIHByb3BlcnR5IH0gPSBwcm9wcztcblxuICAvLyBUcnkgdG8gZ2V0IGNvb3JkaW5hdGVzIGZyb20gdGhlIGRpcmVjdCBwcm9wZXJ0eSBmaXJzdCAoZS5nLiwgJ2xvY2F0aW9uJylcbiAgLy8gRmFsbGJhY2sgdG8gJ2FkZHJlc3MubG9jYXRpb24nIGZvciBvdGhlciByZXNvdXJjZXMgaWYgbmVlZGVkXG4gIC8vIE5vdGU6IEluIEFkbWluSlMgbGlzdCB2aWV3LCBmbGF0dGVuaW5nIG1pZ2h0IGJlIFwibG9jYXRpb24uY29vcmRpbmF0ZXMuMFwiXG4gIGNvbnN0IGxhdCA9IHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uY29vcmRpbmF0ZXMuMWBdIHx8IHJlY29yZC5wYXJhbXNbXCJhZGRyZXNzLmxvY2F0aW9uLmNvb3JkaW5hdGVzLjFcIl07XG4gIGNvbnN0IGxvbmcgPSByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9LmNvb3JkaW5hdGVzLjBgXSB8fCByZWNvcmQucGFyYW1zW1wiYWRkcmVzcy5sb2NhdGlvbi5jb29yZGluYXRlcy4wXCJdO1xuXG4gIC8vIElmIG5vIGNvb3JkaW5hdGVzLCByZXR1cm4gbnVsbCBvciBlbXB0eVxuICBpZiAoIWxhdCB8fCAhbG9uZykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gQXR0ZW1wdCB0byBjb25zdHJ1Y3QgYW4gYWRkcmVzcyBzdHJpbmcgZnJvbSB0aGUgcmVjb3JkXG4gIC8vIExvZ2ljOiBhZGRyZXNzLmFkZHJlc3NMaW5lMSwgYWRkcmVzcy5hZGRyZXNzTGluZTIsIGFkZHJlc3MuY2l0eSwgZXRjLlxuICAvLyBOb3RlOiBBZG1pbkpTIGxpa2VseSBmbGF0dGVucyB0aGVzZSB0byBgYWRkcmVzcy5hZGRyZXNzTGluZTFgXG4gIGNvbnN0IGFkZHJlc3NQYXJ0cyA9IFtcbiAgICByZWNvcmQucGFyYW1zWydhZGRyZXNzLmFkZHJlc3NMaW5lMSddLFxuICAgIHJlY29yZC5wYXJhbXNbJ2FkZHJlc3MuYWRkcmVzc0xpbmUyJ10sXG4gICAgcmVjb3JkLnBhcmFtc1snYWRkcmVzcy5hZGRyZXNzTGluZTMnXSxcbiAgICByZWNvcmQucGFyYW1zWydhZGRyZXNzLnBpbkNvZGUnXSxcbiAgICAvLyBBZGQgb3RoZXIgYWRkcmVzcyBmaWVsZHMgaWYgdGhleSBleGlzdCBpbiB5b3VyIHNjaGVtYSwgZS5nLiBzdGF0ZSwgY2l0eVxuICBdLmZpbHRlcihwYXJ0ID0+IHBhcnQgJiYgcGFydC50b1N0cmluZygpLnRyaW0oKSAhPT0gJycpO1xuXG4gIGxldCBxdWVyeSA9ICcnO1xuICBpZiAoYWRkcmVzc1BhcnRzLmxlbmd0aCA+IDApIHtcbiAgICBxdWVyeSA9IGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzUGFydHMuam9pbignLCAnKSk7XG4gIH0gZWxzZSB7XG4gICAgcXVlcnkgPSBgJHtsYXR9LCR7bG9uZ31gO1xuICB9XG5cbiAgLy8gcXVlcnkgcGFyYW0gd29ya3MgZm9yIGJvdGggc2VhcmNoIHRlcm1zIChhZGRyZXNzKSBhbmQgY29vcmRpbmF0ZXNcbiAgY29uc3QgbWFwc0xpbmsgPSBgaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL3NlYXJjaC8/YXBpPTEmcXVlcnk9JHtxdWVyeX1gO1xuXG4gIHJldHVybiAoXG4gICAgPGEgaHJlZj17bWFwc0xpbmt9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5cbiAgICAgIFZpZXcgTG9jYXRpb25cbiAgICA8L2E+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlua0NvbXBvbmVudFxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwsIFNlbGVjdCwgRm9ybU1lc3NhZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xuXG5jb25zdCBWb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdCA9ICh7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0pID0+IHtcbiAgY29uc3QgW3ZvbHVudGVlcnMsIHNldFZvbHVudGVlcnNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoVm9sdW50ZWVycyA9IGFzeW5jICgpID0+IHtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5yZXNvdXJjZUFjdGlvbih7XG4gICAgICAgIHJlc291cmNlSWQ6ICd1c2VyUHJvZmlsZScsXG4gICAgICAgIGFjdGlvbk5hbWU6ICdsaXN0JyxcbiAgICAgICAgcGFyYW1zOiB7ICdmaWx0ZXJzLnJvbGUnOiAndm9sdW50ZWVyJywgcGVyUGFnZTogMTAwMCB9LFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLnJlY29yZHMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ21hcHBpbmcgJywgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKVxuICAgICAgICBzZXRWb2x1bnRlZXJzKHJlc3BvbnNlLmRhdGEucmVjb3Jkcy5tYXAodiA9PiAoe1xuICAgICAgICAgIHZhbHVlOiB2LmlkLFxuICAgICAgICAgIGxhYmVsOiB2LnBhcmFtcy5uYW1lLFxuICAgICAgICB9KSkpO1xuICAgICAgfVxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfTtcbiAgICBmZXRjaFZvbHVudGVlcnMoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IHNlbGVjdGVkID0+IHtcbiAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBzZWxlY3RlZCA/IHNlbGVjdGVkLnZhbHVlIDogJycpO1xuICB9O1xuXG4gIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gdm9sdW50ZWVycy5maW5kKG9wdCA9PiBvcHQudmFsdWUgPT09IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0pIHx8IG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8Rm9ybUdyb3VwIG1iPXs1Nn0+XG4gICAgICA8TGFiZWwgcmVxdWlyZWQ+eydTZWxlY3QgVm9sdW50ZWVyJ308L0xhYmVsPlxuICAgICAgPFNlbGVjdFxuICAgICAgICBvcHRpb25zPXt2b2x1bnRlZXJzfVxuICAgICAgICB2YWx1ZT17c2VsZWN0ZWRPcHRpb259XG4gICAgICAgIGlzTG9hZGluZz17bG9hZGluZ31cbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgaXNDbGVhcmFibGVcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3Qgdm9sdW50ZWVy4oCmXCJcbiAgICAgIC8+XG4gICAgICB7cHJvcGVydHkuZGVzY3JpcHRpb24gJiYgKFxuICAgICAgICA8Rm9ybU1lc3NhZ2U+e3Byb3BlcnR5LmRlc2NyaXB0aW9ufTwvRm9ybU1lc3NhZ2U+XG4gICAgICApfVxuICAgIDwvRm9ybUdyb3VwPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3Q7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCwgU2VsZWN0LCBGb3JtTWVzc2FnZSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG5jb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XG5cbmNvbnN0IFN0YXR1c0ZpbHRlcmVkU2VsZWN0ID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoU3RhdHVzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHtcbiAgICAgICAgcmVzb3VyY2VJZDogJ0FpZFJlcXVlc3QnLFxuICAgICAgICBhY3Rpb25OYW1lOiAnbGlzdCcsXG4gICAgICAgIHBhcmFtczogeyAnZmlsdGVycy5zdGF0dXMnOiAncmVqZWN0ZWQnLCBwZXJQYWdlOiAxMDAwIH0sXG4gICAgICB9KTtcbiAgICAgIGNvbnNvbGUubG9nKCdsb2dvZ2RnZCcsIHJlc3BvbnNlKVxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdtYXBwaW5nICcsIHJlc3BvbnNlLmRhdGEucmVjb3JkcylcbiAgICAgICAgc2V0U3RhdHVzKHJlc3BvbnNlLmRhdGEucmVjb3Jkcy5tYXAodiA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNvcmRcIiwgdi5wYXJhbXMpXG4gICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICB2YWx1ZTogdi5pZCxcbiAgICAgICAgICAgIC8vIGxhYmVsOiBgJHt2LnBhcmFtc1tcImFkZHJlc3MuYWRkcmVzc0xpbmUxXCJdfSAtICR7di5wYXJhbXNbXCJkb25hdGlvblR5cGVcIl19YFxuICAgICAgICAgICAgbGFiZWw6IHYucGFyYW1zLm5hbWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfTtcbiAgICBmZXRjaFN0YXR1cygpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gc2VsZWN0ZWQgPT4ge1xuICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIHNlbGVjdGVkID8gc2VsZWN0ZWQudmFsdWUgOiAnJyk7XG4gIH07XG5cbiAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBzdGF0dXMuZmluZChvcHQgPT4gb3B0LnZhbHVlID09PSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdKSB8fCBudWxsO1xuXG4gIHJldHVybiAoXG4gICAgPEZvcm1Hcm91cCBtYj17NTZ9PlxuICAgICAgPExhYmVsIHJlcXVpcmVkPnsnU2VsZWN0IEFpZCBSZXF1ZXN0J308L0xhYmVsPlxuICAgICAgPFNlbGVjdFxuICAgICAgICBvcHRpb25zPXtzdGF0dXN9XG4gICAgICAgIHZhbHVlPXtzZWxlY3RlZE9wdGlvbn1cbiAgICAgICAgaXNMb2FkaW5nPXtsb2FkaW5nfVxuICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICBpc0NsZWFyYWJsZVxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBBaWQgUmVxdWVzdFwiXG4gICAgICAvPlxuICAgICAge3Byb3BlcnR5LmRlc2NyaXB0aW9uICYmIChcbiAgICAgICAgPEZvcm1NZXNzYWdlPntwcm9wZXJ0eS5kZXNjcmlwdGlvbn08L0Zvcm1NZXNzYWdlPlxuICAgICAgKX1cbiAgICA8L0Zvcm1Hcm91cD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXR1c0ZpbHRlcmVkU2VsZWN0O1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwsIFNlbGVjdCwgRm9ybU1lc3NhZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xuXG5jb25zdCBEb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdCA9ICh7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0pID0+IHtcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmZXRjaFN0YXR1cyA9IGFzeW5jICgpID0+IHtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5yZXNvdXJjZUFjdGlvbih7XG4gICAgICAgIHJlc291cmNlSWQ6ICdEb25hdGlvblJlcXVlc3QnLFxuICAgICAgICBhY3Rpb25OYW1lOiAnbGlzdCcsXG4gICAgICAgIHBhcmFtczogeyAnZmlsdGVycy5zdGF0dXMnOiAnYWNjZXB0ZWQnLCBwZXJQYWdlOiAxMDAwIH0sXG4gICAgICB9KTtcbiAgICAgIGNvbnNvbGUubG9nKCdsb2dvZ2RnZCcsIHJlc3BvbnNlKVxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdtYXBwaW5nICcsIHJlc3BvbnNlLmRhdGEucmVjb3JkcylcbiAgICAgICAgc2V0U3RhdHVzKHJlc3BvbnNlLmRhdGEucmVjb3Jkcy5tYXAodiA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNvcmRcIiwgdi5wYXJhbXMpXG4gICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICB2YWx1ZTogdi5pZCxcbiAgICAgICAgICAgIGxhYmVsOiB2LnBhcmFtcy5uYW1lXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH07XG4gICAgZmV0Y2hTdGF0dXMoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IHNlbGVjdGVkID0+IHtcbiAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBzZWxlY3RlZCA/IHNlbGVjdGVkLnZhbHVlIDogJycpO1xuICB9O1xuXG4gIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gc3RhdHVzLmZpbmQob3B0ID0+IG9wdC52YWx1ZSA9PT0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXSkgfHwgbnVsbDtcblxuICByZXR1cm4gKFxuICAgIDxGb3JtR3JvdXAgbWI9ezU2fT5cbiAgICAgIDxMYWJlbCByZXF1aXJlZD57J1NlbGVjdCBEb25hdGlvbiBSZXF1ZXN0J308L0xhYmVsPlxuICAgICAgPFNlbGVjdFxuICAgICAgICBvcHRpb25zPXtzdGF0dXN9XG4gICAgICAgIHZhbHVlPXtzZWxlY3RlZE9wdGlvbn1cbiAgICAgICAgaXNMb2FkaW5nPXtsb2FkaW5nfVxuICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICBpc0NsZWFyYWJsZVxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBEb25hdGlvbiBSZXF1ZXN0XCJcbiAgICAgIC8+XG4gICAgICB7cHJvcGVydHkuZGVzY3JpcHRpb24gJiYgKFxuICAgICAgICA8Rm9ybU1lc3NhZ2U+e3Byb3BlcnR5LmRlc2NyaXB0aW9ufTwvRm9ybU1lc3NhZ2U+XG4gICAgICApfVxuICAgIDwvRm9ybUdyb3VwPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3Q7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgSW5wdXQsIExhYmVsLCBUZXh0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyB1c2VUcmFuc2xhdGlvbiB9IGZyb20gJ2FkbWluanMnO1xuXG5jb25zdCBMb2dpbkNvbXBvbmVudCA9IChwcm9wcykgPT4ge1xuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3Bhc3N3b3JkLCBzZXRQYXNzd29yZF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dQYXNzd29yZCwgc2V0U2hvd1Bhc3N3b3JkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgeyB0cmFuc2xhdGVNZXNzYWdlIH0gPSB1c2VUcmFuc2xhdGlvbigpO1xuXG4gIC8vIFZpZXcgc3RhdGVzOiAnbG9naW4nIHwgJ2ZvcmdvdFBhc3N3b3JkJyB8ICdyZXNldFBhc3N3b3JkJ1xuICBjb25zdCBbdmlldywgc2V0Vmlld10gPSB1c2VTdGF0ZSgnbG9naW4nKTtcbiAgY29uc3QgW3Jlc2V0RW1haWwsIHNldFJlc2V0RW1haWxdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbb3RwLCBzZXRPdHBdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbmV3UGFzc3dvcmQsIHNldE5ld1Bhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3Nob3dOZXdQYXNzd29yZCwgc2V0U2hvd05ld1Bhc3N3b3JkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRFcnJvcignJyk7XG4gICAgc2V0U3VjY2VzcygnJyk7XG4gICAgc2V0TG9hZGluZyh0cnVlKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvZGFzaGJvYXJkL2xvZ2luJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZW1haWwsIHBhc3N3b3JkIH0pLFxuICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBkYXRhLnJlZGlyZWN0VXJsIHx8ICcvZGFzaGJvYXJkJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldEVycm9yKGRhdGEuZXJyb3IgfHwgJ0ludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0xvZ2luIGVycm9yOicsIGVycik7XG4gICAgICBzZXRFcnJvcignQW4gZXJyb3Igb2NjdXJyZWQuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVGb3Jnb3RQYXNzd29yZCA9IGFzeW5jIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNldEVycm9yKCcnKTtcbiAgICBzZXRTdWNjZXNzKCcnKTtcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9kYXNoYm9hcmQvZm9yZ290LXBhc3N3b3JkJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZW1haWw6IHJlc2V0RW1haWwgfSksXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgICAgaWYgKHJlc3BvbnNlLm9rICYmIGRhdGEuc3VjY2Vzcykge1xuICAgICAgICBzZXRTdWNjZXNzKCdPVFAgaGFzIGJlZW4gZ2VuZXJhdGVkLiBDaGVjayB0aGUgc2VydmVyIGNvbnNvbGUgZm9yIHRoZSBPVFAuJyk7XG4gICAgICAgIHNldFZpZXcoJ3Jlc2V0UGFzc3dvcmQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldEVycm9yKGRhdGEubWVzc2FnZSB8fCAnRmFpbGVkIHRvIHByb2Nlc3MgcmVxdWVzdCcpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignRm9yZ290IHBhc3N3b3JkIGVycm9yOicsIGVycik7XG4gICAgICBzZXRFcnJvcignQW4gZXJyb3Igb2NjdXJyZWQuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZXNldFBhc3N3b3JkID0gYXN5bmMgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgc2V0RXJyb3IoJycpO1xuICAgIHNldFN1Y2Nlc3MoJycpO1xuICAgIHNldExvYWRpbmcodHJ1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2Rhc2hib2FyZC9yZXNldC1wYXNzd29yZCcsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGVtYWlsOiByZXNldEVtYWlsLCBvdHAsIG5ld1Bhc3N3b3JkIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICAgIGlmIChyZXNwb25zZS5vayAmJiBkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgc2V0U3VjY2VzcygnUGFzc3dvcmQgaGFzIGJlZW4gcmVzZXQgc3VjY2Vzc2Z1bGx5LiBQbGVhc2UgbG9naW4gd2l0aCB5b3VyIG5ldyBwYXNzd29yZC4nKTtcbiAgICAgICAgc2V0VmlldygnbG9naW4nKTtcbiAgICAgICAgc2V0UmVzZXRFbWFpbCgnJyk7XG4gICAgICAgIHNldE90cCgnJyk7XG4gICAgICAgIHNldE5ld1Bhc3N3b3JkKCcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldEVycm9yKGRhdGEubWVzc2FnZSB8fCAnRmFpbGVkIHRvIHJlc2V0IHBhc3N3b3JkJyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdSZXNldCBwYXNzd29yZCBlcnJvcjonLCBlcnIpO1xuICAgICAgc2V0RXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc3dpdGNoVG9Gb3Jnb3RQYXNzd29yZCA9ICgpID0+IHtcbiAgICBzZXRFcnJvcignJyk7XG4gICAgc2V0U3VjY2VzcygnJyk7XG4gICAgc2V0UmVzZXRFbWFpbChlbWFpbCB8fCAnJyk7XG4gICAgc2V0VmlldygnZm9yZ290UGFzc3dvcmQnKTtcbiAgfTtcblxuICBjb25zdCBzd2l0Y2hUb0xvZ2luID0gKCkgPT4ge1xuICAgIHNldEVycm9yKCcnKTtcbiAgICBzZXRWaWV3KCdsb2dpbicpO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlckZvcm0gPSAoKSA9PiB7XG4gICAgaWYgKHZpZXcgPT09ICdmb3Jnb3RQYXNzd29yZCcpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVGb3Jnb3RQYXNzd29yZH0+XG4gICAgICAgICAgPEJveCBtYj1cInhsXCI+XG4gICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzEuNXJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjMTExODI3JyB9fT5cbiAgICAgICAgICAgICAgRm9yZ290IFBhc3N3b3JkXG4gICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzFyZW0nLCBjb2xvcjogJyM2YjcyODAnLCBtYXJnaW5Ub3A6ICcwLjVyZW0nIH19PlxuICAgICAgICAgICAgICBFbnRlciB5b3VyIGVtYWlsIGFkZHJlc3MgYW5kIHdlJ2xsIHNlbmQgeW91IGFuIE9UUCB0byByZXNldCB5b3VyIHBhc3N3b3JkLlxuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAge2Vycm9yICYmIChcbiAgICAgICAgICAgIDxCb3ggcD1cImRlZmF1bHRcIiBtYj1cImRlZmF1bHRcIiBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6ICcjZmVmMmYyJywgYm9yZGVyOiAnMXB4IHNvbGlkICNmZWUyZTInLCBib3JkZXJSYWRpdXM6ICcwLjM3NXJlbScgfX0+XG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGNvbG9yOiAnI2RjMjYyNicsIGZvbnRTaXplOiAnMC44NzVyZW0nIH19PuKaoO+4jyB7ZXJyb3J9PC9UZXh0PlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHtzdWNjZXNzICYmIChcbiAgICAgICAgICAgIDxCb3ggcD1cImRlZmF1bHRcIiBtYj1cImRlZmF1bHRcIiBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6ICcjZjBmZGY0JywgYm9yZGVyOiAnMXB4IHNvbGlkICNiYmY3ZDAnLCBib3JkZXJSYWRpdXM6ICcwLjM3NXJlbScgfX0+XG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGNvbG9yOiAnIzE2YTM0YScsIGZvbnRTaXplOiAnMC44NzVyZW0nIH19PuKchSB7c3VjY2Vzc308L1RleHQ+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgPEJveCBtYj1cImxnXCI+XG4gICAgICAgICAgICA8TGFiZWwgaHRtbEZvcj1cInJlc2V0RW1haWxcIiByZXF1aXJlZD5FbWFpbCBBZGRyZXNzPC9MYWJlbD5cbiAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICBpZD1cInJlc2V0RW1haWxcIlxuICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICB2YWx1ZT17cmVzZXRFbWFpbH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRSZXNldEVtYWlsKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJhZG1pbkBleGFtcGxlLmNvbVwiXG4gICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtsb2FkaW5nfVxuICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBwYWRkaW5nOiAnMTJweCcsIGZvbnRTaXplOiAnMTZweCcgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICA8Qm94IG1iPVwiZGVmYXVsdFwiIHN0eWxlPXt7IG1hcmdpblRvcDogJzFyZW0nIH19PlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxuICAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLCBwYWRkaW5nOiAnMTRweCcsIGZvbnRTaXplOiAnMTZweCcsIGZvbnRXZWlnaHQ6ICc2MDAnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGxvYWRpbmcgPyAnIzljYTNhZicgOiAnIzI1NjNlYicsIGN1cnNvcjogbG9hZGluZyA/ICdub3QtYWxsb3dlZCcgOiAncG9pbnRlcicsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtsb2FkaW5nID8gPHNwYW4+4o+zIFNlbmRpbmcgT1RQLi4uPC9zcGFuPiA6ICdTZW5kIE9UUCd9XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgIDxCb3ggc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnMXJlbScgfX0+XG4gICAgICAgICAgICA8VGV4dFxuICAgICAgICAgICAgICBhcz1cInNwYW5cIlxuICAgICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogJyMyNTYzZWInLCBmb250V2VpZ2h0OiAnNTAwJywgY3Vyc29yOiAncG9pbnRlcicsIGZvbnRTaXplOiAnMC44NzVyZW0nIH19XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3N3aXRjaFRvTG9naW59XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIOKGkCBCYWNrIHRvIFNpZ24gSW5cbiAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodmlldyA9PT0gJ3Jlc2V0UGFzc3dvcmQnKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlUmVzZXRQYXNzd29yZH0+XG4gICAgICAgICAgPEJveCBtYj1cInhsXCI+XG4gICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzEuNXJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjMTExODI3JyB9fT5cbiAgICAgICAgICAgICAgUmVzZXQgUGFzc3dvcmRcbiAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMXJlbScsIGNvbG9yOiAnIzZiNzI4MCcsIG1hcmdpblRvcDogJzAuNXJlbScgfX0+XG4gICAgICAgICAgICAgIEVudGVyIHRoZSBPVFAgc2VudCB0byB5b3VyIGVtYWlsIGFuZCB5b3VyIG5ldyBwYXNzd29yZC5cbiAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgIHtlcnJvciAmJiAoXG4gICAgICAgICAgICA8Qm94IHA9XCJkZWZhdWx0XCIgbWI9XCJkZWZhdWx0XCIgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiAnI2ZlZjJmMicsIGJvcmRlcjogJzFweCBzb2xpZCAjZmVlMmUyJywgYm9yZGVyUmFkaXVzOiAnMC4zNzVyZW0nIH19PlxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyNkYzI2MjYnLCBmb250U2l6ZTogJzAuODc1cmVtJyB9fT7imqDvuI8ge2Vycm9yfTwvVGV4dD5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7c3VjY2VzcyAmJiAoXG4gICAgICAgICAgICA8Qm94IHA9XCJkZWZhdWx0XCIgbWI9XCJkZWZhdWx0XCIgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiAnI2YwZmRmNCcsIGJvcmRlcjogJzFweCBzb2xpZCAjYmJmN2QwJywgYm9yZGVyUmFkaXVzOiAnMC4zNzVyZW0nIH19PlxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyMxNmEzNGEnLCBmb250U2l6ZTogJzAuODc1cmVtJyB9fT7inIUge3N1Y2Nlc3N9PC9UZXh0PlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIDxCb3ggbWI9XCJsZ1wiPlxuICAgICAgICAgICAgPExhYmVsIGh0bWxGb3I9XCJvdHBJbnB1dFwiIHJlcXVpcmVkPk9UUCBDb2RlPC9MYWJlbD5cbiAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICBpZD1cIm90cElucHV0XCJcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICB2YWx1ZT17b3RwfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE90cChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgNi1kaWdpdCBPVFBcIlxuICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cbiAgICAgICAgICAgICAgbWF4TGVuZ3RoPXs2fVxuICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBwYWRkaW5nOiAnMTJweCcsIGZvbnRTaXplOiAnMTZweCcsIGxldHRlclNwYWNpbmc6ICc0cHgnLCB0ZXh0QWxpZ246ICdjZW50ZXInIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgPEJveCBtYj1cImRlZmF1bHRcIj5cbiAgICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwibmV3UGFzc3dvcmRcIiByZXF1aXJlZD5OZXcgUGFzc3dvcmQ8L0xhYmVsPlxuICAgICAgICAgICAgPEJveCBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cbiAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgaWQ9XCJuZXdQYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgdHlwZT17c2hvd05ld1Bhc3N3b3JkID8gJ3RleHQnIDogJ3Bhc3N3b3JkJ31cbiAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdQYXNzd29yZChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBuZXcgcGFzc3dvcmQgKG1pbiA2IGNoYXJhY3RlcnMpXCJcbiAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtsb2FkaW5nfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIHBhZGRpbmc6ICcxMnB4JywgZm9udFNpemU6ICcxNnB4JywgcGFkZGluZ1JpZ2h0OiAnNDVweCcgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dOZXdQYXNzd29yZCghc2hvd05ld1Bhc3N3b3JkKX1cbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHJpZ2h0OiAnMTJweCcsIHRvcDogJzUwJScsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknLFxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsIGNvbG9yOiAnIzZiNzI4MCcsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtzaG93TmV3UGFzc3dvcmQgPyAn8J+Rge+4jycgOiAn8J+Rge+4j+KAjfCfl6jvuI8nfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgPEJveCBtYj1cImRlZmF1bHRcIiBzdHlsZT17eyBtYXJnaW5Ub3A6ICcxcmVtJyB9fT5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJywgcGFkZGluZzogJzE0cHgnLCBmb250U2l6ZTogJzE2cHgnLCBmb250V2VpZ2h0OiAnNjAwJyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBsb2FkaW5nID8gJyM5Y2EzYWYnIDogJyMyNTYzZWInLCBjdXJzb3I6IGxvYWRpbmcgPyAnbm90LWFsbG93ZWQnIDogJ3BvaW50ZXInLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bG9hZGluZyA/IDxzcGFuPuKPsyBSZXNldHRpbmcuLi48L3NwYW4+IDogJ1Jlc2V0IFBhc3N3b3JkJ31cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICcxcmVtJyB9fT5cbiAgICAgICAgICAgIDxUZXh0XG4gICAgICAgICAgICAgIGFzPVwic3BhblwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiAnIzI1NjNlYicsIGZvbnRXZWlnaHQ6ICc1MDAnLCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6ICcwLjg3NXJlbScgfX1cbiAgICAgICAgICAgICAgb25DbGljaz17c3dpdGNoVG9Mb2dpbn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAg4oaQIEJhY2sgdG8gU2lnbiBJblxuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L2Zvcm0+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIERlZmF1bHQ6IExvZ2luIHZpZXdcbiAgICByZXR1cm4gKFxuICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XG4gICAgICAgIDxCb3ggbWI9XCJ4bFwiPlxuICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMS41cmVtJywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJyMxMTE4MjcnIH19PlxuICAgICAgICAgICAgU2lnbiBJblxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzFyZW0nLCBjb2xvcjogJyM2YjcyODAnLCBtYXJnaW5Ub3A6ICcwLjVyZW0nIH19PlxuICAgICAgICAgICAgRW50ZXIgeW91ciBjcmVkZW50aWFscyB0byBhY2Nlc3MgdGhlIGRhc2hib2FyZFxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAge2Vycm9yICYmIChcbiAgICAgICAgICA8Qm94IHA9XCJkZWZhdWx0XCIgbWI9XCJkZWZhdWx0XCIgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiAnI2ZlZjJmMicsIGJvcmRlcjogJzFweCBzb2xpZCAjZmVlMmUyJywgYm9yZGVyUmFkaXVzOiAnMC4zNzVyZW0nIH19PlxuICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjZGMyNjI2JywgZm9udFNpemU6ICcwLjg3NXJlbScgfX0+4pqg77iPIHtlcnJvcn08L1RleHQ+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICl9XG5cbiAgICAgICAge3N1Y2Nlc3MgJiYgKFxuICAgICAgICAgIDxCb3ggcD1cImRlZmF1bHRcIiBtYj1cImRlZmF1bHRcIiBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6ICcjZjBmZGY0JywgYm9yZGVyOiAnMXB4IHNvbGlkICNiYmY3ZDAnLCBib3JkZXJSYWRpdXM6ICcwLjM3NXJlbScgfX0+XG4gICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyMxNmEzNGEnLCBmb250U2l6ZTogJzAuODc1cmVtJyB9fT7inIUge3N1Y2Nlc3N9PC9UZXh0PlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApfVxuXG4gICAgICAgIDxCb3ggbWI9XCJsZ1wiPlxuICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwiZW1haWxcIiByZXF1aXJlZD5FbWFpbCBBZGRyZXNzPC9MYWJlbD5cbiAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgIGlkPVwiZW1haWxcIlxuICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcbiAgICAgICAgICAgIHZhbHVlPXtlbWFpbH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RW1haWwoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJhZG1pbkBleGFtcGxlLmNvbVwiXG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XG4gICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBwYWRkaW5nOiAnMTJweCcsIGZvbnRTaXplOiAnMTZweCcgfX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0JveD5cblxuICAgICAgICA8Qm94IG1iPVwiZGVmYXVsdFwiPlxuICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwicGFzc3dvcmRcIiByZXF1aXJlZD5QYXNzd29yZDwvTGFiZWw+XG4gICAgICAgICAgPEJveCBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cbiAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICBpZD1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgdHlwZT17c2hvd1Bhc3N3b3JkID8gJ3RleHQnIDogJ3Bhc3N3b3JkJ31cbiAgICAgICAgICAgICAgdmFsdWU9e3Bhc3N3b3JkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIHBhZGRpbmc6ICcxMnB4JywgZm9udFNpemU6ICcxNnB4JywgcGFkZGluZ1JpZ2h0OiAnNDVweCcgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93UGFzc3dvcmQoIXNob3dQYXNzd29yZCl9XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHJpZ2h0OiAnMTJweCcsIHRvcDogJzUwJScsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdub25lJywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLCBjb2xvcjogJyM2YjcyODAnLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7c2hvd1Bhc3N3b3JkID8gJ/CfkYHvuI8nIDogJ/CfkYHvuI/igI3wn5eo77iPJ31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cblxuICAgICAgICA8Qm94IHN0eWxlPXt7IHRleHRBbGlnbjogJ3JpZ2h0JywgbWFyZ2luQm90dG9tOiAnMC41cmVtJyB9fT5cbiAgICAgICAgICA8VGV4dFxuICAgICAgICAgICAgYXM9XCJzcGFuXCJcbiAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiAnIzI1NjNlYicsIGZvbnRXZWlnaHQ6ICc1MDAnLCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6ICcwLjg3NXJlbScgfX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3N3aXRjaFRvRm9yZ290UGFzc3dvcmR9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgRm9yZ290IFBhc3N3b3JkP1xuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgPEJveCBtYj1cInhsXCIgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMXJlbScgfX0+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXG4gICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsIHBhZGRpbmc6ICcxNHB4JywgZm9udFNpemU6ICcxNnB4JywgZm9udFdlaWdodDogJzYwMCcsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IGxvYWRpbmcgPyAnIzljYTNhZicgOiAnIzI1NjNlYicsIGN1cnNvcjogbG9hZGluZyA/ICdub3QtYWxsb3dlZCcgOiAncG9pbnRlcicsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsb2FkaW5nID8gKFxuICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17eyBtYXJnaW5SaWdodDogJzhweCcgfX0+4o+zPC9zcGFuPlNpZ25pbmcgaW4uLi48L3NwYW4+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAnU2lnbiBJbidcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9mb3JtPlxuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94XG4gICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICBtaW5IZWlnaHQ9XCIxMDB2aFwiXG4gICAgICBzdHlsZT17eyBmb250RmFtaWx5OiAnSW50ZXIsIHN5c3RlbS11aSwgc2Fucy1zZXJpZicgfX1cbiAgICA+XG4gICAgICB7LyogTGVmdCBTaWRlIC0gQnJhbmRpbmcgKi99XG4gICAgICA8Qm94XG4gICAgICAgIGZsZXg9XCIxXCJcbiAgICAgICAgZGlzcGxheT17eyBfOiAnbm9uZScsIG1kOiAnZmxleCcgfX1cbiAgICAgICAgZmxleERpcmVjdGlvbj1cImNvbHVtblwiXG4gICAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcbiAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICAgIHA9XCJ4eGxcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMjU2M2ViIDAlLCAjMWU0MGFmIDEwMCUpJyxcbiAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPEJveCB0ZXh0QWxpZ249XCJjZW50ZXJcIiBzdHlsZT17eyBtYXhXaWR0aDogJzUwMHB4JyB9fT5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBzcmM9XCIvaW1hZ2VzL2xvZ28td2hpdGUucG5nXCJcbiAgICAgICAgICAgIGFsdD1cIkxvZ29cIlxuICAgICAgICAgICAgc3R5bGU9e3sgbWF4V2lkdGg6ICcyNTBweCcsIG1hcmdpbkJvdHRvbTogJzJyZW0nIH19XG4gICAgICAgICAgICBvbkVycm9yPXsoZSkgPT4ge1xuICAgICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMnJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJywgbWFyZ2luQm90dG9tOiAnMXJlbScgfX0+XG4gICAgICAgICAgICBSZWxpZWYgTWFuYWdlbWVudCBTeXN0ZW1cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxLjEyNXJlbScsIG9wYWNpdHk6IDAuOSB9fT5cbiAgICAgICAgICAgIENvb3JkaW5hdGluZyBkaXNhc3RlciByZWxpZWYgZWZmb3J0cyB3aXRoIGVmZmljaWVuY3kgYW5kIGNvbXBhc3Npb25cbiAgICAgICAgICA8L1RleHQ+XG5cbiAgICAgICAgICA8Qm94XG4gICAgICAgICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICAgICAgICBzdHlsZT17eyBnYXA6ICcycmVtJywgbWFyZ2luVG9wOiAnM3JlbScsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJyB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxCb3ggc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcycmVtJywgZm9udFdlaWdodDogJ2JvbGQnIH19PjUwMCs8L1RleHQ+XG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMC44NzVyZW0nIH19PkFpZCBSZXF1ZXN0czwvVGV4dD5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzJyZW0nLCBmb250V2VpZ2h0OiAnYm9sZCcgfX0+MTIwMCs8L1RleHQ+XG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMC44NzVyZW0nIH19PkRvbmF0aW9uczwvVGV4dD5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzJyZW0nLCBmb250V2VpZ2h0OiAnYm9sZCcgfX0+NTArPC9UZXh0PlxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzAuODc1cmVtJyB9fT5SZWxpZWYgQ2VudGVyczwvVGV4dD5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogUmlnaHQgU2lkZSAtIEZvcm0gKi99XG4gICAgICA8Qm94XG4gICAgICAgIGZsZXg9XCIxXCJcbiAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCJcbiAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIlxuICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgICAgcD1cInh4bFwiXG4gICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogJyNmOWZhZmInIH19XG4gICAgICA+XG4gICAgICAgIDxCb3hcbiAgICAgICAgICBiZz1cIndoaXRlXCJcbiAgICAgICAgICBwPVwieHhsXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMC41cmVtJyxcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMXB4IDNweCAwIHJnYmEoMCwgMCwgMCwgMC4xKScsXG4gICAgICAgICAgICB3aWR0aDogJzQ1MHB4JyxcbiAgICAgICAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHtyZW5kZXJGb3JtKCl9XG5cbiAgICAgICAgICB7dmlldyA9PT0gJ2xvZ2luJyAmJiAoXG4gICAgICAgICAgICA8Qm94IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicsIG1hcmdpblRvcDogJzEuNXJlbScgfX0+XG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMC44NzVyZW0nLCBjb2xvcjogJyM2YjcyODAnIH19PlxuICAgICAgICAgICAgICAgIERvbid0IGhhdmUgYW4gYWNjb3VudD97JyAnfVxuICAgICAgICAgICAgICAgIDxUZXh0XG4gICAgICAgICAgICAgICAgICBhcz1cInNwYW5cIlxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6ICcjMjU2M2ViJywgZm9udFdlaWdodDogJ2JvbGQnLCBjdXJzb3I6ICdwb2ludGVyJyB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIENvbnRhY3QgQWRtaW5pc3RyYXRvclxuICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICcxcmVtJyB9fT5cbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzAuNzVyZW0nLCBjb2xvcjogJyM2YjcyODAnIH19PlxuICAgICAgICAgICAgwqkgMjAyNiBSZWxpZWYgTWFuYWdlbWVudCBTeXN0ZW0uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTG9naW5Db21wb25lbnQ7IiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbmNvbnN0IEltYWdlQ29tcG9uZW50ID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyByZWNvcmQsIHByb3BlcnR5IH0gPSBwcm9wcztcbiAgICBjb25zdCByYXdJbWFnZVVybCA9IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV07XG4gICAgY29uc3QgW2hhc0Vycm9yLCBzZXRIYXNFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgICBpZiAoIXJhd0ltYWdlVXJsKSB7XG4gICAgICAgIHJldHVybiA8Qm94PjxzcGFuIHN0eWxlPXt7IGNvbG9yOiAnIzk5OScsIGZvbnRTaXplOiAnMTJweCcgfX0+Tm8gaW1hZ2U8L3NwYW4+PC9Cb3g+O1xuICAgIH1cblxuICAgIC8vIE5vcm1hbGl6ZSBVUkw6IGVuc3VyZSBpdCBzdGFydHMgd2l0aCAnLycgZm9yIHNlcnZlci1yZWxhdGl2ZSBwYXRoc1xuICAgIGNvbnN0IGltYWdlVXJsID0gcmF3SW1hZ2VVcmwuc3RhcnRzV2l0aCgnLycpIHx8IHJhd0ltYWdlVXJsLnN0YXJ0c1dpdGgoJ2h0dHAnKSBcbiAgICAgICAgPyByYXdJbWFnZVVybCBcbiAgICAgICAgOiBgLyR7cmF3SW1hZ2VVcmx9YDtcblxuICAgIGlmIChoYXNFcnJvcikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEJveD5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogJyNkYzM1NDUnLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICBJbWFnZSBub3QgZm91bmRcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8Qm94PlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIHNyYz17aW1hZ2VVcmx9XG4gICAgICAgICAgICAgICAgYWx0PXtwcm9wZXJ0eS5sYWJlbH1cbiAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXhXaWR0aDogJzEwMHB4JywgbWF4SGVpZ2h0OiAnMTAwcHgnLCBvYmplY3RGaXQ6ICdjb3ZlcicgfX1cbiAgICAgICAgICAgICAgICBvbkVycm9yPXsoKSA9PiBzZXRIYXNFcnJvcih0cnVlKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvQm94PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbWFnZUNvbXBvbmVudDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgSW1hZ2VMaXN0Q29tcG9uZW50ID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyByZWNvcmQsIHByb3BlcnR5IH0gPSBwcm9wcztcblxuICAgIGNvbnN0IGltYWdlcyA9IFtdO1xuICAgIC8vIENoZWNrIGZvciBmbGF0dGVuZWQga2V5cyBsaWtlICdwcm9vZkltYWdlcy4wJywgJ3Byb29mSW1hZ2VzLjEnLCBldGMuXG4gICAgT2JqZWN0LmtleXMocmVjb3JkLnBhcmFtcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAvLyBDaGVjayBpZiBrZXkgc3RhcnRzIHdpdGggcHJvcGVydHkgbmFtZSBhbmQgZm9sbG93cyB3aXRoIC5pbmRleFxuICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYCR7cHJvcGVydHkubmFtZX0uYCkgJiYgIWlzTmFOKGtleS5zcGxpdCgnLicpLnBvcCgpKSkge1xuICAgICAgICAgICAgaW1hZ2VzLnB1c2gocmVjb3JkLnBhcmFtc1trZXldKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGltYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gTm9ybWFsaXplIFVSTDogZW5zdXJlIGl0IHN0YXJ0cyB3aXRoICcvJyBmb3Igc2VydmVyLXJlbGF0aXZlIHBhdGhzXG4gICAgY29uc3Qgbm9ybWFsaXplVXJsID0gKHVybCkgPT4ge1xuICAgICAgICBpZiAoIXVybCkgcmV0dXJuIHVybDtcbiAgICAgICAgcmV0dXJuIHVybC5zdGFydHNXaXRoKCcvJykgfHwgdXJsLnN0YXJ0c1dpdGgoJ2h0dHAnKSA/IHVybCA6IGAvJHt1cmx9YDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGZsZXhEaXJlY3Rpb249XCJyb3dcIiBmbGV4V3JhcD1cIndyYXBcIiBnYXA9ezJ9PlxuICAgICAgICAgICAge2ltYWdlcy5tYXAoKHVybCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17bm9ybWFsaXplVXJsKHVybCl9XG4gICAgICAgICAgICAgICAgICAgIGFsdD17YCR7cHJvcGVydHkubGFiZWx9LSR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWF4V2lkdGg6ICcxMDBweCcsIG1heEhlaWdodDogJzEwMHB4Jywgb2JqZWN0Rml0OiAnY292ZXInIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L0JveD5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VMaXN0Q29tcG9uZW50O1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIElucHV0LCBMYWJlbCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG5jb25zdCBJbWFnZUVkaXRDb21wb25lbnQgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0gPSBwcm9wcztcbiAgICBjb25zdCB2YWx1ZSA9IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0gfHwgJyc7XG4gICAgY29uc3QgW2ltYWdlVXJsLCBzZXRJbWFnZVVybF0gPSB1c2VTdGF0ZSh2YWx1ZSk7XG5cbiAgICAvLyBVcGRhdGUgbG9jYWwgc3RhdGUgaWYgcmVjb3JkIGNoYW5nZXMgZnJvbSBvdXRzaWRlIChlLmcuIHJlbG9hZClcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRJbWFnZVVybChyZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdIHx8ICcnKTtcbiAgICB9LCBbcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXV0pO1xuXG4gICAgY29uc3QgaGFuZGxlSW5wdXRDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIHNldEltYWdlVXJsKG5ld1ZhbHVlKTtcbiAgICAgICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgbmV3VmFsdWUpO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cInh4bFwiPlxuICAgICAgICAgICAgPExhYmVsIGh0bWxGb3I9e3Byb3BlcnR5Lm5hbWV9Pntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxuICAgICAgICAgICAge2ltYWdlVXJsICYmIChcbiAgICAgICAgICAgICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cImRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtpbWFnZVVybH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIlByZXZpZXdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWF4V2lkdGg6ICcyMDBweCcsIG1heEhlaWdodDogJzIwMHB4Jywgb2JqZWN0Rml0OiAnY292ZXInLCBkaXNwbGF5OiAnYmxvY2snLCBtYXJnaW5Cb3R0b206ICc4cHgnLCBib3JkZXI6ICcxcHggc29saWQgI2RkZCcsIHBhZGRpbmc6ICc0cHgnIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkVycm9yPXsoZSkgPT4geyBlLnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgIGlkPXtwcm9wZXJ0eS5uYW1lfVxuICAgICAgICAgICAgICAgIG5hbWU9e3Byb3BlcnR5Lm5hbWV9XG4gICAgICAgICAgICAgICAgdmFsdWU9e2ltYWdlVXJsfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgICAgICB3aWR0aD17MX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvQm94PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbWFnZUVkaXRDb21wb25lbnQ7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgTGFiZWwsIElucHV0LCBCdXR0b24sIEljb24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgSW1hZ2VMaXN0RWRpdENvbXBvbmVudCA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSA9IHByb3BzO1xuXG4gICAgLy8gRmxhdHRlbmVkIHBhcmFtcyBhcmUgc3RvcmVkIGxpa2UgJ3Byb29mSW1hZ2VzLjAnOiAndXJsMScsICdwcm9vZkltYWdlcy4xJzogJ3VybDInXG4gICAgLy8gV2UgbmVlZCB0byByZWNvbnN0cnVjdCB0aGUgYXJyYXlcbiAgICBjb25zdCBnZXRJbWFnZXMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGltYWdlcyA9IFtdO1xuICAgICAgICBPYmplY3Qua2V5cyhyZWNvcmQucGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYCR7cHJvcGVydHkubmFtZX0uYCkgJiYgIWlzTmFOKGtleS5zcGxpdCgnLicpLnBvcCgpKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoa2V5LnNwbGl0KCcuJykucG9wKCksIDEwKTtcbiAgICAgICAgICAgICAgICBpbWFnZXNbaW5kZXhdID0gcmVjb3JkLnBhcmFtc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gRmlsdGVyIG91dCBlbXB0eSBzbG90cyBpZiBhbnkgaG9sZSBleGlzdHMsIHRob3VnaCBub3JtYWxseSBhZG1pbmpzIGhhbmRsZXMgc2VxdWVudGlhbCBrZXlzXG4gICAgICAgIHJldHVybiBpbWFnZXMuZmlsdGVyKGltZyA9PiBpbWcgIT09IHVuZGVmaW5lZCk7XG4gICAgfTtcblxuICAgIGNvbnN0IFtpbWFnZXMsIHNldEltYWdlc10gPSB1c2VTdGF0ZShnZXRJbWFnZXMoKSk7XG5cbiAgICAvLyBIZWxwZXIgdG8gbm90aWZ5IEFkbWluSlMgb2YgY2hhbmdlc1xuICAgIC8vIEFkbWluSlMgZXhwZWN0cyBmbGF0IGtleXMgZm9yIGFycmF5czogJ3Byb3BlcnR5LjAnLCAncHJvcGVydHkuMSdcbiAgICBjb25zdCB1cGRhdGVSZWNvcmQgPSAobmV3SW1hZ2VzKSA9PiB7XG4gICAgICAgIHNldEltYWdlcyhuZXdJbWFnZXMpO1xuXG4gICAgICAgIC8vIDEuIENsZWFyIGV4aXN0aW5nIGtleXMgZm9yIHRoaXMgcHJvcGVydHlcbiAgICAgICAgLy8gV2UgY2FuJ3QgcmVhbGx5IFwiZGVsZXRlXCIga2V5cyBlYXNpbHkgdmlhIG9uQ2hhbmdlIGluIHRoZSBzdGFuZGFyZCB3YXkgd2l0aG91dCBwb3RlbnRpYWxseSBsZWF2aW5nIGdhcmJhZ2UsXG4gICAgICAgIC8vIGJ1dCBzdGFuZGFyZCBhZG1pbmpzIGhhbmRsaW5nIGV4cGVjdHMgdXMgdG8gb3ZlcndyaXRlLlxuICAgICAgICAvLyBIb3dldmVyLCB0aGUgY2xlYW5lc3Qgd2F5IHRvIHN5bmMgYW4gYXJyYXkgaXMgdG8gdXBkYXRlIGVhY2ggaW5kZXguXG5cbiAgICAgICAgLy8gSWRlYWxseSB3ZSBzaG91bGQgbnVsbGlmeSBvbGQga2V5cyBpZiBhcnJheSBzaHJpbmtzLCBidXQgc3RhbmRhcmQgYmVoYXZpb3IgbWlnaHQganVzdCBoYW5kbGUgd2hhdCB3ZSBzZW5kLlxuICAgICAgICAvLyBBIHNhZmVyIGJldCBpcyB0byByZWx5IG9uIEFkbWluSlMncyBpbnRlcm5hbCBoYW5kbGluZyBpZiB3ZSB3ZXJlIHBhc3NpbmcgdGhlIHdob2xlIG9iamVjdCwgXG4gICAgICAgIC8vIGJ1dCBoZXJlIHdlIGFyZSBhIGNvbXBvbmVudC5cblxuICAgICAgICAvLyBXZSB3aWxsIGp1c3QgdXBkYXRlICdwcm9wZXJ0eS4wJywgJ3Byb3BlcnR5LjEnIGV0Yy5cbiAgICAgICAgLy8gQW5kIGlkZWFsbHkgd2UgbWlnaHQgbmVlZCB0byBjbGVhciAncHJvcGVydHkuMicgaWYgd2Ugd2VudCBmcm9tIDMgaXRlbXMgdG8gMi5cbiAgICAgICAgLy8gVG8gcHJvcGVybHkgXCJjbGVhclwiIHdlIG1pZ2h0IG5lZWQgdG8gc2V0IGl0IHRvIG51bGwgb3IgdW5kZWZpbmVkLlxuXG4gICAgICAgIC8vIFN0cmF0ZWd5OiBVcGRhdGUgYWxsIGN1cnJlbnQgaW5kaWNlcy4gXG4gICAgICAgIC8vIElmIHRoZSBhcnJheSBzaHJhbmssIHdlIGNhbiB0cnkgc2V0dGluZyB0aGUgbmV4dCBpbmRleCB0byBudWxsL3VuZGVmaW5lZCB0byBzZWUgaWYgYmFja2VuZCBoYW5kbGVzIGl0LFxuICAgICAgICAvLyBvciBqdXN0IHJlbHkgb24gdGhlIGZhY3QgdGhhdCB3ZSBhcmUgcmV3cml0aW5nIHRoZSBwYXJhbXMuXG5cbiAgICAgICAgLy8gQWN0dWFsbHksIG9uQ2hhbmdlIGV4cGVjdHMgKGtleSwgdmFsdWUpLlxuICAgICAgICAvLyBXZSBuZWVkIHRvIHVwZGF0ZSBtdWx0aXBsZSBrZXlzLiBBZG1pbkpTIGBvbkNoYW5nZWAgbWlnaHQgbm90IHN1cHBvcnQgYmF0Y2ggdXBkYXRlcyBlYXNpbHkgZGVwZW5kaW5nIG9uIHZlcnNpb24uXG4gICAgICAgIC8vIEJ1dCB1c3VhbGx5IGl0J3MgYG9uQ2hhbmdlKHByb3BlcnR5LCB2YWx1ZSlgIHdoZXJlIHZhbHVlIGlzIHRoZSBmdWxsIHZhbHVlPyBcbiAgICAgICAgLy8gTm8sIGZvciBhcnJheSBwcm9wZXJ0aWVzLCBBZG1pbkpTIG9mdGVuIHRyZWF0cyB0aGVtIGVzc2VudGlhbGx5IGFzIGluZGl2aWR1YWwgZmllbGRzIGlmIGZsYXR0ZW5lZC5cblxuICAgICAgICAvLyBXQUlUOiBJZiB3ZSB1c2UgYSBjdXN0b20gY29tcG9uZW50IGZvciB0aGUgKmVudGlyZSBhcnJheSBwcm9wZXJ0eSosIGBvbkNoYW5nZWAgbWlnaHQgYWNjZXB0IHRoZSBhcnJheSBpdHNlbGZcbiAgICAgICAgLy8gaWYgdGhlIGJhY2tlbmQgYWRhcHRlciBzdXBwb3J0cyBpdC4gQnV0IEFkbWluSlMgb2Z0ZW4gZmxhdHRlbnMuXG5cbiAgICAgICAgLy8gTGV0J3MgY2hlY2sgaG93IHN0YW5kYXJkIGFycmF5IGVkaXRpbmcgd29ya3MuXG4gICAgICAgIC8vIElmIHdlIGxvb2sgYXQgZXhpc3RpbmcgYEltYWdlTGlzdENvbXBvbmVudGAsIGl0IHJlYWRzIGZyb20gYHJlY29yZC5wYXJhbXNgLlxuXG4gICAgICAgIC8vIExldCdzIHRyeSBzZW5kaW5nIHRoZSBhcnJheSB0byBgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgbmV3SW1hZ2VzKWAuXG4gICAgICAgIC8vIE1hbnkgQWRtaW5KUyBhZGFwdGVycyAobGlrZSBNb25nb29zZSkgaGFuZGxlIHRoZSBhcnJheSBpZiBwYXNzZWQgYXMgYSB2YWx1ZSB0byB0aGUgbWFpbiBwcm9wZXJ0eSBrZXkuXG4gICAgICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIG5ld0ltYWdlcyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZUFkZCA9ICgpID0+IHtcbiAgICAgICAgdXBkYXRlUmVjb3JkKFsuLi5pbWFnZXMsICcnXSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVJlbW92ZSA9IChpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdJbWFnZXMgPSBbLi4uaW1hZ2VzXTtcbiAgICAgICAgbmV3SW1hZ2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHVwZGF0ZVJlY29yZChuZXdJbWFnZXMpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoaW5kZXgsIHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0ltYWdlcyA9IFsuLi5pbWFnZXNdO1xuICAgICAgICBuZXdJbWFnZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgIHVwZGF0ZVJlY29yZChuZXdJbWFnZXMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cInh4bFwiPlxuICAgICAgICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxuICAgICAgICAgICAge2ltYWdlcy5tYXAoKHVybCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8Qm94IGtleT17aW5kZXh9IG1hcmdpbkJvdHRvbT1cImRlZmF1bHRcIiBkaXNwbGF5PVwiZmxleFwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPEJveCBtYXJnaW5SaWdodD1cImRlZmF1bHRcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dXJsICYmIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e3VybH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9e2BJbWFnZSAke2luZGV4ICsgMX1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiAnNTBweCcsIGhlaWdodDogJzUwcHgnLCBvYmplY3RGaXQ6ICdjb3ZlcicsIGJvcmRlclJhZGl1czogJzRweCcgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVycm9yPXsoZSkgPT4geyBlLnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59XG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICAgICA8Qm94IGZsZXhHcm93PXsxfSBtYXJnaW5SaWdodD1cImRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt1cmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVDaGFuZ2UoaW5kZXgsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17MX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkltYWdlIFVSTFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVSZW1vdmUoaW5kZXgpfSB2YXJpYW50PVwiZGFuZ2VyXCIgc2l6ZT1cImljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIGljb249XCJUcmFzaDJcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVBZGR9IHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgICAgICA8SWNvbiBpY29uPVwiUGx1c1wiIC8+IEFkZCBJbWFnZSBVUkxcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0JveD5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VMaXN0RWRpdENvbXBvbmVudDtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXBpQ2xpZW50LCB1c2VSZWNvcmQsIHVzZU5vdGljZSB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHtcbiAgICBCb3gsXG4gICAgSDMsXG4gICAgTGFiZWwsXG4gICAgSW5wdXQsXG4gICAgU2VsZWN0LFxuICAgIEJ1dHRvbixcbiAgICBGb3JtR3JvdXAsXG4gICAgQ2hlY2tCb3gsXG4gICAgVGV4dCxcbiAgICBMb2FkZXIsXG4gICAgTWVzc2FnZUJveCxcbn0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbmNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcbi8vIFVzZSBlbXB0eSBzdHJpbmcgZm9yIHJlbGF0aXZlIFVSTCBzaW5jZSBBZG1pbkpTIHJ1bnMgb24gdGhlIHNhbWUgc2VydmVyXG5jb25zdCBCQVNFX1VSTCA9ICcnO1xuXG5jb25zdCBDcmVhdGVUYXNrRnJvbUFpZFJlcXVlc3QgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IHJlY29yZCwgcmVzb3VyY2UgfSA9IHByb3BzO1xuICAgIGNvbnN0IGFkZE5vdGljZSA9IHVzZU5vdGljZSgpO1xuXG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFt2b2x1bnRlZXJzLCBzZXRWb2x1bnRlZXJzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbc2VhcmNoUXVlcnksIHNldFNlYXJjaFF1ZXJ5XSA9IHVzZVN0YXRlKCcnKTtcbiAgICBjb25zdCBbZm9ybURhdGEsIHNldEZvcm1EYXRhXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgdGFza05hbWU6IHJlY29yZD8ucGFyYW1zPy5uYW1lIHx8ICdBaWQgUmVxdWVzdCBUYXNrJyxcbiAgICAgICAgdm9sdW50ZWVyc05lZWRlZDogMSxcbiAgICAgICAgaXNPcGVuOiB0cnVlLFxuICAgICAgICBwcmlvcml0eTogcmVjb3JkPy5wYXJhbXM/LnByaW9yaXR5IHx8ICdtZWRpdW0nLFxuICAgICAgICBzZWxlY3RlZFZvbHVudGVlcnM6IFtdLFxuICAgIH0pO1xuICAgIGNvbnN0IFtoYXNFeGlzdGluZ1Rhc2ssIHNldEhhc0V4aXN0aW5nVGFza10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgICAvLyBDaGVjayBpZiB0YXNrIGFscmVhZHkgZXhpc3RzIGZvciB0aGlzIGFpZCByZXF1ZXN0XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgY2hlY2tFeGlzdGluZ1Rhc2sgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VJZDogJ1Rhc2tTY2hlbWEnLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnbGlzdCcsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogeyAnZmlsdGVycy5haWRSZXF1ZXN0JzogcmVjb3JkLmlkIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGE/LnJlY29yZHM/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0SGFzRXhpc3RpbmdUYXNrKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY2hlY2tpbmcgZXhpc3RpbmcgdGFzazonLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNoZWNrRXhpc3RpbmdUYXNrKCk7XG4gICAgfSwgW3JlY29yZC5pZF0pO1xuXG4gICAgLy8gRmV0Y2ggdm9sdW50ZWVyc1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZldGNoVm9sdW50ZWVycyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUlkOiAndXNlclByb2ZpbGUnLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnbGlzdCcsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2ZpbHRlcnMucm9sZSc6ICd2b2x1bnRlZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyUGFnZTogMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHNlYXJjaFF1ZXJ5ICYmIHsgJ2ZpbHRlcnMubmFtZSc6IHNlYXJjaFF1ZXJ5IH0pLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhPy5yZWNvcmRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFZvbHVudGVlcnMoXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhLnJlY29yZHMubWFwKCh2KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBgJHt2LnBhcmFtcy5uYW1lfSAoJHt2LnBhcmFtcy5za2lsbCB8fCAnTm8gc2tpbGwnfSlgLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB2b2x1bnRlZXJzOicsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZmV0Y2hWb2x1bnRlZXJzKCk7XG4gICAgfSwgW3NlYXJjaFF1ZXJ5XSk7XG5cbiAgICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgICAgICAgICAgYCR7QkFTRV9VUkx9L2FwaS9hZG1pbi90YXNrL2NyZWF0ZS1mcm9tLWFpZC1yZXF1ZXN0LyR7cmVjb3JkLmlkfWAsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFza05hbWU6IGZvcm1EYXRhLnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdm9sdW50ZWVyc05lZWRlZDogZm9ybURhdGEudm9sdW50ZWVyc05lZWRlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3BlbjogZm9ybURhdGEuaXNPcGVuLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHk6IGZvcm1EYXRhLnByaW9yaXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWRWb2x1bnRlZXJzOiBmb3JtRGF0YS5pc09wZW4gPyBbXSA6IGZvcm1EYXRhLnNlbGVjdGVkVm9sdW50ZWVycyxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIGFkZE5vdGljZSh7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdUYXNrIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5IScsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyBSZWRpcmVjdCBiYWNrIHRvIHRoZSBhaWQgcmVxdWVzdCBsaXN0XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2Rhc2hib2FyZC9yZXNvdXJjZXMvQWlkUmVxdWVzdCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFkZE5vdGljZSh7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRhdGEubWVzc2FnZSB8fCAnRmFpbGVkIHRvIGNyZWF0ZSB0YXNrJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNyZWF0aW5nIHRhc2s6JywgZXJyb3IpO1xuICAgICAgICAgICAgYWRkTm90aWNlKHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnRXJyb3IgY3JlYXRpbmcgdGFzay4gUGxlYXNlIHRyeSBhZ2Fpbi4nLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVZvbHVudGVlclNlbGVjdCA9IChzZWxlY3RlZCkgPT4ge1xuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZvbHVudGVlcnMgPSBBcnJheS5pc0FycmF5KHNlbGVjdGVkKVxuICAgICAgICAgICAgICAgID8gc2VsZWN0ZWQubWFwKChzKSA9PiBzLnZhbHVlKS5zbGljZSgwLCBmb3JtRGF0YS52b2x1bnRlZXJzTmVlZGVkKVxuICAgICAgICAgICAgICAgIDogW3NlbGVjdGVkLnZhbHVlXTtcbiAgICAgICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRWb2x1bnRlZXJzOiBuZXdWb2x1bnRlZXJzLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0Rm9ybURhdGEoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFZvbHVudGVlcnM6IFtdLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGlmIChoYXNFeGlzdGluZ1Rhc2spIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxCb3ggdmFyaWFudD1cImdyZXlcIiBwYWRkaW5nPVwieGxcIj5cbiAgICAgICAgICAgICAgICA8TWVzc2FnZUJveCB2YXJpYW50PVwiZGFuZ2VyXCIgbWVzc2FnZT1cIkEgdGFzayBhbHJlYWR5IGV4aXN0cyBmb3IgdGhpcyBhaWQgcmVxdWVzdC5cIiAvPlxuICAgICAgICAgICAgICAgIDxCb3ggbWFyZ2luVG9wPVwibGdcIj5cbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gKHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9kYXNoYm9hcmQvcmVzb3VyY2VzL0FpZFJlcXVlc3QnKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgQmFjayB0byBBaWQgUmVxdWVzdHNcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8Qm94IHZhcmlhbnQ9XCJncmV5XCIgcGFkZGluZz1cInhsXCI+XG4gICAgICAgICAgICA8SDM+Q3JlYXRlIFRhc2sgZnJvbSBBaWQgUmVxdWVzdDwvSDM+XG4gICAgICAgICAgICA8VGV4dCBtYXJnaW5Cb3R0b209XCJsZ1wiPlxuICAgICAgICAgICAgICAgIENyZWF0aW5nIHRhc2sgZm9yOiA8c3Ryb25nPntyZWNvcmQ/LnBhcmFtcz8ubmFtZSB8fCAnVW5rbm93biBSZXF1ZXN0J308L3N0cm9uZz5cbiAgICAgICAgICAgIDwvVGV4dD5cblxuICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsPlRhc2sgTmFtZTwvTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLnRhc2tOYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoeyAuLi5wcmV2LCB0YXNrTmFtZTogZS50YXJnZXQudmFsdWUgfSkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuXG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsPlByaW9yaXR5PC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3sgdmFsdWU6IGZvcm1EYXRhLnByaW9yaXR5LCBsYWJlbDogZm9ybURhdGEucHJpb3JpdHkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnaGlnaCcsIGxhYmVsOiAnSGlnaCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnbWVkaXVtJywgbGFiZWw6ICdNZWRpdW0nIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJ2xvdycsIGxhYmVsOiAnTG93JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoc2VsZWN0ZWQpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Rm9ybURhdGEoKHByZXYpID0+ICh7IC4uLnByZXYsIHByaW9yaXR5OiBzZWxlY3RlZC52YWx1ZSB9KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgIDxMYWJlbD5Wb2x1bnRlZXJzIE5lZWRlZDwvTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW49XCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS52b2x1bnRlZXJzTmVlZGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2x1bnRlZXJzTmVlZGVkOiBwYXJzZUludChlLnRhcmdldC52YWx1ZSwgMTApIHx8IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgICAgICA8Q2hlY2tCb3hcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiaXNPcGVuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2Zvcm1EYXRhLmlzT3Blbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBpc09wZW46ICFwcmV2LmlzT3BlbiB9KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsIGlubGluZSBodG1sRm9yPVwiaXNPcGVuXCIgbWFyZ2luTGVmdD1cImRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIE9wZW4gVGFzayAodm9sdW50ZWVycyBjYW4gY2xhaW0gZnJvbSBtYXJrZXRwbGFjZSlcbiAgICAgICAgICAgICAgICAgICAgPC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgICAgICAgIHshZm9ybURhdGEuaXNPcGVuICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3NpZ24gVm9sdW50ZWVycyB7Zm9ybURhdGEudm9sdW50ZWVyc05lZWRlZCA+IDEgJiYgYChtYXggJHtmb3JtRGF0YS52b2x1bnRlZXJzTmVlZGVkfSlgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc011bHRpPXtmb3JtRGF0YS52b2x1bnRlZXJzTmVlZGVkID4gMX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1NlYXJjaGFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXt2b2x1bnRlZXJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt2b2x1bnRlZXJzLmZpbHRlcih2ID0+IGZvcm1EYXRhLnNlbGVjdGVkVm9sdW50ZWVycy5pbmNsdWRlcyh2LnZhbHVlKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhzZWxlY3RlZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRGb3JtRGF0YShwcmV2ID0+ICh7IC4uLnByZXYsIHNlbGVjdGVkVm9sdW50ZWVyczogW10gfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlcyA9IEFycmF5LmlzQXJyYXkoc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHNlbGVjdGVkLnNsaWNlKDAsIGZvcm1EYXRhLnZvbHVudGVlcnNOZWVkZWQpLm1hcChzID0+IHMudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtzZWxlY3RlZC52YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEZvcm1EYXRhKHByZXYgPT4gKHsgLi4ucHJldiwgc2VsZWN0ZWRWb2x1bnRlZXJzOiBuZXdWYWx1ZXMgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2Zvcm1EYXRhLnZvbHVudGVlcnNOZWVkZWQgPiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYFNlbGVjdCB1cCB0byAke2Zvcm1EYXRhLnZvbHVudGVlcnNOZWVkZWR9IHZvbHVudGVlcnMuLi5gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJTZWxlY3QgYSB2b2x1bnRlZXIuLi5cIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybURhdGEuc2VsZWN0ZWRWb2x1bnRlZXJzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IG1hcmdpblRvcD1cInNtXCIgY29sb3I9XCJncmV5NjBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0ZWQ6IHtmb3JtRGF0YS5zZWxlY3RlZFZvbHVudGVlcnMubGVuZ3RofS97Zm9ybURhdGEudm9sdW50ZWVyc05lZWRlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgPEJveCBtYXJnaW5Ub3A9XCJ4bFwiPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJzdWJtaXRcIiB2YXJpYW50PVwicHJpbWFyeVwiIGRpc2FibGVkPXtsb2FkaW5nfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsb2FkaW5nID8gPExvYWRlciAvPiA6ICdDcmVhdGUgVGFzayd9XG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJkZWZhdWx0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ9XCJkZWZhdWx0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+ICh3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvZGFzaGJvYXJkL3Jlc291cmNlcy9BaWRSZXF1ZXN0Jyl9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIENhbmNlbFxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9Cb3g+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENyZWF0ZVRhc2tGcm9tQWlkUmVxdWVzdDtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgSW5wdXQsIExhYmVsLCBGb3JtR3JvdXAgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgTWFwUGlja2VyID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyByZWNvcmQsIHByb3BlcnR5LCBvbkNoYW5nZSB9ID0gcHJvcHM7XG4gICAgY29uc3QgbWFwQ29udGFpbmVyUmVmID0gdXNlUmVmKG51bGwpO1xuICAgIGNvbnN0IG1hcEluc3RhbmNlUmVmID0gdXNlUmVmKG51bGwpO1xuICAgIGNvbnN0IG1hcmtlclJlZiA9IHVzZVJlZihudWxsKTtcblxuICAgIC8vIEluaXRpYWwgVmFsdWVzIC0gc2FmZWx5IHBhcnNlIGFuZCB2YWxpZGF0ZVxuICAgIGNvbnN0IGdldEluaXRpYWxWYWx1ZSA9IChwYXRoKSA9PiByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9LiR7cGF0aH1gXTtcbiAgICBjb25zdCBwYXJzZWRMYXQgPSBwYXJzZUZsb2F0KGdldEluaXRpYWxWYWx1ZSgnbG9jYXRpb24uY29vcmRpbmF0ZXMuMScpKTtcbiAgICBjb25zdCBwYXJzZWRMbmcgPSBwYXJzZUZsb2F0KGdldEluaXRpYWxWYWx1ZSgnbG9jYXRpb24uY29vcmRpbmF0ZXMuMCcpKTtcbiAgICBjb25zdCBpbml0aWFsTGF0ID0gIWlzTmFOKHBhcnNlZExhdCkgPyBwYXJzZWRMYXQgOiBudWxsO1xuICAgIGNvbnN0IGluaXRpYWxMbmcgPSAhaXNOYU4ocGFyc2VkTG5nKSA/IHBhcnNlZExuZyA6IG51bGw7XG4gICAgY29uc3QgaGFzSW5pdGlhbENvb3JkcyA9IGluaXRpYWxMYXQgIT09IG51bGwgJiYgaW5pdGlhbExuZyAhPT0gbnVsbCAmJiAoaW5pdGlhbExhdCAhPT0gMCB8fCBpbml0aWFsTG5nICE9PSAwKTtcblxuICAgIGNvbnN0IFtwb3NpdGlvbiwgc2V0UG9zaXRpb25dID0gdXNlU3RhdGUoaGFzSW5pdGlhbENvb3JkcyA/IFtpbml0aWFsTGF0LCBpbml0aWFsTG5nXSA6IG51bGwpO1xuICAgIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGUoJycpO1xuXG4gICAgY29uc3QgW2FkZHJlc3NEYXRhLCBzZXRBZGRyZXNzRGF0YV0gPSB1c2VTdGF0ZSh7XG4gICAgICAgIGFkZHJlc3NMaW5lMTogZ2V0SW5pdGlhbFZhbHVlKCdhZGRyZXNzTGluZTEnKSB8fCAnJyxcbiAgICAgICAgYWRkcmVzc0xpbmUyOiBnZXRJbml0aWFsVmFsdWUoJ2FkZHJlc3NMaW5lMicpIHx8ICcnLFxuICAgICAgICBhZGRyZXNzTGluZTM6IGdldEluaXRpYWxWYWx1ZSgnYWRkcmVzc0xpbmUzJykgfHwgJycsXG4gICAgICAgIHBpbkNvZGU6IGdldEluaXRpYWxWYWx1ZSgncGluQ29kZScpIHx8ICcnLFxuICAgICAgICBsb2NhdGlvbjogaGFzSW5pdGlhbENvb3JkcyA/IHsgdHlwZTogJ1BvaW50JywgY29vcmRpbmF0ZXM6IFtpbml0aWFsTG5nLCBpbml0aWFsTGF0XSB9IDogbnVsbFxuICAgIH0pO1xuXG4gICAgLy8gSGVscGVyIHRvIHRyaWdnZXIgQWRtaW5KUyBvbkNoYW5nZVxuICAgIC8vIFdlIHdyYXAgdGhpcyBpbiBhIGN1c3RvbWl6ZWQgaG9vayBvciBqdXN0IGNhbGwgaXQgaW4gdXNlRWZmZWN0XG4gICAgY29uc3QgdXBkYXRlUmVjb3JkID0gKGRhdGEpID0+IHtcbiAgICAgICAgLy8gU2FuaXRpemUgcGluQ29kZTogT25seSBkaWdpdHMsIG9yIG51bGxcbiAgICAgICAgbGV0IGNsZWFuUGluID0gbnVsbDtcbiAgICAgICAgaWYgKGRhdGEucGluQ29kZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RyUGluID0gU3RyaW5nKGRhdGEucGluQ29kZSkucmVwbGFjZSgvXFxEL2csICcnKTsgLy8gUmVtb3ZlIG5vbi1kaWdpdHNcbiAgICAgICAgICAgIGlmIChzdHJQaW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNsZWFuUGluID0gcGFyc2VJbnQoc3RyUGluLCAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQYXJzZSBjb29yZGluYXRlcyBhbmQgY2hlY2sgaWYgdGhleSdyZSB2YWxpZFxuICAgICAgICBjb25zdCBsbmcgPSBwYXJzZUZsb2F0KGRhdGEubG9jYXRpb24/LmNvb3JkaW5hdGVzPy5bMF0pO1xuICAgICAgICBjb25zdCBsYXQgPSBwYXJzZUZsb2F0KGRhdGEubG9jYXRpb24/LmNvb3JkaW5hdGVzPy5bMV0pO1xuICAgICAgICBjb25zdCBoYXNWYWxpZENvb3JkaW5hdGVzID0gIWlzTmFOKGxuZykgJiYgIWlzTmFOKGxhdCkgJiYgKGxuZyAhPT0gMCB8fCBsYXQgIT09IDApO1xuXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICBhZGRyZXNzTGluZTE6IGRhdGEuYWRkcmVzc0xpbmUxIHx8ICcnLFxuICAgICAgICAgICAgYWRkcmVzc0xpbmUyOiBkYXRhLmFkZHJlc3NMaW5lMiB8fCAnJyxcbiAgICAgICAgICAgIGFkZHJlc3NMaW5lMzogZGF0YS5hZGRyZXNzTGluZTMgfHwgJycsXG4gICAgICAgICAgICBwaW5Db2RlOiBjbGVhblBpbixcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBPbmx5IGluY2x1ZGUgbG9jYXRpb24gaWYgd2UgaGF2ZSB2YWxpZCBjb29yZGluYXRlc1xuICAgICAgICBpZiAoaGFzVmFsaWRDb29yZGluYXRlcykge1xuICAgICAgICAgICAgcGF5bG9hZC5sb2NhdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbbG5nLCBsYXRdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coJ1tERUJVR10gTWFwUGlja2VyIHBheWxvYWQgKE9iamVjdCk6JywgcGF5bG9hZCk7XG4gICAgICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIHBheWxvYWQpO1xuICAgIH07XG5cbiAgICAvLyBHZW5lcmljIEFkZHJlc3MgVXBkYXRlciBmcm9tIE5vbWluYXRpbSBEYXRhXG4gICAgY29uc3QgdXBkYXRlQWRkcmVzc0Zyb21Ob21pbmF0aW0gPSAoZGF0YSwgbGF0LCBsbmcpID0+IHtcbiAgICAgICAgY29uc3QgYWRkcmVzcyA9IGRhdGEuYWRkcmVzcyB8fCB7fTtcblxuICAgICAgICAvLyBDb25zdHJ1Y3QgQWRkcmVzcyBMaW5lIDEgKFNpZ25pZmljYW50IHBsYWNlIG5hbWUpXG4gICAgICAgIC8vIE9yZGVyIG9mIHByZWZlcmVuY2U6IGFtZW5pdHksIGJ1aWxkaW5nLCByb2FkLCB2aWxsYWdlLCBzdWJ1cmIsIHRvd24sIGNpdHlcbiAgICAgICAgY29uc3QgbGluZTEgPSBhZGRyZXNzLmFtZW5pdHkgfHwgYWRkcmVzcy5idWlsZGluZyB8fCBhZGRyZXNzLnJvYWQgfHwgYWRkcmVzcy52aWxsYWdlIHx8IGFkZHJlc3Muc3VidXJiIHx8IGFkZHJlc3MudG93biB8fCBhZGRyZXNzLmNpdHkgfHwgZGF0YS5kaXNwbGF5X25hbWUuc3BsaXQoJywnKVswXTtcblxuICAgICAgICAvLyBDb25zdHJ1Y3QgQWRkcmVzcyBMaW5lIDIgKERpc3RyaWN0L1N0YXRlL1JlZ2lvbilcbiAgICAgICAgY29uc3QgbGluZTIgPSBbYWRkcmVzcy5jaXR5IHx8IGFkZHJlc3MudG93biwgYWRkcmVzcy5zdGF0ZV9kaXN0cmljdCwgYWRkcmVzcy5zdGF0ZV0uZmlsdGVyKHggPT4geCkuam9pbignLCAnKTtcblxuICAgICAgICBjb25zdCBwb3N0Y29kZSA9IGFkZHJlc3MucG9zdGNvZGUgfHwgJyc7XG5cbiAgICAgICAgc2V0QWRkcmVzc0RhdGEocHJldiA9PiAoe1xuICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgIGFkZHJlc3NMaW5lMTogbGluZTEgfHwgJycsXG4gICAgICAgICAgICBhZGRyZXNzTGluZTI6IGxpbmUyIHx8ICcnLFxuICAgICAgICAgICAgYWRkcmVzc0xpbmUzOiBwcmV2LmFkZHJlc3NMaW5lMyB8fCAnJyxcbiAgICAgICAgICAgIHBpbkNvZGU6IHBvc3Rjb2RlLFxuICAgICAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbbG5nLCBsYXRdXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIFJldmVyc2UgR2VvY29kaW5nIHZpYSBOb21pbmF0aW1cbiAgICBjb25zdCByZXZlcnNlR2VvY29kZSA9IGFzeW5jIChsYXQsIGxuZykgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvcmV2ZXJzZT9mb3JtYXQ9anNvbiZsYXQ9JHtsYXR9Jmxvbj0ke2xuZ30mYWRkcmVzc2RldGFpbHM9MSZhY2NlcHQtbGFuZ3VhZ2U9ZW5gLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnVXNlci1BZ2VudCc6ICdSZWxpZWZGbG93QWRtaW4vMS4wJyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmFkZHJlc3MpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVBZGRyZXNzRnJvbU5vbWluYXRpbShkYXRhLCBsYXQsIGxuZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXZlcnNlIGdlb2NvZGluZyBmYWlsZWRcIiwgZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gTG9hZCBMZWFmbGV0IGZyb20gQ0ROXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgbG9hZExlYWZsZXQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAod2luZG93LkwpIHJldHVybiB3aW5kb3cuTDtcblxuICAgICAgICAgICAgLy8gTG9hZCBDU1NcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlYWZsZXQtY3NzJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICAgICAgICAgIGxpbmsuaWQgPSAnbGVhZmxldC1jc3MnO1xuICAgICAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICAgICAgICAgIGxpbmsuaHJlZiA9ICdodHRwczovL3VucGtnLmNvbS9sZWFmbGV0QDEuOS40L2Rpc3QvbGVhZmxldC5jc3MnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExvYWQgSlNcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlYWZsZXQtanMnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5pZCA9ICdsZWFmbGV0LWpzJztcbiAgICAgICAgICAgICAgICBzY3JpcHQuc3JjID0gJ2h0dHBzOi8vdW5wa2cuY29tL2xlYWZsZXRAMS45LjQvZGlzdC9sZWFmbGV0LmpzJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7IHNjcmlwdC5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKHdpbmRvdy5MKTsgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFdhaXQgZm9yIGl0IHRvIGJlIHJlYWR5XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5MKSB7IGNsZWFySW50ZXJ2YWwoY2hlY2spOyByZXNvbHZlKHdpbmRvdy5MKTsgfVxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGxvYWRMZWFmbGV0KCkudGhlbigoTCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFtYXBJbnN0YW5jZVJlZi5jdXJyZW50ICYmIG1hcENvbnRhaW5lclJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VudGVyID0gcG9zaXRpb24gfHwgWzEwLjg1MDUsIDc2LjI3MTFdOyAvLyBEZWZhdWx0IEtlcmFsYVxuICAgICAgICAgICAgICAgIGNvbnN0IG1hcCA9IEwubWFwKG1hcENvbnRhaW5lclJlZi5jdXJyZW50KS5zZXRWaWV3KGNlbnRlciwgcG9zaXRpb24gPyAxNSA6IDcpO1xuXG4gICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nJywge1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ8KpIE9wZW5TdHJlZXRNYXAgY29udHJpYnV0b3JzJ1xuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG1hcCk7XG5cbiAgICAgICAgICAgICAgICAvLyBDbGljayBldmVudFxuICAgICAgICAgICAgICAgIG1hcC5vbignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGxhdCwgbG5nIH0gPSBlLmxhdGxuZztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UG9zID0gW2xhdCwgbG5nXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobWFya2VyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlclJlZi5jdXJyZW50LnNldExhdExuZyhuZXdQb3MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyUmVmLmN1cnJlbnQgPSBMLm1hcmtlcihuZXdQb3MpLmFkZFRvKG1hcCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBzZXRQb3NpdGlvbihuZXdQb3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgUmV2ZXJzZSBHZW9jb2RpbmdcbiAgICAgICAgICAgICAgICAgICAgcmV2ZXJzZUdlb2NvZGUobGF0LCBsbmcpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIE9wdGltaXN0aWMgdXBkYXRlIG9mIGNvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgICAgIHNldEFkZHJlc3NEYXRhKHByZXYgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFtsbmcsIGxhdF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbWFwSW5zdGFuY2VSZWYuY3VycmVudCA9IG1hcDtcblxuICAgICAgICAgICAgICAgIC8vIEluaXRpYWwgbWFya2VyXG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlclJlZi5jdXJyZW50ID0gTC5tYXJrZXIocG9zaXRpb24pLmFkZFRvKG1hcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDbGVhbnVwXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAobWFwSW5zdGFuY2VSZWYuY3VycmVudCkge1xuICAgICAgICAgICAgICAgIC8vIG1hcEluc3RhbmNlUmVmLmN1cnJlbnQucmVtb3ZlKCk7IC8vIFJlbW92aW5nIG1pZ2h0IGJlIGFnZ3Jlc3NpdmUgaWYgY29tcG9uZW50IHJlbW91bnRzXG4gICAgICAgICAgICAgICAgLy8gbWFwSW5zdGFuY2VSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSwgW10pOyAvLyBFbXB0eSBkZXBzLCBydW4gb25jZSBvbiBtb3VudFxuXG4gICAgLy8gVHJhY2sgaWYgdGhpcyBpcyB0aGUgaW5pdGlhbCBtb3VudCB0byBhdm9pZCBpbW1lZGlhdGUgc3luY1xuICAgIGNvbnN0IGlzSW5pdGlhbE1vdW50ID0gdXNlUmVmKHRydWUpO1xuXG4gICAgLy8gU3luYyBzdGF0ZSBjaGFuZ2VzIHRvIEFkbWluSlNcbiAgICAvLyBUaGlzIGlzIHRoZSBPTkxZIHBsYWNlIHdoZXJlIHdlIG5vdGlmeSBBZG1pbkpTIG9mIGNoYW5nZXNcbiAgICAvLyBTa2lwIHRoZSBmaXJzdCByZW5kZXIgdG8gYXZvaWQgc2VuZGluZyBwb3RlbnRpYWxseSBpbnZhbGlkIGluaXRpYWwgZGF0YVxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChpc0luaXRpYWxNb3VudC5jdXJyZW50KSB7XG4gICAgICAgICAgICBpc0luaXRpYWxNb3VudC5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlUmVjb3JkKGFkZHJlc3NEYXRhKTtcbiAgICB9LCBbYWRkcmVzc0RhdGFdKTtcblxuXG4gICAgLy8gSGFuZGxlIFNlYXJjaFxuICAgIGNvbnN0IGhhbmRsZVNlYXJjaCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCFzZWFyY2hRdWVyeSB8fCAhd2luZG93LkwgfHwgIW1hcEluc3RhbmNlUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnL3NlYXJjaD9mb3JtYXQ9anNvbiZxPSR7c2VhcmNoUXVlcnl9JmxpbWl0PTEmYWRkcmVzc2RldGFpbHM9MSZhY2NlcHQtbGFuZ3VhZ2U9ZW5gLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnVXNlci1BZ2VudCc6ICdSZWxpZWZGbG93QWRtaW4vMS4wJyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGxhdCwgbG9uIH0gPSBkYXRhWzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BvcyA9IFtwYXJzZUZsb2F0KGxhdCksIHBhcnNlRmxvYXQobG9uKV07XG5cbiAgICAgICAgICAgICAgICBjb25zdCBMID0gd2luZG93Lkw7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFwID0gbWFwSW5zdGFuY2VSZWYuY3VycmVudDtcbiAgICAgICAgICAgICAgICBtYXAuc2V0VmlldyhuZXdQb3MsIDE1KTtcblxuICAgICAgICAgICAgICAgIGlmIChtYXJrZXJSZWYuY3VycmVudCkge1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXJSZWYuY3VycmVudC5zZXRMYXRMbmcobmV3UG9zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXJSZWYuY3VycmVudCA9IEwubWFya2VyKG5ld1BvcykuYWRkVG8obWFwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZXRQb3NpdGlvbihuZXdQb3MpO1xuICAgICAgICAgICAgICAgIC8vIFVzZSB0aGUgZGV0YWlsZWQgYWRkcmVzcyBmcm9tIHNlYXJjaCByZXN1bHRcbiAgICAgICAgICAgICAgICB1cGRhdGVBZGRyZXNzRnJvbU5vbWluYXRpbShkYXRhWzBdLCBwYXJzZUZsb2F0KGxhdCksIHBhcnNlRmxvYXQobG9uKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTZWFyY2ggZmFpbGVkXCIsIGUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIERlYnVnOiBMb2cgZXJyb3JzIGFuZCBmdWxsIHJlY29yZCBzdHJ1Y3R1cmUgb24gZXZlcnkgcmVuZGVyXG4gICAgLy8gTm90ZTogVGhlIGVycm9yIGBjb29yZGluYXRlcy4wYCBvZnRlbiBjb21lcyBmcm9tIHRvcC1sZXZlbCBgbG9jYXRpb25gIGZpZWxkLCBub3QgZnJvbSBhZGRyZXNzXG4gICAgaWYgKHJlY29yZD8uZXJyb3JzICYmIE9iamVjdC5rZXlzKHJlY29yZC5lcnJvcnMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgZXJyb3IgaXMgc3BlY2lmaWNhbGx5IGZvciBvdXIgcHJvcGVydHkgKGFkZHJlc3MpXG4gICAgICAgIGNvbnN0IHJlbGV2YW50RXJyb3JzID0gT2JqZWN0LmVudHJpZXMocmVjb3JkLmVycm9ycylcbiAgICAgICAgICAgIC5maWx0ZXIoKFtrZXldKSA9PiBrZXkuc3RhcnRzV2l0aChwcm9wZXJ0eS5uYW1lKSB8fCBrZXkuc3RhcnRzV2l0aChgJHtwcm9wZXJ0eS5uYW1lfS5gKSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgW2ssIHZdKSA9PiAoeyAuLi5hY2MsIFtrXTogdiB9KSwge30pO1xuXG4gICAgICAgIC8vIE9ubHkgbG9nIGlmIHRoZXJlIGFyZSBlcnJvcnMgZm9yIG91ciBzcGVjaWZpYyBwcm9wZXJ0eVxuICAgICAgICBpZiAoT2JqZWN0LmtleXMocmVsZXZhbnRFcnJvcnMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbREVCVUddIEVycm9ycyBmb3InLCBwcm9wZXJ0eS5uYW1lLCAnOicsIEpTT04uc3RyaW5naWZ5KHJlbGV2YW50RXJyb3JzLCBudWxsLCAyKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgYGNvb3JkaW5hdGVzLjBgIGVycm9yIHdpdGhvdXQgcHJlZml4IGlzIGZyb20gdG9wLWxldmVsIGBsb2NhdGlvbmAgZmllbGQsXG4gICAgICAgIC8vIG5vdCBmcm9tIGBhZGRyZXNzLmxvY2F0aW9uYCAtIGl0J3MgYSBzZXBhcmF0ZSBmaWVsZCBpbiB0aGUgc2NoZW1hXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEJveCBtYj1cInhsXCI+XG4gICAgICAgICAgICA8TGFiZWw+TG9jYXRpb24gU2VhcmNoPC9MYWJlbD5cbiAgICAgICAgICAgIDxCb3ggZmxleCBmbGV4RGlyZWN0aW9uPVwicm93XCIgbWI9XCJkZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2hRdWVyeX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWFyY2hRdWVyeShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGZvciBhIHBsYWNlIChlLmcuIE1hdmVsaWtrYXJhKVwiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGZsZXhHcm93OiAxLCBtYXJnaW5SaWdodDogJzEwcHgnIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e2hhbmRsZVNlYXJjaH0gdHlwZT1cImJ1dHRvblwiPlNlYXJjaDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICAgIDxCb3ggaGVpZ2h0PVwiNDAwcHhcIiBtYj1cImRlZmF1bHRcIiBib3JkZXI9XCJkZWZhdWx0XCIgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScsIHpJbmRleDogMCB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj17bWFwQ29udGFpbmVyUmVmfSBzdHlsZT17eyBoZWlnaHQ6ICcxMDAlJywgd2lkdGg6ICcxMDAlJyB9fSAvPlxuICAgICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgPExhYmVsPlNoZWx0ZXIgQWRkcmVzcyBMaW5lIDE8L0xhYmVsPlxuICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YWRkcmVzc0RhdGEuYWRkcmVzc0xpbmUxfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEFkZHJlc3NEYXRhKHByZXYgPT4gKHsgLi4ucHJldiwgYWRkcmVzc0xpbmUxOiBlLnRhcmdldC52YWx1ZSB9KSl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuXG4gICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgIDxMYWJlbD5TaGVsdGVyIEFkZHJlc3MgTGluZSAyPC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FkZHJlc3NEYXRhLmFkZHJlc3NMaW5lMn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRBZGRyZXNzRGF0YShwcmV2ID0+ICh7IC4uLnByZXYsIGFkZHJlc3NMaW5lMjogZS50YXJnZXQudmFsdWUgfSkpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICA8TGFiZWw+U2hlbHRlciBBZGRyZXNzIExpbmUgMzwvTGFiZWw+XG4gICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXthZGRyZXNzRGF0YS5hZGRyZXNzTGluZTN9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QWRkcmVzc0RhdGEocHJldiA9PiAoeyAuLi5wcmV2LCBhZGRyZXNzTGluZTM6IGUudGFyZ2V0LnZhbHVlIH0pKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgPExhYmVsPlBpbiBDb2RlPC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FkZHJlc3NEYXRhLnBpbkNvZGV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QWRkcmVzc0RhdGEocHJldiA9PiAoeyAuLi5wcmV2LCBwaW5Db2RlOiBlLnRhcmdldC52YWx1ZSB9KSl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuXG4gICAgICAgICAgICA8Qm94PlxuICAgICAgICAgICAgICAgIDxMYWJlbD5Db29yZGluYXRlczwvTGFiZWw+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzAuOGVtJywgY29sb3I6ICcjODg4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgTGF0OiB7YWRkcmVzc0RhdGEubG9jYXRpb24/LmNvb3JkaW5hdGVzPy5bMV0gfHwgMH0sXG4gICAgICAgICAgICAgICAgICAgIExuZzoge2FkZHJlc3NEYXRhLmxvY2F0aW9uPy5jb29yZGluYXRlcz8uWzBdIHx8IDB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hcFBpY2tlcjtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIExhYmVsIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbmNvbnN0IE1hcFNob3cgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IHJlY29yZCwgcHJvcGVydHkgfSA9IHByb3BzO1xuICAgIGNvbnN0IG1hcENvbnRhaW5lclJlZiA9IHVzZVJlZihudWxsKTtcbiAgICBjb25zdCBtYXBJbnN0YW5jZVJlZiA9IHVzZVJlZihudWxsKTtcbiAgICBjb25zdCBtYXJrZXJSZWYgPSB1c2VSZWYobnVsbCk7XG5cbiAgICAvLyBJbml0aWFsIFZhbHVlc1xuICAgIC8vIEFkbWluSlMgZmxhdHRlbnMgbmVzdGVkIG9iamVjdHMgaW4gcGFyYW1zLCBlLmcuICdsb2NhdGlvbi5jb29yZGluYXRlcy4wJ1xuICAgIGNvbnN0IGdldEluaXRpYWxWYWx1ZSA9IChwYXRoKSA9PiByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9LiR7cGF0aH1gXTtcblxuICAgIC8vIE5vdGU6IEdlb0pTT04gc3RvcmVzIFtsbmcsIGxhdF0sIGJ1dCBMZWFmbGV0IHVzZXMgW2xhdCwgbG5nXVxuICAgIGNvbnN0IGluaXRpYWxMbmcgPSBwYXJzZUZsb2F0KGdldEluaXRpYWxWYWx1ZSgnY29vcmRpbmF0ZXMuMCcpKTtcbiAgICBjb25zdCBpbml0aWFsTGF0ID0gcGFyc2VGbG9hdChnZXRJbml0aWFsVmFsdWUoJ2Nvb3JkaW5hdGVzLjEnKSk7XG5cbiAgICBjb25zdCBoYXNMb2NhdGlvbiA9ICFpc05hTihpbml0aWFsTGF0KSAmJiAhaXNOYU4oaW5pdGlhbExuZyk7XG4gICAgY29uc3QgcG9zaXRpb24gPSBoYXNMb2NhdGlvbiA/IFtpbml0aWFsTGF0LCBpbml0aWFsTG5nXSA6IG51bGw7XG5cbiAgICAvLyBMb2FkIExlYWZsZXQgZnJvbSBDRE5zXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgbG9hZExlYWZsZXQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAod2luZG93LkwpIHJldHVybiB3aW5kb3cuTDtcblxuICAgICAgICAgICAgLy8gTG9hZCBDU1NcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlYWZsZXQtY3NzJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICAgICAgICAgIGxpbmsuaWQgPSAnbGVhZmxldC1jc3MnO1xuICAgICAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICAgICAgICAgIGxpbmsuaHJlZiA9ICdodHRwczovL3VucGtnLmNvbS9sZWFmbGV0QDEuOS40L2Rpc3QvbGVhZmxldC5jc3MnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExvYWQgSlNcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlYWZsZXQtanMnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5pZCA9ICdsZWFmbGV0LWpzJztcbiAgICAgICAgICAgICAgICBzY3JpcHQuc3JjID0gJ2h0dHBzOi8vdW5wa2cuY29tL2xlYWZsZXRAMS45LjQvZGlzdC9sZWFmbGV0LmpzJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7IHNjcmlwdC5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKHdpbmRvdy5MKTsgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFdhaXQgZm9yIGl0IHRvIGJlIHJlYWR5XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5MKSB7IGNsZWFySW50ZXJ2YWwoY2hlY2spOyByZXNvbHZlKHdpbmRvdy5MKTsgfVxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChoYXNMb2NhdGlvbikge1xuICAgICAgICAgICAgbG9hZExlYWZsZXQoKS50aGVuKChMKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFtYXBJbnN0YW5jZVJlZi5jdXJyZW50ICYmIG1hcENvbnRhaW5lclJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbnRlciA9IHBvc2l0aW9uIHx8IFsxMC44NTA1LCA3Ni4yNzExXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFwID0gTC5tYXAobWFwQ29udGFpbmVyUmVmLmN1cnJlbnQpLnNldFZpZXcoY2VudGVyLCAxNSk7XG5cbiAgICAgICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICfCqSBPcGVuU3RyZWV0TWFwIGNvbnRyaWJ1dG9ycydcbiAgICAgICAgICAgICAgICAgICAgfSkuYWRkVG8obWFwKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJbml0aWFsIG1hcmtlclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlclJlZi5jdXJyZW50ID0gTC5tYXJrZXIocG9zaXRpb24pLmFkZFRvKG1hcCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBEaXNhYmxlIGludGVyYWN0aW9ucyBmb3IgcmVhZC1vbmx5IHZpZXdcbiAgICAgICAgICAgICAgICAgICAgbWFwLmRyYWdnaW5nLmRpc2FibGUoKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwLnRvdWNoWm9vbS5kaXNhYmxlKCk7XG4gICAgICAgICAgICAgICAgICAgIG1hcC5kb3VibGVDbGlja1pvb20uZGlzYWJsZSgpO1xuICAgICAgICAgICAgICAgICAgICBtYXAuc2Nyb2xsV2hlZWxab29tLmRpc2FibGUoKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwLmJveFpvb20uZGlzYWJsZSgpO1xuICAgICAgICAgICAgICAgICAgICBtYXAua2V5Ym9hcmQuZGlzYWJsZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWFwLnRhcCkgbWFwLnRhcC5kaXNhYmxlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbWFwSW5zdGFuY2VSZWYuY3VycmVudCA9IG1hcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENsZWFudXBcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIC8vIFdlIGdlbmVyYWxseSBkZXBlbmQgb24gdGhlIGNvbXBvbmVudCB1bm1vdW50aW5nIHRvIGNsZWFuIERPTSByZWZzLCBcbiAgICAgICAgICAgIC8vIGJ1dCBMZWFmbGV0IGluc3RhbmNlcyBtaWdodCBuZWVkIG1hbnVhbCBjbGVhbnVwIGlmIHdlIHdlcmUgcmUtbW91bnRpbmcgaGVhdmlseS5cbiAgICAgICAgICAgIC8vIEZvciBzaW1wbGUgc2hvdyB2aWV3cywgdGhpcyBpcyB1c3VhbGx5IGZpbmUuXG4gICAgICAgIH07XG4gICAgfSwgW2hhc0xvY2F0aW9uXSk7XG5cbiAgICBpZiAoIWhhc0xvY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Qm94IG1iPVwieGxcIj5cbiAgICAgICAgICAgICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XG4gICAgICAgICAgICAgICAgPEJveD5ObyBsb2NhdGlvbiBkYXRhIGF2YWlsYWJsZTwvQm94PlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEJveCBtYj1cInhsXCI+XG4gICAgICAgICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XG4gICAgICAgICAgICA8Qm94IGhlaWdodD1cIjQwMHB4XCIgbWI9XCJkZWZhdWx0XCIgYm9yZGVyPVwiZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPXttYXBDb250YWluZXJSZWZ9IHN0eWxlPXt7IGhlaWdodDogJzEwMCUnLCB3aWR0aDogJzEwMCUnIH19IC8+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDxCb3g+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzAuOGVtJywgY29sb3I6ICcjODg4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgTGF0OiB7aW5pdGlhbExhdH0sIExuZzoge2luaXRpYWxMbmd9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hcFNob3c7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIExhYmVsLCBUZXh0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbi8qKlxuICogVGFza0xvY2F0aW9uU2hvdyAtIEEgY29tcG9uZW50IGZvciBkaXNwbGF5aW5nIHBpY2t1cC9kZWxpdmVyeSBsb2NhdGlvbnMgaW4gVGFzayB2aWV3c1xuICogU2hvd3MgZm9ybWF0dGVkIGFkZHJlc3Mgd2l0aCBhIHNtYWxsIG1hcCBwcmV2aWV3IGFuZCBhIFwiR2V0IERpcmVjdGlvbnNcIiBsaW5rXG4gKi9cbmNvbnN0IFRhc2tMb2NhdGlvblNob3cgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IHJlY29yZCwgcHJvcGVydHkgfSA9IHByb3BzO1xuICAgIGNvbnN0IG1hcENvbnRhaW5lclJlZiA9IHVzZVJlZihudWxsKTtcbiAgICBjb25zdCBtYXBJbnN0YW5jZVJlZiA9IHVzZVJlZihudWxsKTtcblxuICAgIC8vIERldGVybWluZSB3aGljaCBsb2NhdGlvbiB0eXBlIHdlJ3JlIHNob3dpbmcgYmFzZWQgb24gcHJvcGVydHkgbmFtZVxuICAgIGNvbnN0IGlzUGlja3VwID0gcHJvcGVydHkubmFtZS5pbmNsdWRlcygncGlja3VwJykgfHwgcHJvcGVydHkubmFtZSA9PT0gJ3BpY2t1cExvY2F0aW9uJztcbiAgICBjb25zdCBpc0RlbGl2ZXJ5ID0gcHJvcGVydHkubmFtZS5pbmNsdWRlcygnZGVsaXZlcnknKSB8fCBwcm9wZXJ0eS5uYW1lID09PSAnZGVsaXZlcnlMb2NhdGlvbic7XG4gICAgY29uc3QgaXNMZWdhY3kgPSBwcm9wZXJ0eS5uYW1lID09PSAnbG9jYXRpb24nO1xuXG4gICAgLy8gR2V0IHRoZSBhcHByb3ByaWF0ZSBwcmVmaXggZm9yIG5lc3RlZCBmaWVsZHNcbiAgICBjb25zdCBsb2NhdGlvblByZWZpeCA9IHByb3BlcnR5Lm5hbWU7XG4gICAgY29uc3QgYWRkcmVzc1ByZWZpeCA9IGlzUGlja3VwID8gJ3BpY2t1cEFkZHJlc3MnIDogaXNEZWxpdmVyeSA/ICdkZWxpdmVyeUFkZHJlc3MnIDogJ2FkZHJlc3MnO1xuXG4gICAgLy8gRXh0cmFjdCBjb29yZGluYXRlcyBmcm9tIGZsYXR0ZW5lZCBBZG1pbkpTIHBhcmFtc1xuICAgIGNvbnN0IHBhcnNlZExuZyA9IHBhcnNlRmxvYXQocmVjb3JkLnBhcmFtc1tgJHtsb2NhdGlvblByZWZpeH0uY29vcmRpbmF0ZXMuMGBdKTtcbiAgICBjb25zdCBwYXJzZWRMYXQgPSBwYXJzZUZsb2F0KHJlY29yZC5wYXJhbXNbYCR7bG9jYXRpb25QcmVmaXh9LmNvb3JkaW5hdGVzLjFgXSk7XG4gICAgY29uc3QgbG5nID0gIWlzTmFOKHBhcnNlZExuZykgPyBwYXJzZWRMbmcgOiAwO1xuICAgIGNvbnN0IGxhdCA9ICFpc05hTihwYXJzZWRMYXQpID8gcGFyc2VkTGF0IDogMDtcbiAgICBjb25zdCBoYXNDb29yZGluYXRlcyA9ICFpc05hTihwYXJzZWRMYXQpICYmICFpc05hTihwYXJzZWRMbmcpICYmIChsYXQgIT09IDAgfHwgbG5nICE9PSAwKTtcblxuICAgIC8vIEV4dHJhY3QgYWRkcmVzcyBmaWVsZHNcbiAgICBjb25zdCBhZGRyZXNzTGluZTEgPSByZWNvcmQucGFyYW1zW2Ake2FkZHJlc3NQcmVmaXh9LmFkZHJlc3NMaW5lMWBdIHx8ICcnO1xuICAgIGNvbnN0IGFkZHJlc3NMaW5lMiA9IHJlY29yZC5wYXJhbXNbYCR7YWRkcmVzc1ByZWZpeH0uYWRkcmVzc0xpbmUyYF0gfHwgJyc7XG4gICAgY29uc3QgYWRkcmVzc0xpbmUzID0gcmVjb3JkLnBhcmFtc1tgJHthZGRyZXNzUHJlZml4fS5hZGRyZXNzTGluZTNgXSB8fCAnJztcbiAgICBjb25zdCBwaW5Db2RlID0gcmVjb3JkLnBhcmFtc1tgJHthZGRyZXNzUHJlZml4fS5waW5Db2RlYF0gfHwgJyc7XG5cbiAgICAvLyBCdWlsZCBmb3JtYXR0ZWQgYWRkcmVzcyBwYXJ0c1xuICAgIGNvbnN0IGFkZHJlc3NQYXJ0cyA9IFthZGRyZXNzTGluZTEsIGFkZHJlc3NMaW5lMiwgYWRkcmVzc0xpbmUzXS5maWx0ZXIobGluZSA9PiBsaW5lICYmIGxpbmUudHJpbSgpICE9PSAnJyk7XG4gICAgY29uc3QgZm9ybWF0dGVkQWRkcmVzcyA9IGFkZHJlc3NQYXJ0cy5qb2luKCcsICcpICsgKHBpbkNvZGUgPyBgIC0gJHtwaW5Db2RlfWAgOiAnJyk7XG5cbiAgICAvLyBHb29nbGUgTWFwcyBkaXJlY3Rpb25zIFVSTFxuICAgIGNvbnN0IG1hcHNVcmwgPSBoYXNDb29yZGluYXRlc1xuICAgICAgICA/IGBodHRwczovL3d3dy5nb29nbGUuY29tL21hcHMvZGlyLz9hcGk9MSZkZXN0aW5hdGlvbj0ke2xhdH0sJHtsbmd9YFxuICAgICAgICA6IGZvcm1hdHRlZEFkZHJlc3MgXG4gICAgICAgICAgICA/IGBodHRwczovL3d3dy5nb29nbGUuY29tL21hcHMvc2VhcmNoLz9hcGk9MSZxdWVyeT0ke2VuY29kZVVSSUNvbXBvbmVudChmb3JtYXR0ZWRBZGRyZXNzKX1gXG4gICAgICAgICAgICA6IG51bGw7XG5cbiAgICAvLyBEZXRlcm1pbmUgbGFiZWwgYW5kIGljb24gYmFzZWQgb24gbG9jYXRpb24gdHlwZVxuICAgIGNvbnN0IGdldExhYmVsID0gKCkgPT4ge1xuICAgICAgICBpZiAoaXNQaWNrdXApIHJldHVybiAnUGlja3VwIExvY2F0aW9uJztcbiAgICAgICAgaWYgKGlzRGVsaXZlcnkpIHJldHVybiAnRGVsaXZlcnkgTG9jYXRpb24nO1xuICAgICAgICByZXR1cm4gcHJvcGVydHkubGFiZWwgfHwgJ0xvY2F0aW9uJztcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0SWNvbiA9ICgpID0+IHtcbiAgICAgICAgaWYgKGlzUGlja3VwKSByZXR1cm4gJ/Cfk6YnO1xuICAgICAgICBpZiAoaXNEZWxpdmVyeSkgcmV0dXJuICfwn4+gJztcbiAgICAgICAgcmV0dXJuICfwn5ONJztcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0Q29sb3IgPSAoKSA9PiB7XG4gICAgICAgIGlmIChpc1BpY2t1cCkgcmV0dXJuIHsgYmc6ICcjZmZmM2NkJywgYm9yZGVyOiAnI2ZmYzEwNycsIGFjY2VudDogJyM4NTY0MDQnIH07XG4gICAgICAgIGlmIChpc0RlbGl2ZXJ5KSByZXR1cm4geyBiZzogJyNkNGVkZGEnLCBib3JkZXI6ICcjMjhhNzQ1JywgYWNjZW50OiAnIzE1NTcyNCcgfTtcbiAgICAgICAgcmV0dXJuIHsgYmc6ICcjZjhmOWZhJywgYm9yZGVyOiAnI2RlZTJlNicsIGFjY2VudDogJyM0OTUwNTcnIH07XG4gICAgfTtcblxuICAgIGNvbnN0IGNvbG9ycyA9IGdldENvbG9yKCk7XG5cbiAgICAvLyBMb2FkIExlYWZsZXQgYW5kIGRpc3BsYXkgbWFwXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKCFoYXNDb29yZGluYXRlcykgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGxvYWRMZWFmbGV0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5MKSByZXR1cm4gd2luZG93Lkw7XG5cbiAgICAgICAgICAgIC8vIExvYWQgQ1NTXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWFmbGV0LWNzcycpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgICAgICAgICAgICBsaW5rLmlkID0gJ2xlYWZsZXQtY3NzJztcbiAgICAgICAgICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAgICAgICAgICAgICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldEAxLjkuNC9kaXN0L2xlYWZsZXQuY3NzJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBMb2FkIEpTXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWFmbGV0LWpzJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQuaWQgPSAnbGVhZmxldC1qcyc7XG4gICAgICAgICAgICAgICAgc2NyaXB0LnNyYyA9ICdodHRwczovL3VucGtnLmNvbS9sZWFmbGV0QDEuOS40L2Rpc3QvbGVhZmxldC5qcyc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4gcmVzb2x2ZSh3aW5kb3cuTCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVjayA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuTCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY2hlY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUod2luZG93LkwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGxvYWRMZWFmbGV0KCkudGhlbigoTCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFtYXBJbnN0YW5jZVJlZi5jdXJyZW50ICYmIG1hcENvbnRhaW5lclJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFwID0gTC5tYXAobWFwQ29udGFpbmVyUmVmLmN1cnJlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgem9vbUNvbnRyb2w6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFdoZWVsWm9vbTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGRvdWJsZUNsaWNrWm9vbTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoWm9vbTogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSkuc2V0VmlldyhbbGF0LCBsbmddLCAxNSk7XG5cbiAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnwqkgT1NNJ1xuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG1hcCk7XG5cbiAgICAgICAgICAgICAgICBMLm1hcmtlcihbbGF0LCBsbmddKS5hZGRUbyhtYXApO1xuXG4gICAgICAgICAgICAgICAgbWFwSW5zdGFuY2VSZWYuY3VycmVudCA9IG1hcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmIChtYXBJbnN0YW5jZVJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgbWFwSW5zdGFuY2VSZWYuY3VycmVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBtYXBJbnN0YW5jZVJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LCBbbGF0LCBsbmcsIGhhc0Nvb3JkaW5hdGVzXSk7XG5cbiAgICAvLyBJZiBubyBsb2NhdGlvbiBkYXRhIGF0IGFsbFxuICAgIGlmICghaGFzQ29vcmRpbmF0ZXMgJiYgIWFkZHJlc3NMaW5lMSAmJiAhYWRkcmVzc0xpbmUyICYmICFhZGRyZXNzTGluZTMgJiYgIXBpbkNvZGUpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxCb3ggbWI9XCJsZ1wiPlxuICAgICAgICAgICAgICAgIDxMYWJlbD57Z2V0TGFiZWwoKX08L0xhYmVsPlxuICAgICAgICAgICAgICAgIDxUZXh0IHZhcmlhbnQ9XCJzbVwiIGNvbG9yPVwiZ3JleTYwXCI+Tm8gbG9jYXRpb24gZGF0YSBhdmFpbGFibGU8L1RleHQ+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8Qm94IG1iPVwibGdcIj5cbiAgICAgICAgICAgIDxMYWJlbCBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc4cHgnLCBmb250V2VpZ2h0OiA2MDAgfX0+XG4gICAgICAgICAgICAgICAge2dldExhYmVsKCl9XG4gICAgICAgICAgICA8L0xhYmVsPlxuXG4gICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICR7Y29sb3JzLmJnfSAwJSwgI2ZmZmZmZiAxMDAlKWAsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTZweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogYDJweCBzb2xpZCAke2NvbG9ycy5ib3JkZXJ9YCxcbiAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAycHggOHB4IHJnYmEoMCwwLDAsMC4wNSknLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgey8qIEFkZHJlc3MgVGV4dCAqL31cbiAgICAgICAgICAgICAgICB7KGFkZHJlc3NMaW5lMSB8fCBhZGRyZXNzTGluZTIgfHwgYWRkcmVzc0xpbmUzIHx8IHBpbkNvZGUpICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEJveCBtYj1cImRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb3ggZmxleCBmbGV4RGlyZWN0aW9uPVwicm93XCIgYWxpZ25JdGVtcz1cImZsZXgtc3RhcnRcIiBzdHlsZT17eyBnYXA6ICc4cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMjBweCcgfX0+e2dldEljb24oKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJveD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2FkZHJlc3NMaW5lMSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250V2VpZ2h0OiA1MDAsIGZvbnRTaXplOiAnMTRweCcsIGNvbG9yOiAnIzIxMjUyOScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2FkZHJlc3NMaW5lMX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2FkZHJlc3NMaW5lMiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzEzcHgnLCBjb2xvcjogJyM0OTUwNTcnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthZGRyZXNzTGluZTJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthZGRyZXNzTGluZTMgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxM3B4JywgY29sb3I6ICcjNmM3NTdkJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YWRkcmVzc0xpbmUzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGluQ29kZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzEzcHgnLCBjb2xvcjogJyM2Yzc1N2QnLCBtYXJnaW5Ub3A6ICc0cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBJTjoge3BpbkNvZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIHsvKiBNYXAgUHJldmlldyAqL31cbiAgICAgICAgICAgICAgICB7aGFzQ29vcmRpbmF0ZXMgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzE4MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICcxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHtjb2xvcnMuYm9yZGVyfWAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj17bWFwQ29udGFpbmVyUmVmfSBzdHlsZT17eyBoZWlnaHQ6ICcxMDAlJywgd2lkdGg6ICcxMDAlJyB9fSAvPlxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgey8qIEFjdGlvbnMgUm93ICovfVxuICAgICAgICAgICAgICAgIDxCb3ggZmxleCBmbGV4RGlyZWN0aW9uPVwicm93XCIgYWxpZ25JdGVtcz1cImNlbnRlclwiIHN0eWxlPXt7IGdhcDogJzEycHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAgICAgICAgICB7bWFwc1VybCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9e21hcHNVcmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiAnNnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzhweCAxNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzQyODVmNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzEzcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA1MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICdiYWNrZ3JvdW5kLWNvbG9yIDAuMnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZU92ZXI9eyhlKSA9PiBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMzMzY3ZDYnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VPdXQ9eyhlKSA9PiBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyM0Mjg1ZjQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIPCfp60gR2V0IERpcmVjdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICB7aGFzQ29vcmRpbmF0ZXMgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6ICc2cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDEycHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjhmOWZhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNkZWUyZTYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JyB9fT7wn4yQPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzEycHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNmM3NTdkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhdC50b0ZpeGVkKDUpfSwge2xuZy50b0ZpeGVkKDUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvQm94PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUYXNrTG9jYXRpb25TaG93O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJhZGdlIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbi8qKlxuICogVGFza0xvY2F0aW9uTGluayAtIEEgY29tcGFjdCBjb21wb25lbnQgZm9yIGRpc3BsYXlpbmcgbG9jYXRpb24gbGlua3MgaW4gVGFzayBsaXN0IHZpZXdzXG4gKiBTaG93cyBhcHByb3ByaWF0ZSBpY29ucyBhbmQgbGlua3MgdG8gR29vZ2xlIE1hcHMgYmFzZWQgb24gdGhlIGxvY2F0aW9uIHR5cGVcbiAqL1xuY29uc3QgVGFza0xvY2F0aW9uTGluayA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgcmVjb3JkLCBwcm9wZXJ0eSB9ID0gcHJvcHM7XG5cbiAgICAvLyBEZXRlcm1pbmUgd2hpY2ggbG9jYXRpb24gdHlwZSB3ZSdyZSBzaG93aW5nIGJhc2VkIG9uIHByb3BlcnR5IG5hbWVcbiAgICBjb25zdCBpc1BpY2t1cCA9IHByb3BlcnR5Lm5hbWUuaW5jbHVkZXMoJ3BpY2t1cCcpIHx8IHByb3BlcnR5Lm5hbWUgPT09ICdwaWNrdXBMb2NhdGlvbic7XG4gICAgY29uc3QgaXNEZWxpdmVyeSA9IHByb3BlcnR5Lm5hbWUuaW5jbHVkZXMoJ2RlbGl2ZXJ5JykgfHwgcHJvcGVydHkubmFtZSA9PT0gJ2RlbGl2ZXJ5TG9jYXRpb24nO1xuXG4gICAgLy8gR2V0IHRoZSBhcHByb3ByaWF0ZSBwcmVmaXggZm9yIG5lc3RlZCBmaWVsZHNcbiAgICBjb25zdCBsb2NhdGlvblByZWZpeCA9IHByb3BlcnR5Lm5hbWU7XG4gICAgY29uc3QgYWRkcmVzc1ByZWZpeCA9IGlzUGlja3VwID8gJ3BpY2t1cEFkZHJlc3MnIDogaXNEZWxpdmVyeSA/ICdkZWxpdmVyeUFkZHJlc3MnIDogJ2FkZHJlc3MnO1xuXG4gICAgLy8gRXh0cmFjdCBjb29yZGluYXRlcyBmcm9tIGZsYXR0ZW5lZCBBZG1pbkpTIHBhcmFtc1xuICAgIGNvbnN0IGxhdCA9IHJlY29yZC5wYXJhbXNbYCR7bG9jYXRpb25QcmVmaXh9LmNvb3JkaW5hdGVzLjFgXTtcbiAgICBjb25zdCBsbmcgPSByZWNvcmQucGFyYW1zW2Ake2xvY2F0aW9uUHJlZml4fS5jb29yZGluYXRlcy4wYF07XG5cbiAgICAvLyBDaGVjayBmb3IgYWRkcmVzcyBkYXRhXG4gICAgY29uc3QgYWRkcmVzc0xpbmUxID0gcmVjb3JkLnBhcmFtc1tgJHthZGRyZXNzUHJlZml4fS5hZGRyZXNzTGluZTFgXTtcbiAgICBjb25zdCBhZGRyZXNzTGluZTIgPSByZWNvcmQucGFyYW1zW2Ake2FkZHJlc3NQcmVmaXh9LmFkZHJlc3NMaW5lMmBdO1xuXG4gICAgLy8gSWYgbm8gY29vcmRpbmF0ZXMsIHJldHVybiBhIHN1YnRsZSBpbmRpY2F0b3JcbiAgICBpZiAoIWxhdCB8fCAhbG5nKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogJyNhZGI1YmQnLCBmb250U2l6ZTogJzEycHgnIH19PuKAlDwvc3Bhbj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBBdHRlbXB0IHRvIGNvbnN0cnVjdCBhbiBhZGRyZXNzIHN0cmluZyBmcm9tIHRoZSByZWNvcmRcbiAgICBjb25zdCBhZGRyZXNzUGFydHMgPSBbXG4gICAgICAgIGFkZHJlc3NMaW5lMSxcbiAgICAgICAgYWRkcmVzc0xpbmUyLFxuICAgICAgICByZWNvcmQucGFyYW1zW2Ake2FkZHJlc3NQcmVmaXh9LmFkZHJlc3NMaW5lM2BdLFxuICAgICAgICByZWNvcmQucGFyYW1zW2Ake2FkZHJlc3NQcmVmaXh9LnBpbkNvZGVgXSxcbiAgICBdLmZpbHRlcihwYXJ0ID0+IHBhcnQgJiYgcGFydC50b1N0cmluZygpLnRyaW0oKSAhPT0gJycpO1xuXG4gICAgbGV0IHF1ZXJ5ID0gJyc7XG4gICAgaWYgKGFkZHJlc3NQYXJ0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHF1ZXJ5ID0gZW5jb2RlVVJJQ29tcG9uZW50KGFkZHJlc3NQYXJ0cy5qb2luKCcsICcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWVyeSA9IGAke2xhdH0sJHtsbmd9YDtcbiAgICB9XG5cbiAgICBjb25zdCBtYXBzTGluayA9IGBodHRwczovL3d3dy5nb29nbGUuY29tL21hcHMvc2VhcmNoLz9hcGk9MSZxdWVyeT0ke3F1ZXJ5fWA7XG5cbiAgICAvLyBEZXRlcm1pbmUgaWNvbiBhbmQgY29sb3IgYmFzZWQgb24gbG9jYXRpb24gdHlwZVxuICAgIGNvbnN0IGdldFN0eWxlID0gKCkgPT4ge1xuICAgICAgICBpZiAoaXNQaWNrdXApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWNvbjogJ/Cfk6YnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnUGlja3VwJyxcbiAgICAgICAgICAgICAgICBiZ0NvbG9yOiAnI2ZmZjNjZCcsXG4gICAgICAgICAgICAgICAgdGV4dENvbG9yOiAnIzg1NjQwNCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjZmZjMTA3JyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRGVsaXZlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWNvbjogJ/Cfj6AnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnRGVsaXZlcnknLFxuICAgICAgICAgICAgICAgIGJnQ29sb3I6ICcjZDRlZGRhJyxcbiAgICAgICAgICAgICAgICB0ZXh0Q29sb3I6ICcjMTU1NzI0JyxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyMyOGE3NDUnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWNvbjogJ/Cfk40nLFxuICAgICAgICAgICAgbGFiZWw6ICdWaWV3JyxcbiAgICAgICAgICAgIGJnQ29sb3I6ICcjZTNmMmZkJyxcbiAgICAgICAgICAgIHRleHRDb2xvcjogJyMxNTY1YzAnLFxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjMjE5NmYzJyxcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3R5bGUgPSBnZXRTdHlsZSgpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGFcbiAgICAgICAgICAgIGhyZWY9e21hcHNMaW5rfVxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxuICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIGdhcDogJzRweCcsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogJzRweCAxMHB4JyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHN0eWxlLmJnQ29sb3IsXG4gICAgICAgICAgICAgICAgY29sb3I6IHN0eWxlLnRleHRDb2xvcixcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxNnB4JyxcbiAgICAgICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTJweCcsXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogNTAwLFxuICAgICAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3N0eWxlLmJvcmRlckNvbG9yfWAsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2FsbCAwLjJzIGVhc2UnLFxuICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uTW91c2VPdmVyPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMS4wNSknO1xuICAgICAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5ib3hTaGFkb3cgPSAnMCAycHggOHB4IHJnYmEoMCwwLDAsMC4xNSknO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uTW91c2VPdXQ9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZSgxKSc7XG4gICAgICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJveFNoYWRvdyA9ICdub25lJztcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB0aXRsZT17YWRkcmVzc1BhcnRzLmxlbmd0aCA+IDAgPyBhZGRyZXNzUGFydHMuam9pbignLCAnKSA6IGAke2xhdH0sICR7bG5nfWB9XG4gICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuPntzdHlsZS5pY29ufTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPntzdHlsZS5sYWJlbH08L3NwYW4+XG4gICAgICAgIDwvYT5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVGFza0xvY2F0aW9uTGluaztcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIExhYmVsLCBJbnB1dCwgVGV4dEFyZWEsIFNlbGVjdCwgRm9ybUdyb3VwLCBGb3JtTWVzc2FnZSwgQnV0dG9uLCBJY29uIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBBcGlDbGllbnQsIHVzZVJlY29yZCB9IGZyb20gJ2FkbWluanMnO1xuXG5jb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XG5cbmNvbnN0IE5vdGlmaWNhdGlvbkZvcm0gPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IHJlY29yZDogaW5pdGlhbFJlY29yZCwgcmVzb3VyY2UsIGFjdGlvbiB9ID0gcHJvcHM7XG4gICAgY29uc3QgeyByZWNvcmQsIGhhbmRsZUNoYW5nZSwgc3VibWl0IH0gPSB1c2VSZWNvcmQoaW5pdGlhbFJlY29yZCwgcmVzb3VyY2UuaWQpO1xuXG4gICAgLy8gRGVsaXZlcnkgbW9kZTogJ2Jyb2FkY2FzdCcgb3IgJ3RhcmdldGVkJ1xuICAgIGNvbnN0IFtkZWxpdmVyeU1vZGUsIHNldERlbGl2ZXJ5TW9kZV0gPSB1c2VTdGF0ZSgnYnJvYWRjYXN0Jyk7XG4gICAgY29uc3QgW3VzZXJzLCBzZXRVc2Vyc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW2xvYWRpbmdVc2Vycywgc2V0TG9hZGluZ1VzZXJzXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbc2F2aW5nLCBzZXRTYXZpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtlcnJvcnMsIHNldEVycm9yc10gPSB1c2VTdGF0ZSh7fSk7XG5cbiAgICAvLyBOb3RpZmljYXRpb24gdHlwZXNcbiAgICBjb25zdCBub3RpZmljYXRpb25UeXBlcyA9IFtcbiAgICAgICAgeyB2YWx1ZTogJ2FkbWluX2Jyb2FkY2FzdCcsIGxhYmVsOiAn8J+ToiBBbm5vdW5jZW1lbnQnIH0sXG4gICAgICAgIHsgdmFsdWU6ICd3ZWF0aGVyX2FsZXJ0JywgbGFiZWw6ICfim4jvuI8gV2VhdGhlciBBbGVydCcgfSxcbiAgICAgICAgeyB2YWx1ZTogJ2Rpc2FzdGVyX2FsZXJ0JywgbGFiZWw6ICfwn5qoIERpc2FzdGVyIEFsZXJ0JyB9LFxuICAgICAgICB7IHZhbHVlOiAncmVsaWVmX2NlbnRlcl91cGRhdGUnLCBsYWJlbDogJ/Cfk40gUmVsaWVmIENlbnRlciBVcGRhdGUnIH0sXG4gICAgICAgIHsgdmFsdWU6ICdzeXN0ZW1fbm90aWZpY2F0aW9uJywgbGFiZWw6ICfwn5SnIFN5c3RlbSBOb3RpY2UnIH0sXG4gICAgXTtcblxuICAgIC8vIEF1ZGllbmNlIG9wdGlvbnMgKGZvciBicm9hZGNhc3QgbW9kZSlcbiAgICBjb25zdCBhdWRpZW5jZU9wdGlvbnMgPSBbXG4gICAgICAgIHsgdmFsdWU6ICdhbGwnLCBsYWJlbDogJ/CfkaUgRXZlcnlvbmUgKFB1YmxpYyArIFZvbHVudGVlcnMpJyB9LFxuICAgICAgICB7IHZhbHVlOiAncHVibGljJywgbGFiZWw6ICfwn4+gIFB1YmxpYyBVc2VycyBPbmx5JyB9LFxuICAgICAgICB7IHZhbHVlOiAndm9sdW50ZWVyJywgbGFiZWw6ICfwn5mLIFZvbHVudGVlcnMgT25seScgfSxcbiAgICBdO1xuXG4gICAgLy8gTG9hZCB1c2VycyBmb3IgdGhlIGRyb3Bkb3duIChmZXRjaGluZyBtb3JlIHJlY29yZHMpXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgbG9hZFVzZXJzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgc2V0TG9hZGluZ1VzZXJzKHRydWUpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyBGZXRjaCB1cCB0byA1MDAgdXNlcnMgdG8gZW5zdXJlIHdlIGdldCBib3RoIHB1YmxpYyBhbmQgdm9sdW50ZWVyc1xuICAgICAgICAgICAgICAgIC8vIEluIHByb2R1Y3Rpb24sIHRoaXMgc2hvdWxkIGJlIGEgc2VhcmNoLCBidXQgZm9yIG5vdyBpbmNyZWFzaW5nIGxpbWl0IGhlbHBzXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUlkOiAndXNlclByb2ZpbGUnLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnbGlzdCcsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiB7IHBlclBhZ2U6IDUwMCB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEucmVjb3Jkcykge1xuICAgICAgICAgICAgICAgICAgICBzZXRVc2VycyhyZXNwb25zZS5kYXRhLnJlY29yZHMubWFwKHIgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGAke3IucGFyYW1zLm5hbWV9ICgke3IucGFyYW1zLnJvbGV9KWAsIC8vIFNpbXBsaWZpZWQgbGFiZWxcbiAgICAgICAgICAgICAgICAgICAgfSkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBsb2FkIHVzZXJzOicsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldExvYWRpbmdVc2VycyhmYWxzZSk7XG4gICAgICAgIH07XG4gICAgICAgIGxvYWRVc2VycygpO1xuICAgIH0sIFtdKTtcblxuICAgIC8vIFRyYWNrIGlmIHdlJ3ZlIGluaXRpYWxpemVkIGRlZmF1bHRzXG4gICAgY29uc3QgaW5pdGlhbGl6ZWRSZWYgPSB1c2VSZWYoZmFsc2UpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBkZWZhdWx0IHZhbHVlcyAtIGVuc3VyZSBzdGF0ZSBpcyBzZXQgYmVmb3JlIGZpcnN0IHJlbmRlciBjeWNsZSBjb21wbGV0ZXNcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoaW5pdGlhbGl6ZWRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbmVlZHNUeXBlRGVmYXVsdCA9ICFyZWNvcmQucGFyYW1zLnR5cGU7XG4gICAgICAgIGNvbnN0IG5lZWRzVGFyZ2V0RGVmYXVsdCA9ICFyZWNvcmQucGFyYW1zLnRhcmdldFVzZXJUeXBlO1xuICAgICAgICBcbiAgICAgICAgaWYgKG5lZWRzVHlwZURlZmF1bHQgfHwgbmVlZHNUYXJnZXREZWZhdWx0KSB7XG4gICAgICAgICAgICBoYW5kbGVDaGFuZ2UoeyBcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHsgXG4gICAgICAgICAgICAgICAgICAgIC4uLnJlY29yZC5wYXJhbXMsIFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiByZWNvcmQucGFyYW1zLnR5cGUgfHwgJ2FkbWluX2Jyb2FkY2FzdCcsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFVzZXJUeXBlOiByZWNvcmQucGFyYW1zLnRhcmdldFVzZXJUeXBlIHx8ICdhbGwnXG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGluaXRpYWxpemVkUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgIH0sIFtyZWNvcmQucGFyYW1zLCBoYW5kbGVDaGFuZ2VdKTtcblxuICAgIC8vIEhhbmRsZSBkZWxpdmVyeSBtb2RlIGNoYW5nZVxuICAgIGNvbnN0IGhhbmRsZURlbGl2ZXJ5TW9kZUNoYW5nZSA9IChtb2RlKSA9PiB7XG4gICAgICAgIHNldERlbGl2ZXJ5TW9kZShtb2RlKTtcbiAgICAgICAgaWYgKG1vZGUgPT09ICdicm9hZGNhc3QnKSB7XG4gICAgICAgICAgICAvLyBCcm9hZGNhc3QgbW9kZTogQ2xlYXIgcmVjaXBpZW50LCBlbnN1cmUgdGFyZ2V0VXNlclR5cGUgaXMgc2V0IGZyb20gZHJvcGRvd24gKG9yIGRlZmF1bHQgdG8gYWxsKVxuICAgICAgICAgICAgY29uc3QgY3VycmVudEF1ZGllbmNlID0gcmVjb3JkLnBhcmFtcy50YXJnZXRVc2VyVHlwZSA9PT0gJ2FsbCcgfHwgcmVjb3JkLnBhcmFtcy50YXJnZXRVc2VyVHlwZSA9PT0gJ3B1YmxpYycgfHwgcmVjb3JkLnBhcmFtcy50YXJnZXRVc2VyVHlwZSA9PT0gJ3ZvbHVudGVlcidcbiAgICAgICAgICAgICAgICA/IHJlY29yZC5wYXJhbXMudGFyZ2V0VXNlclR5cGVcbiAgICAgICAgICAgICAgICA6ICdhbGwnO1xuXG4gICAgICAgICAgICBoYW5kbGVDaGFuZ2UoeyBwYXJhbXM6IHsgLi4ucmVjb3JkLnBhcmFtcywgcmVjaXBpZW50SWQ6IG51bGwsIHRhcmdldFVzZXJUeXBlOiBjdXJyZW50QXVkaWVuY2UgfSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRhcmdldGVkIG1vZGU6IEZvcmNlIHRhcmdldFVzZXJUeXBlIHRvICdhbGwnIHNvIHF1ZXJ5IGxvZ2ljIHdvcmtzIChyZWNpcGllbnRJZCB0YWtlcyBwcmVjZWRlbmNlKVxuICAgICAgICAgICAgaGFuZGxlQ2hhbmdlKHsgcGFyYW1zOiB7IC4uLnJlY29yZC5wYXJhbXMsIHRhcmdldFVzZXJUeXBlOiAnYWxsJyB9IH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBmb3JtIHN1Ym1pc3Npb25cbiAgICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNldFNhdmluZyh0cnVlKTtcbiAgICAgICAgc2V0RXJyb3JzKHt9KTtcblxuICAgICAgICAvLyBWYWxpZGF0aW9uXG4gICAgICAgIGNvbnN0IG5ld0Vycm9ycyA9IHt9O1xuICAgICAgICBpZiAoIXJlY29yZC5wYXJhbXMudGl0bGU/LnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLnRpdGxlID0gJ1RpdGxlIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfSBlbHNlIGlmICghL15bQS1aYS16XFxzIS4sOlxcLV0rJC8udGVzdChyZWNvcmQucGFyYW1zLnRpdGxlLnRyaW0oKSkpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy50aXRsZSA9ICdUaXRsZSBtdXN0IGNvbnRhaW4gb25seSBsZXR0ZXJzLCBzcGFjZXMsIGFuZCBiYXNpYyBwdW5jdHVhdGlvbiAobm8gbnVtYmVycyknO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVjb3JkLnBhcmFtcy5ib2R5Py50cmltKCkpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5ib2R5ID0gJ01lc3NhZ2UgaXMgcmVxdWlyZWQnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVjb3JkLnBhcmFtcy50eXBlKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMudHlwZSA9ICdQbGVhc2Ugc2VsZWN0IGEgbm90aWZpY2F0aW9uIHR5cGUnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZWxpdmVyeU1vZGUgPT09ICd0YXJnZXRlZCcgJiYgIXJlY29yZC5wYXJhbXMucmVjaXBpZW50SWQpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5yZWNpcGllbnRJZCA9ICdQbGVhc2Ugc2VsZWN0IGEgdXNlciBmb3IgdGFyZ2V0ZWQgbm90aWZpY2F0aW9uJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhuZXdFcnJvcnMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNldEVycm9ycyhuZXdFcnJvcnMpO1xuICAgICAgICAgICAgc2V0U2F2aW5nKGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHN1Ym1pdCgpO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEucmVkaXJlY3RVcmwpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLmRhdGEucmVkaXJlY3RVcmw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gc2F2ZSBub3RpZmljYXRpb246JywgZXJyb3IpO1xuICAgICAgICAgICAgc2V0RXJyb3JzKHsgZ2VuZXJhbDogJ0ZhaWxlZCB0byBzYXZlIG5vdGlmaWNhdGlvbi4gUGxlYXNlIHRyeSBhZ2Fpbi4nIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgfTtcblxuICAgIC8vIFN0eWxlc1xuICAgIGNvbnN0IHN0eWxlcyA9IHtcbiAgICAgICAgY29udGFpbmVyOiB7XG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICB9LFxuICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjY3ZWVhIDAlLCAjNzY0YmEyIDEwMCUpJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxuICAgICAgICAgICAgcGFkZGluZzogJzI0cHgnLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMjRweCcsXG4gICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgfSxcbiAgICAgICAgaGVhZGVyVGl0bGU6IHtcbiAgICAgICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzhweCcsXG4gICAgICAgICAgICBmb250U2l6ZTogJzI0cHgnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJzYwMCcsXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGdhcDogJzEwcHgnLFxuICAgICAgICB9LFxuICAgICAgICBoZWFkZXJTdWJ0aXRsZToge1xuICAgICAgICAgICAgbWFyZ2luOiAwLFxuICAgICAgICAgICAgb3BhY2l0eTogMC45LFxuICAgICAgICAgICAgZm9udFNpemU6ICcxNHB4JyxcbiAgICAgICAgfSxcbiAgICAgICAgc2VjdGlvbjoge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxuICAgICAgICAgICAgcGFkZGluZzogJzI0cHgnLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMjBweCcsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA4cHggcmdiYSgwLDAsMCwwLjA4KScsXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2VlZScsXG4gICAgICAgIH0sXG4gICAgICAgIHNlY3Rpb25UaXRsZToge1xuICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLFxuICAgICAgICAgICAgY29sb3I6ICcjMzMzJyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzE2cHgnLFxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICBnYXA6ICc4cHgnLFxuICAgICAgICB9LFxuICAgICAgICB0b2dnbGVDb250YWluZXI6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGdhcDogJzEycHgnLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnMTJweCcsXG4gICAgICAgIH0sXG4gICAgICAgIHRvZ2dsZUJ1dHRvbjogKGlzQWN0aXZlKSA9PiAoe1xuICAgICAgICAgICAgZmxleDogMSxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcxNnB4IDIwcHgnLFxuICAgICAgICAgICAgYm9yZGVyOiBpc0FjdGl2ZSA/ICcycHggc29saWQgIzY2N2VlYScgOiAnMnB4IHNvbGlkICNlMGUwZTAnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTBweCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBpc0FjdGl2ZSA/ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjY3ZWVhIDAlLCAjNzY0YmEyIDEwMCUpJyA6ICd3aGl0ZScsXG4gICAgICAgICAgICBjb2xvcjogaXNBY3RpdmUgPyAnd2hpdGUnIDogJyM2NjYnLFxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnYWxsIDAuMnMgZWFzZScsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTRweCcsXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgZ2FwOiAnOHB4JyxcbiAgICAgICAgfSksXG4gICAgICAgIHRvZ2dsZUljb246IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMjRweCcsXG4gICAgICAgIH0sXG4gICAgICAgIHN1Ym1pdEJ1dHRvbjoge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2NjdlZWEgMCUsICM3NjRiYTIgMTAwJSknLFxuICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMTRweCAzMnB4JyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwcHgnLFxuICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnNjAwJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgZ2FwOiAnMTBweCcsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuMnMgZWFzZSwgYm94LXNoYWRvdyAwLjJzIGVhc2UnLFxuICAgICAgICB9LFxuICAgICAgICBlcnJvckJveDoge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmZmY1ZjUnLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNmZWIyYjInLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4IDE2cHgnLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMjBweCcsXG4gICAgICAgICAgICBjb2xvcjogJyNjNTMwMzAnLFxuICAgICAgICB9LFxuICAgICAgICBoaW50OiB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzEzcHgnLFxuICAgICAgICAgICAgY29sb3I6ICcjODg4JyxcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzhweCcsXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICAgICAgICAgIGNvbG9yOiAnIzQ0NCcsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc4cHgnLFxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgfSxcbiAgICAgICAgcmVxdWlyZWQ6IHtcbiAgICAgICAgICAgIGNvbG9yOiAnI2U1M2UzZScsXG4gICAgICAgICAgICBtYXJnaW5MZWZ0OiAnNHB4JyxcbiAgICAgICAgfSxcbiAgICAgICAgZnVsbFdpZHRoSW5wdXQ6IHtcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8Qm94IGFzPVwiZm9ybVwiIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IHN0eWxlPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuaGVhZGVyfT5cbiAgICAgICAgICAgICAgICA8aDIgc3R5bGU9e3N0eWxlcy5oZWFkZXJUaXRsZX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPvCfk6w8L3NwYW4+IENyZWF0ZSBOb3RpZmljYXRpb25cbiAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgIDxwIHN0eWxlPXtzdHlsZXMuaGVhZGVyU3VidGl0bGV9PlxuICAgICAgICAgICAgICAgICAgICBTZW5kIGFubm91bmNlbWVudHMsIGFsZXJ0cywgb3IgdXBkYXRlcyB0byB5b3VyIHVzZXJzXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHtlcnJvcnMuZ2VuZXJhbCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVycm9yQm94fT5cbiAgICAgICAgICAgICAgICAgICAg4pqg77iPIHtlcnJvcnMuZ2VuZXJhbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHsvKiBDb250ZW50IFNlY3Rpb24gKi99XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuc2VjdGlvbn0+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnNlY3Rpb25UaXRsZX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPuKcj++4jzwvc3Bhbj4gTm90aWZpY2F0aW9uIENvbnRlbnRcbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBUaXRsZSAqL31cbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGVycm9yPXtlcnJvcnMudGl0bGV9IG1iPVwieGxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIHN0eWxlPXtzdHlsZXMubGFiZWx9PlxuICAgICAgICAgICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uIFRpdGxlIDxzcGFuIHN0eWxlPXtzdHlsZXMucmVxdWlyZWR9Pio8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3JlY29yZC5wYXJhbXMudGl0bGUgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUNoYW5nZSh7IHBhcmFtczogeyAuLi5yZWNvcmQucGFyYW1zLCB0aXRsZTogZS50YXJnZXQudmFsdWUgfSB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgYSBzaG9ydCwgYXR0ZW50aW9uLWdyYWJiaW5nIGhlYWRsaW5lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJvcmRlclJhZGl1czogJzhweCcsIHdpZHRoOiAnMTAwJScgfX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAge2Vycm9ycy50aXRsZSAmJiA8Rm9ybU1lc3NhZ2U+e2Vycm9ycy50aXRsZX08L0Zvcm1NZXNzYWdlPn1cbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgICAgICAgIHsvKiBNZXNzYWdlICovfVxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgZXJyb3I9e2Vycm9ycy5ib2R5fSBtYj1cInhsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBzdHlsZT17c3R5bGVzLmxhYmVsfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIE1lc3NhZ2UgPHNwYW4gc3R5bGU9e3N0eWxlcy5yZXF1aXJlZH0+Kjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPFRleHRBcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cmVjb3JkLnBhcmFtcy5ib2R5IHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVDaGFuZ2UoeyBwYXJhbXM6IHsgLi4ucmVjb3JkLnBhcmFtcywgYm9keTogZS50YXJnZXQudmFsdWUgfSB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgdGhlIGRldGFpbGVkIG5vdGlmaWNhdGlvbiBjb250ZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9ezV9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBib3JkZXJSYWRpdXM6ICc4cHgnLCB3aWR0aDogJzEwMCUnLCBtaW5IZWlnaHQ6ICcxMjBweCcgfX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAge2Vycm9ycy5ib2R5ICYmIDxGb3JtTWVzc2FnZT57ZXJyb3JzLmJvZHl9PC9Gb3JtTWVzc2FnZT59XG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgICAgICAgICB7LyogTm90aWZpY2F0aW9uIFR5cGUgKi99XG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBlcnJvcj17ZXJyb3JzLnR5cGV9PlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgc3R5bGU9e3N0eWxlcy5sYWJlbH0+XG4gICAgICAgICAgICAgICAgICAgICAgICBOb3RpZmljYXRpb24gVHlwZSA8c3BhbiBzdHlsZT17c3R5bGVzLnJlcXVpcmVkfT4qPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bm90aWZpY2F0aW9uVHlwZXMuZmluZCh0ID0+IHQudmFsdWUgPT09IHJlY29yZC5wYXJhbXMudHlwZSkgfHwgbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e25vdGlmaWNhdGlvblR5cGVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhzZWxlY3RlZCkgPT4gaGFuZGxlQ2hhbmdlKHsgcGFyYW1zOiB7IC4uLnJlY29yZC5wYXJhbXMsIHR5cGU6IHNlbGVjdGVkPy52YWx1ZSB9IH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3Qgbm90aWZpY2F0aW9uIHR5cGUuLi5cIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICB7ZXJyb3JzLnR5cGUgJiYgPEZvcm1NZXNzYWdlPntlcnJvcnMudHlwZX08L0Zvcm1NZXNzYWdlPn1cbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogRGVsaXZlcnkgU2VjdGlvbiAqL31cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zZWN0aW9ufT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuc2VjdGlvblRpdGxlfT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+8J+TpDwvc3Bhbj4gRGVsaXZlcnkgT3B0aW9uc1xuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGxhYmVsIHN0eWxlPXtzdHlsZXMubGFiZWx9PldobyBzaG91bGQgcmVjZWl2ZSB0aGlzIG5vdGlmaWNhdGlvbj88L2xhYmVsPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnRvZ2dsZUNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy50b2dnbGVCdXR0b24oZGVsaXZlcnlNb2RlID09PSAnYnJvYWRjYXN0Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVEZWxpdmVyeU1vZGVDaGFuZ2UoJ2Jyb2FkY2FzdCcpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLnRvZ2dsZUljb259PvCfk6I8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Ccm9hZGNhc3QgdG8gQXVkaWVuY2U8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBvcGFjaXR5OiAwLjggfX0+U2VuZCB0byBhIGdyb3VwIG9mIHVzZXJzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLnRvZ2dsZUJ1dHRvbihkZWxpdmVyeU1vZGUgPT09ICd0YXJnZXRlZCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlRGVsaXZlcnlNb2RlQ2hhbmdlKCd0YXJnZXRlZCcpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLnRvZ2dsZUljb259PvCfjq88L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5TZW5kIHRvIFNwZWNpZmljIFVzZXI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBvcGFjaXR5OiAwLjggfX0+U2VuZCB0byBvbmUgcGVyc29uIG9ubHk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIENvbmRpdGlvbmFsOiBBdWRpZW5jZSBvciBVc2VyIFBpY2tlciAqL31cbiAgICAgICAgICAgICAgICA8Qm94IG10PVwieGxcIj5cbiAgICAgICAgICAgICAgICAgICAge2RlbGl2ZXJ5TW9kZSA9PT0gJ2Jyb2FkY2FzdCcgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBzdHlsZT17c3R5bGVzLmxhYmVsfT5TZWxlY3QgQXVkaWVuY2U8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2F1ZGllbmNlT3B0aW9ucy5maW5kKGEgPT4gYS52YWx1ZSA9PT0gcmVjb3JkLnBhcmFtcy50YXJnZXRVc2VyVHlwZSkgfHwgbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17YXVkaWVuY2VPcHRpb25zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHNlbGVjdGVkKSA9PiBoYW5kbGVDaGFuZ2UoeyBwYXJhbXM6IHsgLi4ucmVjb3JkLnBhcmFtcywgdGFyZ2V0VXNlclR5cGU6IHNlbGVjdGVkPy52YWx1ZSwgcmVjaXBpZW50SWQ6IG51bGwgfSB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgYXVkaWVuY2UuLi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgc3R5bGU9e3N0eWxlcy5oaW50fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4oS577iPIFRoaXMgbm90aWZpY2F0aW9uIHdpbGwgYmUgc2VudCB0byBhbGwgdXNlcnMgaW4gdGhlIHNlbGVjdGVkIGF1ZGllbmNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBlcnJvcj17ZXJyb3JzLnJlY2lwaWVudElkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgc3R5bGU9e3N0eWxlcy5sYWJlbH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdCBVc2VyIDxzcGFuIHN0eWxlPXtzdHlsZXMucmVxdWlyZWR9Pio8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt1c2Vycy5maW5kKHUgPT4gdS52YWx1ZSA9PT0gcmVjb3JkLnBhcmFtcy5yZWNpcGllbnRJZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3VzZXJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmc9e2xvYWRpbmdVc2Vyc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhzZWxlY3RlZCkgPT4gaGFuZGxlQ2hhbmdlKHsgcGFyYW1zOiB7IC4uLnJlY29yZC5wYXJhbXMsIHJlY2lwaWVudElkOiBzZWxlY3RlZD8udmFsdWUsIHRhcmdldFVzZXJUeXBlOiAnYWxsJyB9IH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBhbmQgc2VsZWN0IGEgdXNlci4uLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2xlYXJhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZXJyb3JzLnJlY2lwaWVudElkICYmIDxGb3JtTWVzc2FnZT57ZXJyb3JzLnJlY2lwaWVudElkfTwvRm9ybU1lc3NhZ2U+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIHN0eWxlPXtzdHlsZXMuaGludH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKEue+4jyBUaGlzIG5vdGlmaWNhdGlvbiB3aWxsIGJlIHNlbnQgb25seSB0byB0aGUgc2VsZWN0ZWQgdXNlci5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogU3VibWl0IEJ1dHRvbiAqL31cbiAgICAgICAgICAgIDxCb3ggbXQ9XCJ4bFwiIG1iPVwieGxcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLnN1Ym1pdEJ1dHRvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IHNhdmluZyA/IDAuNyA6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IHNhdmluZyA/ICdub3QtYWxsb3dlZCcgOiAncG9pbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtzYXZpbmd9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7c2F2aW5nID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPD7ij7MgU2VuZGluZy4uLjwvPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgPD7wn5OkIFNlbmQgTm90aWZpY2F0aW9uPC8+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5vdGlmaWNhdGlvbkZvcm07XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIExhYmVsLCBUZXh0LCBMaW5rIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbi8qKlxuICogQWRkcmVzc1Nob3cgLSBBIGNsZWFuIGNvbXBvbmVudCBmb3IgZGlzcGxheWluZyBhZGRyZXNzIGluIEFkbWluSlMgc2hvdyB2aWV3c1xuICogU2hvd3MgZm9ybWF0dGVkIGFkZHJlc3Mgd2l0aCBhIHNtYWxsIG1hcCBwcmV2aWV3IGFuZCBhIFwiR2V0IERpcmVjdGlvbnNcIiBsaW5rXG4gKi9cbmNvbnN0IEFkZHJlc3NTaG93ID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyByZWNvcmQsIHByb3BlcnR5IH0gPSBwcm9wcztcbiAgICBjb25zdCBtYXBDb250YWluZXJSZWYgPSB1c2VSZWYobnVsbCk7XG4gICAgY29uc3QgbWFwSW5zdGFuY2VSZWYgPSB1c2VSZWYobnVsbCk7XG5cbiAgICAvLyBFeHRyYWN0IGFkZHJlc3MgZmllbGRzIGZyb20gZmxhdHRlbmVkIEFkbWluSlMgcGFyYW1zXG4gICAgY29uc3QgZ2V0RmllbGRWYWx1ZSA9IChwYXRoKSA9PiByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9LiR7cGF0aH1gXTtcblxuICAgIGNvbnN0IGFkZHJlc3NMaW5lMSA9IGdldEZpZWxkVmFsdWUoJ2FkZHJlc3NMaW5lMScpIHx8ICcnO1xuICAgIGNvbnN0IGFkZHJlc3NMaW5lMiA9IGdldEZpZWxkVmFsdWUoJ2FkZHJlc3NMaW5lMicpIHx8ICcnO1xuICAgIGNvbnN0IGFkZHJlc3NMaW5lMyA9IGdldEZpZWxkVmFsdWUoJ2FkZHJlc3NMaW5lMycpIHx8ICcnO1xuICAgIGNvbnN0IHBpbkNvZGUgPSBnZXRGaWVsZFZhbHVlKCdwaW5Db2RlJykgfHwgJyc7XG5cbiAgICAvLyBMb2NhdGlvbiBjb29yZGluYXRlcyAoR2VvSlNPTiBmb3JtYXQ6IFtsbmcsIGxhdF0pXG4gICAgY29uc3QgcGFyc2VkTG5nID0gcGFyc2VGbG9hdChnZXRGaWVsZFZhbHVlKCdsb2NhdGlvbi5jb29yZGluYXRlcy4wJykpO1xuICAgIGNvbnN0IHBhcnNlZExhdCA9IHBhcnNlRmxvYXQoZ2V0RmllbGRWYWx1ZSgnbG9jYXRpb24uY29vcmRpbmF0ZXMuMScpKTtcbiAgICBjb25zdCBsbmcgPSAhaXNOYU4ocGFyc2VkTG5nKSA/IHBhcnNlZExuZyA6IDA7XG4gICAgY29uc3QgbGF0ID0gIWlzTmFOKHBhcnNlZExhdCkgPyBwYXJzZWRMYXQgOiAwO1xuICAgIGNvbnN0IGhhc0Nvb3JkaW5hdGVzID0gIWlzTmFOKHBhcnNlZExhdCkgJiYgIWlzTmFOKHBhcnNlZExuZykgJiYgKGxhdCAhPT0gMCB8fCBsbmcgIT09IDApO1xuXG4gICAgLy8gQnVpbGQgZm9ybWF0dGVkIGFkZHJlc3MgcGFydHNcbiAgICBjb25zdCBhZGRyZXNzUGFydHMgPSBbYWRkcmVzc0xpbmUxLCBhZGRyZXNzTGluZTIsIGFkZHJlc3NMaW5lM10uZmlsdGVyKGxpbmUgPT4gbGluZSAmJiBsaW5lLnRyaW0oKSAhPT0gJycpO1xuICAgIGNvbnN0IGZvcm1hdHRlZEFkZHJlc3MgPSBhZGRyZXNzUGFydHMuam9pbignLCAnKSArIChwaW5Db2RlID8gYCAtICR7cGluQ29kZX1gIDogJycpO1xuXG4gICAgLy8gR29vZ2xlIE1hcHMgZGlyZWN0aW9ucyBVUkxcbiAgICBjb25zdCBtYXBzVXJsID0gaGFzQ29vcmRpbmF0ZXNcbiAgICAgICAgPyBgaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL2Rpci8/YXBpPTEmZGVzdGluYXRpb249JHtsYXR9LCR7bG5nfWBcbiAgICAgICAgOiBgaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL3NlYXJjaC8/YXBpPTEmcXVlcnk9JHtlbmNvZGVVUklDb21wb25lbnQoZm9ybWF0dGVkQWRkcmVzcyl9YDtcblxuICAgIC8vIExvYWQgTGVhZmxldCBhbmQgZGlzcGxheSBtYXBcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoIWhhc0Nvb3JkaW5hdGVzKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgbG9hZExlYWZsZXQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAod2luZG93LkwpIHJldHVybiB3aW5kb3cuTDtcblxuICAgICAgICAgICAgLy8gTG9hZCBDU1NcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlYWZsZXQtY3NzJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICAgICAgICAgIGxpbmsuaWQgPSAnbGVhZmxldC1jc3MnO1xuICAgICAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICAgICAgICAgIGxpbmsuaHJlZiA9ICdodHRwczovL3VucGtnLmNvbS9sZWFmbGV0QDEuOS40L2Rpc3QvbGVhZmxldC5jc3MnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExvYWQgSlNcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlYWZsZXQtanMnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5pZCA9ICdsZWFmbGV0LWpzJztcbiAgICAgICAgICAgICAgICBzY3JpcHQuc3JjID0gJ2h0dHBzOi8vdW5wa2cuY29tL2xlYWZsZXRAMS45LjQvZGlzdC9sZWFmbGV0LmpzJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKHdpbmRvdy5MKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5MKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjaGVjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh3aW5kb3cuTCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgbG9hZExlYWZsZXQoKS50aGVuKChMKSA9PiB7XG4gICAgICAgICAgICBpZiAoIW1hcEluc3RhbmNlUmVmLmN1cnJlbnQgJiYgbWFwQ29udGFpbmVyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXAgPSBMLm1hcChtYXBDb250YWluZXJSZWYuY3VycmVudCwge1xuICAgICAgICAgICAgICAgICAgICB6b29tQ29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsV2hlZWxab29tOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZG91YmxlQ2xpY2tab29tOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hab29tOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KS5zZXRWaWV3KFtsYXQsIGxuZ10sIDE1KTtcblxuICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZycsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICfCqSBPU00nXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obWFwKTtcblxuICAgICAgICAgICAgICAgIEwubWFya2VyKFtsYXQsIGxuZ10pLmFkZFRvKG1hcCk7XG5cbiAgICAgICAgICAgICAgICBtYXBJbnN0YW5jZVJlZi5jdXJyZW50ID0gbWFwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKG1hcEluc3RhbmNlUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBtYXBJbnN0YW5jZVJlZi5jdXJyZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIG1hcEluc3RhbmNlUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sIFtsYXQsIGxuZywgaGFzQ29vcmRpbmF0ZXNdKTtcblxuICAgIC8vIElmIG5vIGFkZHJlc3MgZGF0YSBhdCBhbGxcbiAgICBpZiAoIWFkZHJlc3NMaW5lMSAmJiAhYWRkcmVzc0xpbmUyICYmICFhZGRyZXNzTGluZTMgJiYgIXBpbkNvZGUgJiYgIWhhc0Nvb3JkaW5hdGVzKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Qm94IG1iPVwibGdcIj5cbiAgICAgICAgICAgICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsIHx8ICdBZGRyZXNzJ308L0xhYmVsPlxuICAgICAgICAgICAgICAgIDxUZXh0IHZhcmlhbnQ9XCJzbVwiIGNvbG9yPVwiZ3JleTYwXCI+Tm8gYWRkcmVzcyBwcm92aWRlZDwvVGV4dD5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxCb3ggbWI9XCJsZ1wiPlxuICAgICAgICAgICAgPExhYmVsIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzhweCcsIGZvbnRXZWlnaHQ6IDYwMCB9fT5cbiAgICAgICAgICAgICAgICB7cHJvcGVydHkubGFiZWwgfHwgJ0FkZHJlc3MnfVxuICAgICAgICAgICAgPC9MYWJlbD5cblxuICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZjhmOWZhIDAlLCAjZTllY2VmIDEwMCUpJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxNnB4JyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNkZWUyZTYnLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgey8qIEFkZHJlc3MgVGV4dCAqL31cbiAgICAgICAgICAgICAgICA8Qm94IG1iPVwiZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgICAgICA8Qm94IGZsZXggZmxleERpcmVjdGlvbj1cInJvd1wiIGFsaWduSXRlbXM9XCJmbGV4LXN0YXJ0XCIgc3R5bGU9e3sgZ2FwOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMThweCcgfX0+8J+TjTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb3g+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2FkZHJlc3NMaW5lMSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDUwMCwgZm9udFNpemU6ICcxNHB4JywgY29sb3I6ICcjMjEyNTI5JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthZGRyZXNzTGluZTF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthZGRyZXNzTGluZTIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzEzcHgnLCBjb2xvcjogJyM0OTUwNTcnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2FkZHJlc3NMaW5lMn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2FkZHJlc3NMaW5lMyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMTNweCcsIGNvbG9yOiAnIzZjNzU3ZCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YWRkcmVzc0xpbmUzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGluQ29kZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMTNweCcsIGNvbG9yOiAnIzZjNzU3ZCcsIG1hcmdpblRvcDogJzRweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQSU46IHtwaW5Db2RlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgICAgICAgIHsvKiBNYXAgUHJldmlldyAqL31cbiAgICAgICAgICAgICAgICB7aGFzQ29vcmRpbmF0ZXMgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzE4MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICcxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2NlZDRkYScsXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj17bWFwQ29udGFpbmVyUmVmfSBzdHlsZT17eyBoZWlnaHQ6ICcxMDAlJywgd2lkdGg6ICcxMDAlJyB9fSAvPlxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgey8qIEFjdGlvbnMgKi99XG4gICAgICAgICAgICAgICAgPEJveCBmbGV4IGZsZXhEaXJlY3Rpb249XCJyb3dcIiBzdHlsZT17eyBnYXA6ICcxMnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9e21hcHNVcmx9XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiAnNnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnOHB4IDE0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyM0Mjg1ZjQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dERlY29yYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzEzcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnYmFja2dyb3VuZC1jb2xvciAwLjJzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlT3Zlcj17KGUpID0+IGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzMzNjdkNid9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlT3V0PXsoZSkgPT4gZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjNDI4NWY0J31cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAg8J+nrSBHZXQgRGlyZWN0aW9uc1xuICAgICAgICAgICAgICAgICAgICA8L2E+XG5cbiAgICAgICAgICAgICAgICAgICAge2hhc0Nvb3JkaW5hdGVzICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInhzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImdyZXk2MFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgYWxpZ25TZWxmOiAnY2VudGVyJyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYXQudG9GaXhlZCg1KX0sIHtsbmcudG9GaXhlZCg1KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQWRkcmVzc1Nob3c7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG4vKipcbiAqIFNpbXBsZSB0ZXh0IHdyYXBwZXIgY29tcG9uZW50IGZvciBBZG1pbkpTIHRoYXQgc2hvd3MgdGV4dCBpbiBhIHNpbmdsZSBsaW5lXG4gKi9cbmNvbnN0IFRleHRXcmFwQ29tcG9uZW50ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcmVjb3JkLCBwcm9wZXJ0eSB9ID0gcHJvcHM7XG4gIGNvbnN0IHZhbHVlID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5wYXRoXTtcbiAgXG4gIGlmICghdmFsdWUpIHJldHVybiA8c3Bhbj4tPC9zcGFuPjtcbiAgXG4gIHJldHVybiAoXG4gICAgPGRpdiBcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIG1heFdpZHRoOiAnNDAwcHgnLFxuICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXG4gICAgICAgIGZvbnRTaXplOiAnMTRweCcsXG4gICAgICAgIHBhZGRpbmc6ICc0cHggMCdcbiAgICAgIH19XG4gICAgICB0aXRsZT17dmFsdWV9XG4gICAgPlxuICAgICAge3ZhbHVlfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVGV4dFdyYXBDb21wb25lbnQ7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuLyoqXG4gKiBEZXNjcmlwdGlvbiBjb21wb25lbnQgZm9yIEFkbWluSlMgdGhhdCBzaG93cyB3cmFwcGVkIHRleHQgd2l0aCBtdWx0aXBsZSBsaW5lc1xuICovXG5jb25zdCBEZXNjcmlwdGlvbkNvbXBvbmVudCA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHJlY29yZCwgcHJvcGVydHkgfSA9IHByb3BzO1xuICBjb25zdCB2YWx1ZSA9IHJlY29yZC5wYXJhbXNbcHJvcGVydHkucGF0aF07XG4gIFxuICBpZiAoIXZhbHVlKSByZXR1cm4gPHNwYW4+LTwvc3Bhbj47XG4gIFxuICByZXR1cm4gKFxuICAgIDxkaXYgXG4gICAgICBzdHlsZT17e1xuICAgICAgICBtYXhXaWR0aDogJzMwMHB4JyxcbiAgICAgICAgd29yZFdyYXA6ICdicmVhay13b3JkJyxcbiAgICAgICAgd2hpdGVTcGFjZTogJ25vcm1hbCcsXG4gICAgICAgIGxpbmVIZWlnaHQ6ICcxLjQnLFxuICAgICAgICBmb250U2l6ZTogJzEzcHgnLFxuICAgICAgICBwYWRkaW5nOiAnNHB4IDAnLFxuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgIGRpc3BsYXk6ICctd2Via2l0LWJveCcsXG4gICAgICAgIFdlYmtpdExpbmVDbGFtcDogMyxcbiAgICAgICAgV2Via2l0Qm94T3JpZW50OiAndmVydGljYWwnXG4gICAgICB9fVxuICAgICAgdGl0bGU9e3ZhbHVlfVxuICAgID5cbiAgICAgIHt2YWx1ZX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERlc2NyaXB0aW9uQ29tcG9uZW50OyIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmRcbmltcG9ydCBMaW5rQ29tcG9uZW50IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9MaW5rQ29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5MaW5rQ29tcG9uZW50ID0gTGlua0NvbXBvbmVudFxuaW1wb3J0IFZvbHVudGVlckZpbHRlcmVkU2VsZWN0IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Wb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3QgPSBWb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdFxuaW1wb3J0IFN0YXR1c0ZpbHRlcmVkU2VsZWN0IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9BaWRSZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlN0YXR1c0ZpbHRlcmVkU2VsZWN0ID0gU3RhdHVzRmlsdGVyZWRTZWxlY3RcbmltcG9ydCBEb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRvbmF0aW9uUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0ID0gRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3RcbmltcG9ydCBMb2dpbkNvbXBvbmVudCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTG9naW5Db21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkxvZ2luQ29tcG9uZW50ID0gTG9naW5Db21wb25lbnRcbmltcG9ydCBJbWFnZUNvbXBvbmVudCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSW1hZ2VDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlQ29tcG9uZW50ID0gSW1hZ2VDb21wb25lbnRcbmltcG9ydCBJbWFnZUxpc3RDb21wb25lbnQgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlTGlzdENvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuSW1hZ2VMaXN0Q29tcG9uZW50ID0gSW1hZ2VMaXN0Q29tcG9uZW50XG5pbXBvcnQgSW1hZ2VFZGl0Q29tcG9uZW50IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUVkaXRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlRWRpdENvbXBvbmVudCA9IEltYWdlRWRpdENvbXBvbmVudFxuaW1wb3J0IEltYWdlTGlzdEVkaXRDb21wb25lbnQgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlTGlzdEVkaXRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlTGlzdEVkaXRDb21wb25lbnQgPSBJbWFnZUxpc3RFZGl0Q29tcG9uZW50XG5pbXBvcnQgQ3JlYXRlVGFza0Zyb21BaWRSZXF1ZXN0IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9DcmVhdGVUYXNrRnJvbUFpZFJlcXVlc3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNyZWF0ZVRhc2tGcm9tQWlkUmVxdWVzdCA9IENyZWF0ZVRhc2tGcm9tQWlkUmVxdWVzdFxuaW1wb3J0IE1hcFBpY2tlciBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTWFwUGlja2VyJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5NYXBQaWNrZXIgPSBNYXBQaWNrZXJcbmltcG9ydCBNYXBTaG93IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9NYXBTaG93J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5NYXBTaG93ID0gTWFwU2hvd1xuaW1wb3J0IFRhc2tMb2NhdGlvblNob3cgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL1Rhc2tMb2NhdGlvblNob3cnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlRhc2tMb2NhdGlvblNob3cgPSBUYXNrTG9jYXRpb25TaG93XG5pbXBvcnQgVGFza0xvY2F0aW9uTGluayBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvVGFza0xvY2F0aW9uTGluaydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVGFza0xvY2F0aW9uTGluayA9IFRhc2tMb2NhdGlvbkxpbmtcbmltcG9ydCBIZWF0bWFwVmlzdWFsaXphdGlvbiBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSGVhdG1hcFZpc3VhbGl6YXRpb24nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkhlYXRtYXBWaXN1YWxpemF0aW9uID0gSGVhdG1hcFZpc3VhbGl6YXRpb25cbmltcG9ydCBOb3RpZmljYXRpb25Gb3JtIGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Ob3RpZmljYXRpb25Gb3JtJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Ob3RpZmljYXRpb25Gb3JtID0gTm90aWZpY2F0aW9uRm9ybVxuaW1wb3J0IEFkZHJlc3NTaG93IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9BZGRyZXNzU2hvdydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQWRkcmVzc1Nob3cgPSBBZGRyZXNzU2hvd1xuaW1wb3J0IFRleHRXcmFwQ29tcG9uZW50IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9UZXh0V3JhcENvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVGV4dFdyYXBDb21wb25lbnQgPSBUZXh0V3JhcENvbXBvbmVudFxuaW1wb3J0IERlc2NyaXB0aW9uQ29tcG9uZW50IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9EZXNjcmlwdGlvbkNvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRGVzY3JpcHRpb25Db21wb25lbnQgPSBEZXNjcmlwdGlvbkNvbXBvbmVudCJdLCJuYW1lcyI6WyJIZWF0bWFwVmlzdWFsaXphdGlvbiIsIm1hcENvbnRhaW5lclJlZiIsInVzZVJlZiIsIm1hcEluc3RhbmNlUmVmIiwiaGVhdExheWVyUmVmIiwibG9hZGluZyIsInNldExvYWRpbmciLCJ1c2VTdGF0ZSIsImVycm9yIiwic2V0RXJyb3IiLCJjYXNlQ291bnQiLCJzZXRDYXNlQ291bnQiLCJub0RhdGEiLCJzZXROb0RhdGEiLCJ1c2VFZmZlY3QiLCJpc01vdW50ZWQiLCJsb2FkTGlicmFyaWVzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImxpbmsiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJyZWwiLCJocmVmIiwiaGVhZCIsImFwcGVuZENoaWxkIiwid2luZG93IiwiTCIsInNjcmlwdCIsInNyYyIsImJvZHkiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ubG9hZCIsIm9uZXJyb3IiLCJoZWF0TGF5ZXIiLCJoZWF0U2NyaXB0IiwiaW5pdE1hcCIsInJlc3BvbnNlIiwiZmV0Y2giLCJyZXN1bHQiLCJqc29uIiwic3VjY2VzcyIsIkVycm9yIiwibWVzc2FnZSIsImhlYXREYXRhIiwiZGF0YSIsImNvdW50IiwidmFsaWRQb2ludHMiLCJmaWx0ZXIiLCJkIiwibGF0IiwibG5nIiwiaXNOYU4iLCJtYXAiLCJpbnRlbnNpdHkiLCJsZW5ndGgiLCJzZXRUaW1lb3V0IiwiY3VycmVudCIsImNvbnRhaW5lciIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0Iiwic2V0VmlldyIsInRpbGVMYXllciIsImF0dHJpYnV0aW9uIiwiYWRkVG8iLCJyYWRpdXMiLCJibHVyIiwibWF4Wm9vbSIsIm1heCIsIm1pbk9wYWNpdHkiLCJncmFkaWVudCIsImJvdW5kcyIsImxhdExuZ0JvdW5kcyIsInAiLCJpc1ZhbGlkIiwiZml0Qm91bmRzIiwicGFkZGluZyIsImUiLCJjb25zb2xlIiwid2FybiIsImVyciIsInJlbW92ZSIsIlJlYWN0IiwiQm94IiwibXQiLCJINSIsIm1iIiwiYmciLCJib3JkZXJSYWRpdXMiLCJib3JkZXIiLCJkaXNwbGF5IiwiYWxpZ25JdGVtcyIsImp1c3RpZnlDb250ZW50IiwiaGVpZ2h0IiwiVGV4dCIsImNvbG9yIiwicG9zaXRpb24iLCJyZWYiLCJzdHlsZSIsIndpZHRoIiwidmlzaWJpbGl0eSIsInRvcCIsImxlZnQiLCJyaWdodCIsImJvdHRvbSIsIkxvYWRlciIsImZvbnRTaXplIiwiZ2FwIiwiQ09MT1JTIiwicHJpbWFyeSIsInB1cnBsZSIsImN5YW4iLCJncmVlbiIsInJlZCIsInllbGxvdyIsImdyYXkiLCJvcmFuZ2UiLCJmb3JtYXRSZWxhdGl2ZVRpbWUiLCJkYXRlU3RyaW5nIiwiZGF0ZSIsIkRhdGUiLCJub3ciLCJkaWZmTXMiLCJkaWZmTWlucyIsIk1hdGgiLCJmbG9vciIsImRpZmZIb3VycyIsImRpZmZEYXlzIiwiZm9ybWF0Q3VycmVuY3kiLCJhbW91bnQiLCJ0b0ZpeGVkIiwiRG9udXRDaGFydCIsInNpemUiLCJ0aGlja25lc3MiLCJ0b3RhbCIsInJlZHVjZSIsInN1bSIsIml0ZW0iLCJ2YWx1ZSIsImNpcmN1bWZlcmVuY2UiLCJQSSIsImN1cnJlbnRPZmZzZXQiLCJ2aWV3Qm94IiwiY3giLCJjeSIsInIiLCJmaWxsIiwic3Ryb2tlIiwic3Ryb2tlV2lkdGgiLCJpbmRleCIsInBlcmNlbnRhZ2UiLCJzdHJva2VEYXNoYXJyYXkiLCJzdHJva2VEYXNob2Zmc2V0Iiwia2V5Iiwic3Ryb2tlTGluZWNhcCIsInRyYW5zZm9ybSIsInRyYW5zaXRpb24iLCJ4IiwieSIsInRleHRBbmNob3IiLCJmb250V2VpZ2h0IiwiZmxleERpcmVjdGlvbiIsImJhY2tncm91bmQiLCJuYW1lIiwiQmFyQ2hhcnQiLCJtYXhWYWx1ZSIsImZsYXRNYXAiLCJ0YXNrcyIsImFpZFJlcXVlc3RzIiwicGFkZGluZ0JvdHRvbSIsImZsZXgiLCJtYXhXaWR0aCIsIm1pbkhlaWdodCIsInRpdGxlIiwibWFyZ2luVG9wIiwibW9udGgiLCJEYXNoYm9hcmQiLCJjdXJyZW50QWRtaW4iLCJ1c2VDdXJyZW50QWRtaW4iLCJzdGF0cyIsInNldFN0YXRzIiwiZmV0Y2hTdGF0cyIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwidGV4dEFsaWduIiwidGFza1N0YXR1c0RhdGEiLCJjb21wbGV0ZWQiLCJvcGVuIiwiYXNzaWduZWQiLCJhY2NlcHRlZCIsImNsYXNzTmFtZSIsImZsZXhXcmFwIiwiSDIiLCJlbWFpbCIsInNwbGl0IiwidG9Mb2NhbGVUaW1lU3RyaW5nIiwicmVqZWN0ZWQiLCJwZW5kaW5nIiwiZG9uYXRpb25SZXF1ZXN0cyIsInRvdGFsQW1vdW50IiwidXNlcnMiLCJ2b2x1bnRlZXJzIiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsInJlY2VudFRhc2tzIiwic2xpY2UiLCJ0YXNrIiwiY3JlYXRlZEF0Iiwic3RhdHVzIiwicHJpb3JpdHkiLCJ2b2x1bnRlZXJzTmVlZGVkIiwibW9udGhseVN0YXRzIiwidGV4dERlY29yYXRpb24iLCJyZWxpZWZDZW50ZXJzIiwiY2VudGVyIiwiY29vcmRpbmF0b3IiLCJ3YWxsZXQiLCJGcmFnbWVudCIsImJhbGFuY2UiLCJ0b3RhbENyZWRpdHMiLCJ0b3RhbERlYml0cyIsImRvbm9yQ291bnQiLCJib3JkZXJCb3R0b20iLCJwcmlvcml0aWVzIiwiaGlnaCIsIm1lZGl1bSIsImxvdyIsIkxpbmtDb21wb25lbnQiLCJwcm9wcyIsInJlY29yZCIsInByb3BlcnR5IiwicGFyYW1zIiwibG9uZyIsImFkZHJlc3NQYXJ0cyIsInBhcnQiLCJ0b1N0cmluZyIsInRyaW0iLCJxdWVyeSIsImVuY29kZVVSSUNvbXBvbmVudCIsImpvaW4iLCJtYXBzTGluayIsInRhcmdldCIsImFwaSIsIkFwaUNsaWVudCIsIlZvbHVudGVlckZpbHRlcmVkU2VsZWN0Iiwib25DaGFuZ2UiLCJzZXRWb2x1bnRlZXJzIiwiZmV0Y2hWb2x1bnRlZXJzIiwicmVzb3VyY2VBY3Rpb24iLCJyZXNvdXJjZUlkIiwiYWN0aW9uTmFtZSIsInBlclBhZ2UiLCJyZWNvcmRzIiwibG9nIiwidiIsImxhYmVsIiwiaGFuZGxlQ2hhbmdlIiwic2VsZWN0ZWQiLCJzZWxlY3RlZE9wdGlvbiIsImZpbmQiLCJvcHQiLCJGb3JtR3JvdXAiLCJMYWJlbCIsInJlcXVpcmVkIiwiU2VsZWN0Iiwib3B0aW9ucyIsImlzTG9hZGluZyIsImlzQ2xlYXJhYmxlIiwicGxhY2Vob2xkZXIiLCJkZXNjcmlwdGlvbiIsIkZvcm1NZXNzYWdlIiwiU3RhdHVzRmlsdGVyZWRTZWxlY3QiLCJzZXRTdGF0dXMiLCJmZXRjaFN0YXR1cyIsIkRvbmF0aW9uUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0IiwiTG9naW5Db21wb25lbnQiLCJzZXRFbWFpbCIsInBhc3N3b3JkIiwic2V0UGFzc3dvcmQiLCJzZXRTdWNjZXNzIiwic2hvd1Bhc3N3b3JkIiwic2V0U2hvd1Bhc3N3b3JkIiwidHJhbnNsYXRlTWVzc2FnZSIsInVzZVRyYW5zbGF0aW9uIiwidmlldyIsInJlc2V0RW1haWwiLCJzZXRSZXNldEVtYWlsIiwib3RwIiwic2V0T3RwIiwibmV3UGFzc3dvcmQiLCJzZXROZXdQYXNzd29yZCIsInNob3dOZXdQYXNzd29yZCIsInNldFNob3dOZXdQYXNzd29yZCIsImhhbmRsZVN1Ym1pdCIsInByZXZlbnREZWZhdWx0IiwibWV0aG9kIiwiaGVhZGVycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjcmVkZW50aWFscyIsIm9rIiwibG9jYXRpb24iLCJyZWRpcmVjdFVybCIsImhhbmRsZUZvcmdvdFBhc3N3b3JkIiwiaGFuZGxlUmVzZXRQYXNzd29yZCIsInN3aXRjaFRvRm9yZ290UGFzc3dvcmQiLCJzd2l0Y2hUb0xvZ2luIiwicmVuZGVyRm9ybSIsIm9uU3VibWl0IiwiYmFja2dyb3VuZENvbG9yIiwiaHRtbEZvciIsIklucHV0IiwidHlwZSIsImRpc2FibGVkIiwiQnV0dG9uIiwidmFyaWFudCIsImN1cnNvciIsImFzIiwib25DbGljayIsIm1heExlbmd0aCIsImxldHRlclNwYWNpbmciLCJwYWRkaW5nUmlnaHQiLCJtYXJnaW5Cb3R0b20iLCJtYXJnaW5SaWdodCIsImZvbnRGYW1pbHkiLCJfIiwibWQiLCJhbHQiLCJvbkVycm9yIiwib3BhY2l0eSIsImJveFNoYWRvdyIsIkltYWdlQ29tcG9uZW50IiwicmF3SW1hZ2VVcmwiLCJoYXNFcnJvciIsInNldEhhc0Vycm9yIiwiaW1hZ2VVcmwiLCJzdGFydHNXaXRoIiwibWF4SGVpZ2h0Iiwib2JqZWN0Rml0IiwiSW1hZ2VMaXN0Q29tcG9uZW50IiwiaW1hZ2VzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJwb3AiLCJwdXNoIiwibm9ybWFsaXplVXJsIiwidXJsIiwiSW1hZ2VFZGl0Q29tcG9uZW50Iiwic2V0SW1hZ2VVcmwiLCJoYW5kbGVJbnB1dENoYW5nZSIsImV2ZW50IiwibmV3VmFsdWUiLCJJbWFnZUxpc3RFZGl0Q29tcG9uZW50IiwiZ2V0SW1hZ2VzIiwicGFyc2VJbnQiLCJpbWciLCJ1bmRlZmluZWQiLCJzZXRJbWFnZXMiLCJ1cGRhdGVSZWNvcmQiLCJuZXdJbWFnZXMiLCJoYW5kbGVBZGQiLCJoYW5kbGVSZW1vdmUiLCJzcGxpY2UiLCJmbGV4R3JvdyIsIkljb24iLCJpY29uIiwiQkFTRV9VUkwiLCJDcmVhdGVUYXNrRnJvbUFpZFJlcXVlc3QiLCJyZXNvdXJjZSIsImFkZE5vdGljZSIsInVzZU5vdGljZSIsInNlYXJjaFF1ZXJ5Iiwic2V0U2VhcmNoUXVlcnkiLCJmb3JtRGF0YSIsInNldEZvcm1EYXRhIiwidGFza05hbWUiLCJpc09wZW4iLCJzZWxlY3RlZFZvbHVudGVlcnMiLCJoYXNFeGlzdGluZ1Rhc2siLCJzZXRIYXNFeGlzdGluZ1Rhc2siLCJjaGVja0V4aXN0aW5nVGFzayIsInNraWxsIiwiYXNzaWduZWRWb2x1bnRlZXJzIiwiTWVzc2FnZUJveCIsIkgzIiwicHJldiIsIm1pbiIsIkNoZWNrQm94IiwiY2hlY2tlZCIsImlubGluZSIsIm1hcmdpbkxlZnQiLCJpc011bHRpIiwiaXNTZWFyY2hhYmxlIiwiaW5jbHVkZXMiLCJuZXdWYWx1ZXMiLCJBcnJheSIsImlzQXJyYXkiLCJzIiwiTWFwUGlja2VyIiwibWFya2VyUmVmIiwiZ2V0SW5pdGlhbFZhbHVlIiwicGF0aCIsInBhcnNlZExhdCIsInBhcnNlRmxvYXQiLCJwYXJzZWRMbmciLCJpbml0aWFsTGF0IiwiaW5pdGlhbExuZyIsImhhc0luaXRpYWxDb29yZHMiLCJzZXRQb3NpdGlvbiIsImFkZHJlc3NEYXRhIiwic2V0QWRkcmVzc0RhdGEiLCJhZGRyZXNzTGluZTEiLCJhZGRyZXNzTGluZTIiLCJhZGRyZXNzTGluZTMiLCJwaW5Db2RlIiwiY29vcmRpbmF0ZXMiLCJjbGVhblBpbiIsInN0clBpbiIsIlN0cmluZyIsInJlcGxhY2UiLCJoYXNWYWxpZENvb3JkaW5hdGVzIiwicGF5bG9hZCIsInVwZGF0ZUFkZHJlc3NGcm9tTm9taW5hdGltIiwiYWRkcmVzcyIsImxpbmUxIiwiYW1lbml0eSIsImJ1aWxkaW5nIiwicm9hZCIsInZpbGxhZ2UiLCJzdWJ1cmIiLCJ0b3duIiwiY2l0eSIsImRpc3BsYXlfbmFtZSIsImxpbmUyIiwic3RhdGVfZGlzdHJpY3QiLCJzdGF0ZSIsInBvc3Rjb2RlIiwicmV2ZXJzZUdlb2NvZGUiLCJsb2FkTGVhZmxldCIsImNoZWNrIiwidGhlbiIsIm9uIiwibGF0bG5nIiwibmV3UG9zIiwic2V0TGF0TG5nIiwibWFya2VyIiwiaXNJbml0aWFsTW91bnQiLCJoYW5kbGVTZWFyY2giLCJsb24iLCJlcnJvcnMiLCJyZWxldmFudEVycm9ycyIsImVudHJpZXMiLCJhY2MiLCJrIiwiekluZGV4IiwiTWFwU2hvdyIsImhhc0xvY2F0aW9uIiwiZHJhZ2dpbmciLCJkaXNhYmxlIiwidG91Y2hab29tIiwiZG91YmxlQ2xpY2tab29tIiwic2Nyb2xsV2hlZWxab29tIiwiYm94Wm9vbSIsImtleWJvYXJkIiwidGFwIiwiVGFza0xvY2F0aW9uU2hvdyIsImlzUGlja3VwIiwiaXNEZWxpdmVyeSIsImxvY2F0aW9uUHJlZml4IiwiYWRkcmVzc1ByZWZpeCIsImhhc0Nvb3JkaW5hdGVzIiwibGluZSIsImZvcm1hdHRlZEFkZHJlc3MiLCJtYXBzVXJsIiwiZ2V0TGFiZWwiLCJnZXRJY29uIiwiZ2V0Q29sb3IiLCJhY2NlbnQiLCJjb2xvcnMiLCJ6b29tQ29udHJvbCIsIm92ZXJmbG93Iiwib25Nb3VzZU92ZXIiLCJjdXJyZW50VGFyZ2V0Iiwib25Nb3VzZU91dCIsIlRhc2tMb2NhdGlvbkxpbmsiLCJnZXRTdHlsZSIsImJnQ29sb3IiLCJ0ZXh0Q29sb3IiLCJib3JkZXJDb2xvciIsIndoaXRlU3BhY2UiLCJOb3RpZmljYXRpb25Gb3JtIiwiaW5pdGlhbFJlY29yZCIsImFjdGlvbiIsInN1Ym1pdCIsInVzZVJlY29yZCIsImRlbGl2ZXJ5TW9kZSIsInNldERlbGl2ZXJ5TW9kZSIsInNldFVzZXJzIiwibG9hZGluZ1VzZXJzIiwic2V0TG9hZGluZ1VzZXJzIiwic2F2aW5nIiwic2V0U2F2aW5nIiwic2V0RXJyb3JzIiwibm90aWZpY2F0aW9uVHlwZXMiLCJhdWRpZW5jZU9wdGlvbnMiLCJsb2FkVXNlcnMiLCJyb2xlIiwiaW5pdGlhbGl6ZWRSZWYiLCJuZWVkc1R5cGVEZWZhdWx0IiwibmVlZHNUYXJnZXREZWZhdWx0IiwidGFyZ2V0VXNlclR5cGUiLCJoYW5kbGVEZWxpdmVyeU1vZGVDaGFuZ2UiLCJtb2RlIiwiY3VycmVudEF1ZGllbmNlIiwicmVjaXBpZW50SWQiLCJuZXdFcnJvcnMiLCJ0ZXN0IiwiZ2VuZXJhbCIsInN0eWxlcyIsImhlYWRlciIsImhlYWRlclRpdGxlIiwibWFyZ2luIiwiaGVhZGVyU3VidGl0bGUiLCJzZWN0aW9uIiwic2VjdGlvblRpdGxlIiwidG9nZ2xlQ29udGFpbmVyIiwidG9nZ2xlQnV0dG9uIiwiaXNBY3RpdmUiLCJ0b2dnbGVJY29uIiwic3VibWl0QnV0dG9uIiwiZXJyb3JCb3giLCJoaW50IiwiZnVsbFdpZHRoSW5wdXQiLCJUZXh0QXJlYSIsInJvd3MiLCJ0IiwiYSIsInUiLCJBZGRyZXNzU2hvdyIsImdldEZpZWxkVmFsdWUiLCJhbGlnblNlbGYiLCJUZXh0V3JhcENvbXBvbmVudCIsInRleHRPdmVyZmxvdyIsIkRlc2NyaXB0aW9uQ29tcG9uZW50Iiwid29yZFdyYXAiLCJsaW5lSGVpZ2h0IiwiV2Via2l0TGluZUNsYW1wIiwiV2Via2l0Qm94T3JpZW50IiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBR0EsTUFBTUEsb0JBQW9CLEdBQUdBLE1BQU07SUFDL0IsRUFBQSxNQUFNQyxlQUFlLEdBQUdDLFlBQU0sQ0FBQyxJQUFJLENBQUM7SUFDcEMsRUFBQSxNQUFNQyxjQUFjLEdBQUdELFlBQU0sQ0FBQyxJQUFJLENBQUM7SUFDbkMsRUFBQSxNQUFNRSxZQUFZLEdBQUdGLFlBQU0sQ0FBQyxJQUFJLENBQUM7TUFDakMsTUFBTSxDQUFDRyxPQUFPLEVBQUVDLFVBQVUsQ0FBQyxHQUFHQyxjQUFRLENBQUMsSUFBSSxDQUFDO01BQzVDLE1BQU0sQ0FBQ0MsS0FBSyxFQUFFQyxRQUFRLENBQUMsR0FBR0YsY0FBUSxDQUFDLElBQUksQ0FBQztNQUN4QyxNQUFNLENBQUNHLFNBQVMsRUFBRUMsWUFBWSxDQUFDLEdBQUdKLGNBQVEsQ0FBQyxDQUFDLENBQUM7TUFDN0MsTUFBTSxDQUFDSyxNQUFNLEVBQUVDLFNBQVMsQ0FBQyxHQUFHTixjQUFRLENBQUMsS0FBSyxDQUFDO0lBRTNDTyxFQUFBQSxlQUFTLENBQUMsTUFBTTtRQUNaLElBQUlDLFNBQVMsR0FBRyxJQUFJO0lBRXBCLElBQUEsTUFBTUMsYUFBYSxHQUFHLFlBQVk7SUFDOUI7SUFDQSxNQUFBLElBQUksQ0FBQ0MsUUFBUSxDQUFDQyxjQUFjLENBQUMsYUFBYSxDQUFDLEVBQUU7SUFDekMsUUFBQSxNQUFNQyxJQUFJLEdBQUdGLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLE1BQU0sQ0FBQztZQUMzQ0QsSUFBSSxDQUFDRSxFQUFFLEdBQUcsYUFBYTtZQUN2QkYsSUFBSSxDQUFDRyxHQUFHLEdBQUcsWUFBWTtZQUN2QkgsSUFBSSxDQUFDSSxJQUFJLEdBQUcsa0RBQWtEO0lBQzlETixRQUFBQSxRQUFRLENBQUNP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
