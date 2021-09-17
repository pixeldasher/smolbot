module.exports.execute = async (client, lang, interaction, args) => {
	const globalUser = await client.db_global.get(interaction.member.id, true)
	await interaction.reply(await client.localize(lang, "commands.xp.reply", { xp: globalUser.xp }));
};

module.exports.config = {
	name:			"xp",
	description:	"Returns your current XP!",
	options:		[],	// todo
	type:			"",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
};