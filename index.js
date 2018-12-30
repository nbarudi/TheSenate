//Defining Variables!
const Discord = require(`discord.js`)
const bot = new Discord.Client()
const settings = require(`./settings.json`)
const fs = require("fs")


bot.commands = new Discord.Collection()

//Loading Commands to a Constent Array!
fs.readdir("./cmds", (err, files) =>{
    if (err) console.error(err)

    let jsfiles = files.filter(f => f.split(".").pop() === "js")
    if (jsfiles.length <= 0) {
        console.log("No Commands To Load!")
        return
    }

    console.log(`Loading ${jsfiles.length} command(s)!`)

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`)
        console.log(`${i = 1}: ${f} Loaded!`)
        bot.commands.set(props.help.name, props)
    })

})

//Loading Utils
fs.readdir("./util", (err, files) =>{
    if(err) console.console.error(err)
    let jsfiles = files.filter(f => f.split(".").pop() === "js")
  
    console.log(`Loading ${jsfiles.length} Util(s)`)
  })

//When the bot is ready do whatever!
bot.on("ready", () => {
    console.log("The Bot is now online!")
    console.log(`Bot: I have logged in as ${bot.user.tag}`)
    bot.user.setActivity("Created By: nbarudi and PapaFrank")
    bot.generateInvite([`ADMINISTRATOR`]).then(link => { console.log(`Invite link is: ${link}`)}).catch(console.error)
})

let perm = require(`./util/PermissionHandler`)

//Checking if a message is sent!
bot.on('message', message => {
    console.log(`#${message.channel.name}: ${message.author.username}: ${message.content}`)
  
    let messageArray = message.content.split(" ")
    let command = messageArray[0]
    let args = messageArray.slice(1);
  
    if(message.author.bot) return;

    if(!message.content.startsWith(settings.prefix)) return;

    let cmd = bot.commands.get(command.slice(settings.prefix.length))
    if (cmd) {
        if(perm.checkPermission(bot, message, cmd.help.permission)){
            cmd.run(bot, message, args)
        }
    }
})

// Making the bot Login!
bot.login(settings.token)