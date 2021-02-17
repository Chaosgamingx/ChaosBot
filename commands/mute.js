const ms = require('ms');
module.exports = {
    name: 'mute',
    description: "this command mutes a member!",
    execute(client, message, args) {
       
        if (message.member.permissions.has("MUTE_MEMBERS")) {
       
        const target = message.mentions.users.first();
        if (target) {
            let muteRole = message.guild.roles.cache.find(role => role.name === 'mute', 'muted');


            let memberTarget = message.guild.members.cache.get(target.id);

            if (!args[1]) {
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted`);
                return

            }
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);

            setTimeout(function () {
                memberTarget.roles.add(mainRole.id);
                memberTarget.roles.remove(muteRole.id);


            }, ms(args[1]));
        } else {
            message.channel.send('cant find that member');
        }
    } else {
        message.channel.send('you are not a moderator');
    }
    }
}    
