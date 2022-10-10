const Discord = require('discord.js')
const { stripIndents } = require('common-tags')

module.exports = { // Update To Your Handler
  name: 'perms',
  aliases: [],
  category: 'infos',
  utilisation: '{prefix}perms (user)',
  description: 'Brings up a users set of permissions',

  async execute(client, message, args) {

    // Variables
    const mem = args.join(' ');

    (async () => {
      let infoMem;
      const server = message.guild;

      if (!mem) {
        infoMem = message.member;
      } else {
        infoMem = message.mentions.members.first() || server.members.cache.find(m => m.id === `${mem}`) || server.members.cache.find(m => m.displayName.toUpperCase() === `${mem.toUpperCase()}`) || server.members.cache.find(m => m.user.username.toUpperCase() === `${mem.toUpperCase()}`) || server.members.cache.find(m => m.user.username.toLowerCase()
          .includes(`${mem.toLowerCase()}`));
      }
      if (!infoMem) {
        return message.channel.send('Error! Unable to find specified user. Please try again.');
      }

      // Executing
      const yes = '✅';
      const no = '❌';

      if (infoMem.hasPermission('ADMINISTRATOR')) {
        const embed = new Discord.MessageEmbed();
        embed.setColor('#2BFED5');
        embed.setAuthor(infoMem.displayName, infoMem.user.displayAvatarURL());
        embed.setFooter(`Requested by: ${message.member.displayName}`);
        embed.setTimestamp();

        // General Perms
        embed.addField('➢ __General Permissions:__', stripIndents`
  \`Administrator\`| ${yes}
  `, true);

        return message.channel.send(embed);
      }
      // Non admin perms:
      const embed = new Discord.MessageEmbed();
      embed.setColor('#2BFED5');
      embed.setAuthor(infoMem.displayName, infoMem.user.displayAvatarURL());
      embed.setFooter(`Requested by: ${message.member.displayName}`);
      embed.setTimestamp();

      // General Perms
      embed.addField('➢ __General Permissions:__', stripIndents`
  \`Administrator\`| ${no}
  \`View Audit Logs\`| ${(infoMem.hasPermission('VIEW_AUDIT_LOG') ? yes : no)}
  \`Manage Server\`| ${(infoMem.hasPermission('MANAGE_GUILD') ? yes : no)}
  \`Manage Roles\`| ${(infoMem.hasPermission('MANAGE_ROLES') ? yes : no)}
  \`Manage Channels\`| ${(infoMem.hasPermission('MANAGE_CHANNELS') ? yes : no)}
  \`Kick Members\`| ${(infoMem.hasPermission('KICK_MEMBERS') ? yes : no)}
  \`Ban Members\`| ${(infoMem.hasPermission('BAN_MEMBERS') ? yes : no)}
  \`Create Invite\`| ${(infoMem.hasPermission('CREATE_INSTANT_INVITE') ? yes : no)}
  \`Change Nickname\`| ${(infoMem.hasPermission('CHANGE_NICKNAME') ? yes : no)}
  \`Manage Nicknames\`| ${(infoMem.hasPermission('MANAGE_NICKNAMES') ? yes : no)}
  \`Manage Emojis\`| ${(infoMem.hasPermission('MANAGE_EMOJIS') ? yes : no)}
  \`Manage Webhooks\`| ${(infoMem.hasPermission('MANAGE_WEBHOOKS') ? yes : no)}
  \`View Guild Insights\`| ${infoMem.hasPermission('VIEW_GUILD_INSIGHTS') ? yes : no}
  `, true);

      // Text Perms
      embed.addField('➢ __Text Permissions:__', stripIndents`
  \`Read Messages\`| ${(infoMem.permissions.has(1024) ? yes : no)}
  \`Send Messages\`| ${(infoMem.hasPermission('SEND_MESSAGES') ? yes : no)}
  \`Send TTS Messages\`| ${(infoMem.hasPermission('SEND_TTS_MESSAGES') ? yes : no)}
  \`Manage Messages\`| ${(infoMem.hasPermission('MANAGE_MESSAGES') ? yes : no)}
  \`Embed Links\`| ${(infoMem.hasPermission('EMBED_LINKS') ? yes : no)}
  \`Attach Files\`| ${(infoMem.hasPermission('ATTACH_FILES') ? yes : no)}
  \`Read Message History\`| ${(infoMem.hasPermission('READ_MESSAGE_HISTORY') ? yes : no)}
  \`Mention Everyone\`| ${(infoMem.hasPermission('MENTION_EVERYONE') ? yes : no)}
  \`Use External Emojis\`| ${(infoMem.hasPermission('USE_EXTERNAL_EMOJIS') ? yes : no)}
  \`Add Reactions\`| ${(infoMem.hasPermission('ADD_REACTIONS') ? yes : no)}
  `, true);

      // Voice Perms
      embed.addField('➢ __Voice Permissions:__', stripIndents`
  \`Connect\`| ${(infoMem.hasPermission('CONNECT') ? yes : no)}
  \`Speak\`| ${(infoMem.hasPermission('SPEAK') ? yes : no)}
  \`Mute Members\`| ${(infoMem.hasPermission('MUTE_MEMBERS') ? yes : no)}
  \`Deafen Members\`| ${(infoMem.hasPermission('DEAFEN_MEMBERS') ? yes : no)}
  \`Move Members\`| ${(infoMem.hasPermission('MOVE_MEMBERS') ? yes : no)}
  \`Use Voice Activity\`| ${(infoMem.hasPermission('USE_VAD') ? yes : no)}
  \`Priority Speaker\`| ${(infoMem.hasPermission('PRIORITY_SPEAKER') ? yes : no)}
  `, true);

      return message.channel.send(embed);
    })()
  }
}
