
const Discord = require('discord.js')
module.exports = {
  name: "invite",
  description: "Invite me to your server!",
  category: 'infos',


  async execute(client, message, args) {

    const embed = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.addField("IF you need help with chaosvot then feel free to ask in the official ChaosBot server [here](https://discord.gg/PRzWKj4dBy)")
		.addField("If you want to add ChaosBot to your server", "than click [here](https://discord.com/oauth2/authorize?client_id=530267263501074443&scope=bot&permissions=2147483647)")
		.setTimestamp()
	message.channel.send(embed)
}}