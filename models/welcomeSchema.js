<<<<<<< HEAD
const mongoose = require('mongoose')

let welcomeSchema = new mongoose.Schema({
    guildId: String,
    welcomeMSG: String,
    channelId: String
})

const model = mongoose.model('welcomeModel', welcomeSchema);

=======
const mongoose = require('mongoose')

let welcomeSchema = new mongoose.Schema({
    guildId: String,
    welcomeMSG: String,
    channelId: String
})

const model = mongoose.model('welcomeModel', welcomeSchema);

>>>>>>> 1442b7d2cd4ad5d1d6669e674737638da41e0996
module.exports = model;