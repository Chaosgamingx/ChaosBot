const mongoose = require('mongoose')

let welcomeSchema = new mongoose.Schema({
    guildId: String,
    welcomeMSG: String,
    channelId: String
})

const model = mongoose.model('welcomeModel', welcomeSchema);

module.exports = model;