import React, { useState } from 'react';
import { Box, Button, Input, Label, Text } from '@adminjs/design-system';
import { useTranslation } from 'adminjs';

const LoginComponent = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { translateMessage } = useTranslation();

  // View states: 'login' | 'forgotPassword' | 'resetPassword'
  const [view, setView] = useState('login');
  const [resetEmail, setResetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/dashboard/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'same-origin',
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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/dashboard/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
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

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/dashboard/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, otp, newPassword }),
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
      return (
        <form onSubmit={handleForgotPassword}>
          <Box mb="xl">
            <Text style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
              Forgot Password
            </Text>
            <Text style={{ fontSize: '1rem', color: '#6b7280', marginTop: '0.5rem' }}>
              Enter your email address and we'll send you an OTP to reset your password.
            </Text>
          </Box>

          {error && (
            <Box p="default" mb="default" style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '0.375rem' }}>
              <Text style={{ color: '#dc2626', fontSize: '0.875rem' }}>⚠️ {error}</Text>
            </Box>
          )}

          {success && (
            <Box p="default" mb="default" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.375rem' }}>
              <Text style={{ color: '#16a34a', fontSize: '0.875rem' }}>✅ {success}</Text>
            </Box>
          )}

          <Box mb="lg">
            <Label htmlFor="resetEmail" required>Email Address</Label>
            <Input
              id="resetEmail"
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              disabled={loading}
              style={{ width: '100%', padding: '12px', fontSize: '16px' }}
            />
          </Box>

          <Box mb="default" style={{ marginTop: '1rem' }}>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              style={{
                width: '100%', padding: '14px', fontSize: '16px', fontWeight: '600',
                background: loading ? '#9ca3af' : '#2563eb', cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? <span>⏳ Sending OTP...</span> : 'Send OTP'}
            </Button>
          </Box>

          <Box style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Text
              as="span"
              style={{ color: '#2563eb', fontWeight: '500', cursor: 'pointer', fontSize: '0.875rem' }}
              onClick={switchToLogin}
            >
              ← Back to Sign In
            </Text>
          </Box>
        </form>
      );
    }

    if (view === 'resetPassword') {
      return (
        <form onSubmit={handleResetPassword}>
          <Box mb="xl">
            <Text style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
              Reset Password
            </Text>
            <Text style={{ fontSize: '1rem', color: '#6b7280', marginTop: '0.5rem' }}>
              Enter the OTP sent to your email and your new password.
            </Text>
          </Box>

          {error && (
            <Box p="default" mb="default" style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '0.375rem' }}>
              <Text style={{ color: '#dc2626', fontSize: '0.875rem' }}>⚠️ {error}</Text>
            </Box>
          )}

          {success && (
            <Box p="default" mb="default" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.375rem' }}>
              <Text style={{ color: '#16a34a', fontSize: '0.875rem' }}>✅ {success}</Text>
            </Box>
          )}

          <Box mb="lg">
            <Label htmlFor="otpInput" required>OTP Code</Label>
            <Input
              id="otpInput"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              required
              disabled={loading}
              maxLength={6}
              style={{ width: '100%', padding: '12px', fontSize: '16px', letterSpacing: '4px', textAlign: 'center' }}
            />
          </Box>

          <Box mb="default">
            <Label htmlFor="newPassword" required>New Password</Label>
            <Box style={{ position: 'relative' }}>
              <Input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 characters)"
                required
                disabled={loading}
                style={{ width: '100%', padding: '12px', fontSize: '16px', paddingRight: '45px' }}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280',
                }}
              >
                {showNewPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </Box>
          </Box>

          <Box mb="default" style={{ marginTop: '1rem' }}>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              style={{
                width: '100%', padding: '14px', fontSize: '16px', fontWeight: '600',
                background: loading ? '#9ca3af' : '#2563eb', cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? <span>⏳ Resetting...</span> : 'Reset Password'}
            </Button>
          </Box>

          <Box style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Text
              as="span"
              style={{ color: '#2563eb', fontWeight: '500', cursor: 'pointer', fontSize: '0.875rem' }}
              onClick={switchToLogin}
            >
              ← Back to Sign In
            </Text>
          </Box>
        </form>
      );
    }

    // Default: Login view
    return (
      <form onSubmit={handleSubmit}>
        <Box mb="xl">
          <Text style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
            Sign In
          </Text>
          <Text style={{ fontSize: '1rem', color: '#6b7280', marginTop: '0.5rem' }}>
            Enter your credentials to access the dashboard
          </Text>
        </Box>

        {error && (
          <Box p="default" mb="default" style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '0.375rem' }}>
            <Text style={{ color: '#dc2626', fontSize: '0.875rem' }}>⚠️ {error}</Text>
          </Box>
        )}

        {success && (
          <Box p="default" mb="default" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.375rem' }}>
            <Text style={{ color: '#16a34a', fontSize: '0.875rem' }}>✅ {success}</Text>
          </Box>
        )}

        <Box mb="lg">
          <Label htmlFor="email" required>Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
            disabled={loading}
            style={{ width: '100%', padding: '12px', fontSize: '16px' }}
          />
        </Box>

        <Box mb="default">
          <Label htmlFor="password" required>Password</Label>
          <Box style={{ position: 'relative' }}>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
              style={{ width: '100%', padding: '12px', fontSize: '16px', paddingRight: '45px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280',
              }}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </Box>
        </Box>

        <Box style={{ textAlign: 'right', marginBottom: '0.5rem' }}>
          <Text
            as="span"
            style={{ color: '#2563eb', fontWeight: '500', cursor: 'pointer', fontSize: '0.875rem' }}
            onClick={switchToForgotPassword}
          >
            Forgot Password?
          </Text>
        </Box>

        <Box mb="xl" style={{ marginTop: '1rem' }}>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            style={{
              width: '100%', padding: '14px', fontSize: '16px', fontWeight: '600',
              background: loading ? '#9ca3af' : '#2563eb', cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? (
              <span><span style={{ marginRight: '8px' }}>⏳</span>Signing in...</span>
            ) : (
              'Sign In'
            )}
          </Button>
        </Box>
      </form>
    );
  };

  return (
    <Box
      display="flex"
      minHeight="100vh"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Left Side - Branding */}
      <Box
        flex="1"
        display={{ _: 'none', md: 'flex' }}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p="xxl"
        style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
          color: 'white',
        }}
      >
        <Box textAlign="center" style={{ maxWidth: '500px' }}>
          <img
            src="/images/logo-white.png"
            alt="Logo"
            style={{ maxWidth: '250px', marginBottom: '2rem' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <Text style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Relief Management System
          </Text>
          <Text style={{ fontSize: '1.125rem', opacity: 0.9 }}>
            Coordinating disaster relief efforts with efficiency and compassion
          </Text>

          <Box
            display="flex"
            style={{ gap: '2rem', marginTop: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Box style={{ textAlign: 'center' }}>
              <Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>500+</Text>
              <Text style={{ fontSize: '0.875rem' }}>Aid Requests</Text>
            </Box>
            <Box style={{ textAlign: 'center' }}>
              <Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>1200+</Text>
              <Text style={{ fontSize: '0.875rem' }}>Donations</Text>
            </Box>
            <Box style={{ textAlign: 'center' }}>
              <Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>50+</Text>
              <Text style={{ fontSize: '0.875rem' }}>Relief Centers</Text>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Right Side - Form */}
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p="xxl"
        style={{ backgroundColor: '#f9fafb' }}
      >
        <Box
          bg="white"
          p="xxl"
          style={{
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            width: '450px',
            maxWidth: '100%',
          }}
        >
          {renderForm()}

          {view === 'login' && (
            <Box style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Text style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Don't have an account?{' '}
                <Text
                  as="span"
                  style={{ color: '#2563eb', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Contact Administrator
                </Text>
              </Text>
            </Box>
          )}
        </Box>

        <Box style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Text style={{ fontSize: '0.75rem', color: '#6b7280' }}>
            © 2026 Relief Management System. All rights reserved.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginComponent;