import React from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/sidebar.css'

function Sidebaritems(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(props.path, { state: { responseData: props.responseData } });
    };

    return (
        <li className="itembody" onClick={handleClick}>
            <div className="icon">{props.icon}</div>
            <div className="ititle">{props.title}</div>
        </li>
    );
}

export default Sidebaritems;
