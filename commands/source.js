module.exports.execute = async (client, lang, interaction, args) => {
	await interaction.reply(await client.localize(lang, "commands.source.reply"));
};

module.exports.config = {
	name:			"source",
	description:	"Replies with source info!",
	options:		[],	// todo
	type:			"",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
};