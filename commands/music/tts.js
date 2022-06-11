const discordTTS = require('discord-tts');

module.exports = {
    name: "tts",
    aliases: ['tts'],
    description: "test tts",
    category: 'Music',
    utilisation: '{prefix}tts (what you want to send. Make sure its a sentence.)',

    async execute(client, message, args) {

        const broadcast = client.voice.createBroadcast();
        const channelId = message.member.voice.channelID;
        if (!channelId) return message.channel.send("please join a vc")
        const theMessage = args.slice(`${client.config.discord.prefix}tts`).join(" ")
        if (!theMessage) return message.channel.send("please give me a message to put into tts")

        const channel = client.channels.cache.get(channelId);
        channel.join().then(connection => {
            broadcast.play(discordTTS.getVoiceStream(theMessage));
            const dispatcher = connection.play(broadcast);
        });

    }
}