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
  static minPlayers = 2;
  static maxPlayers = 8;

  // création des joueurs par défauts
  static newDefaultPlayers() {
    let defaultPlayers = Game.defaultPlayers.map((player, i) => {
      return new player.class(player.player);
    });
    return defaultPlayers;
  }

  // initie 5 persos
  constructor() {
    this.numberOfPlayers = this.setNumberOfPlayers(); // initie le nombre de players
    this.turnLeft = this.setMode(); // nombre de tours restants
    this.combat =this.setCombat(); // Combat : 1. players vs players | 2. one player vs AI | 3. AI vs AI
    this.players = this.setPlayers(); // players au départ de la partie (array)
    this.playersLeft = this.players; // players restants à jouer (not dead) = gagnants en fin de partie
  }

  alertText(text){
    alert(text);
    console.log(text);
  }
  // sélection du nombre de joueurs
  setNumberOfPlayers(){
    this.alertText('*********** RPG GAME *********** \n ----------- Settings -----------');
    let numberInput = 0;
    while (numberInput < Game.minPlayers || numberInput > Game.maxPlayers || !numberInput) {
      numberInput = parseInt(window.prompt("Sélectionnez le nombre de joueurs (min 2 - max 8)"));
    }
    this.alertText(`rpgGame à ${numberInput} joueurs`);
    return numberInput;
  }
  // selection du mode x-Turn / survival
  setMode(){
    let userInput = 0;
    while(userInput < 1 ||  userInput > 2 || !userInput ){
      userInput = parseInt(window.prompt(`${userInput} Sélectionnez le mode de jeu: \n 1. Survival \n 2. x-Turns`));
    }
    // Survival
    if (userInput == 1){
      this.alertText('Mode Survie');
      return -1;
    // x-Turns
    }else{
      // choix du nombre de tours
      let numberInput = 0;
      while(numberInput <1 || !numberInput){
        numberInput  = parseInt(window.prompt("Choisissez le nombre de tours (minumum 1)"));
      }
      this.alertText(`Mode ${numberInput}-Turns`);
      return numberInput;
    }
  }

  // Sélection du mode de combat : P vs P | P vs AI | AI vs AI
  setCombat(){
    let userInput = 0;
    let text ='';
    while(!userInput || userInput < 1 || userInput > 3) {
      userInput = parseInt(window.prompt("Sélectionnez le mode de combat: \n 1. Players vs Players \n 2. One Player vs AI  \n 3. AI vs AI"));
    }

    switch (userInput) {
      case 1:
        text = ' Players vs Players';
        break;
      case 2:
        text = 'One Player vs AI';
        break;

      case 3:
        text = 'AI vs AI';
        break;
    
      default:
        this.alertText('???');
        break;
    }
    this.alertText(text);
    return userInput;
  }

  // Sélection des joueurs
  setPlayers(number) {
    this.alertText('nombre de joueurs');
    let players = Game.newDefaultPlayers();
    return this.#shuffle(players).slice(0, number);
  }

  // début de la partie
  startGame() {
    // paramètres de jeu
    // this.settings();
      
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

  
}
