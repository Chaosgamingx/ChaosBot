module.exports = {
    name: 'ping',
    description: "this is a ping command",
execute(client, message, cmd, args, Discord){
             const embed = new Discord.MessageEmbed()
            .setTitle('Bots ping')
            .setColor('RANDOM')
            .setDescription(`Latency is ${Date.now() - message.createdTimestamp}ms. 
            API Latency is ${Math.round(client.ws.ping)}ms`); 

        message.channel.send(embed)              
    }
    }