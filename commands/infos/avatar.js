const Discord = require('discord.js');


module.exports = {
    name: 'avatar',
    aliases: [],
    category: 'infos',
    utilisation: '{prefix}avatar (user)',
    description: '{prefix}Shows a users avatar',

    execute(client, message, args) {
        // Change the Command Handler or else it won't work!

        const user = message.mentions.users.first() || message.member.user

        let avatarembed = new Discord.MessageEmbed()
            .setTitle(`${user.tag} Avatar`)
            .setColor("#11bed3")
            .setDescription(`
Link as:
- [png](${user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })})
- [jpg](${user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 })})
- [webp](${user.displayAvatarURL({ format: 'webp', dynamic: true, size: 1024 })})
`)

            .setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setFooter(`Requested By: ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
            .setTimestamp()

        return message.channel.send(avatarembed)

    }
}