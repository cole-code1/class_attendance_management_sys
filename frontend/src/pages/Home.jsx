import Layout from "../components/Layout";
import './Home.css';
import { Link } from "react-router-dom";
export default function Home(){
    return(
        <>

        <div><Layout/></div>

        <section id="hero" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Class Attendance Management System</h1>
          <p className="hero-description">
            Streamline your classroom attendance tracking with our intelligent management system. Save time, increase accuracy, and focus on what matters most - teaching.
          </p>
          <div className="hero-buttons">
           <Link to="/register"><button className="hero-button">Get Started</button></Link> 
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="features-content">
          <h2 className="features-title">Powerful Features</h2>
          <p className="features-description">Everything you need to manage attendance efficiently</p>
          <div className="features-list">
            {/* Add feature items here */}
            <div className="feature-item">
              <h3>Quick Registration</h3>
              <p>Register students and create classes in minutes with our intuitive interface.</p>
            </div>
            <div className="feature-item">
              <h3>Real-time Tracking</h3>
              <p>Monitor attendance in real-time with automatic updates and notifications.</p>
            </div>
            <div className="feature-item">
              <h3>Analytics Dashboard</h3>
              <p>Comprehensive reports and insights about attendance patterns and trends.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <h3 className="footer-title">AttendanceTracker</h3>
          <p className="footer-description">Streamlining attendance management for educational institutions worldwide.</p>
          <form className="footer-form">
            <input type="email" placeholder="Enter your email" className="footer-input" required />
            <button type="submit" className="footer-button">Subscribe</button>
          </form>
        </div>
      </footer>
        </>
    )
}