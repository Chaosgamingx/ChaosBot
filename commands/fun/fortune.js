const fortunes = require('../../data/fortunes.json');
const discord = require('discord.js')

module.exports = {
    name: 'fortune',
    aliases: [],
    category: 'fun',
    utilisation: '{prefix}fortune',
    description: 'Reads your fotune',

    async execute(client, message, args) {
        let m = await message.channel.send("**You've cracked your cooke, Generating your fortune...**");
        try {
            const embed = new discord.MessageEmbed()
                .setTitle("🥠 Your fortune 🥠")
                .setDescription(`${fortunes[Math.floor(Math.random() * fortunes.length)]}`)
                .setTimestamp()
                .setFooter(`${message.author.username}'s fortune`)
            message.channel.send(embed);
            m.delete({ timeout: 5000 });
        } catch (e) {
            console.log(e);
            m.edit("Error, Try Again!");
        }
    }
}