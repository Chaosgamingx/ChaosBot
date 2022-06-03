
const request = require('request-promise-native');
const fetch = require('node-fetch');
const discord = require('discord.js');
module.exports = {
        name: 'clyde',
        description: 'Sends a clyde message!',
        category: 'images',
        utilisation: '{prefix}clyde (text)',

    async execute(client, message, args) {

     
let text = args.slice(0).join(" ")
if(!text) return message.channel.send(new discord.MessageEmbed().setColor(client.color).setDescription(`add some words`));

  if(text.length > 60) return message.channel.send(new discord.MessageEmbed().setColor(client.color).setDescription(`TOO MUCH, must be 60 words or below`));

try {
let msg = await message.channel.send("generating");


const data = await fetch(
    `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`
  ).then((res) => res.json());
  msg.delete({timeout: 500})
  message.channel.send(new discord.MessageEmbed().setColor(client.color).setImage(data.message))

  
  } catch (err) {
    console.log(`${err}, command name: clyde`)
    message.channel.send("an error occured")
  }

    
        }}    
