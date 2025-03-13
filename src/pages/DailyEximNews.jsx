import React from 'react';
import ads4 from "../assets/images/ads4.png";
import ads5 from "../assets/images/ads5.png";
import { Form } from 'react-bootstrap';

const DailyEximNews = () => {

    return (
        <div className='container mt-3'>
 <div className="row mb-4">
                <div className="col-md-12 mt-4 mb-2">
                    <h2 className='text-center mb-3 fw-bold'>Mumbai News</h2>
                </div>
                <div className="shadow-sm p-3 border rounded-3 bg-white">
<div className="row pt-2 align-items-center mb-3">
                   
                    <div className="col-md-2 mb-1">
                        <Form.Select aria-label="Default select example" className='webinput'>
                            <option>Select Month</option>
                            <option value="1">ECMF</option>
                            <option value="2">MALA</option>
                            <option value="3">Conquest</option>
                            <option value="1">Gujrat Junction</option>
                            <option value="2">SECC</option>
                            <option value="3">GMH</option>
                        </Form.Select>
                    </div>
                    <div className="col-md-2 mb-1">
                        <Form.Select aria-label="Default select example" className='webinput'>
                            <option>Select Year</option>
                            <option value="1">ECMF</option>
                            <option value="2">MALA</option>
                            <option value="3">Conquest</option>
                            <option value="1">Gujrat Junction</option>
                            <option value="2">SECC</option>
                            <option value="3">GMH</option>
                        </Form.Select>
                    </div>
                </div>
                </div>
                </div>

            <div className="borderbg"></div>
            <div className="row mb-4">
                <div className="col-md-6 mt-4 mb-2">
                    <img src={ads4} alt="adsv" className="w-100" />
                </div>
                <div className="col-md-6 my-4 mb-2">
                    <img src={ads5} alt="adsv" className="w-100" />
                </div>
            </div>
        </div>
    )
}

export default DailyEximNews;