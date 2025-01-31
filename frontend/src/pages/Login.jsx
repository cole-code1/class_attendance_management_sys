import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Adjust the import path as necessary
import Layout from '../components/Layout'; // Ensure you have the correct import for Layout
import './Login.css'; // Import your CSS file for styling

export default function Login() {
  const { login } = useContext(UserContext);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state before login attempt
    try {
      await login(email, password); // Assuming login returns a promise
    } catch (err) {
      setError("Login failed. Please check your credentials."); // Set error message
    }
  };

  return (
    <>
      <Layout />
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <p className="form-login">Login</p>
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
          <div className="input-box">
            <input
              required
              placeholder="Email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
            />
          </div>
          <div className="input-box">
            <input
              required
              placeholder="Password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <Link to="#">Forgot Password</Link>
          </div>
          <button className="btn" type="submit">
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}