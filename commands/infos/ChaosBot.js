const Discord = require('discord.js')

module.exports = {
    name: 'ChaosBot',
    aliases: ['chaosbot'],
    category: 'infos',
    utilisation: '{prefix}chaosbot',

    execute(client, message, args) {
        const embed = new Discord.MessageEmbed()
            .setTitle('ChaosBot')
            .setThumbnail('https://images.discordapp.net/avatars/530267263501074443/faa6f020a403dfb3dd0b24fb10cea33c.png?size=256')
            .setColor('RANDOM')
            .setDescription(`ChaosBot is an all-in-one bot made up by peoples ideas.
            if you need help with the bot you can go here: https://discord.gg/W8stFj5bXB
            You can also go here to get a look at the bots cool layout: https://github.com/Chaosgamingx/ChaosBot`);

        message.channel.send(embed)
    }
}