const Sequelize = require('sequelize');

module.exports.init = async (client) => {
	const { database } = require("../config.json");

	db = new Sequelize(database.name, database.user, database.password, {
		host: 'localhost',
		dialect: 'sqlite',
		logging: false,
		// SQLite only
		storage: database.name + '.sqlite',
	});

	client.db_local = db.define('local', {
		uid: {
			type: Sequelize.STRING,
			primaryKey: true,
			unique: true,
		},
		score: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	},	{
		freezeTableName: true
	});

	client.db_global = db.define('global', {
		uid: {
			type: Sequelize.STRING,
			primaryKey: true,
			unique: true,
		},
		xp: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		balance: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		rep: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		lastdaily: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		lastrep: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		profilebg: {
			type: Sequelize.STRING,
			defaultValue: "",
			allowNull: false,
		}, 
		profilebio: {
			type: Sequelize.STRING,
			defaultValue: "Hi! I'm a big fan of Meadow!",
			allowNull: false,
		},
	}, {
		freezeTableName: true
	});

	client.db_config_user = db.define('config_user', {
		uid: {
			type: Sequelize.STRING,
			primaryKey: true,
			unique: true,
		},
		lang: Sequelize.STRING,
	}, {
		freezeTableName: true
	});

	client.db_config_guild = db.define('config_guild', {
		uid: {
			type: Sequelize.STRING,
			primaryKey: true,
			unique: true,
		},
		lang: {
			type: Sequelize.STRING,
			defaultValue: "en_US",
			allowNull: false,
		},
		cooldown: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false,
			validate: {
				min: 3,
				max: 15
			}
		},
		usage_count: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	}, {
		freezeTableName: true
	});

	client.db_local.get = async (user, guild, init = false) => await client.db_local.findOne({ where: { uid: `${user}-${guild}` } }) || (init ? (await client.db_local.upsert({ uid: `${user}-${guild}` }))[0] : undefined);

	client.db_global.get = async (user, init = false) => await client.db_global.findOne({ where: { uid: user } }) || (init ? (await client.db_global.upsert({ uid: user }))[0] : undefined);

	client.db_config_user.get = async (user, init = false) => await client.db_config_user.findOne({ where: { uid: user } }) || (init ? (await client.db_config_user.upsert({ uid: user }))[0] : undefined);

	client.db_config_guild.get = async (guild, init = false) => await client.db_config_guild.findOne({ where: { uid: guild } }) || (init ? (await client.db_config_guild.upsert({ uid: guild }))[0] : undefined);

	return client;

};