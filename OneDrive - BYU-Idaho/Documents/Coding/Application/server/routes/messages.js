// Dependencies and Modules
const exp = require('express');
const controller = require('../controller/messages');
const auth = require('../auth');

// Routing Component
const route = exp.Router();

// Create Message
route.post('/messages/:senderId', (req, res) => {
    let convoId = req.body.conversationId;
    let msgs = req.body.message;
    let sndr = req.params.senderId;
    let msgData = {
        conversationId: convoId,
        message: msgs,
        sender: sndr
    }
    controller.addMessage(msgData).then(result => {
        res.send(result)
    })
});

// Retrieve Message
route.get('/messages/:conversationId', (req, res) => {
    let convoId = req.params.conversationId;
    controller.getMessage(convoId).then(result => {
        res.send(result);
    })
});

// route.get('/messages', auth.verify, (req, res) => {
//     let user = auth.decode(req.headers.authorization);
//     let userId = user.id
//     controller.getAllMessages(userId).then(result => {
//         res.send(result)
//     })
// })

// Update Message
route.put('/messages/update/:msgId', (req, res) => {
    let id = req.params.msgId;
    let convoId = req.body.conversationId;
    let sndr = req.body.sender
    let msg = req.body.message;
    let data = {
        conversationId: convoId,
        sender: sndr,
        message: msg,
    }
    controller.editMessage(id, data).then(result => {
        res.send(result)
    })
})


// Delete Message
route.delete('/messages/delete/:msgId', (req, res) => {
    let msgId = req.params.msgId;
    controller.deleteMessage(msgId).then(result => {
        res.send(result)
    })
})

// Expose Route System
module.exports = route;