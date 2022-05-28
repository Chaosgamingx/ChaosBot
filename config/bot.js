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

        activity: '=help for commands', //replace this with whatever activity you want it to have

        MongoDB: process.env.MONGODB,  //replace process.env.MONGODB with your mongodb link if not using Heroku

        Bot_Token: process.env.TOKEN, //process.env.TOKEN,  //replace  process.env.TOKEN with your bot's token if not using Heroku

        Owner: "405399065069748226", //replace this ID with your ID


    },

    filters: ['8D', 'gate', 'haas', 'phaser', 'treble', 'tremolo', 'vibrato', 'reverse', 'karaoke', 'flanger', 'mcompand', 'pulsator', 'subboost', 'bassboost', 'vaporwave', 'nightcore', 'normalizer', 'surrounding'],
};
