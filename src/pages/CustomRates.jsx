import React, { useState } from 'react';
import ads4 from "../assets/images/ads4.png";
import ads5 from "../assets/images/ads5.png";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import excelicon from '../../src/assets/images/download.png';
const CustomRates = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    return (
        <div className='container mt-3'>

            <div className="row mb-4">
                <div className="col-md-12 mt-4 mb-2">
                    <h2 className='text-center mb-3 fw-bold'>Custom Exchange Rates</h2>
                </div>
                <div className="shadow-sm p-3 border rounded-3 bg-white">
                    <div className="row align-items-center ">
                        <div className="col-md-2 mb-1">
                            <h5 className='fw-bold'>Pick a Date -</h5>
                        </div>
                        <div className="col-md-3 mb-1">
                            <div className="datepicker-container w-100">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    placeholderText="Select a date"
                                    dateFormat="DD/MM/YYYY"
                                    className="form-control webinput w-100 dateiconimg"
                                />
                            </div>
                        </div>
                        <div className='col-md-7  mt-2 justify-content-md-end d-flex  justify-content-center'>
                        <button className='btnlink border-0 bg-transparent'><img src={excelicon} width={"50px"} alt='' /></button>
                           {/* <button className="ViewallBtn mx-auto p-2"> Download</button> */}
                        </div>
                    </div>

                    <div className='row mt-3'>

                        <div className="col-md-12">
                            <p className='text-webColor'>Notification No.: - With Effective Date: 03/01/2025</p>
                            <div className="table-responsive mb-1">
                                <table class="exchangetable table  align-middle mb-0" cellspacing="0" cellpadding="0">

                                    <thead>
                                        <tr>
                                            <td ><strong>CURRENCY</strong></td>
                                            <td ><strong>IMPORT</strong></td>
                                            <td ><strong>EXPORT</strong></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Australian Dollar</strong></td>
                                            <td>54.65 </td>
                                            <td>52.00</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Bahraini Dinar</strong></td>
                                            <td>236.40 </td>
                                            <td>219.15</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Canadian Dollar</strong></td>
                                            <td>60.70 </td>
                                            <td>58.65</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Chinese Yuan</strong></td>
                                            <td>11.95 </td>
                                            <td>11.55</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Danish Kroner</strong></td>
                                            <td>12.10 </td>
                                            <td>11.75</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Euro</strong></td>
                                            <td>90.65 </td>
                                            <td>87.30</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Hong Kong Dollar</strong></td>
                                            <td>11.20 </td>
                                            <td>10.90</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Japanese Yen (100)</strong></td>
                                            <td>55.45 </td>
                                            <td>53.65</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Korean Won</strong></td>
                                            <td>6.05 </td>
                                            <td>5.65</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Kuwaiti Dinar</strong></td>
                                            <td>287.15 </td>
                                            <td>269.45</td>
                                        </tr>
                                        <tr>
                                            <td><strong>New Zealand Dollar</strong></td>
                                            <td>49.45 </td>
                                            <td>46.90</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Norwegian Kroner</strong></td>
                                            <td>7.65 </td>
                                            <td>7.45</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Pound Sterling</strong></td>
                                            <td>109.40 </td>
                                            <td>105.65</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Qatari Riyal</strong></td>
                                            <td>25.25 </td>
                                            <td>21.95</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Saudi Arabian Riyal</strong></td>
                                            <td>23.55 </td>
                                            <td>22.25</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Singapore Dollar</strong></td>
                                            <td>64.15 </td>
                                            <td>61.95</td>
                                        </tr>
                                        <tr>
                                            <td><strong>South African Rand</strong></td>
                                            <td>4.70 </td>
                                            <td>4.40</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Swedish Kroner</strong></td>
                                            <td>7.85</td>
                                            <td>7.65</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Swiss Franc</strong></td>
                                            <td>96.80 </td>
                                            <td>92.80</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Turkish Lira</strong></td>
                                            <td>2.50 </td>
                                            <td>2.35</td>
                                        </tr>
                                        <tr>
                                            <td><strong>U. S. Dollar</strong></td>
                                            <td>86.60 </td>
                                            <td>84.90</td>
                                        </tr>
                                        <tr>
                                            <td><strong>UAE Dirham</strong></td>
                                            <td>24.05 </td>
                                            <td>22.65</td>
                                        </tr>
                                    </tbody>
                                </table>


                            </div>
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

export default CustomRates;
