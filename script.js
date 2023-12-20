const users = [
  {
    id: 1,
    name: "Player 1",
    count: 0,
    round: false,
  },
  {
    id: 2,
    name: "Player 2",
    count: 0,
    round: false,
  },
];
const player1 = users[0];
const player2 = users[1];
const start = document.querySelector("#start");
const player = document.querySelector("#player");

const player1Count = document.querySelector("#p1_count");
const player2Count = document.querySelector("#p2_count");

function oneOrTwo() {
  return Math.floor(Math.random() * 2) + 1;
}

start.addEventListener("click", () => {
  const round = oneOrTwo();
  const p1 = document.querySelector("#p1");
  const p2 = document.querySelector("#p2");
  const coin = document.querySelectorAll('input[name = "coin"]');

  coin.forEach((input) => input.removeAttribute("disabled"));
  start.setAttribute("disabled", "");

  coin.forEach((input) => {
    input.addEventListener("change", () => {
      player.removeAttribute("disabled");
      console.log(input);
    });
  });

  if (round === 1) {
    player1.round = true;
    player2.round = false;
    p1.classList.add("text-success");
    p1.classList.remove("text-danger");
    p2.classList.add("text-danger");
    p2.classList.remove("text-success");
  } else {
    player1.round = false;
    player2.round = true;
    p1.classList.add("text-danger");
    p1.classList.remove("text-success");
    p2.classList.add("text-success");
    p2.classList.remove("text-danger");
  }
});

player.addEventListener("click", () => {
  const animation = document.querySelector("#euro");
  const animation1 = document.querySelector("#euro1");
  animation.style.display = "block";
  animation1.style.display = "none";
  setTimeout(() => {
    animation.style.display = "none";
    animation1.style.display = "block";
  }, 1000);

  const coin = +document.querySelector('input[name="coin"]:checked').value;
  const num = oneOrTwo();
  if (num === 1) {
    animation1.style.backgroundImage =
      'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/133687/faceeuro.png")';
  } else {
    animation1.style.backgroundImage =
      'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/133687/backeuro.png")';
  }
  console.log(num);
  console.log(coin === num);
  if (player1.round) {
    if (coin === num) {
      player1.count++;
    } else {
      player1.round = false;
      player2.round = true;
      p1.classList.add("text-danger");
      p1.classList.remove("text-success");
      p2.classList.add("text-success");
      p2.classList.remove("text-danger");
    }
  } else {
    if (coin === num) {
      player2.count++;
    } else {
      player2.round = false;
      player1.round = true;
      p1.classList.add("text-success");
      p1.classList.remove("text-danger");
      p2.classList.add("text-danger");
      p2.classList.remove("text-success");
    }
  }

  player1Count.innerHTML = player1.count;
  player2Count.innerHTML = player2.count;

  if (player1.count === 5) {
    winner(player1.name);
  }

  if (player2.count === 5) {
    winner(player2.name);
  }
});

function winner(player) {
  Swal.fire({
    title: "Winner!",
    text: `${player}`,
    icon: "success",
  });
  player1.count = 0;
  player2.count = 0;
}
