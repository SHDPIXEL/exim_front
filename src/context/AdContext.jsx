import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../api"; // Adjust the import based on your API setup
import ReactGA from "react-ga4";

const AdContext = createContext();

export function AdProvider({ children }) {
  // const [ads, setAds] = useState([]);
  const [selectedAds, setSelectedAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
 
        // Fetch new selected ads data
        const selectedResponse = await API.post("/adds/get_selected");
        setSelectedAds(selectedResponse.data.selectedAds);
       
      } catch (err) {
        console.error("Error fetching advertisements:", err);
        setError("Failed to load advertisements.");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const handleAdClick = (details, link) => {

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'ad_click',
      company_name: details.company || "untitled",
      ad_id: details.id|| "untitled",
      ad_position : details.position || "untitled",
      debug_mode : true,
    });

    // Open ad link in new tab
    window.open(link, "_blank");
  };

  return (
    <AdContext.Provider value={{ selectedAds, loading, error, handleAdClick }}>
      {children}
    </AdContext.Provider>
  );
}

// Custom hook for using ads
export const useAds = () => useContext(AdContext);
