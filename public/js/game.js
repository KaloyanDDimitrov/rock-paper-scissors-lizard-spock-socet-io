let rock_div = document.getElementById("r");
let paper_div = document.getElementById("p");
let scissors_div = document.getElementById("s");
let spock_div = document.getElementById("sp");
let lizard_div = document.getElementById("l");


let userScore_span = document.getElementById("userScore");
let pcScore_span = document.getElementById("pcScore");
//let scoreBoard_div = document.querySelector("score-board");
let result_div = document.querySelector(".result>h4");

socket.on("win", (userScore, pcScore, choices) => {
  score(userScore, pcScore, choices)
});
socket.on("lose", (userScore, pcScore, choices) => {
  score(userScore, pcScore, choices)
});
socket.on("draw", (userScore, pcScore, choices) => {
  score(userScore, pcScore, choices)
});

socket.on("winLoseText", (choices) => {
  result_div.innerHTML = `${choices}`
});
/*socket.on("refreshScore", (userScore, pcScore, choices) => {
  window.setTimeout(score(userScore, pcScore, choices), 3000);
});*/




const score = async (userScore, pcScore, choices) => {
  userScore_span.innerHTML = `${userScore}`;
  pcScore_span.innerHTML = `${pcScore}`
  result_div.innerHTML = `${choices}`
}

//Main func

function main() {
  rock_div.addEventListener("click", (e) => {
    e.preventDefault();
    emit(rock_div);
  });
  paper_div.addEventListener("click", (e) => {
    e.preventDefault();
    emit(paper_div);
  });
  scissors_div.addEventListener("click", (e) => {
    e.preventDefault();
    emit(scissors_div);
  });
  lizard_div.addEventListener("click", (e) => {
    e.preventDefault();
    emit(lizard_div);
  });
  spock_div.addEventListener("click", (e) => {
    e.preventDefault();
    emit(spock_div);
  });
}

function emit(button) {
  socket.emit("choice", button.id);
}

main();