import React, { useState, useEffect, useRef} from "react";
import { Form, Button, Container, Card, Row } from 'react-bootstrap';
import Contacts from '../../components/contacts/Contacts';
import Chatbox from '../../components/chat/Chatbox';
import Chatroom from '../../components/chat/Chatroom'
import ChatBanner from "../../components/chat/Chatbanner";
import ReactScrollableFeed from 'react-scrollable-feed';
import {io} from "socket.io-client"

export default function Chat() {

  const [contactsCollection, setContactsCollection] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [chat, setChat] = useState([]);
  const [reatimeChat, setRealtimeChat] = useState([]);
  const [message, setMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [userId, setUserId] = useState('');
  const socket = useRef();
  // const [socket, setSocket] = useState(null)
  let convoId = currentChat?._id;
  let token = localStorage.accessToken;
  console.log(chat)

  useEffect(() => {
    socket.current = io("ws://localhost:4000")
  },[])
 
  useEffect(() => {
    socket.current.emit("addUser", currentUser._id)
    socket.current.on("getUsers", users => {
      console.log(users)
    })
  },[currentUser])

  // console.log(socket)
  useEffect(() => {    
    profile();
    allUsers();    
    redirect();
  },[])

  // useEffect(() => {
  //   if(currentUser) {
  //     socket.current = io('http://localhost:4000');
  //     socket.current.emit("addUser", currentUser._id)
  //   }    
  // },[currentUser]);

  // useEffect(() => {
  //   socket.current = io("ws://localhost:4000")
  //   socket.current.on("getMessage", data => {
  //     setIncomingMessage({
  //       sender: data.senderId,
  //       message: data.message,
  //       createdAt: Date.now()
  //     })
  //   })
  // },[])

  // useEffect(() => {
  //   incomingMessage && currentChat?.members.includes(incomingMessage.sender) &&
  //   setMessage((prev) => [...prev, incomingMessage])
  // },[incomingMessage, currentChat])

  // useEffect(() => {
  //   socket.current.emit("addUser", userId);
  //   socket.current.on("getUsers", users => {
  //     console.log(users)
  //   })
  // },[userId])


  // The user will be sent back to login page if he tries to access chat page without loging in. 
  const redirect = () => {
    if (!token) {
      window.location.href ="/login"
    }
  }

  // Get the user profile
  const profile = async () => { 
    try {
      await fetch('http://localhost:4000/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json()).then(data => {  
      setCurrentUser(data)
      // Once you get the profile get the id to use as a reference of all its conversations
      let id = data._id;
      setUserId(id)
      fetch(`http://localhost:4000/conversations/connect/${id}`).then(res => res.json()).then(connect => {
        console.log(connect)
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

  
  // Create send button function
  // After the user enters/submit his/her message, a new message will be created.
  const sendChat = async (event) => { 
    event.preventDefault()  
    const chatSent = await fetch(`http://localhost:4000/message/messages/${currentUser._id}`,{
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

    let friendId = conversation.users.find((user) => user !== currentUser._id);
    
    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId: friendId,
      message
    })    
    }

    useEffect(() => {
      socket.current.on("getMessage", data => {
        setArrivalMessage({
          sender: data.senderId,
          message: data.message,
          createdAt: Date.now()
        })
      })
    })

    useEffect(() => {
      arrivalMessage && conversation?.users.includes(arrivalMessage.sender) && setChat((prev) => [...prev, arrivalMessage])
    },[arrivalMessage, conversation]);

  //  Create a section for all chat interactions of the user
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


    // useEffect(() => {      
    //   let ownMessage = chat.map((convo) => {
    //     if(convo.sender === userId) {
    //       return true
    //     }
    //     // console.log(convo)
    //   })

    //   if(socket.current) {
    //     socket.current.on("message-receive", (message) => {
    //       console.log(message)
    //       setArrivalMessage({ ownMessage: false, message: message })
    //       // check later
    //     }) 
    //   }
    // },[])

    // useEffect(() => {
    //   arrivalMessage && setMessage((prev) => [...prev, arrivalMessage]);
    // },[arrivalMessage])

    

  return(
    <>
    <Container className="chatContainer">
      <Card id="chatCard">
        {/* Chat Banner Section */}
        {/* Create a section where a the name of a friend you currently chatting with is diplayed. This is diplayed in the banner of the chat*/}
        {
          // If there is no friend selected, the name will not be diplayed in the banner.
          currentChat?          
            <>
              <Card.Body className="bannerBody">
                <ChatBanner activeChat={currentChat?.users} myId={currentUser._id} />
              </Card.Body>
            </>
          :
            <></>
        }
        
        {/* Contact List Section */}
        {/* Display all the people registered in the app. This is also the contact list */}
        <Card.Body className='overflow-auto' id="cntctsCollection">
          {contactsCollection}
        </Card.Body>         

        {/* Chat Section */}
        
        <Card.Body className='overflow-auto' id="chatbox">
        
          {            
            currentChat?
              <ReactScrollableFeed>               
                {chat.map((convo) =>(                       
                    <Chatbox chat={convo} ownMsg={convo.sender === currentUser._id} socket={socket} />                   
                ))}               
                
              </ReactScrollableFeed>                       
            :
              
              <span className="noConvo">Start a conversation</span>
              
          }       
          
        </Card.Body> 
        

        {/* Text area and Button */}
        {
          currentChat?
            <>
            <Form className="txtareaForm">
              <Form.Group className="textGrp">
                <Form.Control
                type="text"                
                placeholder="Write something..." 
                value={message}
                onChange={event => setMessage(event.target.value)}
                className="textarea"
                />
              </Form.Group>
              <Button onClick={e => sendChat(e)} type="submit" className="sndBtn" >Send</Button>
            </Form>
            </>
          :
            <></>
        }

        {/* Inbox / All the conversations of the user */}
        <Card.Body className='overflow-auto' id="chatRoom">
          {conversation.map((c) => (
            <div onClick={() => setCurrentChat(c)} >
            <Chatroom conversation={c} currentUser={currentUser._id} />
            </div>
          ))}
        </Card.Body>        
        </Card>        
    </Container>
    </>
  )
}

// Create profile page
// Create an update function
// Create a delete function
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
// The user can switch friends to send message
// The user can also send message to a friend that is not from the inbox
// Uninstall axios
// https://www.youtube.com/watch?v=otaQKODEUFs   3:50
// https://www.youtube.com/watch?v=NU-HfZY3ATQ