// [SECTION] Dependencies and Modules
const mongoose = require('mongoose');

// [SECTION] Schema
const messageSchema = new mongoose.Schema(
    {
        message: {
            text: {
                type: String,
                required: true
            }
        },
        users: Array,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
    {
        timestamps: true
    }
    
);

// [SECTION] Model
module.exports = mongoose.model('Message', messageSchema);