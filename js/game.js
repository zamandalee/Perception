// FINITE STATE MACHINE!
// TODO window.animationRunning into state

import Animations from './animations';
import { animeValues } from './animeValues';

export const ZERO_KEYPRESSES = 'ZERO_KEYPRESSES';
export const ONE_KEYPRESS = 'ONE_KEYPRESS';
export const MATCH = 'MATCH';
export const NOT_MATCH = 'NOT_MATCH';

export const handleState = (state) => {
  let matchScore = 0;
  let matchText = '';

  switch ( state.currentState ) {
    case ZERO_KEYPRESSES:
      // if( !window.animationRunning ) {
        state.currentState = ONE_KEYPRESS;
        state.firstKey = state.key;
        animationHandler.dispatchAnimation(state);
        state.key = null;
      // }
      break;

    case ONE_KEYPRESS:
      state.currentState = ZERO_KEYPRESSES;
      animationHandler.dispatchAnimation(state);

      // matching logic
      console.log("FIRSTKEY", state.firstKey);
      console.log(ANIMATIONS[state.firstKey](state));
      console.log("KEY", state.key);
      console.log(ANIMATIONS[state.key](state));

      state.currentState = ANIMATIONS[state.firstKey](state) === ANIMATIONS[state.key](state) ? MATCH : NOT_MATCH;

      if ( state.currentState === MATCH ) {
        matchText = "you've found a match 🎉";

        matchScore++;
        const htmlScore = document.getElementById('current-score');
        htmlScore.innerHTML = matchScore;
      }
      else {
        matchText = 'not a match ☹️';
      }
      const htmlMessage = document.getElementById('match-text');
      htmlMessage.innerHTML = matchText;
  }
};

let ANIMATIONS = {
  a: (state) => Animations.bananaPeel( state, animeValues['a'] ),
  z: (state) => Animations.bananaPeel( state, animeValues['a'] ),
  b: (state) => Animations.squareSlide( state, animeValues['b'] ),
  y: (state) => Animations.squareSlide( state, animeValues['b'] ),
  c: (state) => Animations.squarePanels( state, animeValues['c'] ),
  x: (state) => Animations.squarePanels( state, animeValues['c'] ),
  d: (state) => Animations.purpleFireworks( state, animeValues['d'] ),
  w: (state) => Animations.purpleFireworks( state, animeValues['d'] ),
  e: (state) => Animations.redSlideLeft( state, animeValues['e'] ),
  v: (state) => Animations.redSlideLeft( state, animeValues['e'] ),
  f: (state) => Animations.purpleSlideUp( state, animeValues['f'] ),
  u: (state) => Animations.purpleSlideUp( state, animeValues['f'] ),
  g: (state) => Animations.squareLineRight( state, animeValues['g'] ),
  t: (state) => Animations.squareLineRight( state, animeValues['g'] ),
  h: (state) => Animations.squareLineUp( state, animeValues['h'] ),
  s: (state) => Animations.squareLineUp( state, animeValues['h'] ),
  i: (state) => Animations.perceive( state, animeValues['i'] ),
  r: (state) => Animations.perceive( state, animeValues['i'] ),
  j: (state) => Animations.go( state, animeValues['j'] ),
  q: (state) => Animations.go( state, animeValues['j'] ),
  k: (state) => Animations.blobs( state, animeValues['k'] ),
  p: (state) => Animations.blobs( state, animeValues['k'] ),
  l: (state) => Animations.tealFireworks( state, animeValues['l'] ),
  o: (state) => Animations.tealFireworks( state, animeValues['l'] ),
  m: (state) => Animations.balloon( state, animeValues['m'] ),
  n: (state) => Animations.balloon( state, animeValues['m'] )
};

class animationHandler {

  static dispatchAnimation(state) {

    if( ANIMATIONS[state.key] ) {
      // window.animationRunning = true;
      ANIMATIONS[state.key](state);
    }
  }
}
