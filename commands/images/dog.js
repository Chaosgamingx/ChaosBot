
const request = require('request-promise-native');
const fetch = require('node-fetch');
const discord = require('discord.js');
module.exports = {
        name: 'dog',
        description: 'Get a cute dog picture!',
        category: 'images',

    async execute(client, message, args) {

     
      try {
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const img = (await res.json()).message;
        const embed = new discord.MessageEmbed()
          .setImage(img)
          .setFooter('/dog.ceo/api/breeds/image/random')
          .setColor(message.guild.me.displayHexColor)
        message.channel.send(embed);
      } catch (err) {
      console.log(`${err}, command name: dog`)
       message.reply("an error occured")
  
      }

        }}    
