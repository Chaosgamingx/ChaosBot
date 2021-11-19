const Color = "RANDOM";
const Discord = require("discord.js");

module.exports = {
  name: "jail",
  aliases: ["j"],
  category: 'image-manipulation',
  description: "Shows image of jail",
  usage: "jail <user>",
  async execute(client, message, args) {
    
   const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Jail")
    .setImage(encodeURI
    (`https://api.devs-hub.xyz/jail?image=${Member.user.displayAvatarURL({ format: "png" })}`))
    .setTimestamp();

    return message.channel.send(Embed);
  }
};