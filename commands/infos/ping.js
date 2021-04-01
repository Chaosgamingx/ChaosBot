const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    aliases: [],
    category: 'infos',
    utilisation: '{prefix}ping',

    execute(client, message, args) {
        const embed = new Discord.MessageEmbed()
            .setTitle('Pong!!! Bots ping')
            .setColor('RANDOM')
            .setDescription(`Latency is ${Date.now() - message.createdTimestamp}ms. 
            API Latency is ${Math.round(client.ws.ping)}ms`);

        message.channel.send(embed)
    }
}