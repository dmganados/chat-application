import React, {useState, useEffect} from 'react'
import {format} from 'timeago.js'

export default function Chatbox({chat, mychat,  ownMsg})  {
    const [conversation, setConversation] = useState([]);
    // console.log(chat.message)

    useEffect(() => {
        let com = chat.map((convo) => {
            setConversation(convo)
        })
    },[chat]);
       
    return(
        <>
            {/* <span>Conversation</span> */}
            <main id='auto-scroll' className={ownMsg ? "messageBox ownMsg" : "messageBox"}>                               
                <div className="frndName">Friend</div>  
                <div className="message"><p className="text">{chat.message}</p></div>
                <div className="time">{format(chat.createdAt)}</div>
            </main>   
        </>
    )
   
}
