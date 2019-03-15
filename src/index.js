const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

document.addEventListener('DOMContentLoaded', function(event) {
  renderAllToys()

})

function renderAllToys() {
fetch('http://localhost:3000/toys')
.then (response => response.json())
.then (data => data.map(toy => renderToy(toy)))

}

function renderToy(toy) {

  const toyContainer = document.getElementById("toy-collection")
  const card = document.createElement('div')
  
  card.setAttribute('class', 'card')
  card.dataset.id = toy.id
  const h2 = document.createElement('h2')
    h2.textContent = toy.name
  const img = document.createElement('img')
  img.setAttribute('class', "toy-avatar")
  img.id = "img"
  img.src = toy.image
  const p = document.createElement('p')
  p.textContent = toy.likes
  p.id = "likes"
  const likesBtn = document.createElement('button')
  likesBtn.setAttribute('class', "like-btn")
  likesBtn.innerText = "Like <3"
  likesBtn.dataset.id = toy.id
  likesBtn.addEventListener('click', handleLike)


    toyContainer.appendChild(card)
    card.appendChild(h2)
     card.appendChild(img)
     card.appendChild(p)
     card.appendChild(likesBtn)

}

function handleLike(event) {
   console.log(" this is the event: ", event)
  let newLike = parseInt(event.target.previousSibling.innerText)
  let id = event.target.dataset.id
  console.log(event.target.previousSibling)
  let fetchBody = {
    headers: {
      "Content-Type": "application/json",
    Accept: "application/json"},
    method: 'PATCH',
    body: `{"likes": ${++newLike}}`
  }
  event.target.previousSibling.innerHTML = newLike

  fetch(`http://localhost:3000/toys/${id}`, fetchBody)
         .then(res => console.log(res))
}

toyForm.addEventListener('submit', handleNewToy)

function handleNewToy(event) {
  event.preventDefault()
    console.log(event.target.elements)
    // debugger;
      let fetchBody = {
          
          headers:{
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          method: 'POST', 
          body: JSON.stringify({
            name: event.target.elements.name.value,
            image: event.target.elements.image.value,
            likes: 0

          })
          }
                     
      
      console.log(fetchBody)
       fetch('http://localhost:3000/toys', fetchBody)
       .then(res => res.json())
       .then(toy => renderToy(toy))
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