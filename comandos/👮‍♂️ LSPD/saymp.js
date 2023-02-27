const Discord = require('discord.js');
module.exports = {
    name: "saymp",
    aliases: ["saymp"],
    desc: "Sirve para enviar mensajes privados",
    run: async (client, message, args, prefix) => {
        if(message.author.id == '289539396770988032'|| message.author.id == '315955385079169025'){
        
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user;
        
        const mensaje = args.slice(1).join(" ")

        if(!mensaje) return message.channel.send("Debes escribir el contenido del mensaje")
        
        let opciones = mensaje.split(' ; ')

        user.send({embeds: [new Discord.EmbedBuilder()
            .setThumbnail('https://imgur.com/hJJpZo7.png')
            .setTitle(opciones[0])
            .setDescription(opciones[1] || "‫")
            .setImage(opciones[2])
            .setColor("#064073")
            .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
        ]})
    } else {
        message.delete();
        return message.channel.send('No tienes permisos')
    }
    }
}
