module.exports.execute = async (client) => {

	console.log("\x1b[35m%s\x1b[0m%s", "[LOGS] ", `Ready! Logged in as ${client.user.tag} with ${client.commands.size} commands active.`);

	client.user.setPresence({ activities: [{ name: "deinen Wünsche", type: "LISTENING" }], status: "online" });

};

module.exports.config = {
	name:	"ready",
	once:	true,
};