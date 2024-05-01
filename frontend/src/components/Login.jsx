import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  CardSubtitle,
  Button
} from "reactstrap";
import "../Styles/login.css";
import logo from "./logo.png";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    navigate('/Registration');
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {

      if(!username || !password)
      {
        return toast.error('empty credentials')
      }
      else
      {
        const response = await axios.post('http://localhost:4000/api/login', {
          name: username,
          password: password
          
        });
  
        if(response.status===403)
        {
          toast.error("Access denied")
        }

        if (response.data && response.data.message === "Login successfully") {
          console.log("login success");
          toast.success('Login sucessfully')
          navigate('/Home', { state: { responseData: response.data } }); // Pass response.data as state object
        }
        
      }

    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied");
      }
      else
      {
        toast.error("Invalid login");
        console.error("Error:", error);
      } 
    }
  }

  return (
    <>
    <ToastContainer/>
      <Card>
        <CardBody className="cardBodyl">
          <CardTitle className="loginTittle" tag="h2">Login</CardTitle>
          <CardSubtitle className="mb-2 tagline" tag="h6">Your Kitchen, Our Platform, <br /> Let's Grow Together</CardSubtitle>
          <br />
          <img alt="ddu logo" src={logo}/>
          <br />
          <CardSubtitle className="mb-2 text-muted subtitle" tag="h6">Valuable Eats Marketplace</CardSubtitle>
          <Form className="loginform" onSubmit={handleLogin}>
            <FormGroup>
              <Label for="username" hidden> Username</Label>
              <Input id="username" name="username" placeholder="username" type="input"   
                style={{ width: "70%", marginLeft:"80px" }} value={username}
                onChange={handleUsernameChange} 
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" hidden> Password</Label>
              <Input id="password" name="password" placeholder="Password" type="password"  
                style={{ width: "70%", marginLeft:"80px" }} value={password}
                onChange={handlePasswordChange} 
              />
            </FormGroup>
            <Button className="submit" color="success" type="submit">Login</Button>
            <Button className="submit" color="dark" onClick={register}>Register</Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}
export default Login;