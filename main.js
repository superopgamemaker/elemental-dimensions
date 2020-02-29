var hydrogenNuclei = 0

function gameLoop() {
hydrogenNuclei+=0.1
hydrogenNuclei = Math.round( hydrogenNuclei * 10) / 10
document.getElementById("hydrogenDisplay").innerHTML = "You have " + hydrogenNuclei + " hydrogen nuclei."
}

setInterval(gameLoop, 100)
