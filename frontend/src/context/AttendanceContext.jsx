import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext"; 
import { useNavigate } from "react-router-dom";

export const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
    const navigate = useNavigate();
    const { authToken, current_user } = useContext(UserContext);
    const [Class, setClass] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [onChange, setOnChange] = useState(false);

    // ================================ Fetch Classes ================================
    useEffect(() => {
        fetch("https://class-attendance-management-sys.onrender.com/class", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((response) => {
            setClass(response);
        });
    }, []);

    // ================================ Fetch Attendance ================================
    useEffect(() => {
        if (!authToken) return; // Avoid fetching if not logged in
        fetch("https://class-attendance-management-sys.onrender.com/attendance", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((response) => response.json())
        .then((response) => {
            setAttendance(response);
        });
    }, [onChange, authToken]);

    // ================================ Add Attendance ================================
    const addAttendance = (student,class_ref, date, status, remarks) => {
        if (!current_user) {
            toast.error("User not logged in!");
            return;
        }

               toast.loading("Adding attendance ...");
        fetch("https://class-attendance-management-sys.onrender.com/attendance", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ student, class_ref, date, status, remarks }),
        })
        .then((resp)=>resp.json())
        .then((response)=>{
            console.log(response);
            
            if(response.success){
                toast.dismiss()
                toast.success(response.success)
                setOnChange(!onChange)
            }
            else if(response.error){
                toast.dismiss()
                toast.error(response.error)

            }
            else{
                toast.dismiss()
                toast.success("Attendance added successfully.")

            }
        });
    };

    // ================================ Delete Attendance ================================
    const deleteAttendance = (id) => {
        toast.loading("Deleting Attendance ...");
        fetch(`https://class-attendance-management-sys.onrender.com/attendance/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((resp) => resp.json())
        .then((response) => {
            toast.dismiss();
            if (response.success) {
                toast.success(response.success);
                setOnChange(!onChange);
                navigate("/");
            } else {
                toast.error(response.error || "Failed to delete attendance");
            }
        });
    };

    return (
        <AttendanceContext.Provider value={{ Class, attendance, addAttendance, deleteAttendance }}>
            {children}
        </AttendanceContext.Provider>
    );
};
