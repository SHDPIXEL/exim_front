import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userSubscription, setUserSubscription] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                setUserSubscription(response.data.subscription_locations);
                // console.log("User data",response.data)
            } catch (error) {
                console.error("Failed to fetch user details", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, userSubscription, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);