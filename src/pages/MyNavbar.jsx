import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Offcanvas, Collapse } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'; // For Bootstrap icons
import { Link } from 'react-router-dom';

const menuItems = [
    { text: 'Home', link: '/' },
    {
        text: 'About Us',
        dropdown: true,
        items: [
            { text: 'Exim India', link: '/EximIndia' },
            { text: 'Our Editions', link: '/oureditions' },
            { text: 'Our Readers', link: '/ourReaders' },
            // { text: 'Our CEO', link: '/#' },
        ]
    },
    {
        text: 'FER/ CER',
        dropdown: true,
        items: [
            { text: 'Foreign Exchange Rates', link: '/rates' },
            { text: 'Custom Exchange Rates', link: '/Customrates' },

        ]
    },
    {
        text: ' Exim Online',
        dropdown: true,
        items: [
            { text: 'Mumbai', link: '/subscribePage' },
            { text: 'Gujarat', link: '/subscribePage' },
            { text: 'Delhi / NCR', link: '/subscribePage' },
            { text: 'Chennai', link: '/subscribePage' },
            { text: 'Kochi', link: '/subscribePage' },
            { text: 'Tuticorin', link: '/subscribePage' },
            { text: 'Kolkata', link: '/subscribePage' },

        ]
    },
    { text: 'News', link: '/eximnews' },
    { text: 'Events', link: '/events' },
    { text: 'Appointments', link: '/appointments' },    
    { text: 'Video Gallery', link: '/videoGallery' },
    { text: 'Contact Us', link: '/contact' },
    // {text: "Download", link: "/download"}


];

const MyNavbar = () => {
    const [show, setShow] = useState(false);
    const [menuCollapse, setMenuCollapse] = useState({ menu: false, services: false });
    const [isMobile, setIsMobile] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCollapseToggle = (menu) => {
        setMenuCollapse(prevState => ({
            ...prevState,
            [menu]: !prevState[menu]
        }));
    };


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 992);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Navbar className="Headermainbg" variant="dark" expand="lg" >

                <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="d-none d-lg-flex mainmenu">
                        {menuItems.map((item, index) => (
                            item.dropdown ? (
                                <NavDropdown title={item.text} id={`nav-dropdown-${index}`} key={index} className="nav-item dropdown-hover">
                                    {item.items.map((subItem, subIndex) => (
                                        subItem.divider ? (
                                            <NavDropdown.Divider key={subIndex} />
                                        ) : (
                                            <NavDropdown.Item as={subItem.link ? Link : 'a'} to={subItem.link} key={subIndex}>{subItem.text}</NavDropdown.Item>
                                        )
                                    ))}
                                </NavDropdown>
                            ) : (
                                <Nav.Link as={item.link ? Link : 'a'} to={item.link} key={index}>{item.text}</Nav.Link>
                            )
                        ))}
                    </Nav>
                </Navbar.Collapse>

            </Navbar>

            <Offcanvas
                show={show}
                onHide={handleClose}
                backdrop="static"
                placement="start"
                className="custom-offcanvas"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='p-0'>
                    <Nav className="flex-column sideMainmenu">
                        {menuItems.map((item, index) => (
                            item.dropdown ? (
                                <Nav.Item key={index}>
                                    <Nav.Link
                                        onClick={() => handleCollapseToggle(item.text.toLowerCase())}
                                    >
                                        {item.text}
                                        <div className='float-end'>
                                        <i
                                            className={`bi ${menuCollapse[item.text.toLowerCase()] ? 'bi-chevron-up' : 'bi-chevron-down'} ms-2`}
                                        ></i>
                                        </div>
                                    </Nav.Link>

                                    <Collapse in={menuCollapse[item.text.toLowerCase()]} className='showcollapsse'>
                                        <div>
                                            <Nav className="flex-column">
                                                {item.items.map((subItem, subIndex) => (
                                                    subItem.divider ? (
                                                        <NavDropdown.Divider key={subIndex} />
                                                    ) : (
                                                        <Nav.Link onClick={handleClose} as={subItem.link ? Link : 'a'} to={subItem.link} key={subIndex}>
                                                          <i className="bi bi-circle-fill  me-2"></i> {subItem.text}
                                                        </Nav.Link>
                                                    )
                                                ))}
                                            </Nav>
                                        </div>
                                    </Collapse>
                                </Nav.Item>
                            ) : (
                                <Nav.Link onClick={handleClose} as={item.link ? Link : 'a'} to={item.link} key={index}>{item.text}</Nav.Link>
                            )
                        ))}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default MyNavbar;
