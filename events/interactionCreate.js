module.exports.execute = async (client, interaction) => {

	console.log("\x1b[35m%s\x1b[0m%s", "[LOGS] ", `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (e) {
		console.error(e);
		await interaction.reply({ content: "Es gab einen Fehler beim Ausf�hren dieses Befehls.", ephemeral: true });
	}

};

module.exports.config = {
	name:	"interactionCreate",
	once:	false,
};