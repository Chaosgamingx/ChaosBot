
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const discord = require("discord.js");

module.exports = {
        name: 'vaporwave',
        description: 'Vaporwavefies a text.',
        category: 'fun',
        examples: [ 'vaporwave POG' ],

    async execute(client, message, args) {
      
      if (!args[0]) return message.channel.send(`what do I say`);

      const vaporwavefied = args.toString().split('').map(char => {
        const code = char.charCodeAt(0)
        return code >= 33 && code <= 126 ? String.fromCharCode((code - 33) + 65281) : char
      }).join('').replace(/，/g, '  ')
      embed = new discord.MessageEmbed()
      .setDescription(vaporwavefied).setColor(client.color);
      message.channel.send(embed);
    }
};