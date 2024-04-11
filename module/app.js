import { Game } from "./game.js";

// lancement de l'application
export function launchApp(){
  // rpgGame.getInput(document.getElementById("userInput").value);
  const rpgGame = new Game();
  rpgGame.startGame();
}