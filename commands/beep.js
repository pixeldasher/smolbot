module.exports.execute = async (client, lang, interaction, args) => {
	await interaction.reply(await client.localize(lang, "commands.beep.reply"));
};

module.exports.config = {
	name:			"beep",
	description:	"Replies with Boop!",
	options:		[],	// todo
	type:			"",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
};