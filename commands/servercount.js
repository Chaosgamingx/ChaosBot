module.exports = {
    name: 'servercount',
    description: 'displays how many servers the bot is in',
    execute(client, message, cmd, args, Discord) {

        const serverembed = new Discord.MessageEmbed()
        .setTitle ('Server count')
        .setDescription (`Chaosbot is in ${client.guilds.cache.size} servers`)
        .setColor ('RANDOM')
        .setTimestamp()
        message.channel.send(serverembed)

    }
}