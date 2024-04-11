import { Game } from "./game.js";
//

// lancement de l'application
export function launchApp(){
  document.getElementById('launchApp').classList.toggle('collapse');
  // document.getElementById('settings').classList.toggle('collapse');
  // rpgGame.getInput(document.getElementById("userInput").value);
  const rpgGame = new Game();
  rpgGame.startGame();
}

// app();
