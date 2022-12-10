const profileModel = require('../../data/models/profileSchema')
const discord = require('discord.js')

module.exports = {
    name: 'profile',
    aliases: ['p'],
    category: 'economy',
    utilisation: '{prefix}profile',
    description: 'view your economy profile',

    async execute(client, message, args) {
        let profileData = await profileModel.findOne({ userID: message.author.id });
        if (!profileData) {
            return message.channel.send("there is no record of your economy data. do =start to start your quest")
        } else {
            const embed = new discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`${message.author.username}'s stats`, message.author.displayAvatarURL())
                .addField('\u200b', `**HP**: ${profileData.hp}
                \u200b
                **STR**: ${profileData.str}
                **AGI**: ${profileData.agi}
                \u200b
                **Weapon**: ${profileData.weaponid}`, true)
                .addField('\u200b', `**MP**: ${profileData.mp}
                \u200b
                **CON**: ${profileData.con}
                \u200b
                \u200b
                **Armor**: ${profileData.armorid}`, true)
                .addField('\u200b', `\u200b
                \u200b
                **MAG**: ${profileData.mag}
                **SPR**: ${profileData.spr}
                \u200b
                **Accessory**: ${profileData.accessoryid}`, true)
                .addField('\u200b', `**Class**: ${profileData.class}`)
            return message.channel.send(embed)
        }
    }
}