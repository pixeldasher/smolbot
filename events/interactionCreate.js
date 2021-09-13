module.exports.execute = async (client, interaction) => {
	client.diagnosisHandler("log", `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`)
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		const ArgumentsParser = require("../argumentsParser.js");
		await command.execute(client, interaction, await ArgumentsParser.run(interaction));
	} catch (e) {
		console.error(e);
		await interaction.reply({ content: "Es gab einen Fehler beim Ausführen dieses Befehls.", ephemeral: true });
	}
};

module.exports.config = {
	name:	"interactionCreate",
	once:	false,
};