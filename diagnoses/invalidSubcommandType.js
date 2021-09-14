module.exports.trigger = async (res, parent, child, grandchild) => {
    res.info = `Invalid type provided for Subcommand "${grandchild}" of SubcommandGroup "${child}" of Command "${parent}".`;
    res.action = `Skipped addition of Subcommand "${grandchild}"`;
    res.solution = `The provided type "${grandchild}" does not equal the needed Subcommand type of "1"`;

    return res;
}

module.exports.config = {
    name: "invalidSubcommandType",
    type: "warning",
}