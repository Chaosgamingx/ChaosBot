const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "today",
    category: "Other",
    description: "History lessons",
    usage: "today\n**e.g.**\n\`today\`\n> Get a random fact that took place today",
    category: 'search',
    async execute(client, message, arg) {

        const text = await fetch('http://history.muffinlabs.com/date')
            .then(response => response.json());
        const events = text.data.Events;
        const event = events[Math.floor(Math.random() * events.length)];
        const embed = new Discord.MessageEmbed()
            .setColor(0x00A2E8)
            .setURL(text.url)
            .setTitle(`On this day (${text.date})...`)
            .setTimestamp()
            .setDescription(`${event.year}: ${event.text}`);
        return message.channel.send(embed).catch(console.error);
    }
}