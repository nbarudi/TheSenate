const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args)=>{
    message.channel.send("This is a template command! It is not real!")
}

module.exports.help = {
    name: "template",
    description: "template",
    usage: "template",
    permission: "BotCreator",
    cat: "null"
}