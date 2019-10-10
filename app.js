let gameOn;
let scores;
let roundScore;
let activePlayer;
let cardValue;
let cardDisplay;
let suits = ['C', 'D', 'H', 'S'];
let faces = ['J', 'Q', 'K', 'N'];
let drawnCards = [
  playerOne = [],
  playerTwo = [],
];

init();

function init() {
  gameOn = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0; // used to read score from scores array
  drawnCards = [
    playerOne = [],
    playerTwo = [],
  ];

  cardDisplay = document.querySelector('.card');
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
}

// draw card
document.querySelector('.btn-draw').addEventListener('click', function () {
  if (gameOn) {
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
      cardDisplay.src = './cards/' + cardValue + suit + '.png';
      cardDisplay.style.display = 'block';
    }

    if (cardValue === 1 && scores[activePlayer] < 11) {
      cardValue = 11;
    }

    drawnCards[activePlayer].push(cardValue);
    console.log('0: ' + drawnCards[0]);
    console.log('1: ' + drawnCards[1]);
    for (var i = 0; i < drawnCards[activePlayer].length; i++) {
      if (drawnCards[activePlayer][i] === 11) { // if 11 was drawn
        if ((scores[activePlayer] + cardValue) > 21) { // if
          scores[activePlayer] -= 10; // subtract 10 from score
        }
      }
    }

    if (scores[activePlayer] + cardValue === 21) {
      scores[activePlayer] += cardValue;
      document.querySelector('#current-' + activePlayer).textContent = 'Winner';
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      gameOn = false;
    } else if (scores[activePlayer] + cardValue > 21) {
      scores[activePlayer] += cardValue;
      document.querySelector('#current-' + activePlayer).textContent = 'Bust';
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      if (activePlayer === 0) {
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('#current-' + 1).textContent = 'Winner';
      } else if (activePlayer === 1) {
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('#current-' + 0).textContent = 'Winner';
      }

      gameOn = false;
    } else if (scores[activePlayer] + cardValue < 21) {
      scores[activePlayer] += cardValue;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    }
  }
});

// hold score
document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gameOn) {
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    if (scores[activePlayer] === 21) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner';
      cardDisplay.style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gameOn = false;
    } else {
      switchPlayer();
    }
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

// new game
document.querySelector('.btn-new').addEventListener('click', init);
