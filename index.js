import { Game } from "./module/game.js";
window.launchApp = launchApp;
window.showTurn = showTurn;
window.hideTurn = hideTurn;
window.showPlayers = showPlayers;


// lancement du jeu
function launchApp(){
  window.rpgGame = new Game();
  window.rpgGame.startGame();
}

// Récupère les données du formulaire
export function getInput(paraName){
  let url_string = window.location.href; // www.test.com?filename=test
    let url = new URL(url_string);
    let paramValue = url.searchParams.get(paraName);
    return paramValue;
}
// effacer un Dom Element
export function removeElement(elementId){
  document.getElementById(elementId).remove();
}

export function displayElement(elementId, innerText){
  document.getElementById(elementId).innerText = innerText;
}
// ajoute un Dom Element dans le Dom
export function addElement(text, balise="p", bClass='my-0 px-3', parentId='gameplayHistory', id=''){
  // créer élément
  let div = document.createElement(balise);
  // ajouter attributs
  div.setAttribute("class", bClass);
  if (id) { div.setAttribute("id", id);}
  div.innerText = text;
  // accrocher au parrent
  let parent = document.getElementById(parentId);
  parent.append(div);
}

// Enlève la classe d'un élément
export function removeClassElement(elementId, elementClass = "collapse"){
  document.getElementById(elementId).classList.remove(elementClass);
}

// ajoute une classe à un élément
export function addClassElement(elementId, elementClass = "collapse"){
  document.getElementById(elementId).classList.add(elementClass);
}

export function sample(array, number){
  return array[Math.floor(Math.random()*array.length)];
}

function showTurn(){
  document.getElementById('turnNumber').className="";
  document.getElementById('turnNumberInput').value= "10";
}
function hideTurn(){
  document.getElementById('turnNumber').className="collapse";
  document.getElementById('turnNumberInput').value= "-1";
}

function showPlayers(number=1){
  for (let i = 1; i <= 5; i++) {
    if (i <= number){
      document.getElementById(`player${i}`).className="row";
    }else{
      document.getElementById(`player${i}`).className="collapse";
    }
  } 
}
