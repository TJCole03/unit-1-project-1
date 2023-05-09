const players = {
  length: 0,
};

const playingText = "Player1";
const playerChoose = document.querySelector("#player");
playerChoose.innerText = playingText;

const divEl = document.querySelector(".container");
divEl.addEventListener("click", (evt) => {
  if (!evt.target.alt) {
    return;
  }
  if (players[0]) {
    players[1] = evt.target.alt;
  } else {
    players[0] = evt.target.alt;
  }
  players.length++;
  const child = evt.target;
  const parent = child.parentNode;
  playerChoose.innerText = "Player 2";
  parent.classList.add("unclickable");
  if (players.length == 2) {
    console.log("Two players ready");
    console.log(players);
    //set up battle between two players
    init();
  }
});

function init() {
  const player1 = { player1: players[0] };
  const player2 = { player2: players[1] };
  console.log(player1);
  console.log(player2);
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `<h2>Welcome Fighters!!</h2><h3>Player 1 chose ${player1.player1}</h3> <h3>Player 2 chose ${player2.player2}</br>
 <button id="fight" style="">Fight!!</button>`;

  document.body.appendChild(modal);
  const btnEl = document.getElementById("fight");

  const battleEl = document.createElement("div");
  btnEl.addEventListener("click", (evt) => {
    console.log("Let begin game");
    const h2El = document.querySelector("h2");
    const containerEl = document.querySelector(".container");
    h2El.classList.add("mainscreen");
    containerEl.classList.add("mainscreen");
    modal.remove();

    document.body.style.backgroundImage = "none";

    document.body.appendChild(battleEl);
    battleEl.setAttribute("id", "battleContainer");

    //find players choices in pokemons array and send pokemons to the game
    let poke1 = {};
    let poke2 = {};
    for (let pokemon of pokemonObjectArray) {
      if (pokemon.name === player1.player1) {
        poke1 = pokemon;
      }
      if (pokemon.name === player2.player2) {
        poke2 = pokemon;
      }
    }
    console.log(poke1, poke2);
    const game = new Game(poke1, poke2);
    //start game
    // containerEl.remove();
    // h2El.remove();
    game.start();
  });
}

//also need to be able to cache divs of characters to be able have
//that state in an array of objects
//so that when players select a pokemon on screen we can search
//in our array and set the state of pokemon objects.

// const pokemonsDivs = document.querySelectorAll(".container div");
// const pokemonArray = [];

// for (let pokemon of pokemonsDivs) {
//   pokemonArray.push(pokemon.id);
// }
// console.log(pokemonArray);

// //declare pokemon1 as an object
// const pokemon1 = {};
// //declare pokemon2 as an object
// const pokemon2 = {};
// //declare a turn toggle option
let turn = 0;
//declare turn as a global variable and set it to 0
//declare winner - this will be 0 or 1
let winner = null;

class Pokemon {
  constructor(name, abilities, img) {
    this.name = name;
    this.health = 100;
    this.abilities = abilities;
    this.img = img;
  }
}

function randomPower() {
  return Math.floor(Math.random() * 20) + 1;
}

const pikachu = new Pokemon(
  "pikachu",
  [
    {
      abilityName: "iron-tail",
      power: randomPower(),
      img: "asset/pikachu-iron-tail.gif",
    },
    {
      abilityName: "thunder-bolt",
      power: randomPower(),
      img: "asset/pikachu-thunder-bolt.gif",
    },
    {
      abilityName: "electro-bolt",
      power: randomPower(),
      img: "asset/electro-bolt-pikachu.gif",
    },
  ],
  [
    "asset/pikachu-fighting-1.gif",
    "asset/pikachu-fight.jpg",
    "asset/pikachu-mid-level.png",
    "asset/pikachu-lost.jpg",
  ]
);

const charizard = new Pokemon(
  "charizard",
  [
    {
      abilityName: "flamethrower",
      power: randomPower(),
      img: "asset/charizard-flamethrower.gif",
    },
    {
      abilityName: "solar-power",
      power: randomPower(),
      img: "asset/charizard-solar-power.gif",
    },
    {
      abilityName: "wing-attack",
      power: randomPower(),
      img: "asset/charizard-wing-attack.gif",
    },
  ],
  [
    "asset/charizard-pokemon.gif",
    "asset/charizard-fight.webp",
    "asset/charizard-mid-fight.jpg",
    "asset/charizard-lost.png",
  ]
);

const blastoise = new Pokemon(
  "blastoise",
  [
    {
      abilityName: "hydro-pump",
      power: randomPower(),
      img: "asset/blastoise-hydro-pump.gif",
    },
    {
      abilityName: "mega-launcher",
      power: randomPower(),
      img: "asset/blastoise-mega-launcher.gif",
    },
    {
      abilityName: "skull-bash",
      power: randomPower(),
      img: "asset/blastoise-skull-bash.gif",
    },
  ],
  [
    "asset/blastoise-pokemon.gif",
    "asset/blastoise-fight.webp",
    ,
    "asset/blastoise-mid-fight.png",
    "blastoise-lost.webp",
  ]
);

const machamp = new Pokemon(
  "machamp",
  [
    {
      abilityName: "cross-chop",
      power: randomPower(),
      img: "asset/machamp-cross-chop.gif",
    },
    { abilityName: "dynamic-punch", power: randomPower() },
    { abilityName: "stone-edge", power: randomPower() },
  ],
  ["asset/machamp-pokemon.gif", "asset/machamp-fight.png"]
);

const alakazam = new Pokemon(
  "alakazam",
  [
    {
      abilityName: "psychic",
      power: randomPower(),
      img: "asset/alakazam-psychic.gif",
    },
    {
      abilityName: "future-sight",
      power: randomPower(),
      img: "asset/alakazam-future-sight.gif",
    },
    {
      abilityName: "shadow-ball",
      power: randomPower(),
      img: "asset/alakazam-shadow-ball.png",
    },
  ],
  ["asset/alakazam-pokemon.gif", "asset/alakazam-fight.webp"]
);

const squirtle = new Pokemon(
  "squirtle",
  [
    {
      abilityName: "water-gun",
      power: randomPower(),
      img: "asset/squirtle-water-gun.gif",
    },
    {
      abilityName: "bubble-beam",
      power: randomPower(),
      img: "asset/squirtle-bubble-beam.gif",
    },
    {
      abilityName: "aqua-tail",
      power: randomPower(),
      img: "asset/squirtle-aqua-tail.gif",
    },
  ],
  ["asset/squirtle-new.gif", "asset/squirtle-fight.jpg"]
);

const gyarados = new Pokemon(
  "gyarados",
  [
    {
      abilityName: "hydro-pump",
      power: randomPower(),
      img: "asset/gyarados-hydro-punch.gif",
    },
    { abilityName: "crunch", power: randomPower() },
    { abilityName: "dragon-pulse", power: randomPower() },
  ],
  ["asset/gyarados-pokemon.gif", "asset/gyarados-fight.png"]
);

const lucario = new Pokemon(
  "lucario",
  [
    {
      abilityName: "aura-sphere",
      power: randomPower(),
      img: "asset/lucario-aura-sphere.gif",
    },
    {
      abilityName: "close-combat",
      power: randomPower(),
      img: "asset/lucario-close-combat.gif",
    },
    {
      abilityName: "flash-cannon",
      power: randomPower(),
      img: "asset/lucario-flash-cannon.gif",
    },
  ],
  [
    "asset/lucario-pokemon.gif",
    "asset/lucario-fight.png",
    "asset/lucario-mid-fight.webp",
    "asset/lucario-lost.png",
  ]
);

//store in pokemon object into an array
const pokemonObjectArray = [
  pikachu,
  charizard,
  blastoise,
  machamp,
  alakazam,
  squirtle,
  gyarados,
  lucario,
];

const battleGrounds = [
  "asset/background-2.png",
  "asset/background-3.png",
  "asset/background-4.png",
  "asset/back.jpeg",
];

class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }
  start() {
    //set the battle field
    this.createBattleField();
    this.setPokemonsPosition();

    //can track players object to see whose turn it is
    //set turn to first pokemon
    // turn = Math.floor(Math.random() * 2);
    turn = 0;
    console.log(`First player to start is ${players[turn]}`);
    this.beginAttack();
  }
  setHealthStatusBar(player1Health, player2Health) {
    player1Health.classList.add("health-bar");
    player1Health.style.setProperty(
      "--percentage",
      this.player1.health.toString()
    );

    player2Health.classList.add("health-bar");
    player2Health.style.setProperty(
      "--percentage",
      this.player2.health.toString()
    );
  }
  createBattleField() {
    const containerEl = document.createElement("div");
    const player1Health = document.createElement("h2");
    player1Health.innerText = `${this.player1.name.toUpperCase()} ${
      this.player1.health
    }%`;
    const player2Health = document.createElement("h2");
    player2Health.innerText = `${this.player2.name.toUpperCase()} ${
      this.player2.health
    }%`;

    this.setHealthStatusBar(player1Health, player2Health);
    containerEl.appendChild(player1Health);
    containerEl.appendChild(player2Health);
    containerEl.classList.add("healthStatus");
    document.querySelector("#battleContainer").appendChild(containerEl);

    //set battle field

    // document.querySelector("#battleContainer").style.backgroundImage = `url(${
    //   battleGrounds[Math.floor(Math.random() * 4)]
    // })`;
    // document.body.style.background =
    //   "linear-gradient(to bottom, #4e4a4a, #b5b5b5, #4e4a4a)";
  }

  setPokemonsPosition() {
    const poke1Pos = document.createElement("div");
    const poke2Pos = document.createElement("div");
    const poke1Img = document.createElement("img");
    poke1Img.src = this.player1.img[0];
    poke1Pos.appendChild(poke1Img);

    poke2Pos.setAttribute("class", "poke1");
    poke1Pos.setAttribute("class", "poke2");

    console.log(this.player2);
    const poke2Img = document.createElement("img");
    poke2Img.src = this.player2.img[0];
    poke2Pos.appendChild(poke2Img);
    document.querySelector("#battleContainer").appendChild(poke2Pos);
    document.querySelector("#battleContainer").appendChild(poke1Pos);
  }

  beginAttack() {
    //go to poke1 class and poke2 create a div container that holds 3 attack buttons
    this.createDivContainerWithAttackButtons();
    //set player1 as first attacker

    const attackingPokemon = document.querySelector(".poke2 > div");
    attackingPokemon.classList.toggle("notattacking");

    this.setEventClicksToAttackDiv();
    //will start the confrontation between pokemons
  }

  createDivContainerWithAttackButtons() {
    const pokemon1El = document.createElement("div");
    const pokemon2El = document.createElement("div");

    const poke1H4El = document.createElement("h4");
    const poke2H4El = document.createElement("h4");
    poke1H4El.innerText = `${this.player1.name} Select Your attack`;
    poke2H4El.innerText = `${this.player2.name} Select Your attack`;

    poke1H4El.setAttribute("class", "notattacking");
    poke2H4El.setAttribute("class", "notattacking");
    pokemon1El.setAttribute("class", "notattacking");
    pokemon2El.setAttribute("class", "notattacking");

    this.createAbilitiesButtonAndAppendToPokemonDiv(pokemon1El, pokemon2El);

    document.querySelector(".poke2").appendChild(pokemon1El);
    document.querySelector(".poke1").appendChild(pokemon2El);

    document.querySelector(".poke2").appendChild(poke1H4El);
    document.querySelector(".poke1").appendChild(poke2H4El);
  }

  createAbilitiesButtonAndAppendToPokemonDiv(pokemon1El, pokemon2El) {
    console.log(this.player1.abilities);
    for (let ability of this.player1.abilities) {
      const btn = document.createElement("button");
      btn.innerText = ability.abilityName;
      pokemon1El.appendChild(btn);
    }

    console.log(this.player2.abilities);
    for (let ability of this.player2.abilities) {
      const btn = document.createElement("button");
      btn.innerText = ability.abilityName;
      pokemon2El.appendChild(btn);
    }
  }

  setEventClicksToAttackDiv() {
    document.querySelector(".poke2 > div").addEventListener("click", (evt) => {
      //if(evt.target.contains)
      if (evt.target.tagName === "BUTTON") {
        this.pokemon1Attack(evt);
      }
    });
    document.querySelector(".poke1 > div").addEventListener("click", (evt) => {
      if (evt.target.tagName === "BUTTON") {
        this.pokemon2Attack(evt);
      }
    });
  }

  pokemon1Attack(evt) {
    //console.log(this.player2.health);
    console.log("You are here");
    //reduce player2 health and re render its health div
    //get attack power;
    console.log(this.player1);
    const player1Abilities = this.player1.abilities;
    const poke2Div = document.querySelector(".poke2 > img");
    const targetAbility = evt.target.innerText;
    poke2Div.setAttribute("class", "left-pokemon-attack");
    let abilityobj = {};
    for (let ability of player1Abilities) {
      if (ability.abilityName === targetAbility) {
        abilityobj = ability;
      }
    }

    console.log(abilityobj);
    poke2Div.src = abilityobj.img;
    this.player2.health -= abilityobj.power;
    const player2Health = document.querySelector(".health-bar");
    this.updateImgStatus();
    player2Health.nextElementSibling.style.setProperty(
      "--percentage",
      this.player2.health.toString()
    );

    console.log(`Health of ${this.player2.name} is ${this.player2.health}`);
    if (this.player2.health < 0) {
      console.log(`Player ${players[turn]} have won`);
      //call winning function
      this.winner(this.player1);
      return;
    }
    //console.log(this.player2.health);

    //this.displayHealth()
    turn = turn ? 0 : 1;
    //toggle class
    document.querySelector(".poke2 > div").classList.toggle("notattacking");
    document.querySelector(".poke1 > div").classList.toggle("notattacking");
    document
      .querySelector(".poke2 > div > h4")
      .classList.toggle("notattacking");

    console.log(`attacking now is ${players[turn]}`);
  }

  pokemon2Attack(evt) {
    //console.log(this.player1.health);

    const player2Abilities = this.player2.abilities;
    const targetAbility = evt.target.innerText;
    const poke1Div = document.querySelector(".poke1 > img");
    poke1Div.setAttribute("class", "right-pokemon-attack");
    let abilityobj = {};
    for (let ability of player2Abilities) {
      if (ability.abilityName === targetAbility) {
        abilityobj = ability;
      }
    }
    console.log(abilityobj);
    poke1Div.src = abilityobj.img;
    this.player1.health -= abilityobj.power;

    const player1Health = document.querySelector(".health-bar");
    this.updateImgStatus();
    player1Health.style.setProperty(
      "--percentage",
      this.player1.health.toString()
    );

    console.log(`Health of ${this.player1.name} is ${this.player1.health}`);
    if (this.player1.health <= 0) {
      console.log(`Player 2 ${players[turn]} has won`);
      this.winner(this.player2);
      return;
    }

    turn = turn ? 0 : 1;
    //toggle class
    document.querySelector(".poke1 > div").classList.toggle("notattacking");
    document.querySelector(".poke2 > div").classList.toggle("notattacking");

    console.log(`attacking now is ${players[turn]}`);
  }

  updateImgStatus() {
    //check health and update img src based on health
    //.poke1 > img , .poke2 > img
    if (this.player1.health <= 0) {
      document.querySelector(".poke2 > img").src = this.player1.img[3];
    } else {
      if (this.player1.health <= 50) {
        document.querySelector(".poke2 > img").src = this.player1.img[2];
      }
    }

    if (this.player2.health <= 0) {
      document.querySelector(".poke1 > img").src = this.player2.img[3];
    } else {
      if (this.player2.health <= 50) {
        document.querySelector(".poke1 > img").src = this.player2.img[2];
      }
    }
  }

  winner(player) {
    alert(`${player.name} has won`);
    //open up winning modal
    const divEl = document.createElement("div");
    divEl.innerHTML = `<h3>${player.name} has won</h3> <button id="reset">Fight Again!</button>`;
    divEl.setAttribute("class", "modal");
    document.querySelector("#battleContainer").appendChild(divEl);
    document.querySelector("#reset").addEventListener("click", this.resetGame);
  }

  resetGame() {
    console.log("Game to reset");
    //need to display screen play again
    //reset objects,
    location.reload();
  }
}
