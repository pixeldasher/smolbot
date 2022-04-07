const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

let menuOptions = [
	{
		label: 'He/Him',
		value: '897852262691524629',
		default: false,
	},
	{
		label: 'She/Her',
		value: '897852338868461568',
		default: false,
	},
	{
		label: 'They/Them',
		value: '897852361496739921',
		default: false,
	},
	{
		label: 'Any',
		value: '897911759342551090',
		default: false,
	}
]

module.exports.execute = async (client, lang, interaction, args) => {
	menuOptions.forEach(m => {
		m.default = interaction.member.roles.cache.some(r => r.id == m.value);
	})

	const row = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
				.setCustomId(this.config.name + '.select')
				.setPlaceholder(await client.localize(lang, "commands.pronouns.noSelection"))
				.setMinValues(0)
				.setMaxValues(4)
				.setOptions(menuOptions),
		);

	return await interaction.reply({
		content: await client.localize(lang, "commands.pronouns.selection"),
		components: [row],
		ephemeral: true,
	});
};

module.exports.menu = {
	select: async (client, lang, interaction, args) => {
		menuOptions.forEach(m => {
			m.default = interaction.values.includes(m.value);
			try {
				if (interaction.values.includes(m.value)) {
					interaction.member.roles.add(m.value);
				} else {
					interaction.member.roles.remove(m.value);
				}
			} catch (e) {
				console.log(e);
			}
		})

		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId(this.config.name + '.select')
					.setPlaceholder(await client.localize(lang, "commands.pronouns.noSelection"))
					.setMinValues(0)
					.setMaxValues(4)
					.setOptions(menuOptions)
					.setDisabled(true)
			);

		await interaction.update({
			content: await client.localize(lang, "commands.pronouns.success"),
			components: [row],
			ephemeral: true,
		});
		await wait(2500);
		return await interaction.editReply({
			content: await client.localize(lang, "commands.pronouns.success"),
			components: [],
			ephemeral: true,
		});
	}
};

module.exports.config = {
	name:			"pronouns",
	description:	"Select some pronouns!",
	options:		[],	// todo
	type:			"CHAT_INPUT",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
};