const Discord = require("discord.js")

module.exports = {
    name: 'announce',
    aliases: [],
    category: 'moderator',
    utilisation: '{prefix}announce (channel id) message',

    async execute(client, message, args) {


        if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("You don't have administrator privileges to announce")

        const prefix = client.config.discord.prefix

        let rchannel = message.guild.channels.cache.get(args[0])
        if(!rchannel) return message.channel.send("please give me the channel id of the channel you want to send the message to")
        let MSG = message.content.split(`${prefix}announce ${rchannel.id} `).join(" ")
        if(!MSG) return message.channel.send("please tell me the message to send")
        const embed = new Discord.MessageEmbed()
        .setTitle(`announcement from ${message.author.tag}`)
        .setDescription(`${MSG}`)
        .setColor("RANDOM")
        .setTimestamp()
        rchannel.send(embed)
        message.delete()

    }
}