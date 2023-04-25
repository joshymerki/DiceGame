'use strict';
// Sellecting the HTML Elements
const mainHTML = document.querySelector('main');
const player0HTML = document.querySelector('.player--0');
const player1HTML = document.querySelector('.player--1');
const score0HTML = document.getElementById('score--0');
const score1HTML = document.getElementById('score--1');
const currentScore0HTML = document.getElementById('current--0');
const currentScore1HTML = document.getElementById('current--1');
const diceHTML = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnNewRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Creating the Initial Var
let playerActiv = 0;
let scores = [0, 0];
let currentScore = 0;
let win = false;
let numberToWin = 5;

// Function to reset all the Var and HTML
const resetAll = function () {
  scores = [0, 0];
  score0HTML.textContent = scores[0];
  score1HTML.textContent = scores[1];
  currentScore0HTML.textContent = 0;
  currentScore1HTML.textContent = 0;
  diceHTML.classList.add('hidden');
};

// Function to Switch Player
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${playerActiv}`).textContent = currentScore;
  playerActiv = playerActiv === 0 ? 1 : 0;
  player0HTML.classList.toggle('player--active');
  player1HTML.classList.toggle('player--active');
};

//Function to Reset the Game
const resetGame = function () {
  if (win) {
    win = false;
    document
      .querySelector(`.player--winner`)
      .classList.remove('player--winner');
    mainHTML.classList.remove('player-win');
    document.querySelector(
      `.player--${playerActiv} .current-label`
    ).textContent = 'CURRENT';
  }
  currentScore = 0;
  document.getElementById(`current--${playerActiv}`).textContent = currentScore;
  playerActiv = 0;
  player0HTML.classList.add('player--active');
  player1HTML.classList.remove('player--active');
  btnNewRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
  resetAll();
};

//Function Won Player
const wonGame = function () {
  win = true;
  document
    .querySelector(`.player--${playerActiv}`)
    .classList.add('player--winner');
  mainHTML.classList.add('player-win');
  document
    .querySelector(`.player--${playerActiv}`)
    .classList.remove('player--active');

  //Change Texts
  document.getElementById(`score--${playerActiv}`).textContent = 'WON';
  document.querySelector(`.player--${playerActiv} .current-label`).textContent =
    'Score';
  document.querySelector(`.player--${playerActiv} .current-score`).textContent =
    scores[playerActiv];
  //Hide Buttons
  diceHTML.classList.add('hidden');
  btnNewRoll.classList.add('hidden');
  btnHold.classList.add('hidden');
};

//Function to hold the Score
const holdScore = function () {
  if (!win) {
    scores[playerActiv] += currentScore;
    document.getElementById(`score--${playerActiv}`).textContent =
      scores[playerActiv];

    if (scores[playerActiv] >= numberToWin) {
      wonGame();
    } else {
      switchPlayer();
    }
  }
};

// Roling the Dice function
const roleDice = function () {
  if (!win) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceHTML.classList.remove('hidden');
    diceHTML.src = `dices/dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${playerActiv}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

//Game Start
resetAll();

//Add Events to the Button
btnNewRoll.addEventListener('click', roleDice);
btnHold.addEventListener('click', holdScore);
btnNewGame.addEventListener('click', resetGame);
