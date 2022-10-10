module.exports = {
    name: 'disconnect',
    aliases: [],
    category: 'music',
    utilisation: '{prefix}disconnect',
    description: 'Disconnects from the channel (used for the radio command)',

    execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send("please join the vc that chaosbot is in to disconnect")
        message.member.voice.channel.leave()

    }
}