const Discord = require('discord.js');
module.exports = {
    name: "finbusca",
    aliases: ["fbusca", "finb"],
    desc: "Sirve para desactivar el busca",
    run: async (client, message, args, prefix) => {
        
        if(message.channel.id == "reemplazarcanalbuscametrodos" || message.channel.id == "reemplazarcanalbuscametro") { //CONDICION DE CANALES DE METRO

            setTimeout(function(){
                message.delete();
    
                let date = new Date();
                let hora = date.getHours() + ':' + date.getMinutes();
    
                client.channels.cache.get(`reemplazarcanalbuscametrodos`).send({embeds: [new Discord.EmbedBuilder()
                    .setAuthor({ name: '[LSPD] Alerta DESACTIVADA', iconURL: 'https://imgur.com/hJJpZo7.png'})
                    .setThumbnail('https://imgur.com/gc3OYTt.png')
                    .addFields([
                        {name: `📢 __**Emitido por:**__`, value: `<@${message.author.id}>`},
                        {name: `⌚ __**Hora**__`, value: `\`${hora}\``}
                    ])
                    .setImage(`https://imgur.com/Rl8m0j0.png`)
                    .setColor("#E24C4B")
                    .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                    ]
                });
    
                client.channels.cache.get(`reemplazarcanalbuscametro`).send({embeds: [new Discord.EmbedBuilder()
                    .setAuthor({ name: '[LSPD] Alerta DESACTIVADA', iconURL: 'https://imgur.com/hJJpZo7.png'})
                    .setThumbnail('https://imgur.com/gc3OYTt.png')
                    .addFields([
                        {name: `📢 __**Emitido por:**__`, value: `<@${message.author.id}>`},
                        {name: `⌚ __**Hora**__`, value: `\`${hora}\``}
                    ])
                    .setImage(`https://imgur.com/Rl8m0j0.png`)
                    .setColor("#E24C4B")
                    .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                    ]
                }); 
            }, 1000)
        
        } else if(message.channel.id == "reemplazarcanalbuscagnd" ) { //CONDICION DE CANALES DE GND

            const mensaje = args.join(" ")
            setTimeout(function(){
                message.delete();
    
                let date = new Date();
                let hora = date.getHours() + ':' + date.getMinutes();
    
                client.channels.cache.get(`reemplazarcanalbuscagnd`).send({embeds: [new Discord.EmbedBuilder()
                    .setAuthor({ name: '[LSPD] Alerta DESACTIVADA', iconURL: 'https://imgur.com/hJJpZo7.png'})
                    .addFields([
                        {name: `📢 __**Emitido por:**__`, value: `<@${message.author.id}>`},
                        {name: `⌚ __**Hora**__`, value: `\`${hora}\``}
                    ])
                    .setThumbnail('https://imgur.com/117gRun.png')
                    .setImage(`https://imgur.com/Rl8m0j0.png`)
                    .setColor("#E24C4B")
                    .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                    ]
                });

            }, 1000)

        }

    }
}
