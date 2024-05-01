import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login"
import Registration from "./components/Registration";
import Home from "./components/Home";
import  Menu  from "./components/Menu";
import Orders from "./components/Orders"
import SalesHistory from "./components/SalesHistory"
import Payment from "./components/Payment";
import InsertDish from "./components/InsertDish"
import UpdateItem from "./components/UpdateItem";
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Registration" element={<Registration/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Payment" element={<Payment/>}/>
        <Route path="/SalesHistory" element={<SalesHistory/>}/>
        <Route path="/Orders" element={<Orders/>}/>
        <Route path="/Menu" element={<Menu/>}/>
        <Route path="/Menu/InsertDish" element={<InsertDish/>}/>
        <Route path="/Menu/UpdateItem" element={<UpdateItem/>}/>
        <Route path="/Profile" element={<Profile/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
