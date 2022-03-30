exports.run = async (client, message, args, con) => {

    let check = await client.utils.permCheck(client, message, 'searchProducts')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});
    if(!args[0]) return message.channel.send({ content: `Please include some context as to what you want to search.\nEx: \`${client.config.prefix}search bot\`.` })

    let products = [];

    await con.query(`SELECT * FROM products WHERE name LIKE '%${args[0]}%'`, async (err, row) => {
        if(err) throw err;
        if(!row[0]) {
            await con.query(`SELECT * FROM products WHERE description LIKE '%${args[0]}%'`, async (err, row) => {
                if(err) throw err;
                if(!row[0]) return message.channel.send({ content: "No results found." }).catch(e => {});
                row.forEach(product => {
                    let linkifiedName = product.name.toLowerCase().replaceAll(" ", "-")
                    products.push(`${product.name} - [View Product](${client.config.websiteURL}/shop/${linkifiedName})`)
                });
            });
        } else {
            row.forEach(product => {
                let linkifiedName = product.name.toLowerCase().replaceAll(" ", "-")
                products.push(`${product.name} - [View Product](${client.config.websiteURL}/shop/${linkifiedName})`)
            });
        }
        setTimeout(async () => {
            if(!products[0]) return;
            let embed = new client.discord.MessageEmbed()
            .setColor(client.themeColor)
            .setTitle('Search Results')
            .setDescription(products.join("\n"))
            .setThumbnail('https://jakehamblin.com/images/logo.png')
            .setTimestamp()
            .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) })
            await message.channel.send({ embeds: [embed] }).catch(e => {});
        }, 150);
    });

}

exports.info = {
    name: "search",
    description: "Search the products on the store.",
    aliases: ['browse']
}