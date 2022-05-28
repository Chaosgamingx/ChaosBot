module.exports = {
    name: 'eval',
    aliases: [],
    category: 'owner',
    utilisation: '{prefix}eval (code)',

    async execute(client, message, args) {
        if (message.author.id === client.config.discord.Owner) {
            if(!args[0]) return message.channel.send("please provide some code to evaluate")
            let code = args.slice(`${client.config.discord.prefix}eval`).join(" ");
                try {
                let ev = require('util').inspect(eval(code));
                if (ev.length > 1950) {
                    ev = ev.substr(0, 1950);
                }
                let token = client.token.replace(/\./g, "\.")
                let re = new RegExp(token, 'g') 
                ev = ev.replace(re, "*R-eD-Ac-Te-D-*");
                message.channel.send("**Input:**```js\n"+code+"```**Eval:**```js\n"+ev+"```")
                } catch(err) {
                    message.channel.send('```js\n'+err+"```")
                }
            

        } else {
            return message.channel.send("You're not the owner of this bot. Please download me from github and change the Owner to your ID in the Bot file to give yourself perms for your setup")
        }
    }
}