import { Fighter } from "./fighter.js";
import { Paladin } from "./paladin.js";
import { Monk } from "./monk.js";
import { Berzerker } from "./berzerker.js";
import { Assassin } from "./assasin.js";

export class Game{
  static playerClasses = [
  ]

  // initie 5 persos
  constructor(numberOfPlayers, players, turnLeft){
    this.numberOfPlayers = numberOfPlayers ? numberOfPlayers : 5; // initie le nombre de players
    this.turnLeft = turnLeft ? turnLeft : 10; // nombre de tours restants
    this.players = players; // players au départ de la partie
    this.playersLeft = this.players; // players restants à jouer (not dead) = gagnants en fin de partie
  }

  // début de la partie
  startGame(){


  }

  newPlayer(player_name, class_name){

  }
  // Passage au tour suivant
  skipturn(){
    this.turnLeft --;
    if (this.turnLeft == 0){
      this.endGame();
    }
  }

  startTurn(){
    console.log(`Tour n° ${this.turnLeft}`);
    // Appel des players (ordre aléatoire)


  }

  endTurn(){

  }

  endGame(){

  }

  #shuffle(){

  }

  // choisi une class de player au hasard
  #randomPlayerClass(){

  }
}