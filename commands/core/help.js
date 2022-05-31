module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Core',
    utilisation: '{prefix}help <command name>',

    execute(client, message, args) {
        if (!args[0]) {
            const infos = message.client.commands.filter(x => x.category == 'infos').map((x) => '`' + x.name + '`').join(', ');
            const chatbot = message.client.commands.filter(x => x.category == 'chatbot').map((x) => '`' + x.name + '`').join(', ');
            const owner = message.client.commands.filter(x => x.category == 'owner').map((x) => '`' + x.name + '`').join(', ');
            const music = message.client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');
            const anime = message.client.commands.filter(x => x.category == 'anime').map((x) => '`' + x.name + '`').join(', ');
            const games = message.client.commands.filter(x => x.category == 'games').map((x) => '`' + x.name + '`').join(', ');
            const memes = message.client.commands.filter(x => x.category == 'memes').map((x) => '`' + x.name + '`').join(', ');
            const moderator = message.client.commands.filter(x => x.category == 'moderator').map((x) => '`' + x.name + '`').join(', ');
            const fun = message.client.commands.filter(x => x.category == 'fun').map((x) => '`' + x.name + '`').join(', ');
            const images = message.client.commands.filter(x => x.category == 'images').map((x) => '`' + x.name + '`').join(', ');
            const economy = message.client.commands.filter(x => x.category == 'economy').map((x) => '`' + x.name + '`').join(', ');
            const image_manipulation = message.client.commands.filter(x => x.category == 'image-manipulation').map((x) => '`' + x.name + '`').join(', ');
            const search = message.client.commands.filter(x => x.category == 'search').map((x) => '`' + x.name + '`').join(', ');

            message.channel.send({
                embed: {
                    color: 'RANDOM',
                    author: { name: 'Help panel' },
                    footer: { text: 'This bot uses a github project made by chaosgamingx.' },
                    fields: [
                        { name: 'Bot', value: infos },
                        { name: 'Chatbot', value: chatbot },
                        { name: 'Owner', value: owner },
                        { name: 'Music', value: music },
                        { name: 'Anime', value: anime},
                        { name: 'Games', value: games},
                        { name: 'Memes', value: memes},
                        { name: 'Moderator', value: moderator},
                        { name: 'Fun', value: fun },
                        { name: 'Images', value: images },
                        {name: 'Economy', value: economy},
                        {name: 'Image manipulation', value: image_manipulation},
                        {name: 'search', value: search},

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
