const chatModel = require("../../models/chatbotSchema")


module.exports = {
    name: 'chat',
    aliases: [],
    category: 'chatbot',
    utilisation: '{prefix}chat (your message here)',

    async execute(client, message, args) {

        let chatData = await chatModel.findOne({ GuildID: message.guild.id });
        if (!chatData) {
            message.channel.send('ChatBot is disabled. run setchat to enable it')

        } else {

            client.brain.chatSend(message)
        }
    }
}