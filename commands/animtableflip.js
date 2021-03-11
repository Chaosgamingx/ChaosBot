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
    description: "This is info about the bot",
    async execute(client, message, args) {
        const msg = await message.channel.send('(\\\\°□°)\\\\  ┬─┬');
        for (const frame of frames) {
            setTimeout(() => { }, 4000);
            await msg.edit(frame);
        }
        return message;
    }
}