
const Discord = require('discord.js')
module.exports = {
  name: "invite",
  description: "Invite me to your server!",
  category: 'infos',
  utilisation: '{prefix}invite',
  description: '{prefix}sends the invite link for ChaosBot and its support server',


  async execute(client, message, args) {

    const embed = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.addField(`If you need help with chaosBot then feel free to ask in the official ChaosBot server ${client.config.discord.serverURL}`)
		.addField(`If you want to add ChaosBot to your server ${client.config.discord.inviteURL}`)
		.setTimestamp()
	message.channel.send(embed)
}}
