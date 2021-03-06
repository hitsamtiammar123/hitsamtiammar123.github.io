(function(){
  var board = document.getElementById('board');
  var gridNum = document.getElementById('grid-num');
  var start = document.getElementById('start');
  var infoText = document.getElementById('info-text');
  var boardChild = document.getElementById('board-child');
  var isPlayerTurn = true;
  var isStart = false;
  var screenWidth = window.innerWidth;
  var validationDirection = [
    'ROW',
    'COLUMN',
    'DIAGONAL_LEFT',
    'DIAGONAL_RIGHT'
  ];

  var dummyBoard = [
    ['X', 'O', 'X'],
    ['O', 'O', 'X'],
    ['', 'X', 'O']
  ];

  function makeGrid(gridNum){
    var result = [];
    for(var i = 0 ; i < gridNum; i++){
      var r = [];
      for(var j = 0; j < gridNum; j++){
        r.push('');
      }
      result.push(r);
    }
    return result;
  }

  function copyGrid(grid){
    var result = [];
    for(var i = 0; i < grid.length; i++){
      var g = grid[i];
      var r = [];
      for(var j = 0; j < g.length; j++){
        r.push(g[j]);
      }
      result.push(r);
    }
    return result;
  }

  function findEmptySpaces(grid){
    var result = [];
    for(var i = 0; i < grid.length; i++){
      var g = grid[i];
      for(var j = 0; j < g.length; j++){
        var v = g[j];
        if(v === ''){
          result.push({
            i: i,
            j: j
          });
        }
      }
    }
    return result;
  }

  function minimax(grid, flag, pos){
    var emptySpaces = findEmptySpaces(grid);
    var curr = {
      parent: grid,
      val: 0,
      i: -1,
      j: -1
    };
    var char;
    var currVal;
    if(flag){
      char = 'O';
      currVal = -Infinity
    }
    else{
      char = 'X';
      currVal = Infinity;
    }
    var condition, copy;
    for(var i = 0; i < emptySpaces.length; i++){
      var empty = emptySpaces[i];
      copy = copyGrid(grid);
      copy[empty.i][empty.j] = char;
      condition = checkCondition(copy, null, empty, !flag);
      if(condition === null){
        var temp = minimax(copy, !flag, empty);
        if(flag){
          if(temp.val > currVal){
            currVal = temp.val;
          }
        }
        else{
          if(temp.val < currVal){
            currVal = temp.val
          }
        }
        curr.val = temp.val;
        curr.i = empty.i;
        curr.j = empty.j;
      }
      else{
        if(condition === 'OPPONENT_WIN'){
          curr.val = 1;
        }
        else if(condition === 'PLAYER_WIN'){
          curr.val = -1;
        }
        curr.i = empty.i;
        curr.j = empty.j;
        break;
      }
    }

    if(emptySpaces.length === 0){
      condition = checkCondition(grid, null, pos, flag);
      if(condition !== null){
        if(condition === 'PLAYER_WIN'){
          curr.val = -1;
        }
        else if(condition === 'OPPONENT_WIN'){
          curr.val = 1;
        }
      }
      curr.i = pos.i;
      curr.j = pos.j;
    }
    return curr;
  }

  function findBestMove(grid){
    var emptySpaces = findEmptySpaces(grid);
    if(emptySpaces.length !== 0){
      if(grid.length === 3){
        var result = minimax(grid, true, null);
        return result;
      }
      else{
        var selectedIndex = Math.floor(Math.random() * emptySpaces.length);
        var selected = emptySpaces[selectedIndex];
        return selected;
      }
    }
    return {
      i: -1,
      j: -1,
      parent: grid
    }
  }

  function setChar(self, context, pos, flag){
    if(flag === true){
      self.innerHTML = 'X';
      self.classList.add('X-char');
      context.grid[pos.i][pos.j] = 'X';
    }
    else if(flag === false){k
      self.innerHTML = 'O';
      self.classList.add('O-char');
      context.grid[pos.i][pos.j] = 'O';
    }
  }

  function setInfoText(flag){
    if(flag){
      infoText.innerHTML = 'Your Turn';
      infoText.className = 'green-text mt-2';
    }
    else{
      infoText.innerHTML = 'Opponent Turn';
      infoText.className = 'red-text mt-2';
    }
  }

  function checkPositionDirection(i, j, direction, flag){
    if(direction === 'ROW'){
      if(flag === 0){
        nextI = i - 1;
      }
      else if(flag === 1){
        nextI = i + 1;
      }
      nextJ = j;
    }
    else if(direction === 'COLUMN'){
      if(flag === 0){
        nextJ = j - 1;
      }
      else if(flag === 1){
        nextJ = j + 1;
      }
      nextI = i;
    }
    else if(direction === 'DIAGONAL_LEFT'){
      if(flag === 0){
        nextI = i - 1;
        nextJ = j - 1;
      }
      else if(flag === 1){
        nextI = i + 1;
        nextJ = j + 1;
      }
    }
    else if(direction === 'DIAGONAL_RIGHT'){
      if(flag === 0){
        nextI = i - 1;
        nextJ = j + 1;
      }
      else if(flag === 1){
        nextI = i + 1;
        nextJ = j - 1
      }
    }
    return {
      i: nextI,
      j: nextJ
    };
  }

  function checkGridRecursively(grid, i, j, flag, direction, saved_directions, isPlayerTurn){
    //console.log(grid, i, j, flag, direction)
    //console.log('condition',i >= 0 && i < gridNum && j >= 0 && j < gridNum)
    if(i >= 0 && i < grid.length && j >= 0 && j < grid.length){
      saved_directions.push({i:i, j:j});
      var g = grid[i][j];

      if(isPlayerTurn){
        if(g === 'X'){
          counter = 1;
        }
        else{
          counter = 0;
        }
      }
      else{
        if(g === 'O'){
          counter = 1;
        }
        else{
          counter = 0;
        }
      }

      var nextI, nextJ, counter;
      var nextDirection = checkPositionDirection(i, j, direction, flag);
      nextI = nextDirection.i;
      nextJ = nextDirection.j;
      
     return counter + checkGridRecursively(grid, nextI, nextJ, flag, direction, saved_directions, isPlayerTurn);
    }
    return 0;
  }

  function checkCondition(grid, nodeList, pos, flag){
    for(var i = 0; i < validationDirection.length; i++){
      var saved_directions = [];
      var direction = validationDirection[i];
      var counterList = 1;
      saved_directions.push(pos);
      for(var j = 0; j < 2; j++){
        var nextDir = checkPositionDirection(pos.i, pos.j, direction, j);
        counterList += checkGridRecursively(grid, nextDir.i, nextDir.j, j, direction, saved_directions, flag);
      }
      //console.log({counterList, isPlayerTurn, pos, direction});
      if(counterList === grid.length){
        for(var i = 0; i < saved_directions.length && nodeList !== null;i++){
          var dir = saved_directions[i];
          var node = nodeList[dir.i][dir.j];
          node.classList.add('win-char');
        }
        //console.log({direction});
        if(isPlayerTurn){
          return 'PLAYER_WIN';
        }
        else{
          return 'OPPONENT_WIN';
        }
      }
    }
    return null;
  }

  function onGridClick(context){
    return function(){
      var emptySpaces = findEmptySpaces(context.grid);
      //console.log(emptySpaces, 'player');
      var grid = context.grid;
      var nodeList = context.nodeList;
      var i = context.i;
      var j = context.j;
      if(isPlayerTurn && grid[i][j] === ''){
        var self = context.node;
        var pos = {
          i: context.i,
          j: context.j
        }
        setChar(self, context, pos, true);
        var status = checkCondition(grid, nodeList, pos, true);
        //console.log({status, isPlayerTurn});
        if(status === null){
          isPlayerTurn = false;
          setInfoText(false);
          setTimeout(function(){
            onOpponentTurn(context);
          },500);
        }
        else if(status === 'PLAYER_WIN'){
          setTimeout(function(){
            gameOver(status);
          }, 500);
        }
      }
    }
  }

  function onOpponentTurn(context){
    var nodeList = context.nodeList;
    var grid = context.grid;
    var node;
    var emptySpaces = findEmptySpaces(grid);
    var bestMove = findBestMove(grid);
    // console.log(emptySpaces, grid);
    if(bestMove.i !== -1 && bestMove.j !== -1){
      var pos = {
        i: bestMove.i,
        j: bestMove.j
      };
      //console.log({selected})
      node = nodeList[pos.i][pos.j];
      setChar(node, context, pos, false);
      var status = checkCondition(grid, nodeList, pos, false);
      emptySpaces = findEmptySpaces(grid);
      //console.log({status, isPlayerTurn});
      if(status === null && emptySpaces.length !== 0){
        isPlayerTurn = true;
        setInfoText(true);
      }
      else{
        setTimeout(function(){
          gameOver(status);
        }, 500);
      }
    }
    else{
      if(emptySpaces.length === 1){
        var pos = emptySpaces[0];
        node = nodeList[pos.i][pos.j];
        setChar(node, context, pos, false);
      }
      setTimeout(function(){
        gameOver('DRAW');
      }, 500);
    }
  }

  function makeBoard(gridNum){
    if(typeof gridNum !== 'number' || gridNum < 3 || gridNum > 100){
      alert('Grid Num is not valid');
      return;
    }
    var grid = makeGrid(gridNum);
    //var grid = copyGrid(dummyBoard);
    var nodeList = [];
    var limitWidth = gridNum * 100;
    for(var i = 0; i < gridNum; i++){
      var r = document.createElement('div');
      var n = [];
      r.className = 'content d-flex';
      if(limitWidth < screenWidth){
        r.className += ' justify-content-center';
      }
      for(var j = 0 ; j < gridNum; j++){
        var c = document.createElement('div');
        c.className = 'grid d-flex justify-content-center align-items-center';
        if(i === 0) {
          c.className += ' border-top-none';
        }
        if(j === 0){
          c.className += ' border-left-none';
        }
        if(j === gridNum - 1){
          c.className += ' border-right-none';
        }
        if(i === gridNum - 1){
          c.className += ' border-bottom-none';
        }
        var context = {
          i: i,
          j: j,
          grid: grid,
          node: c,
          nodeList: nodeList
        };
        c.addEventListener('click', onGridClick(context));
        c.innerHTML = grid[i][j];
        r.appendChild(c);
        n.push(c);
      }
      nodeList.push(n);
      boardChild.appendChild(r)
    }
  }

  function startGame(){
    boardChild.innerHTML = '';
    setInfoText(true); 
    var num = parseInt(gridNum.value);
    makeBoard(num);
    isStart = true;
    isPlayerTurn = true;
  }

  function gameOver(status){
    var c;
    infoText.innerHTML = '';
    switch(status){
      case 'DRAW':
      case null:
        c = confirm('Game is draw. do you want to restart the game?');
      break;
      case 'PLAYER_WIN':
        c = confirm('You win. do you want to restart the game?');
      break;
      case 'OPPONENT_WIN':
        c = confirm('You lose. do you want to restart the game?');
      break;
    }
    if(c){
      startGame();
    }
  }

  start.addEventListener('click',function(){
    if(!isStart){
      startGame();
    }
    else{
      var c = confirm('Are you sure want to restart the game?');
      if(c){
        startGame();
      }
    }
  })

})();