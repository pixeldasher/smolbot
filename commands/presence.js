const { Permissions } = require('discord.js');

module.exports.execute = async (client, lang, interaction, args) => {
	switch (args._subcommand) {
		case "set":
			if (args.type == "STREAMING" && (!args.url || (!args.url.startsWith("https://twitch.tv/") && !args.url.startsWith("https://youtube.com/"))))
				return await interaction.reply({ content: await client.localize(lang, "commands.presence.set.invalidUrl"), ephemeral: true });

			await client.user.setPresence({ activities: [{ name: args.name, type: args.type, url: args.url || "" }], status: args.status });
			return await interaction.reply({ content: await client.localize(lang, "commands.presence.set.success"), ephemeral: true });
		case "get":
			// todo: make this an embed lol
			return await interaction.reply(await client.localize(lang, "commands.presence.get.reply", { status: client.user.presence.status, type: client.user.presence.activities[0].type, name: client.user.presence.activities[0].name, url: client.user.presence.activities[0].url || ""}));
	}
};

module.exports.config = {
	name:			"presence",
	description:	"Presence settings toolkit",
	options:		[
						{
							"name": "set",
							"description": "Edit the presence settings",
							"type": 1,
							"options": [
								{
									"name": "status",
									"description": "Specify the status",
									"type": 3,
									"required": true,
									"choices": [
										["Online", "online"],
										["Idle", "idle"],
										["Do not disturb", "dnd"],
										// ["Offline (Unsichtbar)", "invisible"],	This works, but completely undermines the use of this command.
									]
								},
								{
									"name": "type",
									"description": "Specify the activity",
									"type": 3,
									"required": true,
									"choices": [
										["Playing", "PLAYING"],
										["Streaming", "STREAMING"],
										["Listening", "LISTENING"],
										["Watching", "WATCHING"],
										// ["Eigene", "CUSTOM"],		Bots don't actually support custom activities.
										["Competing", "COMPETING"],
									]
								},
								{
									"name": "name",
									"description": "Specify the name",
									"type": 3,
									"required": true,
								},
								{
								    "name": "url",
								    "description": "Upon choosing 'Streaming', specify a YouTube or Twitch URL",
								    "type": 3,
								    "required": false,
								},
			],
							"permissions": [Permissions.FLAGS.ADMINISTRATOR]
						},
						{
							"name": "get",
							"description": "Displays the current presence settings",
							"type": 1,
						},
					],
	type:			"",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
};