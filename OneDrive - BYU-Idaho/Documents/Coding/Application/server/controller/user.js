// Dependencies and Modules
const User = require('../model/User');
const bcrypt = require('bcrypt');
const auth = require('../auth');

// User Registration
module.exports.userReg = (reg) => {
    let fName = reg.firstName;
    let lName = reg.lastName;
    let email = reg.email;    
    let passW = reg.password;

    let newUser = new User({
        firstName: fName,
        lastName: lName,
        email: email,        
        password: bcrypt.hashSync(passW, 10),       
    });
    return newUser.save().then((user, error) => {
        if (user) {
            console.log(user);
        } else {
            return false
        }
    });

}

// Create token to be used when user logs in. 
module.exports.userToken = (reqBody) => {
    return User.findOne({email: reqBody.email}).then(outcome => {
        let passW = reqBody.password;
        if (outcome === null) {
            return false;
        }else {
            const isMatched = bcrypt.compareSync(passW, outcome.password);
            if (isMatched) {
                let userData = outcome.toObject();
                return {accessToken: auth.userAccessToken(userData)};
            } else {
                return false;
            }
        }

    })
};

