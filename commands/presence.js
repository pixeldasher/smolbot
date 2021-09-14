module.exports.execute = async (client, lang, interaction, args) => {
	switch (args._subcommand) {
		case "set":
			if (args.type == "STREAMING" && (!args.url || !args.url.startsWith("https://twitch.tv/") || !args.url.startsWith("https://youtube.com/")))
				return await interaction.reply({ content: "Presence konnte nicht verändert werden! Bitte gebe eine gültige URL (Twitch oder YouTube Livestream) an.", ephemeral: true });

			await client.user.setPresence({ activities: [{ name: args.name, type: args.type, url: args.url }], status: args.status });
			return await interaction.reply("Presence wurde erfolgreich verändert.");
		case "get":
			// todo: make this an embed lol
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
	description:	"Einstellungen rund um die Presence von Meadow",
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
										["Abwesend", "idle"],
										["Bitte nicht stören", "dnd"],
										// ["Offline (Unsichtbar)", "invisible"],	This works, but completely undermines the use of this command.
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
										// ["Eigene", "CUSTOM"],		Bots don't actually support custom activities.
										["Antreten in", "COMPETING"],
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