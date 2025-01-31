import Layout from "../components/Layout";
import './Profile.css';

export default function Profile(){
   const { current_user } = useContext(UserContext);

         if (!current_user) {
           return <p>Not authorized</p>;
         }
     
        
         return (   <>
        <Layout/>
  <div className="profile-container">
             <h2 className="profile-title">Profile</h2>
       
             <div className="profile-section">
               <h3 className="profile-label">Username</h3>
               <p className="profile-value">{current_user.username}</p>
             </div>
       
             <div className="profile-section">
               <h3 className="profile-label">Email</h3>
               <p className="profile-value">{current_user.email}</p>
             </div>
       
             <div className="profile-section">
               <h3 className="profile-label">Approval Status</h3>
               <p
                 className={
                   current_user.is_approved ? 'status-approved' : 'status-pending'
                 }
               >
                 {current_user.is_approved ? 'Approved' : 'Pending Approval'}
               </p>
             </div>
       
             <div className="profile-section">
               <h3 className="profile-label">Admin Status</h3>
               <p className={current_user.is_admin ? 'status-admin' : 'status-user'}>
                 {current_user.is_admin ? 'Admin' : 'User'}
               </p>
             </div>
       
             <div className="profile-section" style={{ justifyContent: 'flex-end' }}>
               <button className="update-button">Update Profile</button>
             </div>
           </div>
        </>
         
     )
}