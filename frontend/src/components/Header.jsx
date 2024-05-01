import React from "react";
import '../Styles/header.css'
import logo from './logo.png'
import UserIcon from '@mui/icons-material/AccountCircleOutlined';



function Header(){
     return(
        <>
        <div className="header">
           <img className="logo" src={logo} alt="logo.png"/>
           <div className="title">Valuable Eat's Marketplace</div>
           <UserIcon className="usericon" fontSize="large"/>
        </div>
        </>
     )
}

export default Header