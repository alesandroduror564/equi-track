/*
Filename: SophisticatedCode.js
Content: Code to simulate a digital game with multiple levels and high scores.
*/

// Game class
class Game {
  constructor(name, levels) {
    this.name = name;
    this.levels = levels;
    this.currentLevel = 1;
    this.player = null;
  }

  start() {
    console.log(`Welcome to ${this.name}! Get ready to play.`);
    this.player = new Player();
    this.levels.forEach((level, index) => {
      console.log(`Starting Level ${index + 1}...`);
      level.play(this.player);
      console.log(`Completed Level ${index + 1} with score: ${this.player.score}`);
      console.log("---------------------------------");
    });
    console.log(`Congratulations, you completed all levels in ${this.name}!`);
    this.showHighScores();
  }

  showHighScores() {
    console.log("----------- High Scores -----------");
    console.log("Name\t\tScore");
    this.player.highScores.forEach((score) => {
      console.log(`${score.name}\t\t${score.score}`);
    });
    console.log("---------------------------------");
  }
}

// Level class
class Level {
  constructor(number, difficulty) {
    this.number = number;
    this.difficulty = difficulty;
  }

  play(player) {
    console.log(`Playing Level ${this.number} with difficulty ${this.difficulty}...`);
    // Simulate gameplay logic
    let score = Math.floor(Math.random() * (1000 * this.difficulty));
    player.updateScore(score);
  }
}

// Player class
class Player {
  constructor() {
    this.score = 0;
    this.highScores = [];
  }

  updateScore(score) {
    this.score += score;
  }

  saveHighScore(name) {
    this.highScores.push({ name, score: this.score });
  }
}

// Create levels
const levels = [
  new Level(1, 1),
  new Level(2, 2),
  new Level(3, 3),
  new Level(4, 4),
  new Level(5, 5),
];

// Create game
const game = new Game("Super Game", levels);

// Start game
game.start();