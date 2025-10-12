let profilePictures = [
    "Mario3.jpeg",
    "Person1.jpeg",
    "Mario3.jpg",
    "Person1.jpg",
    "Anime.jpeg",
    "Mario4.jpeg",
    "Person2.jpeg",
    "Anime.jpg",
    "Minecraft.jpeg",
    "Person2.jpg",
    "Anime.webp",
    "Minecraft.jpg",
    "Person3.jpg",
    "Anime1.jpeg ",
    "Minecraft.png ",
    "Person4.jpg",
    "Anime2.jpeg ",
    "Minecraft1.jpeg ",
    "Space.jpeg",
    "Anime3.jpeg",
    "Minecraft1.jpg",
    "Space.jpg",
    "Anime4.jpeg",
    "Minecraft2.jpeg",
    "Space1.jpg",
    "Anime5.jpeg",
    "Minecraft2.jpg",
    "Space1.webp",
    "Book.jpeg",
    "Minecraft3.jpg",
    "Space2.jpg",
    "Book1.jpeg",
    "Others.jpeg",
    "Space3.jpg",
    "Others.jpg",
    "Space4.jpg",
    "Mario.jpeg",
    "Others1.jpg",
    "Mario.jpg",
    "Others2.jpg",
    "Mario1.jpeg",
    "Person.jpeg",
    "Mario1.jpg",
    "Person.jpg",
    "Mario2.jpeg",
    "Person.png",
    "Mario2.jpg",
    "Person.webp",
]
let selectedPP = ""
profilePictures.forEach((pp) => {
    let picture = document.createElement("div");
    picture.classList.add("pp");
    picture.id = pp;
    picture.style.backgroundImage = `url(assets/${pp})`;
    if (pp.substring(0, 4) != "Book") {
        document.getElementById(pp.substring(0, 5)).appendChild(picture);
    }else{
        document.getElementById("Books").appendChild(picture);
    }
    document.getElementById(pp).addEventListener("click",()=>{updateMainPP(pp)})
})

function updateMainPP(pp){
    document.getElementById("mainPP").style.backgroundImage=`url(assets/${pp})`;
}