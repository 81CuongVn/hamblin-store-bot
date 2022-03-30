const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, con) => {

    let embed = new client.discord.MessageEmbed()
    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
    .setColor(client.themeColor)
    .setDescription(`🏓 Latency is: **${Date.now() - message.createdTimestamp}ms.**`)
    message.channel.send({ embeds: [embed] }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});

}

exports.info = {
    name: "ping",
    description: "See if im alive!",
    aliases: ['bing']
}