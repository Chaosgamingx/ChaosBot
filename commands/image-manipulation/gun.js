const Color = "RANDOM";
const Discord = require("discord.js");

module.exports = {
  name: "gun",
  aliases: ["pistol", "handsup"],
  category: 'image-manipulation',
  description: "Shows targeting gun image",
  usage: "gun <user>",
  async execute(client, message, args) {
    
   const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Gun")
    .setImage(encodeURI
    (`https://api.devs-hub.xyz/gun?image=${Member.user.displayAvatarURL({ format: "png" })}`))
    .setTimestamp();

    return message.channel.send(Embed);
  }
};