// import DataAdmin from "../assets/DataAdmin";
import "../assets/Index.css";
import FolderImage from "../img/FolderImg";
import { useState } from "react";
import { Modal } from 'react-bootstrap';
import {useQuery} from 'react-query';
import { API } from '../../config/api';

const DataList = [
  "No",
  "Usert",
  "Trip",
  "Status Payment",
  "Action",
];

function TransactionList() {
  const [numberIndex, setNumberIndex] = useState(null);
  const handleIndex = (index) => {
    setNumberIndex(index);

  };

  const handleCloseIndex = () => {
    setNumberIndex(null);
  };

  const {data: dataAllTransaction}= useQuery("dataTransactionUserCache", async () => {
    const response = await API.get("/transaction")
    return response.data.data
  })

  return (
    <div style={{display: "flex", flexDirection: "column", width: "1440px", backgroundColor: "transparent", zIndex: "1", padding: "105px 87px 0px"}}>
      <div style={{ fontSize: "36px", marginTop:'30px' }}>Incoming Transaction</div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridAutoRows: "auto"}} >
        
        {DataList.map((item, index) => (
          <div key={index}  style={{ display: "flex", alignItems: "center", borderBottom: "1px solid black", height: "73px", padding: "0px 3px", fontWeight: "bold"}}> {item} </div>
          ))}
      </div>
      
      {dataAllTransaction?.length === 0 ? (
        <div style={{margin:'30px auto', fontSize:'40px'}}>Belum ada transaction</div>
      ) : (
        <div></div>
      )}

      {dataAllTransaction?.map((item, index) => {
        return (
          <div key={index} style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridAutoRows: "auto"}} >
            <div className="transactionLish">{index + 1}</div>
            <div className="transactionLish">{item.customerName}</div>
            <div className="transactionLish">{item.title}</div>

            {item.status === "Waiting Payment" ? (
              <div className="transactionLish" style={{ color: '#EC7A7A'}}>{item.status}</div>
            ) : (
              <div className="transactionLish" style={{ color: '#0ACF83'}}>{item.status}</div>
            )}
            

            <div className="transactionLish">
              <img src={FolderImage.Magnifying} alt={FolderImage.Magnifying} onClick={() => handleIndex(index)} />
            </div>
          </div>
        );
      })}

      {numberIndex !== null ? 
      <Modal show={numberIndex !== null} onHide={handleCloseIndex}>
        <div style={{display:'flex'}}>
        <div style={{ display: "flex", width: "1440px"}} >
            <div className="grid-container" style={{ display: "grid", gridTemplateColumns: "auto auto", width: "1035px", padding: "8px 63px 17px 35px", border: "1px solid #B7B7B7", borderRadius: "10px", position: "absolute", backgroundColor: "white", left:"-270px", top: "100px"}}>

                    <div style={{display: 'grid', gridTemplateColumns: 'auto auto'}}>
                        <div style={{gridColumn: 'span 2'}}><img src={FolderImage.Icon} alt="icon" style={{ height: '68px'}} /></div>
                        <div>

                            <p style={{fontSize: '24px', fontWeight:'bold', margin:'0px', maxWidth:'370px'}}>{dataAllTransaction[numberIndex].day} D/ {dataAllTransaction[numberIndex].night} N {dataAllTransaction[numberIndex].title}</p>

                            <p style={{fontSize: '14px', margin:'4px 0px 31px'}}>{dataAllTransaction[numberIndex].country.country}</p>
                            
                            {dataAllTransaction[numberIndex].status === "Waiting Payment" ? (
                               <p style={{width:'112px', height:'24px',fontSize: '12px', color:'#EC7A7A', backgroundColor:'rgb(236, 122, 122, 0.3', display:'flex', justifyContent:'center', alignItems:'center'}}>{dataAllTransaction[numberIndex].status}</p>
                            ) : (
                              <p style={{width:'112px', height:'24px',fontSize: '12px', color:'#0ACF83', backgroundColor:'rgb(236, 122, 122, 0.3', display:'flex', justifyContent:'center', alignItems:'center'}}>{dataAllTransaction[numberIndex].status}</p>
                            ) }
                           
                        </div>
                            <div style={{display: 'grid', gridTemplateColumns: 'auto auto', gridRow: 'span 2'}}>
                            <div>
                                <p style={{fontWeight:'bold', marginBottom:'3px', fontSize:'18px'}}>Date Trip</p>
                                <p>{dataAllTransaction[numberIndex].dateTrip}</p>
                            </div>

                            <div>
                                <p style={{fontWeight:'bold', marginBottom:'3px', fontSize:'18px'}}>Duration</p>
                                <p>{dataAllTransaction[numberIndex].day} day {dataAllTransaction[numberIndex].night} night </p>
                            </div>

                            <div>
                                <p style={{fontWeight:'bold', marginBottom:'3px', fontSize:'18px'}}>Accomodation</p>
                                <p>Hotel {dataAllTransaction[numberIndex].night} Night</p>
                            </div>

                            <div>
                                <p style={{fontWeight:'bold', marginBottom:'3px', fontSize:'18px'}}>Transportation</p>
                                <p>{dataAllTransaction[numberIndex].transportation}</p>
                            </div>
                        </div>
                    </div>


                    <div rowSpan="2" style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                        <p style={{fontWeight:'bold', fontSize:'36px', marginBottom:'4px'}}>Booking</p>
                        <p style={{margin:'0px'}}>{dataAllTransaction[numberIndex].date}</p>
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
                        <div>{dataAllTransaction[numberIndex].customerName}</div>
                        <div>{dataAllTransaction[numberIndex].customerGender}</div>
                        <div>{dataAllTransaction[numberIndex].customerPhone}</div>
                        <div style={{color:'black', fontWeight:'bold'}}>Qty</div>
                        <div style={{color:'black', fontWeight:'bold'}}>: {dataAllTransaction[numberIndex].amount}</div>
                    </div>

                    <div className="PaymentTabel3" style={{ display: 'grid', gridTemplateColumns: '10% 18% 18% 18% 18% 18%', gridColumn: 'span 2', fontWeight:'bold'}}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div>Total</div>
                        {/* <div style={{color:'red', border:'0px'}}>: IDR.</div> */}
                        <div style={{color:'red', border:'0px'}}>: IDR.{dataAllTransaction[numberIndex].total.toLocaleString()}</div>
                    </div>
                    
                    
                </div>
            </div>
            
        </div> 
      </Modal> : <div></div>
      }
    </div>
  );
}

export default TransactionList;
