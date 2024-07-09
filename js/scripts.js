// IIFE
let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1302';
    let modalContainer = document.querySelectorAll("#modal-container");

    function getAll () {
        return pokemonList;
    }
    function add (pokemon) {
        pokemonList.push(pokemon);
    }
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        button.addEventListener('click', function() {
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
        let modal = document.createElement("div");
        modal.classList.add("modal");

        let closeButton = document.createElement("button");
        closeButton.classList.add("modal-close");
        closeButton.innerText = "Close";
        closeButton.addEventListener("click", closeModal);
        window.addEventListener("keydown", (e) => {
            let modalContainer = document.querySelector("#modal-container");
            if (e.key === "escape" && modalContainer.classList.contains("is-visible")) {
                closeModal();
            }
        });
        modalContainer.addEventListener("click", (e) => {
            let target = e.target;
            if (target === modalContainer) {
                closeModal();
            }
        });

        let titleElement = document.createElement("h1");
        titleElement.classList.add("h1");
        titleElement.innerText = "Pokemon: " + pokemon.name;

        let contentElement = document.createElement("div");
        contentElement.classList.add("modal-body");
        contentElement.innerText = pokemon.imageUrl;
        contentElement.innerText = "Type(s): " + pokemon.types;
        contentElement.innerText = "Height: " + pokemon.height;

        modal.appendChild(closeButton);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);

        modalContainer.innerHtml = "";
        modalContainer.appendChild(modal);

        modalContainer.classList.add("is-visible");
    }

    function closeModal() {
        modalContainer.classList.remove("is-visible");
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
            item.types = details.types.map((typeInfo) => typeInfo.type.name);
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
