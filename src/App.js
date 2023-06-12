/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import {DataContext} from "./context/dataContext"
import {Route, Routes, BrowserRouter as Router, useNavigate, redirect} from "react-router-dom"
import Index from "./pages/Home"
import DetailTour from './pages/DetailTour'
import PaymentPage from './pages/Payment'
import Profile from "./pages/Profile"
import Navbars from "./component/Navbar"
import Copyright from './component/Copyright';
import { Container } from "react-bootstrap"
import FolderImage from "./component/img/FolderImg"
import Transaction from "./pages/transaction"
import IncomeTripAdmin from "./pages/IncomeTrip"
import AddTripForm from "./pages/AddTrip"
import UpdateTripForm from "./pages/updateTrip"

import AddCountryForm from "./pages/AddCountry"
import PrivateRoute from "./pages/PrivateRoutes"
import { API, setAuthToken } from './config/api';
import jwtDecode from 'jwt-decode';


function App() {
  // let navigate = useNavigate();
  const {state, dispatch, message, setMessage, setNavbarProfile, setUserLogin, setAdminLogin, setShowLoginModal, setIdUserLogin, dataUserLogin, setDataUserLogin} = useContext(DataContext)

  const [isLoading, setIsLoading] = useState(true)
  const token = localStorage.getItem("token");

  useEffect(() => {

    if (!isLoading) {
      if (state.isLogin === false) {
        // navigate('/');
        redirect('/');
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false)
    }
  }, []);

  const checkUser = async () => {
  try { 
    const response = await API.get('/check-auth');
    let payload = response.data.data;
    payload.token = localStorage.token;

    const idToken = localStorage.getItem("token")

    dispatch({
      type: 'USER_SUCCESS',
      payload,
    });
    setIsLoading(false)

    if (response.data.data.role === 'admin' ) {
      // navigate('/TransactionList');
      redirect('/TransactionList');
      setNavbarProfile(true);
      setAdminLogin(true);
      setShowLoginModal(false);
    } else if (response.data.data.role === 'user'){
      setIdUserLogin(response.data.data.id)
      // navigate('/');
      redirect('/');
      setNavbarProfile(true);
      setUserLogin(true);
    } else {
      console.log("salah")
    }

  } catch (error) {
    console.log("check user failed : ", error);
    dispatch({
      type: 'AUTH_ERROR',
    });
    setIsLoading(false)
  }
};

  return (
    <>
      {isLoading ? null :
        <Router>
          <Container style={{maxWidth:'1440px', maxheight:'3000px', padding:'0px', position:'relative'}}>
            <div style={{backgroundImage:`url(${FolderImage.Wallpaper})`, backgroundSize:'cover', height:'535px', width:'1440px', position:'absolute'}}></div>
            <div style={{backgroundColor:'#E5E5E5', position:'absolute', height:'100%', width:'100%', zIndex:'-1'}}></div>
            <img src={FolderImage.HibiscusLanding} alt="destination" style={{position:'absolute', right:'0px', top:'23%', zIndex:'1'}}/>
            <img src={FolderImage.PalmLanding} alt="destination" style={{position:'absolute', left:'0px', top:'41%', zIndex:'1'}}/>
            <Navbars/>  
            <Routes>

              <Route exact path="/" element={<Index/>} />
              <Route exact path="/DetailTour/:id" element={<DetailTour/>} />
              
              <Route exact path="/" element={<PrivateRoute role="user"/>} >
                <Route exact path="/" element={<Index/>} />
                <Route exact path="/DetailTour/:id" element={<DetailTour/>} />
                <Route exact path="/Payment" element={<PaymentPage/>} />
                <Route exact path="/Profile" element={<Profile/>} />
              </Route>

              <Route exact path="/" element={<PrivateRoute role="admin"/>} >
                <Route exact path="/TransactionList" element={<Transaction/>} />
                <Route exact path="/IncomeTrip" element={<IncomeTripAdmin/>} />
                <Route exact path="/AddTripForm" element={<AddTripForm/>} />
                <Route exact path="/UpdateTripForm/:id" element={<UpdateTripForm/>} />
                <Route exact path="/AddCountryForm" element={<AddCountryForm/>} />
              </Route>

            </Routes>
            <Copyright/>
          </Container>
        </Router>
      }
    </>
  );
}

export default App;


