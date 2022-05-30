module.exports = async (client) => {
    console.log(`Logged in as ${client.user.username}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);


    const arrayOfStatus = (client.config.discord.activity)
    let index = 0;
    setInterval(() => {
        if(index === arrayOfStatus.length) index = 0;
        const status = arrayOfStatus[index]
        client.user.setActivity(status, { type: client.config.discord.activityType}).catch(console.error)
        index++;
    }, client.config.discord.time_to_switch_activity)
};