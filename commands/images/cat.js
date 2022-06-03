
const request = require('request-promise-native');
const fetch = require('node-fetch');
const discord = require('discord.js');
module.exports = {
        name: 'cat',
        description: 'Get a cat picture!',
        category: 'images',
        utilisation: '{prefix}cat',
    
    

    async execute(client, message, args) {

        try {
          const res = await fetch('https://api.thecatapi.com/v1/images/search');
          const img = (await res.json())[0].url;
          const embed = new discord.MessageEmbed()
            .setImage(img)
            .setFooter(`/api.thecatapi.com/v1/images/search`)
            .setTimestamp()
          message.channel.send(embed);
        } catch (err) {
         console.log(`${err}, command name: cat`)
         message.channel.send("an error occured")
        }

        }}    
