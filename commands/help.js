const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "The help command, what do you expect?",

    async run (client, message, args){

        //Sort your commands into categories, and make seperate embeds for each category

        const moderation = new Discord.MessageEmbed()
        .setTitle('SkyPro')
        .addField('`+kick`', 'Kicks a member from your server via mention or ID')
        .addField('`+ban`', 'Bans a member from the server')
        .addField('`+invite`', 'Invite Bot SkyPro')
        .addField('`+support`', 'Server Support SkyPro')
        .addField('`+clear`', 'Purges messages')
        .addField('`+lock`', 'Lock a Channel')
        .addField('`+unlock`', 'Unlocks a Channel')
        .addField('`+warn`', 'Warn a member')
        .addField('`+warnings`', 'Check a users warnings')
        .addField('`+deletewarns`', 'Delete a member warns')
        .addField('`+setwelcome`', 'Set the welcome channel')
        .addField('`+setleave`', 'Sets The Leave Channel')
        .setTimestamp()

        const fun = new Discord.MessageEmbed()
        .setTitle('SkyPro')
        .addField('`+meme`', 'Generates a random meme')
        .addField('`+ascii`', 'Converts text into ascii')
        .addField('`+avatar`', 'Get your or someone photo profile.')
        .addField('`+jail`', 'Get your pfp in a jail')
        .setTimestamp()

        const utility = new Discord.MessageEmbed()
        .setTitle('SkyPro')
        .addField('`+suggest`', 'Make a suggestion and have the community vote')
        .addField('`+calculate`', 'Get the answer to a math problem')
        .addField('`+ping`', 'Get the bot\'s API ping')
        .addField('`+weather`', 'Checks weather forecast for provided location')
        .addField('`+covid`', 'Track a country or worldwide COVID-19 cases')
        .addField('`+giveaway`', 'Create a giveaway')
        .addField('`+reroll`', 'Rerolls giveaway')
        .addField('`+invite`', 'Invite My Bot')
        .setTimestamp()

        const pages = [
            moderation,
            fun,
            utility,
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
    }
}
