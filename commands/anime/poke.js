<<<<<<< HEAD
const Discord = require('discord.js')
const fetch = require("node-fetch");

module.exports = {
  name: 'poke',
  aliases: [],
  category: 'anime',
  utilisation: '{prefix}poke (user)',
    description: "poke a person",

  async execute(client, message, args) {
    const body = await fetch(`https://nekos.life/api/v2/img/poke`)
      .then((r) => r.json());



      if (message.mentions.users.size < 1) return message.channel.send("you need to mention somebody to poke");

        let user = message.guild.member(message.mentions.users.first());


        message.channel.send(`${user} You got poked from ${message.author.username}`)
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(body.url)
        message.channel.send(embed)

  }
}
=======
const Discord = require('discord.js')
const fetch = require("node-fetch");

module.exports = {
  name: 'poke',
  aliases: [],
  category: 'anime',
  utilisation: '{prefix}poke (user)',
    description: "poke a person",

  async execute(client, message, args) {
    const body = await fetch(`https://nekos.life/api/v2/img/poke`)
      .then((r) => r.json());



      if (message.mentions.users.size < 1) return message.channel.send("you need to mention somebody to poke");

        let user = message.guild.member(message.mentions.users.first());


        message.channel.send(`${user} You got poked from ${message.author.username}`)
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(body.url)
        message.channel.send(embed)

  }
}
>>>>>>> c4c33d33076e0cb86ffd20f1b54f2365ef2043ef
