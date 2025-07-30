"use strict";

// changing players when dice rolled is one
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");

//selecting player scores
const score_0_Element = document.querySelector("#score--0");
const score_1_Element = document.querySelector("#score--1");

// setting players score to 0
score_0_Element.textContent = 0;
score_1_Element.textContent = 0;

// Hidding dice to disappear
const diceElement = document.querySelector(".dice");

// rolling the dice:
//select the button element and add event listener
const diceRoll = document.querySelector(".btn--roll");
const diceNew = document.querySelector(".btn--new");
const diceHold = document.querySelector(".btn--hold");

// seleting current score element
// and storing the current score variable
// in the current score element
const currentScoreElement0 = document.querySelector("#current--0");

const currentScoreElement1 = document.querySelector("#current--1");

//variables outside
let scores, activePlayer, playing, currentScore;

// Resetting game functionality
const resetGame = () => {
  // declaring current score
  currentScore = 0;

  // switching current players variables
  // when dice rolled is one
  activePlayer = 0;

  // final scores array storage
  //  when hold on for next player
  scores = [0, 0];

  //variable condition for playing when one wins
  playing = true;

  // 1. setting all scores to zero

  currentScoreElement0.textContent = currentScore;
  currentScoreElement1.textContent = currentScore;

  score_0_Element.textContent = currentScore;
  score_1_Element.textContent = currentScore;

  //making dice disappear
  diceElement.classList.add("hidden");

  // removing the player winner class
  player0Element.classList.remove("player--winner");
  player1Element.classList.remove("player--winner");

  // removing active classes on both players
  player1Element.classList.remove("player--active");

  //setting the first player to be the active player
  player0Element.classList.add("player--active");
};

resetGame();
// player switching / changing function
const switchPlayer = () => {
  // display the score to zero if dice is one
  // and store it to the current score
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // setting the current score to zero when rolled dice is one
  currentScore = 0;
  // switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;

  // changing the background color of
  // player switched with the toggle property
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
};

//dice rolling functionality
diceRoll.addEventListener("click", () => {
  // condition for when game starts
  if (playing) {
    // 1. generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice
    diceElement.classList.remove("hidden");
    // changing the image src randomly
    // with img src with the dice
    // matching name 'dice-' and adding
    // .png to it
    diceElement.src = `dice-${dice}.png`;

    // 3. check for a rolled dice and
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      // storing the current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      /* Player Changes / Switching*/
      switchPlayer();
    }
  }
});

// dice holding functionality
diceHold.addEventListener("click", () => {
  // condition for when game starts
  if (playing) {
    // 1. add current score to active player's score
    scores[activePlayer] += currentScore;

    //storing the current score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if score is greater or equal to 100
    if (scores[activePlayer] >= 100) {
      // and if so finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      // when player wons and
      // nothing to play anymore: Finish Game
      playing = false;
      diceElement.classList.add("hidden");
    }
    // else switch to the next player
    else {
      //switching to next player
      switchPlayer();
    }
  }
});

//dice Resetting Functionality
diceNew.addEventListener("click", resetGame);
