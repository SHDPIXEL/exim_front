import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lastUpdatedTime, setLastUpdatedTime] = useState("");

  const fetchLastUpdatedTime = async () => {
    try {
      const response = await API.get('/logs/admin/last-activity');
      setLastUpdatedTime(response.data);
    } catch (err) {
      console.error("Error fetching time:", err);
    }
  };

  useEffect(() => {
    fetchLastUpdatedTime();
  }, []);

  return (
    <AppContext.Provider value={{ lastUpdatedTime }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
