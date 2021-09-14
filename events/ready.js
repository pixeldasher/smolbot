module.exports.execute = async (client) => {
	client.diagnosisHandler("log", `Ready! Logged in as "${client.user.tag}" with ${client.commands.size} commands active.`)
	client.user.setPresence({ activities: [{ name: "deinen Wünsche", type: "LISTENING" }], status: "online" });
};

module.exports.config = {
	name:	"ready",
	once:	true,
};