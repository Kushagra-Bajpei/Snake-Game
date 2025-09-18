// const canvas = document.getElementById("game-canvas");
// const ctx = canvas.getContext("2d");
// const scoreDisplay = document.getElementById("score-display");
// const levelDisplay = document.getElementById("level-display");
// const gameOverDisplay = document.getElementById("game-over");
// const finalScoreDisplay = document.getElementById("final-score");
// const finalLevelDisplay = document.getElementById("final-level");
// const startScreen = document.getElementById("start-screen");
// const startButton = document.getElementById("start-button");
// const restartButton = document.getElementById("restart-button");

// const grid = 20;
// let snake, food, dx, dy, score, level, gameSpeed, gameLoop;
// let foodTimer, obstacles, growSize;

// // ✅ Initialize game
// function initGame() {
//   snake = [
//     { x: 160, y: 200 },
//     { x: 140, y: 200 },
//     { x: 120, y: 200 }
//   ];
//   dx = grid;
//   dy = 0;
//   score = 0;
//   level = 1;
//   gameSpeed = 200;
//   growSize = 1;
//   obstacles = [];
//   placeFood();
//   scoreDisplay.textContent = "Score: " + score;
//   levelDisplay.textContent = "Level: " + level;
//   gameOverDisplay.style.display = "none";
// }

// // ✅ Place random food
// function placeFood() {
//   food = {
//     x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
//     y: Math.floor(Math.random() * (canvas.height / grid)) * grid
//   };
//   // Reset timer (food disappears if not eaten)
//   clearTimeout(foodTimer);
//   foodTimer = setTimeout(() => placeFood(), 7000); // 7 sec lifespan
// }

// // ✅ Place obstacles
// function placeObstacles(count) {
//   obstacles = [];
//   for (let i = 0; i < count; i++) {
//     obstacles.push({
//       x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
//       y: Math.floor(Math.random() * (canvas.height / grid)) * grid
//     });
//   }
// }

// // ✅ Draw snake
// function drawSnake() {
//   snake.forEach((seg, i) => {
//     if (i === 0) {
//       ctx.fillStyle = "#00ff00";
//       ctx.fillRect(seg.x, seg.y, grid - 2, grid - 2);

//       // Eyes
//       ctx.fillStyle = "white";
//       const eyeSize = 4;
//       if (dx > 0) {
//         ctx.fillRect(seg.x + grid - 10, seg.y + 4, eyeSize, eyeSize);
//         ctx.fillRect(seg.x + grid - 10, seg.y + grid - 10, eyeSize, eyeSize);
//       } else if (dx < 0) {
//         ctx.fillRect(seg.x + 6, seg.y + 4, eyeSize, eyeSize);
//         ctx.fillRect(seg.x + 6, seg.y + grid - 10, eyeSize, eyeSize);
//       } else if (dy > 0) {
//         ctx.fillRect(seg.x + 4, seg.y + grid - 10, eyeSize, eyeSize);
//         ctx.fillRect(seg.x + grid - 10, seg.y + grid - 10, eyeSize, eyeSize);
//       } else if (dy < 0) {
//         ctx.fillRect(seg.x + 4, seg.y + 6, eyeSize, eyeSize);
//         ctx.fillRect(seg.x + grid - 10, seg.y + 6, eyeSize, eyeSize);
//       }

//       // Pupils
//       ctx.fillStyle = "black";
//       const pSize = 2;
//       if (dx > 0) {
//         ctx.fillRect(seg.x + grid - 9, seg.y + 5, pSize, pSize);
//         ctx.fillRect(seg.x + grid - 9, seg.y + grid - 9, pSize, pSize);
//       } else if (dx < 0) {
//         ctx.fillRect(seg.x + 7, seg.y + 5, pSize, pSize);
//         ctx.fillRect(seg.x + 7, seg.y + grid - 9, pSize, pSize);
//       } else if (dy > 0) {
//         ctx.fillRect(seg.x + 5, seg.y + grid - 9, pSize, pSize);
//         ctx.fillRect(seg.x + grid - 9, seg.y + grid - 9, pSize, pSize);
//       } else if (dy < 0) {
//         ctx.fillRect(seg.x + 5, seg.y + 7, pSize, pSize);
//         ctx.fillRect(seg.x + grid - 9, seg.y + 7, pSize, pSize);
//       }

//       // Tongue
//       ctx.fillStyle = "red";
//       if (dx > 0) ctx.fillRect(seg.x + grid, seg.y + grid / 2 - 1, 4, 2);
//       if (dx < 0) ctx.fillRect(seg.x - 4, seg.y + grid / 2 - 1, 4, 2);
//       if (dy > 0) ctx.fillRect(seg.x + grid / 2 - 1, seg.y + grid, 2, 4);
//       if (dy < 0) ctx.fillRect(seg.x + grid / 2 - 1, seg.y - 4, 2, 4);
//     } else {
//       ctx.fillStyle = "#00aa00";
//       ctx.fillRect(seg.x, seg.y, grid - 2, grid - 2);
//     }
//   });
// }

// // ✅ Draw food
// function drawFood() {
//   ctx.fillStyle = "red";
//   ctx.beginPath();
//   ctx.arc(food.x + grid / 2, food.y + grid / 2, grid / 2 - 3, 0, Math.PI * 2);
//   ctx.fill();

//   ctx.fillStyle = "rgba(255,255,255,0.7)";
//   ctx.beginPath();
//   ctx.arc(food.x + grid / 2 - 3, food.y + grid / 2 - 3, 3, 0, Math.PI * 2);
//   ctx.fill();
// }

// // ✅ Draw obstacles
// function drawObstacles() {
//   ctx.fillStyle = "gray";
//   obstacles.forEach(obs => {
//     ctx.fillRect(obs.x, obs.y, grid - 2, grid - 2);
//   });
// }

// // ✅ Main game loop
// function gameLoopFn() {
//   const head = { x: snake[0].x + dx, y: snake[0].y + dy };
//   snake.unshift(head);

//   // Eat food
//   if (head.x === food.x && head.y === food.y) {
//     score += (level < 3 ? 10 : 5); // harder levels give fewer points
//     scoreDisplay.textContent = "Score: " + score;

//     // Grow more at higher levels
//     for (let i = 0; i < growSize; i++) {
//       snake.push({ ...snake[snake.length - 1] });
//     }

//     if (score % 100 === 0) {
//       level++;
//       levelDisplay.textContent = "Level: " + level;
//       gameSpeed = Math.max(80, gameSpeed - 15);
//       growSize = Math.min(3, growSize + 1);
//       placeObstacles(level - 1); // add more obstacles
//       clearInterval(gameLoop);
//       gameLoop = setInterval(gameLoopFn, gameSpeed);
//     }
//     placeFood();
//   } else {
//     snake.pop();
//   }

//   // Collisions
//   if (
//     head.x < 0 || head.y < 0 ||
//     head.x >= canvas.width || head.y >= canvas.height ||
//     snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y) ||
//     obstacles.some(obs => obs.x === head.x && obs.y === head.y)
//   ) {
//     gameOver();
//     return;
//   }

//   // Draw
//   ctx.fillStyle = "#000";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   drawSnake();
//   drawFood();
//   drawObstacles();
// }

// // ✅ Game over
// function gameOver() {
//   clearInterval(gameLoop);
//   clearTimeout(foodTimer);
//   finalScoreDisplay.textContent = "Score: " + score;
//   finalLevelDisplay.textContent = "Level: " + level;
//   gameOverDisplay.style.display = "block";
// }

// // ✅ Keyboard controls
// document.addEventListener("keydown", e => {
//   if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -grid; }
//   else if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = grid; }
//   else if (e.key === "ArrowLeft" && dx === 0) { dx = -grid; dy = 0; }
//   else if (e.key === "ArrowRight" && dx === 0) { dx = grid; dy = 0; }
// });

// // ✅ Mobile controls (fixed for responsiveness)
// document.querySelectorAll(".control-button").forEach(btn => {
//   let pressTimer;

//   btn.addEventListener("touchstart", e => {
//     e.preventDefault();
//     const dir = btn.getAttribute("data-dir");
//     setDirection(dir);
//     pressTimer = setInterval(() => setDirection(dir), 100);
//   });

//   btn.addEventListener("touchend", e => {
//     e.preventDefault();
//     clearInterval(pressTimer);
//   });

//   btn.addEventListener("click", () => {
//     const dir = btn.getAttribute("data-dir");
//     setDirection(dir);
//   });
// });

// function setDirection(dir) {
//   if (dir === "up" && dy === 0) { dx = 0; dy = -grid; }
//   if (dir === "down" && dy === 0) { dx = 0; dy = grid; }
//   if (dir === "left" && dx === 0) { dx = -grid; dy = 0; }
//   if (dir === "right" && dx === 0) { dx = grid; dy = 0; }
// }

// // ✅ Start game
// function startGame() {
//   startScreen.style.display = "none";
//   initGame();
//   clearInterval(gameLoop);
//   gameLoop = setInterval(gameLoopFn, gameSpeed);
// }

// startButton.addEventListener("click", startGame);
// restartButton.addEventListener("click", startGame);




// const canvas = document.getElementById("game-canvas");
// const ctx = canvas.getContext("2d");
// const scoreDisplay = document.getElementById("score-display");
// const levelDisplay = document.getElementById("level-display");
// const gameOverDisplay = document.getElementById("game-over");
// const finalScoreDisplay = document.getElementById("final-score");
// const finalLevelDisplay = document.getElementById("final-level");
// const startScreen = document.getElementById("start-screen");
// const startButton = document.getElementById("start-button");
// const restartButton = document.getElementById("restart-button");

// const grid = 20;
// let snake, food, dx, dy, score, level, gameSpeed, gameLoop;
// let foodTimer, obstacles;

// // ✅ Initialize game
// function initGame() {
//   snake = [
//     { x: 160, y: 200 },
//     { x: 140, y: 200 },
//     { x: 120, y: 200 }
//   ];
//   dx = grid;
//   dy = 0;
//   score = 0;
//   level = 1;
//   gameSpeed = 200;
//   obstacles = [];
//   placeFood();
//   scoreDisplay.textContent = "Score: " + score;
//   levelDisplay.textContent = "Level: " + level;
//   gameOverDisplay.style.display = "none";
// }

// // ✅ Place random food
// function placeFood() {
//   food = {
//     x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
//     y: Math.floor(Math.random() * (canvas.height / grid)) * grid
//   };
//   // Reset timer (food disappears if not eaten)
//   clearTimeout(foodTimer);
//   foodTimer = setTimeout(() => placeFood(), 7000); // 7 sec lifespan
// }

// // ✅ Place obstacles
// function placeObstacles(count) {
//   obstacles = [];
//   for (let i = 0; i < count; i++) {
//     obstacles.push({
//       x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
//       y: Math.floor(Math.random() * (canvas.height / grid)) * grid
//     });
//   }
// }

// // ✅ Draw snake
// function drawSnake() {
//   snake.forEach((seg, i) => {
//     if (i === 0) {
//       ctx.fillStyle = "#00ff00";
//       ctx.fillRect(seg.x, seg.y, grid - 2, grid - 2);

//       // Eyes
//       ctx.fillStyle = "white";
//       const eyeSize = 4;
//       if (dx > 0) {
//         ctx.fillRect(seg.x + grid - 10, seg.y + 4, eyeSize, eyeSize);
//         ctx.fillRect(seg.x + grid - 10, seg.y + grid - 10, eyeSize, eyeSize);
//       } else if (dx < 0) {
//         ctx.fillRect(seg.x + 6, seg.y + 4, eyeSize, eyeSize);
//         ctx.fillRect(seg.x + 6, seg.y + grid - 10, eyeSize, eyeSize);
//       } else if (dy > 0) {
//         ctx.fillRect(seg.x + 4, seg.y + grid - 10, eyeSize, eyeSize);
//         ctx.fillRect(seg.x + grid - 10, seg.y + grid - 10, eyeSize, eyeSize);
//       } else if (dy < 0) {
//         ctx.fillRect(seg.x + 4, seg.y + 6, eyeSize, eyeSize);
//         ctx.fillRect(seg.x + grid - 10, seg.y + 6, eyeSize, eyeSize);
//       }

//       // Pupils
//       ctx.fillStyle = "black";
//       const pSize = 2;
//       if (dx > 0) {
//         ctx.fillRect(seg.x + grid - 9, seg.y + 5, pSize, pSize);
//         ctx.fillRect(seg.x + grid - 9, seg.y + grid - 9, pSize, pSize);
//       } else if (dx < 0) {
//         ctx.fillRect(seg.x + 7, seg.y + 5, pSize, pSize);
//         ctx.fillRect(seg.x + 7, seg.y + grid - 9, pSize, pSize);
//       } else if (dy > 0) {
//         ctx.fillRect(seg.x + 5, seg.y + grid - 9, pSize, pSize);
//         ctx.fillRect(seg.x + grid - 9, seg.y + grid - 9, pSize, pSize);
//       } else if (dy < 0) {
//         ctx.fillRect(seg.x + 5, seg.y + 7, pSize, pSize);
//         ctx.fillRect(seg.x + grid - 9, seg.y + 7, pSize, pSize);
//       }

//       // Tongue
//       ctx.fillStyle = "red";
//       if (dx > 0) ctx.fillRect(seg.x + grid, seg.y + grid / 2 - 1, 4, 2);
//       if (dx < 0) ctx.fillRect(seg.x - 4, seg.y + grid / 2 - 1, 4, 2);
//       if (dy > 0) ctx.fillRect(seg.x + grid / 2 - 1, seg.y + grid, 2, 4);
//       if (dy < 0) ctx.fillRect(seg.x + grid / 2 - 1, seg.y - 4, 2, 4);
//     } else {
//       ctx.fillStyle = "#00aa00";
//       ctx.fillRect(seg.x, seg.y, grid - 2, grid - 2);
//     }
//   });
// }

// // ✅ Draw food
// function drawFood() {
//   ctx.fillStyle = "red";
//   ctx.beginPath();
//   ctx.arc(food.x + grid / 2, food.y + grid / 2, grid / 2 - 3, 0, Math.PI * 2);
//   ctx.fill();

//   ctx.fillStyle = "rgba(255,255,255,0.7)";
//   ctx.beginPath();
//   ctx.arc(food.x + grid / 2 - 3, food.y + grid / 2 - 3, 3, 0, Math.PI * 2);
//   ctx.fill();
// }

// // ✅ Draw obstacles
// function drawObstacles() {
//   ctx.fillStyle = "gray";
//   obstacles.forEach(obs => {
//     ctx.fillRect(obs.x, obs.y, grid - 2, grid - 2);
//   });
// }

// // ✅ Main game loop
// function gameLoopFn() {
//   const head = { x: snake[0].x + dx, y: snake[0].y + dy };
//   snake.unshift(head);

//   // Eat food
//   if (head.x === food.x && head.y === food.y) {
//     score += 1; // ✅ only +1 point
//     scoreDisplay.textContent = "Score: " + score;

//     // ✅ Grow only one block
//     snake.push({ ...snake[snake.length - 1] });

//     if (score % 20 === 0) { // ✅ Level up every 20 points
//       level++;
//       levelDisplay.textContent = "Level: " + level;
//       gameSpeed = Math.max(80, gameSpeed - 15); // faster
//       placeObstacles(level - 1); // add obstacles
//       clearInterval(gameLoop);
//       gameLoop = setInterval(gameLoopFn, gameSpeed);
//     }
//     placeFood();
//   } else {
//     snake.pop();
//   }

//   // Collisions
//   if (
//     head.x < 0 || head.y < 0 ||
//     head.x >= canvas.width || head.y >= canvas.height ||
//     snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y) ||
//     obstacles.some(obs => obs.x === head.x && obs.y === head.y)
//   ) {
//     gameOver();
//     return;
//   }

//   // Draw
//   ctx.fillStyle = "#000";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   drawSnake();
//   drawFood();
//   drawObstacles();
// }

// // ✅ Game over
// function gameOver() {
//   clearInterval(gameLoop);
//   clearTimeout(foodTimer);
//   finalScoreDisplay.textContent = "Score: " + score;
//   finalLevelDisplay.textContent = "Level: " + level;
//   gameOverDisplay.style.display = "block";
// }

// // ✅ Keyboard controls
// document.addEventListener("keydown", e => {
//   if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -grid; }
//   else if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = grid; }
//   else if (e.key === "ArrowLeft" && dx === 0) { dx = -grid; dy = 0; }
//   else if (e.key === "ArrowRight" && dx === 0) { dx = grid; dy = 0; }
// });

// // ✅ Mobile controls
// document.querySelectorAll(".control-button").forEach(btn => {
//   let pressTimer;

//   btn.addEventListener("touchstart", e => {
//     e.preventDefault();
//     const dir = btn.getAttribute("data-dir");
//     setDirection(dir);
//     pressTimer = setInterval(() => setDirection(dir), 100);
//   });

//   btn.addEventListener("touchend", e => {
//     e.preventDefault();
//     clearInterval(pressTimer);
//   });

//   btn.addEventListener("click", () => {
//     const dir = btn.getAttribute("data-dir");
//     setDirection(dir);
//   });
// });

// function setDirection(dir) {
//   if (dir === "up" && dy === 0) { dx = 0; dy = -grid; }
//   if (dir === "down" && dy === 0) { dx = 0; dy = grid; }
//   if (dir === "left" && dx === 0) { dx = -grid; dy = 0; }
//   if (dir === "right" && dx === 0) { dx = grid; dy = 0; }
// }

// // ✅ Start game
// function startGame() {
//   startScreen.style.display = "none";
//   initGame();
//   clearInterval(gameLoop);
//   gameLoop = setInterval(gameLoopFn, gameSpeed);
// }

// startButton.addEventListener("click", startGame);
// restartButton.addEventListener("click", startGame);



const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score-display");
const levelDisplay = document.getElementById("level-display");
const gameOverDisplay = document.getElementById("game-over");
const finalScoreDisplay = document.getElementById("final-score");
const finalLevelDisplay = document.getElementById("final-level");
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");

const grid = 20;
let snake, food, dx, dy, score, level, gameSpeed, gameLoop;
let foodTimer, obstacles;

// ✅ Initialize game
function initGame() {
  snake = [
    { x: 160, y: 200 },
    { x: 140, y: 200 }
  ]; // start with 2 blocks only

  dx = grid;
  dy = 0;
  score = 0;
  level = 1;
  gameSpeed = 200;
  obstacles = [];
  placeFood();
  scoreDisplay.textContent = "Score: " + score;
  levelDisplay.textContent = "Level: " + level;
  gameOverDisplay.style.display = "none";
}

// ✅ Place random food
function placeFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
    y: Math.floor(Math.random() * (canvas.height / grid)) * grid
  };
  clearTimeout(foodTimer);
  foodTimer = setTimeout(() => placeFood(), 7000); // 7 sec lifespan
}

// ✅ Place obstacles
function placeObstacles(count) {
  obstacles = [];
  for (let i = 0; i < count; i++) {
    obstacles.push({
      x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
      y: Math.floor(Math.random() * (canvas.height / grid)) * grid
    });
  }
}

// ✅ Draw snake
function drawSnake() {
  snake.forEach((seg, i) => {
    if (i === 0) {
      ctx.fillStyle = "#00ff00";
      ctx.fillRect(seg.x, seg.y, grid - 2, grid - 2);

      // Eyes
      ctx.fillStyle = "white";
      const eyeSize = 4;
      if (dx > 0) {
        ctx.fillRect(seg.x + grid - 10, seg.y + 4, eyeSize, eyeSize);
        ctx.fillRect(seg.x + grid - 10, seg.y + grid - 10, eyeSize, eyeSize);
      } else if (dx < 0) {
        ctx.fillRect(seg.x + 6, seg.y + 4, eyeSize, eyeSize);
        ctx.fillRect(seg.x + 6, seg.y + grid - 10, eyeSize, eyeSize);
      } else if (dy > 0) {
        ctx.fillRect(seg.x + 4, seg.y + grid - 10, eyeSize, eyeSize);
        ctx.fillRect(seg.x + grid - 10, seg.y + grid - 10, eyeSize, eyeSize);
      } else if (dy < 0) {
        ctx.fillRect(seg.x + 4, seg.y + 6, eyeSize, eyeSize);
        ctx.fillRect(seg.x + grid - 10, seg.y + 6, eyeSize, eyeSize);
      }

      // Pupils
      ctx.fillStyle = "black";
      const pSize = 2;
      if (dx > 0) {
        ctx.fillRect(seg.x + grid - 9, seg.y + 5, pSize, pSize);
        ctx.fillRect(seg.x + grid - 9, seg.y + grid - 9, pSize, pSize);
      } else if (dx < 0) {
        ctx.fillRect(seg.x + 7, seg.y + 5, pSize, pSize);
        ctx.fillRect(seg.x + 7, seg.y + grid - 9, pSize, pSize);
      } else if (dy > 0) {
        ctx.fillRect(seg.x + 5, seg.y + grid - 9, pSize, pSize);
        ctx.fillRect(seg.x + grid - 9, seg.y + grid - 9, pSize, pSize);
      } else if (dy < 0) {
        ctx.fillRect(seg.x + 5, seg.y + 7, pSize, pSize);
        ctx.fillRect(seg.x + grid - 9, seg.y + 7, pSize, pSize);
      }

      // Tongue
      ctx.fillStyle = "red";
      if (dx > 0) ctx.fillRect(seg.x + grid, seg.y + grid / 2 - 1, 4, 2);
      if (dx < 0) ctx.fillRect(seg.x - 4, seg.y + grid / 2 - 1, 4, 2);
      if (dy > 0) ctx.fillRect(seg.x + grid / 2 - 1, seg.y + grid, 2, 4);
      if (dy < 0) ctx.fillRect(seg.x + grid / 2 - 1, seg.y - 4, 2, 4);
    } else {
      ctx.fillStyle = "#00aa00";
      ctx.fillRect(seg.x, seg.y, grid - 2, grid - 2);
    }
  });
}

// ✅ Draw food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(food.x + grid / 2, food.y + grid / 2, grid / 2 - 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.beginPath();
  ctx.arc(food.x + grid / 2 - 3, food.y + grid / 2 - 3, 3, 0, Math.PI * 2);
  ctx.fill();
}

// ✅ Draw obstacles
function drawObstacles() {
  ctx.fillStyle = "gray";
  obstacles.forEach(obs => {
    ctx.fillRect(obs.x, obs.y, grid - 2, grid - 2);
  });
}

// ✅ Main game loop
function gameLoopFn() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    score += 1; 
    scoreDisplay.textContent = "Score: " + score;

    // ✅ Grow only 1 block → do nothing here (no pop)
    if (score % 20 === 0) { 
      level++;
      levelDisplay.textContent = "Level: " + level;
      gameSpeed = Math.max(80, gameSpeed - 15);
      placeObstacles(level - 1);
      clearInterval(gameLoop);
      gameLoop = setInterval(gameLoopFn, gameSpeed);
    }
    placeFood();
  } else {
    // Move normally (remove tail)
    snake.pop();
  }

  // Collisions
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height ||
    snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y) ||
    obstacles.some(obs => obs.x === head.x && obs.y === head.y)
  ) {
    gameOver();
    return;
  }

  // Draw
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  drawObstacles();
}

// ✅ Game over
function gameOver() {
  clearInterval(gameLoop);
  clearTimeout(foodTimer);
  finalScoreDisplay.textContent = "Score: " + score;
  finalLevelDisplay.textContent = "Level: " + level;
  gameOverDisplay.style.display = "block";
}

// ✅ Keyboard controls
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -grid; }
  else if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = grid; }
  else if (e.key === "ArrowLeft" && dx === 0) { dx = -grid; dy = 0; }
  else if (e.key === "ArrowRight" && dx === 0) { dx = grid; dy = 0; }
});

// ✅ Mobile controls
document.querySelectorAll(".control-button").forEach(btn => {
  let pressTimer;

  btn.addEventListener("touchstart", e => {
    e.preventDefault();
    const dir = btn.getAttribute("data-dir");
    setDirection(dir);
    pressTimer = setInterval(() => setDirection(dir), 100);
  });

  btn.addEventListener("touchend", e => {
    e.preventDefault();
    clearInterval(pressTimer);
  });

  btn.addEventListener("click", () => {
    const dir = btn.getAttribute("data-dir");
    setDirection(dir);
  });
});

function setDirection(dir) {
  if (dir === "up" && dy === 0) { dx = 0; dy = -grid; }
  if (dir === "down" && dy === 0) { dx = 0; dy = grid; }
  if (dir === "left" && dx === 0) { dx = -grid; dy = 0; }
  if (dir === "right" && dx === 0) { dx = grid; dy = 0; }
}

// ✅ Start game
function startGame() {
  startScreen.style.display = "none";
  initGame();
  clearInterval(gameLoop);
  gameLoop = setInterval(gameLoopFn, gameSpeed);
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
