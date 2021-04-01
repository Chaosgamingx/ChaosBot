
const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require("snekfetch")
module.exports = {
    name: 'poke',
    aliases: [],
    category: 'anime',
    utilisation: '{prefix}poke',

    execute(client, message, args) {
        if (message.mentions.users.size < 1) return message.channel.send("you can't poke nobody")
        let user = message.guild.member(message.mentions.users.first());
        message.channel.send(`${user} You got a poke from ${message.author.username} ❤`, {
            embed: {
                image: {
                    url: "https://i.imgur.com/XMuJ7K8.gif"
                }
            }
        })
    }
}