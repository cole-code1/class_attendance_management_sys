import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Adjust as necessary
import Layout from '../components/Layout';
import './Login.css';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'; // Ensure this is installed
import { toast } from 'react-toastify'; // Ensure this is installed
import 'react-toastify/dist/ReactToastify.css'; // Optional styling

export default function Login() {
  const { login, login_with_google } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      toast.success('Login successful!');
      // Navigate as needed, e.g., based on user type
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };

const handleGoogleLogin = async (response) => {
  try {
    const credential = response?.credential;
    if (!credential) {
      toast.error('Invalid Google response. Please try again.');
      return;
    }

    const userDetails = jwtDecode(credential);
    await login_with_google(userDetails.email);
    toast.success('Google login successful!');

    // Navigate directly to dashboard
    navigate('/dashboard');
  } catch (err) {
    console.error('Google login error:', err);
    toast.error('Failed to login with Google. Please try again.');
  }
};


  return (
    <div>
      <Layout />
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <p className="form-login">Login</p>
          {error && <p className="error-message">{error}</p>}
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <Link to="Forgot-password">Forgot Password?</Link>
          </div>
          <button className="btn" type="submit">
            Login
          </button>
          <div className="register-link">
            <p>
              Don’t have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => toast.error('Google login failed')}
          />
        </form>
      </div>
    </div>
  );
}
