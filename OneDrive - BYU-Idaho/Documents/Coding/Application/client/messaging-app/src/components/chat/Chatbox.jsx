import {format} from 'timeago.js'

export default function Chatbox({chat, names, user, ownMsg}) {

    return(
        <>
            <div className={ownMsg ? "messageBox ownMsg" : "messageBox"}>                               
                <div className="frndName">Friend Name</div>  
                <div className="message"><p className="text">{chat.message}</p></div>
                <div className="time">{format(chat.createdAt)}</div>
            </div>   
        </>
    )
}