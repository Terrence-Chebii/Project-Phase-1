// Selecting the home button and adding a click event listener that calls displayHome function
let home = document.querySelector('#home')
home.addEventListener('click' , displayHome)

// Async function to display the homepage
async function displayHome(){
        // Selecting the main element and replacing its content with the HTML below
    let main = document.querySelector('main')
    main.innerHTML = `
    <div class="div"></div>
    <div id='dis'>
    <div id="global">
        <h2>BEST ANIME'S GLOBALLY</h2>
        <div class="global"></div>
    </div>

    <div id="new">
        <h2>NEW RELEASES</h2>
        <div class="new"></div>
    </div>

    <div id="local">
        <h2>TRENDING ANIME'S LOCALLY</h2>
        <div class="local"></div>
    </div>
    </div>
    `

        // Fetching anime data from the Jikan API for the best globally rated anime

await fetch('https://api.jikan.moe/v4/anime?q=best anime&sfw')
.then(res=>res.json())
.then(data=>displayGlobal(data))

    // Function to display the global anime data
function displayGlobal(data){ 
    let global = document.querySelector('.global')
    displayFilters.innerHTML = ``
    console.log(data)
    data.data.forEach(anime => {
                    // Creating a section element and setting its innerHTML
        let globalContent = document.createElement('section')
        globalContent.innerHTML = `
        <div id='display'>
           <button id='likeButton'>♥</button>
           <h6>${anime.rating}</h6>
           <img src='${anime.images.jpg.image_url}'>
           <h3>${anime.title}<h3>
           </div>
        `
                    // Appending the created section element to the global element in the HTML

        global.appendChild(globalContent)

                    // Adding a click event listener to the like button that sends a POST request to the backend to like an anime

        let likeButton = globalContent.querySelector('#likeButton')
        likeButton.addEventListener('click' , () => {
            let id = anime.mal_id
            let title = anime.title
            let img = anime.images.jpg.image_url
            let likedAnime = {
                id : id,
                title : title,
                img : img
            }
            fetch("http://localhost:3005/like" , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(likedAnime)
            })
        })
    });
}

    // Fetching anime data from the Jikan API for the new releases
fetch(' https://api.jikan.moe/v4/anime?q=2022&sfw')
.then(res=>res.json())
.then(data=>displayNewReleases(data))

    // Function to display the new releases anime data

async function displayNewReleases(data){ 
    let newRealeases = document.querySelector('.new')
    data.data.forEach(anime => {
                    // Creating a section element and setting its innerHTML
        let newContent = document.createElement('section')
        newContent.innerHTML = `
        <div id='display'>
           <button id='likeButton'>♥</button>
           <h6>${anime.rating}</h6>
           <img src='${anime.images.jpg.image_url}'>
           <h3>${anime.title}<h3>
           </div>
        `
                    // Appending the created section element to the new releases element in the HTML

        newRealeases.appendChild(newContent)

        let likeButton = newContent.querySelector('#likeButton')
        likeButton.addEventListener('click' , () => {
            let id = anime.mal_id
            let title = anime.title
            let img = anime.images.jpg.image_url
            let likedAnime = {
                id : id,
                title : title,
                img : img
            }
            fetch("http://localhost:3005/like" , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(likedAnime)
            })
        })
    });
}

// Sends a GET request to the external Anime API with a search query
await fetch('https://api.jikan.moe/v4/anime?q=l&sfw') 
.then(res=>res.json())
.then(data=>displayLocal(data)) // Calls the displayLocal function with the JSON data

async function displayLocal(data){ 
    let local = document.querySelector('.local')
    data.data.forEach(anime => {
        let localContent = document.createElement('section')
        localContent.innerHTML = `
        <div id='display'>
           <button id='likeButton'>♥</button>
           <h6>${anime.rating}</h6>
           <img src='${anime.images.jpg.image_url}'>
           <h3>${anime.title}<h3>
           </div>
        `
        local.appendChild(localContent)

        let likeButton = localContent.querySelector('#likeButton')  // Selects the like button
        likeButton.addEventListener('click' , () => { // Adds an event listener to the like button
            let id = anime.mal_id // Gets the ID of the anime
            let title = anime.title // Gets the title of the anime
            let img = anime.images.jpg.image_url // Gets the image of the anime
            let likedAnime = { // Creates a new object with the ID, title, and image of the anime
                id : id,
                title : title,
                img : img
            }
            fetch("http://localhost:3005/like" , { // Sends a POST request to the server with the new object
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(likedAnime)
            })
        })
    });
}
}

let btn = document.querySelector('#btn')

btn.addEventListener('click', (event) => {
    event.preventDefault()

    let newAnimeName = add.value
    let addForm = document.querySelector('form')
    addForm.reset()

    alert('The added anime will be shown in \"your Anime\'s\"')

    fetch(`https://api.jikan.moe/v4/anime?q=${newAnimeName}`)
        .then(res => res.json())
        .then(data => addNewAnime(data))
})


function addNewAnime(data) { 
    let anime = data.data[0]; // Selecting the first object in the array
    let title = anime.title
    let img = anime.images.jpg.image_url
    let id = anime.mal_id
    let newAnime = {
        title : title,
        img : img,
        id : id
    }

    fetch("http://localhost:3005/news" , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(newAnime)
            })
  }

let yourAnime = document.querySelector('#your')
yourAnime.addEventListener('click' , displayYouranime)

async function displayYouranime(){
   await fetch('http://localhost:3005/news')
.then((res) => res.json())
.then(data => {
    let body = document.querySelector('main')
    body.innerHTML = ` `
    data.forEach(news => {
        let content = document.createElement('section')
        content.innerHTML = `
        <div id='youranimes'>
           <img src='${news.img}'>
           <h3>${news.title}<h3><br><br>
           <button id='deleteIt'>DELETE</button>
           </div>
        `
        body.appendChild(content)

let deleteButton = content.querySelector('#deleteIt')
deleteButton.addEventListener('click' , deleteIt)
function deleteIt(){
    confirm('Are you sure you want to delete it? The content will be lost!')
    fetch(`http://localhost:3005/news/${news.id}` , {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
  }
    })
})
}

 let yourLikes = document.querySelector('#liked')
yourLikes.addEventListener('click' , displayLikes)

async function displayLikes(){
   await fetch('http://localhost:3005/like')
.then((res) => res.json())
.then(data => {
    let body = document.querySelector('main')
    body.innerHTML = ``
    data.forEach(like => {
        let content = document.createElement('section')
        content.innerHTML = `
        <div id='youranimes'>
           <img src='${like.img}'>
           <h3>${like.title}<h3><br><br>
           <button id='deleteIt'>UNLIKE</button>
           </div>
        `
        body.appendChild(content)

let deleteButton = content.querySelector('#deleteIt')
deleteButton.addEventListener('click' , deleteIt)
function deleteIt(){
    confirm('Are You sure you want to unlike it?')
    fetch(`http://localhost:3005/like/${like.id}` , {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
  }
    })
})
}


let button = document.querySelector('#button')
button.addEventListener('click', (e) => {
    e.preventDefault()
    let animeName = anime.value
    let form = document.querySelector('#searchForm')
    form.reset() //prevent reset behaviour

     fetch(`https://api.jikan.moe/v4/anime?q=${animeName}`)
    .then(res=>res.json())
    .then(data=>displayResults(data))
})

function displayResults(data){ 
    console.log(data)
    let main = document.querySelector('main')
    main.innerHTML = ` ` // clear previous results
    data.data.forEach(anime => {
        let content = document.createElement('section')
        content.innerHTML = `
        <div id='display'>
           <button id='likeButton'>♥</button>
           <h6>${anime.rating}</h6>
           <img src='${anime.images.jpg.image_url}'>
           <h3>${anime.title}<h3>
           </div>
        `
        main.appendChild(content)

        let likeButton = content.querySelector('#likeButton')
        likeButton.addEventListener('click' , () => {
            let id = anime.mal_id
            let title = anime.title
            let img = anime.images.jpg.image_url
            let likedAnime = {
                id : id,
                title : title,
                img : img
            }
            fetch("http://localhost:3005/like" , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(likedAnime)
            })
        })
    });
}

let filter = document.querySelector('#filter')
filter.addEventListener('click' , showFilters)

function showFilters(){
    let displayFilters = document.querySelector('#displayFilters')
    let li = document.createElement('li')
    displayFilters.innerHTML = ``
    li.innerHTML = `
    <h4 id='action'>Action<h4>  
    <h4 id='romance'>Romance<h4>
    <h4 id='comedy'>Comedy<h4>
    <h4 id='horror'>Horror<h4>
    `
    displayFilters.appendChild(li)
    document.querySelector('#action').addEventListener('click' , showAction)
    document.querySelector('#romance').addEventListener('click' , showRomance)
    li.querySelector('#comedy').addEventListener('click' , showComedy)
    li.querySelector('#horror').addEventListener('click' , showHorror)
}

async function showAction(h4){
    await fetch('https://api.jikan.moe/v4/anime?q=fight&sfw')
.then(res=>res.json())
.then(data=>{
    let action = document.querySelector('main')
    let filter = document.querySelector('#displayFilters')
    filter.innerHTML = ``
    action.innerHTML = ``
    data.data.forEach(anime => {
        let newContent = document.createElement('section')
        newContent.innerHTML = `
        <div id='showaction'>
           <button id='likeButton'>♥</button>
           <h6>${anime.rating}</h6>
           <img src='${anime.images.jpg.image_url}'>
           <h3>${anime.title}<h3>
           </div>
        `
        action.appendChild(newContent)
        newContent.querySelector('#likeButton').addEventListener('click' , (e) =>{
            e.preventDefault()
            let id = anime.mal_id
            let title = anime.title
            let img = anime.images.jpg.image_url
            let likedAnime = {
                id : id,
                title : title,
                img : img
            }
            fetch("http://localhost:3005/like" , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(likedAnime)
            })
        })
})
})
}

async function showRomance(){
    await fetch('https://api.jikan.moe/v4/anime?q=love&sfw')
.then(res=>res.json())
.then(data=>{
    let action = document.querySelector('main')
    let filter = document.querySelector('#displayFilters')
    filter.innerHTML = ``
    action.innerHTML = ``
    data.data.forEach(anime => {
        let newContent = document.createElement('section')
        newContent.innerHTML = `
        <div id='showaction'>
           <button id='likeButton'>♥</button>
           <h6>${anime.rating}</h6>
           <img src='${anime.images.jpg.image_url}'>
           <h3>${anime.title}<h3>
           </div>
        `
        action.appendChild(newContent)
        newContent.querySelector('#likeButton').addEventListener('click' , (e) =>{
            e.preventDefault()
            let id = anime.mal_id
            let title = anime.title
            let img = anime.images.jpg.image_url
            let likedAnime = {
                id : id,
                title : title,
                img : img
            }
            fetch("http://localhost:3005/like" , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(likedAnime)
            })
        })
})
})
}

async function showComedy(){
    await fetch('https://api.jikan.moe/v4/anime?q=comedy&sfw')
.then(res=>res.json())
.then(data=>{
    let action = document.querySelector('main')
    let filter = document.querySelector('#displayFilters')
    filter.innerHTML = ``
    action.innerHTML = ``
    data.data.forEach(anime => {
        let newContent = document.createElement('section')
        newContent.innerHTML = `
        <div id='showaction'>
           <button id='likeButton'>♥</button>
           <h6>${anime.rating}</h6>
           <img src='${anime.images.jpg.image_url}'>
           <h3>${anime.title}<h3>
           </div>
        `
        action.appendChild(newContent)
        newContent.querySelector('#likeButton').addEventListener('click' , (e) =>{
            e.preventDefault()
            let id = anime.mal_id
            let title = anime.title
            let img = anime.images.jpg.image_url
            let likedAnime = {
                id : id,
                title : title,
                img : img
            }
            fetch("http://localhost:3005/like" , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(likedAnime)
            })
        })
})
})
}

async function showHorror(){
    await fetch('https://api.jikan.moe/v4/anime?q=horror&sfw')
.then(res=>res.json())
.then(data=>{
    let action = document.querySelector('main')
    let filter = document.querySelector('#displayFilters')
    filter.innerHTML = ``
    action.innerHTML = ``
    data.data.forEach(anime => {
        let newContent = document.createElement('section')
        newContent.innerHTML = `
        <div id='showaction'>
           <button id='likeButton'>♥</button>
           <h6>${anime.rating}</h6>
           <img src='${anime.images.jpg.image_url}'>
           <h3>${anime.title}<h3>
           </div>
        `
        action.appendChild(newContent)
        newContent.querySelector('#likeButton').addEventListener('click' , (e) =>{
            e.preventDefault()
            let id = anime.mal_id
            let title = anime.title
            let img = anime.images.jpg.image_url
            let likedAnime = {
                id : id,
                title : title,
                img : img
            }
            fetch("http://localhost:3005/like" , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(likedAnime)
            })
        })
})
})
}

let i = 0; 			
let images = [];	
let time = 3000;	//time interval
	 
images[0] = "images/img1.jpg";
images[1] = "images/img2.jpg";
images[2] = "images/img4.jpg";
images[3] = "images/img5.jpg";

function changeImg(){
	document.slide.src = images[i];

	if(i < images.length - 1){
	  i++; 
	} else { 
		i = 0; //reset image
	}

	setTimeout("changeImg()", time);
}

window.onload=changeImg;