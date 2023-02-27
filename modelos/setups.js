const mongoose = require('mongoose');

const setupSchema = new mongoose.Schema({
    guildID: String,
    sistema_tickets_metro: {type: Object, default: {canal: "", mensaje: ""}},
    sugerencias: {type: String, default: ""},
    feedback: {type: String, default: ""},
})

const model = mongoose.model("Configuraciones", setupSchema);

module.exports = model;


