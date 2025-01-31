import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
    const navigate = useNavigate();
    const { authToken } = useContext(UserContext);

    const [classList, setClassList] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [onChange, setOnChange] = useState(true);

    // ================================ Class =====================================
   useEffect(()=>{
        fetch('http://127.0.0.1:5000/class',{
                method:"GET",
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((response) => {
            setTags(response)
            });
   }, [])

    // Fetch Class
    useEffect(()=>{
        fetch('http://127.0.0.1:5000/class/'+class_id,{
                method:"GET",
                headers: {
                    'Content-type': 'application/json',
                      Authorization: `Bearer ${authToken}`
                }
            })
           .then((response) => response.json())
           .then((response) => {
                setClassList(response)
            });
   }, [classList.id])

    // Add the class

    const addClass = (name, teacher, subject) =>
        {
            toast.loading("Adding class ... ")
            fetch("http://127.0.0.1:5000/class/add",{
                method:"POST",
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    name, teacher, subject
                })
            })
           .then((resp)=>resp.json())
           .then((response)=>{
                console.log(response);
                
                if(response.msg){
                    toast.dismiss()
                    toast.success(response.msg)
                    setClassList([])
                }
                else if(response.error){
                    toast.dismiss()
                    toast.error(response.error)

                }
                else{
                    toast.dismiss()
                    toast.error("Failed to add class")

                }
           })
        }

    // Delete Class
    const deleteClass = (id) =>
    {
        toast.loading("Deleting class ... ")
        fetch(`http://127.0.0.1:5000/class/delete/${id}`,{
                method:"DELETE",
                headers: {
                    'Content-type': 'application/json',
                      Authorization: `Bearer ${authToken}`
                }
            })
           .then((response) => response.json())
           .then((response) => {
                console.log(response);
                
                if(response.msg){
                    toast.dismiss()
                    toast.success(response.msg)
                    setClassList([])
                }
                else if(response.error){
                    toast.dismiss()
                    toast.error(response.error)

                }
                else{
                    toast.dismiss()
                    toast.error("Failed to delete class")

                }
           })
    }


    // Update Class
    const updateClass = (id, name, teacher, subject) =>

        toast.loading("Updating class ... ")

   


    // ================================ Attendance ====================================

    // Fetch Attendance
    useEffect(()=>{
        fetch('http://127.0.0.1:5000/todos',{
                method:"GET",
                headers: {
                    'Content-type': 'application/json',
                      Authorization: `Bearer ${authToken}`
                }
            })
            .then((response) => response.json())
            .then((response) => {
                setAttendance(response)
            });
   }, [onChange])


    // Add Attendance
    const addAttendance = ( student, class_ref, date, remarks ) => 
    {
       
                toast.loading("Adding attendance ... ")
                fetch("http://127.0.0.1:5000/todo/add",{
                    method:"POST",
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${authToken}`

                      },
                    body: JSON.stringify({
                        student, class_ref, date, remarks
                    })
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
                        toast.error("Failed to add")
        
                    }
                  
                    
                })
    }



    const updateAttendance = () => 
    {
        console.log("Updating todo");
    }

    const deleteAttendance = (id) => 
    {
        toast.loading("Deleting attendance ... ")
        fetch(`http://127.0.0.1:5000/todo/${id}`,{
            method:"DELETE",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`

              }
        })
        .then((resp)=>resp.json())
        .then((response)=>{
            
            if(response.success){
                toast.dismiss()
                toast.success(response.success)
                setOnChange(!onChange)
                navigate("/")

            }
            else if(response.error){
                toast.dismiss()
                toast.error(response.error)

            }
            else{
                toast.dismiss()
                toast.error("Failed to delete")

            }
          
            
        })
    }



    
  const data = {
    attendance,
    classList,

    addAttendance,
    deleteClass,
    addClass,
    updateClass,
    updateAttendance,
    deleteAttendance,
  }

  return (
  <AttendanceContext.Provider value={data}>
      {children}
  </AttendanceContext.Provider>)
}
