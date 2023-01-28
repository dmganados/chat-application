import { Container, Form, Button } from "react-bootstrap"
import { useState, useEffect } from "react";

export default function Chatbox({ownMsg}) {

    return(
        <>
            <div className={ownMsg ? "messageBox ownMsg" : "messageBox"}>                               
                <div className="frndName">Friend Name</div>  
                <div className="message"><p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div>
                <div className="time">1 hour ago</div>
            </div>   
        </>
    )
}