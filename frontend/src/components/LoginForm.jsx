import React, { useState } from 'react';
import useBotDetection from '../hooks/useBotDetection';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');
  const [requiresCaptcha, setRequiresCaptcha] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');

  const { getBehaviorMeta, isReady } = useBotDetection();
  
  // Use environment variable or fallback to localhost for development
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
      
      setTimeout(() => {
        console.log('Logged in:', response.data.user);
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
