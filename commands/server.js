module.exports.execute = async (client, lang, interaction, args) => {

	await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);

};

module.exports.config = {
	name:			"server",
	description:	"Replies with server info!",
	options:		[],	// todo
	type:			"",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
};