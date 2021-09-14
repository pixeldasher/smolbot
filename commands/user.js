module.exports.execute = async (client, lang, interaction, args) => {
	await interaction.reply(await client.localize(lang, "commands.user.reply", { tag: interaction.user.tag, id: interaction.user.id }));
};

module.exports.config = {
	name:			"user",
	description:	"Replies with user info!",
	options:		[],	// todo
	type:			"",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
};