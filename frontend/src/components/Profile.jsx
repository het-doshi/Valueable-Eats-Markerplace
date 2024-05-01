import React, {useState} from "react";
import "../Styles/home.css";
import { useLocation} from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import '../Styles/profile.css'
import { ToastContainer, toast } from 'react-toastify';
import restro from './restro.png'
import 'react-toastify/dist/ReactToastify.css';
import {
    Card,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    CardImg
  } from "reactstrap";

 function Profile() {

  
  const location = useLocation();
  const responseData = location.state.responseData;
  const name = responseData.data.name;
  const owner = responseData.data._id;
  const email = responseData.data.email
  const restaurantname = responseData.data.restaurantName
  const city = responseData.data.city
  const address = responseData.data.address
  const restaurantImage  = responseData.data.image

      // image
      const [imageData, setImageData] = useState({ image: null });
      const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setImageData({ image: imageFile });
      };

    // Function to handle image submission
    const handleImageSubmit = async (event) => {
    event.preventDefault();

    try {

      const formDataToSend = new FormData();
      formDataToSend.append('image', imageData.image);
      const image = {
                      image : imageData.image   
                    }
       
      
      if(!imageData.image){
          toast.error("please select the image")
      }
      else
      {

        const response = await axios.put(`http://localhost:4000/api/owner/picture?owner=${owner}`, image, {
          headers: {
            'Content-Type': 'multipart/form-data' 
          }
        });

        if (response.status === 200) {
          toast.success('Picture Updated')
          window.location.href = '../';
        } 
      }

    } catch (error) {
      toast.error('Picture not Updated')
      console.error('Error: ', error);
    }
  };


  const updateDetails = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const ownerData = {
      name: formData.get('name'),
      email: formData.get('email'),
      restaurantname: formData.get('restaurantname'),
      city: formData.get('city'),
      address: formData.get('address')
    };

    const oname = ownerData.name;
    const oemail = ownerData.email;
    const orestaurantname = ownerData.restaurantname;
    const ocity = ownerData.city;
    const oaddress = ownerData.address;
    




    try {

      if(!oname || !oemail || !orestaurantname || !ocity || !oaddress)
      {
        return toast.error('please fill all the details')
      }
      else
      {
        const response = await axios.put(`http://localhost:4000/api/owner?owner=${owner}`, ownerData);
        if (response.data && response.data.message === "Owner details updated successfully") {
          toast.success("details updated successfully");
          window.location.href = '../';
        }
      }
    } 
    catch (error) {
      console.error("Error:", error);
      return toast.error("details not updated");
    }

  }

  return (
    <>
    <ToastContainer/>
      <Header />
      <div className="name">Welcome {name}!</div>
      <Sidebar responseData={responseData} />
      <Card>
        <CardBody className="ownerCard">
          <CardTitle className="profileTitle" tag="h4">PROFILE</CardTitle>
          <Form className="oform" onSubmit={updateDetails}>
            <FormGroup>
              <Label for="name" hidden> Username</Label>
              <Input id="name" name="name" placeholder={"username: "+name} type="input" style={{ width: "70%", marginLeft:"80px" }}/>
            </FormGroup>
            <FormGroup>
              <Label for="email" hidden> Email</Label>
              <Input id="email" name="email" placeholder={"email: "+email} type="input" style={{ width: "70%", marginLeft:"80px" }}/>
            </FormGroup>
            <FormGroup>
              <Label for="restaurantname" hidden>Restaurant Name</Label>
              <Input id="restaurantname" name="restaurantname" placeholder={"restaurantname: "+restaurantname} type="input" style={{ width: "70%", marginLeft:"80px" }}/>
            </FormGroup>
            <FormGroup>
              <Label for="city" hidden>City</Label>
              <Input id="city" name="city" placeholder={"City: "+city} type="input" style={{ width: "70%", marginLeft:"80px" }}/>
            </FormGroup>
            <FormGroup>
              <Label for="address" hidden>Address</Label>
              <Input id="address" name="address" placeholder={"address: "+address} type="textarea" style={{ width: "70%", marginLeft:"80px" }}/>
            </FormGroup>
            <Button className="submitp" color="success" type="submit">Update</Button>
          </Form>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="profilePictureCard">
          <CardTitle className="profileTitle" tag="h4">Restaurant image</CardTitle>
          <CardImg
            className="profilePicture"
            alt="Card image cap"
            src={restaurantImage ? restaurantImage : restro} 
            top
            width="100%"
          />
          <Form className="pform" onSubmit={handleImageSubmit}>
          <FormGroup>
              <Label for="image" hidden>Image</Label>
              <Input id="image" name="image" style={{ width: "70%", marginLeft: "80px" }}
                type="file" onChange={handleImageChange} accept="image/*" />
            </FormGroup>
            <Button className="psubmit" color="success" type="submit">Upload</Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}
export default Profile;