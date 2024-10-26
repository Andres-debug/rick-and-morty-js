const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const characterId = urlParams.get('id');

async function fetchCharacterDetail(id) {
    try{
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
        const character =await response.json();
        displayCharacterDetail(character);
    
    }catch(error){
        console.error("Error obteniendo el personaje",error)
    }
}

function displayCharacterDetail(character){
    const characterDetail = document.getElementById('character-detail');

    characterDetail.innerHTML=`
    <img src="${character.image}" alt="${character.name}">
    <div class="info">
    <h2>${character.name}</h2>
    <p><strong>Status:</strong> ${character.status}</p>
    <p><strong>Species:</strong> ${character.species}</p>
    <p><strong>Gender:</strong> ${character.gender}</p>
    <p><strong>Origin:</strong> ${character.origin.name}</p>
    <p><strong>Last know location</strong> ${character.location.name}</p>
    <p><strong>Episodes: </strong> ${character.episode.length}</p>
    </div>
    
    `

}

fetchCharacterDetail(characterId)