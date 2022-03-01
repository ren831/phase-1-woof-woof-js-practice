const baseUrl = "http://localhost:3000/pups";

const bar = document.querySelector("#dog-bar");
const details = document.querySelector("#dog-info");
const filterBtn = document.querySelector("#good-dog-filter");

function getAllDogs() {
  fetch(baseUrl)
    .then((response) => response.json())
    .then(renderInBar);
}

function getOneDog(id) {
  return fetch(baseUrl + `/${id}`).then((response) => response.json());
}

function renderInBar(dogsArr) {
  bar.innerHTML = " ";
  dogsArr.forEach(addOneDogToBar);
}

function addOneDogToBar(dogObj) {
  const dogSpan = document.createElement("span");
  dogSpan.innerText = dogObj.name;
  dogSpan.dataset.id = dogObj.id;
  dogSpan.addEventListener("click", hadleSpanClick);
  bar.append(dogSpan);
}

function showOneDog(dogObj) {
  details.innerHTML = " ";
  const dogDiv = document.createElement("div");
  dogDiv.innerHTML = `<img src = ${dogObj.image}>
   <h2>${dogObj.name}</h2`;
  const pupBtn = document.createElement("button");
  pupBtn.textContent = dogObj.isGoodDog ? "Good Dog" : "Bad Dog";
  pupBtn.addEventListener("click", () => togglePupBtn(pupBtn));
  details.append(dogDiv, pupBtn);
}

function hadleSpanClick(even) {
  const id = even.target.dataset.id;
  getOneDog(id).then(showOneDog);
}
function togglePupBtn(pupBtn) {
  pupBtn.textContent = pupBtn.textContent.includes("Good")
    ? "Bad Dog"
    : "Good Dog";
}

getAllDogs();
