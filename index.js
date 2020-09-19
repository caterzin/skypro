const Discord = require('discord.js');

const client = new Discord.Client();

const { token, default_prefix } = require('./config.json');

const db = require('quick.db');

const { readdirSync } = require('fs');

const { join } = require('path');

const config = require('./config.json');
client.config = config;

const { GiveawaysManager } = require('discord-giveaways');

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

client.commands= new Discord.Collection();

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}


client.on("error", console.error);

client.on('ready', () => {
    console.log('I am ready');
    client.user.setActivity(`SkyPro | +help`)
});


let stats = {
    serverID: '<ID>',
    total: "<ID>",
    member: "<ID>",
    bots: "<ID>"
}



client.on('guildMemberAdd', member => {
    if(member.guild.id !== stats.serverID) return;
    client.channels.cache.get(stats.total).setName(`Total Users: ${member.guild.memberCount}`);
    client.channels.cache.get(stats.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})

client.on('guildMemberRemove', member => {
    if(member.guild.id !== stats.serverID) return;
    client.channels.cache.get(stats.total).setName(`Total Users: ${member.guild.memberCount}`);
    client.channels.cache.get(stats.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);

    
})

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    
    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = default_prefix;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})


client.on("guildMemberAdd", (member) => {
    let chx = db.get(`welchannel_${member.guild.id}`);
    
    if(chx === null) {
      return;
    }
  
    let wembed = new Discord.MessageEmbed()
    .setAuthor(member.user.username, member.user.avatarURL())
    .setColor("#0032FF")
    .setTitle("Welcome",)
    .addField(":page_facing_up: Name:", member.user)
     .addField(":detective: User ID:", member.id)
     .addField(":chart_with_upwards_trend:  Member Count:", member.guild.memberCount)
     .setFooter(member.guild.name)
     .setTimestamp(member.guild.createdAt)
    .setThumbnail(member.user.avatarURL())
    .setDescription("Welcome :tada: Have Fun!");
    
    client.channels.cache.get(chx).send(wembed)
  })
  
  client.on("guildMemberRemove", (member) => {
    let chx = db.get(`leavechannel_${member.guild.id}`);
    
    if(chx === null) {
      return;
    }
  
    let wembed = new Discord.MessageEmbed()
    .setAuthor(member.user.username, member.user.avatarURL())
    .setColor("#FF2D00")
    .setTitle("Goodbye",)
      .addField(":page_facing_up: Name:", member.user)
     .addField(":detective: User ID:", member.id)
     .addField(":chart_with_upwards_trend:  Member Count:", member.guild.memberCount)
     .setFooter(member.guild.name)
     .setTimestamp(member.guild.createdAt)
    .setThumbnail(member.user.avatarURL())
    .setDescription("Goodbye ", member.user);
    
    client.channels.cache.get(chx).send(wembed)
  })
  


client.login(token);
