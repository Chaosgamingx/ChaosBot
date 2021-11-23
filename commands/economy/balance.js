const Discord = require('discord.js')
const profileModels = require('../../models/profileSchema');

module.exports = {
    name: 'balance',
    aliases: ['bal'],
    category: 'economy',
    utilisation: '{prefix}help <command name>',

    async execute(client, message, args) {

        let profileData = await profileModels.findOne({ userID: message.author.id });
        if (!profileData) {
            let profile = await profileModels.create({
                userID: message.author.id,
                serverID: message.guild.id,
                coin: 1000,
                bank: 0,
            });
            profile.save();
            message.channel.send("I have added you to the database, try again")
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle(`**${message.author.username}'s** Bank`)
                .setDescription(`👛 Pocket: **${profileData.coin} Credits**
                🏦 Bank: **${profileData.bank} Credits**`)
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send(embed)
        }
    }
}