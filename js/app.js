let pc;
let gameFinish;
let count;
let choose;
let flag = 0
let playerOneStreak
let playerTwoStreak 
const playerOneScore = document.querySelector('#playerOne p')
const playerTwoScore = document.querySelector('#playerTwo p')
const mainEl = document.querySelector('main');
const square = document.querySelectorAll('.square')
const hrLine = document.createElement('hr')
const turn = document.querySelector('.turn')
const win = document.createElement('div')
win.setAttribute('class', 'win')
win.style.displayArea = 'main'
win.style.visibility = "hidden";
document.querySelector('.r2').appendChild(win)


const playerName = function () {
  // const player1 = prompt("Please enter your name", "player1");

  // if (player1 != null) {
  // document.querySelector('h2').innerText = player1 + ' score'
  // } else {
  document.querySelector('h2').innerText = 'Player one score'
  // }

  // const player2 = prompt("Please enter your name or com for computer", "com");
  // if (player2 === 'com') {
  document.querySelectorAll('h2')[1].innerText = 'AI score'
  pc = 'com';
  // }
  // if (player2 != 'com' && player2 != null) {
  // document.querySelectorAll('h2')[1].innerText = player2 + ' score'
  // }
}


const AI = function () {
  choose = Math.ceil(Math.random() * 8)
  AImove(square[choose])
}

function AImove(choosenSquare) {

  if (choosenSquare.innerText === 'x' || choosenSquare.innerText === 'o') {
    AI()
  } else {
    setTimeout(() => {
      choosenSquare.classList += ' o'
      choosenSquare.innerText = 'o'
  turn.innerText= 'X turn'
  turn.classList = 'turn x'

      choosenSquare.removeEventListener('click', clickSquare);
      checkWinner()
      flag = 0
    }, 1000)
  }
}


const clickSquare = function () {



  if (pc != 'com') {
    if (count % 2 != 0) {
      this.innerText = 'x'
      this.classList += ' x'
      turn.innerText= 'O turn'
      turn.classList = 'turn o'
      this.removeEventListener('click', clickSquare)
    } else {
      this.classList += ' o'
      this.innerText = 'o'
      turn.innerText= 'X turn'
      turn.classList = 'turn x'


      this.removeEventListener('click', clickSquare)
    }
    checkWinner()
  } else {
    if (flag === 0) {
      this.innerText = 'x'
      this.classList += ' x'
      this.removeEventListener('click', clickSquare)
      flag = 1
      if (count === 9) {
        checkWinner()
      } else {
        checkWinner()
        if (gameFinish === false) {
          turn.innerText= 'AI turn'
      turn.classList = 'turn o'

          AI()
        }
      }
    }
  }
}

const checkWinner = function () {
  for (let i = 0; i < square.length; i = i + 3) {
    let c = 1
    for (let j = i + 1; j < (i + 3); j++) {
      if (square[i].innerText === square[j].innerText && square[i].innerText != '') {
        ++c
      }
    }
    if (c === 3) {
      mainEl.classList += ' rowWin'
      square[i].parentElement.appendChild(hrLine)
  turn.style.visibility= 'hidden'

      for (let i = 0; i < square.length; i++) {
        square[i].removeEventListener('click', clickSquare)
      }
      gameFinish = true;
      setTimeout(() => {
        winner();
      }, 1000)
    }
  }

  for (let i = 0; i < 3; i++) {
    let c = 1
    for (let j = i + 3; j < square.length; j = j + 3) {
      if (square[i].innerText === square[j].innerText && square[i].innerText != '') {
        ++c
      }

      if (c === 3) {
        mainEl.classList += ' columnWin'
        console.log(i)
        square[i].appendChild(hrLine)
  turn.style.visibility= 'hidden'
        console.log('win c')
        for (let i = 0; i < square.length; i++) {
          square[i].removeEventListener('click', clickSquare)
        }

        gameFinish = true;
        setTimeout(() => {
          winner();
        }, 1000)
      }
    }
  }

  if ((square[0].innerText === square[4].innerText && square[0].innerText === square[8].innerText ||
    square[2].innerText === square[4].innerText && square[2].innerText === square[6].innerText) && square[4].innerText != '') {
    if (square[0].innerText === square[4].innerText && square[0].innerText===square[8].innerText) {
      mainEl.classList += ' diagonalWin'
      mainEl.appendChild(hrLine)
      turn.style.visibility= 'hidden'
    } else {
      mainEl.classList += ' diagonalWinReverse'
      mainEl.appendChild(hrLine)
  turn.style.visibility= 'hidden'
    }
    console.log('win ')
    for (let i = 0; i < square.length; i++) {
      square[i].removeEventListener('click', clickSquare)
    }
    gameFinish = true;
    setTimeout(() => {
      winner();
    }, 1000)
  } else {
    if (count === 9) {
      if (gameFinish === false) {
        ++count;
      }
  turn.style.visibility= 'hidden'

      winner()
    }
  }
  if (gameFinish === false) {
    ++count;
  }
}

const winner = function () {
  if (count === 10) {
    win.innerText = 'Tie'
  } else {
    if (count % 2 != 0) {
      playerOneScore.innerText = 'win';
      playerTwoScore.innerText = 'lose';
      console.log(typeof(playerOneStreak))
      playerOneStreak=playerOneStreak+1;
      win.innerText = 'X wins';
  console.log(playerOneStreak)
      localStorage.setItem('playerOneStreak', playerOneStreak);

    } else {
      playerTwoScore.innerText = 'win';
      playerOneScore.innerText = 'lose';
      win.innerText = 'O wins'
      ++playerTwoStreak;
      localStorage.setItem('playerTwoStreak', playerTwoStreak);
    }
  }
  console.log(playerOneStreak)
  setTimeout(() => {
    playerOneScore.innerText = localStorage.getItem('playerOneStreak');
    playerTwoScore.innerText = localStorage.getItem('playerTwoStreak');
  }, 3000)
  mainEl.style.visibility = "hidden"
  win.style.visibility = "visible"

  for (let i = 0; i < square.length; i++) {
    square[i].innerText = ''
    square[i].classList.remove('x')
    square[i].classList.remove('o')
  }
  if (mainEl.querySelector('hr')) {
    hrLine.parentElement.removeChild(hrLine)
  }
  mainEl.setAttribute('class', 'gameBoard')

  setTimeout(() => {
    win.style.visibility = "hidden"
    mainEl.style.visibility = "visible"
  turn.style.visibility= 'visible'

    startGame()
  }, 3000)
}

const startGame = function () {
console.log(localStorage.getItem('playerOneStreak'))

  count = 1;
  flag = 0
  pc = ''
  gameFinish = false;
  playerName();
  turn.innerText= 'X turn'
  turn.classList = 'turn x'
  for (let i = 0; i < square.length; i++) {
    square[i].addEventListener('click', clickSquare)
  }
}

if (localStorage.getItem('playerOneStreak')) {
  console.log('hi')
  console.log(localStorage.getItem('playerOneStreak'));
  playerOneStreak  = Number(localStorage.getItem('playerOneStreak'));
  playerTwoStreak = Number(localStorage.getItem('playerTwoStreak'));
  playerOneScore.innerText = localStorage.getItem('playerOneStreak');
  playerTwoScore.innerText = localStorage.getItem('playerTwoStreak');
} else {
playerOneStreak = 0
playerTwoStreak = 0
  playerOneScore.innerText = playerOneStreak;
  playerTwoScore.innerText = playerTwoStreak;
  localStorage.setItem('playerOneStreak', playerOneStreak);
  localStorage.setItem('playerTwoStreak', playerTwoStreak);
}
startGame();