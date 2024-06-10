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

    return {
        getAll: getAll,
        add: add
    }

})()

console.log(pokemonRepository.getAll())
