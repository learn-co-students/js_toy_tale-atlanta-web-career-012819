const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', () =>{
  // document.addEventListener('submit', handleNewToy)
  renderAllToys()
})

function renderAllToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => data.forEach(toy => renderToy(toy)))
}

function renderToy(toy){
  const toyCollection = document.getElementById('toy-collection')
  const toyCard = document.createElement('div')
  toyCard.setAttribute('class', 'card')
  const toyName = document.createElement('h2')
  toyName.textContent = toy.name
  const toyAvatar = document.createElement('img')
  toyAvatar.setAttribute('class', 'toy-avatar')
  toyAvatar.src = toy.image
  const toyLikes = document.createElement('p')
  toyLikes.textContent = toy.likes 
  const toyButton = document.createElement('button')
  toyButton.setAttribute('class', 'button')
  toyButton.textContent = "Like <3"
  toyButton.dataset.id = toy.id
  toyButton.addEventListener('click', handleLikeButton)
  toyCollection.appendChild(toyCard)
  toyCard.appendChild(toyName)
  toyCard.appendChild(toyAvatar)
  toyCard.appendChild(toyLikes)
  toyCard.appendChild(toyButton)
}

// function handleLikeButton(e){
//   console.log("I am the toy", e.target.dataset.id)
//   let like = e.target.previousSibling.innerText
//   let id = e.target.dataset.id
//   e.target.previousSibling.innerText = ++like
//   let fetchBody = {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     method: "PATCH",
//     body: `{'likes': ${like}}`
//   }
//   fetch(`http://localhost:3000/toys/${id}`, fetchBody)
//   .then(resp => console.log("I am the response",resp))

// }

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

// function handleNewToy(e){
//   e.preventDefault()
//   let fetchBody = {
          
//     headers:{
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     method: 'POST', 
//     body: JSON.stringify({
//       name: e.target.elements.name.value,
//       image: e.target.elements.image.value,
//       likes: 0

//     })
//     }
               

// console.log(fetchBody)
//  fetch('http://localhost:3000/toys', fetchBody)
//  .then(res => res.json())
//  .then(toy => renderToy(toy))
//  e.target.reset()
// }

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