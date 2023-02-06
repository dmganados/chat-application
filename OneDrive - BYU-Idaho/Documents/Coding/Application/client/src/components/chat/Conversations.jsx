import {useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function Conversations({convoId, user, socket, friend}) {
    
    const [convo, setConvo] = useState([]);
    const [message, setMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    console.log(arrivalMessage?.sender)

    // Get the the previous convo
    useEffect(() => {
        fetch(`http://localhost:4000/message/messages/${convoId}`).then(res => res.json()).then(data => {
            setConvo(data)
          })
      },[convoId])    

    // Send new message
    // Textarea and buttons to send message
    const sendChat = async (event) => { 
        event.preventDefault()  
        const chatSent = await fetch(`http://localhost:4000/message/messages/${user._id}`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            conversationId: convoId,
            message: message
          })
        }).then(res => res.json()).then(sent => {      
          if (sent) {    
            setMessage('')
          } else {
            return false
          }
        })
        
        // let receiverId = friend?.users.find(mate => mate !== user._id)
        socket.current.emit("sendMessage", {
          senderId: user._id,
          receiverId: friend,
          message: message,
        })
        }

    useEffect(() => {
      socket.current.on("getMessage", data => {
        setArrivalMessage({
          sender: data.senderId,
          message: message,
          createdAt: Date.now(),
        })
      })
    },[])

    // useEffect(() => {
    //   arrivalMessage
    // },[arrivalMessage])

    return(
        <>
        <Form className="txtareaForm">
            <Form.Group className="textGrp">
                <Form.Control
                type="text"                
                placeholder="Write something..." 
                value={message}
                onChange={event => setMessage(event.target.value)}
                />
            </Form.Group>
              <Button onClick={e => sendChat(e)} type="submit" >Send</Button>
        </Form>
        </>
    )
}
