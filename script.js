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

  // Increase the player's score by 1
  function increaseScore() {
    console.log(`${name}'s score has increased by 1`);
    score++;
  }

  // Reset player's score to 0
  function resetScore() {
    console.log(`${name}'s score has been reset to 0`);
    score = 0;
  }

  return {
    getPlayerName,
    getPlayerMarker,
    getScore,
    increaseScore,
    resetScore,
  };
}

// console.log(gameBoard.newGrid());
const boris = createPlayer("Boris", "X");
const tony = createPlayer("Tony", "O");

console.log(boris.getScore());

tony.increaseScore();

console.log(boris.getScore());
console.log(tony.getScore());

// gameController
// Single instance: wrap factory func inside IIFE (module pattern)
// Controls the flow of the game
gameController = (() => {
  return;
})();

// DisplayController: single instance
// Display game to the UI
// Wrap factory inside IIFE (module pattern)

/// RUNNING THE GAME ///

// Create players
const p1 = createPlayer("p1", "O");
const p2 = createPlayer("p2", "X");
// Start (new) game
gameController.startGame();
