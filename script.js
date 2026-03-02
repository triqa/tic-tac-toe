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

    console.log("gameBoard.newGrid() called");
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

// gameController
// Single instance: wrap factory func inside IIFE (module pattern)
// Controls the flow of the game
gameController = (() => {
  // Create players
  const p1 = createPlayer("p1", "O");
  const p2 = createPlayer("p2", "X");
  // Current board
  let board;

  function startGame() {
    // Get a new board with nothing placed
    board = gameBoard.newGrid();
    // Reset player's scores
    p1.resetScore();
    p2.resetScore();

    console.log("The game has started");
    return board;
  }

  // Displays the board as a nested arr ONLY in the CONSOLE
  function displayBoard() {
    return board;
  }

  return { startGame, displayBoard };
})();

// DisplayController: single instance
// Display game to the UI
// Wrap factory inside IIFE (module pattern)
displayController = () => {
  return;
};

/// RUNNING THE GAME ///

// Start (new) game
console.log(gameController.startGame());
