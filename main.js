var hydrogen = 0

function gameLoop() {
hydrogen+=0.1
hydrogen = Math.round( hydrogen * 10) / 10
document.getElementById("hydrogenDisplay").innerHTML = "You have " + hydrogen + " hydrogen."
}

setInterval(gameLoop, 100)
