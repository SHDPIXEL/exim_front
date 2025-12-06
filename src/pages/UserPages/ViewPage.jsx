import React from "react";
import { useLocation } from "react-router-dom";

const ViewPage = () => {
    const { state } = useLocation();
    const { url, location, date } = state || {};
    // console.log("details:",url,"loc:",location,"date:",date);

    // Fallback URL if none is provided
    const defaultUrl = "https://exim-india.com/Exim-Dcopy-Demo/index.html";

    // Format the date to 'DD-MMM-YYYY'
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Intl.DateTimeFormat('en-GB', options).format(dateObj).toUpperCase();
    };

    const formattedDate = date ? formatDate(date) : '';

    return (
        <div className="container border shadow-sm p-md-5 py-md-3">
            <div className="row mb-4">
                {location && date && 
                <div className="col-12 text-center">
                    <h3>{location} Edition - {formattedDate}</h3>
                </div>
                }
            </div>
            <div className="w-100" style={{ height: "100vh" }}>
                <iframe
                    width="100%"
                    height="100%"
                    src={url || defaultUrl}
                    title={`${location} Edition - ${formattedDate}`}
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default ViewPage;
