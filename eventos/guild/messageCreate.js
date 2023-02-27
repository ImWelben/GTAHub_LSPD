const config = require(`${process.cwd()}/config/config.json`);
const Discord = require('discord.js');
const serverSchema = require(`${process.cwd()}/modelos/servidor.js`)
const { asegurar_todo } = require(`${process.cwd()}/utils/funciones.js`)
module.exports = async (client, message) => {
    if (!message.guild || !message.channel || message.author.bot) return;
    await asegurar_todo(message.guild.id, message.author.id);
    let data = await serverSchema.findOne({guildID: message.guild.id});

    if (!message.content.startsWith(data.prefijo)) return;
    const args = message.content.slice(data.prefijo.length).trim().split(" ");
    const cmd = args.shift()?.toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));
    if (command) {
        if (command.owner) {
            if (!config.ownerIDS.includes(message.author.id)) return message.reply({embeds: [new Discord.EmbedBuilder()
                .setTitle(`Solo los desarrolladores del bot pueden ejecutar este comando`)
                .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .addFields([
                    {name: `Desarrolladores`, value: `${config.ownerIDS.map(ownerid => `<@${ownerid}>`)}`}
                ])
                .setThumbnail('https://imgur.com/hJJpZo7.png')
                .setColor("#E24C4B")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ]})
        }


        if(command.permisos_bot){
            if(!message.guild.members.me.permissions.has(command.permisos_bot)) return message.reply({embeds: [new Discord.EmbedBuilder()
                .setTitle(`No tengo permisos para ejecutar este comando`)
                .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .addFields([
                    {name: `Necesito los siguientes permisos`, value: `${command.permisos_bot.map(permiso => `\`${permiso}\``).join(", ")}`}
                ])
                .setThumbnail('https://imgur.com/hJJpZo7.png')
                .setColor("#E24C4B")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ]})
        }

        if(command.permisos){
            if(!message.member.permissions.has(command.permisos)) return message.reply({embeds: [new Discord.EmbedBuilder()
                .setTitle(`No tienes permisos para ejecutar este comando`)
                .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .addFields([
                    {name: `Permisos requeridos`, value: `${command.permisos.map(permiso => `\`${permiso}\``).join(", ")}`}
                ])
                .setThumbnail('https://imgur.com/hJJpZo7.png')
                .setColor("#E24C4B")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ]})
        }

        //ejecutar el comando
        command.run(client, message, args, data.prefijo, data.idioma);
    } else {
        //opcional
        return message.reply({embeds: [new Discord.EmbedBuilder()
            .setTitle(`No he encontrado el comando que me has especificado`)
            .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
            .setThumbnail('https://imgur.com/hJJpZo7.png')
            .setColor("#E24C4B")
            .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
        ]});
    }

}