import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create Notification Context
const NotificationContext = createContext();

// Provider Component
export const NotificationProvider = ({ children }) => {
    
    // Function to trigger notifications
    const showNotification = (message, type = "info") => {
        switch (type) {
            case "success":
                toast.success(message);
                break;
            case "error":
                toast.error(message);
                break;
            case "danger":
                toast.error(message);
                break;
            case "warning":
                toast.warn(message);
                break;
            case "info":
            default:
                toast.info(message);
                break;
        }
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

// Custom Hook to use Notification
export const useNotification = () => useContext(NotificationContext);
