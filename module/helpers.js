export function getInput(paraName){
  let url_string = window.location.href; // www.test.com?filename=test
    let url = new URL(url_string);
    let paramValue = url.searchParams.get(paraName);
    return paramValue;
}

export function addText(text, balise="p"){
  // créer élément
let div = document.createElement(balise);
div.innerText = text;
let parent = document.getElementById("gameplay");
parent.append(div);
}