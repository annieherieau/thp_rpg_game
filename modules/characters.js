// Classe de joueur de base
class Character {
  static playerName() {
    return `${Character.name}_${Math.round(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`;
  }

  static death_hp = 20; // hp récupéré lors qu'on tue un adversaire
  static status = "playing";
  static hp_max = 15;
  static mana_max = 40;
  static dmg = 3;
  static special = "Special Attack";
  static dmg_spe = 5;
  static mana_cost = 10;
  static self_hp = 0;

  // constructeur: prend par défaut les caractériques de la classe
  constructor(
    hp_max,
    dmg,
    mana_max,
    special,
    dmg_spe,
    mana_cost,
    self_hp,
    name,
    death_hp,
    status
  ) {
    this.death_hp = death_hp ? death_hp : Character.death_hp;
    this.status = status ? status : Character.status;
    this.hp = hp_max ? hp_max : Character.hp_max; // health points
    this.hp_max = hp_max ? hp_max : Character.hp_max; //  health points maxi
    this.dmg = dmg ? dmg : Character.dmg; // damage for simple attack
    this.mana = mana_max ? mana_max : Character.mana_max; // mana points
    this.mana_max = mana_max ? mana_max : Character.mana_max; // mana points maxi
    this.special = special ? special : Character.special; // special attack name
    this.dmg_spe = dmg_spe ? dmg_spe : Character.dmg_spe; // damage for special attack
    this.mana_cost = mana_cost ? mana_cost : Character.mana_cost; // mana cost for make special attack
    this.self_hp = self_hp ? self_hp : Character.self_hp; // hp plus : gain de vie du spécial
    this.name = name ? name : Character.playerName(); // // nom du joueur
  }

  // **********  GAMING ACTIONS ********** //
  // lancer une attaque
  attacks(victim, damage = this.dmg) {
    // verifier si l'attaque est possible
    if (this.canAttack(victim)) {
      // OUI
      console.log(
        `${this.name} attaque ${victim.name} (dégâts:  ${damage} pv)`
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
    console.log(`${this.name} se soigne avec ${heal} pv => hp : ${this.hp}`);
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
    this.#useMana(this.mana_cost);
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
      console.log(`Attaque impossible: ${victim.name} est mort(e)`);
      return false;
    }
    if (this.isDead()) {
      console.log(`Attaque impossible: ${this.name} est mort(e)`);
      return false;
    }
    if (this == victim) {
      console.log(
        `Attaque impossible: ${this.name} ne peut s'attaquer lui-même`
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
    console.log(`${this.name} utilise ${mana_cost} mp => Mana: ${this.mana}`);
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
    console.log(`${this.name} pert ${damage} pv => hp: ${this.hp}`);

    // verifier si mort
    this.isDead() ? console.log(`${this.name} est mort !`) : "";
    return true;
  }

  // **********  TESTING  ********** //

  // Data du player: pour verifier les fields du player
  data() {
    return {
      hp: this.hp, // health points
      hp_max: this.hp_max, // health points maxi
      dmg: this.dmg, // damage for simple attack
      mana: this.mana, // mana points
      mana_max: this.mana_max, // mana points maxi
      special: this.special, // special attack name
      dmg_spe: this.dmg_spe, // damage for special attack
      mana_cost: this.mana_cost, // mana cost for make special attack
      self_hp: this.self_hp, // hp plus : gain de vie du spécial
      name: this.name, // nom du personnage
      death_hp: this.death_hp, // hp récupéré lors qu'on tue un adversaire
      status: this.status, // statut playing | loser | winner
    };
  }
  
  // Caractéristiques de la classe
  static classData() {
    return {
      name: this.name, // nom de la classe
      death_hp: this.death_hp, // hp récupéré lors qu'on tue un adversaire
      status: this.status, // statut playing | loser | winner
      hp_max: this.hp_max, // health points maxi
      mana_max: this.mana_max, // mana points maxi
      dmg: this.dmg, // damage for simple attack
      special: this.special, // special attack name
      dmg_spe: this.dmg_spe, // damage for special attack
      mana_cost: this.mana_cost, // mana cost for make special attack
      self_hp: this.self_hp, // hp plus : gain de vie du spécial
      name: this.nameName(), // nom du joueur
    };
  }
}

const TEST = {
  hp: 10,
  dmg: 3,
  mana: 100,
  special: "mon spécial",
  dmg_spe: 4,
  mana_cost: 20,
  self_hp: 3,
  name: "monJoueur",
};

// Fighter : combattant équilibré
class Fighter extends Character {
  static hp_max = 12;
  static dmg = 4;
  static mana_max = 40;
  static special = "Dark Vision";
  static dmg_spe = 5;
  static mana_cost = 20;
}

// Paladin : chevalier puissant et défensif
class Paladin extends Character {
  hp = 16;
  dmg = 3;
  mana = 160;
  special = "takeCare Lighting";
  dmg_spe = 4; // dark vision
  mana_cost = 40;
}

// Monk (prètre qui peut se guérir)
class Monk extends Character {}

// Berzerker (bourrin  avec une attaque élevée)
class Berzerker extends Character {}

// Assassin (rusé et fourbe)
class Assassin extends Character {}
