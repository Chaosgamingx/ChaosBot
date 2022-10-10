
const fetch = require('node-fetch');
const Discord = require('discord.js');
module.exports = {
        name: 'dogfact',
        aliases: ['df'],
        utilisation: '{prefix}dogfact',
        description: 'Generate a random useless dog facts',
        category: 'fun',

    async execute(client, message, args) {
  
      const res = await fetch('https://dog-api.kinduff.com/api/facts');
      const fact = (await res.json()).facts[0];

      const embed = new Discord.MessageEmbed()
        .setDescription(fact)
        .setFooter(`/dog-api.kinduff/api/fact`)
        .setTimestamp()
        .setColor(client.color);
      message.channel.send(embed).catch(() => {});

    }
};
