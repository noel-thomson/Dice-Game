let gameOn;
let scores;
let activePlayer;
let cardValue;
let cardSrc;

// let cardDisplay;
let suits = ['C', 'D', 'H', 'S'];
let faces = ['J', 'Q', 'K', 'N'];
let drawnCard;
let holdCount;
const cardDisplay = document.querySelector('.card');
const playerOneCards = document.getElementById('drawn-cards-0');
const playerTwoCards = document.getElementById('drawn-cards-1');

// myContainer.insertBefore(myElement, list.firstElementChild); <-- add to beginning
// myContainer.removeChild(myElement); <-- remove specific element
// const replaceMe = document.getElementById('replaceMe'); <-- get element
// myContainer.replaceChild(replaceMe, newElement); <-- replace element with another

init();

function init() {
  gameOn = true;
  scores = [0, 0];
  activePlayer = 0; // used to read score from scores array
  drawnCards = [
    playerOne = [],
    playerTwo = [],
  ];
  holdCount = 0;

  // cardDisplay = document.querySelector('.card');
  // playerOneCards = document.getElementById('drawn-cards-0');
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
  let miniCards = document.getElementsByClassName('drawn-card');
  while (miniCards[0]) {
    miniCards[0].parentNode.removeChild(miniCards[0]);
  }

  while (miniCards[0]) {
    miniCards[0].parentNode.removeChild(miniCards[0]);
  }
}

// draw card
document.querySelector('.btn-draw').addEventListener('click', function () {
  if (gameOn) {
    holdCount = 0;
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

    drawnCard = document.createElement('img');
    playerOneCards.appendChild(drawnCard);

    if (activePlayer === 0) {
      playerOneCards.appendChild(drawnCard);
    } else {
      playerTwoCards.appendChild(drawnCard);
    }

    drawnCard.src = cardSrc;
    drawnCard.classList.add('drawn-card');

    // myContainer.appendChild(myElement); <-- append element
    // const images = document.getElementByClassName('myClass'); <-- obtain els
    // while(images[0]) {
    //     images[0].myContainer.removeChild(images[0]);
    // }​

    if (cardValue === 1 && scores[activePlayer] < 11) {
      cardValue = 11;
    }

    drawnCards[activePlayer].push(cardValue); // push drawn card into arr
    console.log('0: ' + drawnCards[0]);
    console.log('1: ' + drawnCards[1]);
    for (var i = 0; i < drawnCards[activePlayer].length; i++) {
      if (drawnCards[activePlayer][i] === 11) { // if 11 was drawn
        if ((scores[activePlayer] + cardValue) > 21) { // and new score would be bust
          scores[activePlayer] -= 10; // make 11 into 1 (subtract 10 from score)
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
    holdCount++;
    if (holdCount > 2 && (scores[0] > 0 && scores[1] > 0)) {
      if (scores[0] > scores[1]) {
        document.querySelector('#current-' + 0).textContent = 'Winner';
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
      } else if (scores[1] > scores[0]) {
        document.querySelector('#current-' + 1).textContent = 'Winner';
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
      } else if (scores[1] = scores[0]) {
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('#current-' + 0).textContent = 'Draw';
        document.querySelector('#current-' + 1).textContent = 'Draw';
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

// new game
document.querySelector('.btn-new').addEventListener('click', init);
