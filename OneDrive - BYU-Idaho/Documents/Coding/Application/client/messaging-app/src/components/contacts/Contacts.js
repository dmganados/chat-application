import { Card, Container } from "react-bootstrap"
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

export default function Contacts({contactsProp}) {
    // const {id} = useParams;
    const [id, setId] = useState([])
    
    

    // useEffect(() => {
    //     usersConnect();
    // })

    let contactId = (submitEvent) => {
        submitEvent.preventDefault()
        fetch('http://localhost:4000/user/all-users').then(res => res.json()).then(id => {
          setId(id)
        })
    
      }


    // const usersConnect = () => {
    //     fetch(`http://localhost:4000/conversations/connect/${id}`).then(res => res.json()).then(data => {
    //         // console.log(data);
    //     })
    // }
 
    return(
        <>  
            <Container id='cntctsDiv'>     
                <Card  id="cntctCard">          
                <span  onClick={contactId} >{contactsProp.firstName} {contactsProp.lastName}</span>
                </Card> 
            </Container>                   
        </>
    )
}