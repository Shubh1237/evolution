// Implement debouncing for network request
// On clicking book now store the selected movie in localstorage as key "movie"
// so that you can retrive it on checkout.html page


let movies_div = document.getElementById("movies");

let id;

async function searchMovies(){

    // https://www.omdbapi.com/?apikey=c8123887&s=om_shanti_om

  try {
    const query = document.getElementById("search").value;

    const res = await fetch(`https://www.omdbapi.com/?apikey=c8123887&s=${query}`)

    const data = await res.json();
     console.log("data:",data);
    const movies = data.Search;

    return movies;
} catch (err){
    console.log("err:", err);
}
}
function appendMovies(data){

movies_div.innerHTML = null;
data.forEach(function (el){
    let box = document.createElement("div");
   
    let p = document.createElement("p")
    p.innerText = el.Title;

    let image = document.createElement("img")
    image.src = el.Poster;

    let button = document.createElement("btn");
    button.innerText ="Book Now"
    button.style.cursor ="pointer"
    button.style.color = "Red"
    

    button.addEventListener("Click", function(){
        addMovies(el);
        window.location.href = "checkout.html"
    })
    box.append(image, p, button);
    movies_div.append(box)
});
}

async function main(){
let data = await searchMovies();

 if(data === undefined){
    return false;
}

appendMovies(data);
}

function debounce (func, delay){
if(id){
    clearTimeout(id);
}

 id = setTimeout(function(){
    func();
},delay);

}