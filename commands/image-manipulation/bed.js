const Color = "RANDOM";
const Discord = require("discord.js");

module.exports = {
  name: "bed",
  aliases: [ "" ],
  category: 'image-manipulation',
  description: "Shows users in beds",
  utilisation: "{prefix}bed <user>",
  async execute(client, message, args) {
    
   const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (!Member) return message.channel.send("Please mention or give an ID of a member!")

    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Bed")
    .setImage(encodeURI
    (`https://api.devs-hub.xyz/bed?user1=${message.author.avatarURL({ format: "png" })}&user2=${Member.user.displayAvatarURL({ format: "png" })}`))
    .setTimestamp();

    return message.channel.send(Embed);
  }
};