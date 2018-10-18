const URL = "http://localhost:3000/pups"
let dogData
document.addEventListener('DOMContentLoaded', function() {
  getDogs()
  const goodDogFilter = document.getElementById('good-dog-filter')
  goodDogFilter.addEventListener('click', filterGoodDogs)
})

function getDogs() {
  fetch(URL)
  .then(response => response.json())
  .then(data => showDogButtons(data))
}

function showDogButtons(data) {
  dogData = data
  const dogBar = document.getElementById('dog-bar')
  const goodDogFilter = document.getElementById('good-dog-filter')
  dogBar.innerHTML = ""
  if (goodDogFilter.innerHTML === "Filter good dogs: ON") {
    data.filter((dog) => {
      return dog.isGoodDog === true
  }).forEach((dog) => {
      dogBar.innerHTML += `<span id=${dog.id} onClick="showDogInfo(event)">${dog.name}</span>`
  }) 
  } else {
    data.forEach(function(dog) {
      dogBar.innerHTML += `<span id=${dog.id} onClick="showDogInfo(event)">${dog.name}</span>`
  })
  }
}

function showDogInfo(event) {
  const dogInfoDiv = document.getElementById('dog-info')
  let dogObj = dogData.find(dog => dog.id === parseInt(event.target.id))
  let goodDogBadDog = dogObj.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
  dogInfoDiv.innerHTML = ""
  dogInfoDiv.innerHTML += `
  <img src=${dogObj.image}>
  <h2>${dogObj.name}</h2>
  <button id=${dogObj.name} onClick="toggleGoodDog(event)">${goodDogBadDog}</button>`
}

function toggleGoodDog(event) {
  let dogObj = dogData.find(dog => dog.name === event.target.id)
  let goodDogBadDog = dogObj.isGoodDog ? 'Bad Dog!' : 'Good Dog!'
  const goodBadButton = document.getElementById(dogObj.name)
  fetch(`${URL}/${dogObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      isGoodDog: dogObj.isGoodDog ? false : true
    })
  }).then(() => getDogs())
    .then(function() {
    goodBadButton.innerHTML = goodDogBadDog
  })
}

function filterGoodDogs() {
  //change button text on click
  const goodDogFilter = document.getElementById('good-dog-filter')
  goodDogFilter.innerHTML = goodDogFilter.innerHTML === "Filter good dogs: OFF" ? "Filter good dogs: ON" : "Filter good dogs: OFF"
  getDogs()
}
