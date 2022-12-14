const profileModel = require('../../data/models/profileSchema')
const { MessageEmbed } = require('discord.js')
const mage = require("../../data/mage.json")
const warrior = require("../../data/warrior.json")
const rogue = require("../../data/rogue.json")
const priest = require("../../data/priest.json")
const { stripIndents } = require('common-tags')
color = "RANDOM"

module.exports = {
    name: 'start',
    aliases: [],
    category: 'economy',
    utilisation: '{prefix}start',
    description: 'start your economy adventure',

    async execute(client, message, args) {

        const input = {
            prompt: {
                class: ['Warrior', 'Priest', 'Rogue', 'Mage'],
                start: 'Please select a class: `Warrior`, `Priest`, `Rogue`, or `Mage`.  If you are unsure, trigger the command later with your prefered class when your ready.',
                retry: 'That is not a valid path!',
            }
        }



        if (!args[0]) return message.channel.send(`${message.author} ${input.prompt.start}`)
        if (!args[0] === input.prompt.class) return message.channel.send(`${message.author} ${input.prompt.retry}`)

        let profileData = await profileModel.findOne({ userID: message.author.id });
        if (profileData) {
            if (!profileData.class) {
                let path = []
                if (args[0] === "warrior") { let path = warrior.one }
                if (args[0] === "priest") { let path = priest.one }
                if (args[0] === "rogue") { let path = rogue.one }
                if (args[0] === "mage") { let path = mage.one }

                let profile = await profileModel.findOneAndUpdate({
                    userID: message.author.id,
                }, {
                    level: 1,
                    xp: 0,
                    class: path.class,
                    weaponid: path.weaponid,
                    armorid: path.armorid,
                    accessoryid: path.accessoryid,

                })

                profile.save();
                const embed = new MessageEmbed()
                    .setColor(color)
                    .setAuthor(`${message.author.username} has embarked upon the path of the ${args[0]}.`, message.author.displayAvatarURL())
                    .addField('\u200b', stripIndents`**HP**: ${path.hp}
                \u200b
                **STR**: ${path.str}
                **AGI**: ${path.agi}
                \u200b
                **Weapon**: ${path.weaponid}`, true)
                    .addField('\u200b', stripIndents`**MP**: ${path.mp}
                \u200b
                **CON**: ${path.con}
                \u200b
                \u200b
                **Armor**: ${path.armorid}`, true)
                    .addField('\u200b', stripIndents`\u200b
                \u200b
                **MAG**: ${path.mag}
                **SPR**: ${path.spr}
                \u200b
                **Accessory**: ${path.accessoryid}`, true)
                    .addField('\u200b', stripIndents`**Class**: ${path.class}`)
                return message.channel.send(embed)

            } else {
                return message.channel.send("your class has already been assigned. to switch, please do =reset to start over with a different class")
            }
        };

        if (args[0] === "mage") {
            const path = mage.one

            let member = message.author
            let profileData = await profileModel.findOne({ userID: message.author.id });
            if (!profileData) {
                let profile = await profileModel.create({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    coin: 0,
                    bank: 0,
                    level: 1,
                    xp: 0,
                    class: "mage",
                    weaponid: path.weaponid,
                    armorid: path.armorid,
                    accessoryid: path.accessoryid,
                });
                profile.save();
            }

            const embed = new MessageEmbed()
                .setColor(color)
                .setAuthor(`${message.author.username} has embarked upon the path of the ${args[0]}.`, message.author.displayAvatarURL())
                .addField('\u200b', stripIndents`**HP**: ${path.hp}
                \u200b
                **STR**: ${path.str}
                **AGI**: ${path.agi}
                \u200b
                **Weapon**: ${path.weaponid}`, true)
                .addField('\u200b', stripIndents`**MP**: ${path.mp}
                \u200b
                **CON**: ${path.con}
                \u200b
                \u200b
                **Armor**: ${path.armorid}`, true)
                .addField('\u200b', stripIndents`\u200b
                \u200b
                **MAG**: ${path.mag}
                **SPR**: ${path.spr}
                \u200b
                **Accessory**: ${path.accessoryid}`, true)
                .addField('\u200b', stripIndents`**Class**: ${path.class}`)
                .addField('\u200b', `**XP**: ${profileData.xp}`)
                .addField('\u200b', `**Level**: ${profileData.level}`)
            return message.channel.send(embed)
        } else if (args[0] === "priest") {
            const path = priest.one

            let member = message.author
            let profileData = await profileModel.findOne({ userID: message.author.id });
            if (!profileData) {
                let profile = await profileModel.create({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    coin: 0,
                    bank: 0,
                    level: 1,
                    xp: 0,
                    class: "priest",
                    weaponid: path.weaponid,
                    armorid: path.armorid,
                    accessoryid: path.accessoryid,
                });
                profile.save();
            }

            const embed = new MessageEmbed()
                .setColor(color)
                .setAuthor(`${message.author.username} has embarked upon the path of the ${args[0]}.`, message.author.displayAvatarURL())
                .addField('\u200b', stripIndents`**HP**: ${path.hp}
                    \u200b
                    **STR**: ${path.str}
                    **AGI**: ${path.agi}
                    \u200b
                    **Weapon**: ${path.weaponid}`, true)
                .addField('\u200b', stripIndents`**MP**: ${path.mp}
                    \u200b
                    **CON**: ${path.con}
                    \u200b
                    \u200b
                    **Armor**: ${path.armorid}`, true)
                .addField('\u200b', stripIndents`\u200b
                    \u200b
                    **MAG**: ${path.mag}
                    **SPR**: ${path.spr}
                    \u200b
                    **Accessory**: ${path.accessoryid}`, true)
                .addField('\u200b', stripIndents`**Class**: ${path.class}`)
                .addField('\u200b', `**XP**: ${profileData.xp}`)
                .addField('\u200b', `**Level**: ${profileData.level}`)
            return message.channel.send(embed)
        } else if (args[0] === "rogue") {
            const path = rogue.one

            let member = message.author
            let profileData = await profileModel.findOne({ userID: message.author.id });
            if (!profileData) {
                let profile = await profileModel.create({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    coin: 0,
                    bank: 0,
                    level: 1,
                    xp: 0,
                    class: "rogue",
                    weaponid: path.weaponid,
                    armorid: path.armorid,
                    accessoryid: path.accessoryid,
                });
                profile.save();

            }

            const embed = new MessageEmbed()
                .setColor(color)
                .setAuthor(`${message.author.username} has embarked upon the path of the ${args[0]}.`, message.author.displayAvatarURL())
                .addField('\u200b', stripIndents`**HP**: ${path.hp}
                    \u200b
                    **STR**: ${path.str}
                    **AGI**: ${path.agi}
                    \u200b
                    **Weapon**: ${path.weaponid}`, true)
                .addField('\u200b', stripIndents`**MP**: ${path.mp}
                    \u200b
                    **CON**: ${path.con}
                    \u200b
                    \u200b
                    **Armor**: ${path.armorid}`, true)
                .addField('\u200b', stripIndents`\u200b
                    \u200b
                    **MAG**: ${path.mag}
                    **SPR**: ${path.spr}
                    \u200b
                    **Accessory**: ${path.accessoryid}`, true)
                .addField('\u200b', stripIndents`**Class**: ${path.class}`)
                .addField('\u200b', `**XP**: ${profileData.xp}`)
                .addField('\u200b', `**Level**: ${profileData.level}`)
            return message.channel.send(embed)
        } else if (args[0] === "warrior") {
            const path = warrior.one

            let member = message.author
            let profileData = await profileModel.findOne({ userID: message.author.id });
            if (!profileData) {
                let profile = await profileModel.create({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    coin: 0,
                    bank: 0,
                    level: 1,
                    xp: 0,
                    class: "warrior",
                    weaponid: path.weaponid,
                    armorid: path.armorid,
                    accessoryid: path.accessoryid,
                });
                profile.save();
            }

            const embed = new MessageEmbed()
                .setColor(color)
                .setAuthor(`${message.author.username} has embarked upon the path of the ${args[0]}.`, message.author.displayAvatarURL())
                .addField('\u200b', stripIndents`**HP**: ${path.hp}
                    \u200b
                    **STR**: ${path.str}
                    **AGI**: ${path.agi}
                    \u200b
                    **Weapon**: ${path.weaponid}`, true)
                .addField('\u200b', stripIndents`**MP**: ${path.mp}
                    \u200b
                    **CON**: ${path.con}
                    \u200b
                    \u200b
                    **Armor**: ${path.armorid}`, true)
                .addField('\u200b', stripIndents`\u200b
                    \u200b
                    **MAG**: ${path.mag}
                    **SPR**: ${path.spr}
                    \u200b
                    **Accessory**: ${path.accessoryid}`, true)
                .addField('\u200b', stripIndents`**Class**: ${path.class}`)
                .addField('\u200b', `**XP**: ${profileData.xp}`)
                .addField('\u200b', `**Level**: ${profileData.level}`)
            return message.channel.send(embed)
        }

    }
}