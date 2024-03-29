
const itemss = require('../../data/models/items');
const { MessageEmbed } = require("discord.js");
const i = 'ℹ️'
const x = '❌'
const tick = '✔️'
const hd = '💎'
const hr = '💎'
const hg = '💎'
const ha = '💎'
const hp = '💎'

const Discord = require('discord.js')
const profileModel = require('../../data/models/profileSchema')
const talkedRecently = new Set();

module.exports = {
    name: 'mine',
    aliases: [],
    category: 'economy',
    utilisation: '{prefix}mine',
    description: 'Have a chance of earning a rarity of gem which can be sold for money',

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

            if (talkedRecently.has(message.author.id)) {
                const talked = new Discord.MessageEmbed()
                    .setDescription("This command has a 15 minute cooldown - " + message.author.username);
                message.channel.send(talked)
            }
            else {
                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;


                const item = itemss.find(x => x.name.toLowerCase() === 'pickaxe');
                let founditem = user.items.find(x => x.name.toLowerCase() === 'pickaxe');
                let array = [];
                array = user.items.filter(x => x.name !== 'pickaxe');
                if (!founditem) {
                    let use3embed = new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`${x} **${member.user.username}** : You don't own a \`PICKAXE\`, you need to buy one to use this command.`);
                    return message.channel.send(use3embed);
                    //////return message.channel.send("you don't have this item");
                }



                const randomMessage = [
                    'd', 'd', 'd', 'd', 'd',
                    'r', 'r', 'r', 'r',
                    'g', 'g', 'g',
                    'a', 'a',
                    'p',
                    'missed', 'missed', 'missed', 'missed'
                ];

                const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];

                if (response == 'd') {

                    const Amount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const Embeddiamond = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went mining and came back with **${Amount}** x Diamond Gem ${hd}.`)
                        .setColor("GREEN")
                    message.channel.send(Embeddiamond);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'diamond');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'diamond');
                    if (findItem) {
                        userInv.push({ name: 'diamond', amount: (findItem.amount + Amount), description: `${hd} **Diamond Gem** \nsell the diamond to make money.` });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'diamond', amount: Amount, description: `${hd} **Diamond Gem** \nsell the diamond to make money.` });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'r') {
                    const Amount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const Embedruby = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went mining and came back with **${Amount}** x Ruby Gem ${hr}.`)
                        .setColor("GREEN")
                    message.channel.send(Embedruby);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'ruby');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'ruby');
                    if (findItem) {
                        userInv.push({ name: 'ruby', amount: (findItem.amount + Amount), description: `${hr} **Ruby Gem** \nsell the ruby to make money.` });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'ruby', amount: Amount, description: `${hr} **Ruby Gem** \nsell the ruby to make money.` });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'g') {

                    const Amount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const Embedgade = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went mining and came back with **${Amount}** x Jade Gem ${hg}.`)
                        .setColor("GREEN")
                    message.channel.send(Embedgade);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'gade');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'gade');
                    if (findItem) {
                        userInv.push({ name: 'jade', amount: (findItem.amount + Amount), description: `${hg} **Jade Gem** \nsell the gade to make money.` });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'jade', amount: Amount, description: `${hg} **Jade Gem** \nsell the gade to make money.` });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'a') {

                    const Amount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const Embedveryrare = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went mining and came back with **${Amount}** x Amethyst Gem ${ha}.`)
                        .setColor("GREEN")
                    message.channel.send(Embedveryrare);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'amethyst');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'amethyst');
                    if (findItem) {
                        userInv.push({ name: 'amethyst', amount: (findItem.amount + Amount), description: `${ha} **Amethyst Gem** \nsell the amethyst to make money.` });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'amethyst', amount: Amount, description: `${ha} **Amethyst Gem** \nsell the amethyst to make money.` });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'p') {

                    const Amount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const Embedled = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went fishing and came back with **${Amount}** x Precious Gem ${hp}.`)
                        .setColor("GREEN")
                    message.channel.send(Embedled);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'precious');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'precious');
                    if (findItem) {
                        userInv.push({ name: 'precious', amount: (findItem.amount + Amount), description: `${hp} **Precious Gem** \nsell the precious to make money.` });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'precious', amount: Amount, description: `${hp} **Precious Gem** \nsell the precious to make money.` });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'missed') {
                    const Embedmissed = new MessageEmbed()
                        .setDescription(`${x} **${member.user.username}** : You went mining, and found 0 gems.`)
                        .setColor("RED")
                    message.channel.send(Embedmissed);
                }
                talkedRecently.add(message.author.id);
                setTimeout(() => {
                    // Removes the user from the set after a minute
                    talkedRecently.delete(message.author.id);
                }, 900000);
            }
        }
    }
}