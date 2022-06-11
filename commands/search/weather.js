const weather = require('weather-js')
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "weather",
    aliases: [],
    description: "Tells the weather of any location you enter",
    utilisation: '{prefix}weather (location) (C or F)',

    async execute(client, message, args) {
        weather.find(
            { search: args.join(' '), degreeType: args[1] },
            function (error, result) {
                // 'C' can be changed to 'F' for farneheit results
                if (!args[0]) {
                    const error1 = new MessageEmbed()
                        .setTitle('Error Usage')
                        .setDescription("Please specify a location")
                        .setColor("RED")
                    return message.channel.send(error1);
                }

                if (!args[1]) {
                    const error2 = new MessageEmbed()
                        .setTitle('Error Usage')
                        .setDescription("Please specify the degree type. options are F and C")
                        .setColor("RED")
                    return message.channel.send(error2);
                }

                if (result === undefined || result.length === 0) {
                    const error3 = new MessageEmbed()
                        .setTitle('Error 404')
                        .setDescription(`Couldn't Find This Country`)
                        .setColor("RED")
                    return message.channel.send();
                }

                const current = result[0].current;
                const location = result[0].location;

                const roleColor =
                    message.guild.me.displayHexColor === '#000000'
                        ? '#ffffff'
                        : message.guild.me.displayHexColor;

                if (args[1] === 'f' || 'F') {
                    const degreetypes = "Fahrenheit"

                    const weatherinfo = new MessageEmbed()
                        .setDescription(`**${current.skytext}**`)
                        .setAuthor(`Weather Information for ${current.observationpoint}`)
                        .setColor("RANDOM")
                        .setThumbnail(current.imageUrl)
                        .setColor(roleColor)
                        .addField('Timezone', `UTC${location.timezone}`, true)
                        .addField('Degree Type', degreetypes, true)
                        .addField('Temperature', `${current.temperature}°`, true)
                        .addField('Wind', current.winddisplay, true)
                        .addField('Feels like', `${current.feelslike}°`, true)
                        .addField('Humidity', `${current.humidity}%`, true)
                        .setFooter(
                            message.author.tag,
                            message.author.displayAvatarURL({ dynamic: true })
                        );

                    message.channel.send(weatherinfo);

                } else if (args[1] === "c" || 'C') {
                    const degreetypes = "Celcius"

                    const weatherinfo = new MessageEmbed()
                        .setDescription(`**${current.skytext}**`)
                        .setAuthor(`Weather Information for ${current.observationpoint}`)
                        .setColor("RANDOM")
                        .setThumbnail(current.imageUrl)
                        .setColor(roleColor)
                        .addField('Timezone', `UTC${location.timezone}`, true)
                        .addField('Degree Type', degreetypes, true)
                        .addField('Temperature', `${current.temperature}°`, true)
                        .addField('Wind', current.winddisplay, true)
                        .addField('Feels like', `${current.feelslike}°`, true)
                        .addField('Humidity', `${current.humidity}%`, true)
                        .setFooter(
                            message.author.tag,
                            message.author.displayAvatarURL({ dynamic: true })
                        );

                    message.channel.send(weatherinfo);
                }
            }
        );
    }
}