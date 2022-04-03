module.exports.execute = async (client, lang, interaction, args) => {
	const memberObject = await interaction.guild.members.cache.get(args.user) || interaction.member;
	switch (args._subcommand) {
		case "set":
			let roleId = "";
			if (args.add && args.remove) return await interaction.reply({ content: await client.localize(lang, "commands.presence.set.tooManyArguments"), ephemeral: true })
			else if (args.add) {
				switch (args.add) {
					case "he":
						roleId = "897852262691524629";
						break;
					case "she":
						roleId = "897852338868461568";
						break;
					case "they":
						roleId = "897852361496739921";
						break;
					case "any":
						roleId = "897911759342551090";
						break;
				}
				const roleObject = await interaction.guild.roles.cache.find(r => r.id === roleId);
				try {
					await memberObject.roles.add(roleObject)
				} catch (e) {
					await client.diagnosisHandler("log", `An error occurred while issuing Pronouns: User already has specified roles.`);
				}
			} else if (args.remove) {
				let roleArray = [];
				let roleObject = null;
				switch (args.remove) {
					case "he":
						roleId = "897852262691524629";
						break;
					case "she":
						roleId = "897852338868461568";
						break;
					case "they":
						roleId = "897852361496739921";
						break;
					case "any":
						roleId = "897911759342551090";
						break;
					case "all":
						roleArray.push(await interaction.guild.roles.cache.find(r => r.id === "897852262691524629"));
						roleArray.push(await interaction.guild.roles.cache.find(r => r.id === "897852338868461568"));
						roleArray.push(await interaction.guild.roles.cache.find(r => r.id === "897852361496739921"));
						roleArray.push(await interaction.guild.roles.cache.find(r => r.id === "897911759342551090"));
						roleId = all;
						break;
				}
				if (roleId != "all") {
					roleObject = await interaction.guild.roles.cache.find(r => r.id == roleId);
				}
				try {
					await memberObject.roles.remove(roleObject || roleArray)
				} catch (e) {
					await client.diagnosisHandler("log", `An error occurred while issuing Pronouns: User doesn't have specified roles.`);
				}
			}
			return await interaction.reply({ content: await client.localize(lang, "commands.pronouns.set.reply"), ephemeral: true});
		case "get":
			// todo: make this an embed lol
			const pronounRoles = memberObject.roles.cache.filter(r => {
				if (r.name.includes("/") || r.name == "Any")
					return r.name;
			})
			return await interaction.reply(({ content: await client.localize(lang, "commands.pronouns.get.reply", { user: memberObject.user.tag, pronouns: pronounRoles.join(", ") }) }));
	}
};

module.exports.config = {
	name:			"pronouns",
	description:	"Set or get user pronouns!",
	options:		[
		{
			"name": "set",
			"description": "Update your pronouns",
			"type": 1,
			"options": [
				{
					"name": "add",
					"description": "Specify the pronoun",
					"type": 3,
					"required": false,
					"choices": [
						["He/Him", "he"],
						["She/Her", "she"],
						["They/Them", "they"],
						["Any", "any"],
					]
				},
				{
					"name": "remove",
					"description": "Specify the pronoun",
					"type": 3,
					"required": false,
					"choices": [
						["He/Him", "he"],
						["She/Her", "she"],
						["They/Them", "they"],
						["Any", "any"],
						["Remove All", "all"],
					]
				},
			]
		},
		{
			"name": "get",
			"description": "Displays a User's pronouns",
			"type": 1,
			"options": [
				{
					"name": "user",
					"description": "Specify a User",
					"type": 6,
					"required": false,
				},
			],
		},
	],
	type:			"",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
};