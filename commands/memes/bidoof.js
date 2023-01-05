module.exports = {
    name: 'bidoof',
    aliases: [],
    category: 'memes',
    utilisation: '{prefix}bidoof',
    description: 'Bidoof is the best Pokemon',

    execute(client, message, args) {
        message.channel.send('https://media1.tenor.com/images/d78ad587976052ccf24cdd58a531b373/tenor.gif?itemid=12838154');
    }
}