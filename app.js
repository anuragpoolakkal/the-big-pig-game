'use strict';

//Selecting elements
const player0E1 = document.querySelector('.player--0');
const player1E1 = document.querySelector('.player--1');
const score0E1 = document.querySelector('#score--0');
const score1E1 = document.getElementById('score--1');
const current0E1 = document.getElementById('current--0');
const currrent1E1 = document.getElementById('current--1');

const diceE1 = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//Starting conditions
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0E1.textContent = 0;
    score1E1.textContent = 0;
    current0E1.textContent = 0;
    current0E1.textContent = 0;

    diceE1.classList.add('hidden');
    player0E1.classList.remove('player--winner');
    player1E1.classList.remove('player--winner');
    player0E1.classList.add('player--active');
    player1E1.classList.remove('player--active');
};

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0E1.classList.toggle('player--active');
    player0E1.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        diceE1.classList.remove('hidden');
        diceE1.src = `dice-${dice}.png`;

        // 3. Checked for rolled 1
        if (dice !== 1) {
            //Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's scpre
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >=100
        if (scores[activePlayer] >= 100) {
            //Finish the game
            playing = false;
            diceE1.classList.add('hidden');

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            //Switch to the next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);