import React, {useState, useEffect} from 'react'
import {format} from 'timeago.js'

export default function Chatbox({chat, ownMsg, currentUser, socketIO})  {
    const [message, setMessage] = useState([]);
    const [update, setUpdate] = useState(false);
    // console.log(chat)

    useEffect(() => {
        socketIO.current.on()
    })

    const toggleEditMode = () => {
        setUpdate(!update);
    }

    const deleteHandler = async() => {
        let del = await fetch(`http://localhost:4000/message/messages/delete/${chat._id}`,{
            method: "DELETE"
        }).then(res => res.json()).then(removed => {
            if (removed) {
                socketIO.current.emit('delete', chat._id);
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

    const closeHandler = async () => {
        setUpdate(false);
    }
       
    return(
        <>
            <main id='auto-scroll' className={ownMsg ? "messageBox ownMsg" : "messageBox"}>
                <div className="message">
                    {update ? 
                        (
                            <textarea className='editArea' value={message} onChange={(e) => setMessage(e.target.value)} />
                        ) 
                        :
                        (
                            <p className="text">{chat.message}</p>
                        )
                    }
                </div>
                <div className='functions'>
                    {chat.sender === currentUser && (
                        <span id="delete" onClick={deleteHandler}>Delete</span>
                    )}
                    {chat.sender === currentUser && (
                        <span id="edit" onClick={toggleEditMode}>Edit</span>
                    )}
                    {update && ( 
                        <button className='checkBtn' onClick={editHandler}>&#x2713;</button>
                    )}
                    {update && ( 
                        <button className='checkBtn' onClick={closeHandler}>X</button>
                    )}
                    
                </div>
                <div className="time">{format(chat.createdAt)}</div>
            </main>   
        </>
    );
}