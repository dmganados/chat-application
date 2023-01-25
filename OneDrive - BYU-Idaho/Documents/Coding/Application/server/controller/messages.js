const Message = require('../model/Message');

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await Message.create({
            message: { text: message },
            users: [from, to],
            sender: from
        });
        if (data) return res.json({ msg: "Message added successfully."});
        return res.json({ msg: "Failed to add message to Atlas"})
        
    } catch (exception) {
        next(exception)
    }
}

module.exports.allMessages = async (req, res, next) => {

}