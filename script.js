const spots = document.querySelectorAll('.spot');
const scoreBoard = document.querySelector('.score');
const gnomes = document.querySelectorAll('.gnome');
const countDownBoard = document.querySelector('.countdown');
const startBtn = document.querySelector('.start-btn');
const aud = new Audio('/audio/Israel _IZ_ Kamakawiwoʻole - Somewhere Over The Rainbow.mp3')
const audBtn = document.querySelector('.aud-btn');
const gameOverModal = document.querySelector('.game-over-container');
const restartBtn= document.querySelector('.restart-btn');

let lastSpot;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;
let audPlay = false;

function muteUnmute() {
  if (audPlay === true) {
    aud.pause()    
    audPlay = false;
    audBtn.textContent = 'unmute' 
  } else if (audBtn.textContent === 'unmute' || audBtn.textContent === '♪') {
    aud.play()
    audPlay = true;
    audBtn.textContent = 'mute'
  } else {
    aud.pause()
    audPlay = false;
    audBtn.textContent = 'unmute'
  }
}

function pickRandomSpot(spots) {
  const randomSpot = Math.floor(Math.random() * spots.length);
  const spot = spots[randomSpot];
  if (spot === lastSpot) {
    return pickRandomSpot(spots)
  }
  lastSpot = spot;
  return spot
}

function popOut() {
  const time = Math.random() * 1300 + 800;
  const spot = pickRandomSpot(spots);
  spot.classList.add('up'); 
  setTimeout(function () {
    spot.classList.remove('up')
    if (!timeUp)popOut();
  }, time)
}

function startGame() {
  countdown = timeLimit/1000;
  scoreBoard.textContent= 0;
  scoreBoard.style.display = 'block';
  countDownBoard.textContent = countdown;
  timeUp = false;
  score = 0;
  gameOverModal.classList.remove('up');
  popOut();
  setTimeout(function(){
    timeUp = true;
  }, timeLimit);
  aud.play();
  aud.loop = true;
  audPlay = true;
  audBtn.textContent = 'mute'


  let startCountdown = setInterval(function() {
    countdown -= 1;
    countDownBoard.textContent = countdown;
    if (countdown === 0) {
      clearInterval(startCountdown);
      gameOver() 
    }
  }, 1000)
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
audBtn.addEventListener('click', muteUnmute);


function gameOver() {
  const gameOverDiv = document.getElementById('game-over');
  const numGnomeDiv = document.createElement('div');
  numGnomeDiv.textContent = `You put aloha shirt on ${score} gnomes!`;
  gameOverDiv.appendChild(numGnomeDiv);
  gameOverModal.classList.add('up');
}


function whack(e) {
  score++;
  // gnome with aloha shirt
  this.style.backgroundImage = 'url("./image/gnorm02-t.png")';
  this.style.pointerEvents = 'none';
  setTimeout(() => {
    this.style.backgroundImage = 'url("./image/gnorm01-t.png")';
    this.style.pointerEvents = 'all';
  }, 800)
  scoreBoard.textContent = score;
}

gnomes.forEach(gnome => gnome.addEventListener('click', whack));

// modal
document.getElementById('about-btn').addEventListener("click", function() {
  document.getElementById('modal-open').classList.add("active");
  document.getElementById('mask').classList.add("active");
});

document.getElementById('modal-close-btn').addEventListener("click", function() {
  document.getElementById('modal-open').classList.remove("active");
  document.getElementById('mask').classList.remove("active");
});

document.getElementById('modal-close-btn2').addEventListener("click", function() {
  document.getElementById('game-over-container').classList.remove("up");
});
