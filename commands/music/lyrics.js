const Discord = require("discord.js");
const lyricsfinder = require("lyrics-finder");

module.exports = {
    name: 'lyrics',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}lyrics (author)',

    async execute(client, message, args) {

        if (args.length < 1) return message.channel.send("Please say the authors name");

        let artist = args.join(" ");
        let songname = '';
        let pages = [];
        let currentpage = 0;

        const messageFilter = m => m.author.id === message.author.id;
        const reactionFilter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && (message.author.id === user.id)

        message.channel.send("please enter the song name now (dont use =lyrics for this part)");
        await message.channel.awaitMessages(messageFilter, { max: 1, time: 15000 }).then(async collected => {
            songname = collected.first().content;
            await finder(artist, songname, message, pages)
        }).catch(error => { message.channel.send("failed to type a song name in 15 seconds") });

        const lyricEmbed = await message.channel.send(`Lyrics page: ${currentpage + 1}/${pages.length}`, pages[currentpage])
        await lyricEmbed.react("⬅️");
        await lyricEmbed.react("➡️");

        const collector = lyricEmbed.createReactionCollector(reactionFilter);

        collector.on('collect', (reaction, user) => {
            if(reaction.emoji.name === '➡️'){
                if(currentpage < pages.length-1){
                    currentpage+=1;
                    lyricEmbed.edit(`Lyrics page: ${currentpage+1}/${pages.length}`, pages[currentpage])
                }
            }else if(reaction.emoji.name === '⬅️'){
                if (currentpage !== 0){
                    currentpage -= 1;
                    lyricEmbed.edit(`Lyrics Page: ${currentpage+1}/${pages.length}`, pages[currentpage])
                }
            };

        })
    }
}

async function finder(artist, songname, message, pages) {
    let fullLyrics = await lyricsfinder(artist, songname) || "Not Found!";
    for (let i = 0; i < fullLyrics.length; i += 2048) {
        const lyric = fullLyrics.substring(i, Math.min(fullLyrics.length, i + 2048))
        const msg = new Discord.MessageEmbed()
            .setDescription(lyric)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(message.author.tag, message.author.displayAvatarURL());
        pages.push(msg);
    }
}
