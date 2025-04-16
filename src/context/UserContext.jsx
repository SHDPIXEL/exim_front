import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";  // Import useAuth from AuthContext
import API from "../api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { user: authUser } = useAuth(); // Access the authUser from AuthContext
    const [user, setUser] = useState(null);
    const [userSubscription, setUserSubscription] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await API.get("/app_users/getUserDetails", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data.user);
            setUserSubscription(response.data.subscription_locations || []);
        } catch (error) {
            console.error("Failed to fetch user details:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Wait for the authUser to be set (i.e., authentication completed)
        if (authUser) {
            fetchUser();
        } else {
            setLoading(false); // If no authUser, consider it as loading completed
        }
    }, [authUser]);

    return (
        <UserContext.Provider value={{ user, userSubscription, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);