// Gameboard object
// Single instance: wrap factory func inside IIFE (module pattern)
const gameBoard = (() => {
  let gridSize;

  // Create a new empty 3 x 3 grid
  function newGrid() {
    gridSize = 3;
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

  // Get the grid size
  function getGridSize() {
    return gridSize;
  }

  function getGrid() {
    return grid;
  }

  // Return single instance gameBoard obj
  return { newGrid, getGridSize, getGrid };
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
      console.log("Cell already occupied. Try again");
      return false;
    }

    // Place this marker on the board
    board[y][x] = currentPlayer.getMarker();
    console.log(board);

    // Successfully placed marker
    return true;
  }

  // Check if a player has won aka
  function isWinner() {
    // Func to check if all in the row are the same marker
    // credit: https://builtin.com/articles/check-if-all-array-values-are-equal
    const isRowOfMarker = (row) => row.every((cell) => cell === marker);

    // Get the current player's marker
    let marker = currentPlayer.getMarker();

    // Check if got 3 of the player's marker in a row/column/diagonal
    gridSize = gameBoard.getGridSize();

    // Check if diagonal win
    if (
      // Top left to bottom right DONE
      (board[0][0] === marker &&
        board[1][1] === marker &&
        board[2][2] === marker) ||
      // Top right to bottom left DONE
      (board[0][2] === marker &&
        board[1][1] === marker &&
        board[2][0] === marker)
    ) {
      console.log("Diagonal win");
      return true;
    }

    // Check if column win DONE
    if (
      // First col
      (board[0][0] === marker &&
        board[1][0] === marker &&
        board[2][0] === marker) ||
      // Second col
      (board[0][1] === marker &&
        board[1][1] === marker &&
        board[2][1] === marker) ||
      // Third col
      (board[0][2] === marker &&
        board[1][2] === marker &&
        board[2][2] === marker)
    ) {
      console.log("Column win");
      return true;
    }

    // FIX THIS !!!!!!!!!
    // Check if row win
    // (?) switch to using .some() for one line (?)
    for (let i = 0; i < gridSize; i++) {
      // Check each row for win

      if (isRowOfMarker(board[i])) {
        console.log("Row win");
        return true;
      }
    }

    console.log("No win yet");
    // If reached end of func, then no winner yet
    return false;
  }

  function isDraw() {
    // Checks if there is no empty spaces left on the board
    for (let i = 0; i < 3; i++) {
      // Check each row to see if any 0's aka empty spaces
      isEmptyCellsLeft = board[i].some((cell) => cell === 0);

      if (isEmptyCellsLeft) return false;
    }
    // Gone through entire board and is completely full
    return true;
  }

  // Play a round aka one marker placed
  function playRound(x, y) {
    // Place current player's marker on board
    if (!placeMarker(x, y)) {
      console.log("");
      // Not successful in placing marker
      return false;
    }

    // Check if there is a win after placing marker
    if (isWinner()) {
      console.log(`${currentPlayer.getName()} has won`);
    }

    // Check if draw (all spaces filled)
    if (isDraw()) {
      console.log(`It is a DRAW.`);
    }

    // Switch to other player if still rounds left to pla
    switchPlayer();

    // Successfully played a round
    return true;
  }

  // Displays the board as a nested arr ONLY in the CONSOLE
  function displayBoard() {
    return board;
  }

  return { startGame, switchPlayer, placeMarker, playRound, displayBoard };
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
