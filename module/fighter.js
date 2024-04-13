import { Character } from "./character.js";
import { addElement } from "../index.js";

// Fighter : combattant équilibré
export class Fighter extends Character {
  constructor(playerName) {
    super();
    this.player_name = playerName ? playerName : Fighter.playerName(); // nom du joueur
    this.class_name = Fighter.name;
    this.hp_max = 20; //  health points maxi
    this.hp = this.hp_max; // health points
    this.mana_max = 60; // mana points maxi
    this.mana = this.mana_max; // mana points
    this.dmg = 4; // damage for simple attack
    this.special = "Dark Vision"; // special attack name
    this.dmg_spe = 5; // damage for special attack
    this.mana_cost = 20; // mana cost for make special attack
    this.self_hp = 0; // hp plus : gain de vie du spécial
    this.visionShield = false;
    this.shield = 2;
  }

  // DARK VISION : au prochain tour 2 dégats de moins par coup reçu (?)
  // activation du visionShield
  specialAttack(victim) {
      if (this.checkMana()) {
        this.visionShield = true;
        addElement(`VisionShied activé`);
      }
     return super.specialAttack(victim);
  }

  // Prise en compte du visionShield
  takeDamage(damage) {
    if (this.visionShield) {
      addElement(
        `${this.player_name} prend ${this.shield} dégâts de moins grâce à VisionShield !`
      );
      this.visionShield = false;
      damage -= this.shield;
    }
    super.takeDamage(damage);
  }
}
