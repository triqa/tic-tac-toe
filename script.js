// Gameboard object
// Single instance: wrap factory func inside IIFE (module pattern)
const gameBoard = (() => {
  let gridSize;
  let grid;

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

    return grid;
  }

  // Get the grid size
  function getGridSize() {
    return gridSize;
  }

  function getBoard() {
    return grid;
  }

  // Return single instance gameBoard obj
  return { newGrid, getGridSize, getBoard };
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
    score++;
  }

  // Reset player's score to 0
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

// gameController
// Single instance: wrap factory func inside IIFE (module pattern)
// Controls the flow of the game
const gameController = (() => {
  let gameState;

  // Current board
  let board;
  let currentPlayer;

  // Create players
  players = [createPlayer("Player 1", "O"), createPlayer("Player 2", "X")];

  function newGame() {
    gameState = "playing";
    // Get a new board with nothing placed
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
    // Get the current player's marker
    let marker = currentPlayer.getMarker();
    // Check if got 3 of the player's marker in a row/column/diagonal
    gridSize = gameBoard.getGridSize();

    // Func to check if all in the row are the same marker
    const isRowOfMarker = (row) => row.every((cell) => cell === marker);

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
      gameState = "win";
      return;
    }

    // Check if draw (all spaces filled)
    if (isDraw()) {
      gameState = "draw";
      return;
    }

    // Switch to other player if still rounds left to play
    switchPlayer();

    // Successfully played a round
    return true;
  }

  // Displays the board as a nested arr ONLY in the CONSOLE
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
    switchPlayer,
    placeMarker,
    playRound,
    displayBoard,
    getCurrentPlayer,
    getGameState,
  };
})();

// DisplayController: single instance
// Display game to the UI
// Wrap factory inside IIFE (module pattern)
const displayController = (() => {
  let board;
  let currentPlayer;

  // Get the game (aka the underlying console game)
  const game = gameController;

  // Get the divs from the html code
  const newGameBtn = document.querySelector(".new-game-btn");
  const scoreDiv = document.querySelector(".score");
  const currentPlayerDiv = document.querySelector(".player-turn");
  const boardContainer = document.querySelector(".board");
  const resultDiv = document.querySelector(".result");

  // Update the board within the .board html element
  function updateBoard() {
    let currentPlayerName = game.getCurrentPlayer().getName();
    // Remove all DOM elements from within the board before create new updated board
    boardContainer.textContent = "";

    currentPlayerDiv.textContent = `${currentPlayerName}'s turn`;

    // Update if there is a win/draw after most recent move
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

        // Create a button
        const cellButtonEl = document.createElement("button");
        cellButtonEl.classList.add("cell");
        // Set the textContent of this cell to the marker if a marker has been placed in this cell (otherwise empty for 0)
        if (board[y][x]) {
          cellButtonEl.textContent = board[y][x];
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
          // Place the current player's marker on that cell of the console board
          game.playRound(cellButtonEl.dataset.row, cellButtonEl.dataset.column);

          updateBoard();
        });

        // Add each cell button to a cell in the html grid
        boardContainer.appendChild(cellButtonEl);
      }
    }
  }

  // Updates the board after each round aka placement of marker
  function updateScreen() {
    // // Get the player turn
    currentPlayer = game.getCurrentPlayer();

    // TODO: display the score of each player

    // Update the .board html div
    updateBoard();
  }
  // Add event listener to "NEW GAME" button that displays new board
  newGameBtn.addEventListener("click", () => {
    // Start new game. We now now have a console board.
    board = game.newGame();
    // Display screen contents for first time
    updateScreen();
  });
})();

/// RUNNING THE GAME ///
displayController;
