import React, { useRef, useState, useEffect } from 'react';
import ads4 from "../assets/images/ads4.png";
import ads5 from "../assets/images/ads5.png";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import excelicon from '../../src/assets/images/download.png';
import BottomAds from "../components/BottomAds";
import API from '../api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExchangeRates = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [exchangeData, setExchangeData] = useState([]);
    const [hasFetchedForNull, setHasFetchedForNull] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [latestDate, setLatestDate] = useState(null);
    const hasFetchedOnce = useRef(false);  // Prevents duplicate fetches on mount

    const fetchExchangeData = async (date) => {
        if (isFetching) return; // Prevent concurrent requests

        setIsFetching(true);
        try {
            const response = await API.post("/forexes/get_forexes_website", { date });

            if (response?.data?.data?.length > 0) {
                if (date === null) {
                    setSelectedDate(response.data.data[0].date); // Set latest date from response
                }
                setExchangeData(response.data.data);
                setLatestDate(response.data.data[0].date);
            } else {
                setExchangeData([]);
                setLatestDate(date);
            }
        } catch (error) {
            console.error("Error fetching exchange data:", error.response?.data || error.message);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        if (!hasFetchedOnce.current) {
            hasFetchedOnce.current = true;
            fetchExchangeData(null); // First fetch only once
        } else if (selectedDate !== null && selectedDate !== latestDate) {
            const formattedSelectedDate = selectedDate.toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD'
            if (formattedSelectedDate !== latestDate.split('T')[0]) {
                fetchExchangeData(formattedSelectedDate);
            }
        }
    }, [selectedDate]);


    const downloadCSV = () => {
        if (exchangeData.length === 0) {
            alert("No data available to download!");
            return;
        }
    
        let csvContent = "Currency,TT Selling Rates,Bill Selling Rates,TT Buying Rates,Bill Buying Rates\n";
        exchangeData.forEach(({ 
            currency, 
            tt_selling_rates_clean_remittance_outwards, 
            bill_selling_rates_for_imports, 
            tt_buying_rates_clean_remittance_inwards, 
            bill_buying_rates_for_exports 
        }) => {
            csvContent += `${currency},${tt_selling_rates_clean_remittance_outwards},${bill_selling_rates_for_imports},${tt_buying_rates_clean_remittance_inwards},${bill_buying_rates_for_exports}\n`;
        });
    
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, `exchange_rates_${selectedDate || "latest"}.csv`);
    };
    
    const downloadExcel = () => {
        if (exchangeData.length === 0) {
            alert("No data available to download!");
            return;
        }
    
        const ws = XLSX.utils.json_to_sheet(exchangeData.map(({ 
            currency, 
            tt_selling_rates_clean_remittance_outwards, 
            bill_selling_rates_for_imports, 
            tt_buying_rates_clean_remittance_inwards, 
            bill_buying_rates_for_exports 
        }) => ({
            "Currency": currency,
            "TT Selling Rates": tt_selling_rates_clean_remittance_outwards,
            "Bill Selling Rates": bill_selling_rates_for_imports,
            "TT Buying Rates": tt_buying_rates_clean_remittance_inwards,
            "Bill Buying Rates": bill_buying_rates_for_exports
        })));
    
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Exchange Rates");
    
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, `exchange_rates_${selectedDate || "latest"}.xlsx`);
    };
    

    return (
        <div className='container mt-3'>

            <div className="row mb-4">
                <div className="col-md-12 mt-4 mb-2">
                    <h2 className='text-center mb-3 fw-bold'>Foreign Exchange Rates</h2>
                </div>
                <div className="shadow-sm p-3 border rounded-3 bg-white">
                    <div className="row ">
                        <div className="col-md-2 mb-1">
                            <h5 className='fw-bold'>Pick a Date -</h5>
                        </div>
                        <div className="col-md-3 mb-1">
                            <div className="datepicker-container w-100">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    placeholderText="Select a date"
                                    dateFormat="dd/MM/yyyy"
                                    maxDate={new Date()}
                                    className="form-control webinput w-100 dateiconimg"
                                />
                            </div>
                        </div>
                        {exchangeData.length > 0 &&
                        <div className='col-md-7  mt-2 justify-content-md-end d-flex  justify-content-center'>
                            <button onClick={downloadCSV} className='btnlink border-0 bg-transparent'><img src={excelicon} width={"50px"} alt='' /></button>
                            {/* <button className="ViewallBtn mx-auto p-2"> Download</button> */}
                        </div>
                        }      
                    </div>

                    {/* Dynamic Table */}
                    <div className='row mt-3'>
                        <div className="col-md-12">
                            {exchangeData.length > 0 ? (
                                <div className="table-responsive mb-1">
                                    <table className="exchangetable table align-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th><strong>CURRENCY</strong></th>
                                                <th><strong>TT SELLING RATES</strong></th>
                                                <th><strong>BILL SELLING RATES</strong></th>
                                                <th><strong>TT BUYING RATES</strong></th>
                                                <th><strong>BILL BUYING RATES</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {exchangeData.map((item) => (
                                                <tr key={item._id}>
                                                    <td><strong>{item.currency}</strong></td>
                                                    <td>{item.tt_selling_rates_clean_remittance_outwards}</td>
                                                    <td>{item.bill_selling_rates_for_imports}</td>
                                                    <td>{item.tt_buying_rates_clean_remittance_inwards}</td>
                                                    <td>{item.bill_buying_rates_for_exports}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-center text-muted">No data available for the selected date.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="borderbg"></div>
            <BottomAds leftPosition={"ExchangeRates_Bottom_Left"} rightPosition={"ExchangeRates_Bottom_Right"} />
        </div >
    )
}

export default ExchangeRates;
