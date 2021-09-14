module.exports.run = async (interaction) => {
	if (!interaction.options.data.length) return [];

	let args = {};
	let data = interaction.options.data[0];

	switch (data.type) {
		case "SUB_COMMAND":
			args._subcommand = data.name;
			data = data.options ? data.options : [];
			break;
		case "SUB_COMMAND_GROUP":
			args._group = data.name;
			args._subcommand = data.options[0].name;
			data = data.options[0].options ? data.options[0].options : [];
			break;
		default:
			data = interaction.options.data;
	}
	
	data.forEach(arg => {
		args[arg.name] = arg.value ? arg.value : true;
	})
	return args;
};