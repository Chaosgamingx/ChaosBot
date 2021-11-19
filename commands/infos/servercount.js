const Discord = require('discord.js')

module.exports = {
    name: 'servercount',
    aliases: [],
    category: 'infos',
    utilisation: '{prefix}servercount',

    execute(client, message, args) {

        const serverembed = new Discord.MessageEmbed()
        .setTitle ('Server count')
        .setDescription (`Chaosbot is in ${client.guilds.cache.size} servers with a total of ${client.users.cache.size} users`)
        .setColor ('RANDOM')
        .setTimestamp()
        message.channel.send(serverembed)

    }
}