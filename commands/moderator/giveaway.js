const Discord = require('discord.js')
const ms = require('ms')
module.exports = {
    name: 'giveaway',
    aliases: [],
    category: 'moderator',
    utilisation: '{prefix}giveaway time choices: s(seconds), m(minutes), d(days) prize',

   async execute(client, message, args) {
        // !giveaway {time s/m/d} {item}
        const messageArray = message.content.split(" ");
        if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("You don't have administrator privileges to start a giveaway!")
        var item = "";
        var time;
        var winnerCount;
        for (var i = 1; i < args.length; i++) {
            item += (args[i] + " ");
        }
        time = args[0];
        if (!time) {
            return message.channel.send(`please provide a time (choices: s(seconds), m(minutes), h(hours) d(days) example: 1m)`);
        }
        if (!item) {
            return message.channel.send('please provide a prize')
        }
        var embed = new Discord.MessageEmbed();
        embed.setColor(0x3333ff);
        embed.setTitle("New Giveaway!");
        embed.setDescription("**" + item + "**");
        embed.addField(`Duration : `, ms(ms(time), {
            long: true
        }), true);
        embed.setFooter("React to this message with 🥳 to participate!");
        var embedSent = await message.channel.send(embed);
        embedSent.react("🥳");

        setTimeout(async () => {
            try {
                const peopleReactedBot = await embedSent.reactions.cache.get("🥳").users.fetch();
                var peopleReacted = peopleReactedBot.array().filter(u => u.id !== client.user.id);
            } catch (e) {
                return message.channel.send(`An unknown error happened during the draw of the giveaway **${item}** : ` + "`" + e + "`")
            }
            var winner;

            if (peopleReacted.length <= 0) {
                return message.channel.send(`Not enough participants to execute the draw of the giveaway **${item}** :(`);
            } else {
                var index = Math.floor(Math.random() * peopleReacted.length);
                winner = peopleReacted[index];
            }
            if (!winner) {
                message.channel.send(`An unknown error happened during the draw of the giveaway **${item}**`);
            } else {
                console.log(`Giveaway ${item} won by ${winner.toString()}`)
                message.channel.send(`🥳 **${winner.toString()}** has won the giveaway **${item}**! Congratulations! 🥳`);
            }
        }, ms(time));
    }
}