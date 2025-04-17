import React, { useEffect, useState } from 'react';
import logo from "../assets/images/logo-exim.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Darkmode from '../assets/images/Darkmode.svg';
import MyNavbar from './MyNavbar';
import { Dropdown } from 'react-bootstrap';
import playStore from "../assets/images/playstore.png"
import AppStore from "../assets/images/appstore.png"
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';

const MainHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [time, setTime] = useState("");

  const subscribeClick = () => {
    navigate('/subscribePage');
  }

  const { lastUpdatedTime } = useAppContext();
  const { logout, user } = useAuth();

  return (
    <>
      <div className='HeaderTop'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 text-center text-md-start'>
              <div> <ul>
                <li>
                  {(() => {
                    const date = new Date();
                    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                    const year = date.getFullYear();
                    return `${weekday}, ${day} ${month} ${year}`;
                  })()}
                </li>

                <li>|</li>
                <li>Updated {lastUpdatedTime} IST</li>
                {/* <li>|</li>
                <li><Link><img src={Darkmode} alt='' className='p-0' /></Link></li> */}
              </ul></div>
            </div>
            <div className='col-md-4'>
              <div className='d-flex justify-content-end rightlist'>
                <div className='mx-2 my-2'>App In :</div>
                <Link to="https://play.google.com/store/apps/details?id=com.hv.eximindia&pli=1" target='_blank' className='mx-2 my-1' ><img src={playStore} width={80} className='rounded-1' /></Link>
                <Link to="https://apps.apple.com/in/app/exim-india/id1225479989" target='_blank' className='mx-2 my-1' ><img src={AppStore} width={80} className='rounded-1' /></Link>
                {/* <div className='searchtop'><i className="bi bi-search"></i> Search</div> */}
                {
                  user ? (
                    <div className='loginbtn' onClick={() => navigate('/dashboard')}> Dashboard</div>

                  ) : (
                    <div className='loginbtn' onClick={() => navigate('/Login')}><i className="bi bi-person-circle"></i> Login</div>
                  )
                }

              </div>

            </div>

          </div>
        </div>
      </div>
      <div className='middleHeader'>
        <div className='container'>
          <div className='row py-3 align-items-center'>
            <div className='col-md-6'>
              <Link to="/" className='Logoimg'>
                <img src={logo} width={400} alt='' />
              </Link>
            </div>
            <div className='col-md-6 mt-2 mt-md-0'>
              <div className=' d-flex justify-content-md-end justify-content-center'>
                <button className='rightlogoimg btnlink' onClick={subscribeClick}>
                  <h2>Read Digital Copy</h2>
                  <p>Get access to daily news on the go!</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='Headermainbg'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-10 col-3'>
              <MyNavbar />
            </div>
            <div className='col-md-2 col-9'>


              <div className=' d-flex justify-content-end'>
                {(location.pathname !== "/profile" && location.pathname !== "/mydevice" && location.pathname !== "/paymentHistory") && (
                  <button className='menu-btn mx-3' onClick={subscribeClick}>SUBSCRIBE TO EXIM INDIA</button>
                )}

                {(location.pathname === "/dashboard" || location.pathname === "/profile" || location.pathname === "/mydevice" || location.pathname === "/paymentHistory") && (
                  <Dropdown className='d-flex' >
                    <Dropdown.Toggle id="dropdown-button-dark-example1" className='userlogout' drop={"start"} variant='link'>
                      <i className="bi bi-person-circle"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='menulinkdropdown'>
                      {/* <Dropdown.Item as={Link} to="/mydevice" ><i className="bi bi-phone"></i> My Device</Dropdown.Item> */}
                      <Dropdown.Item as={Link} to="/paymentHistory"><i className="bi bi-receipt"></i> Billing</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/profile"><i className="bi bi-person-badge"></i> My Profile</Dropdown.Item>
                      <Dropdown.Item onClick={logout}><i className="bi bi-power"></i> Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>)}

              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default MainHeader;
