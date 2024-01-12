function Gameboard() {
  const board = [];

  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i].push(" ");
    }
  }

  const getBoard = () => board;

  const dropToken = (x, y, player) => {
    board[x][y] = player.token;
  };

  const printBoard = () => {
    console.log(board);
  };

  return { getBoard , dropToken, printBoard };
}

function GameController(
  playerOne = "Player X",
  playerTwo = "Player O"
) {
  const board = Gameboard();
  const cell = board.getBoard();
  let moves = 0;
  let winner = false;

  const players = [
    {
      name: playerOne,
      token: "X"
    },
    {
      name: playerTwo,
      token: "O"
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    if (checkWinner() != ' ') return;
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  

  const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
    
      if (cell[i][0] != ' ' && cell[i][0] == cell[i][1] && cell[i][0] == cell[i][2])
      {
        console.log (`${getActivePlayer().name} is the winner`)
        winner = true;
        return getActivePlayer().name
      }

      if (cell[0][i] != ' ' && cell[0][i] == cell[1][i] && cell[0][i] == cell[2][i])
      {
        console.log (`${getActivePlayer().name} is the winner`)
        winner = true;
        return getActivePlayer().name
      }
       
      if (cell[0][0] != ' ' && cell[0][0] == cell[1][1] && cell[0][0] == cell[2][2])
      {
        console.log (`$${getActivePlayer().name} is the winner`)
        winner = true;
        return getActivePlayer().name
      }

      if (cell[0][2] != ' ' && cell[0][2] == cell[1][1] && cell[0][2] == cell[2][0])
      {
        console.log (`${getActivePlayer().name} is the winner`)
        winner = true;
        return getActivePlayer().name
      }
    }

    if (moves == 9 && winner == false) {
      console.log ("It's a tie")
      return 'tie'
    }
    
    return ' '
  }

  const playRound = (x, y) => {
    moves = moves + 1;

    console.log(
      `Dropping ${getActivePlayer().name}'s token into...`
    );
    board.dropToken(x, y , getActivePlayer());
    
    console.log(moves)
    
    
    switchPlayerTurn();
    printNewRound();
  }

  const resetBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        cell[i] = [' ', ' ', ' '];
      }
    }
    activePlayer = players[0];
    moves = 0;
    winner = false;
  }

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    checkWinner,
    resetBoard,
    players
  };
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');
  const winnerDiv = document.querySelector('.winner');
  const tieDiv = document.querySelector('.tie');
  const reset = document.querySelector('.reset');
  const submit = document.querySelector('.submit');
  const playerOne = document.querySelector('.playerOneName');
  const playerTwo = document.querySelector('.playerTwoName');
  const formNames = document.querySelector('.names');

  let winner = false;
  
  const updateScreen = () => {

    boardDiv.textContent = "";
    const checkWinner = game.checkWinner();
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    
    
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`  
    winnerDiv.textContent = `${checkWinner} is the winner`
    tieDiv.textContent = "It's a tie";

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.row = i;
            cellButton.dataset.column = j;
            cellButton.textContent = board[i][j];
            boardDiv.appendChild(cellButton);
          }
        }

        if (checkWinner != " " && checkWinner != 'tie') {
          winner = true;
          winnerDiv.style.display = 'block';
          playerTurnDiv.style.display = 'none';
        }
        
        if (checkWinner == 'tie') {
          tieDiv.style.display = 'block';
          playerTurnDiv.style.display = 'none';
        }

      };

  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;
    if (game.getBoard()[selectedRow][selectedColumn] != " ") return;
    if (winner == true)  return;
    game.playRound(selectedRow, selectedColumn);

    updateScreen();
  }

  function clickReset(e) {
    game.resetBoard();
    winner = false;
    winnerDiv.style.display = 'none';
    tieDiv.style.display = 'none';
    playerTurnDiv.style.display = 'block'
    updateScreen();
  }

  function clickSubmit(e) {
    e.preventDefault();
    game.players[0].name = playerOne.value;
    game.players[1].name = playerTwo.value;
    boardDiv.style.display = 'grid'
    playerTurnDiv.style.display = 'block'
    formNames.style.display = 'none';
    formNames.reset();
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandlerBoard);
  reset.addEventListener("click", clickReset);
  submit.addEventListener("click", clickSubmit);

  updateScreen();
}

ScreenController();