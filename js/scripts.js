// IIFE
let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1302';
    let modalContainer = document.querySelector("#modal-container");

    function getAll () {
        return pokemonList;
    }
    function add (pokemon) {
        pokemonList.push(pokemon);
    }
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".list-group");
        let listPokemon = document.createElement("li");
        listPokemon.classList.add("list-group-item");
        let button = document.createElement("button");
        button.classList.add("btn-dark");
        button.innerText = pokemon.name;
        // button.classList.add("button-class");
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
        let modalBody = document.querySelector(".modal-body");
        let modalTitle = document.querySelector(".modal-title");
        let modalHeader = document.querySelector(".modal-header");
        modalBody.empty();
        modalTitle.empty();
        modalHeader.empty();

        modalTitle.innerText = "Pokemon: " + pokemon.name;

        modalBody.innerHTML = 
            "Height: " + pokemon.height;
            pokemon.imageUrl;
            "Type(s): " + pokemon.types;

        // let modal = document.createElement("div");
        // modal.classList.add("modal");

        let closeButton = document.querySelector("button-close");
        // closeButton.classList.add("modal-close");
        // closeButton.innerText = "Close";
        closeButton.addEventListener("click", closeModal);
        window.addEventListener("keydown", (e) => {
            let modalContainer = document.querySelector("#modal-container");
            if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
                closeModal();
            }
        });
        modalContainer.addEventListener("click", (e) => {
            let target = e.target;
            if (target === modalContainer) {
                closeModal();
            }
        });

        let titleElement = document.createElement("h5");
        // titleElement.classList.add("h1");
        // titleElement.innerText = "Pokemon: " + pokemon.name;

        let heightElement = document.createElement("div");
        // heightElement.classList.add("modal-body");
        // heightElement.innerText = "Height: " + pokemon.height;

        let imageElement = document.createElement("img");
        // imageElement.classList.add("modal-body")
        // imageElement.src = pokemon.imageUrl;

        let typesElement = document.createElement("div");
        // typesElement.classList.add("modal-body")
        // typesElement.innerText = "Type(s): " + pokemon.types;
        
        modal.appendChild(closeButton);
        modal.appendChild(titleElement);
        modal.appendChild(typesElement);
        modal.appendChild(imageElement);
        modal.appendChild(heightElement);

        modalContainer.innerText = "";
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
