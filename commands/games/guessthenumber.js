const Discord = require('discord.js')



const guildNumber = new Map();
const guildAttempts = new Map();

function guildNumberMap(message) {
    const guildId = message.guild.id;

    var number = Math.floor(Math.random() * 20000) + 1;
    // If there is no command running map for the guild, create one
    if (!guildNumber.get(guildId)) {
        guildNumber.set(guildId, number);
    }
}

function guildAttemptsMap(message) {
    const guildId = message.guild.id;
    // If there is no command running map for the guild, create one
    if (!guildAttempts.get(guildId)) {
        guildAttempts.set(guildId, { attempts: 1 });
    } else {
        guildAttempts.get(guildId).attempts++;
    }
}

module.exports = {
    name: "guessthenumber",
    aliases: ['gtn'],
    category: "games",
    utilisation: '{prefix}guessthenumber to start, guessthenumber(number) to guess',
    description: "This command will generate a random number between 1 and 20,000. Your goal is to guess that number in the least amount of attempts",
    async execute(client, message, args) {
        const { member, channel, guild } = message;

        
        const provideaguess = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`**❌ Please provide a guess!**`)
        const pickinganumber = new Discord.MessageEmbed()
        
            .setColor('#33F304')
            .setDescription('**Picking a number between 1 and 20000**')



        await guildNumberMap(message);
        await guildAttemptsMap(message);

        let guess = args[0];
        if (!guess && guildAttempts.get(guild.id).attempts === 1) {
            return channel.send(pickinganumber)
        } else if (!guess) {
            return channel.send(provideaguess);
        }

        if (+guess === guildNumber.get(guild.id)) {
            let attempts = guildAttempts.get(guild.id);

            const guessedthenumber = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`✅ Perfect, <@${member.id}>the number was ${guildNumber.get(guild.id)}, it only took you ${attempts.attempts} attempts!`)

            channel.send(guessedthenumber);
            guildNumber.delete(guild.id);
            guildAttempts.delete(guild.id);


            return;
        } else if (+ guess < guildNumber.get(guild.id)) {
            return message.reply(`${guess} Higher`);
        } else if (+guess > guildNumber.get(guild.id)) {
            return message.reply(`${guess} Lower`);
        } else {
            return message.reply("Invalid number please try again");
        }
    },
};