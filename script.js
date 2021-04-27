const spots = document.querySelectorAll('.spot');
const scoreBoard = document.querySelector('.score');
const gnomes = document.querySelectorAll('.gnome');
const countDownBoard = document.querySelector('.countdown');
const startBtn = document.querySelector('.start-btn');

let lastSpot;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;

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
  popOut();
  setTimeout(function(){
    timeUp = true;
  }, timeLimit);

  let startCountdown = setInterval(function() {
    countdown -= 1;
    countDownBoard.textContent = countdown;
    if (countdown < 0) {
      clearInterval(startCountdown);
      countDownBoard.textContent = 'times up'
  }
  }, 1000)
}

startBtn.addEventListener('click', startGame);

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


