const mongoose = require("mongoose");

const nationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const Nations = mongoose.model("nations", nationSchema);
module.exports = Nations;
