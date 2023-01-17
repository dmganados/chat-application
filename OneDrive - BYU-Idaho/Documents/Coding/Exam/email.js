const nodemailer = require('nodemailer');

let transporter =  nodemailer.createTransport({
    service: 'yahoo',
    auth: {
        user: 'durrelganados@yahoo.com',
        pass: 'Sodanag@D0205'
    }
});

let mailOptions = {
    from: 'durrelganados@yahoo.com',
    to : 'dmganados@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'Amazing'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});