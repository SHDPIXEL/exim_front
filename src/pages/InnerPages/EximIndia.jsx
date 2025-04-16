import React, { useEffect, useState } from "react";
import ads4 from "../../assets/images/ads4.png";
import ads5 from "../../assets/images/ads5.png";
import BottomAds from "../../components/BottomAds";
import API from "../../api";

const EximIndia = () => {

    const [aboutDescription, setAboutDescription] = useState(`
                        <p>
                            EXIM INDIA is a reputed and all-India recognised premier publishing house. It publishes a daily newspaper "Exim Newsletter" from Mumbai &amp; Western India, Gujarat, New Delhi &amp; North India and Exim India - 'Shipping Times' from Kolkata, Chennai, Cochin and Tuticorin for the last 47 years.</p>
                        <p>
                            Through these daily editions, a wide coverage is given to all important news, views and reviews related to shipping, ports, maritime trade, imports and exports in India and abroad. The combined circulation/readership of all editions is over 2, 00, 000 copies daily.</p>
                        <p>
                            The special feature of all these daily editions of EXIM is that it is mainly dedicated in publishing up-to-date shipping schedules of all major ports in India along with the news on exports and imports.</p>

                        <div>
                            &nbsp;</div>
                        <div>
                            <div>
                                <strong>The regular features in our publications include:</strong></div>
                            <ul style={{ lineHeight: "2" }}>
                                <li>
                                    News, views and analysis related to shipping, ports, ICD’s, CFC and other maritime trade, etc.</li>
                                <li>
                                    Forward Sailing Schedules of all Major ports in India</li>
                                <li>
                                    Indian Products for World Market</li>
                                <li>
                                    Overseas Trade Enquiries</li>
                                <li>
                                    Foreign Exchange Rates</li>
                                <li>
                                    Customs Exchange Rates for Import &amp; Export</li>
                                <li>
                                    Customs, JCCIE &amp; EPC notices, trade notification and Public notices (Notice to consignee)</li>
                            </ul>
                        </div>
                        <p>
                            &nbsp;</p>`)
    
    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await API.get("/about/get_about");
                setAboutDescription(response.data?.description || "No data available.");
            } catch (error) {
                console.error("Error fetching about data:", error.response?.data || error.message);
            } 
        };

        fetchAboutData();
    }, []);

    return (

        <div className="container  p-md-5 py-md-3">
            <div className="row mt-4">
                <div className="col-md-12 mt-4  text-center">
                    <h2 className='text-center  fw-bold'>About Exim India </h2>

                </div>
            </div>
            <div className="row my-3">
                <div className="col-md-12 ">
                    <div className="card p-md-5 p-3 border shadow-sm" >
                        <div dangerouslySetInnerHTML={{ __html: aboutDescription }} />
                    </div>
                </div>

            </div>

            <div className="col-md-12  text-white p-3 rounded-2 mb-4" style={{ background: "#102694" }} ><div className="row"><div className="col-md-12"><p>
                &nbsp;</p>
                <div>
                    <span >Besides, EXIM INDIA also brings out regular Special Issues on all Major Ports in India.</span></div>
                <div>
                    &nbsp;</div>
                <div>
                    <span >The other publications of EXIM INDIA include Port Directory, and exclusive 'World Route Maps' and 'Pocket Atlas' for the use of Importers-Exporters, Shipping lines, Freight forwarders and other Logistics sector players. Besides, EXIM INDIA also brings out regular Special Issues on all Major Ports in India!</span></div>
                <p>
                    &nbsp;</p>
            </div></div></div>
            <div className="borderbg"></div>
            {/* <div className="row mb-4">
                    <div className="col-md-6 mt-4 mb-2">
                        <img src={ads4} alt="adsv" className="w-100" />
                    </div>
                    <div className="col-md-6 my-4 mb-2">
                        <img src={ads5} alt="adsv" className="w-100" />
                    </div>
                </div> */}

            <BottomAds leftPosition={"EximIndia_Bottom_Left"} rightPosition={"EximIndia_Bottom_Right"} />
        </div>)
}

export default EximIndia;