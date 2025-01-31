import React, { useContext } from 'react';
import { AttendanceContext } from '../context/AttendanceContext'; // Update to your actual context
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import './Attendance.css'; // Import your CSS file for styling

export default function Home() {
  // Destructure with default values to avoid TypeError
  const { attendanceRecords = [], deleteAttendance } = useContext(AttendanceContext) || {};
  const { current_user } = useContext(UserContext) || {};

  return (
    <div className="home-container">
      <h1 className="header">Your Attendance Records - {attendanceRecords.length}</h1>

      {current_user ? (
        <div>
          {attendanceRecords.length < 1 ? (
            <div className="no-records">
              You don't have any attendance records. <Link to="/addattendance">Create</Link>
            </div>
          ) : (
            <div className="attendance-grid">
              {attendanceRecords.map((record) => (
                <div key={record.id} className="attendance-card">
                  <div className="attendance-header">
                    <span onClick={() => deleteAttendance(record.id)} className="delete-button">Delete</span>
                    <p className="attendance-date">{new Date(record.date).toLocaleDateString()}</p>
                  </div>
                  <Link to={`/attendance/${record.id}`} className="attendance-title">{record.studentName}</Link>
                  <div className="attendance-footer">
                    <p className="attendance-status">{record.status}</p>
                    <p className={`remarks ${record.remarks ? "has-remarks" : "no-remarks"}`}>
                      {record.remarks || "No remarks"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="login-alert">
          <div className="alert">
            <Link to="/login" className="login-link">Login</Link> to access this page.
          </div>
        </div>
      )}
    </div>
  );
}