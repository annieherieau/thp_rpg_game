import { Character } from "./character.js";
import { addElement } from "../index.js";

// Wizard (puissant Nécromancien, voleur de vie)
export class Wizard extends Character {
  constructor(playerName) {
    super();
    this.player_name = playerName ? playerName : Wizard.playerName(); // nom du joueur
    this.class_name = Wizard.name;
    this.hp_max = 10; //  health points maxi
    this.hp = this.hp_max; // health points
    this.mana_max = 200; // mana points maxi
    this.mana = this.mana_max; // mana points
    this.dmg = 2; // damage for simple attack
    this.special = "Thief of Life"; // special attack name
    this.dmg_spe = 8; // damage for special attack
    this.mana_cost = 50; // mana cost for make special attack
    this.self_hp = 3; // hp plus : gain de vie du spécial
  }

  // voleur de vie
  specialAttack(victim) {
      super.specialAttack(victim);
      if (victim.isDead()) {
        let hp_wiz = Math.round(victim.hp_max / 3);
        let mana_wiz = Math.abs(
          Math.round(victim.mana_max / 3) - (this.mana_max - this.mana)
        );
        this.hp_max += hp_wiz;
        this.mana += mana_wiz;
        addElement(
          `${this.player_name} récupère ${mana_wiz} mana et ${hp_wiz} hp max sur le cadavre de ${victim.player_name}`
        );
      } else {
        victim.hp_max -= 1;
        this.hp_max += 1;
        addElement(`${this.player_name} vole 1 hp max à ${victim.player_name}`);
      }
  }
}
