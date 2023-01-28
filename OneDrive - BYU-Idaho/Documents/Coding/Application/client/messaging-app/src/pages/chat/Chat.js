import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Contacts from '../../components/contacts/Contacts';
import Chatbox from '../../components/chat/Chatbox';
import Chatroom from '../../components/chat/Chatroom'

export default function Chat() {

  const [contactsCollection, setContactsCollection] = useState([]);
  const [message, setMessage] = useState('');
  const [receiverId, setReceiver] = useState('');
  const [chatbox, setChatbox] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [conversation, setConversation] = useState([])
  const [userId, setUserId] = useState('')
  // console.log(userId);
  // console.log(conversation)
  let token = localStorage.accessToken
  useEffect(() => {
    // Get the user profile 
    let profile = () => { 
      try {
        fetch('http://localhost:4000/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => res.json()).then(data => {
        setUserId(data._id)        
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
    profile()
  },[])

  useEffect(() => {  
    fetch('http://localhost:4000/user/all-users').then(res => res.json()).then(contactsData => {
      setContactsCollection(contactsData.map(contactList => {      
        return(
          <Contacts key={contactList._id} contactsProp={contactList} />
        )
      }));
    });
  },[]);

  const sendChat = async (event) => {  
    event.preventDefault()
    let userId = localStorage.accessToken;
    const isSent = await fetch('http://localhost:4000/message/messages', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userId}`
        },
        body: JSON.stringify({
          message: message,
          receiverId: receiverId
        })
      }).then(res => res.json()).then(convo => {
        console.log(convo)
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
          
          <Chatbox />
          <Chatbox ownMsg={true} />
          <Chatbox />      
        </Card.Body> 

        <Form onSubmit={e => sendChat(e)} className="txtareaForm">
          <Form.Group className="textGrp">
            <Form.Control as="textarea" className="textarea" placeholder="Enter text here..." value={message} onChange={e => setMessage(e.target.value)} />
          </Form.Group>
          <Button type="submit" className="sndBtn">Send</Button>
        </Form>
        </Card>

        <Card.Body className='overflow-auto' id="chatRoom">
          {conversation.map((c) => (
            <Chatroom conversation={c} currentUser={userId} />
          ))}
          
        </Card.Body>

        
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
