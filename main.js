var hydrogenNuclei = 10
var firstHDCost = 10
var firstHDMultiplier = 1
var firstHDTo10 = 0
var firstHydrogenDimension = 0
var secondHDCost = 100
var secondHDMultiplier = 1
var secondHDTo10 = 0
var secondHydrogenDimension = 0
function gameLoop() {
hydrogenNuclei += firstHydrogenDimension*firstHDMultiplier/50
firstHydrogenDimension += secondHydrogenDimension*secondHDMultiplier/50
hydrogenNuclei = Math.round( hydrogenNuclei * 50) / 50
firstHydrogenDimension = Math.round(firstHydrogenDimension * 50) / 50
document.getElementById("hydrogenDisplay").innerHTML = "You have " + hydrogenNuclei + " hydrogen nuclei."
document.getElementById("hydrogenDimensionDisplay").innerHTML = "You have " + firstHydrogenDimension + " hydrogen dimension 1."
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
function buySecondHydrogenDimension() {
  if (hydrogenNuclei >= secondHDCost) {
    hydrogenNuclei -= secondHDCost
    secondHydrogenDimension += 1
    secondHDTo10 += 1
    if (secondHDTo10 >= 10) {
      secondHDTo10 = 0
      secondHDCost *= 30
      secondHDMultiplier *= 2
      document.getElementById("hd2 cost").innerHTML = "a hydrogen dimension 2 costs" + secondHDCost + " hydrogen nuclei."
    }
  }
}
setInterval(gameLoop, 20)
