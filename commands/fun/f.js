const discord = require("discord.js");
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'f',
    description: 'Pay your respect!',
    category: 'fun',

    async execute(client, message, args) {

            message.delete().catch(() => { });
            const embed = new discord.MessageEmbed()
                .setAuthor(`${message.author.username} has paid their respects.`, message.author.displayAvatarURL({ format: 'png' }))
                .setColor('PURPLE')
            message.channel.send({ embed })


        

    }
};
