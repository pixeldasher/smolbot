module.exports.trigger = async (client, res, parent, child, grandchild) => {
    res.info = `Invalid type provided for Subcommand "${grandchild.name}" of SubcommandGroup "${child.name}" of Command "${parent.name}".`;
    res.action = `Skipped addition of Subcommand "${grandchild.name}"`;
    res.solution = `The provided type "${grandchild.type}" does not equal the needed Subcommand type of "1"`;

    return res;
}

module.exports.config = {
    name: "invalidSubcommandType",
    type: "warning",
}