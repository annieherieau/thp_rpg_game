// Classe de joueur de base
class Character {
  // méthode de la classe
  static playerName() {
    return `${this.name}_${Math.round(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`;
  }

  // fields des instances
  constructor(playerName) {
    this.player_name = playerName ? playerName : Character.playerName(); // nom du joueur
    this.class_name = Character.name;
    this.death_hp = 20; // hp récupéré lors qu'on tue un adversaire
    this.status = "playing";
    this.hp_max = 15; //  health points maxi
    this.hp = this.hp_max; // health points
    this.mana_max = 40; // mana points maxi
    this.mana = this.mana_max; // mana points
    this.dmg = 3; // damage for simple attack
    this.special = "Special Attack"; // special attack name
    this.dmg_spe = 5; // damage for special attack
    this.mana_cost = 10; // mana cost for make special attack
    this.self_hp = 0; // hp plus : gain de vie du spécial
  }

  // **********  GAMING ACTIONS ********** //
  // lancer une attaque
  attacks(victim, damage = this.dmg) {
    // verifier si l'attaque est possible
    if (this.canAttack(victim)) {
      // OUI
      console.log(
        `${this.player_name} attaque ${victim.player_name} (dégâts:  ${damage} pv)`
      );
      this.#dealDamage(victim, damage);
      return true;
    } else {
      return false; // NON: l'attaque n'a pa été effectuée
    }
  }

  // se soigner
  takeCare(heal) {
    (this.hp += heal) > this.hp_max ? (this.hp = this.hp_max) : this.hp;
    console.log(
      `${this.player_name} se soigne avec ${heal} pv => hp : ${this.hp}`
    );
  }

  // lancer une attaque spéciale:  (true)
  // si mort(s) : attaque impossible (indefined)
  // si mana insuffisant: attaque normale (false)
  specialAttack(victim) {
    // conditions d'attaque
    if (!this.canAttack(victim)) {
      return undefined;
    }
    // si mana suffisant
    if (!this.checkMana()) {
      console.log(`Mana insuffisant... attaque normale`);
      this.attacks(victim);
      return false;
    }

    // Execution de l'attaque
    console.log(`${this.special} !`);
    // mana
    if(this.mana_cost){
      this.#useMana(this.mana_cost);
    }
    // attaque
    if (this.dmg_spe) {
      this.attacks(victim, this.dmg_spe);
    }
    // Soins
    if (this.self_hp) {
      this.takeCare(this.self_hp);
    }
    return true;
  }

  // **********  HELPERS  ********** //

  // vérifier si joueur est mort (hp = 0)
  isDead() {
    if (this.hp) {
      return false;
    } else {
      this.status = "loser";
      return true;
    }
  }

  // Verifier si l'attaque est possible
  canAttack(victim) {
    if (victim.isDead()) {
      console.log(`Attaque impossible: ${victim.player_name} est mort(e)`);
      return false;
    }
    if (this.isDead()) {
      console.log(`Attaque impossible: ${this.player_name} est mort(e)`);
      return false;
    }
    if (this == victim) {
      console.log(
        `Attaque impossible: ${this.player_name} ne peut s'attaquer lui-même`
      );
      return false;
    }
    return true;
  }

  // vérifier si mana suffisant pour attaque spéciale
  checkMana() {
    return this.mana >= this.mana_cost;
  }

  // **********  PRIVATE  ********** //

  // Utiliser le Mana (privée car appelé par une attaque)
  #useMana(mana_cost) {
    this.mana -= this.mana_cost;
    console.log(
      `${this.player_name} utilise ${mana_cost} mp => Mana: ${this.mana}`
    );
  }

  // infliger des dégâts à un adversaire (privée car appelé par une attaque)
  #dealDamage(victim, damage) {
    // victime reçoit les dégâts
    victim.#takeDamage(damage);
    // si victime est morte , le joueur reçoit du death_hp
    if (victim.isDead()) {
      this.takeCare(this.death_hp);
    }
    return true;
  }

  // Subir une attaque = Recevoir des dégats (privée car appelé par une attaque de l'adversaire)
  #takeDamage(damage) {
    // appliquer les dommages
    (this.hp -= damage) > 0 ? this.hp : (this.hp = 0);
    console.log(`${this.player_name} pert ${damage} pv => hp: ${this.hp}`);

    // verifier si mort
    this.isDead() ? console.log(`${this.player_name} est mort !`) : "";
    return true;
  }

  // **********  TESTING  ********** //

  // Data du player: pour verifier les fields du player
  data() {
    return {
      class_name: this.class_name, // nom de la classe
      player_name: this.player_name, // nom du personnage
      death_hp: this.death_hp, // hp récupéré lors qu'on tue un adversaire
      status: this.status, // statut playing | loser | winner
      hp: this.hp, // health points
      hp_max: this.hp_max, // health points maxi
      mana: this.mana, // mana points
      mana_max: this.mana_max, // mana points maxi
      dmg: this.dmg, // damage for simple attack
      special: this.special, // special attack name
      dmg_spe: this.dmg_spe, // damage for special attack
      mana_cost: this.mana_cost, // mana cost for make special attack
      self_hp: this.self_hp, // hp plus : gain de vie du spécial
    };
  }

  // Caractéristiques de la classe
  static classData() {
    return {
      name: this.name, // nom de la classe
    };
  }
}
// console.log(Character.classData());
// let MonCharacter = new Character();
// console.log(MonCharacter.data());
// let MonCharacter2 = new Character('MonCharacter2');
// console.log(MonCharacter2.data());

// Fighter : combattant équilibré
class Fighter extends Character {
  constructor(playerName) {
    super();
    this.player_name = playerName ? playerName : Fighter.playerName(); // nom du joueur
    this.class_name = Fighter.name;
    this.hp_max = 12; //  health points maxi
    this.hp = this.hp_max; // health points
    this.mana_max = 40; // mana points maxi
    this.mana = this.mana_max; // mana points
    this.dmg = 4; // damage for simple attack
    this.special = "Dark Vision"; // special attack name
    this.dmg_spe = 5; // damage for special attack
    this.mana_cost = 20; // mana cost for make special attack
    this.self_hp = 0; // hp plus : gain de vie du spécial
  }
}

// Paladin : chevalier puissant et défensif
class Paladin extends Character {
  constructor(playerName) {
    super();
    this.player_name = playerName ? playerName : Paladin.playerName(); // nom du joueur
    this.class_name = Paladin.name;
    this.hp_max = 16; //  health points maxi
    this.hp = this.hp_max; // health points
    this.mana_max = 160; // mana points maxi
    this.mana = this.mana_max; // mana points
    this.dmg = 3; // damage for simple attack
    this.special = "Dark Vision"; // special attack name
    this.dmg_spe = 4; // damage for special attack
    this.mana_cost = 40; // mana cost for make special attack
    this.self_hp = 5; // hp plus : gain de vie du spécial
  }
}

// Monk (prètre qui peut se guérir)
class Monk extends Character {
  constructor(playerName) {
    super();
    this.player_name = playerName ? playerName : Monk.playerName(); // nom du joueur
    this.class_name = Monk.name;
    this.hp_max = 8; //  health points maxi
    this.hp = this.hp_max; // health points
    this.mana_max = 200; // mana points maxi
    this.mana = this.mana_max; // mana points
    this.dmg = 2; // damage for simple attack
    this.special = "Heal"; // special attack name
    this.dmg_spe = 0; // damage for special attack
    this.mana_cost = 25; // mana cost for make special attack
    this.self_hp = 8; // hp plus : gain de vie du spécial
  }
}


// Berzerker (bourrin  avec une attaque élevée)
class Berzerker extends Character {
  constructor(playerName) {
    super();
    this.player_name = playerName ? playerName : Berzerker.playerName(); // nom du joueur
    this.class_name = Berzerker.name;
    this.hp_max = 8; //  health points maxi
    this.hp = this.hp_max; // health points
    this.mana_max = 0; // mana points maxi
    this.mana = this.mana_max; // mana points
    this.dmg = 4; // damage for simple attack
    this.special = "Rage"; // special attack name
    this.dmg_spe = this.dmg; // damage for special attack
    this.mana_cost = 0; // mana cost for make special attack
    this.self_hp = 0; // hp plus : gain de vie du spécial
  }

  specialAttack(victim){
    if (this.canAttack(victim)){
      this.hp -= 1;
      this.dmg += 1;
      this.dmg_spe = this.dmg;
      super.specialAttack(victim);
      return true;
    }else{
      return false;
    }
  }
}

// console.log(Berzerker.classData());
let player1 = new Berzerker();
console.log(player1.data());
let player2 = new Berzerker("player2");
console.log(player2.data());
player1.specialAttack(player2);
player1.specialAttack(player2);
player1.specialAttack(player2);


// Assassin (rusé et fourbe)
class Assassin extends Character {
  constructor(playerName) {
    super();
    this.player_name = playerName ? playerName : Assassin.playerName(); // nom du joueur
    this.class_name = Assassin.name;
    this.hp_max = 6; //  health points maxi
    this.hp = this.hp_max; // health points
    this.mana_max = 20; // mana points maxi
    this.mana = this.mana_max; // mana points
    this.dmg = 6; // damage for simple attack
    this.special = "Shadow Hit"; // special attack name
    this.dmg_spe = 7; // damage for special attack
    this.mana_cost = 20; // mana cost for make special attack
    this.self_hp = 0; // hp plus : gain de vie du spécial
    this.shadowShield = false; // déclenché par Special: ne prend pas de dégât au tours suivant
  }

  //  activation du ShadowShield
  specialAttack(victim){
    if (this.canAttack(victim)){
      super.specialAttack(victim);
      this.shadowShield = true;
      return true;
    }else{
      return false;
    }
  }
}