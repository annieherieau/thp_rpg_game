// Classe de joueur de base
class Character {
  constructor(hp, dmg, mana,  special, spe, mana_cost, hplus, name){
    this.hp = hp; // health points
    this.dmg = dmg; // damage for simple attack
    this.mana = mana; // mana points
    this.special = special; // special attack name
    this.spe = spe; // damage for special attack
    this.mana_cost = mana_cost; // mana cost for make special attack
    this.hplus = hplus; // hp plus : gain de vie
    this.name = name; // nom du personnage

  }

  // health points == 0 is loser
  loser() {
    return !hp;
  }

  // attaque normale
  attack(){
    console.log(`Attaque lancée`);
  }

  // vérifier si mana suffisant pour attaque spéciale
  checkMana(){
    return this.mana >= this.mana_cost
  }

  // attaque spéciale
  specialAttack(){
    if (this.checkMana()){
      console.log(`${special} lancé !`);
      this.mana -= this.mana_cost;
      this.hp += this.hplus;
    }else{
      console.log(`Mana insuffisant pour ${special}`);
      this.attack();
    }
  }
}

// Fighter : combattant équilibré
class Fighter extends Character {
  hp = 12;
  dmg = 4;
  mana = 40;
  special = 'Dark Vision';
  spe = 5;
  mana_cost = 20;

  constructor(name){
    super(hp, dmg, mana, spe, mana_cost, special);
    this.name = name;
  }
}

// Paladin : chevalier puissant et défensif
class Paladin extends Character {
  hp = 16;
  dmg = 3;
  mana = 160;
  special = 'Healing Lighting';
  spe = 4; // dark vision
  mana_cost = 40;
  
  constructor(name){
    super(hp, dmg, mana, spe, mana_cost, special);
    this.name = name;
  }
}

// Monk (prètre qui peut se guérir)
class Monk extends Character {
  constructor(hp, dmg, mana, spe, mana_cost){
    super(hp, dmg, mana, spe, mana_cost);

  }
}

// Berzerker (bourrin  avec une attaque élevée)
class Berzerker extends Character {
  constructor(hp, dmg, mana, spe, mana_cost){
    super(hp, dmg, mana, spe, mana_cost);

  }
}

// Assassin (rusé et fourbe)
class Assassin extends Character {
  constructor(hp, dmg, mana, spe, mana_cost){
    super(hp, dmg, mana, spe, mana_cost);

  }
}
