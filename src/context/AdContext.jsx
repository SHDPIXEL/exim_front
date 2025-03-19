import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../api"; // Adjust the import based on your API setup

const AdContext = createContext();

export function AdProvider({ children }) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await API.post("/adds/get_adds");
        console.log("adds data", response.data)
        setAds(response.data);
      } catch (err) {
        console.error("Error fetching advertisements:", err);
        setError("Failed to load advertisements.");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  return (
    <AdContext.Provider value={{ ads, loading, error }}>
      {children}
    </AdContext.Provider>
  );
}

export const useAds = () => useContext(AdContext);
