import React, { useState } from 'react';
import useBotDetection from '../hooks/useBotDetection';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [requiresCaptcha, setRequiresCaptcha] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const { getBehaviorMeta, isReady } = useBotDetection();
  
  // API will be on same domain when deployed to Vercel
  const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email || !password || (isRegisterMode && !name)) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const behaviorMeta = getBehaviorMeta();
      const endpoint = isRegisterMode ? '/api/auth/register' : '/api/auth/login';
      
      const payload = {
        email,
        password,
        _behaviorMeta: behaviorMeta
      };

      if (isRegisterMode) {
        payload.name = name;
      }
      
      const response = await axios.post(`${API_URL}${endpoint}`, payload);

      localStorage.setItem('token', response.data.token);
      setSuccess(isRegisterMode ? 'Account created successfully!' : 'Login successful!');
      setUserData(response.data.user);
      
      setTimeout(() => {
        setIsLoggedIn(true);
      }, 1500);

    } catch (err) {
      if (err.response?.status === 429) {
        if (err.response.data.requiresCaptcha) {
          setRequiresCaptcha(true);
          setError('Please complete the verification below');
        } else {
          setError(err.response.data.error || 'Too many attempts. Please try later.');
        }
      } else if (err.response?.status === 403) {
        setError('Access blocked. Contact support if needed.');
      } else if (err.response?.status === 400) {
        setError(err.response.data.error || 'Invalid input. Check your data.');
      } else {
        setError(err.response?.data?.error || 'Request failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setError('');
    setSuccess('');
    setRequiresCaptcha(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserData(null);
    setEmail('');
    setPassword('');
    setName('');
    setSuccess('');
    setError('');
  };

  // Success page after login
  if (isLoggedIn && userData) {
    return (
      <div className="login-form success-page">
        <div className="success-content">
          <div className="success-icon">🎉</div>
          <h2>Welcome{userData.name ? `, ${userData.name}` : ''}!</h2>
          <p className="success-subtitle">You're successfully logged in</p>
          
          <div className="user-info-card">
            <div className="info-row">
              <span className="info-label">Name:</span>
              <span className="info-value">{userData.name || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{userData.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Account ID:</span>
              <span className="info-value">{userData.id}</span>
            </div>
          </div>

          <div className="success-actions">
            <button className="btn-primary" onClick={() => alert('Dashboard coming soon!')}>
              Go to Dashboard
            </button>
            <button className="btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-form">
      <div className="form-header">
        <h2>{isRegisterMode ? 'Create Account' : 'Welcome Back'}</h2>
        <p className="form-subtitle">
          {isRegisterMode ? 'Sign up to get started' : 'Login to your account'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {isRegisterMode && (
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              disabled={loading}
              className={name ? 'has-value' : ''}
            />
          </div>
        )}

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}
            className={email ? 'has-value' : ''}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={loading}
            className={password ? 'has-value' : ''}
          />
          {isRegisterMode && (
            <small className="input-hint">At least 6 characters</small>
          )}
        </div>

        {requiresCaptcha && (
          <div className="captcha-container">
            <p style={{ color: '#856404', fontSize: '14px', textAlign: 'center' }}>
              ⚠️ Verification required - integrate your captcha here
            </p>
          </div>
        )}

        {error && (
          <div className="message error-message">
            <span className="message-icon">❌</span>
            {error}
          </div>
        )}

        {success && (
          <div className="message success-message">
            <span className="message-icon">✅</span>
            {success}
          </div>
        )}

        {!isReady && !loading && (
          <div className="behavior-indicator">
            <div className="spinner"></div>
            <span>Initializing security check...</span>
          </div>
        )}

        <button type="submit" disabled={loading || !isReady}>
          {loading ? (
            <>
              <span className="btn-spinner"></span>
              {isRegisterMode ? 'Creating Account...' : 'Logging in...'}
            </>
          ) : (
            isRegisterMode ? 'Sign Up' : 'Login'
          )}
        </button>
      </form>

      <div className="form-footer">
        <p>
          {isRegisterMode ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button type="button" className="link-button" onClick={toggleMode}>
            {isRegisterMode ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
