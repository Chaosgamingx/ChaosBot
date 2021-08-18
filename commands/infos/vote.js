const { MessageEmbed } = require("discord.js");
const i = 'ℹ️'
module.exports = {
    name: 'vote',
    aliases: [],
    category: 'infos',
    utilisation: '{prefix}help <command name>',

    execute(client, message, args) {
        const usertag = message.member;
        let begembed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`${i} **${usertag.user.username}** : Vote For ChaosBot Here : \n https://top.gg/bot/530267263501074443/vote, thanks for your help`)
        message.channel.send(begembed).catch();
    }
}