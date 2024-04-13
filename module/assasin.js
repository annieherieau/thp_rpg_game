import { Character } from "./character.js";
import { addElement } from "../index.js";

// Assassin (rusé et fourbe)
export class Assassin extends Character {
  constructor(playerName) {
    super();
    this.player_name = playerName ? playerName : Assassin.playerName(); // nom du joueur
    this.class_name = Assassin.name;
    this.hp_max = 10; //  health points maxi
    this.hp = this.hp_max; // health points
    this.mana_max = 100; // mana points maxi
    this.mana = this.mana_max; // mana points
    this.dmg = 6; // damage for simple attack
    this.special = "Shadow Hit"; // special attack name
    this.dmg_spe = 7; // damage for special attack
    this.mana_cost = 20; // mana cost for make special attack
    this.self_hp = 0; // hp plus : gain de vie du spécial
    this.shadowShield = false; // déclenché par Special: ne prend pas de dégât au tours suivant
    this.description = 'Renard rusé et fourbe';
    this.statSimple = `hp: ${this.hp_max} - mana: ${this.mana_max} - dmg:  ${this.dmg}`;
    this.statSpe1 = `${this.dmg_spe ? 'dmg: '+ this.dmg_spe : ''} - ${this.mana_cost ? 'mana: -'+ this.dmg_spe : ''} - ${this.self_hp ? 'hp: +'+ this.dmg_spe : ''}`;
    this.statSpe2 = 'bouclier 100%';
  }
  // activation du ShadowShield
  specialAttack(victim) {
      if (this.checkMana()) {
        this.shadowShield = true;
        addElement(`ShadowShied activé`);
      }
      return super.specialAttack(victim);
  }

  // Prise en compte du ShadowShield
  takeDamage(damage) {
    if (this.shadowShield) {
      addElement(`${this.player_name} utilise ShadowShield !`);
      this.shadowShield = false;
      damage = 0;
    }
    super.takeDamage(damage);
  }
}
