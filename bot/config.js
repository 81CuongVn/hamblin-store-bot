const _config = {

    // Client Settings (REQUIRED)
    prefix: "?", // The prefix to run all commands inside of the bot
    token: "YOUR_BOT_TOKEN", // The token from your Discord Dev Portal
    websiteURL: "https://domain.ext", // The link to your store template. NO TRAILING "/" 
    aboutServer: "YOUR_DESCRIPTION", // The backup description for the bot if sql data can not be pulled.
    date_format: "MM-DD-YYYY HH:mm", // The date format for the bot
    copyright: "© 2021 Your Name", // The footer for most embeds
    colorhex: "#2F3136", // The backup color for the bot if sql data can not be pulled.
    deleteCommands: false, // This will decide whether or not to delete commands when they are ran.

    // Application Settings (REQUIRED)
    themeColor: "blue", // The theme color for the main logger (blue, red, green, yellow, magenta)
    port: "8080", // The port for the bot to listen on
    debugmode: true, // Toggles the logging of errors and excess information
    logCommandLoading: false, // Toggles the logging of commands being loaded

    // MySQL Settings (REQUIRED)
    // SAME DATABASE AS YOUR STORE TEMPLATE V2
    database: {
        host: "localhost", // The IP of your SQL Server
        user: "root", // The username for your SQL Server
        password: "", // The password for of the user for your SQL Server
        database: "database" // The database for the store template v2
    },

    // License System Integration W/Store Template V2
    autoLicensing: {
        enabled: false, // Use the license system for this bot

        // The URL to your license system (Hyperz License System (https://github.com/itz-hyperz/license-system))
        licenseSystemURL: "https://license.domain.ext", // MAKE SURE THERE IS NO TRAILING "/"
        licenseSystemSecret: "YOUR_LICENSE_SYSTEM_SECRET", // The secret to add licenses in your API settings of your license system

        channelId: "CHANNEL_ID_HERE", // The channel to listen to for new orders
        webhookId: "WEBHOOK_ID_HERE", // The Id to your webhook

        logNewLicenses: false, // Log when a new license is created
        loggingChannelId: "CHANNEL_ID_HERE" // Channel Id to send new license logs to
    },

    // Permission Settings
    // These are Role Ids, NOT User Id's!!!!
    permissions: {
        editAnnouncement: ["ROLE_ID_HERE"], // Can edit the site announcement
        checkUserAccounts: ["ROLE_ID_HERE"], // Can check user accounts
        searchProducts: ["ROLE_ID_HERE"] // Can search store products via search command
    },

    command_count: 6,
    event_count: 3

}

module.exports = _config