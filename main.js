let D = x => {
  return new Decimal(x);
};

var Dc = Decimal;
// Put the variables in a game object
var game = {
	hydrogenNuclei: D(10),
	firstHDCost: D(10),
	firstHDMultiplier: D(1),
	firstHDTo10: D(0),
	firstHydrogenDimension: D(0),
	secondHDCost: D(100),
	secondHDMultiplier: D(1),
	secondHDTo10: D(0),
	secondHydrogenDimension: D(0),
	// This is for off-window production
	lastTick: D(Date.now()),
}
function gameLoop() {
	game.hydrogenNuclei.add(game.firstHydrogenDimension).times(game.firstHDMultiplier).div(50).times((D(Date.now()).minus(game.lastTick))).div(20)
	game.firstHydrogenDimension.add(game.secondHydrogenDimension).times(game.secondHDMultiplier).div(50).times((D(Date.now()).minus(game.lastTick))).div(20)
	document.getElementById("hydrogenDisplay").innerHTML = "You have " + game.hydrogenNuclei.times(50).div(50).round() + " hydrogen nuclei."
	document.getElementById("hydrogenDimensionDisplay").innerHTML = "You have " + game.firstHydrogenDimension.times(50).div(50).round() + " hydrogen dimension 1."
	document.getElementById("hydrogenDimension2Display").innerHTML = "You have " + game.secondHydrogenDimension.times(50).div(50).round() + " hydrogen dimension 2."
	game.lastTick = D(Date.now())
}
function buyFirstHydrogenDimension() {
	if (game.hydrogenNuclei.greaterThanOrEqualTo(game.firstHDCost)) {
		game.hydrogenNuclei.minus(game.firstHDCost)
		game.firstHydrogenDimension.add(1)
		game.firstHDTo10.add(1)
		if (game.firstHDTo10.greaterThan(10)) {
			game.firstHDTo10 = D(0)
			game.firstHDCost.times(10)
			game.firstHDMultiplier.times(2)
			document.getElementById("hd1 cost").innerHTML = "a hydrogen dimension 1 costs " + game.firstHDCost + " hydrogen nuclei."
		}
	document.getElementById("hydrogenDimensionDisplay").innerHTML = "You have " + game.secondHydrogenDimension + " hydrogen dimension 2."
	}
}
function buySecondHydrogenDimension() {
	if (game.hydrogenNuclei.greaterThanOrEqualTo(game.secondHDCost)) {
	  game.hydrogenNuclei.minus(game.secondHDCost)
	  game.secondHydrogenDimension.add(1)
	  game.secondHDTo10.add(1)
	  if (game.secondHDTo10.greaterThan(10)) {
	    game.secondHDTo10 = D(0)
	    game.secondHDCost.times(10)
	    game.secondHDMultiplier.times(2)
			document.getElementById("hd2 cost").innerHTML = "a hydrogen dimension 2 costs " + game.secondHDCost + " hydrogen nuclei."
		}
	document.getElementById("hydrogenDimensionDisplay2").innerHTML = "You have " + game.secondHydrogenDimension + " hydrogen dimension 2."
	}
}

function hardReset() {
	game = {
		hydrogenNuclei: D(10),
		firstHDCost: D(10),
		firstHDMultiplier: D(1),
		firstHDTo10: D(0),
		firstHydrogenDimension: D(0),
		secondHDCost: D(100),
		secondHDMultiplier: D(1),
		secondHDTo10: D(0),
		secondHydrogenDimension: D(0),
		lastTick: D(Date.now()),
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
