module.exports = {
    name: 'membercount',
    description: "this is a member counting command!",
    execute(client, message, args) {
        
        message.channel.send(`This server has ${message.guild.memberCount} members!`);

    }
}