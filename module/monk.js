import { Character } from "./character.js";

 // Monk (prètre qui peut se guérir)
 export class Monk extends Character {
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