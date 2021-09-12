module.exports.execute = async (client, interaction, args) => {
	console.log(args);

	switch (args.name) {
		case "set":
			let activity = args[0].options[0].value;
			let type = args[0].options[1].value;
			let status = args[0].options[2].value;
			let url = args[0].options[3].value;
		
			await client.user.setPresence({ activities: [{ name: activity, type: type, url: url ? url : "" }], status: status });
			return await interaction.reply("Presence wurde erfolgreich verändert.");
			
		case "get":
			return await interaction.reply(client.user.presence.activities[0].name);
	}
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