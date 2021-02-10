module.exports = {
    name: 'clear',
    description: "clears text!",
    async execute(client, message, args) {

        if (message.member.permissions.has("ADMINISTRATOR"))  {

        if(!args[0]) return message.reply("please enter an amount to delete");
        if(isNaN(args[0])) return message.reply("please enter a real number");

        if(args[0] > 100) return message.reply("you can't delete more than 100 messages");
        if(args[0] < 1) return message.reply("you can't do 0 or below. Minimum is 1");

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);
        });
    } else {
        message.channel.send('you are not a moderator.');

            }   
    }
    }
