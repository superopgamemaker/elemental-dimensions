var hydrogen = 0

function gameLoop() {
hydrogen++
document.getElementById("hydrogenDisplay").innerHTML = "You have " + hydrogen + "hydrogen."
}

setInterval(gameLoop, 100)

