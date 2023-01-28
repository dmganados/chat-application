const Conversation = require('../model/Conversation');

module.exports.connectUsers = (data) => {
    let sndr = data.senderId;
    let rcver = data.receiverId;

    let newConvo = new Conversation({
        users: [sndr, rcver]
    });

    return newConvo.save().then((convo, error) => {
        if (convo) {
            // return('Users are connected');
            return convo;
        } else {
            return false;
        }
    });
};

module.exports.getConvo = (id) => {
    return Conversation.find({users:id}).then(res => {
        return res
    });
};