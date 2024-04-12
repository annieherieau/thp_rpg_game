// Récupère les données du formulaire
export function getInput(paraName){
  let url_string = window.location.href; // www.test.com?filename=test
    let url = new URL(url_string);
    let paramValue = url.searchParams.get(paraName);
    return paramValue;
}

// ajoute le text dans le Dom
export function addText(text, balise="p", bClass='my-0 px-3', parentId='gameplay', id=''){
  // créer élément
let div = document.createElement(balise);
div.setAttribute("class", bClass);
if (id) { div.setAttribute("id", id);}
div.innerText = text;
let parent = document.getElementById(parentId);
parent.append(div);
}
