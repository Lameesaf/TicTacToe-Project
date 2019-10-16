let AIplayer = '';
let gameFinish = false;
let count = 1;
let choose;
let AIturn = 0;
let playerOneStreak;
let playerTwoStreak;
const audio = document.createElement('audio');
const playerOneScore = document.querySelector('#playerOne p');
const playerTwoScore = document.querySelector('#playerTwo p');
const mainEl = document.querySelector('main');
const square = document.querySelectorAll('.square');
const hrLine = document.createElement('hr');
const nextTurn = document.querySelector('.turn');
nextTurn.innerText = 'X turn';
nextTurn.classList = 'turn x';
const win = document.createElement('div');
win.setAttribute('class', 'win');
win.style.displayArea = 'main';
win.style.visibility = "hidden";
document.querySelectorAll('.row')[1].appendChild(win);
const imageWin = document.createElement('img');
imageWin.style.height='200px';
imageWin.style.width='200px';


// start game function give click Listener to every div
const startGame = function () {
  playerName();
  for (let i = 0; i < square.length; i++) {
    square[i].addEventListener('click', clickSquare);
  }
}
//trigger an alret to take the name of the players 
//and to check if the second player is a computer or not
const playerName = function () {
  const player1 = prompt("Please enter your name", "player1");

  if (player1 != null) {
    document.querySelector('h2').innerText = player1 + ' score';
  } else {
    document.querySelector('h2').innerText = 'Player1 score';
  }

  const player2 = prompt("Please enter your name or com for computer", "com");
  if (player2 != 'com' && player2 != null) {
    document.querySelectorAll('h2')[1].innerText = player2 + ' score';
  }else{
    document.querySelectorAll('h2')[1].innerText = 'AI score';
    AIplayer = 'com';
  }
}

//triggered when one of the player clicked on a box
//check who is turn now and make the move
const clickSquare = function () {
  
  if (AIplayer != 'com') {
    if (count % 2 != 0) {
      this.innerText = 'x';
      this.classList += ' x';
      nextTurn.innerText = 'O turn';
      nextTurn.classList = 'turn o';
      this.removeEventListener('click', clickSquare);
    } else {
      this.classList += ' o';
      this.innerText = 'o';
      nextTurn.innerText = 'X turn';
      nextTurn.classList = 'turn x';
      this.removeEventListener('click', clickSquare);
    }
    checkWinner();
  } else {
    //if it's not the AI turn
    if (AIturn === 0) {
      this.innerText = 'x';
      this.classList += ' x';
      this.removeEventListener('click', clickSquare);
      AIturn = 1;
      //it's a tie no need to go to the AI function
      if (count === 9) {
        checkWinner();
      } else {
        checkWinner();
        //if first player win don't go to the AI function 
        if (gameFinish === false) {
          nextTurn.innerText = 'AI turn';
          nextTurn.classList = 'turn o';
          AI();
        }
      }
    }
  }
}

//ganrate a random number for the AI to play
const AI = function () {
  choose = Math.ceil(Math.random() * 8)
  AImove(square[choose]);
}

// check the div the AI function choose if it's empty play there 
//if there is an X go back to find another empty div 
function AImove(choosenSquare) {

  if (choosenSquare.innerText === 'x' || choosenSquare.innerText === 'o') {
    AI();
  } else {
    setTimeout(() => {
      choosenSquare.classList += ' o';
      choosenSquare.innerText = 'o';
      nextTurn.innerText = 'X turn';
      nextTurn.classList = 'turn x';
      choosenSquare.removeEventListener('click', clickSquare);
      checkWinner();
      AIturn = 0;
    }, 1000);
  }
}
// check if there a winner by checking the rows and columns and diagonals or if its a tie
const checkWinner = function () {

  //check the rows
  for (let i = 0; i < square.length; i = i + 3) {
    let c = 1;
    for (let j = i + 1; j < (i + 3); j++) {
      if (square[i].innerText === square[j].innerText && square[i].innerText != '') {
        ++c;
      }
    }
    if (c === 3) {
      mainEl.classList += ' rowWin';
      square[i].parentElement.appendChild(hrLine);
      nextTurn.style.visibility = 'hidden';

      for (let i = 0; i < square.length; i++) {
        square[i].removeEventListener('click', clickSquare);
      }
      gameFinish = true;
      setTimeout(() => {
        winner();
      }, 1000);
    }
  }
//check the columns
  for (let i = 0; i < 3; i++) {
    let c = 1;
    for (let j = i + 3; j < square.length; j = j + 3) {
      if (square[i].innerText === square[j].innerText && square[i].innerText != '') {
        ++c;
      }

      if (c === 3) {
        mainEl.classList += ' columnWin';
        square[i].appendChild(hrLine);
        nextTurn.style.visibility = 'hidden';
        for (let i = 0; i < square.length; i++) {
          square[i].removeEventListener('click', clickSquare);
        }

        gameFinish = true;
        setTimeout(() => {
          winner();
        }, 1000);
      }
    }
  }
//check diagonals
  if ((square[0].innerText === square[4].innerText && square[0].innerText === square[8].innerText ||
    square[2].innerText === square[4].innerText && square[2].innerText === square[6].innerText) && square[4].innerText != '') {
    if (square[0].innerText === square[4].innerText && square[0].innerText === square[8].innerText) {
      mainEl.classList += ' diagonalWin';
      mainEl.appendChild(hrLine);
      nextTurn.style.visibility = 'hidden';
    } else {
      mainEl.classList += ' diagonalWinReverse';
      mainEl.appendChild(hrLine);
      nextTurn.style.visibility = 'hidden';
    }
    for (let i = 0; i < square.length; i++) {
      square[i].removeEventListener('click', clickSquare);
    }
    gameFinish = true;
    setTimeout(() => {
      winner();
    }, 1000);
  } else {
    if (count === 9) {
      if (gameFinish === false) {
        ++count;
      }
      nextTurn.style.visibility = 'hidden';
      winner();
    }
  }
  if (gameFinish === false) {
    ++count;
  }
}
// announce the winner by hiding the game board and showing the winner 
//and add the score and audio to the winner
const winner = function () {
  if (count === 10) {
    win.innerText = 'Tie';
    audio.setAttribute('src', 'audio/tie.mp3');
    //so the audio will not change
    count = count-1;
  } else {
    if (count % 2 != 0) {
      playerOneScore.innerText = 'win';
      playerTwoScore.innerText = 'lose';
      playerOneStreak = playerOneStreak + 1;
      imageWin.setAttribute('src', 'images/xwin.gif');
      win.appendChild(imageWin);
      localStorage.setItem('playerOneStreak', playerOneStreak);
    } else {
      playerTwoScore.innerText = 'win';
      playerOneScore.innerText = 'lose';
      ++playerTwoStreak;
      if(AIplayer === 'com'){       
      imageWin.setAttribute('src', 'images/AIwin.gif');
      win.appendChild(imageWin);
      }else{
      imageWin.setAttribute('src', 'images/owin.gif');
      win.appendChild(imageWin);
    }}
    audio.setAttribute('src', 'audio/win.mp3');
  }

  if(AIplayer === 'com' && count %2===0){
    audio.setAttribute('src', 'audio/AIwin.wav');
  }
  localStorage.setItem('playerTwoStreak', playerTwoStreak);
  setTimeout(() => {
    playerOneScore.innerText = localStorage.getItem('playerOneStreak');
    playerTwoScore.innerText = localStorage.getItem('playerTwoStreak');
  }, 3000);
  
  mainEl.style.visibility = "hidden";
  win.style.visibility = "visible";
  win.appendChild(audio);
  audio.play();
  reset();
}

//show the game board again after clear it and reset all values
const reset = function () {

  for (let i = 0; i < square.length; i++) {
    square[i].innerText = '';
    square[i].classList.remove('x');
    square[i].classList.remove('o');
  }
  if (mainEl.querySelector('hr')) {
    hrLine.parentElement.removeChild(hrLine);
  }
  mainEl.setAttribute('class', 'gameBoard');
  setTimeout(() => {
    win.style.visibility = "hidden";
    audio.pause();
    mainEl.style.visibility = "visible";
    nextTurn.style.visibility = 'visible';
    startGame();
  }, 3000)

  count = 1;
  AIturn = 0;
  AIplayer = '';
  gameFinish = false;
  nextTurn.innerText = 'X turn';
  nextTurn.classList = 'turn x';
}


// check if the local storge has a previous values or start from 0
if (localStorage.getItem('playerOneStreak')) {
  playerOneStreak = Number(localStorage.getItem('playerOneStreak'));
  playerTwoStreak = Number(localStorage.getItem('playerTwoStreak'));
  playerOneScore.innerText = localStorage.getItem('playerOneStreak');
  playerTwoScore.innerText = localStorage.getItem('playerTwoStreak');
} else {
  playerOneStreak = 0;
  playerTwoStreak = 0;
  playerOneScore.innerText = playerOneStreak;
  playerTwoScore.innerText = playerTwoStreak;
  localStorage.setItem('playerOneStreak', playerOneStreak);
  localStorage.setItem('playerTwoStreak', playerTwoStreak);
}

//cal the function to start the game
startGame();