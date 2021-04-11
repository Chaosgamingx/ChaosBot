<<<<<<< HEAD
const fetch = require("node-fetch");
const Discord = require('discord.js')

module.exports = {
    name: 'anime',
    aliases: ['a'],
    category: 'anime',
    utilisation: '{prefix}anime (show) <season number>',
    description: "shows info on an anime series",

  async execute(client, message, args) {
        if(!args.length) return message.channel.send("Baka! What Anime am I supposed to search for?");
        let [title, page = "1"] = args.join(" ").split(", ");
         page = (page, 1);

        const { data } = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(title)}`)
      .then((r) => r.json());

        if(!data || !data.length) return message.channel.send("No results found.");

        const res = data[page - 1];
        if(!res) return message.channel.send(`Invalid page ${page} there is only ${data.length} pages.`);
    
        let embed = new Discord.MessageEmbed()
      .setTitle(res.attributes.titles.en ? `${res.attributes.titles.en} (Japanese: ${res.attributes.titles.en_jp})` : res.attributes.titles.en_jp)
      .setDescription(res.attributes.synopsis)
      .addField("Age Rating", `${res.attributes.ageRating}${res.attributes.ageRatingGuide ? ` (${res.attributes.ageRatingGuide})` : ""}`)
      .addField("Episodes", `${res.attributes.episodeCount} (${res.attributes.episodeLength} Min Per Episode)`)
      .setImage(res.attributes.coverImage && res.attributes.coverImage.original)
      .setThumbnail(res.attributes.posterImage && res.attributes.posterImage.original)
      .setURL(`https://kitsu.io/anime/${res.id}`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }));

        return message.channel.send(embed);
    }
}
=======
const fetch = require("node-fetch");
const Discord = require('discord.js')

module.exports = {
    name: 'anime',
    aliases: ['a'],
    category: 'anime',
    utilisation: '{prefix}anime (show) <season number>',
    description: "shows info on an anime series",

  async execute(client, message, args) {
        if(!args.length) return message.channel.send("Baka! What Anime am I supposed to search for?");
        let [title, page = "1"] = args.join(" ").split(", ");
         page = (page, 1);

        const { data } = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(title)}`)
      .then((r) => r.json());

        if(!data || !data.length) return message.channel.send("No results found.");

        const res = data[page - 1];
        if(!res) return message.channel.send(`Invalid page ${page} there is only ${data.length} pages.`);
    
        let embed = new Discord.MessageEmbed()
      .setTitle(res.attributes.titles.en ? `${res.attributes.titles.en} (Japanese: ${res.attributes.titles.en_jp})` : res.attributes.titles.en_jp)
      .setDescription(res.attributes.synopsis)
      .addField("Age Rating", `${res.attributes.ageRating}${res.attributes.ageRatingGuide ? ` (${res.attributes.ageRatingGuide})` : ""}`)
      .addField("Episodes", `${res.attributes.episodeCount} (${res.attributes.episodeLength} Min Per Episode)`)
      .setImage(res.attributes.coverImage && res.attributes.coverImage.original)
      .setThumbnail(res.attributes.posterImage && res.attributes.posterImage.original)
      .setURL(`https://kitsu.io/anime/${res.id}`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }));

        return message.channel.send(embed);
    }
}
>>>>>>> c4c33d33076e0cb86ffd20f1b54f2365ef2043ef
