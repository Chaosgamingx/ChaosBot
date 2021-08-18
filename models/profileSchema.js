const mongoose = require('mongoose')

let profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    serverID: { type: String, require: true },
    coin: { type: Number, default: 1000 },
    bank: { type: Number },
    items: { type: Array, require: false, default: [] },
})

const model = mongoose.model('profileModels', profileSchema);

module.exports = model;