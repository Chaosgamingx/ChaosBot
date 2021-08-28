const rifle = '🔫'
const axe = '🪓'
const pick = '⛏️'
const ht = '🏆'
const junkemoji = '🥾'
const legfish = '🐋'
const hd = '💎'
const hr = '💎'
const hg = '💎'
const ha = '💎'
const hp = '💎'
const array = [{
    name: 'cookie',
    description: '🍪 **Cookie**\na tasty snack.',
    canUse: true,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 10,
    price: 50,
    keep: false,
    run: async (client, message, args) => {
        const cookieRandom = [
            'You ate a cookie as you were feeling hungry.',
            'You choked on a cookie and almost died.',
            'The cookie tasted great.'
        ];
        const yes = cookieRandom[Math.floor(Math.random() * cookieRandom.length)];
        message.channel.send(`${yes}`);
    }
},
{
    name: 'fishingrod',
    description: '🎣 **Fishing Rod** \nuse this to catchs fish',
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 3000,
    price: 15000,
    keep: true,
    run: async (bot, message, args) => {
      
    }
},
{
    name: 'common',
    description: '🐟 **Common Fish** \nsell common to make money.',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 25,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'uncommon',
    description: '🐠 **Uncommon Fish** \nsell uncommon to make money.',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 50,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'rare',
    description: '🦑 **Rare Fish** \nsell rare to make money.',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 125,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'veryrare',
    description: '🐡 **Very Rare Fish** \nsell veryrare to make money.',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 75,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'legendary',
    description: `${legfish} **Legendary Fish** \nsell legendary to make money.`,
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 200,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'junk',
    description: `${junkemoji} **Junk** \nsell junk to make money.`,
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 10,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'rifle',
    description: `${rifle} **Rifle**\nuse this to kills animals`,
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 3000,
    price: 22500,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'deer',
    description: '🦌 **Deer**\nsell deer to make money.',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 50,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'bear',
    description: '🐻 **Bear**\nsell bear to make money.',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 60,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'duck',
    description: '🦆 **Duck**\nsell duck to make money.',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 25,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'pig',
    description: '🐷 **Pig**\nsell pig to make money.',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 80,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'cow',
    description: '🐮 **Cow**\nsell cow to make money.',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 120,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'fox',
    description: '🦊 **Fox**\nsell fox to make money.',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 100,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'rabbit',
    description: '🐰 **Rabbit**\nsell rabbit to make money.',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 30,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'chicken',
    description: '🐔 **Chicken**\nsell chicken to make money.',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 50,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'boar',
    description: '🐗 **Boar**\nsell boar to make money.',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 10,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'pickaxe',
    description: `${pick} **Pickaxe**\nuse this to mine gems`,
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 3000,
    price: 30000,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'gem',
    description: '💎 **Gem**\nsell gems to make money.',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 10,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'diamond',
    description: `${hd} **Diamond Gem** \nsell the diamond to make money.`,
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 200,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'ruby',
    description: `${hr} **Ruby Gem** \nsell the ruby to make money.`,
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 225,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'gade',
    description: `${hg} **Gade Gem** \nsell the gade to make money.`,
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 300,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'amethyst',
    description: `${ha} **Amethyst Gem** \nsell the amethyst to make money.`,
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 350,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'precious',
    description: `${hp} **Precious Gem** \nsell the precious to make money.`,
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 500,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'axe',
    description: `${axe} **Axe**\nuse this to chops trees down`,
    canUse: true,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 3000,
    price: 20000,
    keep: true,
    run: async (bot, message, args) => {
        
    }
},
{
    name: 'tree',
    description: '🌲 **Tree**\nsell trees to make money.',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 500,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: 'rainbowcoin',
    description: `**Rainbow Coin**`,
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 50000000,
    price: 100000000,
    keep: false,
    run: async (bot, message, args) => {

    }
},
{
    name: 'goldcoin',
    description: `**Gold Coin**`,
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 25000000,
    price: 50000000,
    keep: false,
    run: async (bot, message, args) => {

    }
},
{
    name: 'silvercoin',
    description: `**Silver Coin**`,
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 7500000,
    price: 15000000,
    keep: false,
    run: async (bot, message, args) => {

    }
},
{
    name: 'bronzecoin',
    description: `**Bronze Coin**`,
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 2500000,
    price: 5000000,
    keep: false,
    run: async (bot, message, args) => {

    }
},
{
    name: 'trophy',
    description: `${ht} **Trophy**`,
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 50000000,
    price: 100000000,
    keep: false,
    run: async (bot, message, args) => {

    }
}
];

module.exports = array;