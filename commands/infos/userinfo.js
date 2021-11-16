const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'userinfo',
    aliases: [],
    category: 'infos',
    utilisation: '{prefix}userinfo (user)',

    async execute(client, message, args) {
    const {guild, channel} = message

    const user = message.mentions.users.first() || message.member.user
    const member = guild.members.cache.get(user.id)

    const embed = new MessageEmbed()
        .setAuthor(
            `User info for ${user.username}`,
            user.displayAvatarURL()
        ).addFields({
            name: 'User tag',
            value: user.tag
        }, {
            name: 'Is bot',
            value: user.bot
        }, {
            name: 'Nickname',
            value: member.nickname || 'none'
        }, {
            name: 'Joined server',
            value: new Date(member.joinedTimestamp).toLocaleDateString()
        }, {
            name: 'Joined Discord',
            value: new Date(user.createdTimestamp).toLocaleDateString()
        }, {
            name: 'Number of roles',
            value: member.roles.cache.size - 1,
        })

    channel.send(embed)
}
}
