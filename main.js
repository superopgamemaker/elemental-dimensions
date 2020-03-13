// Put the variables in a game object
var game = {
	hydrogenNuclei: 10,
	firstHDCost: 10,
	firstHDMultiplier: 1,
	firstHDTo10: 0,
	firstHydrogenDimension: 0,
	secondHDCost: 100,
	secondHDMultiplier: 1,
	secondHDTo10: 0,
	secondHydrogenDimension: 0,
	// This is for off-window production
	lastTick: Date.now(),
}
function gameLoop() {
	game.hydrogenNuclei += game.firstHydrogenDimension * game.firstHDMultiplier / 50 * (Date.now() - game.lastTick) / 1000
	game.firstHydrogenDimension += game.secondHydrogenDimension * game.secondHDMultiplier / 50 * (Date.now() - game.lastTick) / 1000
	document.getElementById("hydrogenDisplay").innerHTML = "You have " + Math.round(game.hydrogenNuclei * 50) / 50 + " hydrogen nuclei."
	document.getElementById("hydrogenDimensionDisplay").innerHTML = "You have " + Math.round(game.firstHydrogenDimension * 50) / 50 + " hydrogen dimension 1."
	game.lastTick = Date.now()
}
function buyFirstHydrogenDimension() {
	if (game.hydrogenNuclei >= game.firstHDCost) {
		game.hydrogenNuclei -= game.firstHDCost
		game.firstHydrogenDimension += 1
		game.firstHDTo10 += 1
		if (game.firstHDTo10 >= 10) {
			game.firstHDTo10 = 0
			game.firstHDCost *= 10
			game.firstHDMultiplier *= 2
			document.getElementById("hd1 cost").innerHTML = "a hydrogen dimension 1 costs" + game.firstHDCost + " hydrogen nuclei."
		}
	document.getElementById("hydrogenDimensionDisplay").innerHTML = "You have " + game.firstHydrogenDimension + " hydrogen dimension 1."
	}
}
function buySecondHydrogenDimension() {
	if (game.hydrogenNuclei >= game.secondHDCost) {
		game.hydrogenNuclei -= game.secondHDCost
		game.secondHydrogenDimension += 1
		game.secondHDTo10 += 1
		if (game.secondHDTo10 >= 10) {
			game.secondHDTo10 = 0
			game.secondHDCost *= 30
			game.secondHDMultiplier *= 2
			document.getElementById("hd2 cost").innerHTML = "a hydrogen dimension 2 costs" + game.secondHDCost + " hydrogen nuclei."
		}
	}
}

function hardReset() {
	game = {
		hydrogenNuclei: 10,
		firstHDCost: 10,
		firstHDMultiplier: 1,
		firstHDTo10: 0,
		firstHydrogenDimension: 0,
		secondHDCost: 100,
		secondHDMultiplier: 1,
		secondHDTo10: 0,
		secondHydrogenDimension: 0,
		lastTick: Date.now(),
	}
}

//Saving
function save() {
	let thesave = JSON.stringify(game);
	thesave = btoa(thesave);
	localStorage.setItem('elementaldimensonssave', thesave);
}

//Loading
function load() {
	let thesave = localStorage.getItem('elementaldimensonssave');
	if (thesave == null) {
		hardReset();
	} else {
		thesave = atob(thesave);
		game = JSON.parse(thesave);
	}
}
load();
setInterval(save, 15000);
setInterval(gameLoop, 20)
