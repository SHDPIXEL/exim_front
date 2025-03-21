import React, { useState } from 'react';
import ads4 from "../assets/images/ads4.png";
import ads5 from "../assets/images/ads5.png";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import excelicon from '../../src/assets/images/download.png';
import BottomAds from "../components/BottomAds";


const ExchangeRates = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    return (
        <div className='container mt-3'>

            <div className="row mb-4">
                <div className="col-md-12 mt-4 mb-2">
                    <h2 className='text-center mb-3 fw-bold'>Foreign Exchange Rates</h2>
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
                                <p className='text-webColor'>Foreign Exchange rates on 08 jan 2025 all rates : Per unit</p>
                                <div className="table-responsive mb-1">
                                    <table class="exchangetable table  align-middle mb-0" cellspacing="0" cellpadding="0">
                                        <thead>
                                            <tr>
                                                <td><strong>CURRENCY</strong></td>
                                                <td><strong>TT SELLING RATES - CLEAN REMITTANCE OUTWARDS MARKET</strong></td>
                                                <td><strong>BILL SELLING RATES FOR IMPORTS MARKET</strong></td>
                                                <td><strong>TT BUYING RATES - CLEAN REMITTANCE INWARDS MARKET</strong></td>
                                                <td><strong>BILL BUYING RATES FOR EXPORTS MARKET</strong></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><strong>U. S. Dollar</strong></td>
                                                <td>86.17 </td>
                                                <td>86.34 </td>
                                                <td>85.43 </td>
                                                <td>85.37</td>
                                            </tr>
                                            <tr>
                                                <td><strong>U. K. Pound</strong></td>
                                                <td>108.41 </td>
                                                <td>108.62 </td>
                                                <td>106.64 </td>
                                                <td>106.57</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Euro</strong></td>
                                                <td>89.79 </td>
                                                <td>89.97 </td>
                                                <td>88.50 </td>
                                                <td>88.43</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Japanese Yen (100)</strong></td>
                                                <td>54.67 </td>
                                                <td>54.78 </td>
                                                <td>53.89 </td>
                                                <td>53.85</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Swiss Franc</strong></td>
                                                <td>95.69 </td>
                                                <td>95.88 </td>
                                                <td>94.06</td>
                                                <td>93.99</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Swedish Kroner</strong></td>
                                                <td>7.86 </td>
                                                <td>7.88 </td>
                                                <td>7.70 </td>
                                                <td>7.69</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Canadian Dollar</strong></td>
                                                <td>60.38 </td>
                                                <td>60.50 </td>
                                                <td>59.48 </td>
                                                <td>59.43</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Australian Dollar</strong></td>
                                                <td>54.25 </td>
                                                <td>54.36 </td>
                                                <td>53.17 </td>
                                                <td>53.13</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Singapore Dollar</strong></td>
                                                <td>63.56 </td>
                                                <td>63.68 </td>
                                                <td>62.27 </td>
                                                <td>62.22</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Hong Kong Dollar</strong></td>
                                                <td>11.16 </td>
                                                <td>11.18 </td>
                                                <td>10.93 </td>
                                                <td>10.92</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Danish Kroner</strong></td>
                                                <td>12.36</td>
                                                <td>12.42 </td>
                                                <td>11.53 </td>
                                                <td>11.46 </td>
                                            </tr>
                                            <tr>
                                                <td><strong>Arab Emirates Dirham</strong></td>
                                                <td>23.61 </td>
                                                <td>23.66 </td>
                                                <td>23.13 </td>
                                                <td>23.12 </td>
                                            </tr>
                                            <tr>
                                                <td><strong>Norwegian Krone</strong></td>
                                                <td>7.97 </td>
                                                <td>8.01 </td>
                                                <td>7.23 </td>
                                                <td>7.19</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                   
                </div>
            </div>
            <div className="borderbg"></div>
            <BottomAds leftPosition={"ExchangeRates_Bottom_Left"} rightPosition={"ExchangeRates_Bottom_Right"} />
        </div>
    )
}

export default ExchangeRates;
