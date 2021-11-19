
const request = require('request-promise-native');
const fetch = require('node-fetch');
const discord = require('discord.js');
module.exports = {
        name: 'blurpify',
        description: 'Blurpify a picture!',
        category: 'image-manipulation',

    async execute(client, message, args) {
      let user = message.mentions.users.first() || client.users.cache.get(args[0]) || match(args.join(" ").toLowerCase(), message.guild) || message.author;
      
    
      
      
      const data = await fetch(
        `https://nekobot.xyz/api/imagegen?type=blurpify&image=${user.displayAvatarURL({ size: 512 })}`
      ).then((res) => res.json());
    message.channel.send(new discord.MessageEmbed().setColor(client.color).setImage(data.message));
    
    
    function match(msg, i) {
    if (!msg) return undefined;
    if (!i) return undefined;
    let user = i.members.cache.find(
      m =>
        m.user.username.toLowerCase().startsWith(msg) ||
        m.user.username.toLowerCase() === msg ||
        m.user.username.toLowerCase().includes(msg) ||
        m.displayName.toLowerCase().startsWith(msg) ||
        m.displayName.toLowerCase() === msg ||
        m.displayName.toLowerCase().includes(msg)
    );
    if (!user) return undefined;
    return user.user;
  }
     
        }}    
