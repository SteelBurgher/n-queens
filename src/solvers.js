/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({"n": n});
  var index = 0;
  while (index < n){
    board.togglePiece(index, index);
    index ++;
  };
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
  return board.rows();
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = 1;
  while (n > 1){
    solution = solution * n;
    n --;
  }
  return solution
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({"n": n});
  var rowsUsed = {};
  var colsUsed = {};
  var permutationChecker = function(piecesLeft) {
    for(var row = 0; row < n; row++) {
      if(rowsUsed[row] === true){
        continue;
      }
      for(var col = 0; col < n; col++) {
        if (colsUsed[col] === true){
          continue;
        }
        if (board.get(row)[col] === 0) {
          board.togglePiece(row, col);
          rowsUsed[row] = true;
          colsUsed[col] = true;
          if(!board.hasAnyQueenConflictsOn(row, col)) {
            if(piecesLeft - 1 === 0) {
              console.log(board.rows())
              return board.rows();
            }
            else {
              var solution = permutationChecker(piecesLeft - 1);
              console.log(solution)
              if (solution !== false){
                return solution
              }
            }
          }
          rowsUsed[row] = false;
          colsUsed[col] = false;
          board.togglePiece(row, col)   
        }
      }
    }
    return false;
  }
  return permutationChecker(n) || board.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0){
    return 1
  }
  var solutionCount = 0;
  var alreadySeen = {};
  var board = new Board({"n": n});
  var rowsUsed = {};
  var colsUsed = {};
  var majDiagUsed = {};
  var minDiagUsed = {};
  var permutationChecker = function(piecesLeft) {
    for(var row = 0; row < n; row++) {
      if(rowsUsed[row] === true){
        continue;
      }
      for(var col = 0; col < n; col++) {
        if (colsUsed[col] === true){
          continue;
        }
        if (board.get(row)[col] === 0) {
          board.togglePiece(row, col);
          rowsUsed[row] = true;
          colsUsed[col] = true;
          if (alreadySeen[JSON.stringify(board.rows())] === undefined){
            if(!board.hasAnyQueenConflictsOn(row, col)) {
              if(piecesLeft - 1 === 0) {
                  solutionCount += 1;
              }
              else {
                permutationChecker(piecesLeft - 1);
              }   
            alreadySeen[JSON.stringify(board.rows())] = true;
            }
          }
          rowsUsed[row] = false;
          colsUsed[col] = false;
          board.togglePiece(row, col);
        }
      }
    }
  };
  permutationChecker(n);
  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};     

/* w/in recursive:
iterate over all spaces
  if currentSpace is free
    toggle currentSpace
    if board is okay
      if no more recursive calls left to be made
         if solution is unique
           stringify solution and add to object
           increment solutionsCount
      else
          recursively call with one less piece to be placed
    toggle currentSpace off

    f(n) = O(g(n))
    there exists some c and k such that for all n's > k, f(n) <= c(g(n))
    1000n = O(n)
    n^2 + n = O(n^2)
    n^2 + 1000000000000n = O(n^2)
    n^2(n^2) = n^4 = O(n^4)
*/
