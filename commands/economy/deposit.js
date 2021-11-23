const profileModel = require('../../models/profileSchema')
const Discord = require('discord.js')

module.exports = {
    name: 'deposit',
    aliases: ["dep"],
    category: 'economy',
    utilisation: '{prefix}help <command name>',

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
                        coin: -profileData.coin,
                        bank: profileData.coin
                    }
                }
                )

                const embed = new Discord.MessageEmbed()
                    .setTitle(`**${message.author.username}'s** Bank`)
                    .setDescription(`successfully deposited **${profileData.coin} credits** to your bank account`)
                    .setColor("RANDOM")
                    .setTimestamp()
                message.channel.send(embed)

            } else {
                const amount = args[0]
                if (amount % 1 != 0 || amount <= 0) return message.channel.send("Deposit amount must be a whole number or `all`");
                try {
                    if (amount > profileData.coin) return message.channel.send("you don't have that amount of coins to deposit");
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    }, {
                        $inc: {
                            coin: -amount,
                            bank: amount
                        }
                    })
                    
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`**${message.author.username}'s** Bank`)
                        .setDescription(`Successfully deposited ${amount} credits to your bank account`)
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