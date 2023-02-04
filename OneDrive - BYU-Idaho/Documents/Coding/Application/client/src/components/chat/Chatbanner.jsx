import { useState, useEffect } from "react";

export default function ChatBanner({activeChat, myId}) {
    // Get id of the friend, then get its profile information to diplay the name 
    const [currentChat, setCurrentChat] = useState(null)
    let friendId = activeChat?.find((f) => f !== myId)

    useEffect(() =>{ 
        let getUser = async () => {
            fetch(`http://localhost:4000/user/profile/${friendId}`).then(res => res.json()).then(friend => {
                setCurrentChat(friend)
            });
        };       
        getUser();
    },[friendId])

    return(
        <>
            <div className="banner">{currentChat?.firstName} {currentChat?.lastName}</div>
        </>
    )
}