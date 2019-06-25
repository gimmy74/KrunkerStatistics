const commando = require('discord.js-commando');
const Discord = require('discord.js');

class InfoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'info',
            group: 'utils',
            memberName: 'info',
            description: 'Information about the bot',
            details: '-_-',
            examples: ['info']
        });
    }

    async run(message, args) {
        message.channel.send(`${message.author} =>`, new Discord.RichEmbed({
            title: '**Krunker Statistics**',
            fields: [{
                name: 'Made By:',
                value: 'Histefanhere'
            }, {
                name: 'Source Code:',
                value: 'https://github.com/histefanhere/KrunkerStatistics'
            }]
        }));
    }
}

module.exports = InfoCommand;
