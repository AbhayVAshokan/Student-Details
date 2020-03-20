uppercaseBtn = document.getElementById("uppercase-button");
lowercaseBtn = document.getElementById("lowercase-button");

uppercaseBtn.onclick = toUpper;
lowercaseBtn.onclick = toLower;

function toUpper() {
  console.log("to uppercase");
}

function toLower() {
  console.log("to lowercase");
}