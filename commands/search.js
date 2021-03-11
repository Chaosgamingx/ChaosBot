const { MessageEmbed } = require('discord.js');
const request = require("node-superfetch"); // npm i node-superfetch
const key = ('AIzaSyC_OBUqmnkcz_L06tkrRLgqIch0nDKgTeQ')// you need a google api key

module.exports = {
    name: 'search',
    aliases: ['ytsearch'],
    description: "search youtube videos",
    async execute(client, message, cmd, args, Discord) {

        try {
            const query = args.join(` `);
            if (!query) return message.channel.send("enter something so i can search 👀");
            const { body } = await request
                .get('https://www.googleapis.com/youtube/v3/search')
                .query({
                    part: 'snippet',
                    type: 'video',
                    maxResults: 1,
                    q: query,
                    key: (key)
                });
            if (!body.items.length) return message.channel.send('no results found for ' + query + ".");
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTimestamp(new Date())
                .setTitle(`${body.items[0].snippet.title} - ${body.items[0].snippet.channelTitle}`)
                .setDescription(body.items[0].snippet.description)
                .setAuthor('YouTube', 'https://seeklogo.net/wp-content/uploads/2020/03/YouTube-icon-SVG-512x512.png')
                .setURL(`https://www.youtube.com/watch?v=${body.items[0].id.videoId}`)
                .setThumbnail(body.items[0].snippet.thumbnails.default.url)
                .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(embed).catch(console.error);
        } catch (err) {
            if (err.status === 404) return message.reply('i cant find any results for that video :(');
            console.log(err);
            return message.channel.send(`sorry :( i got an error while trying to get you a result. try again later!`);
        }

    }
}
