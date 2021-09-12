// define const for later use
const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./config.json");

// define client with intents
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// for every argument given in cli
process.argv.forEach((arg) => {
	switch (arg) {
	case "-h":
	case "--help": {
		// shows the help page
		require("readline").createInterface({
			input: require("fs").createReadStream("./help.txt"),
		}).on("line", (line) => {
			console.log(line);
		}).on("close", () => {
			process.exit();
		});
		break;
	}
	case "-a":
	case "--author": {
		// displays the author's name(s)
		process.on("exit", function() {
			console.log("Made by pixeldasher with the help of nitrobw. \n");
		});
		process.exit();
		break;
	}
	case "-d":
	case "--deploy-commands": {
		// deploys commands on startup
		const deploy = require("./deployCommands.js");
		deploy.execute();
		break;
	}
	default:
		// no argument specified
		break;
	}
});

// function to create new command collection and to fill it with all externally placed commands
client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.config.name, command);
}

// function to create new event file list and to fill it with all externally placed events
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.config.once) {
		// this fires once on startup
		client.once(event.config.name, (...args) => event.execute(client, ...args));
	} else {
		// this fires on any interaction
		client.on(event.config.name, (...args) => event.execute(client, ...args));
	}
}

// starts this bot
client.login(token);