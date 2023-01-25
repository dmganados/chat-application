// Dependencies and Modules
const exp = require('express');
const controller = require('../controller/messages');
const auth = require('../auth');


// Routing Component
const route = exp.Router();

route.post('/messages', controller.addMessage);
route.post('/allmessages', controller.allMessages);

// Expose Route System
module.exports = route;