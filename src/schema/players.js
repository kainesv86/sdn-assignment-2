const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    club: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    goal: {
        type: Number,
        required: true,
        default: 0,
    },
    isCaptain: {
        type: Boolean,
        default: false,
    },
    nations: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "nations",
        require: true,
    },
});

module.exports = mongoose.model("players", playerSchema);
