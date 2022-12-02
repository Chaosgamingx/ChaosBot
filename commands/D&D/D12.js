const { MessageEmbed, Message } = require("discord.js");

module.exports = {
  name: 'd12',
  aliases: ["D12"],
    category: 'D&D',
    utilisation: '{prefix}d20',
    description: 'Rolls a 20-sided dice for D&D',

  //IntelliSense
  /**
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */

   execute(client, message, args) {
    const randomRoll = Math.floor(Math.random() * 12) + 1;
    const roll = new MessageEmbed();
    roll.setTitle("D&D dice roll!");
    roll.setDescription(`The dice rolled ${randomRoll}`);
    roll.setImage("https://pbs.twimg.com/profile_images/1582055118182453249/8oSuZtW4_400x400.jpg")
    roll.setColor("RANDOM");
    message.channel.send(roll);
  },
};
