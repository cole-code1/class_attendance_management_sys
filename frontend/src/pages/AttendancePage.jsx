import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AttendanceContext } from "../context/AttendanceContext";
import Layout from "../components/Layout";

export default function AttendancePage() {
  const { id } = useParams();
  const { attendance, deleteAttendance } = useContext(AttendanceContext);

  const singleAttendance = attendance && attendance.find((att) => att.id == id);

  return (
    <>
      <Layout />
      <div style={{ padding: "20px" }}>
        {/* Check if id is provided, indicating single attendance view */}
        {id ? (
          // Single attendance view
          !singleAttendance ? (
            <p style={{ color: "red", fontWeight: "bold" }}>Attendance record not found</p>
          ) : (
            <div style={{ border: "2px solid #0044cc", padding: "15px", borderRadius: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <button
                  onClick={() => deleteAttendance(singleAttendance.id)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  Delete
                </button>
                <p style={{ fontSize: "12px", color: "#555" }}>{singleAttendance.date}</p>
              </div>

              <h1 style={{ fontWeight: "bold", fontSize: "20px" }}>{singleAttendance.student}</h1>
              <p>{singleAttendance.remarks ? singleAttendance.remarks : "No remarks"}</p>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <p style={{ padding: "5px", backgroundColor: "#0044cc", color: "white", borderRadius: "5px" }}>
                  {singleAttendance.class_ref}
                </p>
                <p
                  style={{
                    padding: "5px",
                    color: "white",
                    borderRadius: "5px",
                    backgroundColor: singleAttendance.status === "Completed" ? "green" : "orange",
                  }}
                >
                  {singleAttendance.status}
                </p>
              </div>
            </div>
          )
        ) : (
          // Attendance report view
          <div style={{ padding: "20px" }}>
            <h1 style={{ color:"black", marginBottom: "15px", fontWeight: "bold", fontSize: "45px" }}>
              Your Attendance - {attendance && attendance.length}
            </h1>

            {/* Check if attendance exists */}
            {attendance && attendance.length < 1 ? (
              <div style={{color:"white"}}>
                You don't have any attendance records.{" "}
                <Link to="/addattendance" style={{ color: "#007bff", fontWeight:"bolder"}}>
                  Create
                </Link>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
                {/* Display attendance records */}
                {attendance &&
                  attendance.map((att) => (
                    <div
                      key={att.id}
                      style={{
                        border: "2px solid #0044cc",
                        padding: "15px",
                        borderRadius: "10px",
                        display: "flex",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "10px",
                          }}
                        >
                          {/* Delete button */}
                          <button
                            onClick={() => deleteAttendance(att.id)}
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              padding: "5px 10px",
                              border: "none",
                              cursor: "pointer",
                              borderRadius: "5px",
                            }}
                          >
                            Delete
                          </button>
                          <p style={{ fontSize: "12px", color: "#555" }}>{att.date}</p>
                        </div>

                        {/* Link to individual attendance details */}
                        <Link
                          to={`/attendance/${att.id}`}
                          style={{ fontWeight: "bold", fontSize: "20px", color: "#0044cc", textDecoration: "none" }}
                        >
                          {att.student}
                        </Link>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "10px",
                          }}
                        >
                          {/* Class reference */}
                          <p
                            style={{
                              padding: "5px",
                              backgroundColor: "#0044cc",
                              color: "white",
                              borderRadius: "5px",
                            }}
                          >
                            {att.class_ref}
                          </p>

                          {/* Status indicator */}
                          <p
                            style={{
                              padding: "5px",
                              color: "white",
                              borderRadius: "5px",
                              backgroundColor: att.status === "Completed" ? "green" : "orange",
                            }}
                          >
                            {att.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
