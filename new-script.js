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

  const formItself = document.querySelector("#nameForm");
  formItself.addEventListener("submit", (event) => {
    event.preventDefault();
    playerOne = document.querySelector("#playerOne").value;
    playerTwo = document.querySelector("#playerTwo").value;
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

  return {
    gameBoardArray,
    xChoices,
    oChoices,
    playerOne,
    playerTwo,
    scoreboard,
    makeSelection,
    resetGameBoardArray,
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
      let buttonId = this.id;
      if (isXActive === true) {
        playerButtonPress(buttonId, gameBoard.xChoices, xToken);
        console.log(gameBoard.xChoices);
      } else if (isXActive === false) {
        playerButtonPress(buttonId, gameBoard.oChoices, oToken);
      }
      if (checkForVictory.draw() === true) {
        alert("done");
        gameBoard.resetGameBoardArray();
        disableAllButtons(allSelectButtons);
      } else if (checkForVictory.xWin() === true) {
        alert("xdone");
        disableAllButtons(allSelectButtons);
      } else if (checkForVictory.oWin() === true) {
        alert("odone");
        disableAllButtons(allSelectButtons);
      }
    };
  });

  return { resetIsXActive, resetAllSelectButtons };
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

  let xWin = () => {
    if (
      checkScoreRowOne.every((row) => gameBoard.xChoices.includes(row)) ||
      checkScoreRowTwo.every((row) => gameBoard.xChoices.includes(row)) ||
      checkScoreRowThree.every((row) => gameBoard.xChoices.includes(row)) ||
      checkScoreColumnOne.every((row) => gameBoard.xChoices.includes(row)) ||
      checkScoreColumnTwo.every((row) => gameBoard.xChoices.includes(row)) ||
      checkScoreColumnThree.every((row) => gameBoard.xChoices.includes(row)) ||
      checkScoreAcrossOne.every((row) => gameBoard.xChoices.includes(row)) ||
      checkScoreAcrossTwo.every((row) => gameBoard.xChoices.includes(row))
    ) {
      return true;
    } else {
      return false;
    }
  };

  let oWin = () => {
    if (
      checkScoreRowOne.every((row) => gameBoard.oChoices.includes(row)) ||
      checkScoreRowTwo.every((row) => gameBoard.oChoices.includes(row)) ||
      checkScoreRowThree.every((row) => gameBoard.oChoices.includes(row)) ||
      checkScoreColumnOne.every((row) => gameBoard.oChoices.includes(row)) ||
      checkScoreColumnTwo.every((row) => gameBoard.oChoices.includes(row)) ||
      checkScoreColumnThree.every((row) => gameBoard.oChoices.includes(row)) ||
      checkScoreAcrossOne.every((row) => gameBoard.oChoices.includes(row)) ||
      checkScoreAcrossTwo.every((row) => gameBoard.oChoices.includes(row))
    ) {
      return true;
    } else {
      return false;
    }
  };

  return { draw, xWin, oWin };
})();

const resetActions = (function () {
  const resetGame = () => {
    turns.resetAllSelectButtons();
    gameBoard.resetGameBoardArray();
    console.log(gameBoard.gameBoardArray);
    console.log(gameBoard.xChoices);
    console.log(gameBoard.oChoices);
  };

  const restartButton = document.querySelector("#restartButton");
  restartButton.onclick = function () {
    resetGame();
  };
})();

function testReset() {
  gameBoard.resetGameBoardArray();
  console.log(gameBoard.gameBoardArray); // Check if the array is reset
  console.log(xChoices);
  console.log(oChoices);
}

// Call the test function
