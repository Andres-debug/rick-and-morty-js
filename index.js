const characterList = document.getElementById('characters-list');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const searchBar = document.getElementById('search-bar')

let currentPage = 1;
let currentSearch='';

const apiURL = 'https://rickandmortyapi.com/api/character?page='

async function fetchCharacters(page=1,searchQuery=''){
    try{
        let url= `${apiURL}?page=${page}`

        if(searchQuery.trim()!==''){
            url+=`&name=${searchQuery}`
        }
        const response = await fetch(url)
        if(!response.ok){
            throw new Error('Failed to fetch data')
        }
        const data = await response.json();
        displayCharacters(data.results)
        handlePagination(data.info)
    }catch(error){
        console.error('Error obteneniendo los personajes',error)
        characterList.innerHTML='<p>NO se encontro ningun personaje</p>'
    }
}

function displayCharacters (characters){
    characterList.innerHTML = '';

    characters.forEach(character=>{
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');

        characterCard.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        `;

        characterCard.addEventListener('click',()=>{
            window.location.href = `character.html?id=${character.id}`
        })

        characterList.appendChild(characterCard)
    })
}

function handlePagination(info){
   prevButton.disabled = !info.prev;

   nextButton.disabled = !info.next;

}

prevButton.addEventListener('click',()=>{
    if(currentPage > 1){
        currentPage--;
        fetchCharacters(currentPage);
    }
})

nextButton.addEventListener('click',()=>{
 currentPage++;
 fetchCharacters(currentPage);
})

searchBar.addEventListener('input',(event)=>{
    currentSearch = event.target.value;
    console.log('Texto buscando',currentSearch)
    currentPage =1;

    fetchCharacters(currentPage,currentSearch)
})


fetchCharacters(currentPage);