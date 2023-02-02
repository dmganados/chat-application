// Import the required modules and dependencies
    const express = require('express');
    const mongoose = require('mongoose');
    const dotenv = require('dotenv');
    const cors = require('cors'); 
    const userRoutes = require('./routes/user');
    const messageRoutes = require('./routes/messages');
    const conversationRoutes = require('./routes/conversations');
    const socket = require("socket.io");
const { emit } = require('./model/User');

// Environment Variable Setup
    dotenv.config();
    const port = process.env.PORT;
    const url = process.env.MONGO_URL;

// Server Setup
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    

// Database Connect
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`Connected to Atlas`);
    }).catch((err) => {
        console.log(err.message);
    });

// Server Routes
    app.use("/user", userRoutes);
    app.use("/message", messageRoutes);
    app.use("/conversations", conversationRoutes);

// Server Responses
    app.get('/', (req, res) => {
        res.set('Access-Control-Allow-Origin', 'http://localhost:4000/');
        res.send({"msg": "CORS is enabled"})
    })

    const io = socket(app.listen(port, () => {
        console.log(`API is now online on port ${port}`)
    }), 
    {
        cors: {
            origin: "http://localhost:3000",
            credentials: true
        }
    });

    global.onlineUsers = new Map();
    let users = [];

    const addUser = (userId, socketId) => {
        !users.some(user => user.userId === userId) &&
        users.push({ userId, socketId });
    }

    const removeUser =(socketId) => {
        users = users.filter((user) => user.socketId !== socketId);
    }

    const getUser = (userId) => {
        return users.find((user) => user.userId === userId)
    }

    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`) 
        // io.to(si).emit("Welcome", "Hi, this is a socket server!")
        global.chatSocket = socket;
        // socket.on("add-user", (userId) => {
        //     onlineUsers.set(userId, socket.id);
        // });
        socket.on("addUser", (userId) => {
            onlineUsers.set(userId, socket.id);
            // addUser(userId, socket.id);
            // io.emit("getUsers", users);
        });

        // socket.on("sendMessage", ({ senderId, receiverId, message })=>{
        //     const user = getUser(receiverId);
        //     io.to(user.socket.id).emit("getMessage", {
        //         senderId,
        //         message
        //     })
        // })

        socket.on("sendMessage", (data) => {
            const sendUserSocket = onlineUsers.get(data.to);
            if(sendUserSocket) {
                socket.to(sendUserSocket).emit("message-receive", data.message)
            }
        })

        // socket.on("disconnect", (data) => {
        //     // console.log("User diconnected", socket.id)
        //     const sendUserSocket = onlineUsers.get(data.to);
        //     if (sendUserSocket) {
        //         socket.to(sendUserSocket).emit("msg-receive", data.msg);
        //     }
        // });
        // socket.on("disconnect", () => {
        //     console.log("User disconnected", socket.id)
        //     removeUser(socket.id);
        //     io.emit("getUsers", users);
        // })
    });

    

