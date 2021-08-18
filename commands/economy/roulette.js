const i = 'ℹ️'
const x = '❌'
const tick = '✔️'
const { MessageEmbed } = require("discord.js");
const profileModel = require('../../models/profileSchema')
module.exports = {
    name: 'roulette',
    aliases: [],
    category: 'economy',
    utilisation: '{prefix}help <command name>',

    async execute(client, message, args) {
        let userData = await profileModel.findOne({ userID: message.author.id });
        if (!userData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                coin: 1000,
                bank: 0,
                items: [],
            });
            profile.save();
            message.channel.send("I have added you to the database, try again")
        } else {

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

            let passivewarn = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : You have \`PASSIVE\` enabled, your reqired to disable it to use this command.`);

            if (userData.passive == true) return message.channel.send(passivewarn);


            let user = message.author;


            function isOdd(num) {
                if ((num % 2) == 0) return false;
                else if ((num % 2) == 1) return true;
            }

            let colour = args[0];

            let colorbad = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : Invalid color please chose from below.`);
            let colorbadinfo = new MessageEmbed()
                .setColor("BLUE")
                .setFooter("https://top.gg/bot/679710920334639115/vote")
                .setDescription(`${i} **${member.user.username}** : Command Infomation 
  🔴Red | Multiplier: x1.5
  \`h roulette red (amount)\`
  ⚫Black | Multiplier: x2
  \`h roulette black (amount)\`
  🟡 Yellow | Multiplier: x2.5
  \`h roulette yellow (amount)\`
  🟢Green | Multiplier: x5
  \`h roulette green (amount)\`
`);
            if (!colour) return message.channel.send(colorbad).then(message.channel.send(colorbadinfo));
            colour = colour.toLowerCase()

            if (colour == "b" || colour.includes("black")) colour = 0;
            else if (colour == "r" || colour.includes("red")) colour = 1;
            else if (colour == "g" || colour.includes("green")) colour = 2;
            else if (colour == "y" || colour.includes("yellow")) colour = 3;
            else return message.channel.send(colorbad).then(message.channel.send(colorbadinfo));

            let betAmount = args[1];

            let coinswarn = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : Enter the amount you want to gamble. `);

            if (!betAmount || isNaN(betAmount) && betAmount !== 'all' && betAmount !== 'max') return message.channel.send(coinswarn);

            let coinmin = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : The minimum you can gamble is \`200\` coins.`);

            if (betAmount < 200) return message.channel.send(coinmin);
            if (betAmount == 'all' || betAmount == 'max') betAmount = userData.coin;
            else betAmount = parseInt(args[1]);

            if (betAmount == 'all' || betAmount == 'max') betAmount = userData.coin;
            if (betAmount > userData.coin) {
                return message.channel.send("You don't have that many coins.");
            }

            //let betAmount = args[1];

            let random = Math.floor((Math.random() * 10));

            let moneyhelp = new MessageEmbed()
                .setColor("RED")
                .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                .setFooter("https://top.gg/bot/679710920334639115/vote")
                .setDescription(`${x} **${member.user.username}** :  Specify an amount to gamble \n\n h roulette <color> <amount>`);

            let moneymore = new MessageEmbed()
                .setColor("RED")
                .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                .setFooter("https://top.gg/bot/679710920334639115/vote")
                .setDescription(`${x} **${member.user.username}** :  You are betting more than you have`);


            if (!betAmount) return message.channel.send(moneyhelp);
            if (betAmount > userData.coin) return message.channel.send(moneymore);

            if (random == 1 && colour == 2) {
                betAmount *= 5
                const other = await profileModel.findOneAndUpdate({
                    userID: message.author.id,
                }, {
                    $inc: {
                        coin: betAmount,
                    }
                })
                let moneyEmbed1 = new MessageEmbed()
                    .setColor("GREEN")
                    .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                    .setFooter("https://top.gg/bot/679710920334639115/vote")
                    .setDescription(`Roulette V2 | Player : **${member.user.username}** \n\n Color : 🟢  \n\n Multiplier : **x5**  \n\n Winnings : **${betAmount.toLocaleString()}** coins`);
                message.channel.send(moneyEmbed1)

            } else if (isOdd(random) && colour == 1) {
                betAmount = parseInt(betAmount * 1.5)
                const other = await profileModel.findOneAndUpdate({
                    userID: message.author.id,
                }, {
                    $inc: {
                        coin: betAmount,
                    }
                })
                let moneyEmbed2 = new MessageEmbed()
                    .setColor("GREEN")
                    .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                    .setFooter("https://top.gg/bot/679710920334639115/vote")
                    .setDescription(`Roulette V2 | Player : **${member.user.username}** \n\n Color : 🔴 \n\n Multiplier : **x1.5**  \n\n Winnings : **${betAmount.toLocaleString()}** coins`);
                message.channel.send(moneyEmbed2)

            } else if (random == 1 && colour == 3) {
                betAmount = parseInt(betAmount * 2.5)
                const other = await profileModel.findOneAndUpdate({
                    userID: message.author.id,
                }, {
                    $inc: {
                        coin: betAmount,
                    }
                })
                let moneyEmbed4 = new MessageEmbed()
                    .setColor("GREEN")
                    .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                    .setFooter("https://top.gg/bot/679710920334639115/vote")
                    .setDescription(`Roulette V2 | Player : **${member.user.username}** \n\n Color : 🟡 \n\n Multiplier : **x2.5**  \n\n Winnings : **${betAmount.toLocaleString()}** coins`);
                message.channel.send(moneyEmbed4)

            } else if (!isOdd(random) && colour == 0) {
                betAmount = parseInt(betAmount * 2)
                const other = await profileModel.findOneAndUpdate({
                    userID: message.author.id,
                }, {
                    $inc: {
                        coin: betAmount,
                    }
                })
                let moneyEmbed3 = new MessageEmbed()
                    .setColor("GREEN")
                    .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                    .setFooter("https://top.gg/bot/679710920334639115/vote")
                    .setDescription(`Roulette V2 | Player : **${member.user.username}** \n\n Color : ⚫ \n\n Multiplier : **x2**  \n\n Winnings : **${betAmount.toLocaleString()}** coins`);
                message.channel.send(moneyEmbed3)

            } else {
                const lostCoins = (betAmount);
                userData.coin -= parseInt(betAmount);
                await userData.save();
                let moneyEmbed4 = new MessageEmbed()
                    .setColor("RED")
                    .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                    .setFooter("https://top.gg/bot/679710920334639115/vote")
                    .setDescription(`Roulette V2 | Player : **${member.user.username}** \n\nYou lost **${betAmount.toLocaleString()}** coins \n\nGoodluck next time`);
                message.channel.send(moneyEmbed4)
            }

        }
    }
}