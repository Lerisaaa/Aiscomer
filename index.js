const {
    Client,
    Intents,
    MessageEmbed
} = require('discord.js')

const config = require("./config.json")
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] }); 

client.on('ready', () => {
    console.log(`Loginned in as ${client.user.tag}(${client.user.id})`)
})

client.on('guildMemberAdd', (m) => {
    if (m.guild.id === config.guildid) {
        const lastchannel = m.guild.channels.cache.get(config.lastvcid)
        const totalchannel = m.guild.channels.cache.get(config.totalvcid)
        const welcomechannel = m.guild.channels.cache.get(config.welcomechid)

        const welcomeembed = new MessageEmbed().setColor("FFFFFF").setTitle(`Welcome to Aisle`).setDescription(`**__${m.user.tag}__** joinned to server. If you want to be registered write **__"register"__** to the channel. <@${m.user.id}>`).setFooter('Aisle Welcomer')
        welcomechannel.send({ 
            embeds: [welcomeembed]
        })

        if (lastchannel) {
            lastchannel.setName(`Last [${m.user.tag}]`)
        } else {
            console.log('Channel not found.')
        }

        if (totalchannel) {
            totalchannel.setName(`Total [${m.guild.memberCount}]`)
        } else {
            console.log('Channel not found.')
        }
    }
})


client.on('messageCreate', async (m) => {
    if (m.channel.id === config.welcomechid) {
        if (m.content === "register") {
            const registeredid = m.guild.roles.cache.get(config.registeredrole)
            const member = m.guild.members.cache.get(m.author.id)
        
            if (registeredid) {
                member.roles.add(registeredid)
                m.reply('Successfully registered.')
            } else {
                console.log('Registered role not found.')
            }
        }
    }
})

client.login(config.token)
