const fights = require('../../data/fight/fights.json');

module.exports = {
  name: 'fight',
  aliases: [],
    category: 'memes',
    utilisation: '{prefix}fight (user)',
    description: 'Fight a user',

    execute(client, message, args) {
    let user = message.mentions.users.first();
    let reason = args.slice(0).join(' ');
    if (reason.length < 1) return message.reply('You can\'t fight thin air dude, pick someone to fight.');
    if (message.mentions.users.first().id === "482128001828651008") return message.reply('Kame KAme KAME HAAAAAA. ***It dealt ∞ damage. You got demolished.*** Cryptonix X won');
    if (message.mentions.users.first().id === "242263403001937920") return message.reply('You can\'t fight him you pleblord.:facepalm: He will destroy you:wink:');
    message.channel.send(`${message.author.username} is fighting ${message.mentions.users.first().username} ${fights[Math.floor(Math.random() * fights.length)]}`)
  }
}