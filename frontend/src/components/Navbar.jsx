import { Link } from "react-router-dom";
import React, { useContext } from 'react';
import './Navbar.css';
import { UserContext } from '../context/UserContext';

export default function Navbar() {
    const { logout, current_user } = useContext(UserContext);

    return (
        <div>
            <nav>
                <ul>
                    {current_user ? (
                        <>
                            <li><Link to="/"><i className="fa fa-book" aria-hidden="true"></i> Home</Link></li>
                            <li><Link to="/addattendance"><i className="fa fa-book" aria-hidden="true"></i>Add Attendance</Link></li>
                            <li><Link to="/profile"><i className="fa fa-book" aria-hidden="true"></i> Profile</Link></li>
                            <li><Link to="/attendancepage"><i className="fa fa-book" aria-hidden="true"></i> Attendance</Link></li>

                            <li>
                                <Link onClick={() => logout()}>Logout</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/"><i className="fa fa-book" aria-hidden="true">Home</i></Link></li>
                            <li><Link to="/login"><i className="fa fa-book" aria-hidden="true"></i> Login</Link></li>
                            <li><Link to="/register"><i className="fa fa-book" aria-hidden="true"></i> Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}
