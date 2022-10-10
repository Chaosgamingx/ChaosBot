const { MessageEmbed } = require('discord.js') // npm i discord.js
const fetch = require('node-fetch') // npm i node-fetch

module.exports = { // Update To Your Handler
    name: 'wiki',
    aliases: ['wikipedia'],
    category: 'search',
    utilisation: '{prefix}wikipedia (anything here)', 
    description: 'Search wikipedia',

    async execute(client, message, args) { // Update To Your Handler

        const wiki = args.slice().join(' ')
        if(!wiki) return message.reply('Provide A Query To Search.') // If No Topic Provided To Searched
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}` // From Here BOT Will Search For Searched Topic

        let response
        try {
            response = await fetch(url).then(res => res.json()) // Getting Result
        }      
        catch (e) {
            return message.reply('An Error Occured, Try Again.') // If Error Occur's
        }

        try {
            if(response.type === 'disambiguation') { // If Their Are Many Results With Same Searched Topic
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(response.title) // Title Of Topic
                .setURL(response.content_urls.desktop.page) // URL Of Searched Topic
                .setDescription([`
                ${response.extract}
                Links For Topic You Searched [Link](${response.content_urls.desktop.page}).`]) 
                message.channel.send(embed)
            }
            else { // If Only One Result
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(response.title) // Title Of Topic
                .setURL(response.content_urls.desktop.page) // URL Of Searched Topic
                .setThumbnail(response.thumbnail.source)
                .setDescription(response.extract)
                message.channel.send(embed)
            }
        }
        catch {
            return message.reply('Provide A Valid Query To Search.') // If Searched Topic Is Not Available
        }
    }
}