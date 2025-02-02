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
        fetch("https://class-attendance-management-sys.onrender.com/login", {
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

                fetch('https://class-attendance-management-sys.onrender.com/current_user', {
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

    // LOGOUT FUNCTION
    const logout = () => {
        sessionStorage.removeItem("token");
        setAuthToken(null);
        setCurrentUser(null);
    };

    // FETCH CURRENT USER
    const fetchCurrentUser = () => {
        if (!authToken) return; // Ensure we don't make unnecessary API calls

        console.log("Fetching current user with token:", authToken);

        fetch("https://class-attendance-management-sys.onrender.com/current_user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.email) {
                    setCurrentUser(response);
                }
            })
            .catch((error) => {
                toast.error("Failed to fetch current user data");
                console.error("Error fetching current user:", error);
            });
    };

    useEffect(() => {
        fetchCurrentUser();
    }, [authToken]); // Now runs only when authToken changes

    // REGISTER (ADD USER)
    const addUser = (full_name, email, password,class_id,role) => {
        toast.loading("Registering...");

        fetch("https://class-attendance-management-sys.onrender.com/users", {
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
