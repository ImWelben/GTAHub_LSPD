const Discord = require('discord.js');
module.exports = {
    name: "buscagss",
    aliases: ["buscags", "bgss"],
    desc: "Sirve para activar el busca gss",
    run: async (client, message, args, prefix) => {
        if(message.channel.id == reemplazarcanalbuscagnd) {
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

            client.channels.cache.get(`reemplazarcanalbuscagnd`).send({embeds: [new Discord.EmbedBuilder()
                .setAuthor({ name: '[LSPD] Alerta GSS', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .setThumbnail('https://imgur.com/117gRun.png')
                .addFields([
                    {name: `📢 __**Emitido por:**__`, value: `<@${message.author.id}>`},
                    {name: `📟 __**Situación**__`, value: `\`${mensaje}\``},
                    {name: `🛡 __**Se solicita:**__`, value: `Gang Support Section - GSS`},
                    {name: `📍 __**Ubicación**__`, value: `Comando GND`},
                    {name: `📻 __**Frecuencia**__`, value: `Gang Support Section`},
                    {name: `⌚ __**Hora**__`, value: `\`${hora}\``}
                ])
                .setImage(`https://imgur.com/YYmVqLP.png`)
                .setColor("#064073")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ],
            content: "<@&969697133689176117>"
            });
        }, 1000)

    } else {
        message.delete()
    }
    }
}
