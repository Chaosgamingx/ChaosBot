const profileModel = require('../../data/models/profileSchema')
const Discord = require('discord.js')
const talkedRecently = new Set();

module.exports = {
    name: 'steal',
    aliases: [],
    category: 'economy',
    utilisation: '{prefix}steal (user)',
    description: 'Steal money from a person',

    async execute(client, message, args) {
        const randomNumber = Math.floor(Math.random() * 700) + 1;
        const randomNumber2 = Math.floor(Math.random() * 700) + 1;

        if (talkedRecently.has(message.author.id)) {
            const talked = new Discord.MessageEmbed()
                .setDescription("you need to wait for this command to refresh. - " + message.author.username);
            message.channel.send(talked)
        }
        else {
            let stolenfrom = message.mentions.users.first()
            if (!stolenfrom) return message.channel.send("please mention a user")
            if (stolenfrom) (console.log(stolenfrom.id))

            let person = await profileModel.findOne({ userID: stolenfrom.id });
            let amount = Number(700)

            if (!person) return message.channel.send("That person isn't in my database")
            if (person.coin < amount) return message.channel.send(`${message.mentions.users.first()} can't be stolen from as they have less than **700 coins**`)

            let convstring = Number(randomNumber)
            let failamount = Number(randomNumber2)

            const failorsuccess = ['Success', 'Failed']
            let failrand = Math.floor((Math.random() * failorsuccess.length))
            let failss = failorsuccess[failrand]

            // description when you use beg command
            const begdescription = [`You've successfully stolen **${convstring} coins** from ${message.mentions.users.first()} and gained 5xp`]
            let begres = begdescription

            // description when you failed at begging
            const beggingfail = [`You've been caught stealing from ${message.mentions.users.first()} and lost ${failamount}`]
            let failbeg = beggingfail


            if (failss === 'Success') {

                const response = await profileModel.findOneAndUpdate({
                    userID: message.author.id,
                }, {
                    $inc: {
                        coin: convstring,
                        xp: 5,
                    }
                })

                const other = await profileModel.findOneAndUpdate({
                    userID: message.mentions.users.first().id,
                }, {
                    $inc: {
                        coin: -convstring,
                    }
                })

                const begembed = new Discord.MessageEmbed()
                    .setDescription(`${begres}`)
                    .setColor("#fcba03")
                    .setTimestamp(Date.now())

                //send the begembed in channel
                message.channel.send(begembed)

            } else if (failss === 'Failed') {
                const response = await profileModel.findOneAndUpdate({
                    userID: message.author.id,
                }, {
                    $inc: {
                        coin: -failamount,
                    }
                })

                const failembed = new Discord.MessageEmbed()
                    .setDescription(`**${failbeg}`)
                    .setColor("#fcba03")
                    .setTimestamp(Date.now())

                //send the failembed in channel
                message.channel.send(failembed)
            }
            talkedRecently.add(message.author.id);
            setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(message.author.id);
            }, 3600000);

        }
    }
}