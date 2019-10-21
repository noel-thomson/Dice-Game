let gameOn; let activePlayer; let scores; let cardValue; let cardSrc;
let drawnCard; let drawnCards; let holdCount; let drawCount;

const suits = ['C', 'D', 'H', 'S'];
const faces = ['J', 'Q', 'K', 'N'];
const cardDisplay = document.querySelector('.card');
const playerOneCards = document.getElementById('drawn-cards-0');
const playerTwoCards = document.getElementById('drawn-cards-1');
const miniCards = document.getElementsByClassName('drawn-card');
const btnNewGame = document.querySelector('.btn-new');
const btnDrawCard = document.querySelector('.btn-draw');
const btnHold = document.querySelector('.btn-hold');
const click = new Audio('./sounds/click.wav');
const drawOne = new Audio('./sounds/draw-one.wav');
const bust = new Audio('./sounds/bust.wav');
const winner = new Audio('./sounds/winner.wav');

btnNewGame.addEventListener('click', init);
btnNewGame.addEventListener('click', playClick);

init();

function init() {
  gameOn = true;
  scores = [0, 0];
  activePlayer = 0;
  drawnCards = [
    playerOne = [],
    playerTwo = [],
  ]; // card values
  holdCount = [0, 0];
  drawCount = [0, 0];

  cardDisplay.style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = 'Player 1';
  document.getElementById('current-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.getElementById('current-0').classList.remove('winner-text');
  document.getElementById('current-1').classList.remove('winner-text');
  document.getElementById('current-0').classList.remove('draw-text');
  document.getElementById('current-1').classList.remove('draw-text');

  while (miniCards[0]) {
    miniCards[0].parentNode.removeChild(miniCards[0]);
  }

}

// draw card
btnDrawCard.addEventListener('click', function () {
  if (gameOn) {
    drawCount[activePlayer]++;
    playDrawOne();

    // determine card value, suit, face
    cardValue = Math.floor(Math.random() * 10) + 1;
    if (cardValue === 10) {
      faceValue = Math.floor(Math.random() * 3) + 1;
      suitValue = Math.floor(Math.random() * 3) + 1;
      face = faces[faceValue];
      suit = suits[suitValue];
      cardDisplay.src = './cards/10' + face + suit + '.png';
      cardDisplay.style.display = 'block';
    } else {
      suitValue = Math.floor(Math.random() * 3) + 1;
      suit = suits[suitValue];
      cardSrc = './cards/' + cardValue + suit + '.png';
      cardDisplay.src = cardSrc;
      cardDisplay.style.display = 'block';
    }

    // create minicard and append
    drawnCard = document.createElement('img');
    if (activePlayer === 0) {
      playerOneCards.appendChild(drawnCard);
    } else {
      playerTwoCards.appendChild(drawnCard);
    }

    drawnCard.src = cardSrc;
    drawnCard.classList.add('drawn-card');

    // determine initial value of an ace
    if (cardValue === 1 && scores[activePlayer] < 11) {
      cardValue = 11;
    }

    // push value of card into arr
    drawnCards[activePlayer].push(cardValue);

    // determine conversion of ace's value
    let index = drawnCards[activePlayer].indexOf(11);
    if (scores[activePlayer] + cardValue > 21 && index !== -1) {
      drawnCards[activePlayer][index] = 1; // turn 11 to 1
      let sum = 0;
      for (var i = 0; i < (drawnCards[activePlayer].length - 1); i++) {
        sum += drawnCards[activePlayer][i];
      }

      scores[activePlayer] = sum; // recalc score minus current cardValue
    }

    console.log('0: ' + drawnCards[0]);
    console.log('1: ' + drawnCards[1]);

    // game logic
    if (scores[activePlayer] + cardValue === 21) {
      scores[activePlayer] += cardValue;
      document.querySelector('#current-' + activePlayer).textContent = 'Winner';
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      gameOn = false;
      playWinner();
      document.querySelector('#current-' + activePlayer).classList.add('winner-text');
    } else if (scores[activePlayer] + cardValue > 21) {
      playBust();
      setTimeout(function () {
        playWinner();
      }, 500);

      scores[activePlayer] += cardValue;
      document.querySelector('#current-' + activePlayer).textContent = 'Bust';
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      if (activePlayer === 0) {
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('#current-' + 1).textContent = 'Winner';
        document.querySelector('#current-' + 1).classList.add('winner-text');
      } else if (activePlayer === 1) {
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('#current-' + 0).textContent = 'Winner';
        document.querySelector('#current-' + 0).classList.add('winner-text');
      }

      gameOn = false;
    } else if (scores[activePlayer] + cardValue < 21) {
      scores[activePlayer] += cardValue;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    }
  }
});

// hold score
btnHold.addEventListener('click', function () {
  if (gameOn) {
    if (drawCount[activePlayer] < 2) {
      playBust();
      return;
    }

    holdCount[activePlayer]++;
    playClick();
    if (holdCount[activePlayer] > 0 && (scores[0] > 0 && scores[1] > 0)) {
      if (scores[0] > scores[1]) {
        playWinner();
        document.querySelector('#current-' + 0).textContent = 'Winner';
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('#current-' + 0).classList.add('winner-text');
      } else if (scores[1] > scores[0]) {
        playWinner();
        document.querySelector('#current-' + 1).textContent = 'Winner';
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('#current-' + 1).classList.add('winner-text');
      } else if (scores[1] = scores[0]) {
        playWinner();
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('#current-' + 0).textContent = 'Draw';
        document.querySelector('#current-' + 1).textContent = 'Draw';
        document.querySelector('#current-' + 0).classList.add('draw-text');
        document.querySelector('#current-' + 1).classList.add('draw-text');
      }

      gameOn = false;
      return;
    }

    switchPlayer();
  }
});

// switch player
function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  cardDisplay.style.display = 'none';
}

function playClick() {
  click.play();
}

function playBust() {
  bust.play();
}

function playDrawOne() {
  drawOne.play();
}

function playWinner() {
  winner.play();
}

// myParent.insertBefore(myElement, myParent.firstElementChild); <-- add to beginning
// myParent.removeChild(myElement); <-- remove specific element
// myParent.replaceChild(replaceMe, newElement); <-- replace element with another
