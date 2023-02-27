const setupSchema = require(`${process.cwd()}/modelos/setups.js`);
const votosSchema = require(`${process.cwd()}/modelos/votos-feed.js`);
const { asegurar_todo } = require(`${process.cwd()}/utils/funciones.js`);
const Discord = require('discord.js');
module.exports = client => {
    //evento al enviar mensaje en el canal de feedback
    client.on("messageCreate", async message => {
        try {
            //comprobaciones previas
            if (!message.guild || !message.channel || message.author.bot) return;
            //buscamos los datos de la DB
            let setup_data = await setupSchema.findOne({ guildID: message.guild.id });
            //comprobaciones previas
            if (!setup_data || !setup_data.feedback || !message.guild.channels.cache.get(setup_data.feedback) || message.channel.id !== setup_data.feedback) return;
            //eliminamos la feedback enviada por el autor y lo convertimos en feedback con botones
            message.delete().catch(() => { });
            //definimos los botones
            let botones = new Discord.ActionRowBuilder().addComponents([
                //votar si
                new Discord.ButtonBuilder().setStyle("Secondary").setLabel("0").setEmoji("✅").setCustomId("votar_si"),
                //votar no
                new Discord.ButtonBuilder().setStyle("Secondary").setLabel("0").setEmoji("❌").setCustomId("votar_no"),
                //ver votanes
                new Discord.ButtonBuilder().setStyle('Primary').setLabel("Votaciones").setEmoji("🗳").setCustomId("ver_votos"),
            ])
            //enviamos el mensaje con los botones
            let msg = await message.channel.send({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                        .setTitle( `Nuevo feedback`)
                        .setDescription(`>>> ${message.content}`)
                        .addFields([
                            {name: `✅ __**Votos positivos**__`, value: `\`0 votos\``, inline: true},
                            {name: `❌ __**Votos negativos**__`, value: `\`0 votos\``, inline: true},
                            {name: `**Creador**`, value: `<@${message.author.id}>`, inline: false},
                            {name: `¿Quieres crear un feedback?`, value: `Envía la descripción del feedback por este canal y el bot hará su trabajo.\n*PD: Las imagenes se insertan por* ***link***. *No se insertan, sino no se verán.*`, inline: false},
                        ])
                        .setThumbnail('https://imgur.com/hJJpZo7.png')
                        .setImage(`https://imgur.com/zff0VNw.png`)
                        .setColor("#064073")
                        .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                ],
                components: [botones]
            })
            let data_msg = new votosSchema({
                messageID: msg.id,
                autor: message.author.id,
            })
            data_msg.save();
        } catch (e) { console.log(e) }
    })

    //evento al hacer click en un botón de la feedback
    client.on("interactionCreate", async interaction => {
        try {
            //comprobaciones previas
            if (!interaction.guild || !interaction.channel || !interaction.message || !interaction.user) return;
            //aseguramos la base de datos
            asegurar_todo(interaction.guild.id, interaction.user.id);
            //buscamos los datos en la base de datos
            let setup_data = await setupSchema.findOne({ guildID: interaction.guild.id });
            //buscamos la base de datos del mensaje de la feedback
            let msg_data = await votosSchema.findOne({ messageID: interaction.message.id });
            //comprobaciones previas
            if (!msg_data || !setup_data || !setup_data.feedback || interaction.channelId !== setup_data.feedback) return;
            switch (interaction.customId) {
                case "votar_si": {
                    //si el votante ya ha votado en el mismo voto hacemos return;
                    if (msg_data.si.includes(interaction.user.id)) return interaction.reply({
                        embeds: [new Discord.EmbedBuilder()
                            .setTitle(`No puedes votar dos veces.`)
                            .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                            .setThumbnail('https://imgur.com/hJJpZo7.png')
                            .setDescription(`Ya has votado **SI** en la feedback.`)
                            .setColor("#064073")
                            .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                        ], ephemeral: true
                    });
                    //modificamos la DB
                    if (msg_data.no.includes(interaction.user.id)) msg_data.no.splice(msg_data.no.indexOf(interaction.user.id), 1)
                    msg_data.si.push(interaction.user.id);
                    msg_data.save();

                    //modificamos el embed
                    interaction.message.embeds[0].fields[0].value = `\`${msg_data.si.length} votos\``;
                    interaction.message.embeds[0].fields[1].value = `\`${msg_data.no.length} votos\``;

                    //modificamos los botones con el valor de los votos
                    interaction.message.components[0].components[0].data.label = msg_data.si.length.toString();
                    interaction.message.components[0].components[1].data.label = msg_data.no.length.toString();

                    //editamos el mensaje
                    await interaction.message.edit({ embeds: [interaction.message.embeds[0]], components: [interaction.message.components[0]] });
                    interaction.deferUpdate();
                }
                    break;

                case "votar_no": {
                    //si el votante ya ha votado en el mismo voto hacemos return;
                    if (msg_data.no.includes(interaction.user.id)) return interaction.reply({
                        embeds: [new Discord.EmbedBuilder()
                            .setTitle(`No puedes votar dos veces`)
                            .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                            .setDescription(`Ya has votado **NO** en la feedback.`)
                            .setThumbnail('https://imgur.com/hJJpZo7.png')
                            .setColor("#064073")
                            .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                        ], ephemeral: true
                    });
                    //modificamos la DB
                    if (msg_data.si.includes(interaction.user.id)) msg_data.si.splice(msg_data.si.indexOf(interaction.user.id), 1)
                    msg_data.no.push(interaction.user.id);
                    msg_data.save();

                    //modificamos el embed
                    interaction.message.embeds[0].fields[0].value = `\`${msg_data.si.length} votos\``;
                    interaction.message.embeds[0].fields[1].value = `\`${msg_data.no.length} votos\``;

                    //modificamos los botones con el valor de los votos
                    interaction.message.components[0].components[0].data.label = msg_data.si.length.toString();
                    interaction.message.components[0].components[1].data.label = msg_data.no.length.toString();

                    //editamos el mensaje
                    await interaction.message.edit({ embeds: [interaction.message.embeds[0]], components: [interaction.message.components[0]] });
                    interaction.deferUpdate();

                }
                    break;
                    
                case "ver_votos": {
                    interaction.reply({
                        embeds: [new Discord.EmbedBuilder()
                        .setTitle(`Votos del feedback`)
                        .addFields([
                            {name: `✅ __**Votos positivos**__`, value: msg_data.si.length >= 1 ? msg_data.si.map(u => `<@${u}>\n`).toString() : "```\nNo hay votos\n```", inline: true},
                            {name: `❌ __**Votos negativos**__`, value: msg_data.no.length >= 1 ? msg_data.no.map(u => `<@${u}>\n`).toString() : "```\nNo hay votos\n```", inline: true}
                        ])
                        .setColor("#064073")
                        ],
                        ephemeral: true,
                    })
                }
                    break;

                default:
                    break;
            }
        } catch (e) { console.log(e) }
    })
}
