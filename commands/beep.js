module.exports.execute = async (interaction) => {

	await interaction.reply("Boop!");

};

module.exports.config = {
	name:			"beep",
	description:	"Replies with Boop!",
	options:		[],	// todo
	type:			"",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
};