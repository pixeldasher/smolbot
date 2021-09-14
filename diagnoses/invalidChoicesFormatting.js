module.exports.trigger = async (res, command, parent, child) => {
    res.info = `Invalid array format for Choices of Option "${child}" in Subcommand "${parent}" of Command "${command}".`;
    res.action = `Skipped addition of Choices for Option "${child}"`;
    res.solution = `CommandBuilder expects an array of arrays, which include two strings each - name and value.`;

    return res;
}

module.exports.config = {
    name: "invalidChoicesFormatting",
    type: "warning",
}