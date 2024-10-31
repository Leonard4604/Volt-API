const { EmbedBuilder } = require('discord.js')

const api = {
    publicWebhook: async function(req, channel) {
        // inside a command, event listener, etc.
        const embed = new EmbedBuilder()
            .setColor(16318296)
            .setThumbnail(req.product_image)
            .addFields(
                { name: 'Store', value: `||${req.store}||`, inline: false },
                { name: 'Product', value: req.product, inline: true },
                { name: 'Size', value: req.size, inline: true },
                { name: 'PID', value: `||${req.pid}||`, inline: true },
                { name: 'Mode', value: `||${req.mode}||`, inline: true },
                { name: 'Useful Links', value: req.product_url, inline: true },
            )
            .setTimestamp(new Date(req.date).getTime())
            .setFooter({ text: `Volt Scripts - v. ${req.version}`, iconURL: 'https://i.postimg.cc/vB3MDK2s/t-pfp.png' });

            channel.send?.({ embeds: [embed] });
    },
    secretWebhook: async function(req, user, channel) {
        // inside a command, event listener, etc.
        const embed = new EmbedBuilder()
            .setColor(16318296)
            .setThumbnail(req.product_image)
            .addFields(
                { name: 'Store', value: `||${req.store}||`, inline: false },
                { name: 'Product', value: req.product, inline: true },
                { name: 'Size', value: req.size, inline: true },
                { name: 'PID', value: `||${req.pid}||`, inline: true },
                { name: 'Mode', value: `||${req.mode}||`, inline: true },
                { name: 'User', value: `||${user}||`, inline: true },
                { name: 'Key', value: `||${req.key}||`, inline: true },
                { name: 'Useful Links', value: req.product_url, inline: true },
            )
            .setTimestamp(new Date(req.date).getTime())
            .setFooter({ text: `Volt Scripts - v. ${req.version}`, iconURL: 'https://i.postimg.cc/vB3MDK2s/t-pfp.png' });

            channel.send?.({ embeds: [embed] });
    },
    devtools: async function(req, user, channel) {
        // inside a command, event listener, etc.
        const embed = new EmbedBuilder()
            .setColor(16318296)
            .setTitle('User opened Devtools')
            .setThumbnail('https://i.postimg.cc/vB3MDK2s/t-pfp.png')
            .addFields(
                { name: 'User', value: `||${user}||`, inline: false },
                { name: 'Key', value: `||${req.key}||`, inline: false },
            )
            .setTimestamp(new Date(req.date).getTime())
            .setFooter({ text: `Volt Scripts - v. ${req.version}`, iconURL: 'https://i.postimg.cc/vB3MDK2s/t-pfp.png' });

            channel.send?.({ embeds: [embed] });
    }
}

module.exports = api;