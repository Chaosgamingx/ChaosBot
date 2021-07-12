const Discord = require('discord.js')

module.exports = {
    name: 'invite',
    aliases: [],
    category: 'infos',
    utilisation: '{prefix}invite',

    execute(client, message, args) {
        
        const inviteembed = new Discord.MessageEmbed()
        .setTitle ("Chaosbot's invite")
        .setDescription ("Want to invite ChaosBot to your server? then here's a link for you:  https://discord.com/oauth2/authorize?client_id=530267263501074443&scope=bot&permissions=2147483647")
        .setColor ('RANDOM')
        .setTimestamp()
        message.channel.send(inviteembed)
    }
}