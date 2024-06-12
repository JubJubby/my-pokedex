let pokemonRepository = (function () {
    let pokemonList=[
        {
            name: 'Bulbasaur ',
            type: 'grass, poison',
            height: '2.04'
        },
        {
            name: 'Ivysaur ',
            type: 'grass, poison',
            height: '3.03'
        },
        {
            name: 'Venusaur ',
            type: 'grass, poison',
            height: '6.07'
        }
    ];

    function getAll () {
        return pokemonList;
    }
    function add (pokemon) {
        pokemonList.push(pokemon);
    }
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.addEventListener('click', function(){
            showDetails(pokemon);
        });
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }
    function showDetails(pokemon){
        console.log(pokemon);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }

})()

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Pikachu", height: 0.3, types: "electric"});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
    
    pokemonRepository.addListItem(pokemon);
});