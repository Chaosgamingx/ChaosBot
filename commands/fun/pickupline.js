
const fetch = require('node-fetch');



const line = [

    "I hope you know CPR because you take my breath away!",
    "You've made me so nervous that I've totally forgotten my standard pick-up line.",
    "Are you a trap card? Because I’ve fallen for you.",
    "Roses are red, violets are blue, omae wa mo shindeiru",
    "I think I need a paralyze heal! Because you're stunning!",
    "You must be a mahou shoujo, you've got me under your spell!",
    "Do you have a Death Note? Because everytime you smile, I feel like I'm having a heart attack!",
    "Are you Saitama? Because you've got me down in one move!",
    "You must be better than Kuuhaku. Because when I first saw you, you already won my heart!",
    "I'd take the Hunter Exam just for you!",
    "Do you believe in fate? How about you stay the night? (Fate/Night; this one wasn't too apparant..)",
    "You're like the 3D Maneuver gear. I won't stand a chance in this world without you!",
    "You remind me of Menma. Because even when I can't see you, I still feel you inside my heart!",
    "If I just had a Geass, I'd command you to be mine!",
    "Extra cursed student or not, I wont even think of ignoring you! (From anime *another*; not too apparant..rip)",
    "I don't need a Sharingan to see how beautiful you are!",
    "Are you Kikyo? Because I think you shot an arrow through my heart!",
    "Even if it means risking my existence, I'll cross different world lines just to find you! (Steins;Gate)",
    "Hey! Are you the railgun? Because I can feel a spark! (Toaru Kagaku no Railgun)",
    "Are you from the Bath House? Because you take my spirit away. (Spirited Away)",
    "Omae wa mo shindeiru!",
    "You must be Kira, because you just gave me a heart attack!",
    "You're cooler than Grey's ice shell!",
    "Our love is like Grell, it never seems to die!",
    "We were born to make history!!",
    "I don't need a Death Note, your beauty is killer!",
    "I love you as much as Ryuk loves apples!",
    "Kanye feel the love?",
    "You can take me to flavour town!!",
]


const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'pickupline',
    description: 'Generate some pickuplines!',
    utilisation: '{prefix}pickupline',
    category: 'fun',


    async execute(client, message, args) {


        const embed = new MessageEmbed()
            .setDescription(line[Math.round(Math.random() * (line.length - 1))])
            .setColor(client.color);
        return message.channel.send({ embed }).catch(() => { });
    }
};