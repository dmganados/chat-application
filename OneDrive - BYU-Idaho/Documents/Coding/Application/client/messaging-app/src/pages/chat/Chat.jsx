import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card, Row } from 'react-bootstrap';
import Contacts from '../../components/contacts/Contacts';
import Chatbox from '../../components/chat/Chatbox';
import Chatroom from '../../components/chat/Chatroom'
import ChatBanner from "../../components/chat/Chatbanner";
import {io} from "socket.io-client"

export default function Chat() {

  const [contactsCollection, setContactsCollection] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [nameId, setNameId] = useState([]);
  const [chat, setChat] = useState([]);
  const [friendName, setFriendName] = useState('') 
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [socket, setSocket] = useState(null);
  let convoId = currentChat._id;
  let token = localStorage.accessToken 
  console.log(currentChat)
  
  useEffect(() => {    
    allUsers();
    profile();
    // chatMate();
    redirect();
  },[])

  // The user will be sent back to login page if he tries to access chat page without loging in. 
  const redirect = () => {
    if (!token) {
      window.location.href ="/login"
    }
  }

  useEffect(() => {
    setSocket(io("ws://localhost:4000"))
  },[])

  // Get the user profile
  const profile = async () => { 
    try {
      await fetch('http://localhost:4000/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json()).then(data => {  
               
      // Once you get the profile get the id to use as a reference of all its conversations
      let id = data._id;
      setUserId(id)
      fetch(`http://localhost:4000/conversations/connect/${id}`).then(res => res.json()).then(connect => {
        // console.log(connect)
        setConversation(connect)
      })
    })
    } catch (error) {
      console.log(error)
    }    
  }

  // Get all the all the users info to use as contacts 
  const allUsers = async () => {
    try {
      await fetch('http://localhost:4000/user/all-users').then(res => res.json()).then(contactsData => {
      setContactsCollection(contactsData.map(contactList => {   
        return(
          <Contacts key={contactList._id} contactsProp={contactList} />
        )
      }));
    });
    } catch (error) {
      console.log(error)
    }
  }
   
  // Create a section for all chat interactions of the user
  useEffect(() => {
    const getMessage = async () => {    
      try {
        await fetch(`http://localhost:4000/message/messages/${convoId}`).then(res => res.json()).then(data => {
          // console.log(data)
        setChat(data)
      })
      } catch (error) {
        console.log(error)
      }      
    } 
    getMessage()
  },[convoId])
     

  // Create a section where a the name of a friend you currently chatting with is diplayed.
  // Get user Id, then get profile information to diplay the name 
  // let friendId = conversation.users.find((id) => id !== userId )
  // let frnd = currentChat.users.find((friend) => friend !== userId)
  // console.log(friendId)
  const chatBanner = async () => {
    
    // console.log(name)
    

    // await fetch(`http://localhost:4000/user/profile/${friendId}`).then(res => res.json()).then(name => {
    //   console.log(name)
      // setFriendName(name)
    // })

  }


  // Create send button function
  // The user can switch friends to send message
  // The user can also send message to a friend that is not from the inbox
  const sendChat = async (event) => {   
    event.preventDefault()  
    // let receiverId = conversation[0].users.find((user) => user !== userId)
    const chatSent = await fetch(`http://localhost:4000/message/messages/${userId}`,{
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

    if (chatSent) {
      setMessage('')
    }
    
    }
  

  return(
    <>
    <Container className="chatContainer">
      <Card id="chatCard">
        <Card.Body className="bannerBody">
          <ChatBanner />
        </Card.Body>
        <Card.Body className='overflow-auto' id="cntctsCollection">
          {contactsCollection}
        </Card.Body>         

        <Card.Body className='overflow-auto' id="chatbox">
          {            
            currentChat ?
              <>
                {chat.map((convo) =>(
                  <Chatbox chat={convo} ownMsg={convo.sender === userId} />
                ))}
              </>                        
            :
              <>
              <span className="noConvo">Start a conversation</span>
              </>
          }       
        </Card.Body> 
        
        <Form className="txtareaForm" onSubmit={e => sendChat(e)}>
          <Form.Group className="textGrp">
            <Form.Control as="textarea" className="textarea" placeholder="Enter text here..." 
            value={message}  onChange={(event) => setMessage(event.target.value)} />
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
// Change the logo of the app
// Try the register form