module.exports = {
    name: 'bonk',
    aliases: [],
    category: 'memes',
    utilisation: '{prefix}bonk',

    execute(client, message, args) {
        message.channel.send(
            'https://media1.tenor.com/images/b8be416468f94599d24400b10d353c37/tenor.gif?itemid=16816642')
    }
}
