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
import { changeInnerText } from "../index.js";
import { sample } from "../index.js";
import { changeInnerHTML } from "../index.js";

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
    this.player = ""; // joueur qui est en train de jouer
    this.playCount = 0; // count des tour de joueurs
    this.losers = []; // joueur dans l'ordre de leur mort
  }

  //  ** SETTING * //
  settings() {
    this.numberOfPlayers = parseInt(getInput("nbreRadio"))
      ? parseInt(getInput("nbreRadio"))
      : this.numberOfPlayers; // initie le nombre de players
    this.turnLeft = parseInt(getInput("turnNumberInput"))
      ? parseInt(getInput("turnNumberInput")) + 1
      : this.turnLeft + 1; // nombre de tours restants
    this.combat = parseInt(getInput("combatRadio"))
      ? parseInt(getInput("combatRadio"))
      : this.combat; // Combat : 1. players vs players | 2. one player vs AI | 3. AI vs AI
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
    return Game.#shuffle(players);
  }

  // créer un nouveau joueur humain
  newHumanPlayer(number = 1) {
    // Classe par défaut si pas d'input
    let inputClass = getInput(`class${number}`)
      ? getInput(`class${number}`)
      : sample(Game.defaultPlayers).class.name;
    let inputName = getInput(`name${number}`)
      ? getInput(`name${number}`)
      : sample(Game.defaultPlayers).player;

    let playerClass = Game.defaultPlayers.find(
      (p) => p.class.name == inputClass
    ).class;
    let player = new playerClass(inputName);
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
    addClassElement("winners", "collapse");
    removeElement("gameplayHistory");
    removeClassElement("skipTurnBtn", "invisible");
    changeInnerText("skipTurnBtn", "Commencer");
  }

  // début du tour
  startTurn() {
    this.losers;
    this.skipturn();
    changeInnerText("skipTurnBtn", "Tour Suivant");
    // effacer la div du turn
    if (document.getElementById("gameplayHistory")) {
      removeElement("gameplayHistory");
    }
    // recréer la div du turn
    addElement("", "div", "p-3", "gameplaySection", "gameplayHistory");

    // Affichage des états des joueurs
    this.watchStats();
    this.playCount = 0;
    if (this.isOver()) {
      this.endGame();
    } else {
      if (this.leftPlayers().length > 1) {
        addElement(` Tour n° ${this.turnCount}  `, "h3", "px-0");
        addElement("", "hr");
      }
      this.playerTurn();
    }
  }

  // Tour du joueur
  playerTurn() {
    let auto = true;

    while (auto) {
      if (this.players[this.playCount]) {
        auto = !this.isOver();
        this.player = this.players[this.playCount];
        // player en vie
        if (this.player.hp > 0) {
          addElement(
            `${this.player.player_name} [${this.player.class_name}] joue :`,
            "h5",
            "px-0 my-2"
          );
          // Ai joue automatiquement
          if (this.player.ai) {
            addClassElement("playerCard", "collapse");
            this.aiPlay(this.player);
            this.watchStats();
            this.playCount++;
            if (this.leftPlayers().length == 1) {
              changeInnerText("skipTurnBtn", "Voir le classement");
            }
          } else {
            // human input ( boutons )
            document.getElementById("specialAttack").innerText =
              this.player.special;
            if (this.leftPlayers().length == 2) {
              let victim = this.leftPlayers().find((p) => p != this.player);
              changeInnerText("victim", victim.player_name);
            }
            removeClassElement("humanPlay", "collapse");
            addClassElement("skipTurnBtn", "invisible");
            removeClassElement("playerCard", "collapse");
            this.playerCard(this.player);
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
    this.players = Game.#shuffle(this.players);
    this.turnCount++;
    if (this.turnLeft > 0) {
      this.turnLeft--;
    }
  }

  // Conditions de fin de partie
  isOver() {
    // mode Survival
    if (this.leftPlayers().length == 1) {
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
    this.leftPlayers().forEach((player) => {
      player.status = "winner";
    });
    // affichage de du Classement
    let hallOfFame = this.leftPlayers()
      .sort((a, b) => {
        return b.hp - a.hp;
      })
      .concat(this.losers);
    addElement(``, "ol", "list-group", "gameplayHistory", "olWinnners");
    hallOfFame.forEach((player) => {
      let text = `${player.player_name} (${player.ai ? "ai-" : "h-"}${
        player.class_name
      })${player.hp ? " - hp: " + player.hp : ""}`;
      addElement(text, "li", "list-group-item", "olWinnners");
    });

    addClassElement("skipTurnBtn", "invisible");
    addClassElement("humanPlay", "collapse");
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

  // sélection de la victim (nom) (on ne peut le relier directement auxp players du Game)
  selectVictim(e) {
    return (document.getElementById("victim").innerText = e.target.id);
  }

  // retrouver la victime à partie du nom
  findVictim() {
    let victimName = document.getElementById("victim").innerText;
    return this.leftPlayers().find((v) => v.player_name == victimName);
  }

  // Human simple attack
  simpleAttack() {
    let victim = this.findVictim();
    if (!victim || this.player == victim || !victim) {
      alert("Choisis une victime");
    }
    this.humanEndTurn(this.player.attacks(victim));
  }

  // Human special attack
  specialAttack() {
    let victim = this.findVictim();
    if (!victim || this.player == victim || !victim) {
      alert("Choisis une victime");
    }
    this.humanEndTurn(this.player.specialAttack(victim));
  }

  // fin du tour human
  humanEndTurn(attack) {
    if (attack) {
      this.watchStats(this.leftPlayers());
      addClassElement("humanPlay", "collapse");
      document.getElementById("victim").innerText = "Choisis ta victime";
      removeClassElement("skipTurnBtn", "invisible");
      if (this.leftPlayers().length == 1) {
        addClassElement("skipTurnBtn", "invisible");
      }
      this.playCount++;
      this.playerTurn();
    }
  }

  //  ** HELPERS * //
  // retrait des joueurs morts + Ajout au classement final
  leftPlayers(players = this.players) {
    players.forEach((player) => {
      if (!player.hp && !this.losers.includes(player)) {
        this.losers.unshift(player);
      }
    });
    return players.filter((player) => player.hp > 0);
  }

  // Affichage des stats
  watchStats(players = this.leftPlayers(), debug = false) {
    if (!debug) {
      // enlever le ul
      removeElement("ulStats");
      // créer le ul
      addElement("", "ul", "list-group", "divStats", "ulStats");
    }

    // créer les li
    let liClass = "list-group-item list-group-item-action";
    let ulClass = debug ? "ulDebug" : "ulStats";
    let ai = "";
    for (let player of players) {
      let text = `${player.player_name} (${player.class_name}) : hp = ${player.hp}/${player.hp_max} | mana = ${player.mana}/${player.mana_max}`;
      addElement(text, "li", liClass, ulClass, player.player_name);
    }
    // ajouter event Listener : la fonction au click
    let liVictims = document.getElementsByClassName("list-group-item-action");
    for (let victim of liVictims) {
      victim.addEventListener("click", this.selectVictim);
    }
  }

  playerCard(player) {
    changeInnerText("description", player.description);
    changeInnerText("class_name", player.class_name);
    let text = `hp: ${player.hp_max} - mana: ${player.mana_max} - dmg:  ${player.dmg}`;
    changeInnerText("statSimple", text); 
    text = [`${player.dmg_spe ? 'dmg: '+ player.dmg_spe : ''}`, `${player.mana_cost ? 'mana: -'+ player.dmg_spe : ''}`, `${player.self_hp ? 'hp: +'+ player.dmg_spe : ''}`];
    let textHtml = `<strong>${player.special}</strong>:<br />
    ${text.join(' - ')}<br>${player.statSpe}`;
    changeInnerHTML(textHtml, 'special'); 
  }

  // sélection des victimes disponibles
  victims(player) {
    // enlever les morts
    let victims = this.leftPlayers().filter((victim) => victim != player);
    // tri par hp
    victims.sort((a, b) => {
      return a.hp - b.hp;
    });
    return victims;
  }

  debug() {
    this.settings();
    this.watchStats(this.players, true);
    changeInnerText("constructor", Game.name);
    changeInnerText("minPlayers", Game.minPlayers);
    changeInnerText("maxPlayers", Game.maxPlayers);
    changeInnerText("defaultPlayers.length", Game.defaultPlayers.length);
    changeInnerText("numberOfPlayers", this.numberOfPlayers);
    changeInnerText("turnLeft", this.turnLeft);
    changeInnerText("combat", this.combat);
  }
}
