//IIFE for pokemonRepository with objects to add pokemon or List pokemon.
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let searchInput = document.querySelector("#search-input");
  
    function getAll() {
      return pokemonList;
    }

    function add(pokemon) {
      let correctKeys = ['name']
      let objectKeys = Object.keys(pokemon);
      if (typeof pokemon === 'object'
        && correctKeys[0] === objectKeys[0] ) {
        // && correctKeys[1] === objectKeys[1]
        // && correctKeys[2] === objectKeys[2] ) {
      pokemonList.push(pokemon);
      }
    }
    

    function addListItem(pokemon) {
      let pokemonListItems = document.querySelector(".pokemon-list");          
      let listItem = document.createElement("li");                             
      let button = document.createElement("button");                          
      button.innerText = pokemon.name;                                        
      button.classList.add("pokemonButton");     
      button.classList.add("btn");
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#pokemonModal');        
      listItem.appendChild(button);
      listItem.classList.add('list-group-item');                              
      pokemonListItems.appendChild(listItem);
      button.addEventListener('click', function() {
        showDetails(pokemon);
      });
    }

    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showModal(pokemon)
      });
    }

    //BootStrap Modal
    function showModal(pokemon) {
      
      let modalTitle = document.querySelector('.modal-title');
      modalTitle.innerText = pokemon.name;

      let pokemonImage = document.querySelector('.sprite-image');
      pokemonImage.src = pokemon.imageUrl;

      let pokemonHeight = document.querySelector('.pokemon-height');
      pokemonHeight.innerText = ('Height ' + pokemon.height);
    }

    function filterSearch(searchInput) {
      let filterValue = searchInput.value.toLowerCase();

      let filteredPokemon = pokemonList.filter(function(pokemon) {
        return pokemon.name.toLowerCase().indexOf(filterValue) > -1;
      });

      let pokemonListItems = document.querySelector('.pokemon-list');
      pokemonListItems.innerHTML = "";
      filteredPokemon.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
      });
    }

    searchInput.addEventListener('input', function() {
      pokemonRepository.filterSearch(searchInput);
    });




    // function showModal(pokemon) {
    //   let modalContainer = document.querySelector('#modal-container');
    //   modalContainer.innerHTML = '';
      
    //   let modal = document.createElement('div');
    //   modal.classList.add('modal');

    //   let closeButtonElement = document.createElement('button');
    //   closeButtonElement.classList.add('modal-close');
    //   closeButtonElement.innerText = 'close';
    //   closeButtonElement.addEventListener('click', hideModal);

    //   let titleElement = document.createElement('h1');
    //   titleElement.innerText = pokemon.name;

    //   let contentElement = document.createElement('p');
    //   contentElement.innerText = ('Height ' + pokemon.height);

    //   if(pokemon.imageUrl) {
    //     let pokemonImage = document.createElement('img');
    //     pokemonImage.setAttribute('src', pokemon.imageUrl);
    //     pokemonImage.setAttribute('height', '300');
    //     pokemonImage.setAttribute('width', '300');
    //     pokemonImage.setAttribute('alt', ('image of ' + pokemon.name));
    //     modal.appendChild(pokemonImage);
    //   }

    //   modal.appendChild(closeButtonElement);
    //   modal.appendChild(titleElement);
    //   modal.appendChild(contentElement);
    //   modalContainer.appendChild(modal);

    //   modalContainer.classList.add('is-visible');

    //   window.addEventListener('keydown', (e) => {
    //     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    //       hideModal();
    //     }
    //   });
  
    //   modalContainer.addEventListener('click', (e) => {
    //     let target = e.target;
    //     if (target === modalContainer) {
    //       hideModal();
    //     }
    //   });
    // }

    // function hideModal() {
    //   let modalContainer = document.querySelector('#modal-container');
    //   modalContainer.classList.remove('is-visible');
    // }

    
    
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
      });
    }

    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function(response) {
        return response.json();
      }).then(function(details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.abilities = details.abilities;
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
      loadDetails: loadDetails,
      showModal: showModal,
      filterSearch: filterSearch,
    };
})();


//variable for big Pokemon
// let bigPokemon = "Wow, that's big!"

// condition nested in for loop to write list of pokemon and add big Pokemon variable if true
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