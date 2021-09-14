module.exports.trigger = async (res) => {
    res.info = `Missing configuration file.`;
    res.action = `Unable to start bot`;
    res.solution = `Please create or add a config.json file! Check config_dummy.json for formatting help.`;

    return res;
}

module.exports.config = {
    name: "missingConfig",
    type: "error",
}