const moment = require("moment");
const { MessageEmbed } = require('discord.js');

module.exports.execute = async (client, lang, interaction, args) => {

	let userObject = args.user || interaction.member.user;
	let memberObject = args.user ? interaction.guild.members.cache.get(args.user.id) : interaction.member;

	const embed = new MessageEmbed()
		.setAuthor(memberObject.nickname ? `${memberObject.nickname} + (${userObject.username})` : userObject.username, userObject.displayAvatarURL())
		.setThumbnail(userObject.displayAvatarURL({ size: 4096 }))
		.addFields(
			{ name: await client.localize(lang, "commands.user.embed.tag"), value: userObject.tag },
			{ name: await client.localize(lang, "commands.user.embed.id"), value: userObject.id },
			{ name: await client.localize(lang, "commands.user.embed.status"), value: client.userStatus[memberObject.presence.status] },
			{ name: await client.localize(lang, "commands.user.embed.creation"), value: moment(userObject.createdAt).format('YYYY/MM/DD/da, HH:mm'), inline: true },
			{ name: await client.localize(lang, "commands.user.embed.joined"), value: moment(memberObject.joinedAt).format('YYYY/MM/DD, HH:mm'), inline: true }
		)
		.setFooter(await client.localize(lang, "commands.user.embed.footer", { tag: userObject.tag }))
	;

	await interaction.reply({ embeds: [embed] });
};

module.exports.config = {
	name:			"user",
	description:	"Returns User information",
	options: [
				{
					"name": "user",
					"description": "Specify a User",
					"type": 6,
					"required": false,
				},
			],
	type:			"",	// default: CHAT_INPUT => Slash command,    USER => right-click user,    MESSAGE => right-click message
};