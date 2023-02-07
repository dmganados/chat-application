import { Card, Container } from "react-bootstrap"
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

export default function Contacts({contactsProp}) {
    // const [profile, setProfile] = useState([]);
    const [currentProfile, setCurrentProfile] = useState([]);
    const [usersConnect, setUsersConnect] = useState([]);
    let token = localStorage.accessToken;

    // console.log(profile._id)

    useEffect(() => {
        currentUser();
    })

    const currentUser = async () => { 
        try {
          await fetch('http://localhost:4000/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => res.json()).then(data => {  
            setCurrentProfile(data)
        })
        } catch (error) {
          console.log(error)
        }    
      }

    // Once a person is selected a connection will be created.
    let connectHandler = async() => {        
        let getProfile = await fetch(`http://localhost:4000/user/profile/${contactsProp._id}`).then(res => res.json()).then(profile => {
        let friendId = profile._id
        if (profile) {
            fetch(`http://localhost:4000/conversations/connect/${currentProfile._id}/${friendId}`,{
                method: "POST",
            }).then(res => res.json()).then(connect => {
                console.log(connect)
            })
            alert("A new connection is added. Start your conversation now!")
            window.location.href = "/chat";
        } else {
            return false
        }      
        })
      }
    

    return(
        <>  
            <Card id='cntctsDiv' >     
                <Card.Body id="cntctCard">          
                    {contactsProp.firstName} {contactsProp.lastName}
                    <span onClick={e => connectHandler(e)} >Connect</span>
                </Card.Body> 
            </Card>                   
        </>
    )
}