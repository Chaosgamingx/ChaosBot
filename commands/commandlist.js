module.exports = {
    name: 'commandlist',
    description: "displays the commands",
execute(client, message, cmd, args, Discord){
             const embed = new Discord.MessageEmbed()
            .setTitle('List of commands')
            .setColor('RANDOM')
            .setDescription(`
            **Mod commands**
            -ban (bans members)
            -clear (clears chat up to 14 days)
            -kick (kicks members)
            -mute (keeps a member from talking. you can also do =mute (seconds) if you want a mute that will last for a certain duration.)
            -unmute (unmutes the member)
            
            **Music commands**
            -play (plays a song)
            -skip (skips the song that's playing)
            -disconnect (disconnects the bot from VC)
            
            **Meme commands**
            -bidoof (pokemon)
            -mouthwash (mouthwash)
            -rickrolled (don't)
            -trumpmeme (displays a trump meme)
            
            **Misc. commands**
            -invite (sends a link for the bot invite)
            -commandlist (lists the commands for the bot)
            -reminder (set a reminder from discord)
            -ping (shows the bots ping info)
            -serverinfo (displays some info about the server)
            -userinfo (displays a users information)
            -weather (displays weather for a state or city)`); 

        message.channel.send(embed)              
    }
    }
