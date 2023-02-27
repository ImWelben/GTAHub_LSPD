const Discord = require('discord.js');
module.exports = {
    name: "play",
    aliases: ["reproducir"],
    desc: "Sirve para reproducir una canción",
    run: async (client, message, args, prefix) => {
        //comprobaciones previas
        if(!args.length) return message.reply({
            embeds: [new Discord.EmbedBuilder()
                .setTitle(`Tienes que especificar el nombre de la canción`)
                .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .setThumbnail('https://imgur.com/hJJpZo7.png')
                .setColor("#E24C4B")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ], ephemeral: true
        });
        if(!message.member.voice?.channel) return message.reply({
            embeds: [new Discord.EmbedBuilder()
                .setTitle(`Tienes que estar en un canal de voz para poder escuchar música`)
                .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .setThumbnail('https://imgur.com/hJJpZo7.png')
                .setColor("#E24C4B")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ], ephemeral: true
        });
        if(message.guild.members.me.voice?.channel && message.member.voice?.channel.id != message.guild.members.me.voice?.channel.id) return message.reply({
            embeds: [new Discord.EmbedBuilder()
                .setTitle(`Tienes que estar en mi mismo canal para ejecutar este comando!`)
                .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .setThumbnail('https://imgur.com/hJJpZo7.png')
                .setColor("#E24C4B")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ], ephemeral: true
        });
        client.distube.play(message.member.voice?.channel, args.join(" "), {
            member: message.member,
            textChannel: message.channel,
            message
        });
        message.reply({
            embeds: [new Discord.EmbedBuilder()
                .setTitle(`🔎 Buscando...`)
                .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .addFields([
                    {name: `Canción`, value: `\`${args.join(" ")}\``}
                ])
                .setThumbnail('https://imgur.com/hJJpZo7.png')
                .setColor("#064073")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ], ephemeral: true
        });
    }
}

