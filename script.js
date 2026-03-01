// Gameboard object: single instance
// Wrap factory inside IIFE (module pattern)
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

  return { newGrid };
})();

console.log(gameBoard.newGrid());

// Player object: multiple instances

// GameController: ?single? instance
// Controls the flow of the game

// DisplayController: single instance
// Display game to the UI
// Wrap factory inside IIFE (module pattern)
