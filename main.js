let btn = document.querySelector('#button')
btn.addEventListener('click', (e) => {
    e.preventDefault()
    let animeName = anime.value
    let form = document.querySelector('#searchForm')
    form.reset()

    fetch(`https://api.jikan.moe/v4/anime?q=${animeName}`)
    .then(res=>res.json())
    .then(data=>displayResults(data))
})

function displayResults(data){ 
    let main = document.querySelector('div')
    main.innerHTML = '' // clear previous results
    data.data.forEach(anime => {
        let content = document.createElement('section')
        content.innerHTML = `
        <div id='display'>
           <button>✬</button>
           <img src='${anime.images.jpg.image_url}'>
           <h3>${anime.title}<h3>
           </div>
        `
        console.log(content)
        main.appendChild(content)
    });
}


fetch('https://api.jikan.moe/v4/anime?q=best anime&sfw')
.then(res=>res.json())
.then(data=>displayGlobal(data))

function displayGlobal(data){ 
    let global = document.querySelector('.global')
    data.data.forEach(anime => {
        let globalContent = document.createElement('section')
        globalContent.innerHTML = `
        <div id='display'>
           <button>✬</button>
           <img src='${anime.images.jpg.image_url}'>
           <h3>${anime.title}<h3>
           </div>
        `
        console.log(globalContent)
        global.appendChild(globalContent)
    });
}


