import React, { useState, useEffect } from "react";
import Header from './Header';
import Sidebar from "./Sidebar";
import axios from "axios";
import { Table, Button } from "reactstrap";
import { useLocation} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import '../Styles/order.css'

function Orders() {
    const location = useLocation();
    const responseData = location.state.responseData;
    const name = responseData.data.name;
    const owner = responseData.data._id;

    const [selectedOrders, setSelectedOrders] = useState([]);

    useEffect(() => {
        const fetchSelectedOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/orders?owner=${owner}`);
                setSelectedOrders(response.data);
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchSelectedOrders();
    }, [owner]); 


    const salesEntry = async (order, item) => {
        const orderentry = {
            date: order.order_date,
            name: item.Itemname,
            quantity: item.quantity,
            price: item.Price
        };
    
        try {
            const response = await axios.post(`http://localhost:4000/api/sales?owner=${owner}`, orderentry);
            console.log("Response Data:", response.data); 
            toast.success('orderd has been recorded')
        } catch (error) {
            console.error("Error:", error);
            toast.error('orderd has been failed to record')
        }
    };


    const paymentEntry = async (order, item) => {
        const paymentEntry = {
            date: order.order_date,
            name: item.Itemname,
            quantity: item.quantity,
            price: item.Price
        };
    
        try {
            const response = await axios.post(`http://localhost:4000/api/payments?owner=${owner}`, paymentEntry);
            console.log("Response Data:", response.data); 
            toast.success('payment has been recorded')
        } catch (error) {
            console.error("Error:", error);
            toast.error('payment has been failed to record')
        }
    };
    
    return (
        <>
         <ToastContainer/>
            <Header />
            <Sidebar responseData={responseData} />
            <div className="name">Welcome {name}!</div>
            <div className="orders">Upcoming orders...</div>

            <div className="display">
                <Table hover bordered className="orderTable">
                    <thead>
                        <tr>
                            <th className="text-center">User ID</th>
                            <th className="text-center">Order Date</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Order Status</th>
                            <th className="text-center">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedOrders.map((order) => (
                            order.items.map((item, index) => (
                                <tr key={`${order._id}-${index}`}>
                                    <td className="text-center">{order.user_id}</td>
                                    <td className="text-center">{order.order_date}</td>
                                    <td className="text-center">{item.Itemname}</td>
                                    <td className="text-center">{item.Price}</td>
                                    <td className="text-center">{item.quantity}</td>
                                    <td className="text-center">
                                        <Button className="complete" color="success"  onClick={() => { salesEntry(order,item) }} size="sm"> Mark as done </Button>
                                    </td>
                                    <td className="text-center">
                                        <Button className="complete" color="success" onClick={() => { paymentEntry(order,item) }} size="sm"> Mark as done </Button>
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Orders;