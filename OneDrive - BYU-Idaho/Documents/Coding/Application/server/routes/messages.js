// Dependencies and Modules
const exp = require('express');
const controller = require('../controller/messages');
const auth = require('../auth');



// Routing Component
const route = exp.Router();

route.post('/messages', auth.verify, (req, res) => {
    let convoId = req.body.converstationId;
    let msgs = req.body.message;
    let sndr = req.headers.authorization;
    let rcvr = req.body.receiverId;
    let msgData = {
        converstationId: convoId,
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