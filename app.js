/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores = [0,0];
var roundScore = 0;
var gameState = false;
var firstRoll = true;
var activePlayer = 0;
var previousRoll, currentRoll, gamePts;
gamePts = 100;

document.querySelector('.dice').style.display = "none";


function newGame() {
    roundScore = 0;
    scores = [0,0];
    gamePts = document.getElementById('winning-pts').value;
    document.querySelector('.player-' + activePlayer + "-panel").classList.remove('winner');
    document.getElementById('name-' + activePlayer).textContent = "Player " + (activePlayer + 1);
    activePlayer = 0;
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    gameState = true;
}

function roll() {
    if (gameState) {
        if (firstRoll) {
            currentRoll = Math.floor((Math.random() * 6) + 1);
            previousRoll = currentRoll;
            firstRoll = false;
        } 
        currentRoll = Math.floor((Math.random() * 6) + 1);
        document.querySelector('.dice').style.display = "block";
        document.querySelector('.dice').src = "dice-" + currentRoll + ".png";
        previousRoll = currentRoll;
        if (currentRoll == 6 && previousRoll == 6) {
            roundScore = 0;
            scores[activePlayer] = 0;
            document.querySelector('#current-' + activePlayer).textContent = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            switchPlayers();
        }
        if (currentRoll != 1) {
            roundScore += currentRoll;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            roundScore = 0;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            switchPlayers();
        }
    }
}

function hold() {
    if (gameState) {
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        roundScore = 0;
        document.getElementById('current-' + activePlayer).textContent = 0;
        if (scores[activePlayer] >= gamePts) {
            gameState = false;
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + "-panel").classList.add('winner');
            document.getElementById('name-' + activePlayer).textContent = "Winner!";

        } else {
            switchPlayers();
        }
    }
}

function switchPlayers() {
    if (activePlayer === 0) {
        activePlayer = 1;
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
    } else {
        activePlayer = 0;
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
    }
}

newGame();
document.querySelector('.btn-new').addEventListener('click', newGame);
document.querySelector('.btn-hold').addEventListener('click', hold);
document.querySelector('.btn-roll').addEventListener('click', roll);

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
