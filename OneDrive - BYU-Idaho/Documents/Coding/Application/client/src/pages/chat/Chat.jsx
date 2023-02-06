import React, { useState, useEffect, useRef} from "react";
import { Form, Button, Container, Card, Row, Col, Tab, Tabs, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Contacts from '../../components/contacts/Contacts';
import Chatbox from '../../components/chat/Chatbox';
import Notification from '../../components/notification/Notification'
import Chatroom from '../../components/chat/Chatroom'
import ChatBanner from "../../components/chat/Chatbanner";
import Conversations from "../../components/chat/Conversations";
import ReactScrollableFeed from 'react-scrollable-feed';
import {io} from "socket.io-client"


export default function Chat() {

  const [contactsCollection, setContactsCollection] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [chat, setChat] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [message, setMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [userId, setUserId] = useState('');
  const [socket, setSocket] = useState(null);
  // const socket = useRef(io("http://localhost:4000"));
  let convoId = currentChat?._id;
  let token = localStorage.accessToken;
  let userName = `${currentUser.firstName} ${currentUser.lastName}`;
  let receiver = currentChat?.users.find(mate => mate !== currentUser._id)

  useEffect(() => {
    setSocket(io("http://localhost:4000")) 
  },[])

  useEffect(() => {   
    socket?.current.emit("addUser", currentUser._id); 
    socket?.current.on("getUsers", users => {
      console.log(users);
    })
  },[]);


  useEffect(() => {    
    profile();
    allUsers();    
    redirect();
  },[])


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
        fetch(`http://localhost:4000/message/messages/${convoId}`).then(res => res.json()).then(data => {
          setNewMessage(data)
        })        
        setMessage('')
      } else {
        return false
      }
    })     
    }

    // useEffect(() => {
    //   arrivalMessage && conversation?.users.includes(arrivalMessage.sender) && setChat((prev) => [...prev, arrivalMessage])
    // },[arrivalMessage, conversation]);

  //  Create a section for all chat interactions of the user
  useEffect(() => {
    const getMessage = async () => {    
      try {
        await fetch(`http://localhost:4000/message/messages/${convoId}`).then(res => res.json()).then(data => {
        setChat(data)
      })
      } catch (error) {
        console.log(error)
      }      
    } 
    getMessage()
  },[convoId])
    

  return(
    <div className="main">  
        <Navbar className="topCard">
          <Navbar.Collapse className="navItems">
          <NavDropdown title={userName} className="navigation">
            {/* Change hover color */}
            <NavDropdown.Item>Profile</NavDropdown.Item>
            <NavDropdown.Item>Logout</NavDropdown.Item>
          </NavDropdown >
          </Navbar.Collapse>
          
        </Navbar>
        <div className="bannerContainer">
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
        </div>
       
      <Card className="leftSection">
        <Tab.Container defaultActiveKey="first">          
              <Nav className="menu">
                <Nav.Item id="chat" >
                  <Nav.Link eventKey="first" className="chatLink" >Chat</Nav.Link>
                </Nav.Item>
                <Nav.Item  id="contacts" >
                  <Nav.Link eventKey="second" className="chatLink" >Contacts</Nav.Link>
                </Nav.Item>
                <Nav.Item id="notification" >
                  <Nav.Link eventKey="third" className="chatLink" >Notification</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content className="overflow-auto tabContent">
                <Tab.Pane eventKey="first">
                {conversation.map((c) => (    
                  <div onClick={() => setCurrentChat(c)} >              
                  <Chatroom conversation={c} currentUser={currentUser._id} />   
                  </div>               
                ))}
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  {contactsCollection}                
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <Notification />
                </Tab.Pane>
              </Tab.Content>                       
        </Tab.Container>
      </Card>
      {/* Create section for the chatbox. 
      In this section, the user can see the name of his friend, can write message, and send (optional: can edit and delete message) */}
      
        <Card className="overflow-auto  chatbox">
          {/* {            
            currentChat?
              <ReactScrollableFeed className="chatDiv">               
                {chat.map((convo) =>(                       
                    <Chatbox chat={convo} ownMsg={convo.sender === currentUser._id} socket={socket} />                   
                ))}               
                
              </ReactScrollableFeed>                       
            :              
              <span className="noConvo">Start a conversation</span>              
          }      */}
          <Conversations convoId={convoId} user={currentUser} socket={socket} friend={receiver} />
          
        </Card>
      
    </div>
    // <>
    // <Container className="chatContainer">
    //   <Card id="chatCard">
    //     {/* Chat Banner Section */}
    //     {/* Create a section where a the name of a friend you currently chatting with is diplayed. This is diplayed in the banner of the chat*/}
    //     {
    //       // If there is no friend selected, the name will not be diplayed in the banner.
    //       currentChat?          
    //         <>
    //           <Card.Body className="bannerBody">
    //             <ChatBanner activeChat={currentChat?.users} myId={currentUser._id} />
    //           </Card.Body>
    //         </>
    //       :
    //         <></>
    //     }
        
    //     {/* Contact List Section */}
    //     {/* Display all the people registered in the app. This is also the contact list */}
    //     <Card.Body className='overflow-auto' id="cntctsCollection">
    //       {contactsCollection}
    //     </Card.Body>         

    //     {/* Chat Section */}
        
    //     <Card.Body className='overflow-auto' id="chatbox">
        
    //       {            
    //         currentChat?
    //           <ReactScrollableFeed>               
    //             {chat.map((convo) =>(                       
    //                 <Chatbox chat={convo} ownMsg={convo.sender === currentUser._id} socket={socket} />                   
    //             ))}               
                
    //           </ReactScrollableFeed>                       
    //         :
              
    //           <span className="noConvo">Start a conversation</span>
              
    //       }       
          
    //     </Card.Body> 
        

    //     {/* Text area and Button */}
    //     {
    //       currentChat?
    //         <>
    //         <Form className="txtareaForm">
    //           <Form.Group className="textGrp">
    //             <Form.Control
    //             type="text"                
    //             placeholder="Write something..." 
    //             value={message}
    //             onChange={event => setMessage(event.target.value)}
    //             className="textarea"
    //             />
    //           </Form.Group>
    //           <Button onClick={e => sendChat(e)} type="submit" className="sndBtn" >Send</Button>
    //         </Form>
    //         </>
    //       :
    //         <></>
    //     }

    //     {/* Inbox / All the conversations of the user */}
    //     <Card.Body className='overflow-auto' id="chatRoom">
    //       {conversation.map((c) => (
    //         <div onClick={() => setCurrentChat(c)} >
    //         <Chatroom conversation={c} currentUser={currentUser._id} />
    //         </div>
    //       ))}
    //     </Card.Body>        
    //     </Card>        
    // </Container>
    // </>
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