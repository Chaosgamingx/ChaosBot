module.exports = {
    name: 'coinflip',
    aliases: ['flip'],
    category: 'games',
    utilisation: "{prefix}coinflip or {prefix}coinflip (number of coins)",
    description: 'Flip a coin. heads or tails my friend?',

    execute(client, message, args) {

        let coins = parseInt(args[0]);

        if (!args[0]) {
            let rand = Math.floor(Math.random() * 2);

            if (rand == 0) {
                message.channel.send("Heads");
            } else if (rand == 1) {
                message.channel.send("Tails");
            }
        } else if (coins < 2 || coins > 15) {
            message.reply("Please enter a number between 2 and 15");
        } else {
            let numOfHeads = 0;
            let numOfTails = 0;

            let allCoins = [];
            for (let i = 0; i < coins; i++) {
                let rand = Math.floor(Math.random() * 2);

                if (rand == 0) {
                    allCoins.push("Heads");
                    numOfHeads++;
                } else if (rand == 1) {
                    allCoins.push("Tails");
                    numOfTails++;
                }
            }
            message.channel.send(allCoins);
            message.channel.send(`You got ${numOfHeads} Heads, and ${numOfTails} Tails`);
        }
    }
}
