import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token"));
    const [current_user, setCurrentUser] = useState(null);

    console.log("Current user", current_user);

    // LOGIN FUNCTION
    const login = (email, password) => {
        toast.loading("Logging you in ... ");
        fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email, password
            })
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.access_token) {
                toast.dismiss();
                sessionStorage.setItem("token", response.access_token);
                setAuthToken(response.access_token);

                fetch('http://127.0.0.1:5000/current_user', {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${response.access_token}`
                    }
                })
                .then((response) => response.json())
                .then((response) => {
                    if (response.email) {
                        setCurrentUser(response);
                    }
                });

                toast.success("Successfully Logged in");
                navigate("/");
            } else if (response.error) {
                toast.dismiss();
                toast.error(response.error);
            } else {
                toast.dismiss();
                toast.error("Either email/password is incorrect");
            }
        });
    };
     const login_with_google = async (email) => {
    try {
      toast.loading("Logging you in ...");

      const response = await fetch("http://127.0.0.1:5000/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Failed to log in with Google");

      const data = await response.json();
      toast.dismiss(); // Remove loading toast

      if (data.access_token) {
        localStorage.setItem("token", token);
        setToken(data.access_token);
        
        console.log("Google Token: ", token)
        // Fetch user details
        const userResponse = await fetch("http://127.0.0.1:5000/current_user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();

        if (userData.email) {
          setUser(userData);
        } else {
          throw new Error("User data is incomplete.");
        }
      } else {
        throw new Error(data.error || "Invalid email provided.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.dismiss();
        toast.error(String(error?.message || "Something went wrong. Please try again."));
    }
  };

    // LOGOUT FUNCTION
    const logout = () => {
        sessionStorage.removeItem("token");
        setAuthToken(null);
        setCurrentUser(null);
    };

    // FETCH CURRENT USER
    useEffect(()=>{
        fetchCurrentUser()
    }, [])
    const fetchCurrentUser = () => 
    {
        console.log("Current user fcn ",authToken);
        
        fetch('http://127.0.0.1:5000/current_user',{
            method:"GET",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.json())
        .then((response) => {
          if(response.email){
           setCurrentUser(response)
          }
        });
    }; 

    // REGISTER (ADD USER)
    const addUser = (full_name, email, password,class_id,role) => {
        toast.loading("Registering...");

        fetch("http://127.0.0.1:5000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ full_name, email, password,class_id,role}),
        })
            .then((resp) => resp.json())
            .then((response) => {
                console.log(response);

                if (response.msg) {
                    toast.dismiss();
                    toast.success(response.msg);
                    navigate("/login");
                }
                else if(response.error){
                    toast.dismiss()
                    toast.error(response.error)
    
                }
                else{
                    toast.dismiss()
                    toast.success("User added successfully")
    
                }
              
                
            })
    };

    // UPDATE USER FUNCTION (PLACEHOLDER)
    const updateUser = () => {
        console.log("Updating user...");
    };

    // DELETE USER FUNCTION (PLACEHOLDER)
    const deleteUser = async (userId) => {
        console.log("Deleting user:", userId);
    };

    const data = {
        authToken,
        login,
        current_user,
        logout,
        addUser,
        updateUser,
        deleteUser,
    };

    return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
