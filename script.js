const symbols = ["🍕", "🚀", "🐱", "🌟", "🎧", "📱"]; // 8 symboles = 16 cartes
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
const totalPairs = symbols.length;

const board = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function initGame() {
  board.innerHTML = "";
  restartBtn.style.display = "none";
  matchedPairs = 0;
  flippedCards = [];

  cards = shuffle([...symbols, ...symbols]);

  cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="face front">${symbol}</div>
      <div class="face back">?</div>
    `;
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      const symbol1 = card1.querySelector(".front").textContent;
      const symbol2 = card2.querySelector(".front").textContent;

      if (symbol1 === symbol2) {
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === totalPairs) {
          // Partie terminée
          restartBtn.style.display = "inline-block";
        }
      } else {
        setTimeout(() => {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          flippedCards = [];
        }, 1000);
      }
    }
  }
}

function restartGame() {
  initGame();
}

window.onload = initGame;
