// import des personnages
import { Fighter } from "./fighter.js";
import { Paladin } from "./paladin.js";
import { Monk } from "./monk.js";
import { Berzerker } from "./berzerker.js";
import { Assassin } from "./assasin.js";

// RPG GAME
export class Game{
  // joueurs par défault
  static defaultPlayers = [
    {class: Fighter, player: 'Grace'},
    {class: Paladin, player: 'Ulder'},
    {class: Monk, player: 'Moana'},
    {class: Berzerker, player: 'Draven'},
    {class: Assassin, player: 'Carl'},
  ]

  // création des joueurs par défauts
  static newDefaultPlayers(){
    let defaultPlayers = Game.defaultPlayers.map((player, i) => {
      return new player.class(player.player);
    })
    return defaultPlayers;
  }

  // initie 5 persos
  constructor(players_array, numberOfTurns){
    this.players = players_array ? players_array : Game.newDefaultPlayers(); // players au départ de la partie (array)
    this.numberOfPlayers = players_array ? players_array.length : 3 ; // initie le nombre de players
    this.turnLeft = numberOfTurns ? numberOfTurns : 10; // nombre de tours restants
    this.playersLeft = this.players; // players restants à jouer (not dead) = gagnants en fin de partie
  }

  // début de la partie
  startGame(){
    // selection des players
    this.players = this.#shuffle(this.players).slice(0, this.numberOfPlayers);
  }

  gamePlay(){
    // start

    // skip
  }

  // Passage au tour suivant
  skipturn(){
    this.turnLeft --;

    // verifier condition de fin de partie
    if (this.turnLeft == 0 || this.playersLeft.length == 1){
      this.endGame();
    }
  }

  startTurn(){
    console.log(`Tour n° ${this.turnLeft}`);
    
    // Appel des players (ordre aléatoire)
    this.#shuffle(this.players).forEach(player => {
    console.log(`C'est à ${player.player_name} de jouer :`);
      // action
    });;
  }

  endGame(){
    // joueurs restants gagnent
    this.playersLeft.forEach(player => { player.status = 'winner'});

  }

  // ordre aleatoire des joueurs
  #shuffle(players){
    return players.sort(() => Math.random() - 0.5); 
  }
}