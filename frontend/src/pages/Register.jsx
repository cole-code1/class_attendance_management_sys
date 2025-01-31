import Layout from "../components/Layout";
import "./Register.css";
import { Link } from "react-router-dom";
export default function Register(){
    const {addUser} = useContext(UserContext)


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
  
    // ====> To Handle form submission
    const  handleSubmit = (e) => {
      e.preventDefault();
      if(password != repeatPassword)
      {
        alert("Password doesnt match")
      }
  
       addUser(username, email, password)
       
    };

    return(
        <>
        <div><Layout/></div>
        

<div class="wrapper">
  <form action=""onSubmit={handleSubmit}>
    <p class="form-login">Register</p>
    <div class="input-box">
      <input required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" type="text" />
    </div>
     <div class="input-box">
      <input required="" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
    </div>
    <div class="input-box">
      <input required="" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
    </div>
    <div class="remember-forgot">
      <label><input type="checkbox" />Remember Me</label>
    </div>
    <button class="btn" type="submit">Register</button>
    <div class="register-link">
      <p>Have an account? <Link to="/login">Login</Link></p>
    </div>
  </form>
</div>

        </>
     )
}