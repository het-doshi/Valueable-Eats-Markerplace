import React, { useState, useEffect } from "react";
import Header from './Header';
import Sidebar from "./Sidebar";
import '../Styles/home.css';
import '../Styles/menu.css';
import { useLocation, useNavigate } from "react-router-dom";
import { Table, Button } from "reactstrap";
import axios from 'axios'; 


function Menu() {
    const location = useLocation();
    const responseData = location.state.responseData;
    const name = responseData.data.name;
    const owner = responseData.data._id;
    const city = responseData.data.city;
    const restaurantName = responseData.data.restaurantName;
    const navigate = useNavigate();

    const [selectedItems, setSelectedItems] = useState([]);
    const [refreshsItem, setrefreshsItem] = useState([]);
   
    const refresh = ()=> {
        setrefreshsItem(refreshsItem)
    }

    useEffect(() => {
        const fetchSelectedItems = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/menu?owner=${owner}&city=${city}`);
                setSelectedItems(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSelectedItems();
    }); 

    const handleDeleteClick = async (item) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/menu?item=${item.name}&city=${city}`);
            console.log(response.data)
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <>
            <Header />
            <Sidebar responseData={responseData} />
            <div className="name">Welcome {name}!</div>
            <div className="resName">{restaurantName} serves...</div>
            <div className="menu">Menu Section</div>

            <div className="display">
                <Table hover className="dishTable">
                    <thead>
                        <tr>
                            <th className="text-center">Dish Name</th>
                            <th className="text-center">Cuisine</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Menu</th>
                            <th className="text-center">Rating</th>
                            <th className="text-center">Update / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedItems.map((item) => (
                            <tr key={item._id}>
                                <td className="text-center">{item.name}</td>
                                <td className="text-center">{item.cuisine}</td>
                                <td className="text-center">{item.price}</td>
                                <td className="text-center">{item.menu}</td>
                                <td className="text-center">{item.rating}</td>
                                <td className="text-center">
                                    <Button className="update" onClick={() => navigate('./UpdateItem', { state: { userData: responseData, item:item } })} size="sm" color="primary"> Update </Button>
                                    <Button className="delete" onClick={() => { handleDeleteClick(item) }} size="sm" color="danger"> Delete </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Button className="insert" onClick={() => navigate('./InsertDish', { state: { userData: responseData } })} color="success"> Insert Item </Button>
            <Button className="refresh" onClick={refresh} > Refresh Items </Button>
        </>
    );
}

export default Menu;