import { Container, Button, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import './assets/Index.css'
import dataInformation from './assets/dataInformation';
import CardGroup from 'react-bootstrap/CardGroup';
import { useNavigate} from 'react-router-dom';
import {useQuery} from 'react-query';
import { API } from '../config/api';


function Home() {
  const {data: dataAllTrip}= useQuery("dataAllTripCache", async () => {
    const response = await API.get("/trip")
    return response.data.data
    })

  const navigate = useNavigate()
  return (
      <Container className='inihome' style={{ position:'relative', maxWidth:'1440px', height:'auto', paddingBottom:'100px'}}>
          <Card style={{borderRadius:"10px", padding:"10px 10px", backgroundColor:'transparent', border:'0px', margin:'auto'}}>
              <p style={{color:'white', fontSize:'50px', fontWeight:'bold', marginTop:'50px', marginBottom:'0px', height:'78px'}}>Explore</p>
              <p style={{color:'white', fontSize:'40px', fontWeight:'lighter', marginTop:'-20px', marginBottom:'10px',height:'78px'}}>your amazing city together</p>
              <p style={{color:'white', marginTop:'80px', marginBottom:'10px', fontSize:'20px', height:'22px'}}>Find great places to holiday</p>
              <Form className="d-flex">
              <Form.Control type="Home" placeholder="Search" aria-label="Search" style={{borderRadius:'5px 0px 0px 5px'}}/>
              <Button style={{backgroundColor:'#FFAF00', fontWeight:'bold', border:'1px solid #FFAF00', borderRadius:'0px 5px 5px 0px'}}>Search</Button>
            </Form>
          </Card>

          {/* information */}
          <div className='containerInformation'>
            {dataInformation.map((item, index) => {
              return (
                <Card key={index} className='cardInformation'>
                  <img src={item.Image} alt="logo" />
                  <Card.Title className='title'>{item.Title}</Card.Title>
                  <Card.Text className='info'>{item.Info}</Card.Text>
                </Card>
              )
            })}
          </div>

          <div style={{marginBottom:'121px', margin:'72px auto 0px'}}>
            <p style={{textAlign:"center", color:"black", marginBottom:"88px", fontSize:"45px", fontWeight:'500'}}>Group Tour</p>
            <CardGroup style={{display:"grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "auto", gridGap: "40px", paddingLeft:'35px'}}>
            
            {dataAllTrip?.map((item, index) => {
                    return (
                    <Card key={index} style={{borderRadius:"10px", padding:"10px", width:'350px', height:'350px'}} onClick={(e) => {
                      navigate(`/DetailTour/${index}`)
                    }}>
                        <div style={{display:'flex', alightItem: 'center', justifyContent:'center',position:'relative', padding:'0px'}}>
                        <div style={{backgroundImage:`url(${item?.image})`, backgroundSize:'cover', width:'328px', height:'241px', borderRadius:'10px'}}></div>
                        <div className='date'>{item.quotaMax - item.quotaFilled } remaining</div>
                        </div>

                        <div className='destination'>{item.day}D/{item.night}N {item.title}</div>

                        <div style={{display:'flex', justifyContent:'space-between', marginTop:'10px'}}>
                            <div style={{color:"#FFAF00", fontWeight:"bold"}}>IDR.{item.price.toLocaleString()}</div>
                            <div style={{color:"#878787"}}>{item.country.country}</div>
                        </div>
                    </Card>
                    )
                    })}

            </CardGroup>
          </div>
      </Container>
  )
}

export default Home;

