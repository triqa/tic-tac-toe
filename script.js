// Gameboard object
// Single instance: wrap factory func inside IIFE (module pattern)
const gameBoard = (() => {
  // Create a new empty 3 x 3 grid
  function newGrid() {
    const gridSize = 3;
    const grid = [];
    for (let i = 0; i < gridSize; i++) {
      row = [];
      for (let j = 0; j < gridSize; j++) {
        row.push(0);
      }
      grid.push(row);
    }

    console.log("newGrid() called");
    return grid;
  }

  // Return single instance gameBoard obj
  return { newGrid };
})();

// createPlayer factory func
// Multiple instances = NOT wrap factory func inside IIFE
function createPlayer(name, marker) {
  // Tracks how many wins this player has
  let score = 0;

  // Get the player's name
  function getPlayerName() {
    return name;
  }
  // Get the player's marker
  function getPlayerMarker() {
    return marker;
  }

  // Get player's score
  function getScore() {
    return score;
  }

  return { getPlayerName, getPlayerMarker };
}

// console.log(gameBoard.newGrid());
const boris = createPlayer("Boris", "X");
const tony = createPlayer("Tony", "O");

console.log(boris.getPlayerMarker());

// gameController
// Single instance: wrap factory func inside IIFE (module pattern)
// Controls the flow of the game
// gameController = (() => {})();

// DisplayController: single instance
// Display game to the UI
// Wrap factory inside IIFE (module pattern)
