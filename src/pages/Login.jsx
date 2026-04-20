import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  const { loginContext } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.redirectTo || '/';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        // Login
        const result = await loginUser(formData.email, formData.password);
        if (result.user_id) {
          setMessageType('success');
          setMessage(`Welcome, ${result.full_name}! 🎉`);
          
          // Store user info in Context
          loginContext(result);
          
          // Redirect after 1.5 seconds
          setTimeout(() => {
            navigate(fromPath);
          }, 1500);
        } else {
          setMessageType('error');
          setMessage(result.error || 'Login failed');
        }
      } else {
        // Register
        if (!formData.full_name || !formData.email || !formData.password) {
          setMessageType('error');
          setMessage('Please fill in all required fields');
          setLoading(false);
          return;
        }

        const result = await registerUser(formData);
        if (result.user_id) {
          setMessageType('success');
          setMessage(`Account created! Logging you in... 🎉`);
          
          loginContext(result);
          
          // Store user info and redirect to where we came from
          setTimeout(() => {
            navigate(fromPath);
          }, 1500);
        } else {
          setMessageType('error');
          setMessage(result.error || 'Registration failed');
        }
      }
    } catch (error) {
      setMessageType('error');
      setMessage('An error occurred. Please try again.');
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>{isLogin ? 'Sign In' : 'Create Account'}</h1>
          <p>{isLogin ? 'Access your Apple Store account' : 'Join the Apple Store community'}</p>
        </div>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="full_name">Full Name*</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="John Doe"
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main St, City, State"
                  disabled={loading}
                />
              </div>
            </>
          )}

          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              className="link-button"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage('');
                setFormData({
                  email: '',
                  password: '',
                  full_name: '',
                  phone: '',
                  address: ''
                });
              }}
            >
              {isLogin ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>

        {isLogin && (
          <div className="demo-credentials">
            <h3>🧪 Demo Credentials</h3>
            <p><strong>Email:</strong> rahul@gmail.com</p>
            <p><strong>Password:</strong> pass123</p>
            <hr style={{ margin: '12px 0', border: 'none', borderTop: '1px solid #d2d2d7' }} />
            <p><strong>Email:</strong> priya@gmail.com</p>
            <p><strong>Password:</strong> pass456</p>
          </div>
        )}
      </div>
    </div>
  );
}
