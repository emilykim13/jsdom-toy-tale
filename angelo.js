document.addEventListener("DOMContentLoaded", () => {
  toggleForm()
  getToys()
  setupToyForm()
});

let addToy = false;

const toggleForm = () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
}

const getToys = () => {
  fetch("http://localhost:3000/toys")
  .then((res) => res.json())
  // .then((toys) => toys.forEach((toy) => renderToy(toy)))
  .then((toys) => toys.forEach(renderToy))
}

const renderToy = (toy) => {
  const toyCollection = document.querySelector('#toy-collection')

  const toyCard = document.createElement("div")
  toyCard.className = "card"

  const toyName = document.createElement('h2')
  toyName.innerText = toy.name

  const toyImg = document.createElement('img')
  toyImg.src = toy.image
  toyImg.className = "toy-avatar"

  const toyLikes = document.createElement('p')
  toyLikes.innerText = toy.likes

  const likeBtn = document.createElement('button')
  likeBtn.innerText = "Like <3"
  likeBtn.className = "like-btn"

  likeBtn.addEventListener("click", (event) => {
    addLike(toy, event)
  })

  toyCard.append(toyName, toyImg, toyLikes, likeBtn)
  toyCollection.append(toyCard)

}

const setupToyForm = () => {
  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener("submit", (event) => {
    event.preventDefault()
    createToy(toyForm)
  })
}

const createToy = (toyForm) => {
  console.log(toyForm.name.value)

  const newToy = {
    name: toyForm.name.value,
    image: toyForm.image.value,
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

const addLike = (toy, event) => {
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