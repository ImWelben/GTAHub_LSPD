const Discord = require('discord.js');
module.exports = {
    name: "stop",
    aliases: ["desconectar", "leavevc", "leave", "disconnect"],
    desc: "Sirve para desconectar al bot de la sala de voz",
    run: async (client, message, args, prefix) => {
        //comprobaciones previas
        const queue = client.distube.getQueue(message);
        if(!queue) return message.reply({
            embeds: [new Discord.EmbedBuilder()
                .setTitle(`No hay ninguna canción reproduciéndose`)
                .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .setThumbnail('https://imgur.com/hJJpZo7.png')
                .setColor("#E24C4B")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ], ephemeral: true
        });
        if(!message.member.voice?.channel) return message.reply({
            embeds: [new Discord.EmbedBuilder()
                .setTitle(`Tienes que estar en un canal de voz para poder ver la lista de canciones`)
                .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .setThumbnail('https://imgur.com/hJJpZo7.png')
                .setColor("#E24C4B")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ], ephemeral: true
        });
        if(message.guild.members.me.voice?.channel && message.member.voice?.channel.id != message.guild.members.me.voice?.channel.id) return message.reply({
            embeds: [new Discord.EmbedBuilder()
                .setTitle(`Tienes que estar mi mismo canal para poder ver la lista de canciones`)
                .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .setThumbnail('https://imgur.com/hJJpZo7.png')
                .setColor("#E24C4B")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ], ephemeral: true
        });
        client.distube.stop(message);
        message.reply({
            embeds: [new Discord.EmbedBuilder()
                .setTitle(`Desconectado`)
                .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .setThumbnail('https://imgur.com/hJJpZo7.png')
                .setColor("#064073")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ]
        })
    }
}

