var gameOn, scores, roundScore, activePlayer, diceValue1, diceValue2, lastRoll;

init();

function init() {
  gameOn = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0; // used to read score from scores array

  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';  document.getElementById('score-0').textContent = '0';
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
    diceValue1 = Math.floor(Math.random() * 6) + 1;
    diceValue2 = Math.floor(Math.random() * 6) + 1;
    console.log("diceValue1: " + diceValue1);
    console.log("diceValue2: " + diceValue2);
    document.querySelector('#dice-1').src = 'dice-' + diceValue1 + '.png';
    document.querySelector('#dice-2').src = 'dice-' + diceValue2 + '.png';
    document.querySelector('#dice-1').style.display = 'block';
    document.querySelector('#dice-2').style.display = 'block';
    if((diceValue1 !== 1 && diceValue2 !== 1) && (diceValue1 + diceValue2 !== 12)) {
      roundScore += diceValue1 + diceValue2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      switchPlayer();
    }
    // if (diceValue === 6 && lastRoll === 6) {
    //   diceValue = 0; // resets lastRoll to zero
    //   switchPlayer();
    // } else if(diceValue !== 1) {
    //   roundScore += diceValue;
    //   document.querySelector('#current-' + activePlayer).textContent = roundScore;
    // } else {
    //   switchPlayer();
    // }
    // lastRoll = diceValue;
  }
});

// hold score
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gameOn) {
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    if(scores[activePlayer] >= document.querySelector('.final-score').value) {
      document.querySelector('#name-' + activePlayer).textContent = "Winner";
      document.querySelector('#dice-1').style.display = 'none';
      document.querySelector('#dice-2').style.display = 'none';      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gameOn = false;
    } else {
      switchPlayer();
    }
  }
});

// new game
document.querySelector('.btn-new').addEventListener('click', init);

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
  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';}
