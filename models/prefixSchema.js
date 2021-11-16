const mongoose = require('mongoose');

let prefixSchema = new mongoose.Schema({
    Prefix: {
        type: String
    },
    GuildID: String
});

const model = mongoose.model('prefixes', prefixSchema);

module.exports = model;