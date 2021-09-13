module.exports.execute = async (client, interaction, args) => {
	switch (args.name) {
		case "set":
			let activity = args[0].options[0].value;
			let type = args[0].options[1].value;
			let status = args[0].options[2].value;
			let url = args[0].options[3].value;

			if (type = "STREAMING" && !url.length) {
				return await interaction.reply({ content: "Presence konnte nicht verändert werden! Bitte gebe eine URL an.", ephemeral: true });
			}

			await client.user.setPresence({  status: status, activities: [{ type: type, name: activity, url: url ? url : "" }] });
			return await interaction.reply("Presence wurde erfolgreich verändert.");
			
		case "get":
			return await interaction.reply( 
				"Status: " +client.user.presence.status +
				", Typ: " + client.user.presence.activities[0].type +
				", Name: " + client.user.presence.activities[0].name +
				(client.user.presence.activities[0].url ? (", URL: " + client.user.presence.activities[0].url) : "")
			);
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
										["Wettbewerb", "COMPETING"],
									]
								},
								{
									"name": "name",
									"description": "Gebe die Bot-Aktivität an",
									"type": 3,
									"required": true,
								},
								{
									"name": "url",
									"description": "Insofern du 'Streamen' gewählt hast, bitte lege eine URL fest",
									"type": 3,
									"required": false,
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