import React from "react";
import ads4 from "../../assets/images/ads4.png";
import ads5 from "../../assets/images/ads5.png";
import MumbaiMap from "../../assets/images/mumbai.jpg";
import gujratMap from "../../assets/images/gujrat.jpg";
import ChannaiMap from "../../assets/images/chennai.jpg";
import DelhiMap from "../../assets/images/Delhi.jpg";
import KochiMap from "../../assets/images/kochi.jpg";
import TuticorinMap from "../../assets/images/tuticorin.jpg";
import KolkataMap from "../../assets/images/kolkata.jpg";
import NothMap from "../../assets/images/Nothindia.jpg";
import westMap from "../../assets/images/westernIndia.jpg";
import BottomAds from "../../components/BottomAds";

const OurEditors = () => {

    return (

        <div className="container  p-md-5 py-md-3">
            <div className="row mt-4">
                <div className="col-md-12 mt-4  text-center">
                    <h2 className='text-center  fw-bold'>Our Editions </h2>

                </div>
            </div>
            <div className="row my-3">
                <div className="col-md-4 mb-4 ">
                    <div className="card p-3 border shadow-sm rounded-2" >
                        <img src={MumbaiMap} alt="" width={"100%"} />
                    </div>
                </div>
                <div className="col-md-4 mb-4 ">
                    <div className="card p-3 border shadow-sm rounded-2" >
                        <img src={gujratMap} alt="" width={"100%"} />
                    </div>
                </div>
                <div className="col-md-4 mb-4 ">
                    <div className="card p-3 border shadow-sm rounded-2" >
                        <img src={DelhiMap} alt="" width={"100%"} />
                    </div>
                </div>
                <div className="col-md-4 mb-4 ">
                    <div className="card p-3 border shadow-sm rounded-2" >
                        <img src={ChannaiMap} alt="" width={"100%"} />
                    </div>
                </div>
                <div className="col-md-4 mb-4 ">
                    <div className="card p-3 border shadow-sm rounded-2" >
                        <img src={KochiMap} alt="" width={"100%"} />
                    </div>
                </div>
                <div className="col-md-4 mb-4 ">
                    <div className="card p-3 border shadow-sm rounded-2" >
                        <img src={TuticorinMap} alt="" width={"100%"} />
                    </div>
                </div>
                <div className="col-md-4 mb-4 ">
                    <div className="card p-3 border shadow-sm rounded-2" >
                        <img src={KolkataMap} alt="" width={"94%"} />
                    </div>
                </div>
                <div className="col-md-4 mb-4 ">
                    <div className="card p-3 border shadow-sm rounded-2" >
                        <img src={NothMap} alt="" width={"100%"} />
                    </div>
                </div>
                <div className="col-md-4 mb-4 ">
                    <div className="card p-3 border shadow-sm rounded-2" >
                        <img src={westMap} alt="" width={"100%"} />
                    </div>
                </div>

            </div>


            <div className="borderbg"></div>
            <BottomAds leftPosition={"OurEditors_Bottom_Left"} rightPosition={"OurEditors_Bottom_Right"} />

        </div>)
}

export default OurEditors;