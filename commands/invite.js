const Discord = require("discord.js")

module.exports = {
  name: "invite",
  run: async (bot, message, args) => {
    let inviteembed = new Discord.MessageEmbed()
      .setTitle("Invite me!")
      .setColor("#66ffff")
      .setURL(
        "https://discord.com/oauth2/authorize?client_id=754914884596006943&permissions=8&scope=bot"
      )
      .setDescription(`The bot is on ${bot.guilds.cache.size} servers!`)

    return message.channel.send(inviteembed);
  }
};