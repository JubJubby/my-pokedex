// IIFE
let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1302";

    function getAll () {
        return pokemonList;
    }
    function add (pokemon) {
        pokemonList.push(pokemon);
    }
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".list-group");
        let listPokemon = document.createElement("li");
        let button = document.createElement("button");

        listPokemon.classList.add("list-group-item");
        
        button.classList.add("btn-dark");
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#pokemonModal");
        button.innerText = pokemon.name;
        button.addEventListener("click", function() {
            showDetails(pokemon);
        });

        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
    }
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        let modalTitle = document.querySelector(".modal-title");
        let modalBody = document.querySelector(".modal-body");
        
        let titleElement = document.createElement("h5");
        titleElement.innerText = "Pokemon: " + pokemon.name;

        let heightElement = document.createElement("div");
        heightElement.innerText = "Height: " + pokemon.height;

        let imageElement = document.createElement("img");
        imageElement.src = pokemon.imageUrl;

        let typesElement = document.createElement("div");
        typesElement.innerText = "Type(s): " + pokemon.types;

        modalTitle.innerText = "Pokemon: " + pokemon.name;

        modalBody.innerHTML = 
            "Height: " + pokemon.height;
            pokemon.imageUrl;
            "Type(s): " + pokemon.types;

        
        modalBody.appendChild(typesElement);
        modalBody.appendChild(imageElement);
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types.map(function (typeInfo) {
                return typeInfo.type.name;
        });
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
