import React from "react";
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
    const maps = [
        { src: MumbaiMap, alt: "Mumbai Map" },
        { src: gujratMap, alt: "Gujarat Map" },
        { src: DelhiMap, alt: "Delhi Map" },
        { src: ChannaiMap, alt: "Chennai Map" },
        { src: KochiMap, alt: "Kochi Map" },
        { src: TuticorinMap, alt: "Tuticorin Map" },
        { src: KolkataMap, alt: "Kolkata Map" },
        { src: NothMap, alt: "North India Map" },
        { src: westMap, alt: "Western India Map" }
    ];

    return (
        <div className="container p-md-5 py-md-3">
            <div className="row mt-4">
                <div className="col-md-12 mt-4 text-center">
                    <h2 className="fw-bold">Our Editions</h2>
                </div>
            </div>
            <div className="row my-3">
                {maps.map((map, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card p-3 border shadow-sm rounded-2 zoom-card">
                            <img src={map.src} alt={map.alt} className="w-100" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="borderbg"></div>
            <BottomAds leftPosition={"OurEditors_Bottom_Left"} rightPosition={"OurEditors_Bottom_Right"} />
        </div>
    );
};

export default OurEditors;
