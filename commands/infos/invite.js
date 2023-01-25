
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
		.addField("IF you need help with chaosBot then feel free to ask in the official ChaosBot server", "[here](https://discord.gg/cSJuaWBBc7)")
		.addField("If you want to add ChaosBot to your server", "than click [here](https://discord.com/oauth2/authorize?client_id=1023731050251296769&permissions=4374424190327&scope=applications.commands%20bot)")
		.setTimestamp()
	message.channel.send(embed)
}}
