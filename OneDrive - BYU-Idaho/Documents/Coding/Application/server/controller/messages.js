const Message = require('../model/Message');

module.exports.addMessage = (data) => {
    let convoId = data.conversationId;
    let convo = data.message;
    let users = data.users;
    let sndr = data.sender;

    let newMessage = new Message({
        conversationId: convoId,
        message: convo,
        users: users,
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

module.exports.getMessage = (id) => {
    return Message.find({converstationId:id}).then(res => {
        return res
    })
}