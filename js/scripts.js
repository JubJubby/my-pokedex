let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1302';

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
        button.addEventListener('click', function(event) {
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
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Get modal element
    let modal = document.getElementById("modal-container");
    // Get open modal button
    let modalBtn = document.getElementById("show-modal");
    // Get close button
    let closeBtn = document.getElementsByClassName("modal-close")[0];
    // Get modal title (h1)
    let titleElement = document.createElement("h1");
    titleElement.innerText = title;
    // Get modal body (p)
    let bodyElement = document.createElement("p");
    bodyElement.innerText = text;

    // Listen for open click
    modalBtn.addEventListener("click", openModal);
    // Listen for close click
    closeBtn.addEventListener("click", closeModal);
    // Listen for outside click
    window.addEventListener("click", clickOutside);
    // Listen for escape key
    window.addEventListener("keydown", pressEscape);

    // Function to open modal
    function openModal(title, text) {
        modal.style.display = "block";
    }
    // Fuction to close modal with close button
    function closeModal() {
        modal.style.display = "none";
    }
    // Function to close modal with outside click
    function clickOutside(e) {
        if(e.target === modal) {
            modal.style.display = "none";
        }
    }
    // Function to close modal with escape key
    function pressEscape(e) {
        if(e.key === "Escape") {
            modal.style.display = "none";
        }
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            document.openModal("Modal title", "This is the modal content~");
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
