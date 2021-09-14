const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports.run = async (client, commands, config) => {
	
	var data = new SlashCommandBuilder()
		.setName(config.name)
		.setDescription(config.description)
	;

	function recursive(parent, child, type) {
		// Check if there are choices and if the formatting is correct
		if (child.choices)
			if (child.choices.filter(f => f.length != 2).length || child.choices.filter(f => typeof f[0] != "string" || typeof f[1] != "string").length)
				return client.diagnosisHandler("invalidChoicesFormatting", config.name, parent.name, child.name);
		
		switch (type) {
			case 1: // SUB_COMMAND
				parent.addSubcommand(i => {
					i.setName(child.name).setDescription(child.description);

					if (child.options) {
						// Restructue based on value of "required" due to discord's API
						child.options
						.filter(o => o.required ? o.required == true : false)	// First, all options, where required is set to "true"
						.concat(child.options.filter(o => !o.required))			// Then, all options, where required either wasn't set, or it was set to "false"
						.forEach(grandchild => {
							recursive(i, grandchild, grandchild.type);
						});
					}
					
					return i;
				});
				break;
			
			case 2: // SUB_COMMAND_GROUP
				parent.addSubcommandGroup(i => {
					i.setName(child.name).setDescription(child.description);
				
					if (child.options)
						child.options.forEach(grandchild => {
							if (grandchild.type != 1)
								return client.diagnosisHandler("invalidSubcommandType", parent.name, child.name, grandchild.name);
								
							recursive(i, grandchild, grandchild.type)
						});
					
					return i;
				});
				break;
			
			case 3: // STRING
				parent.addStringOption(i => {
					i.setName(child.name).setDescription(child.description).setRequired(child.required ? child.required : false);
					if (child.choices) 
							recursive(i, child.choices, "choice");
					
					return i;
				});
				break;
			
			case 4: // INTEGER
				parent.addIntegerOption(i => {
					i.setName(child.name).setDescription(child.description).setRequired(child.required ? child.required : false);
					if (child.choices) 
							recursive(i, child.choices, "choice");
					
					return i;
				});
				break;
			
			case 5: // BOOLEAN
				parent.addBooleanOption(i => i.setName(child.name).setDescription(child.description).setRequired(child.required ? child.required : false));
				break;
			
			case 6: // USER
				parent.addUserOption(i => i.setName(child.name).setDescription(child.description).setRequired(child.required ? child.required : false));
				break;
			
			case 7: // CHANNEL
				parent.addChannelOption(i => i.setName(child.name).setDescription(child.description).setRequired(child.required ? child.required : false));
				break;
		
			case 8: // ROLE
				parent.addRoleOption(i => i.setName(child.name).setDescription(child.description).setRequired(child.required ? child.required : false));
				break;
			
			case 9: // MENTIONABLE
				parent.addMentionableOption(i => i.setName(child.name).setDescription(child.description).setRequired(child.required ? child.required : false));
				break;
			
			case 10: // NUMBER
				parent.addNumberOption(i => {
					i.setName(child.name).setDescription(child.description).setRequired(child.required ? child.required : false);
					if (child.choices) 
							recursive(i, child.choices, "choice");
					
					return i;
				});
				break;
			case "choice": // CHOICE
				parent.addChoices(child);
				break;
		}
	}

	// Restructue based on value of "required" due to discord's API
	config.options
	.filter(o => o.required ? o.required == true : false)	// First, all options, where required is set to "true"
	.concat(config.options.filter(o => !o.required))		// Then, all options, where required either wasn't set, or it was set to "false"
	.forEach(option => {
		recursive(data, option, option.type);
	});

	commands.push(data.toJSON());
	return;

};