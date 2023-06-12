import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from '../../config/api';
import {useQuery} from 'react-query';

function UpdateFormTrip() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {data: dataCountry}= useQuery("dataCountryCache", async () => {
      const response = await API.get("/country")
      return response.data.data
  },{
    refetchInterval: 1000,
    refetchIntervalInBackground: true
  })
    
    const [formTrip, setFormTrip] = useState({
      title: '',
      country:'',
      accomodation:'',
      transportation:'',
      eat:'',
      day:'',
      night:'',
      duration:'',
      dateTrip:'',
      price:'',
      quotaMax:'',
      quotaFilled:1,
      description:'',
      image:''
    })

    useEffect(() => {
      const getTrip = async () => {
        try {
          const response = await API.get(`/trip/${id}`);
          const data = response.data.data
          setFormTrip({
            title: data.title,
            country: data.country.country,
            accomodation: data.accomodation,
            transportation: data.transportation,
            eat: data.eat,
            day: data.day,
            night: data.night,
            duration: data.duration,
            dateTrip: data.dateTrip,
            price: data.price,
            quotaMax: data.quotaMax,
            // quotaFilled:1,
            description: data.description,
            image: '',
          });
        } catch (error) {
          console.error("Error:", error);
        }
      };

      getTrip();
    }, [id]);
    

    const handleChange = (e) => {
        setFormTrip({
          ...formTrip,
          [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value,
        });
      };

    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();

        const config = {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        };
  
        const formData = new FormData();
        formData.set('title', formTrip.title);
        formData.set('country_id', formTrip.country);
        formData.set('accomodation', formTrip.accomodation);
        formData.set('transportation', formTrip.transportation);
        formData.set('eat', formTrip.eat);
        formData.set('day', formTrip.day);
        formData.set('night', formTrip.night);
        formData.set('dateTrip', formTrip.dateTrip);
        formData.set('price', formTrip.price);
        formData.set('quotaMax', formTrip.quotaMax);
        formData.set('quotaFilled', formTrip.quotaFilled);
        formData.set('description', formTrip.description);
        formData.append('image', formTrip.image[0], formTrip.image[0].name);
        
        const response = await API.patch(`/trip/${id}`, formData, config);
        
        console.log("add trip success : ", response);
        console.log("data : ", formData);
  
        navigate('/IncomeTrip');
      } catch (error) {
        console.log("add trip failed : ", error);
        throw error;
      }
    });
      
    return (
      <div>
        <Form onSubmit={(e) => handleSubmit.mutate(e)} style={{padding:'108px 118px', position:'relative'}}>
            <div style={{fontSize:'36px'}}>Add Trip</div>
            <div style={{ color: 'red', fontSize: "20px", marginBottom: '42px', cursor: 'pointer' }} onClick={() => navigate('/IncomeTrip')}>close</div>
            <Form.Group className="mb-3">
                <Form.Label>Title Trip</Form.Label>
                <Form.Control name="title" value={formTrip.title} onChange={handleChange} style={{width:'1204px'}} required/>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Select value={formTrip?.country} onChange={handleChange} name="country" style={{width:'1204px'}}>
                    <option>Select Country</option>
                  {dataCountry?.map((item, index) => {
                    return (
                    <option key={index} value={item.id_country} >{item.country}</option>
                    );
                  })}
                </Form.Select>
            </Form.Group> 

            <Form.Group className="mb-3">
                <Form.Label>Accomodation</Form.Label>
                <Form.Control name="accomodation"  value={formTrip.accomodation} onChange={handleChange} style={{width:'1204px'}} required/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Transportation</Form.Label>
                <Form.Control name="transportation"  value={formTrip.transportation} onChange={handleChange} style={{width:'1204px'}} required/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Eat</Form.Label>
                <Form.Control name="eat"  value={formTrip.eat} onChange={handleChange} style={{width:'1204px'}} required/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Duration</Form.Label>
                <div style={{display:'flex'}}>
                    <Form.Control type="number" name="day"  value={formTrip.day} onChange={handleChange}  style={{width:'228px'}} required/> Days
                    <Form.Control type="number" name="night"  value={formTrip.night} onChange={handleChange} style={{width:'228px'}} required/> Night
                </div>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Date Trip</Form.Label>
                <Form.Control type="date" name="dateTrip"  value={formTrip.dateTrip} onChange={handleChange} style={{width:'1204px'}} required/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price"  value={formTrip.price} onChange={handleChange} style={{width:'1204px'}} required/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Quota Max</Form.Label>
                <Form.Control type="number" name="quotaMax"  value={formTrip.quotaMax} onChange={handleChange} style={{width:'1204px'}} required/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description"  value={formTrip.description} onChange={handleChange} style={{width:'1204px', height:'117px'}} required/>
            </Form.Group>
        
            <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control name="image"  onChange={handleChange} type="file" required/>
            </Form.Group>

          <Button type="submit" style={{width:'150px', position:'absolute', left:'650px', bottom:'10px', backgroundColor:'#FFAF00', border:'0px'}} >Submit</Button>
        </Form>
      </div>
    );
}
      
export default UpdateFormTrip;

      
