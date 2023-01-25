module.exports = {
    emojis: {
        off: ':x:',
        error: ':warning:',
        queue: ':bar_chart:',
        music: ':musical_note:',
        success: ':white_check_mark:',
    },

    discord: {
        prefix: '=', //replace this with your preferred prefix
        inviteURL: "https://discord.com/oauth2/authorize?client_id=1023731050251296769&permissions=4374424190327&scope=applications.commands%20bot",
        activity: [
            "prefix is =",
            "smoking in this server is prohibited, unless your me and your smokin' hot",
            "invite me to your server",
            "gamble your problems away",
            "watching 60+ servers",
            "have any issues? join our support server",
            "the radio is pretty cool",
            "looking at discord. what did you expect? lol",
            "need ideas for the bot. please help",
            "my garbage can get more full",
            "watching you sleep... I mean what?",
            "how the water activated lights on life vests in planes work I have no idea, so if you find out do let me know",
            "many thanks to the people who suggested the ideas for ChaosBot",
            "You should always knock before opening a fridge, just in case theres a salad dressing inside",
            "is there a connection between candy corn and corn nuts?",
            "i've always thought air was free. that is, I did until I went out and bought a $3 bag of chips"
        ], //replace this with what activity you want. add more or less. It will cycle through the activities if you have multiple

        time_to_switch_activity: 10000, //change number to change activity speed. use ms (example: 1000 is 1 second, 2000 is 2 seconds and so on)

        activityType: "PLAYING", //options to use: PLAYING, STREAMING (use a twitch link for this as well), LISTENING, WATCHING, COMPETING 

        MongoDB: process.env.MONGODB,  //replace process.env.MONGODB with your mongodb link if not using Heroku

        Bot_Token: process.env.TOKEN, //replace  process.env.TOKEN with your bot's token if not using Heroku

        Owner: "405399065069748226", //replace this ID with your ID


    },

    filters: ['8D', 'gate', 'haas', 'phaser', 'treble', 'tremolo', 'vibrato', 'reverse',
        'karaoke', 'flanger', 'mcompand', 'pulsator', 'subboost', 'bassboost', 'vaporwave',
        'nightcore', 'normalizer', 'surrounding'],
};
