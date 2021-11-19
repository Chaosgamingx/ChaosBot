const { MessageEmbed } = require('discord.js');
const itemss = require('../../models/items');
const i = 'ℹ️'
const x = '❌'
const tick = '✔️'

const Discord = require("discord.js")
const profileModel = require('../../models/profileSchema')
module.exports = {
    name: 'buy',
    aliases: [],
    category: 'economy',
    utilisation: '{prefix}help <command name>',

    async execute(client, message, args) {
        const member = message.member;
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
            if (!args.join(' ')) {
                let buynothingerrorembed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${x} **${member.user.username}** : You can't buy nothing, please enter the correct item \`id\`.`);

                return message.channel.send(buynothingerrorembed).catch();
                //return message.channel.send("you can't buy nothing, please enter the correct item id");
            }
            if (!args[1]) args[1] = '';
            const item = itemss.find(x => x.name.toLowerCase() === args.join(' ').toString().toLowerCase() || x.name.toLowerCase() === args[0].toString().toLowerCase() || x.name.toLowerCase() === `${args[0].toString().toLowerCase()} ${args[1].toString().toLowerCase()}`);
            if (!item) {
                let wrongiderrorembed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${x} **${member.user.username}** : You can't buy an item that doesn't exist please use the correct item \`id\`.`);

                return message.channel.send(wrongiderrorembed).catch();
                //return message.channel.send("You can't buy an item that doesn't exist please use the correct item id");
            }
            if (item.canBuy == false) {
                let cantbuyerrorembed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${x} **${member.user.username}** : You can't buy this item.`);

                return message.channel.send(cantbuyerrorembed).catch();
                //return message.channel.send(":thinking: You can't buy this item");
            }
            let buyAmount = args.join(' ').toString().match(/([1-9][0-9]*)/)
            if (!buyAmount) buyAmount = 1;
            else buyAmount = buyAmount[0]
            if (item.price > user.coin || (buyAmount * item.price) > user.coin) {
                let nomoneyerrorembed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${x} **${member.user.username}** : You dont have the funds to buy this item.`);

                return message.channel.send(nomoneyerrorembed).catch();
                //return message.channel.send("You dont have the funds to buy this item.");
            }
            let founditem = user.items.find(x => x.name.toLowerCase() === item.name.toLowerCase());
            let array = [];
            array = user.items.filter(x => x.name !== item.name);
            if (founditem) {
                array.push({
                    name: item.name,
                    amount: (parseInt(founditem.amount) + parseInt(buyAmount)),
                    description: item.description
                });
                user.items = array;
                await user.save();
            }
            else {
                user.items.push({
                    name: item.name,
                    amount: buyAmount,
                    description: item.description
                });
                await user.save();
            }
            const response = await profileModel.findOneAndUpdate({
                        userID: message.author.id,
                    }, {
                        $inc: {
                            coin: -item.price,
                        }
                    })
            let itempayedembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${tick} **${member.user.username}** : You bought **${parseInt(buyAmount).toLocaleString()}** \`${item.name}\`.`);

            message.channel.send(itempayedembed).catch();
            //message.channel.send(`You bought **${parseInt(buyAmount).toLocaleString()}** \`${item.name}\``);
        }
    }
}