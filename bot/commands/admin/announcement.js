exports.run = async (client, message, args, con) => {

    let check = await client.utils.permCheck(client, message, 'editAnnouncement')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

    if(!args[0]) {
        await con.query(`UPDATE information SET announcement=''`, async (err, row) => {
            if(err) throw err;
            await message.channel.send({ content: "Announcement has been set to: `nothing`." }).catch(e => {})
        });
    } else {
        let ann = await args.join(" ").replaceAll('"', '')
        await con.query(`UPDATE information SET announcement="${ann}"`, async (err, row) => {
            if(err) throw err;
            await message.channel.send({ content: `Announcement has been set to: \`${ann}\`.` }).catch(e => {})
        });
    }

}

exports.info = {
    name: "announcement",
    description: "Change the websites announcement.",
    aliases: ['announce', 'setannouncement', 'changeannouncement', 'setannounce', 'changeannounce']
}