const prefixModel = require("../../models/prefixSchema")

module.exports = {
    name: 'prefixreset',
    aliases: [],
    category: 'moderator',
    utilisation: '{prefix}help <command name>',

    async execute(client, message, args) {

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("you are not a moderator")

        const data = await prefixModel.findOne({
            GuildID: message.guild.id
        });

        
        if (data) {
            console.log("switching prefixes")
            await prefixModel.findOneAndRemove({
                GuildID: message.guild.id
            })

            message.channel.send(`The prefix has been reset to =`);
            
        } else if (!data) {
            message.channel.send(`You don't have a custom prefix`);
        }
    }
}