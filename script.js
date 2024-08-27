const gameBoard = (function () {
  let initialArray = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
  let gameBoardArray = [...initialArray];
  let xChoices = [];
  let oChoices = [];
  let playerOne = "X";
  let playerTwo = "O";
  let scoreboard = [];

  const playerXName = document.querySelector("#playerX");
  const playerOName = document.querySelector("#playerO");
  playerXName.textContent = playerOne;
  playerOName.textContent = playerTwo;

  const getPlayerOne = () => playerOne;
  const getPlayerTwo = () => playerTwo;

  const formItself = document.querySelector("#nameForm");
  formItself.addEventListener("submit", (event) => {
    event.preventDefault();
    playerOne = document.querySelector("#playerOneForm").value;
    playerTwo = document.querySelector("#playerTwoForm").value;
    playerXName.textContent = playerOne;
    playerOName.textContent = playerTwo;
    formItself.reset();
  });

  const makeSelection = (choice, array) => {
    array.push(choice);
    const index = gameBoardArray.indexOf(choice);
    if (index > -1) {
      gameBoardArray.splice(index, 1);
    }
  };

  const resetGameBoardArray = () => {
    gameBoardArray.length = 0;
    xChoices.length = 0;
    oChoices.length = 0;
    gameBoardArray.push(...initialArray);
  };

  const updateScoreboard = () => {
    const scoreboardDiv = document.querySelector("#scoreboard");

    if (scoreboard.length !== 0) {
      scoreboardDiv.replaceChildren();
    }

    const counts = {};
    scoreboard.forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
    });

    for (const [key, value] of Object.entries(counts)) {
      const theWinner = document.createElement("p");
      theWinner.classList.add("the-winner");
      theWinner.textContent = `${key}: ${value}`;
      scoreboardDiv.appendChild(theWinner);
    }
  };

  return {
    gameBoardArray,
    xChoices,
    oChoices,
    getPlayerOne,
    getPlayerTwo,
    scoreboard,
    makeSelection,
    resetGameBoardArray,
    updateScoreboard,
  };
})();

const turns = (function () {
  let isXActive = true;
  const changeIsXActive = () => {
    isXActive = !isXActive;
  };

  const resetIsXActive = () => {
    isXActive = true;
  };

  const showCurrentStarter = () => {
    const currentStarter = document.querySelector("#currentStarter");
    if (isXActive === true) {
      currentStarter.textContent = "X";
    } else {
      currentStarter.textContent = "O";
    }
  };

  showCurrentStarter();

  const changeCurrentStarter = document.querySelector("#changeCurrentStarter");
  changeCurrentStarter.onclick = () => {
    changeIsXActive();
    showCurrentStarter();
  };

  const disableAllButtons = (buttons) => {
    buttons.forEach((elem) => {
      elem.disabled = true;
    });
  };

  const playerButtonPress = (buttonId, array, playerToken) => {
    const button = document.querySelector(`#${buttonId}`);
    button.textContent = playerToken;
    gameBoard.makeSelection(buttonId, array);
    button.disabled = true;
    changeIsXActive();
  };

  const allSelectButtons = document.querySelectorAll(".select-button");

  const winnerText = document.querySelector("#winnerText");

  const resetAllSelectButtons = () => {
    allSelectButtons.forEach((elem) => {
      elem.textContent = "";
      elem.disabled = false;
    });
  };

  allSelectButtons.forEach((elem) => {
    const xToken = "X";
    const oToken = "O";
    elem.onclick = function () {
      changeCurrentStarter.disabled = true;
      let buttonId = this.id;
      if (isXActive === true) {
        playerButtonPress(buttonId, gameBoard.xChoices, xToken);
      } else if (isXActive === false) {
        playerButtonPress(buttonId, gameBoard.oChoices, oToken);
      }
      if (checkForVictory.checkForWinner(gameBoard.xChoices) === true) {
        winnerText.textContent = `${gameBoard.getPlayerOne()} won the game!`;
        gameBoard.scoreboard.push(gameBoard.getPlayerOne());
        gameBoard.updateScoreboard();
        disableAllButtons(allSelectButtons);
      } else if (checkForVictory.checkForWinner(gameBoard.oChoices) === true) {
        winnerText.textContent = `${gameBoard.getPlayerTwo()} won the game!`;
        gameBoard.scoreboard.push(gameBoard.getPlayerTwo());
        gameBoard.updateScoreboard();
        disableAllButtons(allSelectButtons);
      } else if (checkForVictory.draw() === true) {
        winnerText.textContent = "It's a draw!";
        disableAllButtons(allSelectButtons);
      }
    };
  });

  return {
    resetIsXActive,
    resetAllSelectButtons,
    showCurrentStarter,
    changeCurrentStarter,
  };
})();

const checkForVictory = (function () {
  const checkScoreRowOne = ["a1", "a2", "a3"];
  const checkScoreRowTwo = ["b1", "b2", "b3"];
  const checkScoreRowThree = ["c1", "c2", "c3"];
  const checkScoreColumnOne = ["a1", "b1", "c1"];
  const checkScoreColumnTwo = ["a2", "b2", "c2"];
  const checkScoreColumnThree = ["a3", "b3", "c3"];
  const checkScoreAcrossOne = ["a1", "b2", "c3"];
  const checkScoreAcrossTwo = ["c1", "b2", "a3"];

  let draw = () => {
    if (gameBoard.gameBoardArray.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const checkForWinner = (player) => {
    if (
      checkScoreRowOne.every((row) => player.includes(row)) ||
      checkScoreRowTwo.every((row) => player.includes(row)) ||
      checkScoreRowThree.every((row) => player.includes(row)) ||
      checkScoreColumnOne.every((row) => player.includes(row)) ||
      checkScoreColumnTwo.every((row) => player.includes(row)) ||
      checkScoreColumnThree.every((row) => player.includes(row)) ||
      checkScoreAcrossOne.every((row) => player.includes(row)) ||
      checkScoreAcrossTwo.every((row) => player.includes(row))
    ) {
      return true;
    } else {
      return false;
    }
  };

  return { draw, checkForWinner };
})();

const resetActions = (function () {
  const resetGame = () => {
    turns.resetAllSelectButtons();
    turns.resetIsXActive();
    turns.showCurrentStarter();
    turns.changeCurrentStarter.disabled = false;
    gameBoard.resetGameBoardArray();
  };

  const restartButton = document.querySelector("#restartButton");
  restartButton.onclick = function () {
    resetGame();
  };
})();
