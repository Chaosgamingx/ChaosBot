const profileModel = require('../../models/profileSchema')

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

            const amount = args[0]
            if (amount % 1 != 0 || amount <= 0) return message.channel.send("Deposit amount must be a whole number");
            try {
                if (amount > profileData.coin) return message.channel.send("you don't have that amount of coins to deposit");
                await profileModel.findOneAndUpdate({
                    userID: message.author.id
                }, {
                    $inc: {
                        coin: -amount,
                        bank: amount
                    }
                }
                )
                return message.channel.send(`Deposited ${amount} of coins into your bank`)
            } catch (err) {
                console.log(err)
            }
        }
    }
}