const TOYS_URL = 'http://localhost:3000/toys'

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", () => {
  renderAllToys();

  toyForm.addEventListener('submit', handleToyForm)
})

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
function renderAllToys() {
  fetch(TOYS_URL)
  .then(response => response.json())
  .then(data => data.map(toy => renderToy(toy)))
}

function renderToy(toy) {
  // console.log(`${id} ${name} ${image} ${likes}`)
  const toyCollection = document.getElementById('toy-collection')

  const card = document.createElement('div')
  card.className = "card"
  toyCollection.appendChild(card)

  const h2 = document.createElement('h2')
  h2.textContent = toy.name
  card.appendChild(h2)

  const img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"
  card.appendChild(img)

  const p = document.createElement('p')
  p.textContent = `${toy.likes} Likes`
  card.appendChild(p)

  const likeButton = document.createElement('button')
  likeButton.className = "like-btn"
  likeButton.textContent = "Like <3"
  likeButton.dataset.id = toy.id
  likeButton.dataset.liked = false
  likeButton.addEventListener('click', handleLike)
  card.appendChild(likeButton)
}

function handleToyForm(e) {
  e.preventDefault()
  // console.log(e.target.elements[1].value)
  const newToy = {
    name: e.target.elements[0].value,
    image: e.target.elements[1].value,
    likes: 0
  }

  fetch(TOYS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  })
  .then(result => result.json())
  .then(data => renderToy(data))

  // renderAllToys();
}

function handleLike(e) {
  const likeButton = e.target
  let likes = parseInt(likeButton.previousSibling.textContent
    .split(" ")[0])

  // console.log(typeof likeButton.dataset.liked)
  likes = toggleLike(likeButton, likes)

  const url = `${TOYS_URL}/${likeButton.dataset.id}`

  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": likes
    })
  })
  .then(response => response.json())
  .then(() => {
    likeButton.previousSibling.textContent = `${likes} Likes`

    if (isLiked(likeButton)) {
      likeButton.textContent = "Unlike </3"
    } else {
      likeButton.textContent = "Like <3"
    }
  })
}

function toggleLike(likeButton, likes) {
  if (isLiked(likeButton)) {
    likes--
    likeButton.dataset.liked = "false"
  } else {
    likes++
    likeButton.dataset.liked = "true"
  }
  return likes
}

function isLiked(likeButton) {
  return likeButton.dataset.liked === "true"
}
