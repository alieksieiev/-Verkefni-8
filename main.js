const MAX_BEST_OF = 10;
let totalRounds = 0;
let currentRound = 0;
let playerWins = 0;
let computerWins = 0;
let totalWins = 0;
const games = [];

const start = document.querySelector('.start');
const rounds = document.querySelector('.rounds');
const play = document.querySelector('.play');
const result = document.querySelector('.result');

function playRound(player) {
  currentRound += 1
  let computer = computerPlay();
  let result = checkGame(player, computer);
  if(result === 1) playerWins++
  else if(result === -1) computerWins++
  console.log("player " + player + " comp " + computer)

  updateResultScreen({
    player: player.toString(),
    computer,
    result,
    currentRound,
    totalRounds,
    playerWins,
    computerWins,
  });

  const finishGame = document.querySelector('.button.finishGame');
  const nextRound = document.querySelector('.button.nextRound');
  
  if(currentRound == totalRounds) {
    finishGame.classList.remove('hidden');
    nextRound.classList.add('hidden');
    currentRound = 0;    
  }else{
    finishGame.classList.add('hidden');
    nextRound.classList.remove('hidden');
  }

  show('result');
  finishGame.addEventListener('click', () => show('rounds'));
  nextRound.addEventListener('click', () => show('play'));
}

function round(e) {
  totalRounds = e.target.innerHTML;
  show('play');
}

show('start');
createButtons(MAX_BEST_OF, round);
document.querySelector('.start button').addEventListener('click', () => show('rounds'));
document.querySelector('button.scissor').addEventListener('click', () => playRound('1'));
document.querySelector('button.paper').addEventListener('click', () => playRound('2'));
document.querySelector('button.rock').addEventListener('click', () => playRound('3'));
document.querySelector('button.finishGame').addEventListener('click', finishGame);
document.querySelector('button.nextRound').addEventListener('click', () => show('rounds') );

function finishGame() {
  if (playerWins > computerWins) totalWins++
  games.push({
    player: playerWins,
    computer: computerWins,
  })



  document.querySelector('.games__played').textContent = games.length;
  document.querySelector('.games__wins').textContent = (totalWins.toString());
  document.querySelector('.games__winratio').textContent = (totalWins/games.length*100).toFixed(2);
  document.querySelector('.games__losses').textContent = games.length-totalWins;
  document.querySelector('.games__lossratio').textContent =(( games.length-totalWins)/games.length*100).toFixed(2);

  playerWins = 0;
  computerWins = 0;
  show('play');
}

/* ui */
function createButtons(max, onClick) {
  let elements = document.querySelector('.rounds__buttons');
  for(let i = 1; i < max; i++) {
    if(!isValidBestOf(i)){
      continue;
    }
    let button = el('button' , i.toString());
    button.addEventListener("click", onClick)
    elements.appendChild(button);      
    button.id = i;
  }
}

function show(part) {  
  start.classList.add('hidden');
  rounds.classList.add('hidden');
  play.classList.add('hidden');
  result.classList.add('hidden');
  
  switch (part) {
    case 'start':
      start.classList.remove('hidden');
      break;
    case 'rounds':
      rounds.classList.remove('hidden');
      break;
    case 'play':
      play.classList.remove('hidden');
      break;
    case 'result':
      result.classList.remove('hidden');
      break;
    default: 
    console.warn(`${part} óþekkt`);
  }
}

function updateResultScreen({ player, computer, result, currentRound, totalRounds, playerWins, computerWins }) {
  const getPlayer = playAsText(player);
  const getComputer = playAsText(computer);
  const resultPlayer = document.querySelector('.result__player');
  const resultComputer = document.querySelector('.result__computer');
  const curRound = document.querySelector('.result__currentRound');
  const totRounds = document.querySelector('.result__totalRounds');
  const roundResult = document.querySelector('.result__result');
  const resultStatus = document.querySelector('.result__status');
  
  resultPlayer.textContent = `${getPlayer}`;
  resultComputer.textContent = `${getComputer}`;
  curRound.textContent = `${currentRound}`;
  totRounds.textContent = `${totalRounds}`;
  resultStatus.textContent = `Staðan er ${playerWins}--${computerWins}.`;

  if (result === 1) roundResult.textContent = `Þú sigrar.`;
  else if (result === 0) roundResult.textContent = `Jafntefli.`;
  else if (result === -1) roundResult.textContent = `Tölva sigrar.`
}

/*rock-paper-scissors*/ 
function isValidBestOf(bestOf, maxBestOf) {
  if (bestOf % 2 === 0) return false;
  else return true;
}

function playAsText(play) {
  switch (play) {
    case '1': return 'Skæri';
    case '2': return 'Blað';
    case '3': return 'Steinn';
    default: return 'Óþekkt';
  }
}

function checkGame(player, computer) {
  if (player === '1' && computer === '2') { //Тожницы выиграли над бумагой
    return 1;
  } else if (player === '2' && computer === '3') { //Бумага выиграла над камнем
    return 1;
  } else if (player === '3' && computer === '1') { //Камень выиграл над ножницами
    return 1;
  } else if (player === computer){ //Ничья
    return 0;
  } else{ //Компьютер выиграл
    return -1; 
  }
}

function computerPlay() {
  return (Math.floor(Math.random() * 3) + 1).toString();
}

/*Helpers*/
function el(name, ...children) {
  const e = document.createElement(name);
  for (const child of children) {
    if (typeof child === 'string') {
      e.appendChild(
        document.createTextNode(child),
      );
    } else {
      e.appendChild(child);
    }
  }
  return e;
}