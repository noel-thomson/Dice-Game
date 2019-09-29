var gameOn, scores, roundScore, activePlayer, diceValue, diceDisplay;
diceDisplay = document.querySelector('.dice');

init();

function init() {
  gameOn = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0; // used to read score from scores array

  diceDisplay.style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

// roll dice
document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gameOn) {
    diceValue = Math.floor(Math.random() * 6) + 1;
    diceDisplay.src = 'dice-' + diceValue + '.png';
    diceDisplay.style.display = 'block';
    if(diceValue !== 1) {
      roundScore += diceValue;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      switchPlayer();
    }
  }
});

// hold score
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gameOn) {
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    if(scores[activePlayer] > 20) {
      document.querySelector('#name-' + activePlayer).textContent = "Winner";
      diceDisplay.style.display = 'none';
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
  roundScore = 0;
  document.querySelector('#current-' + activePlayer).textContent = roundScore;
  if(activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  diceDisplay.style.display = 'none';
}

// new game
document.querySelector('.btn-new').addEventListener('click', init);
