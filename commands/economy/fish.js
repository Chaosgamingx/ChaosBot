const itemss = require('../../models/items');
const { MessageEmbed } = require("discord.js");
const i = 'ℹ️'
const x = '❌'
const tick = '✔️'
const junkemoji = '🥾'
const legfish = '🐋'
const profileModel = require('../../models/profileSchema')
const Discord = require('discord.js')
const talkedRecently = new Set();

module.exports = {
    name: 'fish',
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
                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;


                const item = itemss.find(x => x.name.toLowerCase() === 'fishingrod');
                let founditem = user.items.find(x => x.name.toLowerCase() === 'fishingrod');
                let array = [];
                array = user.items.filter(x => x.name !== 'fishingrod');
                if (!founditem) {
                    let use3embed = new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`${x} **${member.user.username}** : You don't own a \`FISHINGROD\`, you need to buy one to use this command.`);
                    return message.channel.send(use3embed);
                    //////return message.channel.send("you don't have this item");
                }



                const randomMessage = [
                    'junk',
                    'common',
                    'uncommon',
                    'rare',
                    'veryrare',
                    'legendary',
                    'missed'
                ];

                const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];

                let userData = await profileModel.findOne({ userID: message.author.id });

                if (response == 'common') {

                    const fishAmount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const Embedcommon = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went fishing and came back with **${fishAmount}** x Common Fish 🐟`)
                        .setColor("GREEN")
                    message.channel.send(Embedcommon);
                    //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Common Fish 🐟`);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'common');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'common');
                    if (findItem) {
                        userInv.push({ name: 'common', amount: (findItem.amount + fishAmount), description: '🐟 **Common Fish** \nsell the common to make money.' });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'common', amount: fishAmount, description: '🐟**Common Fish** \nsell the common to make money.' });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'uncommon') {
                    const fishAmount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const Embeduncommon = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went fishing and came back with **${fishAmount}** x Uncommon Fish 🐠`)
                        .setColor("GREEN")
                    message.channel.send(Embeduncommon);
                    //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Uncommon Fish 🐠`);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'uncommon');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'uncommon');
                    if (findItem) {
                        userInv.push({ name: 'uncommon', amount: (findItem.amount + fishAmount), description: '🐠 **Uncommon Fish** \nsell the uncommon to make money.' });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'uncommon', amount: fishAmount, description: '🐠 **Uncommon Fish** \nsell the uncommon to make money.' });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'rare') {

                    const fishAmount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const Embedrare = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went fishing and came back with **${fishAmount}** x Rare Fish 🦑`)
                        .setColor("GREEN")
                    message.channel.send(Embedrare);
                    //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Rare Fish 🦑`);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'rare');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'rare');
                    if (findItem) {
                        userInv.push({ name: 'rare', amount: (findItem.amount + fishAmount), description: '🦑 **Rare Fish** \nsell the rare to make money.' });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'rare', amount: fishAmount, description: '🦑 **Rare Fish** \nsell the rare to make money.' });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'veryrare') {

                    const fishAmount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const Embedveryrare = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went fishing and came back with **${fishAmount}** x Very Rare Fish 🐡`)
                        .setColor("GREEN")
                    message.channel.send(Embedveryrare);
                    //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Very Rare Fish 🐡`);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'veryrare');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'veryrare');
                    if (findItem) {
                        userInv.push({ name: 'veryrare', amount: (findItem.amount + fishAmount), description: '🐡 **Very Rare Fish** \nsell the veryrare to make money.' });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'veryrare', amount: fishAmount, description: '🐡 **Very Rare Fish** \nsell the veryrare to make money.' });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'legendary') {

                    const fishAmount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const Embedled = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went fishing and came back with **${fishAmount}** x Legendary Fish ${legfish}.`)
                        .setColor("GREEN")
                    message.channel.send(Embedled);
                    //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Legendary Fish 🐋`);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'legendary');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'legendary');
                    if (findItem) {
                        userInv.push({ name: 'legendary', amount: (findItem.amount + fishAmount), description: `${legfish} **Legendary Fish** \nsell the legendary to make money.` });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'legendary', amount: fishAmount, description: `${legfish} **Legendary Fish** \nsell the legendary to make money.` });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'junk') {
                    const Amount = Math.round(Math.random() * 1) + 1;
                    let data = await profileModel.findOne({ userID: message.author.id });
                    const Embedjunk = new MessageEmbed()
                        .setDescription(`${tick} **${member.user.username}** : You went fishing and came back with **${Amount}** x Junk ${junkemoji}.`)
                        .setColor("GREEN")
                    message.channel.send(Embedjunk);
                    //message.channel.send(`You went hunting and came back with **${deerAmount}** x Fox 🦊`);
                    const findItem = data.items.find(i => i.name.toLowerCase() == 'junk');
                    let userInv = data.items.filter(i => i.name.toLowerCase() !== 'junk');
                    if (findItem) {
                        userInv.push({ name: 'junk', amount: (findItem.amount + Amount), description: `${junkemoji} **Junk**\nsell junk to make money.` });
                        data.items = userInv;
                        await data.save();
                    } else {
                        userInv.push({ name: 'junk', amount: Amount, description: `${junkemoji} **Junk**\nsell the junk to make money.` });
                        data.items = userInv;
                        await data.save();
                    }
                } else if (response == 'missed') {
                    const Embedmissed = new MessageEmbed()
                        .setDescription(`${x} **${member.user.username}** : You went fishing, and found 0 fish.`)
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