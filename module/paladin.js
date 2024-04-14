import { Character } from "./character.js";
import { addElement } from "../index.js";

// Paladin : chevalier puissant et défensif
export class Paladin extends Character {
  constructor(playerName) {
    super();
    this.player_name = playerName ? playerName : Paladin.playerName(); // nom du joueur
    this.class_name = Paladin.name;
    this.hp_max = 20; //  health points maxi
    this.hp = this.hp_max; // health points
    this.mana_max = 160; // mana points maxi
    this.mana = this.mana_max; // mana points
    this.dmg = 3; // damage for simple attack
    this.special = "Healing Light"; // special attack name
    this.dmg_spe = 5; // damage for special attack
    this.mana_cost = 40; // mana cost for make special attack
    this.self_hp = 5; // hp plus : gain de vie du spécial
    this.description = 'Chevalier puissant défensif';
    this.statSimple = `hp: ${this.hp_max} - mana: ${this.mana_max} - dmg:  ${this.dmg}`;
    this.statSpe1 = `${this.dmg_spe ? 'dmg: '+ this.dmg_spe : ''} - ${this.mana_cost ? 'mana: -'+ this.dmg_spe : ''} - ${this.self_hp ? 'hp: +'+ this.dmg_spe : ''}`;
    this.statSpe2 = 'bouclier 2 hp';
  }
}
