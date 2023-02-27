const Discord = require('discord.js');
module.exports = {
    name: "buscametro",
    aliases: ["buscam", "bmetro"],
    desc: "Sirve para activar el busca metro",
    run: async (client, message, args, prefix) => {
        
        if(message.channel.id == "reemplazarcanalbuscametrodos" || message.channel.id ==  "reemplazarcanalbuscametro") {
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
                    .setAuthor({ name: '[LSPD] Alerta METRO', iconURL: 'https://imgur.com/hJJpZo7.png'})
                    .setThumbnail('https://imgur.com/gc3OYTt.png')
                    .addFields([
                        {name: `📢 __**Emitido por:**__`, value: `<@${message.author.id}>`},
                        {name: `📟 __**Situación**__`, value: `\`${mensaje}\``},
                        {name: `🛡 __**Se solicita:**__`, value: `Metropolitan Division - METRO`},
                        {name: `📍 __**Ubicación**__`, value: `Nº32 Mission Row`},
                        {name: `📻 __**Frecuencia**__`, value: `S.W.A.T.`},
                        {name: `⌚ __**Hora**__`, value: `\`${hora}\``}
                    ])
                    .setImage(`https://imgur.com/jdc5r4v.png`)
                    .setColor("#064073")
                    .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                ],
                content: "<@&801554968112791572>"
                });

                client.channels.cache.get(`reemplazarcanalbuscametro`).send({embeds: [new Discord.EmbedBuilder()
                    .setAuthor({ name: '[LSPD] Alerta METRO', iconURL: 'https://imgur.com/hJJpZo7.png'})
                    .setThumbnail('https://imgur.com/gc3OYTt.png')
                    .addFields([
                        {name: `📢 __**Emitido por:**__`, value: `<@${message.author.id}>`},
                        {name: `📟 __**Situación**__`, value: `\`${mensaje}\``},
                        {name: `🛡 __**Se solicita:**__`, value: `Metropolitan Division - METRO`},
                        {name: `📍 __**Ubicación**__`, value: `Nº32 Mission Row`},
                        {name: `📻 __**Frecuencia**__`, value: `S.W.A.T.`},
                        {name: `⌚ __**Hora**__`, value: `\`${hora}\``}
                    ])
                    .setImage(`https://imgur.com/jdc5r4v.png`)
                    .setColor("#064073")
                    .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                ],
                content: "<@&971582071791288440>"
                });
            }, 1000)
        } else {
           message.delete()
        }
    }
}
