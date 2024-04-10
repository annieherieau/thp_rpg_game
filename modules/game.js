class Game{
  // initie 5 persos
  constructor(numberOfPlayers, turnLeft){
    this.numberOfPlayers = numberOfPlayers ? numberOfPlayers : 5; // initie le nombre de players
    this.turnLeft = turnLeft ? turnLeft : 10; // nombre de tours de la partie



  }

  // turnLeft : nombre dtours restants
  skipturn(){
    this.turnLest --;
  }
}