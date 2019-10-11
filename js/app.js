let init
let topLeft
let topMiddle;
let topRight
let middleLeft;
let middle;
let bottomLeft;
let bottomMiddle;
let bottomRight;




const win = document.createElement('div')
win.setAttribute('class', 'win')
let count;
const main = document.querySelector('main');

const clickSquare = function () {

  console.log(count)
  if (count % 2 != 0) {
    this.innerHTML = 'x'
  } else {
    this.innerHTML = 'o'
  }



  if (
    topLeft.innerHTML === topMiddle.innerHTML && topLeft.innerHTML === topRight.innerHTML ||
    middleLeft.innerHTML === middle.innerHTML && middleLeft.innerHTML === middleRight.innerHTML ||
    bottomLeft.innerHTML === bottomMiddle.innerHTML && bottomLeft.innerHTML === bottomRight.innerHTML) {
      if(topLeft.innerHTML === topMiddle.innerHTML && topLeft.innerHTML === topRight.innerHTML){
        document.querySelector('main').classList +=' rowWin' 
        document.querySelector('.row').appendChild(document.createElement('hr'))
      }else {
        if(middleLeft.innerHTML === middle.innerHTML && middleLeft.innerHTML === middleRight.innerHTML){
          document.querySelector('main').classList +=' rowWin' 
          document.querySelectorAll('.row')[1].appendChild(document.createElement('hr'))
        }else{
          document.querySelector('main').classList +=' rowWin' 
          document.querySelectorAll('.row')[2].appendChild(document.createElement('hr'))
        }
      }



      console.log('win ')
      setTimeout(()=>{
       --count;
        winner();
       
      },1000000)
  } else {
    
    
    
    
    
    if (
      topLeft.innerHTML === middleLeft.innerHTML && topLeft.innerHTML === bottomLeft.innerHTML ||
      topMiddle.innerHTML === middle.innerHTML && topMiddle.innerHTML === bottomMiddle.innerHTML ||
      topRight.innerHTML === middleRight.innerHTML && topRight.innerHTML === bottomRight.innerHTML) {

        if(topLeft.innerHTML === middleLeft.innerHTML && topLeft.innerHTML === bottomLeft.innerHTML){
          document.querySelector('main').classList +=' diagonalWin' 
          main.appendChild(document.createElement('hr'))
        }else {
          if(topMiddle.innerHTML === middle.innerHTML && topMiddle.innerHTML === bottomMiddle.innerHTML){
            document.querySelector('main').classList +=' diagonalWin' 
            main.appendChild(document.createElement('hr'))
          }else{
            document.querySelector('main').classList +=' diagonalWin' 
            main.appendChild(document.createElement('hr'))
          }
        }
  

        console.log('win ')
        setTimeout(()=>{
         --count;
          winner();
         
        },1000000)

    } else {
      
      
      
      
      if (
        topLeft.innerHTML === middle.innerHTML && topLeft.innerHTML === bottomRight.innerHTML ||
        topRight.innerHTML === middle.innerHTML && topRight.innerHTML === bottomLeft.innerHTML) {

          if(topLeft.innerHTML === middle.innerHTML && topLeft.innerHTML === bottomRight.innerHTML){
           document.querySelector('main').classList +=' diagonalWin' 
           main.appendChild(document.createElement('hr'))
          //  main.insertBefore(document.createElement('hr'), main.childNodes[0])
          }
          else{
            document.querySelector('main').classList +=' diagonalWinReverse' 
           main.appendChild(document.createElement('hr'))
           main.insertBefore(document.createElement('hr'), main.childNodes[0])
          }
        console.log('win ')
        setTimeout(()=>{
         --count;
          winner();
         
        },1000000)
        

      }
       ++count;
    }
  }

if(count ===10){
  winner()
}
}
let playerOneStreak = 0
let playerTwoStreak = 0
const winner = function () {

  if (count === 10) {
      // document.querySelector('#playerOne p').innerHTML = 'win'
      // document.querySelector('#playerTwo p').innerHTML = 'lose'
      // ++playerOneStreak;
      win.innerHTML = 'Tie'
  } else {
    if (count % 2 != 0) {
      document.querySelector('#playerOne p').innerHTML = 'win'
      document.querySelector('#playerTwo p').innerHTML = 'lose'
      ++playerOneStreak;
      win.innerHTML = 'X'



    } else {
      document.querySelector('#playerTwo p').innerHTML = 'win'
      document.querySelector('#playerOne p').innerHTML = 'lose'
      win.innerHTML = 'O'
      ++playerTwoStreak;

    }
  }

  setTimeout(() => {
    document.querySelector('#playerOne p').innerHTML = playerOneStreak;
    document.querySelector('#playerTwo p').innerHTML = playerTwoStreak;
  }, 5000)

  console.log('hi')
  document.body.replaceChild(win, document.querySelector('main'))

  setTimeout(() => {
    document.body.replaceChild(init, win)
    startGame()
  }, 5000)




}

const startGame = function () {
  init = document.querySelector('main').cloneNode(true)

  const square = document.querySelectorAll('.square')
  console.log(square)

  topLeft = document.querySelector('#top-left')
  topMiddle = document.querySelector('#top-middle')
  topRight = document.querySelector('#top-right')
  middleLeft = document.querySelector('#middle-left')
  middle = document.querySelector('#middle')
  middleRight = document.querySelector('#middle-right')
  bottomLeft = document.querySelector('#bottom-left')
  bottomMiddle = document.querySelector('#bottom-middle')
  bottomRight = document.querySelector('#bottom-right')

  for (let i = 0; i < square.length; i++) {
    document.querySelectorAll('.square')[i].addEventListener('click', clickSquare)

  }
  count = 1;
}

startGame();


