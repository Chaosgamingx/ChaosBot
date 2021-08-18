const itemss = require('../../models/items');
const i = 'ℹ️'
const x = '❌'
const tick = '✔️'
const { MessageEmbed } = require('discord.js');

const profileModel = require('../../models/profileSchema')

module.exports = {
    name: 'use',
    aliases: [],
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
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
            if (!args.join(' ')) {

                let use1embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${x} **${member.user.username}** : You forgot to type the items \`id\`.`);
                return message.channel.send(use1embed);
                //////return message.channel.send("you can't use nothing lmao");

            }
            const item = itemss.find(x => x.name.toLowerCase() === args.join(' ').toString().toLowerCase());
            if (!item) {

                let use2embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${x} **${member.user.username}** : You dont have this item make sure you have typed the correct \`id\`.`);
                return message.channel.send(use2embed);
                //////return message.channel.send("can't use this item");

            }
            if (!item.canUse) {

                let use3embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${x} **${member.user.username}** : You can't use this item.`);
                return message.channel.send(use3embed);
                //////return message.channel.send(":thinking: You can't use this item");

            }
            let founditem = user.items.find(x => x.name.toLowerCase() === item.name.toLowerCase());
            let array = [];
            array = user.items.filter(x => x.name !== item.name);
            if (!founditem) {
                let use3embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${x} **${member.user.username}** : You dont have this item make sure you have typed the correct \`id\`.`);
                return message.channel.send(use3embed);
                //////return message.channel.send("you don't have this item");
            }

            if (item.keep == false) {
                if (founditem.amount === 1) {
                    user.items = user.items.filter(x => x.name.toLowerCase() != item.name.toLowerCase());
                    await user.save();
                }
                else {
                    array.push({
                        name: item.name,
                        amount: founditem.amount - 1,
                        description: item.description
                    });
                    user.items = array;
                    await user.save();
                }
            }
            await item.run(client, message, args);
        }
    }
}