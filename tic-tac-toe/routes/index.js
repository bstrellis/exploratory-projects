const express = require('express');
const router = express.Router();

let board = {
  boxes: [undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined],
  isRobotronsMove: false,
  victor: undefined
};

const isHumanoidVictorious = boxes => {
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
    if (rows[i].join('') === 'humanoidhumanoidhumanoid'
       || columns[i].join('') === 'humanoidhumanoidhumanoid') {
         return true;
       }
  }
  // check diagonals
  if (rows[1][1] === 'humanoid') {
    if ((rows[0][0] === 'humanoid' && rows[2][2] === 'humanoid')
       || (rows[2][0] === 'humanoid' && rows[0][2] === 'humanoid')) {
      return true;
    }
  }

  return false;
}

const whereToBlock = boxes => {
  // mark unclaimed boxes with their index so that it can be returned later
  for (let index = 0; index < boxes.length; index++) {
    if (boxes[index] === undefined) {
      boxes[index] = index;
    }
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
      if (line.indexOf('robotron') === -1) {
        let humanoidCount = 0;
        for (let q = 0; q < line.length; q++) {
          if (line[q] === 'humanoid') {
            humanoidCount++;
          }
        }
        if (humanoidCount === 2) {
          for (let z = 0; z < line.length; z++) {
            if (typeof line[z] === 'number') {
              indexToClaim.push(line[z]);
            }
          }
        }
      } else {
        // this line has been blocked already by Robotron
      }
    });
  }
  // if more than one line needs to be blocked, the game is lost
  // just block the first line and hope that the humanoid
  // doesn't notice the other
  return indexToClaim[0];
}

const determinePotentialMoves = boxes => {
  let potentialMoves = { toBlock: undefined,
                         centerAvailable: undefined,
                         cornersAvailable: [],
                         sidesAvailable: []
                       };

  // toBlock

  potentialMoves.toBlock = whereToBlock(boxes);
  for (let index = 0; index < boxes.length; index++) {
    const corners = [0, 2, 6, 8];
    if (!boxes[index]) {
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

  if (unclaimedBoxes.toBlock) {
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
  let humanoidIsVictorious;
  if (board.isRobotronsMove) {
    board.boxes = determineRobotronsMove(board.boxes);
    board.isRobotronsMove = false;
  } else {
    board.boxes[req.body.indexClicked] = 'humanoid';
    humanoidIsVictorious = isHumanoidVictorious(board.boxes);
    board.isRobotronsMove = true;
  }
  let routeRequired = humanoidIsVictorious ? '/victory' : '/';

  res.redirect(routeRequired);
});

module.exports = router;

// TODO THIS COMMIT
/*
ALL JS IN ES6 THROUGHOUT - no var at all!
*****
MAKE IT FUCKING RESET???
determine robotron's move
detects end of game and determines champion
finalize css
*/
