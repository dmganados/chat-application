// Dependencies and Modules
    const exp = require('express');
    const controller = require('../controller/user');
    const auth = require('../auth');


// Routing Component
    const route = exp.Router();

// Routes - Creat
    route.post('/register', (req, res) => {
        let userInfo = req.body;
        controller.userReg(userInfo).then(result => {
            res.send(result)
        })
    })

    route.post('/login', (req, res) => {
        let data = req.body;
        controller.userToken(data).then(result => {
            res.send(result);
        })
    })

// Routes - Read
    route.get('/profile', auth.verify, (req, res) => {
        let userData = auth.decode(req.headers.authorization);
        let userId = userData.id;
        controller.getUsers(userId).then(outcome => {
            res.send(outcome);
        });
    });

    route.get('/all-users', (req, res) => {
        controller.getAllUsers().then(result => {
            res.send(result)
        })
    })

    route.get('/profile/:friendId', (req, res) => {
        let userId = req.params.friendId
        controller.findUsers(userId).then(outcome => {
            res.send(outcome);
        });
    });



// Expose Route System
    module.exports = route;