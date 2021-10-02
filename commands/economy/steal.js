const profileModel = require('../../models/profileSchema')
const Discord = require('discord.js')
const talkedRecently = new Set();

module.exports = {
    name: 'steal',
    aliases: [],
    category: 'economy',
    utilisation: '{prefix}help <command name>',

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
                let stolenfrom = message.mentions.users.first()
                if (!stolenfrom) return message.channel.send("please mention a user")
                if (stolenfrom) (console.log(stolenfrom.id))

                let person = await profileModel.findOne({ userID: stolenfrom.id });
                let amount = Number(1250)

                if (!person) return message.channel.send("That person isn't in my database")
                if (person.coin < amount) return message.channel.send("this person can't be stolen from as they have less than **1250 Chaos Credits**")

                let convstring = Number(randomNumber)

                const failorsuccess = ['Success', 'Failed']
                let failrand = Math.floor((Math.random() * failorsuccess.length))
                let failss = failorsuccess[failrand]

                // description when you use beg command
                const begdescription = [`You've successfully stolen **${convstring} Chaos Credits** from That user`]
                let begres = begdescription

                // description when you failed at begging
                const beggingfail = ["You've Failed to steal from that user"]
                let failbeg = beggingfail


                if (failss === 'Success') {

                    const response = await profileModel.findOneAndUpdate({
                        userID: message.author.id,
                    }, {
                        $inc: {
                            coin: convstring,
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
    },
}