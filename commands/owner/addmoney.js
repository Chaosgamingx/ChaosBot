const profileModel = require('../../models/profileSchema')

module.exports = {
    name: 'addmoney',
    aliases: [],
    category: 'owner',
    utilisation: '{prefix}help <command name>',

    async execute(client, message, args) {
        if (message.author.id === cleint.config.discord.Owner) {

            let stolenfrom = message.mentions.users.first()
            if (!stolenfrom) return message.channel.send("please mention a user")
            if (stolenfrom) (console.log(stolenfrom.id))

            let person = await profileModel.findOne({ userID: stolenfrom.id });
            if (!person) return message.channel.send("That person isn't in my database")

            if (!args[1]) return message.channel.send("please choose the amount of money to give")
            if (isNaN(args[1])) return message.channel.send("that is not a valid number")

            const other = await profileModel.findOneAndUpdate({
                userID: message.mentions.users.first().id,
            }, {
                $inc: {
                    bank: args[1],
                }
            })
            message.channel.send(`I've added **${args[1]} Credits** to their bank`)

        } else {
            return message.channel.send("You're not the owner of this bot. Please download me from github and change the Owner to your ID in the Bot file to give yourself perms for your setup")
        }
    }
}