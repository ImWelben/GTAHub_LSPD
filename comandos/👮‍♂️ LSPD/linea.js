module.exports = {
    name: "linea",
    aliases: ["separador"],
    desc: "Sirve para enviar un serparador/linea",
    run: async (client, message, args, prefix) => {

            message.channel.send('https://imgur.com/JlQBUcQ.png')
            message.delete()

    }
}