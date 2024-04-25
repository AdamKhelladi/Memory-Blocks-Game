// Memory Blocks Game

let startGameBtn = document.querySelector(".control-button span");
let username = document.querySelector(".name span");

startGameBtn.addEventListener("click", startGame);
window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    startGame();
  }
});

function startGame() {
  let yourName = prompt("What's Your Name? ");

  if (!yourName) {
    yourName = "Unknown";
  }

  username.innerHTML = yourName;
  document.querySelector(".control-button").remove();
}

let duration = 1000;
let blocksContainer = document.querySelector(".game-blocks");

let blocksArray = Array.from(blocksContainer.children);

// let orderRange = [...Array(blocksArray.length).keys()];
let orderRange = Array.from(Array(blocksArray.length).keys());

// console.log(orderRange);
// console.log(shuffle(orderRange));
shuffle(orderRange);

blocksArray.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", () => {
    flipBlock(block);
  });
});

function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);

    current--;

    temp = array[current];

    array[current] = array[random];

    array[random] = temp;
  }

  return array;
}

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("flipped");

  let allFlippedBlocks = blocksArray.filter((flippedBlock) =>
    flippedBlock.classList.contains("flipped")
  );

  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }  
}

function stopClicking() {
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function checkBlocks(firstBlock, secondBlock) {
  let tries = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("flipped");
    secondBlock.classList.remove("flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.querySelector("#success").play();
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("flipped");
      secondBlock.classList.remove("flipped");
    }, duration / 2);

    document.querySelector("#fail").play();
  }
}