const Discord = require("discord.js");

module.exports = {
  name: 'suggest',
  aliases: [],
  category: 'infos',
  utilisation: '{prefix}suggest (what you want to see added/changed))',
  description: 'Allows you to submit a suggestion you want to see added/changed to ChaosBot',

  execute(client, message, args) {

    if (!args[0]) return message.reply("Please submit a suggestion. What do you wish to see added/changed");
    const guild = client.guilds.cache.get("977403664903860244");
    let rchannel = guild.channels.cache.get("1064301468498280478")
    let suggestion = args.slice(`${client.config.discord.prefix}suggest`).join(" ");

    let embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag)
      .setColor("RANDOM")
      .setDescription(`Dear ${message.author.username}, your submission has been successfully sent. We shall review your submission and see what we can do! Thanks`)
      .addField(`Sincerely,`, `-Chaosgamingx`);

    message.channel.send(embed)


    let embed2 = new Discord.MessageEmbed()
    .setDescription(suggestion)
    .setTimestamp()

    rchannel.send(embed2)
  }
}