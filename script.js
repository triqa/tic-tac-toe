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
  // Get the player's name
  function getPlayerName() {
    return name;
  }

  function getPlayerMarker() {
    return marker;
  }

  return { getPlayerName, getPlayerMarker };
}

// console.log(gameBoard.newGrid());
const boris = createPlayer("Boris", "X");
const tony = createPlayer("Tony", "O");

console.log(boris.getPlayerMarker());

// GameController: ?single? instance
// Controls the flow of the game

// DisplayController: single instance
// Display game to the UI
// Wrap factory inside IIFE (module pattern)
