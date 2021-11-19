const Color = "RANDOM";
const Discord = require("discord.js");

module.exports = {
  name: "magik",
  aliases: ["magic", ""],
  category: 'image-manipulation',
  description: "Shows magic image",
  usage: "magik <user> <number>",
  async execute(client, message, args) {
    const Value = args.slice(1).join(" ");

    if (!Value || Value.length > 150) return message.channel.send("Please mention some one and after mention type number"); 
    
   const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Magik")
    .setImage(encodeURI
    (`https://api.devs-hub.xyz/magik?image=${Member.user.displayAvatarURL({ format: "png" })}?size=2048&level=${Value}`))
    .setTimestamp();

    return message.channel.send(Embed);
  }
};
