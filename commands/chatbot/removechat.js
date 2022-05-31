const chatModel = require("../../models/chatbotSchema")

module.exports = {
    name: 'removechat',
    aliases: [],
    category: 'chatbot',
    utilisation: '{prefix}removechat',

    async execute(client, message, args) {

        if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("You don't have administrator privileges to disable ChatBot")

        let chatData = await chatModel.findOne({ GuildID: message.guild.id });
        if (!chatData) {
            message.channel.send("ChatBot is already disabled")
        
        } else {
            await chatModel.findOneAndRemove({
                GuildID: message.guild.id
            })
            message.channel.send(`ChatBot is now disabled`)
        }
    }
}
