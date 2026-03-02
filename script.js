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
  function getName() {
    return name;
  }
  // Get the player's marker
  function getMarker() {
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
    getName,
    getMarker,
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
  players = [createPlayer("p1", "O"), createPlayer("p2", "X")];

  // Current board
  let board;
  let currentPlayer;

  function startGame() {
    // Get a new board with nothing placed
    board = gameBoard.newGrid();
    // Reset player's scores
    players[0].resetScore();
    players[1].resetScore();
    // Set the first player
    currentPlayer = players[0];

    console.log("The game has started");
    console.log(`${currentPlayer.getName()}'s turn`);
    return board;
  }

  // Switch to other player for their turn
  function switchPlayer() {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    console.log(`${currentPlayer.getName()}'s turn`);
  }

  // Place the current player's market at (x, y) on the board
  function placeMarker(x, y) {
    // Check if marker already on this spot
    if (board[y][x] !== 0) {
      console.log("Cell already occupied. Try again.git");
      return;
    }

    // Place this marker on the board
    board[y][x] = currentPlayer.getMarker();
    console.log(board);

    // Switch to other player
    switchPlayer();
  }

  // Displays the board as a nested arr ONLY in the CONSOLE
  function displayBoard() {
    return board;
  }

  return { startGame, switchPlayer, placeMarker, displayBoard };
})();

// DisplayController: single instance
// Display game to the UI
// Wrap factory inside IIFE (module pattern)
displayController = () => {
  return;
};

/// RUNNING THE GAME ///

// Start (new) game
// console.log(gameController.startGame());
// console.log(gameController.placeMarker(2, 1));
