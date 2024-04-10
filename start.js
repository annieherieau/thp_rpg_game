function startGame(){

}

startGame();

const TEST = {
  hp: 10,
  dmg: 3,
  mana: 100,
  special: "mon spécial",
  spe: 5,
  mana_cost: 20,
  self_hp: 5,
  name: 'Perso'
}

let testCaracter = new Character(TEST.hp, TEST.dmg, TEST.mana,  TEST.special, TEST.spe, TEST.mana_cost, TEST.self_hp, TEST.name);
