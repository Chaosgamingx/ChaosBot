const radio = require("../../config/stations.json")
const Discord = require('discord.js')
const config = require("../../data/radio/radio.json")
const fetch = require("node-fetch")
const { Application } = require("opusscript")


module.exports = {
    name: 'radio',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}radio <station>',
    description: 'play the radio',

    async execute(client, message, args) {

        if (!message.member.voice.channel) {
            message.channel.send('You are not in a voice channel, **join a voice chat and try again!**')
        } else {
            const searchStation = args.join(" ").toLowerCase()
            let url
            let radiostation
            let streamurl
            let channel_id
            let found = false

            Object.keys(radio).forEach(function (stn) {
                if (radio[stn].alias.includes(searchStation)) {
                    url = config.radio.webURL + stn
                    radiostation = radio[stn].name
                    streamurl = radio[stn].streamurl
                    channel_id = radio[stn].channel_id
                    found = true
                }
            })

            if (found) {
                let now = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
                let past = new Date().toISOString().split('T')[0] + 'T00:00:00'

                try {
                    message.member.voice.channel.join()
                        .then(connection => {
                            fetch(config.radio.apiURL + 'timeline?channel_id=' + channel_id + '&client_id=0&to=' + now + '&from=' + past + '&limit=1')
                                .then(res => res.json()).catch(err => console.log(err)) 
                                .then(json => {
                                    const playingEmbed = new Discord.MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('Now playing')
                                        .setURL(config.radio.webURL)
                                        .setAuthor(client.user.username)
                                        .setTimestamp()
                                        .addField(radiostation, url)
                                        .addField("now playing the radio")
                                        .setFooter(client.user.username)
                                    message.delete().catch(O_o => { })
                                    message.channel.send(playingEmbed)
                                        .then(connection.play(streamurl))
                                })
                        })
                } catch (ex) {
                    console.log(ex.stack);
                }
            } else {
                const pEmbed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Play radio')
                    .setURL(config.radio.webURL)
                    .setAuthor(client.user.username, config.radio.webURL, config.radio.webURL)
                    .setTimestamp()
                    .setDescription("You need to select channel!")
                    .setFooter(client.user.username, client.user.avatarURL)
                for (var stn in radio) {
                    stnName = radio[stn].name
                    cmd = "=radio " + radio[stn].alias
                    pEmbed.addField('Listen to ' + stnName, cmd)
                }
                message.channel.send(pEmbed)

            }
        }

    }
}
