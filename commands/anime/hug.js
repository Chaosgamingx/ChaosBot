const Discord = require('discord.js')
const fetch = require("node-fetch");

module.exports = {
    name: 'hug',
    aliases: [],
    category: 'anime',
    utilisation: '{prefix}hug (user)',
    description: "hug a person",

    async execute(client, message, args) {
        const body = await fetch(`https://nekos.life/api/v2/img/hug`)
            .then((r) => r.json());



        if (message.mentions.users.size < 1) return message.channel.send("you need to mention somebody to hug");

        let user = message.guild.member(message.mentions.users.first());


        message.channel.send(`${user} You got hugged from ${message.author.username}`)
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(body.url)
        message.channel.send(embed)

    }
}