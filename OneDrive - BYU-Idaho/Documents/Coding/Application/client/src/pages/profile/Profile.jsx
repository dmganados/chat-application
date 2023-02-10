import { useEffect, useState } from 'react';
import { Container, Card, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Profile() {
    const [currentUser, setCurrentUser] = useState([]);
    let token = localStorage.accessToken;
    let userName = `${currentUser.firstName} ${currentUser.lastName}`;
    // console.log(currentUser)

    useEffect(() => {
        profile();
    })

    const profile = async () => { 
        try {
          await fetch('http://localhost:4000/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => res.json()).then(data => {  
          setCurrentUser(data)
        })
        } catch (error) {
          console.log(error)
        }    
      }

    const logout = () => {
        localStorage.clear();
        window.location.href="/login";
      }

    return(
        <>
        
        <div>
        <Navbar className="topCard">
          <Navbar.Collapse className="navItems">
          <NavDropdown title={userName} className="navigation">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown >
          </Navbar.Collapse>
        </Navbar>

        <Container>
        <Card className='profileCard'>
            <span className='accntOwner'>Account Owner: <h3>{userName}</h3></span>
            <span className='email'>Email: <h4>{currentUser.email}</h4></span>
        </Card>
        <span className='returnTo'>Return to <Link to='/chat'>Chat.</Link></span>
        </Container>
        
        </div>
        </>
    )
}