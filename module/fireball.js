import { Character } from "./character.js";
import { addElement } from "../index.js";

// Fireball (Boule de feu et de nerfs)
export class Fireball extends Character {
  constructor(playerName) {
    super();
    this.player_name = playerName ? playerName : Fireball.playerName(); // nom du joueur
    this.class_name = Fireball.name;
    this.hp_max = 10; //  health points maxi
    this.hp = this.hp_max; // health points
    this.mana_max = 200; // mana points maxi
    this.mana = this.mana_max; // mana points
    this.dmg = 2; // damage for simple attack
    this.special = "Big Bang"; // special attack name
    this.dmg_spe = 7; // damage for special attack
    this.mana_cost = 25; // mana cost for make special attack
    this.self_hp = 0; // hp plus : gain de vie du spécial
  }
}
