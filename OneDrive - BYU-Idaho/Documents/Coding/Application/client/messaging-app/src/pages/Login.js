import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import {Navigate} from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

function Login() {

  

  return (	
    <>
      <Container>
        <Form>
			
          	<Form.Group>
            	<Form.Label>Email:</Form.Label>
            	<Form.Control type="email" placeholder="Enter Email Here" required />
          	</Form.Group>

          	<Form.Group>
				<Form.Label>Password:</Form.Label>
				<Form.Control type="password" placeholder="Enter Password Here" required />
			</Form.Group>
					
			<Button	className="btn-block loginBtn" type="submit">Login</Button>
			
						
        </Form>
      </Container>


	  
    </>
  )
}

export default Login;