const Discord = require('discord.js');
const profileModel = require('../../models/profileSchema')

module.exports = {
    name: 'inventory',
    aliases: ['inv'],
    category: 'economy',
    utilisation: '{prefix}help <command name>',

    async execute(client, message, args) {
        let user = await profileModel.findOne({ userID: message.author.id });
        if (!user) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                coin: 1000,
                bank: 0,
                items: [],
            });
            profile.save();
            message.channel.send("I have added you to the database, try again")
        } else {
            let number = 5 * parseInt(args[0]);
            let prefix = require('../../config/bot')
            let page;
            if (user.items.length <= 5) page = 1;
            else if (user.items.length <= 10) page = 2;
            else if (user.items.length <= 15) page = 3;
            else if (user.items.length <= 20) page = 4;
            if (!args[0]) {
                number = 5;
            }
            let item = user.items.slice(number - 5, number);
            if (item.length < 1) {
                return message.channel.send('You have no items.');
            }
            const items = item.map(x => `${x.description}\n  \`id: ${x.name} \` x ${x.amount.toLocaleString()}`);
            const embed = new Discord.MessageEmbed()
                .setThumbnail(message.author.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                .setTitle(`${message.author.username}'s Inventory`)
                .setDescription(`${items.join('\n\n')}`)
                .setFooter(`Page ${args[0] || 1} of ${page}. to switch pages, do ${prefix.discord.prefix}inventory (page number)`)
                .setColor('RANDOM');
            message.channel.send(embed);
        }
    }
}