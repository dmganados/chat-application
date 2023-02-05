import { Card, Container } from "react-bootstrap"
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

export default function Contacts({contactsProp}) {
    // console.log(contactsProp)
    const [id, setId] = useState([]) 
    // console.log(id)

    let contactId = (submitEvent) => {
        submitEvent.preventDefault()
        fetch('http://localhost:4000/user/all-users').then(res => res.json()).then(id => {
          setId(id)
        })    
      }
    

    return(
        <>  
            <Card id='cntctsDiv'>     
                <Card.Body id="cntctCard" onClick={contactId}>          
                    {contactsProp.firstName} {contactsProp.lastName}
                </Card.Body> 
            </Card>                   
        </>
    )
}