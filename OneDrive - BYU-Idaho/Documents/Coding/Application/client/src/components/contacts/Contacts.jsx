import { Card, Container } from "react-bootstrap"
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

export default function Contacts({contactsProp}) {
    const [id, setId] = useState([]) 
    // console.log(contactsProp)

    let contactId = (submitEvent) => {
        submitEvent.preventDefault()
        fetch('http://localhost:4000/user/all-users').then(res => res.json()).then(id => {
          setId(id)
        })    
      }

    return(
        <>  
            <span>Contacts</span>
            {/* <Container id='cntctsDiv'>     
                <Card  id="cntctCard">          
                <span  onClick={contactId} >{contactsProp.firstName} {contactsProp.lastName}</span>
                </Card> 
            </Container>                    */}
        </>
    )
}