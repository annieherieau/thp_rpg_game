import { Game } from "./game.js";

// lancement de l'application
export function launchApp(){
  const rpgGame = new Game();
  rpgGame.settings();
  // rpgGame.startGame();

}