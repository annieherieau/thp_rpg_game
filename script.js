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
