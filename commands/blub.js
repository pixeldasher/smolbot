module.exports.execute = async (interaction) => {

	await interaction.reply("Blub!");

};

module.exports.config = {
	name:			"blub",
	description:	"Replies with blub!",
	options:		[],	// todo
	type:			"",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
};