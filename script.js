// Underlying gameboard used to place markers
// Single instance: wrap factory func inside IIFE (module pattern)
const gameBoard = (() => {
  let gridSize;
  let grid;

  // Create a new empty grid of the chosen size
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

    return grid;
  }

  function getGridSize() {
    return gridSize;
  }

  function getBoard() {
    return grid;
  }

  // Return single instance gameBoard obj
  return { newGrid, getGridSize, getBoard };
})();

// Factory func to create a new player
// Multiple instances = NOT wrap factory func inside IIFE
function createPlayer(name, marker) {
  let score = 0;

  function getName() {
    return name;
  }
  function getMarker() {
    return marker;
  }

  function getScore() {
    return score;
  }

  function increaseScore() {
    score++;
  }

  function resetScore() {
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

// Single instance: wrap factory func inside IIFE (module pattern)
// Controls the flow of the game in the console
const gameController = (() => {
  let gameState; // "playing" || "win" || "draw"
  let board;
  let currentPlayer;

  players = [createPlayer("Player 1", "O"), createPlayer("Player 2", "X")];

  // Start a new game where all previous info is cleared
  function newGame() {
    gameState = "playing";
    // Get a new board with no markers placed
    board = gameBoard.newGrid();
    // Reset player's scores
    players[0].resetScore();
    players[1].resetScore();
    // Set the first player
    currentPlayer = players[0];

    return board;
  }

  // Switch to other player for their turn
  function switchPlayer() {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  }

  // Place the current player's marker in the cell chosen.
  // The corresponding co-ordinate will be shown in the UI (using displayController) using the data x and y classes for that cell button
  function placeMarker(x, y) {
    // Check if marker already on this cell
    if (board[y][x] !== 0) {
      return false;
    }

    // Place the marker on that cell of the board
    board[y][x] = currentPlayer.getMarker();

    // Successfully placed marker
    return true;
  }

  // Check if got 3 of the player's marker in a row/column/diagonal
  function isWinner() {
    let marker = currentPlayer.getMarker();
    gridSize = gameBoard.getGridSize();

    // Checks if all in the row are the same marker
    const isRowOfMarker = (row) => row.every((cell) => cell === marker);

    // Check if diagonal win
    if (
      // Top left to bottom right
      (board[0][0] === marker &&
        board[1][1] === marker &&
        board[2][2] === marker) ||
      // Top right to bottom left
      (board[0][2] === marker &&
        board[1][1] === marker &&
        board[2][0] === marker)
    ) {
      console.log("Diagonal win");
      return true;
    }

    // Check if column win
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

    // Check if row win
    // (?) switch to using .some() for one line (?)
    for (let i = 0; i < gridSize; i++) {
      // Check each row for win
      if (isRowOfMarker(board[i])) {
        console.log("Row win");
        return true;
      }
    }

    return false;
  }

  function isDraw() {
    // Checks if there is no empty cells left on the board
    for (let i = 0; i < 3; i++) {
      // Check each row to see if empty cells (0's) meaning still no draw
      if (board[i].some((cell) => cell === 0)) return false;
    }
    // Gone through entire board and is completely full
    return true;
  }

  // Play a round aka one marker placed
  function playRound(x, y) {
    // Place current player's marker on board
    if (!placeMarker(x, y)) {
      // Not successful in placing marker
      return false;
    }

    // After placing marker ...
    // Check if there is a win
    if (isWinner()) {
      gameState = "win";
      return;
    }
    // Check if draw where all spaces are filled
    if (isDraw()) {
      gameState = "draw";
      return;
    }

    // Switch to other player if still rounds left to play
    switchPlayer();

    return true;
  }

  // Displays the board as a nested arr in the console
  function displayBoard() {
    return board;
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function getGameState() {
    return gameState;
  }

  return {
    newGame,
    playRound,
    displayBoard,
    getCurrentPlayer,
    getGameState,
  };
})();

// Display the game fom the gameBoard as well as details on player turn and if won/draw.
// Wrap factory inside IIFE (module pattern), single instance
const displayController = (() => {
  let board;
  // Get the underlying console game
  const game = gameController;

  // Get the divs from the html code
  const newGameBtn = document.querySelector(".new-game-btn");
  const scoreDiv = document.querySelector(".score");
  const currentPlayerDiv = document.querySelector(".player-turn");
  const boardContainer = document.querySelector(".board");
  const resultDiv = document.querySelector(".result");

  // Update the board within the .board html element
  function updateScreen() {
    let currentPlayerName = game.getCurrentPlayer().getName();

    // Remove all DOM elements from within the board before create new updated board
    boardContainer.textContent = "";
    // Display the current player's turn
    currentPlayerDiv.textContent = `${currentPlayerName}'s turn`;

    // Display if there is a win/draw after most recent move
    switch (game.getGameState()) {
      case "playing":
        resultDiv.textContent = "";
        break;
      case "win":
        resultDiv.textContent = `${currentPlayerName} has won! :)`;
        break;
      case "draw":
        resultDiv.textContent = "It is a draw.";
        break;
    }

    // Display the board as a grid of buttons
    for (let y = 0; y < gameBoard.getGridSize(); y++) {
      for (let x = 0; x < gameBoard.getGridSize(); x++) {
        // For each cell...

        // Create a button to represent a cell to place a marker in
        const cellButtonEl = document.createElement("button");
        cellButtonEl.classList.add("cell");
        // Add the markers that have currently been placed on the board (otherwise stays empty, repesented as 0 in the console game)
        if (board[y][x]) {
          // if the cell does not contain 0
          cellButtonEl.textContent = board[y][x];
          // When placed marker, ensure added if this marker corresponds to player 1 or 2
          if (board[y][x] === players[0].getMarker()) {
            cellButtonEl.classList.add("player1");
          } else {
            cellButtonEl.classList.add("player2");
          }
        }
        // Add the co-ordinates of each cell button as data attributes
        cellButtonEl.dataset.row = x;
        cellButtonEl.dataset.column = y;

        cellButtonEl.addEventListener("click", () => {
          // Place the current player's marker on that cell of the console
          game.playRound(cellButtonEl.dataset.row, cellButtonEl.dataset.column);

          // Display updated board with the new marker now in the UI
          updateScreen();
        });

        // Add each cell button to a cell in the html grid
        boardContainer.appendChild(cellButtonEl);
      }
    }
  }

  // Add event listener to "NEW GAME" button that displays new board and resets info
  newGameBtn.addEventListener("click", () => {
    board = game.newGame();
    // Display screen contents for first time
    updateScreen();
  });
})();
