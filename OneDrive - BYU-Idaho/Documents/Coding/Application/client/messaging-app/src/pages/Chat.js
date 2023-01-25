import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button, Container, Card, Row } from 'react-bootstrap';
import Contacts from '../components/Contacts'

export default function Chat() {

  return(
    <>
    <Container>
      <Card id="chatCard">
        <Contacts />
      </Card>
    </Container>

    </>
  )
}

