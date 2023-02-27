const {paginacion} = require(`${process.cwd()}/utils/funciones.js`);
const warnSchema = require(`${process.cwd()}/modelos/warns.js`);
const {asegurar_todo} = require(`${process.cwd()}/utils/funciones.js`)
module.exports = {
    name: "warnings",
    aliases: ["avisos", "user-warns", "warnings-usuario", "warns"],
    desc: "Sirve para mostrar los warnings de un Usuario",
    run: async (client, message, args, prefix) => {
        const usuario = message.guild.members.cache.get(args[0]) || message.mentions.members.filter(m => m.guild.id == message.guild.id).first() || message.member;
        await asegurar_todo(message.guild.id, usuario.id)
        let data = await warnSchema.findOne({guildID: message.guild.id, userID: usuario.id});
        if(data.warnings.length == 0) return message.reply({embeds: [new Discord.EmbedBuilder()
            .setTitle(`Listado de warnings`)
            .setDescription(`**Se ha expulsado exitosamente a \`${usuario.user.tag}\` *(\`${usuario.id}\`)* del servidor!**`)
            .addFields([{ name: `Nombre`, value: `\`${usuario.user.tag}\`` }])
            .setColor("#77B255")
            .setTimestamp()
        ]});
        const texto = data.warnings.map((warn, index) => `================================\n**ID DE WARN:** \`${index}\`\n**FECHA:** <t:${Math.round(warn.fecha / 1000)}>\n**AUTOR:** <@${warn.autor}> *\`${message.guild.members.cache.get(warn.autor).user.tag}\`*\n**RAZÓN:** \`${warn.razon}\`\n`)
        paginacion(client, message, texto, `🛠 \`[${data.warnings.length}]\` WARNINGS DE ${usuario.user.tag}`, 1)
    }
}
