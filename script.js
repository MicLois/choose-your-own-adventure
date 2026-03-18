// Branching Story Project
// Run with: node script.js
//
// Your job has two parts:
//   1. Write your story in the storyNodes object below
//   2. Implement the four functions marked with TODO
//
// The console input/output is handled for you at the bottom of the file.
// You do not need to touch anything in the "do not modify" section.
//
// Read PLAN.md before starting.

// -------------------------------------------------------
// YOUR STORY DATA
//
// Fill out the storyNodes with the appropriate data.
// Keep the same structure - only the text and ids change.
//
// Scene shape:
//   id        - a unique string key, kebab-case (e.g. "dark-hallway")
//   text      - the paragraph the player reads when they arrive here
//   choices   - array of choice objects ({ text, nextId })
//   isEnding  - false for regular scenes, true for ending scenes
//
// Ending scenes also need:
//   endingTitle - a short title shown when this ending is reached
//   choices: [] - an empty array (required, not optional)
//
// Rules:
//   - Every nextId must exactly match a real scene key in this object
//   - Use kebab-case for all ids
//   - You need at least 8 scenes total and at least 2 distinct endings
// -------------------------------------------------------

// submarine ocean horror
// Run the game at any point with: `node script.js`
// Each scene is an object stored inside `storyNodes`.

const storyNodes = {
  start: {
    id: "start", // must exactly match its key in `storyNodes`
    text: "You are a submersible pilot operating the NEST. Your mission is find out what happened to the Deimos. Before you make it down to depth, you start having radio issues with the surface. Do you keep going?",
    choices: [
      {
        text: "Yes, continue with the dive and find the Deimos vessel.",
        nextId: "continue-dive", // KEY
      },
      {
        text: "No, abandon the dive and hit the ascend button to to surface.",
        nextId: "surface", // Change after the test run to "surface" to match the key in storyNodes
      },
    ],
    isEnding: false,
  },

  "continue-dive": {
    id: "continue-dive",
    text: "You continue the descent. The floodlights on the submersible come to life, illuminating the debris field covering the sand. The radio crackles: “Krrshh… NEST... can you… hear... us?”",
    choices: [
      {
        text: "“Now that you can see the first signs of the Deimos wreckage, you decide it’s time to tell the surface that you’re having issues. You can always come back down.”",
        nextId: "contactSurface", // KEY
      },
      {
        text: "You ignore the radio that seems to be working-ish and move along the debris field moving further into the light-deprived ocean depths outside your view port.",
        nextId: "ignoreRadio", // KEY
      },
    ],
    isEnding: false,
  },

  contactSurface: {
    id: "contactSurface",
    text: "You hit the radio switchboard. “Surface, can you hear me?” There is no answer from the surface. Complete silence.",
    choices: [
      {
        text: "“You decide ascend anyway and try the radio from a higher altitude.",
        nextId: "end-ascend-button", // // Change after the test run to "surface" to match the key in storyNodes
      },
      {
        text: "The silence unsettles you. Instead of waiting for permission to ascend, you decide there’s no harm in checking the debris field at least until someone answers the radio.",
        nextId: "ignoreRadio", // KEY > links to ignoreRadio
      },
    ],
    isEnding: false,
  },

  ignoreRadio: {
    id: "ignoreRadio",
    text: "In the Dark, a reddish-brown something swims across your view port. Large, unknown and way to close. You lean forward to see better, hands braced against the glass when another pass of this thing swims across your eyes, this time bumping the glass under your touch. A sliver of a crack grows under your palms. and you…",
    choices: [
      {
        text: "“Retreat and panic. Jumping away from the glass. You hit the ascend button and wait for the decent wire to pull you up from the ocean floor, hoping the thing isn’t fast enough to catch you.” ",
        nextId: "retreat", // KEY
      },
      {
        text: "“Hold your ground. You kill the exterior lights and shut down the engines, hoping the darkness and silence will convince the thing you’re not worth its attention.”",
        nextId: "holdGround", // KEY
      },
    ],
    isEnding: false,
  },

  surface: {
    id: "surface",
    text: "As you hit the ascend button, a sudden jolt shudders through the submersible, stopping you cold. Something bumps you from underneath. Something reddish-brown and large. Do you…",
    choices: [
      {
        text: "“Retreat and panic. Jumping away from the glass. You hit the ascend button and wait for the decent wire to pull you up from the ocean floor, hoping the thing isn’t fast enough to catch you.” ",
        nextId: "retreat", // KEY
      },
      {
        text: "Observe quietly, flipping off the lights that might have startled it and wait in the dark to see what this new creature does.",
        nextId: "observe", // KEY
      },
    ],
    isEnding: false,
  },

  observe: {
    id: "observe",
    text: "Below, among the wreck’s beams and twisted metal, the giant squid moves. It weaves through the wreckage, at home among the hull plates. You sense it watching you from the shadows, curious but not threatened. ",
    choices: [
      {
        text: "You flash the flood lights, twice in quick succession. The creature stills for a moment before blinking its large eyes at you.",
        nextId: "end-ascend", // KEY
      },
      {
        text: "You remain completely still and watch—any sudden move could startle it.",
        nextId: "holdGround", // KEY
      },
    ],
    isEnding: false,
  },

  // -------------------------------------------------------
  // END SCENES
  // These scenes have no choices and end the game.
  // -------------------------------------------------------

  retreat: {
    id: "retreat",
    text: "You did not make the right decision. You push the engines to assist the winch, trying to reach the surface before the cable snaps... ",
    choices: [],
    isEnding: true,
    endingTitle: "You Died. Game Over",
  },

  holdGround: {
    id: "holdGround",
    text: "You made the right decision. The creature swims away, uninterested in the now dark and silent submersible. You wait a few moments before turning the lights back on and restarting the engines, making it to the surface in one piece.",
    choices: [],
    isEnding: true,
    endingTitle: "You Live. Game Over",
  },

  "end-ascend": {
    id: "end-ascend",
    text: "You flash the lights again. The creature pauses, then the water around your submersible stirs violently as it spreads over the NEST. Thick tentacles wrap around the sub, joined by others. The ocean is alive with huge, intelligent beings. Awestruck and terrified, you realize you’re surrounded as the sea claims you as one of its mysteries.",
    choices: [],
    isEnding: true,
    endingTitle: "You Were Claimed By The Sea. Game Over",
  },
};

// -------------------------------------------------------
// GAME STATE
// These variables are used by your functions below.
// Do not rename them - the game loop at the bottom depends on them.
// -------------------------------------------------------

let currentSceneId = "start";
const visitedScenes = [];

// -------------------------------------------------------
// YOUR FUNCTIONS
// Implement each function using the TODO comments as a guide.
// None of these functions should ask for input or deal with readline.
// They only read data, update state, and log to the console.
// -------------------------------------------------------

// getCurrentScene(sceneId)
// Returns the scene object for the given id.
function getCurrentScene(sceneId) {
  // TODO: Return the scene from storyNodes using sceneId as the key
  return storyNodes[sceneId];
}

// displayScene(sceneId)
// Logs the scene text and numbered choices to the console.
// For endings, logs the endingTitle instead of choices.
// Do not call any input functions here - the game loop handles that.
function displayScene(sceneId) {
  // TODO: Get the scene using getCurrentScene(sceneId)
  const scene = getCurrentScene(sceneId);
  // TODO: Print a divider so turns are easy to read
  console.log("--------------------------------------");
  // TODO: Print the scene text using console.log
  console.log(scene.text);
  console.log("--------------------------------------");
  // TODO: Check scene.isEnding
  if (scene.isEnding) {
    console.log("-- " + scene.endingTitle + " --");
  } else {
    // loop through scene.choices and print each one numbered from 1
    // so the user can select them with the number keys
    scene.choices.forEach(function (choice, index) {
      console.log(index + 1 + ". " + choice.text);
    });
  }

  //   If false: loop through scene.choices and print each one numbered from 1
  //             Example output:
  //               1. Enter the door
  //               2. Walk away
}

// makeChoice(sceneId, choiceNumber)
// Handles a player selecting one of the numbered choices.
// Returns the nextId of the chosen scene.
function makeChoice(sceneId, choiceNumber) {
  // TODO: Get the scene using getCurrentScene(sceneId)
  const scene = getCurrentScene(sceneId);
  // TODO: Get the selected choice using scene.choices[choiceNumber - 1]
  //   (choiceNumber is 1-based but arrays are 0-based)
  const selectedChoice = scene.choices[choiceNumber - 1];
  // TODO: Push sceneId into visitedScenes to track where the player has been
  visitedScenes.push(sceneId);
  // TODO: Return selectedChoice.nextId
  return selectedChoice.nextId;
}

// restartGame()
// Resets all state back to the beginning.
// Do not call displayScene here - the game loop handles that after restart.
function restartGame() {
  // TODO: Set currentSceneId back to "start"
  currentSceneId = "start";
  // TODO: Clear visitedScenes by setting visitedScenes.length = 0
  visitedScenes.length = 0;
}

// -------------------------------------------------------
// GAME LOOP - DO NOT MODIFY
// This section handles all console input and output.
// It calls your functions above to run the game.
// -------------------------------------------------------

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function runGame() {
  displayScene(currentSceneId);

  const scene = getCurrentScene(currentSceneId);

  if (scene.isEnding) {
    askAfterEnding();
  } else {
    const quitNumber = scene.choices.length + 1;
    console.log(quitNumber + ". Quit");
    askForInput();
  }
}

function askForInput() {
  rl.question("\nEnter your choice: ", function (answer) {
    const choiceNumber = parseInt(answer);
    const scene = getCurrentScene(currentSceneId);
    const quitNumber = scene.choices.length + 1;

    if (isNaN(choiceNumber) || choiceNumber < 1 || choiceNumber > quitNumber) {
      console.log("Please enter a number between 1 and " + quitNumber + ".");
      askForInput();
      return;
    }

    if (choiceNumber === quitNumber) {
      console.log("\nGoodbye.");
      rl.close();
      process.exit(0);
    }

    currentSceneId = makeChoice(currentSceneId, choiceNumber);
    runGame();
  });
}

function askAfterEnding() {
  console.log("\n1. Play Again");
  console.log("2. Quit");

  rl.question("\nEnter your choice: ", function (answer) {
    const choiceNumber = parseInt(answer);

    if (choiceNumber === 1) {
      restartGame();
      runGame();
      return;
    }

    if (choiceNumber === 2) {
      console.log("\nThanks for playing.");
      rl.close();
      process.exit(0);
    }

    console.log("Please enter 1 or 2.");
    askAfterEnding();
  });
}

runGame();
