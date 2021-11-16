<<<<<<< HEAD
const prefixModel = require("../../models/prefixSchema")

module.exports = {
    name: 'setprefix',
    aliases: [],
    category: 'moderator',
    utilisation: '{prefix}help <command name>',

    async execute(client, message, args) {

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("you are not a moderator")

        const data = await prefixModel.findOne({
            GuildID: message.guild.id
        });

        if (!args[0]) return message.channel.send('You must provide a **new prefix**!');

        if (args[0].length > 5) return message.channel.send('Your new prefix must be under \`5\` characters!')

        if (data) {
            console.log("switching prefixes")
            await prefixModel.findOneAndRemove({
                GuildID: message.guild.id
            })

            message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        } else if (!data) {
            console.log("added prefix")
            message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        }
    }
=======
const prefixModel = require("../../models/prefixSchema")

module.exports = {
    name: 'setprefix',
    aliases: [],
    category: 'moderator',
    utilisation: '{prefix}help <command name>',

    async execute(client, message, args) {

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("you are not a moderator")

        const data = await prefixModel.findOne({
            GuildID: message.guild.id
        });

        if (!args[0]) return message.channel.send('You must provide a **new prefix**!');

        if (args[0].length > 5) return message.channel.send('Your new prefix must be under \`5\` characters!')

        if (data) {
            console.log("switching prefixes")
            await prefixModel.findOneAndRemove({
                GuildID: message.guild.id
            })

            message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        } else if (!data) {
            console.log("added prefix")
            message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        }
    }
>>>>>>> 1442b7d2cd4ad5d1d6669e674737638da41e0996
}