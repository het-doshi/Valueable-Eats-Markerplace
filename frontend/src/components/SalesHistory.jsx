import React, { useState, useEffect } from "react";
import Header from './Header'
import Sidebar from "./Sidebar";
import '../Styles/home.css'
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Table } from "reactstrap";

function SalesHistory() {
    const location = useLocation();
    const responseData = location.state.responseData;
    const name = responseData.data.name;
    const owner = responseData.data._id;

    const [selectedItems, setSelectedItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        const fetchSelectedItems = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/sales?owner=${owner}`);
                setSelectedItems(response.data);
                calculateTotalQuantity(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSelectedItems();
    }, [owner]); // Dependency added to useEffect

    const calculateTotalQuantity = (items) => {
        const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
        setTotalQuantity(totalQuantity);
    };

    return (
        <>
            <Header />
            <Sidebar responseData={responseData} />
            <div className="name">Welcome {name}!</div>
            <div className="sales">Sales...</div>

            <div className="display">
                <Table hover className="dishTable">
                    <thead>
                        <tr>
                            <th className="text-center">Name</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedItems.map((item) => (
                            <tr key={item._id}>
                                <td className="text-center">{item.name}</td>
                                <td className="text-center">{item.date}</td>
                                <td className="text-center">{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2" className="text-center"><strong>Total:</strong></td>
                            <td className="text-center"><strong>{totalQuantity}</strong></td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        </>
    )
}

export default SalesHistory;
