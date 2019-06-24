const commando = require('discord.js-commando');
const Discord = require('discord.js');
const { Krunker: Api, OrderBy} = require("@fasetto/krunker.io")
const Krunker = new Api();

class krunkerStatsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "krunker",
            aliases: ["get", "stats"],
            group: "krunker",
            memberName: "krunker",
            description: "gets a krunker players statistics",
            args: [
                {
                    key: "player",
                    prompt: "please include a krunker username",
                    type: "string"
                }
            ],
            argsPromptLimit: 0,
        })
    }

    async run(message, args) {
        const response = message.channel.send(`${message.author} =>`, new Discord.RichEmbed({
            fields: [
            {
                name: `**${args.player}**:`,
                value: "*Please wait...*"
            }
            ]
        }));
        response.then(async (message_) => {
            try
            {
                const data = await Krunker.GetProfile(args.player);
                message_.edit(message_.content, new Discord.RichEmbed({
                    title: `**${args.player}**:`,
                    fields: [ {
                        name: "General:",
                        value: `**Level**: ${data.level}
                        **Clan**: ${data.clan}
                        **Score**: ${data.score}
                        **KR**: ${data.funds}`,
                        inline: true
                    }, {
                        name: "Games:",
                        value: `**Time**: ${data.playTime}
                        **Games**: ${data.totalGamesPlayed}
                        **Wins, Losses**: ${data.wins}, ${data.loses}
                        **W/L**: ${data.wl}`,
                        inline: true
                    }, {
                        name: "Stats:",
                        value: `**SPK:** ${data.spk}
                        **Wins**: ${data.wins}
                        **Loses**: ${data.loses}
                        **KDR**: ${data.kdr}`
                    }],
                    color: 0xea9920
                }));
            }
            catch (e)
            {
                message_.edit(message_.content, new Discord.RichEmbed({
                    fields: [
                    {
                        name: `**${args.player}**:`,
                        value: `*Player "${args.player}" not found!*`
                    }]
                }));
            }
        });
    }
}

module.exports = krunkerStatsCommand;