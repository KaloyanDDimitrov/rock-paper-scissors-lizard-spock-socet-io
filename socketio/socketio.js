const socketio = require("socket.io");

const socketIo = async (server) => {
  const io = socketio(server);

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.join("computer");
    let userScore = 0;
    let pcScore = 0;
    socket.on("choice", (msg) => {
      game(msg)


      //Computer choice
      function getPcChoice() {
        let choices = ['r', 'p', 's', 'sp', 'l'];
        let randomNum = Math.floor(Math.random() * 5);
        return choices[randomNum];
      }

      //Convert form char to word
      function convertToWord(char) {
        if (char === 'p') return "Paper";
        if (char === 'r') return "Rock";
        if (char === 'sp') return "Spock";
        if (char === 'l') return "Lizard";
        return "Scissors";
      }

      //Win & Lose & Draw 
      function win(userChoice, pcChoice) {
        userScore++;
        let choices = `${convertToWord(userChoice) } beats ${convertToWord(pcChoice)}`
        socket.emit("win", userScore, pcScore, choices)
      }

      function lose(userChoice, pcChoice) {
        pcScore++;
        let choices = `${convertToWord(userChoice) } beats ${convertToWord(pcChoice)}`
        socket.emit("lose", userScore, pcScore, choices)
        //  document.getElementById(userChoice).classList.add('shake');
        // setTimeout(()=>{document.getElementById(userChoice).classList.remove('shake')},300);
      }

      function draw() {
        let choices = `It is a Draw!`
        socket.emit("draw", userScore, pcScore, choices)
      }

      function end(userScore, pcScore) {
        if (userScore > pcScore) {
          let msg = "You Win!!"
          socket.emit("winLoseText", msg)

        } else if (userScore < pcScore) {
          let msg = "You Lose!!"
          socket.emit("winLoseText", msg)

        } else {
          let msg = "A Draw!"
          socket.emit("winLoseText", msg)
        }

      }



      //Game logic
      function game(userChoice) {
        let pcChoice = getPcChoice();
        switch (userChoice + pcChoice) {
          case "sps":
          case "spr":
          case "lsp":
          case "lp":
          case "rs":
          case "rl":
          case "pr":
          case "psp":
          case "sp":
          case "sl":
            win(userChoice, pcChoice);
            break;

          case "ssp":
          case "sr":
          case "ps":
          case "pz":
          case "rp":
          case "rsp":
          case "lr":
          case "ls":
          case "spl":
          case "spp":
            lose(userChoice, pcChoice);
            break;

          case "ss":
          case "rr":
          case "pp":
          case "spsp":
          case "ll":
            draw();
            break;
        }
        if (userScore > (20 / 2) || pcScore > (20 / 2)) {
          end(userScore, pcScore);
          socket.emit("refreshScore", userScore, pcScore)
          userScore = 0;
          pcScore = 0;
        }
        // console.log(`Player:${userChoice}:${userScore} <---> PC:${pcChoice}:${pcScore}`)
      }
    });

    
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  
 
};

module.exports = socketIo;