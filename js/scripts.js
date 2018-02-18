// Game rock paper scissors

var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function(e) { playerPick('rock'); });
pickPaper.addEventListener('click', function(e) { playerPick('paper'); });
pickScissors.addEventListener('click', function(e) { playerPick('scissors'); });

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block'; 
        /* falls through */
      break; 
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';
        /* falls through */
    case 'notStarted':
    	/* falls through */
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}

setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

var labelRock = document.getElementById('js-label_rock'),
    labelPaper = document.getElementById('js-label_paper'),
    labelScissor = document.getElementById('js-label_scissors');

function setGameLabel () {
    labelRock.innerHTML = 'Rock';
    labelPaper.innerHTML = 'Paper';
    labelScissor.innerHTML = 'Scissor';
    labelRock.style.display = 'inline';
    labelPaper.style.display = 'inline';
    labelScissor.style.display = 'inline';
}

function newGame() {
  player.name = prompt('Please enter your name', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();
    setGameLabel();

    playerNameElem.innerHTML = player.name;
    setGamePoints(); // This function has not been created yet
    }
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

   if (player.score == 10) {
    	gameState = 'ended';
        labelRock.style.display = 'none';
        labelPaper.innerHTML = 'the The winner is ' + player.name;
        labelScissor.style.display = 'none';
    	setGameElements();
    } else if (computer.score == 10) {
        gameState = 'ended';
        labelRock.style.display = 'none';
        labelPaper.style.display = 'none';
        labelScissor.innerHTML = 'the The winner is computer';
        setGameElements();
    }   
    
  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        playerPointsElem.innerHTML = ++player.score;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computerPointsElem.innerHTML = ++computer.score;
    }

}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}
