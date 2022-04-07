module.exports.execute = async (client, interaction) => {
	if (!interaction.inGuild()) return interaction.reply({ content: await client.localize(lang, "events.interactionCreate.noGuild"), ephemeral: true });
	client.diagnosisHandler("log", `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

	const guildObject = await client.db_config_guild.get(interaction.guild.id, true);
	const lang = guildObject.lang;
	const ArgumentsParser = require("../toolset/argumentsParser.js");
	const args = await ArgumentsParser.run(interaction);

	try {
		// If interaction is a menu, delegate back to command's menu
		if (interaction.isSelectMenu()) client.commands.get(interaction.customId?.split(".")[0]).menu[interaction.customId?.split(".")[1]](client, lang, interaction, args);

		if (!interaction.isCommand()) return;
		const command = client.commands.get(interaction.commandName);
		if (!command) return;

		// Check if user has permissions to execute command/subcommandgroup/subcommand
		if ((command.config?.permissions && !interaction.member.permissions.has(command.config?.permissions)) || (args._subcommandGroup?.permissions && !interaction.member.permissions.has(args._subcommandGroup?.permissions)) || (args._subcommand?.permissions && !interaction.member.permissions.has(args._subcommand?.permissions)))
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