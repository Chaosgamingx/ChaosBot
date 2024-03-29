const profileModel = require('../../data/models/profileSchema')
const Discord = require('discord.js')
const talkedRecently = new Set();

module.exports = {
    name: 'work',
    aliases: [],
    category: 'economy',
    utilisation: '{prefix}work',
    description: 'Gives you a random job to earn money',

    async execute(client, message, args) {
        const randomNumber = Math.floor(Math.random() * 1250) + 1;
        let profileData = await profileModel.findOne({ userID: message.author.id });
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                coin: 1000,
                bank: 0,
            });
            profile.save();
            message.channel.send("I have added you to the database, try again")
        } else {

            if (talkedRecently.has(message.author.id)) {
                const talked = new Discord.MessageEmbed()
                    .setDescription("you need to wait for this command to refresh. - " + message.author.username);
                message.channel.send(talked)
            }
            else {

                let convstring = Number(randomNumber)

                // description when you use beg command
                const begdescription = [`You Worked in a Pizza Shop and got paid **${convstring} coins**`, `You stole someones wallet and got **${convstring} coins**`, `You worked as a Taxi driver and revieved **${convstring} coins**`, `You worked a double shift and earned **${convstring} coins**`, `You worked at a Gas Station and got **${convstring} coins**`, `You were in the Coal Mines and made **${convstring} coins**`, `You  found **${convstring} coins** in your car`]
                let begresultdesc = Math.floor((Math.random() * begdescription.length))
                let begres = begdescription[begresultdesc]

                const response = await profileModel.findOneAndUpdate({
                    userID: message.author.id,
                }, {
                    $inc: {
                        coin: convstring,
                    }
                })
                const begembed = new Discord.MessageEmbed()
                    .setDescription(`${begres}`)
                    .setColor("#fcba03")
                    .setTimestamp(Date.now())

                //send the begembed in channel
                message.channel.send(begembed)


                talkedRecently.add(message.author.id);
                setTimeout(() => {
                    // Removes the user from the set after a minute
                    talkedRecently.delete(message.author.id);
                }, 3600000);

            }
        }
    },
}