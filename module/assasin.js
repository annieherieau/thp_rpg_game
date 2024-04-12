import { Character } from "./character.js";
import { addText } from "./helpers.js";

// Assassin (rusé et fourbe)
export class Assassin extends Character {
  constructor(playerName) {
    super();
    this.player_name = playerName ? playerName : Assassin.playerName(); // nom du joueur
    this.class_name = Assassin.name;
    this.hp_max = 6; //  health points maxi
    this.hp = this.hp_max; // health points
    this.mana_max = 100; // mana points maxi
    this.mana = this.mana_max; // mana points
    this.dmg = 6; // damage for simple attack
    this.special = "Shadow Hit"; // special attack name
    this.dmg_spe = 7; // damage for special attack
    this.mana_cost = 20; // mana cost for make special attack
    this.self_hp = 0; // hp plus : gain de vie du spécial
    this.shadowShield = false; // déclenché par Special: ne prend pas de dégât au tours suivant
  }
  // activation du ShadowShield
  specialAttack(victim) {
    if (this.canAttack(victim)) {
      if (this.checkMana()) {
        this.shadowShield = true;
        addText(`ShadowShied activé`);
      }
      super.specialAttack(victim);
      return true;
    } else {
      return false;
    }
  }

  // Prise en compte du ShadowShield
  takeDamage(damage) {
    if (this.shadowShield) {
      addText(`${this.player_name} utilise ShadowShield !`);
      this.shadowShield = false;
      damage = 0;
    }
    super.takeDamage(damage);
  }
}
