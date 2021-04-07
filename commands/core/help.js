module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Core',
    utilisation: '{prefix}help <command name>',

    execute(client, message, args) {
        if (!args[0]) {
            const infos = message.client.commands.filter(x => x.category == 'infos').map((x) => '`' + x.name + '`').join(', ');
            const music = message.client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');
            const anime = message.client.commands.filter(x => x.category == 'anime').map((x) => '`' + x.name + '`').join(', ');
            const games = message.client.commands.filter(x => x.category == 'games').map((x) => '`' + x.name + '`').join(', ');
            const memes = message.client.commands.filter(x => x.category == 'memes').map((x) => '`' + x.name + '`').join(', ');
            const misc = message.client.commands.filter(x => x.category == 'misc').map((x) => '`' + x.name + '`').join(', ');
            const moderator = message.client.commands.filter(x => x.category == 'moderator').map((x) => '`' + x.name + '`').join(', ');

            message.channel.send({
                embed: {
                    color: 'RANDOM',
                    author: { name: 'Help panel' },
                    footer: { text: 'This bot uses a github project made by chaosgamingx.' },
                    fields: [
                        { name: 'Bot', value: infos },
                        { name: 'Music', value: music },
                        { name: 'Anime', value: anime},
                        { name: 'Games', value: games},
                        { name: 'Memes', value: memes},
                        { name: 'Misc', value: misc},
                        { name: 'Moderator', value: moderator},

                        { name: 'Filters', value: client.filters.map((x) => '`' + x + '`').join(', ') },
                    ],
                    timestamp: new Date(),
                    description: `To use filters, ${client.config.discord.prefix}filter (the filter). Example : ${client.config.discord.prefix}filter 8D.`,
                },
            });
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.channel.send(`${client.emotes.error} - I did not find this command !`);

            message.channel.send({
                embed: {
                    color: 'RANDOM',
                    author: { name: 'Help panel' },
                    footer: { text: 'This bot uses a Github project made by chaosgamingx.' },
                    fields: [
                        { name: 'Name', value: command.name, inline: true },
                        { name: 'Category', value: command.category, inline: true },
                        { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
                        { name: 'Utilisation', value: command.utilisation.replace('{prefix}', client.config.discord.prefix), inline: true },
                    ],
                    timestamp: new Date(),
                    description: 'Find information on the command provided.\nMandatory arguments `[]`, optional arguments `<>`.',
                }
            });
        };
    },
};
