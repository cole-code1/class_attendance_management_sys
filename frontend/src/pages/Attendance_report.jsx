import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AttendanceContext } from "../context/AttendanceContext";

export default function SingleAttendance() {
  const { id } = useParams();
  const { attendance, deleteAttendance } = useContext(AttendanceContext);

  const singleAttendance = attendance && attendance.find((att) => att.id == id);

  return (
    <>
    <><Layout/></>
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      {!singleAttendance ? (
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
      )}
    </div>
    </>
  );
}
