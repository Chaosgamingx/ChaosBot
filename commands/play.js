const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const Discord = require('discord.js');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip', 'disconnect', 'nowplaying', 'queue', 'resume', 'pause'], //We are using aliases to run the skip and stop command follow this tutorial if lost: https://www.youtube.com/watch?v=QBUJ3cdofqc
    cooldown: 0,
    description: 'Advanced music bot',
    async execute(client, message, cmd, args, Discord) {


        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command!');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissins');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissins');

        //This is our server queue. We are getting this server queue from the global queue.
        const server_queue = queue.get(message.guild.id);

        //If the user has used the play command
        if (cmd === 'play') {
            if (!args.length) return message.channel.send('You need to send the second argument!');
            let song = {};

            //If the first argument is a link. Set the song object to have two keys. Title and URl.
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
                const video_finder = async (query) => {
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video) {
                    song = { title: video.title, url: video.url }
                } else {
                    message.channel.send('Error finding video.');
                }
            }

            //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
            if (!server_queue) {

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }

                //Add our key and value pair into the global queue. We then use this to get our server queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);

                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('There was an error connecting!');
                    throw err;
                }
            } else {
                server_queue.songs.push(song);


                const addedEmbed = new Discord.MessageEmbed()
                    .setDescription(`**${song.title}** added to queue!`)
                    .setColor("RANDOM")
                    .setTimestamp();
                message.channel.send(addedEmbed)



            }
        }

        else if (cmd === 'skip') skip_song(message, server_queue);
        else if (cmd === 'disconnect') stop_song(message, server_queue);
        else if (cmd === 'nowplaying') display_song(message, server_queue);
        else if (cmd === 'queue') display_queue(message, server_queue);
        else if (cmd === 'resume') resume_song(message, server_queue);
        else if (cmd === 'pause') pause_song(message, server_queue);
    }

}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
        .on('finish', () => {
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
        });
    await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`)

}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a vc to use this command');
    if (!server_queue) {
        return message.channel.send(`There are no songs in queue`);
    }
    const Skipembed = new Discord.MessageEmbed()
        .setDescription('Skipped')
        .setColor("RANDOM")
        .setTimestamp();
    message.channel.send(Skipembed)



    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a vc to use this command');
    server_queue.songs = [];

    const StopEmbed = new Discord.MessageEmbed()
        .setDescription('Disconnected')
        .setColor("RANDOM")
        .setTimestamp();
    message.channel.send(StopEmbed)

    server_queue.connection.dispatcher.end();
}

const display_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a vc to use this command')
    if (!server_queue) return message.channel.send('There is currently no song/video playing.');

    const DisplayEmbed = new Discord.MessageEmbed()
        .setTitle('Now playing')
        .setDescription(`${server_queue.songs[0].title}`)
        .setColor("RANDOM")
        .setTimestamp();
    message.channel.send(DisplayEmbed)



}

const display_queue = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a vc to use this command')
    if (!server_queue) return message.channel.send('There is currently no queue')

    const queueEmbed = new Discord.MessageEmbed()
        .setTitle(`Server queue for - ${message.guild.name}`)
        .setDescription(`${server_queue.songs.map(song => `- ${song.title}`).join('\n')}`)
        .setColor("RANDOM")
        .setTimestamp();
    message.channel.send(queueEmbed)

}

const resume_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a vc to use this command')
    if (!server_queue) return message.channel.send('There is currently no queue')

    server_queue.playing = true
    server_queue.connection.dispatcher.resume()


    const resumeEmbed = new Discord.MessageEmbed()
        .setDescription('Resumed')
        .setColor("RANDOM")
        .setTimestamp();
    message.channel.send(resumeEmbed)

}

const pause_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a vc to use this command')
    if (!server_queue) return message.channel.send('There is currently no queue')

    server_queue.playing = false
    server_queue.connection.dispatcher.pause()

    const pauseEmbed = new Discord.MessageEmbed()
        .setDescription('Paused')
        .setColor("RANDOM")
        .setTimestamp();
    message.channel.send(pauseEmbed)

}
