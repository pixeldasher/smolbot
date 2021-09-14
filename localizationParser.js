module.exports.run = (string, args) => {
	let locString = "";
	string.split("#if").forEach(part => {		// Conditional parser, todo: write documentation for script language
		if (!part.endsWith("#endif")) return locString += part;
		let _condition, _action, _else = "";
		part.split("#").forEach(item => {
			if (item.startsWith("?")) {
				_condition = item.slice(1);
			}
			else if (item.startsWith("!")) {
				_action = item.slice(1);
			}
			else if (item.startsWith("=")) {
				_else = item.slice(1);
			}
		})
		if (args[_condition] && args[_condition].length)
			part = _action
		else
			part = _else
		locString += part;
	})

	if (args && Object.keys(args).length)		// Substitute placeholders with actual arguments
		Object.keys(args).forEach(arg => {
			locString = locString.replaceAll("%" + arg, args[arg])
		});

	return locString;
}