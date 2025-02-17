import React, { useState, useEffect } from "react";

const randomAnimalsNames = [
  "Aardvark",
  "Albatross",
  "Alligator",
  "Alpaca",
  "Ant",
  "Anteater",
  "Antelope",
  "Ape",
  "Armadillo",
  "Donkey",
  "Baboon",
  "Badger",
  "Barracuda",
  "Bat",
  "Bear",
  "Beaver",
  "Bee",
  "Bison",
  "Boar",
  "Buffalo",
  "Butterfly",
  "Camel",
  "Capybara",
  "Caribou",
  "Cassowary",
  "Cat",
  "Caterpillar",
  "Cattle",
  "Chamois",
  "Cheetah",
  "Chicken",
  "Chimpanzee",
  "Chinchilla",
  "Chough",
  "Clam",
  "Cobra",
  "Cockroach",
  "Cod",
  "Cormorant",
  "Coyote",
  "Crab",
  "Crane",
  "Crocodile",
  "Crow",
  "Curlew",
  "Deer",
  "Dinosaur",
  "Dog",
  "Dogfish",
  "Dolphin",
  "Dotterel",
  "Dove",
  "Dragonfly",
  "Duck",
  "Dugong",
  "Dunlin",
  "Eagle",
  "Echidna",
  "Eel",
  "Eland",
  "Elephant",
  "Elk",
  "Emu",
  "Falcon",
  "Ferret",
  "Finch",
  "Fish",
  "Flamingo",
  "Fly",
  "Fox",
  "Frog",
  "Gaur",
  "Gazelle",
  "Gerbil",
  "Giraffe",
  "Gnat",
  "Goat",
  "Goldfinch",
  "Goldfish",
  "Goose",
  "Gorilla",
  "Goshawk",
  "Grasshopper",
  "Grouse",
  "Guanaco",
  "Gull",
  "Hamster",
  "Hare",
  "Hawk",
  "Hedgehog",
  "Heron",
  "Herring",
  "Hippopotamus",
  "Hornet",
  "Horse",
  "Human",
  "Hummingbird",
  "Hyena",
  "Ibex",
  "Ibis",
  "Jackal",
  "Jaguar",
  "Jay",
  "Jellyfish",
  "Kangaroo",
  "Kingfisher",
  "Koala",
  "Kookabura",
  "Kouprey",
  "Kudu",
  "Lapwing",
  "Lark",
  "Lemur",
  "Leopard",
  "Lion",
  "Llama",
  "Lobster",
  "Locust",
  "Loris",
  "Louse",
  "Lyrebird",
  "Magpie",
  "Mallard",
  "Manatee",
  "Mandrill",
  "Mantis",
  "Marten",
  "Meerkat",
  "Mink",
  "Mole",
  "Mongoose",
  "Monkey",
  "Moose",
  "Mosquito",
  "Mouse",
  "Mule",
  "Narwhal",
  "Newt",
  "Nightingale",
  "Octopus",
  "Okapi",
  "Opossum",
  "Oryx",
  "Ostrich",
  "Otter",
  "Owl",
  "Oyster",
  "Panther",
  "Parrot",
  "Partridge",
  "Peafowl",
  "Pelican",
  "Penguin",
  "Pheasant",
  "Pig",
  "Pigeon",
  "Pony",
  "Porcupine",
  "Porpoise",
  "Quail",
  "Quelea",
  "Quetzal",
  "Rabbit",
  "Raccoon",
  "Rail",
  "Ram",
  "Rat",
  "Raven",
  "Red deer",
  "Red panda",
  "Reindeer",
  "Rhinoceros",
  "Rook",
  "Salamander",
  "Salmon",
  "Sand Dollar",
  "Sandpiper",
  "Sardine",
  "Scorpion",
  "Seahorse",
  "Seal",
  "Shark",
  "Sheep",
  "Shrew",
  "Skunk",
  "Snail",
  "Snake",
  "Sparrow",
  "Spider",
  "Spoonbill",
  "Squid",
  "Squirrel",
  "Starling",
  "Stingray",
  "Stinkbug",
  "Stork",
  "Swallow",
  "Swan",
  "Tapir",
  "Tarsier",
  "Termite",
  "Tiger",
  "Toad",
  "Trout",
  "Turkey",
  "Turtle",
  "Viper",
  "Vulture",
  "Wallaby",
  "Walrus",
  "Wasp",
  "Weasel",
  "Whale",
  "Wildcat",
  "Wolf",
  "Wolverine",
  "Wombat",
  "Woodcock",
  "Woodpecker",
  "Worm",
  "Wren",
  "Yak",
  "Zebra",
];

const HangmanGame = () => {
  // Game state
  const [randomAnimalName, setRandomAnimalName] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [totalChances, setTotalChances] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing"); // "playing", "won", or "lost"

  // On mount, choose a random animal
  useEffect(() => {
    chooseRandomAnimalName();
  }, [chooseRandomAnimalName]);

  const getRandomNumber = (min, max) => {
    return Math.trunc(Math.random() * (max - min) + min);
  };

  const chooseRandomAnimalName = () => {
    const randomNumber = getRandomNumber(0, randomAnimalsNames.length);
    const animal = randomAnimalsNames[randomNumber].toUpperCase();
    setRandomAnimalName(animal);
  };

  const handleLetterClick = (letter) => {
    if (gameStatus !== "playing") return;
    if (randomAnimalName.includes(letter)) {
      setGuessedLetters((prev) => [...prev, letter]);
    } else {
      setTotalChances((prev) => prev + 1);
    }
  };

  // Check game status on each change
  useEffect(() => {
    if (totalChances >= 10) {
      setGameStatus("lost");
    }
    if (randomAnimalName) {
      const uniqueLetters = Array.from(new Set(randomAnimalName.split("")));
      const allGuessed = uniqueLetters.every((letter) =>
        guessedLetters.includes(letter)
      );
      if (allGuessed) setGameStatus("won");
    }
  }, [totalChances, guessedLetters, randomAnimalName]);

  const renderBlanks = () => {
    return randomAnimalName.split("").map((letter, index) => {
      return (
        <p key={index}>{guessedLetters.includes(letter) ? letter : "_"}</p>
      );
    });
  };

  const renderButtons = () => {
    const buttons = [];
    for (let i = 65; i < 91; i++) {
      const letter = String.fromCharCode(i);
      buttons.push(
        <button
          key={letter}
          onClick={() => handleLetterClick(letter)}
          disabled={guessedLetters.includes(letter) || gameStatus !== "playing"}
        >
          {letter}
        </button>
      );
    }
    return buttons;
  };

  // Render hangman drawing: show each part when totalChances >= part number.
  const renderHangman = () => {
    const parts = [];
    for (let i = 1; i <= 10; i++) {
      parts.push(
        <div
          key={i}
          className={`class-${i} ${totalChances >= i ? "" : "display-none"}`}
        ></div>
      );
    }
    return <div className="hangstand">{parts}</div>;
  };

  const restartGame = () => {
    setGuessedLetters([]);
    setTotalChances(0);
    setGameStatus("playing");
    chooseRandomAnimalName();
  };

  return (
    <div className="root">
      {/* Inline CSS styles and class names are used as defined below */}
      <style>{`
        html {
          background-image: linear-gradient(to right, red 0%, blue 100%);
        }
        .root {
          display: flex;
          width: 100vw;
          height: 100vh;
        }
        .hangstand {
          width: 40vw;
          position: relative;
        }
        .buttons-parent {
          width: 50%;
          padding-right: 6%;
          display: grid;
          height: 60vh;
          grid-template-columns: repeat(8, 1fr);
        }
        button {
          background-color: #fdc500;
          border: none;
          font-size: 2rem;
          font-weight: 600;
          border-radius: 2px;
          width: 60px;
          height: 60px;
          margin: 5px 8px;
          padding: 6px 10px;
        }
        button:hover {
          background-color: #ebb902;
          cursor: pointer;
        }
        body {
          overflow-x: hidden;
        }
        span {
          display: none;
        }
        p {
          color: white;
          height: 40px;
          width: 40px;
          margin: 10px;
          font-size: 30px;
          text-align: center;
          border-bottom: 2px solid white;
        }
        .blanks_parent {
          height: 20vh;
          display: flex;
          justify-content: center;
          margin-top: 80px;
        }
        .greenBtn, .greenBtn:hover {
          background-color: green;
          color: white;
        }
        .redBtn, .redBtn:hover {
          background-color: red;
          color: white;
        }
        .class-1 {
          height: 10px;
          width: 80%;
          left: 20px;
          background: white;
          position: absolute;
          bottom: 8%;
        }
        .class-2 {
          height: 10px;
          width: 90vh;
          top: 46vh;
          background: white;
          position: absolute;
          right: 197px;
          transform: rotate(90deg);
        }
        .class-3 {
          height: 10px;
          width: 50%;
          left: 20px;
          background: white;
          position: absolute;
          top: 1.7%;
        }
        .class-4 {
          height: 5px;
          width: 15vh;
          top: 9.8vh;
          background: white;
          position: absolute;
          right: 198px;
          transform: rotate(90deg);
        }
        .class-5 {
          height: 100px;
          width: 100px;
          position: absolute;
          background-color: white;
          left: 212px;
          top: 114px;
          border-radius: 50%;
        }
        .class-6 {
          height: 10px;
          width: 28vh;
          top: 46vh;
          background: white;
          position: absolute;
          right: 160px;
          transform: rotate(90deg);
        }
        .class-7 {
          height: 10px;
          width: 20vh;
          top: 46vh;
          background: white;
          position: absolute;
          right: 245px;
          transform: rotate(20deg);
        }
        .class-8 {
          height: 10px;
          width: 20vh;
          top: 46vh;
          background: white;
          position: absolute;
          right: 125px;
          transform: rotate(-20deg);
        }
        .class-9 {
          height: 10px;
          width: 20vh;
          top: 64vh;
          background: white;
          position: absolute;
          right: 131px;
          transform: rotate(-150deg);
        }
        .class-10 {
          height: 10px;
          width: 20vh;
          top: 64vh;
          background: white;
          position: absolute;
          right: 236px;
          transform: rotate(150deg);
        }
        .display-none {
          display: none;
        }
      `}</style>

      {/* Hangman drawing */}
      {renderHangman()}

      <div style={{ marginRight: "25px" }}>
        <div className="blanks_parent">{renderBlanks()}</div>
        <div className="buttons-parent">{renderButtons()}</div>
      </div>

      {gameStatus !== "playing" && (
        <div
          style={{
            textAlign: "center",
            color: "white",
            background: "rgba(0,0,0,0.8)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          {gameStatus === "won" ? (
            <p>You won the Game!</p>
          ) : (
            <p>You lost the Game!</p>
          )}
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default HangmanGame;
