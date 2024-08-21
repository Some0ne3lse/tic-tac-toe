const board = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
const checkScoreRowOne = ["a1", "a2", "a3"];
const checkScoreRowTwo = ["b1", "b2", "b3"];
const checkScoreRowThree = ["c1", "c2", "c3"];
const checkScoreColumnOne = ["a1", "b1", "c1"];
const checkScoreColumnTwo = ["a2", "b2", "c2"];
const checkScoreColumnThree = ["a3", "b3", "c3"];
const checkScoreAcrossOne = ["a1", "b2", "c3"];
const checkScoreAcrossTwo = ["c1", "b2", "a3"];
let x = ["c3", "a1", "b2"];
let o = [];

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
  console.log("Success");
} else {
  console.log("Not");
}
// console.log(checkScoreRowOne.every((row) => x.includes(row)));
