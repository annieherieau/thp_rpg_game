import { Game } from "./game.js";
window.launchTest = launchTest;

// nouvelle instance
function launchTest(){
  window.testGame = new Game();
  window.testGame.debug();
}