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
      yellow: '#f59e0b'};

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
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card"
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
      }, stats?.tasks?.open || 0), ' open')), /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card"
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
      }, stats?.aidRequests?.completed || 0), ' resolved')), /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-title"
      }, "\uD83D\uDCB0 Donation Requests"), /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-value"
      }, stats?.donationRequests?.total || 0), /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-subtitle"
      }, "Total amount: ", formatCurrency(stats?.donationRequests?.totalAmount || 0))), /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-title"
      }, "\uD83D\uDC65 Volunteers"), /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-value"
      }, stats?.users?.volunteers || 0), /*#__PURE__*/React__default.default.createElement("div", {
        className: "stat-card-subtitle"
      }, stats?.users?.total || 0, " total registered users"))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
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
      }, formatCurrency(stats.wallet.balance)), /*#__PURE__*/React__default.default.createElement("div", {
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
      }, /*#__PURE__*/React__default.default.createElement(HeatmapVisualization, null)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
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
        href: "/dashboard/resources/TaskSchema/actions/new",
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '14px 20px',
          background: COLORS.primary,
          borderRadius: '10px',
          border: 'none',
          textDecoration: 'none',
          color: 'white',
          fontWeight: '500'
        }
      }, "\u2795 Create New Task"), /*#__PURE__*/React__default.default.createElement("a", {
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
      }, "\uD83D\uDD14 Send Notification"))));
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

      // Initialize default values
      React.useEffect(() => {
        if (!record.params.type) {
          handleChange({
            params: {
              ...record.params,
              type: 'admin_broadcast'
            }
          });
        }
        if (!record.params.targetUserType) {
          handleChange({
            params: {
              ...record.params,
              targetUserType: 'all'
            }
          });
        }
      }, []);

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
        value: notificationTypes.find(t => t.value === record.params.type) || notificationTypes[0],
        options: notificationTypes,
        onChange: selected => handleChange({
          params: {
            ...record.params,
            type: selected.value
          }
        })
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
        value: audienceOptions.find(a => a.value === record.params.targetUserType) || audienceOptions[0],
        options: audienceOptions,
        onChange: selected => handleChange({
          params: {
            ...record.params,
            targetUserType: selected.value,
            recipientId: null
          }
        })
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
    AdminJS.UserComponents.HeatmapVisualization = HeatmapVisualization;
    AdminJS.UserComponents.NotificationForm = NotificationForm;
    AdminJS.UserComponents.AddressShow = AddressShow;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSGVhdG1hcFZpc3VhbGl6YXRpb24uanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0Rhc2hib2FyZC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTGlua0NvbXBvbmVudC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3QuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0FpZFJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0xvZ2luQ29tcG9uZW50LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUNvbXBvbmVudC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSW1hZ2VMaXN0Q29tcG9uZW50LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUVkaXRDb21wb25lbnQuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlTGlzdEVkaXRDb21wb25lbnQuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0NyZWF0ZVRhc2tGcm9tQWlkUmVxdWVzdC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTWFwUGlja2VyLmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9NYXBTaG93LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Ob3RpZmljYXRpb25Gb3JtLmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9BZGRyZXNzU2hvdy5qc3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIEg1LCBUZXh0LCBMb2FkZXIgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IEhlYXRtYXBWaXN1YWxpemF0aW9uID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbWFwQ29udGFpbmVyUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gICAgY29uc3QgbWFwSW5zdGFuY2VSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgICBjb25zdCBoZWF0TGF5ZXJSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgICBjb25zdCBbY2FzZUNvdW50LCBzZXRDYXNlQ291bnRdID0gdXNlU3RhdGUoMCk7XHJcbiAgICBjb25zdCBbbm9EYXRhLCBzZXROb0RhdGFdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGlzTW91bnRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGNvbnN0IGxvYWRMaWJyYXJpZXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIExvYWQgTGVhZmxldCBDU1NcclxuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVhZmxldC1jc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuICAgICAgICAgICAgICAgIGxpbmsuaWQgPSAnbGVhZmxldC1jc3MnO1xyXG4gICAgICAgICAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XHJcbiAgICAgICAgICAgICAgICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldEAxLjkuNC9kaXN0L2xlYWZsZXQuY3NzJztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIExvYWQgTGVhZmxldCBKU1xyXG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5MKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICAgICAgICAgIHNjcmlwdC5zcmMgPSAnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldEAxLjkuNC9kaXN0L2xlYWZsZXQuanMnO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5vbmxvYWQgPSByZXNvbHZlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5vbmVycm9yID0gcmVqZWN0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIExvYWQgTGVhZmxldC5oZWF0IHBsdWdpblxyXG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5MLmhlYXRMYXllcikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVhdFNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgICAgICAgICAgICAgaGVhdFNjcmlwdC5zcmMgPSAnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldC5oZWF0QDAuMi4wL2Rpc3QvbGVhZmxldC1oZWF0LmpzJztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaGVhdFNjcmlwdCk7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhdFNjcmlwdC5vbmxvYWQgPSByZXNvbHZlO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYXRTY3JpcHQub25lcnJvciA9IHJlamVjdDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93Lkw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgaW5pdE1hcCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IEwgPSBhd2FpdCBsb2FkTGlicmFyaWVzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRmV0Y2ggaGVhdG1hcCBkYXRhIGZyb20gQVBJXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL2Rhc2hib2FyZC9oZWF0bWFwJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdW50ZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gZmV0Y2ggaGVhdG1hcCBkYXRhJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVhdERhdGEgPSByZXN1bHQuZGF0YSB8fCBbXTtcclxuICAgICAgICAgICAgICAgIHNldENhc2VDb3VudChyZXN1bHQuY291bnQgfHwgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIHRvIHZhbGlkIGNvb3JkaW5hdGUgcG9pbnRzIG9ubHlcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkUG9pbnRzID0gaGVhdERhdGFcclxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGQgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgZC5sYXQgPT09ICdudW1iZXInICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBkLmxuZyA9PT0gJ251bWJlcicgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIWlzTmFOKGQubGF0KSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhaXNOYU4oZC5sbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoZCA9PiBbZC5sYXQsIGQubG5nLCBkLmludGVuc2l0eSB8fCAwLjVdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodmFsaWRQb2ludHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0Tm9EYXRhKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBXYWl0IGEgdGljayB0byBlbnN1cmUgY29udGFpbmVyIGlzIHJlbmRlcmVkXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdW50ZWQgfHwgIW1hcENvbnRhaW5lclJlZi5jdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgY29udGFpbmVyIGhhcyBkaW1lbnNpb25zXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBtYXBDb250YWluZXJSZWYuY3VycmVudDtcclxuICAgICAgICAgICAgICAgIGlmIChjb250YWluZXIub2Zmc2V0V2lkdGggPT09IDAgfHwgY29udGFpbmVyLm9mZnNldEhlaWdodCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFwIGNvbnRhaW5lciBoYXMgbm8gZGltZW5zaW9ucycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemUgbWFwXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXAgPSBMLm1hcChjb250YWluZXIpLnNldFZpZXcoWzEwLjg1MDUsIDc2LjI3MTFdLCA4KTtcclxuXHJcbiAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICfCqSBPcGVuU3RyZWV0TWFwIGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG1hcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIGhlYXRtYXAgbGF5ZXJcclxuICAgICAgICAgICAgICAgIGhlYXRMYXllclJlZi5jdXJyZW50ID0gTC5oZWF0TGF5ZXIodmFsaWRQb2ludHMsIHtcclxuICAgICAgICAgICAgICAgICAgICByYWRpdXM6IDI1LFxyXG4gICAgICAgICAgICAgICAgICAgIGJsdXI6IDE1LFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFpvb206IDE3LFxyXG4gICAgICAgICAgICAgICAgICAgIG1heDogMS4wLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbk9wYWNpdHk6IDAuMyxcclxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjI6ICcjM2I4MmY2JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC40OiAnIzEwYjk4MScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjogJyNmNTllMGInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjg6ICcjZWY0NDQ0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMS4wOiAnI2RjMjYyNidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUbyhtYXApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEZpdCBib3VuZHMgdG8gc2hvdyBhbGwgcG9pbnRzXHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKHZhbGlkUG9pbnRzLm1hcChwID0+IFtwWzBdLCBwWzFdXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChib3VuZHMuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcC5maXRCb3VuZHMoYm91bmRzLCB7IHBhZGRpbmc6IFs1MCwgNTBdIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NvdWxkIG5vdCBmaXQgYm91bmRzOicsIGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG1hcEluc3RhbmNlUmVmLmN1cnJlbnQgPSBtYXA7XHJcbiAgICAgICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW5pdGlhbGl6aW5nIGhlYXRtYXA6JywgZXJyKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc01vdW50ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRFcnJvcihlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpbml0TWFwKCk7XHJcblxyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlzTW91bnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAobWFwSW5zdGFuY2VSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgbWFwSW5zdGFuY2VSZWYuY3VycmVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIG1hcEluc3RhbmNlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0sIFtdKTtcclxuXHJcbiAgICAvLyBTaG93IG1lc3NhZ2UgaWYgbm8gZGF0YVxyXG4gICAgaWYgKG5vRGF0YSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxCb3ggbXQ9XCJ4eGxcIj5cclxuICAgICAgICAgICAgICAgIDxINSBtYj1cImRlZmF1bHRcIj7wn5SlIEFjdGl2ZSBDYXNlcyBIZWF0bWFwPC9INT5cclxuICAgICAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgICAgICBiZz1cIndoaXRlXCJcclxuICAgICAgICAgICAgICAgICAgICBwPVwieGxcIlxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcj1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcclxuICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcclxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiMjAwcHhcIlxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCI+Tm8gYWN0aXZlIGNhc2VzIHdpdGggbG9jYXRpb24gZGF0YSBhdmFpbGFibGU8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxCb3ggbXQ9XCJ4eGxcIj5cclxuICAgICAgICAgICAgPEg1IG1iPVwiZGVmYXVsdFwiPvCflKUgQWN0aXZlIENhc2VzIEhlYXRtYXA8L0g1PlxyXG4gICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICBiZz1cIndoaXRlXCJcclxuICAgICAgICAgICAgICAgIHA9XCJsZ1wiXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgICAgIGJvcmRlcj1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb249XCJyZWxhdGl2ZVwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHsvKiBNYXAgY29udGFpbmVyIC0gYWx3YXlzIHJlbmRlciBidXQgb3ZlcmxheSBsb2FkZXIgKi99XHJcbiAgICAgICAgICAgICAgICA8Qm94IGhlaWdodD1cIjQwMHB4XCIgcG9zaXRpb249XCJyZWxhdGl2ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXttYXBDb250YWluZXJSZWZ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBsb2FkaW5nID8gJ2hpZGRlbicgOiAndmlzaWJsZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7bG9hZGluZyAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uPVwiYWJzb2x1dGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wPVwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0PVwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodD1cIjBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tPVwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5PVwiZmxleFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnPVwid2hpdGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TG9hZGVyIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHtlcnJvciAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uPVwiYWJzb2x1dGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wPVwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0PVwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodD1cIjBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tPVwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5PVwiZmxleFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnPVwid2hpdGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjb2xvcj1cImVycm9yXCI+RXJyb3I6IHtlcnJvcn08L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICAgICAgICB7IWxvYWRpbmcgJiYgIWVycm9yICYmIChcclxuICAgICAgICAgICAgICAgICAgICA8Qm94IG10PVwiZGVmYXVsdFwiIGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCIgYWxpZ25JdGVtcz1cImNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjb2xvcj1cImdyZXk2MFwiIGZvbnRTaXplPVwic21cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNob3dpbmcge2Nhc2VDb3VudH0gYWN0aXZlIGNhc2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGdhcD1cImRlZmF1bHRcIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgYWxpZ25JdGVtcz1cImNlbnRlclwiIGdhcD1cInNtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJveCB3aWR0aD1cIjEycHhcIiBoZWlnaHQ9XCIxMnB4XCIgYmc9XCIjM2I4MmY2XCIgYm9yZGVyUmFkaXVzPVwiNTAlXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBmb250U2l6ZT1cInNtXCI+TG93PC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgYWxpZ25JdGVtcz1cImNlbnRlclwiIGdhcD1cInNtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJveCB3aWR0aD1cIjEycHhcIiBoZWlnaHQ9XCIxMnB4XCIgYmc9XCIjZjU5ZTBiXCIgYm9yZGVyUmFkaXVzPVwiNTAlXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBmb250U2l6ZT1cInNtXCI+TWVkaXVtPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgYWxpZ25JdGVtcz1cImNlbnRlclwiIGdhcD1cInNtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJveCB3aWR0aD1cIjEycHhcIiBoZWlnaHQ9XCIxMnB4XCIgYmc9XCIjZWY0NDQ0XCIgYm9yZGVyUmFkaXVzPVwiNTAlXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBmb250U2l6ZT1cInNtXCI+SGlnaDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlYXRtYXBWaXN1YWxpemF0aW9uO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIExvYWRlciB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyB1c2VDdXJyZW50QWRtaW4gfSBmcm9tICdhZG1pbmpzJztcclxuaW1wb3J0IEhlYXRtYXBWaXN1YWxpemF0aW9uIGZyb20gJy4vSGVhdG1hcFZpc3VhbGl6YXRpb24uanN4JztcclxuXHJcbi8vIENvbG9yIGNvbnN0YW50cyBtYXRjaGluZyBDU1MgZGVzaWduIHN5c3RlbVxyXG5jb25zdCBDT0xPUlMgPSB7XHJcbiAgcHJpbWFyeTogJyMyNTYzZWInLFxyXG4gIHB1cnBsZTogJyM4YjVjZjYnLFxyXG4gIGN5YW46ICcjMDZiNmQ0JyxcclxuICBncmVlbjogJyMxMGI5ODEnLFxyXG4gIHJlZDogJyNlZjQ0NDQnLFxyXG4gIHllbGxvdzogJyNmNTllMGInLFxyXG4gIGdyYXk6ICcjOTRhM2I4JyxcclxufTtcclxuXHJcbi8vIEZvcm1hdCByZWxhdGl2ZSB0aW1lXHJcbmNvbnN0IGZvcm1hdFJlbGF0aXZlVGltZSA9IChkYXRlU3RyaW5nKSA9PiB7XHJcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xyXG4gIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgY29uc3QgZGlmZk1zID0gbm93IC0gZGF0ZTtcclxuICBjb25zdCBkaWZmTWlucyA9IE1hdGguZmxvb3IoZGlmZk1zIC8gNjAwMDApO1xyXG4gIGNvbnN0IGRpZmZIb3VycyA9IE1hdGguZmxvb3IoZGlmZk1zIC8gMzYwMDAwMCk7XHJcbiAgY29uc3QgZGlmZkRheXMgPSBNYXRoLmZsb29yKGRpZmZNcyAvIDg2NDAwMDAwKTtcclxuXHJcbiAgaWYgKGRpZmZNaW5zIDwgNjApIHJldHVybiBgJHtkaWZmTWluc30gbWluIGFnb2A7XHJcbiAgaWYgKGRpZmZIb3VycyA8IDI0KSByZXR1cm4gYCR7ZGlmZkhvdXJzfSBob3VycyBhZ29gO1xyXG4gIHJldHVybiBgJHtkaWZmRGF5c30gZGF5cyBhZ29gO1xyXG59O1xyXG5cclxuLy8gRm9ybWF0IGN1cnJlbmN5XHJcbmNvbnN0IGZvcm1hdEN1cnJlbmN5ID0gKGFtb3VudCkgPT4ge1xyXG4gIGlmIChhbW91bnQgPj0gMTAwMDAwKSByZXR1cm4gYOKCuSR7KGFtb3VudCAvIDEwMDAwMCkudG9GaXhlZCgxKX1MYDtcclxuICBpZiAoYW1vdW50ID49IDEwMDApIHJldHVybiBg4oK5JHsoYW1vdW50IC8gMTAwMCkudG9GaXhlZCgxKX1LYDtcclxuICByZXR1cm4gYOKCuSR7YW1vdW50fWA7XHJcbn07XHJcblxyXG4vLyBTaW1wbGUgRG9udXQgQ2hhcnQgY29tcG9uZW50IChTVkctYmFzZWQsIG5vIGV4dGVybmFsIGRlcHMpXHJcbmNvbnN0IERvbnV0Q2hhcnQgPSAoeyBkYXRhLCBzaXplID0gMTgwLCB0aGlja25lc3MgPSAzMCB9KSA9PiB7XHJcbiAgY29uc3QgdG90YWwgPSBkYXRhLnJlZHVjZSgoc3VtLCBpdGVtKSA9PiBzdW0gKyBpdGVtLnZhbHVlLCAwKTtcclxuICBpZiAodG90YWwgPT09IDApIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCByYWRpdXMgPSAoc2l6ZSAtIHRoaWNrbmVzcykgLyAyO1xyXG4gIGNvbnN0IGNpcmN1bWZlcmVuY2UgPSAyICogTWF0aC5QSSAqIHJhZGl1cztcclxuICBsZXQgY3VycmVudE9mZnNldCA9IDA7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzI0cHgnIH19PlxyXG4gICAgICA8c3ZnIHdpZHRoPXtzaXplfSBoZWlnaHQ9e3NpemV9IHZpZXdCb3g9e2AwIDAgJHtzaXplfSAke3NpemV9YH0+XHJcbiAgICAgICAgPGNpcmNsZVxyXG4gICAgICAgICAgY3g9e3NpemUgLyAyfVxyXG4gICAgICAgICAgY3k9e3NpemUgLyAyfVxyXG4gICAgICAgICAgcj17cmFkaXVzfVxyXG4gICAgICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICAgICAgc3Ryb2tlPVwiI2UyZThmMFwiXHJcbiAgICAgICAgICBzdHJva2VXaWR0aD17dGhpY2tuZXNzfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAge2RhdGEubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IGl0ZW0udmFsdWUgLyB0b3RhbDtcclxuICAgICAgICAgIGNvbnN0IHN0cm9rZURhc2hhcnJheSA9IGAke3BlcmNlbnRhZ2UgKiBjaXJjdW1mZXJlbmNlfSAke2NpcmN1bWZlcmVuY2V9YDtcclxuICAgICAgICAgIGNvbnN0IHN0cm9rZURhc2hvZmZzZXQgPSAtY3VycmVudE9mZnNldDtcclxuICAgICAgICAgIGN1cnJlbnRPZmZzZXQgKz0gcGVyY2VudGFnZSAqIGNpcmN1bWZlcmVuY2U7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGNpcmNsZVxyXG4gICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgY3g9e3NpemUgLyAyfVxyXG4gICAgICAgICAgICAgIGN5PXtzaXplIC8gMn1cclxuICAgICAgICAgICAgICByPXtyYWRpdXN9XHJcbiAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICAgICAgICAgIHN0cm9rZT17aXRlbS5jb2xvcn1cclxuICAgICAgICAgICAgICBzdHJva2VXaWR0aD17dGhpY2tuZXNzfVxyXG4gICAgICAgICAgICAgIHN0cm9rZURhc2hhcnJheT17c3Ryb2tlRGFzaGFycmF5fVxyXG4gICAgICAgICAgICAgIHN0cm9rZURhc2hvZmZzZXQ9e3N0cm9rZURhc2hvZmZzZXR9XHJcbiAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcclxuICAgICAgICAgICAgICB0cmFuc2Zvcm09e2Byb3RhdGUoLTkwICR7c2l6ZSAvIDJ9ICR7c2l6ZSAvIDJ9KWB9XHJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgdHJhbnNpdGlvbjogJ3N0cm9rZS1kYXNoYXJyYXkgMC41cyBlYXNlJyB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KX1cclxuICAgICAgICA8dGV4dFxyXG4gICAgICAgICAgeD17c2l6ZSAvIDJ9XHJcbiAgICAgICAgICB5PXtzaXplIC8gMiAtIDh9XHJcbiAgICAgICAgICB0ZXh0QW5jaG9yPVwibWlkZGxlXCJcclxuICAgICAgICAgIGZvbnRTaXplPVwiMjRcIlxyXG4gICAgICAgICAgZm9udFdlaWdodD1cIjcwMFwiXHJcbiAgICAgICAgICBmaWxsPVwiIzFlMjkzYlwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge3RvdGFsfVxyXG4gICAgICAgIDwvdGV4dD5cclxuICAgICAgICA8dGV4dFxyXG4gICAgICAgICAgeD17c2l6ZSAvIDJ9XHJcbiAgICAgICAgICB5PXtzaXplIC8gMiArIDE0fVxyXG4gICAgICAgICAgdGV4dEFuY2hvcj1cIm1pZGRsZVwiXHJcbiAgICAgICAgICBmb250U2l6ZT1cIjEyXCJcclxuICAgICAgICAgIGZpbGw9XCIjNjQ3NDhiXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICBUb3RhbFxyXG4gICAgICAgIDwvdGV4dD5cclxuICAgICAgPC9zdmc+XHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnOHB4JyB9fT5cclxuICAgICAgICB7ZGF0YS5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICA8ZGl2IGtleT17aW5kZXh9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzhweCcgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMnB4JywgaGVpZ2h0OiAnMTJweCcsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmQ6IGl0ZW0uY29sb3IgfX0gLz5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxM3B4JywgY29sb3I6ICcjNjQ3NDhiJyB9fT5cclxuICAgICAgICAgICAgICB7aXRlbS5uYW1lfTogPHN0cm9uZyBzdHlsZT17eyBjb2xvcjogJyMxZTI5M2InIH19PntpdGVtLnZhbHVlfTwvc3Ryb25nPiAoeygoaXRlbS52YWx1ZSAvIHRvdGFsKSAqIDEwMCkudG9GaXhlZCgwKX0lKVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gU2ltcGxlIEJhciBDaGFydCBjb21wb25lbnQgKENTUy1iYXNlZClcclxuY29uc3QgQmFyQ2hhcnQgPSAoeyBkYXRhLCBoZWlnaHQgPSAyMDAgfSkgPT4ge1xyXG4gIGNvbnN0IG1heFZhbHVlID0gTWF0aC5tYXgoLi4uZGF0YS5mbGF0TWFwKGQgPT4gW2QudGFza3MsIGQuYWlkUmVxdWVzdHNdKSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodCwgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnZmxleC1lbmQnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWFyb3VuZCcsIGdhcDogJzhweCcsIHBhZGRpbmdCb3R0b206ICczMHB4JywgcG9zaXRpb246ICdyZWxhdGl2ZScgfX0+XHJcbiAgICAgIHsvKiBZLWF4aXMgbGluZSAqL31cclxuICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogMCwgdG9wOiAwLCBib3R0b206ICczMHB4Jywgd2lkdGg6ICcxcHgnLCBiYWNrZ3JvdW5kOiAnI2UyZThmMCcgfX0gLz5cclxuXHJcbiAgICAgIHtkYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcclxuICAgICAgICA8ZGl2IGtleT17aW5kZXh9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4OiAxLCBtYXhXaWR0aDogJzgwcHgnIH19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGhlaWdodDogYCR7aGVpZ2h0IC0gMzB9cHhgLCBhbGlnbkl0ZW1zOiAnZmxleC1lbmQnIH19PlxyXG4gICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMjBweCcsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke21heFZhbHVlID8gKGl0ZW0udGFza3MgLyBtYXhWYWx1ZSkgKiAxMDAgOiAwfSVgLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogQ09MT1JTLnByaW1hcnksXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHggNHB4IDAgMCcsXHJcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6IGl0ZW0udGFza3MgPiAwID8gJzRweCcgOiAnMCcsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnaGVpZ2h0IDAuM3MgZWFzZScsXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICB0aXRsZT17YFRhc2tzOiAke2l0ZW0udGFza3N9YH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJzIwcHgnLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBgJHttYXhWYWx1ZSA/IChpdGVtLmFpZFJlcXVlc3RzIC8gbWF4VmFsdWUpICogMTAwIDogMH0lYCxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IENPTE9SUy5wdXJwbGUsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHggNHB4IDAgMCcsXHJcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6IGl0ZW0uYWlkUmVxdWVzdHMgPiAwID8gJzRweCcgOiAnMCcsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnaGVpZ2h0IDAuM3MgZWFzZScsXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICB0aXRsZT17YEFpZCBSZXF1ZXN0czogJHtpdGVtLmFpZFJlcXVlc3RzfWB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAnIzY0NzQ4YicsIG1hcmdpblRvcDogJzhweCcgfX0+e2l0ZW0ubW9udGh9PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBEYXNoYm9hcmQgPSAoKSA9PiB7XHJcbiAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbc3RhdHMsIHNldFN0YXRzXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBmZXRjaFN0YXRzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9kYXNoYm9hcmQvc3RhdHMnKTtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICBzZXRTdGF0cyhkYXRhLmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZXRFcnJvcignRmFpbGVkIHRvIGxvYWQgZGFzaGJvYXJkIGRhdGEnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Rhc2hib2FyZCBmZXRjaCBlcnJvcjonLCBlcnIpO1xyXG4gICAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gY29ubmVjdCB0byBzZXJ2ZXInKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBmZXRjaFN0YXRzKCk7XHJcbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZldGNoU3RhdHMsIDMwMDAwMCk7XHJcbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBpZiAobG9hZGluZykge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCIgYWxpZ25JdGVtcz1cImNlbnRlclwiIGhlaWdodD1cIjQwMHB4XCI+XHJcbiAgICAgICAgPExvYWRlciAvPlxyXG4gICAgICA8L0JveD5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBpZiAoZXJyb3IpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxCb3ggcD1cInh4bFwiIHRleHRBbGlnbj1cImNlbnRlclwiPlxyXG4gICAgICAgIDxUZXh0IGNvbG9yPVwiZGFuZ2VyXCI+e2Vycm9yfTwvVGV4dD5cclxuICAgICAgPC9Cb3g+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8gVGFzayBzdGF0dXMgZGF0YSBmb3IgZG9udXRcclxuICBjb25zdCB0YXNrU3RhdHVzRGF0YSA9IFtcclxuICAgIHsgbmFtZTogJ0NvbXBsZXRlZCcsIHZhbHVlOiBzdGF0cz8udGFza3M/LmNvbXBsZXRlZCB8fCAwLCBjb2xvcjogQ09MT1JTLmdyZWVuIH0sXHJcbiAgICB7IG5hbWU6ICdPcGVuJywgdmFsdWU6IHN0YXRzPy50YXNrcz8ub3BlbiB8fCAwLCBjb2xvcjogQ09MT1JTLmN5YW4gfSxcclxuICAgIHsgbmFtZTogJ0Fzc2lnbmVkJywgdmFsdWU6IHN0YXRzPy50YXNrcz8uYXNzaWduZWQgfHwgMCwgY29sb3I6IENPTE9SUy5wdXJwbGUgfSxcclxuICAgIHsgbmFtZTogJ0FjY2VwdGVkJywgdmFsdWU6IHN0YXRzPy50YXNrcz8uYWNjZXB0ZWQgfHwgMCwgY29sb3I6IENPTE9SUy5vcmFuZ2UgfSxcclxuICBdLmZpbHRlcigoZCkgPT4gZC52YWx1ZSA+IDApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJkYXNoYm9hcmQtY29udGFpbmVyIGFuaW1hdGUtZmFkZS1pblwiPlxyXG4gICAgICB7LyogV2VsY29tZSBIZWFkZXIgKi99XHJcbiAgICAgIDxCb3ggbWI9XCJ4bFwiPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgZ2FwOiAnMTZweCcgfX0+XHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8SDI+V2VsY29tZSBiYWNrLCB7Y3VycmVudEFkbWluPy5lbWFpbD8uc3BsaXQoJ0AnKVswXSB8fCAnQWRtaW4nfSE8L0gyPlxyXG4gICAgICAgICAgICA8VGV4dCBjb2xvcj1cImdyZXk2MFwiIG10PVwic21cIj5cclxuICAgICAgICAgICAgICBIZXJlJ3MgYW4gb3ZlcnZpZXcgb2YgeW91ciBSZWxpZWYgTWFuYWdlbWVudCBTeXN0ZW1cclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8VGV4dCBjb2xvcj1cImdyZXk0MFwiIGZvbnRTaXplPVwic21cIj5cclxuICAgICAgICAgICAgTGFzdCB1cGRhdGVkOiB7bmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKX1cclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICB7LyogU3RhdHMgQ2FyZHMgUm93ICovfVxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZHMtcm93XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC1jYXJkLXRpdGxlXCI+8J+TiyBUb3RhbCBUYXNrczwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmQtdmFsdWVcIj57c3RhdHM/LnRhc2tzPy50b3RhbCB8fCAwfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmQtc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IENPTE9SUy5ncmVlbiB9fT7inJMge3N0YXRzPy50YXNrcz8uY29tcGxldGVkIHx8IDB9PC9zcGFuPlxyXG4gICAgICAgICAgICB7JyBjb21wbGV0ZWQg4oCiICd9XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiBDT0xPUlMuY3lhbiB9fT57c3RhdHM/LnRhc2tzPy5vcGVuIHx8IDB9PC9zcGFuPlxyXG4gICAgICAgICAgICB7JyBvcGVuJ31cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmQtdGl0bGVcIj7wn4aYIEFpZCBSZXF1ZXN0czwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmQtdmFsdWVcIj57c3RhdHM/LmFpZFJlcXVlc3RzPy50b3RhbCB8fCAwfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmQtc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IENPTE9SUy55ZWxsb3cgfX0+e3N0YXRzPy5haWRSZXF1ZXN0cz8ucGVuZGluZyB8fCAwfTwvc3Bhbj5cclxuICAgICAgICAgICAgeycgcGVuZGluZyDigKIgJ31cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IENPTE9SUy5ncmVlbiB9fT57c3RhdHM/LmFpZFJlcXVlc3RzPy5jb21wbGV0ZWQgfHwgMH08L3NwYW4+XHJcbiAgICAgICAgICAgIHsnIHJlc29sdmVkJ31cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmQtdGl0bGVcIj7wn5KwIERvbmF0aW9uIFJlcXVlc3RzPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZC12YWx1ZVwiPntzdGF0cz8uZG9uYXRpb25SZXF1ZXN0cz8udG90YWwgfHwgMH08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC1jYXJkLXN1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgIFRvdGFsIGFtb3VudDoge2Zvcm1hdEN1cnJlbmN5KHN0YXRzPy5kb25hdGlvblJlcXVlc3RzPy50b3RhbEFtb3VudCB8fCAwKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmQtdGl0bGVcIj7wn5GlIFZvbHVudGVlcnM8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC1jYXJkLXZhbHVlXCI+e3N0YXRzPy51c2Vycz8udm9sdW50ZWVycyB8fCAwfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmQtc3VidGl0bGVcIj5cclxuICAgICAgICAgICAge3N0YXRzPy51c2Vycz8udG90YWwgfHwgMH0gdG90YWwgcmVnaXN0ZXJlZCB1c2Vyc1xyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgey8qIFJlY2VudCBBY3Rpdml0eSBDYXJkcyAqL31cclxuICAgICAgPEJveCBtYj1cInhsXCI+XHJcbiAgICAgICAgPEg1IG1iPVwibGdcIj5SZWNlbnQgQWN0aXZpdHk8L0g1PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2dyaWQnLCBncmlkVGVtcGxhdGVDb2x1bW5zOiAncmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjYwcHgsIDFmcikpJywgZ2FwOiAnMTZweCcgfX0+XHJcbiAgICAgICAgICB7c3RhdHM/LnJlY2VudFRhc2tzPy5zbGljZSgwLCA0KS5tYXAoKHRhc2ssIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAga2V5PXt0YXNrLmlkIHx8IGluZGV4fVxyXG4gICAgICAgICAgICAgIGhyZWY9e2AvZGFzaGJvYXJkL3Jlc291cmNlcy9UYXNrU2NoZW1hL3JlY29yZHMvJHt0YXNrLmlkfS9zaG93YH1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJxdWljay1hY3Rpb24tY2FyZFwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtdGltZVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+4o+xPC9zcGFuPiB7Zm9ybWF0UmVsYXRpdmVUaW1lKHRhc2suY3JlYXRlZEF0KX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtdGl0bGVcIj57dGFzay5uYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHN0YXR1cy1iYWRnZSAke3Rhc2suc3RhdHVzfWB9Pnt0YXNrLnN0YXR1c308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Bwcmlvcml0eS1iYWRnZSAke3Rhc2sucHJpb3JpdHl9YH0+e3Rhc2sucHJpb3JpdHl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAg8J+RpSB7dGFzay52b2x1bnRlZXJzfS97dGFzay52b2x1bnRlZXJzTmVlZGVkfSB2b2x1bnRlZXJzXHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L0JveD5cclxuXHJcbiAgICAgIHsvKiBDaGFydHMgUm93ICovfVxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXJ0cy1yb3dcIj5cclxuICAgICAgICB7LyogVGFzayBQcm9ncmVzcyBEb251dCAqL31cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXJ0LWNhcmRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhcnQtY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC1jYXJkLXRpdGxlXCI+VGFzayBQcm9ncmVzczwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcyMHB4JywgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgIHt0YXNrU3RhdHVzRGF0YS5sZW5ndGggPiAwID8gKFxyXG4gICAgICAgICAgICAgIDxEb251dENoYXJ0IGRhdGE9e3Rhc2tTdGF0dXNEYXRhfSAvPlxyXG4gICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCIgdGV4dEFsaWduPVwiY2VudGVyXCI+Tm8gdGFzayBkYXRhIGF2YWlsYWJsZTwvVGV4dD5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7LyogTW9udGhseSBTdGF0aXN0aWNzIEJhciBDaGFydCAqL31cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXJ0LWNhcmRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhcnQtY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC1jYXJkLXRpdGxlXCI+TW9udGhseSBTdGF0aXN0aWNzPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxNnB4JyB9fT5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzZweCcgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTJweCcsIGhlaWdodDogJzEycHgnLCBib3JkZXJSYWRpdXM6ICcycHgnLCBiYWNrZ3JvdW5kOiBDT0xPUlMucHJpbWFyeSB9fSAvPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICcjNjQ3NDhiJyB9fT5UYXNrczwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzZweCcgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTJweCcsIGhlaWdodDogJzEycHgnLCBib3JkZXJSYWRpdXM6ICcycHgnLCBiYWNrZ3JvdW5kOiBDT0xPUlMucHVycGxlIH19IC8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJyM2NDc0OGInIH19PkFpZCBSZXF1ZXN0czwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzIwcHggMTBweCcgfX0+XHJcbiAgICAgICAgICAgIHtzdGF0cz8ubW9udGhseVN0YXRzPy5sZW5ndGggPiAwID8gKFxyXG4gICAgICAgICAgICAgIDxCYXJDaGFydCBkYXRhPXtzdGF0cy5tb250aGx5U3RhdHN9IGhlaWdodD17MTgwfSAvPlxyXG4gICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCIgdGV4dEFsaWduPVwiY2VudGVyXCI+Tm8gbW9udGhseSBkYXRhIGF2YWlsYWJsZTwvVGV4dD5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHsvKiBJbmZvIFdpZGdldHMgUm93ICovfVxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImluZm8td2lkZ2V0cy1yb3dcIj5cclxuICAgICAgICB7LyogUmVsaWVmIENlbnRlcnMgKi99XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC1jYXJkXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXJ0LWNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhcnQtY2FyZC10aXRsZVwiPvCfj6IgUmVsaWVmIENlbnRlcnM8L2Rpdj5cclxuICAgICAgICAgICAgPGEgaHJlZj1cIi9kYXNoYm9hcmQvcmVzb3VyY2VzL1JlbGllZkNlbnRlclwiIHN0eWxlPXt7IGNvbG9yOiBDT0xPUlMucHJpbWFyeSwgZm9udFNpemU6ICcxNHB4JywgdGV4dERlY29yYXRpb246ICdub25lJyB9fT5cclxuICAgICAgICAgICAgICBWaWV3IEFsbCDihpJcclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICB7c3RhdHM/LnJlbGllZkNlbnRlcnM/Lmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICAgIHN0YXRzLnJlbGllZkNlbnRlcnMubWFwKChjZW50ZXIsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2NlbnRlci5pZCB8fCBpbmRleH0gY2xhc3NOYW1lPVwicmVsaWVmLWNlbnRlci1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGllZi1jZW50ZXItaWNvblwiPvCfj6A8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsaWVmLWNlbnRlci1pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsaWVmLWNlbnRlci1uYW1lXCI+e2NlbnRlci5uYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGllZi1jZW50ZXItY29vcmRpbmF0b3JcIj5cclxuICAgICAgICAgICAgICAgICAgICDwn5OeIHtjZW50ZXIuY29vcmRpbmF0b3J9XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8VGV4dCBjb2xvcj1cImdyZXk2MFwiIHRleHRBbGlnbj1cImNlbnRlclwiIHA9XCJsZ1wiPk5vIHJlbGllZiBjZW50ZXJzIHJlZ2lzdGVyZWQ8L1RleHQ+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7LyogUmVsaWVmIEZ1bmQgV2FsbGV0ICovfVxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhcnQtY2FyZFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC1jYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXJ0LWNhcmQtdGl0bGVcIj7wn5KzIFJlbGllZiBGdW5kIFdhbGxldDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICB7c3RhdHM/LndhbGxldCA/IChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhbGxldC1iYWxhbmNlXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhbGxldC1hbW91bnRcIj57Zm9ybWF0Q3VycmVuY3koc3RhdHMud2FsbGV0LmJhbGFuY2UpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YWxsZXQtbGFiZWxcIj5DdXJyZW50IEJhbGFuY2U8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhbGxldC1zdGF0c1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YWxsZXQtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhbGxldC1zdGF0LXZhbHVlXCIgc3R5bGU9e3sgY29sb3I6IENPTE9SUy5ncmVlbiB9fT5cclxuICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0Q3VycmVuY3koc3RhdHMud2FsbGV0LnRvdGFsQ3JlZGl0cyl9XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhbGxldC1zdGF0LWxhYmVsXCI+Q3JlZGl0czwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhbGxldC1zdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2FsbGV0LXN0YXQtdmFsdWVcIiBzdHlsZT17eyBjb2xvcjogQ09MT1JTLnJlZCB9fT5cclxuICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0Q3VycmVuY3koc3RhdHMud2FsbGV0LnRvdGFsRGViaXRzKX1cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2FsbGV0LXN0YXQtbGFiZWxcIj5EZWJpdHM8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YWxsZXQtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhbGxldC1zdGF0LXZhbHVlXCIgc3R5bGU9e3sgY29sb3I6IENPTE9SUy5wdXJwbGUgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAge3N0YXRzLndhbGxldC5kb25vckNvdW50fVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YWxsZXQtc3RhdC1sYWJlbFwiPkRvbm9yczwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NjBcIiB0ZXh0QWxpZ249XCJjZW50ZXJcIiBwPVwibGdcIj5XYWxsZXQgbm90IGluaXRpYWxpemVkPC9UZXh0PlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgey8qIFByaW9yaXR5IERpc3RyaWJ1dGlvbiAqL31cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXJ0LWNhcmRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhcnQtY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC1jYXJkLXRpdGxlXCI+8J+OryBBY3RpdmUgUHJpb3JpdGllczwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICc4cHggMCcgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgcGFkZGluZzogJzEycHggMCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCAjZTJlOGYwJyB9fT5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzEwcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwcHgnLCBoZWlnaHQ6ICcxMHB4JywgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogQ09MT1JTLnJlZCB9fSAvPlxyXG4gICAgICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD1cIjUwMFwiPkhpZ2ggUHJpb3JpdHk8L1RleHQ+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogJzYwMCcsIGNvbG9yOiBDT0xPUlMucmVkLCBmb250U2l6ZTogJzE4cHgnIH19PntzdGF0cz8ucHJpb3JpdGllcz8uaGlnaCB8fCAwfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgcGFkZGluZzogJzEycHggMCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCAjZTJlOGYwJyB9fT5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzEwcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwcHgnLCBoZWlnaHQ6ICcxMHB4JywgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogQ09MT1JTLnllbGxvdyB9fSAvPlxyXG4gICAgICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD1cIjUwMFwiPk1lZGl1bSBQcmlvcml0eTwvVGV4dD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiAnNjAwJywgY29sb3I6IENPTE9SUy55ZWxsb3csIGZvbnRTaXplOiAnMThweCcgfX0+e3N0YXRzPy5wcmlvcml0aWVzPy5tZWRpdW0gfHwgMH08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIHBhZGRpbmc6ICcxMnB4IDAnIH19PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnMTBweCcgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTBweCcsIGhlaWdodDogJzEwcHgnLCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiBDT0xPUlMuZ3JlZW4gfX0gLz5cclxuICAgICAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCI1MDBcIj5Mb3cgUHJpb3JpdHk8L1RleHQ+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogJzYwMCcsIGNvbG9yOiBDT0xPUlMuZ3JlZW4sIGZvbnRTaXplOiAnMThweCcgfX0+e3N0YXRzPy5wcmlvcml0aWVzPy5sb3cgfHwgMH08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgey8qIEhlYXRtYXAgU2VjdGlvbiAqL31cclxuICAgICAgPEJveCBtdD1cInhsXCI+XHJcbiAgICAgICAgPEhlYXRtYXBWaXN1YWxpemF0aW9uIC8+XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgey8qIFF1aWNrIEFjdGlvbnMgKi99XHJcbiAgICAgIDxCb3ggbXQ9XCJ4bFwiPlxyXG4gICAgICAgIDxINSBtYj1cImxnXCI+UXVpY2sgQWN0aW9uczwvSDU+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEycHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxyXG4gICAgICAgICAgPGEgaHJlZj1cIi9kYXNoYm9hcmQvcmVzb3VyY2VzL0FpZFJlcXVlc3RcIiBjbGFzc05hbWU9XCJxdWljay1hY3Rpb24tY2FyZFwiIHN0eWxlPXt7IHBhZGRpbmc6ICcxNHB4IDIwcHgnLCBmbGV4RGlyZWN0aW9uOiAncm93JywgZ2FwOiAnMTBweCcgfX0+XHJcbiAgICAgICAgICAgIPCfk4sgVmlldyBBaWQgUmVxdWVzdHNcclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgIGhyZWY9XCIvZGFzaGJvYXJkL3Jlc291cmNlcy9UYXNrU2NoZW1hL2FjdGlvbnMvbmV3XCJcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxyXG4gICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgIGdhcDogJzhweCcsXHJcbiAgICAgICAgICAgICAgcGFkZGluZzogJzE0cHggMjBweCcsXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogQ09MT1JTLnByaW1hcnksXHJcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTBweCcsXHJcbiAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgdGV4dERlY29yYXRpb246ICdub25lJyxcclxuICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcclxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnNTAwJyxcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAg4p6VIENyZWF0ZSBOZXcgVGFza1xyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIi9kYXNoYm9hcmQvcmVzb3VyY2VzL3VzZXJQcm9maWxlXCIgY2xhc3NOYW1lPVwicXVpY2stYWN0aW9uLWNhcmRcIiBzdHlsZT17eyBwYWRkaW5nOiAnMTRweCAyMHB4JywgZmxleERpcmVjdGlvbjogJ3JvdycsIGdhcDogJzEwcHgnIH19PlxyXG4gICAgICAgICAgICDwn5GlIE1hbmFnZSBVc2Vyc1xyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIi9kYXNoYm9hcmQvcmVzb3VyY2VzL05vdGlmaWNhdGlvbi9hY3Rpb25zL25ld1wiIGNsYXNzTmFtZT1cInF1aWNrLWFjdGlvbi1jYXJkXCIgc3R5bGU9e3sgcGFkZGluZzogJzE0cHggMjBweCcsIGZsZXhEaXJlY3Rpb246ICdyb3cnLCBnYXA6ICcxMHB4JyB9fT5cclxuICAgICAgICAgICAg8J+UlCBTZW5kIE5vdGlmaWNhdGlvblxyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L0JveD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmQ7IiwiXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuXHJcbmNvbnN0IExpbmtDb21wb25lbnQgPSAocHJvcHMpID0+IHtcclxuICBjb25zdCB7IHJlY29yZCwgcHJvcGVydHkgfSA9IHByb3BzO1xyXG5cclxuICAvLyBUcnkgdG8gZ2V0IGNvb3JkaW5hdGVzIGZyb20gdGhlIGRpcmVjdCBwcm9wZXJ0eSBmaXJzdCAoZS5nLiwgJ2xvY2F0aW9uJylcclxuICAvLyBGYWxsYmFjayB0byAnYWRkcmVzcy5sb2NhdGlvbicgZm9yIG90aGVyIHJlc291cmNlcyBpZiBuZWVkZWRcclxuICAvLyBOb3RlOiBJbiBBZG1pbkpTIGxpc3QgdmlldywgZmxhdHRlbmluZyBtaWdodCBiZSBcImxvY2F0aW9uLmNvb3JkaW5hdGVzLjBcIlxyXG4gIGNvbnN0IGxhdCA9IHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uY29vcmRpbmF0ZXMuMWBdIHx8IHJlY29yZC5wYXJhbXNbXCJhZGRyZXNzLmxvY2F0aW9uLmNvb3JkaW5hdGVzLjFcIl07XHJcbiAgY29uc3QgbG9uZyA9IHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uY29vcmRpbmF0ZXMuMGBdIHx8IHJlY29yZC5wYXJhbXNbXCJhZGRyZXNzLmxvY2F0aW9uLmNvb3JkaW5hdGVzLjBcIl07XHJcblxyXG4gIC8vIElmIG5vIGNvb3JkaW5hdGVzLCByZXR1cm4gbnVsbCBvciBlbXB0eVxyXG4gIGlmICghbGF0IHx8ICFsb25nKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIC8vIEF0dGVtcHQgdG8gY29uc3RydWN0IGFuIGFkZHJlc3Mgc3RyaW5nIGZyb20gdGhlIHJlY29yZFxyXG4gIC8vIExvZ2ljOiBhZGRyZXNzLmFkZHJlc3NMaW5lMSwgYWRkcmVzcy5hZGRyZXNzTGluZTIsIGFkZHJlc3MuY2l0eSwgZXRjLlxyXG4gIC8vIE5vdGU6IEFkbWluSlMgbGlrZWx5IGZsYXR0ZW5zIHRoZXNlIHRvIGBhZGRyZXNzLmFkZHJlc3NMaW5lMWBcclxuICBjb25zdCBhZGRyZXNzUGFydHMgPSBbXHJcbiAgICByZWNvcmQucGFyYW1zWydhZGRyZXNzLmFkZHJlc3NMaW5lMSddLFxyXG4gICAgcmVjb3JkLnBhcmFtc1snYWRkcmVzcy5hZGRyZXNzTGluZTInXSxcclxuICAgIHJlY29yZC5wYXJhbXNbJ2FkZHJlc3MuYWRkcmVzc0xpbmUzJ10sXHJcbiAgICByZWNvcmQucGFyYW1zWydhZGRyZXNzLnBpbkNvZGUnXSxcclxuICAgIC8vIEFkZCBvdGhlciBhZGRyZXNzIGZpZWxkcyBpZiB0aGV5IGV4aXN0IGluIHlvdXIgc2NoZW1hLCBlLmcuIHN0YXRlLCBjaXR5XHJcbiAgXS5maWx0ZXIocGFydCA9PiBwYXJ0ICYmIHBhcnQudG9TdHJpbmcoKS50cmltKCkgIT09ICcnKTtcclxuXHJcbiAgbGV0IHF1ZXJ5ID0gJyc7XHJcbiAgaWYgKGFkZHJlc3NQYXJ0cy5sZW5ndGggPiAwKSB7XHJcbiAgICBxdWVyeSA9IGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzUGFydHMuam9pbignLCAnKSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHF1ZXJ5ID0gYCR7bGF0fSwke2xvbmd9YDtcclxuICB9XHJcblxyXG4gIC8vIHF1ZXJ5IHBhcmFtIHdvcmtzIGZvciBib3RoIHNlYXJjaCB0ZXJtcyAoYWRkcmVzcykgYW5kIGNvb3JkaW5hdGVzXHJcbiAgY29uc3QgbWFwc0xpbmsgPSBgaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL3NlYXJjaC8/YXBpPTEmcXVlcnk9JHtxdWVyeX1gO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGEgaHJlZj17bWFwc0xpbmt9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5cclxuICAgICAgVmlldyBMb2NhdGlvblxyXG4gICAgPC9hPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlua0NvbXBvbmVudFxyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwsIFNlbGVjdCwgRm9ybU1lc3NhZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcclxuXHJcbmNvbnN0IFZvbHVudGVlckZpbHRlcmVkU2VsZWN0ID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xyXG4gIGNvbnN0IFt2b2x1bnRlZXJzLCBzZXRWb2x1bnRlZXJzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGZldGNoVm9sdW50ZWVycyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xyXG4gICAgICAgIHJlc291cmNlSWQ6ICd1c2VyUHJvZmlsZScsXHJcbiAgICAgICAgYWN0aW9uTmFtZTogJ2xpc3QnLFxyXG4gICAgICAgIHBhcmFtczogeyAnZmlsdGVycy5yb2xlJzogJ3ZvbHVudGVlcicsIHBlclBhZ2U6IDEwMDAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGEucmVjb3Jkcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdtYXBwaW5nICcsIHJlc3BvbnNlLmRhdGEucmVjb3JkcylcclxuICAgICAgICBzZXRWb2x1bnRlZXJzKHJlc3BvbnNlLmRhdGEucmVjb3Jkcy5tYXAodiA9PiAoe1xyXG4gICAgICAgICAgdmFsdWU6IHYuaWQsXHJcbiAgICAgICAgICBsYWJlbDogdi5wYXJhbXMubmFtZSxcclxuICAgICAgICB9KSkpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfTtcclxuICAgIGZldGNoVm9sdW50ZWVycygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gc2VsZWN0ZWQgPT4ge1xyXG4gICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgc2VsZWN0ZWQgPyBzZWxlY3RlZC52YWx1ZSA6ICcnKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IHZvbHVudGVlcnMuZmluZChvcHQgPT4gb3B0LnZhbHVlID09PSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdKSB8fCBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEZvcm1Hcm91cCBtYj17NTZ9PlxyXG4gICAgICA8TGFiZWwgcmVxdWlyZWQ+eydTZWxlY3QgVm9sdW50ZWVyJ308L0xhYmVsPlxyXG4gICAgICA8U2VsZWN0XHJcbiAgICAgICAgb3B0aW9ucz17dm9sdW50ZWVyc31cclxuICAgICAgICB2YWx1ZT17c2VsZWN0ZWRPcHRpb259XHJcbiAgICAgICAgaXNMb2FkaW5nPXtsb2FkaW5nfVxyXG4gICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XHJcbiAgICAgICAgaXNDbGVhcmFibGVcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCB2b2x1bnRlZXLigKZcIlxyXG4gICAgICAvPlxyXG4gICAgICB7cHJvcGVydHkuZGVzY3JpcHRpb24gJiYgKFxyXG4gICAgICAgIDxGb3JtTWVzc2FnZT57cHJvcGVydHkuZGVzY3JpcHRpb259PC9Gb3JtTWVzc2FnZT5cclxuICAgICAgKX1cclxuICAgIDwvRm9ybUdyb3VwPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIExhYmVsLCBTZWxlY3QsIEZvcm1NZXNzYWdlIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XHJcblxyXG5jb25zdCBTdGF0dXNGaWx0ZXJlZFNlbGVjdCA9ICh7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0pID0+IHtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZmV0Y2hTdGF0dXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHtcclxuICAgICAgICByZXNvdXJjZUlkOiAnQWlkUmVxdWVzdCcsXHJcbiAgICAgICAgYWN0aW9uTmFtZTogJ2xpc3QnLFxyXG4gICAgICAgIHBhcmFtczogeyAnZmlsdGVycy5zdGF0dXMnOiAncmVqZWN0ZWQnLCBwZXJQYWdlOiAxMDAwIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zb2xlLmxvZygnbG9nb2dkZ2QnLCByZXNwb25zZSlcclxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21hcHBpbmcgJywgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKVxyXG4gICAgICAgIHNldFN0YXR1cyhyZXNwb25zZS5kYXRhLnJlY29yZHMubWFwKHYgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNvcmRcIiwgdi5wYXJhbXMpXHJcbiAgICAgICAgICByZXR1cm4gKHtcclxuICAgICAgICAgICAgdmFsdWU6IHYuaWQsXHJcbiAgICAgICAgICAgIC8vIGxhYmVsOiBgJHt2LnBhcmFtc1tcImFkZHJlc3MuYWRkcmVzc0xpbmUxXCJdfSAtICR7di5wYXJhbXNbXCJkb25hdGlvblR5cGVcIl19YFxyXG4gICAgICAgICAgICBsYWJlbDogdi5wYXJhbXMubmFtZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfTtcclxuICAgIGZldGNoU3RhdHVzKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSBzZWxlY3RlZCA9PiB7XHJcbiAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBzZWxlY3RlZCA/IHNlbGVjdGVkLnZhbHVlIDogJycpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gc3RhdHVzLmZpbmQob3B0ID0+IG9wdC52YWx1ZSA9PT0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXSkgfHwgbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxGb3JtR3JvdXAgbWI9ezU2fT5cclxuICAgICAgPExhYmVsIHJlcXVpcmVkPnsnU2VsZWN0IEFpZCBSZXF1ZXN0J308L0xhYmVsPlxyXG4gICAgICA8U2VsZWN0XHJcbiAgICAgICAgb3B0aW9ucz17c3RhdHVzfVxyXG4gICAgICAgIHZhbHVlPXtzZWxlY3RlZE9wdGlvbn1cclxuICAgICAgICBpc0xvYWRpbmc9e2xvYWRpbmd9XHJcbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cclxuICAgICAgICBpc0NsZWFyYWJsZVxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IEFpZCBSZXF1ZXN0XCJcclxuICAgICAgLz5cclxuICAgICAge3Byb3BlcnR5LmRlc2NyaXB0aW9uICYmIChcclxuICAgICAgICA8Rm9ybU1lc3NhZ2U+e3Byb3BlcnR5LmRlc2NyaXB0aW9ufTwvRm9ybU1lc3NhZ2U+XHJcbiAgICAgICl9XHJcbiAgICA8L0Zvcm1Hcm91cD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhdHVzRmlsdGVyZWRTZWxlY3Q7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCwgU2VsZWN0LCBGb3JtTWVzc2FnZSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xyXG5cclxuY29uc3QgRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QgPSAoeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9KSA9PiB7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGZldGNoU3RhdHVzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5yZXNvdXJjZUFjdGlvbih7XHJcbiAgICAgICAgcmVzb3VyY2VJZDogJ0RvbmF0aW9uUmVxdWVzdCcsXHJcbiAgICAgICAgYWN0aW9uTmFtZTogJ2xpc3QnLFxyXG4gICAgICAgIHBhcmFtczogeyAnZmlsdGVycy5zdGF0dXMnOiAnYWNjZXB0ZWQnLCBwZXJQYWdlOiAxMDAwIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zb2xlLmxvZygnbG9nb2dkZ2QnLCByZXNwb25zZSlcclxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21hcHBpbmcgJywgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKVxyXG4gICAgICAgIHNldFN0YXR1cyhyZXNwb25zZS5kYXRhLnJlY29yZHMubWFwKHYgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNvcmRcIiwgdi5wYXJhbXMpXHJcbiAgICAgICAgICByZXR1cm4gKHtcclxuICAgICAgICAgICAgdmFsdWU6IHYuaWQsXHJcbiAgICAgICAgICAgIGxhYmVsOiB2LnBhcmFtcy5uYW1lXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9O1xyXG4gICAgZmV0Y2hTdGF0dXMoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IHNlbGVjdGVkID0+IHtcclxuICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIHNlbGVjdGVkID8gc2VsZWN0ZWQudmFsdWUgOiAnJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBzdGF0dXMuZmluZChvcHQgPT4gb3B0LnZhbHVlID09PSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdKSB8fCBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEZvcm1Hcm91cCBtYj17NTZ9PlxyXG4gICAgICA8TGFiZWwgcmVxdWlyZWQ+eydTZWxlY3QgRG9uYXRpb24gUmVxdWVzdCd9PC9MYWJlbD5cclxuICAgICAgPFNlbGVjdFxyXG4gICAgICAgIG9wdGlvbnM9e3N0YXR1c31cclxuICAgICAgICB2YWx1ZT17c2VsZWN0ZWRPcHRpb259XHJcbiAgICAgICAgaXNMb2FkaW5nPXtsb2FkaW5nfVxyXG4gICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XHJcbiAgICAgICAgaXNDbGVhcmFibGVcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBEb25hdGlvbiBSZXF1ZXN0XCJcclxuICAgICAgLz5cclxuICAgICAge3Byb3BlcnR5LmRlc2NyaXB0aW9uICYmIChcclxuICAgICAgICA8Rm9ybU1lc3NhZ2U+e3Byb3BlcnR5LmRlc2NyaXB0aW9ufTwvRm9ybU1lc3NhZ2U+XHJcbiAgICAgICl9XHJcbiAgICA8L0Zvcm1Hcm91cD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3Q7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBCdXR0b24sIElucHV0LCBMYWJlbCwgVGV4dCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyB1c2VUcmFuc2xhdGlvbiB9IGZyb20gJ2FkbWluanMnO1xyXG5cclxuY29uc3QgTG9naW5Db21wb25lbnQgPSAocHJvcHMpID0+IHtcclxuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbcGFzc3dvcmQsIHNldFBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Nob3dQYXNzd29yZCwgc2V0U2hvd1Bhc3N3b3JkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCB7IHRyYW5zbGF0ZU1lc3NhZ2UgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBzZXRFcnJvcignJyk7XHJcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9kYXNoYm9hcmQvbG9naW4nLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZW1haWwsIHBhc3N3b3JkIH0pLFxyXG4gICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGRhdGEucmVkaXJlY3RVcmwgfHwgJy9kYXNoYm9hcmQnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldEVycm9yKGRhdGEuZXJyb3IgfHwgJ0ludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQnKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0xvZ2luIGVycm9yOicsIGVycik7XHJcbiAgICAgIHNldEVycm9yKCdBbiBlcnJvciBvY2N1cnJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94XHJcbiAgICAgIGRpc3BsYXk9XCJmbGV4XCJcclxuICAgICAgbWluSGVpZ2h0PVwiMTAwdmhcIlxyXG4gICAgICBzdHlsZT17eyBmb250RmFtaWx5OiAnSW50ZXIsIHN5c3RlbS11aSwgc2Fucy1zZXJpZicgfX1cclxuICAgID5cclxuICAgICAgey8qIExlZnQgU2lkZSAtIEJyYW5kaW5nICovfVxyXG4gICAgICA8Qm94XHJcbiAgICAgICAgZmxleD1cIjFcIlxyXG4gICAgICAgIGRpc3BsYXk9e3sgXzogJ25vbmUnLCBtZDogJ2ZsZXgnIH19XHJcbiAgICAgICAgZmxleERpcmVjdGlvbj1cImNvbHVtblwiXHJcbiAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIlxyXG4gICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxyXG4gICAgICAgIHA9XCJ4eGxcIlxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzI1NjNlYiAwJSwgIzFlNDBhZiAxMDAlKScsXHJcbiAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcclxuICAgICAgICB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPEJveCB0ZXh0QWxpZ249XCJjZW50ZXJcIiBzdHlsZT17eyBtYXhXaWR0aDogJzUwMHB4JyB9fT5cclxuICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgc3JjPVwiL2ltYWdlcy9sb2dvLXdoaXRlLnBuZ1wiXHJcbiAgICAgICAgICAgIGFsdD1cIkxvZ29cIlxyXG4gICAgICAgICAgICBzdHlsZT17eyBtYXhXaWR0aDogJzI1MHB4JywgbWFyZ2luQm90dG9tOiAnMnJlbScgfX1cclxuICAgICAgICAgICAgb25FcnJvcj17KGUpID0+IHtcclxuICAgICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMnJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJywgbWFyZ2luQm90dG9tOiAnMXJlbScgfX0+XHJcbiAgICAgICAgICAgIFJlbGllZiBNYW5hZ2VtZW50IFN5c3RlbVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxLjEyNXJlbScsIG9wYWNpdHk6IDAuOSB9fT5cclxuICAgICAgICAgICAgQ29vcmRpbmF0aW5nIGRpc2FzdGVyIHJlbGllZiBlZmZvcnRzIHdpdGggZWZmaWNpZW5jeSBhbmQgY29tcGFzc2lvblxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgZ2FwOiAnMnJlbScsIG1hcmdpblRvcDogJzNyZW0nLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMnJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJyB9fT41MDArPC9UZXh0PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMC44NzVyZW0nIH19PkFpZCBSZXF1ZXN0czwvVGV4dD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgIDxCb3ggc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzJyZW0nLCBmb250V2VpZ2h0OiAnYm9sZCcgfX0+MTIwMCs8L1RleHQ+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcwLjg3NXJlbScgfX0+RG9uYXRpb25zPC9UZXh0PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMnJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJyB9fT41MCs8L1RleHQ+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcwLjg3NXJlbScgfX0+UmVsaWVmIENlbnRlcnM8L1RleHQ+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgey8qIFJpZ2h0IFNpZGUgLSBMb2dpbiBGb3JtICovfVxyXG4gICAgICA8Qm94XHJcbiAgICAgICAgZmxleD1cIjFcIlxyXG4gICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcclxuICAgICAgICBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCJcclxuICAgICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXHJcbiAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXHJcbiAgICAgICAgcD1cInh4bFwiXHJcbiAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiAnI2Y5ZmFmYicgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIGJnPVwid2hpdGVcIlxyXG4gICAgICAgICAgcD1cInh4bFwiXHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcwLjVyZW0nLFxyXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDFweCAzcHggMCByZ2JhKDAsIDAsIDAsIDAuMSknLFxyXG4gICAgICAgICAgICB3aWR0aDogJzQ1MHB4JyxcclxuICAgICAgICAgICAgbWF4V2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPEJveCBtYj1cInhsXCI+XHJcbiAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMS41cmVtJywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJyMxMTE4MjcnIH19PlxyXG4gICAgICAgICAgICAgIFNpZ24gSW5cclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzFyZW0nLCBjb2xvcjogJyM2YjcyODAnLCBtYXJnaW5Ub3A6ICcwLjVyZW0nIH19PlxyXG4gICAgICAgICAgICAgIEVudGVyIHlvdXIgY3JlZGVudGlhbHMgdG8gYWNjZXNzIHRoZSBkYXNoYm9hcmRcclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAge2Vycm9yICYmIChcclxuICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgIHA9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgICBtYj1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmVmMmYyJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZmVlMmUyJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzAuMzc1cmVtJyxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjZGMyNjI2JywgZm9udFNpemU6ICcwLjg3NXJlbScgfX0+XHJcbiAgICAgICAgICAgICAgICDimqDvuI8ge2Vycm9yfVxyXG4gICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxyXG4gICAgICAgICAgICA8Qm94IG1iPVwibGdcIj5cclxuICAgICAgICAgICAgICA8TGFiZWwgaHRtbEZvcj1cImVtYWlsXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICBFbWFpbCBBZGRyZXNzXHJcbiAgICAgICAgICAgICAgPC9MYWJlbD5cclxuICAgICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICAgIGlkPVwiZW1haWxcIlxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXtlbWFpbH1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RW1haWwoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJhZG1pbkBleGFtcGxlLmNvbVwiXHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTJweCcsXHJcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICAgICAgPEJveCBtYj1cImRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICA8TGFiZWwgaHRtbEZvcj1cInBhc3N3b3JkXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICBQYXNzd29yZFxyXG4gICAgICAgICAgICAgIDwvTGFiZWw+XHJcbiAgICAgICAgICAgICAgPEJveCBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuICAgICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgICBpZD1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICAgICAgdHlwZT17c2hvd1Bhc3N3b3JkID8gJ3RleHQnIDogJ3Bhc3N3b3JkJ31cclxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3Bhc3N3b3JkfVxyXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIHBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTJweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICc0NXB4JyxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93UGFzc3dvcmQoIXNob3dQYXNzd29yZCl9XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICcxMnB4JyxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6ICc1MCUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM2YjcyODAnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7c2hvd1Bhc3N3b3JkID8gJ/CfkYHvuI8nIDogJ/CfkYHvuI/igI3wn5eo77iPJ31cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICAgIDxCb3ggbWI9XCJ4bFwiIHN0eWxlPXt7IG1hcmdpblRvcDogJzFyZW0nIH19PlxyXG4gICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxyXG4gICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTRweCcsXHJcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLFxyXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBsb2FkaW5nID8gJyM5Y2EzYWYnIDogJyMyNTYzZWInLFxyXG4gICAgICAgICAgICAgICAgICBjdXJzb3I6IGxvYWRpbmcgPyAnbm90LWFsbG93ZWQnIDogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7bG9hZGluZyA/IChcclxuICAgICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWFyZ2luUmlnaHQ6ICc4cHgnIH19PuKPszwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICBTaWduaW5nIGluLi4uXHJcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICdTaWduIEluJ1xyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICA8L2Zvcm0+XHJcblxyXG4gICAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICcxLjVyZW0nIH19PlxyXG4gICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzAuODc1cmVtJywgY29sb3I6ICcjNmI3MjgwJyB9fT5cclxuICAgICAgICAgICAgICBEb24ndCBoYXZlIGFuIGFjY291bnQ/eycgJ31cclxuICAgICAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICAgICAgYXM9XCJzcGFuXCJcclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiAnIzI1NjNlYicsIGZvbnRXZWlnaHQ6ICdib2xkJywgY3Vyc29yOiAncG9pbnRlcicgfX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICBDb250YWN0IEFkbWluaXN0cmF0b3JcclxuICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICA8Qm94IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicsIG1hcmdpblRvcDogJzFyZW0nIH19PlxyXG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcwLjc1cmVtJywgY29sb3I6ICcjNmI3MjgwJyB9fT5cclxuICAgICAgICAgICAgwqkgMjAyNCBSZWxpZWYgTWFuYWdlbWVudCBTeXN0ZW0uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgIDwvQm94PlxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvZ2luQ29tcG9uZW50OyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgSW1hZ2VDb21wb25lbnQgPSAocHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgcmVjb3JkLCBwcm9wZXJ0eSB9ID0gcHJvcHM7XHJcbiAgICBjb25zdCBpbWFnZVVybCA9IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV07XHJcblxyXG4gICAgaWYgKCFpbWFnZVVybCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveD5cclxuICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgc3JjPXtpbWFnZVVybH1cclxuICAgICAgICAgICAgICAgIGFsdD17cHJvcGVydHkubGFiZWx9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXhXaWR0aDogJzEwMHB4JywgbWF4SGVpZ2h0OiAnMTAwcHgnLCBvYmplY3RGaXQ6ICdjb3ZlcicgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICA8L0JveD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZUNvbXBvbmVudDtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBJbWFnZUxpc3RDb21wb25lbnQgPSAocHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgcmVjb3JkLCBwcm9wZXJ0eSB9ID0gcHJvcHM7XHJcblxyXG4gICAgY29uc3QgaW1hZ2VzID0gW107XHJcbiAgICAvLyBDaGVjayBmb3IgZmxhdHRlbmVkIGtleXMgbGlrZSAncHJvb2ZJbWFnZXMuMCcsICdwcm9vZkltYWdlcy4xJywgZXRjLlxyXG4gICAgT2JqZWN0LmtleXMocmVjb3JkLnBhcmFtcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIC8vIENoZWNrIGlmIGtleSBzdGFydHMgd2l0aCBwcm9wZXJ0eSBuYW1lIGFuZCBmb2xsb3dzIHdpdGggLmluZGV4XHJcbiAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKGAke3Byb3BlcnR5Lm5hbWV9LmApICYmICFpc05hTihrZXkuc3BsaXQoJy4nKS5wb3AoKSkpIHtcclxuICAgICAgICAgICAgaW1hZ2VzLnB1c2gocmVjb3JkLnBhcmFtc1trZXldKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoaW1hZ2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGZsZXhEaXJlY3Rpb249XCJyb3dcIiBmbGV4V3JhcD1cIndyYXBcIiBnYXA9ezJ9PlxyXG4gICAgICAgICAgICB7aW1hZ2VzLm1hcCgodXJsLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXt1cmx9XHJcbiAgICAgICAgICAgICAgICAgICAgYWx0PXtgJHtwcm9wZXJ0eS5sYWJlbH0tJHtpbmRleH1gfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1heFdpZHRoOiAnMTAwcHgnLCBtYXhIZWlnaHQ6ICcxMDBweCcsIG9iamVjdEZpdDogJ2NvdmVyJyB9fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VMaXN0Q29tcG9uZW50O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBJbnB1dCwgTGFiZWwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IEltYWdlRWRpdENvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9ID0gcHJvcHM7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0gfHwgJyc7XHJcbiAgICBjb25zdCBbaW1hZ2VVcmwsIHNldEltYWdlVXJsXSA9IHVzZVN0YXRlKHZhbHVlKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgbG9jYWwgc3RhdGUgaWYgcmVjb3JkIGNoYW5nZXMgZnJvbSBvdXRzaWRlIChlLmcuIHJlbG9hZClcclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgc2V0SW1hZ2VVcmwocmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXSB8fCAnJyk7XHJcbiAgICB9LCBbcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXV0pO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgc2V0SW1hZ2VVcmwobmV3VmFsdWUpO1xyXG4gICAgICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIG5ld1ZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cInh4bFwiPlxyXG4gICAgICAgICAgICA8TGFiZWwgaHRtbEZvcj17cHJvcGVydHkubmFtZX0+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XHJcbiAgICAgICAgICAgIHtpbWFnZVVybCAmJiAoXHJcbiAgICAgICAgICAgICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cImRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17aW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIlByZXZpZXdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXhXaWR0aDogJzIwMHB4JywgbWF4SGVpZ2h0OiAnMjAwcHgnLCBvYmplY3RGaXQ6ICdjb3ZlcicsIGRpc3BsYXk6ICdibG9jaycsIG1hcmdpbkJvdHRvbTogJzhweCcsIGJvcmRlcjogJzFweCBzb2xpZCAjZGRkJywgcGFkZGluZzogJzRweCcgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvcj17KGUpID0+IHsgZS50YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgaWQ9e3Byb3BlcnR5Lm5hbWV9XHJcbiAgICAgICAgICAgICAgICBuYW1lPXtwcm9wZXJ0eS5uYW1lfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2ltYWdlVXJsfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgd2lkdGg9ezF9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VFZGl0Q29tcG9uZW50O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBMYWJlbCwgSW5wdXQsIEJ1dHRvbiwgSWNvbiB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgSW1hZ2VMaXN0RWRpdENvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9ID0gcHJvcHM7XHJcblxyXG4gICAgLy8gRmxhdHRlbmVkIHBhcmFtcyBhcmUgc3RvcmVkIGxpa2UgJ3Byb29mSW1hZ2VzLjAnOiAndXJsMScsICdwcm9vZkltYWdlcy4xJzogJ3VybDInXHJcbiAgICAvLyBXZSBuZWVkIHRvIHJlY29uc3RydWN0IHRoZSBhcnJheVxyXG4gICAgY29uc3QgZ2V0SW1hZ2VzID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGltYWdlcyA9IFtdO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHJlY29yZC5wYXJhbXMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKGAke3Byb3BlcnR5Lm5hbWV9LmApICYmICFpc05hTihrZXkuc3BsaXQoJy4nKS5wb3AoKSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoa2V5LnNwbGl0KCcuJykucG9wKCksIDEwKTtcclxuICAgICAgICAgICAgICAgIGltYWdlc1tpbmRleF0gPSByZWNvcmQucGFyYW1zW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBGaWx0ZXIgb3V0IGVtcHR5IHNsb3RzIGlmIGFueSBob2xlIGV4aXN0cywgdGhvdWdoIG5vcm1hbGx5IGFkbWluanMgaGFuZGxlcyBzZXF1ZW50aWFsIGtleXNcclxuICAgICAgICByZXR1cm4gaW1hZ2VzLmZpbHRlcihpbWcgPT4gaW1nICE9PSB1bmRlZmluZWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBbaW1hZ2VzLCBzZXRJbWFnZXNdID0gdXNlU3RhdGUoZ2V0SW1hZ2VzKCkpO1xyXG5cclxuICAgIC8vIEhlbHBlciB0byBub3RpZnkgQWRtaW5KUyBvZiBjaGFuZ2VzXHJcbiAgICAvLyBBZG1pbkpTIGV4cGVjdHMgZmxhdCBrZXlzIGZvciBhcnJheXM6ICdwcm9wZXJ0eS4wJywgJ3Byb3BlcnR5LjEnXHJcbiAgICBjb25zdCB1cGRhdGVSZWNvcmQgPSAobmV3SW1hZ2VzKSA9PiB7XHJcbiAgICAgICAgc2V0SW1hZ2VzKG5ld0ltYWdlcyk7XHJcblxyXG4gICAgICAgIC8vIDEuIENsZWFyIGV4aXN0aW5nIGtleXMgZm9yIHRoaXMgcHJvcGVydHlcclxuICAgICAgICAvLyBXZSBjYW4ndCByZWFsbHkgXCJkZWxldGVcIiBrZXlzIGVhc2lseSB2aWEgb25DaGFuZ2UgaW4gdGhlIHN0YW5kYXJkIHdheSB3aXRob3V0IHBvdGVudGlhbGx5IGxlYXZpbmcgZ2FyYmFnZSxcclxuICAgICAgICAvLyBidXQgc3RhbmRhcmQgYWRtaW5qcyBoYW5kbGluZyBleHBlY3RzIHVzIHRvIG92ZXJ3cml0ZS5cclxuICAgICAgICAvLyBIb3dldmVyLCB0aGUgY2xlYW5lc3Qgd2F5IHRvIHN5bmMgYW4gYXJyYXkgaXMgdG8gdXBkYXRlIGVhY2ggaW5kZXguXHJcblxyXG4gICAgICAgIC8vIElkZWFsbHkgd2Ugc2hvdWxkIG51bGxpZnkgb2xkIGtleXMgaWYgYXJyYXkgc2hyaW5rcywgYnV0IHN0YW5kYXJkIGJlaGF2aW9yIG1pZ2h0IGp1c3QgaGFuZGxlIHdoYXQgd2Ugc2VuZC5cclxuICAgICAgICAvLyBBIHNhZmVyIGJldCBpcyB0byByZWx5IG9uIEFkbWluSlMncyBpbnRlcm5hbCBoYW5kbGluZyBpZiB3ZSB3ZXJlIHBhc3NpbmcgdGhlIHdob2xlIG9iamVjdCwgXHJcbiAgICAgICAgLy8gYnV0IGhlcmUgd2UgYXJlIGEgY29tcG9uZW50LlxyXG5cclxuICAgICAgICAvLyBXZSB3aWxsIGp1c3QgdXBkYXRlICdwcm9wZXJ0eS4wJywgJ3Byb3BlcnR5LjEnIGV0Yy5cclxuICAgICAgICAvLyBBbmQgaWRlYWxseSB3ZSBtaWdodCBuZWVkIHRvIGNsZWFyICdwcm9wZXJ0eS4yJyBpZiB3ZSB3ZW50IGZyb20gMyBpdGVtcyB0byAyLlxyXG4gICAgICAgIC8vIFRvIHByb3Blcmx5IFwiY2xlYXJcIiB3ZSBtaWdodCBuZWVkIHRvIHNldCBpdCB0byBudWxsIG9yIHVuZGVmaW5lZC5cclxuXHJcbiAgICAgICAgLy8gU3RyYXRlZ3k6IFVwZGF0ZSBhbGwgY3VycmVudCBpbmRpY2VzLiBcclxuICAgICAgICAvLyBJZiB0aGUgYXJyYXkgc2hyYW5rLCB3ZSBjYW4gdHJ5IHNldHRpbmcgdGhlIG5leHQgaW5kZXggdG8gbnVsbC91bmRlZmluZWQgdG8gc2VlIGlmIGJhY2tlbmQgaGFuZGxlcyBpdCxcclxuICAgICAgICAvLyBvciBqdXN0IHJlbHkgb24gdGhlIGZhY3QgdGhhdCB3ZSBhcmUgcmV3cml0aW5nIHRoZSBwYXJhbXMuXHJcblxyXG4gICAgICAgIC8vIEFjdHVhbGx5LCBvbkNoYW5nZSBleHBlY3RzIChrZXksIHZhbHVlKS5cclxuICAgICAgICAvLyBXZSBuZWVkIHRvIHVwZGF0ZSBtdWx0aXBsZSBrZXlzLiBBZG1pbkpTIGBvbkNoYW5nZWAgbWlnaHQgbm90IHN1cHBvcnQgYmF0Y2ggdXBkYXRlcyBlYXNpbHkgZGVwZW5kaW5nIG9uIHZlcnNpb24uXHJcbiAgICAgICAgLy8gQnV0IHVzdWFsbHkgaXQncyBgb25DaGFuZ2UocHJvcGVydHksIHZhbHVlKWAgd2hlcmUgdmFsdWUgaXMgdGhlIGZ1bGwgdmFsdWU/IFxyXG4gICAgICAgIC8vIE5vLCBmb3IgYXJyYXkgcHJvcGVydGllcywgQWRtaW5KUyBvZnRlbiB0cmVhdHMgdGhlbSBlc3NlbnRpYWxseSBhcyBpbmRpdmlkdWFsIGZpZWxkcyBpZiBmbGF0dGVuZWQuXHJcblxyXG4gICAgICAgIC8vIFdBSVQ6IElmIHdlIHVzZSBhIGN1c3RvbSBjb21wb25lbnQgZm9yIHRoZSAqZW50aXJlIGFycmF5IHByb3BlcnR5KiwgYG9uQ2hhbmdlYCBtaWdodCBhY2NlcHQgdGhlIGFycmF5IGl0c2VsZlxyXG4gICAgICAgIC8vIGlmIHRoZSBiYWNrZW5kIGFkYXB0ZXIgc3VwcG9ydHMgaXQuIEJ1dCBBZG1pbkpTIG9mdGVuIGZsYXR0ZW5zLlxyXG5cclxuICAgICAgICAvLyBMZXQncyBjaGVjayBob3cgc3RhbmRhcmQgYXJyYXkgZWRpdGluZyB3b3Jrcy5cclxuICAgICAgICAvLyBJZiB3ZSBsb29rIGF0IGV4aXN0aW5nIGBJbWFnZUxpc3RDb21wb25lbnRgLCBpdCByZWFkcyBmcm9tIGByZWNvcmQucGFyYW1zYC5cclxuXHJcbiAgICAgICAgLy8gTGV0J3MgdHJ5IHNlbmRpbmcgdGhlIGFycmF5IHRvIGBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBuZXdJbWFnZXMpYC5cclxuICAgICAgICAvLyBNYW55IEFkbWluSlMgYWRhcHRlcnMgKGxpa2UgTW9uZ29vc2UpIGhhbmRsZSB0aGUgYXJyYXkgaWYgcGFzc2VkIGFzIGEgdmFsdWUgdG8gdGhlIG1haW4gcHJvcGVydHkga2V5LlxyXG4gICAgICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIG5ld0ltYWdlcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUFkZCA9ICgpID0+IHtcclxuICAgICAgICB1cGRhdGVSZWNvcmQoWy4uLmltYWdlcywgJyddKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlUmVtb3ZlID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV3SW1hZ2VzID0gWy4uLmltYWdlc107XHJcbiAgICAgICAgbmV3SW1hZ2VzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgdXBkYXRlUmVjb3JkKG5ld0ltYWdlcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgICBjb25zdCBuZXdJbWFnZXMgPSBbLi4uaW1hZ2VzXTtcclxuICAgICAgICBuZXdJbWFnZXNbaW5kZXhdID0gdmFsdWU7XHJcbiAgICAgICAgdXBkYXRlUmVjb3JkKG5ld0ltYWdlcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveCBtYXJnaW5Cb3R0b209XCJ4eGxcIj5cclxuICAgICAgICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxyXG4gICAgICAgICAgICB7aW1hZ2VzLm1hcCgodXJsLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPEJveCBrZXk9e2luZGV4fSBtYXJnaW5Cb3R0b209XCJkZWZhdWx0XCIgZGlzcGxheT1cImZsZXhcIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJveCBtYXJnaW5SaWdodD1cImRlZmF1bHRcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt1cmwgJiYgPGltZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXt1cmx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9e2BJbWFnZSAke2luZGV4ICsgMX1gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6ICc1MHB4JywgaGVpZ2h0OiAnNTBweCcsIG9iamVjdEZpdDogJ2NvdmVyJywgYm9yZGVyUmFkaXVzOiAnNHB4JyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvcj17KGUpID0+IHsgZS50YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJveCBmbGV4R3Jvdz17MX0gbWFyZ2luUmlnaHQ9XCJkZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3VybH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlQ2hhbmdlKGluZGV4LCBlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17MX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiSW1hZ2UgVVJMXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJlbW92ZShpbmRleCl9IHZhcmlhbnQ9XCJkYW5nZXJcIiBzaXplPVwiaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBpY29uPVwiVHJhc2gyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVBZGR9IHR5cGU9XCJidXR0b25cIj5cclxuICAgICAgICAgICAgICAgIDxJY29uIGljb249XCJQbHVzXCIgLz4gQWRkIEltYWdlIFVSTFxyXG4gICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICA8L0JveD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZUxpc3RFZGl0Q29tcG9uZW50O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQXBpQ2xpZW50LCB1c2VSZWNvcmQsIHVzZU5vdGljZSB9IGZyb20gJ2FkbWluanMnO1xyXG5pbXBvcnQge1xyXG4gICAgQm94LFxyXG4gICAgSDMsXHJcbiAgICBMYWJlbCxcclxuICAgIElucHV0LFxyXG4gICAgU2VsZWN0LFxyXG4gICAgQnV0dG9uLFxyXG4gICAgRm9ybUdyb3VwLFxyXG4gICAgQ2hlY2tCb3gsXHJcbiAgICBUZXh0LFxyXG4gICAgTG9hZGVyLFxyXG4gICAgTWVzc2FnZUJveCxcclxufSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcclxuLy8gVXNlIGVtcHR5IHN0cmluZyBmb3IgcmVsYXRpdmUgVVJMIHNpbmNlIEFkbWluSlMgcnVucyBvbiB0aGUgc2FtZSBzZXJ2ZXJcclxuY29uc3QgQkFTRV9VUkwgPSAnJztcclxuXHJcbmNvbnN0IENyZWF0ZVRhc2tGcm9tQWlkUmVxdWVzdCA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyByZWNvcmQsIHJlc291cmNlIH0gPSBwcm9wcztcclxuICAgIGNvbnN0IGFkZE5vdGljZSA9IHVzZU5vdGljZSgpO1xyXG5cclxuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICAgIGNvbnN0IFt2b2x1bnRlZXJzLCBzZXRWb2x1bnRlZXJzXSA9IHVzZVN0YXRlKFtdKTtcclxuICAgIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGUoJycpO1xyXG4gICAgY29uc3QgW2Zvcm1EYXRhLCBzZXRGb3JtRGF0YV0gPSB1c2VTdGF0ZSh7XHJcbiAgICAgICAgdGFza05hbWU6IHJlY29yZD8ucGFyYW1zPy5uYW1lIHx8ICdBaWQgUmVxdWVzdCBUYXNrJyxcclxuICAgICAgICB2b2x1bnRlZXJzTmVlZGVkOiAxLFxyXG4gICAgICAgIGlzT3BlbjogdHJ1ZSxcclxuICAgICAgICBwcmlvcml0eTogcmVjb3JkPy5wYXJhbXM/LnByaW9yaXR5IHx8ICdtZWRpdW0nLFxyXG4gICAgICAgIHNlbGVjdGVkVm9sdW50ZWVyczogW10sXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IFtoYXNFeGlzdGluZ1Rhc2ssIHNldEhhc0V4aXN0aW5nVGFza10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgdGFzayBhbHJlYWR5IGV4aXN0cyBmb3IgdGhpcyBhaWQgcmVxdWVzdFxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBjaGVja0V4aXN0aW5nVGFzayA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUlkOiAnVGFza1NjaGVtYScsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ2xpc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogeyAnZmlsdGVycy5haWRSZXF1ZXN0JzogcmVjb3JkLmlkIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhPy5yZWNvcmRzPy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0SGFzRXhpc3RpbmdUYXNrKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY2hlY2tpbmcgZXhpc3RpbmcgdGFzazonLCBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGNoZWNrRXhpc3RpbmdUYXNrKCk7XHJcbiAgICB9LCBbcmVjb3JkLmlkXSk7XHJcblxyXG4gICAgLy8gRmV0Y2ggdm9sdW50ZWVyc1xyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBmZXRjaFZvbHVudGVlcnMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5yZXNvdXJjZUFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VJZDogJ3VzZXJQcm9maWxlJyxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnbGlzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdmaWx0ZXJzLnJvbGUnOiAndm9sdW50ZWVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyUGFnZTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4oc2VhcmNoUXVlcnkgJiYgeyAnZmlsdGVycy5uYW1lJzogc2VhcmNoUXVlcnkgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGE/LnJlY29yZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRWb2x1bnRlZXJzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhLnJlY29yZHMubWFwKCh2KSA9PiAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHYuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogYCR7di5wYXJhbXMubmFtZX0gKCR7di5wYXJhbXMuc2tpbGwgfHwgJ05vIHNraWxsJ30pYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHZvbHVudGVlcnM6JywgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmZXRjaFZvbHVudGVlcnMoKTtcclxuICAgIH0sIFtzZWFyY2hRdWVyeV0pO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXHJcbiAgICAgICAgICAgICAgICBgJHtCQVNFX1VSTH0vYXBpL2FkbWluL3Rhc2svY3JlYXRlLWZyb20tYWlkLXJlcXVlc3QvJHtyZWNvcmQuaWR9YCxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFza05hbWU6IGZvcm1EYXRhLnRhc2tOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2b2x1bnRlZXJzTmVlZGVkOiBmb3JtRGF0YS52b2x1bnRlZXJzTmVlZGVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc09wZW46IGZvcm1EYXRhLmlzT3BlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHk6IGZvcm1EYXRhLnByaW9yaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZFZvbHVudGVlcnM6IGZvcm1EYXRhLmlzT3BlbiA/IFtdIDogZm9ybURhdGEuc2VsZWN0ZWRWb2x1bnRlZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGFkZE5vdGljZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1Rhc2sgY3JlYXRlZCBzdWNjZXNzZnVsbHkhJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIFJlZGlyZWN0IGJhY2sgdG8gdGhlIGFpZCByZXF1ZXN0IGxpc3RcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9kYXNoYm9hcmQvcmVzb3VyY2VzL0FpZFJlcXVlc3QnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWRkTm90aWNlKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkYXRhLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBjcmVhdGUgdGFzaycsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY3JlYXRpbmcgdGFzazonLCBlcnJvcik7XHJcbiAgICAgICAgICAgIGFkZE5vdGljZSh7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnRXJyb3IgY3JlYXRpbmcgdGFzay4gUGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVWb2x1bnRlZXJTZWxlY3QgPSAoc2VsZWN0ZWQpID0+IHtcclxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3Vm9sdW50ZWVycyA9IEFycmF5LmlzQXJyYXkoc2VsZWN0ZWQpXHJcbiAgICAgICAgICAgICAgICA/IHNlbGVjdGVkLm1hcCgocykgPT4gcy52YWx1ZSkuc2xpY2UoMCwgZm9ybURhdGEudm9sdW50ZWVyc05lZWRlZClcclxuICAgICAgICAgICAgICAgIDogW3NlbGVjdGVkLnZhbHVlXTtcclxuICAgICAgICAgICAgc2V0Rm9ybURhdGEoKHByZXYpID0+ICh7XHJcbiAgICAgICAgICAgICAgICAuLi5wcmV2LFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRWb2x1bnRlZXJzOiBuZXdWb2x1bnRlZXJzLFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0Rm9ybURhdGEoKHByZXYpID0+ICh7XHJcbiAgICAgICAgICAgICAgICAuLi5wcmV2LFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRWb2x1bnRlZXJzOiBbXSxcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKGhhc0V4aXN0aW5nVGFzaykge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxCb3ggdmFyaWFudD1cImdyZXlcIiBwYWRkaW5nPVwieGxcIj5cclxuICAgICAgICAgICAgICAgIDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIiBtZXNzYWdlPVwiQSB0YXNrIGFscmVhZHkgZXhpc3RzIGZvciB0aGlzIGFpZCByZXF1ZXN0LlwiIC8+XHJcbiAgICAgICAgICAgICAgICA8Qm94IG1hcmdpblRvcD1cImxnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+ICh3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvZGFzaGJvYXJkL3Jlc291cmNlcy9BaWRSZXF1ZXN0Jyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYWNrIHRvIEFpZCBSZXF1ZXN0c1xyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94IHZhcmlhbnQ9XCJncmV5XCIgcGFkZGluZz1cInhsXCI+XHJcbiAgICAgICAgICAgIDxIMz5DcmVhdGUgVGFzayBmcm9tIEFpZCBSZXF1ZXN0PC9IMz5cclxuICAgICAgICAgICAgPFRleHQgbWFyZ2luQm90dG9tPVwibGdcIj5cclxuICAgICAgICAgICAgICAgIENyZWF0aW5nIHRhc2sgZm9yOiA8c3Ryb25nPntyZWNvcmQ/LnBhcmFtcz8ubmFtZSB8fCAnVW5rbm93biBSZXF1ZXN0J308L3N0cm9uZz5cclxuICAgICAgICAgICAgPC9UZXh0PlxyXG5cclxuICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMYWJlbD5UYXNrIE5hbWU8L0xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEudGFza05hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoeyAuLi5wcmV2LCB0YXNrTmFtZTogZS50YXJnZXQudmFsdWUgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcblxyXG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cD5cclxuICAgICAgICAgICAgICAgICAgICA8TGFiZWw+UHJpb3JpdHk8L0xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3sgdmFsdWU6IGZvcm1EYXRhLnByaW9yaXR5LCBsYWJlbDogZm9ybURhdGEucHJpb3JpdHkgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJ2hpZ2gnLCBsYWJlbDogJ0hpZ2gnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnbWVkaXVtJywgbGFiZWw6ICdNZWRpdW0nIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnbG93JywgbGFiZWw6ICdMb3cnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoc2VsZWN0ZWQpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRGb3JtRGF0YSgocHJldikgPT4gKHsgLi4ucHJldiwgcHJpb3JpdHk6IHNlbGVjdGVkLnZhbHVlIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG5cclxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgICAgPExhYmVsPlZvbHVudGVlcnMgTmVlZGVkPC9MYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbj1cIjFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEudm9sdW50ZWVyc05lZWRlZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Rm9ybURhdGEoKHByZXYpID0+ICh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2x1bnRlZXJzTmVlZGVkOiBwYXJzZUludChlLnRhcmdldC52YWx1ZSwgMTApIHx8IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuXHJcbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgIDxDaGVja0JveFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZD1cImlzT3BlblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2Zvcm1EYXRhLmlzT3Blbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRGb3JtRGF0YSgocHJldikgPT4gKHsgLi4ucHJldiwgaXNPcGVuOiAhcHJldi5pc09wZW4gfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMYWJlbCBpbmxpbmUgaHRtbEZvcj1cImlzT3BlblwiIG1hcmdpbkxlZnQ9XCJkZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9wZW4gVGFzayAodm9sdW50ZWVycyBjYW4gY2xhaW0gZnJvbSBtYXJrZXRwbGFjZSlcclxuICAgICAgICAgICAgICAgICAgICA8L0xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcblxyXG4gICAgICAgICAgICAgICAgeyFmb3JtRGF0YS5pc09wZW4gJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtR3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2lnbiBWb2x1bnRlZXJzIHtmb3JtRGF0YS52b2x1bnRlZXJzTmVlZGVkID4gMSAmJiBgKG1heCAke2Zvcm1EYXRhLnZvbHVudGVlcnNOZWVkZWR9KWB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTXVsdGk9e2Zvcm1EYXRhLnZvbHVudGVlcnNOZWVkZWQgPiAxfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWFyY2hhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXt2b2x1bnRlZXJzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3ZvbHVudGVlcnMuZmlsdGVyKHYgPT4gZm9ybURhdGEuc2VsZWN0ZWRWb2x1bnRlZXJzLmluY2x1ZGVzKHYudmFsdWUpKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoc2VsZWN0ZWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEZvcm1EYXRhKHByZXYgPT4gKHsgLi4ucHJldiwgc2VsZWN0ZWRWb2x1bnRlZXJzOiBbXSB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VmFsdWVzID0gQXJyYXkuaXNBcnJheShzZWxlY3RlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBzZWxlY3RlZC5zbGljZSgwLCBmb3JtRGF0YS52b2x1bnRlZXJzTmVlZGVkKS5tYXAocyA9PiBzLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtzZWxlY3RlZC52YWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Rm9ybURhdGEocHJldiA9PiAoeyAuLi5wcmV2LCBzZWxlY3RlZFZvbHVudGVlcnM6IG5ld1ZhbHVlcyB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2Zvcm1EYXRhLnZvbHVudGVlcnNOZWVkZWQgPiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgU2VsZWN0IHVwIHRvICR7Zm9ybURhdGEudm9sdW50ZWVyc05lZWRlZH0gdm9sdW50ZWVycy4uLmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiU2VsZWN0IGEgdm9sdW50ZWVyLi4uXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtmb3JtRGF0YS5zZWxlY3RlZFZvbHVudGVlcnMubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBtYXJnaW5Ub3A9XCJzbVwiIGNvbG9yPVwiZ3JleTYwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0ZWQ6IHtmb3JtRGF0YS5zZWxlY3RlZFZvbHVudGVlcnMubGVuZ3RofS97Zm9ybURhdGEudm9sdW50ZWVyc05lZWRlZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuICAgICAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICAgICAgPEJveCBtYXJnaW5Ub3A9XCJ4bFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdHlwZT1cInN1Ym1pdFwiIHZhcmlhbnQ9XCJwcmltYXJ5XCIgZGlzYWJsZWQ9e2xvYWRpbmd9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bG9hZGluZyA/IDxMb2FkZXIgLz4gOiAnQ3JlYXRlIFRhc2snfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luTGVmdD1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiAod2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2Rhc2hib2FyZC9yZXNvdXJjZXMvQWlkUmVxdWVzdCcpfVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgQ2FuY2VsXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENyZWF0ZVRhc2tGcm9tQWlkUmVxdWVzdDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBCdXR0b24sIElucHV0LCBMYWJlbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBNYXBQaWNrZXIgPSAocHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgcmVjb3JkLCBwcm9wZXJ0eSwgb25DaGFuZ2UgfSA9IHByb3BzO1xyXG4gICAgY29uc3QgbWFwQ29udGFpbmVyUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gICAgY29uc3QgbWFwSW5zdGFuY2VSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgICBjb25zdCBtYXJrZXJSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gICAgLy8gSW5pdGlhbCBWYWx1ZXMgLSBzYWZlbHkgcGFyc2UgYW5kIHZhbGlkYXRlXHJcbiAgICBjb25zdCBnZXRJbml0aWFsVmFsdWUgPSAocGF0aCkgPT4gcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS4ke3BhdGh9YF07XHJcbiAgICBjb25zdCBwYXJzZWRMYXQgPSBwYXJzZUZsb2F0KGdldEluaXRpYWxWYWx1ZSgnbG9jYXRpb24uY29vcmRpbmF0ZXMuMScpKTtcclxuICAgIGNvbnN0IHBhcnNlZExuZyA9IHBhcnNlRmxvYXQoZ2V0SW5pdGlhbFZhbHVlKCdsb2NhdGlvbi5jb29yZGluYXRlcy4wJykpO1xyXG4gICAgY29uc3QgaW5pdGlhbExhdCA9ICFpc05hTihwYXJzZWRMYXQpID8gcGFyc2VkTGF0IDogbnVsbDtcclxuICAgIGNvbnN0IGluaXRpYWxMbmcgPSAhaXNOYU4ocGFyc2VkTG5nKSA/IHBhcnNlZExuZyA6IG51bGw7XHJcbiAgICBjb25zdCBoYXNJbml0aWFsQ29vcmRzID0gaW5pdGlhbExhdCAhPT0gbnVsbCAmJiBpbml0aWFsTG5nICE9PSBudWxsICYmIChpbml0aWFsTGF0ICE9PSAwIHx8IGluaXRpYWxMbmcgIT09IDApO1xyXG5cclxuICAgIGNvbnN0IFtwb3NpdGlvbiwgc2V0UG9zaXRpb25dID0gdXNlU3RhdGUoaGFzSW5pdGlhbENvb3JkcyA/IFtpbml0aWFsTGF0LCBpbml0aWFsTG5nXSA6IG51bGwpO1xyXG4gICAgY29uc3QgW3NlYXJjaFF1ZXJ5LCBzZXRTZWFyY2hRdWVyeV0gPSB1c2VTdGF0ZSgnJyk7XHJcblxyXG4gICAgY29uc3QgW2FkZHJlc3NEYXRhLCBzZXRBZGRyZXNzRGF0YV0gPSB1c2VTdGF0ZSh7XHJcbiAgICAgICAgYWRkcmVzc0xpbmUxOiBnZXRJbml0aWFsVmFsdWUoJ2FkZHJlc3NMaW5lMScpIHx8ICcnLFxyXG4gICAgICAgIGFkZHJlc3NMaW5lMjogZ2V0SW5pdGlhbFZhbHVlKCdhZGRyZXNzTGluZTInKSB8fCAnJyxcclxuICAgICAgICBhZGRyZXNzTGluZTM6IGdldEluaXRpYWxWYWx1ZSgnYWRkcmVzc0xpbmUzJykgfHwgJycsXHJcbiAgICAgICAgcGluQ29kZTogZ2V0SW5pdGlhbFZhbHVlKCdwaW5Db2RlJykgfHwgJycsXHJcbiAgICAgICAgbG9jYXRpb246IGhhc0luaXRpYWxDb29yZHMgPyB7IHR5cGU6ICdQb2ludCcsIGNvb3JkaW5hdGVzOiBbaW5pdGlhbExuZywgaW5pdGlhbExhdF0gfSA6IG51bGxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhlbHBlciB0byB0cmlnZ2VyIEFkbWluSlMgb25DaGFuZ2VcclxuICAgIC8vIFdlIHdyYXAgdGhpcyBpbiBhIGN1c3RvbWl6ZWQgaG9vayBvciBqdXN0IGNhbGwgaXQgaW4gdXNlRWZmZWN0XHJcbiAgICBjb25zdCB1cGRhdGVSZWNvcmQgPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgIC8vIFNhbml0aXplIHBpbkNvZGU6IE9ubHkgZGlnaXRzLCBvciBudWxsXHJcbiAgICAgICAgbGV0IGNsZWFuUGluID0gbnVsbDtcclxuICAgICAgICBpZiAoZGF0YS5waW5Db2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0clBpbiA9IFN0cmluZyhkYXRhLnBpbkNvZGUpLnJlcGxhY2UoL1xcRC9nLCAnJyk7IC8vIFJlbW92ZSBub24tZGlnaXRzXHJcbiAgICAgICAgICAgIGlmIChzdHJQaW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYW5QaW4gPSBwYXJzZUludChzdHJQaW4sIDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUGFyc2UgY29vcmRpbmF0ZXMgYW5kIGNoZWNrIGlmIHRoZXkncmUgdmFsaWRcclxuICAgICAgICBjb25zdCBsbmcgPSBwYXJzZUZsb2F0KGRhdGEubG9jYXRpb24/LmNvb3JkaW5hdGVzPy5bMF0pO1xyXG4gICAgICAgIGNvbnN0IGxhdCA9IHBhcnNlRmxvYXQoZGF0YS5sb2NhdGlvbj8uY29vcmRpbmF0ZXM/LlsxXSk7XHJcbiAgICAgICAgY29uc3QgaGFzVmFsaWRDb29yZGluYXRlcyA9ICFpc05hTihsbmcpICYmICFpc05hTihsYXQpICYmIChsbmcgIT09IDAgfHwgbGF0ICE9PSAwKTtcclxuXHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcclxuICAgICAgICAgICAgYWRkcmVzc0xpbmUxOiBkYXRhLmFkZHJlc3NMaW5lMSB8fCAnJyxcclxuICAgICAgICAgICAgYWRkcmVzc0xpbmUyOiBkYXRhLmFkZHJlc3NMaW5lMiB8fCAnJyxcclxuICAgICAgICAgICAgYWRkcmVzc0xpbmUzOiBkYXRhLmFkZHJlc3NMaW5lMyB8fCAnJyxcclxuICAgICAgICAgICAgcGluQ29kZTogY2xlYW5QaW4sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gT25seSBpbmNsdWRlIGxvY2F0aW9uIGlmIHdlIGhhdmUgdmFsaWQgY29vcmRpbmF0ZXNcclxuICAgICAgICBpZiAoaGFzVmFsaWRDb29yZGluYXRlcykge1xyXG4gICAgICAgICAgICBwYXlsb2FkLmxvY2F0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ1BvaW50JyxcclxuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbbG5nLCBsYXRdXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnW0RFQlVHXSBNYXBQaWNrZXIgcGF5bG9hZCAoT2JqZWN0KTonLCBwYXlsb2FkKTtcclxuICAgICAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBwYXlsb2FkKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gR2VuZXJpYyBBZGRyZXNzIFVwZGF0ZXIgZnJvbSBOb21pbmF0aW0gRGF0YVxyXG4gICAgY29uc3QgdXBkYXRlQWRkcmVzc0Zyb21Ob21pbmF0aW0gPSAoZGF0YSwgbGF0LCBsbmcpID0+IHtcclxuICAgICAgICBjb25zdCBhZGRyZXNzID0gZGF0YS5hZGRyZXNzIHx8IHt9O1xyXG5cclxuICAgICAgICAvLyBDb25zdHJ1Y3QgQWRkcmVzcyBMaW5lIDEgKFNpZ25pZmljYW50IHBsYWNlIG5hbWUpXHJcbiAgICAgICAgLy8gT3JkZXIgb2YgcHJlZmVyZW5jZTogYW1lbml0eSwgYnVpbGRpbmcsIHJvYWQsIHZpbGxhZ2UsIHN1YnVyYiwgdG93biwgY2l0eVxyXG4gICAgICAgIGNvbnN0IGxpbmUxID0gYWRkcmVzcy5hbWVuaXR5IHx8IGFkZHJlc3MuYnVpbGRpbmcgfHwgYWRkcmVzcy5yb2FkIHx8IGFkZHJlc3MudmlsbGFnZSB8fCBhZGRyZXNzLnN1YnVyYiB8fCBhZGRyZXNzLnRvd24gfHwgYWRkcmVzcy5jaXR5IHx8IGRhdGEuZGlzcGxheV9uYW1lLnNwbGl0KCcsJylbMF07XHJcblxyXG4gICAgICAgIC8vIENvbnN0cnVjdCBBZGRyZXNzIExpbmUgMiAoRGlzdHJpY3QvU3RhdGUvUmVnaW9uKVxyXG4gICAgICAgIGNvbnN0IGxpbmUyID0gW2FkZHJlc3MuY2l0eSB8fCBhZGRyZXNzLnRvd24sIGFkZHJlc3Muc3RhdGVfZGlzdHJpY3QsIGFkZHJlc3Muc3RhdGVdLmZpbHRlcih4ID0+IHgpLmpvaW4oJywgJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBvc3Rjb2RlID0gYWRkcmVzcy5wb3N0Y29kZSB8fCAnJztcclxuXHJcbiAgICAgICAgc2V0QWRkcmVzc0RhdGEocHJldiA9PiAoe1xyXG4gICAgICAgICAgICAuLi5wcmV2LFxyXG4gICAgICAgICAgICBhZGRyZXNzTGluZTE6IGxpbmUxIHx8ICcnLFxyXG4gICAgICAgICAgICBhZGRyZXNzTGluZTI6IGxpbmUyIHx8ICcnLFxyXG4gICAgICAgICAgICBhZGRyZXNzTGluZTM6IHByZXYuYWRkcmVzc0xpbmUzIHx8ICcnLFxyXG4gICAgICAgICAgICBwaW5Db2RlOiBwb3N0Y29kZSxcclxuICAgICAgICAgICAgbG9jYXRpb246IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdQb2ludCcsXHJcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlczogW2xuZywgbGF0XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBIYW5kbGUgUmV2ZXJzZSBHZW9jb2RpbmcgdmlhIE5vbWluYXRpbVxyXG4gICAgY29uc3QgcmV2ZXJzZUdlb2NvZGUgPSBhc3luYyAobGF0LCBsbmcpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy9yZXZlcnNlP2Zvcm1hdD1qc29uJmxhdD0ke2xhdH0mbG9uPSR7bG5nfSZhZGRyZXNzZGV0YWlscz0xJmFjY2VwdC1sYW5ndWFnZT1lbmAsIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1VzZXItQWdlbnQnOiAnUmVsaWVmRmxvd0FkbWluLzEuMCcgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5hZGRyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVBZGRyZXNzRnJvbU5vbWluYXRpbShkYXRhLCBsYXQsIGxuZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXZlcnNlIGdlb2NvZGluZyBmYWlsZWRcIiwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBMb2FkIExlYWZsZXQgZnJvbSBDRE5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbG9hZExlYWZsZXQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuTCkgcmV0dXJuIHdpbmRvdy5MO1xyXG5cclxuICAgICAgICAgICAgLy8gTG9hZCBDU1NcclxuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVhZmxldC1jc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuICAgICAgICAgICAgICAgIGxpbmsuaWQgPSAnbGVhZmxldC1jc3MnO1xyXG4gICAgICAgICAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XHJcbiAgICAgICAgICAgICAgICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldEAxLjkuNC9kaXN0L2xlYWZsZXQuY3NzJztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIExvYWQgSlNcclxuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVhZmxldC1qcycpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICAgICAgICAgIHNjcmlwdC5pZCA9ICdsZWFmbGV0LWpzJztcclxuICAgICAgICAgICAgICAgIHNjcmlwdC5zcmMgPSAnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldEAxLjkuNC9kaXN0L2xlYWZsZXQuanMnO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7IHNjcmlwdC5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKHdpbmRvdy5MKTsgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBXYWl0IGZvciBpdCB0byBiZSByZWFkeVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2sgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuTCkgeyBjbGVhckludGVydmFsKGNoZWNrKTsgcmVzb2x2ZSh3aW5kb3cuTCk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsb2FkTGVhZmxldCgpLnRoZW4oKEwpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFtYXBJbnN0YW5jZVJlZi5jdXJyZW50ICYmIG1hcENvbnRhaW5lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZW50ZXIgPSBwb3NpdGlvbiB8fCBbMTAuODUwNSwgNzYuMjcxMV07IC8vIERlZmF1bHQgS2VyYWxhXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXAgPSBMLm1hcChtYXBDb250YWluZXJSZWYuY3VycmVudCkuc2V0VmlldyhjZW50ZXIsIHBvc2l0aW9uID8gMTUgOiA3KTtcclxuXHJcbiAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICfCqSBPcGVuU3RyZWV0TWFwIGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG1hcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2xpY2sgZXZlbnRcclxuICAgICAgICAgICAgICAgIG1hcC5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbGF0LCBsbmcgfSA9IGUubGF0bG5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BvcyA9IFtsYXQsIGxuZ107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXJrZXJSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXJSZWYuY3VycmVudC5zZXRMYXRMbmcobmV3UG9zKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXJSZWYuY3VycmVudCA9IEwubWFya2VyKG5ld1BvcykuYWRkVG8obWFwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldFBvc2l0aW9uKG5ld1Bvcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgUmV2ZXJzZSBHZW9jb2RpbmdcclxuICAgICAgICAgICAgICAgICAgICByZXZlcnNlR2VvY29kZShsYXQsIGxuZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9wdGltaXN0aWMgdXBkYXRlIG9mIGNvb3JkaW5hdGVzXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0QWRkcmVzc0RhdGEocHJldiA9PiAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BvaW50JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbbG5nLCBsYXRdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBtYXBJbnN0YW5jZVJlZi5jdXJyZW50ID0gbWFwO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEluaXRpYWwgbWFya2VyXHJcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXJSZWYuY3VycmVudCA9IEwubWFya2VyKHBvc2l0aW9uKS5hZGRUbyhtYXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENsZWFudXBcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobWFwSW5zdGFuY2VSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gbWFwSW5zdGFuY2VSZWYuY3VycmVudC5yZW1vdmUoKTsgLy8gUmVtb3ZpbmcgbWlnaHQgYmUgYWdncmVzc2l2ZSBpZiBjb21wb25lbnQgcmVtb3VudHNcclxuICAgICAgICAgICAgICAgIC8vIG1hcEluc3RhbmNlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0sIFtdKTsgLy8gRW1wdHkgZGVwcywgcnVuIG9uY2Ugb24gbW91bnRcclxuXHJcbiAgICAvLyBUcmFjayBpZiB0aGlzIGlzIHRoZSBpbml0aWFsIG1vdW50IHRvIGF2b2lkIGltbWVkaWF0ZSBzeW5jXHJcbiAgICBjb25zdCBpc0luaXRpYWxNb3VudCA9IHVzZVJlZih0cnVlKTtcclxuXHJcbiAgICAvLyBTeW5jIHN0YXRlIGNoYW5nZXMgdG8gQWRtaW5KU1xyXG4gICAgLy8gVGhpcyBpcyB0aGUgT05MWSBwbGFjZSB3aGVyZSB3ZSBub3RpZnkgQWRtaW5KUyBvZiBjaGFuZ2VzXHJcbiAgICAvLyBTa2lwIHRoZSBmaXJzdCByZW5kZXIgdG8gYXZvaWQgc2VuZGluZyBwb3RlbnRpYWxseSBpbnZhbGlkIGluaXRpYWwgZGF0YVxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAoaXNJbml0aWFsTW91bnQuY3VycmVudCkge1xyXG4gICAgICAgICAgICBpc0luaXRpYWxNb3VudC5jdXJyZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdXBkYXRlUmVjb3JkKGFkZHJlc3NEYXRhKTtcclxuICAgIH0sIFthZGRyZXNzRGF0YV0pO1xyXG5cclxuXHJcbiAgICAvLyBIYW5kbGUgU2VhcmNoXHJcbiAgICBjb25zdCBoYW5kbGVTZWFyY2ggPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFzZWFyY2hRdWVyeSB8fCAhd2luZG93LkwgfHwgIW1hcEluc3RhbmNlUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy9zZWFyY2g/Zm9ybWF0PWpzb24mcT0ke3NlYXJjaFF1ZXJ5fSZsaW1pdD0xJmFkZHJlc3NkZXRhaWxzPTEmYWNjZXB0LWxhbmd1YWdlPWVuYCwge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnVXNlci1BZ2VudCc6ICdSZWxpZWZGbG93QWRtaW4vMS4wJyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgbGF0LCBsb24gfSA9IGRhdGFbMF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdQb3MgPSBbcGFyc2VGbG9hdChsYXQpLCBwYXJzZUZsb2F0KGxvbildO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IEwgPSB3aW5kb3cuTDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hcCA9IG1hcEluc3RhbmNlUmVmLmN1cnJlbnQ7XHJcbiAgICAgICAgICAgICAgICBtYXAuc2V0VmlldyhuZXdQb3MsIDE1KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWFya2VyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXJSZWYuY3VycmVudC5zZXRMYXRMbmcobmV3UG9zKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyUmVmLmN1cnJlbnQgPSBMLm1hcmtlcihuZXdQb3MpLmFkZFRvKG1hcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0UG9zaXRpb24obmV3UG9zKTtcclxuICAgICAgICAgICAgICAgIC8vIFVzZSB0aGUgZGV0YWlsZWQgYWRkcmVzcyBmcm9tIHNlYXJjaCByZXN1bHRcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUFkZHJlc3NGcm9tTm9taW5hdGltKGRhdGFbMF0sIHBhcnNlRmxvYXQobGF0KSwgcGFyc2VGbG9hdChsb24pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNlYXJjaCBmYWlsZWRcIiwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZWJ1ZzogTG9nIGVycm9ycyBvbiBldmVyeSByZW5kZXJcclxuICAgIGlmIChyZWNvcmQ/LmVycm9ycyAmJiBPYmplY3Qua2V5cyhyZWNvcmQuZXJyb3JzKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tERUJVR10gUmVuZGVyIFJlY29yZCBlcnJvcnM6JywgSlNPTi5zdHJpbmdpZnkocmVjb3JkLmVycm9ycywgbnVsbCwgMikpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveCBtYj1cInhsXCI+XHJcbiAgICAgICAgICAgIDxMYWJlbD5Mb2NhdGlvbiBTZWFyY2g8L0xhYmVsPlxyXG4gICAgICAgICAgICA8Qm94IGZsZXggZmxleERpcmVjdGlvbj1cInJvd1wiIG1iPVwiZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaFF1ZXJ5fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoUXVlcnkoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGZvciBhIHBsYWNlIChlLmcuIE1hdmVsaWtrYXJhKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgZmxleEdyb3c6IDEsIG1hcmdpblJpZ2h0OiAnMTBweCcgfX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e2hhbmRsZVNlYXJjaH0gdHlwZT1cImJ1dHRvblwiPlNlYXJjaDwvQnV0dG9uPlxyXG4gICAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICAgIDxCb3ggaGVpZ2h0PVwiNDAwcHhcIiBtYj1cImRlZmF1bHRcIiBib3JkZXI9XCJkZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj17bWFwQ29udGFpbmVyUmVmfSBzdHlsZT17eyBoZWlnaHQ6ICcxMDAlJywgd2lkdGg6ICcxMDAlJyB9fSAvPlxyXG4gICAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICAgIDxGb3JtR3JvdXA+XHJcbiAgICAgICAgICAgICAgICA8TGFiZWw+U2hlbHRlciBBZGRyZXNzIExpbmUgMTwvTGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YWRkcmVzc0RhdGEuYWRkcmVzc0xpbmUxfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QWRkcmVzc0RhdGEocHJldiA9PiAoeyAuLi5wcmV2LCBhZGRyZXNzTGluZTE6IGUudGFyZ2V0LnZhbHVlIH0pKX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG5cclxuICAgICAgICAgICAgPEZvcm1Hcm91cD5cclxuICAgICAgICAgICAgICAgIDxMYWJlbD5TaGVsdGVyIEFkZHJlc3MgTGluZSAyPC9MYWJlbD5cclxuICAgICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXthZGRyZXNzRGF0YS5hZGRyZXNzTGluZTJ9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRBZGRyZXNzRGF0YShwcmV2ID0+ICh7IC4uLnByZXYsIGFkZHJlc3NMaW5lMjogZS50YXJnZXQudmFsdWUgfSkpfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcblxyXG4gICAgICAgICAgICA8Rm9ybUdyb3VwPlxyXG4gICAgICAgICAgICAgICAgPExhYmVsPlNoZWx0ZXIgQWRkcmVzcyBMaW5lIDM8L0xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FkZHJlc3NEYXRhLmFkZHJlc3NMaW5lM31cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEFkZHJlc3NEYXRhKHByZXYgPT4gKHsgLi4ucHJldiwgYWRkcmVzc0xpbmUzOiBlLnRhcmdldC52YWx1ZSB9KSl9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuXHJcbiAgICAgICAgICAgIDxGb3JtR3JvdXA+XHJcbiAgICAgICAgICAgICAgICA8TGFiZWw+UGluIENvZGU8L0xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FkZHJlc3NEYXRhLnBpbkNvZGV9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRBZGRyZXNzRGF0YShwcmV2ID0+ICh7IC4uLnByZXYsIHBpbkNvZGU6IGUudGFyZ2V0LnZhbHVlIH0pKX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG5cclxuICAgICAgICAgICAgPEJveD5cclxuICAgICAgICAgICAgICAgIDxMYWJlbD5Db29yZGluYXRlczwvTGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMC44ZW0nLCBjb2xvcjogJyM4ODgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIExhdDoge2FkZHJlc3NEYXRhLmxvY2F0aW9uPy5jb29yZGluYXRlcz8uWzFdIHx8IDB9LFxyXG4gICAgICAgICAgICAgICAgICAgIExuZzoge2FkZHJlc3NEYXRhLmxvY2F0aW9uPy5jb29yZGluYXRlcz8uWzBdIHx8IDB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFwUGlja2VyO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIExhYmVsIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBNYXBTaG93ID0gKHByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IHJlY29yZCwgcHJvcGVydHkgfSA9IHByb3BzO1xyXG4gICAgY29uc3QgbWFwQ29udGFpbmVyUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gICAgY29uc3QgbWFwSW5zdGFuY2VSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgICBjb25zdCBtYXJrZXJSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gICAgLy8gSW5pdGlhbCBWYWx1ZXNcclxuICAgIC8vIEFkbWluSlMgZmxhdHRlbnMgbmVzdGVkIG9iamVjdHMgaW4gcGFyYW1zLCBlLmcuICdsb2NhdGlvbi5jb29yZGluYXRlcy4wJ1xyXG4gICAgY29uc3QgZ2V0SW5pdGlhbFZhbHVlID0gKHBhdGgpID0+IHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uJHtwYXRofWBdO1xyXG5cclxuICAgIC8vIE5vdGU6IEdlb0pTT04gc3RvcmVzIFtsbmcsIGxhdF0sIGJ1dCBMZWFmbGV0IHVzZXMgW2xhdCwgbG5nXVxyXG4gICAgY29uc3QgaW5pdGlhbExuZyA9IHBhcnNlRmxvYXQoZ2V0SW5pdGlhbFZhbHVlKCdjb29yZGluYXRlcy4wJykpO1xyXG4gICAgY29uc3QgaW5pdGlhbExhdCA9IHBhcnNlRmxvYXQoZ2V0SW5pdGlhbFZhbHVlKCdjb29yZGluYXRlcy4xJykpO1xyXG5cclxuICAgIGNvbnN0IGhhc0xvY2F0aW9uID0gIWlzTmFOKGluaXRpYWxMYXQpICYmICFpc05hTihpbml0aWFsTG5nKTtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gaGFzTG9jYXRpb24gPyBbaW5pdGlhbExhdCwgaW5pdGlhbExuZ10gOiBudWxsO1xyXG5cclxuICAgIC8vIExvYWQgTGVhZmxldCBmcm9tIENETnNcclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbG9hZExlYWZsZXQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuTCkgcmV0dXJuIHdpbmRvdy5MO1xyXG5cclxuICAgICAgICAgICAgLy8gTG9hZCBDU1NcclxuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVhZmxldC1jc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuICAgICAgICAgICAgICAgIGxpbmsuaWQgPSAnbGVhZmxldC1jc3MnO1xyXG4gICAgICAgICAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XHJcbiAgICAgICAgICAgICAgICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldEAxLjkuNC9kaXN0L2xlYWZsZXQuY3NzJztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIExvYWQgSlNcclxuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVhZmxldC1qcycpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICAgICAgICAgIHNjcmlwdC5pZCA9ICdsZWFmbGV0LWpzJztcclxuICAgICAgICAgICAgICAgIHNjcmlwdC5zcmMgPSAnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldEAxLjkuNC9kaXN0L2xlYWZsZXQuanMnO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7IHNjcmlwdC5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKHdpbmRvdy5MKTsgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBXYWl0IGZvciBpdCB0byBiZSByZWFkeVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2sgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuTCkgeyBjbGVhckludGVydmFsKGNoZWNrKTsgcmVzb2x2ZSh3aW5kb3cuTCk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoaGFzTG9jYXRpb24pIHtcclxuICAgICAgICAgICAgbG9hZExlYWZsZXQoKS50aGVuKChMKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1hcEluc3RhbmNlUmVmLmN1cnJlbnQgJiYgbWFwQ29udGFpbmVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjZW50ZXIgPSBwb3NpdGlvbiB8fCBbMTAuODUwNSwgNzYuMjcxMV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFwID0gTC5tYXAobWFwQ29udGFpbmVyUmVmLmN1cnJlbnQpLnNldFZpZXcoY2VudGVyLCAxNSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICfCqSBPcGVuU3RyZWV0TWFwIGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgICAgICAgICB9KS5hZGRUbyhtYXApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBJbml0aWFsIG1hcmtlclxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXJSZWYuY3VycmVudCA9IEwubWFya2VyKHBvc2l0aW9uKS5hZGRUbyhtYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRGlzYWJsZSBpbnRlcmFjdGlvbnMgZm9yIHJlYWQtb25seSB2aWV3XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLmRyYWdnaW5nLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXAudG91Y2hab29tLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXAuZG91YmxlQ2xpY2tab29tLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXAuc2Nyb2xsV2hlZWxab29tLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXAuYm94Wm9vbS5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLmtleWJvYXJkLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFwLnRhcCkgbWFwLnRhcC5kaXNhYmxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hcEluc3RhbmNlUmVmLmN1cnJlbnQgPSBtYXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2xlYW51cFxyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIFdlIGdlbmVyYWxseSBkZXBlbmQgb24gdGhlIGNvbXBvbmVudCB1bm1vdW50aW5nIHRvIGNsZWFuIERPTSByZWZzLCBcclxuICAgICAgICAgICAgLy8gYnV0IExlYWZsZXQgaW5zdGFuY2VzIG1pZ2h0IG5lZWQgbWFudWFsIGNsZWFudXAgaWYgd2Ugd2VyZSByZS1tb3VudGluZyBoZWF2aWx5LlxyXG4gICAgICAgICAgICAvLyBGb3Igc2ltcGxlIHNob3cgdmlld3MsIHRoaXMgaXMgdXN1YWxseSBmaW5lLlxyXG4gICAgICAgIH07XHJcbiAgICB9LCBbaGFzTG9jYXRpb25dKTtcclxuXHJcbiAgICBpZiAoIWhhc0xvY2F0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEJveCBtYj1cInhsXCI+XHJcbiAgICAgICAgICAgICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8Qm94Pk5vIGxvY2F0aW9uIGRhdGEgYXZhaWxhYmxlPC9Cb3g+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94IG1iPVwieGxcIj5cclxuICAgICAgICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxyXG4gICAgICAgICAgICA8Qm94IGhlaWdodD1cIjQwMHB4XCIgbWI9XCJkZWZhdWx0XCIgYm9yZGVyPVwiZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9e21hcENvbnRhaW5lclJlZn0gc3R5bGU9e3sgaGVpZ2h0OiAnMTAwJScsIHdpZHRoOiAnMTAwJScgfX0gLz5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgIDxCb3g+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMC44ZW0nLCBjb2xvcjogJyM4ODgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIExhdDoge2luaXRpYWxMYXR9LCBMbmc6IHtpbml0aWFsTG5nfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hcFNob3c7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIExhYmVsLCBJbnB1dCwgVGV4dEFyZWEsIFNlbGVjdCwgRm9ybUdyb3VwLCBGb3JtTWVzc2FnZSwgQnV0dG9uLCBJY29uIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcbmltcG9ydCB7IEFwaUNsaWVudCwgdXNlUmVjb3JkIH0gZnJvbSAnYWRtaW5qcyc7XHJcblxyXG5jb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XHJcblxyXG5jb25zdCBOb3RpZmljYXRpb25Gb3JtID0gKHByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IHJlY29yZDogaW5pdGlhbFJlY29yZCwgcmVzb3VyY2UsIGFjdGlvbiB9ID0gcHJvcHM7XHJcbiAgICBjb25zdCB7IHJlY29yZCwgaGFuZGxlQ2hhbmdlLCBzdWJtaXQgfSA9IHVzZVJlY29yZChpbml0aWFsUmVjb3JkLCByZXNvdXJjZS5pZCk7XHJcblxyXG4gICAgLy8gRGVsaXZlcnkgbW9kZTogJ2Jyb2FkY2FzdCcgb3IgJ3RhcmdldGVkJ1xyXG4gICAgY29uc3QgW2RlbGl2ZXJ5TW9kZSwgc2V0RGVsaXZlcnlNb2RlXSA9IHVzZVN0YXRlKCdicm9hZGNhc3QnKTtcclxuICAgIGNvbnN0IFt1c2Vycywgc2V0VXNlcnNdID0gdXNlU3RhdGUoW10pO1xyXG4gICAgY29uc3QgW2xvYWRpbmdVc2Vycywgc2V0TG9hZGluZ1VzZXJzXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICAgIGNvbnN0IFtzYXZpbmcsIHNldFNhdmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgICBjb25zdCBbZXJyb3JzLCBzZXRFcnJvcnNdID0gdXNlU3RhdGUoe30pO1xyXG5cclxuICAgIC8vIE5vdGlmaWNhdGlvbiB0eXBlc1xyXG4gICAgY29uc3Qgbm90aWZpY2F0aW9uVHlwZXMgPSBbXHJcbiAgICAgICAgeyB2YWx1ZTogJ2FkbWluX2Jyb2FkY2FzdCcsIGxhYmVsOiAn8J+ToiBBbm5vdW5jZW1lbnQnIH0sXHJcbiAgICAgICAgeyB2YWx1ZTogJ3dlYXRoZXJfYWxlcnQnLCBsYWJlbDogJ+KbiO+4jyBXZWF0aGVyIEFsZXJ0JyB9LFxyXG4gICAgICAgIHsgdmFsdWU6ICdkaXNhc3Rlcl9hbGVydCcsIGxhYmVsOiAn8J+aqCBEaXNhc3RlciBBbGVydCcgfSxcclxuICAgICAgICB7IHZhbHVlOiAncmVsaWVmX2NlbnRlcl91cGRhdGUnLCBsYWJlbDogJ/Cfk40gUmVsaWVmIENlbnRlciBVcGRhdGUnIH0sXHJcbiAgICAgICAgeyB2YWx1ZTogJ3N5c3RlbV9ub3RpZmljYXRpb24nLCBsYWJlbDogJ/CflKcgU3lzdGVtIE5vdGljZScgfSxcclxuICAgIF07XHJcblxyXG4gICAgLy8gQXVkaWVuY2Ugb3B0aW9ucyAoZm9yIGJyb2FkY2FzdCBtb2RlKVxyXG4gICAgY29uc3QgYXVkaWVuY2VPcHRpb25zID0gW1xyXG4gICAgICAgIHsgdmFsdWU6ICdhbGwnLCBsYWJlbDogJ/CfkaUgRXZlcnlvbmUgKFB1YmxpYyArIFZvbHVudGVlcnMpJyB9LFxyXG4gICAgICAgIHsgdmFsdWU6ICdwdWJsaWMnLCBsYWJlbDogJ/Cfj6AgUHVibGljIFVzZXJzIE9ubHknIH0sXHJcbiAgICAgICAgeyB2YWx1ZTogJ3ZvbHVudGVlcicsIGxhYmVsOiAn8J+ZiyBWb2x1bnRlZXJzIE9ubHknIH0sXHJcbiAgICBdO1xyXG5cclxuICAgIC8vIExvYWQgdXNlcnMgZm9yIHRoZSBkcm9wZG93biAoZmV0Y2hpbmcgbW9yZSByZWNvcmRzKVxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBsb2FkVXNlcnMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNldExvYWRpbmdVc2Vycyh0cnVlKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIC8vIEZldGNoIHVwIHRvIDUwMCB1c2VycyB0byBlbnN1cmUgd2UgZ2V0IGJvdGggcHVibGljIGFuZCB2b2x1bnRlZXJzXHJcbiAgICAgICAgICAgICAgICAvLyBJbiBwcm9kdWN0aW9uLCB0aGlzIHNob3VsZCBiZSBhIHNlYXJjaCwgYnV0IGZvciBub3cgaW5jcmVhc2luZyBsaW1pdCBoZWxwc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlSWQ6ICd1c2VyUHJvZmlsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ2xpc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiB7IHBlclBhZ2U6IDUwMCB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnJlY29yZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRVc2VycyhyZXNwb25zZS5kYXRhLnJlY29yZHMubWFwKHIgPT4gKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHIuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBgJHtyLnBhcmFtcy5uYW1lfSAoJHtyLnBhcmFtcy5yb2xlfSlgLCAvLyBTaW1wbGlmaWVkIGxhYmVsXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBsb2FkIHVzZXJzOicsIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRMb2FkaW5nVXNlcnMoZmFsc2UpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbG9hZFVzZXJzKCk7XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSBkZWZhdWx0IHZhbHVlc1xyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAoIXJlY29yZC5wYXJhbXMudHlwZSkge1xyXG4gICAgICAgICAgICBoYW5kbGVDaGFuZ2UoeyBwYXJhbXM6IHsgLi4ucmVjb3JkLnBhcmFtcywgdHlwZTogJ2FkbWluX2Jyb2FkY2FzdCcgfSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyZWNvcmQucGFyYW1zLnRhcmdldFVzZXJUeXBlKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZUNoYW5nZSh7IHBhcmFtczogeyAuLi5yZWNvcmQucGFyYW1zLCB0YXJnZXRVc2VyVHlwZTogJ2FsbCcgfSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIGRlbGl2ZXJ5IG1vZGUgY2hhbmdlXHJcbiAgICBjb25zdCBoYW5kbGVEZWxpdmVyeU1vZGVDaGFuZ2UgPSAobW9kZSkgPT4ge1xyXG4gICAgICAgIHNldERlbGl2ZXJ5TW9kZShtb2RlKTtcclxuICAgICAgICBpZiAobW9kZSA9PT0gJ2Jyb2FkY2FzdCcpIHtcclxuICAgICAgICAgICAgLy8gQnJvYWRjYXN0IG1vZGU6IENsZWFyIHJlY2lwaWVudCwgZW5zdXJlIHRhcmdldFVzZXJUeXBlIGlzIHNldCBmcm9tIGRyb3Bkb3duIChvciBkZWZhdWx0IHRvIGFsbClcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudEF1ZGllbmNlID0gcmVjb3JkLnBhcmFtcy50YXJnZXRVc2VyVHlwZSA9PT0gJ2FsbCcgfHwgcmVjb3JkLnBhcmFtcy50YXJnZXRVc2VyVHlwZSA9PT0gJ3B1YmxpYycgfHwgcmVjb3JkLnBhcmFtcy50YXJnZXRVc2VyVHlwZSA9PT0gJ3ZvbHVudGVlcidcclxuICAgICAgICAgICAgICAgID8gcmVjb3JkLnBhcmFtcy50YXJnZXRVc2VyVHlwZVxyXG4gICAgICAgICAgICAgICAgOiAnYWxsJztcclxuXHJcbiAgICAgICAgICAgIGhhbmRsZUNoYW5nZSh7IHBhcmFtczogeyAuLi5yZWNvcmQucGFyYW1zLCByZWNpcGllbnRJZDogbnVsbCwgdGFyZ2V0VXNlclR5cGU6IGN1cnJlbnRBdWRpZW5jZSB9IH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRhcmdldGVkIG1vZGU6IEZvcmNlIHRhcmdldFVzZXJUeXBlIHRvICdhbGwnIHNvIHF1ZXJ5IGxvZ2ljIHdvcmtzIChyZWNpcGllbnRJZCB0YWtlcyBwcmVjZWRlbmNlKVxyXG4gICAgICAgICAgICBoYW5kbGVDaGFuZ2UoeyBwYXJhbXM6IHsgLi4ucmVjb3JkLnBhcmFtcywgdGFyZ2V0VXNlclR5cGU6ICdhbGwnIH0gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBIYW5kbGUgZm9ybSBzdWJtaXNzaW9uXHJcbiAgICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBzZXRTYXZpbmcodHJ1ZSk7XHJcbiAgICAgICAgc2V0RXJyb3JzKHt9KTtcclxuXHJcbiAgICAgICAgLy8gVmFsaWRhdGlvblxyXG4gICAgICAgIGNvbnN0IG5ld0Vycm9ycyA9IHt9O1xyXG4gICAgICAgIGlmICghcmVjb3JkLnBhcmFtcy50aXRsZT8udHJpbSgpKSB7XHJcbiAgICAgICAgICAgIG5ld0Vycm9ycy50aXRsZSA9ICdUaXRsZSBpcyByZXF1aXJlZCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcmVjb3JkLnBhcmFtcy5ib2R5Py50cmltKCkpIHtcclxuICAgICAgICAgICAgbmV3RXJyb3JzLmJvZHkgPSAnTWVzc2FnZSBpcyByZXF1aXJlZCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcmVjb3JkLnBhcmFtcy50eXBlKSB7XHJcbiAgICAgICAgICAgIG5ld0Vycm9ycy50eXBlID0gJ1BsZWFzZSBzZWxlY3QgYSBub3RpZmljYXRpb24gdHlwZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkZWxpdmVyeU1vZGUgPT09ICd0YXJnZXRlZCcgJiYgIXJlY29yZC5wYXJhbXMucmVjaXBpZW50SWQpIHtcclxuICAgICAgICAgICAgbmV3RXJyb3JzLnJlY2lwaWVudElkID0gJ1BsZWFzZSBzZWxlY3QgYSB1c2VyIGZvciB0YXJnZXRlZCBub3RpZmljYXRpb24nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKG5ld0Vycm9ycykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBzZXRFcnJvcnMobmV3RXJyb3JzKTtcclxuICAgICAgICAgICAgc2V0U2F2aW5nKGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzdWJtaXQoKTtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEucmVkaXJlY3RVcmwpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzcG9uc2UuZGF0YS5yZWRpcmVjdFVybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzYXZlIG5vdGlmaWNhdGlvbjonLCBlcnJvcik7XHJcbiAgICAgICAgICAgIHNldEVycm9ycyh7IGdlbmVyYWw6ICdGYWlsZWQgdG8gc2F2ZSBub3RpZmljYXRpb24uIFBsZWFzZSB0cnkgYWdhaW4uJyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0U2F2aW5nKGZhbHNlKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gU3R5bGVzXHJcbiAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgICAgY29udGFpbmVyOiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2NjdlZWEgMCUsICM3NjRiYTIgMTAwJSknLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzI0cHgnLFxyXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206ICcyNHB4JyxcclxuICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkZXJUaXRsZToge1xyXG4gICAgICAgICAgICBtYXJnaW46IDAsXHJcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzhweCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMjRweCcsXHJcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBnYXA6ICcxMHB4JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhlYWRlclN1YnRpdGxlOiB7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCxcclxuICAgICAgICAgICAgb3BhY2l0eTogMC45LFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzE0cHgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VjdGlvbjoge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzI0cHgnLFxyXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206ICcyMHB4JyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiAnMCAycHggOHB4IHJnYmEoMCwwLDAsMC4wOCknLFxyXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2VlZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWN0aW9uVGl0bGU6IHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJzYwMCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnIzMzMycsXHJcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzE2cHgnLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBnYXA6ICc4cHgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9nZ2xlQ29udGFpbmVyOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgZ2FwOiAnMTJweCcsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzEycHgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9nZ2xlQnV0dG9uOiAoaXNBY3RpdmUpID0+ICh7XHJcbiAgICAgICAgICAgIGZsZXg6IDEsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcxNnB4IDIwcHgnLFxyXG4gICAgICAgICAgICBib3JkZXI6IGlzQWN0aXZlID8gJzJweCBzb2xpZCAjNjY3ZWVhJyA6ICcycHggc29saWQgI2UwZTBlMCcsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwcHgnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBpc0FjdGl2ZSA/ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjY3ZWVhIDAlLCAjNzY0YmEyIDEwMCUpJyA6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgIGNvbG9yOiBpc0FjdGl2ZSA/ICd3aGl0ZScgOiAnIzY2NicsXHJcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnYWxsIDAuMnMgZWFzZScsXHJcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICc1MDAnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzE0cHgnLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgZ2FwOiAnOHB4JyxcclxuICAgICAgICB9KSxcclxuICAgICAgICB0b2dnbGVJY29uOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMjRweCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWJtaXRCdXR0b246IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2NjdlZWEgMCUsICM3NjRiYTIgMTAwJSknLFxyXG4gICAgICAgICAgICBib3JkZXI6ICdub25lJyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzE0cHggMzJweCcsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwcHgnLFxyXG4gICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJzYwMCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBnYXA6ICcxMHB4JyxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjJzIGVhc2UsIGJveC1zaGFkb3cgMC4ycyBlYXNlJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yQm94OiB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZmZmNWY1JyxcclxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNmZWIyYjInLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAnMTJweCAxNnB4JyxcclxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMjBweCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnI2M1MzAzMCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoaW50OiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTNweCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnIzg4OCcsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzhweCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYWJlbDoge1xyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnNTAwJyxcclxuICAgICAgICAgICAgY29sb3I6ICcjNDQ0JyxcclxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlcXVpcmVkOiB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAnI2U1M2UzZScsXHJcbiAgICAgICAgICAgIG1hcmdpbkxlZnQ6ICc0cHgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnVsbFdpZHRoSW5wdXQ6IHtcclxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxCb3ggYXM9XCJmb3JtXCIgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gc3R5bGU9e3N0eWxlcy5jb250YWluZXJ9PlxyXG4gICAgICAgICAgICB7LyogSGVhZGVyICovfVxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuaGVhZGVyfT5cclxuICAgICAgICAgICAgICAgIDxoMiBzdHlsZT17c3R5bGVzLmhlYWRlclRpdGxlfT5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj7wn5OsPC9zcGFuPiBDcmVhdGUgTm90aWZpY2F0aW9uXHJcbiAgICAgICAgICAgICAgICA8L2gyPlxyXG4gICAgICAgICAgICAgICAgPHAgc3R5bGU9e3N0eWxlcy5oZWFkZXJTdWJ0aXRsZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgU2VuZCBhbm5vdW5jZW1lbnRzLCBhbGVydHMsIG9yIHVwZGF0ZXMgdG8geW91ciB1c2Vyc1xyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIHtlcnJvcnMuZ2VuZXJhbCAmJiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZXJyb3JCb3h9PlxyXG4gICAgICAgICAgICAgICAgICAgIOKaoO+4jyB7ZXJyb3JzLmdlbmVyYWx9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgIHsvKiBDb250ZW50IFNlY3Rpb24gKi99XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zZWN0aW9ufT5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zZWN0aW9uVGl0bGV9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPuKcj++4jzwvc3Bhbj4gTm90aWZpY2F0aW9uIENvbnRlbnRcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIHsvKiBUaXRsZSAqL31cclxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgZXJyb3I9e2Vycm9ycy50aXRsZX0gbWI9XCJ4bFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBzdHlsZT17c3R5bGVzLmxhYmVsfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uIFRpdGxlIDxzcGFuIHN0eWxlPXtzdHlsZXMucmVxdWlyZWR9Pio8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3JlY29yZC5wYXJhbXMudGl0bGUgfHwgJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlQ2hhbmdlKHsgcGFyYW1zOiB7IC4uLnJlY29yZC5wYXJhbXMsIHRpdGxlOiBlLnRhcmdldC52YWx1ZSB9IH0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIGEgc2hvcnQsIGF0dGVudGlvbi1ncmFiYmluZyBoZWFkbGluZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJvcmRlclJhZGl1czogJzhweCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIHtlcnJvcnMudGl0bGUgJiYgPEZvcm1NZXNzYWdlPntlcnJvcnMudGl0bGV9PC9Gb3JtTWVzc2FnZT59XHJcbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuXHJcbiAgICAgICAgICAgICAgICB7LyogTWVzc2FnZSAqL31cclxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgZXJyb3I9e2Vycm9ycy5ib2R5fSBtYj1cInhsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIHN0eWxlPXtzdHlsZXMubGFiZWx9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNZXNzYWdlIDxzcGFuIHN0eWxlPXtzdHlsZXMucmVxdWlyZWR9Pio8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8VGV4dEFyZWFcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3JlY29yZC5wYXJhbXMuYm9keSB8fCAnJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVDaGFuZ2UoeyBwYXJhbXM6IHsgLi4ucmVjb3JkLnBhcmFtcywgYm9keTogZS50YXJnZXQudmFsdWUgfSB9KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB0aGUgZGV0YWlsZWQgbm90aWZpY2F0aW9uIGNvbnRlbnRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzPXs1fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBib3JkZXJSYWRpdXM6ICc4cHgnLCB3aWR0aDogJzEwMCUnLCBtaW5IZWlnaHQ6ICcxMjBweCcgfX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIHtlcnJvcnMuYm9keSAmJiA8Rm9ybU1lc3NhZ2U+e2Vycm9ycy5ib2R5fTwvRm9ybU1lc3NhZ2U+fVxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcblxyXG4gICAgICAgICAgICAgICAgey8qIE5vdGlmaWNhdGlvbiBUeXBlICovfVxyXG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBlcnJvcj17ZXJyb3JzLnR5cGV9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBzdHlsZT17c3R5bGVzLmxhYmVsfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uIFR5cGUgPHNwYW4gc3R5bGU9e3N0eWxlcy5yZXF1aXJlZH0+Kjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e25vdGlmaWNhdGlvblR5cGVzLmZpbmQodCA9PiB0LnZhbHVlID09PSByZWNvcmQucGFyYW1zLnR5cGUpIHx8IG5vdGlmaWNhdGlvblR5cGVzWzBdfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtub3RpZmljYXRpb25UeXBlc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhzZWxlY3RlZCkgPT4gaGFuZGxlQ2hhbmdlKHsgcGFyYW1zOiB7IC4uLnJlY29yZC5wYXJhbXMsIHR5cGU6IHNlbGVjdGVkLnZhbHVlIH0gfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICB7ZXJyb3JzLnR5cGUgJiYgPEZvcm1NZXNzYWdlPntlcnJvcnMudHlwZX08L0Zvcm1NZXNzYWdlPn1cclxuICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIHsvKiBEZWxpdmVyeSBTZWN0aW9uICovfVxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuc2VjdGlvbn0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuc2VjdGlvblRpdGxlfT5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj7wn5OkPC9zcGFuPiBEZWxpdmVyeSBPcHRpb25zXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgc3R5bGU9e3N0eWxlcy5sYWJlbH0+V2hvIHNob3VsZCByZWNlaXZlIHRoaXMgbm90aWZpY2F0aW9uPzwvbGFiZWw+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnRvZ2dsZUNvbnRhaW5lcn0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy50b2dnbGVCdXR0b24oZGVsaXZlcnlNb2RlID09PSAnYnJvYWRjYXN0Jyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZURlbGl2ZXJ5TW9kZUNoYW5nZSgnYnJvYWRjYXN0Jyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLnRvZ2dsZUljb259PvCfk6I8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkJyb2FkY2FzdCB0byBBdWRpZW5jZTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4Jywgb3BhY2l0eTogMC44IH19PlNlbmQgdG8gYSBncm91cCBvZiB1c2Vyczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLnRvZ2dsZUJ1dHRvbihkZWxpdmVyeU1vZGUgPT09ICd0YXJnZXRlZCcpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVEZWxpdmVyeU1vZGVDaGFuZ2UoJ3RhcmdldGVkJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLnRvZ2dsZUljb259PvCfjq88L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlNlbmQgdG8gU3BlY2lmaWMgVXNlcjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4Jywgb3BhY2l0eTogMC44IH19PlNlbmQgdG8gb25lIHBlcnNvbiBvbmx5PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgey8qIENvbmRpdGlvbmFsOiBBdWRpZW5jZSBvciBVc2VyIFBpY2tlciAqL31cclxuICAgICAgICAgICAgICAgIDxCb3ggbXQ9XCJ4bFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHtkZWxpdmVyeU1vZGUgPT09ICdicm9hZGNhc3QnID8gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIHN0eWxlPXtzdHlsZXMubGFiZWx9PlNlbGVjdCBBdWRpZW5jZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2F1ZGllbmNlT3B0aW9ucy5maW5kKGEgPT4gYS52YWx1ZSA9PT0gcmVjb3JkLnBhcmFtcy50YXJnZXRVc2VyVHlwZSkgfHwgYXVkaWVuY2VPcHRpb25zWzBdfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e2F1ZGllbmNlT3B0aW9uc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHNlbGVjdGVkKSA9PiBoYW5kbGVDaGFuZ2UoeyBwYXJhbXM6IHsgLi4ucmVjb3JkLnBhcmFtcywgdGFyZ2V0VXNlclR5cGU6IHNlbGVjdGVkLnZhbHVlLCByZWNpcGllbnRJZDogbnVsbCB9IH0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIHN0eWxlPXtzdHlsZXMuaGludH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4oS577iPIFRoaXMgbm90aWZpY2F0aW9uIHdpbGwgYmUgc2VudCB0byBhbGwgdXNlcnMgaW4gdGhlIHNlbGVjdGVkIGF1ZGllbmNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuICAgICAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGVycm9yPXtlcnJvcnMucmVjaXBpZW50SWR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIHN0eWxlPXtzdHlsZXMubGFiZWx9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdCBVc2VyIDxzcGFuIHN0eWxlPXtzdHlsZXMucmVxdWlyZWR9Pio8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt1c2Vycy5maW5kKHUgPT4gdS52YWx1ZSA9PT0gcmVjb3JkLnBhcmFtcy5yZWNpcGllbnRJZCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17dXNlcnN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nPXtsb2FkaW5nVXNlcnN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhzZWxlY3RlZCkgPT4gaGFuZGxlQ2hhbmdlKHsgcGFyYW1zOiB7IC4uLnJlY29yZC5wYXJhbXMsIHJlY2lwaWVudElkOiBzZWxlY3RlZD8udmFsdWUsIHRhcmdldFVzZXJUeXBlOiAnYWxsJyB9IH0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGFuZCBzZWxlY3QgYSB1c2VyLi4uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NsZWFyYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlcnJvcnMucmVjaXBpZW50SWQgJiYgPEZvcm1NZXNzYWdlPntlcnJvcnMucmVjaXBpZW50SWR9PC9Gb3JtTWVzc2FnZT59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBzdHlsZT17c3R5bGVzLmhpbnR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKEue+4jyBUaGlzIG5vdGlmaWNhdGlvbiB3aWxsIGJlIHNlbnQgb25seSB0byB0aGUgc2VsZWN0ZWQgdXNlci5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIHsvKiBTdWJtaXQgQnV0dG9uICovfVxyXG4gICAgICAgICAgICA8Qm94IG10PVwieGxcIiBtYj1cInhsXCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLnN1Ym1pdEJ1dHRvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogc2F2aW5nID8gMC43IDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBzYXZpbmcgPyAnbm90LWFsbG93ZWQnIDogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3NhdmluZ31cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7c2F2aW5nID8gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8PuKPsyBTZW5kaW5nLi4uPC8+XHJcbiAgICAgICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPD7wn5OkIFNlbmQgTm90aWZpY2F0aW9uPC8+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICA8L0JveD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOb3RpZmljYXRpb25Gb3JtO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCwgTGFiZWwsIFRleHQsIExpbmsgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbi8qKlxyXG4gKiBBZGRyZXNzU2hvdyAtIEEgY2xlYW4gY29tcG9uZW50IGZvciBkaXNwbGF5aW5nIGFkZHJlc3MgaW4gQWRtaW5KUyBzaG93IHZpZXdzXHJcbiAqIFNob3dzIGZvcm1hdHRlZCBhZGRyZXNzIHdpdGggYSBzbWFsbCBtYXAgcHJldmlldyBhbmQgYSBcIkdldCBEaXJlY3Rpb25zXCIgbGlua1xyXG4gKi9cclxuY29uc3QgQWRkcmVzc1Nob3cgPSAocHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgcmVjb3JkLCBwcm9wZXJ0eSB9ID0gcHJvcHM7XHJcbiAgICBjb25zdCBtYXBDb250YWluZXJSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgICBjb25zdCBtYXBJbnN0YW5jZVJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgICAvLyBFeHRyYWN0IGFkZHJlc3MgZmllbGRzIGZyb20gZmxhdHRlbmVkIEFkbWluSlMgcGFyYW1zXHJcbiAgICBjb25zdCBnZXRGaWVsZFZhbHVlID0gKHBhdGgpID0+IHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uJHtwYXRofWBdO1xyXG5cclxuICAgIGNvbnN0IGFkZHJlc3NMaW5lMSA9IGdldEZpZWxkVmFsdWUoJ2FkZHJlc3NMaW5lMScpIHx8ICcnO1xyXG4gICAgY29uc3QgYWRkcmVzc0xpbmUyID0gZ2V0RmllbGRWYWx1ZSgnYWRkcmVzc0xpbmUyJykgfHwgJyc7XHJcbiAgICBjb25zdCBhZGRyZXNzTGluZTMgPSBnZXRGaWVsZFZhbHVlKCdhZGRyZXNzTGluZTMnKSB8fCAnJztcclxuICAgIGNvbnN0IHBpbkNvZGUgPSBnZXRGaWVsZFZhbHVlKCdwaW5Db2RlJykgfHwgJyc7XHJcblxyXG4gICAgLy8gTG9jYXRpb24gY29vcmRpbmF0ZXMgKEdlb0pTT04gZm9ybWF0OiBbbG5nLCBsYXRdKVxyXG4gICAgY29uc3QgcGFyc2VkTG5nID0gcGFyc2VGbG9hdChnZXRGaWVsZFZhbHVlKCdsb2NhdGlvbi5jb29yZGluYXRlcy4wJykpO1xyXG4gICAgY29uc3QgcGFyc2VkTGF0ID0gcGFyc2VGbG9hdChnZXRGaWVsZFZhbHVlKCdsb2NhdGlvbi5jb29yZGluYXRlcy4xJykpO1xyXG4gICAgY29uc3QgbG5nID0gIWlzTmFOKHBhcnNlZExuZykgPyBwYXJzZWRMbmcgOiAwO1xyXG4gICAgY29uc3QgbGF0ID0gIWlzTmFOKHBhcnNlZExhdCkgPyBwYXJzZWRMYXQgOiAwO1xyXG4gICAgY29uc3QgaGFzQ29vcmRpbmF0ZXMgPSAhaXNOYU4ocGFyc2VkTGF0KSAmJiAhaXNOYU4ocGFyc2VkTG5nKSAmJiAobGF0ICE9PSAwIHx8IGxuZyAhPT0gMCk7XHJcblxyXG4gICAgLy8gQnVpbGQgZm9ybWF0dGVkIGFkZHJlc3MgcGFydHNcclxuICAgIGNvbnN0IGFkZHJlc3NQYXJ0cyA9IFthZGRyZXNzTGluZTEsIGFkZHJlc3NMaW5lMiwgYWRkcmVzc0xpbmUzXS5maWx0ZXIobGluZSA9PiBsaW5lICYmIGxpbmUudHJpbSgpICE9PSAnJyk7XHJcbiAgICBjb25zdCBmb3JtYXR0ZWRBZGRyZXNzID0gYWRkcmVzc1BhcnRzLmpvaW4oJywgJykgKyAocGluQ29kZSA/IGAgLSAke3BpbkNvZGV9YCA6ICcnKTtcclxuXHJcbiAgICAvLyBHb29nbGUgTWFwcyBkaXJlY3Rpb25zIFVSTFxyXG4gICAgY29uc3QgbWFwc1VybCA9IGhhc0Nvb3JkaW5hdGVzXHJcbiAgICAgICAgPyBgaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL2Rpci8/YXBpPTEmZGVzdGluYXRpb249JHtsYXR9LCR7bG5nfWBcclxuICAgICAgICA6IGBodHRwczovL3d3dy5nb29nbGUuY29tL21hcHMvc2VhcmNoLz9hcGk9MSZxdWVyeT0ke2VuY29kZVVSSUNvbXBvbmVudChmb3JtYXR0ZWRBZGRyZXNzKX1gO1xyXG5cclxuICAgIC8vIExvYWQgTGVhZmxldCBhbmQgZGlzcGxheSBtYXBcclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFoYXNDb29yZGluYXRlcykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBsb2FkTGVhZmxldCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5MKSByZXR1cm4gd2luZG93Lkw7XHJcblxyXG4gICAgICAgICAgICAvLyBMb2FkIENTU1xyXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWFmbGV0LWNzcycpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gICAgICAgICAgICAgICAgbGluay5pZCA9ICdsZWFmbGV0LWNzcyc7XHJcbiAgICAgICAgICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcclxuICAgICAgICAgICAgICAgIGxpbmsuaHJlZiA9ICdodHRwczovL3VucGtnLmNvbS9sZWFmbGV0QDEuOS40L2Rpc3QvbGVhZmxldC5jc3MnO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTG9hZCBKU1xyXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWFmbGV0LWpzJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgICAgICAgICAgICAgc2NyaXB0LmlkID0gJ2xlYWZsZXQtanMnO1xyXG4gICAgICAgICAgICAgICAgc2NyaXB0LnNyYyA9ICdodHRwczovL3VucGtnLmNvbS9sZWFmbGV0QDEuOS40L2Rpc3QvbGVhZmxldC5qcyc7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4gcmVzb2x2ZSh3aW5kb3cuTCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LkwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY2hlY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh3aW5kb3cuTCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsb2FkTGVhZmxldCgpLnRoZW4oKEwpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFtYXBJbnN0YW5jZVJlZi5jdXJyZW50ICYmIG1hcENvbnRhaW5lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXAgPSBMLm1hcChtYXBDb250YWluZXJSZWYuY3VycmVudCwge1xyXG4gICAgICAgICAgICAgICAgICAgIHpvb21Db250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkcmFnZ2luZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsV2hlZWxab29tOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkb3VibGVDbGlja1pvb206IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoWm9vbTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KS5zZXRWaWV3KFtsYXQsIGxuZ10sIDE1KTtcclxuXHJcbiAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICfCqSBPU00nXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUbyhtYXApO1xyXG5cclxuICAgICAgICAgICAgICAgIEwubWFya2VyKFtsYXQsIGxuZ10pLmFkZFRvKG1hcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWFwSW5zdGFuY2VSZWYuY3VycmVudCA9IG1hcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobWFwSW5zdGFuY2VSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgbWFwSW5zdGFuY2VSZWYuY3VycmVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIG1hcEluc3RhbmNlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0sIFtsYXQsIGxuZywgaGFzQ29vcmRpbmF0ZXNdKTtcclxuXHJcbiAgICAvLyBJZiBubyBhZGRyZXNzIGRhdGEgYXQgYWxsXHJcbiAgICBpZiAoIWFkZHJlc3NMaW5lMSAmJiAhYWRkcmVzc0xpbmUyICYmICFhZGRyZXNzTGluZTMgJiYgIXBpbkNvZGUgJiYgIWhhc0Nvb3JkaW5hdGVzKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEJveCBtYj1cImxnXCI+XHJcbiAgICAgICAgICAgICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsIHx8ICdBZGRyZXNzJ308L0xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPFRleHQgdmFyaWFudD1cInNtXCIgY29sb3I9XCJncmV5NjBcIj5ObyBhZGRyZXNzIHByb3ZpZGVkPC9UZXh0PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveCBtYj1cImxnXCI+XHJcbiAgICAgICAgICAgIDxMYWJlbCBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc4cHgnLCBmb250V2VpZ2h0OiA2MDAgfX0+XHJcbiAgICAgICAgICAgICAgICB7cHJvcGVydHkubGFiZWwgfHwgJ0FkZHJlc3MnfVxyXG4gICAgICAgICAgICA8L0xhYmVsPlxyXG5cclxuICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2Y4ZjlmYSAwJSwgI2U5ZWNlZiAxMDAlKScsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzE2cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZGVlMmU2JyxcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHsvKiBBZGRyZXNzIFRleHQgKi99XHJcbiAgICAgICAgICAgICAgICA8Qm94IG1iPVwiZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCb3ggZmxleCBmbGV4RGlyZWN0aW9uPVwicm93XCIgYWxpZ25JdGVtcz1cImZsZXgtc3RhcnRcIiBzdHlsZT17eyBnYXA6ICc4cHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzE4cHgnIH19PvCfk408L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb3g+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YWRkcmVzc0xpbmUxICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250V2VpZ2h0OiA1MDAsIGZvbnRTaXplOiAnMTRweCcsIGNvbG9yOiAnIzIxMjUyOScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthZGRyZXNzTGluZTF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthZGRyZXNzTGluZTIgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMTNweCcsIGNvbG9yOiAnIzQ5NTA1NycgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthZGRyZXNzTGluZTJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthZGRyZXNzTGluZTMgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMTNweCcsIGNvbG9yOiAnIzZjNzU3ZCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthZGRyZXNzTGluZTN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwaW5Db2RlICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzEzcHgnLCBjb2xvcjogJyM2Yzc1N2QnLCBtYXJnaW5Ub3A6ICc0cHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQSU46IHtwaW5Db2RlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAgICAgICAgey8qIE1hcCBQcmV2aWV3ICovfVxyXG4gICAgICAgICAgICAgICAge2hhc0Nvb3JkaW5hdGVzICYmIChcclxuICAgICAgICAgICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxODBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMTJweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2NlZDRkYScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj17bWFwQ29udGFpbmVyUmVmfSBzdHlsZT17eyBoZWlnaHQ6ICcxMDAlJywgd2lkdGg6ICcxMDAlJyB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgICAgICB7LyogQWN0aW9ucyAqL31cclxuICAgICAgICAgICAgICAgIDxCb3ggZmxleCBmbGV4RGlyZWN0aW9uPVwicm93XCIgc3R5bGU9e3sgZ2FwOiAnMTJweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj17bWFwc1VybH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6ICc2cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzhweCAxNHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyM0Mjg1ZjQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dERlY29yYXRpb246ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTNweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA1MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnYmFja2dyb3VuZC1jb2xvciAwLjJzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZU92ZXI9eyhlKSA9PiBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMzMzY3ZDYnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlT3V0PXsoZSkgPT4gZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjNDI4NWY0J31cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIPCfp60gR2V0IERpcmVjdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICA8L2E+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHtoYXNDb29yZGluYXRlcyAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwieHNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJncmV5NjBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgYWxpZ25TZWxmOiAnY2VudGVyJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGF0LnRvRml4ZWQoNSl9LCB7bG5nLnRvRml4ZWQoNSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFkZHJlc3NTaG93O1xyXG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0Rhc2hib2FyZCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRGFzaGJvYXJkID0gRGFzaGJvYXJkXG5pbXBvcnQgTGlua0NvbXBvbmVudCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTGlua0NvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuTGlua0NvbXBvbmVudCA9IExpbmtDb21wb25lbnRcbmltcG9ydCBWb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlZvbHVudGVlckZpbHRlcmVkU2VsZWN0ID0gVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3RcbmltcG9ydCBTdGF0dXNGaWx0ZXJlZFNlbGVjdCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvQWlkUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5TdGF0dXNGaWx0ZXJlZFNlbGVjdCA9IFN0YXR1c0ZpbHRlcmVkU2VsZWN0XG5pbXBvcnQgRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0RvbmF0aW9uUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Eb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdCA9IERvbmF0aW9uUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0XG5pbXBvcnQgTG9naW5Db21wb25lbnQgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0xvZ2luQ29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Mb2dpbkNvbXBvbmVudCA9IExvZ2luQ29tcG9uZW50XG5pbXBvcnQgSW1hZ2VDb21wb25lbnQgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlQ29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5JbWFnZUNvbXBvbmVudCA9IEltYWdlQ29tcG9uZW50XG5pbXBvcnQgSW1hZ2VMaXN0Q29tcG9uZW50IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUxpc3RDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlTGlzdENvbXBvbmVudCA9IEltYWdlTGlzdENvbXBvbmVudFxuaW1wb3J0IEltYWdlRWRpdENvbXBvbmVudCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSW1hZ2VFZGl0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5JbWFnZUVkaXRDb21wb25lbnQgPSBJbWFnZUVkaXRDb21wb25lbnRcbmltcG9ydCBJbWFnZUxpc3RFZGl0Q29tcG9uZW50IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUxpc3RFZGl0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5JbWFnZUxpc3RFZGl0Q29tcG9uZW50ID0gSW1hZ2VMaXN0RWRpdENvbXBvbmVudFxuaW1wb3J0IENyZWF0ZVRhc2tGcm9tQWlkUmVxdWVzdCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvQ3JlYXRlVGFza0Zyb21BaWRSZXF1ZXN0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5DcmVhdGVUYXNrRnJvbUFpZFJlcXVlc3QgPSBDcmVhdGVUYXNrRnJvbUFpZFJlcXVlc3RcbmltcG9ydCBNYXBQaWNrZXIgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL01hcFBpY2tlcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuTWFwUGlja2VyID0gTWFwUGlja2VyXG5pbXBvcnQgTWFwU2hvdyBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTWFwU2hvdydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuTWFwU2hvdyA9IE1hcFNob3dcbmltcG9ydCBIZWF0bWFwVmlzdWFsaXphdGlvbiBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSGVhdG1hcFZpc3VhbGl6YXRpb24nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkhlYXRtYXBWaXN1YWxpemF0aW9uID0gSGVhdG1hcFZpc3VhbGl6YXRpb25cbmltcG9ydCBOb3RpZmljYXRpb25Gb3JtIGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Ob3RpZmljYXRpb25Gb3JtJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Ob3RpZmljYXRpb25Gb3JtID0gTm90aWZpY2F0aW9uRm9ybVxuaW1wb3J0IEFkZHJlc3NTaG93IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9BZGRyZXNzU2hvdydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQWRkcmVzc1Nob3cgPSBBZGRyZXNzU2hvdyJdLCJuYW1lcyI6WyJIZWF0bWFwVmlzdWFsaXphdGlvbiIsIm1hcENvbnRhaW5lclJlZiIsInVzZVJlZiIsIm1hcEluc3RhbmNlUmVmIiwiaGVhdExheWVyUmVmIiwibG9hZGluZyIsInNldExvYWRpbmciLCJ1c2VTdGF0ZSIsImVycm9yIiwic2V0RXJyb3IiLCJjYXNlQ291bnQiLCJzZXRDYXNlQ291bnQiLCJub0RhdGEiLCJzZXROb0RhdGEiLCJ1c2VFZmZlY3QiLCJpc01vdW50ZWQiLCJsb2FkTGlicmFyaWVzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImxpbmsiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJyZWwiLCJocmVmIiwiaGVhZCIsImFwcGVuZENoaWxkIiwid2luZG93IiwiTCIsInNjcmlwdCIsInNyYyIsImJvZHkiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ubG9hZCIsIm9uZXJyb3IiLCJoZWF0TGF5ZXIiLCJoZWF0U2NyaXB0IiwiaW5pdE1hcCIsInJlc3BvbnNlIiwiZmV0Y2giLCJyZXN1bHQiLCJqc29uIiwic3VjY2VzcyIsIkVycm9yIiwibWVzc2FnZSIsImhlYXREYXRhIiwiZGF0YSIsImNvdW50IiwidmFsaWRQb2ludHMiLCJmaWx0ZXIiLCJkIiwibGF0IiwibG5nIiwiaXNOYU4iLCJtYXAiLCJpbnRlbnNpdHkiLCJsZW5ndGgiLCJzZXRUaW1lb3V0IiwiY3VycmVudCIsImNvbnRhaW5lciIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0Iiwic2V0VmlldyIsInRpbGVMYXllciIsImF0dHJpYnV0aW9uIiwiYWRkVG8iLCJyYWRpdXMiLCJibHVyIiwibWF4Wm9vbSIsIm1heCIsIm1pbk9wYWNpdHkiLCJncmFkaWVudCIsImJvdW5kcyIsImxhdExuZ0JvdW5kcyIsInAiLCJpc1ZhbGlkIiwiZml0Qm91bmRzIiwicGFkZGluZyIsImUiLCJjb25zb2xlIiwid2FybiIsImVyciIsInJlbW92ZSIsIlJlYWN0IiwiQm94IiwibXQiLCJINSIsIm1iIiwiYmciLCJib3JkZXJSYWRpdXMiLCJib3JkZXIiLCJkaXNwbGF5IiwiYWxpZ25JdGVtcyIsImp1c3RpZnlDb250ZW50IiwiaGVpZ2h0IiwiVGV4dCIsImNvbG9yIiwicG9zaXRpb24iLCJyZWYiLCJzdHlsZSIsIndpZHRoIiwidmlzaWJpbGl0eSIsInRvcCIsImxlZnQiLCJyaWdodCIsImJvdHRvbSIsIkxvYWRlciIsImZvbnRTaXplIiwiZ2FwIiwiQ09MT1JTIiwicHJpbWFyeSIsInB1cnBsZSIsImN5YW4iLCJncmVlbiIsInJlZCIsInllbGxvdyIsImZvcm1hdFJlbGF0aXZlVGltZSIsImRhdGVTdHJpbmciLCJkYXRlIiwiRGF0ZSIsIm5vdyIsImRpZmZNcyIsImRpZmZNaW5zIiwiTWF0aCIsImZsb29yIiwiZGlmZkhvdXJzIiwiZGlmZkRheXMiLCJmb3JtYXRDdXJyZW5jeSIsImFtb3VudCIsInRvRml4ZWQiLCJEb251dENoYXJ0Iiwic2l6ZSIsInRoaWNrbmVzcyIsInRvdGFsIiwicmVkdWNlIiwic3VtIiwiaXRlbSIsInZhbHVlIiwiY2lyY3VtZmVyZW5jZSIsIlBJIiwiY3VycmVudE9mZnNldCIsInZpZXdCb3giLCJjeCIsImN5IiwiciIsImZpbGwiLCJzdHJva2UiLCJzdHJva2VXaWR0aCIsImluZGV4IiwicGVyY2VudGFnZSIsInN0cm9rZURhc2hhcnJheSIsInN0cm9rZURhc2hvZmZzZXQiLCJrZXkiLCJzdHJva2VMaW5lY2FwIiwidHJhbnNmb3JtIiwidHJhbnNpdGlvbiIsIngiLCJ5IiwidGV4dEFuY2hvciIsImZvbnRXZWlnaHQiLCJmbGV4RGlyZWN0aW9uIiwiYmFja2dyb3VuZCIsIm5hbWUiLCJCYXJDaGFydCIsIm1heFZhbHVlIiwiZmxhdE1hcCIsInRhc2tzIiwiYWlkUmVxdWVzdHMiLCJwYWRkaW5nQm90dG9tIiwiZmxleCIsIm1heFdpZHRoIiwibWluSGVpZ2h0IiwidGl0bGUiLCJtYXJnaW5Ub3AiLCJtb250aCIsIkRhc2hib2FyZCIsImN1cnJlbnRBZG1pbiIsInVzZUN1cnJlbnRBZG1pbiIsInN0YXRzIiwic2V0U3RhdHMiLCJmZXRjaFN0YXRzIiwiaW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJ0ZXh0QWxpZ24iLCJ0YXNrU3RhdHVzRGF0YSIsImNvbXBsZXRlZCIsIm9wZW4iLCJhc3NpZ25lZCIsImFjY2VwdGVkIiwib3JhbmdlIiwiY2xhc3NOYW1lIiwiZmxleFdyYXAiLCJIMiIsImVtYWlsIiwic3BsaXQiLCJ0b0xvY2FsZVRpbWVTdHJpbmciLCJwZW5kaW5nIiwiZG9uYXRpb25SZXF1ZXN0cyIsInRvdGFsQW1vdW50IiwidXNlcnMiLCJ2b2x1bnRlZXJzIiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsInJlY2VudFRhc2tzIiwic2xpY2UiLCJ0YXNrIiwiY3JlYXRlZEF0Iiwic3RhdHVzIiwicHJpb3JpdHkiLCJ2b2x1bnRlZXJzTmVlZGVkIiwibW9udGhseVN0YXRzIiwidGV4dERlY29yYXRpb24iLCJyZWxpZWZDZW50ZXJzIiwiY2VudGVyIiwiY29vcmRpbmF0b3IiLCJ3YWxsZXQiLCJGcmFnbWVudCIsImJhbGFuY2UiLCJ0b3RhbENyZWRpdHMiLCJ0b3RhbERlYml0cyIsImRvbm9yQ291bnQiLCJib3JkZXJCb3R0b20iLCJwcmlvcml0aWVzIiwiaGlnaCIsIm1lZGl1bSIsImxvdyIsIkxpbmtDb21wb25lbnQiLCJwcm9wcyIsInJlY29yZCIsInByb3BlcnR5IiwicGFyYW1zIiwibG9uZyIsImFkZHJlc3NQYXJ0cyIsInBhcnQiLCJ0b1N0cmluZyIsInRyaW0iLCJxdWVyeSIsImVuY29kZVVSSUNvbXBvbmVudCIsImpvaW4iLCJtYXBzTGluayIsInRhcmdldCIsImFwaSIsIkFwaUNsaWVudCIsIlZvbHVudGVlckZpbHRlcmVkU2VsZWN0Iiwib25DaGFuZ2UiLCJzZXRWb2x1bnRlZXJzIiwiZmV0Y2hWb2x1bnRlZXJzIiwicmVzb3VyY2VBY3Rpb24iLCJyZXNvdXJjZUlkIiwiYWN0aW9uTmFtZSIsInBlclBhZ2UiLCJyZWNvcmRzIiwibG9nIiwidiIsImxhYmVsIiwiaGFuZGxlQ2hhbmdlIiwic2VsZWN0ZWQiLCJzZWxlY3RlZE9wdGlvbiIsImZpbmQiLCJvcHQiLCJGb3JtR3JvdXAiLCJMYWJlbCIsInJlcXVpcmVkIiwiU2VsZWN0Iiwib3B0aW9ucyIsImlzTG9hZGluZyIsImlzQ2xlYXJhYmxlIiwicGxhY2Vob2xkZXIiLCJkZXNjcmlwdGlvbiIsIkZvcm1NZXNzYWdlIiwiU3RhdHVzRmlsdGVyZWRTZWxlY3QiLCJzZXRTdGF0dXMiLCJmZXRjaFN0YXR1cyIsIkRvbmF0aW9uUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0IiwiTG9naW5Db21wb25lbnQiLCJzZXRFbWFpbCIsInBhc3N3b3JkIiwic2V0UGFzc3dvcmQiLCJzaG93UGFzc3dvcmQiLCJzZXRTaG93UGFzc3dvcmQiLCJ0cmFuc2xhdGVNZXNzYWdlIiwidXNlVHJhbnNsYXRpb24iLCJoYW5kbGVTdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsIm1ldGhvZCIsImhlYWRlcnMiLCJKU09OIiwic3RyaW5naWZ5IiwiY3JlZGVudGlhbHMiLCJvayIsImxvY2F0aW9uIiwicmVkaXJlY3RVcmwiLCJmb250RmFtaWx5IiwiXyIsIm1kIiwiYWx0IiwibWFyZ2luQm90dG9tIiwib25FcnJvciIsIm9wYWNpdHkiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3hTaGFkb3ciLCJvblN1Ym1pdCIsImh0bWxGb3IiLCJJbnB1dCIsInR5cGUiLCJkaXNhYmxlZCIsInBhZGRpbmdSaWdodCIsIm9uQ2xpY2siLCJjdXJzb3IiLCJCdXR0b24iLCJ2YXJpYW50IiwibWFyZ2luUmlnaHQiLCJhcyIsIkltYWdlQ29tcG9uZW50IiwiaW1hZ2VVcmwiLCJtYXhIZWlnaHQiLCJvYmplY3RGaXQiLCJJbWFnZUxpc3RDb21wb25lbnQiLCJpbWFnZXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInN0YXJ0c1dpdGgiLCJwb3AiLCJwdXNoIiwidXJsIiwiSW1hZ2VFZGl0Q29tcG9uZW50Iiwic2V0SW1hZ2VVcmwiLCJoYW5kbGVJbnB1dENoYW5nZSIsImV2ZW50IiwibmV3VmFsdWUiLCJJbWFnZUxpc3RFZGl0Q29tcG9uZW50IiwiZ2V0SW1hZ2VzIiwicGFyc2VJbnQiLCJpbWciLCJ1bmRlZmluZWQiLCJzZXRJbWFnZXMiLCJ1cGRhdGVSZWNvcmQiLCJuZXdJbWFnZXMiLCJoYW5kbGVBZGQiLCJoYW5kbGVSZW1vdmUiLCJzcGxpY2UiLCJmbGV4R3JvdyIsIkljb24iLCJpY29uIiwiQkFTRV9VUkwiLCJDcmVhdGVUYXNrRnJvbUFpZFJlcXVlc3QiLCJyZXNvdXJjZSIsImFkZE5vdGljZSIsInVzZU5vdGljZSIsInNlYXJjaFF1ZXJ5Iiwic2V0U2VhcmNoUXVlcnkiLCJmb3JtRGF0YSIsInNldEZvcm1EYXRhIiwidGFza05hbWUiLCJpc09wZW4iLCJzZWxlY3RlZFZvbHVudGVlcnMiLCJoYXNFeGlzdGluZ1Rhc2siLCJzZXRIYXNFeGlzdGluZ1Rhc2siLCJjaGVja0V4aXN0aW5nVGFzayIsInNraWxsIiwiYXNzaWduZWRWb2x1bnRlZXJzIiwiTWVzc2FnZUJveCIsIkgzIiwicHJldiIsIm1pbiIsIkNoZWNrQm94IiwiY2hlY2tlZCIsImlubGluZSIsIm1hcmdpbkxlZnQiLCJpc011bHRpIiwiaXNTZWFyY2hhYmxlIiwiaW5jbHVkZXMiLCJuZXdWYWx1ZXMiLCJBcnJheSIsImlzQXJyYXkiLCJzIiwiTWFwUGlja2VyIiwibWFya2VyUmVmIiwiZ2V0SW5pdGlhbFZhbHVlIiwicGF0aCIsInBhcnNlZExhdCIsInBhcnNlRmxvYXQiLCJwYXJzZWRMbmciLCJpbml0aWFsTGF0IiwiaW5pdGlhbExuZyIsImhhc0luaXRpYWxDb29yZHMiLCJzZXRQb3NpdGlvbiIsImFkZHJlc3NEYXRhIiwic2V0QWRkcmVzc0RhdGEiLCJhZGRyZXNzTGluZTEiLCJhZGRyZXNzTGluZTIiLCJhZGRyZXNzTGluZTMiLCJwaW5Db2RlIiwiY29vcmRpbmF0ZXMiLCJjbGVhblBpbiIsInN0clBpbiIsIlN0cmluZyIsInJlcGxhY2UiLCJoYXNWYWxpZENvb3JkaW5hdGVzIiwicGF5bG9hZCIsInVwZGF0ZUFkZHJlc3NGcm9tTm9taW5hdGltIiwiYWRkcmVzcyIsImxpbmUxIiwiYW1lbml0eSIsImJ1aWxkaW5nIiwicm9hZCIsInZpbGxhZ2UiLCJzdWJ1cmIiLCJ0b3duIiwiY2l0eSIsImRpc3BsYXlfbmFtZSIsImxpbmUyIiwic3RhdGVfZGlzdHJpY3QiLCJzdGF0ZSIsInBvc3Rjb2RlIiwicmV2ZXJzZUdlb2NvZGUiLCJsb2FkTGVhZmxldCIsImNoZWNrIiwidGhlbiIsIm9uIiwibGF0bG5nIiwibmV3UG9zIiwic2V0TGF0TG5nIiwibWFya2VyIiwiaXNJbml0aWFsTW91bnQiLCJoYW5kbGVTZWFyY2giLCJsb24iLCJlcnJvcnMiLCJNYXBTaG93IiwiaGFzTG9jYXRpb24iLCJkcmFnZ2luZyIsImRpc2FibGUiLCJ0b3VjaFpvb20iLCJkb3VibGVDbGlja1pvb20iLCJzY3JvbGxXaGVlbFpvb20iLCJib3hab29tIiwia2V5Ym9hcmQiLCJ0YXAiLCJOb3RpZmljYXRpb25Gb3JtIiwiaW5pdGlhbFJlY29yZCIsImFjdGlvbiIsInN1Ym1pdCIsInVzZVJlY29yZCIsImRlbGl2ZXJ5TW9kZSIsInNldERlbGl2ZXJ5TW9kZSIsInNldFVzZXJzIiwibG9hZGluZ1VzZXJzIiwic2V0TG9hZGluZ1VzZXJzIiwic2F2aW5nIiwic2V0U2F2aW5nIiwic2V0RXJyb3JzIiwibm90aWZpY2F0aW9uVHlwZXMiLCJhdWRpZW5jZU9wdGlvbnMiLCJsb2FkVXNlcnMiLCJyb2xlIiwidGFyZ2V0VXNlclR5cGUiLCJoYW5kbGVEZWxpdmVyeU1vZGVDaGFuZ2UiLCJtb2RlIiwiY3VycmVudEF1ZGllbmNlIiwicmVjaXBpZW50SWQiLCJuZXdFcnJvcnMiLCJnZW5lcmFsIiwic3R5bGVzIiwiaGVhZGVyIiwiaGVhZGVyVGl0bGUiLCJtYXJnaW4iLCJoZWFkZXJTdWJ0aXRsZSIsInNlY3Rpb24iLCJzZWN0aW9uVGl0bGUiLCJ0b2dnbGVDb250YWluZXIiLCJ0b2dnbGVCdXR0b24iLCJpc0FjdGl2ZSIsInRvZ2dsZUljb24iLCJzdWJtaXRCdXR0b24iLCJlcnJvckJveCIsImhpbnQiLCJmdWxsV2lkdGhJbnB1dCIsIlRleHRBcmVhIiwicm93cyIsInQiLCJhIiwidSIsIkFkZHJlc3NTaG93IiwiZ2V0RmllbGRWYWx1ZSIsImhhc0Nvb3JkaW5hdGVzIiwibGluZSIsImZvcm1hdHRlZEFkZHJlc3MiLCJtYXBzVXJsIiwiem9vbUNvbnRyb2wiLCJvdmVyZmxvdyIsIm9uTW91c2VPdmVyIiwiY3VycmVudFRhcmdldCIsIm9uTW91c2VPdXQiLCJhbGlnblNlbGYiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFHQSxNQUFNQSxvQkFBb0IsR0FBR0EsTUFBTTtJQUMvQixFQUFBLE1BQU1DLGVBQWUsR0FBR0MsWUFBTSxDQUFDLElBQUksQ0FBQztJQUNwQyxFQUFBLE1BQU1DLGNBQWMsR0FBR0QsWUFBTSxDQUFDLElBQUksQ0FBQztJQUNuQyxFQUFBLE1BQU1FLFlBQVksR0FBR0YsWUFBTSxDQUFDLElBQUksQ0FBQztNQUNqQyxNQUFNLENBQUNHLE9BQU8sRUFBRUMsVUFBVSxDQUFDLEdBQUdDLGNBQVEsQ0FBQyxJQUFJLENBQUM7TUFDNUMsTUFBTSxDQUFDQyxLQUFLLEVBQUVDLFFBQVEsQ0FBQyxHQUFHRixjQUFRLENBQUMsSUFBSSxDQUFDO01BQ3hDLE1BQU0sQ0FBQ0csU0FBUyxFQUFFQyxZQUFZLENBQUMsR0FBR0osY0FBUSxDQUFDLENBQUMsQ0FBQztNQUM3QyxNQUFNLENBQUNLLE1BQU0sRUFBRUMsU0FBUyxDQUFDLEdBQUdOLGNBQVEsQ0FBQyxLQUFLLENBQUM7SUFFM0NPLEVBQUFBLGVBQVMsQ0FBQyxNQUFNO1FBQ1osSUFBSUMsU0FBUyxHQUFHLElB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
