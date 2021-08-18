const { MessageEmbed } = require("discord.js");
const i = 'ℹ️'
const x = '❌'
const tick = '✔️'
const profileModel = require('../../models/profileSchema')
module.exports = {
    name: 'gamble',
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
            const botRoll = Math.floor(Math.random() * 13) + 1;
            const userChoice = Math.floor(Math.random() * 13) + 1;
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;


            let passivewarn = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : You have \`PASSIVE\` enabled, your reqired to disable it to use this command.`);

            if (userData.passive == true) return message.channel.send(passivewarn);


            let betAmount = args[0];
            const result = userChoice - botRoll;

            let coinswarn = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : Enter the amount you want to gamble. `);

            if (!betAmount || isNaN(betAmount) && betAmount !== 'all' && betAmount !== 'max') return message.channel.send(coinswarn);

            let coinmin = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : The minimum you can gamble is \`200\` coins.`);

            if (betAmount < 200) return message.channel.send(coinmin);
            if (betAmount == 'all' || betAmount == 'max') betAmount = userData.coin;
            else betAmount = parseInt(args[0]);

            let moneywarn = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : You dont have that many coins.`);

            if (betAmount > userData.coin) {
                return message.channel.send(moneywarn);
            }

            if (botRoll < userChoice) {
                const wonCoins = parseInt(betAmount + (betAmount * 0.20));
                userData.coin += parseInt(wonCoins);
                await userData.save();
                const wonEmbed = new MessageEmbed()
                    .setColor('GREEN')
                    .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                    .setFooter("https://top.gg/bot/530267263501074443/vote")
                    .setDescription(`Gamble | Player : **${member.user.username}** \n\nChaosBot rolled: \`${botRoll}\` \n${member.user.username} rolled: \`${userChoice}\`\n\nWin Rate: \`${Math.floor(userChoice - botRoll) * 10}%\`\n\nWinnings: **${wonCoins.toLocaleString()}** coins`)
                message.channel.send(wonEmbed);
            } else if (botRoll == userChoice) {
                const tieCoins = parseInt(betAmount / 2);
                userData.coin -= parseInt(tieCoins);
                await userData.save();
                const tieEmbed = new MessageEmbed()
                    .setColor('YELLOW')
                    .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                    .setFooter("https://top.gg/bot/530267263501074443/vote")
                    .setDescription(`Gamble | Player : **${member.user.username}** \n\nChaosBot rolled: \`${botRoll}\` \n${member.user.username} rolled: \`${userChoice}\`\n\n**${member.user.username}** & **Hydra+**:Tied\n\nLost: **${tieCoins.toLocaleString()}** coins`)
                message.channel.send(tieEmbed);
            } else if (botRoll > userChoice) {
                const lostCoins = (betAmount);
                userData.coin -= parseInt(betAmount);
                await userData.save();
                const lostEmbed = new MessageEmbed()
                    .setColor('RED')
                    .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                    .setFooter("https://top.gg/bot/530267263501074443/vote")
                    .setDescription(`Gamble | Player : **${member.user.username}** \n\ChaosBot rolled: \`${botRoll}\` \n${member.user.username} rolled: \`${userChoice}\`\n\nLost Rate: \`${Math.floor(botRoll - userChoice) * 10}%\`\n\nlost: **${lostCoins.toLocaleString()}** coins`)
                message.channel.send(lostEmbed);
            }
        }
    }
}