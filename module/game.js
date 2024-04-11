// import des personnages
import { Fighter } from "./fighter.js";
import { Paladin } from "./paladin.js";
import { Monk } from "./monk.js";
import { Berzerker } from "./berzerker.js";
import { Assassin } from "./assasin.js";

// RPG GAME
export class Game {
  // joueurs par défault
  static defaultPlayers = [
    { class: Fighter, player: "Grace" },
    { class: Paladin, player: "Ulder" },
    { class: Monk, player: "Moana" },
    { class: Berzerker, player: "Draven" },
    { class: Assassin, player: "Carl" },
  ];
  static survival = -1;
  static xTurns = 10;

  // création des joueurs par défauts
  static newDefaultPlayers() {
    let defaultPlayers = Game.defaultPlayers.map((player, i) => {
      return new player.class(player.player);
    });
    return defaultPlayers;
  }

  // initie 5 persos
  constructor(mode, players_array, numberOfTurns) {
    this.mode = mode ? mode : 3;  // 1. Mode players vs players | 2. 1 player vs AI | 3. AI vs AI
    this.players = players_array ? players_array : Game.newDefaultPlayers(); // players au départ de la partie (array)
    this.numberOfPlayers = players_array ? players_array.length : 5; // initie le nombre de players
    this.turnLeft = numberOfTurns ? numberOfTurns : 10; // nombre de tours restants
    this.playersLeft = this.players; // players restants à jouer (not dead) = gagnants en fin de partie
  }

  // début de la partie
  startGame() {
    // paramètres de jeu
    this.settings();
      
    while (this.isPlaying()){
      this.startTurn();
    }
  }

  // début du tour
  startTurn() {
    console.log(`****** Tour n° ${this.turnLeft} ****** `);
    // Affichage des états des joueurs
    this.watchStats();
    // Appel des players (ordre aléatoire)
    this.#shuffle(this.players).forEach((player) => {
      console.log(`C'est à ${player.player_name} de jouer :`);
      // action
    });

    // fin du tour
    this.skipturn();
  }

  // Passage au tour suivant
  skipturn() {
    if (this.turnLeft > 0 ) {
      this.turnLeft --;
    }
    // verifier conditions de fin de partie
    if (isOver()) {
      this.endGame();
    }
  }

  // Conditions de fin de partie
  isOver() {
    // mode Survival
    if (this.playersLeft.length == 1) {
      return true;
    }
    // mode x-Turns
    if (this.turnLeft == 0) {
      return true;
    }
    return false;
  }

  // la partie continue
  isPlaying(){
    return this.isOver();
  }

  // Action de jeu de l'AI
  aiPlay(){
    // Choix du joueur cible
    return this.playersLeft.sort(player => {
      player.hp;
    })[0];

    // choix de l'attaque

  }

  endGame() {
    // joueurs restants gagnent
    this.playersLeft.forEach((player) => {
      player.status = "winner";
    });
  }

  // Affichage des stats
  watchStats() {
    this.playersLeft.forEach((player) => {
      console.log(
        `${player.player_name} : hp = ${player.hp} / mana : ${player.mana} (${player.class_name})`
      );
    });
  }

  // ordre aleatoire des joueurs
  #shuffle(players) {
    return players.sort(() => Math.random() - 0.5);
  }

  // Paramètres de jeu
  settings() {
    // mode de jeu
    this.mode = this.setMode();

    // selection des players
    this.players = this.setPlayers();

  }

  // Sélection des joueurs
  setPlayers() {
    return this.#shuffle(this.players).slice(0, this.numberOfPlayers);
  }
}
