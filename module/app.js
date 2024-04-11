import { Berzerker } from "./berzerker.js";
import { Game } from "./game.js";

function app(){
  const rpgGame = new Game();

  rpgGame.watchStats();

  // console.log(this.playersLeft.sort(player => {
  //   player.hp;
  // })[0]);
}

app();