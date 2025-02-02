import React, { useContext, useState } from "react";
import { AttendanceContext } from "../context/AttendanceContext";
import { UserContext } from "../context/UserContext";
import "./Attendance.css";
import Layout from "../components/Layout";

export default function AddAttendance() {
    const { addAttendance, Class } = useContext(AttendanceContext);
    const { current_user } = useContext(UserContext);

    const[student, setStudent] = useState("")
    const [date, setDate] = useState("");
    const [class_ref, setClass] = useState("");
    const [status, setStatus] = useState("Present");
    const [remarks, setRemarks] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!class_ref) {
            alert("Please select a class.");
            return;
        }

        if (!current_user) {
            alert("User not logged in!");
            return;
        }

        addAttendance(student,class_ref, date, status, remarks);

        // Clear input fields
        setDate("");
        setStudent("");
        setClass("");
        setStatus("Present");
        setRemarks("");
    };

    return (
        <>
            <Layout />
            <div className="container">
                <h2 className="title">Add Attendance</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
    <label htmlFor="name">Name</label>
    <input
        id="name"
        type="text"
        value={student} // Ensure `student` state exists
        onChange={(e) => setStudent(e.target.value)}
        required
    />
</div>


                    <div className="form-group">
                        <label htmlFor="class">Class</label>
                        <select id="class" value={class_ref} onChange={(e) => setClass(e.target.value)} required>
                            <option value="">Select a Class</option>
                            {Class.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="remarks">Remarks (Optional)</label>
                        <textarea
                            id="remarks"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            rows="3"
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-button">
                        Add Attendance
                    </button>
                </form>
            </div>
        </>
    );
}
