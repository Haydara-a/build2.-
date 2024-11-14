// Variabelen
let selectedBlock = null;
let isErasing = false;
const gameArea = document.getElementById("game-area");
const blocks = document.querySelectorAll(".block");
const expandButton = document.getElementById("expandField");
const eraseButton = document.getElementById("enableEraser");
let gameCells = [];

// Functie om de cellen te creëren
function createCells(columns, rows) {
  gameArea.innerHTML = ''; // Verwijder bestaande cellen
  gameCells = [];
  
  for (let i = 0; i < columns * rows; i++) {
    const cell = document.createElement("div");
    cell.classList.add("game-cell");
    gameArea.appendChild(cell);
    gameCells.push(cell);
  }

  // Pas het grid toe op basis van het aantal kolommen en rijen
  gameArea.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  gameArea.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
}

// Maak standaard 10x8 grid
createCells(10, 8);

// Voeg click event listeners toe voor de blokken in de sidebar
blocks.forEach(block => {
  block.addEventListener("click", () => {
    selectedBlock = block;
    isErasing = false;
    blocks.forEach(b => b.classList.remove("selected"));
    block.classList.add("selected");
  });
});

// Voeg click event listener toe voor de gum
eraseButton.addEventListener("click", () => {
  isErasing = !isErasing;
  selectedBlock = null;
  blocks.forEach(b => b.classList.remove("selected"));
  if (isErasing) {
    eraseButton.style.backgroundColor = "#ff6347"; // Markeer gum actief
  } else {
    eraseButton.style.backgroundColor = "#4CAF50"; // Markeer gum inactief
  }
});

// Functie om een blok te plaatsen of te verwijderen
gameCells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (isErasing) {
      // Verwijder het blok als we aan het gummen zijn
      while (cell.firstChild) {
        cell.removeChild(cell.firstChild);
      }
    } else if (selectedBlock && !cell.classList.contains("block-placed")) {
      const newBlock = document.createElement("div");
      newBlock.classList.add("block-placed");

      // Afhankelijk van welk blok is geselecteerd, stel de achtergrondkleur in
      switch (selectedBlock.id) {
        case "grass":
          newBlock.style.backgroundColor = "#7CFC00";
          break;
        case "stone":
          newBlock.style.backgroundColor = "#808080";
          break;
        case "wood":
          newBlock.style.backgroundColor = "#8B4513";
          break;
        case "brick":
          newBlock.style.backgroundColor = "#B22222";
          break;
      }

      cell.appendChild(newBlock);
    }
  });
});

// Vergroot de grond bij het klikken op de vergroot-knop
expandButton.addEventListener("click", () => {
  const currentColumns = gameArea.style.gridTemplateColumns.split(",").length;
  const currentRows = gameArea.style.gridTemplateRows.split(",").length;

  // Vergroot de grid met 2 kolommen en 2 rijen
  createCells(currentColumns + 2, currentRows + 2);
});
