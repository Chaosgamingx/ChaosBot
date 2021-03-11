module.exports = {
    name: 'commandlist',
    description: "displays the commands",
execute(client, message, cmd, args, Discord){
             const embed = new Discord.MessageEmbed()
            .setTitle('List of commands')
            .setColor('RANDOM')
            .setDescription(`
            **Mod commands**
            ban (bans members)
            kick (kicks members)
            mute (mutes a member)
            unmute (unmutes a member)
            clear (clears text of the persons choice)
            
            **Music commands**
            play (plays a song)
            skip (skips the song that's playing)
            disconnect (disconnects the bot from VC)
            search (display a song on youtube)

            
            **Meme commands**
            bidoof (pokemon)
            mouthwash (mouthwash)
            rickrolled (don't)
            trumpmeme (displays a trump meme)
            meme (displays a random meme)
            fight (fight a user)
            tableflip (shows a VERY fast table flip)

            **Games**
            rps (a rock paper scissors game)
            roll (rolls a die)
            
            **Anime Stuff**
            pat (pat a user)
            poke (poke a user)

            **Misc. commands**
            invite (sends a link for the bot invite)
            commandlist (lists the commands for the bot)
            reminder (set a reminder from discord)
            ping (shows the bots ping info)
            serverinfo (displays some info about the server)
            userinfo (displays a users information)
            avatar (displays a users avatar)
            ChaosBot (displays basic info about the bot)
            perms (displays perms for users)
            steam (display a steam game)
            wikipedia (display stuff from wikipedia)
            weather (displays weather for a state or city)`); 

        message.channel.send(embed)              
    }
    }