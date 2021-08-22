const itemss = require('../../models/items');
const { MessageEmbed } = require("discord.js");
const i = 'ℹ️'
const x = '❌'
const tick = '✔️'
const profileModel = require('../../models/profileSchema')
const Discord = require('discord.js')

const talkedRecently = new Set();

module.exports = {
    name: 'hunt',
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

            if (talkedRecently.has(message.author.id)) {
                const talked = new Discord.MessageEmbed()
                    .setDescription("This command has a 15 minute cooldown - " + message.author.username);
                message.channel.send(talked)
            }
            else {
                const member = message.member

                const item = itemss.find(x => x.name.toLowerCase() === 'rifle');
                let founditem = user.items.find(x => x.name.toLowerCase() === 'rifle');
                let array = [];
                array = user.items.filter(x => x.name !== 'rifle');
                if (!founditem) {
                    let use3embed = new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`${x} **${member.user.username}** : You don't own a \`RIFLE\`, you need to buy one to use this command.`);
                    return message.channel.send(use3embed);
                }



                const randomMessage = [
                    'bear',
                    'deer',
                    'duck',
                    'pig',
                    'cow',
                    'fox',
                    'rabbit',
                    'chicken',
                    'boar',
                    'missed'
                ];

                const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];

                if (response == 'bear') {
                    const deerAmount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const EmbedBear = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went hunting and came back with **${deerAmount}** x Bear 🐻`)
                        .setColor("GREEN")
                    message.channel.send(EmbedBear);
                    //message.channel.send(`You went hunting and came back with **${deerAmount}** x Bear 🐻`);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'bear');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'bear');
                    if (findItem) {
                        userInv.push({ name: 'bear', amount: (findItem.amount + deerAmount), description: '🐻 **Bare**\nsell bear to make money.' });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'bear', amount: deerAmount, description: '🐻 **Bare**\nsell bear to make money.' });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'deer') {
                    const deerAmount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const EmbedDeer = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went hunting and came back with **${deerAmount}** x Deer 🦌`)
                        .setColor("GREEN")
                    message.channel.send(EmbedDeer);
                    //message.channel.send(`You went hunting and came back with **${deerAmount}** x Deer 🦌`);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'deer');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'deer');
                    if (findItem) {
                        userInv.push({ name: 'deer', amount: (findItem.amount + deerAmount), description: '🦌 **Deer**\nsell deer to make money.' });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'deer', amount: deerAmount, description: '🦌 **Deer**\nsell the deer to make money.' });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'duck') {
                    const deerAmount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const EmbedDuck = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went hunting and came back with **${deerAmount}** x Duck 🦆`)
                        .setColor("GREEN")
                    message.channel.send(EmbedDuck);
                    //message.channel.send(`You went hunting and came back with **${deerAmount}** x Duck 🦆`);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'duck');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'duck');
                    if (findItem) {
                        userInv.push({ name: 'duck', amount: (findItem.amount + deerAmount), description: '🦆 **Duck**\nsell duck to make money.' });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'duck', amount: deerAmount, description: '🦆 **Duck**\nsell the duck to make money.' });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'pig') {
                    const deerAmount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const EmbedPig = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went hunting and came back with **${deerAmount}** x Pig 🐷`)
                        .setColor("GREEN")
                    message.channel.send(EmbedPig);
                    //message.channel.send(`You went hunting and came back with **${deerAmount}** x Pig 🐷`);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'pig');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'pig');
                    if (findItem) {
                        userInv.push({ name: 'pig', amount: (findItem.amount + deerAmount), description: '🐷 **Pig**\nsell pig to make money.' });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'pig', amount: deerAmount, description: '🐷 **Pig**\nsell the pig to make money.' });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'cow') {
                    const deerAmount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const EmbedCow = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went hunting and came back with **${deerAmount}** x Cow 🐮`)
                        .setColor("GREEN")
                    message.channel.send(EmbedCow);
                    //message.channel.send(`You went hunting and came back with **${deerAmount}** x Cow 🐮`);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'cow');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'cow');
                    if (findItem) {
                        userInv.push({ name: 'cow', amount: (findItem.amount + deerAmount), description: '🐮 **Cow**\nsell cow to make money.' });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'cow', amount: deerAmount, description: '🐮 **Cow**\nsell the cow to make money.' });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'fox') {
                    const deerAmount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const EmbedFox = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went hunting and came back with **${deerAmount}** x Fox 🦊`)
                        .setColor("GREEN")
                    message.channel.send(EmbedFox);
                    //message.channel.send(`You went hunting and came back with **${deerAmount}** x Fox 🦊`);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'fox');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'fox');
                    if (findItem) {
                        userInv.push({ name: 'fox', amount: (findItem.amount + deerAmount), description: '🦊 **Fox**\nsell fox to make money.' });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'fox', amount: deerAmount, description: '🦊 **Fox**\nsell the fox to make money.' });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'rabbit') {
                    const deerAmount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const EmbedRabbit = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went hunting and came back with **${deerAmount}** x Rabbit 🐰`)
                        .setColor("GREEN")
                    message.channel.send(EmbedRabbit);
                    //message.channel.send(`You went hunting and came back with **${deerAmount}** x Rabbit 🐰`);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'rabbit');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'rabbit');
                    if (findItem) {
                        userInv.push({ name: 'rabbit', amount: (findItem.amount + deerAmount), description: '🐰 **Rabbit**\nsell rabbit to make money.' });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'rabbit', amount: deerAmount, description: '🐰 **Rabbit**\nsell the rabbit to make money.' });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'chicken') {
                    const deerAmount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const EmbedChicken = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went hunting and came back with **${deerAmount}** x Chicken 🐔`)
                        .setColor("GREEN")
                    message.channel.send(EmbedChicken);
                    //message.channel.send(`You went hunting and came back with **${deerAmount}** x Chicken 🐔`);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'chicken');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'chicken');
                    if (findItem) {
                        userInv.push({ name: 'chicken', amount: (findItem.amount + deerAmount), description: '🐔 **Chicken**\nsell chicken to make money.' });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'chicken', amount: deerAmount, description: '🐔 **Chicken**\nsell the chicken to make money.' });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'boar') {
                    const deerAmount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const EmbedBoar = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went hunting and came back with **${deerAmount}** x Boar 🐗`)
                        .setColor("GREEN")
                    message.channel.send(EmbedBoar);
                    //message.channel.send(`You went hunting and came back with **${deerAmount}** x Boar 🐗`);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'boar');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'boar');
                    if (findItem) {
                        userInv.push({ name: 'boar', amount: (findItem.amount + deerAmount), description: '🐗 **Boar**\nsell boar to make money.' });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'boar', amount: deerAmount, description: '🐗 **Boar**\nsell the boar to make money.' });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'missed') {
                    const Embedmissed = new MessageEmbed()
                        .setDescription(`${x} **${member.user.username}** : You went hunting, and seen 0 animals.`)
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