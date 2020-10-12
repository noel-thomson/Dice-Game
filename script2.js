let gameOn; let activePlayer; let scores; let cardValue; let card_id; let cardSrc; let drawnCard; 
let drawnCards; let holdCount; let drawCount; let cards; let deal; let dealing; let hiddenCardSrc;

const cardDisplay = document.querySelector('.card');
const miniCards = document.getElementsByClassName('drawn-card');
const click = new Audio('./sounds/click.wav');
const drawOne = new Audio('./sounds/draw-one.wav');
const bust = new Audio('./sounds/bust.wav');
const winner = new Audio('./sounds/winner.wav');

init();

function init() {
  deal = true;
  gameOn = true;
  activePlayer = 0;
  scores = [0, 0];
  cardValue = 0;
  cardSrc = "";
  drawnCards = [
    (playerOne = []), // cardValue(s)
    (playerTwo = []) // cardValue(s)
  ];
  holdCount = [0, 0];
  drawCount = [0, 0];
  cards = [
    "1C", "1D", "1H", "1S", "2C", "2D", "2H", "2S", "3C", "3D", "3H", "3S", "4C", "4D", "4H", "4S", 
    "5C", "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S", "8C", "8D", "8H", "8S", 
    "9C", "9D", "9H", "9S", "10NC", "10ND", "10NH", "10NS", "10JC", "10JD", "10JH", "10JS", 
    "10QC", "10QD", "10QH", "10QS", "10KC", "10KD", "10KH", "10KS"
  ];
  resetDom();
}

document.querySelector('.btn-new').addEventListener('click', function () {
  if (deal) {
    playClick();
    init();
    deal = false;
    dealing = true;
    setTimeout(drawCard, 25); // player card 1
    setTimeout(switchPlayer, 750); 
    setTimeout(dealerFirstDraw, 775); // dealer card 1 (hidden)
    setTimeout(switchPlayer, 1500); 
    setTimeout(drawCard, 1525); // player card 2
    if (scores[0] < 21) {
      setTimeout(switchPlayer, 2250);
      setTimeout(drawCard, 2275); // dealer card 2 
      setTimeout(setupFirstTurn, 3000); // switch to player
    }
  } else {
    playBust();
  }
});

document.querySelector(".btn-draw").addEventListener("click", function() {
  if (gameOn) {
    if (deal || dealing) {
      playBust();
      return;
    }
    drawCard();
  } else {
    playWinner();
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gameOn) {
    if (deal || dealing) {
      playBust();
      return;
    } else if (scores[1] <= 16) {
      playClick();
      displayHiddenMiniCard();
      revealScore();
      switchPlayer();
      autoDraw();
      if (drawnCards[1].indexOf(11) === 0 || drawnCards[1].indexOf(11) === 1) {
        switchDealerAce();
        autoDraw();
      }
    } else if (activePlayer === 0 && scores[1] >= 17) {
      displayHiddenMiniCard();
      revealScore();
      if (drawnCards[1].indexOf(11) === 0 || drawnCards[1].indexOf(11) === 1) {
        switchDealerAce();
        autoDraw();
      }
      determineWinner();
    }
  }
});

function resetDom() {
  cardDisplay.style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "Player 1";
  document.getElementById("current-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.getElementById("current-0").classList.remove("winner-text");
  document.getElementById("current-1").classList.remove("winner-text");
  document.getElementById("current-0").classList.remove("draw-text");
  document.getElementById("current-1").classList.remove("draw-text");
  while (miniCards[0]) {
    miniCards[0].parentNode.removeChild(miniCards[0]);
  }
}

function drawCard() {
  drawCount[activePlayer]++;
  determineCard();
  showDealtCard(card_id); // (show back)
  appendMiniCard(cardSrc); // (show back)
  initialAceValue(cardValue); // determine initial ace value
  drawnCards[activePlayer].push(cardValue); // push cardValue into arr
  determineAceConversion(cardValue); // determine if ace value should change
  gameLogic(cardValue, scores); // (hide score)
  printScore(scores);
  if (scores[0] >= 21) {
    displayHiddenMiniCard(hiddenCardSrc);
    revealScore(scores);
  }
  if (scores[0] < 21 && scores[1] < 21) {
    playDrawOne();
  }
  console.log(cardValue);
  console.log("0: " + drawnCards[0]);
  console.log("1: " + drawnCards[1]);
  console.log(card_id);
  console.log(cardSrc);
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  cardDisplay.style.display = "none";
}

function dealerFirstDraw() {
  drawCount[activePlayer]++;
  determineCard();
  hideDealtCard(card_id); // card back
  appendHiddenMiniCard(); // card back
  initialAceValue(cardValue); // determine initial ace value
  drawnCards[activePlayer].push(cardValue); // push cardValue into arr
  determineAceConversion(cardValue); // determine if ace value should change
  gameLogic(cardValue, scores);
  document.querySelector("#score-1").textContent = " ";
  if (scores[0] < 21 && scores[1] < 21) {
    playDrawOne();
  }
  console.log(cardValue);
  console.log("0: " + drawnCards[0]);
  console.log("1: " + drawnCards[1]);
  console.log(card_id);
  console.log(hiddenCardSrc);
  //   console.log(cards);
}

// function dealerSecondDraw() {
//   drawCount[activePlayer]++;
//   determineCard();
//   showDealtCard(card_id);
//   appendMiniCard(cardSrc);
//   initialAceValue(cardValue); // determine initial ace value
//   drawnCards[activePlayer].push(cardValue); // push cardValue into arr
//   determineAceConversion(cardValue); // determine if ace value should change
//   gameLogic(cardValue, scores);
//   if (scores[1] === 21) {
//     displayHiddenMiniCard();
//   }
//   //   printScore(scores); // exclude
//   if (scores[0] < 21 && scores[1] < 21) {
//     playDrawOne();
//   }
//   console.log(cardValue);
//   console.log("0: " + drawnCards[0]);
//   console.log("1: " + drawnCards[1]);
//   console.log(card_id);
//   console.log(cardSrc);
// }

function setupFirstTurn() {
  if (scores[activePlayer] < 21) {
    switchPlayer();
    playClick();
    dealing = false;
  }
}

function determineCard() {
  num = Math.floor(Math.random() * 52) + 1;
  if (num < 5) {
    cardValue = 1;
    card_id = num === 1 ? "1C" : num === 2 ? "1D" : num === 3 ? "1H" : "1S";
  } else if (num > 4 && num < 9) {
    cardValue = 2;
    card_id = num === 5 ? "2C" : num === 6 ? "2D" : num === 7 ? "2H" : "2S";
  } else if (num > 8 && num < 13) {
    cardValue = 3;
    card_id = num === 9 ? "3C" : num === 10 ? "3D" : num === 11 ? "3H" : "3S";
  } else if (num > 12 && num < 17) {
    cardValue = 4;
    card_id = num === 13 ? "4C" : num === 14 ? "4D" : num === 15 ? "4H" : "4S";
  } else if (num > 16 && num < 21) {
    cardValue = 5;
    card_id = num === 17 ? "5C" : num === 18 ? "5D" : num === 19 ? "5H" : "5S";
  } else if (num > 20 && num < 25) {
    cardValue = 6;
    card_id = num === 21 ? "6C" : num === 22 ? "6D" : num === 23 ? "6H" : "6S";
  } else if (num > 24 && num < 29) {
    cardValue = 7;
    card_id = num === 25 ? "7C" : num === 26 ? "7D" : num === 27 ? "7H" : "7S";
  } else if (num > 28 && num < 33) {
    cardValue = 8;
    card_id = num === 29 ? "8C" : num === 30 ? "8D" : num === 31 ? "8H" : "8S";
  } else if (num > 32 && num < 37) {
    cardValue = 9;
    card_id = num === 33 ? "9C" : num === 34 ? "9D" : num === 35 ? "9H" : "9S";
  } else if (num > 36 && num < 41) {
    cardValue = 10;
    card_id = num === 37 ? "10NC" : num === 38 ? "10ND" : num === 39 ? "10NH" : "10NS";
  } else if (num > 40 && num < 45) {
    cardValue = 10;
    card_id = num === 41 ? "10JC" : num === 42 ? "10JD" : num === 43 ? "10JH" : "10JS";
  } else if (num > 44 && num < 49) {
    cardValue = 10;
    card_id = num === 45 ? "10QC" : num === 46 ? "10QD" : num === 47 ? "10QH" : "10QS";
  } else {
    cardValue = 10;
    card_id = num === 49 ? "10KC" : num === 50 ? "10KD" : num === 51 ? "10KH" : "10KS";
  }
}

function showDealtCard() {
  let index = cards.indexOf(card_id); // find index
  if (index !== -1) { 
    cardSrc = "./cards/" + card_id + ".png";
    cardDisplay.src = cardSrc;
    cardDisplay.style.display = "block";
    cards.splice(index, 1); // remove card from deck
  } else {
    drawCount[activePlayer]--;
    drawCard();
  }
}

function appendMiniCard() {
  // requires cardSrc
  drawnCard = document.createElement("img");
  if (activePlayer === 0) {
    document.getElementById("drawn-cards-0").appendChild(drawnCard);
  } else {
    document.getElementById("drawn-cards-1").appendChild(drawnCard);
  }

  drawnCard.src = cardSrc;
  drawnCard.classList.add("drawn-card");
}

function initialAceValue() {
  // requires cardValue
  if (cardValue === 1 && scores[activePlayer] < 11) {
    cardValue = 11;
  }
}

function determineAceConversion() {
  // requires cardValue
  let index = drawnCards[activePlayer].indexOf(11); // find index of 11
  if (scores[activePlayer] + cardValue > 21 && index !== -1) {
    // (-1 if no 11 in array)
    drawnCards[activePlayer][index] = 1; // edit array value 11 to 1
    let sum = 0;
    for (var i = 0; i < drawnCards[activePlayer].length - 1; i++) {
      sum += drawnCards[activePlayer][i];
    } // recalculate score (omits current cardValue)

    scores[activePlayer] = sum;
  }
}

function hideDealtCard() {
  let index = cards.indexOf(card_id); // find index
  if (index !== -1) {
    hiddenCardSrc = "./cards/" + card_id + ".png";
    cardDisplay.src = "./cards/card-back.png";
    cardDisplay.style.display = "block";
    cards.splice(index, 1); // remove card from deck
  } else {
    drawCount[activePlayer]--;
    dealerFirstDraw(); 
  }
}

function appendHiddenMiniCard() {
  // requires cardSrc
  drawnCard = document.createElement("img"); // rename drawnCard to miniCard
  if (activePlayer === 0) {
    document.getElementById("drawn-cards-0").appendChild(drawnCard);
  } else {
    document.getElementById("drawn-cards-1").appendChild(drawnCard);
  }

  drawnCard.src = "./cards/card-back.png";
  drawnCard.classList.add("drawn-card");
}

function gameLogic() {
  // requires cardValue and scores
  if (scores[activePlayer] + cardValue === 21) {
    playWinner();
    scores[activePlayer] += cardValue;
    document.querySelector("#current-" + activePlayer).textContent = "Winner";
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    document
      .querySelector("#current-" + activePlayer)
      .classList.add("winner-text");
    gameOn = false;
    deal = true;
    return;
  } else if (scores[activePlayer] + cardValue > 21) {
    playBust();
    scores[activePlayer] += cardValue;
    document.querySelector("#current-" + activePlayer).textContent = "Bust";
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    if (activePlayer === 0) {
      document.querySelector(".player-0-panel").classList.remove("active");
      document.querySelector(".player-1-panel").classList.add("active");
      document.querySelector("#current-1").textContent = "Winner";
      document.querySelector("#current-1").classList.add("winner-text");
    } else if (activePlayer === 1) {
      document.querySelector(".player-1-panel").classList.remove("active");
      document.querySelector(".player-0-panel").classList.add("active");
      document.querySelector("#current-0").textContent = "Winner";
      document.querySelector("#current-0").classList.add("winner-text");
    }
    setTimeout(playWinner, 350);
    gameOn = false;
    deal = true;
    return;
  } else if (scores[activePlayer] + cardValue < 21) {
    scores[activePlayer] += cardValue;
    // document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
  }
}

function printScore() {
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];
}

function revealScore() {
  document.querySelector("#score-1").textContent = scores[1];
}

function autoDraw() {
  if (scores[1] >= 17 && scores[1] <= 21) {
    determineWinner();
    return;
  } else if (scores[1] > 21) {
    return;
  } 
  setTimeout(drawCard, 750);
  setTimeout(autoDraw, 800);
}

function displayHiddenMiniCard() {
  document.getElementById("drawn-cards-1").firstElementChild.src = hiddenCardSrc;
}

function determineWinner() {
  if (scores[0] > scores[1] && scores[0] <= 21) {
    playWinner();
    document.querySelector("#current-0").textContent = "Winner";
    document.querySelector("#current-0").classList.add("winner-text");
    if (activePlayer === 1) {
      document.querySelector(".player-1-panel").classList.remove("active");
      document.querySelector(".player-0-panel").classList.add("active");
    }
  } else if (scores[1] > scores[0] && scores[1] <= 21) {
    playWinner();
    document.querySelector("#current-1").textContent = "Winner";
    document.querySelector("#current-1").classList.add("winner-text");
    if (activePlayer === 0) {
      document.querySelector(".player-0-panel").classList.remove("active");
      document.querySelector(".player-1-panel").classList.add("active");
    }
  } else if (scores[0] = scores[1]) {
    playWinner();
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    document.querySelector("#current-0").textContent = "Draw";
    document.querySelector("#current-1").textContent = "Draw";
    document.querySelector("#current-0").classList.add("draw-text");
    document.querySelector("#current-1").classList.add("draw-text");
  }
  gameOn = false;
  deal = true;
}

function dealAgain() {
  if (scores[activePlayer] < 21) {
    switchPlayer();
    drawCard();
  }
}

function switchDealerAce() {
  let index = drawnCards[1].indexOf(11); // find index of 11
  if (index !== -1 && scores[1] < 21) {
    drawnCards[1][index] = 1;
    let sum = 0;
    for (var i = 0; i < drawnCards[1].length - 1; i++) {
      sum += drawnCards[1][i];
    } // recalculate score 

    scores[1] = sum + 1;
  }
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