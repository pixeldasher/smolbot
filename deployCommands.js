module.exports.build = async (client, commands, command) => {
	const CommandBuilder = require("./commandBuilder.js");

	if (!command.config.type.length || command.config.type == "CHAT_INPUT") {
		CommandBuilder.run(client, commands, command.config);
	}
}

module.exports.submit = async (client, commands) => {
	const { clientId, guildId, token } = require("./config.json");
	const { Routes } = require("discord-api-types/v9");
	const { REST } = require("@discordjs/rest");
	const rest = new REST({ version: "9" }).setToken(token);

	try {
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),	// todo: server independent command submissions
			{ body: commands },
		);

		client.diagnosisHandler("log", `Successfully registered ${commands.length} application commands.`);
	} catch (error) {
		console.error(error);
	}
};