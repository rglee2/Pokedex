let pokemonList = [
  {
     name: 'bulbasaur',
     height: 0.7,
     type: ['grass', 'poison'],
  },
  {
     name: 'ivysaur',
     height: 1,
     type: ['fire', 'flying'],
  },
  {
     name: 'venusaur',
     height: 2,
     type: 'water',
  },
];

//variable for big Pokemon
let bigPokemon = "Wow, that's big!"

//condition nested in for loop to write list of pokemon and add big Pokemon variable if true
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1.5) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ' + bigPokemon + '<br>'); 
  } else {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ' + '<br>');
  }
}