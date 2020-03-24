const Discord = require("discord.js")

const config = require("./lib/data")
const client = new Discord.Client()

const createEmbed = require("./functions/createEmbed")
const getSongLink = require("./functions/getSongLink")

client.on("message", async msg => {
  if (msg.author.bot) return;
  if(new RegExp(config.platforms.join("|")).test(msg)) {
    let services = msg.content.match(/\bhttps?:\/\/\S+/gi)
    services.forEach(async (service) => {
      let embed = createEmbed(await getSongLink(service), client)
      msg.channel.send({ embed })
    })
  }
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!\ninvite with https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
});

function login() {
  console.info(`logging in with ${process.env.api ? `api key` : `no api key`}`)
  client.login(process.env.key)
    .catch(e => console.log(e))
}

login()