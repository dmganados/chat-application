// Import the required modules and dependencies
    const express = require('express');
    const mongoose = require('mongoose');
    const dotenv = require('dotenv');
    const cors = require('cors'); 
    const userRoutes = require('./routes/user');
    const messageRoutes = require('./routes/messages');
    const conversationRoutes = require('./routes/conversations');
    const { Server } = require("socket.io");

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



    // global.onlineUsers = new Map();

    // io.on("connection", (socket) => {
    //     console.log(`User ${socket.id} is connected`)
    //     global.chatSocket = socket;
    //     socket.on("addUser", (userId) => {
    //         // console.log(userId)
    //         if(userId === null) {
    //             return false
    //         } else {
    //             onlineUsers.set(userId, socket.id)
    //         }
            // io.emit("getUser", onlineUsers)
        // console.log(onlineUsers)
        // console.log(onlineUsers.get(userId))
        // });

        // socket.on("sendMessage", (data) => {
        //     console.log(data)
        //     let rcv = data.receiverId
        //     const receiver = onlineUsers.get(rcv);
            // console.log(onlineUsers.get(receiverId))
    //         console.log(receiver)
    //         if(receiver) {
    //             socket.to(receiver).emit("messageReceive", data)
    //         }
    //     })

    //     socket.on("disconnect", () => {
    //         console.log(`User ${socket.id} disconnected.`)
    //     })
    // });

    // console.log("Number of key-value pairs:", global.onlineUsers.size);

    // for (const [key, value] of global.onlineUsers.entries()) {
    // console.log(key, value);
    // }

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "PUT", "POST", "DELETE"]
        },
    });
    
    function connectToSocket() {
        // Connect to the socket
        const socket = io(server)
      
        // Assign the socket ID to a variable
        const socketId = socket.id;
      
        // Return the socket ID
        return socketId;
      }


    let users = [];

    const pushUser = (userId, socketId) => {
        !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
    }

    const removeUser = (socketId) => {
        users = users.filter((user) => user.socketId !== socketId)
    } 

    const receiver = (userId) => {
        return users.find((user) => user.userId === userId);
    }

    io.on("connection", (socket) => {
        console.log("A user is connected:", socket.id)

        let socketId = socket.id;
        
        socket.on("addUser", userId => {
            if (userId === null) {
                return false
            } else {
                pushUser(userId, socket.id);
            }
            io.emit("getUsers", users)
        })

        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);
            console.log(`${socket.id} is connected to the room ${roomId}`);
        })

        // socket.on("sendMessage", (data) => {
        //     console.log(data)
        //     console.log(data.conversationId)
        //     const { conversationId, senderId, receiverId, message } = data;

        //     // const targetSocket = ...;
        //     targetSocket.emit("receive_message", {
        //         senderId,
        //         message
        //     })




            // socket.to(data.conversationId).emit("receive_message", data.message)
        // })
 
        socket.on("sendMessage", ({senderId, receiverId, message}) => {
            console.log({senderId, receiverId, message})
            const rcv = receiver(receiverId)
            console.log(rcv.socketId)
            // io.to(rcv.socketId).emit("messageReceive", {senderId, receiverId, message})
            // io.to(receiverId).emit("messageReceive", {senderId, receiverId, message})
            
            // Change the !socketId
            // Make a condition that sender can still send to both online and not online friend.
            if (rcv) {
                io.to(rcv.socketId).emit("messageReceive", { receiverId, message })
            } 
        });

        socket.on("disconnect", ()=> {
            console.log("A user diconnected:", socket.id);
            removeUser(socket.id);
            io.emit("getUsers", users)
        })
    })

    


    