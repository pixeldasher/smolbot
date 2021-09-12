module.exports.execute = async (interaction) => {

	// const args = interaction.options;
	// const command = args.shift().toLowerCase();
	// client.user.setPresence({ activities: [{ name: "dir nachts beim schlafen zu.", type: "WATCHING" }], status: "online" });

	await interaction.reply("ok");

};

module.exports.config = {
	name:			"presence",
	description:	"Einstellungen rund um die Presence vom smolbot",
	options:		[
						{
							"name": "set",
							"description": "Verändere die Presence Einstellung",
							"type": 1,
						},
						{
							"name": "get",
							"description": "Zeigt die momentane Einstellung an",
							"type": 1,
						},
					],
	type:			"",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
};