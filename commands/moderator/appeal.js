module.exports = {
    name : 'appeal',
    aliases: [],
    category: 'moderator',
    utilisation: '{prefix}appeal (user)',
    
    /**
     * @param {Message} message
     */
    async execute(client, message, args) {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permissions to use this command')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!Member) return message.channel.send('Member is not found.')
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'Appeal')
        if(!role) return message.channel.send('Appeal role is not found. Please make a role named `Appeal` and make it only accesable to the channel you want for appeal to go.');
            
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'Appeal')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} has already been sent to appeal channel.`)
        await Member.roles.add(role2)
        message.channel.send(`${Member.displayName} is now sent to the Appeal channel.`)
    }
}
