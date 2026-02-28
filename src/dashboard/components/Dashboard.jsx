import React, { useEffect, useState } from 'react';
import { Box, H2, H5, Text, Loader } from '@adminjs/design-system';
import { useCurrentAdmin } from 'adminjs';
import HeatmapVisualization from './HeatmapVisualization.jsx';

// Color constants matching CSS design system
const COLORS = {
  primary: '#2563eb',
  purple: '#8b5cf6',
  cyan: '#06b6d4',
  green: '#10b981',
  red: '#ef4444',
  yellow: '#f59e0b',
  gray: '#94a3b8',
  orange: '#f97316',
};

// Format relative time
const formatRelativeTime = (dateString) => {
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
const formatCurrency = (amount) => {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
};

// Simple Donut Chart component (SVG-based, no external deps)
const DonutChart = ({ data, size = 180, thickness = 30 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) return null;

  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={thickness}
        />
        {data.map((item, index) => {
          const percentage = item.value / total;
          const strokeDasharray = `${percentage * circumference} ${circumference}`;
          const strokeDashoffset = -currentOffset;
          currentOffset += percentage * circumference;

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={thickness}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              style={{ transition: 'stroke-dasharray 0.5s ease' }}
            />
          );
        })}
        <text
          x={size / 2}
          y={size / 2 - 8}
          textAnchor="middle"
          fontSize="24"
          fontWeight="700"
          fill="#1e293b"
        >
          {total}
        </text>
        <text
          x={size / 2}
          y={size / 2 + 14}
          textAnchor="middle"
          fontSize="12"
          fill="#64748b"
        >
          Total
        </text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: item.color }} />
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              {item.name}: <strong style={{ color: '#1e293b' }}>{item.value}</strong> ({((item.value / total) * 100).toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple Bar Chart component (CSS-based)
const BarChart = ({ data, height = 200 }) => {
  const maxValue = Math.max(...data.flatMap(d => [d.tasks, d.aidRequests]));

  return (
    <div style={{ height, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: '8px', paddingBottom: '30px', position: 'relative' }}>
      {/* Y-axis line */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: '30px', width: '1px', background: '#e2e8f0' }} />

      {data.map((item, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, maxWidth: '80px' }}>
          <div style={{ display: 'flex', gap: '4px', height: `${height - 30}px`, alignItems: 'flex-end' }}>
            <div
              style={{
                width: '20px',
                height: `${maxValue ? (item.tasks / maxValue) * 100 : 0}%`,
                background: COLORS.primary,
                borderRadius: '4px 4px 0 0',
                minHeight: item.tasks > 0 ? '4px' : '0',
                transition: 'height 0.3s ease',
              }}
              title={`Tasks: ${item.tasks}`}
            />
            <div
              style={{
                width: '20px',
                height: `${maxValue ? (item.aidRequests / maxValue) * 100 : 0}%`,
                background: COLORS.purple,
                borderRadius: '4px 4px 0 0',
                minHeight: item.aidRequests > 0 ? '4px' : '0',
                transition: 'height 0.3s ease',
              }}
              title={`Aid Requests: ${item.aidRequests}`}
            />
          </div>
          <span style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>{item.month}</span>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const [currentAdmin] = useCurrentAdmin();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p="xxl" textAlign="center">
        <Text color="danger">{error}</Text>
      </Box>
    );
  }

  // Task status data for donut
  const taskStatusData = [
    { name: 'Completed', value: stats?.tasks?.completed || 0, color: COLORS.green },
    { name: 'Open', value: stats?.tasks?.open || 0, color: COLORS.cyan },
    { name: 'Assigned', value: stats?.tasks?.assigned || 0, color: COLORS.purple },
    { name: 'Accepted', value: stats?.tasks?.accepted || 0, color: COLORS.orange },
  ].filter((d) => d.value > 0);

  return (
    <div className="dashboard-container animate-fade-in">
      {/* Welcome Header */}
      <Box mb="xl">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <H2>Welcome back, {currentAdmin?.email?.split('@')[0] || 'Admin'}!</H2>
            <Text color="grey60" mt="sm">
              Here's an overview of your Relief Management System
            </Text>
          </div>
          <Text color="grey40" fontSize="sm">
            Last updated: {new Date().toLocaleTimeString()}
          </Text>
        </div>
      </Box>

      {/* Stats Cards Row */}
      <div className="stat-cards-row">
        <a href="/dashboard/resources/TaskSchema" className="stat-card stat-card-clickable">
          <div className="stat-card-title">📋 Total Tasks</div>
          <div className="stat-card-value">{stats?.tasks?.total || 0}</div>
          <div className="stat-card-subtitle">
            <span style={{ color: COLORS.green }}>✓ {stats?.tasks?.completed || 0}</span>
            {' completed • '}
            <span style={{ color: COLORS.cyan }}>✓ {stats?.tasks?.open || 0}</span>
            {' open  • '}
            <span style={{ color: COLORS.orange }}>✓ {stats?.tasks?.assigned || 0}</span>
            {' assigned • '}
            <span style={{ color: COLORS.yellow }}>✓ {stats?.tasks?.accepted || 0}</span>
            {' accepted • '}
            <span style={{ color: COLORS.red }}>✓ {stats?.tasks?.rejected || 0}</span>
            {' rejected • '}
          </div>
        </a>

        <a href="/dashboard/resources/AidRequest" className="stat-card stat-card-clickable">
          <div className="stat-card-title">🆘 Aid Requests</div>
          <div className="stat-card-value">{stats?.aidRequests?.total || 0}</div>
          <div className="stat-card-subtitle">
            <span style={{ color: COLORS.yellow }}>{stats?.aidRequests?.pending || 0}</span>
            {' pending • '}
            <span style={{ color: COLORS.green }}>{stats?.aidRequests?.completed || 0}</span>
            {' completed'}
          </div>
        </a>

        <a href="/dashboard/resources/DonationRequest" className="stat-card stat-card-clickable">
          <div className="stat-card-title">💰 Donation Requests</div>
          <div className="stat-card-value">{stats?.donationRequests?.total || 0}</div>
          <div className="stat-card-subtitle">
            Total amount: {formatCurrency(stats?.donationRequests?.totalAmount || 0)}
          </div>
        </a>

        <a href="/dashboard/resources/userProfile" className="stat-card stat-card-clickable">
          <div className="stat-card-title">👥 Volunteers</div>
          <div className="stat-card-value">{stats?.users?.volunteers || 0}</div>
          <div className="stat-card-subtitle">
            {stats?.users?.total || 0} total registered users
          </div>
        </a>
      </div>
      <Box mt="xl">
        <H5 mb="lg">Quick Actions</H5>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          
          <a href="/dashboard/resources/AidRequest" className="quick-action-card" style={{ padding: '14px 20px', flexDirection: 'row', gap: '10px' }}>
            📋 View Aid Requests
          </a>
             <a href="/dashboard/resources/DonationRequest" className="quick-action-card" style={{ padding: '14px 20px', flexDirection: 'row', gap: '10px' }}>
            💸 View Donations
          </a>
          <a href="/dashboard/resources/userProfile" className="quick-action-card" style={{ padding: '14px 20px', flexDirection: 'row', gap: '10px' }}>
            👥 Manage Users
          </a>
          <a href="/dashboard/resources/Notification/actions/new" className="quick-action-card" style={{ padding: '14px 20px', flexDirection: 'row', gap: '10px' }}>
            🔔 Send Notification
          </a>
        </div>
      </Box>

      {/* Recent Activity Cards */}
      <Box mb="xl">
        <H5 mb="lg">Recent Activity</H5>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {stats?.recentTasks?.slice(0, 4).map((task, index) => (
            <a
              key={task.id || index}
              href={`/dashboard/resources/TaskSchema/records/${task.id}/show`}
              className="quick-action-card"
            >
              <div className="card-time">
                <span>⏱</span> {formatRelativeTime(task.createdAt)}
              </div>
              <div className="card-title">{task.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`status-badge ${task.status}`}>{task.status}</span>
                <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
              </div>
              <div className="card-subtitle">
                👥 {task.volunteers}/{task.volunteersNeeded} volunteers
              </div>
            </a>
          ))}
        </div>
      </Box>

      {/* Charts Row */}
      <div className="charts-row">
        {/* Task Progress Donut */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">Task Progress</div>
          </div>
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
            {taskStatusData.length > 0 ? (
              <DonutChart data={taskStatusData} />
            ) : (
              <Text color="grey60" textAlign="center">No task data available</Text>
            )}
          </div>
        </div>

        {/* Monthly Statistics Bar Chart */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">Monthly Statistics</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: COLORS.primary }} />
                <span style={{ fontSize: '12px', color: '#64748b' }}>Tasks</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: COLORS.purple }} />
                <span style={{ fontSize: '12px', color: '#64748b' }}>Aid Requests</span>
              </div>
            </div>
          </div>
          <div style={{ padding: '20px 10px' }}>
            {stats?.monthlyStats?.length > 0 ? (
              <BarChart data={stats.monthlyStats} height={180} />
            ) : (
              <Text color="grey60" textAlign="center">No monthly data available</Text>
            )}
          </div>
        </div>
      </div>

      {/* Info Widgets Row */}
      <div className="info-widgets-row">
        {/* Relief Centers */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">🏢 Relief Centers</div>
            <a href="/dashboard/resources/ReliefCenter" style={{ color: COLORS.primary, fontSize: '14px', textDecoration: 'none' }}>
              View All →
            </a>
          </div>
          {stats?.reliefCenters?.length > 0 ? (
            stats.reliefCenters.map((center, index) => (
              <div key={center.id || index} className="relief-center-item">
                <div className="relief-center-icon">🏠</div>
                <div className="relief-center-info">
                  <div className="relief-center-name">{center.name}</div>
                  <div className="relief-center-coordinator">
                    📞 {center.coordinator}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Text color="grey60" textAlign="center" p="lg">No relief centers registered</Text>
          )}
        </div>

        {/* Relief Fund Wallet */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">💳 Relief Fund Wallet</div>
          </div>
          {stats?.wallet ? (
            <>
              <div className="wallet-balance">
                <div className="wallet-amount">{formatCurrency(stats.wallet.balance)}</div>
                <br></br>
                <div className="wallet-label">Current Balance</div>
              </div>
              <div className="wallet-stats">
                <div className="wallet-stat">
                  <div className="wallet-stat-value" style={{ color: COLORS.green }}>
                    {formatCurrency(stats.wallet.totalCredits)}
                  </div>
                  <div className="wallet-stat-label">Credits</div>
                </div>
                <div className="wallet-stat">
                  <div className="wallet-stat-value" style={{ color: COLORS.red }}>
                    {formatCurrency(stats.wallet.totalDebits)}
                  </div>
                  <div className="wallet-stat-label">Debits</div>
                </div>
                <div className="wallet-stat">
                  <div className="wallet-stat-value" style={{ color: COLORS.purple }}>
                    {stats.wallet.donorCount}
                  </div>
                  <div className="wallet-stat-label">Donors</div>
                </div>
              </div>
            </>
          ) : (
            <Text color="grey60" textAlign="center" p="lg">Wallet not initialized</Text>
          )}
        </div>

        {/* Priority Distribution */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">🎯 Active Priorities</div>
          </div>
          <div style={{ padding: '8px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS.red }} />
                <Text fontWeight="500">High Priority</Text>
              </div>
              <span style={{ fontWeight: '600', color: COLORS.red, fontSize: '18px' }}>{stats?.priorities?.high || 0}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS.yellow }} />
                <Text fontWeight="500">Medium Priority</Text>
              </div>
              <span style={{ fontWeight: '600', color: COLORS.yellow, fontSize: '18px' }}>{stats?.priorities?.medium || 0}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS.green }} />
                <Text fontWeight="500">Low Priority</Text>
              </div>
              <span style={{ fontWeight: '600', color: COLORS.green, fontSize: '18px' }}>{stats?.priorities?.low || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Section */}
      <Box mt="xl">
        <HeatmapVisualization />
      </Box>

      {/* Quick Actions */}
      
    </div>
  );
};

export default Dashboard;