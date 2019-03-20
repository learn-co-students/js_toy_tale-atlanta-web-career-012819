const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')

let addToy = false
const toycollection = document.getElementById("toy-collection")

renderAndysToys()
// YOUR CODE HERE
toyForm.addEventListener("submit", handleForm)

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// <div class="card">
//  <h2>Woody</h2>
//  <img src=toy_image_url class="toy-avatar" />
//  <p>4 Likes </p>
//  <button class="like-btn">Like <3</button>
// </div> 

function renderAndysToys() {
    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(data => data.forEach(element => {
        element // element.name element.like element.image
        toyCard(element)
      // const div = document.createElement("div")
      // div.className ="card"
      // const h2 = document.createElement("h2")
      // h2.textContent = element.name
      // const img = document.createElement("img")
      // const p = document.createElement("p")
      // p.textContent = "Likes " + element.likes 
      // const btn = document.createElement("button")
      // btn.textContent = "Like"
      // btn.className = "like-btn"
      // img.src = element.image
      // img.className = "toy-avatar"

      
      // div.appendChild(h2)
      // div.appendChild(img)
      // div.appendChild(p)
      // div.appendChild(btn)
      // toycollection.appendChild(div)
    }) )

}

function handleForm(event){
  event.preventDefault()
  console.log(event.target.elements[0].value)
  const name = event.target.elements["name"].value
  const image = event.target.elements["image"].value
  
  const element = new Object()
  element.name = name
  element.image = image
  element.likes = 0

  toyCard(element)

  fetch("http://localhost:3000/toys", {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  method: "POST",
  body: JSON.stringify(element)
  }).then(res => console.log(res))

  //clear the form
  event.target.reset()
}


function toyCard(element) {
  console.log(element)
  const div = document.createElement("div")
  div.className ="card"
  const h2 = document.createElement("h2")
  h2.textContent = element.name
  const img = document.createElement("img")
  const p = document.createElement("p")
  p.textContent = "Likes " + element.likes 
  const btn = document.createElement("button")
  btn.textContent = "Like"
  btn.className = "like-btn"
  btn.addEventListener("click", addLikes)
  btn.dataset.id = element.id
  btn.dataset.likes = element.likes
  img.src = element.image
  img.className = "toy-avatar"

  
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(btn)
  toycollection.appendChild(div)
}
// OR HERE!

function addLikes(event){
  console.log("you really like me...")
  console.log(event.target)
  const button = event.target

  let likes = parseInt(button.dataset.likes)
  const id = button.dataset.id
  console.log(likes,id)

  //increase like count
  likes += 1
  console.log(button.previousSibling)
  button.previousSibling.textContent = `Likes ${likes}`
  button.dataset.likes = likes
  const messageBody = { "likes" : likes }
  //send patch request
  fetch(`http://localhost:3000/toys/${id}`,{
  headers:{
    "Content-Type": "application/json",
    Accept: "application/json"
    },
    method: "PATCH",
    body: `{ "likes" : ${likes} }`

    }
  ).then(res => console.log(res))

}