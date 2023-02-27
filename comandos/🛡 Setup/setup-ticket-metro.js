const Discord = require('discord.js');
const setupSchema = require(`${process.cwd()}/modelos/setups.js`);

module.exports = {
    name: "setup-ticket-metro",
    aliases: ["ticket-metro-setup", "setupticketmetro", "setup-ticketmetro"],
    desc: "Sirve para crear un sistema de ticket",
    permisos: ["Administrator"],
    permisos_bot: ["ManageRoles", "ManageChannels"],
    run: async (client, message, args, prefix) => {
        var objeto = {
            canal: "",
            mensaje: "",
        };

        const quecanal = await message.reply({
            embeds: [new Discord.EmbedBuilder()
                .setTitle(`¿Qué canal quieres usar para el sistema de tickets?`)
                .setAuthor({ name: 'Metropolitan Division', iconURL: 'https://imgur.com/Z3hVJta.png'})
                .setThumbnail('https://imgur.com/Z3hVJta.png')
                .setDescription(`*Menciona el canal o envia su ID.*`)
                .setColor("#E24C4B")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                ]
        });

        await quecanal.channel.awaitMessages({
            filter: m=> m.author.id === message.author.id,
            max: 1,
            errors: ["time"],
            time: 180e3
        }).then(async collected => {
            var message = collected.first();
            const channel = message.guild.channels.cache.get(message.content) || message.mentions.channels.filter(c => c.guild.id == message.guild.id).first()
            if(channel) {
                objeto.canal = channel.id;

                    const msg = await message.guild.channels.cache.get(objeto.canal).send({
                        embeds: [new Discord.EmbedBuilder()
                            .setTitle(`Recepcíon de Correos`)
                            .setAuthor({ name: 'Metropolitan Division', iconURL: 'https://imgur.com/Z3hVJta.png'})
                            .addFields(
                                { name:"‪‪", value: "> Abre un ticket por este medio para poder comunicarte directamente con la **Cupula de la ** __**Meropolitan Division**__"}
                            )
                            .setColor("#5865F2")
                            .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                            ],
                        components: [new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setLabel("Recepción de Correos").setEmoji("📩").setCustomId("crear_ticket").setStyle("Primary"))]
                    })
                    objeto.mensaje = msg.id
                    await setupSchema.findOneAndUpdate({guildID: message.guild.id}, {
                        sistema_tickets_metro: objeto
                    });
                    return message.reply({
                        embeds: [new Discord.EmbedBuilder()
                        .setTitle(`Configurado correctamente en:`)
                            .setAuthor({ name: 'Metroponitan Division', iconURL: 'https://imgur.com/Z3hVJta.png'})
                            .setThumbnail('https://imgur.com/Z3hVJta.png')
                            .setDescription(`<#${objeto.canal}>`)
                            .setColor("#77B255")
                            .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                        ]
                    })
            } else {
                return message.reply({
                    embeds: [new Discord.EmbedBuilder()
                        .setTitle(`No se ha encontrado el canal que has especificado!`)
                        .setAuthor({ name: 'Metroponitan Division', iconURL: 'https://imgur.com/Z3hVJta.png'})
                            .setThumbnail('https://imgur.com/Z3hVJta.png')
                            .setColor("#E24C4B")
                            .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                        ]
                })
            }
        }).catch((e) => {
            return message.reply({
                embeds: [new Discord.EmbedBuilder()
                    .setTitle(`El tiempo ha expirado!`)
                    .setAuthor({ name: 'Metroponitan Division', iconURL: 'https://imgur.com/Z3hVJta.png'})
                        .setThumbnail('https://imgur.com/Z3hVJta.png')
                        .setColor("#E24C4B")
                        .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                    ]
            })
        })

    }
}

