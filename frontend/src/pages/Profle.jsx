import Layout from "../components/Layout";
import './Profile.css';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Profile() {
    const { current_user } = useContext(UserContext);

    return (
        <>
            <Layout />
            {!current_user ? (
                <div className="not-authorized">Not authorized</div>
            ) : (
                <div className="profile-container">
                    <h2 className="profile-title">Profile</h2>

                    <div className="profile-section">
                        <h3 className="profile-label">Full Name</h3>
                        <p className="profile-value">{current_user.full_name}</p>
                    </div>

                    <div className="profile-section">
                        <h3 className="profile-label">Email</h3>
                        <p className="profile-value">{current_user.email}</p>
                    </div>

                    <div className="profile-section">
                        <h3 className="profile-label">Approval Status</h3>
                        <p className={current_user.is_approved ? 'status-approved' : 'status-pending'}>
                            {current_user.is_approved ? 'Approved' : 'Pending Approval'}
                        </p>
                    </div>

                    <div className="profile-section">
                        <h3 className="profile-label">Role</h3>
                        <p className={current_user.is_admin ? "status-teacher" : "status-student"}>
                            {current_user.is_admin ? "Teacher" : "Student"}
                        </p>
                    </div>

                    <div className="profile-section" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="update-button">Update Profile</button>
                    </div>
                </div>
            )}
        </>
    );
}