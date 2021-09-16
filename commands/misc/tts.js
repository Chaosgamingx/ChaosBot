const Discord = require('discord.js')
module.exports = {
    name: "tts",
    description: "text to speech",
    category: 'misc',


    execute(client, message, args) {

        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);
        if (!args[0]) return message.channel.send("please tell me what you want to hear");

        const channel = message.member.voice.channel;
        const argss = message.content.split(' ')
        const target = argss.slice(1)


        channel.join(channel)

        const embed = new Discord.MessageEmbed()
            .setImage(('https://images.discordapp.net/avatars/530267263501074443/faa6f020a403dfb3dd0b24fb10cea33c.png?size=256'))
            .setDescription(target.join(' '))
            .setColor("RANDOM")
            .setTimestamp()

        message.channel.send(embed)
        message.channel.send(target.join(' '), { tts: true })





    }
}

