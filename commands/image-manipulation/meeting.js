const Color = "RANDOM";
const Discord = require("discord.js");

module.exports = {
  name: "meeting",
  aliases: ["amongusmeeting", "mtg"],
  category: 'image-manipulation',
  description: "Return an Among Us meeting image!",
  utilisation: "{prefix}meeting <Text>",
  async execute(client, message, args) {
    
    const Value = args.join(" ");

    if (!Value || Value.length > 150) return message.channel.send("Please Give Meeting Text And Make Sure Its Not 150+ Characters Long!"); 

    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Emergency Meeting (" + message.author.username + ")")
    .setImage(encodeURI(`https://vacefron.nl/api/emergencymeeting?text=${Value}`))
    .setTimestamp();

    return message.channel.send(Embed);
  }
};