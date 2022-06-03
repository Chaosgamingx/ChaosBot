const profileModel = require('../../data/models/profileSchema')
const Discord = require('discord.js')
const talkedRecently = new Set();

module.exports = {
    name: 'beg',
    aliases: [],
    category: 'economy',
    utilisation: '{prefix}beg',
    description: 'Gives a random chance of earning money.',

    async execute(client, message, args) {
        const randomNumber = Math.floor(Math.random() * 500) + 1;
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

                const failorsuccess = ['Success', 'Failed']
                let failrand = Math.floor((Math.random() * failorsuccess.length))
                let failss = failorsuccess[failrand]

                //the beg money givers
                const beggiver = [`Dwayne Johnson`, `Selena Gomez`, `Justin Bieber`, `Rick Astley`, `Alan Walker`, `Random Stranger`,]
                let begresultgive = Math.floor((Math.random() * beggiver.length))
                let beggive = beggiver[begresultgive]

                // description when you use beg command
                const begdescription = [`You little poor beggar. here take **$${convstring} Chaos credits**`, `Here take **$${convstring} Chaos credits** and invest it.`, `Aw man i only got $30 in my wallet.. I can give you **$${convstring} Chaos credits**`]
                let begresultdesc = Math.floor((Math.random() * begdescription.length))
                let begres = begdescription[begresultdesc]

                // description when you failed at begging
                const beggingfail = ['Get a job man', "kekw here's $200 ||sike||", 'get out of my sight', 'go ask your momma', 'ask someone else', 'go ask somewhere else', 'you failed to recieve money from someone']
                let failbegrand = Math.floor((Math.random() * beggingfail.length))
                let failbeg = beggingfail[failbegrand]


                if (failss === 'Success') {

                    const response = await profileModel.findOneAndUpdate({
                        userID: message.author.id,
                    }, {
                        $inc: {
                            coin: convstring,
                        }
                    })
                    const begembed = new Discord.MessageEmbed()
                        .setTitle(`${beggive}`)
                        .setDescription(`${begres}`)
                        .setColor("#fcba03")
                        .setTimestamp(Date.now())

                    //send the begembed in channel
                    message.channel.send(begembed)

                } else if (failss === 'Failed') {

                    const failembed = new Discord.MessageEmbed()
                        .setTitle(`**${beggive}**`)
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