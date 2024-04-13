import { Character } from "./character.js";
import { addElement } from "../index.js";

// Monk (prètre qui peut se guérir)
export class Monk extends Character {
  constructor(playerName) {
    super();
    this.player_name = playerName ? playerName : Monk.playerName(); // nom du joueur
    this.class_name = Monk.name;
    this.hp_max = 15; //  health points maxi
    this.hp = this.hp_max; // health points
    this.mana_max = 200; // mana points maxi
    this.mana = this.mana_max; // mana points
    this.dmg = 3; // damage for simple attack
    this.special = "Heal"; // special attack name
    this.dmg_spe = 0; // damage for special attack
    this.mana_cost = 25; // mana cost for make special attack
    this.self_hp = 8; // hp plus : gain de vie du spécial
    this.description = 'Combattant équilibré';
    this.statSimple = `hp: ${this.hp_max} - mana: ${this.mana_max} - dmg:  ${this.dmg}`;
    this.statSpe1 = `${this.dmg_spe ? 'dmg: '+ this.dmg_spe : ''} - ${this.mana_cost ? 'mana: -'+ this.dmg_spe : ''} - ${this.self_hp ? 'hp: +'+ this.dmg_spe : ''}`;
    this.statSpe2 = 'bouclier 2 hp';
  }

  specialAttack(victim) {
    if (this.hp == this.hp_max){
      addElement('Santé déjà au max... attaque normale', 'p', 'text-warning');
      return super.attacks(victim);
    }else{
      return super.specialAttack(victim);
    }
  }
}
