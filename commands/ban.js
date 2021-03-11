module.exports = {
    name: 'ban',
    aliases: ['yeet'],
    description: "this is a banning command!",
    execute(client, message, args) {

        if (message.member.permissions.has("BAN_MEMBERS"))   {
            const member = message.mentions.users.first();
            if (member) {
                const memberTarger = message.guild.members.cache.get(member.id);
                memberTarger.ban();
                message.channel.send("user has been banned");
            } else {
                message.channel.send('that person does not exist')
            }
        } else {
            message.channel.send('you are not a moderator.');

        }
    }
}
