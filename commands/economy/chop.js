const profileModel = require('../../models/profileSchema')
const talkedRecently = new Set();
const itemss = require('../../models/items');
const { MessageEmbed } = require('discord.js')
const x = '❌'
module.exports = {
    name: 'chop',
    aliases: [],
    category: 'economy',
    utilisation: '{prefix}help <command name>',

    async execute(client, message, args) {

        let profileData = await profileModel.findOne({ userID: message.author.id });
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                coin: 1000,
                bank: 0,
            });
            profile.save();
            message.channel.send("I have added you to the database, try again")
        } else {
            if (talkedRecently.has(message.author.id)) {
                const talked = new MessageEmbed()
                    .setDescription("This command has a 15 minute cooldown - " + message.author.username);
                message.channel.send(talked)
            } else {
                const member = message.member

                const item = itemss.find(x => x.name.toLowerCase() === 'axe');
                let founditem = profileData.items.find(x => x.name.toLowerCase() === 'axe');
                let array = [];
                array = profileData.items.filter(x => x.name !== 'axe');
                if (!founditem) {
                    let use3embed = new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`${x} **${member.user.username}** : You don't own a \`AXE\`, you need to buy one to use this command.`);
                    return message.channel.send(use3embed);
                } else {

                    const treeAmount = Math.round(Math.random() * 1) + 1;

                    const chopembed = new MessageEmbed()
                        .setDescription(`You went into the woods and chopped down **${treeAmount}** x Tree 🌲`)
                        .setColor("GREEN")
                    message.channel.send(chopembed);
                    
                    const findItem = profileData.items.find(i => i.name.toLowerCase() == 'tree');
                    let userInv = profileData.items.filter(i => i.name.toLowerCase() !== 'tree');
                    if (findItem) {
                        userInv.push({ name: 'tree', amount: (findItem.amount + treeAmount), description: '🌲 **Tree**\nsell trees to make money.' });
                        profileData.items = userInv;
                        await profileData.save();
                    } else {
                        userInv.push({ name: 'tree', amount: treeAmount, description: '🌲 **Tree**\nsell trees to make money.' });
                        profileData.items = userInv;
                        await profileData.save();
                    }
                } talkedRecently.add(message.author.id);
                setTimeout(() => {
                    // Removes the user from the set after a minute
                    talkedRecently.delete(message.author.id);
                }, 900000);
            }
        }
    }
}