// TODO window.animationRunning into state

import Animations from './animations';
import { animeValues } from './animeValues';

// ANIMATION/MATCHING GAME FLOW using a FINITE STATE MACHINE:

//possible currentStates
export const ZERO_KEYPRESSES = 'ZERO_KEYPRESSES';
export const ONE_KEYPRESS = 'ONE_KEYPRESS';
export const MATCH = 'MATCH';
export const NOT_MATCH = 'NOT_MATCH';

export const handleState = (state) => {
  let matchText = '';
  const htmlMessage = document.getElementById('match-text');

  if( alphabet.includes(state.key) ) {
    switch ( state.currentState ) {
      case ZERO_KEYPRESSES:
      console.log("in zero keypresses");
      // if( !window.animationRunning ) {
      matchText = "that's one key, press the matching one!";
      htmlMessage.innerHTML = matchText;

      state.currentState = ONE_KEYPRESS;
      state.firstKey = state.key;
      dispatchAnimation(state);
      state.key = null;

      htmlMessage.innerHTML = matchText;
      // }
      break;

      case ONE_KEYPRESS:
      console.log("in one keypress");
      dispatchAnimation(state);

      // matching logic
      state.currentState = matchedKeys[state.firstKey] === state.key ? MATCH : NOT_MATCH;

      if ( state.currentState === MATCH ) {
        matchText = "you've found a match 🎉";

        state.matchScore++;
        const htmlScore = document.getElementById('current-score');
        htmlScore.innerHTML = state.matchScore;
      }
      else {
        matchText = 'not a match ☹️';
      }
      htmlMessage.innerHTML = matchText;

      state.currentState = ZERO_KEYPRESSES;
    }
  } else {
    let oldMatchText = htmlMessage.innerHTML;
    //SET TIMEOUT
    matchText = "that's not an a-z key 🙅🏻, try again";
    htmlMessage.innerHTML = matchText;
  }
};


// KEY/ANIMATION RANDOM ASSIGNMENT LOGIC:

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
              'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

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
  (state) => Animations.bananaPeel( state, animeValues['a'] ),
  (state) => Animations.squareSlide( state, animeValues['b'] ),
  (state) => Animations.squarePanels( state, animeValues['c'] ),
  (state) => Animations.purpleFireworks( state, animeValues['d'] ),
  (state) => Animations.redSlideLeft( state, animeValues['e'] ),
  (state) => Animations.purpleSlideUp( state, animeValues['f'] ),
  (state) => Animations.squareLineRight( state, animeValues['g'] ),
  (state) => Animations.squareLineUp( state, animeValues['h'] ),
  (state) => Animations.perceive( state, animeValues['i'] ),
  (state) => Animations.go( state, animeValues['j'] ),
  (state) => Animations.blobs( state, animeValues['k'] ),
  (state) => Animations.tealFireworks( state, animeValues['l'] ),
  (state) => Animations.balloon( state, animeValues['m'] )
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
