import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
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
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import '../Styles/menu.css';
import 'react-toastify/dist/ReactToastify.css'; 

function UpdateItem() {
  const location = useLocation();
  const userData = location.state.userData;
  const item = location.state.item;
  const name = userData.data.name;
  const navigate = useNavigate();

  const ownerId = userData.data._id;
  const ucity = userData.data.city;
  const urestaurant = userData.data.restaurantName;
  const uaddress = userData.data.address;
  

    // State variables to store form data
    const [formData, setFormData] = useState({
      name: "",
      price: "",
      cuisine: "",
      menu: "",
      rating: "",
      image: null
    });

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', formData.image);
      formDataToSend.append('owner', ownerId);
      formDataToSend.append('city', ucity);
      formDataToSend.append('restaurant', urestaurant);
      formDataToSend.append('address', uaddress);
      formDataToSend.append('rating', formData.rating);
      formDataToSend.append('cuisine', formData.cuisine);
      formDataToSend.append('menu', formData.menu);
      formDataToSend.append('item', formData.name);
      formDataToSend.append('price', formData.price);

      const name =  formData.name
      const price = formData.price
      const cuisine = formData.cuisine
      const menu = formData.menu
      const rating = formData.rating
      const image = formData.image

      if(!name || !price || !cuisine || !menu || !rating ||!image)
      {
         toast.error('please fill all details')
      }
      else
      {
      const response = await axios.put(`http://localhost:4000/api/menu?item=${item.name}&city=${ucity}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });

      if (response.status === 200) {
        toast.success('item updated sucessfully')
      } 

      }

    } catch (error) {
      toast.error('item updation failed')
      console.error('Error adding item to menu:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setFormData({ ...formData, image });
  };


  return (
    <>
    <ToastContainer/>
      <Header />
      <div className="name">Welcome {name}!</div>
      <Card>
        <CardBody className="cardbodyd">
          <CardTitle className="updatetitle" tag="h2">Update Existing Dish</CardTitle>
          <Form className="dform" onSubmit={handleSubmit}>

            <FormGroup>
              <Label for="name" hidden>Name</Label>
              <Input id="name" name="name" placeholder='Dish name' type="input" style={{ width: "70%", marginLeft: "80px" }} onChange={handleInputChange}/>
            </FormGroup>

            <FormGroup>
              <Label for="price" hidden>Price</Label>
              <Input id="price" name="price" placeholder="Price" type="input" style={{ width: "70%", marginLeft: "80px" }} onChange={handleInputChange}/>
            </FormGroup>

            <FormGroup>
              <Label for="cuisine" hidden>Cuisine</Label>
              <Input id="cuisine" name="cuisine" placeholder="Cuisine" type="input" style={{ width: "70%", marginLeft: "80px" }}  onChange={handleInputChange}/>
            </FormGroup>

            <FormGroup>
              <Label for="menu" hidden>Menu</Label>
              <Input id="menu" name="menu" placeholder="Menu" type="input" style={{ width: "70%", marginLeft: "80px" }}  onChange={handleInputChange}/>
            </FormGroup>

            <FormGroup>
              <Label for="rating" hidden>Rating</Label>
              <Input id="rating" name="rating" placeholder="Rating" type="input" style={{ width: "70%", marginLeft: "80px" }}  onChange={handleInputChange}/>
            </FormGroup>

            <FormGroup>
              <Label for="image" hidden>Image</Label>
              <Input id="image" name="image" style={{ width: "70%", marginLeft: "80px" }}
               type="file" onChange={handleImageChange}/>
            </FormGroup>

            <Button className="submit" color="success" type="submit">update</Button>
            <Button className="submit" onClick={() => navigate('../Menu', { state: { responseData: userData } })} color="primary">Menu</Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}

export default UpdateItem;