import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Contacts from '../../components/contacts/Contacts';
import Chatbox from '../../components/chat/Chatbox';

export default function Chat() {

  const [contactsCollection, setContactsCollection] = useState([]);

  useEffect(() => {  
    fetch('http://localhost:4000/user/all-users').then(res => res.json()).then(contactsData => {
      setContactsCollection(contactsData.map(contactList => {
        return(
          <Contacts key={contactList._id} contactsProp={contactList} />
        )
      }));
    });
  });

  return(
    <>
    <Container >
      <Card id="chatCard">
        <Card.Body className='overflow-auto' id="cntctsCollection">
        <Link>{contactsCollection}</Link> 
        </Card.Body> 
        {/* <div id="chtboxDiv">       */}
        {/* <Card.Body className='overflow-auto' id="chatbox"> */}
        <Chatbox />
        {/* </Card.Body> */}
        {/* </div>  */}
      </Card>
    </Container>

    </>
  )
}

