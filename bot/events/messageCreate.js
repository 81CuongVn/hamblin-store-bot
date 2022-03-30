module.exports = async(client, con, message) => {

    if(!message.author) return;
    if(message.author.id == client.user.id) return;
    if(message.channel.type === 'DM') {
        return;
    }

    if(message.mentions.users.first()) {
        if(message.mentions.users.first().id === client.user.id) {
            let embed = new client.discord.MessageEmbed()
            .setColor(client.themeColor)
            .setDescription(`My prefix is \`${client.config.prefix}\`.`)
            await message.channel.send({ embeds: [embed] }).catch(e => {});
        }
    }

    if(client.config.autoLicensing.enabled) {
        if(message.channel.id == client.config.autoLicensing.channelId) {
            if(!message.webhookId || message.webhookId != client.config.autoLicensing.webhookId) return;
            let embed = await client.utils.putLicense(client, message.content);
            await message.react("✅").catch(e => {});
        }
    }

    if (message.content.startsWith(client.config.prefix)) {
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        const cmd = await client.commands.get(command)
        if (cmd) {
            try {
                await cmd.run(client, message, args, con);
                if(client.config.deleteCommands) {
                    message.delete().catch(e => {});
                }
            } catch(e) {
                return client.utils.error(client, e);
            }
        }
    }

}
