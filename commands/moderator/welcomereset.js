const welcomeSchema = require("../../models/welcomeSchema")
const Discord = require("discord.js")

module.exports = {
    name: 'welcomereset',
    aliases: [],
    category: 'moderator',
    utilisation: '{prefix}setwelcome (channel)',

    async execute(client, message, args) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("you are not a moderator")


        const data = await welcomeSchema.findOne({
            guildId: message.guild.id
        });


        if (data) {
            await welcomeSchema.findOneAndRemove({
                guildId: message.guild.id
            })
            message.channel.send(`Welcome message removed`)

        } else {
            message.channel.send("there is no custom welcome message")
        }


    }
}