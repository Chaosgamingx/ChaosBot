
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const discord = require('discord.js');
const request = require('request-promise-native');


module.exports = {
        name: 'impostor',
        aliases: ['imposter'],
        description: 'Be an impostor',
        category: 'images',
        usage: '<text>',
        examples: [ 'imposter Koni' ],

    async execute(client, message, args) {

      try {
        let text = args.slice(0).join(" ")
        if(!text) return message.channel.send(new discord.MessageEmbed().setColor(client.color).setDescription(`add some words`));
        if(text.length > 40) return message.channel.send(new discord.MessageEmbed().setColor(client.color).setDescription(`TOO MUCH, either 40 words or lower`));
        //https://vacefron.nl/api/ejected?name=[MESSAGE]&imposter=true&crewmate=red
        let options = {
          url: 'https://vacefron.nl/api/ejected',
          qs: {
            name: args.join(' ').split('').join(''),
            imposter: true,
            crewmate: 'red'
          },
          encoding: null
        };
      
        let response = await request(options);
      
        await message.channel.send({
          files: [ response ]
        });
      } catch(error) {
        this.client.emit("apiError", error, message);
      }
    }
};
