//IIFE for pokemonRepository with objects to add pokemon or List pokemon.
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    function getAll() {
      return pokemonList;
    }

    function add(pokemon) {
      let correctKeys = ['name', 'details.URL']
      let objectKeys = Object.keys(pokemon);
      if (typeof pokemon === 'object'
        && correctKeys[0] === objectKeys[0] ) {
        // && correctKeys[1] === objectKeys[1]
        // && correctKeys[2] === objectKeys[2] ) {
      pokemonList.push(pokemon);
      }
    }
    // Bonus Task 1.5.3 Filtering By Name
    // function findByName(name) {}

    function addListItem(pokemon) {
      let pokemonListItems = document.querySelector(".pokemon-list");
      let listItem = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("pokemonButton");
      listItem.appendChild(button);
      pokemonListItems.appendChild(listItem);
      button.addEventListener('click', function() {
        console.log(showDetails(pokemon))
      });
    }
  
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function() {
        console.log(pokemon);
      });
    }

    function loadList() {
      return fetch(apiURL).then(function(response) {
        return response.json();
      }).then(function(json) {
        json.results.forEach(function(item) {
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
      return fetch(url).then(function(response) {
        return response.json();
      }).then(function(details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function(e) {
        console.error(e);
      });
    }

    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      showDetails: showDetails,
      loadList: loadList,
      loadDetails: loadDetails
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

//testing add function
// pokemonRepository.add({name: 'pikachu', height: '1.2', type: 'thunder'})

//forEach Condition to List Pokemon (internal anonymous function)
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

//arrow function forEach
// pokemonRepository.getAll().forEach(pokemon => pokemonRepository.addListItem(pokemon));

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});



