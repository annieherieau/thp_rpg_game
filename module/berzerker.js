import { Character } from "./character.js";
import { addElement } from "../index.js";

// Berzerker (bourrin  avec une attaque élevée)
export class Berzerker extends Character {
  constructor(playerName) {
    super();
    this.player_name = playerName ? playerName : Berzerker.playerName(); // nom du joueur
    this.class_name = Berzerker.name;
    this.hp_max = 15; //  health points maxi
    this.hp = this.hp_max; // health points
    this.mana_max = 0; // mana points maxi
    this.mana = this.mana_max; // mana points
    this.dmg = 4; // damage for simple attack
    this.special = "Rage"; // special attack name
    this.dmg_spe = this.dmg; // damage for special attack
    this.mana_cost = 0; // mana cost for make special attack
    this.self_hp = 0; // hp plus : gain de vie du spécial
  }

  specialAttack(victim) {
      // ne peut pas se tuer...
      if (this.hp == 1) {
        addElement(
          `${this.special} impossible: ${this.player_name} va se se tuer !! attaque simple...`
        );
        return super.attacks(victim);
      }
      this.hp -= 1;
      this.dmg += 1;
      this.dmg_spe = this.dmg;
      return super.specialAttack(victim);
  }
}
