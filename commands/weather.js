const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: 'weather',
    aliases: ['wthr'],
    async execute(client, message, cmd, args, Discord) {
    
        weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
        // 'C' can be changed to 'F' for farneheit results
        if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('Please specify a location')

        if(result === undefined || result.length === 0) return message.channel.send('**Invalid** location');

        const dc = Math.round(((result[0].current.temperature - 32) * 5 / 9) * 100) / 100
                const dc2 = Math.round(((result[0].current.feelslike - 32) * 5 / 9) * 100) / 100
                const b4 = result[0].current.winddisplay.split(' ')
                const a4 = Math.round(b4[0] * 1.609344) + 'mph' + b4[2] 

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Weather in: ${result[0].location.name}`)
        .setThumbnail(result[0].current.imageUrl)
        .setDescription('Timezone', `UTC${location.timezone}`, true)
        .addField('Tempature: ', `${result[0].current.temperature}°F \n ${dc}°C`, true)
        .addField('Feels Like: ', `${result[0].current.feelslike}°F \n ${dc2}°C`, true)
        .addField('Humidity: ', `${result[0].current.humidity}%`, true)
        .setDescription(`**Sky weather:** ${result[0].current.skytext} \n\n **Wind info:** ${result[0].current.winddisplay} (${a4}) \n\n **Timezone** UTC${location.timezone}`)

        message.channel.send(weatherinfo)
        })        
    }
}