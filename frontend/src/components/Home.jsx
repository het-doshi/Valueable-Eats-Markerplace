import React, { useState, useEffect } from "react";
import Header from "./Header";
import '../Styles/home.css';
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";
import FoodItemCard from './FoodItemcard'
// import { Button } from "reactstrap";

function Home(props) {
    const location = useLocation();
    const responseData = location.state.responseData;
    const name = responseData.data.name;
    const owner = responseData.data._id;
    const city = responseData.data.city;
    const restaurant = responseData.data.restaurantName;
    const [selectedItems, setSelectedItems] = useState([]);

    

    function CreateItemCard(data) {
        return (
            <>
            
            <FoodItemCard
                key={data._id}
                image={data.image}
                item={data.item}
                price={data.price}
                cuisine={data.cuisine}
            />
                  <br />
            </>
            
        );
    }

    useEffect(() => {
        const fetchSelectedItems = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/menu/filter?owner=${owner}&city=${city}`); // Corrected template literal
                setSelectedItems(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSelectedItems();
    }, [owner,city]); 

    return (
        <>
            <Header />
            <div className="name">Welcome {name}!</div>
            <div className="displayitems">Displaying All Items...</div>
            <Sidebar responseData={responseData} />
            <div className="restaurant">{restaurant} Dashboard's</div>
            <div className="breakfastItems">
            {selectedItems && selectedItems.length > 0 && selectedItems.map(item => CreateItemCard(item))}
            </div>
        </>
    );
}

export default Home;
