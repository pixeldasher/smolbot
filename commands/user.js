module.exports.execute = async (interaction) => {

	await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);

};

module.exports.config = {
	name:			"user",
	description:	"Replies with user info!",
	options:		[],	// todo
	type:			"",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
};