import Card from 'react-bootstrap/Card';
import '../assets/Index.css';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/container';
import { useNavigate } from 'react-router-dom';
import {useQuery, useMutation} from 'react-query';
import { API } from '../../config/api';
import { useState } from 'react';
import Modal from 'react-bootstrap/modal';
import Button from 'react-bootstrap/Button';

function IncomeTrip () {
    const [confirDelete, setConfirdelete] = useState(false)
    const {data: dataAllTrip, refetch}= useQuery("dataAllTripCache", async () => {
        const response = await API.get("/trip")
        return response.data.data
    })
    const navigate = useNavigate();
    console.log("data123", dataAllTrip)
    
    const handleDelete = useMutation(async (itemId) => {
        try {
            console.log("idnya", itemId)
          const response = await API.delete(`/trip/${itemId}`); 
          console.log("delete trip success : ", response);
          setConfirdelete(false)
        } catch (error) {
          console.log("delete trip failed : ", error);}
        }, {
            onSuccess: () => {
              refetch();
            }
      });
    return (
        <Container style={{ position:'relative', maxWidth:'1440px', height:'auto', backgroundColor:'white', padding:'100px'}}>
            <div>
                <div style={{display:'flex', justifyContent:'space-between', margin:'0px auto 20px'}}>
                    <p style={{fontSize:'36px', fontWeight:'bold'}}>Income Trip</p>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <button onClick={() => navigate("/AddTripForm" )} style={{color:'white', backgroundColor:'#FFAF00', width:'150px', height:'40px', borderRadius:'5px', border:'0px', marginBottom:'10px'}}>Add Trip</button>

                        <button onClick={() => navigate("/AddCountryForm" )} style={{color:'white', backgroundColor:'#FFAF00', width:'150px', height:'40px', borderRadius:'5px', border:'0px'}}>add country</button>
                    </div>
                </div>
                
                <CardGroup style={{display:"grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "auto", gridGap: "40px", paddingLeft:'35px', marginBottom:'100px' }}>

                    {dataAllTrip?.map((item, index) => {
                    return (
                    <Card key={index} style={{borderRadius:"10px", padding:"10px", width:'350px', height:'400px'}}>
                        <div style={{display:'flex', alightItem: 'center', justifyContent:'center',position:'relative', padding:'0px'}}>
                        <div style={{backgroundImage:`url(${item?.image})`, backgroundSize:'cover', width:'328px', height:'241px', borderRadius:'10px'}}></div>
                        <div className='date'> {item.quotaFilled} / {item.quotaMax}</div>
                        </div>

                        <div className='destination'>{item.day}D/{item.night}N {item.title}</div>

                        <div style={{display:'flex', justifyContent:'space-between', marginTop:'10px'}}>
                            <div style={{color:"#FFAF00", fontWeight:"bold"}}>Rp.{(item.price * item.quotaFilled).toLocaleString()}</div>
                            <div style={{color:"#878787"}}>{item.country.country}</div>
                        </div>

                        <div style={{display:'flex', width:'100%', justifyContent:'space-between', marginTop:'10px'}}>
                            {/* <div style={{border:'1px solid black', backgroundColor:'black',color:'yellow', padding:'2px 10px', borderRadius:'10px', cursor:'pointer'}} >Update</div> */}
                            <div style={{border:'1px solid black', backgroundColor:'black',color:'yellow', padding:'2px 10px', borderRadius:'10px', cursor:'pointer'}} onClick={(e) => {
                            navigate(`/UpdateTripForm/${item.id}`)}} >Update</div>
                            <div style={{border:'1px solid black', backgroundColor:'black',color:'red', padding:'2px 10px', borderRadius:'10px', cursor:'pointer'}}  onClick={() => {setConfirdelete(true)
                                }} >Delete</div>
                        </div>

                        <Modal show={confirDelete} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ backgroundColor: 'gray', padding: '20px', borderRadius: '5px', textAlign: 'center' }}>
                                <div style={{ margin: 'auto', color: 'green' }}>Apakah trip ini akan dihapus?</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                    <Button onClick={() => { handleDelete.mutate(item.id) }}>Iya</Button>
                                    <Button onClick={() => { setConfirdelete(false) }}>Tidak</Button>
                                </div>
                            </div>
                        </Modal>


                    </Card>
                    )
                    })}
                </CardGroup>
          </div>
      </Container>
    )
}

export default IncomeTrip