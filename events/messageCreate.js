module.exports.execute = async (client, message) => {
	if (message.author.bot) return;

	// increase user xp by 5-15
	let globalUser = await client.db_global.get(message.author.id, true)
	await globalUser.increment({ xp: client.rng(5, 15) }).then(db => db.reload());
};

module.exports.config = {
	name:	"messageCreate",
	once:	false,
};