import React from "react";
import '../Styles/sidebar.css'
import Sidebaritems from "./Sidebaritems";
import data from './sidebarData.js'

function CreateItem(data, responseData) {
    return (
      <Sidebaritems
        key={data.id}
        title={data.title}
        icon={data.icon}
        path={data.path}
        responseData={responseData}
      />
    );
}

function Sidebar(props){
    const { responseData } = props

    return(
        <div className="sidebarBody">
            {data.map(item => CreateItem(item, responseData))}
        </div>
   )
}

export default Sidebar;
