
const request = require('request-promise-native');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const discord = require('discord.js');
module.exports = {
        name: 'cat',
        description: 'Get a cat picture!',
        category: 'images',
    
    

    async execute(client, message, args) {

        try {
          const res = await fetch('https://api.thecatapi.com/v1/images/search');
          const img = (await res.json())[0].url;
          const embed = new discord.MessageEmbed()
            .setImage(img)
            .setFooter(`/api.thecatapi.com/v1/images/search`)
            .setTimestamp()
            .setColor(client.color.blue)
          message.channel.send(embed);
        } catch (err) {
         console.log(`${err}, command name: cat`)
         message.channel.send("an error occured")
        }

        }}    
