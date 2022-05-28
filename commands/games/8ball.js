const Discord = require("discord.js");

module.exports = {
  name: '8ball',
  aliases: [],
  category: 'games',
  utilisation: '{prefix}8ball (question)',

  execute(client, message, args) {

    if (!args[1]) return message.reply("please ask a full question");
    let replies = ["As I see it, yes.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "It is certain.", "It is decidedly so."];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(`${client.config.discord.prefix}8ball`).join(" ");

    let ballembed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag)
      .setColor("RANDOM")
      .addField("Question", question)
      .addField("Answer", replies[result]);

    message.channel.send(ballembed)



  }
}
