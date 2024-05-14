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
]

for (let i = 0; i < pokemonList.length; i++){
    if (pokemonList[i].height > 3 && pokemonList[i].height < 6){
        console.log(pokemonList[i].name + pokemonList[i].height);
    }else if (pokemonList[i].height >= 6){
        console.log(pokemonList[i].name + pokemonList[i].height + " That's huge!");
    }else if (pokemonList[i].height <= 2){
        console.log(pokemonList[i].name + pokemonList[i].height + " That's tiny!")
    }
}