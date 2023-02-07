// Import the required modules and dependencies
    const express = require('express');
    const mongoose = require('mongoose');
    const dotenv = require('dotenv');
    const cors = require('cors'); 
    const userRoutes = require('./routes/user');
    const messageRoutes = require('./routes/messages');
    const conversationRoutes = require('./routes/conversations');
    const socket = require("socket.io");
// const { emit } = require('./model/User');

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

    const server = app.listen(port, () => {
        console.log(`API is now online on port ${port}`)
    })

    const io = socket(server, {
        cors: {
            origin: "http://localhost:3000",
            crendentials: true
        }
    })

    global.onlineUsers = new Map();

    io.on("connection", (socket) => {
        console.log(`User ${socket.id} is connected`)
        global.chatSocket = socket;
        socket.on("addUser", (userId) => {
            onlineUsers.set(userId, socket.id)
        });

        socket.on("sendMessage", (data) => {
            const receiver = onlineUsers.get(data.receiverId);
            if(receiver) {
                socket.to(data.conversationId).emit("messageReceive", data)
            }
        })

        socket.on("disconnect", () => {
            console.log(`User ${socket.id} disconnected.`)
        })
    });

    