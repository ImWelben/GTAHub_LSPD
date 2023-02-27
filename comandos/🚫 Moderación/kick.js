const Discord = require('discord.js')
module.exports = {
    name: "kick",
    aliases: ["kickear", "expulsar"],
    desc: "Sirve para expulsar a un usuario del Servidor",
    permisos: ["Administrator", "KickMembers"],
    permisos_bot: ["Administrator", "KickMembers"],
    run: async (client, message, args, prefix) => {
        //definimos la persona a banear
        let usuario = message.guild.members.cache.get(args[0]) || message.mentions.members.filter(m => m.guild.id == message.guild.id).first();
        if (!usuario) return message.reply({embeds: [new Discord.EmbedBuilder()
            .setTitle(`No se ha encontrado el usuario que has especificado`)
            .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
            .setThumbnail('https://imgur.com/hJJpZo7.png')
            .setColor("#E24C4B")
            .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
        ]});

        //definimos razón, y si no hay, la razón será "No se ha especificado ninguna razón!"
        let razon = args.slice(1).join(" ");
        if (!razon) razon = "No se ha especificado ninguna razón!"

        //comprobamos que el usuario a banear no es el dueño del servidor
        if (usuario.id == message.guild.ownerId) return message.reply({embeds: [new Discord.EmbedBuilder()
            .setTitle(`No puedes expulsar al dueño del servidor`)
            .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
            .setThumbnail('https://imgur.com/hJJpZo7.png')
            .setColor("#E24C4B")
            .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
        ]});

        //comprobar que el BOT está por encima del usuario a banear
        if (message.guild.members.me.roles.highest.position > usuario.roles.highest.position) {
            //comprobar que la posición del rol del usuario que ejecuta el comando sea mayor a la persona que vaya a banear
            if (message.member.roles.highest.position > usuario.roles.highest.position) {
                //enviamos al usuario por privado que ha sido baneado!
                usuario.send({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setTitle(`Has sido expulsado de __${message.guild.name}__`)
                            .setDescription(`**Razón:** \n\`\`\`yml\n${razon}\`\`\``)
                            .setColor("#064073")
                            .setTimestamp()
                    ]
                }).catch(() => { message.reply(`No se le ha podido enviar el DM al usuario!`) });
                //enviamos en el canal que el usuario ha sido baneado exitosamenete

                message.reply({
                    embeds: [new Discord.EmbedBuilder()
                        .setTitle(`✅ Usuario expulsado`)
                        .setDescription(`**Se ha expulsado exitosamente a \`${usuario.user.tag}\` *(\`${usuario.id}\`)* del servidor!**`)
                        .addFields([{ name: `Razón`, value: `\n\`\`\`yml\n${razon}\`\`\`` }])
                        .setColor("#77B255")
                        .setTimestamp()
                    ]
                })

                usuario.kick([razon]).catch(() => {
                    return message.reply({
                        embeds: [new Discord.EmbedBuilder()
                            .setTitle(`No se ha podido expulsar al usuario`)
                            .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                            .setThumbnail('https://imgur.com/hJJpZo7.png')
                            .setColor("#E24C4B")
                            .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                        ]})
                })
            } else {
                return message.reply({embeds: [new Discord.EmbedBuilder()
                    .setTitle(`Tu rol está por debajo del que quieres expulsar`)
                    .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                    .setThumbnail('https://imgur.com/hJJpZo7.png')
                    .setColor("#E24C4B")
                    .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                ]})
            }
        } else {
            return message.reply({embeds: [new Discord.EmbedBuilder()
                .setTitle(`Mi rol está por debajo del que quieres expulsar`)
                .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .setThumbnail('https://imgur.com/hJJpZo7.png')
                .setColor("#E24C4B")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ]})
        }


    }
}
