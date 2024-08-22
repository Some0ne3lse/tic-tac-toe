const gameBoard = (function () {
  let gameBoardArray = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
  const checkScoreRowOne = ["a1", "a2", "a3"];
  const checkScoreRowTwo = ["b1", "b2", "b3"];
  const checkScoreRowThree = ["c1", "c2", "c3"];
  const checkScoreColumnOne = ["a1", "b1", "c1"];
  const checkScoreColumnTwo = ["a2", "b2", "c2"];
  const checkScoreColumnThree = ["a3", "b3", "c3"];
  const checkScoreAcrossOne = ["a1", "b2", "c3"];
  const checkScoreAcrossTwo = ["c1", "b2", "a3"];
  let x = [];
  let o = [];
  const oSelect = (choice) => {
    o.push(choice);
    const index = gameBoardArray.indexOf(choice);
    if (index > -1) {
      gameBoardArray.splice(index, 1);
    }
  };
  const xSelect = (choice) => {
    x.push(choice);
    const index = gameBoardArray.indexOf(choice);
    if (index > -1) {
      gameBoardArray.splice(index, 1);
    }
  };
  const xWin = () => {
    if (
      checkScoreRowOne.every((row) => x.includes(row)) ||
      checkScoreRowTwo.every((row) => x.includes(row)) ||
      checkScoreRowThree.every((row) => x.includes(row)) ||
      checkScoreColumnOne.every((row) => x.includes(row)) ||
      checkScoreColumnTwo.every((row) => x.includes(row)) ||
      checkScoreColumnThree.every((row) => x.includes(row)) ||
      checkScoreAcrossOne.every((row) => x.includes(row)) ||
      checkScoreAcrossTwo.every((row) => x.includes(row))
    ) {
      return true;
    } else {
      return false;
    }
  };
  const oWin = () => {
    if (
      checkScoreRowOne.every((row) => o.includes(row)) ||
      checkScoreRowTwo.every((row) => o.includes(row)) ||
      checkScoreRowThree.every((row) => o.includes(row)) ||
      checkScoreColumnOne.every((row) => o.includes(row)) ||
      checkScoreColumnTwo.every((row) => o.includes(row)) ||
      checkScoreColumnThree.every((row) => o.includes(row)) ||
      checkScoreAcrossOne.every((row) => o.includes(row)) ||
      checkScoreAcrossTwo.every((row) => o.includes(row))
    ) {
      return true;
    } else {
      return false;
    }
  };

  let xAndOReset = () => {
    x = [];
    o = [];
  };
  return {
    gameBoardArray,
    x,
    o,
    oSelect,
    xSelect,
    xWin,
    oWin,
    xAndOReset,
  };
})();

const turns = (function () {
  // let falseXChoice = true;
  let isXActive = true;
  // const xTurn = () => {
  //   let selection = prompt("What does X want to chose?");
  //   if (gameBoard.gameBoardArray.indexOf(selection) !== -1) {
  //     gameBoard.xSelect(selection);
  //     console.log("X chose" + selection);
  //     falseXChoice = false;
  //   } else {
  //     console.log("Invalid x option");
  //     falseXChoice = true;
  //   }
  // };

  const resetForm = (buttonsToRestart) => {
    for (let button in buttonsToRestart) {
      buttonsToRestart[button].textContent = "";
      buttonsToRestart[button].disabled = false;
    }
    gameBoard.xAndOReset();
    isXActive = true;
  };

  const makeButtonX = (buttonId) => {
    const button = document.querySelector(`#${buttonId}`);
    button.textContent = "X";
    gameBoard.xSelect(buttonId);
    button.disabled = true;
    isXActive = false;
    console.log(gameBoard.x);
  };

  const makeButtonO = (buttonId) => {
    const button = document.querySelector(`#${buttonId}`);
    button.textContent = "O";
    gameBoard.oSelect(buttonId);
    button.disabled = true;
    isXActive = true;
    console.log(gameBoard.o);
  };

  const selectButtons = document.querySelectorAll(".select-button");

  for (let button in selectButtons) {
    selectButtons[button].onclick = function () {
      let buttonId = this.id;
      if (isXActive === true) {
        makeButtonX(buttonId);
      } else if (isXActive === false) {
        makeButtonO(buttonId);
      }
      if (gameBoard.xWin() === true) {
        alert("X won the game!");
        resetForm(selectButtons);
      } else if (gameBoard.oWin()) {
        alert("O won the game!");
        resetForm(selectButtons);
      }
    };
  }

  // let falseOChoice = true;
  // const oTurn = () => {
  //   let selection = prompt("What does O want to chose?");
  //   if (gameBoard.gameBoardArray.indexOf(selection) !== -1) {
  //     gameBoard.oSelect(selection);
  //     console.log("O chose" + selection);
  //     falseOChoice = false;
  //   } else {
  //     console.log("Invalid option");
  //     falseOChoice = true;
  //   }
  // };

  // const playRound = () => {
  //   do {
  //     oTurn();
  //     if (gameBoard.oWin() === true) {
  //       console.log("O is the winner!");
  //       return;
  //     }
  //   } while (falseOChoice === true);
  //   do {
  //     xTurn();
  //     if (gameBoard.xWin() === true) {
  //       console.log("X is the winner");
  //       return;
  //     }
  //   } while (falseXChoice === true);
  // };
  // return { playRound };
})();

const playGame = () => {
  while (gameBoard.oWin() === false && gameBoard.xWin() === false) {
    turns.playRound();
  }
};
