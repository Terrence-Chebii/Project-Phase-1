let home = document.querySelector('#home')
home.addEventListener('click' , displayHome)

function displayHome(){
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

fetch('https://api.jikan.moe/v4/anime?q=best anime&sfw')
.then(res=>res.json())
.then(data=>displayGlobal(data))

function displayGlobal(data){ 
    let global = document.querySelector('.global')
    data.data.forEach(anime => {
        let globalContent = document.createElement('section')
        globalContent.innerHTML = `
        <div id='display'>
           <button id='likeButton'>♥</button>
           <img src='${anime.images.jpg.image_url}'>
           <h3>${anime.title}<h3>
           </div>
        `
        global.appendChild(globalContent)

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


fetch(' https://api.jikan.moe/v4/anime?q=2022&sfw')
.then(res=>res.json())
.then(data=>displayNewReleases(data))

function displayNewReleases(data){ 
    let newRealeases = document.querySelector('.new')
    data.data.forEach(anime => {
        let newContent = document.createElement('section')
        newContent.innerHTML = `
        <div id='display'>
           <button id='likeButton'>♥</button>
           <img src='${anime.images.jpg.image_url}'>
           <h3>${anime.title}<h3>
           </div>
        `
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


fetch('https://api.jikan.moe/v4/anime?q=l&sfw')
.then(res=>res.json())
.then(data=>displayLocal(data))

function displayLocal(data){ 
    let local = document.querySelector('.local')
    data.data.forEach(anime => {
        let localContent = document.createElement('section')
        localContent.innerHTML = `
        <div id='display'>
           <button id='likeButton'>♥</button>
           <img src='${anime.images.jpg.image_url}'>
           <h3>${anime.title}<h3>
           </div>
        `
        local.appendChild(localContent)

        let likeButton = localContent.querySelector('#likeButton')
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

let btn = document.querySelector('#btn')
btn.addEventListener('click', (event) => {
    event.preventDefault()
    let newAnimeName = add.value
    let addForm = document.querySelector('form')
    //addForm.reset()
    alert('The added anime will be shown in your Anime\'s')

    fetch(`https://api.jikan.moe/v4/anime?q=${newAnimeName}`)
    .then(res=>res.json())
    .then(data=>addNewAnime(data))
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
}

let yourAnime = document.querySelector('#your')
yourAnime.addEventListener('click' , displayYouranime)

function displayYouranime(){
    fetch('http://localhost:3005/news')
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

function displayLikes(){
    fetch('http://localhost:3005/like')
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
    form.reset()

    fetch(`https://api.jikan.moe/v4/anime?q=${animeName}`)
    .then(res=>res.json())
    .then(data=>displayResults(data))
})

function displayResults(data){ 
    let main = document.querySelector('main')
    main.innerHTML = ` ` // clear previous results
    data.data.forEach(anime => {
        let content = document.createElement('section')
        content.innerHTML = `
        <div id='display'>
           <button id='likeButton'>♥</button>
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

