import { Character } from "./character.js";

// Fighter : combattant équilibré
export class Fighter extends Character {
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
    this.visionShield = false;
    this.shield = 2;
    this.turnCount = 1;
  }

  // DARK VISION : au prochain tour 2 dégats de moins par coup reçu (?)
  // activation du visionShield
  specialAttack(victim){
    if (this.canAttack(victim)){
      if (this.checkMana()){ 
        this.visionShield = true; 
        console.log(`VisionShied activé`);
      }
        super.specialAttack(victim);
        return true;
    }else{
      return false;
    }
  }

  // Prise en compte du visionShield
  takeDamage(damage){
    if (this.visionShield){
      console.log(`${this.player_name} prend ${this.shield} dégâts de moins grâce à VisionShield !`);
      this.visionShield = false;
      damage-= this.shield;
    }
    super.takeDamage(damage);
  }


}

// console.log(Fighter.classData());
// let player1 = new Fighter();
// console.log(player1.data());
// let player2 = new Fighter("player2");
// console.log(player2.data());
// player1.specialAttack(player2);
// player1.specialAttack(player2);
// player1.specialAttack(player2);