exports.run = async (client, message, args, con) => {

    let embed = new client.discord.MessageEmbed()
    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
    .setColor(client.themeColor)
    .setDescription(`**Creators:**\n[@Hyperz](https://hyperz.net) - *Physical programming of the [bot](https://devwrld.xyz/shop/hamblin-store-bot).*\n[@Jekeltor](https://jakehamblin.com) - *Creating [Store Template V2](https://jakehamblin.com/products/store-template-v2).*`)
    message.channel.send({ embeds: [embed] }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});

}

exports.info = {
    name: "credits",
    description: "View the credits for this bot!",
    aliases: ['creator', 'hyperz']
}
