// document loader
document.addEventListener("DOMContentLoaded", () => {
    toggleForm()
    getToys()
    setupToyForm()
  })
  
  
  // toggleForm >>>> extra <<<<
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
  
  
  // read current toys  >>>> must know <<<<
    // make a `<div class="card">` for each toy 
    // and add it to the toy-collection 'div'
  const getToys = () => {
    // fetch URL
    fetch("http://localhost:3000/toys")
    // given a promise; .then change to JSON object 
    .then((res) => res.json())
    // given another promisel .then manipulate JSON object
    .then((toys) => toys.forEach(renderToy)) // .then((toys) => toys.forEach((toy) => renderToy(toy)))
  }
  // add toy info to the card
    // 'h2' tag with the toy's name
    // 'img' tag with the 'src' of the toy's image attribute w/ class name toy-avatar
    // 'p' tag with how many likes the toy has
    // 'button' tag with a class 'like-btn'
  const renderToy = (toy) => {
    const toyCollection = document.querySelector("#toy-collection")
  
    const cardDiv = document.createElement("div")
    cardDiv.className = "card";
  
    const h2 = document.createElement('h2')
    h2.innerText = toy.name;
  
    const img = document.createElement('img')
    img.src = toy.image
    img.className = "toy-avatar"
  
    const p = document.createElement('p')
    p.innerText = toy.likes
  
    const likeBtn = document.createElement('button');
    likeBtn.className = "like-btn"
    likeBtn.innerText = "Like <3"
    // add event listener for likeBtn
    likeBtn.addEventListener("click", (e) => {
      likeToy(toy, event)
      // addLike(toy, e) // need to create addLike function to update likes w/o refreshing
    })
    // append (append is like adding a child to the branch) toyCollection and cardDiv
    cardDiv.append(h2, img, p, likeBtn)
    toyCollection.append(cardDiv)
  }
  
  
  
  // form for creating a new toy 
  const setupToyForm = () => {
    const toyForm = document.querySelector(".add-toy-form") // .add-toy-form is class
    // add a 'submit' event listener to toyForm
    toyForm.addEventListener("submit", (event) => {
    // add preventdefault to stop the default from happening if the event isn't explicitly handled
      event.preventDefault() // adding this to prevent creating a new toy if not explicitly demanded
      createToy(toyForm)
    })
  }
  
  
  
  // create a new toy (POST)
  const createToy = (toyForm) => {
    console.log(toyForm.name.value)
    // console.log(event.target.name.value) // we can replace toyForm with event.target
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
  
  
  
  // increate toy's likes (PATCH)
  const likeToy = (toy, event) => {
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
  