const {DisTube} = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
module.exports = (client, Discord) => {
    console.log(`Modulo de MÚSICA Cargado!`.red)

    client.distube = new DisTube(client, {
        emitNewSongOnly: false,
        leaveOnEmpty: true,
        leaveOnFinish: true,
        leaveOnStop: true,
        savePreviousSongs: true,
        emitAddSongWhenCreatingQueue: false,
        searchSongs: 0,
        nsfw: false,
        emptyCooldown: 25,
        ytdlOptions: {
            highWaterMark: 1024 * 1024 * 64,
            quality: "highestaudio",
            format: "audioonly",
            liveBuffer: 60000,
            dlChunkSize: 1024 * 1024 * 4,
        },
        plugins: [
            new SpotifyPlugin({
                parallel: true,
                emitEventsAfterFetching: true,
            }),
            new SoundCloudPlugin(),
        ],
    });

    //escuchamos los eventos de DisTube

    client.distube.on("playSong", (queue, song) => {
        queue.textChannel.send({
            embeds: [new Discord.EmbedBuilder()
                .setTitle(`💿 Reproduciendo`)
                .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .addFields([
                    {name: `\`${song.name}\``, value: `\`${song.formattedDuration}\``}
                ])
                .setThumbnail('https://imgur.com/hJJpZo7.png')
                .setColor("#064073")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ]
        })
    })

    client.distube.on("addSong", (queue, song) => {
        queue.textChannel.send({
            embeds: [new Discord.EmbedBuilder()
                .setTitle(`✅ Añadido`)
                .setAuthor({ name: 'LSPD - [GTAhub]', iconURL: 'https://imgur.com/hJJpZo7.png'})
                .addFields([
                    {name: `\`${song.name}\``, value: `\`${song.formattedDuration}\``}
                ])
                .setThumbnail('https://imgur.com/hJJpZo7.png')
                .setColor("#064073")
                .setFooter({ text: 'Powered By Welben', iconURL: 'https://imgur.com/pC8g5Rz.png' })
            ]
        })
    });

    client.distube.on("initQueue", (queue) => {
        queue.autoplay = true;
    });
};
