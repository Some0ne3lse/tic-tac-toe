let board = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
let checkScoreRowOne = ["a1", "a2", "a3"];
let checkScoreRowTwo = ["b1", "b2", "b3"];
let checkScoreRowThree = ["c1", "c2", "c3"];

let x = ["a1", "a2", "a3"];
let o = [];

if (
  checkScoreRowOne.every((row) => x.includes(row)) ||
  checkScoreRowTwo.every((row) => x.includes(row)) ||
  checkScoreRowThree.every((row) => x.includes(row))
) {
  console.log("Success");
} else {
  console.log("Not");
}
// console.log(checkScoreRowOne.every((row) => x.includes(row)));
