module.exports.trigger = async (res, log) => {
    res.info = log;

    return res;
}

module.exports.config = {
    name: "log",
    type: "log",
}