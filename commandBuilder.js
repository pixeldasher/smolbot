const { SlashCommandBuilder } = require("@discordjs/builders");
const { SlashCommandSubcommandBuilder } = require("@discordjs/builders");

module.exports.run = async (commands, config) => {
	
	var data = new SlashCommandBuilder()
		.setName(config.name)
		.setDescription(config.description)
	;

	function recursive(parent, child, type) {
		switch (type) {
			case 1: // SUB_COMMAND
				parent.addSubcommand(i => {
					i.setName(child.name).setDescription(child.description);

					if (child.options)
						child.options.sort((a,b) => {
							return b.required-a.required; // Sort by "required" boolean value, true first (based on limitation by discord API)
						}).forEach(grandchild => {
							recursive(i, grandchild, grandchild.type);
						});
					
					return i;
				});
				break;
			
			case 2: // SUB_COMMAND_GROUP
				parent.addSubcommandGroup(i => {
					i.setName(child.name).setDescription(child.description);
				
					if (child.options)
						child.options.sort((a,b) => {
							return b.required-a.required; // Sort by "required" boolean value, true first (based on limitation by discord API)
						}).forEach(grandchild => {
							recursive(i, grandchild, grandchild.type)
						});
					
					return i;
				});
				break;
			
			case 3: // STRING
				parent.addStringOption(i => {
					i.setName(child.name).setDescription(child.description).setRequired(child.required);
				
					if (child.choices) 
						recursive(i, child.choices, "choice");
					
					return i;
				});
				break;
			
			case 4: // INTEGER
				parent.addIntegerOption(i => {
					i.setName(child.name).setDescription(child.description).setRequired(child.required);
				
					if (child.choices) 
						recursive(i, child.choices, "choice");
					
					return i;
				});
				break;
			
			case 5: // BOOLEAN
				parent.addBooleanOption(i => i.setName(child.name).setDescription(child.description).setRequired(child.required));
				break;
			
			case 6: // USER
				parent.addUserOption(i => i.setName(child.name).setDescription(child.description).setRequired(child.required));
				break;
			
			case 7: // CHANNEL
				parent.addChannelOption(i => i.setName(child.name).setDescription(child.description).setRequired(child.required));
				break;
		
			case 8: // ROLE
				parent.addRoleOption(i => i.setName(child.name).setDescription(child.description).setRequired(child.required));
				break;
			
			case 9: // MENTIONABLE
				parent.addMentionableOption(i => i.setName(child.name).setDescription(child.description).setRequired(child.required));
				break;
			
			case 10: // NUMBER
				parent.addNumberOption(i => {
					i.setName(child.name).setDescription(child.description).setRequired(child.required)
				
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

	config.options.sort((a,b) => {
		return b.required-a.required; // Sort by "required" boolean value, true first (based on limitation by discord API)
	}).forEach(option => {
		recursive(data, option, option.type);
	})

	commands.push(data.toJSON());
	return;

};