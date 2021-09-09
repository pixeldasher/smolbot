const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

if (process.argv.some(arg => ["-d", "--deploy-commands"].includes(arg))) {
	const deploy = require("./deploy-commands.js")
	deploy.execute();
}

client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.config.name, command);
}

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.config.once) {
		client.once(event.config.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.config.name, (...args) => event.execute(client, ...args));
	}
}

client.login(token);