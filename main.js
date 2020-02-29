var hydrogenNuclei = 10

function gameLoop() {
hydrogenNuclei+=0.01
hydrogenNuclei = Math.round( hydrogenNuclei * 100) / 100
document.getElementById("hydrogenDisplay").innerHTML = "You have " + hydrogenNuclei + " hydrogen nuclei."
}

setInterval(gameLoop, 10)
