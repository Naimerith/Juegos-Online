const listsGames = async () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cac17fa31bmshff34043afa7e34ep18a2f1jsn1c4b67302fd4',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
    const response = await fetch(url, options);
    const api_games = await response.json();

    let tableGames = ``;
    api_games.forEach((el) => {
        tableGames += `
        <div class='containerGame'>
            <h2>${el.title}</h2>
            <img  id='description' src="${el.thumbnail}" alt="">
            <p class='subtittle'>Ver descripción aqui  ▼</p>
            <section id='descriptionGame'> 
                <p>Descriptión: 
                <span> ${el.short_description}</span>
                </p>
                <button> 
                    <a href="${el.game_url}" target="_blank">Jugar</a>
                </button>
            </section>
        </div>
        `
    });
    document.getElementById('tableGames').innerHTML = tableGames;

    const games = document.querySelectorAll("#descriptionGame");
    const showDescription = function () {
        this.style.opacity = "1";
    }
    games.forEach(el => {
        el.addEventListener("click", showDescription);
    });
}

const doc = document;
const search = (input, selector) => {
    doc.addEventListener('keyup', e => {
        if (e.target.matches(input)) {  //Si el objeto que genero el evento su selector coincide con el elemento input
            //console.log(e.key)
            //console.log(e.target.value)
            //if (e.key === 'Escape') e.target.value = '';
            doc.querySelectorAll(selector).forEach((el) => //busca en todos los elementos que coincida con este selector y por cada uno (por eso lo recorre) busca el texto
                el.textContent.toLowerCase().includes(e.target.value) //el elemento que incluya el resultado del valor del input, esto devuelve un booleano 
                    ? el.classList.remove('filter') //si encuentra la coincidencia quitamos la clase filter (no se aplica el display none)
                    : el.classList.add('filter') // caso contrario se aplica la clase filter entonces va ocultando lo que no coincida con la busqueda 
            );
        }
    })
}

window.addEventListener('load', () => {
    listsGames();
    search('.gameFilter', '.containerGame');
})

