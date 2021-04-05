module.exports = {
    name: 'waifu',
    aliases: [''],
    category: 'anime',
    description: "why even describe this, displays a waifu",

    execute(client, message, args) {
        return message.channel.send(`https://www.thiswaifudoesnotexist.net/example-${Math.floor(Math.random() * 100000)}.jpg`);

    }
}