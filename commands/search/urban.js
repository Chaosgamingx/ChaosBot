const Discord = require("discord.js");
const axios = require('axios');

module.exports = {
    name: "urban",
    category: "search",
    description: "Pulls up the urban dictionary for anything you search",
    utilisation: "{prefix}urban (anything here)",
    category: 'search',
    async execute(client, message, args) {
        let query = args.join(" ")
        if (!query) {
            return message.channel.send("Hey there, I need something to search up in order to find anything in the urban dictionary.")
        }
        let link = "https://api.urbandictionary.com/v0/define?term="
        let fetch = await axios(link + encodeURI(query))
        fetch = fetch.data.list

        if(fetch.length === 0) {
            return message.channel.send("Unfortunately that search doesn't exist in the urban dictionary")
        }

        let data = fetch[0]
        let definition = data.definition
        let example = data.example
        let permalink = data.permalink
        let thumbsUp = data.thumbs_up
        let thumbsDown = data.thumbs_down
        let title = data.word


        definition = definition.length >= 1024 ? definition.slice(0, 1020) + "..." : definition
        example = example.length >= 1024 ? example.slice(0, 1020) + "..." : example


        const embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setURL(permalink)
        .setColor("RANDOM")
        .addField("Definition: ", definition)
        .addField("Example: ", example)
        .setFooter(`👍: ${thumbsUp} | 👎: ${thumbsDown}`)
        message.channel.send(embed)
    }
}
