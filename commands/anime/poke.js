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
