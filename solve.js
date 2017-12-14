"use strict";

const solve = function(sigils, w, h) {
	//let magicCounter = 1000;
	let results = [];
	let resultsAsStrings = [];

	if (w * h != Object.values(sigils).reduce((a,v)=>a+(v*4), 0)) {
		throw new Error("Wrong number of valid sigils given: needs " + (w * h / 4));
	}
	const initialState = {placements: [], taken: [], width: w, height: h, remaining: sigils};
	const validLocations = [];
	for (let x = 0; x < w; x++) {
		for (let y = 0; y < h; y++) {
			validLocations.push(x+','+y);
		}
	}
	validLocations.sort();

	const fitRemainingSigils = function(state) {
		//console.log(state);
		// magicCounter--;
		// if (magicCounter === 0) {
		// 	return 'break';
		// }

		// check success criteria - if so, return state.
		// check failure criteria - if so, return null.
		// for each remaining sigil:
		//   try to place on grid
		//   create new state object with updated fields
		//   call recursively on new state.

		if (isSuccess(state)) {
			//return state;
			const placementsSorted = Array.from(
				state.placements,
				obj => obj.layout + ',' + obj.x + ',' + obj.y)
			.sort()
			.join('#');

			if (!resultsAsStrings.includes(placementsSorted)) {
				resultsAsStrings.push(placementsSorted);
				results.push(state.placements);
			}
		}

		const rotationsToTry = [];
		for (const sigil in state.remaining) {
			if (window.blocks.hasOwnProperty(sigil)) rotationsToTry.push(sigil);
			if (window.blocks.hasOwnProperty(sigil+'r')) rotationsToTry.push(sigil+'r');
			if (window.blocks.hasOwnProperty(sigil+'rr')) rotationsToTry.push(sigil+'rr');
			if (window.blocks.hasOwnProperty(sigil+'rrr')) rotationsToTry.push(sigil+'rrr');
		}
		//console.log('To Try: ', rotationsToTry);

		for (const layout of rotationsToTry) {
			const result = place(state, layout);
			if (result !== null) return result;
		}

		//console.log('exhausted rotations; backtracking.');

		return null;
	}

	const isSuccess = function(state) {
		if (Object.keys(state.remaining).length !== 0) return false;
		if (state.taken.length !== state.width * state.height) return false;
		if (state.placements.length !== state.taken.length / 4) return false;
		return true;
	};

	const place = function(state, layout) {
		for (let x = 0; x < state.width; x++) {
			for (let y = 0; y < state.height; y++) {
				if (canBePlaced(layout, x, y, state)) {
					const newState = {
						placements: [...state.placements, {layout, x, y}],
						taken: take(layout, x, y, state.taken),
						width: state.width,
						height: state.height,
						remaining: consume(state.remaining, layout)
					};
					const result = fitRemainingSigils(newState);
					if (result !== null) return result;
				}
			}
		}
		//console.log('could not place; backtracking.');
		return null;
	};

	const canBePlaced = function(layout, x, y, state) {
		const blocks = window.blocks[layout];
		const x1 = blocks[0] + x;
		const y1 = blocks[1] + y;
		const x2 = blocks[2] + x;
		const y2 = blocks[3] + y;
		const x3 = blocks[4] + x;
		const y3 = blocks[5] + y;
		const x4 = blocks[6] + x;
		const y4 = blocks[7] + y;
		if (x1 >= state.width || x2 >= state.width || x3 >= state.width || x4 >= state.width)
			return false;
		if (y1 >= state.height || y2 >= state.height || y3 >= state.height || y4 >= state.height)
			return false;

		const loc1 = x1 + ',' + y1;
		const loc2 = x2 + ',' + y2;
		const loc3 = x3 + ',' + y3;
		const loc4 = x4 + ',' + y4;
		if (state.taken.includes(loc1)) return false;
		if (state.taken.includes(loc2)) return false;
		if (state.taken.includes(loc3)) return false;
		if (state.taken.includes(loc4)) return false;
		return true;
	}

	const take = function(layout, x, y, alreadyTaken) {
		const blocks = window.blocks[layout];
		const loc1 = (+blocks[0] + +x) + ',' + (+blocks[1] + +y);
		const loc2 = (+blocks[2] + +x) + ',' + (+blocks[3] + +y);
		const loc3 = (+blocks[4] + +x) + ',' + (+blocks[5] + +y);
		const loc4 = (+blocks[6] + +x) + ',' + (+blocks[7] + +y);
		return [...alreadyTaken, loc1, loc2, loc3, loc4];
	};

	const consume = function(remaining, layout) {
		const retObj = {};
		for (const sigil in remaining) {
			if (sigil === layout[0]) {
				if (remaining[sigil] !== 1) {
					retObj[sigil] = remaining[sigil] - 1;
				}
			} else {
				retObj[sigil] = remaining[sigil];
			}
		}
		return retObj;
	};

	fitRemainingSigils(initialState);
	return results;

};
