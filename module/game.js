// import des personnages
import { Character } from "./character.js";
import { Fighter } from "./fighter.js";
import { Paladin } from "./paladin.js";
import { Monk } from "./monk.js";
import { Berzerker } from "./berzerker.js";
import { Assassin } from "./assasin.js";
import { Wizard } from "./wizard.js";
import { Fireball } from "./fireball.js";
import { getInput } from "../index.js";
import { addElement } from "../index.js";
import { removeElement } from "../index.js";
import { removeClassElement } from "../index.js";
import { addClassElement } from "../index.js";

// RPG GAME
export class Game {
  // joueurs par défault
  static defaultPlayers = [
    { class: Fighter, player: "Grace" },
    { class: Paladin, player: "Ulder" },
    { class: Monk, player: "Moana" },
    { class: Berzerker, player: "Draven" },
    { class: Assassin, player: "Carl" },
    { class: Wizard, player: "Nostradum" },
    { class: Fireball, player: "Dallas" },
  ];
  static minPlayers = 2;
  static maxPlayers = 5;

  // ordre aleatoire des joueurs
  static #shuffle(players) {
    return players.sort(() => Math.random() - 0.5);
  }

  // création des joueurs par défauts
  static newAiPlayers() {
    let aiPlayers = Game.defaultPlayers.map((aiPlayer, i) => {
      let newPlayer = new aiPlayer.class(aiPlayer.player);
      newPlayer.player_name += `_${Math.round(Math.random() * 90) + 10}`;
      return newPlayer;
    });
    return aiPlayers;
  }

  // initie 5 persos
  constructor(players) {
    this.numberOfPlayers = 5; // initie le nombre de players
    this.turnLeft = 10; // nombre de tours restants
    this.turnCount = 0;
    this.combat = 2; // Combat : 1. players vs players | 2. one player vs AI | 3. AI vs AI
    this.players = players; // players au départ de la partie
    this.playersLeft = this.players; // players restants à jouer (not dead) = gagnants en fin de partie
    this.player = ""; // joueur qui est en train de jouer
    this.playCount = 0;
    this.deadCount = 0;
  }

  //  ** SETTING * //
  settings() {
    this.numberOfPlayers = parseInt(getInput("nbreRadio")) ? parseInt(getInput("nbreRadio")) : this.numberOfPlayers; // initie le nombre de players
    this.turnLeft = parseInt(getInput("turnNumberInput")) ? parseInt(getInput("turnNumberInput")) : this.turnLeft; // nombre de tours restants
    this.combat = parseInt(getInput("combatRadio")) ? parseInt(getInput("combatRadio")) : this.combat; // Combat : 1. players vs players | 2. one player vs AI | 3. AI vs AI
    this.players = this.setPlayers(this.numberOfPlayers); // players au départ de la partie
  }

  // Sélection des joueurs
  setPlayers(number) {
    let players = [];
    let aiPlayers = Game.newAiPlayers();
    // en fonction du mode Combat
    switch (this.combat) {
      // P vs P : le user choisi tous les joueurs
      case 1:
        for (let i = 0; i < this.numberOfPlayers; i++) {
          players.push(this.newHumanPlayer(i + 1));
        }
        break;
      // P vs AI : le user choisi 1 joueur et AI le reste
      case 2:
        players = aiPlayers.slice(0, number - 1);
        players.push(this.newHumanPlayer());
        break;
      // AI vs AI: création auto des joueurs
      default:
        players = aiPlayers.slice(0, number);
        break;
    }
    this.playersLeft = players;
    return Game.#shuffle(players);
  }

  // nouveau joueur humain
  newHumanPlayer(number = 1) {
    let playerClass = Game.defaultPlayers.find(
      (p) => p.class.name == getInput(`class${number}`)
    ).class;
    let player = new playerClass(getInput(`name${number}`));
    // nom par défaut si vide
    if (!player.player_name) {
      player.player_name = playerClass.playerName();
    }
    // Humain
    player.ai = false;
    return player;
  }

  //  *********** GAME PLAY ************* //
  // début de la partie
  startGame() {
    this.settings();
    this.watchStats();
    removeClassElement("colonne2", "invisible");
  }

  // début du tour
  startTurn() {
    if (!this.skipturn()){ return false};
    // effacer la div du turn
    removeElement("gameplayHistory");
    // recréer la div du turn
    addElement(
      "",
      "div",
      "p-3",
      "gameplaySection",
      "gameplayHistory"
    );
    addElement(` Tour n° ${this.turnCount}  `, "h3", "px-0");
    addElement("", "hr");

    // Affichage des états des joueurs
    this.playersLeft = this.checkPlayersLeft();
    this.watchStats();
    this.playCount = 0;
    this.playerTurn();
  }

  // Tour du joueur
  playerTurn() {
    let auto = true;
    while (auto) {
      if (this.players[this.playCount]) {
        this.player = this.players[this.playCount];
        // player en vie
        if (this.player.hp > 0) {
          addElement(
            `C'est à ${this.player.player_name} de jouer :`,
            "h5",
            "px-0 my-2"
          );
          // Ai joue automatiquement
          if (this.player.ai) {
            this.aiPlay(this.player);
            this.watchStats();
            this.playCount++;
          } else {
            // human input ( boutons )
            removeClassElement("humanPlay", "collapse");
            addClassElement("skipTurnBtn", "invisible");
            auto = false;
          }
        } else {
          this.playCount++;
        }
      } else {
        this.player = "";
        auto = false;
      }
    }
  }

  // Passage au tour suivant
  skipturn() {
    // enlever les morts
    this.playersLeft = this.checkPlayersLeft();
    this.players = Game.#shuffle(this.players);
    this.turnCount++;
    if (this.turnLeft > 0) {
      this.turnLeft--;
    }
    // verifier conditions de fin de partie
    if (this.isOver()) {
      this.endGame();
      return false;
    }
    return true;
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

  // fin de partie (vainqueurs)
  endGame() {
    addElement("Fin de la Partie", "h3", "mt-3");
    addElement("", "hr");
    addElement(" Classement: ", "h5", "my-2");
    // joueurs restants gagnent
    this.playersLeft.forEach((player) => {
      player.status = "winner";
    });

    // affichage de tous les joueurs
    addElement(``, "ol", "list-group", "gameplayHistory", "olWinnners");
    let players = this.players.sort((a, b) => b.hp - a.hp);
    players.forEach((player) => {
      let text = `${player.player_name} (${player.ai ? "ai-" : "h-"}${
        player.class_name
      }) : hp: ${player.hp} (${player.status})`;
      addElement(text, "li", "list-group-item", "olWinnners");
    });

    addClassElement("skipTurnBtn", "invisible");
    removeClassElement("winners", "collapse");
    this.watchStats();
  }

  // Action de jeu de l'AI
  aiPlay(player) {
    // Choix du joueur cible (sauf lui-meme et les morts)
    // la plus affaiblie
    let bestVictim = this.victims(player)[0];
    // choix de l'attaque random
    let boolean = Math.random() >= 0.25; // 25% attaque simple et 75 % attaque spéciale ?
    let play;
    if (boolean) {
      play = player.specialAttack(bestVictim);
    } else {
      play = player.attacks(bestVictim);
    }
    return play;
  }

  // // Action de jeu de l'humain
  humanPlay(player) {
    // choix de la victime
    this.selectAttack(player, this.selectVictim(player));
  }

  // sélection de la victim (nom) (on ne peut le relier directement auxp players du Game)
  selectVictim(e) {
    return (document.getElementById("victim").innerText = e.target.id);
  }

  // retrouver la victime à partie du nom
  findVictim() {
    let victimName = document.getElementById("victim").innerText;
    return this.playersLeft.find((v) => v.player_name == victimName);
  }

  simpleAttack() {
    let victim = this.findVictim();
    if (!victim || this.player == victim || !victim) {
      alert("Choisis une victime");
    }
    if (this.player.attacks(victim)) {
      this.watchStats();
      addClassElement("humanPlay", "collapse");
      document.getElementById("victim").innerText = "Choisis ta victime";
      this.playCount++;
      this.playerTurn();
    }
  }

  // Human special
  specialAttack() {
    let victim = this.findVictim();
    if (!victim || this.player == victim || !victim) {
      alert("Choisis une victime");
    }
    if (this.player.specialAttack(victim)) {
      this.watchStats();
      document.getElementById("victim").innerText =  "Choisis ta victime";
      addClassElement("humanPlay", "collapse");
      removeClassElement("skipTurnBtn", "invisible");
      this.playCount++;
      this.playerTurn();
    }
  }

  //  ** HELPERS * //
  // retrait des joueurs morts
  checkPlayersLeft(players = this.playersLeft) {
    return players.filter((player) => player.hp > 0);
  }

  // Affichage des stats
  watchStats(players = this.playersLeft) {
    // enlever le ul
    removeElement("ulStats");
    // créer le ul
    addElement("", "ul", "list-group", "divStats", "ulStats");

    // créer les li
    let liClass = "list-group-item list-group-item-action";

    let ai = "";
    for (let player of players) {
      let text = `${player.player_name} (${player.class_name}) : hp = ${player.hp}/${player.hp_max} | mana = ${player.mana}/${player.mana_max}`;
      addElement(text, "li", liClass, "ulStats", player.player_name);
    }
    // ajouter event Listener : la fonction au click
    let liVictims = document.getElementsByClassName("list-group-item-action");
    for (let victim of liVictims) {
      victim.addEventListener("click", this.selectVictim);
    }
  }

  // sélection des victimes disponibles
  victims(player) {
    // enlever les morts
    this.playersLeft = this.checkPlayersLeft();
    let victims = this.playersLeft.filter((victim) => victim != player);
    // tri par hp
    victims.sort((a, b) => {
      a.hp - b.hp;
    });

    return victims;
  }
}
