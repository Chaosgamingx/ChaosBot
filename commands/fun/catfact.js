
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
module.exports = {
        name: 'catfact',
        aliases: [ 'catfacts', 'cf' ],
        utilisation: '{prefix}catfact',
        description: 'Generate a random useless cat facts',
        category: 'fun',

    async execute(client, message, args) {
  
    
      const res = await fetch('https://catfact.ninja/fact').catch(() => {});
      const fact = (await res.json()).fact;
      const embed = new MessageEmbed()
        .setDescription(fact)
        .setFooter(`/catfact.ninja/fact`)
        .setTimestamp()
        .setColor(client.color);
      message.channel.send(embed).catch(() => {});

    }
};
