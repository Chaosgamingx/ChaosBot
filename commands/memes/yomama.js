
const Discord = require('discord.js')
const fetch = require("node-fetch");

module.exports = {
    name: 'yomama',
    aliases: [],
    category: 'memes',
    utilisation: '{prefix}yomama',
    description: "display a yomama joke",

    async execute(client, message, args) {

        const body = await fetch(`https://api.yomomma.info`)
            .then((r) => r.json());

        const embed = new Discord.MessageEmbed()
            .setTitle("here's a yo mama joke")
            .setColor("RANDOM")
            .setDescription(body.joke)
        message.channel.send(embed)

    }
}
