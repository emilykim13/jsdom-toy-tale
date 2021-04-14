// time completed: 0:31:13

// document loader
document.addEventListener("DOMContentLoaded", () => {
  toggleForm()
  getToys()
  setupToyForm()
});
// form toggle

  let addToy = false;
  
  const toggleForm = () => {
    const addToyBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container"); // .container syntax because this is a class; we use #new-toy-btn bc that was the id in html
    addToyBtn.addEventListener("click", () => { 
      addToy = !addToy
      if (addToy) {
        toyFormContainer.style.display = "block";
      }
      else {
        toyFormContainer.style.display = "none";
      }
    })
  }

// fetch toys
getToys = () => {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => toys.forEach(renderToy))
}
// add toy info to the card
renderToy = (toy) => {
  const toyCollection = document.querySelector("#toy-collection")
  const div = document.createElement("div")
    div.className = "card"
  const h2 = document.createElement("h2")
    h2.innerText = toy.name
  const img = document.createElement("img")
    img.src = toy.image
    img.className = "toy-avatar"
  const p = document.createElement("p")
    p.innerText = toy.likes
  const button = document.createElement("button")
    button.className = "like-btn"
    button.innerText = "Like <3"
    button.addEventListener("click", event => {
      addLike(toy, event)
    })
  div.append(h2, img, p, button)
  toyCollection.append(div)

}

// add a new toy (create POST)
const setupToyForm = () => {
  const toyForm = document.querySelector(".add-toy-form")
  toyForm.addEventListener("submit", event => {
    event.preventDefault()
    createToy(event)
  })
}

const createToy = (event) => {
  console.log(event)
  const newToy = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json",
    },
    body: JSON.stringify(newToy)
  })
  .then(res => res.json())
  .then(newToy => renderToy(newToy))
}

// increase toy likes by 1 (update PATCH)
const addLike = (toy, event) => {
  console.log(event)
  newLikes = toy.likes + 1

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "accept": "application/json",
    },
    body: JSON.stringify({
      likes: newLikes
    })
  })
  .then(res => res.json())
  .then(updatedToy => {
    const toyLikes = event.target.parentElement.childNodes[2]
    toyLikes.innerText = updatedToy.likes
  })
}