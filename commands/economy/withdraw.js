const profileModel = require('../../data/models/profileSchema')
const Discord = require('discord.js')

module.exports = {
    name: 'withdraw',
    aliases: ["wit"],
    category: 'economy',
    utilisation: '{prefix}withdraw (amount)',
    description: 'Allows you to withdraw money from your economy bank account',

    async execute(client, message, args) {

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

            if (args[0] == "all") {
                await profileModel.findOneAndUpdate({
                    userID: message.author.id
                }, {
                    $inc: {
                        coin: profileData.bank,
                        bank: -profileData.bank
                    }
                }
                )
                const embed = new Discord.MessageEmbed()
                    .setTitle(`**${message.author.username}'s** Bank`)
                    .setDescription(`Successfully withdrew ${profileData.bank} to your wallet`)
                    .setColor("RANDOM")
                    .setTimestamp()
                message.channel.send(embed)
            } else {

                const amount = args[0]
                if (amount % 1 != 0 || amount <= 0) return message.channel.send("Withdraw amount must be a whole number or `all`");
                try {
                    if (amount > profileData.bank) return message.channel.send("you don't have that amount of coins to withdraw");
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    }, {
                        $inc: {
                            coin: amount,
                            bank: -amount
                        }
                    }
                    )
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`**${message.author.username}'s** Bank`)
                        .setDescription(`Successfully withdrew ${amount} coins to your wallet`)
                        .setColor("RANDOM")
                        .setTimestamp()
                    message.channel.send(embed)
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }
}
