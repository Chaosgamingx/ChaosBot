const { MessageEmbed } = require("discord.js");
const profileModel = require('../../data/models/profileSchema')
const Discord = require("discord.js")
module.exports = {
    name: 'gift',
    aliases: [],
    category: 'economy',
    utilisation: '{prefix}gift (user) (coin amount)',
    description: 'Allows one to gift coins to a user',
    async execute(client, message, args) {
        let user = await profileModel.findOne({ userID: message.author.id });
        if (!user) {
            return message.channel.send("You don't exist in the database. Please use =start to begin your journey")
        }

        if (!message.mentions.users.first()) {
            return message.channel.send("Please mention who your gifting")
        }

        let user2 = await profileModel.findOne({ userID: message.mentions.users.first().id });
        if (!user2) {
            return message.channel.send("That person doesn't exist in the database")
        }

        if(!args[1]) {
            return message.channel.send("Please specify an amount of coins to gift someone")
        }
        if (args[1] > user.coin) {
            message.channel.send("The amount your trying to gift exceeds your amount")
        } else {
            const amount = args[1]
            if (amount % 1 != 0 || amount <= 0) return message.channel.send("Transfer amount must be a whole number");
            try {
                if (amount > user.coin) return message.channel.send("you don't have that amount of coins to gift");
                await profileModel.findOneAndUpdate({
                    userID: message.author.id
                }, {
                    $inc: {
                        coin: -amount,

                    }
                })

                await profileModel.findOneAndUpdate({
                    userID: message.mentions.users.first().id
                }, {
                    $inc: {
                        coin: amount
                    }
                })

                const embed = new Discord.MessageEmbed()
                    .setTitle(`**${message.author.username}'s** Gift to ${message.mentions.users.first().username}`)
                    .setDescription(`Successfully transferred ${amount} coins to ${message.mentions.users.first().username}'s pocket`)
                    .setColor("GREEN")
                    .setTimestamp()
                message.channel.send(embed)
            } catch (err) {
                console.log(err)
            }
        }


    }
}
