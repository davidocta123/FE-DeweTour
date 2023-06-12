import FolderImage from "../img/FolderImg"
// import DataPersonalInfo from "../assets/DataPersonalInfo"
import { API } from '../../config/api';
import {useQuery} from 'react-query';
import { DataContext } from "../../context/dataContext";
import React, {useContext, useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import { useMutation } from 'react-query';
import { Modal } from 'react-bootstrap';

function PersonalInfo (){
    const {idUserLogin} = useContext(DataContext)
    const [updateProfile, setUpdateProfile] = useState(false)
    
    const {data: dataProfileUser}= useQuery("dataCountryCache", async () => {
        const response = await API.get(`/user/${idUserLogin}`)
        return response.data.data
    }, {
      refetchInterval: 1000,
      refetchIntervalInBackground: true
    }
    ) 
    const [formRegister, setFormRegister] = useState({
        fullName: '',
        phone: '',
        address: '',
        image:'',
      });

      var imageProfile = ''
      if (dataProfileUser?.image !== '') {
        imageProfile = dataProfileUser?.image
      } else {
        imageProfile = FolderImage?.imageProfile
      }
    
      useEffect(() => {
        const getLogin = async () => {
          try {
            const response = await API.get(`/user/${idUserLogin}`);
            const data = response.data.data
            
            setFormRegister({
              fullName: data.fullname,
              phone: data.phone,
              address: data.address,
              image:'',
            });
          } catch (error) {
            console.error("Error:", error);
          }
        };
        getLogin();
      }, [idUserLogin]);

      const hadleFormProfile = () => {
        setUpdateProfile(true)
      }

      const handleCloseFromProfile = () => {
        setUpdateProfile(false)
    }

      const handleChange = (e) => {
        setFormRegister({
          ...formRegister,
          [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value,
        });
      };
    

      const handleSubmit = useMutation(async (e) => {
        try {
            console.log("disini")
          e.preventDefault();
          const config = {
            headers: {
              'Content-type': 'multipart/form-data',
            },
          };
          console.log("apa")

          const formData = new FormData();
          formData.set('fullName', formRegister.fullName);
          formData.set('phone', formRegister.phone);
          formData.set('address', formRegister.address);
          formData.set('image', formRegister.image[0], formRegister.image[0].name);

          const response = await API.patch(`/user/${idUserLogin}`, formData, config)
          setUpdateProfile(false)
          console.log("register success : ", response)
        } catch (error) {
          if (error.response && error.response.status === 400 && error.response.data.Message === "Email already exists") {
          }
        }
      });
    
    return (
        <div>
            <div style={{display:'flex', width:'1440px', backgroundColor:'#E5E5E5', zIndex:'1'}}>
                <div style={{display:'flex', width:'1440px', backgroundColor:'#E5E5E5', zIndex:'1', paddingTop:'114px', marginBottom:'50px'}}>
                    <div style={{height:'453px', width:'785px', backgroundColor:'white', display:'flex', margin:'auto',justifyContent:'space-around', padding:'24px 24px 21px 31px', zIndex:'1'}}>
                        <div>
                            <div style={{ fontSize:'36px', fontWeight:'bold', marginBottom:'53px'}}>Personal Info</div>
                        
                            <div style={{display:'flex' , alignItems:'center', marginBottom:'28px'}}>
                                <div style={{backgroundImage:`url(${FolderImage.Vector})`, backgroundSize:'cover', height:'30px', width:'30px', marginRight:'15px'}}></div>
                                <div>
                                    <div style={{fontSize:'14px', fontWeight:'bold', }}> {dataProfileUser?.fullname}</div>
                                    <div style={{fontSize:'14px', color:'#8A8C90'}}>Full Name</div>
                                </div>
                            </div>

                            <div style={{display:'flex' , alignItems:'center', marginBottom:'28px'}}>
                                <div style={{backgroundImage:`url(${FolderImage.Letter})`, backgroundSize:'cover', height:'30px', width:'30px', marginRight:'15px'}}></div>
                                <div>
                                    <div style={{fontSize:'14px', fontWeight:'bold', }}> {dataProfileUser?.email}</div>
                                    <div style={{fontSize:'14px', color:'#8A8C90'}}>Email</div>
                                </div>
                            </div>

                            <div style={{display:'flex' , alignItems:'center', marginBottom:'28px'}}>
                                <div style={{backgroundImage:`url(${FolderImage.Phone})`, backgroundSize:'cover', height:'30px', width:'30px', marginRight:'15px'}}></div>
                                <div>
                                    <div style={{fontSize:'14px', fontWeight:'bold', }}> {dataProfileUser?.phone}</div>
                                    <div style={{fontSize:'14px', color:'#8A8C90'}}>Phone Number</div>
                                </div>
                            </div>

                            <div style={{display:'flex' , alignItems:'center', marginBottom:'28px'}}>
                                <div style={{backgroundImage:`url(${FolderImage.Place})`, backgroundSize:'cover', height:'30px', width:'30px', marginRight:'15px'}}></div>
                                <div>
                                    <div style={{fontSize:'14px', fontWeight:'bold', }}> {dataProfileUser?.address}</div>
                                    <div style={{fontSize:'14px', color:'#8A8C90'}}>Address</div>
                                </div>
                            </div>

                        </div>
                        <div>
                            <div style={{ height: '345px', width: '280px', backgroundImage: `url(${imageProfile})`, backgroundSize:'cover', backgroundPosition: 'center', borderRadius:'10px'}}></div>
                            <button style={{ height: '50px', width: '280px', borderRadius:'5px', marginTop:'13px', fontSize:'18px', backgroundColor:'#FFAF00', color:'white', border:'0px', fontWeight:'bold'}}onClick={hadleFormProfile}>Update Profile</button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={updateProfile} onHide={handleCloseFromProfile} display={{alignItems:'center'}}>
                <Form className='containerRegister' onSubmit={(e) => handleSubmit.mutate(e)}>
                    <img src={FolderImage.Palm} alt="palm" style={{position:'absolute', left:'0px'}}/>
                    <img src={FolderImage.Hibiscus} alt="hibiscus" style={{position:'absolute', right:'0px'}}/>

                    <p style={{margin:'51px 0px 75px', textAlign:'center', fontSize:'36px'}}>Update Profile</p>

                    <Form.Group style={{marginBottom:'35px'}}>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control value={formRegister.fullName}  type="text" placeholder="Enter Full Name" name="fullName"  onChange={handleChange} required />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group style={{marginBottom:'35px'}}>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control value={formRegister.phone} type="text" placeholder="Enter Phone" name="phone" onChange={handleChange} required/>
                    </Form.Group>

                    <Form.Group style={{marginBottom:'35px'}}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={formRegister.address} type='textarea' placeholder="Address" name="address" style={{height:'70px'}} onChange={handleChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Foto Profile</Form.Label>
                        <Form.Control name="image" onChange={handleChange} type="file" required/>
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{backgroundColor:'#FFAF00', border:'0px', width:'100%', marginBottom:'10px'}} >Update</Button>
                </Form>
            </Modal>    
        </div>

    )
}

export default PersonalInfo
