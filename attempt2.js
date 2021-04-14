// time completion: 1:13:03


// document loader 
document.addEventListener("DOMContentLoaded", () => {
    toggleForm()
    getToys()
    setupToyForm()
    });
    
    // toggle form >>> given code <<<
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
    // fetch toys
    const getToys = () => {
      fetch("http://localhost:3000/toys")
      .then((res) => res.json())
      .then((toys) => toys.forEach(renderToy))
    }
    // add toys to card
    const renderToy = (toy) => {
      const toyCollection = document.querySelector("#toy-collection")
    
      const div = document.createElement("div")
        div.className = "card"
      const h2 = document.createElement("h2")
        h2.innerText = toy.name
      const img = document.createElement("img")
        img.src = toy.image // check console for the array of toys, it has the attributes of the object
        img.className = "toy-avatar"
      const p = document.createElement("p")
        p.innerText = toy.likes
      const button = document.createElement("button")
        button.innerText = "Like <3"
        button.className = "like-btn"
        button.addEventListener("click", () => {
          addLike(toy, event)
        })
      // need to finish button for like ^
      div.append(h2, img, p, button)
      toyCollection.append(div)
    
    }
    // add a new toy
      // form
    const setupToyForm = () => {
    const toyForm = document.querySelector(".add-toy-form")
    toyForm.addEventListener("submit", (event) => {
        event.preventDefault()
        createToy(event)
      })
    }
      // create POST
    const createToy = (event) => {
      console.log(event.target.name.value)
      
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
    
    
    // increase a toy's likes
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
    