import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Chatroom({conversation, currentUser}) {
    const [user, setUser] = useState(null);
    let friendId = conversation.users.find((user) => user !== currentUser)

    useEffect(() =>{ 
        let getUser = async () => {
            await fetch(`http://localhost:4000/user/profile/${friendId}`).then(res => res.json()).then(friend => {
                setUser(friend)
            });
        };
        getUser();
    },[friendId])

    return(
        <>        
        {/*Large Screen  */}
        <Card id="chtRmDiv">  
            <Card.Body id="chtRmCard">
            {user?.firstName} {user?.lastName}
            </Card.Body>      
        </Card>       

        {/* Small Screen */}
        {/* <Card id="smchtRmDiv">  
            <Card.Body id="smchtRmCard">
            {user?.firstName} {user?.lastName}
            </Card.Body>      
        </Card>          */}
        </>
    )
}