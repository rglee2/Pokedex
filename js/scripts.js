//IIFE for pokemonRepository with objects to add pokemon or List pokemon.
let pokemonRepository = (function() {
  let pokemonList = [
    {
       name: 'bulbasaur',
       height: 0.7,
       type: ['grass', ' poison'],
    },
    {
       name: 'ivysaur',
       height: 1,
       type: ['fire', ' flying'],
    },
    {
       name: 'venusaur',
       height: 2,
      type: 'water',
    },
    ];
  
    function getAll() {
      return pokemonList;
    }

    function add() {
      // let correctKeys = ['name', 'height', 'type']
      // let objectKeys = Object.keys(pokemon);
      // if (typeof pokemon === 'object' && )
      pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
      let pokemonListItems = document.querySelector(".pokemon-list");
      let listItem = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("pokemonButton");
      listItem.appendChild(button);
      pokemonListItems.appendChild(listItem);
    }


    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem
    };
})();


//variable for big Pokemon
// let bigPokemon = "Wow, that's big!"

//condition nested in for loop to write list of pokemon and add big Pokemon variable if true
// for (let i = 0; i < pokemonList.length; i++) {
// if (pokemonList[i].height > 1.5) {
//   document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ' + bigPokemon + '<br>'); 
// } else {
//   document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ' + '<br>');
// }
// }

//forEach Condition to List Pokemon
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.getListItem(pokemon);
});
//List Pokemon
// pokemonRepository.getAll().forEach(pokemonInfo);