const Discord = require('discord.js');
const setupSchema = require(`${process.cwd()}/modelos/setups.js`);

module.exports = {
    name: "setup-suggestion",
    aliases: ["suggestion-setup", "setup-sugerencias", "setup-sugerencia", "setupsugerencias"],
    desc: "Sirve para crear un sistema de Sugerencias",
    owner: true,
    permisos_bot: ["ManageRoles", "ManageChannels"],
    run: async (client, message, args, prefix) => {
        if(!args.length) return message.reply({
            embeds: [new Discord.EmbedBuilder()
                    .setTitle(`Tienes que especificar el canal de sugerencias!`)
                    .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                    .setThumbnail('https://imgur.com/hJJpZo7.png')
                    .setColor("#E24C4B")
                    .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                ]
        })
        const channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.filter(c => c.guild.id == message.guild.id).first()
        if(!channel || channel.type !== 0) return message.reply({
            embeds: [new Discord.EmbedBuilder()
                    .setTitle(`No se ha encontrado el canal que has especificado!`)
                    .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                    .setThumbnail('https://imgur.com/hJJpZo7.png')
                    .setColor("#E24C4B")
                    .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                ]
        });
        await setupSchema.findOneAndUpdate({guildID: message.guild.id}, {
            sugerencias: channel.id
        })
        return message.reply({
            embeds: [new Discord.EmbedBuilder()
                .setTitle(`Configurado correctamente en \`${channel.name}\``)
                    .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                    .setThumbnail('https://imgur.com/hJJpZo7.png')
                    .setDescription(`*Cada vez que una persona envíe un mensaje en ${channel}, se convertirá en sugerencia!*`)
                    .setColor("#77B255")
                    .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
                ]
        })
    }
}
