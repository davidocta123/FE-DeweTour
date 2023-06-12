import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FolderImage from '../img/FolderImg';
import { DataContext } from "../../context/dataContext";
import { useMutation } from 'react-query';
import { API, setAuthToken  } from '../../config/api';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import '../assets/Index.css'


function FormLogin({openRegister}) {
  let navigate = useNavigate();
  const {dispatch, message, setMessage, setNavbarProfile, setUserLogin, setAdminLogin, setShowLoginModal, setIdUserLogin} = useContext(DataContext)

  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });
  
  const handleChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set('email', formLogin.email)
      formData.set('password', formLogin.password)

      const response = await API.post('/login', formData);
      console.log("response",response)
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.data,
      });

      setAuthToken(localStorage.token);
      
        if (response.data.data.role === 'admin') {
          navigate('/TransactionList');
          setNavbarProfile(true);
          setAdminLogin(true);
          setShowLoginModal(false);
        } else if (response.data.data.role === 'user') {
          setIdUserLogin(response.data.data.id)
          navigate('/');
          setNavbarProfile(true);
          setUserLogin(true);
          setShowLoginModal(false);
        } else {
          console.log("salah")
        }

      localStorage.setItem("token", response.data.data.token);

      // if (response.data.data.role === 'admin' ) {
      //   navigate('/TransactionList');
      //   setNavbarProfile(true);
      //   setAdminLogin(true);
      //   setShowLoginModal(false);
      // } else {
      //   setIdUserLogin(response.data.data.id)
      //   navigate('/');
      //   setNavbarProfile(true);
      //   setUserLogin(true);
      //   setShowLoginModal(false);
      // }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log("login failed : ", error);
    }})

  return (
    <Form className='containerFormLogin' onSubmit={(e) => handleSubmit.mutate(e)}>
        <img src={FolderImage.Palm} alt="palm" style={{position:'absolute', left:'0px'}}/>
        <img src={FolderImage.Hibiscus} alt="hibiscus" style={{position:'absolute', right:'0px'}}/>
        <p style={{margin:'51px 0px 75px 0px', textAlign:'center', fontSize:'36px'}}>Login</p>
        {message && message}
        <Form.Group controlId="formBasicEmail" style={{marginBottom:'35px'}}>
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" onChange={handleChange} type="text" placeholder="Enter Email" />
        </Form.Group>
        <Form.Group style={{marginBottom:'35px'}}>
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" onChange={handleChange} type="password" placeholder="Enter Password" />
        </Form.Group>
        <Button variant="primary" type="submit" style={{backgroundColor:'#FFAF00', border:'0px', width:'100%', marginBottom:'10px'}} >Login</Button>

        <div style={{textAlign:'center', fontWeight:'500'}}>Don't have an account ? klik
            <button style={{border:'0px', backgroundColor:'transparent', fontWeight:'bold'}} onClick={(e) => {
              e.preventDefault()
              openRegister()
            }}>Here</button>
        </div>
    </Form>
  );
}

export default FormLogin;