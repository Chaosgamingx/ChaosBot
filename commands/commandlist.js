module.exports = {
    name: 'commandlist',
    description: "displays the commands",
execute(client, message, cmd, args, Discord){
             const embed = new Discord.MessageEmbed()
            .setTitle('List of commands')
            .setColor('RANDOM')
            .setDescription(`Mod commands
            -ban (bans members)
            -clear (clears chat up to 14 days)
            -kick (kicks members)
            -mute (keeps a member from talking)
            -unmute (unmutes the member)
            
            Music commands
            -play (plays a song)
            -skip (skips the song that's playing)
            -disconnect (disconnects the bot from VC)
            
            Meme commands
            -bidoof (pokemon)
            -mouthwash (mouthwash)
            -rickrolled (don't)

            Game commands
            -roll (rolls a die)
            -rps (a game of rock paper scissors against a bot)
            
            Misc. commands
            -invite (sends a link for the bot invite)
            -commandlist (lists the commands for the bot)
            -membercount (tells you how many members are in the server)
            -ping (shows the bots ping info)
            -userinfo (displays a users information)
            -weather (displays weather for a state or city)`); 

        message.channel.send(embed)              
    }
    }
