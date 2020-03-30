let D = x => {
  return new Decimal(x);
};

var Dc = Decimal;
// Put the variables in a game object
var game = {
	hydrogenNuclei: D(10),
	firstHDCost: D(10),
	firstHDMultiplier: D(1),
	firstHDTo10: 0,
	firstHydrogenDimension: D(0),
	secondHDCost: D(100),
	secondHDMultiplier: D(1),
	secondHDTo10: 0,
	secondHydrogenDimension: D(0),
	// This is for off-window production
	// note 2: PLEASE DONT DECIMALIFY LASTTICK
	// note 2.1: Values that you are sure to not exceed 1.79e308, dont decimalify it
	lastTick: Date.now(),
}

// format the number not *50 round /50
function format(num) {
	if (decimalCheck(num)) {
		if (num.lt(1000)) {
			return num.toFixed(2)
		} else if (num.lt("1e100000")) {
			let e = Math.floor(num.log10());
			let m = num.div(Decimal.pow(10, e))
			return m.toFixed(2) + "e" + e
		} else {
			let e = Math.floor(num.log10());
			let m = num.div(Decimal.pow(10, e))
			return m.toFixed(2) + "e" + format(e)
		}
	} else {
		return format(D(num))
	}
}

function decimalCheck(thing) {
	try {
		thing.mul(1)
	} catch (error) {
		return false;
	}
	return true
}


function gameLoop() {
	// hydrogenNuclei = hydrogenNuclei + (1stHydrogenDims*1stHydrogenDimsMult*(ms)/1000)
	game.hydrogenNuclei = game.hydrogenNuclei.add(game.firstHydrogenDimension.mul(game.firstHDMultiplier).mul(Date.now()-game.lastTick).div(1000))
	game.firstHydrogenDimension = game.firstHydrogenDimension.add(game.secondHydrogenDimension.mul(game.secondHDMultiplier).mul(Date.now()-game.lastTick).div(1000))
	document.getElementById("hydrogenDisplay").innerHTML = "You have " + format(game.hydrogenNuclei) + " hydrogen nuclei."
	document.getElementById("hydrogenDimensionDisplay").innerHTML = "You have " + format(game.firstHydrogenDimension) + " hydrogen dimension 1."
	document.getElementById("hydrogenDimension2Display").innerHTML = "You have " + format(game.secondHydrogenDimension) + " hydrogen dimension 2."
	game.lastTick = Date.now()
}
function buyFirstHydrogenDimension() {
	if (game.hydrogenNuclei.gte(game.firstHDCost)) {
		game.hydrogenNuclei = game.hydrogenNuclei.minus(game.firstHDCost)
		game.firstHydrogenDimension = game.firstHydrogenDimension.add(1)
		game.firstHDTo10++
		if (game.firstHDTo10 >= 10) {
			game.firstHDTo10 = 0
			game.firstHDCost = game.firstHDCost.mul(10)
			game.firstHDMultiplier = game.firstHDMultiplier.mul(2)
			document.getElementById("hd1 cost").innerHTML = "a hydrogen dimension 1 costs " + game.firstHDCost + " hydrogen nuclei."
		}
	document.getElementById("hydrogenDimensionDisplay").innerHTML = "You have " + game.firstHydrogenDimension + " hydrogen dimension 2."
	}
}
function buySecondHydrogenDimension() {
	if (game.hydrogenNuclei.gte(game.secondHDCost)) {
	  game.hydrogenNuclei = game.hydrogenNuclei.minus(game.secondHDCost)
	  game.secondHydrogenDimension = game.secondHydrogenDimension.add(1)
	  game.secondHDTo10++
	  if (game.secondHDTo10 >= 10) {
	    game.secondHDTo10 = 0
	    game.secondHDCost = game.secondHDCost.mul(10)
	    game.secondHDMultiplier = game.secondHDMultiplier.mul(2)
			document.getElementById("hd2 cost").innerHTML = "a hydrogen dimension 2 costs " + game.secondHDCost + " hydrogen nuclei."
		}
	document.getElementById("hydrogenDimension2Display").innerHTML = "You have " + game.secondHydrogenDimension + " hydrogen dimension 2."
	}
}

function hardReset() {
	game = {
		hydrogenNuclei: D(10),
		firstHDCost: D(10),
		firstHDMultiplier: D(1),
		firstHDTo10: 0,
		firstHydrogenDimension: D(0),
		secondHDCost: D(100),
		secondHDMultiplier: D(1),
		secondHDTo10: 0,
		secondHydrogenDimension: D(0),
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

function transformSaveToDecimal() {
	game = {
		hydrogenNuclei: D(game.hydrogenNuclei),
		firstHDCost: D(game.firstHDCost),
		firstHDMultiplier: D(game.firstHDMultiplier),
		firstHDTo10: game.firstHDTo10,
		firstHydrogenDimension: D(game.firstHydrogenDimension),
		secondHDCost: D(game.secondHDCost),
		secondHDMultiplier: D(game.secondHDMultiplier),
		secondHDTo10: game.secondHDTo10,
		secondHydrogenDimension: D(game.secondHydrogenDimension),
		lastTick: Date.now(),
	}
}

//Loading
function load() {
	let thesave = localStorage.getItem('elementaldimensonssave');
	if (thesave == null) {
		hardReset();
	} else {
		thesave = atob(thesave);
		game = JSON.parse(thesave);
		transformSaveToDecimal()
	}
	document.getElementById("hd1 cost").innerHTML = "a hydrogen dimension 1 costs " + game.firstHDCost + " hydrogen nuclei."
	document.getElementById("hd2 cost").innerHTML = "a hydrogen dimension 2 costs " + game.secondHDCost + " hydrogen nuclei."
}

function exportSave() {
	let thesave = JSON.stringify(game);
	thesave = btoa(thesave);
	prompt("Here's the save", thesave)
}

load();
setInterval(save, 1500);
setInterval(gameLoop, 20)
