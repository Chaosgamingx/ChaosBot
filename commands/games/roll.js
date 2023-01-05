const { MessageEmbed, Message } = require("discord.js");

module.exports = {
  name: 'roll',
  aliases: [],
    category: 'games',
    utilisation: '{prefix}roll',
    description: 'Roll dice',

  //IntelliSense
  /**
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */

   execute(client, message, args) {
    const randomRoll = Math.floor(Math.random() * 6) + 1;
    const roll = new MessageEmbed();
    roll.setTitle("Roll!");
    roll.setDescription(`The dice rolled ${randomRoll}`);
    roll.setColor("RANDOM");
    message.channel.send(roll);
  },
};
