const itemss = require('../../models/items');
const i = 'ℹ️'
const x = '❌'
const tick = '✔️'
const { MessageEmbed } = require("discord.js");
const profileModel = require('../../models/profileSchema')
module.exports = {
    name: 'gift',
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
            const usertag = message.member;
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || member.user.username === args[0]);

            let gifttooembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${usertag.user.username}** : Who are you giving items too ?`);
            if (!member) return message.channel.send(gifttooembed).catch();
            //if (!member) return message.channel.send(`Who are you giving items to huh?`);

            let userData = await profileModel.findOne({ userID: member.user.id })

            let noData = new MessageEmbed()
            .setColor("RED")
            .setDescription("That person doesn't exist in my database")
            if (!userData) return message.channel.send(noData) 


            let giftselfembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${usertag.user.username}** : You cant give items to yourself.`);
            if (member.user.id == message.author.id) return message.channel.send(giftselfembed).catch();
            //if (member.user.id == message.author.id) return message.channel.send(`Lol you can't gift your self.`);

            let nogiftembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${usertag.user.username}** : You forgot to type the item \`id\`.`);
            if (!args[1]) return message.channel.send(nogiftembed).catch();
            //if (!args[1]) return message.channel.send(`So you are giving nothing to them???`);

            const authoData = message.author.id;
            if (!args[1]) args[1] = '';
            if (!args[2]) args[2] = '';
            const itemToGive = itemss.findOne(x => x.name.toLowerCase() === args.join(' ').toString().toLowerCase() || x.name.toLowerCase() === args[1].toString().toLowerCase() || x.name.toLowerCase() === `${args[1].toString().toLowerCase()} ${args[2].toString().toLowerCase()}`);

            let giftnothingembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${usertag.user.username}** : The item your tring to gift dosn't exsist, or your typing the wrong item \`id\`.`);
            if (!itemToGive) return message.channel.send(giftnothingembed).catch();
            //if (!itemToGive) return message.channel.send(`That items doesn't even exist lol`);

            let authoItem = authoData.items.findOne(i => i.name.toLowerCase() == itemToGive.name.toLowerCase());

            let userItem = userData.items.findOne(i => i.name.toLowerCase() == itemToGive.name.toLowerCase());

            let noitemgidtembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${usertag.user.username}** : You don't own that item.`);
            if (!authoItem) return message.channel.send(noitemgidtembed).catch();
            //if (!authoItem) return message.channel.send(`You don't own that item.`);

            let giveAmount = args.slice(1).join(' ').toString().match(/([1-9][0-9]*)/);

            if (!giveAmount) giveAmount = 1;

            else giveAmount = giveAmount[0];

            let itemamountembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${usertag.user.username}** : You only have **${parseInt(authoItem.amount).toLocaleString()}** of that item.`);
            if (parseInt(giveAmount) > parseInt(authoItem.amount)) return message.channel.send(itemamountembed).catch();
            //if (parseInt(giveAmount) > parseInt(authoItem.amount)) return message.channel.send(`You only have **${parseInt(authoItem.amount).toLocaleString()}** of that item`);

            let authorArray = authoData.items.filter(i => i.name.toLowerCase() !== authoItem.name.toLowerCase());

            let userArray = userData.items.filter(i => i.name.toLowerCase() !== authoItem.name.toLowerCase());

            if (!userItem) {
                userArray.push({ name: itemToGive.name.toString(), amount: parseInt(giveAmount), description: itemToGive.description });
                userData.items = userArray;
            } else {
                userArray.push({ name: itemToGive.name.toString(), amount: (parseInt(userItem.amount) + parseInt(giveAmount)), description: itemToGive.description });
                userData.items = userArray;
            }
            await userData.save();
            if ((authoItem.amount - parseInt(giveAmount)) == 0) {
                authoData.items = authorArray;
            } else {
                authorArray.push({ name: itemToGive.name.toString(), amount: (parseInt(authoItem.amount) - parseInt(giveAmount)), description: itemToGive.description });
                authoData.items = authorArray;
            }
            await authoData.save();

            let messageembeditem = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${tick} **${usertag.user.username}** : You gave **${parseInt(giveAmount).toLocaleString()}** x \`${itemToGive.name}\` to ${member.user}.`);
            message.channel.send(messageembeditem).catch();
            //message.channel.send(`${tick} You gave **${parseInt(giveAmount).toLocaleString()}** \`${itemToGive.name}\` to ${member.user}`);

        }
    }
}
