import { Card } from "react-bootstrap"
import './assets/Index.css'
import { useParams } from "react-router-dom";
import React, {useState , useEffect, useContext, useRef} from 'react'
import { useMutation } from 'react-query';
import FolderImage from './img/FolderImg'
import { useNavigate} from 'react-router-dom';
import { DataContext } from "../context/dataContext";
import { Modal, Form } from 'react-bootstrap';
import {useQuery} from 'react-query';
import { API } from '../config/api';

function FotoTour (){
    const {data: dataAllTrip}= useQuery("dataAllTripCache", async () => {
        const response = await API.get("/trip")
        return response.data.data
    })

    const { userLogin} = useContext(DataContext)
    const number = useParams("id")
    const dataDetailTrip = dataAllTrip[number.id]

    const [modalForm, setModalForm] = useState(false);
    const [modalInformasi, setModalInformasi] = useState(false);
    const [modalLogin, setModalLogin] = useState(false);

    const navigate = useNavigate()

    const [calculation, setCalculation] = useState(1);
    const [modalMaxQuota, setModalMaxQuota] = useState(false)
    const handlePlusClick = () => {
        if (calculation < dataDetailTrip?.quotaMax) {
            setCalculation(calculation + 1);
        }else if ( calculation === dataDetailTrip?.quotaMax ) {
            setModalMaxQuota(true)
        }
    };

    const handleModalMaxQuota =() => {
        setModalMaxQuota(false)
    }

    const handleMinusClick = () => {
        if (calculation > 1) {
        setCalculation(calculation - 1);
        }
    };

    const formattedDate = useRef('');
    useEffect(() => {
        const amount = calculation;
        const total = dataDetailTrip?.price * calculation;

        const handleDate = () => {
            const currentDate = new Date();
            formattedDate.current = currentDate.toLocaleString('default', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        };

        handleDate();

        setFormTransaction((prevFormTransaction) => ({
            ...prevFormTransaction,
            amount: amount,
            total: total,
            date: formattedDate.current,
            idTrip: parseInt(number.id),
        }));
    }, [calculation, number.id, dataAllTrip, dataDetailTrip?.price]);


    const handleBooking =() => {
        if (userLogin === true) {
        setModalForm(true)
    } else {
        setModalLogin(true);
    }}

    const handleCloseForm =() => {
        if (userLogin === true) {
            setModalForm(false)
        } else {
            setModalLogin(true)
        }
    }

    const [formTransaction, setFormTransaction] = useState({
        title : dataDetailTrip?.title,
        day : dataDetailTrip?.day,
        night : dataDetailTrip?.night,
        country : dataDetailTrip?.country?.id_country,
        dateTrip : dataDetailTrip?.dateTrip,
        transportation : dataDetailTrip?.transportation,
        status:'Waiting Payment',
        date:'',
        customerName: '',
        customerGender: '',
        customerPhone: '',
        amount: '',
        total:'',
      })

      const handleChange = (e) => {
        setFormTransaction({
          ...formTransaction,
          [e.target.name]: e.target.value,
        });
      };

      const handleSubmit = useMutation(async (e) => {
        try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }
        const data = JSON.stringify(formTransaction)
          
        const response = await API.post('/transaction', data, config);

        var tokenMitrans = response.data.data.token;
        localStorage.setItem("tokenMitrans", tokenMitrans);

        console.log("disini", tokenMitrans)
          navigate('/Payment');
        } catch (error) {
          console.log("add trip failed : ", error);
        }
      });

    const hadleForm = () =>{
        if (formTransaction.customerName.trim() === '' || formTransaction.customerGender === '' || formTransaction.customerPhone.trim() === '') {
            setModalInformasi(true)
            setModalForm(false)
        } else {
            // setModalForm(false)
            handleSubmit.mutate()
        }} 

    const handleModalInformasi =() => {
        setModalInformasi(false)
        setModalForm(true)
    }
    const handleModalLogin = () => {
        setModalLogin(false)
    }
    
    return(
        <>
            <Card className="containerFotoTour" >
                <div className="titleFotoTour">{dataDetailTrip?.title}</div>
                <p className="destinationFotoTour">{dataDetailTrip?.country?.country}</p>

                <div className="mainFotoTour" style={{backgroundImage: `url(${dataDetailTrip?.image})`}}></div>
                <div className="imageFotoTour"> 
                
                </div>
            </Card>


            <Card style={{padding:'0px 210px', borderRadius:'0px', maxWidth:'2040px', border:'0px', margin:'auto',backgroundColor:'transparent'}}>
            <p style={{margin:'0px 0px 10px', height:'24px', fontWeight:'bold'}}>Information Trip</p>
            <div style={{display:'flex', justifyContent:'space-between'}}>
            
            <div>
                <p style={{fontSize:'12px' ,height:'18px', marginBottom:'3px', color:'#A8A8A8'}}>Accomodation</p>
                <div style={{margin:'auto', fontSize:'17px' ,height:'33px', display:'flex', justifyContent:'center', alignItems:'center', fontWeight:'bold'}}>
                    <p><img src={FolderImage.Calendar} alt="icon" /></p>
                    <p style={{marginLeft:'14px'}}>Hotel {dataDetailTrip?.night} Night</p>
                </div>
            </div>

            <div>
                <p style={{fontSize:'12px' ,height:'18px', marginBottom:'3px', color:'#A8A8A8'}}>Transportation</p>
                <div style={{margin:'auto', fontSize:'17px' ,height:'33px', display:'flex', justifyContent:'center', alignItems:'center', fontWeight:'bold'}}>
                    <p><img src={FolderImage.Plane} alt="icon" /></p>
                    <p style={{marginLeft:'14px'}}>{dataDetailTrip?.transportation}</p>
                </div>
            </div>

            <div>
                <p style={{fontSize:'12px' ,height:'18px', marginBottom:'3px', color:'#A8A8A8'}}>Eat</p>
                <div style={{margin:'auto', fontSize:'17px' ,height:'33px', display:'flex', justifyContent:'center', alignItems:'center', fontWeight:'bold'}}>
                    <p><img src={FolderImage.Meal} alt="icon" /></p>
                    <p style={{marginLeft:'14px'}}>{dataDetailTrip?.eat}</p>
                </div>
            </div>

            <div>
                <p style={{fontSize:'12px' ,height:'18px', marginBottom:'3px', color:'#A8A8A8'}}>Duration</p>
                <div style={{margin:'auto', fontSize:'17px' ,height:'33px', display:'flex', justifyContent:'center', alignItems:'center', fontWeight:'bold'}}>
                    <p><img src={FolderImage.Time} alt="icon" /></p>
                    <p style={{marginLeft:'14px'}}>{dataDetailTrip?.day} day {dataDetailTrip?.night} night </p>
                </div>
            </div>


            <div>
                <p style={{fontSize:'12px' ,height:'18px', marginBottom:'3px', color:'#A8A8A8'}}>Date Trip</p>
                <div style={{margin:'auto', fontSize:'17px' ,height:'33px', display:'flex', justifyContent:'center', alignItems:'center', fontWeight:'bold'}}>
                    <p><img src={FolderImage.Hotel} alt="icon" /></p>
                    <p style={{marginLeft:'14px'}}>{dataDetailTrip?.dateTrip} </p>
                </div>
            </div>

            </div>
            <div className="description">
                <p style={{fontSize:'18px', margin:'20px 0px 7px', fontWeight:'bold'}}>Description</p>
                <p style={{color:'#A8A8A8'}}>{dataDetailTrip?.description}</p>
            </div>
            </Card>

            <div className='containerPricePerson'>
                <div className='tablePricePerson'>
                    <div style={{display:'flex'}}>
                        <div style={{color:'#FFAF00', marginRight:'5px'}}>IDR. {dataDetailTrip?.price.toLocaleString()}</div>
                        <div>/ Person</div>
                    </div>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                       
                        <button style={{border:'0px', backgroundColor:'transparent'}} onClick={handleMinusClick}><img src={FolderImage.Minus} alt="minus" /></button>

                        <div style={{margin:'0px 20px', fontSize:'18px', fontWeight:'bold'}}>{calculation}</div>
                        
                        <button style={{border:'0px', backgroundColor:'transparent'}} onClick={handlePlusClick}><img src={FolderImage.Plus} alt="Plus" /></button>

                    </div>
                </div>
                <div className='price'>
                    <div>Total :</div>
                    <div>IDR.{formTransaction.total.toLocaleString()}</div> 
                </div>
                <div style={{display:'flex', justifyContent: 'flex-end'}}>
                    <button className='buttonBooking' onClick={handleBooking}>BOOK NOW</button>
                </div>
            </div>

            <Modal show={modalForm} onHide={handleCloseForm} display={{alignItems:'center'}}>
                <div style={{backgroundColor:'white', width:'550px', height:'350px', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'5px'}}>
                <form style={{width:'500px', height:'300px', margin:'auto'}}>  
                    <Form.Group className="mb-3">
                        <Form.Label>Customer name</Form.Label>
                        <Form.Control name="customerName" onChange={handleChange} type="text" className="form-control" placeholder="Nama Pemesan" required/>
                    </Form.Group>

                    <Form.Group className="form-group" style={{margin:'10px 0px'}}> 
                        <Form.Label>Customer Gender</Form.Label>
                        <div style={{display:'flex' , flexDirection:'row'}}> 
                            <Form.Label style={{}}>Male</Form.Label>
                            <Form.Check onChange={handleChange} type="radio" name="customerGender" value="male" required/>
                            <Form.Label style={{marginLeft:'10px'}}>Female</Form.Label>
                            <Form.Check onChange={handleChange} type="radio" name="customerGender" value="female" required/> 
                        </div>
                    </Form.Group>
                    
                    <div className="form-group">
                        <Form.Label>Customer Phone</Form.Label>
                        <Form.Control name="customerPhone" onChange={handleChange} type="text" className="form-control" placeholder="Phone Pemesan" required/>
                    </div>
                    
                    <div style={{display:'flex', justifyContent:'space-around', marginTop:'20px'}}>
                        <div style={{ backgroundColor:'green', height:'30px', width:'70px', cursor:'pointer', textAlign:'center', fontWeight:'bold', color:'white', borderRadius:'10px'}} onClick={hadleForm}>Ok</div>
                        <div style={{ backgroundColor:'red', height:'30px', width:'70px', cursor:'pointer', textAlign:'center', fontWeight:'bold', color:'white', borderRadius:'10px'}} onClick={handleCloseForm}>Cancel</div>
                    </div>
                </form>
                </div>
            </Modal>

            <Modal show={modalInformasi} onHide={handleModalInformasi} display={{alignItems:'center'}}>
                    <div style={{display:'flex', margin:'auto', color:'red', fontSize:'20px'}}>Mohon lengkapi terlebih dahulu semua data</div>
            </Modal> 

            <Modal show={modalLogin} onHide={handleModalLogin} display={{alignItems:'center'}}>
                <div style={{display:'flex', margin:'auto', color:'red', fontSize:'20px'}}>Sebelum Melakukan booking</div>
                <div style={{display:'flex', margin:'auto', color:'red', fontSize:'20px'}}>Harus Login Terlebih Dahulu</div>
            </Modal>

             <Modal show={modalMaxQuota} onHide={handleModalMaxQuota} display={{alignItems:'center'}}>
                <div style={{display:'flex', margin:'auto', color:'red', fontSize:'20px'}}>Quota Sudah Maksimal</div>
            </Modal>
        </> 
    )
}

export default FotoTour