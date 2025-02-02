import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"
import Attendance_report from './pages/Attendance_report';
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Attendance from './pages/AddAttendance';
import Profile from './pages/Profle';
import { UserProvider } from './context/UserContext';
import { AttendanceProvider } from './context/AttendanceContext';

function App() {
return(
<Router>

  <UserProvider>
    <AttendanceProvider>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/attendance" element={<Attendance />} />
    <Route path="/attendance_report" element={<Attendance_report />} />
    <Route path="/login" element={<Login />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/register" element={<Register />} />
    {/* Add more routes as needed */}
  </Routes>
  </AttendanceProvider>
</UserProvider>
</Router>

)

}

export default App
