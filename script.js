'use strict';
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
let activePlayer = player1;
let scoreLabel = activePlayer.querySelector('.score');
let currentLabel = activePlayer.querySelector('.current-score');


let player1Score, player2Score, playerCurrentScore, stillPlaying;

const init = function () {
    player1Score = 0;
    player2Score = 0;
    playerCurrentScore = 0;
    stillPlaying = true;
    activePlayer = player1;

    dice.classList.add('hidden');
    player1.querySelector('.score').textContent = 0;
    player2.querySelector('.score').textContent = 0;
    player1.querySelector('#current--0').textContent = 0;
    player2.querySelector('#current--1').textContent = 0;
    player1.querySelector('.name').textContent = "Player 1";
    player2.querySelector('.name').textContent = "Player 2";
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    player1.classList.add('player--active');
    player2.classList.remove('player--active');

    currentLabel = activePlayer.querySelector('.current-score');
};
init();

const changeActivePlayer = function (player) {
    if (player === player1) {
        activePlayer = player2;
        player1.classList.toggle('player--active');
        player2.classList.toggle('player--active');
        scoreLabel = activePlayer.querySelector('.score');
        currentLabel = activePlayer.querySelector('.current-score');
    } else {
        activePlayer = player1;
        player1.classList.add('player--active');
        player2.classList.remove('player--active');
        scoreLabel = activePlayer.querySelector('.score');
        currentLabel = activePlayer.querySelector('.current-score');
    }
    playerCurrentScore = 0;
};

const newDiceRoll = function (activePlayer) {
    const diceNumber = String(Math.trunc(Math.random() * 6) + 1);
    dice.classList.remove('hidden');
    dice.src = `images/dice-${diceNumber}.png`;
    if (diceNumber === '1') {
        playerCurrentScore = 0;
        currentLabel.textContent = 0;
        changeActivePlayer(activePlayer);
    } else {
        playerCurrentScore += Number(diceNumber);
        currentLabel.textContent = playerCurrentScore;
    }
};

const winner = function () {
    // const winner = player1Score > player2Score ? player1 : player2;
    activePlayer.querySelector('.name').textContent = "Winner!";
    activePlayer.classList.add('player--winner');
    dice.classList.add('hidden');
    stillPlaying = false;
};

const hold = function () {
    currentLabel.textContent = 0;
    if (activePlayer === player1) {
        player1Score += playerCurrentScore;
        scoreLabel.textContent = player1Score;
        if (player1Score >= 50) {
            winner();
        } else {
            changeActivePlayer(activePlayer);
        }
    } else if (activePlayer === player2) {
        player2Score += playerCurrentScore;
        scoreLabel.textContent = player2Score;
        if (player2Score >= 50) {
            winner();
        }
        changeActivePlayer(activePlayer);
    }
};


rollDiceBtn.addEventListener('click', function () {
    if (stillPlaying) newDiceRoll(activePlayer);
});
holdBtn.addEventListener('click', function () {
    if (stillPlaying) hold();
});
newGameBtn.addEventListener('click', init)






