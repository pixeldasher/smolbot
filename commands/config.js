const { Permissions } = require('discord.js');

module.exports.execute = async (client, lang, interaction, args) => {
	if (args.lang) {
		if (!client.localizedStrings[args.lang])
			return await interaction.reply(await client.localize(lang, "commands.config.invalidLang"));
		const guildObject = await client.db_config_guild.get(interaction.guild.id, true);
		await guildObject.update({ lang: args.lang });
		return await interaction.reply(await client.localize(args.lang, "commands.config.reply"));
    }
};

module.exports.config = {
	name: "config",
	description: "Configure local guild settings",
	options: [
		{
			"name": "lang",
			"description": "Set the local bot language",
			"type": 3,
		},
	],
	type: "",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
	permissions: [Permissions.FLAGS.ADMINISTRATOR]
};