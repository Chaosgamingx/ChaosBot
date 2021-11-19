const fs = require('fs');
const discord = require('discord.js');
const mongoose = require('mongoose')

const client = new discord.Client();
client.options.http.api = "https://discord.com/api"


const { Player } = require('discord-player');

client.player = new Player(client);
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new discord.Collection();

///////////////////////////////COMMAND AND EVENT LOADING///////////////////////////////
fs.readdirSync('./commands').forEach(dirs => {
	const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

	for (const file of commands) {
		const command = require(`./commands/${dirs}/${file}`);
		console.log(`Loading command ${file}`);
		client.commands.set(command.name.toLowerCase(), command);
	};
});


const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./data/player').filter(file => file.endsWith('.js'));

for (const file of events) {
	console.log(`Loading discord.js event ${file}`);
	const event = require(`./events/${file}`);
	client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
	console.log(`Loading discord-player event ${file}`);
	const event = require(`./data/player/${file}`);
	client.player.on(file.split(".")[0], event.bind(null, client));
};

///////////////////////////////GUILD INTERACTION///////////////////////////////
client.on('guildCreate', (guild) => {
	let channelToSend;

	guild.channels.cache.forEach((channel) => {
		if (channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES")
		) channelToSend = channel;
	});
	if (!channelToSend) return;

	const embed = new discord.MessageEmbed()
		.setColor("RANDOM")
		.addField("Thanks for inviting ChaosBot to your server! my prefix is `=`", "If you have any questions about ChaosBot, feel free to ask in the official ChaosBot server [here](https://discord.gg/PRzWKj4dBy)")
		.addField("If you want to add ChaosBot to your server", "than click [here](https://discord.com/oauth2/authorize?client_id=530267263501074443&scope=bot&permissions=2147483647)")
		.setTimestamp()
	channelToSend.send(embed)
})


const welcomeSchema = require("./models/welcomeSchema")
client.on('guildMemberAdd', async (member, guild) => {
	welcomeSchema.findOne({ guildId: member.guild.id }, async (err, data) => {
		if(!data) return

		const user = member.user
		const channel = member.guild.channels.cache.get(data.channelId)
		const welcomemsg = data.welcomeMSG

		channel.send(`${user} ` + welcomemsg)
	})
})

///////////////////////////////MONGOOSE CONENCTED AND ALL FILES LOADED///////////////////////////////

mongoose.connect("Put mongodb URI here", {  		//replace Put mongodb URI here with the URI. leave the ""
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}).then(() => {
	console.log("connected to mongo and all files loaded")
}).catch((err) => {
	console.log(err);
})

client.login("Put bot token here");		//replace put bot token here with the bot token. leave the ""
