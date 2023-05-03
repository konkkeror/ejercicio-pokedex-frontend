let maestrosPokemon = [];
let players = {
  player1: {},
  player2: {}
}

let pokemones = {
  player1: {},
  player2: {}
}

const obtenerMaestrosPokemon = () => {
  fetch('http://localhost:3002/pokemon-masters', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(res => {
    maestrosPokemon = res.result;
    renderizarMaestrosPokemon();
    console.log(res);
  });
} 

obtenerMaestrosPokemon();

const renderizarMaestrosPokemon = () => {
  maestrosPokemon.forEach(maestro => {
    document.getElementById('player1').innerHTML += `<option value="${maestro._id}">${maestro.firstName}</option>`;
    document.getElementById('player2').innerHTML += `<option value="${maestro._id}">${maestro.firstName}</option>`;
  });
  document.getElementById('player1').value = null;
  document.getElementById('player2').value = null;
}

const obtenerMaestroPokemon = (player) => {
  console.log("Obtener detalles de: ", document.getElementById(player).value);
  fetch(`http://localhost:3002/pokemon-masters/${document.getElementById(player).value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(res => {
    players[player] = res;
    console.log(players);
    renderizarDetalleMaestroPokemon(player);
  });
}

const renderizarDetalleMaestroPokemon = (player) => {
  document.querySelector(`#detalle-${player}>img`).setAttribute("src", players[player].img);
  document.querySelector(`#detalle-${player} h6`).innerHTML = players[player].firstName + ' ' + players[player].lastName;
  document.querySelector(`#detalle-${player} span`).innerHTML = players[player].level;
  document.querySelector(`#detalle-${player} .pokemon-list`).innerHTML = "";
  players[player].pokemons.forEach(pokemon => {
    document.querySelector(`#detalle-${player} .pokemon-list`).innerHTML += 
      `<img
        onclick = "seleccionarPokemon('${player}', '${pokemon._id}')"
        src="${pokemon.img}"
        title="${pokemon.name}"
      />`;
  });
  
}

const seleccionarPokemon = (player, idPokemon) => {
  console.log('Seleccionó el pokemon: ', player, idPokemon);
  fetch(`http://localhost:3002/pokemones/${idPokemon}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(res => {
    console.log(res);
    pokemones[player] = res;
    console.log('Pokemones que están luchando', pokemones);
    renderizarDetallePokemon(player, res)
  });
}

const renderizarDetallePokemon = (player, pokemon) => {
  document.querySelector(`#pokemon-seleccionado-${player}>img`).setAttribute("src", pokemon.img);
  document.querySelector(`#pokemon-seleccionado-${player} h5`).innerHTML = pokemon.name;
}


