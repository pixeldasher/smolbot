module.exports.execute = async (client, lang, interaction, args) => {

	await interaction.reply(client.localize[lang].commands.ping.reply);

};

module.exports.config = {
	name:			"ping",
	description:	"Replies with Pong!",
	options:		[],	// todo
	type:			"",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
};