module.exports.run = async (client, diag, ...args) => {
	const diagnosis = client.diagnoses.get(diag);
    let res = {
        info: "",
        action: "",
        solution: "",
    };

	if (!diagnosis) return;
	res = await diagnosis.trigger(client, res, ...args);
	let mode = [];

	switch (diagnosis.config.type) {
		case "log":
			mode = ["\x1b[35m%s\x1b[0m%s", "[LOG] "];
			break;
		case "warning":
			mode = ["\x1b[33m%s%s\x1b[0m", "[WRN] "];
			break;
		case "error":
			mode = ["\x1b[31m%s%s\x1b[0m", "[ERR] "];
			break;
	}

	if (res.info.length) {
		console.log(mode[0], mode[1], res.info)
	}
	if (res.action.length) {
		console.log(mode[0], "      ", res.action + " - For more info, read below:")
	}
	if (res.solution.length) {
		console.log(mode[0], "\n      ", res.solution)
	}

	return;
};