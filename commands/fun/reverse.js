const discord = require("discord.js")
module.exports = {
        name: 'reverse',
        aliases: [ 'rev' ],
        description: 'Sends the same message that you had sent but reversed.',
        category: 'fun',
        usage: '<text>',
        examples: [ 'reverse Hello World' ],

    async execute(client, message, args) {
      
            const text = args.join(' ')
            const converted = text.split('').reverse().join('');
            message.channel.send(new  discord.MessageEmbed().setDescription(`\u180E${converted}`).setColor(client.color)).catch(() => {});
    
    

     
    }
};