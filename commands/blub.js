module.exports.execute = async (client, lang, interaction, args) => {
	await interaction.reply(await client.localize(lang, "commands.blub.reply"));
};

module.exports.config = {
	name:			"blub",
	description:	"Replies with blub!",
	options:		[],	// todo
	type:			"",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
};