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
    AdminJS.UserComponents.HeatmapVisualization = HeatmapVisualization;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSGVhdG1hcFZpc3VhbGl6YXRpb24uanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0Rhc2hib2FyZC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTGlua0NvbXBvbmVudC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3QuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0FpZFJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0xvZ2luQ29tcG9uZW50LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUNvbXBvbmVudC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSW1hZ2VMaXN0Q29tcG9uZW50LmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUVkaXRDb21wb25lbnQuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlTGlzdEVkaXRDb21wb25lbnQuanN4IiwiLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0NyZWF0ZVRhc2tGcm9tQWlkUmVxdWVzdC5qc3giLCIuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTWFwUGlja2VyLmpzeCIsIi4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9NYXBTaG93LmpzeCIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCwgSDUsIFRleHQsIExvYWRlciB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgSGVhdG1hcFZpc3VhbGl6YXRpb24gPSAoKSA9PiB7XHJcbiAgICBjb25zdCBtYXBDb250YWluZXJSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgICBjb25zdCBtYXBJbnN0YW5jZVJlZiA9IHVzZVJlZihudWxsKTtcclxuICAgIGNvbnN0IGhlYXRMYXllclJlZiA9IHVzZVJlZihudWxsKTtcclxuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcclxuICAgIGNvbnN0IFtjYXNlQ291bnQsIHNldENhc2VDb3VudF0gPSB1c2VTdGF0ZSgwKTtcclxuICAgIGNvbnN0IFtub0RhdGEsIHNldE5vRGF0YV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsZXQgaXNNb3VudGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgbG9hZExpYnJhcmllcyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgLy8gTG9hZCBMZWFmbGV0IENTU1xyXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWFmbGV0LWNzcycpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gICAgICAgICAgICAgICAgbGluay5pZCA9ICdsZWFmbGV0LWNzcyc7XHJcbiAgICAgICAgICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcclxuICAgICAgICAgICAgICAgIGxpbmsuaHJlZiA9ICdodHRwczovL3VucGtnLmNvbS9sZWFmbGV0QDEuOS40L2Rpc3QvbGVhZmxldC5jc3MnO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTG9hZCBMZWFmbGV0IEpTXHJcbiAgICAgICAgICAgIGlmICghd2luZG93LkwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgICAgICAgICAgICAgc2NyaXB0LnNyYyA9ICdodHRwczovL3VucGtnLmNvbS9sZWFmbGV0QDEuOS40L2Rpc3QvbGVhZmxldC5qcyc7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IHJlc29sdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0Lm9uZXJyb3IgPSByZWplY3Q7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTG9hZCBMZWFmbGV0LmhlYXQgcGx1Z2luXHJcbiAgICAgICAgICAgIGlmICghd2luZG93LkwuaGVhdExheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoZWF0U2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgICAgICAgICAgICBoZWF0U2NyaXB0LnNyYyA9ICdodHRwczovL3VucGtnLmNvbS9sZWFmbGV0LmhlYXRAMC4yLjAvZGlzdC9sZWFmbGV0LWhlYXQuanMnO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChoZWF0U2NyaXB0KTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWF0U2NyaXB0Lm9ubG9hZCA9IHJlc29sdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhdFNjcmlwdC5vbmVycm9yID0gcmVqZWN0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuTDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBpbml0TWFwID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgTCA9IGF3YWl0IGxvYWRMaWJyYXJpZXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBGZXRjaCBoZWF0bWFwIGRhdGEgZnJvbSBBUElcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvZGFzaGJvYXJkL2hlYXRtYXAnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTW91bnRlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBmZXRjaCBoZWF0bWFwIGRhdGEnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBoZWF0RGF0YSA9IHJlc3VsdC5kYXRhIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgc2V0Q2FzZUNvdW50KHJlc3VsdC5jb3VudCB8fCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBGaWx0ZXIgdG8gdmFsaWQgY29vcmRpbmF0ZSBwb2ludHMgb25seVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRQb2ludHMgPSBoZWF0RGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZCA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBkLmxhdCA9PT0gJ251bWJlcicgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGQubG5nID09PSAnbnVtYmVyJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhaXNOYU4oZC5sYXQpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFpc05hTihkLmxuZylcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcChkID0+IFtkLmxhdCwgZC5sbmcsIGQuaW50ZW5zaXR5IHx8IDAuNV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh2YWxpZFBvaW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXROb0RhdGEodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFdhaXQgYSB0aWNrIHRvIGVuc3VyZSBjb250YWluZXIgaXMgcmVuZGVyZWRcclxuICAgICAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDApKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTW91bnRlZCB8fCAhbWFwQ29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBjb250YWluZXIgaGFzIGRpbWVuc2lvbnNcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IG1hcENvbnRhaW5lclJlZi5jdXJyZW50O1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5vZmZzZXRXaWR0aCA9PT0gMCB8fCBjb250YWluZXIub2Zmc2V0SGVpZ2h0ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXAgY29udGFpbmVyIGhhcyBubyBkaW1lbnNpb25zJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBtYXBcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hcCA9IEwubWFwKGNvbnRhaW5lcikuc2V0VmlldyhbMTAuODUwNSwgNzYuMjcxMV0sIDgpO1xyXG5cclxuICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ8KpIE9wZW5TdHJlZXRNYXAgY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obWFwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgaGVhdG1hcCBsYXllclxyXG4gICAgICAgICAgICAgICAgaGVhdExheWVyUmVmLmN1cnJlbnQgPSBMLmhlYXRMYXllcih2YWxpZFBvaW50cywge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhZGl1czogMjUsXHJcbiAgICAgICAgICAgICAgICAgICAgYmx1cjogMTUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4Wm9vbTogMTcsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4OiAxLjAsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluT3BhY2l0eTogMC4zLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjogJyMzYjgyZjYnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjQ6ICcjMTBiOTgxJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42OiAnI2Y1OWUwYicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuODogJyNlZjQ0NDQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAxLjA6ICcjZGMyNjI2J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG1hcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRml0IGJvdW5kcyB0byBzaG93IGFsbCBwb2ludHNcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm91bmRzID0gTC5sYXRMbmdCb3VuZHModmFsaWRQb2ludHMubWFwKHAgPT4gW3BbMF0sIHBbMV1dKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvdW5kcy5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwLmZpdEJvdW5kcyhib3VuZHMsIHsgcGFkZGluZzogWzUwLCA1MF0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignQ291bGQgbm90IGZpdCBib3VuZHM6JywgZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbWFwSW5zdGFuY2VSZWYuY3VycmVudCA9IG1hcDtcclxuICAgICAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbml0aWFsaXppbmcgaGVhdG1hcDonLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTW91bnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEVycm9yKGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGluaXRNYXAoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaXNNb3VudGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChtYXBJbnN0YW5jZVJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBtYXBJbnN0YW5jZVJlZi5jdXJyZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgbWFwSW5zdGFuY2VSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSwgW10pO1xyXG5cclxuICAgIC8vIFNob3cgbWVzc2FnZSBpZiBubyBkYXRhXHJcbiAgICBpZiAobm9EYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEJveCBtdD1cInh4bFwiPlxyXG4gICAgICAgICAgICAgICAgPEg1IG1iPVwiZGVmYXVsdFwiPvCflKUgQWN0aXZlIENhc2VzIEhlYXRtYXA8L0g1PlxyXG4gICAgICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgICAgICAgIGJnPVwid2hpdGVcIlxyXG4gICAgICAgICAgICAgICAgICAgIHA9XCJ4bFwiXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9XCIyMDBweFwiXHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NjBcIj5ObyBhY3RpdmUgY2FzZXMgd2l0aCBsb2NhdGlvbiBkYXRhIGF2YWlsYWJsZTwvVGV4dD5cclxuICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveCBtdD1cInh4bFwiPlxyXG4gICAgICAgICAgICA8SDUgbWI9XCJkZWZhdWx0XCI+8J+UpSBBY3RpdmUgQ2FzZXMgSGVhdG1hcDwvSDU+XHJcbiAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgIGJnPVwid2hpdGVcIlxyXG4gICAgICAgICAgICAgICAgcD1cImxnXCJcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgYm9yZGVyPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbj1cInJlbGF0aXZlXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgey8qIE1hcCBjb250YWluZXIgLSBhbHdheXMgcmVuZGVyIGJ1dCBvdmVybGF5IGxvYWRlciAqL31cclxuICAgICAgICAgICAgICAgIDxCb3ggaGVpZ2h0PVwiNDAwcHhcIiBwb3NpdGlvbj1cInJlbGF0aXZlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9e21hcENvbnRhaW5lclJlZn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IGxvYWRpbmcgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHtsb2FkaW5nICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb249XCJhYnNvbHV0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A9XCIwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ9XCIwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0PVwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b209XCIwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmc9XCJ3aGl0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMb2FkZXIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAge2Vycm9yICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb249XCJhYnNvbHV0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A9XCIwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ9XCIwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0PVwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b209XCIwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmc9XCJ3aGl0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZXJyb3JcIj5FcnJvcjoge2Vycm9yfTwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICAgICAgICAgIHshbG9hZGluZyAmJiAhZXJyb3IgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgIDxCb3ggbXQ9XCJkZWZhdWx0XCIgZGlzcGxheT1cImZsZXhcIiBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCIgZm9udFNpemU9XCJzbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2hvd2luZyB7Y2FzZUNvdW50fSBhY3RpdmUgY2FzZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgZ2FwPVwiZGVmYXVsdFwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCIgZ2FwPVwic21cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm94IHdpZHRoPVwiMTJweFwiIGhlaWdodD1cIjEycHhcIiBiZz1cIiMzYjgyZjZcIiBib3JkZXJSYWRpdXM9XCI1MCVcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwic21cIj5Mb3c8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCIgZ2FwPVwic21cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm94IHdpZHRoPVwiMTJweFwiIGhlaWdodD1cIjEycHhcIiBiZz1cIiNmNTllMGJcIiBib3JkZXJSYWRpdXM9XCI1MCVcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwic21cIj5NZWRpdW08L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCIgZ2FwPVwic21cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm94IHdpZHRoPVwiMTJweFwiIGhlaWdodD1cIjEycHhcIiBiZz1cIiNlZjQ0NDRcIiBib3JkZXJSYWRpdXM9XCI1MCVcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwic21cIj5IaWdoPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGVhdG1hcFZpc3VhbGl6YXRpb247XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIEgyLCBINSwgVGV4dCwgTG9hZGVyIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcbmltcG9ydCB7IHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnO1xyXG5pbXBvcnQgSGVhdG1hcFZpc3VhbGl6YXRpb24gZnJvbSAnLi9IZWF0bWFwVmlzdWFsaXphdGlvbi5qc3gnO1xyXG5cclxuLy8gQ29sb3IgY29uc3RhbnRzIG1hdGNoaW5nIENTUyBkZXNpZ24gc3lzdGVtXHJcbmNvbnN0IENPTE9SUyA9IHtcclxuICBwcmltYXJ5OiAnIzI1NjNlYicsXHJcbiAgcHVycGxlOiAnIzhiNWNmNicsXHJcbiAgY3lhbjogJyMwNmI2ZDQnLFxyXG4gIGdyZWVuOiAnIzEwYjk4MScsXHJcbiAgcmVkOiAnI2VmNDQ0NCcsXHJcbiAgeWVsbG93OiAnI2Y1OWUwYicsXHJcbiAgZ3JheTogJyM5NGEzYjgnLFxyXG59O1xyXG5cclxuLy8gRm9ybWF0IHJlbGF0aXZlIHRpbWVcclxuY29uc3QgZm9ybWF0UmVsYXRpdmVUaW1lID0gKGRhdGVTdHJpbmcpID0+IHtcclxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVN0cmluZyk7XHJcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICBjb25zdCBkaWZmTXMgPSBub3cgLSBkYXRlO1xyXG4gIGNvbnN0IGRpZmZNaW5zID0gTWF0aC5mbG9vcihkaWZmTXMgLyA2MDAwMCk7XHJcbiAgY29uc3QgZGlmZkhvdXJzID0gTWF0aC5mbG9vcihkaWZmTXMgLyAzNjAwMDAwKTtcclxuICBjb25zdCBkaWZmRGF5cyA9IE1hdGguZmxvb3IoZGlmZk1zIC8gODY0MDAwMDApO1xyXG5cclxuICBpZiAoZGlmZk1pbnMgPCA2MCkgcmV0dXJuIGAke2RpZmZNaW5zfSBtaW4gYWdvYDtcclxuICBpZiAoZGlmZkhvdXJzIDwgMjQpIHJldHVybiBgJHtkaWZmSG91cnN9IGhvdXJzIGFnb2A7XHJcbiAgcmV0dXJuIGAke2RpZmZEYXlzfSBkYXlzIGFnb2A7XHJcbn07XHJcblxyXG4vLyBGb3JtYXQgY3VycmVuY3lcclxuY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAoYW1vdW50KSA9PiB7XHJcbiAgaWYgKGFtb3VudCA+PSAxMDAwMDApIHJldHVybiBg4oK5JHsoYW1vdW50IC8gMTAwMDAwKS50b0ZpeGVkKDEpfUxgO1xyXG4gIGlmIChhbW91bnQgPj0gMTAwMCkgcmV0dXJuIGDigrkkeyhhbW91bnQgLyAxMDAwKS50b0ZpeGVkKDEpfUtgO1xyXG4gIHJldHVybiBg4oK5JHthbW91bnR9YDtcclxufTtcclxuXHJcbi8vIFNpbXBsZSBEb251dCBDaGFydCBjb21wb25lbnQgKFNWRy1iYXNlZCwgbm8gZXh0ZXJuYWwgZGVwcylcclxuY29uc3QgRG9udXRDaGFydCA9ICh7IGRhdGEsIHNpemUgPSAxODAsIHRoaWNrbmVzcyA9IDMwIH0pID0+IHtcclxuICBjb25zdCB0b3RhbCA9IGRhdGEucmVkdWNlKChzdW0sIGl0ZW0pID0+IHN1bSArIGl0ZW0udmFsdWUsIDApO1xyXG4gIGlmICh0b3RhbCA9PT0gMCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IHJhZGl1cyA9IChzaXplIC0gdGhpY2tuZXNzKSAvIDI7XHJcbiAgY29uc3QgY2lyY3VtZmVyZW5jZSA9IDIgKiBNYXRoLlBJICogcmFkaXVzO1xyXG4gIGxldCBjdXJyZW50T2Zmc2V0ID0gMDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnMjRweCcgfX0+XHJcbiAgICAgIDxzdmcgd2lkdGg9e3NpemV9IGhlaWdodD17c2l6ZX0gdmlld0JveD17YDAgMCAke3NpemV9ICR7c2l6ZX1gfT5cclxuICAgICAgICA8Y2lyY2xlXHJcbiAgICAgICAgICBjeD17c2l6ZSAvIDJ9XHJcbiAgICAgICAgICBjeT17c2l6ZSAvIDJ9XHJcbiAgICAgICAgICByPXtyYWRpdXN9XHJcbiAgICAgICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgICAgICBzdHJva2U9XCIjZTJlOGYwXCJcclxuICAgICAgICAgIHN0cm9rZVdpZHRoPXt0aGlja25lc3N9XHJcbiAgICAgICAgLz5cclxuICAgICAgICB7ZGF0YS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gaXRlbS52YWx1ZSAvIHRvdGFsO1xyXG4gICAgICAgICAgY29uc3Qgc3Ryb2tlRGFzaGFycmF5ID0gYCR7cGVyY2VudGFnZSAqIGNpcmN1bWZlcmVuY2V9ICR7Y2lyY3VtZmVyZW5jZX1gO1xyXG4gICAgICAgICAgY29uc3Qgc3Ryb2tlRGFzaG9mZnNldCA9IC1jdXJyZW50T2Zmc2V0O1xyXG4gICAgICAgICAgY3VycmVudE9mZnNldCArPSBwZXJjZW50YWdlICogY2lyY3VtZmVyZW5jZTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8Y2lyY2xlXHJcbiAgICAgICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgICAgICBjeD17c2l6ZSAvIDJ9XHJcbiAgICAgICAgICAgICAgY3k9e3NpemUgLyAyfVxyXG4gICAgICAgICAgICAgIHI9e3JhZGl1c31cclxuICAgICAgICAgICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgICAgICAgICAgc3Ryb2tlPXtpdGVtLmNvbG9yfVxyXG4gICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXt0aGlja25lc3N9XHJcbiAgICAgICAgICAgICAgc3Ryb2tlRGFzaGFycmF5PXtzdHJva2VEYXNoYXJyYXl9XHJcbiAgICAgICAgICAgICAgc3Ryb2tlRGFzaG9mZnNldD17c3Ryb2tlRGFzaG9mZnNldH1cclxuICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgIHRyYW5zZm9ybT17YHJvdGF0ZSgtOTAgJHtzaXplIC8gMn0gJHtzaXplIC8gMn0pYH1cclxuICAgICAgICAgICAgICBzdHlsZT17eyB0cmFuc2l0aW9uOiAnc3Ryb2tlLWRhc2hhcnJheSAwLjVzIGVhc2UnIH19XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pfVxyXG4gICAgICAgIDx0ZXh0XHJcbiAgICAgICAgICB4PXtzaXplIC8gMn1cclxuICAgICAgICAgIHk9e3NpemUgLyAyIC0gOH1cclxuICAgICAgICAgIHRleHRBbmNob3I9XCJtaWRkbGVcIlxyXG4gICAgICAgICAgZm9udFNpemU9XCIyNFwiXHJcbiAgICAgICAgICBmb250V2VpZ2h0PVwiNzAwXCJcclxuICAgICAgICAgIGZpbGw9XCIjMWUyOTNiXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICB7dG90YWx9XHJcbiAgICAgICAgPC90ZXh0PlxyXG4gICAgICAgIDx0ZXh0XHJcbiAgICAgICAgICB4PXtzaXplIC8gMn1cclxuICAgICAgICAgIHk9e3NpemUgLyAyICsgMTR9XHJcbiAgICAgICAgICB0ZXh0QW5jaG9yPVwibWlkZGxlXCJcclxuICAgICAgICAgIGZvbnRTaXplPVwiMTJcIlxyXG4gICAgICAgICAgZmlsbD1cIiM2NDc0OGJcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIFRvdGFsXHJcbiAgICAgICAgPC90ZXh0PlxyXG4gICAgICA8L3N2Zz5cclxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICc4cHgnIH19PlxyXG4gICAgICAgIHtkYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcclxuICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnOHB4JyB9fT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEycHgnLCBoZWlnaHQ6ICcxMnB4JywgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogaXRlbS5jb2xvciB9fSAvPlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEzcHgnLCBjb2xvcjogJyM2NDc0OGInIH19PlxyXG4gICAgICAgICAgICAgIHtpdGVtLm5hbWV9OiA8c3Ryb25nIHN0eWxlPXt7IGNvbG9yOiAnIzFlMjkzYicgfX0+e2l0ZW0udmFsdWV9PC9zdHJvbmc+ICh7KChpdGVtLnZhbHVlIC8gdG90YWwpICogMTAwKS50b0ZpeGVkKDApfSUpXHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBTaW1wbGUgQmFyIENoYXJ0IGNvbXBvbmVudCAoQ1NTLWJhc2VkKVxyXG5jb25zdCBCYXJDaGFydCA9ICh7IGRhdGEsIGhlaWdodCA9IDIwMCB9KSA9PiB7XHJcbiAgY29uc3QgbWF4VmFsdWUgPSBNYXRoLm1heCguLi5kYXRhLmZsYXRNYXAoZCA9PiBbZC50YXNrcywgZC5haWRSZXF1ZXN0c10pKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0LCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdmbGV4LWVuZCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYXJvdW5kJywgZ2FwOiAnOHB4JywgcGFkZGluZ0JvdHRvbTogJzMwcHgnLCBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuICAgICAgey8qIFktYXhpcyBsaW5lICovfVxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDAsIGJvdHRvbTogJzMwcHgnLCB3aWR0aDogJzFweCcsIGJhY2tncm91bmQ6ICcjZTJlOGYwJyB9fSAvPlxyXG5cclxuICAgICAge2RhdGEubWFwKChpdGVtLCBpbmRleCkgPT4gKFxyXG4gICAgICAgIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXg6IDEsIG1heFdpZHRoOiAnODBweCcgfX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgaGVpZ2h0OiBgJHtoZWlnaHQgLSAzMH1weGAsIGFsaWduSXRlbXM6ICdmbGV4LWVuZCcgfX0+XHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcyMHB4JyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogYCR7bWF4VmFsdWUgPyAoaXRlbS50YXNrcyAvIG1heFZhbHVlKSAqIDEwMCA6IDB9JWAsXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBDT0xPUlMucHJpbWFyeSxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCA0cHggMCAwJyxcclxuICAgICAgICAgICAgICAgIG1pbkhlaWdodDogaXRlbS50YXNrcyA+IDAgPyAnNHB4JyA6ICcwJyxcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICdoZWlnaHQgMC4zcyBlYXNlJyxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIHRpdGxlPXtgVGFza3M6ICR7aXRlbS50YXNrc31gfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMjBweCcsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke21heFZhbHVlID8gKGl0ZW0uYWlkUmVxdWVzdHMgLyBtYXhWYWx1ZSkgKiAxMDAgOiAwfSVgLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogQ09MT1JTLnB1cnBsZSxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCA0cHggMCAwJyxcclxuICAgICAgICAgICAgICAgIG1pbkhlaWdodDogaXRlbS5haWRSZXF1ZXN0cyA+IDAgPyAnNHB4JyA6ICcwJyxcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICdoZWlnaHQgMC4zcyBlYXNlJyxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIHRpdGxlPXtgQWlkIFJlcXVlc3RzOiAke2l0ZW0uYWlkUmVxdWVzdHN9YH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICcjNjQ3NDhiJywgbWFyZ2luVG9wOiAnOHB4JyB9fT57aXRlbS5tb250aH08L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkpfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmNvbnN0IERhc2hib2FyZCA9ICgpID0+IHtcclxuICBjb25zdCBbY3VycmVudEFkbWluXSA9IHVzZUN1cnJlbnRBZG1pbigpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gIGNvbnN0IFtzdGF0cywgc2V0U3RhdHNdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGZldGNoU3RhdHMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL2Rhc2hib2FyZC9zdGF0cycpO1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHNldFN0YXRzKGRhdGEuZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gbG9hZCBkYXNoYm9hcmQgZGF0YScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRGFzaGJvYXJkIGZldGNoIGVycm9yOicsIGVycik7XHJcbiAgICAgICAgc2V0RXJyb3IoJ0ZhaWxlZCB0byBjb25uZWN0IHRvIHNlcnZlcicpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGZldGNoU3RhdHMoKTtcclxuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoZmV0Y2hTdGF0cywgMzAwMDAwKTtcclxuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGlmIChsb2FkaW5nKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCIgaGVpZ2h0PVwiNDAwcHhcIj5cclxuICAgICAgICA8TG9hZGVyIC8+XHJcbiAgICAgIDwvQm94PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlmIChlcnJvcikge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEJveCBwPVwieHhsXCIgdGV4dEFsaWduPVwiY2VudGVyXCI+XHJcbiAgICAgICAgPFRleHQgY29sb3I9XCJkYW5nZXJcIj57ZXJyb3J9PC9UZXh0PlxyXG4gICAgICA8L0JveD5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvLyBUYXNrIHN0YXR1cyBkYXRhIGZvciBkb251dFxyXG4gIGNvbnN0IHRhc2tTdGF0dXNEYXRhID0gW1xyXG4gICAgeyBuYW1lOiAnQ29tcGxldGVkJywgdmFsdWU6IHN0YXRzPy50YXNrcz8uY29tcGxldGVkIHx8IDAsIGNvbG9yOiBDT0xPUlMuZ3JlZW4gfSxcclxuICAgIHsgbmFtZTogJ09wZW4nLCB2YWx1ZTogc3RhdHM/LnRhc2tzPy5vcGVuIHx8IDAsIGNvbG9yOiBDT0xPUlMuY3lhbiB9LFxyXG4gICAgeyBuYW1lOiAnQXNzaWduZWQnLCB2YWx1ZTogc3RhdHM/LnRhc2tzPy5hc3NpZ25lZCB8fCAwLCBjb2xvcjogQ09MT1JTLnB1cnBsZSB9LFxyXG4gICAgeyBuYW1lOiAnQWNjZXB0ZWQnLCB2YWx1ZTogc3RhdHM/LnRhc2tzPy5hY2NlcHRlZCB8fCAwLCBjb2xvcjogQ09MT1JTLm9yYW5nZSB9LFxyXG4gIF0uZmlsdGVyKChkKSA9PiBkLnZhbHVlID4gMCk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImRhc2hib2FyZC1jb250YWluZXIgYW5pbWF0ZS1mYWRlLWluXCI+XHJcbiAgICAgIHsvKiBXZWxjb21lIEhlYWRlciAqL31cclxuICAgICAgPEJveCBtYj1cInhsXCI+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBnYXA6ICcxNnB4JyB9fT5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxIMj5XZWxjb21lIGJhY2ssIHtjdXJyZW50QWRtaW4/LmVtYWlsPy5zcGxpdCgnQCcpWzBdIHx8ICdBZG1pbid9ITwvSDI+XHJcbiAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCIgbXQ9XCJzbVwiPlxyXG4gICAgICAgICAgICAgIEhlcmUncyBhbiBvdmVydmlldyBvZiB5b3VyIFJlbGllZiBNYW5hZ2VtZW50IFN5c3RlbVxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTQwXCIgZm9udFNpemU9XCJzbVwiPlxyXG4gICAgICAgICAgICBMYXN0IHVwZGF0ZWQ6IHtuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L0JveD5cclxuXHJcbiAgICAgIHsvKiBTdGF0cyBDYXJkcyBSb3cgKi99XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC1jYXJkcy1yb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmQtdGl0bGVcIj7wn5OLIFRvdGFsIFRhc2tzPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZC12YWx1ZVwiPntzdGF0cz8udGFza3M/LnRvdGFsIHx8IDB9PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZC1zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogQ09MT1JTLmdyZWVuIH19PuKckyB7c3RhdHM/LnRhc2tzPy5jb21wbGV0ZWQgfHwgMH08L3NwYW4+XHJcbiAgICAgICAgICAgIHsnIGNvbXBsZXRlZCDigKIgJ31cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IENPTE9SUy5jeWFuIH19PntzdGF0cz8udGFza3M/Lm9wZW4gfHwgMH08L3NwYW4+XHJcbiAgICAgICAgICAgIHsnIG9wZW4nfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC1jYXJkXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZC10aXRsZVwiPvCfhpggQWlkIFJlcXVlc3RzPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZC12YWx1ZVwiPntzdGF0cz8uYWlkUmVxdWVzdHM/LnRvdGFsIHx8IDB9PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZC1zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogQ09MT1JTLnllbGxvdyB9fT57c3RhdHM/LmFpZFJlcXVlc3RzPy5wZW5kaW5nIHx8IDB9PC9zcGFuPlxyXG4gICAgICAgICAgICB7JyBwZW5kaW5nIOKAoiAnfVxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogQ09MT1JTLmdyZWVuIH19PntzdGF0cz8uYWlkUmVxdWVzdHM/LmNvbXBsZXRlZCB8fCAwfTwvc3Bhbj5cclxuICAgICAgICAgICAgeycgcmVzb2x2ZWQnfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC1jYXJkXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZC10aXRsZVwiPvCfkrAgRG9uYXRpb24gUmVxdWVzdHM8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC1jYXJkLXZhbHVlXCI+e3N0YXRzPy5kb25hdGlvblJlcXVlc3RzPy50b3RhbCB8fCAwfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmQtc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgVG90YWwgYW1vdW50OiB7Zm9ybWF0Q3VycmVuY3koc3RhdHM/LmRvbmF0aW9uUmVxdWVzdHM/LnRvdGFsQW1vdW50IHx8IDApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC1jYXJkXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZC10aXRsZVwiPvCfkaUgVm9sdW50ZWVyczwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmQtdmFsdWVcIj57c3RhdHM/LnVzZXJzPy52b2x1bnRlZXJzIHx8IDB9PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZC1zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICB7c3RhdHM/LnVzZXJzPy50b3RhbCB8fCAwfSB0b3RhbCByZWdpc3RlcmVkIHVzZXJzXHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7LyogUmVjZW50IEFjdGl2aXR5IENhcmRzICovfVxyXG4gICAgICA8Qm94IG1iPVwieGxcIj5cclxuICAgICAgICA8SDUgbWI9XCJsZ1wiPlJlY2VudCBBY3Rpdml0eTwvSDU+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZ3JpZCcsIGdyaWRUZW1wbGF0ZUNvbHVtbnM6ICdyZXBlYXQoYXV0by1maXQsIG1pbm1heCgyNjBweCwgMWZyKSknLCBnYXA6ICcxNnB4JyB9fT5cclxuICAgICAgICAgIHtzdGF0cz8ucmVjZW50VGFza3M/LnNsaWNlKDAsIDQpLm1hcCgodGFzaywgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICBrZXk9e3Rhc2suaWQgfHwgaW5kZXh9XHJcbiAgICAgICAgICAgICAgaHJlZj17YC9kYXNoYm9hcmQvcmVzb3VyY2VzL1Rhc2tTY2hlbWEvcmVjb3Jkcy8ke3Rhc2suaWR9L3Nob3dgfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInF1aWNrLWFjdGlvbi1jYXJkXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC10aW1lXCI+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj7ij7E8L3NwYW4+IHtmb3JtYXRSZWxhdGl2ZVRpbWUodGFzay5jcmVhdGVkQXQpfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC10aXRsZVwiPnt0YXNrLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgc3RhdHVzLWJhZGdlICR7dGFzay5zdGF0dXN9YH0+e3Rhc2suc3RhdHVzfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHByaW9yaXR5LWJhZGdlICR7dGFzay5wcmlvcml0eX1gfT57dGFzay5wcmlvcml0eX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLXN1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICDwn5GlIHt0YXNrLnZvbHVudGVlcnN9L3t0YXNrLnZvbHVudGVlcnNOZWVkZWR9IHZvbHVudGVlcnNcclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgey8qIENoYXJ0cyBSb3cgKi99XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhcnRzLXJvd1wiPlxyXG4gICAgICAgIHsvKiBUYXNrIFByb2dyZXNzIERvbnV0ICovfVxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhcnQtY2FyZFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC1jYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXJ0LWNhcmQtdGl0bGVcIj5UYXNrIFByb2dyZXNzPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzIwcHgnLCBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgICAge3Rhc2tTdGF0dXNEYXRhLmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICAgICAgPERvbnV0Q2hhcnQgZGF0YT17dGFza1N0YXR1c0RhdGF9IC8+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NjBcIiB0ZXh0QWxpZ249XCJjZW50ZXJcIj5ObyB0YXNrIGRhdGEgYXZhaWxhYmxlPC9UZXh0PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHsvKiBNb250aGx5IFN0YXRpc3RpY3MgQmFyIENoYXJ0ICovfVxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhcnQtY2FyZFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC1jYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXJ0LWNhcmQtdGl0bGVcIj5Nb250aGx5IFN0YXRpc3RpY3M8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzE2cHgnIH19PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMnB4JywgaGVpZ2h0OiAnMTJweCcsIGJvcmRlclJhZGl1czogJzJweCcsIGJhY2tncm91bmQ6IENPTE9SUy5wcmltYXJ5IH19IC8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJyM2NDc0OGInIH19PlRhc2tzPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMnB4JywgaGVpZ2h0OiAnMTJweCcsIGJvcmRlclJhZGl1czogJzJweCcsIGJhY2tncm91bmQ6IENPTE9SUy5wdXJwbGUgfX0gLz5cclxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcsIGNvbG9yOiAnIzY0NzQ4YicgfX0+QWlkIFJlcXVlc3RzPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMjBweCAxMHB4JyB9fT5cclxuICAgICAgICAgICAge3N0YXRzPy5tb250aGx5U3RhdHM/Lmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICAgICAgPEJhckNoYXJ0IGRhdGE9e3N0YXRzLm1vbnRobHlTdGF0c30gaGVpZ2h0PXsxODB9IC8+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NjBcIiB0ZXh0QWxpZ249XCJjZW50ZXJcIj5ObyBtb250aGx5IGRhdGEgYXZhaWxhYmxlPC9UZXh0PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgey8qIEluZm8gV2lkZ2V0cyBSb3cgKi99XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5mby13aWRnZXRzLXJvd1wiPlxyXG4gICAgICAgIHsvKiBSZWxpZWYgQ2VudGVycyAqL31cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXJ0LWNhcmRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhcnQtY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC1jYXJkLXRpdGxlXCI+8J+PoiBSZWxpZWYgQ2VudGVyczwvZGl2PlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiL2Rhc2hib2FyZC9yZXNvdXJjZXMvUmVsaWVmQ2VudGVyXCIgc3R5bGU9e3sgY29sb3I6IENPTE9SUy5wcmltYXJ5LCBmb250U2l6ZTogJzE0cHgnLCB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnIH19PlxyXG4gICAgICAgICAgICAgIFZpZXcgQWxsIOKGklxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIHtzdGF0cz8ucmVsaWVmQ2VudGVycz8ubGVuZ3RoID4gMCA/IChcclxuICAgICAgICAgICAgc3RhdHMucmVsaWVmQ2VudGVycy5tYXAoKGNlbnRlciwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICA8ZGl2IGtleT17Y2VudGVyLmlkIHx8IGluZGV4fSBjbGFzc05hbWU9XCJyZWxpZWYtY2VudGVyLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsaWVmLWNlbnRlci1pY29uXCI+8J+PoDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxpZWYtY2VudGVyLWluZm9cIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxpZWYtY2VudGVyLW5hbWVcIj57Y2VudGVyLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsaWVmLWNlbnRlci1jb29yZGluYXRvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIPCfk54ge2NlbnRlci5jb29yZGluYXRvcn1cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKSlcclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCIgdGV4dEFsaWduPVwiY2VudGVyXCIgcD1cImxnXCI+Tm8gcmVsaWVmIGNlbnRlcnMgcmVnaXN0ZXJlZDwvVGV4dD5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHsvKiBSZWxpZWYgRnVuZCBXYWxsZXQgKi99XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC1jYXJkXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXJ0LWNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhcnQtY2FyZC10aXRsZVwiPvCfkrMgUmVsaWVmIEZ1bmQgV2FsbGV0PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIHtzdGF0cz8ud2FsbGV0ID8gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2FsbGV0LWJhbGFuY2VcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2FsbGV0LWFtb3VudFwiPntmb3JtYXRDdXJyZW5jeShzdGF0cy53YWxsZXQuYmFsYW5jZSl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhbGxldC1sYWJlbFwiPkN1cnJlbnQgQmFsYW5jZTwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2FsbGV0LXN0YXRzXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhbGxldC1zdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2FsbGV0LXN0YXQtdmFsdWVcIiBzdHlsZT17eyBjb2xvcjogQ09MT1JTLmdyZWVuIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIHtmb3JtYXRDdXJyZW5jeShzdGF0cy53YWxsZXQudG90YWxDcmVkaXRzKX1cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2FsbGV0LXN0YXQtbGFiZWxcIj5DcmVkaXRzPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2FsbGV0LXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YWxsZXQtc3RhdC12YWx1ZVwiIHN0eWxlPXt7IGNvbG9yOiBDT0xPUlMucmVkIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIHtmb3JtYXRDdXJyZW5jeShzdGF0cy53YWxsZXQudG90YWxEZWJpdHMpfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YWxsZXQtc3RhdC1sYWJlbFwiPkRlYml0czwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhbGxldC1zdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2FsbGV0LXN0YXQtdmFsdWVcIiBzdHlsZT17eyBjb2xvcjogQ09MT1JTLnB1cnBsZSB9fT5cclxuICAgICAgICAgICAgICAgICAgICB7c3RhdHMud2FsbGV0LmRvbm9yQ291bnR9XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhbGxldC1zdGF0LWxhYmVsXCI+RG9ub3JzPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8VGV4dCBjb2xvcj1cImdyZXk2MFwiIHRleHRBbGlnbj1cImNlbnRlclwiIHA9XCJsZ1wiPldhbGxldCBub3QgaW5pdGlhbGl6ZWQ8L1RleHQ+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7LyogUHJpb3JpdHkgRGlzdHJpYnV0aW9uICovfVxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhcnQtY2FyZFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC1jYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXJ0LWNhcmQtdGl0bGVcIj7wn46vIEFjdGl2ZSBQcmlvcml0aWVzPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzhweCAwJyB9fT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBwYWRkaW5nOiAnMTJweCAwJywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkICNlMmU4ZjAnIH19PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnMTBweCcgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTBweCcsIGhlaWdodDogJzEwcHgnLCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiBDT0xPUlMucmVkIH19IC8+XHJcbiAgICAgICAgICAgICAgICA8VGV4dCBmb250V2VpZ2h0PVwiNTAwXCI+SGlnaCBQcmlvcml0eTwvVGV4dD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiAnNjAwJywgY29sb3I6IENPTE9SUy5yZWQsIGZvbnRTaXplOiAnMThweCcgfX0+e3N0YXRzPy5wcmlvcml0aWVzPy5oaWdoIHx8IDB9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBwYWRkaW5nOiAnMTJweCAwJywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkICNlMmU4ZjAnIH19PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnMTBweCcgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTBweCcsIGhlaWdodDogJzEwcHgnLCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiBDT0xPUlMueWVsbG93IH19IC8+XHJcbiAgICAgICAgICAgICAgICA8VGV4dCBmb250V2VpZ2h0PVwiNTAwXCI+TWVkaXVtIFByaW9yaXR5PC9UZXh0PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRXZWlnaHQ6ICc2MDAnLCBjb2xvcjogQ09MT1JTLnllbGxvdywgZm9udFNpemU6ICcxOHB4JyB9fT57c3RhdHM/LnByaW9yaXRpZXM/Lm1lZGl1bSB8fCAwfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgcGFkZGluZzogJzEycHggMCcgfX0+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICcxMHB4JyB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMHB4JywgaGVpZ2h0OiAnMTBweCcsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmQ6IENPTE9SUy5ncmVlbiB9fSAvPlxyXG4gICAgICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD1cIjUwMFwiPkxvdyBQcmlvcml0eTwvVGV4dD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiAnNjAwJywgY29sb3I6IENPTE9SUy5ncmVlbiwgZm9udFNpemU6ICcxOHB4JyB9fT57c3RhdHM/LnByaW9yaXRpZXM/LmxvdyB8fCAwfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7LyogSGVhdG1hcCBTZWN0aW9uICovfVxyXG4gICAgICA8Qm94IG10PVwieGxcIj5cclxuICAgICAgICA8SGVhdG1hcFZpc3VhbGl6YXRpb24gLz5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICB7LyogUXVpY2sgQWN0aW9ucyAqL31cclxuICAgICAgPEJveCBtdD1cInhsXCI+XHJcbiAgICAgICAgPEg1IG1iPVwibGdcIj5RdWljayBBY3Rpb25zPC9INT5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTJweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XHJcbiAgICAgICAgICA8YSBocmVmPVwiL2Rhc2hib2FyZC9yZXNvdXJjZXMvQWlkUmVxdWVzdFwiIGNsYXNzTmFtZT1cInF1aWNrLWFjdGlvbi1jYXJkXCIgc3R5bGU9e3sgcGFkZGluZzogJzE0cHggMjBweCcsIGZsZXhEaXJlY3Rpb246ICdyb3cnLCBnYXA6ICcxMHB4JyB9fT5cclxuICAgICAgICAgICAg8J+TiyBWaWV3IEFpZCBSZXF1ZXN0c1xyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgPGFcclxuICAgICAgICAgICAgaHJlZj1cIi9kYXNoYm9hcmQvcmVzb3VyY2VzL1Rhc2tTY2hlbWEvYWN0aW9ucy9uZXdcIlxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsXHJcbiAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgZ2FwOiAnOHB4JyxcclxuICAgICAgICAgICAgICBwYWRkaW5nOiAnMTRweCAyMHB4JyxcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBDT0xPUlMucHJpbWFyeSxcclxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMHB4JyxcclxuICAgICAgICAgICAgICBib3JkZXI6ICdub25lJyxcclxuICAgICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICc1MDAnLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICDinpUgQ3JlYXRlIE5ldyBUYXNrXHJcbiAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8YSBocmVmPVwiL2Rhc2hib2FyZC9yZXNvdXJjZXMvdXNlclByb2ZpbGVcIiBjbGFzc05hbWU9XCJxdWljay1hY3Rpb24tY2FyZFwiIHN0eWxlPXt7IHBhZGRpbmc6ICcxNHB4IDIwcHgnLCBmbGV4RGlyZWN0aW9uOiAncm93JywgZ2FwOiAnMTBweCcgfX0+XHJcbiAgICAgICAgICAgIPCfkaUgTWFuYWdlIFVzZXJzXHJcbiAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8YSBocmVmPVwiL2Rhc2hib2FyZC9yZXNvdXJjZXMvTm90aWZpY2F0aW9uL2FjdGlvbnMvbmV3XCIgY2xhc3NOYW1lPVwicXVpY2stYWN0aW9uLWNhcmRcIiBzdHlsZT17eyBwYWRkaW5nOiAnMTRweCAyMHB4JywgZmxleERpcmVjdGlvbjogJ3JvdycsIGdhcDogJzEwcHgnIH19PlxyXG4gICAgICAgICAgICDwn5SUIFNlbmQgTm90aWZpY2F0aW9uXHJcbiAgICAgICAgICA8L2E+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvQm94PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDsiLCJcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5cclxuY29uc3QgTGlua0NvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gIGNvbnN0IHsgcmVjb3JkLCBwcm9wZXJ0eSB9ID0gcHJvcHM7XHJcblxyXG4gIC8vIFRyeSB0byBnZXQgY29vcmRpbmF0ZXMgZnJvbSB0aGUgZGlyZWN0IHByb3BlcnR5IGZpcnN0IChlLmcuLCAnbG9jYXRpb24nKVxyXG4gIC8vIEZhbGxiYWNrIHRvICdhZGRyZXNzLmxvY2F0aW9uJyBmb3Igb3RoZXIgcmVzb3VyY2VzIGlmIG5lZWRlZFxyXG4gIC8vIE5vdGU6IEluIEFkbWluSlMgbGlzdCB2aWV3LCBmbGF0dGVuaW5nIG1pZ2h0IGJlIFwibG9jYXRpb24uY29vcmRpbmF0ZXMuMFwiXHJcbiAgY29uc3QgbGF0ID0gcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5jb29yZGluYXRlcy4xYF0gfHwgcmVjb3JkLnBhcmFtc1tcImFkZHJlc3MubG9jYXRpb24uY29vcmRpbmF0ZXMuMVwiXTtcclxuICBjb25zdCBsb25nID0gcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5jb29yZGluYXRlcy4wYF0gfHwgcmVjb3JkLnBhcmFtc1tcImFkZHJlc3MubG9jYXRpb24uY29vcmRpbmF0ZXMuMFwiXTtcclxuXHJcbiAgLy8gSWYgbm8gY29vcmRpbmF0ZXMsIHJldHVybiBudWxsIG9yIGVtcHR5XHJcbiAgaWYgKCFsYXQgfHwgIWxvbmcpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLy8gQXR0ZW1wdCB0byBjb25zdHJ1Y3QgYW4gYWRkcmVzcyBzdHJpbmcgZnJvbSB0aGUgcmVjb3JkXHJcbiAgLy8gTG9naWM6IGFkZHJlc3MuYWRkcmVzc0xpbmUxLCBhZGRyZXNzLmFkZHJlc3NMaW5lMiwgYWRkcmVzcy5jaXR5LCBldGMuXHJcbiAgLy8gTm90ZTogQWRtaW5KUyBsaWtlbHkgZmxhdHRlbnMgdGhlc2UgdG8gYGFkZHJlc3MuYWRkcmVzc0xpbmUxYFxyXG4gIGNvbnN0IGFkZHJlc3NQYXJ0cyA9IFtcclxuICAgIHJlY29yZC5wYXJhbXNbJ2FkZHJlc3MuYWRkcmVzc0xpbmUxJ10sXHJcbiAgICByZWNvcmQucGFyYW1zWydhZGRyZXNzLmFkZHJlc3NMaW5lMiddLFxyXG4gICAgcmVjb3JkLnBhcmFtc1snYWRkcmVzcy5hZGRyZXNzTGluZTMnXSxcclxuICAgIHJlY29yZC5wYXJhbXNbJ2FkZHJlc3MucGluQ29kZSddLFxyXG4gICAgLy8gQWRkIG90aGVyIGFkZHJlc3MgZmllbGRzIGlmIHRoZXkgZXhpc3QgaW4geW91ciBzY2hlbWEsIGUuZy4gc3RhdGUsIGNpdHlcclxuICBdLmZpbHRlcihwYXJ0ID0+IHBhcnQgJiYgcGFydC50b1N0cmluZygpLnRyaW0oKSAhPT0gJycpO1xyXG5cclxuICBsZXQgcXVlcnkgPSAnJztcclxuICBpZiAoYWRkcmVzc1BhcnRzLmxlbmd0aCA+IDApIHtcclxuICAgIHF1ZXJ5ID0gZW5jb2RlVVJJQ29tcG9uZW50KGFkZHJlc3NQYXJ0cy5qb2luKCcsICcpKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcXVlcnkgPSBgJHtsYXR9LCR7bG9uZ31gO1xyXG4gIH1cclxuXHJcbiAgLy8gcXVlcnkgcGFyYW0gd29ya3MgZm9yIGJvdGggc2VhcmNoIHRlcm1zIChhZGRyZXNzKSBhbmQgY29vcmRpbmF0ZXNcclxuICBjb25zdCBtYXBzTGluayA9IGBodHRwczovL3d3dy5nb29nbGUuY29tL21hcHMvc2VhcmNoLz9hcGk9MSZxdWVyeT0ke3F1ZXJ5fWA7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8YSBocmVmPXttYXBzTGlua30gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxyXG4gICAgICBWaWV3IExvY2F0aW9uXHJcbiAgICA8L2E+XHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW5rQ29tcG9uZW50XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCwgU2VsZWN0LCBGb3JtTWVzc2FnZSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xyXG5cclxuY29uc3QgVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3QgPSAoeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9KSA9PiB7XHJcbiAgY29uc3QgW3ZvbHVudGVlcnMsIHNldFZvbHVudGVlcnNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZmV0Y2hWb2x1bnRlZXJzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5yZXNvdXJjZUFjdGlvbih7XHJcbiAgICAgICAgcmVzb3VyY2VJZDogJ3VzZXJQcm9maWxlJyxcclxuICAgICAgICBhY3Rpb25OYW1lOiAnbGlzdCcsXHJcbiAgICAgICAgcGFyYW1zOiB7ICdmaWx0ZXJzLnJvbGUnOiAndm9sdW50ZWVyJywgcGVyUGFnZTogMTAwMCB9LFxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21hcHBpbmcgJywgcmVzcG9uc2UuZGF0YS5yZWNvcmRzKVxyXG4gICAgICAgIHNldFZvbHVudGVlcnMocmVzcG9uc2UuZGF0YS5yZWNvcmRzLm1hcCh2ID0+ICh7XHJcbiAgICAgICAgICB2YWx1ZTogdi5pZCxcclxuICAgICAgICAgIGxhYmVsOiB2LnBhcmFtcy5uYW1lLFxyXG4gICAgICAgIH0pKSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9O1xyXG4gICAgZmV0Y2hWb2x1bnRlZXJzKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSBzZWxlY3RlZCA9PiB7XHJcbiAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBzZWxlY3RlZCA/IHNlbGVjdGVkLnZhbHVlIDogJycpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gdm9sdW50ZWVycy5maW5kKG9wdCA9PiBvcHQudmFsdWUgPT09IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0pIHx8IG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Rm9ybUdyb3VwIG1iPXs1Nn0+XHJcbiAgICAgIDxMYWJlbCByZXF1aXJlZD57J1NlbGVjdCBWb2x1bnRlZXInfTwvTGFiZWw+XHJcbiAgICAgIDxTZWxlY3RcclxuICAgICAgICBvcHRpb25zPXt2b2x1bnRlZXJzfVxyXG4gICAgICAgIHZhbHVlPXtzZWxlY3RlZE9wdGlvbn1cclxuICAgICAgICBpc0xvYWRpbmc9e2xvYWRpbmd9XHJcbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cclxuICAgICAgICBpc0NsZWFyYWJsZVxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IHZvbHVudGVlcuKAplwiXHJcbiAgICAgIC8+XHJcbiAgICAgIHtwcm9wZXJ0eS5kZXNjcmlwdGlvbiAmJiAoXHJcbiAgICAgICAgPEZvcm1NZXNzYWdlPntwcm9wZXJ0eS5kZXNjcmlwdGlvbn08L0Zvcm1NZXNzYWdlPlxyXG4gICAgICApfVxyXG4gICAgPC9Gb3JtR3JvdXA+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZvbHVudGVlckZpbHRlcmVkU2VsZWN0O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwsIFNlbGVjdCwgRm9ybU1lc3NhZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcclxuXHJcbmNvbnN0IFN0YXR1c0ZpbHRlcmVkU2VsZWN0ID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xyXG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBmZXRjaFN0YXR1cyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xyXG4gICAgICAgIHJlc291cmNlSWQ6ICdBaWRSZXF1ZXN0JyxcclxuICAgICAgICBhY3Rpb25OYW1lOiAnbGlzdCcsXHJcbiAgICAgICAgcGFyYW1zOiB7ICdmaWx0ZXJzLnN0YXR1cyc6ICdyZWplY3RlZCcsIHBlclBhZ2U6IDEwMDAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdsb2dvZ2RnZCcsIHJlc3BvbnNlKVxyXG4gICAgICBpZiAocmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLnJlY29yZHMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnbWFwcGluZyAnLCByZXNwb25zZS5kYXRhLnJlY29yZHMpXHJcbiAgICAgICAgc2V0U3RhdHVzKHJlc3BvbnNlLmRhdGEucmVjb3Jkcy5tYXAodiA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY29yZFwiLCB2LnBhcmFtcylcclxuICAgICAgICAgIHJldHVybiAoe1xyXG4gICAgICAgICAgICB2YWx1ZTogdi5pZCxcclxuICAgICAgICAgICAgLy8gbGFiZWw6IGAke3YucGFyYW1zW1wiYWRkcmVzcy5hZGRyZXNzTGluZTFcIl19IC0gJHt2LnBhcmFtc1tcImRvbmF0aW9uVHlwZVwiXX1gXHJcbiAgICAgICAgICAgIGxhYmVsOiB2LnBhcmFtcy5uYW1lXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9O1xyXG4gICAgZmV0Y2hTdGF0dXMoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IHNlbGVjdGVkID0+IHtcclxuICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIHNlbGVjdGVkID8gc2VsZWN0ZWQudmFsdWUgOiAnJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBzdGF0dXMuZmluZChvcHQgPT4gb3B0LnZhbHVlID09PSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdKSB8fCBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEZvcm1Hcm91cCBtYj17NTZ9PlxyXG4gICAgICA8TGFiZWwgcmVxdWlyZWQ+eydTZWxlY3QgQWlkIFJlcXVlc3QnfTwvTGFiZWw+XHJcbiAgICAgIDxTZWxlY3RcclxuICAgICAgICBvcHRpb25zPXtzdGF0dXN9XHJcbiAgICAgICAgdmFsdWU9e3NlbGVjdGVkT3B0aW9ufVxyXG4gICAgICAgIGlzTG9hZGluZz17bG9hZGluZ31cclxuICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgIGlzQ2xlYXJhYmxlXHJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgQWlkIFJlcXVlc3RcIlxyXG4gICAgICAvPlxyXG4gICAgICB7cHJvcGVydHkuZGVzY3JpcHRpb24gJiYgKFxyXG4gICAgICAgIDxGb3JtTWVzc2FnZT57cHJvcGVydHkuZGVzY3JpcHRpb259PC9Gb3JtTWVzc2FnZT5cclxuICAgICAgKX1cclxuICAgIDwvRm9ybUdyb3VwPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdGF0dXNGaWx0ZXJlZFNlbGVjdDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIExhYmVsLCBTZWxlY3QsIEZvcm1NZXNzYWdlIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XHJcblxyXG5jb25zdCBEb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdCA9ICh7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0pID0+IHtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZmV0Y2hTdGF0dXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHtcclxuICAgICAgICByZXNvdXJjZUlkOiAnRG9uYXRpb25SZXF1ZXN0JyxcclxuICAgICAgICBhY3Rpb25OYW1lOiAnbGlzdCcsXHJcbiAgICAgICAgcGFyYW1zOiB7ICdmaWx0ZXJzLnN0YXR1cyc6ICdhY2NlcHRlZCcsIHBlclBhZ2U6IDEwMDAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdsb2dvZ2RnZCcsIHJlc3BvbnNlKVxyXG4gICAgICBpZiAocmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLnJlY29yZHMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnbWFwcGluZyAnLCByZXNwb25zZS5kYXRhLnJlY29yZHMpXHJcbiAgICAgICAgc2V0U3RhdHVzKHJlc3BvbnNlLmRhdGEucmVjb3Jkcy5tYXAodiA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY29yZFwiLCB2LnBhcmFtcylcclxuICAgICAgICAgIHJldHVybiAoe1xyXG4gICAgICAgICAgICB2YWx1ZTogdi5pZCxcclxuICAgICAgICAgICAgbGFiZWw6IHYucGFyYW1zLm5hbWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfVxyXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgIH07XHJcbiAgICBmZXRjaFN0YXR1cygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gc2VsZWN0ZWQgPT4ge1xyXG4gICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgc2VsZWN0ZWQgPyBzZWxlY3RlZC52YWx1ZSA6ICcnKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IHN0YXR1cy5maW5kKG9wdCA9PiBvcHQudmFsdWUgPT09IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0pIHx8IG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Rm9ybUdyb3VwIG1iPXs1Nn0+XHJcbiAgICAgIDxMYWJlbCByZXF1aXJlZD57J1NlbGVjdCBEb25hdGlvbiBSZXF1ZXN0J308L0xhYmVsPlxyXG4gICAgICA8U2VsZWN0XHJcbiAgICAgICAgb3B0aW9ucz17c3RhdHVzfVxyXG4gICAgICAgIHZhbHVlPXtzZWxlY3RlZE9wdGlvbn1cclxuICAgICAgICBpc0xvYWRpbmc9e2xvYWRpbmd9XHJcbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cclxuICAgICAgICBpc0NsZWFyYWJsZVxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IERvbmF0aW9uIFJlcXVlc3RcIlxyXG4gICAgICAvPlxyXG4gICAgICB7cHJvcGVydHkuZGVzY3JpcHRpb24gJiYgKFxyXG4gICAgICAgIDxGb3JtTWVzc2FnZT57cHJvcGVydHkuZGVzY3JpcHRpb259PC9Gb3JtTWVzc2FnZT5cclxuICAgICAgKX1cclxuICAgIDwvRm9ybUdyb3VwPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgSW5wdXQsIExhYmVsLCBUZXh0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XHJcblxyXG5jb25zdCBMb2dpbkNvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gIGNvbnN0IFtlbWFpbCwgc2V0RW1haWxdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtwYXNzd29yZCwgc2V0UGFzc3dvcmRdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2hvd1Bhc3N3b3JkLCBzZXRTaG93UGFzc3dvcmRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHsgdHJhbnNsYXRlTWVzc2FnZSB9ID0gdXNlVHJhbnNsYXRpb24oKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHNldEVycm9yKCcnKTtcclxuICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2Rhc2hib2FyZC9sb2dpbicsIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBlbWFpbCwgcGFzc3dvcmQgfSksXHJcbiAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZGF0YS5yZWRpcmVjdFVybCB8fCAnL2Rhc2hib2FyZCc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0RXJyb3IoZGF0YS5lcnJvciB8fCAnSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZCcpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignTG9naW4gZXJyb3I6JywgZXJyKTtcclxuICAgICAgc2V0RXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxCb3hcclxuICAgICAgZGlzcGxheT1cImZsZXhcIlxyXG4gICAgICBtaW5IZWlnaHQ9XCIxMDB2aFwiXHJcbiAgICAgIHN0eWxlPXt7IGZvbnRGYW1pbHk6ICdJbnRlciwgc3lzdGVtLXVpLCBzYW5zLXNlcmlmJyB9fVxyXG4gICAgPlxyXG4gICAgICB7LyogTGVmdCBTaWRlIC0gQnJhbmRpbmcgKi99XHJcbiAgICAgIDxCb3hcclxuICAgICAgICBmbGV4PVwiMVwiXHJcbiAgICAgICAgZGlzcGxheT17eyBfOiAnbm9uZScsIG1kOiAnZmxleCcgfX1cclxuICAgICAgICBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCJcclxuICAgICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXHJcbiAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXHJcbiAgICAgICAgcD1cInh4bFwiXHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMjU2M2ViIDAlLCAjMWU0MGFmIDEwMCUpJyxcclxuICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICA8Qm94IHRleHRBbGlnbj1cImNlbnRlclwiIHN0eWxlPXt7IG1heFdpZHRoOiAnNTAwcHgnIH19PlxyXG4gICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICBzcmM9XCIvaW1hZ2VzL2xvZ28td2hpdGUucG5nXCJcclxuICAgICAgICAgICAgYWx0PVwiTG9nb1wiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IG1heFdpZHRoOiAnMjUwcHgnLCBtYXJnaW5Cb3R0b206ICcycmVtJyB9fVxyXG4gICAgICAgICAgICBvbkVycm9yPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcycmVtJywgZm9udFdlaWdodDogJ2JvbGQnLCBtYXJnaW5Cb3R0b206ICcxcmVtJyB9fT5cclxuICAgICAgICAgICAgUmVsaWVmIE1hbmFnZW1lbnQgU3lzdGVtXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzEuMTI1cmVtJywgb3BhY2l0eTogMC45IH19PlxyXG4gICAgICAgICAgICBDb29yZGluYXRpbmcgZGlzYXN0ZXIgcmVsaWVmIGVmZm9ydHMgd2l0aCBlZmZpY2llbmN5IGFuZCBjb21wYXNzaW9uXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxyXG4gICAgICAgICAgICBzdHlsZT17eyBnYXA6ICcycmVtJywgbWFyZ2luVG9wOiAnM3JlbScsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJyB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8Qm94IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcycmVtJywgZm9udFdlaWdodDogJ2JvbGQnIH19PjUwMCs8L1RleHQ+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcwLjg3NXJlbScgfX0+QWlkIFJlcXVlc3RzPC9UZXh0PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgPEJveCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMnJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJyB9fT4xMjAwKzwvVGV4dD5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzAuODc1cmVtJyB9fT5Eb25hdGlvbnM8L1RleHQ+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICA8Qm94IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcycmVtJywgZm9udFdlaWdodDogJ2JvbGQnIH19PjUwKzwvVGV4dD5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzAuODc1cmVtJyB9fT5SZWxpZWYgQ2VudGVyczwvVGV4dD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICA8L0JveD5cclxuICAgICAgICA8L0JveD5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICB7LyogUmlnaHQgU2lkZSAtIExvZ2luIEZvcm0gKi99XHJcbiAgICAgIDxCb3hcclxuICAgICAgICBmbGV4PVwiMVwiXHJcbiAgICAgICAgZGlzcGxheT1cImZsZXhcIlxyXG4gICAgICAgIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIlxyXG4gICAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcclxuICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcclxuICAgICAgICBwPVwieHhsXCJcclxuICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6ICcjZjlmYWZiJyB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPEJveFxyXG4gICAgICAgICAgYmc9XCJ3aGl0ZVwiXHJcbiAgICAgICAgICBwPVwieHhsXCJcclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzAuNXJlbScsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMXB4IDNweCAwIHJnYmEoMCwgMCwgMCwgMC4xKScsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnNDUwcHgnLFxyXG4gICAgICAgICAgICBtYXhXaWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8Qm94IG1iPVwieGxcIj5cclxuICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxLjVyZW0nLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnIzExMTgyNycgfX0+XHJcbiAgICAgICAgICAgICAgU2lnbiBJblxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMXJlbScsIGNvbG9yOiAnIzZiNzI4MCcsIG1hcmdpblRvcDogJzAuNXJlbScgfX0+XHJcbiAgICAgICAgICAgICAgRW50ZXIgeW91ciBjcmVkZW50aWFscyB0byBhY2Nlc3MgdGhlIGRhc2hib2FyZFxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICB7ZXJyb3IgJiYgKFxyXG4gICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgcD1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgIG1iPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZWYyZjInLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNmZWUyZTInLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMC4zNzVyZW0nLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyNkYzI2MjYnLCBmb250U2l6ZTogJzAuODc1cmVtJyB9fT5cclxuICAgICAgICAgICAgICAgIOKaoO+4jyB7ZXJyb3J9XHJcbiAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgICAgIDxCb3ggbWI9XCJsZ1wiPlxyXG4gICAgICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwiZW1haWxcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgIEVtYWlsIEFkZHJlc3NcclxuICAgICAgICAgICAgICA8L0xhYmVsPlxyXG4gICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgaWQ9XCJlbWFpbFwiXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2VtYWlsfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFbWFpbChlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImFkbWluQGV4YW1wbGUuY29tXCJcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4JyxcclxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAgICA8Qm94IG1iPVwiZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwicGFzc3dvcmRcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgIFBhc3N3b3JkXHJcbiAgICAgICAgICAgICAgPC9MYWJlbD5cclxuICAgICAgICAgICAgICA8Qm94IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH19PlxyXG4gICAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICAgIGlkPVwicGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgICB0eXBlPXtzaG93UGFzc3dvcmQgPyAndGV4dCcgOiAncGFzc3dvcmQnfVxyXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17cGFzc3dvcmR9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGFzc3dvcmQoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgcGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4JyxcclxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogJzQ1cHgnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dQYXNzd29yZCghc2hvd1Bhc3N3b3JkKX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgICAgICByaWdodDogJzEycHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogJzUwJScsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzZiNzI4MCcsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHtzaG93UGFzc3dvcmQgPyAn8J+Rge+4jycgOiAn8J+Rge+4j+KAjfCfl6jvuI8nfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICAgICAgPEJveCBtYj1cInhsXCIgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMXJlbScgfX0+XHJcbiAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXHJcbiAgICAgICAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxNHB4JyxcclxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJzYwMCcsXHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGxvYWRpbmcgPyAnIzljYTNhZicgOiAnIzI1NjNlYicsXHJcbiAgICAgICAgICAgICAgICAgIGN1cnNvcjogbG9hZGluZyA/ICdub3QtYWxsb3dlZCcgOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtsb2FkaW5nID8gKFxyXG4gICAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtYXJnaW5SaWdodDogJzhweCcgfX0+4o+zPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIFNpZ25pbmcgaW4uLi5cclxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgJ1NpZ24gSW4nXHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgIDwvZm9ybT5cclxuXHJcbiAgICAgICAgICA8Qm94IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicsIG1hcmdpblRvcDogJzEuNXJlbScgfX0+XHJcbiAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMC44NzVyZW0nLCBjb2xvcjogJyM2YjcyODAnIH19PlxyXG4gICAgICAgICAgICAgIERvbid0IGhhdmUgYW4gYWNjb3VudD97JyAnfVxyXG4gICAgICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgICAgICBhcz1cInNwYW5cIlxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6ICcjMjU2M2ViJywgZm9udFdlaWdodDogJ2JvbGQnLCBjdXJzb3I6ICdwb2ludGVyJyB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIENvbnRhY3QgQWRtaW5pc3RyYXRvclxyXG4gICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgIDxCb3ggc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnMXJlbScgfX0+XHJcbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzAuNzVyZW0nLCBjb2xvcjogJyM2YjcyODAnIH19PlxyXG4gICAgICAgICAgICDCqSAyMDI0IFJlbGllZiBNYW5hZ2VtZW50IFN5c3RlbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICA8L0JveD5cclxuICAgICAgPC9Cb3g+XHJcbiAgICA8L0JveD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9naW5Db21wb25lbnQ7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBJbWFnZUNvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyByZWNvcmQsIHByb3BlcnR5IH0gPSBwcm9wcztcclxuICAgIGNvbnN0IGltYWdlVXJsID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXTtcclxuXHJcbiAgICBpZiAoIWltYWdlVXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94PlxyXG4gICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICBzcmM9e2ltYWdlVXJsfVxyXG4gICAgICAgICAgICAgICAgYWx0PXtwcm9wZXJ0eS5sYWJlbH1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1heFdpZHRoOiAnMTAwcHgnLCBtYXhIZWlnaHQ6ICcxMDBweCcsIG9iamVjdEZpdDogJ2NvdmVyJyB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEltYWdlQ29tcG9uZW50O1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IEltYWdlTGlzdENvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyByZWNvcmQsIHByb3BlcnR5IH0gPSBwcm9wcztcclxuXHJcbiAgICBjb25zdCBpbWFnZXMgPSBbXTtcclxuICAgIC8vIENoZWNrIGZvciBmbGF0dGVuZWQga2V5cyBsaWtlICdwcm9vZkltYWdlcy4wJywgJ3Byb29mSW1hZ2VzLjEnLCBldGMuXHJcbiAgICBPYmplY3Qua2V5cyhyZWNvcmQucGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYga2V5IHN0YXJ0cyB3aXRoIHByb3BlcnR5IG5hbWUgYW5kIGZvbGxvd3Mgd2l0aCAuaW5kZXhcclxuICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYCR7cHJvcGVydHkubmFtZX0uYCkgJiYgIWlzTmFOKGtleS5zcGxpdCgnLicpLnBvcCgpKSkge1xyXG4gICAgICAgICAgICBpbWFnZXMucHVzaChyZWNvcmQucGFyYW1zW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChpbWFnZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgZmxleERpcmVjdGlvbj1cInJvd1wiIGZsZXhXcmFwPVwid3JhcFwiIGdhcD17Mn0+XHJcbiAgICAgICAgICAgIHtpbWFnZXMubWFwKCh1cmwsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgICAgICAgICAgICBzcmM9e3VybH1cclxuICAgICAgICAgICAgICAgICAgICBhbHQ9e2Ake3Byb3BlcnR5LmxhYmVsfS0ke2luZGV4fWB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWF4V2lkdGg6ICcxMDBweCcsIG1heEhlaWdodDogJzEwMHB4Jywgb2JqZWN0Rml0OiAnY292ZXInIH19XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICA8L0JveD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZUxpc3RDb21wb25lbnQ7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIElucHV0LCBMYWJlbCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgSW1hZ2VFZGl0Q29tcG9uZW50ID0gKHByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0gPSBwcm9wcztcclxuICAgIGNvbnN0IHZhbHVlID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXSB8fCAnJztcclxuICAgIGNvbnN0IFtpbWFnZVVybCwgc2V0SW1hZ2VVcmxdID0gdXNlU3RhdGUodmFsdWUpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBsb2NhbCBzdGF0ZSBpZiByZWNvcmQgY2hhbmdlcyBmcm9tIG91dHNpZGUgKGUuZy4gcmVsb2FkKVxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBzZXRJbWFnZVVybChyZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdIHx8ICcnKTtcclxuICAgIH0sIFtyZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdXSk7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlSW5wdXRDaGFuZ2UgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICBzZXRJbWFnZVVybChuZXdWYWx1ZSk7XHJcbiAgICAgICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgbmV3VmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxCb3ggbWFyZ2luQm90dG9tPVwieHhsXCI+XHJcbiAgICAgICAgICAgIDxMYWJlbCBodG1sRm9yPXtwcm9wZXJ0eS5uYW1lfT57cHJvcGVydHkubGFiZWx9PC9MYWJlbD5cclxuICAgICAgICAgICAge2ltYWdlVXJsICYmIChcclxuICAgICAgICAgICAgICAgIDxCb3ggbWFyZ2luQm90dG9tPVwiZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtpbWFnZVVybH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiUHJldmlld1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1heFdpZHRoOiAnMjAwcHgnLCBtYXhIZWlnaHQ6ICcyMDBweCcsIG9iamVjdEZpdDogJ2NvdmVyJywgZGlzcGxheTogJ2Jsb2NrJywgbWFyZ2luQm90dG9tOiAnOHB4JywgYm9yZGVyOiAnMXB4IHNvbGlkICNkZGQnLCBwYWRkaW5nOiAnNHB4JyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkVycm9yPXsoZSkgPT4geyBlLnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICBpZD17cHJvcGVydHkubmFtZX1cclxuICAgICAgICAgICAgICAgIG5hbWU9e3Byb3BlcnR5Lm5hbWV9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17aW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICB3aWR0aD17MX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICA8L0JveD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZUVkaXRDb21wb25lbnQ7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIExhYmVsLCBJbnB1dCwgQnV0dG9uLCBJY29uIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBJbWFnZUxpc3RFZGl0Q29tcG9uZW50ID0gKHByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0gPSBwcm9wcztcclxuXHJcbiAgICAvLyBGbGF0dGVuZWQgcGFyYW1zIGFyZSBzdG9yZWQgbGlrZSAncHJvb2ZJbWFnZXMuMCc6ICd1cmwxJywgJ3Byb29mSW1hZ2VzLjEnOiAndXJsMidcclxuICAgIC8vIFdlIG5lZWQgdG8gcmVjb25zdHJ1Y3QgdGhlIGFycmF5XHJcbiAgICBjb25zdCBnZXRJbWFnZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VzID0gW107XHJcbiAgICAgICAgT2JqZWN0LmtleXMocmVjb3JkLnBhcmFtcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYCR7cHJvcGVydHkubmFtZX0uYCkgJiYgIWlzTmFOKGtleS5zcGxpdCgnLicpLnBvcCgpKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChrZXkuc3BsaXQoJy4nKS5wb3AoKSwgMTApO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VzW2luZGV4XSA9IHJlY29yZC5wYXJhbXNba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEZpbHRlciBvdXQgZW1wdHkgc2xvdHMgaWYgYW55IGhvbGUgZXhpc3RzLCB0aG91Z2ggbm9ybWFsbHkgYWRtaW5qcyBoYW5kbGVzIHNlcXVlbnRpYWwga2V5c1xyXG4gICAgICAgIHJldHVybiBpbWFnZXMuZmlsdGVyKGltZyA9PiBpbWcgIT09IHVuZGVmaW5lZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IFtpbWFnZXMsIHNldEltYWdlc10gPSB1c2VTdGF0ZShnZXRJbWFnZXMoKSk7XHJcblxyXG4gICAgLy8gSGVscGVyIHRvIG5vdGlmeSBBZG1pbkpTIG9mIGNoYW5nZXNcclxuICAgIC8vIEFkbWluSlMgZXhwZWN0cyBmbGF0IGtleXMgZm9yIGFycmF5czogJ3Byb3BlcnR5LjAnLCAncHJvcGVydHkuMSdcclxuICAgIGNvbnN0IHVwZGF0ZVJlY29yZCA9IChuZXdJbWFnZXMpID0+IHtcclxuICAgICAgICBzZXRJbWFnZXMobmV3SW1hZ2VzKTtcclxuXHJcbiAgICAgICAgLy8gMS4gQ2xlYXIgZXhpc3Rpbmcga2V5cyBmb3IgdGhpcyBwcm9wZXJ0eVxyXG4gICAgICAgIC8vIFdlIGNhbid0IHJlYWxseSBcImRlbGV0ZVwiIGtleXMgZWFzaWx5IHZpYSBvbkNoYW5nZSBpbiB0aGUgc3RhbmRhcmQgd2F5IHdpdGhvdXQgcG90ZW50aWFsbHkgbGVhdmluZyBnYXJiYWdlLFxyXG4gICAgICAgIC8vIGJ1dCBzdGFuZGFyZCBhZG1pbmpzIGhhbmRsaW5nIGV4cGVjdHMgdXMgdG8gb3ZlcndyaXRlLlxyXG4gICAgICAgIC8vIEhvd2V2ZXIsIHRoZSBjbGVhbmVzdCB3YXkgdG8gc3luYyBhbiBhcnJheSBpcyB0byB1cGRhdGUgZWFjaCBpbmRleC5cclxuXHJcbiAgICAgICAgLy8gSWRlYWxseSB3ZSBzaG91bGQgbnVsbGlmeSBvbGQga2V5cyBpZiBhcnJheSBzaHJpbmtzLCBidXQgc3RhbmRhcmQgYmVoYXZpb3IgbWlnaHQganVzdCBoYW5kbGUgd2hhdCB3ZSBzZW5kLlxyXG4gICAgICAgIC8vIEEgc2FmZXIgYmV0IGlzIHRvIHJlbHkgb24gQWRtaW5KUydzIGludGVybmFsIGhhbmRsaW5nIGlmIHdlIHdlcmUgcGFzc2luZyB0aGUgd2hvbGUgb2JqZWN0LCBcclxuICAgICAgICAvLyBidXQgaGVyZSB3ZSBhcmUgYSBjb21wb25lbnQuXHJcblxyXG4gICAgICAgIC8vIFdlIHdpbGwganVzdCB1cGRhdGUgJ3Byb3BlcnR5LjAnLCAncHJvcGVydHkuMScgZXRjLlxyXG4gICAgICAgIC8vIEFuZCBpZGVhbGx5IHdlIG1pZ2h0IG5lZWQgdG8gY2xlYXIgJ3Byb3BlcnR5LjInIGlmIHdlIHdlbnQgZnJvbSAzIGl0ZW1zIHRvIDIuXHJcbiAgICAgICAgLy8gVG8gcHJvcGVybHkgXCJjbGVhclwiIHdlIG1pZ2h0IG5lZWQgdG8gc2V0IGl0IHRvIG51bGwgb3IgdW5kZWZpbmVkLlxyXG5cclxuICAgICAgICAvLyBTdHJhdGVneTogVXBkYXRlIGFsbCBjdXJyZW50IGluZGljZXMuIFxyXG4gICAgICAgIC8vIElmIHRoZSBhcnJheSBzaHJhbmssIHdlIGNhbiB0cnkgc2V0dGluZyB0aGUgbmV4dCBpbmRleCB0byBudWxsL3VuZGVmaW5lZCB0byBzZWUgaWYgYmFja2VuZCBoYW5kbGVzIGl0LFxyXG4gICAgICAgIC8vIG9yIGp1c3QgcmVseSBvbiB0aGUgZmFjdCB0aGF0IHdlIGFyZSByZXdyaXRpbmcgdGhlIHBhcmFtcy5cclxuXHJcbiAgICAgICAgLy8gQWN0dWFsbHksIG9uQ2hhbmdlIGV4cGVjdHMgKGtleSwgdmFsdWUpLlxyXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIG11bHRpcGxlIGtleXMuIEFkbWluSlMgYG9uQ2hhbmdlYCBtaWdodCBub3Qgc3VwcG9ydCBiYXRjaCB1cGRhdGVzIGVhc2lseSBkZXBlbmRpbmcgb24gdmVyc2lvbi5cclxuICAgICAgICAvLyBCdXQgdXN1YWxseSBpdCdzIGBvbkNoYW5nZShwcm9wZXJ0eSwgdmFsdWUpYCB3aGVyZSB2YWx1ZSBpcyB0aGUgZnVsbCB2YWx1ZT8gXHJcbiAgICAgICAgLy8gTm8sIGZvciBhcnJheSBwcm9wZXJ0aWVzLCBBZG1pbkpTIG9mdGVuIHRyZWF0cyB0aGVtIGVzc2VudGlhbGx5IGFzIGluZGl2aWR1YWwgZmllbGRzIGlmIGZsYXR0ZW5lZC5cclxuXHJcbiAgICAgICAgLy8gV0FJVDogSWYgd2UgdXNlIGEgY3VzdG9tIGNvbXBvbmVudCBmb3IgdGhlICplbnRpcmUgYXJyYXkgcHJvcGVydHkqLCBgb25DaGFuZ2VgIG1pZ2h0IGFjY2VwdCB0aGUgYXJyYXkgaXRzZWxmXHJcbiAgICAgICAgLy8gaWYgdGhlIGJhY2tlbmQgYWRhcHRlciBzdXBwb3J0cyBpdC4gQnV0IEFkbWluSlMgb2Z0ZW4gZmxhdHRlbnMuXHJcblxyXG4gICAgICAgIC8vIExldCdzIGNoZWNrIGhvdyBzdGFuZGFyZCBhcnJheSBlZGl0aW5nIHdvcmtzLlxyXG4gICAgICAgIC8vIElmIHdlIGxvb2sgYXQgZXhpc3RpbmcgYEltYWdlTGlzdENvbXBvbmVudGAsIGl0IHJlYWRzIGZyb20gYHJlY29yZC5wYXJhbXNgLlxyXG5cclxuICAgICAgICAvLyBMZXQncyB0cnkgc2VuZGluZyB0aGUgYXJyYXkgdG8gYG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIG5ld0ltYWdlcylgLlxyXG4gICAgICAgIC8vIE1hbnkgQWRtaW5KUyBhZGFwdGVycyAobGlrZSBNb25nb29zZSkgaGFuZGxlIHRoZSBhcnJheSBpZiBwYXNzZWQgYXMgYSB2YWx1ZSB0byB0aGUgbWFpbiBwcm9wZXJ0eSBrZXkuXHJcbiAgICAgICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgbmV3SW1hZ2VzKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQWRkID0gKCkgPT4ge1xyXG4gICAgICAgIHVwZGF0ZVJlY29yZChbLi4uaW1hZ2VzLCAnJ10pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVSZW1vdmUgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCBuZXdJbWFnZXMgPSBbLi4uaW1hZ2VzXTtcclxuICAgICAgICBuZXdJbWFnZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB1cGRhdGVSZWNvcmQobmV3SW1hZ2VzKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGluZGV4LCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5ld0ltYWdlcyA9IFsuLi5pbWFnZXNdO1xyXG4gICAgICAgIG5ld0ltYWdlc1tpbmRleF0gPSB2YWx1ZTtcclxuICAgICAgICB1cGRhdGVSZWNvcmQobmV3SW1hZ2VzKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cInh4bFwiPlxyXG4gICAgICAgICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XHJcbiAgICAgICAgICAgIHtpbWFnZXMubWFwKCh1cmwsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8Qm94IGtleT17aW5kZXh9IG1hcmdpbkJvdHRvbT1cImRlZmF1bHRcIiBkaXNwbGF5PVwiZmxleFwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Qm94IG1hcmdpblJpZ2h0PVwiZGVmYXVsdFwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3VybCAmJiA8aW1nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e3VybH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD17YEltYWdlICR7aW5kZXggKyAxfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogJzUwcHgnLCBoZWlnaHQ6ICc1MHB4Jywgb2JqZWN0Rml0OiAnY292ZXInLCBib3JkZXJSYWRpdXM6ICc0cHgnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVycm9yPXsoZSkgPT4geyBlLnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPn1cclxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICAgICA8Qm94IGZsZXhHcm93PXsxfSBtYXJnaW5SaWdodD1cImRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dXJsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVDaGFuZ2UoaW5kZXgsIGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXsxfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJJbWFnZSBVUkxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gaGFuZGxlUmVtb3ZlKGluZGV4KX0gdmFyaWFudD1cImRhbmdlclwiIHNpemU9XCJpY29uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIGljb249XCJUcmFzaDJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUFkZH0gdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgPEljb24gaWNvbj1cIlBsdXNcIiAvPiBBZGQgSW1hZ2UgVVJMXHJcbiAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEltYWdlTGlzdEVkaXRDb21wb25lbnQ7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBBcGlDbGllbnQsIHVzZVJlY29yZCwgdXNlTm90aWNlIH0gZnJvbSAnYWRtaW5qcyc7XHJcbmltcG9ydCB7XHJcbiAgICBCb3gsXHJcbiAgICBIMyxcclxuICAgIExhYmVsLFxyXG4gICAgSW5wdXQsXHJcbiAgICBTZWxlY3QsXHJcbiAgICBCdXR0b24sXHJcbiAgICBGb3JtR3JvdXAsXHJcbiAgICBDaGVja0JveCxcclxuICAgIFRleHQsXHJcbiAgICBMb2FkZXIsXHJcbiAgICBNZXNzYWdlQm94LFxyXG59IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5cclxuY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xyXG4vLyBVc2UgZW1wdHkgc3RyaW5nIGZvciByZWxhdGl2ZSBVUkwgc2luY2UgQWRtaW5KUyBydW5zIG9uIHRoZSBzYW1lIHNlcnZlclxyXG5jb25zdCBCQVNFX1VSTCA9ICcnO1xyXG5cclxuY29uc3QgQ3JlYXRlVGFza0Zyb21BaWRSZXF1ZXN0ID0gKHByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IHJlY29yZCwgcmVzb3VyY2UgfSA9IHByb3BzO1xyXG4gICAgY29uc3QgYWRkTm90aWNlID0gdXNlTm90aWNlKCk7XHJcblxyXG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gICAgY29uc3QgW3ZvbHVudGVlcnMsIHNldFZvbHVudGVlcnNdID0gdXNlU3RhdGUoW10pO1xyXG4gICAgY29uc3QgW3NlYXJjaFF1ZXJ5LCBzZXRTZWFyY2hRdWVyeV0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgICBjb25zdCBbZm9ybURhdGEsIHNldEZvcm1EYXRhXSA9IHVzZVN0YXRlKHtcclxuICAgICAgICB0YXNrTmFtZTogcmVjb3JkPy5wYXJhbXM/Lm5hbWUgfHwgJ0FpZCBSZXF1ZXN0IFRhc2snLFxyXG4gICAgICAgIHZvbHVudGVlcnNOZWVkZWQ6IDEsXHJcbiAgICAgICAgaXNPcGVuOiB0cnVlLFxyXG4gICAgICAgIHByaW9yaXR5OiByZWNvcmQ/LnBhcmFtcz8ucHJpb3JpdHkgfHwgJ21lZGl1bScsXHJcbiAgICAgICAgc2VsZWN0ZWRWb2x1bnRlZXJzOiBbXSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgW2hhc0V4aXN0aW5nVGFzaywgc2V0SGFzRXhpc3RpbmdUYXNrXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgICAvLyBDaGVjayBpZiB0YXNrIGFscmVhZHkgZXhpc3RzIGZvciB0aGlzIGFpZCByZXF1ZXN0XHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNoZWNrRXhpc3RpbmdUYXNrID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlSWQ6ICdUYXNrU2NoZW1hJyxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnbGlzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7ICdmaWx0ZXJzLmFpZFJlcXVlc3QnOiByZWNvcmQuaWQgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGE/LnJlY29yZHM/Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRIYXNFeGlzdGluZ1Rhc2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjaGVja2luZyBleGlzdGluZyB0YXNrOicsIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY2hlY2tFeGlzdGluZ1Rhc2soKTtcclxuICAgIH0sIFtyZWNvcmQuaWRdKTtcclxuXHJcbiAgICAvLyBGZXRjaCB2b2x1bnRlZXJzXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZldGNoVm9sdW50ZWVycyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUlkOiAndXNlclByb2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdsaXN0JyxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ZpbHRlcnMucm9sZSc6ICd2b2x1bnRlZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJQYWdlOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLihzZWFyY2hRdWVyeSAmJiB7ICdmaWx0ZXJzLm5hbWUnOiBzZWFyY2hRdWVyeSB9KSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YT8ucmVjb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFZvbHVudGVlcnMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEucmVjb3Jkcy5tYXAoKHYpID0+ICh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdi5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBgJHt2LnBhcmFtcy5uYW1lfSAoJHt2LnBhcmFtcy5za2lsbCB8fCAnTm8gc2tpbGwnfSlgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdm9sdW50ZWVyczonLCBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGZldGNoVm9sdW50ZWVycygpO1xyXG4gICAgfSwgW3NlYXJjaFF1ZXJ5XSk7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgICAgICAgICAgICAgIGAke0JBU0VfVVJMfS9hcGkvYWRtaW4vdGFzay9jcmVhdGUtZnJvbS1haWQtcmVxdWVzdC8ke3JlY29yZC5pZH1gLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrTmFtZTogZm9ybURhdGEudGFza05hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZvbHVudGVlcnNOZWVkZWQ6IGZvcm1EYXRhLnZvbHVudGVlcnNOZWVkZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3BlbjogZm9ybURhdGEuaXNPcGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmlvcml0eTogZm9ybURhdGEucHJpb3JpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVkVm9sdW50ZWVyczogZm9ybURhdGEuaXNPcGVuID8gW10gOiBmb3JtRGF0YS5zZWxlY3RlZFZvbHVudGVlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgYWRkTm90aWNlKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVGFzayBjcmVhdGVkIHN1Y2Nlc3NmdWxseSEnLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gUmVkaXJlY3QgYmFjayB0byB0aGUgYWlkIHJlcXVlc3QgbGlzdFxyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2Rhc2hib2FyZC9yZXNvdXJjZXMvQWlkUmVxdWVzdCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhZGROb3RpY2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRhdGEubWVzc2FnZSB8fCAnRmFpbGVkIHRvIGNyZWF0ZSB0YXNrJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjcmVhdGluZyB0YXNrOicsIGVycm9yKTtcclxuICAgICAgICAgICAgYWRkTm90aWNlKHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdFcnJvciBjcmVhdGluZyB0YXNrLiBQbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVZvbHVudGVlclNlbGVjdCA9IChzZWxlY3RlZCkgPT4ge1xyXG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdWb2x1bnRlZXJzID0gQXJyYXkuaXNBcnJheShzZWxlY3RlZClcclxuICAgICAgICAgICAgICAgID8gc2VsZWN0ZWQubWFwKChzKSA9PiBzLnZhbHVlKS5zbGljZSgwLCBmb3JtRGF0YS52b2x1bnRlZXJzTmVlZGVkKVxyXG4gICAgICAgICAgICAgICAgOiBbc2VsZWN0ZWQudmFsdWVdO1xyXG4gICAgICAgICAgICBzZXRGb3JtRGF0YSgocHJldikgPT4gKHtcclxuICAgICAgICAgICAgICAgIC4uLnByZXYsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFZvbHVudGVlcnM6IG5ld1ZvbHVudGVlcnMsXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRGb3JtRGF0YSgocHJldikgPT4gKHtcclxuICAgICAgICAgICAgICAgIC4uLnByZXYsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFZvbHVudGVlcnM6IFtdLFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoaGFzRXhpc3RpbmdUYXNrKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEJveCB2YXJpYW50PVwiZ3JleVwiIHBhZGRpbmc9XCJ4bFwiPlxyXG4gICAgICAgICAgICAgICAgPE1lc3NhZ2VCb3ggdmFyaWFudD1cImRhbmdlclwiIG1lc3NhZ2U9XCJBIHRhc2sgYWxyZWFkeSBleGlzdHMgZm9yIHRoaXMgYWlkIHJlcXVlc3QuXCIgLz5cclxuICAgICAgICAgICAgICAgIDxCb3ggbWFyZ2luVG9wPVwibGdcIj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJwcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gKHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9kYXNoYm9hcmQvcmVzb3VyY2VzL0FpZFJlcXVlc3QnKX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhY2sgdG8gQWlkIFJlcXVlc3RzXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxCb3ggdmFyaWFudD1cImdyZXlcIiBwYWRkaW5nPVwieGxcIj5cclxuICAgICAgICAgICAgPEgzPkNyZWF0ZSBUYXNrIGZyb20gQWlkIFJlcXVlc3Q8L0gzPlxyXG4gICAgICAgICAgICA8VGV4dCBtYXJnaW5Cb3R0b209XCJsZ1wiPlxyXG4gICAgICAgICAgICAgICAgQ3JlYXRpbmcgdGFzayBmb3I6IDxzdHJvbmc+e3JlY29yZD8ucGFyYW1zPy5uYW1lIHx8ICdVbmtub3duIFJlcXVlc3QnfTwvc3Ryb25nPlxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcblxyXG4gICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cclxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgICAgPExhYmVsPlRhc2sgTmFtZTwvTGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS50YXNrTmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Rm9ybURhdGEoKHByZXYpID0+ICh7IC4uLnByZXYsIHRhc2tOYW1lOiBlLnRhcmdldC52YWx1ZSB9KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuXHJcbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMYWJlbD5Qcmlvcml0eTwvTGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPFNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17eyB2YWx1ZTogZm9ybURhdGEucHJpb3JpdHksIGxhYmVsOiBmb3JtRGF0YS5wcmlvcml0eSB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnaGlnaCcsIGxhYmVsOiAnSGlnaCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICdtZWRpdW0nLCBsYWJlbDogJ01lZGl1bScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICdsb3cnLCBsYWJlbDogJ0xvdycgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhzZWxlY3RlZCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBwcmlvcml0eTogc2VsZWN0ZWQudmFsdWUgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcblxyXG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cD5cclxuICAgICAgICAgICAgICAgICAgICA8TGFiZWw+Vm9sdW50ZWVycyBOZWVkZWQ8L0xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluPVwiMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS52b2x1bnRlZXJzTmVlZGVkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRGb3JtRGF0YSgocHJldikgPT4gKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvbHVudGVlcnNOZWVkZWQ6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlLCAxMCkgfHwgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG5cclxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgICAgPENoZWNrQm94XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiaXNPcGVuXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17Zm9ybURhdGEuaXNPcGVufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBpc09wZW46ICFwcmV2LmlzT3BlbiB9KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPExhYmVsIGlubGluZSBodG1sRm9yPVwiaXNPcGVuXCIgbWFyZ2luTGVmdD1cImRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgT3BlbiBUYXNrICh2b2x1bnRlZXJzIGNhbiBjbGFpbSBmcm9tIG1hcmtldHBsYWNlKVxyXG4gICAgICAgICAgICAgICAgICAgIDwvTGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuXHJcbiAgICAgICAgICAgICAgICB7IWZvcm1EYXRhLmlzT3BlbiAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1Hcm91cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzaWduIFZvbHVudGVlcnMge2Zvcm1EYXRhLnZvbHVudGVlcnNOZWVkZWQgPiAxICYmIGAobWF4ICR7Zm9ybURhdGEudm9sdW50ZWVyc05lZWRlZH0pYH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNNdWx0aT17Zm9ybURhdGEudm9sdW50ZWVyc05lZWRlZCA+IDF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1NlYXJjaGFibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3ZvbHVudGVlcnN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dm9sdW50ZWVycy5maWx0ZXIodiA9PiBmb3JtRGF0YS5zZWxlY3RlZFZvbHVudGVlcnMuaW5jbHVkZXModi52YWx1ZSkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhzZWxlY3RlZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Rm9ybURhdGEocHJldiA9PiAoeyAuLi5wcmV2LCBzZWxlY3RlZFZvbHVudGVlcnM6IFtdIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdWYWx1ZXMgPSBBcnJheS5pc0FycmF5KHNlbGVjdGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHNlbGVjdGVkLnNsaWNlKDAsIGZvcm1EYXRhLnZvbHVudGVlcnNOZWVkZWQpLm1hcChzID0+IHMudmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogW3NlbGVjdGVkLnZhbHVlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRGb3JtRGF0YShwcmV2ID0+ICh7IC4uLnByZXYsIHNlbGVjdGVkVm9sdW50ZWVyczogbmV3VmFsdWVzIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17Zm9ybURhdGEudm9sdW50ZWVyc05lZWRlZCA+IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGBTZWxlY3QgdXAgdG8gJHtmb3JtRGF0YS52b2x1bnRlZXJzTmVlZGVkfSB2b2x1bnRlZXJzLi4uYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJTZWxlY3QgYSB2b2x1bnRlZXIuLi5cIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2Zvcm1EYXRhLnNlbGVjdGVkVm9sdW50ZWVycy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IG1hcmdpblRvcD1cInNtXCIgY29sb3I9XCJncmV5NjBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWxlY3RlZDoge2Zvcm1EYXRhLnNlbGVjdGVkVm9sdW50ZWVycy5sZW5ndGh9L3tmb3JtRGF0YS52b2x1bnRlZXJzTmVlZGVkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG4gICAgICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgICAgICA8Qm94IG1hcmdpblRvcD1cInhsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwic3VibWl0XCIgdmFyaWFudD1cInByaW1hcnlcIiBkaXNhYmxlZD17bG9hZGluZ30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtsb2FkaW5nID8gPExvYWRlciAvPiA6ICdDcmVhdGUgVGFzayd9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0PVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+ICh3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvZGFzaGJvYXJkL3Jlc291cmNlcy9BaWRSZXF1ZXN0Jyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDYW5jZWxcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlVGFza0Zyb21BaWRSZXF1ZXN0O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgSW5wdXQsIExhYmVsLCBGb3JtR3JvdXAgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IE1hcFBpY2tlciA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyByZWNvcmQsIHByb3BlcnR5LCBvbkNoYW5nZSB9ID0gcHJvcHM7XHJcbiAgICBjb25zdCBtYXBDb250YWluZXJSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgICBjb25zdCBtYXBJbnN0YW5jZVJlZiA9IHVzZVJlZihudWxsKTtcclxuICAgIGNvbnN0IG1hcmtlclJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgICAvLyBJbml0aWFsIFZhbHVlc1xyXG4gICAgY29uc3QgZ2V0SW5pdGlhbFZhbHVlID0gKHBhdGgpID0+IHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uJHtwYXRofWBdO1xyXG4gICAgY29uc3QgaW5pdGlhbExhdCA9IHBhcnNlRmxvYXQoZ2V0SW5pdGlhbFZhbHVlKCdsb2NhdGlvbi5jb29yZGluYXRlcy4xJykpIHx8IDA7XHJcbiAgICBjb25zdCBpbml0aWFsTG5nID0gcGFyc2VGbG9hdChnZXRJbml0aWFsVmFsdWUoJ2xvY2F0aW9uLmNvb3JkaW5hdGVzLjAnKSkgfHwgMDtcclxuXHJcbiAgICBjb25zdCBbcG9zaXRpb24sIHNldFBvc2l0aW9uXSA9IHVzZVN0YXRlKGluaXRpYWxMYXQgJiYgaW5pdGlhbExuZyA/IFtpbml0aWFsTGF0LCBpbml0aWFsTG5nXSA6IG51bGwpO1xyXG4gICAgY29uc3QgW3NlYXJjaFF1ZXJ5LCBzZXRTZWFyY2hRdWVyeV0gPSB1c2VTdGF0ZSgnJyk7XHJcblxyXG4gICAgY29uc3QgW2FkZHJlc3NEYXRhLCBzZXRBZGRyZXNzRGF0YV0gPSB1c2VTdGF0ZSh7XHJcbiAgICAgICAgYWRkcmVzc0xpbmUxOiBnZXRJbml0aWFsVmFsdWUoJ2FkZHJlc3NMaW5lMScpIHx8ICcnLFxyXG4gICAgICAgIGFkZHJlc3NMaW5lMjogZ2V0SW5pdGlhbFZhbHVlKCdhZGRyZXNzTGluZTInKSB8fCAnJyxcclxuICAgICAgICBhZGRyZXNzTGluZTM6IGdldEluaXRpYWxWYWx1ZSgnYWRkcmVzc0xpbmUzJykgfHwgJycsXHJcbiAgICAgICAgcGluQ29kZTogZ2V0SW5pdGlhbFZhbHVlKCdwaW5Db2RlJykgfHwgJycsXHJcbiAgICAgICAgbG9jYXRpb246IHsgdHlwZTogJ1BvaW50JywgY29vcmRpbmF0ZXM6IFtpbml0aWFsTG5nLCBpbml0aWFsTGF0XSB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIZWxwZXIgdG8gdHJpZ2dlciBBZG1pbkpTIG9uQ2hhbmdlXHJcbiAgICAvLyBXZSB3cmFwIHRoaXMgaW4gYSBjdXN0b21pemVkIGhvb2sgb3IganVzdCBjYWxsIGl0IGluIHVzZUVmZmVjdFxyXG4gICAgY29uc3QgdXBkYXRlUmVjb3JkID0gKGRhdGEpID0+IHtcclxuICAgICAgICAvLyBTYW5pdGl6ZSBwaW5Db2RlOiBPbmx5IGRpZ2l0cywgb3IgbnVsbFxyXG4gICAgICAgIGxldCBjbGVhblBpbiA9IG51bGw7XHJcbiAgICAgICAgaWYgKGRhdGEucGluQ29kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBzdHJQaW4gPSBTdHJpbmcoZGF0YS5waW5Db2RlKS5yZXBsYWNlKC9cXEQvZywgJycpOyAvLyBSZW1vdmUgbm9uLWRpZ2l0c1xyXG4gICAgICAgICAgICBpZiAoc3RyUGluLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNsZWFuUGluID0gcGFyc2VJbnQoc3RyUGluLCAxMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XHJcbiAgICAgICAgICAgIGFkZHJlc3NMaW5lMTogZGF0YS5hZGRyZXNzTGluZTEgfHwgJycsXHJcbiAgICAgICAgICAgIGFkZHJlc3NMaW5lMjogZGF0YS5hZGRyZXNzTGluZTIgfHwgJycsXHJcbiAgICAgICAgICAgIGFkZHJlc3NMaW5lMzogZGF0YS5hZGRyZXNzTGluZTMgfHwgJycsXHJcbiAgICAgICAgICAgIHBpbkNvZGU6IGNsZWFuUGluLFxyXG4gICAgICAgICAgICBsb2NhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgLi4uZGF0YS5sb2NhdGlvbixcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdQb2ludCcsXHJcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQoZGF0YS5sb2NhdGlvbj8uY29vcmRpbmF0ZXM/LlswXSkgfHwgMCxcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KGRhdGEubG9jYXRpb24/LmNvb3JkaW5hdGVzPy5bMV0pIHx8IDBcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbREVCVUddIE1hcFBpY2tlciBwYXlsb2FkIChPYmplY3QpOicsIHBheWxvYWQpO1xyXG4gICAgICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIHBheWxvYWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBHZW5lcmljIEFkZHJlc3MgVXBkYXRlciBmcm9tIE5vbWluYXRpbSBEYXRhXHJcbiAgICBjb25zdCB1cGRhdGVBZGRyZXNzRnJvbU5vbWluYXRpbSA9IChkYXRhLCBsYXQsIGxuZykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFkZHJlc3MgPSBkYXRhLmFkZHJlc3MgfHwge307XHJcblxyXG4gICAgICAgIC8vIENvbnN0cnVjdCBBZGRyZXNzIExpbmUgMSAoU2lnbmlmaWNhbnQgcGxhY2UgbmFtZSlcclxuICAgICAgICAvLyBPcmRlciBvZiBwcmVmZXJlbmNlOiBhbWVuaXR5LCBidWlsZGluZywgcm9hZCwgdmlsbGFnZSwgc3VidXJiLCB0b3duLCBjaXR5XHJcbiAgICAgICAgY29uc3QgbGluZTEgPSBhZGRyZXNzLmFtZW5pdHkgfHwgYWRkcmVzcy5idWlsZGluZyB8fCBhZGRyZXNzLnJvYWQgfHwgYWRkcmVzcy52aWxsYWdlIHx8IGFkZHJlc3Muc3VidXJiIHx8IGFkZHJlc3MudG93biB8fCBhZGRyZXNzLmNpdHkgfHwgZGF0YS5kaXNwbGF5X25hbWUuc3BsaXQoJywnKVswXTtcclxuXHJcbiAgICAgICAgLy8gQ29uc3RydWN0IEFkZHJlc3MgTGluZSAyIChEaXN0cmljdC9TdGF0ZS9SZWdpb24pXHJcbiAgICAgICAgY29uc3QgbGluZTIgPSBbYWRkcmVzcy5jaXR5IHx8IGFkZHJlc3MudG93biwgYWRkcmVzcy5zdGF0ZV9kaXN0cmljdCwgYWRkcmVzcy5zdGF0ZV0uZmlsdGVyKHggPT4geCkuam9pbignLCAnKTtcclxuXHJcbiAgICAgICAgY29uc3QgcG9zdGNvZGUgPSBhZGRyZXNzLnBvc3Rjb2RlIHx8ICcnO1xyXG5cclxuICAgICAgICBzZXRBZGRyZXNzRGF0YShwcmV2ID0+ICh7XHJcbiAgICAgICAgICAgIC4uLnByZXYsXHJcbiAgICAgICAgICAgIGFkZHJlc3NMaW5lMTogbGluZTEgfHwgJycsXHJcbiAgICAgICAgICAgIGFkZHJlc3NMaW5lMjogbGluZTIgfHwgJycsXHJcbiAgICAgICAgICAgIGFkZHJlc3NMaW5lMzogcHJldi5hZGRyZXNzTGluZTMgfHwgJycsXHJcbiAgICAgICAgICAgIHBpbkNvZGU6IHBvc3Rjb2RlLFxyXG4gICAgICAgICAgICBsb2NhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ1BvaW50JyxcclxuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbbG5nLCBsYXRdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEhhbmRsZSBSZXZlcnNlIEdlb2NvZGluZyB2aWEgTm9taW5hdGltXHJcbiAgICBjb25zdCByZXZlcnNlR2VvY29kZSA9IGFzeW5jIChsYXQsIGxuZykgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnL3JldmVyc2U/Zm9ybWF0PWpzb24mbGF0PSR7bGF0fSZsb249JHtsbmd9JmFkZHJlc3NkZXRhaWxzPTEmYWNjZXB0LWxhbmd1YWdlPWVuYCwge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnVXNlci1BZ2VudCc6ICdSZWxpZWZGbG93QWRtaW4vMS4wJyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmFkZHJlc3MpIHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUFkZHJlc3NGcm9tTm9taW5hdGltKGRhdGEsIGxhdCwgbG5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlJldmVyc2UgZ2VvY29kaW5nIGZhaWxlZFwiLCBlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIExvYWQgTGVhZmxldCBmcm9tIENETlxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBsb2FkTGVhZmxldCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5MKSByZXR1cm4gd2luZG93Lkw7XHJcblxyXG4gICAgICAgICAgICAvLyBMb2FkIENTU1xyXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWFmbGV0LWNzcycpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gICAgICAgICAgICAgICAgbGluay5pZCA9ICdsZWFmbGV0LWNzcyc7XHJcbiAgICAgICAgICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcclxuICAgICAgICAgICAgICAgIGxpbmsuaHJlZiA9ICdodHRwczovL3VucGtnLmNvbS9sZWFmbGV0QDEuOS40L2Rpc3QvbGVhZmxldC5jc3MnO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTG9hZCBKU1xyXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWFmbGV0LWpzJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgICAgICAgICAgICAgc2NyaXB0LmlkID0gJ2xlYWZsZXQtanMnO1xyXG4gICAgICAgICAgICAgICAgc2NyaXB0LnNyYyA9ICdodHRwczovL3VucGtnLmNvbS9sZWFmbGV0QDEuOS40L2Rpc3QvbGVhZmxldC5qcyc7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHsgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHJlc29sdmUod2luZG93LkwpOyB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFdhaXQgZm9yIGl0IHRvIGJlIHJlYWR5XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVjayA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5MKSB7IGNsZWFySW50ZXJ2YWwoY2hlY2spOyByZXNvbHZlKHdpbmRvdy5MKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxvYWRMZWFmbGV0KCkudGhlbigoTCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIW1hcEluc3RhbmNlUmVmLmN1cnJlbnQgJiYgbWFwQ29udGFpbmVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbnRlciA9IHBvc2l0aW9uIHx8IFsxMC44NTA1LCA3Ni4yNzExXTsgLy8gRGVmYXVsdCBLZXJhbGFcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hcCA9IEwubWFwKG1hcENvbnRhaW5lclJlZi5jdXJyZW50KS5zZXRWaWV3KGNlbnRlciwgcG9zaXRpb24gPyAxNSA6IDcpO1xyXG5cclxuICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ8KpIE9wZW5TdHJlZXRNYXAgY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obWFwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDbGljayBldmVudFxyXG4gICAgICAgICAgICAgICAgbWFwLm9uKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBsYXQsIGxuZyB9ID0gZS5sYXRsbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UG9zID0gW2xhdCwgbG5nXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcmtlclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlclJlZi5jdXJyZW50LnNldExhdExuZyhuZXdQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlclJlZi5jdXJyZW50ID0gTC5tYXJrZXIobmV3UG9zKS5hZGRUbyhtYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0UG9zaXRpb24obmV3UG9zKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlciBSZXZlcnNlIEdlb2NvZGluZ1xyXG4gICAgICAgICAgICAgICAgICAgIHJldmVyc2VHZW9jb2RlKGxhdCwgbG5nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT3B0aW1pc3RpYyB1cGRhdGUgb2YgY29vcmRpbmF0ZXNcclxuICAgICAgICAgICAgICAgICAgICBzZXRBZGRyZXNzRGF0YShwcmV2ID0+ICh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnUG9pbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFtsbmcsIGxhdF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIG1hcEluc3RhbmNlUmVmLmN1cnJlbnQgPSBtYXA7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSW5pdGlhbCBtYXJrZXJcclxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlclJlZi5jdXJyZW50ID0gTC5tYXJrZXIocG9zaXRpb24pLmFkZFRvKG1hcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQ2xlYW51cFxyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtYXBJbnN0YW5jZVJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBtYXBJbnN0YW5jZVJlZi5jdXJyZW50LnJlbW92ZSgpOyAvLyBSZW1vdmluZyBtaWdodCBiZSBhZ2dyZXNzaXZlIGlmIGNvbXBvbmVudCByZW1vdW50c1xyXG4gICAgICAgICAgICAgICAgLy8gbWFwSW5zdGFuY2VSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSwgW10pOyAvLyBFbXB0eSBkZXBzLCBydW4gb25jZSBvbiBtb3VudFxyXG5cclxuICAgIC8vIFN5bmMgc3RhdGUgY2hhbmdlcyB0byBBZG1pbkpTXHJcbiAgICAvLyBUaGlzIGlzIHRoZSBPTkxZIHBsYWNlIHdoZXJlIHdlIG5vdGlmeSBBZG1pbkpTIG9mIGNoYW5nZXNcclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgdXBkYXRlUmVjb3JkKGFkZHJlc3NEYXRhKTtcclxuICAgIH0sIFthZGRyZXNzRGF0YV0pO1xyXG5cclxuXHJcbiAgICAvLyBIYW5kbGUgU2VhcmNoXHJcbiAgICBjb25zdCBoYW5kbGVTZWFyY2ggPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFzZWFyY2hRdWVyeSB8fCAhd2luZG93LkwgfHwgIW1hcEluc3RhbmNlUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy9zZWFyY2g/Zm9ybWF0PWpzb24mcT0ke3NlYXJjaFF1ZXJ5fSZsaW1pdD0xJmFkZHJlc3NkZXRhaWxzPTEmYWNjZXB0LWxhbmd1YWdlPWVuYCwge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnVXNlci1BZ2VudCc6ICdSZWxpZWZGbG93QWRtaW4vMS4wJyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgbGF0LCBsb24gfSA9IGRhdGFbMF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdQb3MgPSBbcGFyc2VGbG9hdChsYXQpLCBwYXJzZUZsb2F0KGxvbildO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IEwgPSB3aW5kb3cuTDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hcCA9IG1hcEluc3RhbmNlUmVmLmN1cnJlbnQ7XHJcbiAgICAgICAgICAgICAgICBtYXAuc2V0VmlldyhuZXdQb3MsIDE1KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWFya2VyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXJSZWYuY3VycmVudC5zZXRMYXRMbmcobmV3UG9zKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyUmVmLmN1cnJlbnQgPSBMLm1hcmtlcihuZXdQb3MpLmFkZFRvKG1hcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0UG9zaXRpb24obmV3UG9zKTtcclxuICAgICAgICAgICAgICAgIC8vIFVzZSB0aGUgZGV0YWlsZWQgYWRkcmVzcyBmcm9tIHNlYXJjaCByZXN1bHRcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUFkZHJlc3NGcm9tTm9taW5hdGltKGRhdGFbMF0sIHBhcnNlRmxvYXQobGF0KSwgcGFyc2VGbG9hdChsb24pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNlYXJjaCBmYWlsZWRcIiwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZWJ1ZzogTG9nIGVycm9ycyBvbiBldmVyeSByZW5kZXJcclxuICAgIGlmIChyZWNvcmQ/LmVycm9ycyAmJiBPYmplY3Qua2V5cyhyZWNvcmQuZXJyb3JzKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tERUJVR10gUmVuZGVyIFJlY29yZCBlcnJvcnM6JywgSlNPTi5zdHJpbmdpZnkocmVjb3JkLmVycm9ycywgbnVsbCwgMikpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveCBtYj1cInhsXCI+XHJcbiAgICAgICAgICAgIDxMYWJlbD5Mb2NhdGlvbiBTZWFyY2g8L0xhYmVsPlxyXG4gICAgICAgICAgICA8Qm94IGZsZXggZmxleERpcmVjdGlvbj1cInJvd1wiIG1iPVwiZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaFF1ZXJ5fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoUXVlcnkoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGZvciBhIHBsYWNlIChlLmcuIE1hdmVsaWtrYXJhKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgZmxleEdyb3c6IDEsIG1hcmdpblJpZ2h0OiAnMTBweCcgfX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e2hhbmRsZVNlYXJjaH0gdHlwZT1cImJ1dHRvblwiPlNlYXJjaDwvQnV0dG9uPlxyXG4gICAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICAgIDxCb3ggaGVpZ2h0PVwiNDAwcHhcIiBtYj1cImRlZmF1bHRcIiBib3JkZXI9XCJkZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj17bWFwQ29udGFpbmVyUmVmfSBzdHlsZT17eyBoZWlnaHQ6ICcxMDAlJywgd2lkdGg6ICcxMDAlJyB9fSAvPlxyXG4gICAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICAgIDxGb3JtR3JvdXA+XHJcbiAgICAgICAgICAgICAgICA8TGFiZWw+U2hlbHRlciBBZGRyZXNzIExpbmUgMTwvTGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YWRkcmVzc0RhdGEuYWRkcmVzc0xpbmUxfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QWRkcmVzc0RhdGEocHJldiA9PiAoeyAuLi5wcmV2LCBhZGRyZXNzTGluZTE6IGUudGFyZ2V0LnZhbHVlIH0pKX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG5cclxuICAgICAgICAgICAgPEZvcm1Hcm91cD5cclxuICAgICAgICAgICAgICAgIDxMYWJlbD5TaGVsdGVyIEFkZHJlc3MgTGluZSAyPC9MYWJlbD5cclxuICAgICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXthZGRyZXNzRGF0YS5hZGRyZXNzTGluZTJ9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRBZGRyZXNzRGF0YShwcmV2ID0+ICh7IC4uLnByZXYsIGFkZHJlc3NMaW5lMjogZS50YXJnZXQudmFsdWUgfSkpfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcblxyXG4gICAgICAgICAgICA8Rm9ybUdyb3VwPlxyXG4gICAgICAgICAgICAgICAgPExhYmVsPlNoZWx0ZXIgQWRkcmVzcyBMaW5lIDM8L0xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FkZHJlc3NEYXRhLmFkZHJlc3NMaW5lM31cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEFkZHJlc3NEYXRhKHByZXYgPT4gKHsgLi4ucHJldiwgYWRkcmVzc0xpbmUzOiBlLnRhcmdldC52YWx1ZSB9KSl9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuXHJcbiAgICAgICAgICAgIDxGb3JtR3JvdXA+XHJcbiAgICAgICAgICAgICAgICA8TGFiZWw+UGluIENvZGU8L0xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FkZHJlc3NEYXRhLnBpbkNvZGV9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRBZGRyZXNzRGF0YShwcmV2ID0+ICh7IC4uLnByZXYsIHBpbkNvZGU6IGUudGFyZ2V0LnZhbHVlIH0pKX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG5cclxuICAgICAgICAgICAgPEJveD5cclxuICAgICAgICAgICAgICAgIDxMYWJlbD5Db29yZGluYXRlczwvTGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMC44ZW0nLCBjb2xvcjogJyM4ODgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIExhdDoge2FkZHJlc3NEYXRhLmxvY2F0aW9uPy5jb29yZGluYXRlcz8uWzFdIHx8IDB9LFxyXG4gICAgICAgICAgICAgICAgICAgIExuZzoge2FkZHJlc3NEYXRhLmxvY2F0aW9uPy5jb29yZGluYXRlcz8uWzBdIHx8IDB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFwUGlja2VyO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIExhYmVsIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBNYXBTaG93ID0gKHByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IHJlY29yZCwgcHJvcGVydHkgfSA9IHByb3BzO1xyXG4gICAgY29uc3QgbWFwQ29udGFpbmVyUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gICAgY29uc3QgbWFwSW5zdGFuY2VSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgICBjb25zdCBtYXJrZXJSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gICAgLy8gSW5pdGlhbCBWYWx1ZXNcclxuICAgIC8vIEFkbWluSlMgZmxhdHRlbnMgbmVzdGVkIG9iamVjdHMgaW4gcGFyYW1zLCBlLmcuICdsb2NhdGlvbi5jb29yZGluYXRlcy4wJ1xyXG4gICAgY29uc3QgZ2V0SW5pdGlhbFZhbHVlID0gKHBhdGgpID0+IHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uJHtwYXRofWBdO1xyXG5cclxuICAgIC8vIE5vdGU6IEdlb0pTT04gc3RvcmVzIFtsbmcsIGxhdF0sIGJ1dCBMZWFmbGV0IHVzZXMgW2xhdCwgbG5nXVxyXG4gICAgY29uc3QgaW5pdGlhbExuZyA9IHBhcnNlRmxvYXQoZ2V0SW5pdGlhbFZhbHVlKCdjb29yZGluYXRlcy4wJykpO1xyXG4gICAgY29uc3QgaW5pdGlhbExhdCA9IHBhcnNlRmxvYXQoZ2V0SW5pdGlhbFZhbHVlKCdjb29yZGluYXRlcy4xJykpO1xyXG5cclxuICAgIGNvbnN0IGhhc0xvY2F0aW9uID0gIWlzTmFOKGluaXRpYWxMYXQpICYmICFpc05hTihpbml0aWFsTG5nKTtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gaGFzTG9jYXRpb24gPyBbaW5pdGlhbExhdCwgaW5pdGlhbExuZ10gOiBudWxsO1xyXG5cclxuICAgIC8vIExvYWQgTGVhZmxldCBmcm9tIENETnNcclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbG9hZExlYWZsZXQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuTCkgcmV0dXJuIHdpbmRvdy5MO1xyXG5cclxuICAgICAgICAgICAgLy8gTG9hZCBDU1NcclxuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVhZmxldC1jc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuICAgICAgICAgICAgICAgIGxpbmsuaWQgPSAnbGVhZmxldC1jc3MnO1xyXG4gICAgICAgICAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XHJcbiAgICAgICAgICAgICAgICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldEAxLjkuNC9kaXN0L2xlYWZsZXQuY3NzJztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIExvYWQgSlNcclxuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVhZmxldC1qcycpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICAgICAgICAgIHNjcmlwdC5pZCA9ICdsZWFmbGV0LWpzJztcclxuICAgICAgICAgICAgICAgIHNjcmlwdC5zcmMgPSAnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldEAxLjkuNC9kaXN0L2xlYWZsZXQuanMnO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7IHNjcmlwdC5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKHdpbmRvdy5MKTsgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBXYWl0IGZvciBpdCB0byBiZSByZWFkeVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2sgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuTCkgeyBjbGVhckludGVydmFsKGNoZWNrKTsgcmVzb2x2ZSh3aW5kb3cuTCk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoaGFzTG9jYXRpb24pIHtcclxuICAgICAgICAgICAgbG9hZExlYWZsZXQoKS50aGVuKChMKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1hcEluc3RhbmNlUmVmLmN1cnJlbnQgJiYgbWFwQ29udGFpbmVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjZW50ZXIgPSBwb3NpdGlvbiB8fCBbMTAuODUwNSwgNzYuMjcxMV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFwID0gTC5tYXAobWFwQ29udGFpbmVyUmVmLmN1cnJlbnQpLnNldFZpZXcoY2VudGVyLCAxNSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICfCqSBPcGVuU3RyZWV0TWFwIGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgICAgICAgICB9KS5hZGRUbyhtYXApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBJbml0aWFsIG1hcmtlclxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXJSZWYuY3VycmVudCA9IEwubWFya2VyKHBvc2l0aW9uKS5hZGRUbyhtYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRGlzYWJsZSBpbnRlcmFjdGlvbnMgZm9yIHJlYWQtb25seSB2aWV3XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLmRyYWdnaW5nLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXAudG91Y2hab29tLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXAuZG91YmxlQ2xpY2tab29tLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXAuc2Nyb2xsV2hlZWxab29tLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXAuYm94Wm9vbS5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLmtleWJvYXJkLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFwLnRhcCkgbWFwLnRhcC5kaXNhYmxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hcEluc3RhbmNlUmVmLmN1cnJlbnQgPSBtYXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2xlYW51cFxyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIFdlIGdlbmVyYWxseSBkZXBlbmQgb24gdGhlIGNvbXBvbmVudCB1bm1vdW50aW5nIHRvIGNsZWFuIERPTSByZWZzLCBcclxuICAgICAgICAgICAgLy8gYnV0IExlYWZsZXQgaW5zdGFuY2VzIG1pZ2h0IG5lZWQgbWFudWFsIGNsZWFudXAgaWYgd2Ugd2VyZSByZS1tb3VudGluZyBoZWF2aWx5LlxyXG4gICAgICAgICAgICAvLyBGb3Igc2ltcGxlIHNob3cgdmlld3MsIHRoaXMgaXMgdXN1YWxseSBmaW5lLlxyXG4gICAgICAgIH07XHJcbiAgICB9LCBbaGFzTG9jYXRpb25dKTtcclxuXHJcbiAgICBpZiAoIWhhc0xvY2F0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEJveCBtYj1cInhsXCI+XHJcbiAgICAgICAgICAgICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8Qm94Pk5vIGxvY2F0aW9uIGRhdGEgYXZhaWxhYmxlPC9Cb3g+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94IG1iPVwieGxcIj5cclxuICAgICAgICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxyXG4gICAgICAgICAgICA8Qm94IGhlaWdodD1cIjQwMHB4XCIgbWI9XCJkZWZhdWx0XCIgYm9yZGVyPVwiZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9e21hcENvbnRhaW5lclJlZn0gc3R5bGU9e3sgaGVpZ2h0OiAnMTAwJScsIHdpZHRoOiAnMTAwJScgfX0gLz5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgIDxCb3g+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMC44ZW0nLCBjb2xvcjogJyM4ODgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIExhdDoge2luaXRpYWxMYXR9LCBMbmc6IHtpbml0aWFsTG5nfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hcFNob3c7XHJcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmRcbmltcG9ydCBMaW5rQ29tcG9uZW50IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9MaW5rQ29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5MaW5rQ29tcG9uZW50ID0gTGlua0NvbXBvbmVudFxuaW1wb3J0IFZvbHVudGVlckZpbHRlcmVkU2VsZWN0IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9Wb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVm9sdW50ZWVyRmlsdGVyZWRTZWxlY3QgPSBWb2x1bnRlZXJGaWx0ZXJlZFNlbGVjdFxuaW1wb3J0IFN0YXR1c0ZpbHRlcmVkU2VsZWN0IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9BaWRSZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlN0YXR1c0ZpbHRlcmVkU2VsZWN0ID0gU3RhdHVzRmlsdGVyZWRTZWxlY3RcbmltcG9ydCBEb25hdGlvblJlcXVlc3RTdGF0dXNGaWx0ZXJlZFNlbGVjdCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRvbmF0aW9uUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0ID0gRG9uYXRpb25SZXF1ZXN0U3RhdHVzRmlsdGVyZWRTZWxlY3RcbmltcG9ydCBMb2dpbkNvbXBvbmVudCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTG9naW5Db21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkxvZ2luQ29tcG9uZW50ID0gTG9naW5Db21wb25lbnRcbmltcG9ydCBJbWFnZUNvbXBvbmVudCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvSW1hZ2VDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlQ29tcG9uZW50ID0gSW1hZ2VDb21wb25lbnRcbmltcG9ydCBJbWFnZUxpc3RDb21wb25lbnQgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlTGlzdENvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuSW1hZ2VMaXN0Q29tcG9uZW50ID0gSW1hZ2VMaXN0Q29tcG9uZW50XG5pbXBvcnQgSW1hZ2VFZGl0Q29tcG9uZW50IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9JbWFnZUVkaXRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlRWRpdENvbXBvbmVudCA9IEltYWdlRWRpdENvbXBvbmVudFxuaW1wb3J0IEltYWdlTGlzdEVkaXRDb21wb25lbnQgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC9jb21wb25lbnRzL0ltYWdlTGlzdEVkaXRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlTGlzdEVkaXRDb21wb25lbnQgPSBJbWFnZUxpc3RFZGl0Q29tcG9uZW50XG5pbXBvcnQgQ3JlYXRlVGFza0Zyb21BaWRSZXF1ZXN0IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9DcmVhdGVUYXNrRnJvbUFpZFJlcXVlc3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNyZWF0ZVRhc2tGcm9tQWlkUmVxdWVzdCA9IENyZWF0ZVRhc2tGcm9tQWlkUmVxdWVzdFxuaW1wb3J0IE1hcFBpY2tlciBmcm9tICcuLi9zcmMvZGFzaGJvYXJkL2NvbXBvbmVudHMvTWFwUGlja2VyJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5NYXBQaWNrZXIgPSBNYXBQaWNrZXJcbmltcG9ydCBNYXBTaG93IGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9NYXBTaG93J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5NYXBTaG93ID0gTWFwU2hvd1xuaW1wb3J0IEhlYXRtYXBWaXN1YWxpemF0aW9uIGZyb20gJy4uL3NyYy9kYXNoYm9hcmQvY29tcG9uZW50cy9IZWF0bWFwVmlzdWFsaXphdGlvbidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuSGVhdG1hcFZpc3VhbGl6YXRpb24gPSBIZWF0bWFwVmlzdWFsaXphdGlvbiJdLCJuYW1lcyI6WyJIZWF0bWFwVmlzdWFsaXphdGlvbiIsIm1hcENvbnRhaW5lclJlZiIsInVzZVJlZiIsIm1hcEluc3RhbmNlUmVmIiwiaGVhdExheWVyUmVmIiwibG9hZGluZyIsInNldExvYWRpbmciLCJ1c2VTdGF0ZSIsImVycm9yIiwic2V0RXJyb3IiLCJjYXNlQ291bnQiLCJzZXRDYXNlQ291bnQiLCJub0RhdGEiLCJzZXROb0RhdGEiLCJ1c2VFZmZlY3QiLCJpc01vdW50ZWQiLCJsb2FkTGlicmFyaWVzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImxpbmsiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJyZWwiLCJocmVmIiwiaGVhZCIsImFwcGVuZENoaWxkIiwid2luZG93IiwiTCIsInNjcmlwdCIsInNyYyIsImJvZHkiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ubG9hZCIsIm9uZXJyb3IiLCJoZWF0TGF5ZXIiLCJoZWF0U2NyaXB0IiwiaW5pdE1hcCIsInJlc3BvbnNlIiwiZmV0Y2giLCJyZXN1bHQiLCJqc29uIiwic3VjY2VzcyIsIkVycm9yIiwibWVzc2FnZSIsImhlYXREYXRhIiwiZGF0YSIsImNvdW50IiwidmFsaWRQb2ludHMiLCJmaWx0ZXIiLCJkIiwibGF0IiwibG5nIiwiaXNOYU4iLCJtYXAiLCJpbnRlbnNpdHkiLCJsZW5ndGgiLCJzZXRUaW1lb3V0IiwiY3VycmVudCIsImNvbnRhaW5lciIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0Iiwic2V0VmlldyIsInRpbGVMYXllciIsImF0dHJpYnV0aW9uIiwiYWRkVG8iLCJyYWRpdXMiLCJibHVyIiwibWF4Wm9vbSIsIm1heCIsIm1pbk9wYWNpdHkiLCJncmFkaWVudCIsImJvdW5kcyIsImxhdExuZ0JvdW5kcyIsInAiLCJpc1ZhbGlkIiwiZml0Qm91bmRzIiwicGFkZGluZyIsImUiLCJjb25zb2xlIiwid2FybiIsImVyciIsInJlbW92ZSIsIlJlYWN0IiwiQm94IiwibXQiLCJINSIsIm1iIiwiYmciLCJib3JkZXJSYWRpdXMiLCJib3JkZXIiLCJkaXNwbGF5IiwiYWxpZ25JdGVtcyIsImp1c3RpZnlDb250ZW50IiwiaGVpZ2h0IiwiVGV4dCIsImNvbG9yIiwicG9zaXRpb24iLCJyZWYiLCJzdHlsZSIsIndpZHRoIiwidmlzaWJpbGl0eSIsInRvcCIsImxlZnQiLCJyaWdodCIsImJvdHRvbSIsIkxvYWRlciIsImZvbnRTaXplIiwiZ2FwIiwiQ09MT1JTIiwicHJpbWFyeSIsInB1cnBsZSIsImN5YW4iLCJncmVlbiIsInJlZCIsInllbGxvdyIsImZvcm1hdFJlbGF0aXZlVGltZSIsImRhdGVTdHJpbmciLCJkYXRlIiwiRGF0ZSIsIm5vdyIsImRpZmZNcyIsImRpZmZNaW5zIiwiTWF0aCIsImZsb29yIiwiZGlmZkhvdXJzIiwiZGlmZkRheXMiLCJmb3JtYXRDdXJyZW5jeSIsImFtb3VudCIsInRvRml4ZWQiLCJEb251dENoYXJ0Iiwic2l6ZSIsInRoaWNrbmVzcyIsInRvdGFsIiwicmVkdWNlIiwic3VtIiwiaXRlbSIsInZhbHVlIiwiY2lyY3VtZmVyZW5jZSIsIlBJIiwiY3VycmVudE9mZnNldCIsInZpZXdCb3giLCJjeCIsImN5IiwiciIsImZpbGwiLCJzdHJva2UiLCJzdHJva2VXaWR0aCIsImluZGV4IiwicGVyY2VudGFnZSIsInN0cm9rZURhc2hhcnJheSIsInN0cm9rZURhc2hvZmZzZXQiLCJrZXkiLCJzdHJva2VMaW5lY2FwIiwidHJhbnNmb3JtIiwidHJhbnNpdGlvbiIsIngiLCJ5IiwidGV4dEFuY2hvciIsImZvbnRXZWlnaHQiLCJmbGV4RGlyZWN0aW9uIiwiYmFja2dyb3VuZCIsIm5hbWUiLCJCYXJDaGFydCIsIm1heFZhbHVlIiwiZmxhdE1hcCIsInRhc2tzIiwiYWlkUmVxdWVzdHMiLCJwYWRkaW5nQm90dG9tIiwiZmxleCIsIm1heFdpZHRoIiwibWluSGVpZ2h0IiwidGl0bGUiLCJtYXJnaW5Ub3AiLCJtb250aCIsIkRhc2hib2FyZCIsImN1cnJlbnRBZG1pbiIsInVzZUN1cnJlbnRBZG1pbiIsInN0YXRzIiwic2V0U3RhdHMiLCJmZXRjaFN0YXRzIiwiaW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJ0ZXh0QWxpZ24iLCJ0YXNrU3RhdHVzRGF0YSIsImNvbXBsZXRlZCIsIm9wZW4iLCJhc3NpZ25lZCIsImFjY2VwdGVkIiwib3JhbmdlIiwiY2xhc3NOYW1lIiwiZmxleFdyYXAiLCJIMiIsImVtYWlsIiwic3BsaXQiLCJ0b0xvY2FsZVRpbWVTdHJpbmciLCJwZW5kaW5nIiwiZG9uYXRpb25SZXF1ZXN0cyIsInRvdGFsQW1vdW50IiwidXNlcnMiLCJ2b2x1bnRlZXJzIiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsInJlY2VudFRhc2tzIiwic2xpY2UiLCJ0YXNrIiwiY3JlYXRlZEF0Iiwic3RhdHVzIiwicHJpb3JpdHkiLCJ2b2x1bnRlZXJzTmVlZGVkIiwibW9udGhseVN0YXRzIiwidGV4dERlY29yYXRpb24iLCJyZWxpZWZDZW50ZXJzIiwiY2VudGVyIiwiY29vcmRpbmF0b3IiLCJ3YWxsZXQiLCJGcmFnbWVudCIsImJhbGFuY2UiLCJ0b3RhbENyZWRpdHMiLCJ0b3RhbERlYml0cyIsImRvbm9yQ291bnQiLCJib3JkZXJCb3R0b20iLCJwcmlvcml0aWVzIiwiaGlnaCIsIm1lZGl1bSIsImxvdyIsIkxpbmtDb21wb25lbnQiLCJwcm9wcyIsInJlY29yZCIsInByb3BlcnR5IiwicGFyYW1zIiwibG9uZyIsImFkZHJlc3NQYXJ0cyIsInBhcnQiLCJ0b1N0cmluZyIsInRyaW0iLCJxdWVyeSIsImVuY29kZVVSSUNvbXBvbmVudCIsImpvaW4iLCJtYXBzTGluayIsInRhcmdldCIsImFwaSIsIkFwaUNsaWVudCIsIlZvbHVudGVlckZpbHRlcmVkU2VsZWN0Iiwib25DaGFuZ2UiLCJzZXRWb2x1bnRlZXJzIiwiZmV0Y2hWb2x1bnRlZXJzIiwicmVzb3VyY2VBY3Rpb24iLCJyZXNvdXJjZUlkIiwiYWN0aW9uTmFtZSIsInBlclBhZ2UiLCJyZWNvcmRzIiwibG9nIiwidiIsImxhYmVsIiwiaGFuZGxlQ2hhbmdlIiwic2VsZWN0ZWQiLCJzZWxlY3RlZE9wdGlvbiIsImZpbmQiLCJvcHQiLCJGb3JtR3JvdXAiLCJMYWJlbCIsInJlcXVpcmVkIiwiU2VsZWN0Iiwib3B0aW9ucyIsImlzTG9hZGluZyIsImlzQ2xlYXJhYmxlIiwicGxhY2Vob2xkZXIiLCJkZXNjcmlwdGlvbiIsIkZvcm1NZXNzYWdlIiwiU3RhdHVzRmlsdGVyZWRTZWxlY3QiLCJzZXRTdGF0dXMiLCJmZXRjaFN0YXR1cyIsIkRvbmF0aW9uUmVxdWVzdFN0YXR1c0ZpbHRlcmVkU2VsZWN0IiwiTG9naW5Db21wb25lbnQiLCJzZXRFbWFpbCIsInBhc3N3b3JkIiwic2V0UGFzc3dvcmQiLCJzaG93UGFzc3dvcmQiLCJzZXRTaG93UGFzc3dvcmQiLCJ0cmFuc2xhdGVNZXNzYWdlIiwidXNlVHJhbnNsYXRpb24iLCJoYW5kbGVTdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsIm1ldGhvZCIsImhlYWRlcnMiLCJKU09OIiwic3RyaW5naWZ5IiwiY3JlZGVudGlhbHMiLCJvayIsImxvY2F0aW9uIiwicmVkaXJlY3RVcmwiLCJmb250RmFtaWx5IiwiXyIsIm1kIiwiYWx0IiwibWFyZ2luQm90dG9tIiwib25FcnJvciIsIm9wYWNpdHkiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3hTaGFkb3ciLCJvblN1Ym1pdCIsImh0bWxGb3IiLCJJbnB1dCIsInR5cGUiLCJkaXNhYmxlZCIsInBhZGRpbmdSaWdodCIsIm9uQ2xpY2siLCJjdXJzb3IiLCJCdXR0b24iLCJ2YXJpYW50IiwibWFyZ2luUmlnaHQiLCJhcyIsIkltYWdlQ29tcG9uZW50IiwiaW1hZ2VVcmwiLCJtYXhIZWlnaHQiLCJvYmplY3RGaXQiLCJJbWFnZUxpc3RDb21wb25lbnQiLCJpbWFnZXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInN0YXJ0c1dpdGgiLCJwb3AiLCJwdXNoIiwidXJsIiwiSW1hZ2VFZGl0Q29tcG9uZW50Iiwic2V0SW1hZ2VVcmwiLCJoYW5kbGVJbnB1dENoYW5nZSIsImV2ZW50IiwibmV3VmFsdWUiLCJJbWFnZUxpc3RFZGl0Q29tcG9uZW50IiwiZ2V0SW1hZ2VzIiwicGFyc2VJbnQiLCJpbWciLCJ1bmRlZmluZWQiLCJzZXRJbWFnZXMiLCJ1cGRhdGVSZWNvcmQiLCJuZXdJbWFnZXMiLCJoYW5kbGVBZGQiLCJoYW5kbGVSZW1vdmUiLCJzcGxpY2UiLCJmbGV4R3JvdyIsIkljb24iLCJpY29uIiwiQkFTRV9VUkwiLCJDcmVhdGVUYXNrRnJvbUFpZFJlcXVlc3QiLCJyZXNvdXJjZSIsImFkZE5vdGljZSIsInVzZU5vdGljZSIsInNlYXJjaFF1ZXJ5Iiwic2V0U2VhcmNoUXVlcnkiLCJmb3JtRGF0YSIsInNldEZvcm1EYXRhIiwidGFza05hbWUiLCJpc09wZW4iLCJzZWxlY3RlZFZvbHVudGVlcnMiLCJoYXNFeGlzdGluZ1Rhc2siLCJzZXRIYXNFeGlzdGluZ1Rhc2siLCJjaGVja0V4aXN0aW5nVGFzayIsInNraWxsIiwiYXNzaWduZWRWb2x1bnRlZXJzIiwiTWVzc2FnZUJveCIsIkgzIiwicHJldiIsIm1pbiIsIkNoZWNrQm94IiwiY2hlY2tlZCIsImlubGluZSIsIm1hcmdpbkxlZnQiLCJpc011bHRpIiwiaXNTZWFyY2hhYmxlIiwiaW5jbHVkZXMiLCJuZXdWYWx1ZXMiLCJBcnJheSIsImlzQXJyYXkiLCJzIiwiTWFwUGlja2VyIiwibWFya2VyUmVmIiwiZ2V0SW5pdGlhbFZhbHVlIiwicGF0aCIsImluaXRpYWxMYXQiLCJwYXJzZUZsb2F0IiwiaW5pdGlhbExuZyIsInNldFBvc2l0aW9uIiwiYWRkcmVzc0RhdGEiLCJzZXRBZGRyZXNzRGF0YSIsImFkZHJlc3NMaW5lMSIsImFkZHJlc3NMaW5lMiIsImFkZHJlc3NMaW5lMyIsInBpbkNvZGUiLCJjb29yZGluYXRlcyIsImNsZWFuUGluIiwic3RyUGluIiwiU3RyaW5nIiwicmVwbGFjZSIsInBheWxvYWQiLCJ1cGRhdGVBZGRyZXNzRnJvbU5vbWluYXRpbSIsImFkZHJlc3MiLCJsaW5lMSIsImFtZW5pdHkiLCJidWlsZGluZyIsInJvYWQiLCJ2aWxsYWdlIiwic3VidXJiIiwidG93biIsImNpdHkiLCJkaXNwbGF5X25hbWUiLCJsaW5lMiIsInN0YXRlX2Rpc3RyaWN0Iiwic3RhdGUiLCJwb3N0Y29kZSIsInJldmVyc2VHZW9jb2RlIiwibG9hZExlYWZsZXQiLCJjaGVjayIsInRoZW4iLCJvbiIsImxhdGxuZyIsIm5ld1BvcyIsInNldExhdExuZyIsIm1hcmtlciIsImhhbmRsZVNlYXJjaCIsImxvbiIsImVycm9ycyIsIk1hcFNob3ciLCJoYXNMb2NhdGlvbiIsImRyYWdnaW5nIiwiZGlzYWJsZSIsInRvdWNoWm9vbSIsImRvdWJsZUNsaWNrWm9vbSIsInNjcm9sbFdoZWVsWm9vbSIsImJveFpvb20iLCJrZXlib2FyZCIsInRhcCIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztJQUdBLE1BQU1BLG9CQUFvQixHQUFHQSxNQUFNO0lBQy9CLEVBQUEsTUFBTUMs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
