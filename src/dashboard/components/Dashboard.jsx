import React, { useEffect, useState } from 'react';
import { Box, H2, H5, Text, Illustration } from '@adminjs/design-system';
import { ApiClient, useCurrentAdmin } from 'adminjs';

const Dashboard = () => {
  const [currentAdmin] = useCurrentAdmin();
  const [stats, setStats] = useState({
    aidRequests: 0,
    donations: 0,
    tasks: 0,
    users: 0,
  });

  useEffect(() => {
    // Fetch statistics from your API
    const fetchStats = async () => {
      try {
        const api = new ApiClient();
        // You can make API calls here to get real stats
        // For now, using placeholder data
        setStats({
          aidRequests: 45,
          donations: 128,
          tasks: 23,
          users: 350,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box>
      <Box mb="xxl">
        <H2>Welcome to Relief Management System</H2>
        <Text mt="default">
          Hello {currentAdmin?.email || 'Admin'}! Here's your dashboard overview.
        </Text>
      </Box>

      {/* Statistics Cards */}
      <Box display="flex" flexWrap="wrap" gap="default">
        <Box
          flex="1"
          minWidth="200px"
          bg="primary100"
          p="xl"
          borderRadius="default"
          boxShadow="card"
        >
          <H5 mb="default">Aid Requests</H5>
          <Text fontSize="xxl" fontWeight="bold">
            {stats.aidRequests}
          </Text>
          <Text mt="sm" color="grey60">
            Active requests
          </Text>
        </Box>

        <Box
          flex="1"
          minWidth="200px"
          bg="success"
          p="xl"
          borderRadius="default"
          boxShadow="card"
        >
          <H5 mb="default" color="white">
            Donations
          </H5>
          <Text fontSize="xxl" fontWeight="bold" color="white">
            {stats.donations}
          </Text>
          <Text mt="sm" color="white">
            Total donations received
          </Text>
        </Box>

        <Box
          flex="1"
          minWidth="200px"
          bg="info"
          p="xl"
          borderRadius="default"
          boxShadow="card"
        >
          <H5 mb="default" color="white">
            Active Tasks
          </H5>
          <Text fontSize="xxl" fontWeight="bold" color="white">
            {stats.tasks}
          </Text>
          <Text mt="sm" color="white">
            Pending tasks
          </Text>
        </Box>

        <Box
          flex="1"
          minWidth="200px"
          bg="accent"
          p="xl"
          borderRadius="default"
          boxShadow="card"
        >
          <H5 mb="default" color="white">
            Users
          </H5>
          <Text fontSize="xxl" fontWeight="bold" color="white">
            {stats.users}
          </Text>
          <Text mt="sm" color="white">
            Registered users
          </Text>
        </Box>
      </Box>

      {/* Quick Actions */}
      <Box mt="xxl">
        <H5 mb="default">Quick Actions</H5>
        <Box display="flex" gap="default" flexWrap="wrap">
          <Box
            as="a"
            href="/dashboard/resources/AidRequest"
            bg="white"
            p="lg"
            borderRadius="default"
            border="default"
            style={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            <Text fontWeight="bold" color="primary100">
              📋 View Aid Requests
            </Text>
          </Box>
          <Box
            as="a"
            href="/dashboard/resources/Donation"
            bg="white"
            p="lg"
            borderRadius="default"
            border="default"
            style={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            <Text fontWeight="bold" color="primary100">
              💰 Manage Donations
            </Text>
          </Box>
          <Box
            as="a"
            href="/dashboard/resources/TaskSchema"
            bg="white"
            p="lg"
            borderRadius="default"
            border="default"
            style={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            <Text fontWeight="bold" color="primary100">
              ✅ View Tasks
            </Text>
          </Box>
          <Box
            as="a"
            href="/dashboard/resources/ReliefCenter"
            bg="white"
            p="lg"
            borderRadius="default"
            border="default"
            style={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            <Text fontWeight="bold" color="primary100">
              🏢 Relief Centers
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Recent Activity */}
      <Box mt="xxl">
        <H5 mb="default">System Status</H5>
        <Box bg="white" p="lg" borderRadius="default" border="default">
          <Text>✅ All systems operational</Text>
          <Text mt="sm" color="grey60">
            Last updated: {new Date().toLocaleString()}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;