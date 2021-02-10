const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();


['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})


client.login('NTMwMjY3MjYzNTAxMDc0NDQz.XC2n3w.tzI7r1AC1WhwtbunE3wEu-R6dmA');
