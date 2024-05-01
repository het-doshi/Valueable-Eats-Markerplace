import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";
import "../Styles/registration.css";
import logo from "./logo.png"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Registration() {
  const navigate = useNavigate();

  const login = () => {
    navigate('/');
  }

  const handleRegistration = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const registrationData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      restaurantname: formData.get('restaurantname'),
      city: formData.get('city'),
      address: formData.get('address')
    };


    const uname = registrationData.name;
    const email = registrationData.email;
    const password = registrationData.password;
    const restaurantname = registrationData.restaurantname;
    const city = registrationData.city;
    const address = registrationData.address;


    try {
  
      if( !uname || !email || !password || !restaurantname || !city || !address )
      {
        return toast.error('please fill all details')
      }
      else
      {
        const response = await axios.post('http://localhost:4000/api/register', registrationData);
        if (response.data && response.data.message === "Registration successful") {
          toast.success('Registered sucessfully')
        }
      }
    } catch (error) {
      toast.error('Registration Failed')
      console.error("Error:", error);
    }
  }

  return (
    <>
    <ToastContainer/>
      <Card>
        <CardBody className="cardBody">
          <CardTitle className="loginTittle" tag="h2">Registration</CardTitle>
          <br />
          <img className="imgl" alt="ddu logo" src={logo}/>
          <br />
          <Form className="rform" onSubmit={handleRegistration}>
            <FormGroup>
              <Label for="name" hidden> Username</Label>
              <Input id="name" name="name" placeholder="Username" type="input" style={{ width: "70%", marginLeft:"80px" }}/>
            </FormGroup>
            <FormGroup>
              <Label for="email" hidden> Email</Label>
              <Input id="email" name="email" placeholder="Email" type="input" style={{ width: "70%", marginLeft:"80px" }}/>
            </FormGroup>
            <FormGroup>
              <Label for="password" hidden> Password</Label>
              <Input id="password" name="password" placeholder="Password" type="password" style={{ width: "70%", marginLeft:"80px" }}/>
            </FormGroup>
            <FormGroup>
              <Label for="restaurantname" hidden>Restaurant Name</Label>
              <Input id="restaurantname" name="restaurantname" placeholder="Restaurant Name" type="input" style={{ width: "70%", marginLeft:"80px" }}/>
            </FormGroup>
            <FormGroup>
              <Label for="city" hidden>City</Label>
              <Input id="city" name="city" placeholder="City" type="input" style={{ width: "70%", marginLeft:"80px" }}/>
            </FormGroup>
            <FormGroup>
              <Label for="address" hidden>Address</Label>
              <Input id="address" name="address" placeholder="Restaurant Address" type="textarea" style={{ width: "70%", marginLeft:"80px" }}/>
            </FormGroup>
            <Button className="submit" color="success" type="submit">Register</Button>
            <Button className="submit" color="primary" onClick={login}>Login</Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}

export default Registration;