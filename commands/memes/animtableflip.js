const Discord = require("discord.js");
const bot = new Discord.Client();
const frames = [
    '(-°□°)-  ┬─┬',
    '(╯°□°)╯    ]',
    '(╯°□°)╯  ︵  ┻━┻',
    '(╯°□°)╯       [',
    '(╯°□°)╯           ┬─┬'
];
module.exports = {
    name: 'tableflip',
    aliases: [],
    category: 'memes',
    utilisation: '{prefix}tableflip',
    description: 'Do a flip!!!',

    async execute(client, message, args) {
        const msg = await message.channel.send('(\\\\°□°)\\\\  ┬─┬');
        for (const frame of frames) {
            setTimeout(() => { }, 4000);
            await msg.edit(frame);
        }
        return message;
    }
}