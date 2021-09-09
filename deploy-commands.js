const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("./config.json");
const { SlashCommandBuilder } = require("@discordjs/builders");

const commands = [];
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	if (!command.config.type.length || command.config.type == "CHAT_INPUT") {
		const data = new SlashCommandBuilder()
			.setName(command.config.name)
			.setDescription(command.config.description);

		commands.push(data.toJSON());
	}
}

const rest = new REST({ version: "9" }).setToken(token);

module.exports.execute = async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('\x1b[35m%s\x1b[0m%s', "[LOGS] ", `Successfully registered ${commands.length} application commands.`);
	} catch (error) {
		console.error(error);
	}
}