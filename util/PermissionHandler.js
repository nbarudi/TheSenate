const Discord = module.require(`discord.js`)

module.exports.checkPermission = async (bot, message, perm) =>{
    let all = "Member"
    let mod = "Moderator"
    let admin = "Administrator"
    let owner = "ServerCreator"
    let botc = "BotCreator"

    if(message.author.id == 270651139157000192 || message.author.id == 146065389460127745) return true;

    if(perm == all) return true;
    else if(perm == mod){
        if(message.member.hasPermissions("MANAGE_MESSAGE")){
            return true
        }else{
            message.channel.send("Sorry! You are missing the permission: MANAGE_MESSAGE")
            return false;
        }
    }
    else if(perm == admin){
        if(message.member.hasPermissions("MANAGE_GUILD")){
            return true
        }else{
            message.channel.send("Sorry! You are missing the permission: MANAGE_GUILD")
            return false;
        }
    }
    else if(perm == owner){
        if(message.guild.ownerID == message.author.id){
            return true
        }else{
            message.channel.send("Sorry! You are missing the permission: GUILD CREATOR")
            return false;
        }
    }
    else if(perm == botc){
        if(message.author.id == 270651139157000192 || message.author.id == 146065389460127745){
            return true;
        }else{
            message.channel.send("Sorry! You are missing the permission: BOT CREATOR")
        }
    }

}