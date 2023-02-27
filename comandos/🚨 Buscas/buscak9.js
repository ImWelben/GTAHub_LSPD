const Discord = require('discord.js');
module.exports = {
    name: "buscak9",
    aliases: ["bk9"],
    desc: "Sirve para activar el busca k9",
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
                .setAuthor({ name: '[LSPD] Alerta K9', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .setThumbnail('https://imgur.com/K2nHoyc.png')
                .addFields([
                    {name: `📢 __**Emitido por:**__`, value: `<@${message.author.id}>`},
                    {name: `📟 __**Situación**__`, value: `\`${mensaje}\``},
                    {name: `🛡 __**Se solicita:**__`, value: `Canine Division - k9`},
                    {name: `📍 __**Ubicación**__`, value: `Nº32 Mission Row`},
                    {name: `📻 __**Frecuencia**__`, value: `S.W.A.T.`},
                    {name: `⌚ __**Hora**__`, value: `\`${hora}\``}
                ])
                .setImage(`https://imgur.com/gt8DPwr.png`)
                .setColor("#064073")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ],
            content: "<@&836257815365812304>"
            });

            client.channels.cache.get(`reemplazarcanalbuscametro`).send({embeds: [new Discord.EmbedBuilder()
                .setAuthor({ name: '[LSPD] Alerta K9', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .setThumbnail('https://imgur.com/K2nHoyc.png')
                .addFields([
                    {name: `📢 __**Emitido por:**__`, value: `<@${message.author.id}>`},
                    {name: `📟 __**Situación**__`, value: `\`${mensaje}\``},
                    {name: `🛡 __**Se solicita:**__`, value: `Canine Division - k9`},
                    {name: `📍 __**Ubicación**__`, value: `Nº32 Mission Row`},
                    {name: `📻 __**Frecuencia**__`, value: `S.W.A.T.`},
                    {name: `⌚ __**Hora**__`, value: `\`${hora}\``}
                ])
                .setImage(`https://imgur.com/gt8DPwr.png`)
                .setColor("#064073")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ],
            content: "<@&971582790846021642>"
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
