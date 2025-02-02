import Layout from "../components/Layout";
import "./Register.css";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Register() {
    const { addUser } = useContext(UserContext);

    const [full_name, setFull_name] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [class_id, setClassId] = useState(""); 
    // role
    const [role, setRole] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(full_name, email, password, class_id,role); // Now correctly passing class_id
    };

    return (
        <>
            <div><Layout /></div>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <p className="form-login">Register</p>
                    <div className="input-box">
                        <input
                            required
                            value={full_name}
                            onChange={(e) => setFull_name(e.target.value)}
                            placeholder="Full Name"
                            type="text"
                        />
                    </div>
                    <div className="input-box">
                        <input
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            type="email"
                        />
                    </div>
                    <div className="input-box">
                        <input
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            type="password"
                        />
                    </div>
                    <div className="input-box">
                        <input
                            required
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="Role"
                            type="text"
                        />
                    </div>
                    <div className="input-box">
                        <input
                            required
                            value={class_id}
                            onChange={(e) => setClassId(e.target.value)}
                            placeholder="Class ID"
                            type="text"
                        />
                    </div>
                    <button className="btn" type="submit">Register</button>
                    <div className="register-link">
                        <p>Have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </>
    );
}
