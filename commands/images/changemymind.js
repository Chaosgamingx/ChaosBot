
const request = require('request-promise-native');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const discord = require('discord.js');
module.exports = {
        name: 'changemymind',
        aliases: ['chmm'],
        description: 'Sends a changemymind Text!',
        category: 'images',
        usage: '<text>',
        examples: [ 'changemymind Poggers' ],
        cooldown: 5,

    async execute(client, message, args) {

      
      try {
        let text = args.slice(0).join(" ")
    if(!text) return message.channel.send(new discord.MessageEmbed().setColor(client.color).setDescription(`add some words`));
    
     
    if(text.length > 85)  return message.channel.send(new discord.MessageEmbed().setColor(client.color).setDescription(`TOO MUCH, must be 85 or lower words`));
  
    let msg = await message.channel.send(new discord.MessageEmbed().setColor(client.color).setDescription("generating"))
   
        const data = await fetch(
            `https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`
          ).then((res) => res.json());
          msg.delete({timeout: 500})
          message.channel.send(new discord.MessageEmbed().setColor(client.color).setImage(data.message))
      
      } catch (err) {
        console.log(`${err}, command name: changemymind`)
        message.channel.send(language.changeError)
      }
    
    
        }}    