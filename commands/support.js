const Discord = require("discord.js")

module.exports = {
  name: "support",
  run: async (bot, message, args) => {
    let inviteembed = new Discord.MessageEmbed()
      .setTitle("Join Server Support SkyPro")
      .setColor("#66ffff")
      .setURL(
        "https://discord.gg/aggfWJB"
      )
      .setDescription(`Join Server Support SkyPro`)
   
      return message.channel.send(inviteembed);
  }
};