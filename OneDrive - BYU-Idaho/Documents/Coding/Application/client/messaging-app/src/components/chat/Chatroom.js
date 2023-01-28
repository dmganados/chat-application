import { Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Chatroom({conversation, currentUser}) {
    const [user, setUser] = useState(null);
    // console.log(conversation)

    useEffect(() =>{
        const friendId = conversation.users.find((user) => user !== currentUser);
        // console.log(friendId)
        // const getUser = async () => {
        //     let res = await fetch('http://localhost:4000/user/find/profile' + friendId).then(res => res.json()).then(friend =>{
        //         console.log(friend)
        //     })
        // }
        // getUser();
    },[])
    return(
        <>
            <Container id='chtRmDiv'>     
                <Card id="chtRmCard">          
                    <span>Friend Name</span>
                </Card> 
            </Container>
        </>
    )
}