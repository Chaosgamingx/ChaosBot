const profileModel = require('../../models/profileSchema')
const Discord = require('discord.js')
const talkedRecently = new Set();

module.exports = {
    name: 'beg',
    aliases: [],
    category: 'economy',
    utilisation: '{prefix}help <command name>',

    async execute(client, message, args) {
        const randomNumber = Math.floor(Math.random() * 500) + 1;
        let profileData = await profileModel.findOne({ userID: message.author.id });
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                coin: 1000,
                bank: 0,
            });
            profile.save();
            message.channel.send("I have added you to the database, try again")
        } else {

            if (talkedRecently.has(message.author.id)) {
                message.channel.send("you need to wait for this command to refresh. - " + message.author.username);
            }
            else {

                const response = await profileModel.findOneAndUpdate({
                    userID: message.author.id,
                }, {
                    $inc: {
                        coin: randomNumber,
                    }
                })
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**${message.author.username}**, you begged and recieved **${randomNumber} Chaos coins**`)
                    .setColor("RANDOM")
                    .setTimestamp()
                message.channel.send(embed)
            }
            talkedRecently.add(message.author.id);
            setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(message.author.id);
            }, 3600000 );
        }
    },
}