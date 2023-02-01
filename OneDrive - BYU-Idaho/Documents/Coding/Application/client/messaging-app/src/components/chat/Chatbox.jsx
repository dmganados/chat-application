import React from 'react'
import {format} from 'timeago.js'

class Chatbox extends React.Component {

    componentDidUpdate = () => {
        const container = document.getElementById('auto-scroll');
        if (container) 
            container.scrollTo(0, container.scrollHeight);                 
    }
    render() {
        const {chat, names, user, ownMsg} = this.props;

        if (chat === undefined) {
            return(
                <main id='auto-scroll'></main>
            )
        } else {
            return(
                <>
                    <main id='auto-scroll' className={ownMsg ? "messageBox ownMsg" : "messageBox"}>                               
                        <div className="frndName">Friend</div>  
                        <div className="message"><p className="text">{chat.message}</p></div>
                        <div className="time">{format(chat.createdAt)}</div>
                    </main>   
                </>
            )
        }
        
    }    
}
export default Chatbox;