// Dependencies and Modules
const exp = require('express');
const controller = require('../controller/messages');
const auth = require('../auth');



// Routing Component
const route = exp.Router();

route.post('/messages/:receiverId/:senderId', (req, res) => {
    let convoId = req.body.conversationId;
    let msgs = req.body.message;
    let sndr = req.params.senderId;
    let rcvr = req.params.receiverId;
    let msgData = {
        conversationId: convoId,
        message: msgs,
        users: [sndr, rcvr],
        sender: sndr
    }
    controller.addMessage(msgData).then(result => {
        res.send(result)
    })
});



route.get('/:conversationId', (req, res) => {
    let convoId = req.params.conversationId
    controller.getMessage(convoId).then(result => {
        res.send(result)
    })
});

// Expose Route System
module.exports = route;