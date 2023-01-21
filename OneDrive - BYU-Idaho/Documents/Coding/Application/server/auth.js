// Dependencies and Modules
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Environment Variable Setup
dotenv.config();
let secret = process.env.SECRET;

// Functionalities
module.exports.userAccessToken = (authUser) => {
	let userInfo = {
		id:authUser._id,
		firstName:authUser.firstName,
		lastName:authUser.lastName,
		email:authUser.email,
	};
	return jwt.sign(userInfo, secret, {});
};
