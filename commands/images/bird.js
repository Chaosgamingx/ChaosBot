
const request = require('request-promise-native');
const fetch = require('node-fetch');
const discord = require('discord.js');
module.exports = {
  name: 'bird',
  description: 'Get a bird picture!',
  category: 'images',

  async execute(client, message, args) {
    

    

    try {
      const res = await fetch('http://shibe.online/api/birds');
      const img = (await res.json())[0];
      const embed = new discord.MessageEmbed()
        .setImage(img)
        .setFooter(`/shibe.online/api/birds`)
        .setTimestamp()
        .setColor(client.color);
      message.channel.send(embed);

    } catch (err) {
      console.log(`${err}, command name: bird`)
      message.channel.send("an error occured")

    }
  }
}
