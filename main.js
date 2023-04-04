let namee = document.querySelector('input')


fetch(`https://api.jikan.moe/v4/anime?q=${namee}&sfw`)
.then(res=>res.json())
.then(data=>displayResulys(data))

function displayResulys(data){
    console.log(data)
}