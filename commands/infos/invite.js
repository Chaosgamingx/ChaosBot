const buttons = require("discord-buttons")
const Discord = require('discord.js')
module.exports = {
  name: "invite",
  description: "Invite me to your server!",
  category: 'infos',


  async execute(client, message, args) {


    const embed = new Discord.MessageEmbed()
      .setDescription("Hello there, if you want to invite ChaosBot to your server then just click on that little box below this embed, hope you enjoy")


    let button = new buttons.MessageButton()
      .setStyle('url')
      .setURL('https://npmjs.com/discord-buttons')
      .setLabel("ChaosBot's invite link");

    message.channel.send(embed, button);
  }
};
