const prefixModel = require("../data/models/prefixSchema")

module.exports = async (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;


    const data = await prefixModel.findOne({
        GuildID: message.guild.id
    });



    if (data) {
        const prefix = data.Prefix

        if (message.content.indexOf(prefix) !== 0) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

        if (cmd) cmd.execute(client, message, args);

    } else {
        const prefix = client.config.discord.prefix;

        if (message.content.indexOf(prefix) !== 0) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

        if (cmd) cmd.execute(client, message, args);
    }
};