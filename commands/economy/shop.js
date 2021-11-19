
const rifle = '🔫'
const axe = '🪓'
const pick = '⛏️'
const rc = '🌈'
const ht = '🏆'

const Discord = require("discord.js")
const profileModel = require('../../models/profileSchema')
module.exports = {
    name: 'shop',
    aliases: [],
    category: 'economy',
    utilisation: '{prefix}help <command name>',

    async execute(client, message, args) {
        const member = message.author;
        let timeout = 5;

        let pages = [
            `🍪 **Cookie - __50__** __coins__\n\`id: cookie\`\nUse to make you fatter`,
            `${rifle} **Rifle - __22__,__500__** __coins__\n\`id: rifle\`\nUse this to go hunting\n${axe} **Axe - __20__,__000__** __coins__\n\`id: axe\`\nUse this to cut trees down!\n🎣 **Fishing Rod - __15__,__000__** __coins__\n\`id: fishingrod\`\nUse this to go fishing!\n${pick} **Pickaxe - __30__,__000__** __coins__\n\`id: pickaxe\`\nUse this to mine gems!`,
            `**Rainbow Coin - __100__,__000__,__000__** __coins__\n\`id: rainbowcoin\`\n **Gold Coin - __50__,__000__,__000__** __coins__\n\`id: goldcoin\`\n **Silver Coin - __15__,__000__,__000__** __coins__\n\`id: silvercoin\`\n ** Bronze Coin - __5__,__000__,__000__** __coins__\n\`id: bronzecoin\`\n${ht} **Trophy - __100__,__000__,__000__** __coins__\n\`id: trophy\``
        ];
        let page = 1;


        const embed = new Discord.MessageEmbed()
            .setAuthor(`Welcome ${member.username} To the Chaos Shop`)
            .setColor('RANDOM')
            .setThumbnail(member.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
            .setFooter(`page ${page} / ${pages.length}`)
            .setDescription(pages[page - 1])
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
                        embed.setDescription(pages[page - 1]);
                        embed.setColor('RANDOM')
                        embed.setFooter(`Page ${page} / ${pages.length}`)
                        msg.edit(embed)
                    })

                    backwards.on('collect', r => {
                        if (page === 1) return;
                        page--;
                        embed.setColor('RANDOM')
                        embed.setDescription(pages[page - 1]);
                        embed.setFooter(`Page ${page} / ${pages.length}`)
                        msg.edit(embed)
                    })

                })
        })
    }
}