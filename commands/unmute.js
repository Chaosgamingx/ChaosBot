module.exports = {
    name: 'unmute',
    description: "this command unmutes a member!",
    execute(client, message, args) {
        
        if (message.member.permissions.has("MUTE_MEMBERS ")) {
        
        const target = message.mentions.users.first();
        if (target) {
        
            let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');

            let memberTarget = message.guild.members.cache.get(target.id);

            
            memberTarget.roles.remove(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
        } else {
            message.channel.send('cant find that member');
        }
    } else {
        message.channel.send('you are not a moderator');
    }
    }
}    
