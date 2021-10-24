const Discord = require('discord.js')

module.exports = {
    name: 'invitecounter',
    aliases: ["invites"],
    category: 'infos',
    utilisation: '{prefix}help <command name>',

    execute(client, message, args) {
        var targetUser = null;
        var isAnotherUserLookup = false;
        if (message.mentions.members.first() != null) {
            targetUser = message.mentions.members.first().user;
            console.log(targetUser.user);
            isAnotherUserLookup = true;
        }
        else
            targetUser = message.author;

        message.guild.fetchInvites()
            .then
            (invites => {
                const userInvites = invites.array().filter(o => o.inviter.id === targetUser.id);
                var userInviteCount = 0;
                for (var i = 0; i < userInvites.length; i++) {
                    var invite = userInvites[i];
                    userInviteCount += invite['uses'];
                }
                if (isAnotherUserLookup) {

                    const embed = new Discord.MessageEmbed()
                        .setTitle("Invite Tracker")
                        .setDescription(`**${targetUser.username}** has invited ${userInviteCount} user(s) to this server.`)
                        .setColor("RANDOM")
                        .setTimestamp()
                    message.reply(embed)
                }
                else {

                    const embed2 = new Discord.MessageEmbed()
                        .setTitle("Invite Tracker")
                        .setDescription(`You have invited ${userInviteCount} user(s) to this server. Keep up the good work!`)
                        .setColor("RANDOM")
                        .setTimestamp()
                    message.reply(embed2)
                }
            }
            )
            .catch(console.error);
    }

}