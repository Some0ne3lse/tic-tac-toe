const selectPlayer = (function () {
  const formItself = document.querySelector("#nameForm");
  formItself.addEventListener("submit", (event) => {
    event.preventDefault();
    gameBoard.playerOne = document.querySelector("#playerOne").value;
    gameBoard.playerTwo = document.querySelector("#playerTwo").value;
    gameBoard.playerXName.textContent =
      document.querySelector("#playerOne").value;
    gameBoard.playerOName.textContent =
      document.querySelector("#playerTwo").value;
    formItself.reset();
  });
})();

const gameBoard = (function () {
  let initialArray = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
  let gameBoardArray = [...initialArray];
  const checkScoreRowOne = ["a1", "a2", "a3"];
  const checkScoreRowTwo = ["b1", "b2", "b3"];
  const checkScoreRowThree = ["c1", "c2", "c3"];
  const checkScoreColumnOne = ["a1", "b1", "c1"];
  const checkScoreColumnTwo = ["a2", "b2", "c2"];
  const checkScoreColumnThree = ["a3", "b3", "c3"];
  const checkScoreAcrossOne = ["a1", "b2", "c3"];
  const checkScoreAcrossTwo = ["c1", "b2", "a3"];
  let xChoices = [];
  let oChoices = [];
  let playerOne = "X";
  let playerTwo = "O";
  let scoreboard = [];

  function makeSelection(choice, array) {
    array.push(choice);
    const index = gameBoardArray.indexOf(choice);
    if (index > -1) {
      gameBoardArray.splice(index, 1);
    }
  }

  let xWin = () => {
    if (
      checkScoreRowOne.every((row) => xChoices.includes(row)) ||
      checkScoreRowTwo.every((row) => xChoices.includes(row)) ||
      checkScoreRowThree.every((row) => xChoices.includes(row)) ||
      checkScoreColumnOne.every((row) => xChoices.includes(row)) ||
      checkScoreColumnTwo.every((row) => xChoices.includes(row)) ||
      checkScoreColumnThree.every((row) => xChoices.includes(row)) ||
      checkScoreAcrossOne.every((row) => xChoices.includes(row)) ||
      checkScoreAcrossTwo.every((row) => xChoices.includes(row))
    ) {
      return true;
    } else {
      return false;
    }
  };
  let oWin = () => {
    if (
      checkScoreRowOne.every((row) => oChoices.includes(row)) ||
      checkScoreRowTwo.every((row) => oChoices.includes(row)) ||
      checkScoreRowThree.every((row) => oChoices.includes(row)) ||
      checkScoreColumnOne.every((row) => oChoices.includes(row)) ||
      checkScoreColumnTwo.every((row) => oChoices.includes(row)) ||
      checkScoreColumnThree.every((row) => oChoices.includes(row)) ||
      checkScoreAcrossOne.every((row) => oChoices.includes(row)) ||
      checkScoreAcrossTwo.every((row) => oChoices.includes(row))
    ) {
      return true;
    } else {
      return false;
    }
  };

  let draw = () => {
    if (gameBoardArray.length === 0) {
      return true;
    }
  };

  let xAndOReset = (nrOne, nrTwo, array) => {
    nrOne = 0;
    nrTwo = 0;
    array = [...initialArray];
  };

  const playerXName = document.querySelector("#playerX");
  const playerOName = document.querySelector("#playerO");
  playerXName.textContent = playerOne;
  playerOName.textContent = playerTwo;

  const updateScoreboard = () => {
    const scoreboardDiv = document.querySelector("#scoreboard");

    if (scoreboard.length !== 0) {
      scoreboardDiv.replaceChildren();
    }

    for (const winner of scoreboard) {
      const theWinner = document.createElement("p");
      theWinner.classList.add("the-winner");
      theWinner.textContent = winner;
      scoreboardDiv.appendChild(theWinner);
    }
  };

  return {
    gameBoardArray,
    oChoices,
    xChoices,
    xWin,
    oWin,
    draw,
    xAndOReset,
    makeSelection,
    playerOne,
    playerTwo,
    playerXName,
    playerOName,
    scoreboard,
    updateScoreboard,
  };
})();

const turns = (function () {
  let isXActive = true;
  const changeIsXActive = () => {
    isXActive = true;
  };

  function buttonPress(buttonId, array, name) {
    const button = document.querySelector(`#${buttonId}`);
    button.textContent = name;
    gameBoard.makeSelection(buttonId, array);
    button.disabled = true;
    isXActive = !isXActive;
  }

  const winnerText = document.querySelector("#winnerText");

  const selectButtons = document.querySelectorAll(".select-button");

  function disableAllButtons(buttons) {
    buttons.forEach((elem) => {
      elem.disabled = true;
    });
  }

  for (let button in selectButtons) {
    selectButtons[button].onclick = function () {
      let buttonId = this.id;
      console.log(gameBoard.gameBoardArray);
      if (isXActive === true) {
        buttonPress(buttonId, gameBoard.xChoices, "X");
      } else if (isXActive === false) {
        buttonPress(buttonId, gameBoard.oChoices, "O");
      }
      if (gameBoard.xWin() === true) {
        winnerText.textContent = `${gameBoard.playerOne} won the game!`;
        gameBoard.scoreboard.push(gameBoard.playerOne);
        gameBoard.updateScoreboard();
        disableAllButtons(selectButtons);
      } else if (gameBoard.oWin() === true) {
        winnerText.textContent = `${gameBoard.playerTwo} won the game!`;
        gameBoard.scoreboard.push(gameBoard.playerTwo);
        gameBoard.updateScoreboard();
        disableAllButtons(selectButtons);
      } else if (gameBoard.draw() === true) {
        winnerText.textContent = "It's a draw!";
        disableAllButtons(selectButtons);
      }
    };
  }

  return { selectButtons, changeIsXActive, winnerText };
})();

const buttonActions = (function () {
  const resetForm = (buttonsToRestart) => {
    for (let button in buttonsToRestart) {
      buttonsToRestart[button].textContent = "";
      buttonsToRestart[button].disabled = false;
    }
    turns.winnerText.textContent = "";
    gameBoard.xAndOReset(
      gameBoard.xChoices,
      gameBoard.oChoices,
      gameBoard.gameBoardArray
    );
    turns.changeIsXActive();
  };

  const restartButton = document.querySelector("#restartButton");
  restartButton.onclick = function () {
    resetForm(turns.selectButtons);
  };
})();
