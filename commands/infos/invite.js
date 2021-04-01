module.exports = {
    name: 'invite',
    aliases: [],
    category: 'infos',
    utilisation: '{prefix}invite',

    execute(client, message, args) {
        message.channel.send("Want to invite ChaosBot to your server? then here's a link for you:  https://discord.com/oauth2/authorize?client_id=530267263501074443&scope=bot&permissions=2147483647");
    }
}