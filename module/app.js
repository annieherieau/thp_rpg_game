import { Game } from "./game.js";



// lancement de l'application
export function launchApp(){
  window.rpgGame = new Game();
  // rpgGame.settings();
  window.rpgGame.startGame();

}