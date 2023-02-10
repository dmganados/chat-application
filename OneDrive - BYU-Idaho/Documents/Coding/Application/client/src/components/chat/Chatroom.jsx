import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Chatroom({conversation, currentUser}) {
    const [user, setUser] = useState(null);
    let friendId = conversation.users.find((user) => user !== currentUser)
    // console.log(conversation)

    useEffect(() =>{ 
        let getUser = async () => {
            await fetch(`http://localhost:4000/user/profile/${friendId}`).then(res => res.json()).then(friend => {
                // console.log(friend)
                setUser(friend)
            });
        };
        getUser();
    },[friendId])

    return(
        <>               
        {/* <span>Chatroom</span> */}
        <Card id="chtRmDiv">  
            <Card.Body id="chtRmCard">
            {user?.firstName} {user?.lastName}
            </Card.Body>      
        </Card>             
        </>
    )
}