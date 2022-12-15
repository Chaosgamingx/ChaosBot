const mongoose = require('mongoose')

let profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    serverID: { type: String, require: true },
    coin: { type: Number, default: 1000 },
    bank: { type: Number },
    items: { type: Array, require: false, default: [] },
    level: { type: Number },
    xp: { type: Number },
    class: { type: String, require: true },
    weaponid: { type: String, require: true },
    armorid: { type: String, require: true },
    accessoryid: { type: String, require: true },   
    str: {type: Number },
    agi: {type: Number },
    con: {type: Number },
    mag: {type: Number },
    spr: {type: Number },
    hp: {type: Number },
    mp: {type: Number },
    tough: {type: Number },
    mind: {type: Number },
    abilities: { type: Array, require: true, default: [] },
    
    
    
    
    
    
})

const model = mongoose.model('profileModels', profileSchema);

module.exports = model;
