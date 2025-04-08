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
        // Fetch original ads data
        // const response = await API.post("/adds/get_adds");
        // console.log("Original Ads Data:", response.data);
        // setAds(response.data);

        // Fetch new selected ads data
        const selectedResponse = await API.post("/adds/get_selected");
        setSelectedAds(selectedResponse.data.selectedAds);
        console.log("add data", selectedResponse.data)

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
    // ReactGA.event({
    //   category: "Ads",
    //   action: "Click",
    //   label: adName,
    //   value: 1,
    // });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'ad_click',
      company_name: details.company,
      ad_id: details.id,
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
