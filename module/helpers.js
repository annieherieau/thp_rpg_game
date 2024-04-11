export function getInput(paraName){
  let url_string = window.location.href; // www.test.com?filename=test
    let url = new URL(url_string);
    let paramValue = url.searchParams.get(paraName);
    return paramValue;
}

// document.addEventListener('onclick')