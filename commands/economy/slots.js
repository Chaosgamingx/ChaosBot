const slotItems = ["🍇", "🍉", "🍌", "🍎", "🍒", "🍋"];
const { MessageEmbed } = require('discord.js');
const i = 'ℹ️'
const x = '❌'
const tick = '✔️'

const profileModel = require('../../models/profileSchema')
module.exports = {
    name: 'slots',
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
            let betAmount = args[0];

            let coinswarn = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : Enter the amount you want to gamble. `);

            if (!betAmount || isNaN(betAmount) && betAmount !== 'all' && betAmount !== 'max') return message.channel.send(coinswarn);

            let coinmin = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : The minimum you can gamble is \`50\` coins.`);

            if (betAmount < 50) return message.channel.send(coinmin);

            if (betAmount == 'all' || betAmount == 'max') betAmount = userData.coin;
            else betAmount = parseInt(args[0]);

            let moneywarn = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : You dont have that many coins.`);

            if (betAmount > userData.coin) {
                return message.channel.send(moneywarn);
            }

            let user = message.author;
            let coin = message.author.id;
            let win = false;

            //let coinsInWallet = await bot.fetchUser(message.author.id);


            let moneyhelp = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : Specify an amount you want to gamble.`);


            if (betAmount > coin) return message.channel.send(moneywarn);

            let number = []
            for (let i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

            if (number[0] == number[1] && number[1] == number[2]) {
                betAmount = parseInt(betAmount * 1.5)
                win = true;
            } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
                betAmount = parseInt(betAmount * 1.5)
                win = true;
            }
            if (win) {
                let slotsEmbed1 = new MessageEmbed()
                    .setDescription(`Slots | Player : **${member.user.username}** \n\n${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nWinnings: **${betAmount.toLocaleString()}** coins`)
                    .setColor("GREEN")
                    .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                    .setFooter("https://top.gg/bot/530267263501074443/vote")
                message.channel.send(slotsEmbed1)
                const other = await profileModel.findOneAndUpdate({
                    userID: message.author.id,
                }, {
                    $inc: {
                        coin: betAmount,
                    }
                })
            } else {
                const lostCoins = (betAmount);
                userData.coin -= parseInt(betAmount);
                await userData.save();
                let slotsEmbed = new MessageEmbed()
                    .setDescription(`**Slots** | Player : **${member.user.username}** \n\n${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nLost: **${lostCoins.toLocaleString()}** coins`)
                    .setColor("RED")
                    .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                    .setFooter("https://top.gg/bot/530267263501074443/vote")
                message.channel.send(slotsEmbed)
            }

        }
    }
}