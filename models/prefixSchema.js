<<<<<<< HEAD
const mongoose = require('mongoose');

let prefixSchema = new mongoose.Schema({
    Prefix: {
        type: String
    },
    GuildID: String
});

const model = mongoose.model('prefixes', prefixSchema);

=======
const mongoose = require('mongoose');

let prefixSchema = new mongoose.Schema({
    Prefix: {
        type: String
    },
    GuildID: String
});

const model = mongoose.model('prefixes', prefixSchema);

>>>>>>> 1442b7d2cd4ad5d1d6669e674737638da41e0996
module.exports = model;