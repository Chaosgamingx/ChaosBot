const chatModel = require("../../data/models/chatbotSchema")

module.exports = {
    name: 'setchat',
    aliases: [],
    category: 'chatbot',
    utilisation: '{prefix}setchat',
    description: 'Enables ChatBot for this server',

    async execute(client, message, args) {

        if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("You don't have administrator privileges to enable ChatBot")

        let chatData = await chatModel.findOne({
            GuildID: message.guild.id });
        if (!chatData) {
            let profile = await chatModel.create({
                GuildID: message.guild.id,
            });
            profile.save();
            message.channel.send(`ChatBot is now enabled`)

        } else {
            
            message.channel.send(`ChatBot is already enabled`)
        }
    }
}