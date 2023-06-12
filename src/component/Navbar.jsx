import React, { useState, useContext} from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/nav';
import Navbar from 'react-bootstrap/navbar';
import FolderImage from './img/FolderImg';
import './assets/Index.css'
import Modal from 'react-bootstrap/modal';
import FormLogin from '../component/auth/FormLogin';
import FormRegister from '../component/auth/FormRegister';
import { DataContext } from "../context/dataContext";
import { useNavigate } from 'react-router-dom';
import { API } from '../config/api';
import {useQuery} from 'react-query';
import { Container } from 'react-bootstrap';


function Navbars() {
  const navigate = useNavigate();
  const {userLogin, setUserLogin, adminLogin, setAdminLogin, navbarProfile, setNavbarProfile, appearancePay, setAppearancePay, dataBooking, setMessage, showLoginModal, setShowLoginModal, idUserLogin} = useContext(DataContext)
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const {data: dataProfileUser}= useQuery("dataCountryCache", async () => {
    const response = await API.get(`/user/${idUserLogin}`)
    return response.data.data
  })
  
  var imageProfile = ''
  if (dataProfileUser?.image !== '') {
    imageProfile = dataProfileUser?.image
  } else {
    imageProfile = FolderImage?.imageProfile
  }

  function logout () {
    localStorage.removeItem("token")
    navigate("/")
    setUserLogin(false);
    setAdminLogin(false);
    setNavbarProfile(false);
    setAppearancePay(false);
  }

  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  const handleOpenRegisterModal = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    setMessage();
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };
   
  return (
    <>
    <Navbar collapseOnSelect expand="lg" style={{ padding: '0px' }}>
        <Container style={{width:'1440px', position:'relative', padding: '0px' }}>
        {adminLogin === true ? (
          <div onClick={() => navigate('/TransactionList')} style={{ cursor: 'pointer' }}>
            <img src={FolderImage.Icon} alt="icon" style={{ height: '68px', zIndex: '3' }} />
          </div>
        ) : (
          <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img src={FolderImage.Icon} alt="icon" style={{ height: '68px', zIndex: '3' }} />
          </div>
        ) }

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav style={{ position: 'absolute', right: '0px' , padding:'0px'}}>

            {navbarProfile ? (
              (userLogin === true) ? (
                <NavDropdown className='fotoprofil' style={{ backgroundImage: `url(${imageProfile})`}}>
                  <NavDropdown.Item style={{ backgroundColor: 'white', borderRadius: '5px', padding: '20px 0px 20px'}}>
                    
                    <div onClick={() => navigate('/profile')} style={{ textDecoration: 'none', color: 'black', paddingLeft: '30px', display:'flex', marginBottom: '15px'}}>

                    <div><img src={FolderImage.IconProfile} alt="icon profile" /> </div>
                      <div style={{marginLeft:'20px'}}>Profile</div>
                    </div>
                    
                    {appearancePay ? (
                      
                      <div style={{ display:'flex', padding: '10px 0px 0px 30px', marginBottom: '30px', backgroundColor: 'white' }}>

                        <div onClick={() => navigate(`/Payment/${dataBooking.id}`)} style={{ display:'flex', textDecoration: 'none', color: 'black' }} >
                          
                          <div><img src={FolderImage.Bill} alt="icon pay"/></div>
                          <div style={{marginLeft:'20px'}}>Pay</div>
                        </div>
                      </div>
                    ) : null}

                    <div style={{ padding: '20px 0px 0px 30px', borderTop: '3px solid #A8A8A8', backgroundColor: 'white', display:'flex' }}  onClick={(e) => { e.preventDefault(); logout();}}>
                      <div><img src={FolderImage.Logout} alt="icon logout" /></div>
                      <div style={{marginLeft:'20px'}}>Logout</div>
                    </div>

                    <img src={FolderImage.Triangle} alt="Triangle" style={{ position: 'absolute', top: '-20px', right: '0px' }} />
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (adminLogin === true) ? (
                <NavDropdown className='fotoprofil' style={{ backgroundImage: `url(${FolderImage.fotoAdmin})`}}>
                  <NavDropdown.Item style={{ backgroundColor: 'white', borderRadius: '5px', padding: '20px 0px 20px'}}>
                    <div onClick={() => navigate('/IncomeTrip')} style={{display:'flex', textDecoration: 'none', color: 'black', paddingLeft: '30px', marginBottom: '15px'}}>
                      <div><img src={FolderImage.Trip} alt="icon trip" /></div>
                      <div style={{marginLeft:'20px'}}>Trip</div>
                    </div>
                    <div style={{display:'flex', padding: '20px 0px 0px 30px', borderTop: '3px solid #A8A8A8', backgroundColor: 'white' }} onClick={(e) => {
                      e.preventDefault();
                      logout();
                    }}>
                      <div><img src={FolderImage.Logout} alt="icon logout" /></div>
                      <div style={{marginLeft:'20px'}}>Logout</div>
                    </div>
                    <img src={FolderImage.Triangle} alt="Triangle" style={{ position: 'absolute', top: '-20px', right: '0px' }} />
                  </NavDropdown.Item>
                </NavDropdown>
              ) : null
              ) : (
                <>
                  <Nav.Link className="login" onClick={handleOpenLoginModal}>
                    Login
                  </Nav.Link>
                  <Nav.Link className="register" onClick={handleOpenRegisterModal}>
                    Register
                  </Nav.Link>
                </>
              )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
        </Navbar>
  
      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
        {/* <FormLogin getDatas={getData} openRegister={handleOpenRegisterModal} /> */}
        <FormLogin openRegister={handleOpenRegisterModal} />
      </Modal>
  
      <Modal show={showRegisterModal} onHide={handleCloseRegisterModal}>
        <FormRegister openLogin={handleOpenLoginModal}/>
      </Modal>
    </>
  );
  
}

export default Navbars;