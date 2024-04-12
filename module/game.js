// import des personnages
import { Character } from "./character.js";
import { Fighter } from "./fighter.js";
import { Paladin } from "./paladin.js";
import { Monk } from "./monk.js";
import { Berzerker } from "./berzerker.js";
import { Assassin } from "./assasin.js";
import { Wizard } from "./wizard.js";
import { Fireball } from "./fireball.js";

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

  // création des joueurs par défauts
  static newAiPlayers() {
    let aiPlayers = Game.defaultPlayers.map((aiPlayer, i) => {
      return new aiPlayer.class(aiPlayer.player);
    });
    return aiPlayers;
  }

  // initie 5 persos
  constructor(players) {
    this.numberOfPlayers = 5; // initie le nombre de players
    this.turnLeft = 10; // nombre de tours restants
    this.combat = 2; // Combat : 1. players vs players | 2. one player vs AI | 3. AI vs AI
    this.players = players; // players au départ de la partie
    this.playersLeft = this.players; // players restants à jouer (not dead) = gagnants en fin de partie
    this.turnCount = 1;
  }

  //  ************** SETTING ************* //
  settings(){
    this.numberOfPlayers = parseInt(this.getIntput('nbreRadio')); // initie le nombre de players
    // mode  Survival / x-Turn
    // nombre de tours restants
    this.turnLeft = parseInt(this.getIntput('turnNumberInput')); 
    this.combat = parseInt(this.getIntput('combatRadio')); // Combat : 1. players vs players | 2. one player vs AI | 3. AI vs AI
    this.players = this.setPlayers(this.numberOfPlayers); // players au départ de la partie

  }

  // récupérer les infos formulaire
  getIntput(paraName){
    let url_string = window.location.href; // www.test.com?filename=test
      let url = new URL(url_string);
      let paramValue = url.searchParams.get(paraName);
      return paramValue;
  }

  // Sélection des joueurs
  setPlayers(number) {
    let players = [];
    // en fonction du mode Combat
    switch (this.combat) {
      // P vs P : le user choisi chaque joueur
      case 1:
        for (let i = 0; i < this.numberOfPlayers; i++) {
          players.push(this.newHumanPlayer(i+1));
        }
        break;
      // P vs AI : le user choisi 1 joueur et AI le reste
      case 2:
        players = this.#shuffle(Game.newAiPlayers()).slice(0, number - 1);
        players.push(this.newHumanPlayer());
        break;
      // AI vs AI: création auto des joueurs
      default:
        players = this.#shuffle(Game.newAiPlayers()).slice(0, number);
        break;
    }
    this.playersLeft = players;
    // console.log(players);
    // this.watchStats(players);
    console.log(`-------------------------------`);
    return players;
  }

  // nouveau joueur humain
  newHumanPlayer(number = 1) {
    let playerClass = Game.defaultPlayers.find( p => p.class.name == this.getIntput(`class${number}`)).class;
    let player = new playerClass(this.getIntput(`name${number}`));
    // nom par défaut si vide
    if (!player.player_name){ player.player_name = playerClass.playerName()};
    // Humain
    player.ai = false;
    return player;
  }

  // ************ GAME PLAY ************** //
  // début de la partie
  startGame() {
    this.settings();
    this.watchStats();
    document.getElementById('nextTurn').classList.toggle('collapse');
    document.getElementById('nextTurn').classList.toggle('collapse');

    // do {
      
    //   this.startTurn();
    // } while (!this.isOver());
  }

  // début du tour
  startTurn() {
    this.watchStats();
    console.log(
      `***************** Tour n° ${this.turnCount} ***************** `
    );
    // Affichage des états des joueurs
    // Appel des players (ordre aléatoire)
    this.#shuffle(this.playersLeft).forEach((player) => {
      // joueur en vie
      if (!player.isDead()) {
        console.log(`----------------------------------------`);
        console.log(`C'est à ${player.player_name} de jouer :`);
        // action
        if (player.ai) {
          this.aiPlay(player);
        } else {
          // action human
          this.humanPlay(player);
        }
      }
    });

    // fin du tour
    console.log(`********************************************* `);
    // afficher un bouton pour skipTurn
    this.skipturn();
  }

  // Passage au tour suivant
  skipturn() {
    // enlever les morts
    this.playersLeft = this.checkPlayersLeft();

    this.turnCount++;
    if (this.turnLeft > 0) {
      this.turnLeft--;
    }
    // verifier conditions de fin de partie
    if (this.isOver()) {
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

  // fin de partie (vainqueurs)
  endGame() {
    // joueurs restants gagnent
    this.playersLeft.forEach((player) => {
      player.status = "winner";
    });
    console.log(`************ FIN DE LA PARTIE ************ `);
    console.log(`************   Vainqueur(s)   ************ `);
    this.watchStats();
     document.getElementById('nextTurn').classList.toggle('collapse');
  }

  // Action de jeu de l'AI
  aiPlay(player) {
    // Choix du joueur cible (sauf lui-meme et les morts)
    // la plus affaiblie
    let bestVictim = this.victims(player)[0];
    // choix de l'attaque random
    let boolean = Math.random() >= 0.25;  // 25% attaque simple et 75 % attaque spéciale ?
    if (boolean) {
      return player.specialAttack(bestVictim);
    } else {
      return player.attacks(bestVictim);
    }
  }

  // // Action de jeu de l'humain
  humanPlay(player) {
    // choix de la victime
    this.selectAttack(player, this.selectVictim(player));
  }

  // choix de la victime
  selectVictim(player) {
    // Liste des victime + création du menu
    let victims = this.victims(player);
    // reste 1 victime: pas d'input demandé
    if (victims.length == 1){ return victims[0]};

    let menu = victims.map((victim, i) => {
      return `${i + 1}. ${victim.player_name} (${victim.class_name}) | hp: ${
        victim.hp
      }/${victim.hp_max}`;
    });

    let userInput = "";
    while (!userInput || userInput < 1 || userInput > victims.length) {
      userInput = parseInt(
        window.prompt(`${player.player_name} choisis ta victime : \n ${menu.join(`\n`)}`)
      );
    }
    return victims[userInput - 1];
  }

  // choix de l'attaque
  selectAttack(player, victim) {
    // création du menu
    let menu = `1. Simple attaque => dégâts: ${player.dmg}\n`;
    menu += `2. ${player.special}  => `;
    if (player.mana_cost) {
      menu += `mana: ${player.mana_cost}. `;
    }
    if (player.dmg_spe) {
      menu += `dégâts: ${player.dmg_spe}. `;
    }
    if (player.self_hp) {
      menu += `hp: +${player.self_hp}. `;
    }

    // Choix du user
    let userInput = "";
    while (!userInput || userInput < 1 || userInput > 2) {
      userInput = parseInt(
        window.prompt(`${player.player_name} choisis ton attaque: \n ${menu}`)
      );
    }

    if (userInput == 1) {
      player.attacks(victim);
    } else {
      player.specialAttack(victim);
    }
  }
  //  ************** HELPERS ************* //
  // retrait des joueurs morts
  checkPlayersLeft(players = this.playersLeft) {
    return players.filter((player) => player.hp > 0);
  }

  // Affichage des stats
  watchStats(players = this.playersLeft) {
    for (let i = 0; i < 5; i++) {
      let li = document.getElementById(`p${i+1}`);

      if (i < players.length){
        let player = players[i];
        let ai = "";
        player.ai ? (ai = "ai-") : (ai = "h-");
        
        li.innerText = `${player.player_name} (${ai}${player.class_name}) : hp = ${player.hp}/${player.hp_max} | mana = ${player.mana}/${player.mana_max}`;
      }else{
        li.innerText = "";
      }
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

  // ordre aleatoire des joueurs
  #shuffle(players) {
    return players.sort(() => Math.random() - 0.5);
  }
}
