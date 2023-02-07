import React, {useState, useEffect} from 'react'
import {format} from 'timeago.js'

export default function Chatbox({chat, ownMsg, currentUser})  {
    const [message, setMessage] = useState([]);
    const [update, setUpdate] = useState(false);

    const toggleEditMode = () => {
        setUpdate(!update);
    }

    const deleteHandler = async(event) => {
        event.preventDefault();
        let del = await fetch(`http://localhost:4000/message/messages/delete/${chat._id}`,{
            method: "DELETE"
        }).then(res => res.json()).then(removed => {
            if (removed) {
                return true;
            } else {
                return false;
            }
        });
    };

    const editHandler = async(event) => {
        event.preventDefault();
        let update = await fetch(`http://localhost:4000/message/messages/update/${chat._id}`, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                message:message
            })
        }).then(res => res.json()).then(newMsg => {
            setUpdate(false);
        })
    }
       
    return(
        <>
            <main id='auto-scroll' className={ownMsg ? "messageBox ownMsg" : "messageBox"}>
                <div className="message">
                    {update ? 
                        (
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
                        ) 
                        :
                        (
                            <p className="text">{chat.message}</p>
                        )
                    }
                </div>
                <div className='functions'>
                    {chat.sender === currentUser && (
                        <span className={ownMsg} id="delete" onClick={deleteHandler}>Delete</span>
                    )}
                    {chat.sender === currentUser && (
                        <span className={ownMsg} id="edit" onClick={toggleEditMode}>Edit</span>
                    )}
                    {update && (
                        <button onClick={editHandler}>Save</button>
                    )}
                </div>
                <div className="time">{format(chat.createdAt)}</div>
            </main>   
        </>
    );
}