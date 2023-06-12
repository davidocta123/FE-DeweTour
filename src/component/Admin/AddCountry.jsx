import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from '../../config/api';
// import { useQuery } from 'react-query';

function FormAddCountry() {
  const navigate = useNavigate();

  const [formCountry, setFormCountry] = useState({
    Name: ''
  });

  console.log(formCountry);

  const handleChange = (e) => {
    setFormCountry({
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      };

      const formData = new FormData();
      formData.set('name', formCountry.Name);
      
      console.log("country",formData)
      const response = await API.post('/country', formData, config);
      console.log("add country success : ", response);

      navigate('/IncomeTrip');
    } catch (error) {
      console.log("add country failed : ", error);
    }
  });

  return (
    <Form onSubmit={(e) => handleSubmit.mutate(e)} style={{ padding: '108px 118px', position: 'relative' }}>
      <div style={{ fontSize: '36px', marginBottom: '42px' }}>Add Country</div>

      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Control name="Name" onChange={handleChange} style={{ width: '1204px' }} required/>
      </Form.Group>

      <Button type="submit" style={{ width: '150px', position: 'absolute', left: '650px', bottom: '10px', backgroundColor: '#FFAF00', border: '0px' }}>Submit</Button>
    </Form>
  );
}

export default FormAddCountry;
