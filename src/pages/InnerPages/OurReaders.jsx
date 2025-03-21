import React from "react";
import ads4 from "../../assets/images/ads4.png";
import ads5 from "../../assets/images/ads5.png";
import conta from "../../assets/images/conta.jpg";
import piechart from "../../assets/images/piechart.jpg";
import BottomAds from "../../components/BottomAds";


const OurReaders = () => {

    return (

        <div className="container  p-md-5 py-md-3">
            <div className="row mt-4">
                <div className="col-md-12 mt-4 mb-4  text-center">
                    <h2 className='text-center  fw-bold'>Our Readers </h2>

                </div>
            </div>

            <div className="card p-md-5 p-3 mb-5 rounded-2 shadow-sm">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row justify-content-center mb-5">
                            <div className="col-md-8">
                            <div className="card  rounded-2 shadow-sm">
                            <img src={conta} alt="" className="rounded-2" width={"100%"} />
                            </div>
                                
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="row ">
                            <div className="col-md-12">
                                <p>
                                    <img alt="" src={piechart} width={"100%"} /></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12 fs-5">
                                <ul>
                                    <li>
                                        Exporters &amp; Importers</li>
                                    <li>
                                        Air Lines &amp; Shipping Lines</li>
                                    <li>
                                        Shipping Agents &amp; Cargo Agents</li>
                                    <li>
                                        Freight Brokers &amp; Forwarding Agents Govt. Departments, Port Authorities</li>
                                    <li>
                                        Banks &amp; Insurance Campanies</li>
                                    <li>
                                        Miscellaneous</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="row">
                            <div className="col-md-12"></div>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="row">
                            <div className="col-md-12"></div>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="row">
                            <div className="col-md-12"></div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4>SUBSCRIBERS VERTICALS </h4>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12"></div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <ul>
                                    <li>
                                        &nbsp;&nbsp; Shipping Lines/ Shipping Agents</li>
                                    <li>
                                        &nbsp;&nbsp; Ship Owners/ Charteres</li>
                                    <li>
                                        &nbsp;&nbsp; Freight Brokers/CHA's</li>
                                    <li>
                                        &nbsp;&nbsp; SME Manufactures</li>
                                    <li>
                                        &nbsp;&nbsp; AirLines</li>
                                    <li>
                                        &nbsp;&nbsp; SEZ'S</li>
                                    <li>
                                        &nbsp;&nbsp; Port/Custom Authoritires</li>
                                    <li>
                                        &nbsp;&nbsp; Indenting Agents</li>
                                    <li>
                                        &nbsp;&nbsp; AirCargo Agents</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <ul>
                                    <li>
                                        &nbsp;&nbsp; Warehousing Companies</li>
                                    <li>
                                        &nbsp;&nbsp; NVOCC'S</li>
                                    <li>
                                        &nbsp;&nbsp; Terminal Operators</li>
                                    <li>
                                        &nbsp;&nbsp; International Freight Forwarders</li>
                                    <li>
                                        &nbsp;&nbsp; Exporters/ Importers</li>
                                    <li>
                                        &nbsp;&nbsp; Buying Houses</li>
                                    <li>
                                        &nbsp;&nbsp; CFS Owners</li>
                                    <li>
                                        &nbsp;&nbsp; Financial &amp; Banking Institutions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>


            <div className="borderbg"></div>
            <BottomAds leftPosition={"OurReaders_Bottom_Left"} rightPosition={"OurReaders_Bottom_Right"} />
        </div>)
}

export default OurReaders;