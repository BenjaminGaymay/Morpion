var playerID = 0;
var playerSymbol = ["X", "0"];
var isEnd = 0;
var grid = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
var mode;

function startLoad() {
  document.getElementById('gameTable').style.display = 'none';
  document.getElementById('returnMenu').style.display = 'none';
}

function fillCase(caseID) {
  var caseElement = document.getElementById(caseID);

  if (caseElement.innerHTML === "") {
    caseElement.innerHTML = playerSymbol[playerID];
    grid[caseID[0] - 1][caseID[2] - 1] = playerSymbol[playerID];
    return 0
  }
  else {
    if (playerID === 0) {
      playerID = 1;
    }
    else {
      playerID = 0;
    }
    caseElement.style.color = '#ff0000';
    setTimeout(function() {
      caseElement.style.color = '#000000';
    }, 150);
    return 1
  }
}

function setEndColor(pos1, pos2, pos3) {
  document.getElementById(pos1).style.color = 'red';
  document.getElementById(pos2).style.color = 'red';
  document.getElementById(pos3).style.color = 'red';
}

function checkLine() {
  for (var y = 0; y < 3; y++) {
    if (grid[y][0] !== '' && grid[y][0] === grid[y][1] && grid[y][0] === grid[y][2]) {
      setEndColor((y + 1) + '.1', (y + 1) + '.2', (y + 1) + '.3');
      return true;
    }
  }
  return false;
}

function checkCol() {
  for (var x = 0; x < 3; x++) {
    if (grid[0][x] !== '' && grid[0][x] === grid[1][x] && grid[1][x] === grid[2][x]) {
      setEndColor('1.' + (x + 1), '2.' + (x + 1), '3.' + (x + 1));
      return true;
    }
  }
  return false;
}

function checkDiagL() {
  if (grid[0][2] !== '' && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
    setEndColor('1.3', '2.2', '3.1');
    return true;
  }
  return false;
}

function checkDiagR() {
  if (grid[0][0] !== '' && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
    setEndColor('1.1', '2.2', '3.3');
    return true;
  }
  return false;
}

function checkFill() {
  if (grid[0].indexOf('') === -1 && grid[1].indexOf('') === -1 && grid[2].indexOf('') === -1) {
    return true;
  }
  return false;
}

function checkEnd(endMessage) {
  if (checkLine() === false && checkCol() === false && checkDiagR() === false && checkDiagL() == false) {
    if (checkFill() === true) {
      document.getElementById('state').innerHTML = 'Draw !';
      return 1;
    }
    return 0;
  }
  document.getElementById('state').innerHTML = endMessage;
  return 1;
}

function clearGame() {
  isEnd = 0;
  playerID = 0;
  grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  var morpionCases = document.getElementsByClassName('morpionCases');
  for (var i = 0; i < morpionCases.length; i++) {
    morpionCases[i].innerHTML = "";
    morpionCases[i].style.color = "black";
  }
}

function twoPlayerLoop(caseID) {
  if (isEnd !== 0) {
    clearGame();
    document.getElementById('state').innerHTML = 'Player ' + playerSymbol[playerID] + ' turn';
  }
  else {
    fillCase(caseID);
    isEnd = checkEnd('Player ' + playerSymbol[playerID] + ' win !');
    if (isEnd === 0) {
      if (playerID === 0) {
        playerID = 1;
      }
      else {
        playerID = 0;
      }
      document.getElementById('state').innerHTML = 'Player ' + playerSymbol[playerID] + ' turn';
    }
  }
}

function onePlayerLoop(caseID) {
  var aiCaseID = Math.floor((Math.random() * 3) + 1) + '.' + Math.floor((Math.random() * 3) + 1);

  if (isEnd !== 0) {
    clearGame();
    document.getElementById('state').innerHTML = "<br />";
  }
  else {
    if (fillCase(caseID) === 1) {
      return;
    }
    isEnd = checkEnd('You Win !');
    if (isEnd === 0) {
      playerID = 1;
      while (document.getElementById(aiCaseID).innerHTML !== "") {
        aiCaseID = Math.floor((Math.random() * 3) + 1) + '.' + Math.floor((Math.random() * 3) + 1);
      }
      fillCase(aiCaseID);
      isEnd = checkEnd('AI Win !');
    }
  }
}

function doLoop(caseID) {
  if (mode === 'player') {
    twoPlayerLoop(caseID)
  }
  else {
    playerID = 0;
    onePlayerLoop(caseID);
  }
};

function chooseGameMode(gameMode) {
  var array = document.getElementById('gameTable');

  if (gameMode === 'returnMenu') {
    clearGame();
    array.style.display = 'none';
    document.getElementById('chooseMenu').style.display = 'block';
    document.getElementById('returnMenu').style.display = 'none';
  }
  else {
    array.style.display = 'block';
    document.getElementById('chooseMenu').style.display = 'none';
    document.getElementById('returnMenu').style.display = 'block';
  }
  if (gameMode === 'player') {
    document.getElementById('state').innerHTML = "Player X turn"
  }
  else if (gameMode === 'ai') {
    document.getElementById('state').innerHTML = "<br />"
  }
  playerID = 0;
  mode = gameMode;
}
