const { Permissions } = require('discord.js')
const chalk = require('chalk');
const axios = require('axios')
async function colorize(color, content) {
    switch (color, content) {
        case "red":
            return chalk.red(content)
        case "green":
            return chalk.green(content)
        case "yellow":
            return chalk.yellow(content)
        case "blue":
            return chalk.blue(content)
        case "cyan":
            return chalk.cyan(content)
        case "white":
            return chalk.white(content)
        case "black":
            return chalk.black(content)
        default:
            return chalk.white(content);
    };
};
async function error(client, content) {
    if(client.config.debugmode) {
        console.log(chalk.red('DEBUG MODE ERROR: ', content, `\n ${content.stack}`))
    }
};
async function sendError(string, channel) {
    await channel.send({ content: string }).catch(e => {});
};
async function maths(array) {
    let bruh = array[Math.floor(array.length * Math.random())];
    return bruh;
};
async function permCheck(client, message, role) {
    let per;
    switch(role) {
        case "editAnnouncement":
            per = client.config.permissions.editAnnouncement
            break;
        case "checkUserAccounts":
            per = client.config.permissions.checkUserAccounts
            break;
        case "searchProducts":
            per = client.config.permissions.searchProducts
            break;
    }
    if(message.member.roles.cache.some(h=>per.includes(h.id))) {
        return true;
    } else {
        return false;
    }
};
async function putLicense(client, ownerId) {
    let newLicense = await axios({
        method: 'get',
        url: `${client.config.autoLicensing.licenseSystemURL}/addLicense`,
        headers: {Accept: 'application/json, text/plain, */*','User-Agent': '*', 'secret': client.config.autoLicensing.licenseSystemSecret, 'ownerid': ownerId }
    });
    if(!newLicense.data.error) { // If no error is found
        console.log(`License Added: ${ownerId}`) // Log the new license information (JSON Object)
        if(client.config.autoLicensing.logNewLicenses) {
            let channel = await client.channels.cache.get(client.config.autoLicensing.loggingChannelId)
            setTimeout(async () => {
                let embed = new client.discord.MessageEmbed()
                .setColor(client.themeColor)
                .setTitle('New License Created!')
                .setDescription(`**○ Licensee:** \`${ownerId}\`\n**○ Id:** #${newLicense.data.licenseInfo.id}\n**○ authKey:** ||${newLicense.data.licenseInfo.authKey}||\n**○ authIp:** \`${newLicense.data.licenseInfo.authIp}\``)
                .setThumbnail('https://jakehamblin.com/images/logo.png')
                .setTimestamp()
                .setFooter({ text: "Type: Automatic", iconURL: client.user.avatarURL({ dynamic: true }) })
                await channel.send({ embeds: [embed] }).catch(e => {});
                let member = await client.users.fetch(ownerId)
                if(member != undefined) {
                    await member.send({ embeds: [embed] }).catch(e => {});
                }
            }, 1000)
        }
    } else { // If an error is found
        console.log(`License Add Error: `, newLicense.data.reason) // Log the error
    }
}
exports.error = error;
exports.colorize = colorize;
exports.sendError = sendError;
exports.maths = maths;
exports.permCheck = permCheck;
exports.putLicense = putLicense;