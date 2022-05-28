const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    aliases: ['uptime', 'ut', 'p'],
    category: 'infos',
    utilisation: '{prefix}ping',

    async execute(client, message, args) {

        let totalSec = (client.uptime / 1000)
        let days = Math.floor(totalSec / 86400)
        totalSec %= 86400
        let hours = Math.floor(totalSec / 3600)
        totalSec %= 3600
        let minutes = Math.floor(totalSec / 60)
        let seconds = Math.floor(totalSec % 60)
        let uptime = `${days}** days, **${hours}** hours, **${minutes}** minutes, **${seconds} **seconds**`


        const embed = new Discord.MessageEmbed()
            .setTitle('Pong!!! Bots ping')
            .setColor('RANDOM')
            .setDescription(`**API Latency:** ${Math.round(client.ws.ping)}ms
            **Uptime:**`  + uptime )
            .setThumbnail(message.guild.iconURL({ dynamic: true }))

        message.channel.send(embed)
    }
}
