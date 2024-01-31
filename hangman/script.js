const hangmanWords = [
  { word: "Bliss", hint: "Extreme happiness or joy." },
  { word: "Quirk", hint: "A peculiar or unexpected behavior." },
  {
    word: "Fjord",
    hint: "A narrow, deep inlet of the sea between high cliffs.",
  },
  {
    word: "Prism",
    hint: "A transparent object that separates white light into its constituent colors.",
  },
  { word: "Crux", hint: "The essential or most important point." },
  {
    word: "Joust",
    hint: "A medieval sport where knights on horseback compete with lances.",
  },
  { word: "Fluke", hint: "A stroke of luck or a fortunate accident." },
  {
    word: "Knack",
    hint: "A special skill or talent for doing something easily.",
  },
  { word: "Zesty", hint: "Having a strong, lively, or piquant flavor." },
  {
    word: "Niche",
    hint: "A comfortable or suitable position in life or employment.",
  },
  { word: "Plush", hint: "Luxuriously rich and soft." },
  { word: "Giddy", hint: "Feeling light-headed or dizzy with excitement." },
  { word: "Mirth", hint: "Amusement, especially expressed in laughter." },
  { word: "Crisp", hint: "Firm and easily broken; pleasantly sharp or clear." },
  {
    word: "Soiree",
    hint: "An evening party or social gathering, typically in a private house.",
  },
];
const body = {
  1: '<g id="head"><circle cx="200" cy="80" r="20" stroke="black" stroke-width="4" fill="#39684e"/><g id="rEyes"><circle cx="193" cy="80" r="4" /><circle cx="207" cy="80" r="4" /></g></g>',
  2: '<line x1="200" y1="100" x2="200" y2="150" />',
  3: '<line id="armL" x1="200" y1="120" x2="170" y2="140" />',
  4: '<line id="armR" x1="200" y1="120" x2="230" y2="140" />',
  5: '<line id="legL" x1="200" y1="150" x2="180" y2="190" />',
  6: '<line id="legR" x1="200" y1="150" x2="220" y2="190" />',
};
const html = `    <main class="main">
<section class="window">
    <div class="window__wrap">
        <p class="win-loose">You won</p>
        <p class="guess-word">CRUX</p>
        <button class="play-again">Play again</button>
    </div>
</section>
<div class="main__wrapper">
<section class="drawing">
  <div class="drawing__gallow">
    <svg height="280" width="280">
      <g id="body"></g>
      <line x1="0" y1="250" x2="150" y2="250" />
      <line id="door1" x1="150" y1="250" x2="200" y2="250" />
      <line id="door2" x1="200" y1="250" x2="250" y2="250" />
      <line x1="250" y1="250" x2="390" y2="250" />
      <line x1="100" y1="250" x2="100" y2="20" />
      <line x1="100" y1="20" x2="200" y2="20" />
      <line x1="100" y1="70" x2="150" y2="20" />
      <line id="rope" x1="200" y1="20" x2="200" y2="60" />
    </svg>
  </div>
  <div class="drawing_text">
    <h1>Hangman game</h1>
    <p class="warning">Если клавиатура не работает, убедитесь что у вас стоит английский язык</p>
  </div>
</section>
<section class="right">
  <p class="right_guess-text">________</p>
  <h2 class="right__hint">Hint</h2>
  <h3 class="right__guesses">Incorect guesses: 0/6</h3>
  <div class="right__virtual-keyboard">
    <div class="virtual-keyboard__letter">A</div>
    <div class="virtual-keyboard__letter">B</div>
    <div class="virtual-keyboard__letter">C</div>
    <div class="virtual-keyboard__letter">D</div>
    <div class="virtual-keyboard__letter">E</div>
    <div class="virtual-keyboard__letter">F</div>
    <div class="virtual-keyboard__letter">G</div>
    <div class="virtual-keyboard__letter">H</div>
    <div class="virtual-keyboard__letter">I</div>
    <div class="virtual-keyboard__letter">J</div>
    <div class="virtual-keyboard__letter">K</div>
    <div class="virtual-keyboard__letter">L</div>
    <div class="virtual-keyboard__letter">M</div>
    <div class="virtual-keyboard__letter">N</div>
    <div class="virtual-keyboard__letter">O</div>
    <div class="virtual-keyboard__letter">P</div>
    <div class="virtual-keyboard__letter">Q</div>
    <div class="virtual-keyboard__letter">R</div>
    <div class="virtual-keyboard__letter">S</div>
    <div class="virtual-keyboard__letter">T</div>
    <div class="virtual-keyboard__letter">U</div>
    <div class="virtual-keyboard__letter">V</div>
    <div class="virtual-keyboard__letter">W</div>
    <div class="virtual-keyboard__letter">X</div>
    <div class="virtual-keyboard__letter">Y</div>
    <div class="virtual-keyboard__letter">Z</div>
  </div>
</section>
</div>
</main>`;
const toInsert = document.querySelector(".body");
function insertHTML() {
  toInsert.innerHTML = html;
}
insertHTML();

const playAgain__window = document.querySelector(".window");
const playAgain__button = document.querySelector(".play-again");
const playAgain__winLoose = document.querySelector(".win-loose");
const playAgain__guessWord = document.querySelector(".guess-word");

const gallow = document.getElementById("body");

const guessTextUnderscore = document.querySelector(".right_guess-text");
const hint = document.querySelector(".right__hint");
var guesses = document.querySelector(".right__guesses");
var keybordLetter = document.querySelectorAll(".virtual-keyboard__letter");

var randomIndex;
var check_index;
var randomHangmanWord;
var RandomWord;

var underScores;

var pushedButtons = [];

function start() {
  pushedButtons = [];
  check_index = randomIndex;
  randomIndex = Math.floor(Math.random() * hangmanWords.length);
  if (check_index === randomIndex) {
    if (hangmanWords.length === randomIndex) {
      randomIndex -= 1;
    } else {
      randomIndex += 1;
    }
  }
  randomHangmanWord = hangmanWords[randomIndex];
  RandomWord = randomHangmanWord.word.toUpperCase();
  underScores = generateUnderscore(RandomWord);
  console.log(RandomWord);
  guessTextUnderscore.innerHTML = underScores.join("");
  guesses.innerHTML = "Incorect guesses: 0/6";
  hint.innerHTML = "Hint: " + randomHangmanWord.hint;
  playAgain__window.style.display = "none";
  gallow.innerHTML = "";
  keybordLetter.forEach(function (letter) {
    letter.classList.remove("virtual-keyboard__letter_disable");
    letter.classList.add("virtual-keyboard__letter");
  });
}
start();

function generateUnderscore(word) {
  return Array.from({ length: word.length }, () => "_");
}
keybordLetter.forEach(function (letter) {
  letter.addEventListener("click", function () {
    var clickedLetter = this.innerHTML;
    if (!pushedButtons.includes(clickedLetter)) {
      pushedButtons.push(clickedLetter);
      this.classList.remove("virtual-keyboard__letter");
      this.classList.add("virtual-keyboard__letter_disable");
      console.log("Clicked letter:", clickedLetter);
      var change = updateWordDisplay(RandomWord, clickedLetter, underScores);
      guessTextUnderscore.innerHTML = change.join("");
    }
  });
});

function updateWordDisplay(word, guessedLetter, score) {
  var check = score.join("");
  for (let i = 0; i < word.length; i++) {
    if (word[i] === guessedLetter) {
      score[i] = guessedLetter;
    }
  }
  if (check === score.join("")) {
    incorrectAnswer();
  }
  if (score.join("") === RandomWord) {
    winLoose(true);
  }

  return score;
}

function incorrectAnswer() {
  var currentCounter = guesses.innerHTML;
  var incorrectAnswers = +currentCounter.slice(18, 19) + 1;
  if (incorrectAnswers < 7) {
    guesses.innerHTML = "Incorect guesses: " + incorrectAnswers + "/6";
    gallow.innerHTML += body[incorrectAnswers];
  }
  if (incorrectAnswers === 6) {
    console.log("gameover");
    winLoose(false);
  }
}

function handleKeyPress(event) {
  var clickedLetter = event.key.toUpperCase();
  if (!pushedButtons.includes(clickedLetter)) {
    for (let key in keybordLetter) {
      if (clickedLetter === keybordLetter[key].innerHTML) {
        keybordLetter[key].classList.remove("virtual-keyboard__letter");
        keybordLetter[key].classList.add("virtual-keyboard__letter_disable");
        pushedButtons.push(clickedLetter);
        console.log("Clicked letter:", clickedLetter);
        var change = updateWordDisplay(RandomWord, clickedLetter, underScores);
        guessTextUnderscore.innerHTML = change.join("");
      }
    }
  }
}
document.addEventListener("keydown", handleKeyPress);

function winLoose(iswin) {
  if (iswin) {
    playAgain__winLoose.innerHTML = "You won";
  } else {
    playAgain__winLoose.innerHTML = "You lost";
  }
  pushedButtons.push("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z")
  playAgain__guessWord.innerHTML = RandomWord;
  playAgain__window.style.display = "flex";
}

playAgain__button.addEventListener("click", start);
