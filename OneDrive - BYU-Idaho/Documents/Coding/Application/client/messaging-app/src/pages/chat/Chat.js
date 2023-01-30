import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card, Row } from 'react-bootstrap';
import Contacts from '../../components/contacts/Contacts';
import Chatbox from '../../components/chat/Chatbox';
import Chatroom from '../../components/chat/Chatroom'

export default function Chat() {

  const [contactsCollection, setContactsCollection] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [name, setName] = useState([])
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  let convoId = currentChat._id;

  // console.log(contactsCollection)

  let token = localStorage.accessToken
  useEffect(() => {
     // Get the user profile 
  const profile = async () => { 
    try {
      await fetch('http://localhost:4000/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json()).then(data => {  
               
      // Once you get the profile get the id
      let id = data._id;
      setUserId(id)
      fetch(`http://localhost:4000/conversations/connect/${id}`).then(res => res.json()).then(connect => {
        setConversation(connect)
      })
    })
    } catch (error) {
      console.log(error)
    }    
  }
    profile();
  },[])

 
  // Get all the all the users info to use as contacts 
  useEffect(() => {
    
    allUsers()
  },[])

  const allUsers = async () => {
    try {
      await fetch('http://localhost:4000/user/all-users').then(res => res.json()).then(contactsData => {
      setContactsCollection(contactsData.map(contactList => {   
        // console.log(contactList)   
        // setName(contactList)
        return(
          <Contacts key={contactList._id} contactsProp={contactList} />
        )
      }));
    });
    } catch (error) {
      console.log(error)
    }
  }
   

  useEffect(() => {    
    const getMessage = async () => {    
      try {
        await fetch(`http://localhost:4000/message/${convoId}`).then(res => res.json()).then(data => {
        setChat(data)
      })
      } catch (error) {
        console.log(error)
      }      
    } 
    getMessage();
  })
    
  // console.log(rcverId)

  const sendChat = async (event) => {    
    event.preventDefault()  
    let receiverId = conversation[0].users.find((user) => user !== userId)
    await fetch(`http://localhost:4000/message/messages/${receiverId}/${userId}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        conversationId: convoId,
        message: message
      })
    }).then(res => res.json()).then(message => {
      if (message) {
        setMessage(message);
      } else {
        return false
      }
    })    
    }
  

  return(
    <>
    <Container className="chatContainer">
      <Card id="chatCard">
        <Card.Body className='overflow-auto' id="cntctsCollection">
          {contactsCollection}
        </Card.Body>         

        <Card.Body className='overflow-auto' id="chatbox">
          {
            currentChat ?
            <>
            {chat.map((convo) =>(
              <Chatbox chat={convo} ownMsg={convo.sender === userId} names={contactsCollection} />
            ))}
            
            </>            
            :
            <span className="noConvo">Start a conversation</span>
          }       
        </Card.Body> 
        
        <Form className="txtareaForm" onSubmit={e => sendChat(e)}>
          <Form.Group className="textGrp">
            <Form.Control className="textarea" placeholder="Enter text here..." 
            value={message}  onChange={(event) => {setMessage(event.target.value)}} />
          </Form.Group>
          <Button type="submit" className="sndBtn" >Send</Button>
        </Form>

        <Card.Body className='overflow-auto' id="chatRoom">
          {conversation.map((c) => (
            <div onClick={() => setCurrentChat(c)} >
            <Chatroom conversation={c} currentUser={userId} />
            </div>
          ))}
        </Card.Body>        
        </Card>        
    </Container>

    </>
  )
}

// Create profile page
// Function for duplicate email
// Logout funtion
// Update name
// Notification
// Options for contacts (check profile)
// Create error page for non existing page
// Create all convo secton
// Create contacts page and option to chat
// Get friends id and compare it to the current user; diplay the names right after
// Use a welcome page in the chat box
