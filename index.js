import { Game } from "./module/game.js";
window.launchApp = launchApp;
window.showTurn = showTurn;
window.hideTurn = hideTurn;
window.showPlayers = showPlayers;
window.radioChecked = radioChecked;

// connaitre l'input d'une serie radio
function radioChecked(name) {
  let radioInput = document.getElementsByName(name);
  let checked = "";
  radioInput.forEach((radio) => {
    radio.checked ? (checked += radio.value) : checked;
  });
  return parseInt(checked);
}

// lancement du jeu
function launchApp() {
  window.rpgGame = new Game();
  window.rpgGame.startGame();
}

// Récupère les données du formulaire
export function getInput(paraName) {
  let url_string = window.location.href; // www.test.com?filename=test
  let url = new URL(url_string);
  let paramValue = url.searchParams.get(paraName);
  return paramValue;
}
// effacer un Dom Element
export function removeElement(elementId) {
  document.getElementById(elementId).remove();
}

// changer le text d'un élément existant
export function changeInnerText(elementId, innerText) {
  document.getElementById(elementId).innerText = innerText;
}
// ajoute un Dom Element dans le Dom
export function addElement(
  text,
  balise = "p",
  bClass = "my-0 px-3",
  parentId = "gameplayHistory",
  id = ""
) {
  // créer élément
  let div = document.createElement(balise);
  // ajouter attributs
  div.setAttribute("class", bClass);
  if (id) {
    div.setAttribute("id", id);
  }
  div.innerText = text;
  // accrocher au parrent
  let parent = document.getElementById(parentId);
  parent.append(div);
}

// Enlève la classe d'un élément
export function removeClassElement(elementId, elementClass = "collapse") {
  document.getElementById(elementId).classList.remove(elementClass);
}

// ajoute une classe à un élément
export function addClassElement(elementId, elementClass = "collapse") {
  document.getElementById(elementId).classList.add(elementClass);
}

// renvoie une valeur random du tableau
export function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// modifier innerHtml
export function changeInnerHTML(textHtml, elementId){
  return document.getElementById(elementId).innerHTML += textHtml;
}
// afficher le input turn
function showTurn() {
  removeClassElement("turnNumber");
  document.getElementById("turnNumberInput").value = "10";
}
// marque le input turn
function hideTurn() {
  addClassElement("turnNumber");
  document.getElementById("turnNumberInput").value = "-9999999";
}

// affiche les joueurs
function showPlayers(number = 1) {
  let maxPlayers = document.getElementsByName("nbreRadio").length + 1;
  switch (radioChecked("combatRadio")) {
    case 1:
      number = radioChecked("nbreRadio");
      break;
    case 2:
      number = 1;
      break;
    default:
      number = 0;
      break;
  }

  for (let i = 1; i < maxPlayers; i++) {
    if (i <= number) {
      document.getElementById(`player${i}`).className = "row";
      document.getElementById(`name${i}`).required = true;
    } else {
      document.getElementById(`player${i}`).className = "collapse";
      document.getElementById(`name${i}`).required = false;
    }
  }
}
