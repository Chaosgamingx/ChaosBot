const chatModel = require("../../models/chatbotSchema")

module.exports = {
    name: 'removechat',
    aliases: [],
    category: 'chatbot',
    utilisation: '{prefix}removechat',

    async execute(client, message, args) {

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