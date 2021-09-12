const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports.parse = async (command, options) => {
	let level = 0;
	function recursiveOption(command, option, type, level) {
		level++;

		switch (type) {
			case 1: // SUB_COMMAND
				break;
			
			case 2: // SUB_COMMAND_GROUP
				break;
			
			case 3: // STRING
				break;
			
			case 4: // INTEGER
				break;
			
			case 5: // BOOLEAN
				break;
			
			case 6: // USER
				break;
			
			case 7: // CHANNEL
				break;
		
			case 8: // ROLE
				break;
			
			case 9: // MENTIONABLE
				break;
			
			case 10: // NUMBER
				break;
		}
				
	}

	/*options.forEach(option => {

		command.addSubcommand(subcommand =>
			subcommand
				.setName(option.name)
				.setDescription(option.description)
				.addUserOption(option => option.setName('target').setDescription('The user')))

	});*/

	return command;

};