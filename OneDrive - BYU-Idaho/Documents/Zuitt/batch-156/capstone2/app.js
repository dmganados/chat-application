// [SECTION] Dependencies and Modules
	const express = require('express');
	const mongoose = require('mongoose');
	const dotenv = require('dotenv');
	const cors = require('cors');

// [SECTION] Environment Variable Setup
	dotenv.config();
	const port = process.env.PORT;
	const credential = process.env.MONGODB_URL;

// [SECTION] Server Setup
	const server = express();
	server.use(express.json());
	

// [SECTION] Database Connect
	mongoose.connect(credential);
	const caps = mongoose.connection;
	caps.once('open', () => console.log (`Connected to Atlas`));

// [SECTION] 
// [SECTION] Server Responses
	server.listen(port, () => {
		console.log(`Server is responding to port ${port}`);
	});
