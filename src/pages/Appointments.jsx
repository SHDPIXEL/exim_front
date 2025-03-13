import React, { useState } from 'react';
import { Button, Modal , Form, InputGroup } from 'react-bootstrap';
import ads4 from "../assets/images/ads4.png";
import ads5 from "../assets/images/ads5.png";
import jobsads from "../assets/images/jobshd.jpg";


const Appointments = () => {
     const [searchTerm, setSearchTerm] = useState("");
    
      const handleSearch = () => {
        console.log("Search Term:", searchTerm);
        // Add your search logic here
      };
    const jobs = [
        {
            id: 1,
            company: "OMVIRAS INTEGRATED LOGISTICS PVT. LTD.",
            description:
                "Thane-based fast-growing end-to-end logistics service provider. Our service profile covers Warehousing, Port Operations, Freight Forwarding, Shipping, and Logistics solutions.",
            position: "DATA ENTRY OPERATOR",
            salary: "₹15,500/- Per Month (All Inclusive)",
            location: "Vadape, Bhiwandi",
            responsibilities: [
                "Data Entry in Warehouse Management System (WMS) or other applications.",
                "Inventory Management.",
                "Data Maintenance.",
                "Shipping and Receiving - Record and verify shipments including tracking numbers, carrier information, and delivery dates.",
                "Order Processing - Data entry, verify, and process customer orders.",
                "Reporting and Analysis - Generate reports and analyze data to identify discrepancies."
            ],
            qualifications: [
                "Graduate with 1-2 years of experience in WMS.",
                "Expertise in MS-Excel and MS-Office.",
                "Good communication skills."
            ]
        },
        {
            id: 2,
            company: "OMVIRAS INTEGRATED LOGISTICS PVT. LTD.",
            position: "EXECUTIVE AT WAREHOUSE",
            salary: "₹15,500/- Per Month (All Inclusive)",
            location: "Vadape, Bhiwandi",
            description:
                "Thane-based fast-growing end-to-end logistics service provider. Our service profile covers Warehousing, Port Operations, Freight Forwarding, Shipping, and Logistics solutions.",
            responsibilities: [
                "Develop and implement strategic planning.",
                "Operational Management.",
                "Team Management.",
                "Inventory Management.",
                "Safety and Security.",
                "Budgeting and cost control.",
                "Identify areas of improvement and implement changes to increase efficiency and productivity."
            ],
            qualifications: [
                "Leadership qualities.",
                "Problem-solving skills.",
                "Good communication skills."
            ]
        },
        {
            id: 3,
            company: "OMVIRAS INTEGRATED LOGISTICS PVT. LTD.",
            position: "PICKERS AT WAREHOUSE",
            salary: "₹13,000/- Per Month (All Inclusive)",
            location: "Vadape, Bhiwandi",
            description:
                "Thane-based fast-growing end-to-end logistics service provider. Our service profile covers Warehousing, Port Operations, Freight Forwarding, Shipping, and Logistics solutions.",
            responsibilities: [
                "Retrieve orders from the warehouse shelves/racks ensuring accuracy and efficiency as per the picklist.",
                "Scan and verify the picked items to ensure they match the order requirements.",
                "Organize and stage the picked items for packing and shipping."
            ],
            qualifications: [
                "Basic understanding of warehouse operations.",
                "Good organizational skills.",
                "Attention to detail."
            ]
        },
        {
            id: 4,
            company: "OMVIRAS INTEGRATED LOGISTICS PVT. LTD.",
            position: "FREIGHT COORDINATOR",
            salary: "₹18,000/- Per Month (All Inclusive)",
            location: "Thane West, Mumbai",
            description:
                "Thane-based fast-growing end-to-end logistics service provider. Our service profile covers Warehousing, Port Operations, Freight Forwarding, Shipping, and Logistics solutions.",
            responsibilities: [
                "Coordinate and schedule freight deliveries.",
                "Liaise with clients and vendors to ensure timely shipping.",
                "Monitor and track shipments."
            ],
            qualifications: [
                "Experience in freight coordination.",
                "Proficiency in logistics management software.",
                "Strong organizational skills."
            ]
        },
        {
            id: 5,
            company: "OMVIRAS INTEGRATED LOGISTICS PVT. LTD.",
            position: "WAREHOUSE SUPERVISOR",
            salary: "₹20,000/- Per Month (All Inclusive)",
            location: "Thane West, Mumbai",
            description:
                "Thane-based fast-growing end-to-end logistics service provider. Our service profile covers Warehousing, Port Operations, Freight Forwarding, Shipping, and Logistics solutions.",
            responsibilities: [
                "Oversee daily warehouse operations.",
                "Ensure inventory accuracy.",
                "Supervise a team of warehouse workers.",
                "Maintain safety standards."
            ],
            qualifications: [
                "Bachelor's degree or equivalent experience.",
                "3+ years in warehouse management.",
                "Excellent leadership skills."
            ]
        },
        {
            id: 6,
            company: "OMVIRAS INTEGRATED LOGISTICS PVT. LTD.",
            position: "INVENTORY ANALYST",
            salary: "₹18,500/- Per Month (All Inclusive)",
            location: "Thane West, Mumbai",
            description:
                "Thane-based fast-growing end-to-end logistics service provider. Our service profile covers Warehousing, Port Operations, Freight Forwarding, Shipping, and Logistics solutions.",
            responsibilities: [
                "Analyze inventory data to identify trends and discrepancies.",
                "Prepare reports for management.",
                "Optimize inventory processes."
            ],
            qualifications: [
                "Proficiency in data analysis tools.",
                "Strong knowledge of inventory management.",
                "Attention to detail."
            ]
        },
        {
            id: 7,
            company: "OMVIRAS INTEGRATED LOGISTICS PVT. LTD.",
            position: "CUSTOMER SERVICE REPRESENTATIVE",
            salary: "₹14,000/- Per Month (All Inclusive)",
            location: "Vadape, Bhiwandi",
            description:
                "Thane-based fast-growing end-to-end logistics service provider. Our service profile covers Warehousing, Port Operations, Freight Forwarding, Shipping, and Logistics solutions.",
            responsibilities: [
                "Handle customer inquiries related to logistics and shipping.",
                "Resolve complaints and provide updates on shipments.",
                "Maintain records of customer interactions."
            ],
            qualifications: [
                "Excellent communication skills.",
                "Experience in customer service.",
                "Proficiency in MS-Office."
            ]
        },
        {
            id: 8,
            company: "OMVIRAS INTEGRATED LOGISTICS PVT. LTD.",
            position: "FORKLIFT OPERATOR",
            salary: "₹13,500/- Per Month (All Inclusive)",
            location: "Vadape, Bhiwandi",
            description:
                "Thane-based fast-growing end-to-end logistics service provider. Our service profile covers Warehousing, Port Operations, Freight Forwarding, Shipping, and Logistics solutions.",
            responsibilities: [
                "Operate forklifts to move goods within the warehouse.",
                "Inspect machinery before use.",
                "Ensure goods are stored safely."
            ],
            qualifications: [
                "Certification in forklift operation.",
                "Knowledge of safety protocols.",
                "Experience in warehouse operations."
            ]
        },
        {
            id: 9,
            company: "OMVIRAS INTEGRATED LOGISTICS PVT. LTD.",
            position: "SHIPPING COORDINATOR",
            salary: "₹16,000/- Per Month (All Inclusive)",
            location: "Thane West, Mumbai",
            description:
                "Thane-based fast-growing end-to-end logistics service provider. Our service profile covers Warehousing, Port Operations, Freight Forwarding, Shipping, and Logistics solutions.",
            responsibilities: [
                "Manage shipping schedules.",
                "Ensure proper documentation for shipments.",
                "Communicate with shipping carriers."
            ],
            qualifications: [
                "Experience in shipping operations.",
                "Strong multitasking skills.",
                "Proficiency in logistics software."
            ]
        },
        {
            id: 10,
            company: "OMVIRAS INTEGRATED LOGISTICS PVT. LTD.",
            position: "QUALITY CONTROL INSPECTOR",
            salary: "₹17,000/- Per Month (All Inclusive)",
            location: "Vadape, Bhiwandi",
            description:
                "Thane-based fast-growing end-to-end logistics service provider. Our service profile covers Warehousing, Port Operations, Freight Forwarding, Shipping, and Logistics solutions.",
            responsibilities: [
                "Inspect goods for quality standards.",
                "Document inspection results.",
                "Report and address quality issues."
            ],
            qualifications: [
                "Experience in quality control.",
                "Strong attention to detail.",
                "Knowledge of inspection procedures."
            ]
        },

    ];

    const repeatedJobs = [].concat(...Array(10).fill(jobs));

    const [show, setShow] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (job) => {
        setSelectedJob(job);
        setShow(true);
    };


    const [visibleJobsCount, setVisibleJobsCount] = useState(5);

    const handleViewMore = () => {
        setVisibleJobsCount(visibleJobsCount + 5);
    };

    return (
        <div className='container mt-3'>
            <div className="row mb-4">
            <div className="col-md-12 mt-4 mb-2">
                            <h2 className='text-center mb-3 fw-bold'>Exim Appointments</h2>
                        </div>
                <div className='col-md-9'>
                    <div className="row mb-4">
                      
                        <div className="shadow-sm p-4 pb-2 border rounded-3 bg-white">
                            <div className="row align-items-center ">
                                <div className="col-md-2 mb-3">
                                    <h5 className='fw-bold'>Select City</h5>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <Form.Select aria-label="Default select example" className='webinput'>
                                        <option>Select City</option>
                                        <option value="1" selected>Mumbai</option>
                                        <option value="2">Chennai</option>
                                        <option value="3">Delhi </option>
                                        <option value="1">Gujarat</option>

                                    </Form.Select>
                                </div>
                                <div className="col-md-4 mb-3 col-8">
                                    <div className="d-flex justify-content-center ">
                                        <InputGroup>
                                            
                                            <Form.Control
                                                type="text"
                                                placeholder="Search..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className='webinput border-end-0'
                                            />
                                           <InputGroup.Text className='bg-transparent border-dark border-start-0'>
                                                <i className="bi bi-search"></i> {/* Bootstrap Icon */}
                                            </InputGroup.Text>
                                           
                                        </InputGroup>
                                    </div>
                                   
                                </div>
                                <div className="col-md-2 mb-3 col-4 mb-3">
                                 <button onClick={handleSearch} className='dailySubscribebtn mx-auto p-2'>Search</button>
                                    
                                </div>
                            </div>

                            <div className='row mt-3'>

                                <div className="col-md-12">
                                    <h5 className='text-webColor fw-bolder'>Mumbai</h5>
                                    {repeatedJobs.slice(0, visibleJobsCount).map((job) => (
                                        <div className="AppointBox" key={job.id}>
                                            <h5>{job.position}</h5>
                                            <button
                                                className="detailsbtn"
                                                onClick={() => handleShow(job)}
                                            >
                                                Details
                                            </button>
                                        </div>
                                    ))}

                                    {visibleJobsCount < repeatedJobs.length && (
                                        <div className="col-12 text-center mt-4 mb-3">

                                        <button className='dailySubscribebtn mx-auto p-2' style={{ width: "200px" }} onClick={handleViewMore}>
                                            View More
                                        </button>
                                    </div>
                                       
                                    )}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div className='col-md-3 d-md-block d-none'>
                <img src={jobsads} className="w-100  ps-2" />
                
                </div>
            </div>

            <div className="borderbg"></div>
            <div className="row mb-4">
                <div className="col-md-6 mt-4 mb-2">
                    <img src={ads4} alt="adsv" className="w-100" />
                </div>
                <div className="col-md-6 my-4 mb-2 ">
                    <img src={ads5} alt="adsv" className="w-100" />
                </div>
            </div>

            <Modal show={show} onHide={handleClose} centered size="lg"
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title className='h5 fw-bolder text-webcolor'>{selectedJob?.position}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-4'>
                    <div class="job-listing">
                        <h5 className='fw-bolder'>OMVIRAS INTEGRATED LOGISTICS PVT. LTD.</h5>
                        <p> {selectedJob?.description} </p>

                        <h5 className='fw-bolder'>{selectedJob?.position}</h5>
                        <p><strong>Salary:</strong>  {selectedJob?.salary}</p>
                        <p><strong>Location:</strong> {selectedJob?.location}</p>
                        {selectedJob?.qualifications}
                        <ul>
                            <li>Data Entry in Warehouse Management System (WMS) or other applications.</li>
                            <li>Inventory Management.</li>
                            <li>Data Maintenance.</li>
                            <li>Shipping and Receiving: Record and verify shipments, including tracking numbers, carrier information, and delivery dates.</li>
                            <li>Order Processing: Data entry, verify, and process customer orders.</li>
                            <li>Reporting and Analysis: Generate reports, analyze data to identify discrepancies.</li>
                            <li>Graduate with 1-2 years of experience in WMS. Expertise in MS-Excel and MS-Office. Good communication skills.</li>
                        </ul>


                        <h5 className='fw-bolder'>OMVIRAS INTEGRATED LOGISTICS PVT. LTD.</h5>
                        <p>
                            Ground Floor, MBC Centre, Ghodhbunder Rd, Opp. Cine Wonder Cinema, Beside HP Petrol Pump, Kapurbawadi, Thane West, Mumbai-400607
                        </p>
                        <p>
                            Please email us at:
                            <a href="mailto:hr@omvirasintelogi.com">hr@omvirasintelogi.com</a> /
                            Contact: <a href="tel:022-40068063">022-40068063</a>
                        </p>
                    </div>


                </Modal.Body>

            </Modal>
        </div>


    )
}

export default Appointments;