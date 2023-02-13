const Message = require('../model/Message');

// Create message
module.exports.addMessage = (data) => {
    let convoId = data.conversationId;
    let convo = data.message;
    let sndr = data.sender;

    let newMessage = new Message({
        conversationId: convoId,
        message: convo,
        sender: sndr
    });

    return newMessage.save().then((message, error) => {
        if (message) {
            return message;
        } else {
            return false;
        }
    });
}

// Retrieve message
module.exports.getMessage = (id) => {
    return Message.find({conversationId:id}).then(res => {
        return res
    })
}

// module.exports.getAllMessages = () => {
//     return Message.find({}).then(result => {
//         return result
//     })
// }

// Update message
module.exports.editMessage = (id, data) => {
    // console.log(id)
    // let _id = id;
    let convo = data.conversationId;
    let sndr = data.sender;
    let message = data.message;
    let conversation = {
        conversationId: convo,
        sender: sndr,
        message: message
    }
    return Message.findByIdAndUpdate(id, conversation).then((messageUpdate, err) => {
        if (messageUpdate) {
            return(messageUpdate)
        } else {
            return "Failed to update the message"
        }
    })
}

// Delete message
module.exports.deleteMessage = (msgId) => {
    return Message.findById(msgId).then(message => {
        if (message === null) {
            return "Message not Found"
        } else {
            return message.remove().then((deleteMsg, err) => {
                if (err) {
                    return "Failed to delete message"
                } else {
                    return deleteMsg
                }
            })
        }
    })
}