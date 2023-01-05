const Discord = require('discord.js')
const profileModels = require('../../data/models/profileSchema');

module.exports = {
    name: 'balance',
    aliases: ['bal'],
    category: 'economy',
    utilisation: '{prefix}balance',
    description: 'Checks the balance on your economy profile',

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
                .setDescription(`👛 Pocket: **${profileData.coin} Coins**
                🏦 Bank: **${profileData.bank} Coins**`)
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send(embed)
        }
    }
}