const profileModel = require('../../models/profileSchema')

module.exports = {
    name: 'give',
    aliases: [],
    category: 'economy',
    utilisation: '{prefix}help <command name>',

    async execute(client, message, args) {
        if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("you need to be the owner of the bot")
        if (!args.length) return message.channel.send("you need to mention someone to give them coins")
        const amount = args[1]
        const target = message.mentions.users.first()
        if (!target) return message.channel.send("that person doesn't exist")

        if(amount % 1 != 0 || amount <= 0) return message.channel.send("please give a whole number")

        try {
            const targetData = await profileModel.findOne({ userID: target.id})
            if(!targetData) return message.channel.send("this person isn't in the database")

            await profileModel.findOneAndUpdate({
                userID: target.id
            }, 
            {
                $inc: {
                    coins: amount
                },
            })
            return message.channel.send(`added ${amount} to ${message.mentions.users.first()}`)
        } catch (err) { (console.log(err)) }
    }
}