// FINITE STATE MACHINE!
// TODO window.animationRunning into state

import { Animations } from './animations';
import { animeValues } from './animeValues';

export const ZERO_KEYPRESSES = 'ZERO_KEYPRESSES';
export const ONE_KEYPRESS = 'ONE_KEYPRESS';

export const handleState = (state) => {

  switch ( state.currentState ) {
    case ZERO_KEYPRESSES:
      // if( !window.animationRunning ) {
        state.currentState = ONE_KEYPRESS;
        state.firstKey = state.key;
        state.key = null;
        animationHandler.dispatchAnimation(state);
      // }
      break;
    case ONE_KEYPRESS:
      state.currentState = ZERO_KEYPRESSES;

      // matching

  }
};

class animationHandler {

// create class constant:
  static get ANIMATIONS() {
    console.log(Animations.bananaPeel);
    console.log(Animations.bananaPeel( animeValues['a'] ));
    return {
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
  }

  static dispatchAnimation(state) {
    if( this.ANIMATIONS[state.key] ) {
      console.log("in conditional");
      window.animationRunning = true;
      this.ANIMATIONS[state.key](state);
    }
  }
}
