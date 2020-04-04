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
	firstHeDCost: 10000000000,
	firstHeDMultiplier: 1,
	firstHeDTo10: 0,
	firstHeliumDimension: 0,
	// This is for off-window production
	lastTick: Date.now(),
}
function gameLoop() {
	game.hydrogenNuclei += game.firstHydrogenDimension * game.firstHDMultiplier / 50 * (Date.now() - game.lastTick) / 20
	game.firstHydrogenDimension += game.secondHydrogenDimension * game.secondHDMultiplier / 50 * (Date.now() - game.lastTick) / 20
	document.getElementById("hydrogenDisplay").innerHTML = "You have " + Math.round(game.hydrogenNuclei * 50) / 50 + " hydrogen nuclei."
	document.getElementById("hydrogenDimensionDisplay").innerHTML = "You have " + Math.round(game.firstHydrogenDimension * 50) / 50 + " hydrogen dimension 1."
	document.getElementById("hydrogenDimension2Display").innerHTML = "You have " + Math.round(game.secondHydrogenDimension * 50) / 50 + " hydrogen dimension 2."
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
			document.getElementById("hd1 cost").innerHTML = "a hydrogen dimension 1 costs " + game.firstHDCost + " hydrogen nuclei."
		}
	document.getElementById("hydrogenDimensionDisplay").innerHTML = "You have " + game.secondHydrogenDimension + " hydrogen dimension 2."
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
			document.getElementById("hd2 cost").innerHTML = "a hydrogen dimension 2 costs " + game.secondHDCost + " hydrogen nuclei."
		}
	document.getElementById("hydrogenDimensionDisplay2").innerHTML = "You have " + game.secondHydrogenDimension + " hydrogen dimension 2."
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
	document.getElementById("hd1 cost").innerHTML = "a hydrogen dimension 1 costs " + game.firstHDCost + " hydrogen nuclei."
	document.getElementById("hd2 cost").innerHTML = "a hydrogen dimension 2 costs " + game.secondHDCost + " hydrogen nuclei."
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
	document.getElementById("hd1 cost").innerHTML = "a hydrogen dimension 1 costs " + game.firstHDCost + " hydrogen nuclei."
	document.getElementById("hd2 cost").innerHTML = "a hydrogen dimension 2 costs " + game.secondHDCost + " hydrogen nuclei."
}

load();
setInterval(save, 1500);
setInterval(gameLoop, 20)
