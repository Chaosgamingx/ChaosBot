const Discord = require('discord.js')
const fetch = require("node-fetch");

module.exports = {
    name: 'pat',
    aliases: [],
    category: 'anime',
    utilisation: '{prefix}pat (user)',
    description: "pat a person",

    async execute(client, message, args) {
        let body = await fetch(`https://nekos.life/api/v2/img/pat`)
            .then((r) => r.json());



        if (message.mentions.users.size < 1) return message.channel.send("you need to mention somebody to pat");

        let user = message.guild.member(message.mentions.users.first());


        message.channel.send(`${user} You got pat from ${message.author.username}`)
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(body.url)
        message.channel.send(embed)

    }
}
