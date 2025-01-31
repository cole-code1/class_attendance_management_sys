import { Link } from "react-router-dom"
import './Navbar.css';
export default function Navbar(){
    return(
        <div>
            
            <nav>
                
        <ul>
            <li><Link to="/"> <i className="fa fa-book" aria-hidden="true"></i> {/* Book icon */}Home</Link></li>
            <li><Link to="/attendance"><i className="fa fa-book" aria-hidden="true"></i>Attendance</Link></li>
            <li><Link to="/profile"><i className="fa fa-book" aria-hidden="true"></i>Profile</Link></li>
            <li><Link to="/login"><i className="fa fa-book" aria-hidden="true"></i>Login</Link></li>  {/* Add this line */}  {/* Replace "/login" with your route path */}  {/* Add this line */}  {/* Replace "/register" with your route path */}  {/* Add this line */}  {/* Replace "/register" with your route path */}  {/* Add this line */}  {/* Replace "/register" with your route path */}  {/* Add this line */}  {/* Replace "/register" with your route path */}
            <li><Link to="/register"><i className="fa fa-book" aria-hidden="true"></i>Register</Link></li>
        </ul>
    </nav>
    </div>
        
    )
}