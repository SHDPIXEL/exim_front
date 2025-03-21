import React from "react";
import { useLocation } from "react-router-dom";

const ViewPage = () => {
    const { state } = useLocation();
    const { url, location, date } = state || {};

    // Fallback URL if none is provided
    const defaultUrl = "http://eximin.net/demo/index.html";

    return (
        <div className="container border shadow-sm p-md-5 py-md-3">
            <div className="row mb-4">
                <div className="col-12 text-center">
                    <h3>{location} Edition - {date}</h3>
                </div>
            </div>
            <div className="w-100" style={{ height: "100vh" }}>
                <iframe
                    width="100%"
                    height="100%"
                    src={url}
                    title={`${location} Edition - ${date}`}
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default ViewPage;