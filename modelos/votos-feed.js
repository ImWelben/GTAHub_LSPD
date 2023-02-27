const mongoose = require('mongoose');

const votos_feedback = new mongoose.Schema({
    messageID: String,
    si: {type: Array, default: []},
    no: {type: Array, default: []},
    autor: {type: String, default: ""}
})

const model = mongoose.model("votos_feedback", votos_feedback);

module.exports = model;


