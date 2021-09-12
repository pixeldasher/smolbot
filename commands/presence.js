module.exports.execute = async (client, interaction, args) => {
	let activity = args[0].value;
	let type = args[1].value;
	let status = args[2].value;
	let url = args[3].value;

	await client.user.setPresence({ activities: [{ name: activity, type: type, url: url }], status: status });
	return await interaction.reply("Presence wurde erfolgreich verändert.");
};

module.exports.config = {
	name:			"presence",
	description:	"Einstellungen rund um die Presence vom smolbot",
	options:		[
						{
							"name": "set",
							"description": "Verändere die Presence Einstellung",
							"type": 1,
							"options": [
								{
									"name": "name",
									"description": "Gebe die Bot-Aktivität an",
									"type": 3,
									"required": true,
								},
								{
									"name": "type",
									"description": "Gebe die Bot-Aktivitäten-Art an",
									"type": 3,
									"required": true,
									"choices": [
										["Spielen", "PLAYING"],
										["Streamen", "STREAMING"],
										["Hören", "LISTENING"],
										["Schauen", "WATCHING"],
										["Eigene", "CUSTOM"],
										["Wettbewerb", "COMPETING"],
									]
								},
								{
									"name": "url",
									"description": "Insofern du 'Streamen' gewählt hast, bitte lege eine URL fest",
									"type": 3,
									"required": false,
								},
								{
									"name": "status",
									"description": "Gebe den Bot-Status an",
									"type": 3,
									"required": true,
									"choices": [
										["Online", "online"],
										["AFK", "idle"],
										["Bitte nicht stören", "dnd"],
										["Offline", "invisible"],
									]
								},
							]
						},
						{
							"name": "get",
							"description": "Zeigt die momentane Einstellung an",
							"type": 1,
						},
					],
	type:			"",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
};