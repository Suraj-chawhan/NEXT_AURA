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
  const [randomAnimalName, setRandomAnimalName] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [totalChances, setTotalChances] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing"); // "playing", "won", "lost"

  useEffect(() => {
    chooseRandomAnimalName();
  }, [chooseRandomAnimalName]);

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const chooseRandomAnimalName = () => {
    const randomNumber = getRandomNumber(0, randomAnimalsNames.length);
    const animal = randomAnimalsNames[randomNumber].toUpperCase();
    setRandomAnimalName(animal);
  };

  const handleLetterClick = (letter) => {
    if (gameStatus !== "playing" || guessedLetters.includes(letter)) return;

    setGuessedLetters((prev) => [...prev, letter]);

    if (!randomAnimalName.includes(letter)) {
      setTotalChances((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (totalChances >= 10) {
      setGameStatus("lost");
    }

    if (randomAnimalName) {
      const uniqueLetters = new Set(randomAnimalName);
      const allGuessed = [...uniqueLetters].every((letter) =>
        guessedLetters.includes(letter)
      );
      if (allGuessed) setGameStatus("won");
    }
  }, [totalChances, guessedLetters, randomAnimalName]);

  const renderBlanks = () => {
    return randomAnimalName
      .split("")
      .map((letter, index) => (
        <span key={index}>
          {guessedLetters.includes(letter) ? letter : "_"}
        </span>
      ));
  };

  const renderButtons = () => {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
      <button
        key={letter}
        onClick={() => handleLetterClick(letter)}
        disabled={guessedLetters.includes(letter) || gameStatus !== "playing"}
      >
        {letter}
      </button>
    ));
  };

  const restartGame = () => {
    setGuessedLetters([]);
    setTotalChances(0);
    setGameStatus("playing");
    chooseRandomAnimalName();
  };

  return (
    <div>
      <h1>Hangman Game</h1>
      <div>{renderBlanks()}</div>
      <div>{renderButtons()}</div>
      <p>Chances Left: {10 - totalChances}</p>
      {gameStatus !== "playing" && (
        <p>{gameStatus === "won" ? "You Won!" : "Game Over!"}</p>
      )}
      <button onClick={restartGame}>Restart</button>
    </div>
  );
};

export default HangmanGame;
