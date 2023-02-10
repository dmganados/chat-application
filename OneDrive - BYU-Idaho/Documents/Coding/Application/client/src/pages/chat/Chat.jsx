import React, { useState, useEffect, useRef} from "react";
import { Form, Button, Card, Tab, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Contacts from '../../components/contacts/Contacts';
import Chatbox from '../../components/chat/Chatbox';
import Notification from '../../components/notification/Notification'
import Chatroom from '../../components/chat/Chatroom'
import ChatBanner from "../../components/chat/Chatbanner";
import ReactScrollableFeed from 'react-scrollable-feed';
import {io, Socket} from "socket.io-client"


export default function Chat() {

  const [contactsCollection, setContactsCollection] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [isFilled, setIsFilled] = useState(false);
  let convoId = currentChat?._id;
  let token = localStorage.accessToken;
  let userName = `${currentUser.firstName} ${currentUser.lastName}`;
  const socket = useRef();

  // console.log(convoId)

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
        let user = currentUser._id
        // let socketIo = socket
        return(
          <Contacts key={contactList._id} contactsProp={contactList} currentUser={user} socket={socket} />                  
        )
      }));
    });
    } catch (error) {
      console.log(error)
    }
  }

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

  // Integrate the websocket for real time chat
  useEffect(() => {
    socket.current = io("ws://localhost:4000");
    socket.current.emit("addUser", currentUser._id); 
    socket.current.on("getUsers", users => {console.log(users)})    
  },[currentUser])

  // Create send handler
  // After the user enters/submit his/her message, a new message will be created.
  const handleSendChat = async (event) => { 
    event.preventDefault() 
    if(currentChat){
      await fetch(`http://localhost:4000/message/messages/${currentUser._id}`,{
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
    }    
    let receiver = currentChat?.users.find(mate => mate !== currentUser._id);
    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId: receiver,
      message: message,
    })

    const msg = [...chat];
    msg.push({sender: currentUser._id, message: message})
    setChat(msg)
    }

  // This will catch the message sent by the sender
  // useEffect(() => {
  //   socket.current.on("receive_message", (data) => {
  //     console.log(data)
  //   })
  // }, [socket.current])


  useEffect(() => {
    socket.current.on("messageReceive", (data) => {
      // console.log(data)
      // setChat((prev) => [...prev, data])
      // console.log(data);
      setArrivalMessage({
        receiverId: data.receiverId,
        message: data.message,
        createdAt: Date.now(),
      })
      // setChat((prev) => [...prev, arrivalMessage])
    })
  },[socket.current])
  // console.log(arrivalMessage)

  useEffect(() => {
    arrivalMessage && setChat((prev) => [...prev, arrivalMessage]);
  },[arrivalMessage]);

  // Send button will show if text area is filled
  useEffect(() => {
    if (message !== "") {
      setIsFilled(true)
    } else {
      setIsFilled(false)
    }
  },[message])

  // Create a logout function and redirect the user to login page if successfully loged out
  const logout = () => {
    localStorage.clear();
    window.location.href="/login";
  }
    

  return(
    <div className="main">  
        <Navbar className="topCard">
          <Navbar.Collapse className="navItems">
          <NavDropdown title={userName} className="navigation">
            {/* Change hover color */}
            <NavDropdown.Item>Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
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
      In this section, the user can see the name of his friend, can write message, send, edit and delete message */}
      
        <Card className="overflow-auto  chatbox">
          <>
          {          
            currentChat?
              <ReactScrollableFeed className="chatDiv">                             
                {chat.map((convo) =>(                       
                    <Chatbox chat={convo} ownMsg={convo.sender === currentUser._id} socket={socket} currentUser={currentUser._id} />                   
                ))}               
                
              </ReactScrollableFeed>                       
            :              
              <span className="noConvo">Start a conversation</span>              
          }   
          </>
        </Card>

          {/* Text area and send button */}
        <Card className="buttonCard">
          {
            currentChat?
              <>
              <Form onSubmit={handleSendChat} className="txtareaForm">
                <Form.Group className="textGrp">
                  <Form.Control
                  type="text"                
                  placeholder="Write something..." 
                  value={message}
                  onChange={event => setMessage(event.target.value)}
                  className="textarea"
                  />
                </Form.Group>
                <>
                {
                  isFilled?
                  <Button  type="submit" className="sndBtn" >Send</Button>
                  :
                  <></>
                }                
                </>
              </Form>
              </>
            :
              <></>
          }
          </Card>
    </div>
  )
}

// Create profile page
// Update name
// Notification
// Options for contacts (check profile)
// Create error page for non existing page
// Use a welcome page in the chat box
// Change the logo of the app
// Uninstall axios
// https://www.youtube.com/watch?v=otaQKODEUFs   3:50
// https://www.youtube.com/watch?v=NU-HfZY3ATQ