const profileModels = require('../../models/profileSchema');
const Discord = require('discord.js')
module.exports = {
    name: 'economyDelete',
    aliases: ["delete", "reset"],
    category: 'Economy',
    utilisation: '{prefix}help <command name>',
    description: 'this deletes your economy data for your profile',

    async execute(client, message, args) {

        let profileData = await profileModels.findOne({ userID: message.author.id })

        if (profileData) {
            let profileData = await profileModels.findOneAndRemove({ userID: message.author.id })

            const embed = new Discord.MessageEmbed()
                .setTitle("ChaosBot's Economy Database")
                .setDescription(`${message.author.username} Your account has been deleted. if you ever want back in just use any economy command to register yourself again.`)
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send(embed)
        } else if (!profileData) {
            return message.reply("You do not seem to be in the database. to get in, please use any of the economy commands.")
        }
    }
}