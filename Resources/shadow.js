function shadow(size, side, intensity) {
	var shadow = Ti.UI.createView({
		width: size,
		top: 0,
		bottom: 0,
	});
	eval('shadow.' + side + ' = 0');
	for (i = 1; i <= size; i ++) {
		var line = Ti.UI.createView({
			backgroundColor: '#000',
			opacity: intensity,
			width: i,
			top: 0,
			bottom: 0,
		});
		eval('line.' + side + ' = 0');
		shadow.add(line);
	}
	
	return shadow;
}

module.exports = shadow;
