module.exports = {
    name: 'kick',
    aliases: [],
    category: 'moderator',
    utilisation: '{prefix}kick (user)',

    execute(client, message, args) {

        if (message.member.permissions.has("KICK_MEMBERS"))   {
            const member = message.mentions.users.first();
            if (member) {
                const memberTarger = message.guild.members.cache.get(member.id);
                memberTarger.kick();
                message.channel.send("user has been kicked");
            } else {
                message.channel.send('that person does not exist')
            }
        } else {
            message.channel.send('you are not a moderator.');

        }
    }
}
