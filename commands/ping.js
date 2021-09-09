module.exports.execute = async (interaction) => {

	await interaction.reply("Pong!");

}

module.exports.config = {
	name:			"ping",
	description:	"Replies with Pong!",
	options:		[],	// todo
	type:			"",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
}