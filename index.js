// define const for late use
const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");

// define client with intents
client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// function to create new diagnosis collection and to fill it with all externally placed diagnoses
const DiagnosisHandler = require("./diagnosisHandler.js")
client.diagnoses = new Collection();
const diagnosisFiles = fs.readdirSync("./diagnoses").filter(file => file.endsWith(".js"));
for (const file of diagnosisFiles) {
	const diagnosis = require(`./diagnoses/${file}`);
	client.diagnoses.set(diagnosis.config.name, diagnosis);
};
client.diagnosisHandler = async (diag, ...args) => {
	const diagnosis = client.diagnoses.get(diag);
	if (await DiagnosisHandler.run(diagnosis, ...args)) {
		return process.exit(1);
	}
};

// check for config
let config;
try {
	config = require("./config.json");
} catch {
	return client.diagnosisHandler("missingConfig");
}

// check for token
if (!config.token || !config.token.length)
	return client.diagnosisHandler("missingToken");

// check for deploy
const deploy = require("./deployCommands.js");
let _deploy = false;

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
		_deploy = true;
		break;
	}
	default:
		// no argument specified
		break;
	}
});

// localization support
client.localize = {};
const locDirs = fs.readdirSync("./localization").filter(i => fs.statSync("./localization/" + i).isDirectory());
for (const dir of locDirs) {
	const string = require(`./localization/${dir}/loc.json`);
	client.localize[dir] = string;
};

// function to create new command collection and to fill it with all externally placed commands
const commands = [];
client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.config.name, command);
	if (_deploy) {
		deploy.build(client, commands, command);
	};
};
if (_deploy) {
	deploy.submit(client, commands);
};

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
	};
};

// starts this bot
client.login(config.token);


// todo: add language support and databases