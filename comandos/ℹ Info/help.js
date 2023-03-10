const { readdirSync } = require('fs');
const Discord = require('discord.js');
module.exports = {
    name: "help",
    aliases: ["h", "ayuda", "bothelp"],
    desc: "Sirve para ver la información del Bot",
    run: async (client, message, args, prefix) => {
        //definimos las categorias del bot leyendo la ruta ./comandos
        const categorias = readdirSync('./comandos');
        
        if (args[0]) {
            const comando = client.commands.get(args[0].toLowerCase()) || client.commands.find(c => c.aliases && c.aliases.includes(args[0].toLowerCase()));
            const categoria = categorias.find(categoria => categoria.toLowerCase().endsWith(args[0].toLowerCase()));
            if (comando) {
                let embed = new Discord.EmbedBuilder()
                    .setTitle(`Comando \`${comando.name}\``)
                    .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                    .setImage('https://imgur.com/e8BEZZB.png')
                    .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                    .setColor("#064073");
                    ephemeral: true
                //condicionales
                if (comando.desc) embed.addFields([{name: `✍ Descripción`, value: `\`\`\`${comando.desc}\`\`\``}]);
                if (comando.aliases && comando.aliases.length >= 1) embed.addFields([{name: `✅ Alias`, value: `${comando.aliases.map(alias => `\`${alias}\``).join(", ")}`}], );
                if (comando.permisos && comando.permisos.length >= 1) embed.addFields([{name: `👤 Permisos requeridos`, value: `${comando.permisos.map(permiso => `\`${permiso}\``).join(", ")}`}], );
                if (comando.permisos_bot && comando.permisos_bot.length >= 1) embed.addFields([{name: `🤖 Permisos de BOT requeridos`, value: `${comando.permisos_bot.map(permiso => `\`${permiso}\``).join(", ")}`}], );
                return message.reply({ embeds: [embed], ephemeral: true })
            } else if (categoria) {
                const comandos_de_categoria = readdirSync(`./comandos/${categoria}`).filter(archivo => archivo.endsWith('.js'));
                return message.reply({
                    embeds: [new Discord.EmbedBuilder()
                        .setTitle(`${categoria.split(" ")[0]} ${categoria.split(" ")[1]} ${categoria.split(" ")[0]}`)
                        .setColor(client.color)
                        .setDescription(comandos_de_categoria.length >= 1 ? `>>> *${comandos_de_categoria.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *Todavía no hay comandos en esta categoría...*`)
                    ], ephemeral: true
                })
            } else {
                return message.reply({
                    embeds: [new Discord.EmbedBuilder()
                        .setTitle(`No se ha encontrado el comando especificado`)
                        .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                        .setDescription(`Usa el comando \`>>help\` para ver la lista de comandos`)
                        .setThumbnail('https://imgur.com/hJJpZo7.png')
                        .setColor("#E24C4B")
                        .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                    ], ephemeral: true
                })
            }
        } else {
            var paginaActual = 0;

            //definimos el embed principal
            let ayuda_embed = new Discord.EmbedBuilder()
            .setTitle(`Ayuda de __${client.user.tag}__`)
            .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
            .setColor("#064073")
            .setDescription(`Sistema de ayuda de \`Los Santos Police Department\``)
            .addFields([{name: `ℹ **__¿Que es esto?__**`, value: `Hola **${message.author.username}**, aquí podrás encontrar los comandos de nuestro bot. Hay algunos que son de uso exclusivo pero otros como los de música son abiertos al público.`}], )
            .setThumbnail('https://imgur.com/hJJpZo7.png')
            .setImage('https://imgur.com/e8BEZZB.png')
            .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            let embeds_pages = [ayuda_embed,];

            //por cada categoria, creamos un embed y lo empujamos en embeds_pages
            categorias.map((categoria, index) => {
                const comandos_de_categoria = readdirSync(`./comandos/${categoria}`).filter(archivo => archivo.endsWith('.js'));

                let embed = new Discord.EmbedBuilder()
                    .setTitle(`${categoria.split(" ")[0]} ${categoria.split(" ")[1]}`)
                    .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                    .setColor("#064073")
                    .setThumbnail('https://imgur.com/hJJpZo7.png')
                    .setDescription(comandos_de_categoria.length >= 1 ? `*Comandos:*\n*${comandos_de_categoria.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `*Todavía no hay comandos en esta categoría...*`)
                    .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                embeds_pages.push(embed)
            })

            //definimos la selección de categoría
            const seleccion = new Discord.ActionRowBuilder().addComponents(new Discord.SelectMenuBuilder()
                .setCustomId(`SelecciónMenuAyuda`)
                .setMaxValues(5)
                .setMinValues(1)
                .addOptions(categorias.map(categoria => {
                    //definimos el objeto, que será una opción a elegir
                    let objeto = {
                        label: categoria.split(" ")[1].substring(0, 50),
                        value: categoria,
                        description: `Mira los comandos de ${categoria.split(" ")[1].substring(0, 50)}`,
                        emoji: categoria.split(" ")[0],
                    }
                    //devolvemos el objeto creado y lo añadimos como una opción más
                    return objeto;
                }))
            )

            const botones = new Discord.ActionRowBuilder().addComponents([
                new Discord.ButtonBuilder().setStyle('Success').setLabel("Atrás").setCustomId("Atrás").setEmoji("⬅"),
                new Discord.ButtonBuilder().setStyle('Primary').setLabel("Página principal").setCustomId("Inicio").setEmoji("🏠"),
                new Discord.ButtonBuilder().setStyle('Success').setLabel("Siguiente").setCustomId("Avanzar").setEmoji("➡"),
            ])

            let mensaje_ayuda = await message.reply({ embeds: [ayuda_embed], components: [seleccion, botones], ephemeral: true });

            const collector = mensaje_ayuda.createMessageComponentCollector({ filter: i => i.isButton() || i.isSelectMenu() && i.user && i.message.author.id == client.user.id, time: 180e3 });

            collector.on("collect", async (interaccion) => {
                if (interaccion.isButton()) {
                    if(interaccion.user.id !== message.author.id) return interaccion.reply({content: `❌ **No puedes hacer eso! Solo ${message.author}**`, ephemeral: true })
                    switch (interaccion.customId) {
                        case "Atrás": {
                            //Resetemamos el tiempo del collector
                            collector.resetTimer();
                            //Si la pagina a retroceder no es igual a la primera pagina entonces retrocedemos
                            if (paginaActual !== 0) {
                                //Resetemamos el valor de pagina actual -1
                                paginaActual -= 1
                                //Editamos el embeds
                                await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                                await interaccion?.deferUpdate();
                            } else {
                                //Reseteamos al cantidad de embeds - 1
                                paginaActual = embeds_pages.length - 1
                                //Editamos el embeds
                                await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                                await interaccion?.deferUpdate();
                            }
                        }
                            break;
    
                        case "Inicio": {
                            //Resetemamos el tiempo del collector
                            collector.resetTimer();
                            //Si la pagina a retroceder no es igual a la primera pagina entonces retrocedemos
                            paginaActual = 0;
                            await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                            await interaccion?.deferUpdate();
                        }
                            break;
    
                        case "Avanzar": {
                            //Resetemamos el tiempo del collector
                            collector.resetTimer();
                            //Si la pagina a avanzar no es la ultima, entonces avanzamos una página
                            if (paginaActual < embeds_pages.length - 1) {
                                //Aumentamos el valor de pagina actual +1
                                paginaActual++
                                //Editamos el embeds
                                await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                                await interaccion?.deferUpdate();
                            //En caso de que sea la ultima, volvemos a la primera
                            } else {
                                //Reseteamos al cantidad de embeds - 1
                                paginaActual = 0
                                //Editamos el embeds
                                await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                                await interaccion?.deferUpdate();
                            }
                        }
                            break;
    
                        default:
                            break;
                    }
                } else {
                    let embeds = [];
                    for (const seleccionado of interaccion.values) {
                        //definimos los comandos leyendo la ruta del valor seleccionado del menú
                        const comandos_de_categoria = readdirSync(`./comandos/${seleccionado}`).filter(archivo => archivo.endsWith('.js'));

                        let embed = new Discord.EmbedBuilder()
                        .setTitle(`${seleccionado.split(" ")[0]} ${seleccionado.split(" ")[1]} ${seleccionado.split(" ")[0]}`)
                        .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                        .setColor("#064073")
                        .setThumbnail('https://imgur.com/hJJpZo7.png')
                        .setDescription(comandos_de_categoria.length >= 1 ? `*${comandos_de_categoria.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `*Todavía no hay comandos en esta categoría...*`)
                        .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })

                        embeds.push(embed)
                    }
                    interaccion.reply({ embeds, ephemeral: true })
                }

            });

            collector.on("end", () => {
                mensaje_ayuda.edit({ content: `Tu tiempo ha expirado! Vuelve a escribir \`${prefix}help\` para verlo de nuevo!`, components: [] }).catch(() => { });
            })
        }
    }
}

