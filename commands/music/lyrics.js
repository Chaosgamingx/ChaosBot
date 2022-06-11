const discord = require('discord.js')
const { Lyrics } = require("@discord-player/extractor");
const lyricsClient = Lyrics.init();
module.exports = {
    name: 'lyrics',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}lyrics (Song title)',
    description: 'Sends the lyrics to a song of your choice',

    async execute(client, message, args) {
        const prefix = client.config.discord.prefix;

        const queue = client.player.getQueue(message);

        const query = args.slice(`${prefix}help`).join(" ");

        if (!query)
            return message.channel.send("You forgot to provide the song name.");

        const queryFormated = query
            .toLowerCase()
            .replace(/\(lyrics|lyric|official music video|official video hd|official video|audio|official|clip officiel|clip|extended|hq\)/g, "");

        const result = await lyricsClient.search(`${queryFormated}`);

        if (!result || !result.lyrics)
            return message.channel.send("No lyrics were found for this song.");

        const embed = new discord.MessageEmbed()
            .setTitle(`${query}`)
            .setDescription(`${result.lyrics.slice(0, 5996)}...`
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setThumbnail()

        return message.channel.send(embed).catch(console.error);
    }
};
