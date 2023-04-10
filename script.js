'use strict';
// Sellecting the HTML Elements
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

// Function to reset all the Var and HTML
const resetAll = function () {
  win = false;
  scores = [0, 0];
  score0HTML.textContent = scores[0];
  score1HTML.textContent = scores[1];
  diceHTML.classList.add('hidden');
};

// Function to Switch Player
const switchPlayer = function () {
  playerActiv = playerActiv === 0 ? 1 : 0;
};

// Roling the Dice function
const roleDice = function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceHTML.classList.remove('hidden');
  diceHTML.src = `dices/dice-${dice}.png`;
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${playerActiv}`).textContent =
      currentScore;
  } else {
    currentScore = 0;
    document.getElementById(`current--${playerActiv}`).textContent =
      currentScore;
    switchPlayer();
  }
};

//Add Events to the Button

btnNewRoll.addEventListener('click', roleDice);

resetAll();
