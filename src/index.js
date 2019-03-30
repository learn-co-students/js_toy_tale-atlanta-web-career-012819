const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', () =>{
  document.addEventListener('submit', handleNewToy)
  renderAllToys()
})

function renderAllToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => data.forEach(toy => renderToy(toy)))
}

function renderToy(toy){
const toyDiv = document.getElementById("toy-collection")
const toyCard = document.createElement('div')
toyCard.setAttribute('class', 'card')
const toyTag = document.createElement('h2')
toyTag.textContent = toy.name
const toyImage = document.createElement('img')
toyImage.setAttribute('class', 'toy-avatar')
toyImage.id = 'img'
toyImage.src = toy.image
const p = document.createElement('p')
p.innerText = toy.likes
const button = document.createElement('button')
button.setAttribute('class', "like-btn")
button.textContent = "Like <3"
button.dataset.id = toy.id
button.addEventListener('click', handleLikeButton)
toyDiv.appendChild(toyCard)
toyCard.appendChild(toyTag)
toyCard.appendChild(toyImage)
toyCard.appendChild(p)
toyCard.appendChild(button)
}

function handleLikeButton(e){
   let like = e.target.previousSibling.innerText
   let id = e.target.dataset.id
   e.target.previousSibling.innerText = ++like
   let fetchBody = {
    headers: {
      "Content-Type": "application/json",
    Accept: "application/json"},
    method: 'PATCH',
    body: `{"likes": ${like}}`
  }
  fetch(`http://localhost:3000/toys/${id}`, fetchBody)
         .then(resp => console.log(resp))
}

function handleNewToy(e){
  e.preventDefault()
  let fetchBody = {
          
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    method: 'POST', 
    body: JSON.stringify({
      name: e.target.elements.name.value,
      image: e.target.elements.image.value,
      likes: 0

    })
    }
               

console.log(fetchBody)
 fetch('http://localhost:3000/toys', fetchBody)
 .then(res => res.json())
 .then(toy => renderToy(toy))
 e.target.reset()
}

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