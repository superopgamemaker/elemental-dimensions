var hydrogenNuclei = 10

function gameLoop() {
hydrogenNuclei+=0.001
hydrogenNuclei = Math.round( hydrogenNuclei * 1000) / 1000
document.getElementById("hydrogenDisplay").innerHTML = "You have " + hydrogenNuclei + " hydrogen nuclei."
}

setInterval(gameLoop, 1)
