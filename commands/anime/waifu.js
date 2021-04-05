module.exports = {
    name: 'waifu',
    aliases: [],
    category: 'anime',
    utilisation: "{prefix}waifu",
    description: "why even describe this, displays a waifu",

    execute(client, message, args) {
        message.channel.send(`https://www.thiswaifudoesnotexist.net/example-${Math.floor(Math.random() * 100000)}.jpg`);

    }
}
