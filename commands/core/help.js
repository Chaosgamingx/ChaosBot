const Discord = require("discord.js")

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Core',
    utilisation: '{prefix}help <command name>',
    description: 'Shows the full command list or describes a specific command',

    execute(client, message, args) {
        if (!args[0]) {
            const infos = message.client.commands.filter(x => x.category == 'infos').map((x) => '`' + x.name + '`').join(', ');
            const DungeonsAndDragons = message.client.commands.filter(x => x.category == 'D&D').map((x) => '`' + x.name + '`').join(', ');
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

            let pageName = [
                "infos",
                "DungeonsAndDragons",
                "chatbot",
                "owner",
                "music",
                "anime",
                "games",
                "memes",
                "moderator",
                "fun",
                "images",
                "economy",
                "image_manipulation",
                "search"
            ]

            let pages = [
                infos,
                DungeonsAndDragons,
                chatbot,
                owner,
                music,
                anime,
                games,
                memes,
                moderator,
                fun,
                images,
                economy,
                image_manipulation,
                search
            ];
            let page = 1;

            const embed = new Discord.MessageEmbed()
                .setAuthor(`Help panel - ${pageName[page - 1]}`)
                .setColor('RANDOM')
                .setFooter(`This bot uses a github project made by Chaosgamingx!   page ${page} / ${pages.length}`)
                .setDescription(pages[page - 1])
                .setTimestamp(new Date())
            message.channel.send(embed).then(msg => {

                msg.react('⏪')
                    .then(r => {
                        msg.react('⏩')

                        //Filter
                        const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
                        const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

                        const backwards = msg.createReactionCollector(backwardsFilter, { time: 100000 });
                        const forwards = msg.createReactionCollector(forwardsFilter, { time: 100000 });

                        forwards.on('collect', r => {
                            if (page === pages.length) return;
                            page++;
                            embed.setAuthor(`Help panel - ${pageName[page - 1]}`)
                            embed.setDescription(pages[page - 1]);
                            embed.setColor('RANDOM')
                            embed.setFooter(`This bot uses a github project made by Chaosgamingx!   page ${page} / ${pages.length}`)
                            msg.edit(embed)
                        })

                        backwards.on('collect', r => {
                            if (page === 1) return;
                            page--;
                            embed.setAuthor(`Help panel - ${pageName[page - 1]}`)
                            embed.setColor('RANDOM')
                            embed.setDescription(pages[page - 1]);
                            embed.setFooter(`This bot uses a github project made by Chaosgamingx!   page ${page} / ${pages.length}`)
                            msg.edit(embed)
                        })

                    })
            })

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
                        { name: 'Description', value: command.description, inline: true },
                    ],
                    timestamp: new Date(),
                    description: 'Find information on the command provided.\nMandatory arguments `()`, optional arguments `<>`.',
                }
            });
        };
    },
};
