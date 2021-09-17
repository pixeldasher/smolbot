module.exports.execute = async (client, interaction) => {
	client.diagnosisHandler("log", `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`)
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	const guildObject = await client.db_config_guild.get(interaction.guild.id, true);
	const lang = guildObject.lang;

	try {
		const ArgumentsParser = require("../toolset/argumentsParser.js");
		const args = await ArgumentsParser.run(interaction);

		// Check if user has permissions to execute command/subcommandgroup/subcommand
		if (!interaction.member.permissions.has(command.config?.permissions) || !interaction.member.permissions.has(args._subcommandGroup?.permissions) || !interaction.member.permissions.has(args._subcommand?.permissions))
			return await interaction.reply({ content: await client.localize(lang, "events.interactionCreate.missingPermissions"), ephemeral: true });
				
		await command.execute(client, lang, interaction, args);
	} catch (e) {
		console.error(e);
		await interaction.reply({ content: await client.localize(lang, "events.interactionCreate.catch"), ephemeral: true });
	}
};

module.exports.config = {
	name:	"interactionCreate",
	once:	false,
};