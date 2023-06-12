/* eslint-disable no-unused-vars */
import FolderImage from "../img/FolderImg"
import '../assets/Index.css'
import {  useState, useEffect} from "react";
import {useQuery} from 'react-query';
import { API } from '../../config/api';
import Modal from 'react-bootstrap/modal';
import jwtDecode from 'jwt-decode';
import { useMutation } from 'react-query';
import { useNavigate} from 'react-router-dom';


function Payment () {
    const navigate = useNavigate()
    const idToken = localStorage.getItem("token");
    const idUserByToken = jwtDecode(idToken)

    const {data: dataTransactionUser}= useQuery("dataTransactionUserCache", async () => {
        const response = await API.get(`/transactions/${idUserByToken.id}`)
        return response.data.data
    }) 
    
    const idLast = (dataTransactionUser?.length??1) - 1
    const dataLast = dataTransactionUser?.[idLast]??{}
    const last = dataLast?.idTrip
    
    
    const [payModal, setPayModal] = useState(false);
    const [paySukses, setPaySukses] = useState(false);

      const [formTransaction, setFormTransaction] = useState({
        status: 'Approve',
      });
      
      const handleSubmit = useMutation(async () => {
        try {
        var tokenMitrans = localStorage.getItem("tokenMitrans");
          const token = tokenMitrans;
          console.log("data token",token)
            window.snap.pay(token, {
            onSuccess: function (result) {
                navigate("/profile");
            },
            onPending: function (result) {
                console.log(result);
                navigate("/profile");
            },
            onError: function (result) {
                console.log(result);
                navigate("/profile");
            },
            onClose: function () {
                alert("you closed the popup without finishing the payment");
            },
            });

        } catch (error) {
          console.error("update status error: ", error);
        }
      });
      

    const handleClosePopUp = () => {
        setPayModal(false)
        setPaySukses(true);
    }

    useEffect(() => {
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
      
        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);
      
        document.body.appendChild(scriptTag);
        return () => {
          document.body.removeChild(scriptTag);
        };
      }, []);

    return (
        <div style={{display:'flex' }}>
            <div style={{display:'flex', width:'1440px', height:'777px', padding:'66px 202px', backgroundColor:'#E5E5E5'}}>
                <div className="grid-container" style={{display: 'grid', gridTemplateColumns: 'auto auto', width:'1035px', height:'419px', padding:'8px 63px 17px 35px', border:'1px solid #B7B7B7', borderRadius:'10px', position:'relative', backgroundColor:'white'}}>

                    <div style={{display: 'grid', gridTemplateColumns: 'auto auto'}}>
                        <div style={{gridColumn: 'span 2'}}><img src={FolderImage.Icon} alt="icon" style={{ height: '68px'}} /></div>
                        <div>

                            <p style={{fontSize: '24px', fontWeight:'bold', margin:'0px', maxWidth:'370px'}}>{dataLast?.day} D/ {dataLast?.night} N {dataLast?.title}</p>

                            <p style={{fontSize: '14px', margin:'4px 0px 31px'}}>{dataLast?.country?.country}</p>

                            {paySukses ? (
                                <p style={{width:'112px', height:'24px',fontSize: '12px', backgroundColor:'rgb(236, 122, 122, 0.3', display:'flex', justifyContent:'center', alignItems:'center', fontWeight:'bold', color:'#FF9900'}}>{dataLast?.status}</p>
                            ) : (
                                <p style={{width:'112px', height:'24px',fontSize: '12px', color:'#EC7A7A', backgroundColor:'rgb(236, 122, 122, 0.3', display:'flex', justifyContent:'center', alignItems:'center'}}>{dataLast?.status}</p>
                            )}

                        </div>
                            <div style={{display: 'grid', gridTemplateColumns: 'auto auto', gridRow: 'span 2'}}>
                            <div>
                                <p style={{fontWeight:'bold', marginBottom:'3px', fontSize:'18px'}}>Date Trip</p>
                                <p>{dataLast?.dateTrip}</p>
                            </div>

                            <div>
                                <p style={{fontWeight:'bold', marginBottom:'3px', fontSize:'18px'}}>Duration</p>
                                <p>{dataLast?.day} day {dataLast?.night} night </p>
                            </div>

                            <div>
                                <p style={{fontWeight:'bold', marginBottom:'3px', fontSize:'18px'}}>Accomodation</p>
                                <p>Hotel {dataLast?.night} Night</p>
                            </div>

                            <div>
                                <p style={{fontWeight:'bold', marginBottom:'3px', fontSize:'18px'}}>Transportation</p>
                                <p>{dataLast?.transportation}</p>
                            </div>
                        </div>
                    </div>


                    <div rowSpan="2" style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                        <p style={{fontWeight:'bold', fontSize:'36px', marginBottom:'4px'}}>Booking</p>
                        <p style={{margin:'0px'}}>{dataLast?.date}</p>
                        {/* <img style={{margin:'20px 0px 13px'}} src={FolderImage.Nota} alt="" />
                        <p style={{fontSize:'13px', color:'#818181', margin:'0px'}}>Upload payment proof</p> */}
                    </div>

                    <div className="PaymentTabel" style={{ display: 'grid', gridTemplateColumns: '10% 18% 18% 18% 18% 18%', gridColumn: 'span 2', fontSize:'18px', fontWeight:'bold'}}>
                        <div>No</div>
                        <div>Full Name</div>
                        <div>Gender</div>
                        <div>Phone</div>
                        <div></div>
                        <div></div>
                    </div>
                    
                    <div className="PaymentTabel2" style={{display: 'grid', gridTemplateColumns: '10% 18% 18% 18% 18% 18%', gridColumn: 'span 2', color:'#B1B1B1'}}>
                        <div>1</div>
                        <div>{dataLast?.customerName}</div>
                        <div>{dataLast?.customerGender}</div>
                        <div>{dataLast?.customerPhone}</div>
                        <div style={{color:'black', fontWeight:'bold'}}>Qty</div>
                        <div style={{color:'black', fontWeight:'bold'}}>: {dataLast?.amount}</div>
                    </div>

                    <div className="PaymentTabel3" style={{ display: 'grid', gridTemplateColumns: '10% 18% 18% 18% 18% 18%', gridColumn: 'span 2', fontWeight:'bold'}}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div>Total</div>
                        {/* <div style={{color:'red', border:'0px'}}>: IDR.</div> */}
                        <div style={{color:'red', border:'0px'}}>: IDR.{dataLast?.total?.toLocaleString()}</div>
                    </div>
                    
                    {paySukses ? (
                        <div></div>
                    ): (
                        // <Modal show={true} style={{backgroundColor: 'rgba(255, 255, 255, 0)'}}>
                        <button style={{ height: '50px', width: '213px', backgroundColor: '#FFAF00', borderRadius: '4px', border: '0px', position: 'absolute', bottom: '-78px', right: '0px' }} onClick={() => handleSubmit.mutate()}>PAY</button>
                        // </Modal>
                    )}
                    
                </div>
                <Modal show={payModal} onHide={handleClosePopUp} display={{alignItems:'center'}}>
                    <div style={{display:'flex', margin:'auto', color:'green'}}>Yourpayment will be confirmed within 1 x 24 hours</div>
                    <div style={{display:'flex', margin:'auto', color:'green'}}>To see orders click <b style={{ margin: '0px 5px', cursor:'pointer' }} onClick={handleClosePopUp }> Here </b> thank your</div>
                </Modal>
            </div>
            
        </div>
    )
}

export default Payment
