// TODO window.animationRunning into state

// import Animations from './animations';
import * as circleAnimations from './circleAnimations';
import * as wordAnimations from './wordAnimations';
import * as rectangleAnimations from './rectangleAnimations';
import { animeValues } from './animeValues';

// ANIMATION/MATCHING GAME FLOW using a FINITE STATE MACHINE:

//possible currentStates
export const ZERO_KEYPRESSES = 'ZERO_KEYPRESSES';
export const ONE_KEYPRESS = 'ONE_KEYPRESS';
export const MATCH = 'MATCH';
export const NOT_MATCH = 'NOT_MATCH';
export const WON = 'WON';

let alreadyMatched = [];

export const handleState = (state) => {
  let matchText = '';
  const htmlMessage = document.getElementById('match-text');

  console.log("key outside if alph", state.key);
  if( alphabet.includes(state.key) ) {

    // already matched
    if ( !matchedKeys[state.key] ) {
        matchText = "you've already found this match, try again 🙃";
        state.currentState = ZERO_KEYPRESSES;
    }
    // not already matched
    else {
        console.log("key inside else");
      switch ( state.currentState ) {
        case ZERO_KEYPRESSES:
            matchText = "that's one key, now press the matching one!";
            htmlMessage.innerHTML = matchText;

            state.currentState = ONE_KEYPRESS;
            state.firstKey = state.key;
            dispatchAnimation(state);
            state.key = null;
            break;

        case ONE_KEYPRESS:
            dispatchAnimation(state);

            // matching logic
            state.currentState = matchedKeys[state.firstKey] === state.key ? MATCH : NOT_MATCH;
            handleState(state);

            state.currentState = ZERO_KEYPRESSES;
            break;

        case MATCH:
            state.matchScore++;
            const htmlScore = document.getElementById('current-score');
            htmlScore.innerHTML = state.matchScore;

            // htmlMessage.classList.remove("message-red");
            // htmlMessage.classList.add("message-green");

            matchText = "you've found a match 🎉";
            htmlMessage.innerHTML = matchText;

            // render array of already matched key pairs
            const htmlMatchedKeys = document.getElementById('matched-keys');
            alreadyMatched = alreadyMatched.concat( [state.key, state.firstKey] );
            htmlMatchedKeys.innerHTML = 'matches found: ' + alreadyMatched.sort().join(', ');

            // if won
            if ( state.matchScore === 13 ) {
                console.log("inside win conditional");
                console.log("key inside if win", state.key);

                state.currentState = WON;
                handleState(state);
            } else {
                //disable key from being pressed again if not won
                delete matchedKeys[ state.firstKey ];
                delete matchedKeys[ state.key ];
                delete KEY_ANIMATIONS[ state.firstKey ];
                delete KEY_ANIMATIONS[ state.key ];
            }

            // htmlMessage.innerHTML = matchText;

            break;
        case NOT_MATCH:
            matchText = 'not a match ☹️';
            htmlMessage.innerHTML = matchText;

            // htmlMessage.classList.remove("message-green");
            // htmlMessage.classList.add("message-red");
            // htmlMessage.innerHTML = matchText;
            break;

        case WON:
            console.log("inside won");
            matchText = "YOU WIN 🌟";
            htmlMessage.innerHTML = matchText;

            const htmlWinningScore = document.getElementById("match-score");
            htmlWinningScore.classList.add("winning-score");

            // render a won modal
            const htmlWinModal = document.getElementById("hidden-win");
            const blackout = document.getElementById("hidden-win-blackout");
            htmlWinModal.setAttribute("id", "win-modal");
            blackout.setAttribute("id", "win-blackout");
      }
    }
  } else {
    // htmlMessage.classList.remove("message-green");
    // htmlMessage.classList.remove("message-red");

    let oldMatchText = htmlMessage.innerHTML;
    //SET TIMEOUT
    matchText = "that's not an a-z key 🙅🏻, try again";
    htmlMessage.innerHTML = matchText;
  }

};


// KEY/ANIMATION RANDOM ASSIGNMENT LOGIC:

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor( Math.random() * (i + 1) );
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const shuffledAlphabet = shuffleArray(alphabet);

// matchedKeys = obj containing matched keys as key/val pairs
let matchedKeys = {};

for (let i = 0; i < shuffledAlphabet.length; i += 2) {
  const nextLetter = shuffledAlphabet[ i + 1 ];
  const currentLetter = shuffledAlphabet[i];
  matchedKeys[ currentLetter ] = nextLetter;
  matchedKeys[ nextLetter ] = currentLetter;
}


// KEY_ANIMATIONS = set same animation to paired keys
const allAnimations = [
  (state) => rectangleAnimations.bananaPeel( state, animeValues['a'] ),
  (state) => rectangleAnimations.squareSlide( state, animeValues['b'] ),
  (state) => rectangleAnimations.squarePanels( state, animeValues['c'] ),
  (state) => circleAnimations.purpleFireworks( state, animeValues['d'] ),
  (state) => rectangleAnimations.redSlideLeft( state, animeValues['e'] ),
  (state) => rectangleAnimations.purpleSlideUp( state, animeValues['f'] ),
  (state) => rectangleAnimations.squareLineRight( state, animeValues['g'] ),
  (state) => rectangleAnimations.squareLineUp( state, animeValues['h'] ),
  (state) => wordAnimations.perceive( state, animeValues['i'] ),
  (state) => wordAnimations.go( state, animeValues['j'] ),
  (state) => circleAnimations.blobs( state, animeValues['k'] ),
  (state) => circleAnimations.tealFireworks( state, animeValues['l'] ),
  (state) => circleAnimations.balloon( state, animeValues['m'] )
];

let KEY_ANIMATIONS = {};

for (let i = 0; i < Object.keys(matchedKeys).length; i += 2) {
  const currentKey = Object.keys(matchedKeys)[i];
  const matchedKey = matchedKeys[ currentKey ];

  KEY_ANIMATIONS[ currentKey ] = allAnimations[ i / 2 ];
  KEY_ANIMATIONS[ matchedKey ] = allAnimations[ i / 2 ];
}

// run animation if pressed key is in KEY_ANIMATIONS
const dispatchAnimation = (state) => {
  if( KEY_ANIMATIONS[state.key] ) {
    // window.animationRunning = true;
    KEY_ANIMATIONS[state.key](state);
  }

};
