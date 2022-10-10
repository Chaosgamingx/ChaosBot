const mongoose = require('mongoose');

let chatbotSchema = new mongoose.Schema({
    channelID: { type: String, require: true },
    GuildID: String
});

const model = mongoose.model('chatbot', chatbotSchema);

module.exports = model;