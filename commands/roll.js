const { MessageEmbed, Message } = require("discord.js");

module.exports = {
  name: "roll",
  description: "rolls a die",
  category: "misc",

  //IntelliSense
  /**
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */

  execute(client, message, cmd, args, Discord) {
    const randomRoll = Math.floor(Math.random() * 6) + 1;
    const roll = new MessageEmbed();
    roll.setTitle("Roll!");
    roll.setDescription(`The dice rolled ${randomRoll}`);
    roll.setColor("RANDOM");
    message.channel.send(roll);
  },
};
