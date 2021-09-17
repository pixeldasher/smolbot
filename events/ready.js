module.exports.execute = async (client) => {
	client.diagnosisHandler("log", `Ready! Logged in as "${client.user.tag}" with ${client.commands.size} commands active.`)
	client.user.setPresence({ activities: [{ name: "deinen Wünsche", type: "LISTENING" }], status: "online" });

	client.db_local.sync();
	client.db_global.sync();
	client.db_config_user.sync();
	client.db_config_guild.sync();
	client.diagnosisHandler("log", `Synced databases.`)
};

module.exports.config = {
	name:	"ready",
	once:	true,
};