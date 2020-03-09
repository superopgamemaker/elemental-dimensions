var hydrogenNuclei = 10
var firstHydrogenDimension = 0
function gameLoop() {
hydrogenNuclei += 0.02
hydrogenNuclei = Math.round( hydrogenNuclei * 50) / 50
document.getElementById("hydrogenDisplay").innerHTML = "You have " + hydrogenNuclei + " hydrogen nuclei."
}
function buyFirstHydrogenDimension() {
  if (hydrogenNuclei >= 10) {
    hydrogenNuclei -= 10
    firstHydrogenDimension += 1
  }
}
setInterval(gameLoop, 20)
