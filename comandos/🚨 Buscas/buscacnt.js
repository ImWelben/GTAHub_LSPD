const Discord = require('discord.js');
module.exports = {
    name: "buscacnt",
    aliases: ["buscac", "bcnt"],
    desc: "Sirve para activar el busca cnt",
    run: async (client, message, args, prefix) => {
        if(message.channel.id == reemplazarcanalbuscametrodos || message.channel.id ==  reemplazarcanalbuscametro) {
        const mensaje = args.join(" ")
        if(!mensaje) return message.channel.send({
            embeds: [new Discord.EmbedBuilder()
                .setTitle(`Debes escribir una frase que describa la situación`)
                .setAuthor({ name: '[LSPD] Alertas', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .setThumbnail('https://imgur.com/hJJpZo7.png')
                .setColor("#E24C4B")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ], ephemeral: true
        })
        setTimeout(function(){
            message.delete();

            let date = new Date();
            let hora = date.getHours() + ':' + date.getMinutes();

            client.channels.cache.get(`reemplazarcanalbuscametrodos`).send({embeds: [new Discord.EmbedBuilder()
                .setAuthor({ name: '[LSPD] Alerta CNT', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .setThumbnail('https://i.imgur.com/1lElgpJ.png')
                .addFields([
                    {name: `📢 __**Emitido por:**__`, value: `<@${message.author.id}>`},
                    {name: `📟 __**Situación**__`, value: `\`${mensaje}\``},
                    {name: `🛡 __**Se solicita:**__`, value: `Crisis Negotiation Team - CNT`},
                    {name: `📍 __**Ubicación**__`, value: `Nº32 Mission Row`},
                    {name: `📻 __**Frecuencia**__`, value: `S.W.A.T.`},
                    {name: `⌚ __**Hora**__`, value: `\`${hora}\``}
                ])
                .setImage(`https://imgur.com/7af3BG2.png`)
                .setColor("#064073")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ],
            content: "<@&899328537817907221>"
            });

            client.channels.cache.get(`reemplazarcanalbuscametro`).send({embeds: [new Discord.EmbedBuilder()
                .setAuthor({ name: '[LSPD] Alerta CNT', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .setThumbnail('https://i.imgur.com/1lElgpJ.png')
                .addFields([
                    {name: `📢 __**Emitido por:**__`, value: `<@${message.author.id}>`},
                    {name: `📟 __**Situación**__`, value: `\`${mensaje}\``},
                    {name: `🛡 __**Se solicita:**__`, value: `Crisis Negotiation Team - CNT`},
                    {name: `📍 __**Ubicación**__`, value: `Nº32 Mission Row`},
                    {name: `📻 __**Frecuencia**__`, value: `S.W.A.T.`},
                    {name: `⌚ __**Hora**__`, value: `\`${hora}\``}
                ])
                .setImage(`https://imgur.com/7af3BG2.png`)
                .setColor("#064073")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ],
            content: "<@&971619478045593681>"
            });

             
        }, 1000)

    } else {
        return message.reply({embeds: [new Discord.EmbedBuilder()
            .setTitle(`Este no es el canal adecuado`)
            .setAuthor({ name: '[LSPD] Gestor de alertas', iconURL: 'https://imgur.com/hJJpZo7.png'})
            .setThumbnail('https://imgur.com/hJJpZo7.png')
            .addFields([
                    {name: `Los Santos Police Department`, value: `<#reemplazarcanalbuscametrodos>`},
                    {name: `Metropolitan Division`, value: `<#reemplazarcanalbuscametrodos>`}
                ])
            .setColor("#E24C4B")
            .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
        ]
        });
    }
    }
}
