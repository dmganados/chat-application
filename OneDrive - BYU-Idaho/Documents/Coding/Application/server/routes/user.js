// Dependencies and Modules
    const exp = require('express');
    const controller = require('../controller/user');


// Routing Component
    const route = exp.Router();

// Routes
    route.post('/register', (req, res) => {
        let userInfo = req.body;
        controller.userReg(userInfo).then(result => {
            res.send(result)
        })
    })


    route.post('/token', (req, res) => {
        let data = req.body;
        controller.userToken(data).then(result => {
            res.send(result);
        })
    })

// Expose Route System
    module.exports = route;