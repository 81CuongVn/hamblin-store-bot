module.exports = async(client, con, interaction) => {

    try {

        let edited = new client.discord.MessageEmbed()
        .setColor(client.themeColor)
        .setTitle(`${client.user.username} Help Menu`)
        .setThumbnail(client.user.avatarURL({ dynamic: true }))

        let row = new client.discord.MessageActionRow()
        .addComponents(
            new client.discord.MessageButton()
            .setCustomId('helpPageLeft')
            .setLabel(`Back`)
            .setStyle(`PRIMARY`),
        )
        .addComponents(
            new client.discord.MessageButton()
            .setCustomId('helpPageRight')
            .setLabel(`Next`)
            .setStyle(`PRIMARY`),
        )
        .addComponents(
            new client.discord.MessageButton()
            .setLabel(`Store`)
            .setURL(`${client.config.websiteURL}`)
            .setStyle(`LINK`),
        )

        let page2 = "`ping` - Check latency.\n`help` - Gets you this menu.\n`announcement` - Set the websites announcement message.\n`account` - View a users account on the website.\n`search` - Search products on the website.\n`credits` - View the bots credits.";
        let page3 = `**Creators:**\n[@Hyperz](https://hyperz.net) - *Physical programming of the [bot](https://devwrld.xyz/shop/hamblin-store-bot).*\n[@Jekeltor](https://jakehamblin.com) - *Creating [Store Template V2](https://jakehamblin.com/products/store-template-v2).*`;

        if (!interaction.isButton()) return;
        let message = interaction.message
        if (interaction.customId === 'helpPageLeft') {

            // CODE FOR GOING BACK PAGES

            if(message.embeds) {
                message.embeds.forEach(embed => {
                    if(embed.footer.text.includes('Page 1/3')) {
                        edited.fields = null;
                        edited.setDescription(page3);
                        edited.setFooter({ text: `Page 3/3` })
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 3/3')) {
                        edited.fields = null;
                        edited.setDescription(page2);
                        edited.setFooter({ text: `Page 2/3` })
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 2/3')) {
                        edited.setDescription(``);
                        edited.addFields(
                            { name: "Bot Name", value: `\`${client.user.username}\``, inline: true, },
                            { name: "Bot Prefix", value: `\`${client.config.prefix}\``, inline: true, },
                            { name: "About Server", value: `${client.aboutServer}`, inline: false, },
                            { name: "Copyright", value: `${client.config.copyright}`, inline: false, },
                        )
                        edited.setFooter({ text: `Page 1/3` })
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    }
                });
            }
        } else if (interaction.customId === 'helpPageRight') {

            // CODE FOR GOING FORWARD PAGES

            if(message.embeds) {
                message.embeds.forEach(embed => {
                    if(embed.footer.text.includes('Page 1/3')) {
                        edited.fields = null;
                        edited.setDescription(page2);
                        edited.setFooter({ text: `Page 2/3` })
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 2/3')) {
                        edited.fields = null;
                        edited.setDescription(page3);
                        edited.setFooter({ text: `Page 3/3` })
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 3/3')) {
                        edited.setDescription(``);
                        edited.addFields(
                            { name: "Bot Name", value: `\`${client.user.username}\``, inline: true, },
                            { name: "Bot Prefix", value: `\`${client.config.prefix}\``, inline: true, },
                            { name: "About Server", value: `${client.aboutServer}`, inline: false, },
                            { name: "Copyright", value: `${client.config.copyright}`, inline: false, },
                        )
                        edited.setFooter({ text: `Page 1/3` })
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    }
                });
            }
        }
    } catch(e) {}

}
