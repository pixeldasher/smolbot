module.exports.execute = async (client, lang, interaction, args) => {
	const userRole = "224794784819052545";
	if (!interaction.member.roles.cache.find(r => r.id == userRole)) {
		interaction.member.roles.add(userRole);
		await interaction.reply({
			content: await client.localize(lang, "commands.unlock.reply"),
			ephemeral: true,
		});
	} else {
		await interaction.reply({
			content: await client.localize(lang, "commands.unlock.completed"),
			ephemeral: true,
		});
	}
};

module.exports.config = {
	name:			"unlock",
	description:	"Start chatting!",
	options:		[],	// todo
	type:			"",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
};