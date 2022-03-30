exports.run = async (client, message, args, con) => {

    let check = await client.utils.permCheck(client, message, 'checkUserAccounts')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

    if(!args[0]) return message.channel.send({ content: "Please include a users account to check." }).catch(e => {});

    let account;
    if(message.mentions.users.first()) {
        account = message.mentions.users.first().id
    } else if(!isNaN(args[0])) {
        let user = await client.users.fetch(args[0])
        if(!user) return message.channel.send({ content: "I was unable to find that user." }).catch(e => {});
        account = user.id
    } else {
        return message.channel.send({ content: "I was unable to find that user." }).catch(e => {});
    }

    await con.query(`SELECT * FROM purchases WHERE discord='${account}'`, async (err, row) => {
        if(err) throw err;
        let found = await client.users.fetch(account)
        let embed = new client.discord.MessageEmbed()
        .setColor(client.themeColor)
        .setDescription(`**[${found.tag}'s Purchases](${client.config.websiteURL}/shop)**\n${found.tag} has ${row.length} owned item(s).\nWe do not release names of items they own.`)
        .setFooter({ text: `${message.author.tag}`, iconURL: message.author.avatarURL({ dynamic: true }) })
        .setTimestamp()
        try {
            embed.setThumbnail(found.avatarURL({ dynamic: true }))
        } catch(e) {}
        await message.channel.send({ embeds: [embed] }).catch(e => {});
    });

}

exports.info = {
    name: "account",
    description: "Check if a user owns any products from the bot.",
    aliases: ['ui', 'user', 'check', 'purchases', 'items', 'products', 'downloads']
}