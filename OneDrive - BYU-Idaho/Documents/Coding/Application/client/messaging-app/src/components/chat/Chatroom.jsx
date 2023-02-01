import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Chatroom({conversation, currentUser}) {
    const [user, setUser] = useState(null);
    // console.log(conversation)
    let friendId = conversation.users.find((user) => user !== currentUser);

    useEffect(() =>{ 
        let getUser = async () => {
            fetch(`http://localhost:4000/user/profile/${friendId}`).then(res => res.json()).then(friend => {
                setUser(friend)
            });
        };       
        getUser();
    },[friendId])

    return(
        <>               
        <Card id='chtRmDiv'>  
            <Card.Body id="chtRmCard">
            <span className="userName">{user?.firstName} {user?.lastName}</span>
            </Card.Body>      
        </Card>             
        </>
    )
}