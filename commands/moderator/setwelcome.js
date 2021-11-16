const welcomeSchema = require("../../models/welcomeSchema")
const Discord = require("discord.js")

module.exports = {
    name: 'setwelcome',
    aliases: ['welcome'],
    category: 'moderator',
    utilisation: '{prefix}setwelcome (channel)',

    execute(client, message, args) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("you are not a moderator")
    
        const channel = message.mentions.channels.first()
        if(!channel) return message.channel.send("please specify a channel")

        const msg = args.slice(1).join(" ")
        if(!msg) return message.channel.send("What do you want me to say when someone joins")


        welcomeSchema.findOne({ guildId: message.guild.id }, async (err, data) => {
            if(data) {
                data.channelId = channel.id,
                data.welcomeMSG = msg
                data.save()
            } else {
                new welcomeSchema({
                    guildId: message.guild.id,
                    welcomeMSG: msg,
                    channelId: channel.id,
                }).save()
            }
            message.channel.send(`the welcome channel has been set to ${channel}`)
        })
    }
}
