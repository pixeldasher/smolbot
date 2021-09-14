module.exports.trigger = async (res) => {
    res.info = `Missing Discord Bot Token.`;
    res.action = `Unable to start bot`;
    res.solution = `Please specify a token in "config.json"`;

    return res;
}

module.exports.config = {
    name: "missingToken",
    type: "error",
}