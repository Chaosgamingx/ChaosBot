
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const Discord = require('discord.js');
module.exports = {
  name: 'birdfact',
  aliases: ['birdfacts', 'bf'],
  description: 'Generate a random useless bird facts',
  category: 'fun',
  cooldown: 3,


  async execute(client, message, args) {
    const data = await fetch("https://some-random-api.ml/facts/bird")
    .then (res => res.json()).catch(() => { })

    if (!data) return message.channel.send(`The API is currently down, come back later!`)

    const { fact } = data

    const embed = new Discord.MessageEmbed()

      .setColor('RANDOM')
      .setDescription(`${fact}`)
      .setFooter("/some-random-api/bird") 
      message.channel.send(embed)
  }
};