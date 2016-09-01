const express = require('express');
const router = express.Router();

const generateCleanBoard = () => {
  return {
    boxes: [0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8],
    isRobotronsMove: false,
    victor: undefined
  }
}

let board = generateCleanBoard();

const isContestantVictorious = (contestant, boxes) => {
  let victoryString = contestant.repeat(3);
  // check rows and columns
  let row0 = boxes.slice(0,3);
  let row1 = boxes.slice(3, 6);
  let row2 = boxes.slice(6, 9);
  let rows = [row0, row1, row2];
  let column0 = [boxes[0], boxes[3], boxes[6]];
  let column1 = [boxes[1], boxes[4], boxes[7]];
  let column2 = [boxes[2], boxes[5], boxes[8]];
  let columns = [column0, column1, column2];
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].join('') === victoryString
       || columns[i].join('') === victoryString) {
         board.victor = contestant;
       }
  }
  // check diagonals
  if (rows[1][1] === contestant) {
    if ((rows[0][0] === contestant && rows[2][2] === contestant)
       || (rows[2][0] === contestant && rows[0][2] === contestant)) {
      board.victor = contestant;
    }
  }

  // check draw
  let isBoardFull = boxes.every(box => {
    return typeof box === 'string';
  });

  if (isBoardFull && !board.victor) {
    board.victor = 'No one';
  }
}

const blockOrKill = (contestant, boxes) => {
  let foe;
  if (contestant === 'humanoid') {
    foe = 'robotron';
  } else {
    foe = 'humanoid';
  }

  let row0 = boxes.slice(0,3);
  let row1 = boxes.slice(3, 6);
  let row2 = boxes.slice(6, 9);
  let rows = [row0, row1, row2];
  let column0 = [boxes[0], boxes[3], boxes[6]];
  let column1 = [boxes[1], boxes[4], boxes[7]];
  let column2 = [boxes[2], boxes[5], boxes[8]];
  let columns = [column0, column1, column2];
  let diagonal1 = [boxes[0], boxes[4], boxes[8]];
  let diagonal2 = [boxes[0], boxes[4], boxes[8]];
  let diagonals = [diagonal1, diagonal2];
  let allPossibilities = [rows, columns, diagonals];

  let indexToClaim = [];
  for (let j = 0; j < allPossibilities.length; j++) {
    allPossibilities[j].forEach(line => {
      let contestantCount;
      if (line.indexOf(foe) === -1) {
        contestantCount = 0;
        for (let q = 0; q < line.length; q++) {
          if (line[q] === contestant) {
            contestantCount++;
          }
        }
        if (contestantCount === 2) {
          for (let z = 0; z < line.length; z++) {
            if (typeof line[z] === 'number') {
              indexToClaim.push(line[z]);
            }
          }
        }
      } else {
        // this line has been blocked already by contestant
      }
    });
  }
  // if more than one line needs to be blocked, the game is lost
  // just block the first line and hope that the humanoid
  // doesn't notice the other
  return indexToClaim[0];
}

const determinePotentialMoves = boxes => {
  let potentialMoves = { toConquer: undefined,
                         toBlock: undefined,
                         centerAvailable: undefined,
                         cornersAvailable: [],
                         sidesAvailable: []
                       };

  potentialMoves.toConquer = blockOrKill('robotron', boxes);
  potentialMoves.toBlock = blockOrKill('humanoid', boxes);

  for (let index = 0; index < boxes.length; index++) {
    const corners = [0, 2, 6, 8];

    if (typeof boxes[index] === 'number') {
      if (index === 4) {
        potentialMoves.centerAvailable = true;
      } else if (corners.indexOf(index) !== -1) {
        potentialMoves.cornersAvailable.push(index);
      } else {
        potentialMoves.sidesAvailable.push(index);
      }
    }
  }

  return potentialMoves;
}

const determineRobotronsMove = boxes => {
  let boxToClaim;

  let unclaimedBoxes = determinePotentialMoves(boxes);

  if (unclaimedBoxes.toConquer) {
    boxToClaim = unclaimedBoxes.toConquer;
  } else if (unclaimedBoxes.toBlock) {
    boxToClaim = unclaimedBoxes.toBlock;
  } else if (unclaimedBoxes.centerAvailable) {
    boxToClaim = 4;
  } else if (unclaimedBoxes.cornersAvailable) {
    let randomCorner = Math.floor(Math.random()*unclaimedBoxes.cornersAvailable.length);
    boxToClaim = unclaimedBoxes.cornersAvailable[randomCorner];
  } else {
    let randomSide = Math.floor(Math.random()*unclaimedBoxes.sidesAvailable.length);
    boxToClaim = unclaimedBoxes.cornersAvailable[randomSide];
  }

  boxes[boxToClaim] = 'robotron';

  return boxes;
}

// ********** helper functions above this line ****************

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', board);
});

// Update board after a move is made
router.post('/', function(req, res, next) {
  if (board.isRobotronsMove) {
    board.boxes = determineRobotronsMove(board.boxes);
    isContestantVictorious('robotron', board.boxes);
    board.isRobotronsMove = false;
  } else {
    board.boxes[req.body.indexClicked] = 'humanoid';
    isContestantVictorious('humanoid', board.boxes);
    board.isRobotronsMove = true;
  }

  res.redirect('/');
});

router.post('/restart-game', function(req, res, next) {
  board = generateCleanBoard();
  res.redirect('/');
});


module.exports = router;
