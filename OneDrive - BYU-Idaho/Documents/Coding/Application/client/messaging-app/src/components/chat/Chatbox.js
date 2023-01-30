import { Container, Form, Button } from "react-bootstrap"
import { useState, useEffect } from "react";
import {format} from 'timeago.js'

export default function Chatbox({chat, ownMsg}) {
    // console.log(moment(chat.createdAt).fromNow())
    // console.log(chat)
    return(
        <>
            <div className={ownMsg ? "messageBox ownMsg" : "messageBox"}>                               
                <div className="frndName">Friend Name</div>  
                <div className="message"><p className="text">{chat.message}</p></div>
                <div className="time">{format(chat.createdAt)}</div>
            </div>   
        </>
    )
}