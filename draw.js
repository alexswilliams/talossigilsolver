"use strict";

window.blocks = {};
window.corners = {};

blocks['A'] = [0,0, 1,0, 2,0, 3,0];
corners['A'] = [0,0, 4,0, 4,1, 0,1];
blocks['Ar'] = [0,0, 0,1, 0,2, 0,3];
corners['Ar'] = [0,0, 0,4, 1,4, 1,0];

blocks['B'] = [0,0, 0,1, 1,0, 1,1];
corners['B'] = [0,0, 2,0, 2,2, 0,2];

blocks['C'] = [0,1, 1,1, 2,1, 2,0];
corners['C'] = [0,1, 2,1, 2,0, 3,0, 3,2, 0,2];
blocks['Cr'] = [0,0, 0,1, 0,2, 1,2];
corners['Cr'] = [0,0, 1,0, 1,2, 2,2, 2,3, 0,3];
blocks['Crr'] = [0,0, 0,1, 1,0, 2,0];
corners['Crr'] = [0,0, 3,0, 3,1, 1,1, 1,2, 0,2];
blocks['Crrr'] = [0,0, 1,0, 1,1, 1,2];
corners['Crrr'] = [0,0, 2,0, 2,3, 1,3, 1,1, 0,1];

blocks['D'] = [0,1, 1,1, 2,1, 0,0];
corners['D'] = [0,0, 1,0, 1,1, 3,1, 3,2, 0,2];
blocks['Dr'] = [0,0, 1,0, 0,1, 0,2];
corners['Dr'] = [0,0, 2,0, 2,1, 1,1, 1,3, 0,3];
blocks['Drr'] = [0,0, 1,0, 2,0, 2,1];
corners['Drr'] = [0,0, 3,0, 3,2, 2,2, 2,1, 0,1];
blocks['Drrr'] = [1,0, 1,1, 1,2, 0,2];
corners['Drrr'] = [1,0, 2,0, 2,3, 0,3, 0,2, 1,2];

blocks['E'] = [0,0, 1,0, 2,0, 1,1];
corners['E'] = [0,0, 3,0, 3,1, 2,1, 2,2, 1,2, 1,1, 0,1];
blocks['Er'] = [1,0, 1,1, 1,2, 0,1];
corners['Er'] = [1,0, 2,0, 2,3, 1,3, 1,2, 0,2, 0,1, 1,1];
blocks['Err'] = [1,0, 0,1, 1,1, 2,1];
corners['Err'] = [0,1, 1,1, 1,0, 2,0, 2,1, 3,1, 3,2, 0,2];
blocks['Errr'] = [0,0, 0,1, 0,2, 1,1];
corners['Errr'] = [0,0, 1,0, 1,1, 2,1, 2,2, 1,2, 1,3, 0,3];

blocks['F'] = [0,0, 1,0, 1,1, 2,1];
corners['F'] = [0,0, 2,0, 2,1, 3,1, 3,2, 1,2, 1,1, 0,1];
blocks['Fr'] = [1,0, 1,1, 0,1, 0,2];
corners['Fr'] = [1,0, 2,0, 2,2, 1,2, 1,3, 0,3, 0,1, 1,1];

blocks['G'] = [1,0, 2,0, 0,1, 1,1];
corners['G'] = [1,0, 3,0, 3,1, 2,1, 2,2, 0,2, 0,1, 1,1];
blocks['Gr'] = [0,0, 0,1, 1,1, 1,2];
corners['Gr'] = [0,0, 1,0, 1,1, 2,1, 2,3, 1,3, 1,2, 0,2];


const drawSigil = function(context, type, x, y, size, strokeMajor = "#0000ff", strokeMinor = "#9999cc") {
	if (!window.blocks.hasOwnProperty(type) || !window.corners.hasOwnProperty(type)) {
		throw Error("Unknown block type: " + type);
	}

	const blocks = Array.from(window.blocks[type]);
	const corners = Array.from(window.corners[type]);
	context.beginPath();
	context.rect(x + blocks[0] * size, y + blocks[1] * size, size, size);
	context.rect(x + blocks[2] * size, y + blocks[3] * size, size, size);
	context.rect(x + blocks[4] * size, y + blocks[5] * size, size, size);
	context.rect(x + blocks[6] * size, y + blocks[7] * size, size, size);
	context.strokeStyle = strokeMinor;
	context.stroke();

	context.beginPath();
	context.moveTo(x + corners.shift() * size, y + corners.shift() * size);
	while (corners.length > 0) {
		context.lineTo(x + corners.shift() * size, y + corners.shift() * size);
	}
	context.closePath();
	context.strokeStyle = strokeMajor;
	context.stroke();
};



