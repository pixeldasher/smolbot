module.exports.trigger = async (client, res, log) => {
    res.info = log;

    return res;
}

module.exports.config = {
    name: "log",
    type: "log",
}