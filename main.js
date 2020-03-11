var hydrogenNuclei = 10
var firstHDCost = 10
var firstHDMultiplier = 1
var firstHDTo10 = 0
var firstHydrogenDimension = 0
function gameLoop() {
hydrogenNuclei += firstHydrogenDimension*firstHDMultiplier/50
hydrogenNuclei = Math.round( hydrogenNuclei * 50) / 50
document.getElementById("hydrogenDisplay").innerHTML = "You have " + hydrogenNuclei + " hydrogen nuclei."
}
function buyFirstHydrogenDimension() {
  if (hydrogenNuclei >= firstHDCost) {
    hydrogenNuclei -= firstHDCost
    firstHydrogenDimension += 1
    firstHDTo10 += 1
    if (firstHDTo10 >= 10) {
      firstHDTo10 = 0
      firstHDCost *= 10
      firstHDMultiplier *= 2
      document.getElementById("hd1 cost").innerHTML = "a hydrogen dimension 1 costs" + firstHDCost + " hydrogen nuclei."
    }
    document.getElementById("hydrogenDimensionDisplay").innerHTML = "You have " + firstHydrogenDimension + " hydrogen dimension 1."
  }
}
setInterval(gameLoop, 20)
